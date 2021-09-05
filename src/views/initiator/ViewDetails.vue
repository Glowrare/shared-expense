<template>
  <div class="text-center mt-3 mb-4">
    <base-button
      :link="true"
      :to="goBackRoute"
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
  name: "View Details",

  computed: {
    transaction() {
      return this.$store.getters["initiator/currentTxn"];
    },
    evenShare() {
      if (this.transaction.evenShare === "yes") {
        return true;
      } else {
        return false;
      }
    },
    goBackRoute() {
      if (this.transaction.status == "pending") {
        return "/pending-requests";
      } else {
        return "/transaction-history";
      }
    },
  },
};
</script>