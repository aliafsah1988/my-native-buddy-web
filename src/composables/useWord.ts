import { reactive, ref } from "vue";
import { wordService } from "../services/index";

const LIMIT = 10;

interface IUseWord {
  words: any[];
  getMyWords: () => void;
  nextPage: () => void;
  deleteWord: (wordId: any) => void;
}

export function useWord(): IUseWord {
  const words = reactive<any[]>([]);
  let skip = 0;
  let totalCount = -1;

  const getMyWords = async () => {
    const { total, data } = await wordService.getMyWords({
      limit: LIMIT,
      skip: skip,
    });
    totalCount = total;
    Object.assign(words, data);
  };

  const nextPage = async () => {
    if (totalCount - LIMIT > skip) {
      skip += LIMIT;
      await getMyWords();
    }
  };

  const deleteWord = async (wordId: string) => {
    if (await wordService.deleteById(wordId)) {
      const index = words.findIndex((word) => word._id === wordId);
      if (index > -1) words.splice(index, 1);
    }
  };

  return {
    words,
    getMyWords,
    nextPage,
    deleteWord,
  };
}
