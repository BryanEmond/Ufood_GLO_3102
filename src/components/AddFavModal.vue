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
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                  >Add To Favorite
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 mb-1">
                    Select a List. Currently selected {{ form.rating }}.
                  </p>
                  <select
                    v-model="form.rating"
                    class="mb-5 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option disabled value="">Please select one</option>
                    <option v-for="name in this.listNames" :key="name">
                      {{ name }}
                    </option>
                  </select>
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
            <button
              type="button"
              class="disabled:bg-gray-400 inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              @click="this.saveChanges2"
              :disabled="disabled2"
            >
              Add to favorite
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as script from "../api/visitsAPI";
import { getListsFromUser, addToList } from "../api/favoritesAPI";
import { DUMMY_USER_ID } from "../api/endpoint";

export default {
  name: "VisitModal",
  props: {
    isOpen: Boolean,
    closeCallback: Function,
    restaurantId: String,
  },
  data() {
    return {
      listIds: [],
      listNames: [],
    };
  },
  beforeCreate: async function () {
    let data = await getListsFromUser(DUMMY_USER_ID);

    for (let i in data) {
      this.listIds.push(data[i].id);
      this.listNames.push(data[i].name);
    }
  },
  setup() {
    const form = reactive({
      date: ref(""),
      rating: ref(""),
      comment: ref(""),
    });
    const disabled = computed(
      () => !form.rating || !form.date || !form.comment
    );
    const disabled2 = computed(() => !form.rating);
    return { form, disabled, disabled2 };
  },
  methods: {
    async saveChanges() {
      console.log("sending review");
      await script.postVisit(
        this.restaurantId,
        this.form.comment,
        this.form.rating,
        this.form.date
      );
      this.closeCallback();
    },
    async saveChanges2() {
      let index = this.listNames.indexOf(this.form.rating);
      console.log("sending Favorite");
      await addToList(this.listIds[index], this.restaurantId);
      this.closeCallback();
    },
  },
  components: {
    Modal,
    DialogPanel,
    DialogTitle,
  },
};
</script>
