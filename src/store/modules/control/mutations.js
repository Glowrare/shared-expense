export default {
  fetchBranchesList(state, payload) {
    state.branchesList = payload;
  },
  getSelectedBranch(state, payload) {
    state.selectedBranch = payload;
  },
  getBranchTransactions(state, payload) {
    state.branchTransactions = payload;
  },
};
