<template>
  <div :id="restoId" class="flex justify-between">
    <router-link v-bind:to="'restaurant?id=' + restoId">
      <p>{{ restaurantData.name }}</p>
    </router-link>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 mx-4 rounded"
      @click="this.openModal"
    >
      View visit informations
    </button>
    <button @click="removeRestaurant" class="text-red-600">X</button>
    <VisitModalViewVue
      :restaurantId="restoId"
      :open="isOpen"
      :closeCallback="closeModal"
    >
    </VisitModalViewVue>
  </div>
</template>

<script>
import { getInfo } from "../../api/restaurantsAPI";
import { removeFromList } from "../../api/favoritesAPI";
import VisitModalViewVue from "../VisitModalView.vue";
export default {
  name: "FavoritesItem",
  components: {
    VisitModalViewVue,
  },
  props: {
    restoId: String,
    listId: String,
  },
  data() {
    return {
      restaurantData: {},
      isOpen: false,
    };
  },
  beforeCreate: async function () {
    let data = await getInfo(this.restoId);
    this.restaurantData = data;
    console.log(this.restaurantData.pictures[0]);
  },
  methods: {
    async removeRestaurant() {
      var el = document.getElementById(this.restoId);
      el.innerHTML = "";
      await removeFromList(this.listId, this.restoId);
    },
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>
