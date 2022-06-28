import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { WordService, WordError } from "../../_old/src/services/word.service";
import { wordService } from "../services/index";

export const useWordStore = defineStore("word", () => {
  let word = reactive<any>({});
  const actionType = ref<string>("");
  const wordErrorCode = ref<number>(0);
  const wordError = ref<string>("");

  const setActionType = async (newActionType: any) => {
    try {
      actionType.value = newActionType;
    } catch (e: any) {
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const updateWord = (newWord: any) => {
    try {
      Object.assign(word, newWord);
    } catch (e: any) {
      console.error(e);
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const saveWord = async () => {
    try {
      let result = null;
      if (actionType.value === "add") {
        result = await WordService.add(
          word.text,
          word.description,
          word.synonyms,
          word.translation,
          word.groupId,
          word.langId
        );
      } else {
        result = await WordService.update(
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
    } catch (e: any) {
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    } finally {
      localReset;
    }
  };
  const getWordById = async (wordId: any) => {
    try {
      const newEditWord = await WordService.getById(wordId);
      Object.assign(word, newEditWord);
    } catch (e: any) {
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const reset = async () => {
    try {
      localReset;
    } catch (e: any) {
      if (e instanceof WordError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const fail = (errorCode: number, errorMessage: string) => {
    wordErrorCode.value = errorCode;
    wordError.value = errorMessage;
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
