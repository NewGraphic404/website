# دليل رفع ونشر الموقع - Deployment Guide

## 🎯 الهدف
رفع الموقع على استضافة مع إمكانية التحديث السهل بدون رفع كل الملفات

---

## ✅ الحل الأمثل: استخدام Git + GitHub

### **المميزات:**
- ✅ ترفع التعديلات بس (مش كل الموقع)
- ✅ تقدر ترجع لأي نسخة قديمة
- ✅ تعرف مين عدل إيه وامتى
- ✅ تقدر تشتغل من أكتر من جهاز
- ✅ نشر تلقائي (Auto-Deploy)

### **الخطوات:**

#### 1️⃣ إنشاء Git Repository
```bash
# في مجلد الموقع
git init
git add .
git commit -m "Initial commit - New Graphic Website"
```

#### 2️⃣ رفع على GitHub
```bash
# إنشاء repo على GitHub أول
# ثم:
git remote add origin https://github.com/username/new-graphic-website.git
git branch -M main
git push -u origin main
```

#### 3️⃣ ربط الاستضافة بـ GitHub

**خيارات الاستضافة المجانية مع Auto-Deploy:**

##### أ) **Netlify** (الأسهل - موصى به ⭐)
1. اذهب إلى [netlify.com](https://netlify.com)
2. اضغط "New site from Git"
3. اختر GitHub repository
4. اضغط Deploy
5. **كل ما تعمل push على GitHub، الموقع يتحدث تلقائياً!**

##### ب) **Vercel**
1. اذهب إلى [vercel.com](https://vercel.com)
2. Import Git Repository
3. Deploy
4. تحديث تلقائي مع كل push

##### ج) **GitHub Pages** (مجاني تماماً)
1. في الـ repo على GitHub
2. Settings → Pages
3. اختر branch: main
4. Save
5. الموقع هيكون على: `https://username.github.io/repo-name`

---

## 🔄 كيفية التحديث (بعد الإعداد)

### **الطريقة السهلة:**
```bash
# بعد ما تعدل أي ملف:
git add .
git commit -m "وصف التعديل"
git push

# الموقع هيتحدث تلقائياً! ✅
```

### **مثال عملي:**
```bash
# عدلت في styles.css
git add styles.css
git commit -m "تحسين تصميم الـ header"
git push

# أو لو عدلت ملفات كتير:
git add .
git commit -m "إضافة ميزة momentum scrolling"
git push
```

---

## 📁 البديل: FTP (الطريقة التقليدية)

### **إذا كنت تستخدم استضافة عادية (Shared Hosting):**

#### **البرامج المطلوبة:**
- **FileZilla** (مجاني) - [filezilla-project.org](https://filezilla-project.org)
- أو **WinSCP** (ويندوز)

#### **الخطوات:**
1. افتح FileZilla
2. اتصل بالاستضافة (Host, Username, Password, Port)
3. **للتحديث:**
   - ارفع الملفات المعدلة بس
   - FileZilla بيكتشف الملفات الأحدث تلقائياً
   - اختار "Overwrite if newer"

#### **نصائح FTP:**
- ✅ ارفع الملفات المعدلة بس (مش كل المجلد)
- ✅ لو مش متأكد، ارفع: `index.html`, `styles.css`, `script.js`
- ✅ الصور والـ assets لو مغيرتهمش، متحملهمش تاني

---

## 🎨 ملفات الموقع الرئيسية

### **الملفات اللي بتتعدل كتير:**
```
📄 index.html          ← HTML structure
📄 styles.css          ← التصميم والألوان
📄 script.js           ← الوظائف والتفاعل
```

### **الملفات اللي نادراً بتتعدل:**
```
📁 assets/             ← الصور والشعارات
📄 portfolio-images.js ← بيانات الأعمال
📄 social-images.json  ← بيانات السوشيال
```

---

## 🚀 التوصية النهائية

### **للمشاريع الكبيرة (موصى به):**
```
Git + GitHub + Netlify
```
**المميزات:**
- ✅ نشر تلقائي
- ✅ SSL مجاني
- ✅ CDN سريع
- ✅ Domain مخصص
- ✅ Rollback سهل

### **للمشاريع الصغيرة:**
```
FTP + FileZilla
```
**المميزات:**
- ✅ بسيط ومباشر
- ✅ مفيش تعقيد
- ✅ يشتغل مع أي استضافة

---

## 📝 ملاحظات مهمة

### **الـ Cache:**
بعد التحديث، لو الموقع مش متحدث:
```
1. امسح cache المتصفح (Ctrl + Shift + Delete)
2. أو افتح في Incognito/Private mode
3. أو اضغط Ctrl + F5 (Hard Refresh)
```

### **الملفات الحساسة:**
لو في ملفات سرية (API keys, passwords):
```
1. اعمل ملف .gitignore
2. حط فيه أسماء الملفات السرية
3. الملفات دي مش هترفع على GitHub
```

مثال `.gitignore`:
```
# ملفات سرية
config.php
.env
secrets.json

# ملفات النظام
.DS_Store
Thumbs.db
```

---

## 🆘 استكشاف الأخطاء

### **المشكلة: الموقع مش بيتحدث**
```
✅ تأكد إنك عملت git push
✅ تأكد من الـ deployment logs في Netlify/Vercel
✅ امسح cache المتصفح
```

### **المشكلة: الصور مش ظاهرة**
```
✅ تأكد إن مجلد assets اترفع
✅ تأكد من الـ paths في الكود
✅ تأكد من أذونات الملفات (755 للمجلدات، 644 للملفات)
```

### **المشكلة: CSS/JS مش شغال**
```
✅ تأكد إن الملفات اترفعت
✅ افتح Developer Tools (F12) وشوف الـ errors
✅ تأكد من الـ paths صح
```

---

## 📞 الخلاصة

**أسهل طريقة:**
1. سجل في Netlify
2. ارفع الموقع من GitHub
3. كل ما تعدل حاجة، اعمل `git push`
4. الموقع يتحدث تلقائياً! 🎉

**لو عايز طريقة تقليدية:**
1. استخدم FileZilla
2. ارفع الملفات المعدلة بس
3. خلاص! ✅

---

**تاريخ الإنشاء:** 2026-04-27  
**الحالة:** ✅ جاهز للاستخدام
