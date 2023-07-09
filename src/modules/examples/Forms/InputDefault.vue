<template>
    <div class="form-field">
        <input
            class="form-field__input"
            :id="id"
            :type="props.type"
            :name="props.name"
            :value="value"
            @input="onInput"
        />
        <svg
            v-if="meta.validated && meta.valid"
            class="form-field__status-svg form-field__status-svg_success"
        >
            <use :href="`#${Checkmark.id}`"></use>
        </svg>
        <svg
            v-if="meta.validated && !meta.valid"
            class="form-field__status-svg form-field__status-svg_error"
        >
            <use :href="`#${Cross.id}`"></use>
        </svg>
        <label class="form-field__label" :for="id">{{ props.label }}</label>

        <TransitionGroup>
            <span
                class="form-field__error"
                v-for="error in errors"
                :key="error"
            >
                {{ error }}
            </span>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
    import Checkmark from "@images/icons/Checkmark.svg?sprite";
    import Cross from "@images/icons/Cross.svg?sprite";
    import { v4 as uuidv4 } from "uuid";
    import { useField } from "vee-validate";

    const id = uuidv4();

    const props = defineProps({
        type: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    });

    const { value, errors, meta } = useField<string>(() => props.name);

    let timer: ReturnType<typeof setTimeout>;
    function onInput(e: Event) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            value.value = (e.target as HTMLInputElement).value;
        }, 300);
    }
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

    .form-field {
        position: relative;
        display: flex;
        flex-direction: column;
        color: var(--c-secondary);
        font-size: 16px;
        font-weight: var(--fw-semi-bold);

        &__input {
            margin-top: 6px;
            padding: 12px;
            border: none;
            outline: 1px solid var(--c-shade);
            border-radius: 6px;
            font-weight: var(--fw-regular);

            transition: outline-color 0.2s;
        }

        &__input:focus {
            outline-color: var(--c-accent);

            ~ .form-field__label {
                color: var(--c-accent);
            }
        }

        &__label {
            transition: color 0.2s;
            order: -1;
        }

        &__status-svg {
            position: absolute;
            top: calc(6px + 19.8px + (24px + 19.8px) / 2);
            right: 12px;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;

            &_success {
                color: var(--c-success);
            }

            &_error {
                color: var(--c-error);
            }
        }

        &__error {
            font-size: 12px;
            margin-top: 8px;
            color: var(--c-error);
        }
    }
</style>
