export default {
  async fetchBranches(context, payload) {
    const response = await fetch("http://localhost:3000/branches");
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
    context.commit("fetchBranchesList", {
      allBranches: responseData,
      defaultBranches: defaultBranches,
      otherBranches: otherBranches,
    });
  },
  updateOtherBranches(context, payload) {
    context.commit("updateOtherBranches", payload);
  },
  resetOtherBranches(context) {
    context.commit("resetOtherBranches", []);
  },
  async postTransaction(context, payload) {
    context.commit("fetchPostID", "");

    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        initiatorDetails: payload.user,
        totalAmount: payload.totalAmount,
        txnDetails: payload.drLogEntry,
        id: payload.id,
        narration: payload.narration,
        txnTime: payload.txnTime,
        status: "pending",
      }),
    });

    const responseData = await response.json();

    context.commit("fetchPostID", payload.id);

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || "Something went wrong");
      throw error;
    }

    context.commit("updateDrBranchLog", []);
  },
};
