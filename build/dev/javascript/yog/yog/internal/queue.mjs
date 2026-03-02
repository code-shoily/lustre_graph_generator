/// <reference types="./queue.d.mts" />
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../../gleam.mjs";

export class Queue extends $CustomType {
  constructor(front, back) {
    super();
    this.front = front;
    this.back = back;
  }
}
export const Queue$Queue = (front, back) => new Queue(front, back);
export const Queue$isQueue = (value) => value instanceof Queue;
export const Queue$Queue$front = (value) => value.front;
export const Queue$Queue$0 = (value) => value.front;
export const Queue$Queue$back = (value) => value.back;
export const Queue$Queue$1 = (value) => value.back;

/**
 * Creates a new empty queue.
 */
export function new$() {
  return new Queue(toList([]), toList([]));
}

/**
 * Adds a single item to the back of the queue. O(1).
 */
export function push(queue, item) {
  return new Queue(queue.front, listPrepend(item, queue.back));
}

/**
 * Adds multiple items to the back of the queue. O(n) where n is the length of items.
 *
 * Since the back list is in reverse order (to support O(1) push),
 * we need to reverse the items before prepending them to maintain correct order.
 */
export function push_list(queue, items) {
  return new Queue(queue.front, $list.append($list.reverse(items), queue.back));
}

/**
 * Removes and returns the front item from the queue. O(1) amortized.
 *
 * Returns `Ok(#(item, new_queue))` if the queue is not empty,
 * or `Error(Nil)` if the queue is empty.
 */
export function pop(queue) {
  let $ = queue.front;
  if ($ instanceof $Empty) {
    let $1 = $list.reverse(queue.back);
    if ($1 instanceof $Empty) {
      return new Error(undefined);
    } else {
      let item = $1.head;
      let rest = $1.tail;
      return new Ok([item, new Queue(rest, toList([]))]);
    }
  } else {
    let item = $.head;
    let rest = $.tail;
    return new Ok([item, new Queue(rest, queue.back)]);
  }
}
