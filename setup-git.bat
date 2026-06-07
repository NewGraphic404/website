@echo off
REM سكريبت إعداد Git تلقائياً - Windows
REM Setup Git Repository Automatically - Windows

echo.
echo ================================
echo   New Graphic Website Setup
echo ================================
echo.

REM 1. Initialize Git
echo [1/4] Initializing Git...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo Done!
echo.

REM 2. Add all files
echo [2/4] Adding all files...
git add .
echo Done!
echo.

REM 3. Create initial commit
echo [3/4] Creating initial commit...
git commit -m "Initial commit - New Graphic Website"
echo Done!
echo.

REM 4. Set main branch
echo [4/4] Setting main branch...
git branch -M main
echo Done!
echo.

echo ================================
echo   Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Create a repository on GitHub
echo 2. Copy the repository URL
echo 3. Run: git remote add origin YOUR_REPO_URL
echo 4. Run: git push -u origin main
echo.
echo Or use the deploy script: deploy.bat
echo.
pause
