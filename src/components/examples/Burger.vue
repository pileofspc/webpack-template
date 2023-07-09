<template>
    <div class="burger" :class="{ burger_open: isOpen }" @click.stop="toggle">
        <button class="burger__burger-button button">
            <div class="burger__burger">
                <div class="burger__line"></div>
                <div class="burger__line"></div>
                <div class="burger__line"></div>
            </div>
        </button>
        <span class="burger__title">Меню</span>
        <div class="burger__window" @click.stop>
            <div class="burger__nav">
                <router-link :to="{ name: 'PageMain' }">
                    <DropdownOption title="Главная" />
                </router-link>
                <router-link :to="{ name: 'PageContacts' }">
                    <DropdownOption title="Контакты" />
                </router-link>
                <router-link :to="{ name: 'PageWordSets' }">
                    <DropdownOption title="Наборы слов" />
                </router-link>
            </div>
            <div class="burger__buttons">
                <DropdownOption title="Войти" @click="login" />
                <DropdownOption title="Зарегистрироваться" @click="register" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DropdownOption from "@components/DropdownOption.vue";
    import { onBeforeMount, onBeforeUnmount } from "vue";
    import { ref } from "vue";

    const emit = defineEmits(["login", "register"]);

    const isOpen = ref(false);

    function toggle() {
        isOpen.value = !isOpen.value;
    }
    function close() {
        isOpen.value = false;
    }
    function login() {
        close();
        emit("login");
    }
    function register() {
        close();
        emit("register");
    }

    onBeforeMount(() => {
        document.body.addEventListener("click", close);
    });

    onBeforeUnmount(() => {
        document.body.removeEventListener("click", close);
    });
</script>

<style lang="scss" scoped>
    .burger {
        --burger-transition: 0.2s ease;

        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-right: 8px;
        cursor: pointer;

        padding: 8px;
        border-radius: 6px;
        transition: background-color 0.2s;

        &__burger {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 24px;
            height: 18px;
        }

        &__line {
            background-color: var(--c-primary);
            height: 3px;
            border-radius: 3px;
            flex-shrink: 0;
        }

        &__window {
            position: absolute;
            top: calc(100% + 5px);
            right: 0;
            border: 1px solid var(--c-shade);
            border-radius: 6px;
            overflow: hidden;
            width: max-content;

            z-index: 1;

            box-shadow: var(--card-shadow);

            cursor: default;
            color: var(--c-primary);
            background-color: var(--c-bright);

            transition: transform var(--burger-transition),
                opacity var(--burger-transition);
            transform: translateY(-6px);
            opacity: 0;
            pointer-events: none;
        }

        &__nav {
            border-bottom: 1px solid var(--c-shade);
        }

        &_left {
            left: 0;
            right: auto;
            .burger__window {
                left: auto;
                right: -10px;
            }
        }

        &:hover {
            background-color: var(--c-tint);
        }

        &_open {
            background-color: var(--c-tint);
            .burger__window {
                pointer-events: all;
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
</style>
