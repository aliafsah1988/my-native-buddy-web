<template>
  <div class="container">
    <div class="login-container">
      <div class="login-container__box">
        <div class="login-container__box__item">
          <label for="name">Username</label>
          <input v-model="email" placeholder="Email Address" />
        </div>
        <div class="login-container__box__item">
          <label for="name">Password</label>
          <input v-model="password" placeholder="Password" />
        </div>
        <div class="login">
          <button @click="login">Login</button>
        </div>
        <span>
          If you don't have an account please
          <router-link :to="{ name: 'register' }">Register</router-link>
          first.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import AuthService from "../../../_old/src/services/auth.service";
import { authService } from "../../services/index";

import { useRouter } from "vue-router";

const email = ref<string>("");
const password = ref<string>("");
const router = useRouter();

const login = async () => {
  const result = await authService.login(email.value, password.value);
  if (result !== undefined && result.length > 0) {
    router.push({ name: "practiceGroup" });
  }
};
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>
