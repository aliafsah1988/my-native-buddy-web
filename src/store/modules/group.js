import { GroupService, GroupError } from "../../services/group.service";

const state = {
  group: null,
  actionType: "",
  editGroup: null,
  groupErrorCode: 0,
  groupError: ""
};

const getters = {
  group: state => {
    return state.group;
  }
};

const actions = {
  async setActionType({ commit }, actionType) {
    try {
      commit("SET_ACTION_TYPE", actionType);
    } catch (e) {
      if (e instanceof GroupError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async updateGroup({ commit }, group) {
    try {
      commit("UPDATE_GROUP", group);
    } catch (e) {
      if (e instanceof GroupError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async saveGroup({ commit, state }) {
    try {
      let result = null;
      if (state.actionType === "add") {
        result = await GroupService.add(
          state.group.name,
          state.group.description
        );
      } else {
        result = await GroupService.update(
          state.editGroup._id,
          state.group.name,
          state.group.description
        );
      }
      return result;
    } catch (e) {
      if (e instanceof GroupError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    } finally {
      commit("RESET");
    }
  },
  async getGroupById({ commit }, groupId) {
    try {
      const group = await GroupService.getById(groupId);
      commit("SET_EDITED_GROUP", group);
      return group;
    } catch (e) {
      if (e instanceof GroupError) {
        commit("FAIL", { errorCode: e.errorCode, errorMessage: e.message });
      }
      return false;
    }
  },
  async reset({ commit }) {
    try {
      commit("RESET");
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
    state.group = null;
    state.practiceErrorCode = 0;
    state.practiceError = "";
    state.editGroup = undefined;
  },
  UPDATE_GROUP(state, group) {
    state.group = group;
  },
  FAIL(state, { errorCode, errorMessage }) {
    state.practiceErrorCode = errorCode;
    state.practiceError = errorMessage;
  },
  SET_ACTION_TYPE(state, actionType) {
    state.actionType = actionType;
  },
  SET_EDITED_GROUP(state, editGroup) {
    state.editGroup = editGroup;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
