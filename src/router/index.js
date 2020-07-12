import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Countries from "../components/Countries";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/countries",
    name: "countries",
    component: Countries
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router
