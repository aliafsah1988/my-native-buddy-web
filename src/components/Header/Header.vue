<template>
  <div class="header">
    <Navbar />
    <LoggedInUser />
  </div>
</template>

<script setup lang="ts">
import LoggedInUser from "../LoggedInUser/LoggedInUser.vue";
import Navbar from "../Navbar/Navbar.vue";
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
