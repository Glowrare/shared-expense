export default {
  async fetchBranchTransactions(context, payload) {
    const response = await fetch("http://localhost:3000/transactions");
    const responseData = await response.json();

    const branchTransactions = responseData.filter(
      (txn) => txn.initiatorDetails.branch.t24Code == payload
    );

    context.commit("getBranchTransactions", branchTransactions);
    // const initBranch = responseData.initiatorDetails.branch.t24Code;
  },
  async fetchPendingTransactions(context) {
    const allTransactions = await context.dispatch("fetchTransactions");

    const userID = context.rootState.auth.userDetails;

    const pendingTransactions = allTransactions.filter(
      (txn) =>
        txn.status === "pending" &&
        txn.initiatorDetails.supervisor === userID.id
    );

    context.commit("fetchPendingTxns", pendingTransactions);
  },
  async fetchApprovedTransactions(context) {
    const allTransactions = await context.dispatch("fetchTransactions");

    const userID = context.rootState.auth.userDetails;

    const approvedTransactions = allTransactions.filter(
      (txn) =>
        txn.status !== "pending" &&
        txn.initiatorDetails.supervisor === userID.id
    );

    context.commit("fetchApprovedTxns", approvedTransactions);
  },
  async updateTransactionStatus(context, payload) {
    const updatedData = {
      ...payload.txnDetails,
      status: payload.status,
    };

    const response = await fetch(
      `http://localhost:3000/transactions/${payload.txnDetails.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const responseData = await response.json();

    console.log(responseData);

    context.commit("currentTxn", updatedData);
  },
};
