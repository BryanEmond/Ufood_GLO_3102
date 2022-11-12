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
                  ><input
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Example label"
                    v-model="newListName"
                  />
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              @click="this.saveChanges"
            >
              Save changes
            </button>
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
              class="inline-flex justify-self-end w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              @click="this.deleteList"
            >
              Delete list
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Modal>
</template>

<script>
import { Dialog as Modal, DialogPanel, DialogTitle } from "@headlessui/vue";
import { deleteList, renameList } from "../../api/favoritesAPI";
import { DUMMY_USER_ID } from "../../api/endpoint";
export default {
  name: "FavoriteListModal",
  props: {
    list: Object,
    isOpen: Boolean,
    closeCallback: Function,
  },
  data() {
    return {
      newListName: this.list.name,
    };
  },
  methods: {
    async deleteList() {
      await deleteList(this.list.id);
      this.closeCallback();
    },
    async saveChanges() {
      await renameList(this.newListName, DUMMY_USER_ID, this.list.id);
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
