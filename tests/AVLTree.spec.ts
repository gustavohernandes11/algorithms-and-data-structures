import { expect, it, describe, jest } from '@jest/globals'
import { AVLTree, BalanceFactor } from '../lib/AVLTree'
import {
    BinaryNode,
    NullableBinaryNode,
    ValidValueType,
} from '../lib/models/BinaryNode'

describe('AVLTree', () => {
    function makeUnbalancedAVLTree(keys?: ValidValueType[]) {
        const sut = new AVLTree()
        keys?.forEach((element) => {
            sut.unbalancedInsert(element)
        })
        return sut
    }
    function makeAVLWith(keys?: ValidValueType[]) {
        const sut = new AVLTree()
        keys?.forEach((element) => {
            sut.insert(element)
        })
        return sut
    }
    describe('getBalanceFactor()', () => {
        it('should return BALANCED if the AVL tree is empty', () => {
            const sut = makeUnbalancedAVLTree([])
            expect(sut.count()).toBe(0)
            expect(sut.getBalanceFactor(sut.root)).toBe(BalanceFactor.BALANCED)
        })
        it('should return SLIGHTLY_UNBALANCED_RIGHT if the AVL tree has only 1 more node at right', () => {
            const sut = makeUnbalancedAVLTree([1, 2])
            expect(sut.getBalanceFactor(sut.root)).toBe(
                BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            )
        })
        it('should return SLIGHTLY_UNBALANCED_LEFT if the AVL tree has only 1 more node at left', () => {
            const sut = makeUnbalancedAVLTree([2, 1])
            expect(sut.getBalanceFactor(sut.root)).toBe(
                BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            )
        })
        it('should return UNBALANCED_RIGHT if the AVL tree has 2 height difference at right', () => {
            const sut = makeUnbalancedAVLTree([1, 2, 3])
            expect(sut.getBalanceFactor(sut.root)).toBe(
                BalanceFactor.UNBALANCED_RIGHT
            )
        })
        it('should return UNBALANCED_LEFT if the AVL tree has 2 height difference at left', () => {
            const sut = makeUnbalancedAVLTree([3, 2, 1])
            expect(sut.getBalanceFactor(sut.root)).toBe(
                BalanceFactor.UNBALANCED_LEFT
            )
        })
    })
    describe('insert()', () => {
        it('should insert the correct values in the AVLtree', () => {
            const sut = makeAVLWith([1, 2, 3])
            expect(sut.count()).toBe(3)
        })

        it('should balance correctly after insert values', () => {
            const sut = makeAVLWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
            const factor = sut.getBalanceFactor(sut.root)

            expect(factor).toBeGreaterThanOrEqual(
                BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            )
            expect(factor).toBeLessThanOrEqual(
                BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            )
        })
    })
    describe('remove()', () => {
        it('should remove the items correctly', () => {
            const initValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            const sut = makeAVLWith(initValues)

            sut.remove(5)
            expect(sut.count()).toBe(initValues.length - 1)

            sut.remove(2)
            expect(sut.count()).toBe(initValues.length - 2)

            sut.remove(8)
            expect(sut.count()).toBe(initValues.length - 3)
        })

        it('should balance correctly after remove values', () => {
            const initValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            const sut = makeAVLWith(initValues)

            sut.remove(5)
            sut.remove(2)
            sut.remove(8)

            const factor = sut.getBalanceFactor(sut.root)
            expect(factor).toBeGreaterThanOrEqual(
                BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            )
            expect(factor).toBeLessThanOrEqual(
                BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            )
        })
    })
})
