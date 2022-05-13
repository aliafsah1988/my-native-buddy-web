<template>
  <div class="container">
    <div class="login-container">
      <div class="login-container__box">
        <div class="login-container__box__item">
          <label for="name">Username</label>
          <input v-model="email" />
        </div>
        <div class="login-container__box__item">
          <label for="name">Password</label>
          <input v-model="password" />
        </div>
        <div class="login">
          <button @click="login">Login</button>
        </div>
        <span>
          If you don't have an account please
          <router-link :to="{ name: 'Register' }">Register</router-link>
          first.
        </span>
      </div>
    </div>
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
