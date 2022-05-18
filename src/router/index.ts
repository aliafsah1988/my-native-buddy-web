import { createRouter, createWebHistory } from "vue-router";
import { TokenService } from "../../_old/src/services/storage.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/LoginView.vue"),
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register/RegisterView.vue"),
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (
    !loggedIn &&
    to.path !== "/" &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    return next({
      path: `/login`,
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next(`/`);
  }

  next();
});

export default router;
