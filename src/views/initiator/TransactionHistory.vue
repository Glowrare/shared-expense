<template>
  <div class="text-center mt-3 mb-4">
    <base-button
      :link="true"
      to="/user-welcome"
      mode="outline"
      class="text-uppercase pt-2"
      >Home</base-button
    >
  </div>
  <div>
    <TransactionTable
      :pendingTxns="approvedTxn"
      @view-transaction="viewTransaction"
    />
  </div>
</template>

<script>
import TransactionTable from "../../components/approver/TransactionTable.vue";
export default {
  name: "Transaction History",
  components: { TransactionTable },
  computed: {
    approvedTxn() {
      return this.$store.getters["initiator/approvedTxns"];
    },
  },
  created() {
    this.$store.dispatch("initiator/fetchApprovedTransactions");
  },
  methods: {
    viewTransaction(id) {
      const selectedTxn = this.approvedTxn.find((txn) => txn.id == id);
      this.$store.commit("initiator/currentTxn", selectedTxn);
      this.$router.replace("/view-details");
    },
  },
};
</script>