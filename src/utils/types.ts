export type RequiredNonNullable<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};

export type Comparator<T> = (a: T, b: T) => number;
