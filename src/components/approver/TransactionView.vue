<template>
  <div class="row">
    <base-card>
      <form
        class="py-4 px-2"
        @submit.prevent="$emit('approve-transaction', approvalStat)"
      >
        <h3 class="mb-5 text-center">Shared Expense</h3>

        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <label class="form-label mb-1">Enter total amount to share</label>
            <input
              type="text"
              class="form-control pry-input-border"
              :value="Number(transaction.totalAmount).toLocaleString()"
              disabled
            />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label class="form-label mb-1">Share evenly?</label>
            <div class="row" v-if="evenShare">
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    disabled
                    id="yesEvenShare"
                    class="visually-hidden"
                    value="yes"
                    checked
                  />
                  <label class="" for="yesEvenShare">Yes </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    disabled
                    id="noEvenShare"
                    class="visually-hidden"
                    value="no"
                  />
                  <label class="" for="noEvenShare">No </label>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    disabled
                    id="yesEvenShare"
                    class="visually-hidden"
                    value="yes"
                  />
                  <label class="" for="yesEvenShare">Yes </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    disabled
                    id="noEvenShare"
                    class="visually-hidden"
                    value="no"
                    checked
                  />
                  <label class="" for="noEvenShare">No </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="mb-1">Confirm branches to debit</p>
        <div class="row">
          <div class="col-12" v-for="branch in debitBranches" :key="branch.br">
            <div class="row mb-3 gx-2">
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
                <label class="form-label visually-hidden">Amount</label>
                <input
                  type="text"
                  class="form-control pry-input-border sharedAmtBox"
                  :value="Number(branch.amt).toLocaleString()"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3 gx-2">
          <div class="d-none d-sm-block col-auto col-sm-2"></div>
          <div class="d-none d-sm-block col-auto col-sm-5"></div>
          <div class="col-auto col-sm-3 mt-3 mt-sm-0">
            <label class="form-label visually-hidden">Total Amount</label>
            <input
              type="text"
              :value="Number(transaction.totalAmount).toLocaleString()"
              class="form-control pry-input-border"
              disabled
            />
          </div>
          <div class="col-auto col-sm-2"></div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <label class="form-label mb-1">Transaction Narration</label>
            <textarea
              type="text"
              class="form-control pry-input-border"
              rows="3"
              :value="transaction.narration"
              disabled
            ></textarea>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 col-md-6 mb-3">
            <p class="mb-1">Attach approval (optional)</p>
            <label
              for=""
              class="
                form-label
                upload-doc-label-fmt
                d-flex
                flex-nowrap
                justify-content-between
                px-4
                py-3
                position-relative
              "
            >
              <p class="mb-0 fw-bold text-nowrap overflow-hidden file-name">
                {{ transaction.fileName }}
              </p>
              <input
                type="file"
                class="form-control position-absolute"
                disabled
              />
            </label>
          </div>
        </div>
        <div class="text-end" v-if="approvalMode">
          <base-button mode="outline" @click="reject">Reject</base-button>
          <base-button @click="approve">Approve</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approvalStat: "",
    };
  },
  props: ["debitBranches", "transaction", "evenShare", "approvalMode"],
  methods: {
    reject() {
      this.approvalStat = "reject";
    },
    approve() {
      this.approvalStat = "approve";
    },
  },
  emits: ["approve-transaction"],
};
</script>

<style scoped>
.custom-radio-controls label {
  cursor: pointer;
  padding: 10px;
}
.custom-radio-controls input[type="radio"] {
  width: 0;
}
.custom-radio-controls input[type="radio"]:checked + label {
  color: var(--pry-grey);
  background-color: #ffffff;
  box-shadow: 2px 5px 10px rgba(232, 80, 80, 0.2);
  border-radius: 4px;
}
.upload-doc-label-fmt {
  border: 1px dashed var(--pry-grey);
  border-radius: 4px;
  background-color: var(--pale-red);
}
.upload-doc-label-fmt:hover {
  border-color: var(--brand-color);
}
.upload-doc-label-fmt > input[type="file"] {
  opacity: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.file-name {
  text-overflow: ellipsis;
}
</style>