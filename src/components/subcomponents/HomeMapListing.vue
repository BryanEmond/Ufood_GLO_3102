<template>
  <div>
    <div class="px-10 py-1">
      <div id="mapid" class="rounded-2xl"></div>
    </div>
  </div>
</template>
<script type="module">
import { fetchClosestRestaurants } from "../../api/api.js";
import leaflet from "leaflet";
export default {
  data() {
    return {
      location: null,
      map: null,
    };
  },
  methods: {
    async GetLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    addMarker(restaurantData) {
      let name = restaurantData.name;
      let lon = restaurantData.location.coordinates[0];
      let lat = restaurantData.location.coordinates[1];
      let marker = leaflet.marker([lat, lon]);
      marker.addTo(this.map);
      marker.bindPopup(
        `<h1>${name}</h1>
         <a href="restaurant?id=${restaurantData.id}">More info</a>`
      );
    },
    async AddClosetRestaurants() {
      let closestRestaurants = await fetchClosestRestaurants(this.location);
      closestRestaurants.forEach((restaurant) => {
        this.addMarker(restaurant);
      });
    },
  },
  async mounted() {
    this.location = await this.GetLocation();
    this.map = leaflet.map("mapid").setView(
      {
        lon: this.location.coords.longitude,
        lat: this.location.coords.latitude,
      },
      12
    );
    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(this.map);
    this.AddClosetRestaurants();
  },
};
</script>
<style>
#mapid {
  height: 75vh;
}
</style>
