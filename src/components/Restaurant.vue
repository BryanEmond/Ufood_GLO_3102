<template>
  <div class="container mx-auto">
    <div
      class="bg-white shadow-md p-5 rounded-xl grid grid-cols-1 m:grid-cols-2 lg:grid-cols-2 border-2 border-gray-300 mt-5 mb-5"
    >
      <div>
        <h1 class="text-2xl md:text-4xl uppercase font-bold">{{ name }}</h1>
        <adress>{{ address }}</adress>
        <div>{{ tel }}</div>
        <div>&#9733; {{ formattedRating }}</div>
        <div>$</div>
        <div>
          <span v-for="g in genres" :key="g">{{ g }}</span>
        </div>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Get Directions
          </button>
        </div>
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            @click="this.openModal"
          >
            Write a review
          </button>
        </div>
      </div>
      <div class="flex justify-center">
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr v-for="(hours, day) in opening_hours" :key="hours">
              <th>{{ day }}</th>
              <td>{{ hours }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 shadow-lg">
      <div class="flex border-2 border-gray-300 rounded-xl p-6 object-cover">
        <img
          class="object-cover rounded-xl shadow-lg"
          src="https://ufood.s3-us-west-2.amazonaws.com/pictures/d14999e4-4238-473d-8ff1-278f78498206.jpg"
        />
      </div>
      <div class="flex border-2 border-gray-300 rounded-xl p-6 object-cover">
        <img
          class="object-cover rounded-xl shadow-lg"
          src="https://ufood.s3-us-west-2.amazonaws.com/pictures/5868b5f5-7524-40ae-b0cf-ae5eed07037a.jpg"
        />
      </div>
      <div
        class="flex map-responsive h-full object-cover rounded-xl border-2 border-gray-300"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2727.92080033812!2d-71.21905764856824!3d46.8649309790401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb8bdb97e971d5d%3A0xa4e5a49ed3c5bda!2sQuesada%20Burritos%20%26%20Tacos!5e0!3m2!1sfr!2sca!4v1664390562984!5m2!1sfr!2sca"
          width="1200"
          height="1200"
          frameborder="0"
          style="border: 0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <VisitModalVue
      :open="isOpen"
      :closeCallback="closeModal"
      :restaurantId="id"
    ></VisitModalVue>
  </div>
</template>

<style>
.map-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}
.map-responsive iframe {
  left: 0;
  top: 0;
  position: absolute;
}
</style>

<script>
import * as script from "./restaurant_script.js";
import VisitModalVue from "./VisitModal.vue";
export default {
  data() {
    return {
      opening_hours: {
        sunday: "closed",
        monday: "11:00-21:00",
        tuesday: "11:00-21:00",
        wednesday: "11:00-21:00",
        thursday: "11:00-21:00",
        friday: "11:00-21:00",
        saturday: "11:00-21:00",
      },
      pictures: [
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/d9eee8ae-f1e4-4365-ab3e-581ec1d89650.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/e169cbfd-da53-41c4-aab8-82f46775934f.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/6823b4bb-5e08-4d98-8e6d-3e123d3b3faa.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/48d30d17-eef6-4538-945d-ffb1ec6e1fa6.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/45f07f52-cc8b-47e0-b18f-a08b33caef7d.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/5868b5f5-7524-40ae-b0cf-ae5eed07037a.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/02ff789d-7282-4770-86fd-ce09129da665.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/d14999e4-4238-473d-8ff1-278f78498206.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/3368b560-4ce4-4843-a18a-6698c768ebdc.jpg",
        "https://ufood.s3-us-west-2.amazonaws.com/pictures/aaf41a94-b1f1-474e-8a27-5e424f67a5df.jpg",
      ],
      name: "Quesada Burritos & Tacos",
      place_id: "ChIJXR2Xfrm9uEwR2ls87UlaTgo",
      tel: "(418) 666-8226",
      address: "2831 Avenue St David, Québec, QC G1C 0J3, Canada",
      price_range: 1,
      rating: 2.5811833740435306,
      genres: ["mexicain"],
      location: {
        coordinates: [-71.2168202, 46.8649151],
        type: "Point",
      },
      id: "5f31fc8655d7790550c08b07",
      isOpen: false,
    };
  },
  computed: {
    formattedRating() {
      return this.rating.toFixed(2);
    },
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
  components: {
    VisitModalVue,
  },
};
</script>
