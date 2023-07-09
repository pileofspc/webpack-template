import type { Res } from "@types";
import type { Ref } from "vue";
import { ref } from "vue";
import { FetchStatuses } from "/src/FetchStatuses";

// TODO: Разобраться как не повторять сигнатуры по несколько раз для одних и тех же функций

export default function useFetch<T>(options?: {
    defaultValue?: undefined;
    url?: string;
    stagger?: boolean;
    fetchOptions?: any;
}): {
    fetchedData: Ref<T | undefined>;
    fetchStatus: Ref<FetchStatuses>;
    fetchMessage: Ref<string>;
    isFetching: Ref<boolean>;
    startFetch: (
        urlOverride?: string,
        fetchOptionsOverride?: any
    ) => Promise<unknown>;
    fetchPromise: Promise<unknown> | undefined;
};

export default function useFetch<T>(options?: {
    defaultValue: T;
    url?: string;
    stagger?: boolean;
    fetchOptions?: any;
}): {
    fetchedData: Ref<T>;
    fetchStatus: Ref<FetchStatuses>;
    fetchMessage: Ref<string>;
    isFetching: Ref<boolean>;
    startFetch: (
        urlOverride?: string,
        fetchOptionsOverride?: any
    ) => Promise<unknown>;
    fetchPromise: Promise<unknown> | undefined;
};

export default function useFetch<T>({
    url,
    stagger = false,
    defaultValue,
    fetchOptions,
}: {
    url?: string;
    stagger?: boolean;
    defaultValue?: T;
    fetchOptions?: any;
} = {}) {
    const fetchedData = ref(defaultValue) as Ref<T | undefined>;
    const fetchStatus = ref(FetchStatuses.NotStarted);
    const isFetching = ref(true);
    const fetchMessage = ref("");

    // const randomTime = Math.random() * 3000;
    // const randomTime = 9999999;

    // function startFetch(
    //     urlOverride: string,
    //     fetchOptionsOverride: any = fetchOptions
    // ) {
    //     fetchStatus.value = FetchStatuses.Fetching;

    //     return new Promise((res, rej) => {
    //         setTimeout(() => {
    //             fetch(urlOverride, fetchOptionsOverride)
    //                 .then((res) => res.json())
    //                 .catch((err) => {
    //                     throw new Error(
    //                         "Произошла ошибка при запросе данных. Сервер вернул неправильный формат"
    //                     );
    //                 })
    //                 .then((json: Res<T>) => {
    //                     if (!json.status) {
    //                         throw new Error(
    //                             "Произошла ошибка при запросе данных"
    //                         );
    //                     }

    //                     fetchMessage.value = json.message;
    //                     fetchedData.value = json.data;

    //                     if (
    //                         Array.isArray(json.data) &&
    //                         json.data.length === 0
    //                     ) {
    //                         fetchStatus.value = FetchStatuses.Empty;
    //                     } else {
    //                         fetchStatus.value = FetchStatuses.Ready;
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     fetchStatus.value = FetchStatuses.Error;
    //                     fetchMessage.value = err.message;
    //                     console.error(err);
    //                 })
    //                 .finally(() => {
    //                     isFetching.value = false;
    //                     res(true);
    //                 });
    //         }, randomTime);
    //     });
    // }

    function startFetch(urlOverride?: string, fetchOptionsOverride?: any) {
        fetchStatus.value = FetchStatuses.Fetching;
        if (!urlOverride && url) {
            urlOverride = url;
        }
        if (!fetchOptionsOverride && fetchOptions) {
            fetchOptionsOverride = fetchOptions;
        }
        if (!urlOverride) {
            throw new Error("Не указан адрес для запроса!");
        }
        return fetch(urlOverride, fetchOptionsOverride)
            .then((res) => res.json())
            .catch(() => {
                throw new Error(
                    "Произошла ошибка при запросе данных. Сервер вернул неправильный формат"
                );
            })
            .then((json: Res<T>) => {
                if (!json.status) {
                    throw new Error("Произошла ошибка при запросе данных");
                }

                fetchMessage.value = json.message;
                fetchedData.value = json.data;

                if (Array.isArray(json.data) && json.data.length === 0) {
                    fetchStatus.value = FetchStatuses.Empty;
                } else {
                    fetchStatus.value = FetchStatuses.Ready;
                }
            })
            .catch((err) => {
                fetchStatus.value = FetchStatuses.Error;
                fetchMessage.value = err.message;
                console.error(err);
            })
            .finally(() => {
                isFetching.value = false;
            });
    }

    let fetchPromise: Promise<unknown> | undefined;
    if (!stagger && url) {
        fetchPromise = startFetch(url, fetchOptions);
    }

    return {
        fetchStatus,
        fetchMessage,
        fetchedData,
        isFetching,
        startFetch,
        fetchPromise,
    };
}
