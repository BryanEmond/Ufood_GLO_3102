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
                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left divide-y"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                  >Visit informations
                </DialogTitle>
                <div
                  class="mt-2"
                  v-for="list of this.listVisits"
                  :key="list.id"
                >
                  <p class="text-sm text-gray-500 mb-1">
                    Date of visit : {{ list.date.slice(0, 10) }}
                  </p>
                  <p class="text-sm text-gray-500 mb-1">
                    Rating :
                    {{ list.rating }}
                    / 5
                  </p>
                  <p class="text-sm text-gray-500 mb-1">
                    Comment :
                    {{ list.comment }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeCallback"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Dialog as Modal, DialogPanel, DialogTitle } from "@headlessui/vue";
import { getRestaurantVisits } from "./visits_script";

export default {
  name: "VisitModalView",
  props: {
    isOpen: Boolean,
    closeCallback: Function,
    restaurantId: String,
  },
  data() {
    return {
      listVisits: [],
    };
  },
  async mounted() {
    if (this.restaurantId) {
      this.listVisits = [];
      this.getData();
    }
  },
  watch: {
    restaurantId: function (newVal, oldVal) {
      this.listVisits = [];
      this.getData();
    },
  },
  methods: {
    async getData() {
      let data = await getRestaurantVisits(this.restaurantId);
      data = data.items;
      // if (data.length <= 3) {
      //   this.listVisits = data;
      // } else {
      //   data.slice(-3);
      // }
      // console.log(data);
      this.listVisits = data;

      // if (data.length <= 3) {
      //   this.listVisits = data;
      // } else {
      //   for (let i = data.length - 3; i < data.length; i++) {
      //     console.log(i);
      //     this.listVisits.push(data[-i]);
      //   }
      // }
    },
  },
  components: {
    Modal,
    DialogPanel,
    DialogTitle,
  },
};
</script>
