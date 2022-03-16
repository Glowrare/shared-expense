<template>
  <div class="container">
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

:root {
  --brand-color: #268182;
  --brand-color-alt: #0f8385;
  --pale-red: #fcf7f7;
  --pry-black: #020105;
  --pry-grey: #606062;

  --brand-shadow: 0 4px 4px #26818259;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: "Lato", sans-serif;
  color: var(--pry-black);
}
.pry-input-border {
  border: 1px solid #000000;
}
.pry-input-border:focus {
  border-color: inherit;
  border-width: 2px;
  box-shadow: 2px 5px 10px var(--pale-red);
}
.pry-input-border:disabled {
  border-color: var(--pale-red);
}
</style>
