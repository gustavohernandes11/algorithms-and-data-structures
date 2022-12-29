export class Stack {
	count: number;
	items: any;

	constructor() {
		this.count = 0;
		this.items = {};
	}
	peek() {
		return this.items[this.count - 1];
	}
	pop() {
		let poppedItem = this.items[this.count - 1];
		delete this.items[this.count - 1];
		this.count--;
		return poppedItem;
	}
	push(item: string | string[]) {
		if (item instanceof Array) {
			item.forEach((item) => {
				if (item !== "") {
					this.items[this.count] = item;
					this.count++;
				}
			});
		} else {
			this.items[this.count] = item;
			this.count++;
		}
	}

	toString() {
		let newArray: (string | number)[] = [];
		let finalString: string;
		if (!!this.items) {
			for (let i = 0; i < this.count; i++) {
				if (this.items[i] !== "") {
					newArray.push(this.items[i]);
				}
			}
			finalString = newArray.join(", ");
		} else {
			finalString = "";
		}
		return finalString;
	}
}
