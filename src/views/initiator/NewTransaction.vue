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
      <form class="py-4 px-2" @submit.prevent="postTransaction">
        <h3 class="mb-5 text-center">Shared Expense</h3>

        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <label class="form-label mb-1">Enter total amount to share</label>
            <input
              type="text"
              class="form-control pry-input-border"
              placeholder="Enter amount"
              v-model="sharedAmount"
              @blur="checkTotal"
              required
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
                    class="visually-hidden"
                    value="yes"
                    v-model="evenShareStat"
                    required
                  />
                  <label class="" for="yesEvenShare" @click="shareEvenAmt"
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
                    class="visually-hidden"
                    value="no"
                    v-model="evenShareStat"
                    required
                  />
                  <label class="" for="noEvenShare" @click="enableAmtInput"
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
              @delete-item-one="deleteItemOne"
              @check-total-one="checkTotalOne"
            ></default-branch-field>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <component
              v-for="(component, index) in components"
              :key="index"
              :is="component"
              :evenShareStat="evenShareStat"
              @delete-item="deleteItem"
              @check-total-other="checkTotalOther"
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
        <div class="row mb-3 gx-2" v-if="evenStat">
          <div class="d-none d-sm-block col-auto col-sm-2"></div>
          <div class="d-none d-sm-block col-auto col-sm-5"></div>
          <div class="col-auto col-sm-3 mt-3 mt-sm-0">
            <label class="form-label visually-hidden">Total Amount</label>
            <input
              type="text"
              :value="total"
              class="form-control pry-input-border"
              disabled
            />
          </div>
          <div class="col-auto col-sm-2"></div>
        </div>
        <div class="row mb-3 gx-2" v-else>
          <div class="d-none d-sm-block col-auto col-sm-2"></div>
          <div class="d-none d-sm-block col-auto col-sm-5"></div>
          <div class="col-auto col-sm-3 mt-3 mt-sm-0">
            <label class="form-label visually-hidden">Total Amount</label>
            <input
              type="text"
              :value="originTotal"
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
              v-model="narration"
              required
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
              <span v-show="noUpload"
                >Click to upload approval document here</span
              >
              <span v-show="noUpload"
                ><img
                  src="../../assets/upload_icon.svg"
                  class="img-fluid"
                  alt=""
              /></span>
              <p
                class="mb-0 fw-bold text-nowrap overflow-hidden file-name"
                v-show="!noUpload"
              >
                {{ fileName }}
              </p>
              <input
                type="file"
                class="form-control position-absolute"
                @change="getFileName"
              />
            </label>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <base-button
            class="pt-2 text-center"
            mode="outline"
            :link="true"
            to="/user-welcome"
            >Cancel</base-button
          >
          <base-button>Post</base-button>
        </div>
      </form>
    </base-card>
  </div>
  <base-dialog btnText="Check" :active="active" @close-modal="closeModal">
    <template v-slot:modalImage>
      <div>
        <img src="../../assets/codicon_error.svg" class="img-fluid" alt="" />
      </div>
    </template>
    <template v-slot:default>
      <p>
        There is a disparity between the shared amount and total amount to be
        shared.
      </p>
      <p>
        Difference:
        <span
          :class="overage ? 'fw-bold text-success' : 'fw-bold text-danger'"
          >{{ disparity }}</span
        >
      </p>
    </template>
  </base-dialog>
</template>

<script>
import DefaultBranchField from "../../components/initiator/DefaultBranchField.vue";
import NewBranchField from "../../components/initiator/NewBranchField.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseDialog from "../../components/ui/BaseDialog.vue";

