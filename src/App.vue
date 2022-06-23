<template>
  <div id="app">
    <Header />
    <RouterView />

    <router-view :key="$route.fullPath" />
    <notifications group="success" />
  </div>
</template>

<script setup lang="ts">
import Header from "../src/components/Header/Header.vue";
</script>

//
<style lang="scss">
// @import "./assets/sass/index.scss";
//
</style>
