<template>
    <Header />
    <main class="layout__main">
        <div class="_container">
            <Breadcrumbs
                class="layout__breadcrumbs"
                :items="bcstore.getterBreadcrumbs"
            />
            <slot></slot>
        </div>
    </main>
    <Footer class="layout__footer" />
</template>

<script setup lang="ts">
    import Header from "@modules/Header/Header.vue";
    import Footer from "@modules/Footer/Footer.vue";
    import Breadcrumbs from "@components/Breadcrumbs.vue";
    import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";

    const bcstore = useBreadcrumbsStore();
</script>

<style lang="scss" scoped>
    .layout {
        &__main {
            margin-top: 24px;
        }

        &__footer {
            margin-top: 24px;
        }

        &__breadcrumbs {
            margin-bottom: 24px;
        }
    }
</style>
