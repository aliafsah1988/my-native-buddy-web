<template>
  <div class="my-groups-container">
    <modal name="delete">
      <h5>delete</h5>
      <p>dhgkmf</p>
      <div class="btn">
        <button @click="close" class="no">No</button>
        <button @click="onYes" class="yes">Yes</button>
      </div>
    </modal>
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
            @click="onDelete(group._id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vmodal from "vue-js-modal";
import Vue from "vue";
Vue.use(vmodal);
export default {
  name: "GroupList",
  computed: {
    ...mapState("groupList", ["groups"])
  },
  data() {
    return {
      readyToDelete: undefined
    };
  },
  mounted() {
    this.getMyGroups();
  },
  methods: {
    ...mapActions("groupList", ["getMyGroups", "deleteGroup"]),
    onDelete(id) {
      this.readyToDelete = id;
      this.$modal.show("delete");
    },
    close() {
      this.$modal.hide("delete");
      this.readyToDelete = undefined;
    },
    async onYes() {
      await this.deleteGroup(this.readyToDelete);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
