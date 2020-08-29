<template>
  <div class="my-groups-container">
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      <tr v-for="group in groups" :key="group._id">
        <th>{{ group.name }}</th>
        <th>{{ group.description }}</th>
        <th>
          <router-link :to="{ name: 'EditGroup', params: { id: group._id } }"
            >Edit
          </router-link>
          <button @click="deleteGroup(group._id)">Delete</button>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "GroupList",
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

<style lang="scss" scoped>
@import "./style.scss";
</style>
