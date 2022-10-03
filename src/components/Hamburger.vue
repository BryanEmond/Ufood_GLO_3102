<script>
import PrimaryButton from "./PrimaryButton.vue";
export default {
  name: "HamburgerMenu",
  data() {
    return {
      isDisplay: false,
      ufoodSVG: require("../assets/UFood.svg"),
    };
  },
  components: {
    "primary-button": PrimaryButton,
  },
  methods: {
    changeIsDisplay: function () {
      this.$emit("close-side-menu", true);
      return;
    },
  },
};
</script>

<template>
  <nav>
    <div
      id="burgerBtn"
      class="fixed top-0 h-screen flex flex-col space-y-5 p-2 justify-start border-r-2 bg-white pl-3 w-3/5"
    >
      <div class="flex flex-row justify-between">
        <div class="w-24 h-4 shrink-0">
          <router-link to="/">
            <img :src="ufoodSVG" />
          </router-link>
        </div>
        <svg
          v-on:click="changeIsDisplay()"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="cursor-pointer w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div class="flex flex-col space-y-5 justify-start grow pt-3">
        <div class="flex flex-col space-y-2">
          <router-link to="/restaurant">Restaurant</router-link>
          <router-link to="/user">Profile</router-link>
        </div>
        <div class="flex flex-row justify-around">
          <primary-button class="">Sign In</primary-button>
          <primary-button fill class="">Sign Up</primary-button>
        </div>
      </div>
    </div>
  </nav>
</template>
