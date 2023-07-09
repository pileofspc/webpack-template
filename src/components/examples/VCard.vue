<template>
    <div class="vcard card">
        <div class="vcard__img-container">
            <img class="vcard__img" :src="props.img" :alt="props.title" />
        </div>
        <div class="vcard__data">
            <div class="vcard__title">{{ props.title }}</div>
            <div class="vcard__subtitle">{{ props.subtitle }}</div>
            <div v-if="props.description" class="vcard__description">
                {{ props.description }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        img: String,
        title: String,
        subtitle: String,
        description: String,
    });
</script>

<style scoped lang="scss">
    .vcard {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;

        font-size: 20px;

        width: 180px;
        height: 220px;

        &__img-container {
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
            height: 160px;
        }
        &__img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        &__data {
            text-align: center;
        }

        &__title {
            margin-top: 6px;
            font-weight: var(--fw-semi-bold);
            font-size: 24px;
        }

        &__subtitle {
            filter: opacity(0.6);
        }

        &__button {
            margin-top: auto;
        }
    }
</style>
