import { expect, it, describe, jest } from '@jest/globals'
import { BinarySearchTree } from '../lib/BinarySearchTree'
import { BinaryNode } from '../lib/models/BinaryNode'

describe('BinarySearchTree', () => {
    const dummyValues = [0, 1, 2, 3]
    function makeBinaryTreeWith(keys?: any[]) {
        const sut = new BinarySearchTree()
        keys?.forEach((element) => {
            sut.insert(element)
        })
        return sut
    }
    describe('insert()', () => {
        it('should insert all the provided itens', () => {
            const sut = makeBinaryTreeWith(dummyValues)
            let orderedItens: any[] = []
            sut.inOrderTranverse((x: BinaryNode) => orderedItens.push(x.key))
            expect(orderedItens).toEqual(dummyValues)
        })
    })
    describe('inOrderTranverse()', () => {
        it('should go through the tree in rising order', () => {
            const unorderedValues = ['a', -1000, 4, 2, 3, Math.PI]
            const sut = makeBinaryTreeWith(unorderedValues)

            let orderedItens: any[] = []
            sut.inOrderTranverse((x: BinaryNode) => orderedItens.push(x.key))

            const orderInAscending = (a: any, b: any) => {
                if (typeof (a && b) === 'number') return a - b
                else return a - b
            }

            expect(orderedItens).toEqual(unorderedValues.sort(orderInAscending))
        })
        it('should execute the one callback for each node', () => {
            const sut = makeBinaryTreeWith([1, 2, 3])
            const callbackSpy = jest.fn()
            sut.inOrderTranverse(callbackSpy)
            expect(callbackSpy).toBeCalledTimes(3)
        })
    })
    describe('preOrderTraverse()', () => {
        it('should go through the tree in pre order', () => {
            const randomValues = [1, 2, -1, 3]
            const sut = makeBinaryTreeWith(randomValues)

            let orderedItens: any[] = []
            sut.preOrderTraverse((x: BinaryNode) => orderedItens.push(x.key))
            const correctOrder = [1, -1, 2, 3]
            expect(orderedItens).toEqual(correctOrder)
        })
        it('should execute the one callback for each node', () => {
            const sut = makeBinaryTreeWith([1, 2, 3])
            const callbackSpy = jest.fn()
            sut.inOrderTranverse(callbackSpy)
            expect(callbackSpy).toBeCalledTimes(3)
        })
    })
    describe('postOrderTraverse()', () => {
        it('should go through the children node before the current node key', () => {
            const randomValues = [1, 2, -1, 3]
            const sut = makeBinaryTreeWith(randomValues)

            let orderedItens: any[] = []
            sut.postOrderTraverse((x: BinaryNode) => orderedItens.push(x.key))
            const correctOrder = [-1, 2, 3, 1]

            expect(orderedItens).toEqual(correctOrder)
        })
        it('should execute the one callback for each node', () => {
            const sut = makeBinaryTreeWith([1, 2, 3])
            const callbackSpy = jest.fn()
            sut.inOrderTranverse(callbackSpy)
            expect(callbackSpy).toBeCalledTimes(3)
        })
    })
    describe('min()', () => {
        it('should return the minimum key in the tree', () => {
            const sut = makeBinaryTreeWith([1, 2, 3, 4, 'a', -100, 0])
            const minimum = sut.min()
            expect(minimum?.key).toBe(-100)
        })
    })
    describe('max()', () => {
        it('should return the maxium key in the tree', () => {
            const sut = makeBinaryTreeWith([1, 100, 2, 3, 4, -100, 0])
            const maximum = sut.max()
            expect(maximum?.key).toBe(100)
        })
    })
    describe('search()', () => {
        it('should return the correct key in search', () => {
            const sut = makeBinaryTreeWith([1, 2, 3, 4, 5])

            expect(sut.search(-111)).toBeFalsy()
            expect(sut.search(-99)).toBeFalsy()
            expect(sut.search(0)).toBeFalsy()
            expect(sut.search(6)).toBeFalsy()

            expect(sut.search(1)).toBeTruthy()
            expect(sut.search(2)).toBeTruthy()
            expect(sut.search(5)).toBeTruthy()
        })
    })
    describe('remove()', () => {
        it('should remove correctly if node has not children', () => {
            const sut = makeBinaryTreeWith([1, 2, 3, 4, 5])
            sut.remove(5)
            expect(sut.search(5)).toBeFalsy()
        })
        it('should remove correctly if node has one children', () => {
            const sut = makeBinaryTreeWith([1, 2, 3, 4, 5])
            sut.remove(4)
            expect(sut.search(4)).toBeFalsy()
        })

        it('should remove correctly if node has 2 children', () => {
            const sut = makeBinaryTreeWith([2, 1, 3, 4, 5])
            sut.remove(2)
            expect(sut.search(2)).toBeFalsy()
        })
        it('should remove correctly all the nodes', () => {
            const values = [100, 10, 1000]
            const sut = makeBinaryTreeWith(values)
            values.forEach((v) => {
                sut.remove(v)
            })

            expect(sut.search(100)).toBeFalsy()
            expect(sut.search(10)).toBeFalsy()
            expect(sut.search(1000)).toBeFalsy()
        })
    })
})
