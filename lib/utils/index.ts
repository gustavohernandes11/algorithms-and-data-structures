export type ICompareFunction<T> = (a: T, b: T) => number

export enum Compare {
    LESS_THAN = -1,
    BIGGER_THAN = 1,
    EQUALS = 0,
}

export function defaultCompare<T>(a: T, b: T) {
    if (a === b) {
        return Compare.EQUALS
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export function swap(array: number[], a: number, b: number) {
    const temp = array[a]
    array[a] = array[b]
    array[b] = temp
}

export function reverseCompare(compareFn: any) {
    return (a: any, b: any) => compareFn(b, a)
}
