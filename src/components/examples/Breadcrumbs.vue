<template>
    <div class="breadcrumbs block">
        <template v-for="(item, index) in props.items">
            <component
                class="breadcrumbs__item"
                :is="item.to ? 'router-link' : 'div'"
                :to="item.to"
                :style="{
                    color:
                        index === props.items.length - 1
                            ? 'var(--c-secondary)'
                            : '',
                }"
            >
                <svg class="breadcrumbs__home" v-if="index === 0">
                    <use :href="`#${HomeImage.id}`"></use>
                </svg>
                {{ item.displayName }}
            </component>
            <svg
                class="breadcrumbs__divider"
                v-if="index !== props.items.length - 1"
            >
                <use :href="`#${ChevronRight.id}`"></use>
            </svg>
        </template>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from "vue";
    import type { IBreadcrumb } from "@types";
    import HomeImage from "@images/icons/Home.svg?sprite";
    import ChevronRight from "@images/icons/ChevronRight.svg?sprite";

    const props = defineProps({
        items: {
            type: Array as PropType<IBreadcrumb[]>,
            required: true,
        },
    });
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;

    .breadcrumbs {
        display: flex;
        flex-wrap: wrap;
        row-gap: 8px;
        align-items: center;
        padding: 8px;

        &__home {
            width: 30px;
            height: 30px;
            color: var(--c-shade);
            margin-right: 4px;
        }

        &__item {
            display: flex;
            align-items: center;
        }

        &__divider {
            width: 20px;
            height: 20px;
            color: var(--c-shade);
            margin: 0 10px;
        }
    }

    // @include m.respondSimple();
</style>
