<template>
  <div class="my-groups-container">
    <!-- <modal name="delete">
      <h5>delete</h5>
      <p>dhgkmf</p>
      <div class="btn">
        <button @click="close" class="no">No</button>
        <button @click="onYes" class="yes">Yes</button>
      </div>
    </modal> -->
    <table id="table-groups">
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>

      <tr v-for="group in storeGroupList.groups" :key="group._id">
        <td>{{ group.name }}</td>
        <td>{{ group.description }}</td>
        <td>
          <router-link :to="{ name: 'editGroup', params: { id: group._id } }"
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

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGroupListStore } from "../../stores/groupList";
const storeGroupList = useGroupListStore();
const readyToDelete = ref<string>("");
onMounted(async () => {
  await storeGroupList.getMyGroups();
});
const onDelete = (id) => {
  readyToDelete.value = id;
  //   this.$modal.show("delete");
  storeGroupList.deleteGroup(readyToDelete.value);
};
const close = () => {
  // this.$modal.hide("delete");
  readyToDelete.value = undefined;
};
const onYes = async () => {
  await storeGroupList.deleteGroup(readyToDelete.value);
  close();
};
</script>

<style lang="scss" scoped>
@import "./GroupList.scss";
</style>
