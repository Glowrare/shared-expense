<template>
  <div
    class="modal bdcenter-modal fade"
    :class="{ show: active, 'd-block': active }"
    id="invalidTINModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="invalidTINModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered bdcenter-modal-dialog">
      <div class="modal-content bdcenter-modal-content border-0">
        <div class="modal-body text-center mb-4 px-sm-4">
          <div>
            <slot name="modalImage"> </slot>
          </div>
          <div>
            <slot></slot>
          </div>
          <div v-if="singleButton">
            <base-button
              type="button"
              class="outline"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close-modal')"
              >{{ btnText }}</base-button
            >
          </div>

          <div v-else>
            <base-button
              type="button"
              class="outline mb-3"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close-modal')"
              >{{ btnText }}</base-button
            >
            <base-button type="button" @click="$emit('proceed')">{{
              proceedText
            }}</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="active" class="modal-backdrop fade show"></div>
</template>

<script>
export default {
  props: {
    singleButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    btnText: {
      type: String,
      required: false,
      default: "Close",
    },
    proceedText: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-modal", "proceed"],
};
</script>

<style scoped>
.bdcenter-modal-content {
  box-shadow: var(--slight-red-shadow);
  border-radius: 12px;
}
</style>