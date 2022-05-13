<template>
  <div>
    <router-link
      v-for="(group, index) in groups"
      :key="index"
      :to="{ name: 'Practice', params: { groupId: group._id } }"
      >{{ group.name }}
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PracticeGroup",
  computed: {
    ...mapState("groupList", ["groups"])
  },
  mounted() {
    this.getMyGroups();
  },
  methods: {
    ...mapActions("groupList", ["getMyGroups", "deleteGroup"])
  }
};
</script>
