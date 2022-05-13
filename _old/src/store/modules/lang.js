import { LangService, LangError } from "../../services/lang.service";

const state = {
  langs: [],
  langErrorCode: null,
  langError: ""
};

const getters = {
  langs: state => {
    return state.langs;
  }
};

const actions = {
  async getLangs({ commit }) {
    try {
      commit("RESET");
      commit("SUCCESS", await LangService.getLangs());
    } catch (e) {
      if (e instanceof LangError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async getLangById({ commit }, langId) {
    try {
      return await LangService.getLangById(langId);
    } catch (e) {
      if (e instanceof LangError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  }
};

const mutations = {
  RESET(state) {
    state.langs = [];
    state.langErrorCode = 0;
    state.langError = "";
  },
  SUCCESS(state, langs) {
    state.langs = langs;
  },
  FAIL(state, { errorCode, errorMessage }) {
    state.langErrorCode = errorCode;
    state.langError = errorMessage;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
