<template>
  <div class="row">
    <base-card>
      <div class="my-4 mx-2">
        <base-button
          :link="true"
          class="d-flex align-items-center justify-content-center mb-3"
          to="/new-transaction"
          >New Request</base-button
        >
        <base-button
          :link="true"
          class="d-flex align-items-center justify-content-center mb-3"
          >Pending requests</base-button
        >
        <base-button
          :link="true"
          class="d-flex align-items-center justify-content-center mb-3"
          >Transaction History</base-button
        >
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  name: "Initiator Welcome",
  created() {
    this.$store.dispatch("initiator/resetOtherBranches");
  },
};
</script>