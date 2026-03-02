/// <reference types="./disjoint_set.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import { Ok, toList, prepend as listPrepend, CustomType as $CustomType, isEqual } from "../gleam.mjs";

export class DisjointSet extends $CustomType {
  constructor(parents, ranks) {
    super();
    this.parents = parents;
    this.ranks = ranks;
  }
}
export const DisjointSet$DisjointSet = (parents, ranks) =>
  new DisjointSet(parents, ranks);
export const DisjointSet$isDisjointSet = (value) =>
  value instanceof DisjointSet;
export const DisjointSet$DisjointSet$parents = (value) => value.parents;
export const DisjointSet$DisjointSet$0 = (value) => value.parents;
export const DisjointSet$DisjointSet$ranks = (value) => value.ranks;
export const DisjointSet$DisjointSet$1 = (value) => value.ranks;

/**
 * Creates a new empty disjoint set structure.
 */
export function new$() {
  return new DisjointSet($dict.new$(), $dict.new$());
}

/**
 * Adds a new element to the disjoint set.
 *
 * The element starts in its own singleton set.
 * If the element already exists, the structure is returned unchanged.
 */
export function add(disjoint_set, element) {
  let $ = $dict.has_key(disjoint_set.parents, element);
  if ($) {
    return disjoint_set;
  } else {
    return new DisjointSet(
      $dict.insert(disjoint_set.parents, element, element),
      $dict.insert(disjoint_set.ranks, element, 0),
    );
  }
}

/**
 * Finds the representative (root) of the set containing the element.
 *
 * Uses path compression to flatten the tree structure for future queries.
 * If the element doesn't exist, it's automatically added first.
 *
 * Returns a tuple of `#(updated_disjoint_set, root)`.
 */
export function find(disjoint_set, element) {
  let $ = $dict.get(disjoint_set.parents, element);
  if ($ instanceof Ok) {
    let parent = $[0];
    if (isEqual(parent, element)) {
      return [disjoint_set, element];
    } else {
      let parent = $[0];
      let $1 = find(disjoint_set, parent);
      let updated_disjoint_set;
      let root;
      updated_disjoint_set = $1[0];
      root = $1[1];
      let new_parents = $dict.insert(
        updated_disjoint_set.parents,
        element,
        root,
      );
      return [new DisjointSet(new_parents, updated_disjoint_set.ranks), root];
    }
  } else {
    return [add(disjoint_set, element), element];
  }
}

/**
 * Merges the sets containing the two elements.
 *
 * Uses union by rank to keep the tree balanced.
 * If the elements are already in the same set, returns unchanged.
 */
export function union(disjoint_set, x, y) {
  let $ = find(disjoint_set, x);
  let disjoint_set1;
  let root_x;
  disjoint_set1 = $[0];
  root_x = $[1];
  let $1 = find(disjoint_set1, y);
  let disjoint_set2;
  let root_y;
  disjoint_set2 = $1[0];
  root_y = $1[1];
  let $2 = isEqual(root_x, root_y);
  if ($2) {
    return disjoint_set2;
  } else {
    let _block;
    let _pipe = $dict.get(disjoint_set2.ranks, root_x);
    _block = $result.unwrap(_pipe, 0);
    let rank_x = _block;
    let _block$1;
    let _pipe$1 = $dict.get(disjoint_set2.ranks, root_y);
    _block$1 = $result.unwrap(_pipe$1, 0);
    let rank_y = _block$1;
    let $3 = rank_x < rank_y;
    if ($3) {
      return new DisjointSet(
        $dict.insert(disjoint_set2.parents, root_x, root_y),
        disjoint_set2.ranks,
      );
    } else {
      let disjoint_set3 = new DisjointSet(
        $dict.insert(disjoint_set2.parents, root_y, root_x),
        disjoint_set2.ranks,
      );
      let $4 = rank_x === rank_y;
      if ($4) {
        return new DisjointSet(
          disjoint_set3.parents,
          $dict.insert(disjoint_set3.ranks, root_x, rank_x + 1),
        );
      } else {
        return disjoint_set3;
      }
    }
  }
}

