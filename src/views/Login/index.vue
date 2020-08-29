<template>
  <div class="login-container">
    <div></div>
    <input v-model="email" />
    <div></div>
    <input v-model="password" />
    <button @click="login">Login</button>
    <router-link :to="{ name: 'Register' }">Register</router-link>
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
      const result = await AuthService.login(this.email, this.password);
      if (result && result.length > 0) {
        this.$router.push({ name: "PracticeGroup" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
