<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Auth0 Vue2 Demo</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">الرئيسية</router-link>
          <router-link v-if="$auth.isAuthenticated" to="/profile" class="navbar-item">الملف الشخصي</router-link>
          <a v-if="!$auth.isAuthenticated" @click="login" class="navbar-item">تسجيل الدخول</a>
          <a v-if="$auth.isAuthenticated" @click="logout" class="navbar-item">تسجيل الخروج</a>
        </div>
      </div>
    </nav>
    <div class="container">
      <div v-if="$auth.loading" class="loading">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // Method to handle login
    login() {
      // Use loginWithRedirect with explicit redirect parameter
      this.$auth.loginWithRedirect({
        redirect_uri: 'http://localhost:8080'
      })
    },
    // Method to handle logout
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-menu {
  display: flex;
}

.navbar-item {
  padding: 0.5rem 1rem;
  color: #2c3e50;
  text-decoration: none;
  cursor: pointer;
}

.navbar-item:hover {
  color: #42b983;
}

.container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #42b983;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
