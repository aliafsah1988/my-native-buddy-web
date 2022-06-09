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
    <button
      v-if="
        store.hasNext &&
        store.wordToShow !== undefined &&
        store.wordToShow._id !== undefined
      "
      @click="goNext"
    >
      Next
    </button>
    <div class="result" v-if="store.wordToShow" :class="resultType">
      {{ store.result }}
    </div>
    <Word
      v-show="store.wordToShow && store.wordToShow._id"
      :word="store.wordToShow"
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

const store = usePracticeStore();
const pronunciationService = new PronunciationService();
const enablePlay = computed(() => {
  return store.words && store.words.length > 0;
});
const text = ref<string>("");
const textToShow = computed(() => {
  return store.wordToShow.text;
});

const router = useRouter();

onMounted(() => {
  store.getToday(router.currentRoute.value.params.groupId);
});

const resultType = computed(() => {
  return {
    "result-correct": store.result && store.result === "correct",
    "result-wrong": store.result && store.result === "wrong",
  };
});

const enableCheck = computed(() => {
  return store.wordToShow && store.wordToShow._id
    ? false
    : text.value.length > 0;
});

const play = () => {
  pronunciationService.play(store.words[0]);
};
const check = () => {
  if (!store.words || !store.words[0] || !text.value || text.value.length < 1) {
    // $notify({
    //   group: "warn",
    //   title: "Empty text",
    //   text: "Please write something to check.",
    //   duration: "5000"
    // });
    return;
  }
  store.checkWord({ wordId: store.words[0]._id, text: text.value });
};
const goNext = () => {
  text.value = "";
  store.next(router.currentRoute.value.params.groupId);
};

watch(
  () => store.hasNext,
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
