<template>
  <div class="my-4 d-flex flex-wrap justify-content-between align-items-center">
    <router-link to="/" class="mb-3">
      <img
        src="../../assets/shared-expense-logo-with-text.png"
        alt="Shared expenses Logo"
        class="img-fluid d-none d-sm-inline"
      />
      <img
        src="../../assets/shared-expense-logo.png"
        alt="Shared expenses Logo"
        class="img-fluid d-sm-none"
      />
    </router-link>
    <router-link
      to="/"
      class="log-out mb-3 fw-bold text-uppercase fs-5"
      v-if="isLoggedIn"
      >Log out</router-link
    >
  </div>
  <div class="text-center" v-if="isLoggedIn">
    <h2>
      Welcome, <span class="text-uppercase">{{ userDetails.firstName }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isLoggedIn() {
      if (this.$route.path.endsWith("/")) {
        return false;
      } else {
        return true;
      }
    },
    userDetails() {
      return this.$store.getters["auth/userDetails"];
    },
  },
};
</script>

<style scoped>
.log-out {
  color: var(--brand-color-alt);
  text-decoration: none;
}
.log-out:hover {
  text-decoration: underline;
}
</style>
