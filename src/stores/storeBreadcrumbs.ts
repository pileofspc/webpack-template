import { defineStore } from "pinia";
import { ref } from "vue";
import type { IBreadcrumb } from "@types";
import { computed } from "vue";

export const useBreadcrumbsStore = defineStore("breadcrumbs", () => {
    const breadcrumbs = ref<IBreadcrumb[]>([]);

    const getterBreadcrumbs = computed(() => breadcrumbs.value);

    function setBreadcrumbs(value: IBreadcrumb[]) {
        breadcrumbs.value = value;
    }

    return { getterBreadcrumbs, setBreadcrumbs };
});
