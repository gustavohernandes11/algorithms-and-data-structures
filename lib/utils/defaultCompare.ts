export const Compare = {
    LESS_THAN: -1,
    EQUAL: 0,
    BIGGER_THAN: 1,
}

export function defaultCompare(a: any, b: any) {
    if (a === b) {
        return Compare.EQUAL
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}
