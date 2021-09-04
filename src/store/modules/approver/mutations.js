export default {
  fetchPendingTxns(state, payload) {
    state.pendingTxns = payload;
  },
  fetchApprovedTxns(state, payload) {
    state.approvedTxns = payload;
  },
  currentTxn(state, payload) {
    state.currentTxn = payload;
  },
};
