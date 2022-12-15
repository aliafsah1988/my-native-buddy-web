<template>
  <div>
    <ShowWord
      :words="word.words"
      @delete="word.deleteWord"
      @next="word.nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import ShowWord from "../../components/ShowWord/ShowWord.vue";

import { onMounted } from "vue";
import { useWord } from "../../composables/useWord";

const word = useWord();

onMounted(async () => {
  await word.getMyWords();
});
</script>
