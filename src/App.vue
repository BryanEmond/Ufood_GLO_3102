<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation,
  },
};
</script>

<style></style>
