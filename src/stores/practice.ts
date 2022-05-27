import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {
  PracticeService,
  PracticeError,
} from "../../_old/src/services/practice.service";

export const usePracticeStore = defineStore("practice", () => {
  const words = reactive<any[]>([]);
  const result = ref<string | null>("");
  const practiceErrorCode = ref<number | null>(null);
  const practiceError = ref<string>("");
  const wordToShow = reactive<any>({});
  const hasNext = ref<boolean | undefined>(undefined);

  const getToday = async (groupId: any) => {
    try {
      Object.assign(words, []);
      practiceErrorCode.value = 0;
      practiceError.value = "";
      const practiceWords = await PracticeService.getToday(groupId);
      if (practiceWords.length === 0) {
        hasNext.value = false;
      } else {
        Object.assign(words, practiceWords);
        hasNext.value = true;
      }
    } catch (e: any) {
      if (e instanceof PracticeError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const checkWord = async (arrgs: any) => {
    try {
      const practiceResult = await PracticeService.check(
        arrgs.wordId,
        arrgs.text
      );
      if (practiceResult) {
        result.value = practiceResult;
        Object.assign(wordToShow, words[0]);
      }
    } catch (e: any) {
      if (e instanceof PracticeError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const next = async (groupId: any) => {
    try {
      if (words.length === 1) {
        await getToday(groupId);
      } else {
        if (words.length > 0) {
          words.splice(0, 1);
          Object.assign(wordToShow, null);
          result.value = null;
        }
      }
    } catch (e: any) {
      if (e instanceof PracticeError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const fail = (errorCode: number, errorMessage: string) => {
    practiceErrorCode.value = errorCode;
    practiceError.value = errorMessage;
  };
  return { words, result, wordToShow, hasNext, getToday, checkWord, next };
});
