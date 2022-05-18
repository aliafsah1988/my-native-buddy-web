<template>
  <div>
    <router-link
      v-for="(group, index) in groups"
      :key="index"
      :to="{ name: 'practice', params: { groupId: group._id } }"
      >{{ group.name }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useGroupsStore } from "../../stores/groups";
import { GroupService } from "../../../_old/src/services/group.service";
import { onMounted } from "@vue/runtime-core";

onMounted(async () => {
  const groups = await GroupService.getMyGroups();
  setGroups(groups);
});

const { groups, setGroups } = useGroupsStore();
</script>
