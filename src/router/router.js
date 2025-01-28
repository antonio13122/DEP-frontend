import { createRouter, createWebHistory } from "vue-router";
import { getToken, getUser } from "@/services/authService.js";
import HomePage from "@/components/HomePage.vue";
import Marinas from "@/components/Marinas.vue";
import AppointmentForm from "@/components/AppointmentForm.vue";
import AboutUs from "@/components/AboutUs.vue";
import MainView from "@/views/MainView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

import Choose from "@/views/Choose.vue";
import TestApi from "@/components/TestApi.vue";
import OwnerHome from "@/views/OwnerHome.vue";
import SailorHome from "@/views/SailorHome.vue";
const routes = [
  { path: "/HomePage", component: HomePage },
  { path: "/Choose", component: Choose },
  { path: "/TestApi", component: TestApi },

  { path: "/Login", component: Login },
  { path: "/SailorHome", component: SailorHome },
  {
    path: "/OwnerHome",
    component: OwnerHome,
    meta: { requiresAuth: true },
  },

  { path: "/", component: Register },

  { path: "/Marinas", component: Marinas },
  { path: "/AppointmentForm", component: AppointmentForm },
  { path: "/AboutUs", component: AboutUs },
  // MainView je default
  { path: "/MainView", component: MainView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = getToken();
  const user = getUser();

  if (to.meta.requiresAuth && !token) {
    next("/Login");
  } else if (to.path === "/SailorHome") {
    if (user && user.email === "sailor@gmail.com") {
      next();
    } else {
      next("/Login");
    }
  } else {
    next();
  }
});
export default router;
