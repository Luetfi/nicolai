<#
.SYNOPSIS
    Deployt den Frontend-Build (/dist) zur Strato-Webspace per WinSCP.

.DESCRIPTION
    Liest Zugangsdaten aus .env (im Repo-Root, gitignored).
    Excludes: /admin, /data, /images/team — diese werden im Admin-Bereich verwaltet
    und dürfen NIEMALS vom Deploy überschrieben werden.

.PARAMETER Initial
    First-time deploy: lädt zusätzlich /admin und /data hoch.
    Nur einmal beim allerersten Deployment verwenden.

.EXAMPLE
    ./scripts/deploy.ps1            # Regulärer Deploy (Frontend-Update)
    ./scripts/deploy.ps1 -Initial   # Erste Einrichtung
#>

param(
    [switch]$Initial,
    [switch]$SkipBuild,
    [string]$WinSCPPath = ""
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $RepoRoot

Write-Host "==> Fahrschule Nicolai · Strato Deploy" -ForegroundColor Yellow
Write-Host "    Repo: $RepoRoot"
Write-Host ""

# --- 1. .env laden ---------------------------------------------------------
$envFile = Join-Path $RepoRoot ".env"
if (-not (Test-Path $envFile)) {
    throw "Datei .env fehlt. Bitte .env.example kopieren und Zugangsdaten eintragen."
}

$envValues = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*#') { return }
    if ($_ -match '^\s*$') { return }
    if ($_ -match '^\s*([A-Z_]+)\s*=\s*(.*)$') {
        $envValues[$Matches[1]] = $Matches[2].Trim('"', "'")
    }
}

foreach ($key in @("STRATO_HOST", "STRATO_USER", "STRATO_PASS", "STRATO_REMOTE_PATH")) {
    if (-not $envValues.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($envValues[$key])) {
        throw "Fehlende .env-Variable: $key"
    }
}

$Host_       = $envValues["STRATO_HOST"]
$User        = $envValues["STRATO_USER"]
$Pass        = $envValues["STRATO_PASS"]
$Port        = if ($envValues.ContainsKey("STRATO_PORT")) { $envValues["STRATO_PORT"] } else { "22" }
$Protocol    = if ($envValues.ContainsKey("STRATO_PROTOCOL")) { $envValues["STRATO_PROTOCOL"] } else { "sftp" }
$RemotePath  = $envValues["STRATO_REMOTE_PATH"]
if (-not $RemotePath.EndsWith("/")) { $RemotePath += "/" }

# --- 2. WinSCP Pfad finden -------------------------------------------------
if (-not $WinSCPPath -or -not (Test-Path $WinSCPPath)) {
    $candidates = @(
        "C:\Program Files (x86)\WinSCP\WinSCP.com",
        "C:\Program Files\WinSCP\WinSCP.com",
        "$env:LOCALAPPDATA\Programs\WinSCP\WinSCP.com"
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) { $WinSCPPath = $c; break }
    }
}
if (-not $WinSCPPath -or -not (Test-Path $WinSCPPath)) {
    throw "WinSCP.com nicht gefunden. Installation: https://winscp.net/  oder Pfad mit -WinSCPPath übergeben."
}
Write-Host "==> WinSCP: $WinSCPPath" -ForegroundColor Cyan

# --- 3. Build --------------------------------------------------------------
if (-not $SkipBuild) {
    Write-Host "==> Building React app (npm run build)..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Build fehlgeschlagen." }
}

$DistDir = Join-Path $RepoRoot "dist"
if (-not (Test-Path $DistDir)) { throw "/dist existiert nicht — wurde build ausgeführt?" }

# --- 4. WinSCP-Skript zusammenbauen ---------------------------------------
$tempScript = New-TemporaryFile
$tempScript = [System.IO.Path]::ChangeExtension($tempScript, ".txt")

$lines = @()
$openCmd = if ($Protocol -eq "sftp") {
    "open sftp://${User}:${Pass}@${Host_}:${Port} -hostkey=`"*`""
} else {
    "open ftp://${User}:${Pass}@${Host_}:${Port}"
}
$lines += "option batch abort"
$lines += "option confirm off"
$lines += $openCmd
$lines += "option transfer binary"

# Exclude-Muster: /admin, /data, /images/team — niemals überschreiben
# WinSCP synchronize verwendet -filemask zum Ausschluss
$excludes = "*/admin/; */data/; */images/team/; */images/team/*"
$lines += "synchronize remote -delete=off -filemask=`"|$excludes`" `"$DistDir`" `"$RemotePath`""

if ($Initial) {
    Write-Host "==> Initial deploy: lade /admin und /data zusätzlich hoch" -ForegroundColor Yellow
    $AdminDir = Join-Path $RepoRoot "admin"
    $PublicDataDir = Join-Path $RepoRoot "public\data"
    if (-not (Test-Path $AdminDir)) { throw "/admin fehlt im Repo." }
    if (-not (Test-Path $PublicDataDir)) { throw "/public/data fehlt im Repo." }

    $lines += "option transfer binary"
    $lines += "synchronize remote -delete=off `"$AdminDir`" `"${RemotePath}admin/`""
    $lines += "synchronize remote -delete=off `"$PublicDataDir`" `"${RemotePath}data/`""

    # Team-Bilder initial mit hochladen
    $TeamImagesDir = Join-Path $RepoRoot "public\images\team"
    if (Test-Path $TeamImagesDir) {
        $lines += "synchronize remote -delete=off `"$TeamImagesDir`" `"${RemotePath}images/team/`""
    }
}

$lines += "close"
$lines += "exit"

$lines | Out-File -FilePath $tempScript -Encoding utf8

# --- 5. Ausführen ----------------------------------------------------------
Write-Host "==> Uploading nach $Host_..." -ForegroundColor Cyan
& $WinSCPPath /script="$tempScript" /loglevel=1
$exit = $LASTEXITCODE
Remove-Item $tempScript -ErrorAction SilentlyContinue

if ($exit -ne 0) {
    throw "Deploy fehlgeschlagen (WinSCP exit code $exit)."
}

Write-Host ""
Write-Host "==> Deploy erfolgreich." -ForegroundColor Green
if ($Initial) {
    Write-Host ""
    Write-Host "NÄCHSTE SCHRITTE:" -ForegroundColor Yellow
    Write-Host "  1. Im Browser https://<deine-domain>/admin/setup.php aufrufen"
    Write-Host "  2. Passwort vergeben"
    Write-Host "  3. Per FTP die Datei /admin/setup.php LÖSCHEN"
    Write-Host "  4. Per FTP die Datei /admin/includes/config.php auf 0600 setzen (chmod)"
    Write-Host ""
}
