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
      <tr v-for="word in words" :key="word._id">
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
            @click="emit('delete', word._id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  words: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

const emit = defineEmits(["delete"]);
</script>

<style lang="scss" scoped>
@import "./ShowWord.scss";
</style>
