<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
    import * as yup from "yup";
    yup.setLocale({
        mixed: {
            required: "Это поле обязательно для заполнения",
        },
        string: {
            min: "Поле должно содержать не менее ${min} символов",
            email: "Укажите полный адрес электронной почты",
        },
    });
</script>

<style lang="scss">
    .app-wrapper {
        display: flex;
        flex-direction: column;
        padding-top: 8px;
        min-height: 100vh;
        min-height: 100dvh;

        main {
            flex-grow: 1;
        }

        .loader {
            flex-grow: 1;
        }
    }
</style>
