# Simple image compression using .NET
Add-Type -AssemblyName System.Drawing

$categories = @("mockups", "outdoor", "exhibitions")
$quality = 75

foreach ($cat in $categories) {
    $source = "assets\social\$cat"
    $dest = "assets\social-compressed\$cat"
    
    if (-not (Test-Path $source)) { continue }
    
    $images = Get-ChildItem $source -Filter "*.jpg"
    $count = 0
    
    Write-Host "Processing $cat - $($images.Count) images..."
    
    foreach ($img in $images) {
        $count++
        $destFile = Join-Path $dest $img.Name
        
        try {
            $image = [System.Drawing.Image]::FromFile($img.FullName)
            
            # Resize if needed
            $maxSize = 1920
            $ratio = [Math]::Min($maxSize / $image.Width, $maxSize / $image.Height)
            if ($ratio -gt 1) { $ratio = 1 }
            
            $newW = [int]($image.Width * $ratio)
            $newH = [int]($image.Height * $ratio)
            
            $newImg = New-Object System.Drawing.Bitmap($newW, $newH)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = 'HighQualityBicubic'
            $g.DrawImage($image, 0, 0, $newW, $newH)
            
            # JPEG encoder
            $encoder = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoder.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            
            $newImg.Save($destFile, $codec, $encoder)
            
            $g.Dispose()
            $newImg.Dispose()
            $image.Dispose()
            
            if ($count % 20 -eq 0) {
                Write-Host "  $count / $($images.Count)"
            }
        }
        catch {
            Write-Host "Error on $($img.Name): $_"
        }
    }
    
    Write-Host "Done with $cat!"
}

Write-Host "All done!"
