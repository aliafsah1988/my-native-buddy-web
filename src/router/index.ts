import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory } from "vue-router";

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
      name: "register",
      component: () => import("../views/Register/RegisterView.vue"),
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: "/practice",
      name: "practiceGroup",
      component: () => import("../views/PracticeGroup/PracticeGroupView.vue"),
      meta: {
        public: false,
      },
    },
    {
      path: "/practice/:groupId",
      name: "practice",
      component: () => import("../views/Practice/PracticeView.vue"),
      meta: {
        public: false,
      },
    },
    {
      path: "/word/add",
      name: "addWord",
      component: () => import("../views/AddWord/AddWordView.vue"),
      meta: {
        public: false,
      },
    },
    {
      path: "/word/edit/:id",
      name: "editWord",
      component: () => import("../views/AddWord/AddWordView.vue"),
      meta: {
        public: false,
      },
      props: true,
    },
    {
      path: "/group/add",
      name: "addGroup",
      component: () => import("../views/AddGroup/AddGroupView.vue"),

      meta: {
        public: false,
      },
    },
    {
      path: "/group/edit/:id",
      name: "editGroup",
      component: () => import("../views/AddGroup/AddGroupView.vue"),

      meta: {
        public: false,
      },
      props: true,
    },
    {
      path: "/group",
      name: "groupList",
      component: () => import("../views/GroupList/GroupListView.vue"),
      meta: {
        public: false,
      },
    },
    {
      path: "/word",
      name: "wordList",
      component: () => import("../views/WordList/WordListView.vue"),
      meta: {
        public: false,
      },
    },
    {
      path: "/group/:groupId/word",
      name: "wordListGroup",
      component: () => import("../views/WordListGroup/WordListGroupView.vue"),
      meta: {
        public: false,
      },
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );

  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn && to.path !== "/login" && to.path !== "/register") {
    return next({
      path: `/login`,
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (isLoggedIn && onlyWhenLoggedOut) {
    return next(`/`);
  }

  next();
});

export default router;
