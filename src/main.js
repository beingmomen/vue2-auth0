import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Auth0Plugin } from './auth'

// Auth0 configuration
import auth0Config from './auth/auth0-config'

Vue.config.productionTip = false

// Install the authentication plugin
Vue.use(Auth0Plugin, {
  domain: auth0Config.domain,
  clientId: auth0Config.clientId,
  audience: auth0Config.audience,
  redirectUri: auth0Config.redirectUri,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
