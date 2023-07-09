import Container from "@components/Container.vue";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        Container: typeof Container;
    }
}
