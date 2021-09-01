<template>
  <div class="row">
    <base-card>
      <form class="py-4 px-2">
        <h3 class="mb-5 text-center">Share Expense</h3>
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <label for="" class="form-label mb-1"
              >Enter total amount to share</label
            >
            <input
              type="text"
              class="form-control pry-input-border"
              placeholder="Enter amount"
            />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label for="" class="form-label mb-1">Share evenly?</label>
            <div class="row">
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    id="yesEvenShare"
                    name="evenShareCheck"
                    class="invisible position-absolute"
                    checked
                  />
                  <label class="" for="yesEvenShare">Yes </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    id="noEvenShare"
                    name="evenShareCheck"
                    class="invisible position-absolute"
                  />
                  <label class="" for="noEvenShare">No </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="mb-1">Confirm branches to debit</p>
        <div class="row">
          <div class="col-12">
            <default-branch-field
              :branch="branch"
              v-for="branch in defaultBranches"
              :key="branch.id"
            ></default-branch-field>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <component
              v-for="(component, index) in components"
              :key="index"
              :is="component"
              :branches="branches"
              :otherBranches="otherBranches"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <base-button @click.prevent="addNewField">Add More</base-button>
          </div>
        </div>
        <div class="row mb-3 gx-2">
          <div class="col-auto col-sm-2"></div>
          <div class="col-auto col-sm-5"></div>
          <div class="col-auto col-sm-3">
            <label for="" class="form-label visually-hidden">Branch Code</label>
            <input
              type="text"
              v-model.number.trim="total"
              class="form-control pry-input-border"
              disabled
            />
          </div>
          <div class="col-auto col-sm-2"></div>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import DefaultBranchField from "../../components/initiator/DefaultBranchField.vue";
import NewBranchField from "../../components/initiator/NewBranchField.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
export default {
  name: "New Transaction",
  components: {
    DefaultBranchField,
    NewBranchField,
    BaseButton,
  },
  data() {
    return {
      total: 0,
      // branches: {},
      // defaultBranches: {},
      components: [],
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters["auth/userDetails"];
    },
    branches() {
      return this.$store.getters["initiator/branchesList"].allBranches;
    },
    defaultBranches() {
      return this.$store.getters["initiator/branchesList"].defaultBranches;
    },
    otherBranches() {
      return this.$store.getters["initiator/branchesList"].otherBranches;
    },
  },
  // watch: {
  //   branches(newVal, oldVal) {
  //     console.log(newVal[1].region);
  //     console.log(oldVal);
  //     // const that = this
  //     const userDetails = this.userDetails;
  //     console.log(userDetails);
  //     this.defaultBranches = newVal.filter((branch) => {
  //       // branch.region === userDetails.branch.region;
  //       console.log(branch.region);
  //       branch.region === "SW 1";
  //     });
  //     console.log(this.defaultBranches);
  //   },
  // },
  created() {
    this.$store.dispatch("initiator/fetchBranches", this.userDetails);
  },
  methods: {
    addNewField() {
      this.components.push(NewBranchField);
    },
  },
};
</script>

<style scoped>
.custom-radio-controls label {
  cursor: pointer;
  padding: 10px;
}
.custom-radio-controls input[type="radio"] {
  width: 0;
}
.custom-radio-controls input[type="radio"]:checked + label {
  color: #606062;
  background-color: #ffffff;
  box-shadow: 2px 5px 10px rgba(232, 80, 80, 0.2);
  border-radius: 4px;
}
</style>