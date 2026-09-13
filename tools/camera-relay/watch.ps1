<#
.SYNOPSIS
  Opens the camera feed in a browser, without the Labs page.

.DESCRIPTION
  A way to check the camera is working that skips the website's UI entirely.
  Useful when something is broken and you want to know which part.

  Two modes:

    -Local    talk to the relay on this machine only. Nothing leaves the
              house: no tunnel, no Cloudflare, no Vercel. If this works and
              the website does not, the problem is the internet link, not the
              camera. Needs the camera details, since only the website knows
              them otherwise.

    default   ask the live website for a session, exactly as a visitor's
              browser does, then open the video straight from the relay. This
              exercises the whole path end to end.

  The browser is opened immediately, because an unwatched session is released
  after 30 seconds.

.EXAMPLE
  .\watch.ps1 -Password 'the-labs-password'

.EXAMPLE
  .\watch.ps1 -Local -CameraIp 192.168.1.64 -CameraUser admin -CameraPassword 'secret'
#>
[CmdletBinding()]
param(
    [string]$Password,
    [switch]$Local,
    [string]$CameraIp,
    [string]$CameraUser = '',
    [string]$CameraPassword = '',
    [string]$Site = 'https://codifylabspk.com',
    [int]$Port = 8477,
    [ValidateSet('color', 'gray')][string]$Mode = 'color'
)

$ErrorActionPreference = 'Stop'

if ($Local) {
    if (-not $CameraIp) { throw "-Local needs -CameraIp (and usually -CameraUser / -CameraPassword)." }

    # The token is in the launcher the autostart installer wrote.
    $launcher = Join-Path $env:LOCALAPPDATA 'CodifyLabs\start-relay.cmd'
    if (-not (Test-Path $launcher)) { throw "Cannot find $launcher -- has install-autostart.ps1 been run?" }
    $token = ([regex]::Match((Get-Content $launcher -Raw), '--token "([^"]+)"')).Groups[1].Value
    if (-not $token) { throw "Could not read the relay token from $launcher" }

    $relay = "http://127.0.0.1:$Port"
    Write-Host "Asking the local relay for a session (nothing leaves this machine)..."
    $body = @{ ip = $CameraIp; username = $CameraUser; password = $CameraPassword } | ConvertTo-Json
    $res = Invoke-WebRequest -Uri "$relay/session" -Method POST -Body $body `
        -ContentType 'application/json' -Headers @{ 'X-Relay-Token' = $token } `
        -TimeoutSec 40 -UseBasicParsing
    $session = ($res.Content | ConvertFrom-Json)
} else {
    if (-not $Password) { throw "Give -Password (the Labs password), or use -Local with the camera details." }

    Write-Host "Asking $Site for a session, the same way a visitor's browser does..."
    try {
        $res = Invoke-WebRequest -Uri "$Site/api/labs/session" -Method POST `
            -Body (@{ password = $Password } | ConvertTo-Json) `
            -ContentType 'application/json' -TimeoutSec 60 -UseBasicParsing
    } catch {
        $body = ''
        try { $s = $_.Exception.Response.GetResponseStream(); $body = (New-Object System.IO.StreamReader($s)).ReadToEnd() } catch {}
        throw "The site would not start the camera: $body"
    }
    $session = ($res.Content | ConvertFrom-Json)
    $relay = $session.relayUrl
}

if (-not $session.id) { throw "No session was returned." }

$url = "$relay/stream/$($session.id)?mode=$Mode"
Write-Host "`nOpening:`n  $url`n"
Write-Host "The picture should appear within a few seconds. Close the tab to release the camera." -ForegroundColor Green
Start-Process $url
