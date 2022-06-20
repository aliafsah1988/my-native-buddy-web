<template>
  <div class="add-group-container">
    <Group @change="onChange" :type="'add'" :group="storeGroup.group" />
    <Button
      :text="'Save'"
      @click="save"
      :loading="loading"
      :theme="ButtonTheme.BRAND_DARK"
    />
    <Button
      :text="'Cancel'"
      @click="onCancel"
      :theme="ButtonTheme.BRAND_DARK"
    />
  </div>
</template>

<script setup lang="ts">
import Group from "../../components/Group/Group.vue";
import Button from "../../components/Button/Button.vue";
import ButtonTheme from "../../types/ButtonTheme";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useGroupStore } from "../../stores/group";
import { useRoute, useRouter } from "vue-router";

const storeGroup = useGroupStore();
const loading = ref<boolean>(false);
const router = useRouter();

onMounted(() => {
  const currentRoute = useRoute();
  if (currentRoute.name === "editGroup") {
    storeGroup.setActionType("edit");
    storeGroup.getGroupById(currentRoute.params.id);
  } else storeGroup.setActionType("add");
});
onBeforeUnmount(() => {
  storeGroup.reset();
});
const onChange = (group) => {
  storeGroup.updateGroup(group);
};
const save = async () => {
  loading.value = true;
  const result = await storeGroup.saveGroup();
  loading.value = false;
  result !== undefined && result !== null && result;
  //  ? this.$notify({
  //           group: "success",
  //           title: "Success",
  //           text: "Your group is saved!",
  //           duration: "3000"
  //         })
  //       : this.$notify({
  //           group: "error",
  //           title: "Failed",
  //           text: "Your group isn't saved!",
  //           duration: "3000"
  //         });

  router.push({ name: "groupList" });
};
const onCancel = () => {
  router.push({ name: "groupList" });
};
</script>

<style lang="scss" scoped>
@import "./AddGroup.scss";
</style>
