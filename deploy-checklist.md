# قائمة التحقق للنشر على Netlify

استخدم هذه القائمة للتأكد من تجهيز مشروعك بشكل صحيح قبل النشر على Netlify.

## قبل النشر

- [ ] تحديث اسم التطبيق في ملف `.env.production`:
  ```
  VUE_APP_AUTH0_CALLBACK=https://YOUR-NETLIFY-APP-NAME.netlify.app/callback
  ```

- [ ] التأكد من إعدادات Auth0 في لوحة التحكم:
  - [ ] إضافة `https://YOUR-NETLIFY-APP-NAME.netlify.app/callback` إلى Allowed Callback URLs
  - [ ] إضافة `https://YOUR-NETLIFY-APP-NAME.netlify.app` إلى Allowed Logout URLs
  - [ ] إضافة `https://YOUR-NETLIFY-APP-NAME.netlify.app` إلى Allowed Web Origins

- [ ] التأكد من وجود ملفات التكوين التالية:
  - [ ] `netlify.toml`
  - [ ] `public/_redirects`
  - [ ] `public/_headers`
  - [ ] `.env.production`

- [ ] تشغيل الاختبارات المحلية
  ```
  npm run serve
  ```

## أثناء النشر

استخدم واحدة من طرق النشر التالية:

### نشر عبر Netlify UI
1. قم بتسجيل الدخول إلى [app.netlify.com](https://app.netlify.com/)
2. اسحب وأفلت مجلد `dist` بعد بناء التطبيق (`npm run build`)
   أو
3. قم بربط المشروع بمستودع Git واضبط إعدادات النشر

### نشر عبر CLI
1. تثبيت Netlify CLI
   ```
   npm install -g netlify-cli
   ```
2. تسجيل الدخول
   ```
   netlify login
   ```
3. بدء المشروع
   ```
   netlify init
   ```
4. نشر التطبيق
   ```
   npm run deploy:netlify
   ```

## بعد النشر

- [ ] التحقق من تسجيل الدخول عبر Auth0 في بيئة الإنتاج
- [ ] التحقق من عمل redirects بشكل صحيح
- [ ] مراجعة سجلات Netlify للتأكد من عدم وجود أخطاء

## مشاكل شائعة وحلولها

### مشكلة: Callback URL mismatch
**الحل:** تأكد من تطابق عنوان الاستدعاء في ملف `.env.production` مع الإعدادات في لوحة تحكم Auth0

### مشكلة: صفحة 404 عند تحديث صفحة داخلية
**الحل:** تأكد من وجود ملف `_redirects` في مجلد `public` وأنه يحتوي على الإعدادات الصحيحة

### مشكلة: مشكلة في تسجيل الدخول
**الحل:** مسح ذاكرة التخزين المؤقت للمتصفح وإعادة المحاولة. إذا استمرت المشكلة، تحقق من سجلات Auth0 في لوحة التحكم
