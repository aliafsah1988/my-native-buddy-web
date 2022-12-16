import { reactive, ref, type Ref } from "vue";
import { wordService } from "../services/index";
import type IWordDbModel from "../types/IWordDbModel";

const LIMIT = 10;

interface IUseWord {
  words: any[];
  totalCount: Ref<number>;
  getMyWords: () => void;
  onPageChange: (page: number) => void;
  deleteWord: (wordId: any) => void;
}

export function useWord(): IUseWord {
  const words = reactive<any[]>([]);
  const totalCount = ref(0);

  const getMyWords = async (skip = 0, limit: number = LIMIT) => {
    const { total, data }: { total: number; data: IWordDbModel[] } =
      await wordService.getMyWords({
        limit: limit,
        skip: skip,
      });
    totalCount.value = total;
    words.splice(0, words.length);
    data.forEach((word: IWordDbModel) => {
      words.push(word);
    });
  };

  const onPageChange = async (page: number) => {
    const skip = (page - 1) * LIMIT;
    if (totalCount.value > skip) {
      await getMyWords(skip);
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
    totalCount,
    getMyWords,
    onPageChange,
    deleteWord,
  };
}
