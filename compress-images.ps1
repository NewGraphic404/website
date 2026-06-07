# ============================================
# Script to Compress Images for Web
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Image Compression Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is installed
$magickPath = Get-Command "magick" -ErrorAction SilentlyContinue

if (-not $magickPath) {
    Write-Host "ERROR: ImageMagick is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ImageMagick first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "2. Install with 'Add to PATH' option checked" -ForegroundColor Yellow
    Write-Host "3. Restart PowerShell and run this script again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Use the online compression method (see README)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Configuration
$maxWidth = 2000  # Maximum width for images
$quality = 85     # JPEG quality (85 is high quality, good for web)
$backupFolder = "assets-backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  Max Width: $maxWidth px" -ForegroundColor Gray
Write-Host "  Quality: $quality%" -ForegroundColor Gray
Write-Host "  Backup Folder: $backupFolder" -ForegroundColor Gray
Write-Host ""

# Get all images
Write-Host "Scanning for images..." -ForegroundColor Yellow
$images = Get-ChildItem -Path "assets" -Recurse -File -Include *.jpg,*.jpeg,*.png

Write-Host "Found $($images.Count) images" -ForegroundColor Green
Write-Host ""

# Calculate current size
$currentSize = ($images | Measure-Object -Property Length -Sum).Sum
Write-Host "Current total size: $([math]::Round($currentSize / 1GB, 2)) GB" -ForegroundColor Cyan
Write-Host ""

# Ask for confirmation
$confirmation = Read-Host "Start compression? This will take 20-40 minutes. (yes/no)"

if ($confirmation -ne "yes" -and $confirmation -ne "y") {
    Write-Host "Compression cancelled." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "Creating backup..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null

# Compress images
Write-Host "Compressing images..." -ForegroundColor Yellow
Write-Host "This will take a while. Progress will be shown every 50 images." -ForegroundColor Gray
Write-Host ""

$compressed = 0
$failed = 0
$totalSaved = 0
$startTime = Get-Date

foreach ($image in $images) {
    try {
        $originalSize = $image.Length
        
        # Create backup directory structure
        $relativePath = $image.DirectoryName -replace [regex]::Escape((Get-Location).Path + "\assets"), ""
        $backupDir = Join-Path $backupFolder "assets$relativePath"
        
        if (-not (Test-Path $backupDir)) {
            New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        }
        
        # Backup original
        $backupPath = Join-Path $backupDir $image.Name
        Copy-Item $image.FullName $backupPath -Force
        
        # Compress image
        $tempFile = "$($image.FullName).tmp"
        
        # Use ImageMagick to resize and compress
        & magick $image.FullName -resize "${maxWidth}x${maxWidth}>" -quality $quality -strip $tempFile 2>$null
        
        if (Test-Path $tempFile) {
            $newSize = (Get-Item $tempFile).Length
            
            # Only replace if compressed version is smaller
            if ($newSize -lt $originalSize) {
                Move-Item $tempFile $image.FullName -Force
                $saved = $originalSize - $newSize
                $totalSaved += $saved
                $compressed++
            }
            else {
                Remove-Item $tempFile -Force
                $compressed++
            }
        }
        else {
            $failed++
        }
        
        # Progress update
        if ($compressed % 50 -eq 0) {
            $elapsed = (Get-Date) - $startTime
            $avgTime = $elapsed.TotalSeconds / $compressed
            $remaining = ($images.Count - $compressed) * $avgTime
            
            Write-Host "  Progress: $compressed / $($images.Count) images" -ForegroundColor Gray
            Write-Host "  Saved so far: $([math]::Round($totalSaved / 1MB, 2)) MB" -ForegroundColor Gray
            Write-Host "  Estimated time remaining: $([math]::Round($remaining / 60, 1)) minutes" -ForegroundColor Gray
            Write-Host ""
        }
    }
    catch {
        $failed++
        Write-Host "  Failed: $($image.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Compression Complete!" -ForegroundColor Green
Write-Host "  Processed: $compressed images" -ForegroundColor Green
Write-Host "  Failed: $failed images" -ForegroundColor Green
Write-Host "  Space saved: $([math]::Round($totalSaved / 1GB, 2)) GB" -ForegroundColor Green
Write-Host "  Backup location: $backupFolder" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Calculate new size
$newImages = Get-ChildItem -Path "assets" -Recurse -File -Include *.jpg,*.jpeg,*.png
$newSize = ($newImages | Measure-Object -Property Length -Sum).Sum

Write-Host "Before: $([math]::Round($currentSize / 1GB, 2)) GB" -ForegroundColor Cyan
Write-Host "After:  $([math]::Round($newSize / 1GB, 2)) GB" -ForegroundColor Cyan
Write-Host "Reduction: $([math]::Round((($currentSize - $newSize) / $currentSize) * 100, 1))%" -ForegroundColor Green
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
