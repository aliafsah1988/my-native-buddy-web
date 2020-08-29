<template>
  <div class="add-group-container">
    <Group @change="onChange" :type="'add'" :group="editGroup" />
    <Button
      :text="'Save'"
      @click="save"
      :loading="loading"
      :theme="buttonTheme.BRAND_DARK"
    />
    <Button
      :text="'Cancel'"
      @click="onCancel"
      :theme="buttonTheme.BRAND_DARK"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Group from "@/components/Group";
import Button from "@/components/Button";
import buttonTheme from "../../types/buttonTheme";
import "./style.scss";

export default {
  name: "AddEditGroup",
  components: {
    Group,
    Button
  },
  computed: {
    ...mapState("group", ["editGroup"])
  },
  data() {
    return {
      buttonTheme,
      loading: false
    };
  },
  mounted() {
    const currentRoute = this.$route;
    if (currentRoute.name === "EditGroup") {
      this.setActionType("edit");
      this.getGroupById(currentRoute.params.id);
    } else this.setActionType("add");
  },
  beforeDestroy() {
    this.reset();
  },
  methods: {
    ...mapActions("group", [
      "saveGroup",
      "updateGroup",
      "setActionType",
      "getGroupById",
      "reset"
    ]),
    onChange(group) {
      this.updateGroup(group);
    },
    async save() {
      this.loading = true;
      const result = await this.saveGroup();
      this.loading = false;
      result !== undefined && result !== null && result
        ? this.$notify({
            group: "success",
            title: "Success",
            text: "Your group is saved!",
            duration: "3000"
          })
        : this.$notify({
            group: "error",
            title: "Failed",
            text: "Your group isn't saved!",
            duration: "3000"
          });
      this.$router.push({ name: "GroupList" });
    },
    onCancel() {
      this.$router.push({ name: "GroupList" });
    }
  }
};
</script>
