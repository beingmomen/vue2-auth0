// This file contains the Auth0 configuration parameters
// استخدام متغيرات البيئة من الملفات .env

export default {
  domain: process.env.VUE_APP_AUTH0_DOMAIN || "dev-qqjtuc1jz3ej3f1z.us.auth0.com",
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID || "X0GI86MYxzBytKLGFXznOwnULbMqlEi3",
  audience: null, // Optional: needed if you want to call an API
  redirectUri: process.env.VUE_APP_AUTH0_CALLBACK || "http://localhost:8080/callback",
  responseType: 'token id_token',
  scope: 'openid profile email'
}
