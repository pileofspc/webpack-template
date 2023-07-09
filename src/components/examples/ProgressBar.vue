<template>
    <div class="progress-bar">
        <div class="progress-bar__total">
            <div
                class="progress-bar__current"
                :style="{
                    width: `${props.value * 100}%`,
                    transition: props.transition,
                }"
            ></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        value: {
            type: [Number, String],
            default: 0,
            validator(value) {
                return (
                    isNaN(value) ||
                    (parseFloat(value) >= 0 && parseFloat(value) <= 1)
                );
            },
        },
        transition: {
            type: String,
        },
    });
</script>

<style lang="scss" scoped>
    .progress-bar {
        border-radius: 2px;
        overflow: hidden;

        &__current {
            height: 8px;
            background-color: var(--c-accent);
        }

        &__total {
            background-color: var(--c-shade);
        }
    }
</style>
