import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import { authGuard } from '../auth/authGuard'

// Add Callback component for Auth0
const Callback = {
  name: 'callback',
  template: '<div class="loading">جاري تسجيل الدخول...</div>',
  mounted() {
    // Just to handle the redirect, actual auth is handled by Auth0Plugin
    this.$router.push('/')
  }
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      // Catch all route for handling 404s
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
