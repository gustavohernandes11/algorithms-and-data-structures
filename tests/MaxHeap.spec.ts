import { expect, it, describe } from '@jest/globals'
import { MaxHeap } from '../lib/MaxHeap'

describe('MaxHeap', () => {
    function makeMaxHeapWith(values: number[]) {
        const sut = new MaxHeap()
        values.forEach((v) => {
            sut.insert(v)
        })
        return sut
    }
    function generateRange(n: number) {
        let range = new Array(n)

        range.forEach((x, index) => {
            x = index + 1
        })

        return range
    }
    describe('findMinimum()', () => {
        it('should return the biggest number in the heap', () => {
            const sut = makeMaxHeapWith([1, 2, 3, 4])
            const minimun = sut.findMinimun()

            expect(minimun).toBe(4)
        })
    })

    describe('insert()', () => {
        it('the children should be always smaller than the parent', () => {
            const sut = makeMaxHeapWith(generateRange(64))

            for (let i = 0; i < 6; i++) {
                const parent = sut.heap[i]
                const leftChild = sut.getLeftIndex(parent)
                const rightChild = sut.getRightIndex(parent)

                if (!!leftChild) expect(leftChild).toBeLessThanOrEqual(parent)
                if (!!rightChild) expect(rightChild).toBeLessThanOrEqual(parent)
            }
        })
    })
    describe('extract()', () => {
        it('should return the removed item', () => {
            const sut = makeMaxHeapWith([1, 2, 3])
            const removed = sut.extract()

            expect(removed).toBe(3)
            expect(sut.size()).toBe(2)
        })
    })
})
