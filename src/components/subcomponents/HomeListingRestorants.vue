<script>
import {
  fetchClosestRestaurants,
  fetchByRangePriceRestaurants,
  fetchGenresRestaurants,
  fetchFavoriteRestaurants,
  fetchVisitsRestaurants,
  fetchVisitedRestaurants,
} from "../../api/api";
import "../../main.css";
import VisitModal from "../VisitModal.vue";
import VisitModalViewVue from "../VisitModalView.vue";
export default {
  data() {
    return {
      location: null,
      restaurants: {},
      uid: "636969b87bed3d6cd9563f4d",
      routeParams: "",
      genresRestaurants: null,
      listVisited: null,
      isModalOpen: false,
      isModalVisitOpen: false,
      selectedRestaurant: "",
      selectedRestaurantVisit: "",
    };
  },
  methods: {
    openModal(id) {
      this.selectedRestaurant = id;
      this.isModalOpen = true;
    },
    closeModal() {
      this.GetRestorants();
      this.isModalVisitOpen = false;
      this.isModalOpen = false;
    },
    openModalVisit(id) {
      this.selectedRestaurantVisit = id;
      this.isModalVisitOpen = true;
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
      if (this.uid) {
        this.genresRestaurants = await fetchGenresRestaurants(
          this.routeParams.genres
        );
        this.listVisited = await fetchVisitedRestaurants(this.uid);
        for (let visit of this.listVisited) {
          for (let rest of this.genresRestaurants) {
            if (rest.id === visit.restaurant_id) {
              rest.visited = true;
            }
          }
        }
      } else {
        this.genresRestaurants = await fetchGenresRestaurants(
          this.routeParams.genres
        );
      }
    },
    async GetRestorants() {
      if (this.uid) {
        this.restaurants["Closest to you"] = await fetchClosestRestaurants(
          this.location.coords
        );
        this.listVisited = await fetchVisitedRestaurants(this.uid);
        this.restaurants["Favorite"] = await fetchFavoriteRestaurants(this.uid);
        this.restaurants["Visited"] = await fetchVisitsRestaurants(this.uid);
        this.restaurants["Cheapest"] = await fetchByRangePriceRestaurants(1);
        this.restaurants["Average Price"] = await fetchByRangePriceRestaurants(
          2
        );
        this.restaurants["Expensive"] = await fetchByRangePriceRestaurants(3);
        for (let visit of this.listVisited) {
          Object.keys(this.restaurants).forEach((key) => {
            for (let rest of this.restaurants[key]) {
              if (rest.id === visit.restaurant_id) {
                rest.visited = true;
              }
            }
          });
        }
      } else {
        this.restaurants["Closest to you"] = await fetchClosestRestaurants(
          this.location.coords
        );
        this.restaurants["Cheapest"] = await fetchByRangePriceRestaurants(1);
        this.restaurants["Average Price"] = await fetchByRangePriceRestaurants(
          2
        );
        this.restaurants["Expensive"] = await fetchByRangePriceRestaurants(3);
      }
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
  components: {
    VisitModal,
    VisitModalViewVue,
  },
};
</script>
<template>
  <div>
    <div v-if="this.routeParams.genres">
      <div
        v-for="restaurant in this.genresRestaurants"
        :key="restaurant.id"
        v-bind:to="'restaurant?id=' + restaurant.id"
        class="inline-block w-96 p-3 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <router-link v-bind:to="'restaurant?id=' + restaurant.id">
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
        </router-link>
        <div>
          <router-link v-bind:to="'restaurant?id=' + restaurant.id">
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
          </router-link>
        </div>
        <div v-if="this.uid">
          <div
            class="font-normal text-gray-700 dark:text-gray-400 inline float-right"
            v-if="restaurant.visited"
          >
            <button
              type="button"
              class="px-2 rounded-2xl border-solid border-2 border-gray-300 text-black"
              v-bind:class="['fill' ? 'bg-gray-300' : 'bg-white']"
              v-on:click="() => this.openModalVisit(restaurant.id)"
            >
              Visited
            </button>
          </div>

          <div
            class="font-normal text-gray-700 dark:text-gray-400 inline float-right"
            v-else
          >
            <button
              type="button"
              class="px-2 rounded-2xl border-solid border-2 border-sky-600 text-white"
              v-bind:class="['fill' ? 'bg-sky-600' : 'bg-white']"
              v-on:click="() => this.openModal(restaurant.id)"
            >
              Visited
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="item in Object.keys(this.restaurants)" :key="item">
        <h5
          class="mb-2 ml-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline"
        >
          {{ item }}
        </h5>
        <div class="overflow-x-auto whitespace-nowrap overflowNavbar">
          <div
            v-for="restaurant in this.restaurants[item]"
            :key="restaurant.id"
            class="inline-block w-96 p-3 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <router-link v-bind:to="'/restaurant?id=' + restaurant.id">
              <div class="w-full flex justify-center">
                <img v-bind:src="restaurant.pictures[0]" class="h-48" />
              </div>
            </router-link>

            <router-link v-bind:to="'/restaurant?id=' + restaurant.id">
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
            </router-link>
            <div>
              <router-link v-bind:to="'/restaurant?id=' + restaurant.id">
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
                  {{ "$".repeat(restaurant.price_range) }} -
                </p>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400 inline"
                  v-for="i in restaurant.genres.length"
                  :key="i"
                >
                  {{
                    restaurant.genres[i - 1] +
                    (i < restaurant.genres.length ? ", " : "")
                  }}
                </p>
              </router-link>
              <div v-if="this.uid">
                <div
                  class="font-normal text-gray-700 dark:text-gray-400 inline float-right"
                  v-if="restaurant.visited"
                >
                  <button
                    type="button"
                    class="px-2 rounded-2xl border-solid border-2 border-gray-300 text-black"
                    v-bind:class="['fill' ? 'bg-gray-300' : 'bg-white']"
                    v-on:click="() => openModalVisit(restaurant.id)"
                  >
                    Visited
                  </button>
                </div>

                <div
                  class="font-normal text-gray-700 dark:text-gray-400 inline float-right"
                  v-else
                >
                  <button
                    type="button"
                    class="px-2 rounded-2xl border-solid border-2 border-sky-600 text-white"
                    v-bind:class="['fill' ? 'bg-sky-600' : 'bg-white']"
                    v-on:click="() => openModal(restaurant.id)"
                  >
                    Visited
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VisitModalViewVue
        :isOpen="this.isModalVisitOpen"
        :closeCallback="closeModal"
        :restaurantId="this.selectedRestaurantVisit"
      />
      <VisitModal
        :isOpen="this.isModalOpen"
        :closeCallback="closeModal"
        :restaurantId="this.selectedRestaurant"
      />
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
