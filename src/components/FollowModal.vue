/* eslint-disable */
<template>
  <Modal
    as="div"
    class="relative z-10"
    @close="this.closeCallback"
    :open="isOpen"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <DialogPanel
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="w-11/12 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
              >
                <DialogTitle
                  v-if="this.followers"
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                  >Followers
                </DialogTitle>
                <DialogTitle
                  v-else
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                  >Following
                </DialogTitle>
                <div>
                  <router-link
                    :to="'/user/' + items.id"
                    :key="items"
                    v-for="items in this.listFollow"
                  >
                    <div
                      class="flex rounded-3xl p-7 mb-3 shadow-md justify-between w-auto"
                    >
                      <p>{{ items.name }}</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeCallback"
              ref="cancelButtonRef"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Dialog as Modal, DialogPanel, DialogTitle } from "@headlessui/vue";
import { ref, reactive, computed } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import * as script from "../api/visitsAPI";
import Cookies from "js-cookie";

import { getUserInfos } from "../api/login";

export default {
  name: "VisitModal",
  props: {
    isOpen: Boolean,
    closeCallback: Function,
    followers: Boolean,
    userId: String,
    newfriend: Boolean,
  },
  data() {
    return {
      listFollow: [],
    };
  },
  mounted() {
    this.listFollow = [];
    this.getFollowers();
  },
  watch: {
    followers: function (newVal, oldVal) {
      this.listFollow = [];
      this.getFollowers();
    },
    newfriend: function (newVal, oldVal) {
      this.listFollow = [];
      this.getFollowers();
    },
  },
  components: {
    Modal,
    DialogPanel,
    DialogTitle,
  },
  methods: {
    async getFollowers() {
      let datas = await getUserInfos(this.userId);
      if (this.followers) {
        this.listFollow = datas.followers;
      } else {
        this.listFollow = datas.following;
      }
    },
  },
};
</script>
