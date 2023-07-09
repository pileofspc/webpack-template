<template>
    <div class="counter">
        <span class="counter__current">{{ props.current }}</span>
        <span class="counter__divider">/</span>
        <span class="counter__total">{{ props.total }}</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        current: {
            type: [Number, String],
            required: true
        },
        total: {
            type: [Number, String],
            required: true
        },
    })
</script>

<style lang="scss" scoped>

</style>