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
        <div class="error" v-if="error !== undefined">{{ error }}</div>
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
import { useLogin } from "@/composables/useLogin";

const { email, password, login, error } = useLogin();
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>
