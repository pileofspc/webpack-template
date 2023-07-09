<template>
    <div class="success">
        <svg class="success__svg">
            <use :href="`#${Success.id}`"></use>
        </svg>
        <div class="success__message">{{ props.message }}</div>
    </div>
</template>

<script setup lang="ts">
    import Success from "@images/icons/Success.svg?sprite";

    const props = defineProps({
        message: {
            type: String,
        },
    });
</script>

<style lang="scss" scoped>
    .success {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        &__svg {
            display: block;
            color: var(--c-success);
            width: 100%;
            height: 100%;

            max-width: 100px;
            max-height: 100px;
        }

        &__message {
            margin-top: 24px;
        }
    }
</style>
