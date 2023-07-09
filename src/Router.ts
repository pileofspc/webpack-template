import { createRouter, createWebHistory } from "vue-router";

const PageMain = () => import("@pages/index/PageMain.vue");
const PageError = () => import("@pages/error/PageError.vue");

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/:pathMatch(.*)*",
            component: PageError,
        },
        {
            path: "/",
            name: "PageMain",
            component: PageMain,
        },
    ],
});
