<template>
  <div class="logged-in-user-container">
    <div>{{ email }}</div>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { LoggedInUserService } from "../../../_old/src/services/storage.service";
import { AuthService } from "../../../_old/src/services/auth.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const email = ref<string>();
const router = useRouter();

onMounted(() => {
  email.value = LoggedInUserService.getEmail();
});
const logout = async () => {
  await AuthService.logout();
  router.push({ name: "Login" });
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
