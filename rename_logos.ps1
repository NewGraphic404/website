$dir = "G:\job\website\assets\client-logos"
$base = "Minimalist Kitchen Collection Promo - Facebook Post_page-"

# English names only - Arabic ones handled separately
$map = @{
    "0001" = "Emarrak.jpg"
    "0002" = "SOLD DEVELOPMENTS.jpg"
    "0003" = "HAWA BAY NEW DAMIETTA.jpg"
    "0004" = "ADG Master Development Group.jpg"
    "0006" = "MAKANAK DEVELOPMENT.jpg"
    "0007" = "NMAA.jpg"
    "0008" = "ZAWAYA DEVELOPMENTS.jpg"
    "0009" = "AUD.jpg"
    "0010" = "Crave.jpg"
    "0011" = "VALENZA DEVELOPMENT.jpg"
    "0012" = "QURTUBA DEVELOPMENTS.jpg"
    "0013" = "OPA.jpg"
    "0014" = "KEWAN.jpg"
    "0015" = "MSD.jpg"
    "0016" = "ALHAMOOR DEVELOPMENTS.jpg"
    "0018" = "ALAMER.jpg"
    "0019" = "AL-MANARA.jpg"
    "0021" = "SYSTEM.jpg"
    "0022" = "MandK.jpg"
    "0023" = "SDG.jpg"
    "0024" = "German Saudi Investments.jpg"
    "0025" = "STAR WEALTH DEVELOPMENT.jpg"
    "0026" = "PROMISE MALL.jpg"
    "0027" = "RAGO.jpg"
    "0028" = "RIVARI.jpg"
    "0029" = "YADA EGYPT.jpg"
    "0030" = "FUTURE SMART HOME.jpg"
    "0031" = "MAJESTIC GARMENTS Co.jpg"
}

foreach ($num in $map.Keys) {
    $src = Join-Path $dir "$base$num.jpg"
    $dst = Join-Path $dir $map[$num]
    if (Test-Path $src) {
        Rename-Item $src $dst -Force
        Write-Host "OK: $num -> $($map[$num])"
    }
}

# Arabic names - rename by copy then delete
$arabic = @(
    @("0005", "berlsi.jpg"),
    @("0017", "amlak.jpg"),
    @("0020", "elmasria.jpg")
)
foreach ($item in $arabic) {
    $src = Join-Path $dir "$base$($item[0]).jpg"
    $dst = Join-Path $dir $item[1]
    if (Test-Path $src) {
        Rename-Item $src $dst -Force
        Write-Host "OK: $($item[0]) -> $($item[1])"
    }
}

# Fix M&K name
$mk = Join-Path $dir "MandK.jpg"
$mkDst = Join-Path $dir "M&K.jpg"
if (Test-Path $mk) { Rename-Item $mk $mkDst -Force; Write-Host "OK: M&K" }

Write-Host "Done!"
