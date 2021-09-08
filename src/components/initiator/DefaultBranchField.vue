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
        @blur="$emit('check-total-one')"
        step="any"
        disabled
      />
    </div>
    <div class="col-auto col-sm-2">
      <button
        class="delete-btn"
        aria-label="Delete"
        :id="`${branch.id}-btn`"
        @click.prevent="$emit('delete-item-one', branch.id)"
      >
        <img src="../../assets/Delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
  emits: ["delete-item-one", "check-total-one"],
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