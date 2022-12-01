<template>
  <nav>
    <div
      class="flex flex-row space-x-2 p-2 justify-between border-b-2 items-center basis-4"
    >
      <div class="flex">
        <svg
          v-on:click="hamburgerIsDisplay = !hamburgerIsDisplay"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="cursor-pointer w-6 h-6 sm:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div class="w-24 h-4 shrink-0 al">
          <router-link to="/">
            <img :src="ufoodSVG" />
          </router-link>
        </div>
      </div>

      <div class="flex-row space-x-2 justify-evenly grow hidden sm:flex">
        <router-link to="/user/636969b87bed3d6cd9563f4d">Profile</router-link>
      </div>

      <div class="shrink-0 sm:grow">
        <search-bar></search-bar>
      </div>
      <div class="flex">
        <primary-button class="mr-2 hidden sm:block">Sign In</primary-button>
        <primary-button fill class="hidden sm:block">Sign Up</primary-button>
      </div>
    </div>
    <div v-if="!hamburgerIsDisplay">
      <hamburger-menu
        @close-side-menu="closeSideMenu"
        ref="hamMenu"
        class="flex flex-col"
      ></hamburger-menu>
    </div>
  </nav>
</template>

<script>
import SearchBar from "./SearchBar";
import PrimaryButton from "../PrimaryButton";
import HamburgerMenu from "../Hamburger.vue";
export default {
  data() {
    return {
      hamburgerIsDisplay: true,
      ufoodSVG: require("../../assets/UFood.svg"),
    };
  },
  components: {
    "search-bar": SearchBar,
    "primary-button": PrimaryButton,
    "hamburger-menu": HamburgerMenu,
  },
  methods: {
    closeSideMenu(value) {
      this.hamburgerIsDisplay = value;
      return;
    },
    displayHamburgerMenu: function () {
      console.log(HamburgerMenu.data().isDisplay);
    },
  },
};
</script>
