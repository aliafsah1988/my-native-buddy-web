<template>
  <div class="logged-in-user-container">
    <div>{{ userStore.user.email }}</div>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { authService } from "../../services/index";

import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const logout = async () => {
  await authService.logout();
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
