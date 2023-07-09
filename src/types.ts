// Общие типы
export type KeyOfType<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
export type Res<T> = { status: boolean; message: string; data: T };

export type RouterLink =
    | string
    | { name: string; params?: any; replace?: boolean };
export interface IBreadcrumb {
    displayName: string;
    to?: RouterLink;
}
export interface IDoughnutItem {
    name: string;
    value: number;
}

// Типы, специфичные для приложения