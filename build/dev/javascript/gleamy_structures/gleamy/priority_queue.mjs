/// <reference types="./priority_queue.d.mts" />
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Ok, toList, prepend as listPrepend } from "../gleam.mjs";
import * as $heap from "../gleamy/pairing_heap.mjs";

/**
 * Creates a new empty priority queue with the provided comparison function.
 */
export function new$(compare) {
  return $heap.new$(compare);
}

/**
 * Removes and returns the minimum element from the priority queue,
 * along with the new queue.
 */
export function pop(queue) {
  return $heap.delete_min(queue);
}

/**
 * Returns the minimum element in the priority queue without removing it.
 */
export function peek(queue) {
  return $heap.find_min(queue);
}

/**
 * Inserts a new element into the priority queue.
 */
export function push(queue, item) {
  return $heap.insert(queue, item);
}

/**
 * Checks whether the priority queue is empty or not.
 */
export function is_empty(queue) {
  let $ = $heap.find_min(queue);
  if ($ instanceof Ok) {
    return false;
  } else {
    return true;
  }
}

/**
 * Returns the number of elements in the priority queue.
 */
export function count(queue) {
  let $ = $heap.delete_min(queue);
  if ($ instanceof Ok) {
    let q = $[0][1];
    return count(q) + 1;
  } else {
    return 0;
  }
}

/**
 * Rebuilds the priority queue with a new comparison function.
 */
export function reorder(queue, compare) {
  let $ = $heap.delete_min(queue);
  if ($ instanceof Ok) {
    let x = $[0][0];
    let q = $[0][1];
    return $heap.insert(reorder(q, compare), x);
  } else {
    return $heap.new$(compare);
  }
}

/**
 * Creates a new priority queue from a list of elements and a comparison function.
 */
export function from_list(list, compare) {
  return $list.fold(list, new$(compare), $heap.insert);
}

/**
 * Converts the priority queue to a list, preserving the order of elements.
 */
export function to_list(queue) {
  let $ = $heap.delete_min(queue);
  if ($ instanceof Ok) {
    let x = $[0][0];
    let q = $[0][1];
    return listPrepend(x, to_list(q));
  } else {
    return toList([]);
  }
}
