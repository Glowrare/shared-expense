<template>
  <div class="row mb-3 gx-2" :id="branch.id">
    <div class="col-auto col-sm-2">
      <label class="form-label visually-hidden">Branch Code</label>
      <input
        type="text"
        class="form-control pry-input-border"
        :value="branch.banksCode"
        disabled
      />
    </div>
    <div class="col-auto col-sm-5">
      <label class="form-label visually-hidden">Branch Code</label>
      <input
        type="text"
        class="form-control pry-input-border"
        :value="branch.ledger"
        disabled
      />
    </div>
    <div class="col-auto col-sm-3">
      <label class="form-label visually-hidden">Branch Code</label>
      <input
        type="number"
        class="form-control pry-input-border sharedAmtBox"
        placeholder="0"
        :id="`${branch.id}-amt`"
      />
    </div>
    <div class="col-auto col-sm-2">
      <button class="delete-btn" aria-label="Close" :id="`${branch.id}-btn`">
        <img src="../../assets/Delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // shrdAmountDefault: null,
    };
  },
  props: {
    value: {
      type: Number,
    },
    branch: {
      type: Object,
      required: true,
    },
    evenShareStat: {
      type: Boolean,
    },
  },
  // computed: {
  //   shrdAmountDefault: {
  //     get() {
  //       return this.value;
  //     },
  //     set(val) {
  //       this.$emit("update-value", val);
  //     },
  //   },
  // },
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