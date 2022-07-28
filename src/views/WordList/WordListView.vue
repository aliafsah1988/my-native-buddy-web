<template>
  <div>
    <ShowWord :words="storeWordList.words" />
  </div>
</template>

<script setup lang="ts">
import ShowWord from "../../components/ShowWord/ShowWord.vue";

import { onMounted } from "vue";
import { useWordListStore } from "../../stores/wordList";
const storeWordList = useWordListStore();

onMounted(async () => {
  await storeWordList.getMyWords();
});
</script>
