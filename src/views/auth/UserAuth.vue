<template>
  <div class="row">
    <base-card class="login-bg">
      <form @submit.prevent="userLogin">
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
        <div class="form-floating mb-2">
          <input
            type="password"
            class="form-control pry-input-border"
            id="floatingPassword"
            placeholder="Enter password"
            v-model.trim="password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="invalid-feedback" :class="!formIsValid ? 'd-block' : ''">
          Input cannot be empty
        </div>
        <div
          id=""
          class="invalid-feedback"
          :class="loginError ? 'd-block' : ''"
        >
          {{ loginErrorMessage }}
        </div>
        <div class="mt-5">
          <base-button>Login</base-button>
        </div>
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
      formIsValid: true,
    };
  },
  computed: {
    loginError() {
      return this.$store.getters["auth/loginError"];
    },
    loginErrorMessage() {
      return this.$store.getters["auth/loginErrorMessage"];
    },
  },
  methods: {
    async userLogin() {
      this.formIsValid = true;
      if (this.username === "" || this.password === "") {
        this.formIsValid = false;
        return;
      }
      const actionPayload = {
        username: this.username,
        password: this.password,
      };

      try {
        await this.$store.dispatch("auth/login", actionPayload);
        // const redirectUrl = `*/${this.$route.query.redirect || 'coaches'}`;
        if (!this.loginError) {
          const userDetails = this.$store.getters["auth/userDetails"];
          if (userDetails.approvalLevel === "0") {
            this.$router.replace("/user-welcome");
          } else if (userDetails.approvalLevel === "1") {
            this.$router.replace("/pending-approvals");
          } else if (userDetails.approvalLevel === "4") {
            this.$router.replace("/control-welcome");
          }
        }
      } catch (err) {
        this.error = err.message || "Failed to authenticate. Please try later.";
      }
    },
  },
};
</script>

<style scoped>
.login-bg {
  background: linear-gradient(
      90deg,
      rgba(255, 249, 252, 0.8) 0%,
      rgba(15, 131, 133, 0.4) 74%,
      rgba(52, 144, 145, 0.8) 100%
    ),
    url(../../assets/pi5rGrXAT1.jpg) center/cover no-repeat;
}
</style>