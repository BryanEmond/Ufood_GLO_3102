import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
