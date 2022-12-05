<template>
  <div class="mb-2">
    <div class="overflow-x-auto whitespace-nowrap overflowNavbar">
      <div v-for="cat in foodCategories" :key="cat.id" class="inline-flex">
        <primary-button class="m-2">
          <router-link v-bind:to="'/?wierdCategories=' + cat.url">
            {{ cat.categorie }}
          </router-link>
        </primary-button>
      </div>
    </div>
  </div>
</template>
<script type="module">
import PrimaryButton from "../PrimaryButton";
import Cookies from "js-cookie";
import { checktoken } from "../../api/login";
export default {
  name: "Home",
  data() {
    let cat;
    if (checktoken(Cookies.get("tokens"))) {
      cat = [
        { id: 0, categorie: "Closest to you", url: "ClosestToYou" },
        { id: 1, categorie: "Favorite", url: "Favorite" },
        { id: 3, categorie: "Average price", url: "AveragePrice" },
        { id: 4, categorie: "Expensive", url: "Expensive" },
      ];
    } else {
      cat = [
        { id: 0, categorie: "Closest to you", url: "ClosestToYou" },
        { id: 1, categorie: "Favorite", url: "Favorite" },
        { id: 2, categorie: "Visited", url: "Visited" },
        { id: 2, categorie: "Cheapest", url: "Cheapest" },
        { id: 3, categorie: "Average price", url: "AveragePrice" },
        { id: 4, categorie: "Expensive", url: "Expensive" },
      ];
    }
    return {
      active: false,
      foodCategories: cat,
    };
  },
  components: {
    "primary-button": PrimaryButton,
  },
};
</script>
<style>
.overflowNavbar {
  scrollbar-width: none;
}
.overflowNavbar::-webkit-scrollbar {
  display: none;
}
</style>
