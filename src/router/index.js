import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/areas",
    name: "areas",
    component: () =>
      import(/* webpackChunkName: "areas" */ "../views/AreaView.vue"),
  },
  {
    path: "/activos",
    name: "activos",
    component: () =>
      import(/* webpackChunkName: "activos" */ "../views/ActivoView.vue"),
  },
  {
    path: "/areas/:id/editar",
    name: "editarArea",
    component: () =>
      import(
        /* webpackChunkName: "EditarArea" */ "../views/EditarAreaView.vue"
      ),
  },
  {
    path: "/activos/:id/editar",
    name: "editarActivo",
    component: () =>
      import(
        /* webpackChunkName: "EditarActivo" */ "../views/EditarActivoView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
