<template>
  <div class="row mb-3 gx-2 other-branches" :id="branch.id">
    <div class="col-auto col-sm-2">
      <select
        class="form-select pry-input-border"
        aria-label="Branch Code"
        v-model="selBranch"
        @change="getBranchDetails"
        @blur="recalculate"
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
        type="number"
        class="form-control pry-input-border sharedAmtBox"
        placeholder="0"
        :id="`${branch.id}-amt`"
        @blur="$emit('check-total-other')"
        disabled
      />
    </div>
    <div class="col-auto col-sm-2">
      <button
        class="delete-btn"
        aria-label="Delete"
        @click.prevent="$emit('delete-item', branch.id)"
        :id="`${branch.id}-btn`"
      >
        <img src="../../assets/Delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selBranch: "",
      branch: {},
    };
  },
  computed: {
    branches() {
      return this.$store.getters["initiator/branchesList"].allBranches;
    },
    otherBranches() {
      return this.$store.getters["initiator/branchesList"].otherBranches;
    },
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
      this.$store.dispatch("initiator/updateOtherBranches", this.branch.id);
    },
    recalculate() {
      if (this.evenShareStat === "yes") {
        this.apportioner();
      }
    },
  },
  props: ["evenShareStat", "apportioner"],
  emits: ["delete-item", "check-total-other"],
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