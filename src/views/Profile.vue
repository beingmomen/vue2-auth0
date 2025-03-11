<template>
  <div class="profile">
    <h1>الملف الشخصي</h1>
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          <img v-if="$auth.user.picture" :src="$auth.user.picture" alt="صورة المستخدم" />
          <div v-else class="avatar-placeholder">{{ getInitials() }}</div>
        </div>
        <div class="profile-info">
          <h2>{{ $auth.user.name }}</h2>
          <p>{{ $auth.user.email }}</p>
        </div>
      </div>
      
      <div class="profile-details">
        <h3>معلومات الحساب</h3>
        <div class="detail-item">
          <span class="label">معرف المستخدم:</span>
          <span class="value">{{ $auth.user.sub }}</span>
        </div>
        <div class="detail-item">
          <span class="label">آخر تسجيل دخول:</span>
          <span class="value">{{ formatDate($auth.user.updated_at) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">البريد الإلكتروني مؤكد:</span>
          <span class="value">{{ $auth.user.email_verified ? 'نعم' : 'لا' }}</span>
        </div>
      </div>
      
      <div class="profile-json">
        <h3>بيانات المستخدم الكاملة</h3>
        <pre class="json-data">{{ JSON.stringify($auth.user, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  methods: {
    // Get user initials for avatar placeholder
    getInitials() {
      if (!this.$auth.user.name) return '?';
      return this.$auth.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    },
    // Format date string to readable format
    formatDate(dateString) {
      if (!dateString) return 'غير متوفر';
      
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return new Date(dateString).toLocaleDateString('ar-EG', options);
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 30px;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  display: flex;
  padding: 30px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  margin-left: 20px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.profile-info p {
  margin: 0;
  color: #666;
}

.profile-details, .profile-json {
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
}

.profile-details h3, .profile-json h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
}

.detail-item {
  margin-bottom: 10px;
  display: flex;
}

.label {
  font-weight: bold;
  width: 180px;
  color: #666;
}

.value {
  flex: 1;
}

.json-data {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
  direction: ltr;
  text-align: left;
}
</style>
