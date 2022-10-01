<!-- eslint-disable prettier/prettier -->
<template>
  <div class="mycontainer flex justify-between">
    <div class="profile-info rounded-3xl shadow-md">
      <div class="profile-picture">
      <img class ="rounded-full shadow-md" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
     
      </div>
   
      <div class="profile-name">
      <a id="profile-name">User Name</a>
      <a id="profile-name">Age</a>
      <a id="profile-name">Address</a>

      </div>
   
    </div>
    <div class="profile-features">
      <svg class="user-rate">
            <text y="10%" font-weight="bold">User Rating</text>
            <circle cx="50%" cy="50%" r="60"></circle> 
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">81%</text>
           
       
      </svg>
      <div class="user-restaurant-list">
        <p id="text">List of Restaurant</p>
        <div class="restaurant-card">
          <img class="rounded-xl" src="https://images.squarespace-cdn.com/content/v1/5b660dad96e76f2d14344d91/1533655767235-H2P2ZYTKD8Y3ECATBKGL/Executive-Chef-Renoir-Restaurant.jpg?format=750w">
          <a> Restaurant 1</a>
          <svg class="rating" viewBox="0 0 150 24" width="400">
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="">
            </path>
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="translate(26 0)">
            </path>
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="translate(52 0)">
            </path>
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="translate(78 0)"></path>
            <path d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z" transform="translate(104 0)"></path>
          </svg>
          <p>(84 avis)</p>
          <a class="restaurant-link">See more...</a>
        </div>
        <div class="restaurant-card">
          <img class="rounded-xl" src="https://images.squarespace-cdn.com/content/v1/5b660dad96e76f2d14344d91/1533655767235-H2P2ZYTKD8Y3ECATBKGL/Executive-Chef-Renoir-Restaurant.jpg?format=750w">
          <a> Restaurant 2</a>
          <svg class="rating" viewBox="0 0 150 24" width="400">
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="">
            </path>
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="translate(26 0)">
            </path>
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="translate(52 0)">
            </path>
            <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z" transform="translate(78 0)"></path>
            <path d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z" transform="translate(104 0)"></path>
          </svg>
          <p>(84 avis)</p>
          <a class="restaurant-link">See more...</a>
        </div>
      </div>
        
    </div>
        
        
    
  </div>

</template>
<!-- eslint-disable prettier/prettier -->
<style>
  :root{
    --color-primary: #7380ec;
    --color-danger: #ff7782;
    --color-success: #41f1b6;
    --color-warning: #ffbb55;
    --color-white:#fff;
    --color-info-dark:#7d8da1;
    -color-info-light: #dce1eb;
    --color-dark: #363949;
    --color-light: rgba(132,139,200,0.18);
    --color-primary-variant: #111e88;
    --color-dark-variant:#677483;
    --color-background:#f6f6f9;

    --card-border-radius: 2rem;
    --border-radius-1: 0.4rem;
    --border-radius-2: 0.8rem;
    --border-radius-3: 1.2rem;

    --card-padding: 1.8rem;
    --padding-1: 1.2rem;

    --box-shadow:0 2rem 3rem var(--color-light);
}

  .profile-info{
    margin-left:10rem;  
    background:var(--color-white);
    width:20rem;
    height:30rem;
    
    padding: var(--card-padding);
    
    

  }
  .profile-features{
    
    margin-left:2rem;
    width:100%;

  }
  .profile-name {
    display:flex;
    width:100%;
    flex-direction:column;
    margin: auto;
    right: 0;
    margin-top:80px;
    bottom: 0;
    left: 0;
    width: inherit;
    height: 40px;
    text-align: center;
    
  }
  .profile-name a{
    margin-right:4rem;
  }
  .restaurant-card a{
    width:100%;
    
  }
  .restaurant-card p{
    width:100%;
  }
  .user-restaurant-list #text{
    display:block;
    text-align: left;
    place-self: start;
    font-weight: bolder;

  }
  .user-rate{
  width:100%;
  text-align: center;
  background:var(--color-info-light);

  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  text-align: center;
  box-shadow: var(--box-shadow);
}
 
  circle{ 
    fill:none;
    stroke:lightblue;
    stroke-width: 7;
    stroke-linecap: round ;
    stroke-dashoffset: -30;
    stroke-dasharray: 200;
}
.number{
    position: block;
    top:0;
    left:0;
    height:100%;
    width:100%;
    display: flex;
    justify-content:center;
    align-items:center;
}
.user-restaurant-list{
    background:var(--color-info-light);
    
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    text-align: left;
    box-shadow: var(--box-shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

}
.restaurant-card{
  display:flex;
  background:var(--color-info-light);
    width:100%;
    height:10rem;
    border-radius: var(--card-border-radius);
  
    text-align: center;
    box-shadow: var(--box-shadow);
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    
    
}
.restaurant-card img{
  width:20%;
  height:90%;
  object-fit: cover;
}
.rating{
  padding-right:0;
 
  fill:aquamarine
}
/*-----------------------tablet-----------------------*/
@media screen and (max-width:1200px){
  .profile-info{
    margin-left:3rem;
    background:var(--color-white);
    
    width:17rem;
    height:30rem;
    
    

  }
  .restaurant-card p{
    display:none;
  }
  .rating{
    width:50%;
  }
  
  .profile-features{
    width:45%;
    

  }
}
@media screen and (max-width: 790px) {
  .profile-info{
    margin-left:4rem;
    background:var(--color-white);
    
    width:22rem;
    height:30rem;
    
    

  }
  .mycontainer{flex-direction: column;}
  .profile-features{
    width:90%;
    

  } 
}

</style>
