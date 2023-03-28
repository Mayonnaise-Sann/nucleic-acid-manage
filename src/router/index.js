import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
    hidden: true,
    meta: { isPublic: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/Register.vue"),
    hidden: true,
    meta: { isPublic: true },
  },

  {
    path: "/home",
    name: "首页",
    subItem: true,
    icon: "House",
    component: () => import("../components/Main.vue"),
    children: [
      {
        path: "/home",
        name: "",
        component: () => import("../views/Home/Home.vue"),
      },
    ],
  },
  {
    path: "/resident",
    name: "居民管理",
    redirect: "/resident/residentList",
    icon: "User",
    component: () => import("../components/Main.vue"),

    children: [
      {
        path: "/resident/residentList",
        name: "居民信息",
        component: () => import("../views/resident/Resident.vue"),
      },
    ],
  },
  {
    path: "/street",
    name: "街道管理",
    component: () => import("../components/Main.vue"),
    icon: "Location",

    children: [
      {
        path: "/street/streetList",
        name: "街道信息",
        component: () => import("../views/street/Street.vue"),
      },
    ],
  },
  {
    path: "/testinstitution",
    name: "检测机构管理",
    component: () => import("../components/Main.vue"),
    icon: "OfficeBuilding",

    children: [
      {
        path: "/testinstitution/testinstitutionList",
        name: "检测机构管理",
        component: () => import("../views/testInstitution/TestInstitution"),
      },
    ],
  },
  {
    path: "/sampleinstitution",
    name: "采样点管理",
    component: () => import("../components/Main.vue"),
    icon: "OfficeBuilding",

    children: [
      {
        path: "/sampleinstitution/sampleinstitutionList",
        name: "采样点管理",
        component: () => import("../views/sampleInstitution/SampleInstitution"),
      },
    ],
  },
  {
    path: "/nucleicacid",
    name: "核酸信息管理",
    component: () => import("../components/Main.vue"),
    icon: "Document",

    children: [
      {
        path: "/nucleicacid/nucleicacidList",
        name: "居民核酸信息",
        component: () => import("../views/nucleicacid/NucleicAcid.vue"),
      },
    ],
  },

//   {
//       path: '404',
//       name: '404',

//   },
  {
    path: "/",
    name: "/",
    hidden: true,
    component: () => import("../components/Main.vue"),
    redirect: "home",
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: () => import("../views/error/404.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫，登录注册页面可以直接访问，其他页面要先登录
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
