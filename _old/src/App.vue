<template>
  <div id="app">
    <Header />
    <router-view :key="$route.fullPath" />
    <Notifications group="success" />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: { Header },
};
</script>

<style lang="scss">
@import "./assets/sass/index.scss";
#app {
}
</style>
