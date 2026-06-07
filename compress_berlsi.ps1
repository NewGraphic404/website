Add-Type -AssemblyName System.Drawing

$srcDir   = "G:\job\website\assets\featured-clients\شركة البرلسي للتطوير العقاري"
$compDir  = "G:\job\website\assets\featured-clients-compressed\شركة البرلسي للتطوير العقاري"
$thumbDir = "G:\job\website\assets\featured-clients-thumbs\شركة البرلسي للتطوير العقاري"

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$files = Get-ChildItem $srcDir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }

foreach ($file in $files) {
    foreach ($cfg in @(@{dir=$compDir; maxW=1200; q=75L}, @{dir=$thumbDir; maxW=400; q=70L})) {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            $w = $img.Width; $h = $img.Height
            $nw = [Math]::Min($w, $cfg.maxW)
            $nh = [int]($h * $nw / $w)
            $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $nw, $nh)
            $g.Dispose(); $img.Dispose()
            $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $cfg.q)
            $out = Join-Path $cfg.dir ([System.IO.Path]::ChangeExtension($file.Name, ".jpg"))
            $bmp.Save($out, $encoder, $p)
            $bmp.Dispose()
        } catch { Write-Host "ERROR: $($file.Name)" }
    }
    Write-Host "Done: $($file.Name)"
}

$sz = (Get-ChildItem $compDir -File | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "New compressed size: $([math]::Round($sz,1)) MB"
