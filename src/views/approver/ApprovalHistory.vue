<template>
  <div class="text-end">
    <router-link
      to="/pending-approvals"
      class="text-danger text-decoration-none"
      >Pending Transactions</router-link
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
  name: "Approval History",
  components: { TransactionTable },
  computed: {
    approvedTxn() {
      return this.$store.getters["approver/approvedTxns"];
    },
  },
  created() {
    this.$store.dispatch("approver/fetchApprovedTransactions");
  },
  methods: {
    viewTransaction(id) {
      const selectedTxn = this.approvedTxn.find((txn) => txn.id == id);
      this.$store.commit("approver/currentTxn", selectedTxn);
      this.$router.replace("/view-transaction-details");
    },
  },
};
</script>