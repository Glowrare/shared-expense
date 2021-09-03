export default {
  fetchBranchesList(state, payload) {
    state.branchesList = payload;
  },
  updateOtherBranches(state, payload) {
    state.otherBranches.push(payload);
  },
  resetOtherBranches(state, payload) {
    state.otherBranches = payload;
  },
  updateDrBranchLog(state, payload) {
    state.drBranchLog = payload;
  },
  fetchPostID(state, payload) {
    state.postID = payload;
  },
};
