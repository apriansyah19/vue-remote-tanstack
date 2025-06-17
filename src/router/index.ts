import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import WithTanstackAxios from "@/pages/WithTanstack/Axios/Index.vue";
import WithoutTanstackAxios from "@/pages/WithoutTanstack/Axios/Index.vue";
import NotFoundView from "@/pages/NotFoundView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/with-tanstack/axios",
  },
  {
    path: "/with-tanstack/axios",
    name: "WithTanstackAxios",
    component: WithTanstackAxios,
  },
  {
    path: "/without-tanstack/axios",
    name: "WithoutTanstackAxios",
    component: WithoutTanstackAxios,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
