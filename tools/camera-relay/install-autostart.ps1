<#
.SYNOPSIS
  Keeps the camera relay (and optionally its tunnel) running by themselves.

.DESCRIPTION
  Registers scheduled tasks that start at logon and are re-checked every five
  minutes:

    CodifyLabs-CameraRelay   the Python relay that reads the camera
    CodifyLabs-CameraTunnel  the tunnel that gives it a public address

  The five-minute re-check matters. The relay died once at 2:43 AM with exit
  code 0xC000013A, which Windows does not count as a failure, so the task's
  restart-on-failure rule never fired and the feed was down for hours with
  nothing to say so. Each task's launcher checks whether the thing is already
  running and exits quietly if it is, so the repeat only ever revives a dead
  one.

  Both tasks run as you, not as LocalSystem, and need no elevation.

.PARAMETER Token
  Access token for the relay. Must match RELAY_TOKEN in the Vercel project.
  Required unless -TunnelOnly is given.

.PARAMETER TunnelOnly
  Only (re)register the tunnel task, leaving the relay task alone. Used by
  setup-cloudflare-tunnel.ps1, which has no business touching the relay's
  token.

.PARAMETER TunnelCommand
  Full path to the tunnel executable, e.g. cloudflared.exe.

.PARAMETER TunnelArgs
  Arguments for it, e.g. 'tunnel run camera-relay'.

.EXAMPLE
  # Relay only -- for Tailscale Funnel, which needs no process of its own.
  .\install-autostart.ps1 -Token 'a-long-random-token'

.EXAMPLE
  # Relay and a cloudflared tunnel.
  .\install-autostart.ps1 -Token 'a-long-random-token' `
      -TunnelCommand 'C:\Program Files (x86)\cloudflared\cloudflared.exe' `
      -TunnelArgs 'tunnel run camera-relay'

.EXAMPLE
  .\install-autostart.ps1 -Uninstall
#>
[CmdletBinding()]
param(
    [string]$Token,
    [switch]$TunnelOnly,
    [string]$TunnelCommand,
    [string]$TunnelArgs,
    [int]$Port = 8477,
    [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'

$relayTask  = 'CodifyLabs-CameraRelay'
$tunnelTask = 'CodifyLabs-CameraTunnel'
$logDir     = Join-Path $env:LOCALAPPDATA 'CodifyLabs'
$relayPath  = Join-Path $PSScriptRoot 'relay.py'

function Remove-TaskIfPresent($name) {
    if (Get-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue) {
        Unregister-ScheduledTask -TaskName $name -Confirm:$false
        Write-Host "Removed $name"
    }
}

if ($Uninstall) {
    Remove-TaskIfPresent $relayTask
    Remove-TaskIfPresent $tunnelTask
    Write-Host "`nDone. Nothing starts automatically any more." -ForegroundColor Green
    return
}

if (-not $TunnelOnly) {
    if (-not $Token)          { throw "-Token is required. Use a long random string; it must match RELAY_TOKEN on Vercel." }
    if ($Token.Length -lt 16) { throw "That token is too short. Once the relay is reachable from the internet the token is the only thing protecting the camera -- use at least 16 characters." }
    if (-not (Test-Path $relayPath)) { throw "relay.py not found next to this script: $relayPath" }
}
if ($TunnelCommand -and -not (Test-Path $TunnelCommand)) {
    throw "Tunnel program not found: $TunnelCommand"
}
if ($TunnelOnly -and -not $TunnelCommand) {
    throw "-TunnelOnly needs -TunnelCommand."
}

New-Item -ItemType Directory -Path $logDir -Force | Out-Null

# Start at logon, then re-check every five minutes forever. IgnoreNew stops a
# re-check piling up behind a slow start.
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit ([TimeSpan]::Zero)
$atLogon = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$every5 = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
    -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 3650)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType Interactive -RunLevel Limited

function Register-Watchdog($name, $script, $description) {
    Remove-TaskIfPresent $name
    $action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c `"$script`""
    Register-ScheduledTask -TaskName $name -Action $action -Trigger @($atLogon, $every5) `
        -Settings $settings -Principal $principal -Description $description | Out-Null
    Write-Host "Registered $name"
}

$installed = @()

if (-not $TunnelOnly) {
    $python = (Get-Command python -ErrorAction SilentlyContinue).Source
    if (-not $python) { throw "python was not found on PATH." }

    # The guard is what keeps the five-minute re-check harmless: if the port is
    # already being listened on, the relay is alive and this exits quietly.
    $relayLauncher = Join-Path $logDir 'start-relay.cmd'
    @"
@echo off
rem Already listening? Then the relay is alive; leave it alone.
netstat -ano | findstr ":$Port" | findstr LISTENING >nul && exit /b 0
"$python" -u "$relayPath" --port $Port --token "$Token" >> "$logDir\relay.log" 2>&1
"@ | Set-Content -Path $relayLauncher -Encoding ASCII

    Register-Watchdog $relayTask $relayLauncher 'Reads the camera and republishes it as MJPEG.'
    $installed += $relayTask
}

if ($TunnelCommand) {
    $exeName = Split-Path $TunnelCommand -Leaf
    $tunnelLauncher = Join-Path $logDir 'start-tunnel.cmd'
    @"
@echo off
rem Already running? Then leave it alone.
tasklist /FI "IMAGENAME eq $exeName" | findstr /I $exeName >nul && exit /b 0
"$TunnelCommand" $TunnelArgs >> "$logDir\tunnel.log" 2>&1
"@ | Set-Content -Path $tunnelLauncher -Encoding ASCII

    Register-Watchdog $tunnelTask $tunnelLauncher 'Public address for the camera relay.'
    $installed += $tunnelTask
}

Write-Host "`nStarting..." -ForegroundColor Cyan
foreach ($name in $installed) { Start-ScheduledTask -TaskName $name; Start-Sleep -Seconds 3 }

if (-not $TunnelOnly) {
    Start-Sleep -Seconds 3
    try {
        $health = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/health" -TimeoutSec 10 -UseBasicParsing
        Write-Host "Relay is answering: $($health.Content)" -ForegroundColor Green
    } catch {
        Write-Warning "Relay is not answering yet. Check $logDir\relay.log"
    }
}

$list = $installed -join ', '
Write-Host @"

Done. These start at logon and are re-checked every five minutes:

  $list

  Logs:      $logDir
  Stop now:  Stop-ScheduledTask -TaskName $list
  Remove:    .\install-autostart.ps1 -Uninstall

"@ -ForegroundColor Green

if (-not $TunnelOnly) {
    Write-Host "Set RELAY_TOKEN on Vercel to the token you passed here, or the website cannot open the camera.`n" -ForegroundColor Green
}
