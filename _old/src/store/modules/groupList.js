import { GroupService, GroupError } from "../../services/group.service";

const state = {
  groups: [],
  groupErrorCode: null,
  groupError: ""
};

const getters = {
  groups: state => {
    return state.groups;
  }
};

const actions = {
  async getMyGroups({ commit }) {
    try {
      commit("RESET");
      commit("SUCCESS", await GroupService.getMyGroups());
    } catch (e) {
      if (e instanceof GroupError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async deleteGroup({ commit }, groupId) {
    try {
      if (await GroupService.deleteById(groupId))
        commit("DELETE_GROUP", groupId);
    } catch (e) {
      if (e instanceof GroupError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  }
};

const mutations = {
  RESET(state) {
    state.groups = [];
    state.groupErrorCode = 0;
    state.groupError = "";
  },
  SUCCESS(state, groups) {
    state.groups = groups;
  },
  FAIL(state, { errorCode, errorMessage }) {
    state.groupErrorCode = errorCode;
    state.groupError = errorMessage;
  },
  DELETE_GROUP(state, groupId) {
    const index = state.groups.findIndex(group => group._id === groupId);
    if (index > -1) state.groups.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
