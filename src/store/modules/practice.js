import {
  PracticeService,
  PracticeError
} from "../../services/practice.service";

const state = {
  words: [],
  result: "",
  practiceErrorCode: null,
  practiceError: "",
  wordToShow: "",
  hasNext: undefined
};

const getters = {
  words: state => {
    return state.words;
  }
};

const actions = {
  async getToday({ commit }, groupId) {
    try {
      commit("RESET");
      const words = await PracticeService.getToday(groupId);
      if (words.length === 0) return commit("SET_HAS_NEXT", false);

      commit("SUCCESS", words);
      commit("SET_HAS_NEXT", true);
    } catch (e) {
      if (e instanceof PracticeError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async checkWord({ commit }, arrgs) {
    try {
      const result = await PracticeService.check(arrgs.wordId, arrgs.text);
      if (result) {
        commit("SET_RESULT", result);
      }
    } catch (e) {
      if (e instanceof PracticeError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async next({ commit, state, dispatch }) {
    try {
      if (state.words.length === 1) return dispatch("getToday");
      commit("REMOVE");
    } catch (e) {
      if (e instanceof PracticeError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  }
};

const mutations = {
  RESET(state) {
    state.words = [];
    state.practiceErrorCode = 0;
    state.practiceError = "";
  },
  SUCCESS(state, words) {
    state.words = words;
  },
  FAIL(state, { errorCode, errorMessage }) {
    state.practiceErrorCode = errorCode;
    state.practiceError = errorMessage;
  },
  REMOVE(state) {
    if (state.words.length > 0) {
      state.words.splice(0, 1);
      state.wordToShow = null;
      state.result = null;
    }
  },
  SET_RESULT(state, result) {
    state.result = result;
    state.wordToShow = state.words[0];
  },
  SET_HAS_NEXT(state, hasNext) {
    state.hasNext = hasNext;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
