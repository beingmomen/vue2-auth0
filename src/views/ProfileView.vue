<template>
    <div>
      <h2>الملف الشخصي</h2>
      <p>الاسم: {{ user.name }}</p>
      <p>البريد الإلكتروني: {{ user.email }}</p>
    </div>
  </template>
  
  <script>
  import { auth0 } from '../auth';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    async mounted() {
      this.user = await auth0.getUser();
    }
  };
  </script>