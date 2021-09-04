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
          <div>
            <base-button
              type="button"
              class="outline"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close-modal')"
              >{{ btnText }}</base-button
            >
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
    btnText: {
      type: String,
      required: false,
      default: "Close",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close-modal"],
};
</script>

<style scoped>
.bdcenter-modal-content {
  box-shadow: var(--slight-red-shadow);
  border-radius: 12px;
}
</style>