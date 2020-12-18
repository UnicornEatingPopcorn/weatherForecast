import Vue from "vue";
import VueRouter from "vue-router";
import WeatherPage from "../views/WeatherPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "WeatherPage",
    component: WeatherPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
