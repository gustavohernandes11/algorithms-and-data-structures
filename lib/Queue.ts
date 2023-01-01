export class Queue {
	count: number;
	lowestCount: number;
	items: any;
	constructor() {
		this.count = 0;
		this.lowestCount = 0;
		this.items = {};
	}
	enqueue(newItems: string | string[]) {
		if (newItems instanceof Array) {
			for (const item of newItems) {
				this.items[this.count] = item.trim();
				this.count++;
			}
		} else {
			this.items[this.count] = newItems.trim();
			this.count++;
		}
	}
	dequeue() {
		if (this.items[this.lowestCount] === undefined) return undefined;
		let deletedItem = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		this.count--;
		return deletedItem;
	}
	toString() {
		let array: string[] = [];

		for (let i = this.lowestCount; i < this.count + this.lowestCount; i++) {
			if (this.items[i] !== "") {
				array.push(this.items[i]);
			}
		}

		let finalString = array.join(", ");
		return finalString;
	}
	peek() {
		return this.items[this.lowestCount];
	}
	size() {
		return this.count;
	}
	clear() {
		this.count = 0;
		this.lowestCount = 0;
		this.items = {};
	}
}
