<template>
    <div class="reviews block">
        <Container :status="fetchStatus">
            <Review
                v-for="item in reviews"
                :img-path="item.img"
                :author="item.name"
                :text="item.review"
            />
        </Container>
    </div>
</template>

<script setup lang="ts">
    import Review from "@components/Review.vue";
    import api from "/src/api";
    import type { IReview } from "@types";
    import useFetch from "@composables/useFetch";

    const count = 5;

    const { fetchedData, fetchStatus } = useFetch<IReview[]>({
        url: api.reviews + "?count=" + count,
    });

    const reviews = fetchedData;
</script>

<style lang="scss" scoped>
    .reviews {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        justify-content: center;
        gap: 24px;
        padding: 24px;
    }
</style>
