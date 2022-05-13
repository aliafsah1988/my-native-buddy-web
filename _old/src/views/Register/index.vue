<template>
  <div class="register-container">
    <div></div>
    <input v-model="email" />
    <div></div>
    <input v-model="password" />
    <button @click="login">Register</button>
    <router-link :to="{ name: 'Login' }">Login</router-link>
  </div>
</template>

<script>
import AuthService from "../../services/auth.service";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      const result = await AuthService.register(this.email, this.password);
      if (result && result.length > 0) {
        this.$router.push({ name: "Practice" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
