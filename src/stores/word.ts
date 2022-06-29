import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { wordService } from "../services/index";

export const useWordStore = defineStore("word", () => {
  let word = reactive<any>({});
  const actionType = ref<string>("");
  const wordErrorCode = ref<number>(0);
  const wordError = ref<string>("");

  const setActionType = async (newActionType: any) => {
    actionType.value = newActionType;
  };
  const updateWord = (newWord: any) => {
    Object.assign(word, newWord);
  };
  const saveWord = async () => {
    try {
      let result = null;
      if (actionType.value === "add") {
        result = await wordService.add(
          word.text,
          word.description,
          word.synonyms,
          word.translation,
          word.groupId,
          word.langId
        );
      } else {
        result = await wordService.update(
          word._id,
          word.text,
          word.description,
          word.synonyms,
          word.translation,
          word.groupId,
          word.langId
        );
      }
      return result;
    } finally {
      localReset;
    }
  };
  const getWordById = async (wordId: any) => {
    const newEditWord = await wordService.getById(wordId);
    Object.assign(word, newEditWord);
  };
  const reset = async () => {
    localReset;
  };

  const localReset = () => {
    word = reactive<any>({});
    wordErrorCode.value = 0;
    wordError.value = "";
  };
  return {
    word,
    actionType,
    saveWord,
    updateWord,
    reset,
    setActionType,
    getWordById,
  };
});
