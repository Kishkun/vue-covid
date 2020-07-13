import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Countries from "../components/Countries";
import Country from "../components/Country"
import store from "../store";

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
  },
  {
    path: '/country/:queryName',
    name: 'country',
    component: Country,
    props: true,
    beforeEnter (to, from, next) {
      let queryName = to.params.queryName;
      store.dispatch("newCountryName", queryName);
      next()
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router
