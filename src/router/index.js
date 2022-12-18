import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import SearchResults from "@/components/SearchResults";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user/:userId",
    name: "User",
    component: User,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/components/Register"),
  },
  {
    path: "/search",
    name: "Search",
    component: SearchResults,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
