<template>
  <div>
    <HomeFoodCategories />
    <MapWierdCategories v-if="mapView" />
    <VueToggle
      title="map"
      name="mapToggle"
      class="px-2 py-1"
      activeColor="#0284C7"
      darkTheme
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
import HomeMapListing from "@/components/subcomponents/HomeMapListing.vue";
import MapWierdCategories from "./subcomponents/MapWierdCategories.vue";
import VueToggle from "vue-toggle-component";

export default {
  name: "app",
  components: {
    HomeFoodCategories: HomeFoodCategories,
    HomeListing: HomeListingComponent,
    HomeMapListing: HomeMapListing,
    VueToggle,
    MapWierdCategories,
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
