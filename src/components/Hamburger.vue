<script>
    /*import {createApp} from 'vue'
  
    const app = createApp({
      data(){
          navOpen: true
      }
    })
    app.mount('#burger_menu')*/
  
    export default {
      data() {
        return {
          navOpen: true
        }
      }
    }
  
    /*var burger_menu = new Vue({
      el: '#burger_menu',
      data: {
        navOpen: true,
      },
    })*/
  </script>
  
  <template>
    <nav>
        <div class="flex flex-column space-x-2 p-2 justify-start border-b-2 items-center basis-4">
            <div class="flex-column space-x-2 justify-evenly grow hidden sm:flex">
                <router-link to="/restaurant">Restaurant</router-link>
                <router-link to="/user">Profile</router-link>
            </div>

            <div class="shrink-0 sm:grow">
                <search-bar></search-bar>
            </div>
            <div class="flex">
                <primary-button class="mr-2">Sign In</primary-button>
                <primary-button fill class="hidden sm:block">Sign Up</primary-button>
            </div>
        </div>
      <ul>
        <li>
          <router-link to="/restaurant">Restaurant</router-link>
        </li>
        <li>
          <router-link to="/user">Profile</router-link>
        </li>
      </ul>
  
      <div id="burger_menu">
        <button class="burger_btn" v-on:click="navOpen=!navOpen" v-bind:class="{active:navOpen}">
            <span class="top"></span>
            <span class="mid"></span>
            <span class="bottom"></span>
          </button>
        <transition name="translateX">
          <nav v-show="navOpen">
            <div class="burger_menu_wrap">
              <ul class="burger_menu_list">
                <li class="burger_menu_el">
                  <a href="">Home</a>
                  <router-link to="/"></router-link>
                </li>
                <li class="burger_menu_el">
                  <a href="">Profile</a>
                </li>
                <li class="burger_menu_el">
                  <a href="">Friends</a>
                </li>
                <li class="burger_menu_el">
                  <a href="">Sign out</a>
                </li>
              </ul>
            </div>
          </nav>
        </transition>
      </div>
    </nav>
  </template>
  
  <style>
    #burger_menu nav {
      width: 200px;
      background: grey;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
  
      #burger_menu .burger_btn {
      display: block;
      width: 50px;
      height: 50px;
      background: grey;
      border: none;
      position: relative;
      z-index: 100;
      appearance: none;
      cursor: pointer;
      outline: none;
    }
  
    #burger_menu .burger_btn span {
      display: block;
      width: 20px;
      height: 2px;
      margin: auto;
      background: white;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: all .4s ease;
    }
  
    #burger_menu .burger_btn .top {
        transform: translateY(-8px);
      }
  
      #burger_menu .burger_btn .bottom {
          transform: translateY(8px);
      }
      
      #burger_menu .burger_btn .active .top {
          transform: rotate(-45deg);
      }
  
      #burger_menu .burger_btn .active .mid{
          transform: translateX(-20px) rotate(360deg);
          opacity: 0;
      }
          
    #burger_menu .burger_btn .active .bottom {
          transform: rotate(45deg);
      }
  
      #burger_menu .burger_menu_wrap {
      padding-top: 50px;
    }
  
      #burger_menu .burger_menu_wrap	.burger_menu_list {
      padding-top: 50px;
      list-style:none;
      padding: 0;
      margin: 0;
    }
  
      #burger_menu .burger_menu_wrap	.burger_menu_list	.burger_menu_el .a {
      text-decoration: none;
      line-height: 1.6em;
      font-size: 1.6em;
      padding: .5em;
      display: block;
      color: white;
      transition: .4s ease;
    }
  
    #burger_menu .burger_menu_wrap	.burger_menu_list	.burger_menu_el .a:hover {
      background: lightgrey;
      color: dimgrey;
    }
  
    .translateX-enter{
      transform:translateX(-200px);
      opacity: 0;
    }
  
    .translateX-enter-active,.translateX-leave-active{
      transform-origin: top left 0;
      transition:.2s ease;
    }
  
    .translateX-leave-to{
      transform: translateX(-200px);
      opacity: 0;
    }
  </style>