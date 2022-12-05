<template>
  <div>
    <HomeFoodCategories />
    <HomeListing />
  </div>
</template>
<script type="module">
import HomeFoodCategories from "@/components/subcomponents/HomeFoodCategories";
import HomeListingComponent from "@/components/subcomponents/HomeListingRestaurants";
export default {
  name: "app",
  components: {
    HomeFoodCategories: HomeFoodCategories,
    HomeListing: HomeListingComponent,
  },
};
</script>
<style></style>
