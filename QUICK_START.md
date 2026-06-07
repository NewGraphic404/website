# 🚀 دليل البدء السريع - Quick Start Guide

## خطوات النشر في 10 دقائق ⏱️

---

## 📋 المتطلبات

### 1. تثبيت Git
- **Windows:** حمل من [git-scm.com](https://git-scm.com/download/win)
- **Mac:** مثبت مسبقاً أو `brew install git`
- **Linux:** `sudo apt install git`

### 2. إنشاء حساب GitHub
- اذهب إلى [github.com](https://github.com)
- اضغط "Sign up"
- أكمل التسجيل (مجاني)

### 3. إنشاء حساب Netlify
- اذهب إلى [netlify.com](https://netlify.com)
- اضغط "Sign up"
- سجل باستخدام حساب GitHub (أسهل)

---

## 🎯 الخطوات (نسخ ولصق فقط!)

### الخطوة 1️⃣: إعداد Git (مرة واحدة فقط)

#### على Windows:
```cmd
# افتح Command Prompt في مجلد الموقع
# ثم شغل:
setup-git.bat
```

#### على Mac/Linux:
```bash
# افتح Terminal في مجلد الموقع
# ثم شغل:
chmod +x setup-git.sh
./setup-git.sh
```

---

### الخطوة 2️⃣: إنشاء Repository على GitHub

1. اذهب إلى [github.com/new](https://github.com/new)
2. اسم الـ Repository: `new-graphic-website`
3. اختر: **Public** (أو Private إذا أردت)
4. **لا تختار** "Initialize with README"
5. اضغط **"Create repository"**

---

### الخطوة 3️⃣: ربط المشروع بـ GitHub

**انسخ الأوامر من صفحة GitHub** (ستظهر بعد إنشاء الـ repo):

```bash
git remote add origin https://github.com/YOUR_USERNAME/new-graphic-website.git
git push -u origin main
```

**استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك!**

---

### الخطوة 4️⃣: نشر الموقع على Netlify

#### الطريقة الأسهل (من الموقع):

1. اذهب إلى [app.netlify.com](https://app.netlify.com)
2. اضغط **"Add new site"** → **"Import an existing project"**
3. اختر **"GitHub"**
4. ابحث عن `new-graphic-website` واختره
5. اضغط **"Deploy site"**
6. **انتظر دقيقة** - الموقع سيكون جاهز!

#### ستحصل على رابط مثل:
```
https://random-name-123.netlify.app
```

---

## 🔄 التحديث (كل مرة تعدل فيها)

### الطريقة السهلة:

#### على Windows:
```cmd
deploy.bat
```

#### على Mac/Linux:
```bash
chmod +x deploy.sh
./deploy.sh
```

### أو يدوياً:
```bash
git add .
git commit -m "وصف التعديل"
git push
```

**الموقع سيتحدث تلقائياً على Netlify خلال 1-2 دقيقة!** ✨

---

## 🎨 تخصيص الدومين (اختياري)

### على Netlify:
1. اذهب إلى **Site settings** → **Domain management**
2. اضغط **"Add custom domain"**
3. أدخل الدومين الخاص بك (مثل: `newgraphic.com`)
4. اتبع التعليمات لتحديث DNS

---

## 🆘 حل المشاكل الشائعة

### ❌ "git: command not found"
```
✅ الحل: ثبت Git من git-scm.com
```

### ❌ "Permission denied (publickey)"
```
✅ الحل: أضف SSH key لـ GitHub
1. افتح: https://github.com/settings/keys
2. اضغط "New SSH key"
3. أو استخدم HTTPS بدلاً من SSH
```

### ❌ "failed to push"
```
✅ الحل: تأكد من:
1. إنك مسجل دخول على GitHub
2. الـ remote URL صحيح: git remote -v
3. عندك إنترنت
```

### ❌ الموقع مش بيتحدث على Netlify
```
✅ الحل:
1. تأكد إن الـ push نجح على GitHub
2. شوف Deploys في Netlify dashboard
3. امسح cache المتصفح (Ctrl+Shift+Delete)
```

---

## 📝 ملاحظات مهمة

### ✅ الملفات المهمة:
```
index.html      ← الصفحة الرئيسية
styles.css      ← التصميم
script.js       ← الوظائف
assets/         ← الصور
```

### ✅ بعد كل تعديل:
```bash
git add .
git commit -m "وصف التعديل"
git push
```

### ✅ لمشاهدة التغييرات:
```bash
git status          # شوف الملفات المعدلة
git log             # شوف تاريخ التعديلات
git diff            # شوف التغييرات بالتفصيل
```

---

## 🎉 مبروك!

موقعك الآن:
- ✅ على GitHub (نسخة احتياطية)
- ✅ على Netlify (منشور على الإنترنت)
- ✅ يتحدث تلقائياً مع كل push
- ✅ SSL مجاني (HTTPS)
- ✅ CDN سريع

---

## 📞 محتاج مساعدة؟

### الموارد المفيدة:
- 📖 [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- 📖 [GitHub Guides](https://guides.github.com/)
- 📖 [Netlify Docs](https://docs.netlify.com/)

### الدعم:
- 💬 GitHub Issues
- 💬 Netlify Support
- 💬 Stack Overflow

---

**آخر تحديث:** 2026-04-27  
**الوقت المتوقع:** 10 دقائق ⏱️  
**الصعوبة:** سهل جداً ⭐
