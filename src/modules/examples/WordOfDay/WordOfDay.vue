<template>
    <div class="word-of-day block">
        <Container :status="fetchStatus">
            <div class="word-of-day__title small-block-title">Слово дня</div>
            <div class="word-of-day__word">
                {{ `${word} ${transcription}` }}
            </div>
            <div class="word-of-day__main">
                <Doughnut :items="chartItems"></Doughnut>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
    import Doughnut from "@components/Doughnut.vue";
    import { computed } from "vue";
    import type { IWordFull } from "@types";
    import useFetch from "/src/composables/useFetch";
    import api from "/src/api";

    const { fetchedData, fetchStatus } = useFetch<IWordFull>({
        url: api.wordofday,
    });

    const wordData = fetchedData;
    const word = computed(() => wordData.value?.word);
    const transcription = computed(() => wordData.value?.transcription);
    const chartItems = computed(
        () =>
            wordData.value?.translations.map((item) => ({
                name: item.translation,
                value: item.frequency,
            })) || []
    );
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;
    .word-of-day {
        padding: 12px 20px;

        display: flex;
        flex-direction: column;

        &__title {
            padding-bottom: 12px;
            border-bottom: 1px solid var(--c-shade);
        }

        &__word {
            margin-top: 8px;
            font-size: 20px;
        }

        &__main {
            margin-top: 8px;
        }
    }

    // @include m.respond("md") {
    //     .word-of-day {
    //         flex-direction: row;
    //         gap: 24px;
    //         justify-content: space-between;
    //         align-items: center;

    //         &__title {
    //             border-bottom: none;
    //             padding-bottom: 0;
    //             flex-shrink: 0;
    //         }

    //         &__word {
    //             margin-top: 0;
    //         }
    //     }
    // }
</style>
