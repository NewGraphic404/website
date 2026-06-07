Add-Type -AssemblyName System.Drawing

$sourceDir = "G:\job\website\assets\featured-clients"
$outputDir = "G:\job\website\assets\featured-clients-compressed"

$files = Get-ChildItem $sourceDir -Recurse -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }
$total = $files.Count
$done = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($sourceDir.Length)
    $destPath = $outputDir + $relativePath
    $destFolder = Split-Path $destPath -Parent

    if (!(Test-Path $destFolder)) {
        New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
    }

    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $maxW = 1200
        $w = $img.Width
        $h = $img.Height

        if ($w -gt $maxW) {
            $newH = [int]($h * $maxW / $w)
            $bmp = New-Object System.Drawing.Bitmap($maxW, $newH)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, $maxW, $newH)
            $g.Dispose()
            $img.Dispose()
            $img = $bmp
        }

        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)

        $jpgPath = [System.IO.Path]::ChangeExtension($destPath, ".jpg")
        $img.Save($jpgPath, $encoder, $params)
        $img.Dispose()
        $done++
        Write-Host "[$done/$total] $($file.Name)"
    } catch {
        Write-Host "ERROR: $($file.Name) - $_"
        $done++
    }
}

$newSize = (Get-ChildItem $outputDir -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host ""
Write-Host "Done! $done files"
Write-Host "New size: $([math]::Round($newSize, 1)) MB (was 757 MB)"
