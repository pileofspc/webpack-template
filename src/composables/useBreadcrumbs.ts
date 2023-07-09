import type { IBreadcrumb } from "@types";
import { computed, watch } from "vue";
import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";

export default function useBreadcrumbs(breadcrumbsGetter: () => IBreadcrumb[]) {
    const breadcrumbsComputed = computed(breadcrumbsGetter);

    const bcstore = useBreadcrumbsStore();
    // вотчер вместо присваивания компьютед свойства нужен, чтобы избежать ошибки типов
    bcstore.setBreadcrumbs(breadcrumbsComputed.value);
    watch(breadcrumbsComputed, () => {
        bcstore.setBreadcrumbs(breadcrumbsComputed.value);
    });

    return breadcrumbsComputed;
}
