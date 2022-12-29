export class Stack {
	_count: number;
	_items: any;

	constructor() {
		this._count = 0;
		this._items = {};
	}
	isEmpty() {
		return this._count === 0;
	}
	clear() {
		this._count = 0;
		this._items = {};
	}
	peek() {
		return this._items[this._count - 1];
	}
	pop() {
		if (this._count === 0) {
			return;
		}
		let poppedItem = this._items[this._count - 1];
		delete this._items[this._count - 1];
		this._count--;
		return poppedItem;
	}
	push(item: string | string[]) {
		if (item instanceof Array) {
			item.forEach((item) => {
				if (item !== "") {
					this._items[this._count] = item;
					this._count++;
				}
			});
		} else {
			this._items[this._count] = item;
			this._count++;
		}
	}

	toString() {
		let newArray: (string | number)[] = [];
		let finalString: string;
		for (let i = 0; i < this._count; i++) {
			if (this._items[i] !== "") {
				newArray.push(this._items[i]);
			}
		}
		finalString = newArray.join(", ");

		return finalString;
	}
}
