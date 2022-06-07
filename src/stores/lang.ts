import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { LangService, LangError } from "../../_old/src/services/lang.service";

export const useLangStore = defineStore("lang", () => {
  const langs = reactive<any[]>([]);
  const langErrorCode = ref<number | null>(null);
  const langError = ref<string>("");

  const getLangs = async () => {
    try {
      Object.assign(langs, []);
      langErrorCode.value = 0;
      langError.value = "";
      Object.assign(langs, await LangService.getLangs());
    } catch (e: any) {
      if (e instanceof LangError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const getLangById = async (langId: any) => {
    try {
      return await LangService.getLangById(langId);
    } catch (e: any) {
      if (e instanceof LangError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const fail = (errorCode: number, errorMessage: string) => {
    langErrorCode.value = errorCode;
    langError.value = errorMessage;
  };

  return { langs, getLangs, getLangById };
});
