<template>
    <button
        class="btn-icon"
        :class="{
            [`btn-icon_${props.variant}`]: true,
            'btn-icon_inactive': props.inactive,
        }"
        :disabled="props.inactive"
    >
        <svg class="btn-icon__icon">
            <use class="btn-icon__icon-svg" :href="`#${props.iconId}`"></use>
        </svg>
    </button>
</template>

<script setup lang="ts">
    import type { PropType } from "vue";
    import type { VButton } from "@types";

    const props = defineProps({
        iconId: {
            type: String,
            required: true,
        },
        variant: {
            type: String as PropType<VButton>,
            default: "accent" as VButton,
        },
        inactive: Boolean,
    });
</script>

<style scoped lang="scss">
    .btn-icon {
        font-size: 14px;
        font-weight: 500;
        line-height: 0;

        border: none;
        box-shadow: var(--card-shadow);
        border-radius: 10px;
        cursor: pointer;

        &__icon {
            width: 40px;
            height: 40px;
        }

        &_accent {
            color: var(--c-bright);
            background-color: var(--c-accent);
            border: 1px solid var(--c-accent);
        }

        &_bright {
            color: var(--c-muted);
            background-color: var(--c-bright);
            border: 1px solid var(--c-shade);
        }

        &_error {
            color: var(--c-bright);
            background-color: var(--c-error);
            border: 1px solid var(--c-error);
        }

        &_success {
            color: var(--c-bright);
            background-color: var(--c-success);
            border: 1px solid var(--c-success);
        }

        &_inactive {
            filter: grayscale(1) opacity(0.2);
            cursor: not-allowed;
        }
    }
</style>
