<template>
  <div>
    <div class="px-10 py-1">
      <div id="mapid" class="rounded-2xl"></div>
    </div>
  </div>
</template>
<script type="module">
import {
  fetchClosestRestaurants,
  fetchGenresRestaurants,
} from "../../api/api.js";
import leaflet from "leaflet";
import {
  fetchByRangePriceRestaurants,
  fetchFavoriteRestaurants,
  fetchVisitsRestaurants,
  fetchVisitedRestaurants,
} from "../../api/api";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      location: null,
      map: null,
      genresRestaurants: null,
      routeParams: "",
      markers: [],
    };
  },
  watch: {
    $route(to, from) {
      this.routeParams = to.query;
      if (this.routeParams.genres) {
        this.GetGenresRestaurants();
      } else if (this.routeParams.wierdCategories) {
        switch (this.routeParams.wierdCategories) {
          case "ClosestToYou":
            this.AddClosetRestaurants();
            break;
          case "Favorite":
            this.FavoriteRestorantList();
            break;
          case "Visited":
            this.VisitedRestorantList();
            break;
          case "Cheapest":
            this.CheapestRestorantList();
            break;
          case "AveragePrice":
            this.AveragePriceRestorantList();
            break;
          case "Expensive":
            this.ExpensiveRestorantList();
            break;
        }
        this.resetMarker();
      } else {
        this.AddClosetRestaurants();
      }
    },
  },
  methods: {
    async FavoriteRestorantList() {
      let restaurants = await fetchFavoriteRestaurants(this.uid);
      restaurants.forEach((restaurant) => {
        this.addMarker(restaurant);
      });
    },
    async VisitedRestorantList() {
      let restaurants = await fetchVisitsRestaurants(this.uid);
      restaurants.forEach((restaurant) => {
        this.addMarker(restaurant);
      });
    },
    async CheapestRestorantList() {
      let restaurants = await fetchByRangePriceRestaurants(1);
      restaurants.forEach((restaurant) => {
        this.addMarker(restaurant);
      });
    },
    async AveragePriceRestorantList() {
      let restaurants = await fetchByRangePriceRestaurants(2);
      restaurants.forEach((restaurant) => {
        this.addMarker(restaurant);
      });
    },
    async ExpensiveRestorantList() {
      let restaurants = await fetchByRangePriceRestaurants(3);
      restaurants.forEach((restaurant) => {
        this.addMarker(restaurant);
      });
    },
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
    async GetGenresRestaurants() {
      this.genresRestaurants = await fetchGenresRestaurants(
        this.routeParams.genres
      );
      this.resetMarker();
      this.genresRestaurants.map((restaurant) => {
        this.addMarker(restaurant);
      });
    },
    resetMarker() {
      this.markers.map((marker) => {
        this.map.removeLayer(marker);
      });
    },
    addMarker(restaurantData) {
      let name = restaurantData.name;
      let lon = restaurantData.location.coordinates[0];
      let lat = restaurantData.location.coordinates[1];
      let marker = leaflet.marker([lat, lon]);
      this.markers.push(marker);
      marker.addTo(this.map);
      marker.bindPopup(
        `<h1>${name}</h1>
         <a href="restaurant?id=${restaurantData.id}">More info</a>`
      );
    },
    async AddClosetRestaurants() {
      let closestRestaurants = await fetchClosestRestaurants(
        this.location.coords
      );
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
    this.routeParams = this.$route.query;
    if (this.routeParams.genres) {
      this.GetGenresRestaurants();
    } else if (this.routeParams.wierdCategories) {
      switch (this.routeParams.wierdCategories) {
        case "ClosestToYou":
          this.AddClosetRestaurants();
          break;
        case "Favorite":
          this.FavoriteRestorantList();
          break;
        case "Visited":
          this.VisitedRestorantList();
          break;
        case "Cheapest":
          this.CheapestRestorantList();
          break;
        case "AveragePrice":
          this.AveragePriceRestorantList();
          break;
        case "Expensive":
          this.ExpensiveRestorantList();
          break;
      }
      this.resetMarker();
    } else {
      this.AddClosetRestaurants();
    }
  },
};
</script>
<style>
#mapid {
  height: 75vh;
}
</style>
