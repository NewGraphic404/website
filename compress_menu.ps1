Add-Type -AssemblyName System.Drawing

$dirs = @("G:\job\جريل\grill-chill", "G:\job\جريل\website")
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)

foreach ($dir in $dirs) {
    Get-ChildItem $dir -Filter "p*.png" | ForEach-Object {
        $img = [System.Drawing.Image]::FromFile($_.FullName)
        $w = $img.Width; $h = $img.Height
        # Keep same dimensions, just convert to JPEG with quality 75
        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.DrawImage($img, 0, 0, $w, $h)
        $g.Dispose(); $img.Dispose()
        $outPath = [System.IO.Path]::ChangeExtension($_.FullName, ".jpg")
        $bmp.Save($outPath, $encoder, $params)
        $bmp.Dispose()
        $oldKB = [math]::Round($_.Length/1KB, 0)
        $newKB = [math]::Round((Get-Item $outPath).Length/1KB, 0)
        Write-Host "$($_.Name): ${oldKB}KB -> ${newKB}KB"
    }
}
Write-Host "Done!"
