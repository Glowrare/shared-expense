<template>
  <div class="row">
    <base-card>
      <div class="text-center">
        <div>
          <img src="../../assets/clarity_success-standard-line.svg" alt="" />
        </div>
        <h6 class="my-4 fs-5">
          Transaction {{ transactionStatus }} successfully!
        </h6>
        <base-button
          to="/pending-approvals"
          mode="outline"
          :link="true"
          class="pt-2"
          >Okay</base-button
        >
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  name: "Approval Success",
  computed: {
    transactionStatus() {
      return this.$store.getters["approver/currentTxn"].status;
    },
  },
};
</script>