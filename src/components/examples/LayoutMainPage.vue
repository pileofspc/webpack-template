<template>
    <Header></Header>
    <main class="layout__main">
        <div class="_container">
            <slot></slot>
        </div>
    </main>
    <Footer class="layout__footer"></Footer>
</template>

<script setup lang="ts">
    import Header from '@modules/Header/Header.vue';
    import Footer from '@modules/Footer/Footer.vue';
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