<template>
  <div class="mb-2">
    <div class="float-left m-2" v-if="active">
      <button
        class="bg-gray-400 text-white font-bold py-1 px-3 rounded-full text-black mr-1"
      >
        &lt;
      </button>
    </div>
    <div class="float-right mt-2" v-if="!active">
      <button
        class="bg-gray-400 text-white font-bold py-1 px-3 rounded-full text-black"
      >
        >
      </button>
    </div>
    <div class="overflow-x-auto whitespace-nowrap overflowNavbar">
      <div v-for="cat in foodCategories" :key="cat.id" class="inline-flex">
        <primary-button class="m-2" v-bind:href="'#/' + cat.categorie">
          <router-link v-bind:to="'/' + cat.categorie">
            {{ cat.categorie }}
          </router-link>
        </primary-button>
      </div>
    </div>
  </div>
</template>
<script type="module">
import PrimaryButton from "../PrimaryButton";
export default {
  name: "Home",
  data() {
    return {
      active: false,
      foodCategories: [
        { id: 0, categorie: "Fast Food" },
        { id: 1, categorie: "Poutine" },
        { id: 2, categorie: "Desserts" },
        { id: 3, categorie: "Sandwiches" },
        { id: 4, categorie: "Chicken" },
        { id: 5, categorie: "Breakfast" },
        { id: 6, categorie: "Burgers" },
        { id: 7, categorie: "Poke" },
        { id: 8, categorie: "American" },
        { id: 9, categorie: "Suchi" },
        { id: 10, categorie: "Pizza" },
        { id: 11, categorie: "Pizza" },
        { id: 12, categorie: "Salad" },
        { id: 13, categorie: "Middle Eastern" },
        { id: 14, categorie: "Japanese" },
        { id: 15, categorie: "French" },
        { id: 16, categorie: "Thai" },
        { id: 17, categorie: "Soup" },
        { id: 18, categorie: "Vegan" },
        { id: 19, categorie: "Indian" },
      ],
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
