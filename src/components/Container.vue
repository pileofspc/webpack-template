<template>
    <slot name="fetching" v-if="props.status === FetchStatuses.Fetching">
        <VLoader />
    </slot>

    <slot
        name="successMessage"
        v-if="props.showSuccess && props.status === FetchStatuses.Ready"
    >
        <div>{{ props.message }}</div>
    </slot>
    <slot
        v-else-if="
            props.status === FetchStatuses.Ready ||
            props.status === FetchStatuses.NotStarted
        "
    ></slot>

    <slot name="errorMessage" v-if="props.status === FetchStatuses.Error">
        <div>{{ props.message || "Произошла ошибка при запросе" }}</div>
    </slot>
    <slot name="empty" v-if="props.status === FetchStatuses.Empty">
        <div>Нет данных для отображения</div>
    </slot>
</template>

<script setup lang="ts">
    import VLoader from "@components/VLoader.vue";
    import type { PropType } from "vue";
    import { FetchStatuses } from "/src/FetchStatuses";
    import { useRouter } from "vue-router";
    import { watch } from "vue";

    const router = useRouter();

    const props = defineProps({
        status: {
            type: String as PropType<FetchStatuses>,
            required: true,
        },
        message: {
            type: String,
        },
        showSuccess: {
            type: Boolean,
        },
        redirect: {
            type: Boolean,
        },
    });

    const emit = defineEmits(["ready", "error", "empty"]);

    watch(
        () => props.status,
        (value) => {
            if (props.redirect && props.status === FetchStatuses.Error) {
                router.replace("/error404");
            }

            if (props.status === FetchStatuses.Empty) {
                emit("empty");
            }
            if (props.status === FetchStatuses.Error) {
                emit("error");
            }
            if (props.status === FetchStatuses.Ready) {
                emit("ready");
            }
        }
    );
</script>

<style lang="scss" scoped></style>
