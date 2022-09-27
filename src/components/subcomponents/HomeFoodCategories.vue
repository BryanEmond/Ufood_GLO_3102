<template>
  <div>
    <div v-for="cat in foodCategories" :key="cat.id" class="inline-flex" >
      <a
        v-bind:href="'#/' + cat.categorie"
        class="bg-blue-400 bg-blue-400 text-white font-bold py-2 px-2 rounded-full text-black mt-1 mr-1"
        >{{ cat.categorie }}</a
      >
    </div>
  </div>
</template>
<script type="module">
export default {
  name: "Home",
  data() {
    return {
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
};
</script>
<style></style>
