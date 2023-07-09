<template>
    <div class="dropdown" @click="isOpen = !isOpen">
        <span class="dropdown__title">{{ props.title }}</span>
        <div
            class="arrow dropdown__arrow"
            :class="{ arrow_open: isOpen }"
        ></div>
        <div
            class="dropdown__window"
            :class="{ dropdown__window_open: isOpen }"
            @click.stop
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
    });

    const isOpen = ref(false);
</script>

<style lang="scss" scoped>
    .dropdown {
        --dropdown-transition: 0.2s ease;

        position: relative;
        color: var(--c-secondary);
        display: flex;

        margin-right: 8px;
        cursor: pointer;

        &__window {
            position: absolute;
            top: calc(100% + 5px);
            right: -10px;
            border: 1px solid var(--c-shade);
            border-radius: 6px;
            overflow: hidden;
            width: max-content;

            box-shadow: var(--card-shadow);

            cursor: default;
            color: var(--c-primary);
            background-color: var(--c-bright);

            transition: transform var(--dropdown-transition),
                opacity var(--dropdown-transition);
            transform: translateY(-6px);
            opacity: 0;
            pointer-events: none;

            &_open {
                pointer-events: all;
                transform: translateY(0);
                opacity: 1;
            }
        }

        &_left {
            left: 0;
            right: auto;
            .dropdown__window {
                left: auto;
                right: -10px;
            }
        }

        // &_bordered {
        //     color: var(--c-primary);
        //     background-color: var(--c-success);
        //     border-radius: 22.5px;

        //     $padding-sides: 20px;
        //     padding: 6px $padding-sides;
        //     padding-right: calc($padding-sides + 8px);

        //     .dropdown__value {
        //         margin-right: 20px;
        //     }
        // }
    }

    .arrow {
        transition: transform var(--dropdown-transition);
        transform-origin: center 15%;
        transform: translate(80%, 40%) rotate(90deg);

        border: solid 4px transparent;
        border-top: solid 5px var(--c-graph);

        // При открытом селекте
        &_open {
            transform: translate(80%, 40%);
        }
    }
</style>
