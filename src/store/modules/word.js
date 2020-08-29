import { WordService, WordError } from "../../services/word.service";

const state = {
  word: null,
  actionType: "",
  editWord: undefined,
  wordErrorCode: 0,
  wordError: ""
};

const getters = {
  word: state => {
    return state.word;
  }
};

const actions = {
  async setActionType({ commit }, actionType) {
    try {
      commit("SET_ACTION_TYPE", actionType);
    } catch (e) {
      if (e instanceof WordError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async updateWord({ commit }, word) {
    try {
      commit("UPDATE_WORD", word);
    } catch (e) {
      if (e instanceof WordError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async saveWord({ commit, state }) {
    try {
      let result = null;
      if (state.actionType === "add") {
        result = await WordService.add(
          state.word.text,
          state.word.description,
          state.word.synonyms,
          state.word.translation,
          state.word.groupId
        );
      } else {
        result = await WordService.update(
          state.editWord._id,
          state.word.text,
          state.word.description,
          state.word.synonyms,
          state.word.translation,
          state.word.groupId
        );
      }
      return result;
    } catch (e) {
      if (e instanceof WordError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    } finally {
      commit("RESET");
    }
  },
  async getWordById({ commit }, wordId) {
    try {
      const editWord = await WordService.getById(wordId);
      commit("SET_EDITED_WORD", editWord);
    } catch (e) {
      if (e instanceof WordError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async reset({ commit }) {
    try {
      commit("RESET");
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
    state.word = null;
    state.practiceErrorCode = 0;
    state.practiceError = "";
    state.editWord = undefined;
  },
  UPDATE_WORD(state, word) {
    state.word = word;
  },
  FAIL(state, { errorCode, errorMessage }) {
    state.practiceErrorCode = errorCode;
    state.practiceError = errorMessage;
  },
  SET_ACTION_TYPE(state, actionType) {
    state.actionType = actionType;
  },
  SET_EDITED_WORD(state, editWord) {
    state.editWord = editWord;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
