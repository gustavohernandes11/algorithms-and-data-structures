import {expect, it, describe} from "@jest/globals";
import {DoubleLinkedList} from "../lib/DoubleLinkedList";

describe("DoubleLinkedList", () => {
	describe("push()", () => {
		it("should push the items in the DoubleLinkedList", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);
			doubleList.push(3);
			doubleList.push(4);
			doubleList.push([5, 6, 7, 8]);

			expect(doubleList.size()).toBe(8);
		});
		it("should return undefined neither push anything when parameter is invalid", () => {
			const doubleList = new DoubleLinkedList();

			let returnedValue = doubleList.push("");
			expect(returnedValue).toBe(undefined);
		});
	});
	describe("toString()", () => {
		it("should transform the itens in a string representation", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push("2");
			doubleList.push(3);

			expect(doubleList.toString()).toBe("1, 2, 3");
		});
	});
	describe("getElementAt()", () => {
		it("should return the element in the correct index", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);
			doubleList.push(3);
			doubleList.push(4);
			doubleList.push(5);
			doubleList.push(6);

			expect(doubleList.getElementAt(0).value).toBe(1);
			expect(doubleList.getElementAt(1).value).toBe(2);
			expect(doubleList.getElementAt(5).value).toBe(6);
			expect(doubleList.getElementAt(3).value).toBe(4);
			expect(doubleList.getElementAt(999)).toBe(false);
		});
		it("should return the tail if parameter equals to -1", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);
			expect(doubleList.getElementAt(-1).value).toBe(2);
		});
	});
	describe("removeAt()", () => {
		it("should remove the item in the correct index", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);
			doubleList.push(3);

			doubleList.removeAt(2);
			expect(doubleList.toString()).toBe("1, 2");

			doubleList.removeAt(1);
			expect(doubleList.toString()).toBe("1");

			doubleList.removeAt(0);
			expect(doubleList.toString()).toBe("");
		});
		it("should remove the head", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);

			doubleList.removeAt(0);
			expect(doubleList.toString()).toBe("2");
			expect(doubleList.count).toBe(1);
		});
		it("should return the removed item", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push("A");
			const removedItem = doubleList.removeAt(0);
			expect(removedItem.value).toBe("A");
		});
		it("should return undefined if the index is not valid", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push("A");

			let returnedValue = doubleList.removeAt(999);
			expect(returnedValue).toBe(undefined);

			returnedValue = doubleList.removeAt(-1);
			expect(returnedValue).toBe(undefined);
		});
	});
	describe("insert()", () => {
		it("should insert the item in the given index", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.insert(1, 0);
			doubleList.insert(2, 1);
			doubleList.insert(3, 2);

			doubleList.insert("Hey", 2);
			expect(doubleList.toString()).toBe("1, 2, Hey, 3");

			doubleList.insert("4", 4);
			expect(doubleList.toString()).toBe("1, 2, Hey, 3, 4");
		});
		it("should return false if the given parameters are invalids", () => {
			const doubleList = new DoubleLinkedList();

			let returnedValue = doubleList.insert(1, -999);
			expect(returnedValue).toBe(false);

			returnedValue = doubleList.insert(2, 999);
			expect(returnedValue).toBe(false);

			returnedValue = doubleList.insert(3, 10);
			expect(returnedValue).toBe(false);
		});
		it("should replace the head if necessary", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.insert(2, 0);
			doubleList.insert(1, 0);

			expect(doubleList.getElementAt(0).value).toBe(1);
			expect(doubleList.toString()).toBe("1, 2");
		});
	});
	describe("remove()", () => {
		it("should remove the parameter item", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);
			doubleList.push(3);
			doubleList.push(4);

			doubleList.remove(3);
			expect(doubleList.toString()).toBe("1, 2, 4");

			doubleList.remove(4);
			expect(doubleList.toString()).toBe("1, 2");

			doubleList.remove(1);
			expect(doubleList.toString()).toBe("2");
		});
		it("should return false if the item was not found", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.push(2);

			let returnedValue = doubleList.remove(3);

			expect(returnedValue).toBe(false);
		});
	});
	describe("size()", () => {
		it("should return the list length", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push(1);
			doubleList.insert(2, 1);
			doubleList.insert(2, 999); // invalid
			doubleList.push(""); // invalid

			expect(doubleList.size()).toBe(2);

			doubleList.removeAt(1);
			doubleList.removeAt(0);

			expect(doubleList.size()).toBe(0);
		});
	});
	describe("indexOf()", () => {
		it("should return the index of the given parameter item", () => {
			const doubleList = new DoubleLinkedList();
			doubleList.push("First");
			doubleList.push("Second");
			doubleList.push("Third");

			let index = doubleList.indexOf("First");
			expect(index).toBe(0);

			index = doubleList.indexOf("Second");
			expect(index).toBe(1);

			index = doubleList.indexOf("Third");
			expect(index).toBe(2);

			index = doubleList.indexOf("Fourth");
			expect(index).toBe(-1);
		});
	});
	describe("isEmpty", () => {
		it("should return true if the linkedList is empty", () => {
			const doubleList = new DoubleLinkedList();
			expect(doubleList.isEmpty()).toBe(true);

			doubleList.push("Item");
			expect(doubleList.isEmpty()).toBe(false);
		});
	});
});
