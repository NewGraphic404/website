@echo off
chcp 65001 > nul
echo جاري فحص ملفات الموقع للبحث عن صور أو فيديوهات جديدة غير مضغوطة...
echo برجاء الانتظار، قد تستغرق الفيديوهات بعض الوقت.
echo.
python auto_compressor.py
echo.
echo انتهت العملية!
pause
