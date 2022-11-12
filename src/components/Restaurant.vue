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
          <span v-for="g in genres" :key="g">{{ g }}</span>
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
import * as script from "./restaurant_script.js";
import VisitModalVue from "./VisitModal.vue";
import AddFavModalVue from "./AddFavModal.vue";
export default {
  data() {
    return {
      id: "5f31fc6555d7790550c08aff",
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

      isOpen: false,
      isOpen2: false,
      tmpRestaurantId: "",
    };
  },
  methods: {
    addToList: async function (listId, restaurantId) {
      this.favorite = false;
      script.addToList(listId, restaurantId);
    },
    removeFromList: async function (listId, restaurantId) {
      this.favorite = true;
      script.removeFromList(listId, restaurantId);
    },
    openModal() {
      this.isOpen = true;
    },
    openModal2() {
      this.isOpen2 = true;
    },
    closeModal() {
      this.isOpen = false;
      this.isOpen2 = false;
    },
  },
  mounted: async function () {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.id = urlParams.get("id");
      let data = await script.getInfo(this.id);
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
      this.genre = data.genre;
      this.location = data.location;
      let lat = this.location.coordinates[0].toFixed(6);
      let long = this.location.coordinates[1].toFixed(6);
      const api = "AIzaSyCIgcdo9AECx43Fx2O8uvBwaQ_vH61vTJk";

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
  },
};
</script>
