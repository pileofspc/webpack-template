import { ref } from "vue";
import { FetchStatuses } from "/src/FetchStatuses";

export default function useFetchImage({
    url,
    stagger = false,
    fetchOptions,
}: {
    url?: string;
    stagger?: boolean;
    fetchOptions?: object;
} = {}) {
    const fetchedImage = ref<string>();
    const fetchStatusImage = ref(FetchStatuses.NotStarted);
    const isFetchingImage = ref(true);

    let prevController: AbortController;

    function startFetchImage(
        urlOverride?: string,
        fetchOptionsOverride?: object
    ) {
        prevController?.abort();
        const controller = new AbortController();
        prevController = controller;

        if (fetchOptionsOverride) {
            fetchOptionsOverride = {
                ...fetchOptionsOverride,
                signal: controller.signal,
            };
        } else if (fetchOptions) {
            fetchOptionsOverride = {
                ...fetchOptions,
                signal: controller.signal,
            };
        } else {
            fetchOptionsOverride = {
                signal: controller.signal,
            };
        }

        if (!urlOverride && url) {
            urlOverride = url;
        }
        if (!urlOverride) {
            throw new Error("Не передан адрес запроса");
        }

        isFetchingImage.value = true;
        fetchStatusImage.value = FetchStatuses.Fetching;

        return fetch(urlOverride, fetchOptionsOverride)
            .then((res) => res.blob())
            .catch((err) => {
                if ((err.name = "AbortController")) {
                    throw err;
                }
                throw new Error(
                    "Произошла ошибка при запросе данных. Сервер вернул неправильный формат"
                );
            })
            .then((blob: Blob) => {
                fetchedImage.value = URL.createObjectURL(blob);
                fetchStatusImage.value = FetchStatuses.Ready;
            })
            .catch((err) => {
                if (!controller.signal.aborted) {
                    fetchStatusImage.value = FetchStatuses.Error;
                    console.error(err);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    isFetchingImage.value = false;
                }
            });
    }

    if (!stagger && url) {
        startFetchImage(url, fetchOptions);
    }

    return {
        fetchStatusImage,
        fetchedImage,
        isFetchingImage,
        startFetchImage,
    };
}
