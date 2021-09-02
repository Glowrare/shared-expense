<template>
  <div class="row">
    <base-card>
      <form class="py-4 px-2">
        <h3 class="mb-5 text-center">Share Expense</h3>
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <label class="form-label mb-1">Enter total amount to share</label>
            <input
              type="text"
              class="form-control pry-input-border"
              placeholder="Enter amount"
              v-model="sharedAmount"
            />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <label class="form-label mb-1">Share evenly?</label>
            <div class="row">
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    id="yesEvenShare"
                    name="evenShareCheck"
                    class="invisible position-absolute"
                    v-model="evenShareStat"
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
                    v-model="evenShareStat"
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
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <button @click.prevent="addNewField" class="add-more-btn">
              Add More
            </button>
          </div>
        </div>
        <div class="row mb-3 gx-2">
          <div class="d-none d-sm-block col-auto col-sm-2"></div>
          <div class="d-none d-sm-block col-auto col-sm-5"></div>
          <div class="col-auto col-sm-3 mt-3 mt-sm-0">
            <label class="form-label visually-hidden">Branch Code</label>
            <input
              type="text"
              v-model.number.trim="total"
              class="form-control pry-input-border"
              disabled
            />
          </div>
          <div class="col-auto col-sm-2"></div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <label class="form-label mb-1">Transaction Narration</label>
            <textarea
              type="text"
              class="form-control pry-input-border"
              rows="3"
              placeholder="Enter narration"
            ></textarea>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 col-md-6 mb-3">
            <p class="mb-1">Attach approval (optional)</p>
            <label
              for=""
              class="
                form-label
                upload-doc-label-fmt
                d-flex
                flex-nowrap
                justify-content-between
                px-4
                py-3
                position-relative
              "
            >
              <span>Click to upload approval document here</span>
              <span
                ><img
                  src="../../assets/upload_icon.svg"
                  class="img-fluid"
                  alt=""
              /></span>
              <input type="file" class="form-control position-absolute" />
            </label>
          </div>
        </div>
        <div class="text-end">
          <base-button mode="outline">Cancel</base-button>
          <base-button>Post</base-button>
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
      components: [],
      sharedAmount: 0,
      evenShareStat: "",
      debitBranches: [],
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
  watch: {
    defaultBranches() {
      this.debitBranches = this.defaultBranches;
    },
  },
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
.add-more-btn {
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  color: var(--pry-red);
  background: none;
  border: none;
}
.add-more-btn:hover {
  font-size: 15px;
}
.custom-radio-controls label {
  cursor: pointer;
  padding: 10px;
}
.custom-radio-controls input[type="radio"] {
  width: 0;
}
.custom-radio-controls input[type="radio"]:checked + label {
  color: var(--pry-grey);
  background-color: #ffffff;
  box-shadow: 2px 5px 10px rgba(232, 80, 80, 0.2);
  border-radius: 4px;
}
.upload-doc-label-fmt {
  border: 1px dashed var(--pry-grey);
  border-radius: 4px;
  background-color: var(--pale-red);
}
.upload-doc-label-fmt:hover {
  border-color: var(--pry-red);
}
.upload-doc-label-fmt > input[type="file"] {
  opacity: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>