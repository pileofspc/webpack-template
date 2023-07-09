<template>
    <Teleport to="body">
        <div class="modal" @click.self="emit('close')">
            <div class="modal__block block">
                <div class="modal__header">
                    <div class="modal__title form-title">{{ props.title }}</div>
                    <button class="modal__close" @click="emit('close')">
                        <svg class="modal__close-svg">
                            <use :href="`#${Cross.id}`"></use>
                        </svg>
                    </button>
                </div>
                <div class="modal__content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import Cross from "@images/icons/Cross.svg?sprite";
    import { onMounted, onUnmounted } from "vue";

    const props = defineProps({
        title: {
            type: String,
            required: true,
            default: "",
        },
    });

    const emit = defineEmits(["close"]);

    onMounted(() => {
        document.body.style.overflow = "hidden";
        document.querySelector(".app-wrapper").style.filter = "blur(4px)";
    });

    onUnmounted(() => {
        document.body.style.overflow = "";
        document.querySelector(".app-wrapper").style.filter = "";
    });
</script>

<style lang="scss" scoped>
    .modal {
        z-index: 5;
        background-color: var(--c-transparent);
        position: fixed;
        inset: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        &__block {
            padding: 20px;
            max-width: 60%;
        }

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            padding-bottom: 4px;
            margin-bottom: 16px;
            border-bottom: 1px solid var(--c-shade);
        }

        &__title {
            transform: translateY(-6px);
        }

        &__close {
            display: block;
            background-color: transparent;
            border: none;
            cursor: pointer;
            color: var(--c-secondary);

            &:hover {
                color: var(--c-primary);
            }
        }

        &__close-svg {
            transition: color 0.2s;
            width: 40px;
            height: 40px;
        }
    }
</style>
