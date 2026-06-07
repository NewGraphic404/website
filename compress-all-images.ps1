# ============================================
# Compress ALL Images - No Exceptions!
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Compressing ALL Images" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load .NET
Add-Type -AssemblyName System.Drawing

# Config
$quality = 85L
$maxWidth = 2000
$maxHeight = 2000

# Get ALL images
Write-Host "Scanning..." -ForegroundColor Yellow
$images = Get-ChildItem -Path "assets" -Recurse -File -Include *.jpg,*.jpeg,*.png

$currentSize = ($images | Measure-Object -Property Length -Sum).Sum
Write-Host "Found: $($images.Count) images" -ForegroundColor Green
Write-Host "Size: $([math]::Round($currentSize / 1GB, 2)) GB" -ForegroundColor Cyan
Write-Host ""

# Find large images
$largeImages = $images | Where-Object { $_.Length -gt 1MB }
Write-Host "Large images (>1MB): $($largeImages.Count)" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "Compress ALL images? (yes/no)"
if ($confirmation -ne "yes" -and $confirmation -ne "y") {
    exit
}

Write-Host ""
Write-Host "Compressing..." -ForegroundColor Yellow

$compressed = 0
$totalSaved = 0

foreach ($image in $images) {
    try {
        $originalSize = $image.Length
        
        # Skip if already small
        if ($originalSize -lt 100KB) {
            continue
        }
        
        # Load image
        $img = [System.Drawing.Image]::FromFile($image.FullName)
        
        # Calculate new size
        $ratioX = $maxWidth / $img.Width
        $ratioY = $maxHeight / $img.Height
        $ratio = [Math]::Min($ratioX, $ratioY)
        
        if ($ratio -ge 1) { $ratio = 1 }
        
        $newWidth = [int]($img.Width * $ratio)
        $newHeight = [int]($img.Height * $ratio)
        
        # Create new image
        $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        # Save as JPEG
        $tempFile = "$($image.FullName).tmp.jpg"
        
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        
        $newImg.Save($tempFile, $jpegCodec, $encoderParams)
        
        # Cleanup
        $graphics.Dispose()
        $newImg.Dispose()
        $img.Dispose()
        
        # Check if smaller
        if (Test-Path $tempFile) {
            $newSize = (Get-Item $tempFile).Length
            
            if ($newSize -lt $originalSize) {
                # Replace original
                Remove-Item $image.FullName -Force
                
                # Rename to original name (keep extension)
                if ($image.Extension -eq ".png") {
                    $newName = $image.FullName -replace "\.png$", ".jpg"
                    Move-Item $tempFile $newName -Force
                } else {
                    Move-Item $tempFile $image.FullName -Force
                }
                
                $saved = $originalSize - $newSize
                $totalSaved += $saved
                $compressed++
                
                if ($compressed % 100 -eq 0) {
                    $savedMB = [math]::Round($totalSaved / 1MB, 2)
                    Write-Host "  $compressed images | Saved: $savedMB MB" -ForegroundColor Gray
                }
            } else {
                Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
            }
        }
    }
    catch {
        Write-Host "  Failed: $($image.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Done!" -ForegroundColor Green
$compressedCount = $compressed
$savedGB = [math]::Round($totalSaved / 1GB, 2)
Write-Host "  Compressed: $compressedCount images" -ForegroundColor Green
Write-Host "  Saved: $savedGB GB" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Final size
$newImages = Get-ChildItem -Path "assets" -Recurse -File -Include *.jpg,*.jpeg,*.png
$newSize = ($newImages | Measure-Object -Property Length -Sum).Sum

$beforeGB = [math]::Round($currentSize / 1GB, 2)
$afterGB = [math]::Round($newSize / 1GB, 2)
$savedPercent = [math]::Round((($currentSize - $newSize) / $currentSize) * 100, 1)

Write-Host "Before: $beforeGB GB" -ForegroundColor Cyan
Write-Host "After:  $afterGB GB" -ForegroundColor Cyan
Write-Host "Saved:  $savedPercent%" -ForegroundColor Green
Write-Host ""
