import { WordService, WordError } from "../../_old/src/services/word.service";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useWordListStore = defineStore("wordList", () => {
  const words = reactive<any[]>([]);
  const wordErrorCode = ref<number | null>(null);
  const wordeError = ref<string>("");
  const getMyWords = async () => {
    try {
      Object.assign(words, []);
      wordErrorCode.value = 0;
      wordeError.value = "";
      Object.assign(words, await WordService.getMyWords());
    } catch (e: any) {
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const deleteWord = async (wordId: any) => {
    try {
      if (await WordService.deleteById(wordId)) {
        const index = words.findIndex((word) => word._id === wordId);
        if (index > -1) words.splice(index, 1);
      }
    } catch (e: any) {
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const fail = (errorCode: number, errorMessage: string) => {
    wordErrorCode.value = errorCode;
    wordeError.value = errorMessage;
  };
  return { words, getMyWords, deleteWord };
});
