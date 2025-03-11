# تطبيق Vue2 مدمج مع Auth0

هذا المشروع عبارة عن تطبيق Vue.js (الإصدار 2) يستخدم Auth0 للمصادقة وإدارة المستخدمين.

## المميزات

- تسجيل الدخول والخروج باستخدام Auth0
- حماية الصفحات التي تتطلب تسجيل الدخول
- صفحة ملف شخصي للمستخدم
- واجهة مستخدم باللغة العربية

## متطلبات ما قبل التثبيت

1. تأكد من تثبيت Node.js (نسخة 10.x أو أحدث)
2. حساب في Auth0 (مجاني) من خلال [موقع Auth0](https://auth0.com/)

## إعداد حساب Auth0

1. قم بإنشاء حساب في Auth0 إذا لم يكن لديك واحد بالفعل
2. أنشئ تطبيق جديد من لوحة التحكم (اختر تطبيق Single Page Application)
3. في إعدادات التطبيق، قم بإضافة:
   - Allowed Callback URLs: `http://localhost:8080`
   - Allowed Logout URLs: `http://localhost:8080`
   - Allowed Web Origins: `http://localhost:8080`
4. احفظ الإعدادات

## تثبيت وتشغيل المشروع

### تثبيت التبعيات

```bash
# انتقل إلى مجلد المشروع
cd auth0-vue2-app

# قم بتثبيت التبعيات
npm install
```

### تكوين Auth0

قم بتعديل ملف الإعدادات `src/auth/auth0-config.js` وإضافة معلومات Auth0 الخاصة بك:

```javascript
export default {
  domain: "YOUR_AUTH0_DOMAIN", // مثال dev-abc123.us.auth0.com
  clientId: "YOUR_AUTH0_CLIENT_ID",
  audience: null, // اختياري: مطلوب إذا كنت تريد استدعاء API
  redirectUri: window.location.origin
}
```

### تشغيل المشروع للتطوير

```bash
npm run serve
```

سيعمل التطبيق على العنوان: [http://localhost:8080](http://localhost:8080)

### إنشاء نسخة للإنتاج

```bash
npm run build
```

## هيكل المشروع

```
auth0-vue2-app/
├── public/                  # ملفات ثابتة
│   └── index.html           # ملف HTML الرئيسي
├── src/                     # كود المصدر
│   ├── auth/                # وحدات المصادقة
│   │   ├── auth0-config.js  # إعدادات Auth0
│   │   ├── authGuard.js     # حماية المسارات
│   │   └── index.js         # مكون Auth0 الرئيسي
│   ├── router/              # تكوين المسارات
│   ├── views/               # مكونات العرض
│   │   ├── Home.vue         # صفحة الرئيسية
│   │   └── Profile.vue      # صفحة الملف الشخصي
│   ├── App.vue              # المكون الرئيسي
│   └── main.js              # نقطة الدخول للتطبيق
└── package.json             # تبعيات المشروع
```

## الاستخدام

1. قم بزيارة `http://localhost:8080` في المتصفح
2. انقر على زر "تسجيل الدخول" للمصادقة مع Auth0
3. بعد تسجيل الدخول، يمكنك الوصول إلى صفحة الملف الشخصي وعرض معلومات المستخدم
4. استخدم زر "تسجيل الخروج" لإنهاء الجلسة

## الموارد الإضافية

- [وثائق Vue.js](https://v2.vuejs.org/)
- [وثائق Auth0](https://auth0.com/docs)
- [Auth0 Vue SDK](https://auth0.com/docs/libraries/auth0-single-page-app-sdk)
