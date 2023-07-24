import { Queue } from './Queue'
import { Stack } from './Stack'
import { Deque } from './Deque'
import { LinkedList } from './LinkedList'
import { DoubleLinkedList } from './DoubleLinkedList'
import { Set } from './Set'

const set = new Set()
set.add([1, 2, 3, 4, 5])

set.delete(1)
console.log(set)
