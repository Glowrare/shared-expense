<template>
  <div class="text-end">
    <router-link to="/" class="text-danger text-decoration-none"
      >Transaction History</router-link
    >
  </div>
  <div>
    <TransactionTable
      :pendingTxns="pendingTxns"
      @view-transaction="viewTransaction"
    />
  </div>
</template>

<script>
import TransactionTable from "../../components/approver/TransactionTable.vue";
export default {
  name: "Pending Approvals",
  components: { TransactionTable },
  computed: {
    pendingTxns() {
      return this.$store.getters["approver/pendingTxns"];
    },
  },
  created() {
    this.$store.dispatch("approver/fetchPendingTransactions");
  },
  methods: {
    viewTransaction(id) {
      const selectedTxn = this.pendingTxns.find((txn) => txn.id == id);
      this.$store.commit("approver/currentTxn", selectedTxn);
      this.$router.replace("/view-transaction");
    },
  },
};
</script>