export default {
  name: "New Transaction",
  components: {
    DefaultBranchField,
    NewBranchField,
    BaseButton,
    BaseDialog,
  },
  data() {
    return {
      total: 0,
      originTotal: 0,
      components: [],
      sharedAmount: null,
      evenShareStat: "yes",
      debitBranches: [],
      startAmt: null,
      narration: "",
      disparity: null,
      active: false,
      fileName: "",
      noUpload: true,
      overage: null,
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
    evenStat() {
      if (this.evenShareStat === "yes") {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    defaultBranches(newVal) {
      this.debitBranches = newVal.map((br) => br.id);
    },
    addedBranchesLen(newVal) {
      const newEntry = this.addedBranches[newVal - 1];
      const previousState = this.addedBranches.slice(0, newVal - 1);
      const existing = previousState.some((br) => br === newEntry);
      if (!existing) {
        this.debitBranches.push(newEntry);
      }
      setTimeout(() => {
        if (this.evenShareStat === "yes") {
          this.apportioner();
        }
      }, 0);
    },
  },
  created() {
    this.$store.dispatch("initiator/fetchBranches", this.userDetails);
  },
  methods: {
    addNewField() {
      this.components.push(NewBranchField);
      if (this.evenShareStat !== "yes") {
        this.enableAmtInput();
      }
    },
    deleteItem(id) {
      this.debitBranches = this.debitBranches.filter((br) => br !== id);
      // const otherBranches = this.addedBranches.filter((br) => br !== id);

      // this.$store.dispatch("initiator/resetOtherBranches", otherBranches);

      document.getElementById(id.substring(0, 4)).remove();
      if (this.evenShareStat === "yes") {
        this.apportioner();
      } else {
        this.checkTotal();
      }
    },
    deleteItemOne(id) {
      this.deleteItem(id);
    },
    shareEvenAmt() {
      this.disableAmtInput();
      this.apportioner();
    },
    disableAmtInput() {
      const amtBoxes = document.querySelectorAll(".sharedAmtBox");
      amtBoxes.forEach((box) => box.setAttribute("disabled", "disabled"));
    },
    enableAmtInput() {
      const amtBoxes = document.querySelectorAll(".sharedAmtBox");
      amtBoxes.forEach((box) => box.removeAttribute("disabled"));

      this.checkTotal();
    },
    checkTotal() {
      const amtBoxes = document.querySelectorAll(".sharedAmtBox");
      const boxValues = [];

      amtBoxes.forEach((box) => {
        const val = parseFloat(box.value);
        if (!isNaN(val)) {
          boxValues.push(val);
        }
      });

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      if (boxValues.length) {
        this.total = boxValues.reduce(reducer);
        this.originTotal = boxValues.reduce(reducer).toFixed(2);
      }
      if (this.evenShareStat === "yes") {
        this.apportioner();
      }

      if (this.total == this.sharedAmount) {
        const drLogEntry = [];
        amtBoxes.forEach((box) => {
          if (box.value !== "") {
            const branchID = box.id.substring(0, 4);
            const brDetails = this.branches.find((br) => br.id == branchID);

            const newEntry = {
              br: branchID,
              ledger: brDetails.ledger,
              banksCode: brDetails.banksCode,
              amt: box.value,
            };
            drLogEntry.push(newEntry);
          }
        });

        this.$store.commit("initiator/updateDrBranchLog", drLogEntry);
      }
      // this.total = this.total.toLocaleString();
      // this.originTotal = parseFloat(this.total).toFixed(2);
    },
    checkTotalOne() {
      this.checkTotal();
    },
    checkTotalOther() {
      this.checkTotal();
    },
    apportioner() {
      const branchesCount = this.debitBranches.length;
      const drAmount = parseFloat(this.sharedAmount);

      if (isNaN(drAmount)) {
        this.total = 0;
      } else {
        this.originTotal = drAmount;
        this.total = drAmount.toLocaleString();
      }

      const baseAmt = parseFloat((drAmount / branchesCount).toFixed(2));

      //Check if there is decimal point difference
      const baseTotal = parseFloat((baseAmt * branchesCount).toFixed(2));

      const amtBoxes = document.querySelectorAll(".sharedAmtBox");

      //First, clear the box
      amtBoxes.forEach((box) => (box.value = 0));

      amtBoxes.forEach((box) => (box.value = baseAmt));
      const difference = parseFloat((drAmount - baseTotal).toFixed(2));

      if (difference !== 0) {
        const lastAmt = baseAmt + difference;
        amtBoxes[amtBoxes.length - 1].value = parseFloat(lastAmt.toFixed(2));
      }

      const drLogEntry = [];
      amtBoxes.forEach((box) => {
        const branchID = box.id.substring(0, 4);
        const brDetails = this.branches.find((br) => br.id == branchID);

        const newEntry = {
          br: branchID,
          ledger: brDetails.ledger,
          banksCode: brDetails.banksCode,
          amt: box.value,
        };

        drLogEntry.push(newEntry);
      });

      this.$store.commit("initiator/updateDrBranchLog", drLogEntry);
    },
    async postTransaction() {
      console.log(this.originTotal);
      console.log(this.sharedAmount);
      if (
        parseFloat(this.originTotal) == parseFloat(this.sharedAmount) ||
        this.evenShareStat === "yes"
      ) {
        const fullDate = new Date();

        // Format date with zeroes
        let day = fullDate.getDate();
        if (day <= 9) {
          day = `0${day}`;
        }
        let month = fullDate.getMonth() + 1;
        if (month <= 9) {
          month = `0${month}`;
        }

        let minutes = fullDate.getMinutes();
        if (minutes <= 9) {
          minutes = `0${minutes}`;
        }
        let hours = fullDate.getHours();
        if (hours <= 9) {
          hours = `0${hours}`;
        }

        const txnTime = `${day}/${month}/${fullDate.getFullYear()} ${hours}:${minutes}`;

        //File name
        let upLoadFileName = "";
        if (this.fileName == "") {
          upLoadFileName = "No file uploaded";
        } else {
          upLoadFileName = this.fileName;
        }

        const postDetails = {
          user: this.userDetails,
          drLogEntry: this.$store.getters["initiator/drBranchLog"],
          totalAmount: this.sharedAmount,
          narration: this.narration,
          id: `FT${Date.now()}`,
          txnTime: txnTime,
          evenShare: this.evenShareStat,
          noUpload: this.noUpload,
          fileName: upLoadFileName,
        };

        try {
          await this.$store.dispatch("initiator/postTransaction", postDetails);
          this.$router.replace("/post-successful");
        } catch (err) {
          console.log(err.message) || "Something went wrong. Please try later.";
        }
      } else {
        this.disparity = (this.total - this.sharedAmount).toFixed(2);
        if (Number(this.disparity) > 0) {
          this.overage = true;
        } else if (Number(this.disparity) < 0) {
          this.overage = false;
        }
        this.disparity = Number(this.disparity).toLocaleString();
        const body = document.querySelector("body");
        this.active = !this.active;
        body.classList.add("modal-open", "overflow-hidden");
      }
    },
    closeModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      body.classList.remove("modal-open", "overflow-hidden");
    },
    getFileName(event) {
      if (event.target.files[0]) {
        this.fileName = event.target.files[0].name;
        this.noUpload = false;
      } else {
        this.noUpload = true;
        this.fileName = "";
      }
    },
  },
};
</script>

<style scoped>
.add-more-btn {
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  color: var(--brand-color);
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
  border-color: var(--brand-color);
}
.upload-doc-label-fmt > input[type="file"] {
  opacity: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.file-name {
  text-overflow: ellipsis;
}
</style>