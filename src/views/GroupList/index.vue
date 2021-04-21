<template>
  <div class="my-groups-container">
    <table id="table-groups">
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      <tr v-for="group in groups" :key="group._id">
        <td>{{ group.name }}</td>
        <td>{{ group.description }}</td>
        <td>
          <router-link :to="{ name: 'EditGroup', params: { id: group._id } }"
            ><img src="../../assets/image/edit.svg" />
          </router-link>
          <img
            src="../../assets/image/delete.png"
            @click="deleteGroup(group._id)"
          />
        </td>
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
