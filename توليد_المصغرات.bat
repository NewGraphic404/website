@echo off
chcp 65001 > nul
title توليد مصغرات صور الموقع - New Graphic
echo =======================================================
echo          أداة توليد مصغرات صور موقع نيو جرافيك
echo =======================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [خطأ] لم يتم العثور على برنامج بايثون ^(Python^) مثبت على جهازك!
    echo يرجى تحميله وتثبيته أولاً مع التأكد من تفعيل خيار "Add Python to PATH".
    echo.
    pause
    goto :eof
)

:: Install Pillow if not present
echo جاري التحقق من مكتبة معالجة الصور ^(Pillow^)...
python -c "from PIL import Image" >nul 2>&1
if %errorlevel% neq 0 (
    echo جاري تثبيت مكتبة Pillow اللازمة لمعالجة الصور...
    pip install Pillow
    if %errorlevel% neq 0 (
        echo [خطأ] فشل تثبيت مكتبة Pillow تلقائياً. يرجى تشغيل الأمر التالي يدوياً: pip install Pillow
        echo.
        pause
        goto :eof
    )
)

:: Run the script
echo.
echo جاري تشغيل سكربت توليد المصغرات والضغط...
echo.
python "%~dp0generate_thumbnails.py"
echo.
echo =======================================================
echo تمت العملية بنجاح! تم تحديث كافة مصغرات الصور.
echo =======================================================
echo.
pause
