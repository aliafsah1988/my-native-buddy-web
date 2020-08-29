<template>
  <div class="my-words-container">
    <table>
      <tr>
        <th>Word</th>
        <th>Description</th>
        <th>Synonyms</th>
        <th>Translation</th>
        <th>Actions</th>
      </tr>
      <tr v-for="word in words" :key="word._id">
        <th>{{ word.text }}</th>
        <th>{{ word.description }}</th>
        <th>{{ word.synonyms }}</th>
        <th>{{ word.translation }}</th>
        <th>
          <router-link :to="{ name: 'EditWord', params: { id: word._id } }"
            >Edit
          </router-link>
          <Button @click="deleteWord(word._id)" :text="'Delete'" />
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "WordList",
  computed: {
    ...mapState("wordList", ["words"])
  },
  mounted() {
    this.getMyWords();
  },
  methods: {
    ...mapActions("wordList", ["getMyWords", "deleteWord"])
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
