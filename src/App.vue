<template>
  <div id="app">
    <Header />
    <router-view :key="$route.fullPath" />
    <notifications group="success" />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: { Header }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans", Roboto, sans-serif;
  font-size: 20px;
}
</style>
