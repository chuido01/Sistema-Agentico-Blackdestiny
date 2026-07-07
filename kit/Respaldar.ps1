<#
.SYNOPSIS
  Respaldo estandar del Sistema Agentico Blackdestiny: snapshot AAAA-MM-DD_vN + MANIFEST.sha256 + MOTIVO.md.

.DESCRIPTION
  Automatiza la politica de respaldos estandar de la flota (destilada de la mejor practica de
  un proyecto real de la casa, estandarizada el 2026-07-03):

    1. CUANDO: al promover un estable de 02-Desarrollo a 01-Produccion (snapshot de lo que se
       reemplaza y/o de lo promovido) y ANTES de retirar documentacion del arbol (poda Regla 3).
    2. NOMENCLATURA: 03-Backups\AAAA-MM-DD_vN\  (el _vN es obligatorio: dos respaldos el mismo
       dia no se pisan; N se auto-incrementa).
    3. INTEGRIDAD: MANIFEST.sha256 con el hash de cada archivo; el script re-verifica la copia
       contra el origen y reporta FIEL / NO-FIEL.
    4. MOTIVO: MOTIVO.md registra que se respaldo, por que, desde donde y cuando.
    5. RETENCION: conservar al menos los ultimos 3 + el de cada estable publicado; el historial
       de git es el ledger de largo plazo. Este script NO purga (la purga es decision humana).

  El script vive en <raiz-del-proyecto>\03-Backups\Respaldar.ps1 (lo siembra el Kit). La raiz del
  proyecto se autodetecta desde su propia ubicacion.

.PARAMETER Origen
  Ruta de lo que se respalda (carpeta o archivo). Relativa a la raiz del proyecto o absoluta.
.PARAMETER Motivo
  Por que se toma este respaldo (obligatorio; queda en MOTIVO.md).
.PARAMETER Subcarpeta
  Agrupador opcional dentro de 03-Backups (p.ej. el nombre del producto/norma): 03-Backups\<Subcarpeta>\AAAA-MM-DD_vN\.
.PARAMETER Externo
  Deposita el snapshot FUERA del repo (C:\Users\Negocios\Blackdestiny-Backups\<proyecto>\...) y deja
  en 03-Backups solo el manifiesto. Para snapshots pesados o el regimen del CDM (pesados fuera del repo).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File "03-Backups\Respaldar.ps1" -Origen "02-Desarrollo\MiApp" -Motivo "Promocion v3 a Produccion"
.EXAMPLE
  powershell -ExecutionPolicy Bypass -File "03-Backups\Respaldar.ps1" -Origen "00-Documentacion\Legados" -Motivo "Poda documental (Regla 3)" -Externo
#>
param(
  [Parameter(Mandatory = $true)][string]$Origen,
  [Parameter(Mandatory = $true)][string]$Motivo,
  [string]$Subcarpeta = "",
  [switch]$Externo
)

$ErrorActionPreference = "Stop"
$backupsDir = Split-Path -Parent $PSCommandPath          # ...\03-Backups
$raiz       = Split-Path -Parent $backupsDir             # raiz del proyecto
$proyecto   = Split-Path -Leaf $raiz

# --- Resolver el origen (relativo a la raiz o absoluto) ---
$origenPath = if ([System.IO.Path]::IsPathRooted($Origen)) { $Origen } else { Join-Path $raiz $Origen }
if (-not (Test-Path -LiteralPath $origenPath)) { throw "Origen no existe: $origenPath" }
$origenItem = Get-Item -LiteralPath $origenPath
$nombreOrigen = $origenItem.Name

# --- Resolver el destino base (interno u externo) ---
$manifiestosBase = if ($Subcarpeta) { Join-Path $backupsDir $Subcarpeta } else { $backupsDir }
if ($Externo) {
  $externoRoot = "C:\Users\Negocios\Blackdestiny-Backups"
  $snapshotBase = Join-Path (Join-Path $externoRoot $proyecto) $(if ($Subcarpeta) { $Subcarpeta } else { "" })
} else {
  $snapshotBase = $manifiestosBase
}

