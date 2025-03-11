#!/bin/bash

# هذا السكريبت يستخدم لبناء المشروع وتجهيزه للنشر على Netlify

# بناء التطبيق
echo "بدء عملية بناء التطبيق..."
npm run build

# نسخ ملف _redirects (للتأكد من وجوده في مجلد dist)
echo "نسخ ملف _redirects..."
if [ -f "public/_redirects" ]; then
  cp public/_redirects dist/
fi

# إنشاء ملف robots.txt إذا لم يكن موجوداً
echo "إنشاء ملف robots.txt..."
if [ ! -f "dist/robots.txt" ]; then
  echo "User-agent: *" > dist/robots.txt
  echo "Allow: /" >> dist/robots.txt
fi

echo "اكتملت عملية البناء بنجاح!"
