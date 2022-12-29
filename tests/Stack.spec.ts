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

			let valueExpected = "A, B";
			expect(stack.toString()).toBe(valueExpected);
		});
	});
	describe("push()", () => {
		it("should push the itens into the stack", () => {
			let stack = new Stack();
			stack.push("Apple");
			stack.push("Banana");
			stack.push("Orange");

			expect(stack.toString()).toBe("Apple, Banana, Orange");
		});
		it("should accept an array as parameter", () => {
			let stack = new Stack();
			stack.push(["Apple", "Lime", "Melon", "Banana"]);

			expect(stack.toString()).toBe("Apple, Lime, Melon, Banana");
		});
		it("should ignore empty strings", () => {
			let stack = new Stack();
			stack.push(["Apple", "", "", "Banana"]);

			expect(stack.toString()).toBe("Apple, Banana");
			expect(stack.count).toBe(2);
		});
	});
	describe("pop()", () => {
		it("should always pop the first item in the stack", () => {
			let stack = new Stack();
			stack.push(["Apple", "Banana", "Orange"]);
			stack.pop();
			expect(stack.toString()).toBe("Apple, Banana");
			stack.pop();
			expect(stack.toString()).toBe("Apple");
		});
		it("should do nothing when pop() is called in an empty stack", () => {
			let stack = new Stack();
			stack.pop();

			expect(stack.toString()).toBe("");
		});
	});
	describe("peek()", () => {
		it("should peek the first item", () => {
			let stack = new Stack();
			stack.push("Apple");
			expect(stack.peek()).toBe("Apple");
			stack.push("Banana");
			expect(stack.peek()).toBe("Banana");
		});
		it("should return undefined if stack is empty", () => {
			let stack = new Stack();
			let expectedValue = undefined;
			expect(stack.peek()).toBe(expectedValue);
		});
	});
});

// • push(element(s)): esse método adiciona um novo elemento (ou vários elementos) no topo da pilha.
// • pop(): esse método remove o elemento que está no topo da pilha. Também devolve o elemento removido.
// • peek(): esse método devolve o elemento que está no topo da pilha. A pilha não é modificada (o elemento não é removido; ele é devolvido apenas como informação).
// • isEmpty(): esse método devolve true se a pilha não contiver nenhum elemento e false se o tamanho da pilha for maior que 0.
// • clear(): esse método remove todos os elementos da pilha.
// • size(): esse método devolve o número de elementos contidos na pilha. É semelhante à propriedade length de um array.
// • toString()
