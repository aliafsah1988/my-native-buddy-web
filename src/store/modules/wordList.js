import { WordService, WordError } from "../../services/word.service";

const state = {
  words: [],
  wordErrorCode: null,
  wordeError: ""
};

const getters = {
  words: state => {
    return state.words;
  }
};

const actions = {
  async getMyWords({ commit }) {
    try {
      commit("RESET");
      commit("SUCCESS", await WordService.getMyWords());
    } catch (e) {
      if (e instanceof WordError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async deleteWord({ commit }, wordId) {
    try {
      if (await WordService.deleteById(wordId)) commit("DELETE_WORD", wordId);
    } catch (e) {
      if (e instanceof WordError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  }
};

const mutations = {
  RESET(state) {
    state.words = [];
    state.wordErrorCode = 0;
    state.wordeError = "";
  },
  SUCCESS(state, words) {
    state.words = words;
  },
  FAIL(state, { errorCode, errorMessage }) {
    state.wordErrorCode = errorCode;
    state.wordeError = errorMessage;
  },
  DELETE_WORD(state, wordId) {
    const index = state.words.findIndex(word => word._id === wordId);
    if (index > -1) state.words.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
