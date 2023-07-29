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
