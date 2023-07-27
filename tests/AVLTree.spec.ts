import { expect, it, describe, jest } from '@jest/globals'
import { AVLTree, BalanceFactor } from '../lib/AVLTree'
import { ValidValueType } from '../lib/models/BinaryNode'

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
        // it('should balance correctly after insert a value', () => {
        //     const sut = makeAVLWith([1, 2, 3, 4, 5, 6, 7, 8, 9])
        //     expect(sut.getBalanceFactor(sut.root)).toBe(2 || 3 || 4)
        // })
    })
})
