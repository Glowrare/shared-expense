<template>
  <div class="table-wrapper d-block">
    <div class="table-responsive">
      <table class="table table-hover roundedge-table">
        <thead>
          <tr class="text-white">
            <th>SN</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Narration</th>
            <th>Teller ID</th>
            <th>Transaction time</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(txn, index) in pendingTxns" :key="txn.id">
            <td>{{ index + 1 }}</td>
            <td>{{ txn.id }}</td>
            <td>{{ Number(txn.totalAmount).toLocaleString() }}</td>
            <td>{{ txn.narration }}</td>
            <td>{{ txn.initiatorDetails.username }}</td>
            <td>{{ txn.txnTime }}</td>
            <td>
              <span
                :class="
                  txn.status === 'approved' ? 'text-success' : 'text-danger'
                "
                class="fw-bold"
                >{{
                  txn.status.charAt(0).toUpperCase() + txn.status.slice(1)
                }}</span
              >
            </td>
            <td>
              <button
                type="button"
                class="bare-red-btn-format"
                :id="txn.id"
                @click="$emit('view-transaction', txn.id)"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rowIndex: 0,
    };
  },
  props: {
    pendingTxns: {
      type: Array,
      required: true,
    },
  },
  emits: ["view-transaction"],
};
</script>

<style scoped>
.table-wrapper {
  flex-wrap: wrap;
  margin-top: 20px;
  max-width: 90vw;
}
.roundedge-table {
  border-radius: 20px;
  font-size: 14px;
  border: solid 1px #333333;
  border-collapse: separate;
  border-spacing: 0;
}
.roundedge-table thead tr {
  background-color: #333333;
}
.roundedge-table tr:first-child th:first-child {
  border-top-left-radius: 20px;
}
.roundedge-table tr:first-child th:last-child {
  border-top-right-radius: 20px;
}
.roundedge-table > :not(:last-child) > :last-child > * {
  border-bottom-color: #333333;
}
.roundedge-table tr:last-child td:first-child {
  border-bottom-left-radius: 20px;
}
.roundedge-table tr:last-child td:last-child {
  border-bottom-right-radius: 20px;
}
.bare-red-btn-format {
  border: none;
  background: transparent;
  /* font-size: 18px; */
  font-weight: 600;
  color: #db353a;
}
</style>