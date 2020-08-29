import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Practice from "../views/Practice";
import PracticeGroup from "../views/PracticeGroup";
import AddWord from "../views/AddWord";
import AddEditGroup from "../views/AddEditGroup";
import WordList from "../views/WordList";
import GroupList from "../views/GroupList";
import Login from "../views/Login";
import Register from "../views/Register";

import { TokenService } from "../services/storage.service";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      public: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/practice",
    name: "PracticeGroup",
    component: PracticeGroup,
    meta: {
      public: false
    }
  },
  {
    path: "/practice/:groupId",
    name: "Practice",
    component: Practice,
    meta: {
      public: false
    }
  },
  {
    path: "/word",
    name: "WordList",
    component: WordList,
    meta: {
      public: false
    }
  },
  {
    path: "/group",
    name: "GroupList",
    component: GroupList,
    meta: {
      public: false
    }
  },
  {
    path: "/word/add",
    name: "AddWord",
    component: AddWord,
    meta: {
      public: false
    }
  },
  {
    path: "/word/edit/:id",
    name: "EditWord",
    component: AddWord,
    meta: {
      public: false
    },
    props: true
  },
  {
    path: "/group/add",
    name: "AddGroup",
    component: AddEditGroup,
    meta: {
      public: false
    }
  },
  {
    path: "/group/edit/:id",
    name: "EditGroup",
    component: AddEditGroup,
    meta: {
      public: false
    },
    props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
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
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next(`/`);
  }

  next();
});

export default router;
