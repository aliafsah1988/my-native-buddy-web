<template>
  <div class="add-word-container">
    <Word @change="onChange" :type="'add'" :word="storeWord.word"></Word>
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
import Word from "../../components/Word/Word.vue";
import Button from "../../components/Button/Button.vue";
import ButtonTheme from "../../types/ButtonTheme";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useWordStore } from "../../stores/word";
import { useRoute, useRouter } from "vue-router";

const storeWord = useWordStore();
const loading = ref<boolean>(false);
const router = useRouter();
onMounted(() => {
  const currentRoute = useRoute();
  if (currentRoute.name === "editWord") {
    storeWord.setActionType("edit");
    storeWord.getWordById(currentRoute.params.id);
  } else storeWord.setActionType("add");
});
onBeforeUnmount(() => {
  storeWord.reset();
});
const onChange = (word) => {
  console.log(word);
  storeWord.updateWord(word);
};
const save = async () => {
  loading.value = true;
  const result = await storeWord.saveWord();
  loading.value = false;
  result !== undefined && result !== null && result;
  // ? this.$notify({
  //     group: "success",
  //     title: "Success",
  //     text: "Your word is saved!",
  //     duration: "3000",
  //   })
  // : this.$notify({
  //     group: "error",
  //     title: "Failed",
  //     text: "Your word isn't saved!",
  //     duration: "3000",
  //   });

  if (storeWord.actionType === "add") storeWord.reset();
  else router.push({ name: "WordList" });
};
const onCancel = () => {
  router.push({ name: "WordList" });
};
</script>
<style lang="scss" scoped>
@import "./AddWord.scss";
</style>
