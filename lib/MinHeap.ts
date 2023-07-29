import { Compare, defaultCompare } from './utils/defaultCompare'

type ValidHeapValue = number | string

export class MinHeap {
    private readonly compareFn
    heap: number[] = []
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
    }

    size() {
        return this.heap.length
    }
    isEmpty() {
        return this.heap.length === 0
    }
    findMinimun() {
        return this.isEmpty() ? undefined : this.heap[0]
    }
    extract() {
        if (this.isEmpty()) return undefined
        if (this.size() === 1) return this.heap.shift()

        const removedItem = this.heap.shift()
        this.siftDown(0)
        return removedItem
    }
    getLeftIndex(index: number): number {
        return 2 * this.heap[index] + 1
    }
    getRightIndex(index: number): number {
        return 2 * this.heap[index] + 2
    }
    getParentIndex(index: number) {
        if (index === 0) return null
        return Math.floor((index - 1) / 2)
    }
    insert(value: number): boolean {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }
    protected siftDown(index: number) {
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()

        if (
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) >
                Compare.BIGGER_THAN
        ) {
            element = left
        }
        if (
            right < size &&
            this.compareFn(this.heap[element], this.heap[right]) >
                Compare.BIGGER_THAN
        ) {
            element = right
        }
        if (index !== element) {
            this.swap(this.heap, index, element)
            this.siftDown(element)
        }
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
