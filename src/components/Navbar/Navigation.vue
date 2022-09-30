<template>
  <nav>
    <div
      class="flex flex-row space-x-2 p-2 justify-between border-b-2 items-center basis-4"
    >
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div class="w-24 h-4 shrink-0">
          <router-link to="/">
            <img :src="ufoodSVG" />
          </router-link>
        </div>
      </div>

      <div class="flex-row space-x-2 justify-evenly grow hidden sm:flex">
        <router-link to="/">Home</router-link>
        <router-link to="/restaurant">Restaurant</router-link>
        <router-link to="/user">User Profile</router-link>
      </div>

      <div class="shrink-0 sm:grow">
        <search-bar></search-bar>
      </div>
      <div class="flex">
        <primary-button class="mr-2">Sign In</primary-button>
        <primary-button fill>Sign Up</primary-button>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBar from "./SearchBar";
import PrimaryButton from "../PrimaryButton";
export default {
  name: "Navigation",
  data() {
    return {
      ufoodSVG: require("../../assets/UFood.svg"),
    };
  },
  components: {
    "search-bar": SearchBar,
    "primary-button": PrimaryButton,
  },
};
</script>

<style></style>
