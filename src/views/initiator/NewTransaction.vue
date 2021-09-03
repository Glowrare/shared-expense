<template>
  <div class="text-center mt-3 mb-4">
    <base-button
      :link="true"
      to="/user-welcome"
      mode="outline"
      class="text-uppercase pt-2"
      >Home</base-button
    >
  </div>
  <div class="row">
    <base-card>
      <form class="py-4 px-2" ref="formGroup">
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
                    :value="true"
                    v-model="evenShareStat"
                  />
                  <label class="" for="yesEvenShare" @click="checkEvenShareStat"
                    >Yes
                  </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="custom-radio-controls position-relative">
                  <input
                    type="radio"
                    id="noEvenShare"
                    name="evenShareCheck"
                    class="invisible position-absolute"
                    :value="false"
                    v-model="evenShareStat"
                  />
                  <label class="" for="noEvenShare" @click="checkEvenShareStat"
                    >No
                  </label>
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
              :value="startAmt"
              @update-value="updateValue"
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
      sharedAmount: null,
      evenShareStat: "",
      debitBranches: [],
      startAmt: null,
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
    addedBranches() {
      return this.$store.getters["initiator/otherBranches"];
    },
    addedBranchesLen() {
      return this.addedBranches.length;
    },
  },
  watch: {
    defaultBranches(newVal, oldVal) {
      console.log(oldVal);
      this.debitBranches = newVal.map((br) => br.id);
    },
    addedBranchesLen(newVal, oldVal) {
      console.log(oldVal);
      const newEntry = this.addedBranches[newVal - 1];
      this.debitBranches.push(newEntry);
    },
  },
  created() {
    this.$store.dispatch("initiator/fetchBranches", this.userDetails);
  },
  methods: {
    addNewField() {
      console.log(this.debitBranches);
      console.log(this.$store.getters["initiator/otherBranches"]);
      this.components.push(NewBranchField);
    },
    checkEvenShareStat() {
      const amtBoxes = document.querySelectorAll(".sharedAmtBox");
      console.log(this.evenShareStat);
      if (!this.evenShareStat) {
        amtBoxes.forEach((box) => box.setAttribute("disabled", "disabled"));
        this.shareAmtEvenly();
      } else {
        amtBoxes.forEach((box) => box.removeAttribute("disabled"));
      }
    },
    updateValue(val) {
      this.startAmt = val;
    },
    shareAmtEvenly() {
      const branchesCount = this.debitBranches.length;
      const drAmount = parseFloat(this.sharedAmount);

      const baseAmt = parseFloat((drAmount / branchesCount).toFixed(2));
      console.log(baseAmt);

      //Check if there is decimal point mismatch
      const baseTotal = baseAmt * branchesCount;
      console.log(baseTotal);

      // let lastAmt = baseAmt
      const amtBoxes = document.querySelectorAll(".sharedAmtBox");

      // amtBoxes.forEach((box) => box.setAttribute("value", baseAmt));
      const difference = parseFloat((drAmount - baseTotal).toFixed(2));
      console.log(difference);

      this.updateValue(baseAmt);

      if (difference !== 0) {
        const lastAmt = baseAmt + difference;
        amtBoxes[amtBoxes.length - 1].setAttribute("value", lastAmt);
        // console.log(lastAmt);
      }
      // else {
      //   this.sharedAmount = parseFloat(baseAmt);
      // }
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