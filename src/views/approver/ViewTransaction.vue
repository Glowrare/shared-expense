<template>
  <div class="text-center mt-3 mb-4">
    <base-button
      :link="true"
      to="/pending-approvals"
      mode="outline"
      class="text-uppercase pt-2"
      >Home</base-button
    >
  </div>
  <TransactionView
    :transaction="transaction"
    :debitBranches="transaction.txnDetails"
    :evenShare="evenShare"
    @approve-transaction="approveTransaction"
  />
  <base-dialog
    btnText="Cancel"
    proceedText="Confirm"
    :active="active"
    :singleButton="false"
    @close-modal="closeModal"
    @proceed="proceed"
  >
    <template v-slot:modalImage>
      <div>
        <img src="../../assets/et_caution.svg" class="img-fluid" alt="" />
      </div>
    </template>
    <template v-slot:default>
      <p class="my-4">
        You are about to
        <span class="fw-bold text-uppercase">{{ approvalStat }}</span> this
        transaction
      </p>
    </template>
  </base-dialog>
</template>

<script>
import TransactionView from "../../components/approver/TransactionView.vue";
export default {
  components: { TransactionView },
  name: "View Transaction",
  data() {
    return {
      active: false,
      approvalStat: "",
    };
  },
  computed: {
    transaction() {
      return this.$store.getters["approver/currentTxn"];
    },
    evenShare() {
      if (this.transaction.evenShare === "yes") {
        return true;
      } else {
        return false;
      }
    },
    status() {
      if (this.approvalStat === "approve") {
        return "approved";
      } else {
        return "rejected";
      }
    },
  },
  methods: {
    approveTransaction(approvalStat) {
      this.approvalStat = approvalStat;
      const body = document.querySelector("body");
      this.active = !this.active;
      body.classList.add("modal-open", "overflow-hidden");
    },
    async proceed() {
      await this.$store.dispatch("approver/updateTransactionStatus", {
        txnDetails: this.transaction,
        status: this.status,
      });
      this.closeModal();
      this.$router.replace("/approval-success");
    },
    closeModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      body.classList.remove("modal-open", "overflow-hidden");
    },
  },
};
</script>