<template>
    <div class="loader">
        <svg class="loader__svg">
            <use :href="`#${Loader.id}`"></use>
        </svg>
        <div class="loader__message">{{ props.message }}</div>
    </div>
</template>

<script setup lang="ts">
    import Loader from "@images/icons/Loader.svg?sprite";

    const props = defineProps({
        message: {
            type: String,
        },
    });
</script>

<style lang="scss" scoped>
    .loader {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        &__svg {
            display: block;
            color: var(--c-muted);
            width: 100%;
            height: 100%;

            max-width: 160px;
            max-height: 160px;
        }

        // &__message {
        //     font-size: 16px;
        // }
    }
</style>
