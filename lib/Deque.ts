export class Deque {
	_count: number;
	_lowestCount: number;
	_items: any;
	constructor() {
		this._count = 0;
		this._items = {};
		this._lowestCount = 0;
	}
	toString() {
		let array: string[] = [];

		for (
			let i = this._lowestCount;
			i < this._count + this._lowestCount;
			i++
		) {
			if (this._items[i] !== "") {
				array.push(this._items[i]);
			}
		}

		let finalString = array.join(", ");
		return finalString;
	}
	addFront(newItems: string | string[]) {
		if (newItems instanceof Array) {
			for (const item of newItems.reverse()) {
				this._items[this._lowestCount - 1] = item.trim();
				this._count++;
				this._lowestCount--;
			}
		} else {
			this._items[this._lowestCount - 1] = newItems.trim();
			this._count++;
			this._lowestCount--;
		}
	}
	addBack(newItems: string | string[]) {
		if (newItems instanceof Array) {
			for (const item of newItems) {
				this._items[this._lowestCount + this._count] = item.trim();
				this._count++;
			}
		} else {
			this._items[this._lowestCount + this._count] = newItems.trim();
			this._count++;
		}
	}
	removeFront() {
		let deletedItem = this._items[this._lowestCount];
		delete this._items[this._lowestCount];
		this._lowestCount++;
		this._count--;
		return deletedItem;
	}
	removeBack() {
		let indexToRemove = this._count + this._lowestCount - 1;
		if (this._items[indexToRemove] === undefined) return undefined;
		let deletedItem = this._items[indexToRemove];
		delete this._items[indexToRemove];
		this._count--;
		return deletedItem;
	}
	peekFront() {
		return this._items[this._lowestCount];
	}
	peekBack() {
		return this._items[this._count - 1];
	}
	size() {
		return this._count;
	}
}
