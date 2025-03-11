# تعليمات نشر التطبيق على Netlify

## الخطوات المطلوبة للنشر على Netlify

### 1. إعداد حساب Auth0

قبل النشر على Netlify، تأكد من تحديث إعدادات Auth0 لتضمين عنوان موقعك على Netlify:

1. قم بتسجيل الدخول إلى [لوحة تحكم Auth0](https://manage.auth0.com/)
2. انتقل إلى Applications > Applications
3. حدد تطبيقك
4. في قسم "Application URIs"، أضف عناوين URL التالية:
   - **Allowed Callback URLs**: أضف `https://YOUR-NETLIFY-APP-NAME.netlify.app/callback`
   - **Allowed Logout URLs**: أضف `https://YOUR-NETLIFY-APP-NAME.netlify.app`
   - **Allowed Web Origins**: أضف `https://YOUR-NETLIFY-APP-NAME.netlify.app`
5. انقر على "Save Changes"

### 2. تحديث ملفات البيئة

1. في ملف `.env.production` قم بتغيير `YOUR-NETLIFY-APP-NAME` إلى اسم التطبيق الفعلي على Netlify بعد إنشائه.

### 3. النشر على Netlify

#### باستخدام واجهة Netlify الرسومية:

1. سجل دخولك إلى [Netlify](https://app.netlify.com/)
2. انقر على "New site from Git"
3. اختر مزود Git الخاص بك (GitHub، GitLab، Bitbucket)
4. حدد مستودع المشروع
5. في صفحة إعدادات النشر:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. انقر على "Deploy site"

#### باستخدام Netlify CLI:

1. قم بتثبيت Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. قم بتسجيل الدخول إلى Netlify:
   ```
   netlify login
   ```

3. قم بإنشاء موقع جديد:
   ```
   netlify init
   ```

4. اتبع التعليمات واختر:
   - Create & configure a new site
   - اختر فريقك
   - أدخل اسمًا للموقع (سيكون هذا هو `YOUR-NETLIFY-APP-NAME`)
   - Build command: `npm run build`
   - Directory to deploy: `dist`

5. قم بنشر موقعك:
   ```
   netlify deploy --prod
   ```

### 4. ما بعد النشر

1. بعد نشر موقعك، احصل على URL المخصص لتطبيقك من لوحة تحكم Netlify
2. قم بتحديث ملف `.env.production` بالعنوان الصحيح
3. تأكد من تحديث إعدادات Auth0 كما هو موضح في الخطوة 1
4. أعد نشر تطبيقك للتأكد من تحديث التكوين

## حل المشكلات الشائعة

### مشكلة توجيه الصفحة الواحدة (SPA)

إذا واجهت مشاكل في التنقل (أخطاء 404 عند تحديث الصفحة)، تأكد من أن ملف `_redirects` موجود في مجلد `public` وأنه يحتوي على:
```
/* /index.html 200
```

أو تأكد من أن ملف `netlify.toml` يحتوي على قسم `redirects` صحيح:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### مشكلة عدم تطابق عنوان URL للاستدعاء (Callback URL)

إذا استمرت مشكلة "Callback URL mismatch"، تأكد من:
1. تحديث إعدادات Auth0 بعنوان Netlify الصحيح
2. تحديث ملف `.env.production` بعنوان Netlify الصحيح
3. النشر مرة أخرى بعد هذه التغييرات
4. مسح ذاكرة التخزين المؤقت للمتصفح ومحاولة تسجيل الدخول مرة أخرى
