<template>
    <div class="checkbox">
        <label class="checkbox__label">
            <input
                class="checkbox__input"
                type="checkbox"
                :name="props.name"
                v-model="value"
            />
            <div class="checkbox__box">
                <svg class="checkbox__checkmark">
                    <use :href="`#${Checkmark.id}`"></use>
                </svg>
            </div>
            <span class="checkbox__label-text">
                {{ props.label }}
            </span>
        </label>
        <TransitionGroup>
            <span class="checkbox__error" v-for="error in errors" :key="error">
                {{ error }}
            </span>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
    import Checkmark from "@images/icons/Checkmark.svg?sprite";
    import { useField } from "vee-validate";

    const props = defineProps({
        label: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    });

    const { value, errors } = useField<boolean>(() => props.name);
</script>

<style lang="scss" scoped>
    .v-enter-active,
    .v-leave-active {
        $duration: 0.3s;
        transition: opacity $duration, transform $duration;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .checkbox {
        display: flex;
        flex-direction: column;

        &__label {
            --color: var(--c-accent);
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        &__box {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 24px;
            height: 24px;
            margin-right: 8px;

            border: 1px solid var(--c-shade);
            border-radius: 4px;
        }

        &__label-text {
            font-size: 16px;
            font-weight: 400;
        }

        &__checkmark {
            display: none;
            color: var(--color);
        }

        &__input {
            display: none;
        }

        &__input:checked ~ &__box {
            border: 2px solid var(--color);

            .checkbox__checkmark {
                display: block;
            }
        }

        &__error {
            font-size: 12px;
            margin-top: 8px;
            color: var(--c-error);
        }
    }
</style>
