export type RequiredNonNullable<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};

export type Comparator<T> = (a: T, b: T) => number;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
