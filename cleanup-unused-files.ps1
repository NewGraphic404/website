# ============================================
# Script to Delete Unused Files
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cleaning Up Unused Files" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get all image and video files in assets
Write-Host "Scanning assets folder..." -ForegroundColor Yellow
$allFiles = Get-ChildItem -Path "assets" -Recurse -File -Include *.jpg,*.jpeg,*.png,*.gif,*.mp4,*.webm,*.svg

# Read all code files
Write-Host "Reading code files..." -ForegroundColor Yellow
$htmlContent = Get-Content "index.html" -Raw
$cssContent = Get-Content "styles.css" -Raw
$jsContent = Get-Content "script.js" -Raw

# Check which files are unused
Write-Host "Analyzing file usage..." -ForegroundColor Yellow
$unusedFiles = @()
$totalSize = 0

foreach ($file in $allFiles) {
    $fileName = Split-Path $file -Leaf
    $relativePath = $file.FullName -replace [regex]::Escape((Get-Location).Path + "\"), "" -replace "\\", "/"
    
    # Check if file is referenced in any code
    $isUsed = $htmlContent.Contains($fileName) -or 
              $htmlContent.Contains($relativePath) -or
              $cssContent.Contains($fileName) -or 
              $cssContent.Contains($relativePath) -or
              $jsContent.Contains($fileName) -or
              $jsContent.Contains($relativePath)
    
    if (-not $isUsed) {
        $size = $file.Length
        $totalSize += $size
        $unusedFiles += $file
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Found $($unusedFiles.Count) unused files" -ForegroundColor Green
Write-Host "Total size: $([math]::Round($totalSize / 1MB, 2)) MB" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Ask for confirmation
$confirmation = Read-Host "Do you want to delete these files? (yes/no)"

if ($confirmation -eq "yes" -or $confirmation -eq "y") {
    Write-Host ""
    Write-Host "Creating backup list..." -ForegroundColor Yellow
    
    # Create a log of deleted files
    $logFile = "deleted-files-log-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
    $unusedFiles | ForEach-Object { $_.FullName } | Out-File $logFile
    
    Write-Host "Deleting files..." -ForegroundColor Yellow
    $deletedCount = 0
    $deletedSize = 0
    
    foreach ($file in $unusedFiles) {
        try {
            $size = $file.Length
            Remove-Item $file.FullName -Force
            $deletedCount++
            $deletedSize += $size
            
            if ($deletedCount % 50 -eq 0) {
                Write-Host "  Deleted $deletedCount files..." -ForegroundColor Gray
            }
        }
        catch {
            Write-Host "  Failed to delete: $($file.Name)" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ Cleanup Complete!" -ForegroundColor Green
    Write-Host "  Deleted: $deletedCount files" -ForegroundColor Green
    Write-Host "  Freed: $([math]::Round($deletedSize / 1MB, 2)) MB" -ForegroundColor Green
    Write-Host "  Log saved: $logFile" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
}
else {
    Write-Host ""
    Write-Host "Cleanup cancelled." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
