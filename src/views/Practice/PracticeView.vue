<template>
  <div class="practice-container">
    <button @click="play">Play</button>
    <input
      v-model="text"
      type="text"
      :spellcheck="false"
      @keyup.enter="check"
    />
    <button :disabled="!enableCheck" @click="check">Check</button>
    <button v-if="hasNext && wordToShow" @click="goNext">Next</button>
    <div class="result" v-if="wordToShow" :class="resultType">{{ result }}</div>
    <Word
      v-show="wordToShow && wordToShow._id"
      :word="wordToShow"
      :type="'show'"
      disabled
    />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Word from "../../components/Word/Word.vue";
import PronunciationService from "../../../_old/src/services/pronunciation.service";
import { usePracticeStore } from "../../stores/practice";
import { useRouter } from "vue-router";

const pronunciationService = new PronunciationService();
const enablePlay = computed(() => {
  return words && words.length > 0;
});
const text = ref<string>("");
const textToShow = computed(() => {
  return wordToShow.text;
});
const { words, result, wordToShow, hasNext, getToday, next, checkWord } =
  usePracticeStore();
const router = useRouter();

onMounted(() => {
  getToday(router.currentRoute.value.params.groupId);
});

const resultType = computed(() => {
  return {
    "result-correct": result && result === "correct",
    "result-wrong": result && result === "wrong",
  };
});

const enableCheck = computed(() => {
  return wordToShow && wordToShow._id ? false : text.value.length > 0;
});

const play = () => {
  pronunciationService.play(words[0]);
};
const check = () => {
  if (!words || !words[0] || !text.value || text.value.length < 1) {
    // $notify({
    //   group: "warn",
    //   title: "Empty text",
    //   text: "Please write something to check.",
    //   duration: "5000"
    // });
    return;
  }
  checkWord({ wordId: words[0]._id, text: text.value });
};
const goNext = () => {
  text.value = "";
  next(router.currentRoute.value.params.groupId);
};

watch(
  () => hasNext,
  () => {
    // if (value === false)
    //       this.$notify({
    //         group: "success",
    //         title: "Done",
    //         text: "Nice job! Today's practices are over!",
    //         duration: "5000"
    //       });
  }
);
</script>
