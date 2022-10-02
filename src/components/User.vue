<!-- eslint-disable prettier/prettier -->
<template>
  <div class="md:flex justify-between">
    <div class="p-7 rounded-3xl shadow-md ml-9 h-auto w-11/12 md:w-4/12">
      <div class="profile-picture">
      <img class ="rounded-full shadow-md" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
     
      </div>
   
      <div class="flex flex-col text-center h-40">
      <a  class=" mt-8 md:mt-12 font-bold">John Smith</a>
      <a class="mt-8  md:mt-12 font-bold" >32 years</a>
      <a class="mt-8 md:mt-12 font-bold">University of Laval</a>

      </div>
   
    </div>
    <div class="ml-8 w-11/12">
      <svg class="p-7 text-center rounded-3xl w-full shadow">
            <text y="10%" font-weight="bold">User Rating</text>
            <circle class="stroke-current text-blue-200 stroke-2" cx="50%" cy="50%" r="60"></circle> 
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">81%</text>
           
       
      </svg>
      <div class=" p-7 text-left rounded-3xl w-full shadow flex flex-col justify-center mt-8">
        <p id="text" class="w-full font-bold">List of Restaurant</p>
        <div class="restaurant-card rounded-3xl shadow">
          <img class="rounded-xl object-cover w-1/5 h-5/6" src="https://images.squarespace-cdn.com/content/v1/5b660dad96e76f2d14344d91/1533655767235-H2P2ZYTKD8Y3ECATBKGL/Executive-Chef-Renoir-Restaurant.jpg?format=750w">
          <a class="w-full"> Restaurant 1</a>
          <a>&#9733; 4.5</a>
          <p class="w-full">(84 avis)</p>
          <router-link class=" w-full hover:text-blue-800" to="/restaurant">See more...</router-link>
        </div>
        <div class="restaurant-card rounded-3xl shadow">
          <img class="rounded-xl object-cover w-1/5 h-5/6" src="https://images.squarespace-cdn.com/content/v1/5b660dad96e76f2d14344d91/1533655767235-H2P2ZYTKD8Y3ECATBKGL/Executive-Chef-Renoir-Restaurant.jpg?format=750w">
          <a class="w-full"> Restaurant 2</a>
          <a >&#9733; 4.5</a>
          
          <p class="w-full">(84 avis)</p>
          <router-link class="w-full hover:text-blue-800  " to="/restaurant">See more...</router-link>
        </div>
      </div>
        
    </div>
        
        
    
  </div>

</template>
<!-- eslint-disable prettier/prettier -->
<style>

  circle{ 
    fill:none;
    stroke-linecap: round ;
    stroke-dashoffset: -30;
    stroke-dasharray: 200;
}


.restaurant-card{
  display:flex;
    width:100%;
    height:10rem;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;   
}




</style>

