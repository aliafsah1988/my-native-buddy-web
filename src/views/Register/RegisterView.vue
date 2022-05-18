<template>
  <div class="register-container">
    <div class="register-container__box">
      <div class="register-container__box__item">
        <label for="name">Email</label>
        <input v-model="email" placeholder="Please enter your email " />
      </div>
      <div class="register-container__box__item">
        <label for="name">Password</label>
        <input v-model="password" placeholder="Password" />
      </div>
      <div class="register">
        <button @click="login">Create Account</button>
      </div>
      <span>
        If you have an account please
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
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
  const result = await AuthService.register(email.value, password.value);
  if (result && result.length > 0) {
    router.push({ name: "Practice" });
  }
};
</script>

<style lang="scss" scoped>
@import "./Register.scss";
</style>
