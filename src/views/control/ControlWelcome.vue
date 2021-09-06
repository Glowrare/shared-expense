<template>
  <base-card class="py-4 px-2">
    <h3 class="mb-5 text-center">View Transactions</h3>
    <div class="row gy-3">
      <p
        class="col-sm-6 col-md-4 text-uppercase fw-bold"
        v-for="branch in branches"
        :key="branch.id"
      >
        <router-link
          :to="{ path: '/branch-transactions', query: { branch: branch.id } }"
          class="d-flex justify-content-center align-items-center branch-tile"
          >{{ branch.name }}</router-link
        >
      </p>
    </div>
  </base-card>
</template>

<script>
export default {
  name: "Control Welcome",
  computed: {
    branches() {
      return this.$store.getters["auth/userDetails"].supervisedBranches;
    },
  },
};
</script>

<style scoped>
.branch-tile {
  box-shadow: 1px 2px 2px var(--pry-red);
  min-height: 70px;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  color: inherit;
}
.branch-tile:hover {
  color: var(--pry-red);
  box-shadow: 1px 3px 3px var(--pale-red);
}
</style>