/**
 * Creates a disjoint set from a list of pairs to union.
 *
 * This is a convenience function for building a disjoint set from edge lists
 * or connection pairs. Perfect for graph problems, AoC, and competitive programming.
 *
 * ## Example
 * ```gleam
 * let dsu = disjoint_set.from_pairs([#(1, 2), #(3, 4), #(2, 3)])
 * // Results in: {1,2,3,4} as one set
 * ```
 */
export function from_pairs(pairs) {
  return $list.fold(
    pairs,
    new$(),
    (dsu, pair) => { return union(dsu, pair[0], pair[1]); },
  );
}

/**
 * Checks if two elements are in the same set (connected).
 *
 * Returns the updated disjoint set (due to path compression) and a boolean result.
 *
 * ## Example
 * ```gleam
 * let dsu = from_pairs([#(1, 2), #(3, 4)])
 * let #(dsu2, result) = connected(dsu, 1, 2)  // => True
 * let #(dsu3, result) = connected(dsu2, 1, 3) // => False
 * ```
 */
export function connected(dsu, x, y) {
  let $ = find(dsu, x);
  let dsu1;
  let root_x;
  dsu1 = $[0];
  root_x = $[1];
  let $1 = find(dsu1, y);
  let dsu2;
  let root_y;
  dsu2 = $1[0];
  root_y = $1[1];
  return [dsu2, isEqual(root_x, root_y)];
}

/**
 * Returns the total number of elements in the structure.
 */
export function size(dsu) {
  return $dict.size(dsu.parents);
}

function find_root_readonly(loop$dsu, loop$element) {
  while (true) {
    let dsu = loop$dsu;
    let element = loop$element;
    let $ = $dict.get(dsu.parents, element);
    if ($ instanceof Ok) {
      let parent = $[0];
      if (isEqual(parent, element)) {
        return element;
      } else {
        let parent = $[0];
        loop$dsu = dsu;
        loop$element = parent;
      }
    } else {
      return element;
    }
  }
}

/**
 * Returns the number of disjoint sets.
 *
 * Counts the distinct sets by finding the unique roots.
 *
 * ## Example
 * ```gleam
 * let dsu = from_pairs([#(1, 2), #(3, 4)])
 * count_sets(dsu)  // => 2 (sets: {1,2} and {3,4})
 * ```
 */
export function count_sets(dsu) {
  let _pipe = $dict.keys(dsu.parents);
  let _pipe$1 = $list.map(
    _pipe,
    (element) => { return find_root_readonly(dsu, element); },
  );
  let _pipe$2 = $set.from_list(_pipe$1);
  return $set.size(_pipe$2);
}

/**
 * Returns all disjoint sets as a list of lists.
 *
 * Each inner list contains all members of one set. The order of sets and
 * elements within sets is unspecified.
 *
 * Note: This operation doesn't perform path compression, so the structure
 * is not modified.
 *
 * ## Example
 * ```gleam
 * let dsu = from_pairs([#(1, 2), #(3, 4), #(5, 6)])
 * to_lists(dsu)  // => [[1, 2], [3, 4], [5, 6]] (order may vary)
 * ```
 */
export function to_lists(dsu) {
  let _pipe = $dict.keys(dsu.parents);
  let _pipe$1 = $list.fold(
    _pipe,
    $dict.new$(),
    (acc, element) => {
      let root = find_root_readonly(dsu, element);
      return $dict.upsert(
        acc,
        root,
        (existing) => {
          if (existing instanceof Some) {
            let members = existing[0];
            return listPrepend(element, members);
          } else {
            return toList([element]);
          }
        },
      );
    },
  );
  return $dict.values(_pipe$1);
}
