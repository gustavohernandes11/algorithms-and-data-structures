import {expect, it, describe} from "@jest/globals";
import {Set} from "../lib/Set";

describe("Set", () => {
	describe("add()", () => {
		it("should add a new item in the set", () => {
			const set = new Set();
			set.add(1);
			expect(set.size()).toBe(1);

			set.add([2, 3, 4, 5, 4, 1]);
			expect(set.size()).toBe(5);
		});
		it("should not add an invalid item", () => {
			const set = new Set();
			set.add("");
			set.add("");
			set.add(["", "", ""]);
			expect(set.size()).toBe(0);
		});
	});
	describe("delete()", () => {
		it("should remove the element from the set", () => {
			const set = new Set();
			set.add([1, 2, 3, 4, 5]);

			set.delete(1);
			expect(set.count).toBe(4);

			set.delete([2, 3]);
			expect(set.count).toBe(2);
		});
	});
	describe("has()", () => {
		it("should return true case the element exists", () => {
			const set = new Set();
			set.add([1, 2, 3, 4, 5]);

			let returnedValue = set.has(1);
			expect(returnedValue).toBe(true);

			returnedValue = set.has(2);
			expect(returnedValue).toBe(true);

			returnedValue = set.has(3);
			expect(returnedValue).toBe(true);
		});
		it("should return false case the elmeent do not exists", () => {
			const set = new Set();
			set.add([1, 2, 3, 4, 5]);

			let returnedValue = set.has(999);
			expect(returnedValue).toBe(false);

			returnedValue = set.has("");
			expect(returnedValue).toBe(false);
		});
	});
	describe("clear()", () => {
		it("should reset the set", () => {
			const set = new Set();
			set.add([1, 2, 3, 4, 5]);
			set.clear();
			expect(set.count).toBe(0);
			expect(set.items).toEqual({});
		});
		it("a reseted set should be equals a cleaned", () => {
			const cleanedSet = new Set();
			const uncleanedSet = new Set();
			cleanedSet.add(["Jhon Doe"]);
			cleanedSet.clear();

			expect(cleanedSet).toEqual(uncleanedSet);
		});
	});
	describe("values()", () => {
		it("should return an array of the items", () => {
			const set = new Set();
			set.add([1, 2, "3", 3]);

			let expectedValue = ["1", "2", "3"];
			let returnedValue = set.values();

			expect(returnedValue).toStrictEqual(expectedValue);
		});
		it("should return [] if set is empty", () => {
			const set = new Set();
			let returnedValue = set.values();
			expect(returnedValue).toEqual([]);
		});
	});
	describe("union()", () => {
		it("should return a new Set union", () => {
			const set1 = new Set();
			const set2 = new Set();

			set1.add([1, 2, 3]);
			set2.add([3, 4, 5, 6]);
			const set3 = set1.union(set2);

			let unionItems = ["1", "2", "3", "4", "5", "6"];

			expect(set3.size()).toBe(6);
			expect(set3.values()).toStrictEqual(unionItems);
			unionItems.forEach((value) => expect(set3.has(value)));
		});
	});

	describe("intersection()", () => {
		it("should return a new Set with common itens between two Sets", () => {
			const set1 = new Set();
			const set2 = new Set();

			set1.add([1, 2, 3]);
			set2.add([2, 3, 4, 5]);
			const set3 = set1.intersection(set2);
			let sharedItems = ["2", "3"];

			expect(set3.values()).toEqual(sharedItems);
		});
		it("should return an empty Set if a Set is empty", () => {
			const set1 = new Set();
			const set2 = new Set();

			set1.add([1, 2, 3]);

			const set3 = set1.intersection(set2);
			expect(set3.size()).toBe(0);
		});
	});
	describe("difference()", () => {
		it("should return the items that only the set that calls the method contains", () => {
			const set1 = new Set();
			const set2 = new Set();

			set1.add([1, 2, 3]);
			set2.add([2, 3]);

			let differenceSet1 = set1.difference(set2);
			expect(differenceSet1.size()).toBe(1);
			expect(differenceSet1.has(1)).toBe(true);
			expect(differenceSet1.has(2)).toBe(false);
			expect(differenceSet1.has(3)).toBe(false);

			let differenceSet2 = set2.difference(set2);
			expect(differenceSet2.size()).toBe(0);
		});
	});
	describe("isSubsetOf()", () => {
		it("should return true case the parameter is a subset", () => {
			const set1 = new Set();
			const set2 = new Set();

			set1.add([1, 2, 3]);
			set2.add([2, 3]);

			expect(set1.isSubsetOf(set2)).toBe(false);
			expect(set2.isSubsetOf(set1)).toBe(true);
		});
		it("should return true if called by a empty Set", () => {
			const set1 = new Set();
			const set2 = new Set();

			set2.add([1, 2, 3]);

			expect(set1.isSubsetOf(set2)).toBe(true);
		});
	});
});

// • União - union: dados dois conjuntos, devolve um novo conjunto com elementos dos dois conjuntos especificados.
// • Intersecção - intersection: dados dois conjuntos, devolve um novo conjunto com os elementos presentes em ambos os conjuntos.
// • Diferença - difference: dados dois conjuntos, devolve um novo conjunto com todos os elementos presentes no primeiro conjunto, mas não no segundo.
// • Subconjunto - subset: confirma se um dado conjunto é um subconjunto de outro.
