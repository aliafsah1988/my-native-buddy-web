<template>
  <div class="practice-container">
    <button @click="play">Play</button>
    <input v-model="text" type="text" />
    <button @click="check">Check</button>
    <button v-if="hasNext && wordToShow" @click="goNext">Next</button>
    <div class="result" v-if="wordToShow" :class="resultType">{{ result }}</div>
    <Word v-if="wordToShow" :word="wordToShow" :type="'show'" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Word from "@/components/Word";
import PronunciationService from "@/services/pronunciation.service";
const pronunciationService = new PronunciationService();

export default {
  name: "Practice",
  components: { Word },
  data() {
    return {
      enablePlay: false,
      text: ""
    };
  },
  mounted() {
    this.getToday(this.$route.params.groupId);
  },
  computed: {
    ...mapState("practice", ["words", "result", "wordToShow", "hasNext"]),
    // hasNext: function() {
    //   return this.words && this.words.length > 1;
    // },
    resultType: function() {
      return {
        "result-correct": this.result && this.result === "correct",
        "result-wrong": this.result && this.result === "wrong"
      };
    }
  },
  methods: {
    ...mapActions("practice", ["getToday", "checkWord", "next"]),
    play() {
      pronunciationService.play(this.words[0].text);
    },
    check() {
      this.checkWord({ wordId: this.words[0]._id, text: this.text });
    },
    goNext() {
      this.text = "";
      this.next();
    }
  },
  watch: {
    words(words) {
      this.enablePlay = words && words.length > 0;
    },
    hasNext(value) {
      if (value === false)
        this.$notify({
          group: "success",
          title: "Done",
          text: "Nice job! Today's practices are over!",
          duration: "5000"
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
