import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import Marinas from "@/components/Marinas.vue";
import AppointmentForm from "@/components/AppointmentForm.vue";
import AboutUs from "@/components/AboutUs.vue";
import MainView from "@/views/MainView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import TestApi from "@/components/TestApi.vue";
import OwnerHome from "@/views/OwnerHome.vue";
import SailorHome from "@/views/SailorHome.vue";
const routes = [
  { path: "/HomePage", component: HomePage },
  { path: "/TestApi", component: TestApi },

  { path: "/Login", component: Login },
  { path: "/SailorHome", component: SailorHome },
  { path: "/OwnerHome", component: OwnerHome },

  { path: "/Register", component: Register },

  { path: "/Marinas", component: Marinas },
  { path: "/AppointmentForm", component: AppointmentForm },
  { path: "/AboutUs", component: AboutUs },
  // MainView je default
  { path: "/", component: MainView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
