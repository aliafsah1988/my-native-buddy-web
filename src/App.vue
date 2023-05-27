<template>
  <div id="app">
    <Header v-if="isLoggedIn" />
    <RouterView />
    <notifications group="success" />
  </div>
</template>

<script setup lang="ts">
import Header from "../src/components/Header/Header.vue";
import { useUser } from "./composables/useUser";
import { useUserStore } from "./stores/user";

useUser();
const { isLoggedIn } = useUserStore();
</script>

<style lang="scss">
@import "./assets/sass/index.scss";
</style>
