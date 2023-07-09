import "@styles/general.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import Container from "@components/Container.vue";

import App from "/src/App.vue";
import Router from "/src/Router";
import resizer from "/src/directives/resizer";
const pinia = createPinia();

const appNode = document.querySelector(".app-wrapper") as Element;
createApp(App)
    .use(Router)
    .use(pinia)
    .component("Container", Container)
    .directive("resizer", resizer)
    .mount(appNode);
