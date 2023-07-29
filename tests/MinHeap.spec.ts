import { expect, it, describe } from '@jest/globals'
import { MinHeap } from '../lib/MinHeap'

describe('MinHeap', () => {
    function makeMinHeapWith(values: number[]) {
        const sut = new MinHeap()
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
    describe('getParentIndex()', () => {
        it('should return the parent index', () => {
            const sut = makeMinHeapWith([0, 1, 2])
            const parentFromLeft = sut.getParentIndex(1)
            const parentFromRight = sut.getParentIndex(2)

            expect(parentFromLeft).toBe(0)
            expect(parentFromRight).toBe(0)
        })
    })
    describe('getLeftIndex()', () => {
        it('should return the left child index', () => {
            const sut = makeMinHeapWith([0, 1, 2])
            const left = sut.getLeftIndex(0)

            expect(left).toBe(1)
        })
    })
    describe('getRightIndex()', () => {
        it('should return the right child index', () => {
            const sut = makeMinHeapWith([0, 1, 2])
            const right = sut.getRightIndex(0)

            expect(right).toBe(2)
        })
    })
    describe('insert()', () => {
        it('should effectively insert the values into the heap', () => {
            const sut = makeMinHeapWith([1, 2, 3, 4, 5, 6])
            const insertedLength = 6
            const sutLength = sut.heap.length

            expect(insertedLength).toBe(sutLength)
        })
        it('the children should be always bigger than the parent', () => {
            const sut = makeMinHeapWith(generateRange(64))

            for (let i = 0; i < 6; i++) {
                const parent = sut.heap[i]
                const leftChild = sut.getLeftIndex(parent)
                const rightChild = sut.getRightIndex(parent)

                if (!!leftChild)
                    expect(leftChild).toBeGreaterThanOrEqual(parent)
                if (!!rightChild)
                    expect(rightChild).toBeGreaterThanOrEqual(parent)
            }
        })
    })
})
