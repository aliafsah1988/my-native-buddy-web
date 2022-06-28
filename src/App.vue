<template>
  <div id="app">
    <Header />
    <RouterView />
    <notifications group="success" />
  </div>
</template>

<script setup lang="ts">
import Header from "../src/components/Header/Header.vue";
</script>

//
<style lang="scss">
@import "./assets/sass/index.scss";
</style>
