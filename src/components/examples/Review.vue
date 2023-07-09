<template>
    <div class="review">
        <div class="review__img-container">
            <img class="review__img" :src="props.imgPath || DefaultImage" alt="Фото автора отзыва">
        </div>
        <div class="review__author small-block-title">{{ props.author }}</div>
        <div class="review__text">{{ props.text }}</div>
    </div>
</template>

<script setup>
    import DefaultImage from '@images/Artwork.svg';

    const props = defineProps({
        imgPath: String,
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .review {
        text-align: center;

        &__img-container {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 50%;
        }

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__author {
            margin-top: 12px;
            margin-left: auto;
            margin-right: auto;
            width: min-content;
        }

        &__text {
            font-size: 14px;
            margin-top: 4px;
        }
    }
</style>