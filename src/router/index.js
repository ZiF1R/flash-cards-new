import { createRouter, createWebHistory } from "vue-router";
// import App from "../App.vue";
import { _db } from "@/db.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(
        /* webpackChunkName: "profile" */ "../views/main-pages/Profile.vue"
      ),
    beforeEnter: async (to, from, next) => {
      if (await _db.isSignIn()) next();
      else next({ name: "Login" });
    },
  },
  {
    path: "/profile",
    name: "Profile",
    beforeEnter: async (to, from, next) => {
      if (await _db.isSignIn()) next();
      else next({ name: "Login" });
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "profile" */ "../views/main-pages/Profile.vue"
      ),
  },
  {
    path: "/folders",
    name: "Folders",
    beforeEnter: async (to, from, next) => {
      if (await _db.isSignIn()) next();
      else next({ name: "Login" });
    },
    component: () =>
      import(
        /* webpackChunkName: "folders" */ "../views/main-pages/Folders.vue"
      ),
  },
  {
    path: "/settings",
    name: "Settings",
    beforeEnter: async (to, from, next) => {
      if (await _db.isSignIn()) next();
      else next({ name: "Login" });
    },
    component: () =>
      import(
        /* webpackChunkName: "settings" */ "../views/main-pages/Settings.vue"
      ),
  },
  {
    path: "/help",
    name: "Help",
    beforeEnter: async (to, from, next) => {
      if (await _db.isSignIn()) next();
      else next({ name: "Login" });
    },
    component: () => import(/* webpackChunkName: "help" */ "../views/Help.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/auth/Registration.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
