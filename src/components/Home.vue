<template>
  <div>
    <HomeFoodCategories />
    <VueToggle
      title="map"
      name="mapToggle"
      class="px-2 py-1"
      activeColor="#0284C7"
      fontSize="14px"
      @toggle="switchView"
    />
    <HomeListing v-if="!mapView" />
    <HomeMapListing v-if="mapView" />
  </div>
</template>
<script type="module">
import HomeFoodCategories from "@/components/subcomponents/HomeFoodCategories";
import HomeListingComponent from "@/components/subcomponents/HomeListingRestorants";
import HomeMapListingVue from "@/components/subcomponents/HomeMapListing.vue";
import VueToggle from "vue-toggle-component";

export default {
  name: "app",
  components: {
    HomeFoodCategories: HomeFoodCategories,
    HomeListing: HomeListingComponent,
    HomeMapListing: HomeMapListingVue,
    VueToggle,
  },
  data() {
    return {
      mapView: false,
    };
  },
  methods: {
    switchView() {
      this.mapView = !this.mapView;
    },
  },
};
</script>
<style></style>
