<template>
  <div class="container mx-auto">
    <div
      class="mt-5 mb-5 bg-white shadow-md p-5 rounded-xl grid grid-cols-1 m:grid-cols-2 lg:grid-cols-2 border-2 border-gray-300"
    >
      <div>
        <h1 class="text-2xl md:text-4xl uppercase font-bold">{{ name }}</h1>
        <address>{{ address }}</address>
        <div>{{ tel }}</div>
        <div>&#9733; {{ formattedRating }}</div>
        <div>{{ "$".repeat(this.price_range) }}</div>
        <div>
          <span v-for="g in genres" :key="g"
            ><p>{{ g }}</p></span
          >
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr v-for="(hours, day) in this.opening_hours" :key="hours">
              <th>{{ day }}</th>
              <td>{{ hours }}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex-col">
          <div v-if="favorite" class="p-2 ml-20">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="this.openModal2"
            >
              Add favorite
            </button>
          </div>
          <div class="p-2 ml-20">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="this.openModal"
            >
              Write a review
            </button>
          </div>
          <div v-if="this.display" class="p-2 ml-20">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="this.openModal3"
            >
              View visit informations
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 shadow-lg">
      <div
        class="flex map-responsive h-full object-cover rounded-xl border-2 border-gray-300"
      >
        <iframe
          :src="this.maps"
          width="1200"
          height="1200"
          frameborder="0"
          style="border: 0"
          allowfullscreen
        ></iframe>
      </div>
      <div
        class="flex border-2 border-gray-300 rounded-xl p-6 object-cover"
        v-for="image in this.pictures"
        :key="image"
      >
        <img class="object-cover rounded-xl shadow-lg" :src="image" />
      </div>
      <span></span>

      <div>
        <h1 class="text-xl md:text-2xl font-bold ml-5">You may also like:</h1>
        <div v-if="this.genres" class="whitespace-nowrap">
          <div
            v-for="restaurant in this.suggestedRestaurants"
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
            <div v-if="this.userId">
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
      </div>
    </div>
    <VisitModalVue
      :open="isOpen"
      :closeCallback="closeModal"
      :restaurantId="this.tmpRestaurantId"
    ></VisitModalVue>
    <AddFavModalVue
      :open="isOpen2"
      :closeCallback="closeModal"
      :restaurantId="this.tmpRestaurantId"
    ></AddFavModalVue>
    <VisitModalViewVue
      :restaurantId="this.id"
      :open="isOpen3"
      :closeCallback="closeModal"
    >
    </VisitModalViewVue>
  </div>
</template>

<style>
.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  position: absolute;
}
</style>

<script>
import { getInfo } from "../api/restaurantsAPI.js";
import * as favoritesAPI from "../api/favoritesAPI.js";
import { getRestaurantVisits } from "../api/visitsAPI.js";
import { fetchGenresRestaurants, fetchVisitedRestaurants } from "../api/api";
import VisitModalVue from "./VisitModal.vue";
import AddFavModalVue from "./AddFavModal.vue";
import Cookies from "js-cookie";
import VisitModalViewVue from "./VisitModalView.vue";
export default {
  data() {
    return {
      id: "5f31fc6555d7790550c08aff",
      userId: Cookies.get("userId"),
      maps: null,
      favorite: "true",
      opening_hours: {},
      pictures: [],
      name: "",
      place_id: "",
      tel: "",
      address: "",
      price_range: null,
      rating: null,
      genres: [],
      location: {},

      suggestedRestaurants: null,

      isOpen: false,
      isOpen2: false,
      isOpen3: false,
      tmpRestaurantId: "",
      display: true,
      selectedId: "",
    };
  },
  methods: {
    addToList: async function (listId, restaurantId) {
      this.favorite = false;
      favoritesAPI.addToList(listId, restaurantId);
    },
    removeFromList: async function (listId, restaurantId) {
      this.favorite = true;
      favoritesAPI.removeFromList(listId, restaurantId);
    },
    openModal() {
      this.isOpen = true;
    },
    openModal2() {
      this.isOpen2 = true;
    },
    openModal3() {
      this.isOpen3 = true;
    },
    closeModal() {
      this.isOpen = false;
      this.isOpen2 = false;
      this.isOpen3 = false;
    },
    async GetGenresRestaurants() {
      this.suggestedRestaurants = await fetchGenresRestaurants(this.genres[0]);
      this.listVisited = await fetchVisitedRestaurants(Cookies.get("userId"));
      for (let visit of this.listVisited) {
        for (let rest of this.suggestedRestaurants) {
          if (rest.id === visit.restaurant_id) {
            rest.visited = true;
          }
          if (rest.name === this.name) {
            this.suggestedRestaurants.pop();
          }
        }
      }
    },
  },
  mounted: async function () {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.id = urlParams.get("id");
      let data = await getInfo(this.id);
      for (let i in data.opening_hours) {
        if (data.opening_hours[i] == null) {
          data.opening_hours[i] = "closed";
        }
      }
      this.tmpRestaurantId = this.id;
      this.opening_hours = data.opening_hours;
      this.pictures = data.pictures;
      this.name = data.name;
      this.place_id = data.place_id;
      this.tel = data.tel;
      this.address = data.address;
      this.price_range = data.price_range;
      this.rating = data.rating;
      this.genres = data.genres;
      this.location = data.location;
      let lat = this.location.coordinates[0].toFixed(6);
      let long = this.location.coordinates[1].toFixed(6);
      const api = "AIzaSyALLxzCl392yKm0znSBrut-kg8N6zT0T30";
      await this.GetGenresRestaurants();
      console.log(this.suggestedRestaurants);

      let listVisit = await getRestaurantVisits(this.id);
      listVisit = listVisit.items;
      if (Object.keys(listVisit).length === 0) {
        this.display = false;
      }
      this.maps = `https://www.google.com/maps/embed/v1/place?key=${api}&q=place_id:${this.place_id}`;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    formattedRating() {
      return this.rating ? this.rating.toFixed(2) : "";
    },
  },
  components: {
    VisitModalVue,
    AddFavModalVue,
    VisitModalViewVue,
  },
};
</script>
