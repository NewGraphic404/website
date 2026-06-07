# Start a local web server
Write-Host "Starting local server..." -ForegroundColor Green
Write-Host "Open: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Check if Python is installed
$python = Get-Command python -ErrorAction SilentlyContinue

if ($python) {
    python -m http.server 8000
} else {
    Write-Host "Python not found. Trying PHP..." -ForegroundColor Yellow
    $php = Get-Command php -ErrorAction SilentlyContinue
    
    if ($php) {
        php -S localhost:8000
    } else {
        Write-Host "ERROR: Neither Python nor PHP found!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
        Write-Host "Or open the website using VS Code Live Server extension" -ForegroundColor Yellow
    }
}
