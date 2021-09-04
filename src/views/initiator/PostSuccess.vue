<template>
  <div class="row">
    <base-card>
      <div class="text-center">
        <div>
          <img src="../../assets/clarity_success-standard-line.svg" alt="" />
        </div>
        <h6 class="my-4 fs-5">Posted successfully!</h6>
        <div class="mb-5">
          <p class="mb-1">Transaction Reference</p>
          <div class="ref-bg py-3 px-2 d-inline-block">
            <p class="mb-0">{{ postID }}</p>
          </div>
        </div>
        <base-button to="/user-welcome" mode="outline" :link="true" class="pt-2"
          >Okay</base-button
        >
      </div>
    </base-card>
  </div>
</template>

<script>
// import BaseButton from "../../components/ui/BaseButton.vue";
export default {
  // components: { BaseButton },
  name: "Post Success",
  computed: {
    postID() {
      return this.$store.getters["initiator/postID"];
    },
  },
};
</script>

<style scoped>
.ref-bg {
  background: var(--pale-red);
  border-radius: 8px;
  font-size: 34px;
  color: var(--pry-red);
}
</style>