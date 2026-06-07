Add-Type -AssemblyName System.Drawing

$src      = "G:\job\website\assets\clients\شركة البرلسي للتطوير العقاري"
$thumbDir = "G:\job\website\assets\featured-clients-thumbs\شركة البرلسي للتطوير العقاري"
$compDir  = "G:\job\website\assets\featured-clients-compressed\شركة البرلسي للتطوير العقاري"

New-Item -ItemType Directory -Path $thumbDir -Force | Out-Null
New-Item -ItemType Directory -Path $compDir  -Force | Out-Null

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

Get-ChildItem $src -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' } | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    foreach ($maxW in @(400, 1200)) {
        $dir = if ($maxW -eq 400) { $thumbDir } else { $compDir }
        $q   = if ($maxW -eq 400) { 70L } else { 75L }
        $w = $img.Width; $h = $img.Height
        $nw = [Math]::Min($w, $maxW)
        $nh = [int]($h * $nw / $w)
        $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $nw, $nh)
        $g.Dispose()
        $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $q)
        $outPath = Join-Path $dir ([System.IO.Path]::ChangeExtension($_.Name, ".jpg"))
        $bmp.Save($outPath, $encoder, $p)
        $bmp.Dispose()
    }
    $img.Dispose()
    Write-Host $_.Name
}
Write-Host "Done!"
