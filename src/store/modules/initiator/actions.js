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
};
