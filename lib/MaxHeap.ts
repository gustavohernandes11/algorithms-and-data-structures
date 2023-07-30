import { MinHeap } from './MinHeap'
import { defaultCompare } from './utils/defaultCompare'

function reverseCompare(compareFn: any) {
    return (a: any, b: any) => compareFn(b, a)
}
export class MaxHeap extends MinHeap {
    heap: number[] = []
    constructor(protected compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}
