import { expect, it, describe } from '@jest/globals'
import { LinkedList } from '../lib/LinkedList'

describe('LinkedList', () => {
    describe('push()', () => {
        it('should push the items in the LinkedList', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push(2)
            linkedlist.push(3)
            linkedlist.push(4)

            expect(linkedlist.count).toBe(4)
        })
        it('should accept an array as parameter', () => {
            const linkedlist = new LinkedList()
            linkedlist.push([1, 2, 3, 4])

            expect(linkedlist.toString()).toBe('1, 2, 3, 4')
            expect(linkedlist.size()).toBe(4)
        })
        it('should return undefined neither push anything when parameter is invalid', () => {
            const linkedlist = new LinkedList()

            let returnedValue = linkedlist.push('')
            expect(returnedValue).toBe(undefined)
        })
    })
    describe('toString()', () => {
        it('should transform the itens in a string representation', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push('2')
            linkedlist.push(3)

            expect(linkedlist.toString()).toBe('1, 2, 3')
        })
    })
    describe('getElementAt()', () => {
        it('should return the element in the correct index', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push(2)
            linkedlist.push(3)
            linkedlist.push(4)

            expect(linkedlist.getElementAt(0).value).toBe(1)
            expect(linkedlist.getElementAt(1).value).toBe(2)
            expect(linkedlist.getElementAt(3).value).toBe(4)
            expect(linkedlist.getElementAt(999)).toBe(false)
        })
    })
    describe('removeAt()', () => {
        it('should remove the item in the correct index', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push(2)
            linkedlist.push(3)

            linkedlist.removeAt(2)
            expect(linkedlist.toString()).toBe('1, 2')

            linkedlist.removeAt(1)
            expect(linkedlist.toString()).toBe('1')

            linkedlist.removeAt(0)
            expect(linkedlist.toString()).toBe('')
        })
        it('should remove the head', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push(2)

            linkedlist.removeAt(0)
            expect(linkedlist.toString()).toBe('2')
            expect(linkedlist.count).toBe(1)
        })
        it('should return the removed item', () => {
            const linkedlist = new LinkedList()
            linkedlist.push('A')
            const removedItem = linkedlist.removeAt(0)
            expect(removedItem.value).toBe('A')
        })
        it('should return undefined if the index is not valid', () => {
            const linkedlist = new LinkedList()
            linkedlist.push('A')

            let returnedValue = linkedlist.removeAt(999)
            expect(returnedValue).toBe(undefined)

            returnedValue = linkedlist.removeAt(-1)
            expect(returnedValue).toBe(undefined)
        })
    })
    describe('insert()', () => {
        it('should inset the item in the given index', () => {
            const linkedlist = new LinkedList()
            linkedlist.insert(1, 0)
            linkedlist.insert(2, 1)
            linkedlist.insert(3, 2)

            linkedlist.insert('Hey', 2)
            expect(linkedlist.toString()).toBe('1, 2, Hey, 3')

            linkedlist.insert('4', 4)
            expect(linkedlist.toString()).toBe('1, 2, Hey, 3, 4')
        })
        it('should return false if the given parameters are invalids', () => {
            const linkedlist = new LinkedList()

            let returnedValue = linkedlist.insert(1, -999)
            expect(returnedValue).toBe(false)

            returnedValue = linkedlist.insert(2, 999)
            expect(returnedValue).toBe(false)

            returnedValue = linkedlist.insert(3, 10)
            expect(returnedValue).toBe(false)
        })
    })
    describe('remove()', () => {
        it('should remove the parameter item', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push(2)
            linkedlist.push(3)
            linkedlist.push(4)

            linkedlist.remove(3)
            expect(linkedlist.toString()).toBe('1, 2, 4')

            linkedlist.remove(4)
            expect(linkedlist.toString()).toBe('1, 2')

            linkedlist.remove(1)
            expect(linkedlist.toString()).toBe('2')
        })
        it('should return false if the item was not found', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.push(2)

            let returnedValue = linkedlist.remove(3)

            expect(returnedValue).toBe(false)
        })
    })
    describe('size()', () => {
        it('should return the list length', () => {
            const linkedlist = new LinkedList()
            linkedlist.push(1)
            linkedlist.insert(2, 1)
            linkedlist.insert(2, 999) // invalid
            linkedlist.push('') // invalid

            expect(linkedlist.size()).toBe(2)

            linkedlist.removeAt(1)
            linkedlist.removeAt(0)

            expect(linkedlist.size()).toBe(0)
        })
    })
    describe('indexOf()', () => {
        it('should return the index of the given parameter item', () => {
            const linkedlist = new LinkedList()
            linkedlist.push('First')
            linkedlist.push('Second')
            linkedlist.push('Third')

            let index = linkedlist.indexOf('First')
            expect(index).toBe(0)

            index = linkedlist.indexOf('Second')
            expect(index).toBe(1)

            index = linkedlist.indexOf('Third')
            expect(index).toBe(2)

            index = linkedlist.indexOf('Fourth')
            expect(index).toBe(-1)
        })
    })
    describe('isEmpty', () => {
        it('should return true if the linkedList is empty', () => {
            const linkedlist = new LinkedList()
            expect(linkedlist.isEmpty()).toBe(true)

            linkedlist.push('Item')
            expect(linkedlist.isEmpty()).toBe(false)
        })
    })
})
