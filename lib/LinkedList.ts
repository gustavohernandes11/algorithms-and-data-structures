import { Node } from './models/Node'

export type ValidDataTypes = string | number

export class LinkedList {
    head: any
    count = 0
    constructor() {}

    push(item: ValidDataTypes | ValidDataTypes[]) {
        const pushItem = (element: ValidDataTypes) => {
            if (this.head == null) {
                this.head = new Node(element)
                this.count++
            } else {
                let current = this.head
                while (current.next != null) {
                    current = current.next
                }
                current.next = new Node(element)
                this.count++
            }
        }

        if (item === '' || item == null) return undefined
        if (item instanceof Array) {
            item.forEach((element) => {
                pushItem(element)
            })
        } else {
            pushItem(item)
        }
    }
    toString() {
        if (this.head == null) return ''
        else {
            let objString = `${this.head.value}`
            let current = this.head.next

            for (let i = 1; i < this.count && current != null; i++) {
                objString = `${objString}, ${current.value}`
                current = current.next
            }
            return objString
        }
    }
    insert(item: ValidDataTypes, index: number) {
        if (item != null && index <= this.count && index >= 0) {
            if (index === 0) {
                this.head = new Node(item, this.head)
            } else {
                let previous = this.getElementAt(index - 1)
                let current = previous.next

                previous.next = new Node(item, current)
            }

            this.count++
            return true
        } else {
            return false
        }
    }
    getElementAt(index: number) {
        if (index === 0) {
            return this.head
        }
        if (index < this.count && index >= 0) {
            let current = this.head
            for (let i = 0; i < index && current.next != null; i++) {
                current = current.next
            }
            return current
        } else {
            return false
        }
    }
    removeAt(index: number) {
        if (index < this.count && index >= 0) {
            if (index === 0) {
                let removedItem = this.head
                this.head = this.head.next
                this.count--
                return removedItem
            }
            let current = this.head
            let previous = this.getElementAt(index - 1)

            for (let i = 0; i < index; i++) {
                previous = current
                current = current.next
            }
            previous.next = current.next
            this.count--
            return current
        } else {
            return undefined
        }
    }

    remove(item: ValidDataTypes) {
        let current = this.head
        if (this.head.value === item) {
            this.head = this.head.next
            this.count--
            return
        } else {
            for (let i = 0; i < this.count; i++) {
                if (current.value == item) {
                    let previous = this.getElementAt(i - 1)
                    previous.next = current.next

                    this.count--
                    return true
                } else {
                    current = current.next
                }
            }
        }
        return false
    }
    indexOf(item: ValidDataTypes) {
        let current = this.head
        for (let index = 0; index < this.count; index++) {
            if (current.value == item) {
                return index
            } else {
                current = current.next
            }
        }
        return -1
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.count === 0
    }
}
