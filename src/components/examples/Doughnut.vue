<template>
    <div class="doughnut">
        <div class="doughnut__chart-container">
            <Doughnut
                class="doughnut__chart"
                :options="chartOptions"
                :data="chartData"
            />
        </div>
        <div class="doughnut__data">
            <div class="doughnut__item" v-for="(item, index) in props.items">
                <div
                    class="doughnut__item-square"
                    :style="{ backgroundColor: colors[index] }"
                ></div>
                <div class="doughnut__item-percentage">
                    {{ `${getPercentage(item?.value, sum)}` }}
                </div>
                <div class="doughnut__item-text">{{ `${item?.name}` }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from "vue";
    import { Doughnut } from "vue-chartjs";
    import {
        Chart,
        DoughnutController,
        ArcElement,
        Tooltip,
        LinearScale,
    } from "chart.js";
    import type { PropType } from "vue";
    import type { IDoughnutItem } from "@types";

    const props = defineProps({
        items: {
            // тут IDoughnutItem[] вместо IDoughnutItem[] | undefined[], чтобы не было ошибки типов с chartjs
            // но по факту может прийти и пустой массив
            type: Array as PropType<IDoughnutItem[]>,
            required: true,
        },
    });

    // Здесь пришлось добавить LinearScale, хоть и в документации это не написано. Либо можно просто импортировать всё сразу:
    // import Chart from 'chart.js/auto';
    // и ничего уже не регистрировать после этого
    Chart.register(DoughnutController, ArcElement, Tooltip, LinearScale);

    // Максимум 5 элементов и соответственно 5 цветов
    const rootStyle = getComputedStyle(document.documentElement);
    const colors = [
        rootStyle.getPropertyValue("--c-warning"),
        rootStyle.getPropertyValue("--c-success"),
        rootStyle.getPropertyValue("--c-primary"),
        rootStyle.getPropertyValue("--c-shade"),
        rootStyle.getPropertyValue("--c-graph"),
    ];

    function sliceText(maxChars: number, text: string): string[] | string {
        if (text.length <= maxChars) {
            return text;
        }

        let currentSlice = text;
        let result = [];

        function getSpaceIndex() {
            const before = currentSlice.lastIndexOf(" ", maxChars);
            if (before !== -1) {
                return before;
            }
            return currentSlice.indexOf(" ", maxChars);
        }

        let closestSpaceIndex = getSpaceIndex();
        while (closestSpaceIndex !== -1) {
            if (currentSlice.length <= maxChars) {
                result.push(currentSlice);
                currentSlice = "";
                break;
            }
            result.push(currentSlice.slice(0, closestSpaceIndex));
            currentSlice = currentSlice.slice(closestSpaceIndex + 1);

            closestSpaceIndex = getSpaceIndex();
        }
        if (currentSlice.length > 0) {
            result.push(currentSlice);
        }
        return result;
    }

    const chartOptions = ref({
        responsive: true,
        plugins: {
            tooltip: {
                boxPadding: 6,
                callbacks: {
                    title(context: any) {
                        const label: string = context[0].label;
                        return sliceText(24, label);
                    },
                    label(context: any) {
                        return getPercentage(context.parsed, sum.value);
                    },
                },
            },
            animation: {
                animateRotate: true,
                duration: 1000,
                easing: "easeOutQuad",
            },
        },
    });

    const names = computed(() => props.items.map((item) => item?.name));
    const values = computed(() => props.items.map((item) => item?.value));
    const sum = computed(() =>
        values.value.reduce((sum, el) => (sum || 0) + (el || 0))
    );

    const chartData = computed(() => {
        return {
            labels: names.value,
            datasets: [
                {
                    data: values.value,
                    backgroundColor: colors,
                },
            ],
        };
    });

    function getPercentage(value: number = 0, total: number = 0) {
        return `${Math.round((value / total) * 100)}%`;
    }
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;

    .doughnut {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;

        &__chart-container {
            width: 200px;
        }

        // &__data {
        //     width: fit-content;
        // }

        &__item {
            display: flex;
            align-items: center;
            font-size: 14px;
        }

        &__item:not(:first-child) {
            margin-top: 8px;
        }

        &__item-square {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        &__item-percentage {
            margin-left: 8px;
        }

        &__item-text {
            margin-left: 4px;
        }
    }

    // @include m.respondSimple("md") {
    //     .doughnut {
    //         &__data {
    //             margin-left: 80px;
    //         }
    //     }
    // }
</style>
