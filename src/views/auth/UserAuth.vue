<template>
  <div class="row">
    <base-card class="login-bg">
      <form action="">
        <div class="py-5">
          <h3 class="mb-0">Shared Expense</h3>
        </div>
        <div class="form-floating mb-4">
          <input
            type="text"
            class="form-control pry-input-border"
            id="floatingInput"
            v-model.trim="username"
            placeholder="Enter username"
          />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating mb-5">
          <input
            type="password"
            class="form-control pry-input-border"
            id="floatingPassword"
            placeholder="Enter password"
            v-model.trim="password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <base-button>Login</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseButton from "../../components/ui/BaseButton.vue";
export default {
  components: { BaseButton },
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.login-bg {
  background-image: url(../../assets/pi5rGrXAT.png);
}
</style>