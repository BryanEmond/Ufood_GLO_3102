<script>
import {
  fetchClosestRestaurants,
  fetchByRangePriceRestaurants,
  fetchGenresRestaurants,
  fetchFavoriteRestaurants,
  fetchVisitsRestaurants,
} from "./api";
import "../../main.css";

export default {
  data() {
    return {
      location: null,
      restaurants: {},
      uid: null,
      routeParams: "",
      genresRestaurants: null,
    };
  },
  methods: {
    async GetLocation() {
      return new Promise((resolve, rejects) => {
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
    },
    async GetRestorants() {
      this.restaurants["Closest to you"] = await fetchClosestRestaurants(
        this.location.coords
      );
      if (this.uid) {
        this.restaurants["Favorite"] = await fetchFavoriteRestaurants(this.uid);
        this.restaurants["Visite"] = await fetchVisitsRestaurants(this.uid);
      }
      this.restaurants["Cheapest"] = await fetchByRangePriceRestaurants(1);
      this.restaurants["Average Price"] = await fetchByRangePriceRestaurants(2);
      this.restaurants["Expensive"] = await fetchByRangePriceRestaurants(3);
    },
    renderOpenOrClose(opening_hours) {
      let weekDay = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      let date = new Date();
      let hours = opening_hours[weekDay[date.getDay()]];
      if (hours !== null) {
        let hoursSplit = hours.split("-");
        if (
          hoursSplit[0] <= `${date.getHours()}:${date.getMinutes()}` &&
          hoursSplit[1] >= `${date.getHours()}:${date.getMinutes()}`
        ) {
          return "Open";
        } else if (
          hoursSplit[0] <= `${date.getHours()}:${date.getMinutes()}` &&
          hoursSplit[1] == "00:00"
        ) {
          return "Open";
        }
      }
      return "Close";
    },
    calcDistance(restaurant) {
      let latRes = restaurant[1];
      let lonRes = restaurant[0];
      // let currentlat = 46.780655;
      // let currentlon = -71.297238;
      let currentlat = this.location.coords.latitude;
      let currentlon = this.location.coords.longitude;

      var R = 6371; // km
      var dLat = this.toRad(currentlat - latRes);
      var dLon = this.toRad(currentlon - lonRes);
      var lat1 = this.toRad(latRes);
      var lat2 = this.toRad(currentlat);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    },
    toRad(Value) {
      return (Value * Math.PI) / 180;
    },
  },
  async mounted() {
    this.routeParams = this.$route.query;
    this.location = await this.GetLocation();
    if (this.routeParams.genres) {
      this.GetGenresRestaurants();
    } else {
      this.GetRestorants();
    }
  },
  watch: {
    $route(to, from) {
      this.routeParams = to.query;
      if (this.routeParams.genres) {
        this.GetGenresRestaurants();
      } else {
        this.GetRestorants();
      }
    },
  },
};
</script>
<template>
  <div>
    <div v-if="this.routeParams.genres">
      <router-link
        v-for="restaurant in this.genresRestaurants"
        :key="restaurant.id"
        v-bind:to="'restaurant?id=' + restaurant.id"
        class="inline-block w-96 p-3 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="w-full flex justify-center">
          <img v-bind:src="restaurant.pictures[0]" class="h-48" />
        </div>

        <h5
          class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white inline"
        >
          {{ restaurant.name }}
        </h5>
        <div class="float-right inline">
          <p class="font-normal text-gray-700 dark:text-gray-400 inline">
            {{ restaurant.rating.toFixed(1) }}
          </p>
          <img
            src="https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/star-512.png"
            class="h-5 inline pb-1"
          />
        </div>

        <div>
          <p class="font-normal text-gray-700 dark:text-gray-400 inline">
            {{ calcDistance(restaurant.location.coordinates).toFixed(1) }}
            km -
          </p>
          <p class="font-normal text-gray-700 dark:text-gray-400 inline mr-1">
            {{ renderOpenOrClose(restaurant.opening_hours) }} -
          </p>
          <p class="font-normal text-gray-700 dark:text-gray-400 inline">
            {{ "$".repeat(restaurant.price_range) }}
          </p>
        </div>
      </router-link>
    </div>
    <div v-else>
      <div v-for="item in Object.keys(this.restaurants)" :key="item">
        <h5
          class="mb-2 ml-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline"
        >
          {{ item }}
        </h5>
        <div class="overflow-x-auto whitespace-nowrap overflowNavbar">
          <router-link
            v-for="restaurant in this.restaurants[item]"
            :key="restaurant.id"
            v-bind:to="'/restaurant?id=' + restaurant.id"
            class="inline-block w-96 p-3 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div class="w-full flex justify-center">
              <img v-bind:src="restaurant.pictures[0]" class="h-48" />
            </div>
            <h5
              class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white inline"
            >
              {{ restaurant.name }}
            </h5>
            <div class="float-right inline">
              <p class="font-normal text-gray-700 dark:text-gray-400 inline">
                {{ restaurant.rating.toFixed(1) }}
              </p>
              <img
                src="https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/star-512.png"
                class="h-5 inline pb-1"
              />
            </div>

            <div>
              <p class="font-normal text-gray-700 dark:text-gray-400 inline">
                {{ calcDistance(restaurant.location.coordinates).toFixed(1) }}
                km -
              </p>
              <p
                class="font-normal text-gray-700 dark:text-gray-400 inline mr-1"
              >
                {{ renderOpenOrClose(restaurant.opening_hours) }} -
              </p>
              <p class="font-normal text-gray-700 dark:text-gray-400 inline">
                {{ "$".repeat(restaurant.price_range) }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.overflowNavbar {
  scrollbar-width: none;
}
.overflowNavbar::-webkit-scrollbar {
  display: none;
}
</style>
