<template>
  <div class="home">
    <h1>مرحباً بك في تطبيق Auth0 Vue2</h1>
    <div v-if="$auth.isAuthenticated" class="welcome-container">
      <h2>مرحباً {{ $auth.user.name }}</h2>
      <p>أنت مسجل الدخول حالياً!</p>
      <button class="btn btn-primary" @click="goToProfile">عرض الملف الشخصي</button>
    </div>
    <div v-else class="welcome-container">
      <h2>مرحباً زائرنا</h2>
      <p>قم بتسجيل الدخول للوصول إلى جميع ميزات التطبيق.</p>
      <button class="btn btn-primary" @click="login">تسجيل الدخول</button>
    </div>

    <div class="features-section">
      <h3>ميزات التطبيق</h3>
      <ul>
        <li>تكامل كامل مع Auth0</li>
        <li>إدارة الجلسات</li>
        <li>حماية الطرق (Routes)</li>
        <li>ملف شخصي للمستخدم</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    // Check if we were redirected here because login is required
    if (this.$route.query.loginRequired) {
      this.$auth.loginWithRedirect()
    }
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
    goToProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.welcome-container {
  margin: 40px auto;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  color: #42b983;
  margin-bottom: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

p {
  margin-bottom: 20px;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.features-section {
  margin-top: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-section h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.features-section ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.features-section li {
  margin: 10px;
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
