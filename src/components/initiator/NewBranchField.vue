<template>
  <div class="row mb-3 gx-2">
    <div class="col-auto col-sm-2">
      <select
        class="form-select pry-input-border"
        aria-label="Branch Code"
        v-model="selBranch"
        @change="getBranchDetails"
      >
        <option v-for="branch in otherBranches" :key="branch.id">
          {{ branch.banksCode }}
        </option>
      </select>
    </div>
    <div class="col-auto col-sm-5">
      <label class="form-label visually-hidden">Ledger Account Number</label>
      <input
        type="text"
        class="form-control pry-input-border"
        :value="branch.ledger"
        disabled
      />
    </div>
    <div class="col-auto col-sm-3">
      <label class="form-label visually-hidden">Amount</label>
      <input
        type="text"
        v-model.number.trim="test"
        class="form-control pry-input-border"
        placeholder="0"
      />
    </div>
    <div class="col-auto col-sm-2">
      <button class="delete-btn" aria-label="Close">
        <img src="../../assets/Delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "",
      selBranch: "",
      branch: {},
    };
  },
  props: {
    //   branch: {
    //     type: Object,
    //     required: true,
    //   },
    branches: Array,
    otherBranches: Array,
  },
  methods: {
    getBranchDetails() {
      const selectedBranch = this.selBranch;
      const allBranches = this.branches;
      let branchFullDetails;
      allBranches.forEach((branch) => {
        if (branch.banksCode === selectedBranch) {
          branchFullDetails = branch;
        }
      });
      this.branch = branchFullDetails;
    },
  },
};
</script>

<style scoped>
.delete-btn {
  background: none;
  border: none;
}
.delete-btn:hover {
  transform: scale(1.1);
}
</style>