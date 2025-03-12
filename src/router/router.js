import { createRouter, createWebHistory } from "vue-router";
import { getToken, getUser } from "@/services/authService.js";
import HomePage from "@/components/HomePage.vue";
import Marinas from "@/components/Marinas.vue";
import AppointmentForm from "@/components/AppointmentForm.vue";
import AboutUs from "@/components/AboutUs.vue";
import MainView from "@/views/MainView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import BookBerth from "@/views/BookBerth.vue";
import MyBoat from "@/views/MyBoat.vue";
import DockView from "@/views/DockView.vue";
import ListBoat from "@/views/ListBoat.vue";
import GuestView from "@/views/GuestView.vue";
import ReservationPage from "@/views/ReservationPage.vue";

import Choose from "@/views/Choose.vue";
import History from "@/views/History.vue";

import OwnerHome from "@/views/OwnerHome.vue";
import SailorHome from "@/views/SailorHome.vue";
import WeatherAPI from "@/views/WeatherAPI.vue";
const routes = [
  { path: "/HomePage", component: HomePage },
  { path: "/Choose", component: Choose },
  { path: "/ListBoat", component: ListBoat },
  { path: "/DockView", component: DockView },
  { path: "/WeatherAPI", component: WeatherAPI },

  { path: "/Login", component: Login },
  { path: "/SailorHome", component: SailorHome },
  {
    path: "/OwnerHome",
    component: OwnerHome,
    meta: { requiresAuth: true },
  },

  { path: "/", component: Register },

  { path: "/Marinas", component: Marinas },
  { path: "/History", component: History },
  { path: "/ReservationPage", component: ReservationPage },

  { path: "/BookBerth", component: BookBerth },
  { path: "/MyBoat", component: MyBoat },
  { path: "/AppointmentForm", component: AppointmentForm },
  { path: "/AboutUs", component: AboutUs },

  { path: "/MainView", component: MainView },
  { path: "/GuestView", component: GuestView },
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
