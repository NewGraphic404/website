# Script to compress social images using Windows built-in tools
# This creates compressed versions of social images for faster loading

$sourceFolder = "assets\social"
$targetFolder = "assets\social-compressed"

# Create target folders
$categories = @("mockups", "outdoor", "exhibitions")
foreach ($cat in $categories) {
    $targetPath = Join-Path $targetFolder $cat
    if (-not (Test-Path $targetPath)) {
        New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
        Write-Host "Created folder: $targetPath"
    }
}

Write-Host "`nCompressing images using ImageMagick or Windows Photo API..."
Write-Host "Note: This requires ImageMagick to be installed."
Write-Host "If you don't have ImageMagick, you can:"
Write-Host "1. Install it: winget install ImageMagick.ImageMagick"
Write-Host "2. Or use an online tool to compress the images manually"
Write-Host "3. Or use Photoshop/GIMP to batch compress"
Write-Host "`nTarget: Compress images to ~100-200 KB each (quality 75-85%)"
Write-Host "`nPress Ctrl+C to cancel, or Enter to check for ImageMagick..."
Read-Host

# Check if ImageMagick is installed
$magickPath = Get-Command magick -ErrorAction SilentlyContinue

if ($magickPath) {
    Write-Host "`nImageMagick found! Starting compression..."
    
    foreach ($cat in $categories) {
        $sourcePath = Join-Path $sourceFolder $cat
        $targetPath = Join-Path $targetFolder $cat
        
        if (Test-Path $sourcePath) {
            $images = Get-ChildItem $sourcePath -File -Filter "*.jpg"
            $total = $images.Count
            $current = 0
            
            Write-Host "`nProcessing $cat ($total images)..."
            
            foreach ($img in $images) {
                $current++
                $targetFile = Join-Path $targetPath $img.Name
                
                # Compress with quality 80%, max dimension 1920px
                & magick convert $img.FullName -quality 80 -resize "1920x1920>" $targetFile
                
                $originalSize = [math]::Round($img.Length / 1KB, 0)
                $newSize = [math]::Round((Get-Item $targetFile).Length / 1KB, 0)
                $saved = $originalSize - $newSize
                
                Write-Progress -Activity "Compressing $cat" -Status "$current of $total" -PercentComplete (($current / $total) * 100)
                
                if ($current % 10 -eq 0) {
                    Write-Host "  Processed $current/$total - Last: $($img.Name) ($originalSize KB -> $newSize KB, saved $saved KB)"
                }
            }
            
            Write-Host "  Completed $cat!"
        }
    }
    
    Write-Host "`nCompression complete!"
} else {
    Write-Host "`nImageMagick not found!"
    Write-Host "`nPlease install ImageMagick:"
    Write-Host "  winget install ImageMagick.ImageMagick"
    Write-Host "`nOr compress images manually and place them in:"
    Write-Host "  $targetFolder\mockups\"
    Write-Host "  $targetFolder\outdoor\"
    Write-Host "  $targetFolder\exhibitions\"
}
