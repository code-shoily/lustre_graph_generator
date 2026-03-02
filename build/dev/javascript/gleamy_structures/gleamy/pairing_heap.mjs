/// <reference types="./pairing_heap.d.mts" />
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Gt } from "../../gleam_stdlib/gleam/order.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";

class Empty extends $CustomType {}

class Tree extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
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
    let x = $[0];
    return new Ok(x);
  }
}

function merge_trees(x, y, compare) {
  if (y instanceof Empty) {
    return x;
  } else if (x instanceof Empty) {
    return y;
  } else {
    let yk = y[0];
    let ys = y[1];
    let xk = x[0];
    let xs = x[1];
    let $ = compare(xk, yk);
    if ($ instanceof Gt) {
      return new Tree(yk, listPrepend(x, ys));
    } else {
      return new Tree(xk, listPrepend(y, xs));
    }
  }
}

/**
 * Inserts a new item into the heap, preserving the heap property.
 * Time complexity: O(1)
 */
export function insert(heap, key) {
  return new Heap(
    merge_trees(new Tree(key, toList([])), heap.root, heap.compare),
    heap.compare,
  );
}

/**
 * Merges two heaps into a new heap containing all elements from both heaps,
 * preserving the heap property.
 * The given heaps must have the same comparison function.
 * Time complexity: O(1)
 */
export function merge(heap1, heap2) {
  let compare = heap1.compare;
  return new Heap(merge_trees(heap1.root, heap2.root, compare), compare);
}

function merge_pairs(l, compare) {
  if (l instanceof $Empty) {
    return new Empty();
  } else {
    let $ = l.tail;
    if ($ instanceof $Empty) {
      let h = l.head;
      return h;
    } else {
      let h1 = l.head;
      let h2 = $.head;
      let hs = $.tail;
      return merge_trees(
        merge_trees(h1, h2, compare),
        merge_pairs(hs, compare),
        compare,
      );
    }
  }
}

/**
 * Removes and returns the minimum element from the heap along with the
 * new heap after deletion, if the heap is not empty.
 * Time complexity: O(log n) amortized
 */
export function delete_min(heap) {
  let $ = heap.root;
  if ($ instanceof Empty) {
    return new Error(undefined);
  } else {
    let x = $[0];
    let xs = $[1];
    return new Ok([x, new Heap(merge_pairs(xs, heap.compare), heap.compare)]);
  }
}
