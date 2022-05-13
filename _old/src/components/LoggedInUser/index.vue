<template>
  <div class="logged-in-user-container">
    <div>{{ email }}</div>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script>
import { LoggedInUserService } from "@/services/storage.service";
import { AuthService } from "../../services/auth.service";

export default {
  name: "LoggedInUser",
  data() {
    return {
      email: ""
    };
  },
  mounted() {
    this.email = LoggedInUserService.getEmail();
  },
  methods: {
    logout: async function() {
      await AuthService.logout();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
