<template>
  <div class="logged-in-user-container">
    <div>{{ email }}</div>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { LoggedInUserService } from "../../services/storage.service";
import { authService } from "../../services/index";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const email = ref<string>();
const router = useRouter();

onMounted(() => {
  email.value = LoggedInUserService.getEmail();
});
const logout = async () => {
  await authService.logout();
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
