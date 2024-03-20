<template>
  <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>

    <form @submit.prevent="login">
      <label>
        Email
        <input type="text" v-model="email" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/api.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      alert: '',
    };
  },
  methods: {
    async login() {
      try {
        // Make a POST request to your backend API endpoint for login
        const response = await apiClient.post('/api/login', {
          email: this.email,
          password: this.password,
        });

        const token = response.data.token;

        localStorage.setItem('token', token);

        this.$router.push('/dashboard');
      } catch (error) {
        // Handle errors
        if (error.response && error.response.data && error.response.data.message) {
          console.error('Login failed:', error.response.data.message);
          this.alert = error.response.data.message;
        } else {
          console.error('Login failed. Unknown error:', error);
          this.alert = 'Unknown error occurred during login.';
        }
      }
    },
  },
};
</script>

<style scoped>
button,
input {
  display: block;
  margin-bottom: 10px;
}

#alert {
  color: red;
  margin-bottom: 10px;
}
</style>
