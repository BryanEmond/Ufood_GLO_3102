<template>
  <div class="p-6">
    <div>
      <div class="font-bold text-xl">Users found matching your search :</div>
      <div v-show="!this.userIsConnected">
        You must be signed in to search users
      </div>
      <div v-show="this.userIsConnected && this.userResults.length === 0">
        No user found mathing with your query
      </div>
      <div v-show="this.userIsConnected" class="flex flex-row flex-wrap">
        <div v-for="user in userResults" :key="user.id">
          <router-link :to="{ path: `user/${user.id}` }">
            <div
              class="p-4 mr-4 text-left rounded-3xl shadow mt-8 cursor-pointer w-44 h-32 hover:bg-slate-100"
            >
              {{ user.name }}
            </div>
          </router-link>
        </div>
      </div>

      <div class="font-bold text-xl pt-4">
        Restaurants close to you matching your search :
      </div>
      <div
        v-show="this.restaurantsResults.length > 0"
        class="flex flex-row flex-wrap"
      >
        <div v-for="resto in restaurantsResults" :key="resto.id">
          <router-link
            :to="{ path: `restaurant`, query: { id: `${resto.id}` } }"
          >
            <div
              class="inline-block w-96 p-3 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div class="w-full flex justify-center">
                <img v-bind:src="resto.pictures[0]" class="h-48" />
              </div>

              <h5
                class="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white inline"
              >
                {{ resto.name }}
              </h5>
              <div class="float-right inline">
                <p class="font-normal text-gray-700 dark:text-gray-400 inline">
                  {{ resto.rating.toFixed(1) }}
                </p>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/star-512.png"
                  class="h-5 inline pb-1"
                />
              </div>

              <p
                class="ml-2 font-normal text-gray-700 dark:text-gray-400 inline"
              >
                {{ "$".repeat(resto.price_range) }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-show="this.restaurantsResults.length === 0">
        No restaurants were found matching your query
      </div>
    </div>
  </div>
</template>

<script>
import { getUsers } from "../api/usersAPI";
import { searchClosestRestaurants } from "../api/restaurantsAPI";
import { getCoords } from "../utils/coordinates";
import Cookies from "js-cookie";

export default {
  name: "SearchResults",
  data() {
    return {
      userResults: [],
      restaurantsResults: [],
      query: "",
    };
  },
  computed: {
    userIsConnected() {
      return !(Cookies.get("token") == undefined);
    },
  },
  beforeCreate() {
    this.userIsConnected = !(Cookies.get("token") == undefined);
  },
  async created() {
    this.$watch(
      "$route.query.query",
      async function (newQuery, oldQuery) {
        this.query = newQuery;

        if (this.userIsConnected) {
          this.userResults = await getUsers(this.query);
        }

        let position = await getCoords();

        this.restaurantsResults = await searchClosestRestaurants(
          this.query,
          position.coords.longitude,
          position.coords.latitude
        );
      },
      { immediate: true }
    );
  },
};
</script>
