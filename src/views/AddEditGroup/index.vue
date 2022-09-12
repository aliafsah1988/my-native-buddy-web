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
      try {
        this.loading = true;
        await this.saveGroup();
        this.$notify({
          type: "success",
          title: "Success",
          text: "Your word is saved!",
          duration: "3000"
        });
      } catch (error) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: error,
          duration: "3000"
        });
      } finally {
        this.loading = false;
      }
      this.$router.push({ name: "GroupList" });
    },
    onCancel() {
      this.$router.push({ name: "GroupList" });
    }
  }
};
</script>
