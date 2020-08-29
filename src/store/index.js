import Vue from "vue";
import Vuex from "vuex";
import practice from "./modules/practice";
import word from "./modules/word";
import group from "./modules/group";
import wordList from "./modules/wordList";
import groupList from "./modules/groupList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { practice, word, wordList, groupList, group }
});
