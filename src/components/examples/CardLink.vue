<template>
    <div class="card-link card">
        <div class="card-link__img-container">
            <img :src="props.img" class="card-link__img" />
        </div>
        <div class="card-link__title">{{ props.title }}</div>
        <div class="card-link__description">{{ props.shortDescription }}</div>
        <router-link
            v-if="props.link"
            class="card-link__button"
            :to="props.link"
        >
            <VButton :style="buttonStyle" variant="bright">Изучить</VButton>
        </router-link>
        <VButton
            v-else
            class="card-link__button"
            variant="bright"
            :style="buttonStyle"
        >
            Изучить
        </VButton>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from "vue";
    import type { RouterLink } from "@types";
    import VButton from "@components/VButton.vue";

    const props = defineProps({
        title: String,
        shortDescription: String,
        img: String,
        link: {
            type: Object as PropType<RouterLink>,
        },
    });

    const buttonStyle = {
        fontSize: "16px",
        minWidth: "140px",
        paddingTop: "12px",
        paddingBottom: "12px",
    };
</script>

<style lang="scss" scoped>
    .card-link {
        display: flex;
        flex-direction: column;
        padding: 16px;
        padding-bottom: 30px;

        &__img-container {
            overflow: hidden;
            height: 200px;
            border-radius: 16px;
        }

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__title {
            align-self: center;
            margin-top: 20px;
            font-size: 28px;
            font-weight: var(--fw-bold);
        }

        &__description {
            margin-top: 8px;
            margin-bottom: 24px;
            font-size: 16px;
            hyphens: auto;
        }

        &__button {
            margin-top: auto;
            align-self: flex-start;
        }
    }
</style>
