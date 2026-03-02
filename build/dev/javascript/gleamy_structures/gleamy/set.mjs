/// <reference types="./set.d.mts" />
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Ok, toList, prepend as listPrepend } from "../gleam.mjs";
import * as $tree from "../gleamy/red_black_tree_set.mjs";

/**
 * Creates a new empty set with the provided comparison function.
 */
export function new$(compare) {
  return $tree.new$(compare);
}

/**
 * Inserts a new element into the set, if it is not already present.
 */
export function insert(set, member) {
  return $tree.insert(set, member);
}

/**
 * Checks if the set contains a given element.
 */
export function contains(set, member) {
  let $ = $tree.find(set, member);
  if ($ instanceof Ok) {
    return true;
  } else {
    return false;
  }
}

/**
 * Removes an element from the set, if it exists.
 */
export function delete$(set, member) {
  return $tree.delete$(set, member);
}

/**
 * Creates a new set containing only the elements from the original set
 * that satisfy a given predicate function.
 */
export function filter(set, property) {
  return $tree.fold(
    set,
    set,
    (set, i) => {
      let $ = property(i);
      if ($) {
        return set;
      } else {
        return $tree.delete$(set, i);
      }
    },
  );
}

/**
 * Applies a function to every element in the set, accumulating
 * the results with the provided initial accumulator value.
 */
export function fold(set, initial, reducer) {
  return $tree.fold(set, initial, reducer);
}

/**
 * Creates a new set containing the intersection (common elements) of two sets.
 */
export function intersection(first, second) {
  return $tree.fold(
    second,
    $tree.clear(first),
    (a, i) => {
      let $ = $tree.find(first, i);
      if ($ instanceof Ok) {
        return $tree.insert(a, i);
      } else {
        return a;
      }
    },
  );
}

/**
 * Creates a new set containing the union (all elements) of two sets.
 */
export function union(first, second) {
  return $tree.fold(first, second, (a, i) => { return $tree.insert(a, i); });
}

/**
 * Creates a new set containing the elements of the first set except for elements
 * that are also in the second set.
 */
export function difference(set, removal) {
  return $tree.fold(removal, set, (set, i) => { return $tree.delete$(set, i); });
}

/**
 * Returns the number of elements in the set.
 * Time complexity: O(n)
 */
export function count(set) {
  return $tree.fold(set, 0, (a, _) => { return a + 1; });
}

/**
 * Creates a new set from a list of elements and a comparison function.
 */
export function from_list(members, compare) {
  return $list.fold(members, $tree.new$(compare), $tree.insert);
}

/**
 * Converts the set to a list of its elements.
 */
export function to_list(set) {
  return $tree.foldr(set, toList([]), (a, i) => { return listPrepend(i, a); });
}
