<template>
    <div class="about block">
        <img
            class="about__bg-image"
            src="@images/Artwork.svg"
            alt="Background Artwork"
        />
        <div class="about__title large-block-title">О нас</div>
        <div class="about__description">
            Добро пожаловать на наш сайт-тренажер по английскому языку! Мы
            предлагаем интерактивные тренажеры для практики перевода слов с
            английского языка. Улучшайте свои навыки и расширяйте словарный
            запас, практикуя перевод в своем темпе.
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;
    .about {
        padding: 24px 40px;
        position: relative;
        isolation: isolate;
        overflow: hidden;

        &__bg-image {
            position: absolute;
            max-width: none;
            z-index: -1;
            top: 0;
            right: 0;
            height: 100%;
            transform: translateX(calc(100% - 240px));
        }

        &__description {
            margin-top: 12px;
            width: calc(100% - 120px);
            font-size: 20px;
        }
    }

    @include m.respondSimple("xsm") {
        .about {
            &__bg-image {
                display: none;
            }
            &__description {
                width: auto;
            }
        }
    }
</style>
