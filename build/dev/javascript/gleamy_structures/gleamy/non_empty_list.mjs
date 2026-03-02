/// <reference types="./non_empty_list.d.mts" />
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";

export class End extends $CustomType {
  constructor(first) {
    super();
    this.first = first;
  }
}
export const NonEmptyList$End = (first) => new End(first);
export const NonEmptyList$isEnd = (value) => value instanceof End;
export const NonEmptyList$End$first = (value) => value.first;
export const NonEmptyList$End$0 = (value) => value.first;

export class Next extends $CustomType {
  constructor(first, rest) {
    super();
    this.first = first;
    this.rest = rest;
  }
}
export const NonEmptyList$Next = (first, rest) => new Next(first, rest);
export const NonEmptyList$isNext = (value) => value instanceof Next;
export const NonEmptyList$Next$first = (value) => value.first;
export const NonEmptyList$Next$0 = (value) => value.first;
export const NonEmptyList$Next$rest = (value) => value.rest;
export const NonEmptyList$Next$1 = (value) => value.rest;

export const NonEmptyList$first = (value) => value.first;

/**
 * Applies a function to every element in the non-empty list, accumulating
 * the results with the provided initial accumulator value.
 */
export function fold(loop$list, loop$initial, loop$fun) {
  while (true) {
    let list = loop$list;
    let initial = loop$initial;
    let fun = loop$fun;
    if (list instanceof End) {
      let item = list.first;
      return fun(initial, item);
    } else {
      let x = list.first;
      let xs = list.rest;
      loop$list = xs;
      loop$initial = fun(initial, x);
      loop$fun = fun;
    }
  }
}

/**
 * Returns the count (number of elements) in the non-empty list.
 * Time complexity: O(n)
 */
export function count(list) {
  return fold(list, 0, (acc, _) => { return acc + 1; });
}

/**
 * Filters the elements of the non-empty list based on a predicate function
 * and returns a (potentially empty) list with the elements that satisfy the predicate.
 */
export function filter(list, predicate) {
  let _pipe = fold(
    list,
    toList([]),
    (acc, item) => {
      let $ = predicate(item);
      if ($) {
        return listPrepend(item, acc);
      } else {
        return acc;
      }
    },
  );
  return $list.reverse(_pipe);
}

/**
 * Converts the non-empty list to a regular (potentially empty) list.
 */
export function to_list(list) {
  let _pipe = fold(
    list,
    toList([]),
    (acc, item) => { return listPrepend(item, acc); },
  );
  return $list.reverse(_pipe);
}

/**
 * Tries to create a non-empty list from a regular (potentially empty) list.
 * Returns an error if the input list is empty.
 */
export function from_list(list) {
  if (list instanceof $Empty) {
    return new Error(undefined);
  } else {
    let x = list.head;
    let xs = list.tail;
    return new Ok(
      $list.fold(xs, new End(x), (acc, item) => { return new Next(item, acc); }),
    );
  }
}

/**
 * Reverses the order of elements in the non-empty list.
 */
export function reverse(list) {
  if (list instanceof End) {
    return list;
  } else {
    let x = list.first;
    let xs = list.rest;
    return fold(xs, new End(x), (acc, x) => { return new Next(x, acc); });
  }
}

/**
 * Applies a transformation function to every element in the non-empty list
 * and returns a new non-empty list with the transformed elements.
 */
export function map(list, transform) {
  if (list instanceof End) {
    let x = list.first;
    return new End(transform(x));
  } else {
    let x = list.first;
    let xs = list.rest;
    let _pipe = fold(
      xs,
      new End(transform(x)),
      (acc, item) => { return new Next(transform(item), acc); },
    );
    return reverse(_pipe);
  }
}
