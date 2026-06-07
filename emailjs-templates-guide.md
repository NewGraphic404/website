# دليل إنشاء Templates لـ EmailJS

## 🔧 Template 1: Support Request (طلب دعم فني)

### معلومات التمبلت:
- **الاسم**: Support Request Template
- **Template ID**: سيتم إنشاؤه تلقائياً (مثل `template_support_xyz`)

### Subject (عنوان الإيميل):
```
طلب دعم فني - {{name}}
```

### Content (HTML):
```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            padding: 0;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 30px;
        }
        .field {
            background: #f8f9fa;
            border-left: 4px solid #ff6b35;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 6px;
        }
        .field-label {
            color: #666;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 500;
        }
        .details-box {
            background: #fff8f5;
            border: 2px solid #ff6b35;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .details-box h3 {
            margin: 0 0 15px 0;
            color: #ff6b35;
            font-size: 18px;
        }
        .details-text {
            color: #333;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        .footer {
            background: #1a1a1a;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 طلب دعم فني جديد</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="field-label">👤 اسم العميل</span>
                <span class="field-value">{{name}}</span>
            </div>
            
            <div class="field">
                <span class="field-label">📞 رقم التليفون</span>
                <span class="field-value">{{phone}}</span>
            </div>
            
            <div class="field">
                <span class="field-label">📧 البريد الإلكتروني</span>
                <span class="field-value">{{customer_email}}</span>
            </div>
            
            <div class="field">
                <span class="field-label">🔧 نوع طلب الدعم</span>
                <span class="field-value">{{service}}</span>
            </div>
            
            <div class="details-box">
                <h3>📝 تفاصيل الطلب:</h3>
                <div class="details-text">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            تم الإرسال من موقع New Graphic Co. | www.newgraphic.com
        </div>
    </div>
</body>
</html>
```

---

## 💬 Template 2: Complaints & Suggestions (شكاوى واقتراحات)

### معلومات التمبلت:
- **الاسم**: Complaints & Suggestions Template
- **Template ID**: سيتم إنشاؤه تلقائياً (مثل `template_complaints_xyz`)

### Subject (عنوان الإيميل):
```
شكوى/اقتراح - {{name}}
```

### Content (HTML):
```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            padding: 0;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 30px;
        }
        .field {
            background: #f8f9fa;
            border-left: 4px solid #8b5cf6;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 6px;
        }
        .field-label {
            color: #666;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            color: #1a1a1a;
            font-size: 16px;
            font-weight: 500;
        }
        .details-box {
            background: #faf5ff;
            border: 2px solid #8b5cf6;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        .details-box h3 {
            margin: 0 0 15px 0;
            color: #8b5cf6;
            font-size: 18px;
        }
        .details-text {
            color: #333;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        .footer {
            background: #1a1a1a;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💬 شكوى أو اقتراح جديد</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="field-label">👤 اسم العميل</span>
                <span class="field-value">{{name}}</span>
            </div>
            
            <div class="field">
                <span class="field-label">📞 رقم التليفون</span>
                <span class="field-value">{{phone}}</span>
            </div>
            
            <div class="field">
                <span class="field-label">📧 البريد الإلكتروني</span>
                <span class="field-value">{{customer_email}}</span>
            </div>
            
            <div class="field">
                <span class="field-label">💬 نوع الرسالة</span>
                <span class="field-value">{{service}}</span>
            </div>
            
            <div class="details-box">
                <h3>📝 محتوى الرسالة:</h3>
                <div class="details-text">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            تم الإرسال من موقع New Graphic Co. | www.newgraphic.com
        </div>
    </div>
</body>
</html>
```

---

## 🚀 خطوات التطبيق على EmailJS:

### 1. إنشاء التمبلت الأول (Support):
1. افتح https://dashboard.emailjs.com/admin
2. اضغط **Email Templates** من القائمة الجانبية
3. اضغط **Create New Template**
4. املأ البيانات:
   - **Template Name**: `Support Request`
   - **Subject**: `طلب دعم فني - {{name}}`
   - **Content**: انسخ الكود HTML أعلاه
5. اضغط **Save**
6. **احفظ الـ Template ID** (مثل: `template_support_xyz`)

### 2. إنشاء التمبلت الثاني (Complaints):
1. اضغط **Create New Template** مرة أخرى
2. املأ البيانات:
   - **Template Name**: `Complaints & Suggestions`
   - **Subject**: `شكوى/اقتراح - {{name}}`
   - **Content**: انسخ الكود HTML أعلاه
3. اضغط **Save**
4. **احفظ الـ Template ID** (مثل: `template_complaints_xyz`)

---

## 💰 التكلفة:

✅ **مجاني 100%** ضمن الخطة المجانية:
- 200 إيميل شهرياً
- تمبلتس غير محدودة
- يمكنك عمل أي عدد من التمبلتس

📊 **إذا احتجت أكثر من 200 إيميل/شهر:**
- Personal Plan: $7/شهر (1000 إيميل)
- Professional Plan: $15/شهر (5000 إيميل)

---

## 🔑 Variables المطلوبة في كل تمبلت:

### Support Template:
- `{{name}}` - اسم العميل
- `{{phone}}` - رقم التليفون
- `{{customer_email}}` - البريد الإلكتروني
- `{{service}}` - نوع الدعم
- `{{message}}` - التفاصيل

### Complaints Template:
- `{{name}}` - اسم العميل
- `{{phone}}` - رقم التليفون
- `{{customer_email}}` - البريد الإلكتروني
- `{{service}}` - نوع الرسالة
- `{{message}}` - المحتوى

---

## ⚡ بعد إنشاء التمبلتس:

أرسل لي الـ **Template IDs** عشان أحدث الكود في `script.js` ليستخدم التمبلتس الجديدة!
