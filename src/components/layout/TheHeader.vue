<template>
  <div class="my-4">
    <img
      src="../../assets/sterling-full-logo.png"
      alt="Sterling Logo"
      class="img-fluid"
    />
  </div>
  <div class="text-center" v-if="isLoggedIn">
    <h2>
      Welcome, <span class="text-uppercase">{{ firstName }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      firstName: "Test",
    };
  },
  computed: {
    isLoggedIn() {
      if (this.$route.path.includes("/")) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>