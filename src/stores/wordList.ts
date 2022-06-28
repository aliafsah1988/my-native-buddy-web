import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { wordService } from "../services/index";

export const useWordListStore = defineStore("wordList", () => {
  const words = reactive<any[]>([]);
  const wordErrorCode = ref<number | null>(null);
  const wordeError = ref<string>("");
  const getMyWords = async () => {
    Object.assign(words, []);
    wordErrorCode.value = 0;
    wordeError.value = "";
    Object.assign(words, await wordService.getMyWords());
  };
  const deleteWord = async (wordId: any) => {
    if (await wordService.deleteById(wordId)) {
      const index = words.findIndex((word) => word._id === wordId);
      if (index > -1) words.splice(index, 1);
    }
  };

  return { words, getMyWords, deleteWord };
});
