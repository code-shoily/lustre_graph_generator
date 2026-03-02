/// <reference types="./map.d.mts" />
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Ok, toList, Empty as $Empty, prepend as listPrepend } from "../gleam.mjs";
import * as $tree from "../gleamy/red_black_tree_map.mjs";

/**
 * Creates a new empty map with the provided comparison function for keys.
 */
export function new$(compare) {
  return $tree.new$(compare);
}

/**
 * Inserts a new key-value pair into the map, overwriting the value if the key
 * already exists.
 */
export function insert(map, key, value) {
  return $tree.insert(map, key, value);
}

/**
 * Get the value associated with a given key in the map, if present.
 */
export function get(map, key) {
  return $tree.find(map, key);
}

/**
 * Checks if the map contains a given key.
 */
export function has_key(map, key) {
  let $ = $tree.find(map, key);
  if ($ instanceof Ok) {
    return true;
  } else {
    return false;
  }
}

/**
 * Removes a key-value pair from the map, if the key exists.
 */
export function delete$(map, key) {
  return $tree.delete$(map, key);
}

/**
 * Returns the number of key-value pairs in the map.
 * Time complexity: O(n)
 */
export function count(map) {
  return $tree.fold(map, 0, (a, _, _1) => { return a + 1; });
}

/**
 * Applies a function to every key-value pair in the map, accumulating
 * the results with the provided initial accumulator value.
 */
export function fold(map, initial, reducer) {
  return $tree.fold(map, initial, reducer);
}

/**
 * Creates a new map containing only the key-value pairs from the original map
 * that satisfy a given predicate function.
 */
export function filter(map, property) {
  return $tree.fold(
    map,
    map,
    (map, k, v) => {
      let $ = property(k, v);
      if ($) {
        return map;
      } else {
        return $tree.delete$(map, k);
      }
    },
  );
}

/**
 * Merges two maps into a new map, keeping values from the second map
 * if keys collide.
 */
export function merge(dict, new_entries) {
  return $tree.fold(
    new_entries,
    dict,
    (a, k, v) => { return $tree.insert(a, k, v); },
  );
}

/**
 * Creates a new map containing only the key-value pairs from the original map
 * where the keys are present in the given list of desired keys.
 */
export function take(loop$map, loop$desired) {
  while (true) {
    let map = loop$map;
    let desired = loop$desired;
    if (desired instanceof $Empty) {
      return $tree.clear(map);
    } else {
      let x = desired.head;
      let xs = desired.tail;
      let $ = $tree.find(map, x);
      if ($ instanceof Ok) {
        let v = $[0];
        return $tree.insert(take(map, xs), x, v);
      } else {
        loop$map = map;
        loop$desired = xs;
      }
    }
  }
}

/**
 * Creates a new map from a list of key-value pairs and a comparison function
 * for keys.
 */
export function from_list(members, compare) {
  return $list.fold(
    members,
    $tree.new$(compare),
    (tree, i) => { return $tree.insert(tree, i[0], i[1]); },
  );
}

/**
 * Converts the map to a list of key-value pairs.
 */
export function to_list(map) {
  return $tree.foldr(
    map,
    toList([]),
    (a, k, v) => { return listPrepend([k, v], a); },
  );
}
