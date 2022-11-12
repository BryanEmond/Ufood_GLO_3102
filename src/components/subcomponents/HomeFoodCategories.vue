<template>
  <div class="mb-2">
    <div class="overflow-x-auto whitespace-nowrap overflowNavbar">
      <div v-for="cat in foodCategories" :key="cat.id" class="inline-flex">
        <primary-button class="m-2">
          <router-link v-bind:to="'/?genres=' + cat.url">
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
        { id: 0, categorie: "N/A", url:"" },
        { id: 1, categorie: "Fast Food", url:"fast-food" },
        { id: 2, categorie: "Desserts", url:"desserts" },
        { id: 3, categorie: "Végétarien", url:"végétarien" },
        { id: 4, categorie: "Ambiance", url:"ambiance" },
        { id: 5, categorie: "Café", url:"café" },
        { id: 6, categorie: "Hamburgers", url:"hamburgers" },
        { id: 7, categorie: "Libanais", url:"libanais" },
        { id: 8, categorie: "Bistro", url:"bistro" },
        { id: 9, categorie: "Happy hour", url:"happy hour" },
        { id: 10, categorie: "Mexicain", url:"mexicain" },
        { id: 11, categorie: "Asiatique", url:"asiatique" },
        { id: 12, categorie: "Mexicain", url:"mexicain" },
        { id: 14, categorie: "Charcuterie", url:"charcuterie" },
        { id: 15, categorie: "Fruits de mer", url:"fruits de mer" },
        { id: 16, categorie: "Italien", url:"italien" },
        { id: 17, categorie: "Boulangerie", url:"boulangerie" },
        { id: 18, categorie: "Santé", url:"santé" }
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
