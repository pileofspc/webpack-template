<template>
    <div class="dropdown-option">{{ props.title }}</div>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
    });
</script>

<style lang="scss" scoped>
    .dropdown-option {
        padding: 12px 16px;
        cursor: pointer;

        &:hover {
            background-color: var(--c-tint);
        }
    }
</style>
