<template>
  <div class="shrink-0">
    <button
      type="button"
      class="px-2 py-1 rounded-2xl border-solid border-2 border-sky-600 text-white"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    fill: Boolean,
  },
};
</script>

<style></style>
