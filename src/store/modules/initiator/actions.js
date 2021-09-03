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
    // context.commit("updateDefaultBranches", defaultBranches);
  },
  updateOtherBranches(context, payload) {
    context.commit("updateOtherBranches", payload);
  },
  resetOtherBranches(context) {
    context.commit("resetOtherBranches", []);
  },
  async postTransaction(context, payload) {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        initiatorDetails: payload.user,
        txnDetails: payload.drLogEntry,
        id: payload.id,
        narration: payload.narration,
      }),
    });

    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || "Something went wrong");
      throw error;
    }

    context.commit("updateDrBranchLog", []);
  },
};
