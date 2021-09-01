<template>
  <div class="row mb-3 gx-2" :id="branch.id">
    <div class="col-auto col-sm-2">
      <label for="" class="form-label visually-hidden">Branch Code</label>
      <input
        type="text"
        class="form-control pry-input-border"
        :value="branch.banksCode"
        disabled
      />
    </div>
    <div class="col-auto col-sm-5">
      <label for="" class="form-label visually-hidden">Branch Code</label>
      <input
        type="text"
        class="form-control pry-input-border"
        :value="branch.ledger"
        disabled
      />
    </div>
    <div class="col-auto col-sm-3">
      <label for="" class="form-label visually-hidden">Branch Code</label>
      <input
        type="text"
        v-model.number.trim="test"
        class="form-control pry-input-border"
        placeholder="0"
      />
    </div>
    <div class="col-auto col-sm-2">
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "",
    };
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
};
</script>