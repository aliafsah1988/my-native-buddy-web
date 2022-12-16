<template>
  <div class="word-list-container">
    <ShowWord :words="word.words" @delete="word.deleteWord" />
    <Pagination :total="word.totalCount.value" @page="word.onPageChange" />
  </div>
</template>

<script setup lang="ts">
import ShowWord from "../../components/ShowWord/ShowWord.vue";
import Pagination from "../../components/Pagination.vue";

import { onMounted } from "vue";
import { useWord } from "../../composables/useWord";

const word = useWord();

onMounted(async () => {
  await word.getMyWords();
});
</script>

<style lang="scss" scoped>
.word-list-container {
  display: flex;
  flex-direction: column;
  gap: 3vh;
}
</style>
