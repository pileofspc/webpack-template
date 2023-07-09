<template>
    <header class="header">
        <Modal v-if="isVisible" @close="closeModal">
            <KeepAlive>
                <component
                    :is="modalContent"
                    @login="showLogin"
                    @register="showRegister"
                    @close="closeModal"
                />
            </KeepAlive>
        </Modal>
        <div class="_container">
            <div class="header__inner block">
                <a href="/" class="header__logo">
                    <img
                        class="header__logo-img"
                        :src="mainLogo"
                        alt="Логотип verbify"
                    />
                </a>
                <nav class="header__nav">
                    <router-link class="header__link" to="/">
                        Главная
                    </router-link>
                    <router-link
                        class="header__link"
                        :to="{ name: 'PageContacts' }"
                    >
                        Контакты
                    </router-link>
                    <router-link
                        class="header__link"
                        :to="{ name: 'PageWordSets' }"
                    >
                        Наборы слов
                    </router-link>
                </nav>

                <VButton
                    class="header__button header__button_first"
                    variant="bright"
                    @click="showRegister"
                >
                    Регистрация
                </VButton>
                <VButton
                    class="header__button"
                    variant="accent"
                    @click="showLogin"
                >
                    Войти
                </VButton>

                <div class="header__burger-container">
                    <Burger
                        class="header__burger"
                        @login="showLogin"
                        @register="showRegister"
                    />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import Modal from "@components/Modal.vue";
    import VButton from "@components/VButton.vue";
    import mainLogo from "@images/main-logo.svg";
    import FormLogin from "@modules/Forms/FormLogin.vue";
    import FormRegister from "@modules/Forms/FormRegister.vue";
    import Burger from "@components/Burger.vue";

    import { ref, shallowRef } from "vue";

    const isVisible = ref(false);
    const modalContent = shallowRef();

    function showLogin() {
        modalContent.value = FormLogin;
        isVisible.value = true;
    }

    function showRegister() {
        modalContent.value = FormRegister;
        isVisible.value = true;
    }

    function closeModal() {
        isVisible.value = false;
    }
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;

    .header {
        font-size: 16px;
        font-weight: 400;

        &__inner {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
        }

        &__logo {
            margin-left: 16px;
        }

        &__logo-img {
            height: 40px;
        }

        &__nav {
            display: flex;
            gap: 24px;
            margin-left: min(5%, 60px);
        }

        &__link {
            min-width: max-content;

            &:hover {
                color: var(--c-accent);
            }
        }

        &__button_first {
            margin-left: auto;
        }

        &__burger-container {
            display: none;
            margin-left: auto;
        }
    }

    @include m.respondSimple("sm") {
        .header {
            &__nav {
                display: none;
            }
            &__button {
                display: none;
            }

            &__burger-container {
                display: block;
            }
        }
    }
</style>
