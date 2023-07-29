import { Compare, defaultCompare } from './utils/defaultCompare'

type ValidHeapValue = number | string

export class MinHeap {
    private readonly compareFn
    heap: number[] = []
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
    }

    getLeftIndex(index: number): number {
        return 2 * this.heap[index] + 1
    }
    getRightIndex(index: number): number {
        return 2 * this.heap[index] + 2
    }
    getParentIndex(index: number) {
        if (index === 0) return null
        return Math.floor(index - 1 / 2)
    }
    insert(value: number): boolean {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }
    protected siftUp(index: number) {
        let parent = this.getParentIndex(index)
        while (
            index > 0 &&
            this.compareFn(this.heap[parent!], this.heap[index]) >
                Compare.BIGGER_THAN
        ) {
            this.swap(this.heap, index, parent!)
            index = parent!
            parent = this.getParentIndex(index)
        }
    }
    swap(array: number[], a: number, b: number) {
        const temp = array[a]
        array[a] = array[b]
        array[b] = temp
    }
}

// insert(value)
// extract()
// findMinimum
// this.siftUp
// swap
