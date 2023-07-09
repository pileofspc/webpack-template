<template>
    <div
        class="slider slider_cards block"
        @mouseenter="stopAutoSlide()"
        @mouseleave="startAutoSlide(time)"
        v-resizer="update"
    >
        <Container :status="fetchStatus">
            <button class="slider__slide slider__slide_left" @click="slidePrev">
                <svg class="slider__slide-svg">
                    <use :href="`#${ChevronLeft.id}`"></use>
                </svg>
            </button>

            <div
                class="slider__item-container"
                :class="{ 'slider__item-container_transition': inTransition }"
                ref="itemContainer"
                :style="{ transform: `translate(${currentX}px)` }"
            >
                <!-- Транзишны убраны, чтобы они не мешали itemContainer'у -->
                <WordSet
                    v-for="item in mappedItems"
                    @transitionstart.stop
                    @transitionend.stop
                    @transitioncancel.stop
                    :key="uuidv4()"
                    v-bind="item"
                    class="slider__item"
                />
            </div>

            <button
                class="slider__slide slider__slide_right"
                @click="slideNext"
            >
                <svg class="slider__slide-svg">
                    <use :href="`#${ChevronRight.id}`"></use>
                </svg>
            </button>
        </Container>
    </div>
</template>

<script setup lang="ts">
    import ChevronLeft from "@images/icons/ChevronLeft.svg?sprite";
    import ChevronRight from "@images/icons/ChevronRight.svg?sprite";
    import WordSet from "@modules/WordSet/WordSet.vue";
    import type { IWordSet } from "@types";
    import { v4 as uuidv4 } from "uuid";
    import { computed, onBeforeUnmount, onMounted, ref } from "vue";
    import apis from "/src/api";
    import useFetch from "@composables/useFetch";
    import { watch } from "vue";
    import { useGeneralStore } from "/src/stores/storeGeneral";

    const genStore = useGeneralStore();

    let sliderCount = 5;
    const time = 5000;
    let timer: ReturnType<typeof setInterval> | null;

    const { fetchedData, fetchStatus } = useFetch<IWordSet[]>({
        url: apis.wordsets + "?count=" + sliderCount,
    });

    watch(fetchedData, () => {
        if (fetchedData.value) {
            genStore.cacheWordSets(fetchedData.value);
        }
    });

    const sliderItems = fetchedData;
    const sliderWidth = ref(1164);
    let middleIndex = Math.ceil((sliderCount + 2) / 2 - 1);
    const currentPos = ref(middleIndex);
    const gap = ref(100);
    const inTransition = ref(false);
    const itemContainer = ref<HTMLDivElement | null>(null);

    const mappedItems = computed<IWordSet[]>(() => {
        if (!sliderItems.value) {
            return [];
        }

        const sliderItemsCopy = [...sliderItems.value];
        for (let item of sliderItemsCopy) {
            delete item.words;
        }

        return [
            sliderItems.value[sliderItems.value.length - 1],
            ...sliderItems.value,
            sliderItems.value[0],
        ];
    });
    const firstIndex = 1;
    const lastIndex = computed(() => mappedItems.value.length - 2);
    const itemWidth = computed(() => sliderWidth.value);
    const offset = computed(() => itemWidth.value + gap.value);
    const currentX = computed(() => offset.value * -1 * currentPos.value);

    onMounted(() => {
        startAutoSlide(time);
        // Это нужно для избежания перемотки на большое расстояние когда вкладка неактивна
        window.addEventListener("visibilitychange", onTabChange);
    });

    onBeforeUnmount(() => {
        stopAutoSlide();
        window.removeEventListener("visibilitychange", onTabChange);
    });

    function onTabChange(e: Event) {
        if (document.visibilityState === "hidden") {
            stopAutoSlide();
        } else {
            startAutoSlide(time);
        }
    }
    function update() {
        if (itemContainer.value?.offsetWidth) {
            sliderWidth.value = itemContainer.value.offsetWidth;
        }
    }
    function tryReset() {
        if (currentPos.value > lastIndex.value) {
            slideFastTo(firstIndex);
        }
        if (currentPos.value < firstIndex) {
            slideFastTo(lastIndex.value);
        }
    }

    function slideFastTo(index: number) {
        inTransition.value = false;
        currentPos.value = index;
    }
    function slideTo(index: number) {
        if (inTransition.value) {
            return;
        }

        inTransition.value = true;
        currentPos.value = index;
        afterTransition(() => {
            inTransition.value = false;
            tryReset();
        });
    }
    function slideNext() {
        slideTo(currentPos.value + 1);
    }
    function slidePrev() {
        slideTo(currentPos.value - 1);
    }
    function startAutoSlide(time: number) {
        if (timer) {
            return;
        }

        timer = setInterval(() => {
            slideNext();
        }, time);
    }
    function stopAutoSlide() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
    function afterTransition(callback: Function) {
        let doThis = (e: Event) => {
            callback(e);
            itemContainer.value?.removeEventListener("transitionend", doThis);
            itemContainer.value?.removeEventListener(
                "transitioncancel",
                doThis
            );
        };
        itemContainer.value?.addEventListener("transitionend", doThis);
        itemContainer.value?.addEventListener("transitioncancel", doThis);
    }
</script>

<style scoped lang="scss">
    @use "@styles/mixins" as m;

    .slider {
        position: relative;
        padding: 32px 60px;

        overflow: hidden;

        &__item-container {
            display: flex;

            &_transition {
                transition: transform 0.8s;
            }
        }

        &__item {
            flex-shrink: 0;
        }

        &__slide {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;
            z-index: 1;

            &_left {
                left: 0;
            }

            &_right {
                right: 0;
            }

            &:hover .slider__slide-svg {
                opacity: 1;
            }
        }

        &__slide-svg {
            width: 60px;
            height: 60px;
            color: var(--c-secondary);

            opacity: 0.5;
            transition: opacity 0.2s;

            &:hover {
                opacity: 1;
            }
        }
    }

    @include m.respondSimple("md") {
        .slider {
            padding-top: 24px;
            padding-bottom: 24px;
        }
    }
</style>
