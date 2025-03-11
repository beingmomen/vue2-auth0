// This file contains the Auth0 configuration parameters
export default {
  domain: "dev-qqjtuc1jz3ej3f1z.us.auth0.com", // e.g. dev-abc123.us.auth0.com
  clientId: "X0GI86MYxzBytKLGFXznOwnULbMqlEi3",
  audience: null, // Optional: needed if you want to call an API
  redirectUri: "http://localhost:8080/callback", // Make sure this EXACT URL is in your Auth0 dashboard
  responseType: 'token id_token',
  scope: 'openid profile email'
}
