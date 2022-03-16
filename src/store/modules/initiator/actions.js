export default {
  async fetchBranches(context, payload) {
    const response = await fetch('api/branches');
    const responseData = await response.json();
    const defaultBranches = [];
    const otherBranches = [];
    responseData.forEach((branch) => {
      if (branch.region === payload.branch.region) {
        defaultBranches.push(branch);
      } else {
        otherBranches.push(branch);
      }
    });
    context.commit('fetchBranchesList', {
      allBranches: responseData,
      defaultBranches: defaultBranches,
      otherBranches: otherBranches,
    });
  },
  updateOtherBranches(context, payload) {
    context.commit('updateOtherBranches', payload);
  },
  resetOtherBranches(context) {
    context.commit('resetOtherBranches', []);
  },
  async postTransaction(context, payload) {
    context.commit('fetchPostID', '');

    const response = await fetch('api/transactions', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        initiatorDetails: payload.user,
        totalAmount: payload.totalAmount,
        txnDetails: payload.drLogEntry,
        id: payload.id,
        narration: payload.narration,
        txnTime: payload.txnTime,
        evenShare: payload.evenShare,
        noUpload: payload.noUpload,
        fileName: payload.fileName,
        status: 'pending',
      }),
    });

    const responseData = await response.json();

    context.commit('fetchPostID', payload.id);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong');
      throw error;
    }

    context.commit('updateDrBranchLog', []);
  },
  async fetchTransactions() {
    const response = await fetch('api/transactions');
    const responseData = await response.json();

    return responseData;
  },
  async fetchPendingTransactions(context) {
    const allTransactions = await context.dispatch('fetchTransactions');

    const userID = context.rootState.auth.userDetails;

    const pendingTransactions = allTransactions.filter(
      (txn) => txn.status === 'pending' && txn.initiatorDetails.id === userID.id
    );

    context.commit('fetchPendingTxns', pendingTransactions);
  },
  async fetchApprovedTransactions(context) {
    const allTransactions = await context.dispatch('fetchTransactions');

    const userID = context.rootState.auth.userDetails;

    const approvedTransactions = allTransactions.filter(
      (txn) => txn.status !== 'pending' && txn.initiatorDetails.id === userID.id
    );

    context.commit('fetchApprovedTxns', approvedTransactions);
  },
};
