import { MinHeap } from './MinHeap'
import { defaultCompare, reverseCompare } from './utils'

export class MaxHeap extends MinHeap {
    heap: number[] = []
    constructor(protected compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}
