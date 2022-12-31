import {expect, it, describe} from "@jest/globals";
import {Stack} from "../lib/Stack";

describe("Stack", () => {
	describe("toString()", () => {
		it("should return a empty list initialy", () => {
			let stack = new Stack();

			expect(stack.toString()).toBe("");
		});
		it("should return string with the corret format", () => {
			let stack = new Stack();
			stack.push("A");
			stack.push("B");
			stack.push(["C", "D", "E"]);

			let valueExpected = "A, B, C, D, E";
			expect(stack.toString()).toBe(valueExpected);
		});
	});
	describe("push()", () => {
		it("should push the itens into the stack", () => {
			let stack = new Stack();
			stack.push("A");
			stack.push("B");
			stack.push("C");

			expect(stack.toString()).toBe("A, B, C");
		});
		it("should accept an array as parameter", () => {
			let stack = new Stack();
			stack.push(["A", "B", "C", "D"]);

			expect(stack.toString()).toBe("A, B, C, D");
			expect(stack._count).toBe(4);
		});
		it("should ignore empty strings", () => {
			let stack = new Stack();
			stack.push(["A", "", "", "B"]);

			expect(stack.toString()).toBe("A, B");
			expect(stack._count).toBe(2);
		});
	});
	describe("pop()", () => {
		it("should always pop the 'last in' item in the stack", () => {
			let stack = new Stack();
			stack.push(["A", "B", "C"]);
			stack.pop();
			expect(stack.toString()).toBe("A, B");
			stack.pop();
			expect(stack.toString()).toBe("A");
		});
		it("should do nothing when pop() is called in an empty stack", () => {
			let stack = new Stack();
			stack.pop();

			expect(stack.toString()).toBe("");
			expect(stack.isEmpty()).toBe(true);
		});
	});
	describe("peek()", () => {
		it("should always peek the 'last in' item", () => {
			let stack = new Stack();
			stack.push("A");
			expect(stack.peek()).toBe("A");
			stack.push("B");
			expect(stack.peek()).toBe("B");
		});
		it("should return undefined if stack is empty", () => {
			let stack = new Stack();
			expect(stack.peek()).toBe(undefined);
		});
	});
	describe("isEmpty()", () => {
		it("should return true if empty", () => {
			let stack = new Stack();
			expect(stack.isEmpty()).toBe(true);
			stack.push(["A"]);
			expect(stack.isEmpty()).toBe(false);
			stack.pop();
			expect(stack.isEmpty()).toBe(true);
		});
		it("should return true after clear() method", () => {
			let stack = new Stack();

			stack.push(["A", "B", "C"]);
			stack.clear();
			expect(stack.isEmpty()).toBe(true);
		});
	});
	describe("clear()", () => {
		it("should clear all the items", () => {
			let stack = new Stack();
			stack.push(["A", "B", "C"]);
			stack.clear();
			expect(stack.toString()).toBe("");
			expect(stack.isEmpty()).toBe(true);
		});
		it("should reset the stack completely", () => {
			let cleanedStack = new Stack();
			let stackWithNoChanges = new Stack();
			cleanedStack.push(["A", "B", "C"]);
			cleanedStack.clear();

			expect(cleanedStack.toString()).toBe(stackWithNoChanges.toString());
			expect(cleanedStack._items).toStrictEqual(
				stackWithNoChanges._items
			);
			expect(cleanedStack._count).toBe(stackWithNoChanges._count);
		});
	});
});
