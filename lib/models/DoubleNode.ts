import { Node } from './Node'
import { ValidDataTypes } from '../DoubleLinkedList'

export class DoubleNode extends Node {
    previous?: DoubleNode
    next?: DoubleNode
    constructor(value?: ValidDataTypes) {
        super(value)
    }
}
