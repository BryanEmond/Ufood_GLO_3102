<template>
  <div class="md:flex justify-between">
    <div class="ml-9 h-auto w-11/12 md:w-4/12">
      <div class="p-7 rounded-3xl shadow-md">
        <div class="profile-picture">
          <img
            class="rounded-full shadow-md"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
        </div>

        <div class="flex flex-col text-center h-45">
          <a class="mt-8 md:mt-12 font-bold">{{ this.username }}</a>
          <a class="mt-8 md:mt-12 font-bold">{{ this.email }}</a>
          <!-- <a class="mt-8 md:mt-12 font-bold">University of Laval</a> -->
        </div>
      </div>
      <div v-if="!this.isConnectedUser" class="ml-2 w-11/12">
        <button
          v-if="!this.followed"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-7 rounded-3xl mt-7 mb-7 shadow-md w-full"
          @click="this.Follow"
        >
          Follow
        </button>
        <button
          v-else
          class="bg-red-500 hover:bg-red-700 text-white font-bold p-7 rounded-3xl mt-7 mb-7 shadow-md w-full"
          @click="this.Unfollow"
        >
          Unfollow
        </button>
      </div>
      <div class="flex">
        <button
          class="hover:bg-gray-300 rounded-xl p-7 mt-7 mb-7 shadow-md w-5/12"
          @click="this.openModal1"
        >
          followers {{ this.followers }}
        </button>
        <button
          class="hover:bg-gray-300 rounded-xl p-7 mt-7 mb-7 ml-7 shadow-md w-5/12"
          @click="this.openModal2"
        >
          following {{ this.following }}
        </button>
      </div>
    </div>

    <div></div>
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
      <div class="text-2xl font-bold pt-8">
        {{ "Visited Restaurants" }}
      </div>
      <div class="flex flex-row flex-wrap content-start">
        <router-link
          :to="'/restaurant?id=' + items.restaurant_id"
          :key="items"
          v-for="items in visited"
          class="p-4 mr-4 text-left rounded-3xl shadow mt-8 cursor-pointer w-44 h-32 hover:bg-slate-100"
        >
          <div class="flex flex-col h-full justify-around">
            <div class="text-xl truncate font-bold">
              {{ this.names[items.restaurant_id] }}
            </div>
            <div class="justify-self-end">
              {{ items["comment"] }}
              {{ items["rating"] }}
            </div>
          </div>
        </router-link>
      </div>
      <div class="text-2xl font-bold pt-8">
        {{ this.isConnectedUser ? "My lists" : "Their lists" }}
      </div>
      <div v-if="isConnectedUser" class="flex-row mt-4">
        <input
          :bind="this.newListName"
          v-model="this.newListName"
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
          :isConnectedUser="isConnectedUser"
        ></FavoritesList>
      </div>
    </div>
    <FollowModal
      :open="this.Open"
      :closeCallback="this.closeModal"
      :followers="this.choice"
      :userId="this.userId"
      :newfriend="this.followed"
    >
    </FollowModal>
  </div>
</template>

<script>
import { createList, getListsFromUser } from "../api/favoritesAPI";
import { getVisitedFromUser } from "../api/visitsAPI";
import { getName } from "../api/restaurantsAPI";
import FavoritesList from "./favorites/FavoritesList.vue";
import FollowModal from "./FollowModal.vue";
import { getUserInfos } from "../api/login";
import { followUser, unfollowUser } from "../api/follow.js";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      newListName: "",
      favorites: [],
      names: {},
      visited: [],
      datas: [],
      username: "",
      email: "",
      userIdcheck: "",
      followed: true,
      followers: 0,
      following: 0,
      Open: false,
      choice: "",
    };
  },
  computed: {
    isConnectedUser() {
      console.log(`${this.userId} === ${this.userIdcheck}`);
      return this.userId === this.userIdcheck;
    },
  },
  props: {
    userId: String,
  },
  watch: {
    followed: async function (newVal, oldVal) {
      let datas = await getUserInfos(this.userId);
      this.followers = datas.followers.length;
    },
    userId: function (newVal, oldVal) {
      this.loadInfos();
      this.fetchVisited();
      this.fetchName();
      console.log(this.favorites);
    },
  },
  methods: {
    openModal1() {
      this.Open = true;
      this.choice = true;
    },
    openModal2() {
      this.Open = true;
      this.choice = false;
    },
    async Follow() {
      this.followed = await followUser(this.userId);
      this.followed = true;
    },
    async Unfollow() {
      this.followed = await unfollowUser(this.userId);
      this.followed = false;
    },
    async createList() {
      await createList(this.newListName, this.email);
      this.fetchLists();
    },
    async fetchLists() {
      this.favorites = await getListsFromUser(this.userId);
    },
    async fetchName() {
      for (let items in this.visited) {
        let id = this.visited[items].restaurant_id;
        let datas = await getName(id);
        this.names[id] = datas.name;
      }
    },
    async fetchVisited() {
      this.visited = await getVisitedFromUser(this.userId);
      console.log(this.visited);
    },
    async loadInfos() {
      this.userIdcheck = await Cookies.get("userId");
      let datas = await getUserInfos(this.userId);
      this.username = datas.name;
      this.email = datas.email;
      this.followed = this.checkFollow(datas);
      this.followers = datas.followers.length;
      this.following = datas.following.length;
    },
    closeModal() {
      this.Open = false;
    },
    checkFollow(datas) {
      let followers = datas.followers;
      for (let i in followers) {
        if (followers[i]["id"] === this.userIdcheck) {
          return true;
        }
      }
      return false;
    },
  },
  async beforeCreate() {
    this.favorites = await getListsFromUser(this.userId);
    this.visited = await getVisitedFromUser(this.userId);
    await this.loadInfos();
    console.log(this.visited);
    this.fetchName();
    /* this.userId = await getUserId();
    console.log(`data:`);
    console.log(data); */
  },
  components: { FavoritesList, FollowModal },
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
