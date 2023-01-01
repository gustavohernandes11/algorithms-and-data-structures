import {expect, it, describe} from "@jest/globals";
import {Deque} from "../lib/Deque";

describe("Deque", () => {
	describe("toString()", () => {
		it("should return the items as an string", () => {
			const deque = new Deque();
			expect(deque.toString()).toBe("");
			deque.addFront("B");
			deque.addFront("A");
			expect(deque.toString()).toBe("A, B");
		});
		it("should format the items correctly", () => {
			const deque = new Deque();
			deque.addFront(" A");
			deque.addFront("B ");
			deque.addFront(" C ");
			deque.addFront(" 24.32 ");

			const expectedToString = "24.32, C, B, A";
			expect(deque.toString()).toBe(expectedToString);
		});
	});
	describe("addFront()", () => {
		it("should add the items in front of deque", () => {
			const deque = new Deque();
			deque.addFront("C");
			expect(deque.toString()).toBe("C");
			deque.addFront("B");
			expect(deque.toString()).toBe("B, C");
			deque.addFront("A");
			expect(deque.toString()).toBe("A, B, C");
		});
		it("should accept an array as parameter", () => {
			const deque = new Deque();
			deque.addFront(["C", "D"]);
			expect(deque.toString()).toBe("C, D");
			deque.addFront(["A", "B"]);
			expect(deque.toString()).toBe("A, B, C, D");
		});
	});
	describe("addBack()", () => {
		it("should add the itens in the end of deque", () => {
			const deque = new Deque();
			deque.addBack("A");
			deque.addBack("B");
			deque.addBack("C");
			deque.addBack(["D", "E"]);

			expect(deque.toString()).toBe("A, B, C, D, E");
		});
		it("should accept an array as well", () => {
			const deque = new Deque();
			deque.addBack(["C", "D"]);
			expect(deque.toString()).toBe("C, D");
			deque.addBack(["A", "B"]);
			expect(deque.toString()).toBe("C, D, A, B");
		});
	});
	describe("removeBack()", () => {
		it("should delete the last item in the deque", () => {
			const deque = new Deque();
			deque.addFront(["A", "B", "C"]);
			deque.addBack(["D"]);

			expect(deque.toString()).toBe("A, B, C, D");
			deque.removeBack();

			expect(deque.toString()).toBe("A, B, C");
		});

		it("should return undefined without any internal changes when deque is empty", () => {
			const deque = new Deque();
			const returnedValue = deque.removeBack();

			expect(returnedValue).toBe(undefined);
			expect(deque._count).toBe(0);
			expect(deque._lowestCount).toBe(0);
		});
	});
	describe("peekFront()", () => {
		it("should return the first item without any internal changes", () => {
			const deque = new Deque();
			deque.addFront(["A", "B", "C", "D"]);

			expect(deque.peekFront()).toBe("A");
			deque.removeFront();

			expect(deque.peekFront()).toBe("B");
		});
	});
	describe("peekBack()", () => {
		it("should return the last item", () => {
			const deque = new Deque();
			deque.addBack(["A", "B", "C"]);

			expect(deque.peekBack()).toBe("C");
			deque.removeBack();
			expect(deque.peekBack()).toBe("B");
		});
		it("should not do any changes", () => {
			const deque = new Deque();
			deque.addBack(["A", "B", "C"]);

			expect(deque._count).toBe(3);
			expect(deque._lowestCount).toBe(0);

			deque.peekBack();

			expect(deque._count).toBe(3);
			expect(deque._lowestCount).toBe(0);
		});
	});
	describe("size()", () => {
		it("should return the deque size", () => {
			const deque = new Deque();
			expect(deque.size()).toBe(0);

			deque.addFront(["B", "C", "D", "E"]);
			expect(deque.size()).toBe(4);

			deque.removeBack();
			expect(deque.size()).toBe(3);

			deque.removeFront();
			expect(deque.size()).toBe(2);

			deque.addFront("A");
			expect(deque.size()).toBe(3);
		});
	});
});

// • addFront(element): esse método adiciona um novo elemento na frente do deque.
// • addBack(element): esse método adiciona um novo elemento no fim do deque (a mesma implementação do método enqueue da classe Queue).
// • removeFront(): esse método remove o primeiro elemento do deque (a mesma implementação do método dequeue da classe Queue).
// • removeBack(): esse método remove o último elemento do deque (a mesma implementação do método pop da classe Stack).
// • peekFront(): esse método devolve o primeiro elemento do deque (a mesma implementação do método peek da classe Queue).
// • peekBack(): esse método devolve o último elemento do deque (a mesma implementação do método peek da classe Stack).
// isEmpty, clear, size e toString.
