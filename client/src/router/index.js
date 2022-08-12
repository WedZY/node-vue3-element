import { createRouter, createWebHistory } from "vue-router";
import HomeindexView from "../views/index.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import login from "../views/login.vue";
import Home from "../views/Home.vue";
import InfoShow from "../views/InfoShow.vue";
import FundList from "../views/FundList.vue";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Index",
    component: HomeindexView,
    children: [
      { path: "", name: "name", component: Home },
      { path: "/home", name: "home", component: Home },
      { path: "/InfoShow", name: "InfoShow", component: InfoShow },
      { path: "/FundList", name: "FundList", component: FundList },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/:pathMatch(.*)",
    name: "/404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});
export default router;
