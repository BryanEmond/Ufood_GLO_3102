<template>
<div class="container mx-auto">
  
  <div class="bg-white shadow-md p-5 rounded-xl grid grid-cols-1 m:grid-cols-2 lg:grid-cols-2 border-2 border-gray-300">
        <div>
          <h1 class="text-2xl md:text-4xl uppercase font-bold">{{name}}</h1>
          <adress>{{address}}</adress>
          <div>{{tel}}</div>
          <div> &#9733; {{formattedRating}}</div>
          <div>$</div>
          <div><span v-for="g in genres" :key="g">{{g}}</span></div>
          <div><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Directions</button></div>
          
        </div>
        <div class="flex justify-center">
          <table>
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hours, day) in this.opening_hours" :key="hours">
                <th>{{day}}</th>
                <td>{{hours}}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex-col">
            <div class="p-2 ml-20"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Book Now</button></div>
            <div class="p-2 ml-20"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add favorite</button>
            </div>
            </div>
      </div>
      
    

      
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 shadow-lg" >
    <div class="flex map-responsive h-full object-cover rounded-xl border-2 border-gray-300">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2727.92080033812!2d-71.21905764856824!3d46.8649309790401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb8bdb97e971d5d%3A0xa4e5a49ed3c5bda!2sQuesada%20Burritos%20%26%20Tacos!5e0!3m2!1sfr!2sca!4v1664390562984!5m2!1sfr!2sca" width="1200" height="1200" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <div class="flex border-2 border-gray-300 rounded-xl p-6 object-cover" v-for="image in this.pictures" :key = "image">
      <img class="object-cover rounded-xl shadow-lg" :src="image">
    </div>
    
  </div>
</div>
</template> 

<style>
  .map-responsive{
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:0;
    }
.map-responsive iframe{
    left:0;
    top:0;
    position:absolute;
    }
</style>


<script>

import * as script from './restaurant_script.js'
export default {
  data() {
    return {
      opening_hours: {
                       
                      },
      pictures: [
                  
                  ],
      name: "",
      place_id: "",
      tel: "",
      address: "" ,
      price_range: null,
      rating:null,
      genres: [
               
                ],
      location: {
               
                  },
          }
      },
      beforeCreate: async function(){
            let data = await script.getInfo()
            data = JSON.parse(data)
            console.log(data)
            this.opening_hours = data.opening_hours
            this.pictures = data.pictures
            this.name = data.name
            this.place_id = data.place_id
            this.tel = data.tel
            this.address = data.address
            this.price_range = data.price_range
            this.rating = data.rating
            this.genre = data.genre
            this.location = data.location
           
      },
      computed: {
          formattedRating(){
            return this.rating.toFixed(2);
      }
  }
}

</script>