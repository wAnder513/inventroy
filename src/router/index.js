import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inventory",
      component: () => import("../views/InventoryMain.vue"),
    },
  ],
});

export default router;
