  <template>
  <div class="text-center mt-3 mb-4">
    <base-button
      :link="true"
      to="/control-welcome"
      mode="outline"
      class="text-uppercase pt-2"
      >Home</base-button
    >
  </div>
  <div>
    <p class="fs-5">
      Now showing transactions for Branch
      <span class="fw-bold">{{ this.$route.query.branch }}</span>
    </p>
  </div>
  <div>
    <TransactionTable
      :pendingTxns="branchTxns"
      @view-transaction="viewTransaction"
    />
  </div>
</template>

<script>
import TransactionTable from "../../components/approver/TransactionTable.vue";
export default {
  name: "Branch Transactions",
  components: { TransactionTable },
  computed: {
    branchTxns() {
      return this.$store.getters["control/branchTransactions"];
    },
  },
  created() {
    this.getTransaction();
  },
  methods: {
    async getTransaction() {
      const actionPayload = this.$route.query.branch;

      try {
        await this.$store.dispatch(
          "control/fetchBranchTransactions",
          actionPayload
        );
      } catch (err) {
        this.error =
          err.message || "Oops! Something went wronng. Please try later.";
      }
    },
    viewTransaction(id) {
      const selectedTxn = this.branchTxns.find((txn) => txn.id == id);
      this.$store.commit("approver/currentTxn", selectedTxn);
      this.$router.replace({
        path: "/view-single-transaction",
        query: { branch: this.$route.query.branch, transactionID: id },
      });
    },
  },
};
</script>