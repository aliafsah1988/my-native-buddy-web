import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { langService } from "../services/index";

export const useLangStore = defineStore("lang", () => {
  const langs = reactive<any[]>([]);
  const langErrorCode = ref<number | null>(null);
  const langError = ref<string>("");

  const getLangs = async () => {
    Object.assign(langs, []);
    langErrorCode.value = 0;
    langError.value = "";
    Object.assign(langs, await langService.getLangs());
  };
  const getLangById = async (langId: any) => {
    return await langService.getLangById(langId);
  };

  return { langs, getLangs, getLangById };
});
