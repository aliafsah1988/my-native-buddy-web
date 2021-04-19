<template>
  <div class="my-words-container">
    <table id="table">
      <tr>
        <th>Word</th>
        <th>Description</th>
        <th>Synonyms</th>
        <th>Translation</th>
        <th>Actions</th>
      </tr>
      <tr v-for="word in words" :key="word._id">
        <td>{{ word.text }}</td>
        <td>{{ word.description }}</td>
        <td>{{ word.synonyms }}</td>
        <td>{{ word.translation }}</td>
        <td>
          <router-link :to="{ name: 'EditWord', params: { id: word._id } }"
            ><img src="../../assets/image/edit.svg" />
          </router-link>
          <img
            src="../../assets/image/delete.png"
            @click="deleteWord(word._id)"
          />
        </td>
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
