# New Graphic Co. Website 🎨

موقع شركة نيو جرافيك للدعاية والإعلان - تصميم حديث وتفاعلي

## 📋 نظرة عامة

موقع متكامل لشركة دعاية وإعلان مصرية، يعرض الخدمات والأعمال والعملاء بطريقة احترافية وجذابة.

## ✨ المميزات

### 🎯 التصميم
- ✅ تصميم Liquid Glass عصري
- ✅ دعم كامل للغة العربية والإنجليزية (RTL/LTR)
- ✅ ثيمات متعددة (Dark, Orange, Light)
- ✅ تصميم متجاوب (Responsive) لكل الشاشات
- ✅ Custom Cursor تفاعلي

### 🚀 التفاعل
- ✅ Splash Screen مع تأثير دائري
- ✅ Smooth Scrolling
- ✅ Scroll Reveal Animations
- ✅ Momentum Scrolling للكاروسيل
- ✅ Edge-triggered Menu للديسكتوب
- ✅ Back to Top Button

### 📱 الأقسام
- **Hero Section** - عرض رئيسي مع عملاء متحركين
- **About** - معلومات عن الشركة مع slider
- **Works** - عرض الأعمال المميزة
- **Partners** - كاروسيل سينمائي للعملاء
- **Clients Page** - صفحة كاملة للعملاء حسب المحافظات
- **Social Page** - أعمال السوشيال ميديا
- **Contact** - معلومات التواصل

## 🛠️ التقنيات المستخدمة

- **HTML5** - البنية الأساسية
- **CSS3** - التصميم والتأثيرات
  - CSS Variables للثيمات
  - Flexbox & Grid للتخطيط
  - Animations & Transitions
  - Backdrop Filter للـ Glass Effect
- **JavaScript (Vanilla)** - التفاعل والوظائف
  - No frameworks - أداء أفضل
  - Modern ES6+ syntax
  - Intersection Observer API
  - RequestAnimationFrame للأنيميشن

## 📁 هيكل الملفات

```
new-graphic-website/
├── index.html              # الصفحة الرئيسية
├── styles.css              # ملف التصميم الرئيسي
├── script.js               # ملف JavaScript الرئيسي
├── assets/                 # الصور والملفات
│   ├── logo.png
│   ├── client-logos/       # شعارات العملاء
│   ├── clients/            # صور أعمال العملاء
│   ├── portfolio-images.js # بيانات الأعمال
│   └── social-images.json  # بيانات السوشيال
├── .gitignore              # ملفات Git المستبعدة
├── README.md               # هذا الملف
└── DEPLOYMENT_GUIDE.md     # دليل النشر والتحديث
```

## 🚀 التشغيل المحلي

### الطريقة 1: مباشرة
```bash
# افتح index.html في المتصفح
```

### الطريقة 2: Local Server (موصى به)
```bash
# باستخدام Python
python -m http.server 8000

# أو باستخدام Node.js
npx http-server

# ثم افتح: http://localhost:8000
```

## 📤 النشر والتحديث

راجع ملف [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) للتفاصيل الكاملة.

### الطريقة السريعة (Git + Netlify):
```bash
# أول مرة
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# للتحديث
git add .
git commit -m "وصف التعديل"
git push
```

## 🎨 التخصيص

### تغيير الألوان:
عدل الـ CSS Variables في `styles.css`:
```css
:root {
    --purple: #6B3FA0;
    --orange: #F5A623;
    --black: #0A0612;
    /* ... */
}
```

### إضافة عميل جديد:
عدل في `script.js`:
```javascript
translations.ar.clients_names = [
    'اسم العميل الجديد',
    // ...
];
```

### إضافة عمل جديد:
عدل في `assets/portfolio-images.js`:
```javascript
window.portfolioImages = {
    'اسم العميل': ['image1.jpg', 'image2.jpg'],
    // ...
};
```

## 🌐 المتصفحات المدعومة

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Opera (76+)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

## 📝 الملاحظات

- الموقع يستخدم Web Fonts من Google Fonts (Cairo, Inter)
- بعض التأثيرات تحتاج GPU acceleration
- الصور محسنة للويب (WebP مع fallback)
- الموقع يدعم RTL/LTR بشكل كامل

## 🐛 استكشاف الأخطاء

### الصور لا تظهر:
```
✅ تأكد من مسارات الصور في assets/
✅ تأكد من أسماء الملفات صحيحة
✅ افتح Developer Tools (F12) وشوف الـ Console
```

### التصميم مكسور:
```
✅ امسح cache المتصفح (Ctrl + Shift + Delete)
✅ تأكد من تحميل styles.css
✅ افتح في Incognito mode
```

### JavaScript لا يعمل:
```
✅ افتح Console (F12) وشوف الأخطاء
✅ تأكد من تحميل script.js
✅ تأكد من عدم وجود AdBlocker يمنع السكريبتات
```

## 📞 الدعم

للأسئلة أو المشاكل:
- 📧 Email: e.newgraphic@gmail.com
- 📱 WhatsApp: [رقم الواتساب]
- 🌐 Website: [رابط الموقع]

## 📄 الترخيص

© 2026 New Graphic Co. جميع الحقوق محفوظة.

---

**آخر تحديث:** 2026-04-27  
**الإصدار:** 1.0.0  
**الحالة:** ✅ جاهز للإنتاج
