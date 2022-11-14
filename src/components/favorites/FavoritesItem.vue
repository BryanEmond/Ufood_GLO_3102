<template>
  <div :id="restoId" class="flex justify-between">
    <router-link v-bind:to="'restaurant?id=' + restoId">
      <p>{{ restaurantData.name }}</p>
    </router-link>
    <button @click="removeRestaurant" class="text-red-600">X</button>
  </div>
</template>

<script>
import { getInfo } from "../restaurant_script";
import { removeFromList } from "../../api/favoritesAPI";
export default {
  name: "FavoritesItem",
  props: {
    restoId: String,
    listId: String,
  },
  data() {
    return {
      restaurantData: {},
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
  },
};
</script>
