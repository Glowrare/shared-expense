<template>
  <button v-if="!link" :class="mode" class="px-5">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode" class="px-5">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: [String, Object],
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  height: 40px;
  min-width: 170px;
  font: inherit;
  background-color: var(--brand-color);
  border: 1px solid var(--brand-color);
  color: white;
  cursor: pointer;
  border-radius: 6px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--brand-color-alt);
  border-color: var(--brand-color-alt);
  box-shadow: var(--brand-shadow);
}

.flat {
  background-color: transparent;
  color: var(--brand-color);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: var(--brand-color-alt);
  color: var(--brand-color-alt);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: var(--pale-red);
}
</style>