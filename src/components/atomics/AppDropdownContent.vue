<script>
export default {
  name: "AppDropdownContent",
  inject: ["sharedState"],
  computed: {
    active() {
      return this.sharedState.active;
    }
  }
};
</script>

<template>
    <transition name="dropdown-content">
      <div
        v-if="active"
        class="origin-top-right absolute left-0 mt-0 w-48 bg-white rounded-lg border"
      >
        <slot/>
      </div>
    </transition>
  </template>
  
  
  <style>
  .dropdown-content-enter-active,
  .dropdown-content-leave-active {
    transition: all 0.2s;
  }
  .dropdown-content-enter,
  .dropdown-content-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
  </style>