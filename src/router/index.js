import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/calender",
    name: "Calender",
    component: () => import("@/views/Calender.vue"),
  },
  {
    path: "/calender2",
    name: "Calender2",
    component: () => import("@/views/Calender2.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