# --- Nombre AAAA-MM-DD_vN con auto-incremento (contra el destino del snapshot) ---
$hoy = Get-Date -Format "yyyy-MM-dd"
$n = 1
if (Test-Path -LiteralPath $snapshotBase) {
  $existentes = Get-ChildItem -LiteralPath $snapshotBase -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match ('^' + [regex]::Escape($hoy) + '_v\d+$') } |
    ForEach-Object { [int]([regex]::Match($_.Name, '_v(\d+)$').Groups[1].Value) }
  if ($existentes) { $n = (($existentes | Measure-Object -Maximum).Maximum) + 1 }
}
$carpetaVersion = "{0}_v{1}" -f $hoy, $n
$snapshotDir = Join-Path (Join-Path $snapshotBase $carpetaVersion) $nombreOrigen

# --- Copiar ---
New-Item -ItemType Directory -Force -Path $snapshotDir | Out-Null
if ($origenItem.PSIsContainer) {
  Copy-Item -LiteralPath $origenPath -Destination (Split-Path -Parent $snapshotDir) -Recurse -Force
} else {
  Copy-Item -LiteralPath $origenPath -Destination $snapshotDir -Force
}

# --- MANIFEST.sha256 + verificacion de fidelidad ---
$versionDir = Join-Path $snapshotBase $carpetaVersion
$archivos = Get-ChildItem -LiteralPath $snapshotDir -Recurse -File
$manifest = foreach ($f in $archivos) {
  $rel = $f.FullName.Substring($versionDir.Length).TrimStart('\')
  $h = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash
  "{0}  {1}" -f $h, $rel
}
$fiel = $true
foreach ($f in $archivos) {
  $relAlOrigen = $f.FullName.Substring($snapshotDir.Length).TrimStart('\')
  $orig = if ($origenItem.PSIsContainer) { Join-Path $origenPath $relAlOrigen } else { $origenPath }
  if ((Get-FileHash -LiteralPath $orig -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash) { $fiel = $false }
}
$manifest | Set-Content -LiteralPath (Join-Path $versionDir "MANIFEST.sha256") -Encoding UTF8

# --- MOTIVO.md (si el snapshot es externo, el manifiesto-espejo queda ADEMAS en 03-Backups) ---
$motivoTexto = @(
  "# Respaldo $carpetaVersion - $nombreOrigen"
  ""
  "- **Fecha:** $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  "- **Origen:** ``$origenPath``"
  "- **Motivo:** $Motivo"
  "- **Snapshot:** ``$versionDir`` $(if ($Externo) { '(EXTERNO, fuera del repo)' })"
  "- **Archivos:** $($archivos.Count) - integridad $(if ($fiel) { 'FIEL (sha256 verificado contra el origen)' } else { 'NO-FIEL (REVISAR)' })"
  "- **Generado por:** Respaldar.ps1 (politica estandar 2026-07-03)"
) -join "`n"
$motivoTexto | Set-Content -LiteralPath (Join-Path $versionDir "MOTIVO.md") -Encoding UTF8
if ($Externo) {
  New-Item -ItemType Directory -Force -Path (Join-Path $manifiestosBase $carpetaVersion) | Out-Null
  $motivoTexto | Set-Content -LiteralPath (Join-Path (Join-Path $manifiestosBase $carpetaVersion) "MOTIVO.md") -Encoding UTF8
  $manifest    | Set-Content -LiteralPath (Join-Path (Join-Path $manifiestosBase $carpetaVersion) "MANIFEST.sha256") -Encoding UTF8
}

Write-Host ""
Write-Host "=== RESPALDO $carpetaVersion ==="
Write-Host (" Origen  : {0}" -f $origenPath)
Write-Host (" Snapshot: {0}" -f $versionDir)
Write-Host (" Archivos: {0} | Integridad: {1}" -f $archivos.Count, $(if ($fiel) { "FIEL" } else { "NO-FIEL (REVISAR)" }))
Write-Host " Retencion: conservar ultimos 3 + estables publicados; purga = decision humana (git es el ledger)."
Write-Host ""
if (-not $fiel) { exit 1 }
