<template>
  <div class="add-word-container">
    <Word @change="onChange" :type="'add'" :word="editWord"></Word>
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
import Word from "@/components/Word";
import Button from "@/components/Button";
import buttonTheme from "../../types/buttonTheme";
import "./style.scss";

export default {
  name: "AddWord",
  components: {
    Word,
    Button
  },
  computed: {
    ...mapState("word", ["editWord","actionType"])
  },
  data() {
    return {
      buttonTheme,
      loading: false
    };
  },
  mounted() {
    const currentRoute = this.$route;
    if (currentRoute.name === "EditWord") {
      this.setActionType("edit");
      this.getWordById(currentRoute.params.id);
    } else this.setActionType("add");
  },
  beforeDestroy() {
    this.reset();
  },
  methods: {
    ...mapActions("word", [
      "saveWord",
      "updateWord",
      "setActionType",
      "getWordById",
      "reset"
    ]),
    onChange(word) {
      this.updateWord(word);
    },
    async save() {
      this.loading = true;
      const result = await this.saveWord();
      this.loading = false;
      result !== undefined && result !== null && result
        ? this.$notify({
            group: "success",
            title: "Success",
            text: "Your word is saved!",
            duration: "3000"
          })
        : this.$notify({
            group: "error",
            title: "Failed",
            text: "Your word isn't saved!",
            duration: "3000"
          });

      if(this.actionType === "add")
        this.reset();
      else
        this.$router.push({ name: "WordList" });
    },
    onCancel() {
      this.$router.push({ name: "WordList" });
    }
  }
};
</script>
