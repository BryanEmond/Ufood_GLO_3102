<template>
  <div class="restaurant-card rounded-3xl shadow">
    <img
      class="rounded-xl object-cover w-1/5 h-5/6"
      src="https://images.squarespace-cdn.com/content/v1/5b660dad96e76f2d14344d91/1533655767235-H2P2ZYTKD8Y3ECATBKGL/Executive-Chef-Renoir-Restaurant.jpg?format=750w"
    />
    <a class="w-full"> {{ restaurantData }} </a>
    <a>&#9733; 4.5</a>
    <p class="w-full">(84 avis)</p>
    <router-link class="w-full hover:text-blue-800" to="/restaurant"
      >See more...</router-link
    >
  </div>
</template>

<script>
import { getInfo } from "../restaurant_script";
export default {
  name: "FavoritesItem",
  props: {
    list: Object,
    closeCallback: Function,
  },
  data() {
    return {
      restaurantData: {},
    };
  },
  async created() {
    let data = await getInfo(this.id);
    this.restaurantData = data.items;
    },
  methods: {
    async removeRestaurant() {
      await removeFromList(this.list.id, this.id);
      this.closeCallback();
    },
  },
};
</script>
