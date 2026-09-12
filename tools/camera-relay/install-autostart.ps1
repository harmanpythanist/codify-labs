<#
.SYNOPSIS
  Makes the camera relay and its tunnel start automatically when you log in.

.DESCRIPTION
  Registers two Scheduled Tasks that run hidden at logon:

    CodifyLabs-CameraRelay   the Python relay that reads the camera
    CodifyLabs-CameraTunnel  the tunnel that gives it a public address

  After this, a fresh boot needs nothing from you: log in, and the feed is
  live. Logs go to %LOCALAPPDATA%\CodifyLabs\.

  The relay token is fixed here rather than generated, because the website's
  server needs to know it in advance. Keep it long, and treat it as a password.

.PARAMETER Token
  The relay access token. Must match RELAY_TOKEN in the Vercel project.

.PARAMETER TunnelCommand
  Full path to the tunnel executable, e.g. tailscale.exe or cloudflared.exe.

.PARAMETER TunnelArgs
  Arguments for it. For Tailscale Funnel:  funnel 8477
  For a cloudflared named tunnel:          tunnel run --url http://127.0.0.1:8477 my-tunnel

.EXAMPLE
  .\install-autostart.ps1 -Token 'a-long-random-token' `
      -TunnelCommand 'C:\Program Files\Tailscale\tailscale.exe' `
      -TunnelArgs 'funnel 8477'

.EXAMPLE
  # Remove both tasks again
  .\install-autostart.ps1 -Uninstall
#>
[CmdletBinding()]
param(
    [string]$Token,
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

if (-not $Token)         { throw "-Token is required. Use a long random string; it must match RELAY_TOKEN on Vercel." }
if ($Token.Length -lt 16) { throw "That token is too short. Once the relay is on the internet the token is the only thing protecting the camera -- use at least 16 characters." }
if (-not $TunnelCommand) { throw "-TunnelCommand is required (path to tailscale.exe or cloudflared.exe)." }
if (-not (Test-Path $TunnelCommand)) { throw "Tunnel program not found: $TunnelCommand" }
if (-not (Test-Path $relayPath))     { throw "relay.py not found next to this script: $relayPath" }

$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) { throw "python was not found on PATH." }

New-Item -ItemType Directory -Path $logDir -Force | Out-Null

# A tiny launcher per service, so stdout and stderr land in a log file and the
# console window never appears.
$relayLauncher = Join-Path $logDir 'start-relay.cmd'
@"
@echo off
"$python" -u "$relayPath" --port $Port --token "$Token" >> "$logDir\relay.log" 2>&1
"@ | Set-Content -Path $relayLauncher -Encoding ASCII

$tunnelLauncher = Join-Path $logDir 'start-tunnel.cmd'
@"
@echo off
"$TunnelCommand" $TunnelArgs >> "$logDir\tunnel.log" 2>&1
"@ | Set-Content -Path $tunnelLauncher -Encoding ASCII

Remove-TaskIfPresent $relayTask
Remove-TaskIfPresent $tunnelTask

# Restart on failure: a camera that drops overnight should come back by itself.
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries -StartWhenAvailable `
    -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit ([TimeSpan]::Zero)
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited

foreach ($t in @(
    @{ Name = $relayTask;  Script = $relayLauncher;  Desc = 'Reads the camera and republishes it as MJPEG.' },
    @{ Name = $tunnelTask; Script = $tunnelLauncher; Desc = 'Gives the camera relay a public address.' }
)) {
    $action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c `"$($t.Script)`""
    Register-ScheduledTask -TaskName $t.Name -Action $action -Trigger $trigger `
        -Settings $settings -Principal $principal -Description $t.Desc | Out-Null
    Write-Host "Registered $($t.Name)"
}

Write-Host "`nStarting both now..." -ForegroundColor Cyan
Start-ScheduledTask -TaskName $relayTask
Start-Sleep -Seconds 3
Start-ScheduledTask -TaskName $tunnelTask
Start-Sleep -Seconds 5

try {
    $health = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/health" -TimeoutSec 10 -UseBasicParsing
    Write-Host "Relay is answering: $($health.Content)" -ForegroundColor Green
} catch {
    Write-Warning "Relay is not answering yet. Check $logDir\relay.log"
}

Write-Host @"

Done. Both start automatically at logon from now on.

  Logs:      $logDir
  Stop now:  Stop-ScheduledTask -TaskName $relayTask, $tunnelTask
  Remove:    .\install-autostart.ps1 -Uninstall

Set RELAY_TOKEN on Vercel to the token you passed here, or the website will
not be able to open the camera.
"@ -ForegroundColor Green
