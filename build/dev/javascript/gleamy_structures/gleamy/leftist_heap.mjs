/// <reference types="./leftist_heap.d.mts" />
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Gt } from "../../gleam_stdlib/gleam/order.mjs";
import { Ok, Error, CustomType as $CustomType } from "../gleam.mjs";

class Empty extends $CustomType {}

class Tree extends $CustomType {
  constructor($0, $1, $2, $3) {
    super();
    this[0] = $0;
    this[1] = $1;
    this[2] = $2;
    this[3] = $3;
  }
}

class Heap extends $CustomType {
  constructor(root, compare) {
    super();
    this.root = root;
    this.compare = compare;
  }
}

/**
 * Creates a new empty heap with the provided comparison function.
 */
export function new$(compare) {
  return new Heap(new Empty(), compare);
}

/**
 * Returns the minimum element in the heap, if the heap is not empty.
 * Time complexity: O(1)
 */
export function find_min(heap) {
  let $ = heap.root;
  if ($ instanceof Empty) {
    return new Error(undefined);
  } else {
    let x = $[1];
    return new Ok(x);
  }
}

function make(x, a, b) {
  let _block;
  if (a instanceof Empty) {
    _block = 0;
  } else {
    let r = a[0];
    _block = r;
  }
  let rank_a = _block;
  let _block$1;
  if (b instanceof Empty) {
    _block$1 = 0;
  } else {
    let r = b[0];
    _block$1 = r;
  }
  let rank_b = _block$1;
  let $ = rank_a < rank_b;
  if ($) {
    return new Tree(rank_a + 1, x, b, a);
  } else {
    return new Tree(rank_b + 1, x, a, b);
  }
}

function merge_trees(h1, h2, compare) {
  if (h2 instanceof Empty) {
    return h1;
  } else if (h1 instanceof Empty) {
    return h2;
  } else {
    let y = h2[1];
    let a2 = h2[2];
    let b2 = h2[3];
    let x = h1[1];
    let a1 = h1[2];
    let b1 = h1[3];
    let $ = compare(x, y);
    if ($ instanceof Gt) {
      return make(y, a2, merge_trees(h1, b2, compare));
    } else {
      return make(x, a1, merge_trees(b1, h2, compare));
    }
  }
}

/**
 * Inserts a new item into the heap, preserving the heap property.
 * Time complexity: O(log n)
 */
export function insert(heap, item) {
  return new Heap(
    merge_trees(
      new Tree(1, item, new Empty(), new Empty()),
      heap.root,
      heap.compare,
    ),
    heap.compare,
  );
}

/**
 * Removes and returns the minimum element from the heap, along with the
 * new heap after deletion, if the heap is not empty.
 * Time complexity: O(log n)
 */
export function delete_min(heap) {
  let $ = heap.root;
  if ($ instanceof Empty) {
    return new Error(undefined);
  } else {
    let x = $[1];
    let a = $[2];
    let b = $[3];
    return new Ok([x, new Heap(merge_trees(a, b, heap.compare), heap.compare)]);
  }
}

/**
 * Merges two heaps into a new heap containing all elements from both heaps,
 * preserving the heap property.
 * The given heaps must have the same comparison function.
 * Time complexity: O(log n)
 */
export function merge(heap1, heap2) {
  let compare = heap1.compare;
  return new Heap(merge_trees(heap1.root, heap2.root, compare), compare);
}
