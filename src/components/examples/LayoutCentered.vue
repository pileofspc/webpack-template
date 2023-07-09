<template>
    <Header></Header>
    <main class="layout__main">
        <div class="layout__main-container _flex-container">
            <slot></slot>
        </div>
    </main>
    <Footer class="layout__footer"></Footer>
</template>

<script setup>
    import Header from '@modules/Header/Header.vue';
    import Footer from '@modules/Footer/Footer.vue';
</script>

<style lang="scss" scoped>

    .layout {
        &__main {
            margin-top: 24px;
            flex-grow: 1;

            display: flex;
            flex-direction: column;
        }

        &__main-container {
            flex-grow: 1;
            width: 100%;

            justify-content: center;
        }

        &__footer {
            margin-top: 24px;
        }
    }
</style>