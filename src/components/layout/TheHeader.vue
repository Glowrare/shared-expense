<template>
  <div class="my-4 d-flex flex-wrap justify-content-between align-items-center">
    <router-link to="/" class="mb-3">
      <img
        src="../../assets/sterling-full-logo.png"
        alt="Sterling Logo"
        class="img-fluid"
      />
    </router-link>
    <router-link
      to="/"
      class="
        log-out
        mb-3
        text-decoration-none
        fw-bold
        text-uppercase
        fs-5
        text-danger
      "
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
      if (this.$route.name.includes("Login")) {
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
