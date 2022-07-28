<template>
  <div>
    <ShowWord :words="word" />
  </div>
</template>

<script setup lang="ts">
import ShowWord from "../../components/ShowWord/ShowWord.vue";
import { wordService } from "../../services/index";
import { reactive, onMounted } from "vue";

import { useRoute } from "vue-router";
const word = reactive<any[]>([]);
const route = useRoute();
// TODO find a better way instead of as string
const groupId: string = route.params.groupId as string;
onMounted(async () => {
  Object.assign(word, await wordService.getMyWords({ groupId }));
});
</script>
