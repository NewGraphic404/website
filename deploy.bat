@echo off
REM سكريبت النشر السريع - Windows
REM Quick Deploy Script - Windows

echo.
echo ================================
echo   New Graphic Website Deploy
echo ================================
echo.

REM Check if Git is initialized
if not exist ".git" (
    echo ERROR: Git is not initialized!
    echo Please run setup-git.bat first
    pause
    exit /b 1
)

REM Get commit message
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" set message=Update website

echo.
echo [1/3] Adding changes...
git add .
echo Done!
echo.

echo [2/3] Creating commit...
git commit -m "%message%"
if %errorlevel% neq 0 (
    echo No changes to commit
    pause
    exit /b 0
)
echo Done!
echo.

echo [3/3] Pushing to GitHub...
git push
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed!
    echo.
    echo Possible reasons:
    echo 1. Remote repository not set
    echo 2. Authentication required
    echo 3. No internet connection
    echo.
    echo To set remote: git remote add origin YOUR_REPO_URL
    echo To push first time: git push -u origin main
    pause
    exit /b 1
)
echo Done!
echo.

echo ================================
echo   Deploy Complete!
echo ================================
echo.
echo Your website will be updated automatically on Netlify/Vercel
echo (if auto-deploy is configured)
echo.
pause
