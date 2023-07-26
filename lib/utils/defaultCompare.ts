export const defaultCompareFn = (first: any, second: any): boolean => {
    if (typeof first === 'object' && typeof second === 'boolean') {
        return first.Equals(second)
    } else {
        return first === second
    }
}
