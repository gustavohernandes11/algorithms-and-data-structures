export class Queue {
	_count: number;
	_lowestCount: number;
	_items: any;
	constructor() {
		this._count = 0;
		this._lowestCount = 0;
		this._items = {};
	}
	enqueue(newItems: string | string[]) {
		if (newItems instanceof Array) {
			for (const item of newItems) {
				this._items[this._count] = item.trim();
				this._count++;
			}
		} else {
			this._items[this._count] = newItems.trim();
			this._count++;
		}
	}
	dequeue() {
		if (this._items[this._lowestCount] === undefined) return undefined;
		let deletedItem = this._items[this._lowestCount];
		delete this._items[this._lowestCount];
		this._lowestCount++;
		this._count--;
		return deletedItem;
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
	peek() {
		return this._items[this._lowestCount];
	}
	size() {
		return this._count;
	}
	clear() {
		this._count = 0;
		this._lowestCount = 0;
		this._items = {};
	}
}
