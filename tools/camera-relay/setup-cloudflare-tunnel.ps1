<#
.SYNOPSIS
  Points a permanent hostname on your own domain at the camera relay.

.DESCRIPTION
  Run this AFTER two things are already done:

    1. codifylabspk.com is active on Cloudflare (nameservers changed).
    2. You have run:  cloudflared tunnel login

  It then does the rest:

    - creates the named tunnel (or reuses it if it already exists)
    - adds the DNS record for the hostname, in Cloudflare
    - writes the tunnel's config file
    - installs cloudflared as a Windows service, so it starts at boot
    - checks that the hostname answers, from several public resolvers

  Why a named tunnel rather than Tailscale Funnel: Tailscale's *.ts.net
  records are not visible to every resolver -- Cloudflare's returns NXDOMAIN
  for the very name Google resolves -- so viewers on the wrong DNS cannot load
  the video. A hostname on your own domain is resolvable by everyone.

.PARAMETER Hostname
  The public name to serve the camera on, e.g. camera.codifylabspk.com

.PARAMETER TunnelName
  Name for the tunnel. Defaults to camera-relay.

.PARAMETER Port
  Local port the relay listens on. Defaults to 8477.

.EXAMPLE
  .\setup-cloudflare-tunnel.ps1 -Hostname camera.codifylabspk.com
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$Hostname,
    [string]$TunnelName = 'camera-relay',
    [int]$Port = 8477
)

$ErrorActionPreference = 'Stop'

function Find-Cloudflared {
    $c = Get-Command cloudflared -ErrorAction SilentlyContinue
    if ($c) { return $c.Source }
    foreach ($p in @(
        "$env:ProgramFiles\cloudflared\cloudflared.exe",
        "${env:ProgramFiles(x86)}\cloudflared\cloudflared.exe"
    )) { if (Test-Path $p) { return $p } }
    throw "cloudflared not found. Install it with: winget install --id Cloudflare.cloudflared"
}

$cf = Find-Cloudflared
Write-Host "Using $cf"

$cfDir = Join-Path $env:USERPROFILE '.cloudflared'
if (-not (Test-Path (Join-Path $cfDir 'cert.pem'))) {
    throw "You are not logged in to Cloudflare yet. Run this first, and pick codifylabspk.com in the browser:`n`n    & '$cf' tunnel login`n"
}

# ---------------------------------------------------------------- tunnel --

$existing = & $cf tunnel list 2>&1 | Select-String -Pattern "\s$([regex]::Escape($TunnelName))\s"
if ($existing) {
    Write-Host "Tunnel '$TunnelName' already exists, reusing it."
} else {
    Write-Host "Creating tunnel '$TunnelName'..."
    & $cf tunnel create $TunnelName
    if ($LASTEXITCODE -ne 0) { throw "Could not create the tunnel." }
}

# The credentials file is named after the tunnel's UUID.
$line = (& $cf tunnel list 2>&1 | Select-String -Pattern "^([0-9a-f-]{36})\s+$([regex]::Escape($TunnelName))\s")
if (-not $line) { throw "Could not find the tunnel's id in 'cloudflared tunnel list'." }
$uuid = $line.Matches.Groups[1].Value
$credentials = Join-Path $cfDir "$uuid.json"
if (-not (Test-Path $credentials)) { throw "Credentials file missing: $credentials" }
Write-Host "Tunnel id: $uuid"

# ------------------------------------------------------------------- DNS --

Write-Host "Pointing $Hostname at the tunnel..."
& $cf tunnel route dns --overwrite-dns $TunnelName $Hostname
if ($LASTEXITCODE -ne 0) { throw "Could not create the DNS record. Is the domain active on Cloudflare?" }

# ---------------------------------------------------------------- config --

# `service install` reads this path, so write it where cloudflared expects it.
$configPath = Join-Path $cfDir 'config.yml'
@"
# Serves the camera relay at https://$Hostname
# Written by setup-cloudflare-tunnel.ps1
tunnel: $TunnelName
credentials-file: $credentials

ingress:
  - hostname: $Hostname
    service: http://127.0.0.1:$Port
  # Anything else that reaches this tunnel gets nothing.
  - service: http_status:404
