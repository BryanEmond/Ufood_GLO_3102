<template>
  <div class="md:flex justify-between">
    <div class="p-7 rounded-3xl shadow-md ml-9 h-auto w-11/12 md:w-4/12">
      <div class="profile-picture">
        <img
          class="rounded-full shadow-md"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        />
      </div>

      <div class="flex flex-col text-center h-45">
        <a class="mt-8 md:mt-12 font-bold">John Smith</a>
        <a class="mt-8 md:mt-12 font-bold">32 years</a>
        <a class="mt-8 md:mt-12 font-bold">University of Laval</a>
      </div>
    </div>
    <div class="ml-8 w-11/12">
      <svg class="p-7 text-center rounded-3xl w-full shadow">
        <text y="10%" font-weight="bold">User Rating</text>
        <circle
          class="stroke-current text-blue-200 stroke-2"
          cx="50%"
          cy="50%"
          r="60"
        ></circle>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
          81%
        </text>
      </svg>
      <div class="text-2xl font-bold pt-8">My lists</div>
      <div class="flex-row mt-4">
        <input
          :bind="newListName"
          v-model="newListName"
          placeholder="Enter name ..."
          class="form-control px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
        <button
          @click="createList"
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          class="ml-2 p-left px-6 py-2 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create new list
        </button>
      </div>
      <div class="flex flex-row flex-wrap content-start">
        <FavoritesList
          v-for="list in favorites"
          :key="list.id"
          :list="list"
          :listUpdated="fetchLists"
        ></FavoritesList>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllFavorites,
  createList,
  getListsFromUser,
} from "../api/favoritesAPI";
import FavoritesList from "./favorites/FavoritesList.vue";
import { DUMMY_USER_ID } from "../api/endpoint";

export default {
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    async createList() {
      await createList(this.newListName, "equipe8@email.com");
      this.fetchLists();
    },
    async fetchLists() {
      this.favorites = await getListsFromUser(DUMMY_USER_ID);
    },
  },
  async beforeCreate() {
    this.favorites = await getListsFromUser(DUMMY_USER_ID);
  },
  components: { FavoritesList },
};
</script>

<style>
circle {
  fill: none;
  stroke-linecap: round;
  stroke-dashoffset: -30;
  stroke-dasharray: 200;
}

.restaurant-card {
  display: flex;
  width: 100%;
  height: 10rem;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
