import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      branchesList: [],
      otherBranches: [],
      drBranchLog: [],
      postID: "",
      // defaultBranches: {},
    };
  },
  mutations,
  actions,
  getters,
};
