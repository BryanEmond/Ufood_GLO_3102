<template>
  <div>
    <div
      class="p-4 mr-4 text-left rounded-3xl shadow mt-8 cursor-pointer w-44 h-32 hover:bg-slate-100"
      @click="openModal"
    >
      <div class="flex flex-col h-full justify-around">
        <div class="text-xl font-bold">{{ list.name }}</div>
        <div class="justify-self-end">
          {{ list.restaurants.length }} restaurants
        </div>
      </div>
    </div>
    <FavoriteListModal
      :open="isOpen"
      :list="list"
      :closeCallback="closeModal"
    ></FavoriteListModal>
  </div>
</template>

<script>
import FavoriteListModal from "./FavoriteListModal.vue";
import { ref } from "vue";

export default {
  data() {
    return {
      isOpen: ref(false),
    };
  },
  props: {
    list: Object,
    listUpdated: Function,
  },
  methods: {
    openModal() {
      this.isOpen = open;
      console.log("open modal");
    },

    closeModal() {
      this.isOpen = false;
      console.log("close modal");
      this.listUpdated();
    },
  },
  components: {
    FavoriteListModal,
  },
};
</script>
