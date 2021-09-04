<template>
  <div class="text-center mt-3 mb-4">
    <base-button
      :link="true"
      to="/approval-history"
      mode="outline"
      class="text-uppercase pt-2"
      >Go Back</base-button
    >
  </div>
  <TransactionView
    :approvalMode="false"
    :transaction="transaction"
    :debitBranches="transaction.txnDetails"
    :evenShare="evenShare"
  />
</template>

<script>
import TransactionView from "../../components/approver/TransactionView.vue";
export default {
  components: { TransactionView },
  name: "View Transaction Details",

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
  },
};
</script>