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
    ...mapState("word", ["editWord", "actionType"])
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
      try {
      this.loading = true;
      await this.saveWord();
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
      }
      finally {
        this.loading = false;
      }

      if (this.actionType === "add") this.reset();
      else this.$router.push({ name: "WordList" });
    },
    onCancel() {
      this.$router.push({ name: "WordList" });
    }
  }
};
</script>
