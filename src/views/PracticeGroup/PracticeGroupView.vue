<template>
  <div class="container">
    <router-link
      class="router"
      v-for="(group, index) in groups"
      :key="index"
      :to="{ name: 'practice', params: { groupId: group._id } }"
      >{{ group.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { groupService } from "../../services/index";
import { onMounted, reactive } from "@vue/runtime-core";

const groups = reactive<any[]>([]);

onMounted(async () => {
  Object.assign(groups, await groupService.getMyGroups());
});
</script>

<style lang="scss" scoped>
@import "./PracticeGroup.scss";
</style>
