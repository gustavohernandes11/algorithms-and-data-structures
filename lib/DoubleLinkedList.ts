import {Node, LinkedList} from "./LinkedList";
type ValidDataTypes = string | number;

export class DoubleLinkedList extends LinkedList {
	tail: any;
	head: any;
	count = 0;
	constructor() {
		super();
		this.tail = this.head;
	}

	push(item: ValidDataTypes | ValidDataTypes[]) {
		const pushItem = (element: ValidDataTypes) => {
			if (this.tail == null) {
				let newItem = new DoubleNode(element);
				this.tail = newItem;
				this.head = newItem;
				this.count++;
			} else {
				let newItem = new DoubleNode(element);

				newItem.previous = this.tail;
				this.tail.next = newItem;
				this.tail = newItem;

				this.count++;
			}
		};
		if (item === "" || item == null) return undefined;
		if (item instanceof Array) {
			item.forEach((element) => {
				pushItem(element);
			});
		} else {
			pushItem(item);
		}
	}

	insert(item: ValidDataTypes, index: number) {
		if (item != null && index <= this.count && index >= 0) {
			let newItem = new DoubleNode(item);
			if (index === 0) {
				let current = this.head;

				if (this.head == null) {
					this.head = newItem;
					this.tail = newItem;
				} else {
					current.previous = newItem;
					newItem.next = this.head;
					this.head = newItem;
				}
			} else if (index === this.count) {
				newItem.previous = this.tail;
				this.tail.next = newItem;
				this.tail = newItem;
			} else {
				let current = this.getElementAt(index);
				let previous = this.getElementAt(index - 1);

				newItem.next = current;

				previous.next = newItem;
				newItem.previous = previous;
				newItem.next = current;
			}

			this.count++;
			return true;
		} else {
			return false;
		}
	}
	getElementAt(index: number) {
		const isCloserToTheTail = (index: number) =>
			index > (this.count - 1) / 2;

		const isValidIndex = (index: number) =>
			index < this.count && index >= -1;

		if (index === 0) {
			return this.head;
		}
		if (index === -1) {
			return this.tail;
		}
		if (isValidIndex(index)) {
			if (isCloserToTheTail(index)) {
				let current = this.tail;
				for (
					let i = this.count - index - 1;
					i > 0 && current.previous != null;
					i--
				) {
					current = current.previous;
				}
				return current;
			} else {
				let current = this.head;
				for (let i = 0; i < index && current.next != null; i++) {
					current = current.next;
				}
				return current;
			}
		} else {
			return false;
		}
	}
	removeAt(index: number) {
		if (index < this.count && index >= 0) {
			if (index === 0) {
				let itemToBeRemoved = this.head;
				this.head = this.head.next;
				this.count--;
				return itemToBeRemoved;
			}
			let current = this.head;
			let previous = this.getElementAt(index - 1);

			for (let i = 0; i < index; i++) {
				previous = current;
				current = current.next;
			}
			previous.next = current.next;
			this.count--;
			return current;
		} else {
			return undefined;
		}
	}
}

class DoubleNode extends Node {
	previous?: DoubleNode;
	next?: DoubleNode;
	constructor(value?: ValidDataTypes) {
		super(value);
	}
}
