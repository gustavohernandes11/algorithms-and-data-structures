type ValidDataTypes = string | number;
export class Set {
	items: any = {};
	count = 0;

	addOrUpdate(element: ValidDataTypes) {
		if (element != null && element !== "") {
			if (this.items[element] == null) {
				this.items[element] = element;
				this.count++;
			} else {
				this.items[element] = element;
			}
		}
	}
	add(item: ValidDataTypes | ValidDataTypes[]) {
		if (item instanceof Array) {
			item.forEach((element) => {
				this.addOrUpdate(element);
			});
		} else {
			this.addOrUpdate(item);
		}
	}
	delete(items: ValidDataTypes | ValidDataTypes[]) {
		const deleteElement = (element: ValidDataTypes) => {
			if (this.items[element]) {
				delete this.items[element] === undefined;
				this.count--;
			}
		};

		if (items == null && items == "") return false;

		if (items instanceof Array) {
			items.forEach((element) => deleteElement(element));
		} else {
			deleteElement(items);
			return true;
		}
	}
	values() {
		if (this.count === 0) return [];
		let values: ValidDataTypes[] = [];
		Object.keys(this.items).forEach((element) => {
			values.push(element.toString());
		});
		return values;
	}
	has(element: ValidDataTypes) {
		return !!this.items[element];
	}
	clear() {
		this.count = 0;
		this.items = {};
	}
	size() {
		return this.count;
	}

	union(otherSet: Set) {
		let unionSet = new Set();
		if (otherSet.size() === 0) {
			unionSet = Object.assign(this);
			return unionSet;
		}
		this.values().forEach((element: ValidDataTypes) => {
			unionSet.addOrUpdate(element);
		});
		otherSet.values().forEach((element: ValidDataTypes) => {
			unionSet.addOrUpdate(element);
		});
		return unionSet;
	}
	intersection(otherSet: Set) {
		let intersectionSet = new Set();
		const existsInBothSets = (element: ValidDataTypes) => {
			return !!(otherSet.items[element] && this.items[element]);
		};

		if (otherSet.size() === 0 || this.size() === 0) {
			return intersectionSet;
		}
		otherSet.values().forEach((element: ValidDataTypes) => {
			if (existsInBothSets(element)) {
				intersectionSet.add(element);
			}
		});

		return intersectionSet;
	}
	difference(otherSet: Set) {
		let differenceSet = Object.assign(this);

		if (otherSet.size() === 0) {
			return differenceSet;
		}

		this.values().forEach((element: ValidDataTypes) => {
			if (otherSet.has(element)) {
				differenceSet.delete(element);
			}
		});

		return differenceSet;
	}
	isSubsetOf(otherSet: Set) {
		if (this.size() > otherSet.size()) return false;

		otherSet.values().forEach((element: ValidDataTypes) => {
			if (!this.has(element)) return false;
		});
		return true;
	}
}
