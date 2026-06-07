Add-Type -AssemblyName System.Drawing

$newClients = @('AES','ALHAMOOR DEVELOPMENTS','ALSEMARY','ALSHAMER','ARTEC','ASB','BANI','BEKO','BERLA','BNI','BR Developments','DENIM HOUSE','Egyptalia','EL DAWLIA','EL RASHAIDY','ELBADIR','eljyoostore','Elmadina Press','ELSHERHAWY REAL ESTATE','ELSMENAWY ESTATE','erabully','Etab-eti','FUTURE','FUTURE SMART HOME','German Saudi Investments','GMSD','Green Smith','HAALICI','HEC','Hefny Store','KEWAN','M&K','M2','MAJESTIC GARMENTS Co','MEGA MALL','MESHO STORE','Mesnap Elsheikh Development','MIDG','Mohamed Dancy','MSD','NETO','Noura Atelier','Novo pack','OPA','PREMIER','Prime Pack','PROMISE MALL','QURTUBA DEVELOPMENTS','RAGAEZ','RAGO','RAKAEZ','RIVARI','SAFETY FIRST COMPANY','Saykna','SDG','SENTRO','SIMPLE ART','STAR GROUP','STAR WEALTH DEVELOPMENT','SYMMETRY','SYSTEM','VALENZA DEVELOPMENT','YADA EGYPT','ZELAL-ALSHAM','رواسي & الغنيمي','سنترو الملاحة')

$sourceBase = "G:\job\website\assets\featured-clients"
$thumbBase  = "G:\job\website\assets\featured-clients-thumbs"
$compBase   = "G:\job\website\assets\featured-clients-compressed"

$done = 0
$total = 0

foreach ($client in $newClients) {
    $srcDir   = Join-Path $sourceBase $client
    $thumbDir = Join-Path $thumbBase  $client
    $compDir  = Join-Path $compBase   $client

    if (!(Test-Path $srcDir)) { continue }

    $files = Get-ChildItem $srcDir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }
    $total += $files.Count

    if (!(Test-Path $thumbDir)) { New-Item -ItemType Directory -Path $thumbDir -Force | Out-Null }
    if (!(Test-Path $compDir))  { New-Item -ItemType Directory -Path $compDir  -Force | Out-Null }

    foreach ($file in $files) {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

            # Thumbnail (400px)
            $maxW = 400
            $w = $img.Width; $h = $img.Height
            $newH = if ($w -gt $maxW) { [int]($h * $maxW / $w) } else { $h }
            $newW = if ($w -gt $maxW) { $maxW } else { $w }
            $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $newW, $newH)
            $g.Dispose()
            $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 70L)
            $thumbPath = Join-Path $thumbDir ([System.IO.Path]::ChangeExtension($file.Name, ".jpg"))
            $bmp.Save($thumbPath, $encoder, $params)
            $bmp.Dispose()

            # Compressed (1200px)
            $img2 = [System.Drawing.Image]::FromFile($file.FullName)
            $maxW2 = 1200
            $w2 = $img2.Width; $h2 = $img2.Height
            $newH2 = if ($w2 -gt $maxW2) { [int]($h2 * $maxW2 / $w2) } else { $h2 }
            $newW2 = if ($w2 -gt $maxW2) { $maxW2 } else { $w2 }
            $bmp2 = New-Object System.Drawing.Bitmap($newW2, $newH2)
            $g2 = [System.Drawing.Graphics]::FromImage($bmp2)
            $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g2.DrawImage($img2, 0, 0, $newW2, $newH2)
            $g2.Dispose()
            $params2 = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $params2.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)
            $compPath = Join-Path $compDir ([System.IO.Path]::ChangeExtension($file.Name, ".jpg"))
            $bmp2.Save($compPath, $encoder, $params2)
            $bmp2.Dispose()
            $img2.Dispose()
            $img.Dispose()
            $done++
        } catch {
            Write-Host "ERROR: $($file.Name)"
        }
    }
    Write-Host "Done: $client"
}

Write-Host "Total: $done / $total files processed"
