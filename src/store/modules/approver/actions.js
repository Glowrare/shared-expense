export default {
  async fetchTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const responseData = await response.json();

    return responseData;
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
        txn.status === "approved" &&
        txn.initiatorDetails.supervisor === userID.id
    );

    context.commit("fetchApprovedTxns", approvedTransactions);
  },
};
