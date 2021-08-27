<template>
  <div
    class="base-card col-xl-6 col-lg-8 col-md-10 mx-auto px-3 px-lg-5 pt-4 pb-5"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.base-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: 1px solid #e8e4e4;
  box-shadow: 2px 5px 10px rgba(232, 80, 80, 0.2);
  border-radius: 12px;
  min-height: 500px;
}
</style>