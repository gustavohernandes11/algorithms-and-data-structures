import {expect, it, describe} from "@jest/globals";
import {Queue} from "../lib/Queue";

describe("Queue", () => {
	describe("toString()", () => {
		it("should return the items as an string", () => {
			const queue = new Queue();
			queue.enqueue(["A", "B", "C"]);
			queue.dequeue();

			expect(queue.toString()).toBe("B, C");
		});
		it("should format the items correctly", () => {
			const queue = new Queue();
			queue.enqueue(" A");
			queue.enqueue("B ");
			queue.enqueue(" C ");
			queue.enqueue(" 24.32 ");

			const expectedToString = "A, B, C, 24.32";
			expect(queue.toString()).toBe(expectedToString);
		});
	});
	describe("enqueue()", () => {
		it("should put the itens in the end of queue", () => {
			const queue = new Queue();
			queue.enqueue("A");
			queue.enqueue("B");
			queue.enqueue("C");

			const queueItems = queue.toString();
			expect(queueItems).toBe("A, B, C");
		});
		it("should accept array as parameter", () => {
			const queue = new Queue();
			queue.enqueue(["A", "B", "C", "D", "E"]);

			const queueItems = queue.toString();
			const count = queue.count;
			expect(queueItems).toBe("A, B, C, D, E");
			expect(count).toBe(5);
		});
	});
	describe("dequeue()", () => {
		it("should return the deleted item", () => {
			const queue = new Queue();
			queue.enqueue(["A", "B", "C", "D", "E"]);
			let deletedItem = queue.dequeue();
			expect(deletedItem).toBe("A");
			deletedItem = queue.dequeue();
			expect(deletedItem).toBe("B");
		});
		it("should always delete the first element", () => {
			const queue = new Queue();

			queue.enqueue(["A", "B", "C", "D", "E"]);
			expect(queue.count).toBe(5);
			expect(queue.lowestCount).toBe(0);
			expect(queue.toString()).toBe("A, B, C, D, E");

			queue.dequeue();
			expect(queue.count).toBe(4);
			expect(queue.lowestCount).toBe(1);
			expect(queue.toString()).toBe("B, C, D, E");

			queue.dequeue();
			expect(queue.count).toBe(3);
			expect(queue.lowestCount).toBe(2);
			expect(queue.toString()).toBe("C, D, E");

			queue.dequeue();
			expect(queue.count).toBe(2);
			expect(queue.lowestCount).toBe(3);
			expect(queue.toString()).toBe("D, E");
		});
		it("should just return undefined when items is empty", () => {
			const queue = new Queue();
			const returnedValue = queue.dequeue();
			expect(returnedValue).toBe(undefined);
			expect(queue.count).toBe(0);
			expect(queue.lowestCount).toBe(0);
		});
	});
	describe("peek()", () => {
		it("should return the next item in queue", () => {
			const queue = new Queue();
			queue.enqueue("A");
			queue.enqueue("B");
			const returnedValue = queue.peek();

			expect(returnedValue).toBe("A");
		});
		it("should not change any internal property", () => {
			const queue = new Queue();
			queue.enqueue(["A", "B"]);
			queue.peek();

			expect(queue.count).toBe(2);
			expect(queue.lowestCount).toBe(0);
			expect(queue.items).toStrictEqual({0: "A", 1: "B"});
		});
		it("should return undefined when items is empty", () => {
			const queue = new Queue();
			expect(queue.peek()).toBe(undefined);
		});
	});
	describe("size()", () => {
		it("should return the queue size", () => {
			const queue = new Queue();
			expect(queue.size()).toBe(0);

			queue.dequeue();
			expect(queue.size()).toBe(0);

			queue.enqueue(["A", "B", "C"]);
			expect(queue.size()).toBe(3);

			queue.dequeue();
			expect(queue.size()).toBe(2);
		});
	});
	describe("clear()", () => {
		it("should clear all the queue", () => {
			const queue = new Queue();
			queue.enqueue(["A", "B", "C"]);
			queue.clear();

			expect(queue.count).toBe(0);
			expect(queue.lowestCount).toBe(0);
			expect(queue.items).toStrictEqual({});
		});
	});
});