"@ | Set-Content -Path $configPath -Encoding ASCII
Write-Host "Wrote $configPath"

# --------------------------------------------------------------- service --

$svc = Get-Service -Name 'cloudflared' -ErrorAction SilentlyContinue
if (-not $svc) {
    Write-Host "Installing cloudflared as a Windows service (starts at boot)..."
    & $cf service install
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Service install failed. This usually means the shell is not elevated -- re-run this script as Administrator."
        throw "Could not install the cloudflared service."
    }
    Start-Sleep -Seconds 3
}

# The service runs as LocalSystem, which reads its configuration from its own
# profile and not from yours. Without this copy the service starts, reports
# Running, and does absolutely nothing -- the tunnel shows no connections and
# the hostname times out, with no error anywhere to explain why.
$systemConfigDir = 'C:\Windows\System32\config\systemprofile\.cloudflared'
Write-Host "Copying the tunnel config into the service's own profile..."
New-Item -ItemType Directory -Path $systemConfigDir -Force | Out-Null
Copy-Item $credentials -Destination $systemConfigDir -Force
$systemCredentials = Join-Path $systemConfigDir (Split-Path $credentials -Leaf)
(Get-Content $configPath) -replace [regex]::Escape($credentials), $systemCredentials |
    Set-Content -Path (Join-Path $systemConfigDir 'config.yml') -Encoding ASCII

Restart-Service -Name 'cloudflared'
Start-Sleep -Seconds 5

# A running service is not the same as a connected tunnel. Check the tunnel.
$info = & $cf tunnel info $TunnelName 2>&1 | Out-String
if ($info -match 'does not have any active connection') {
    Write-Warning "The service is running but the tunnel has no connections. Check $systemConfigDir\config.yml"
} else {
    Write-Host "Tunnel has active connections." -ForegroundColor Green
}

# ----------------------------------------------------------------- check --

Write-Host "`nWaiting for DNS to appear..." -ForegroundColor Cyan
$resolvers = @(
    @{ Name = 'Google';     Url = "https://dns.google/resolve?name=$Hostname&type=A"; Headers = @{} },
    @{ Name = 'Cloudflare'; Url = "https://cloudflare-dns.com/dns-query?name=$Hostname&type=A"; Headers = @{ accept = 'application/dns-json' } }
)

for ($i = 1; $i -le 12; $i++) {
    $seen = @()
    foreach ($r in $resolvers) {
        try {
            $ans = Invoke-RestMethod -Uri $r.Url -Headers $r.Headers -TimeoutSec 15
            if ($ans.Answer) { $seen += $r.Name }
        } catch { }
    }
    if ($seen.Count -eq $resolvers.Count) { Write-Host "Resolves on: $($seen -join ', ')" -ForegroundColor Green; break }
    Write-Host "  attempt ${i}: resolving on $(if ($seen) { $seen -join ', ' } else { 'none yet' })"
    Start-Sleep -Seconds 10
}

Write-Host "`nChecking the relay through the tunnel..." -ForegroundColor Cyan
$ok = $false
for ($i = 1; $i -le 6; $i++) {
    try {
        $h = Invoke-WebRequest -Uri "https://$Hostname/health" -TimeoutSec 20 -UseBasicParsing
        Write-Host "  $($h.Content)" -ForegroundColor Green
        $ok = $true
        break
    } catch {
        Write-Host "  attempt ${i}: $($_.Exception.Message)"
        Start-Sleep -Seconds 10
    }
}

if (-not $ok) {
    Write-Warning "The hostname is not answering yet. DNS can take a few minutes. Check the relay is running (curl http://127.0.0.1:$Port/health) and the service state with: Get-Service cloudflared"
}

Write-Host @"

Next:
  1. On Vercel, set RELAY_URL to   https://$Hostname
     and redeploy.
  2. Once the site works, close the old way in:
     tailscale funnel --https=443 off

The relay itself is unchanged -- it still listens on 127.0.0.1:$Port and is
still started by the CodifyLabs-CameraRelay scheduled task.
"@ -ForegroundColor Green
