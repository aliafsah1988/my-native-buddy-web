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
          <router-link :to="{ name: 'Register' }">Register</router-link>
          first.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AuthService from "../../../_old/src/services/auth.service";
import { useRouter } from "vue-router";

const email = ref<string>("");
const password = ref<string>("");
const router = useRouter();

const login = async () => {
  const result = await AuthService.login(email.value, password.value);
  if (result && result.length > 0) {
    router.push({ name: "PracticeGroup" });
  }
};
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>
