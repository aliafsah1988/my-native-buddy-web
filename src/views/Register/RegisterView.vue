<template>
  <div class="register-container">
    <div class="register-container__box">
      <div class="register-container__box__item">
        <label for="name">Email</label>
        <input v-model="email" placeholder="Please enter your email " />
      </div>
      <div class="register-container__box__item">
        <label for="name">Password</label>
        <input v-model="password" type="password" placeholder="Password" />
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
import { authService } from "../../services/index";
import { useRouter } from "vue-router";

const email = ref<string>("");
const password = ref<string>("");
const router = useRouter();

const login = async () => {
  const result = await authService.register(email.value, password.value);
  if (result !== undefined && result.length > 0) {
    router.push({ name: "practiceGroup" });
  }
};
</script>

<style lang="scss" scoped>
@import "./Register.scss";
</style>
