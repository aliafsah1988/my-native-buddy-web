<template>
  <div class="header">
    <Navbar />
    <LoggedInUser />
  </div>
</template>

<script>
import LoggedInUser from "../LoggedInUser";
import Navbar from "../Navbar";

export default {
  name: "Header",
  components: {
    LoggedInUser,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
