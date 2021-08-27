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
      type: String,
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
  background-color: var(--pry-red);
  border: 1px solid var(--pry-red);
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
  background-color: var(--sec-red);
  border-color: var(--sec-red);
}

.flat {
  background-color: transparent;
  color: var(--pry-red);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: var(--sec-red);
  color: var(--sec-red);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: var(--pale-red);
}
</style>