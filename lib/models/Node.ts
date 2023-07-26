import { ValidDataTypes } from '../LinkedList'

export class Node {
    value: ValidDataTypes
    next?: Node

    constructor(value: any, next?: Node) {
        this.value = value
        this.next = next
    }
}
