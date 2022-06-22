<template>
  <div class="my-words-container">
    <table id="table-words">
      <tr>
        <th>Word</th>
        <th>Description</th>
        <th>Synonyms</th>
        <th>Translation</th>
        <th>Actions</th>
      </tr>
      <tr v-for="word in storeWordList.words" :key="word._id">
        <td>{{ word.text }}</td>
        <td>{{ word.description }}</td>
        <td>{{ word.synonyms }}</td>
        <td>{{ word.translation }}</td>
        <td>
          <router-link :to="{ name: 'editWord', params: { id: word._id } }"
            ><img src="../../assets/image/edit.svg" />
          </router-link>
          <img
            src="../../assets/image/delete.png"
            @click="storeWordList.deleteWord(word._id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useWordListStore } from "../../stores/wordList";
const storeWordList = useWordListStore();

onMounted(async () => {
  await storeWordList.getMyWords();
});
</script>

<style lang="scss" scoped>
@import "./WordList.scss";
</style>
