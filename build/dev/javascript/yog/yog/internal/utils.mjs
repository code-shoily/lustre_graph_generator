/// <reference types="./utils.d.mts" />
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import { Ok, toList, prepend as listPrepend } from "../../gleam.mjs";

function do_range(loop$current, loop$end, loop$acc) {
  while (true) {
    let current = loop$current;
    let end = loop$end;
    let acc = loop$acc;
    let $ = current > end;
    if ($) {
      return acc;
    } else {
      loop$current = current + 1;
      loop$end = end;
      loop$acc = listPrepend(current, acc);
    }
  }
}

/**
 * Returns a list of integers from `start` to `end` (inclusive).
 * This is a replacement for the deprecated `list.range`.
 *
 * ## Examples
 *
 * ```gleam
 * range(1, 5)
 * // => [1, 2, 3, 4, 5]
 *
 * range(0, 3)
 * // => [0, 1, 2, 3]
 * ```
 */
export function range(start, end) {
  let _pipe = do_range(start, end, toList([]));
  return $list.reverse(_pipe);
}

/**
 * Updates an inner dictionary within a nested dictionary structure.
 */
export function dict_update_inner(outer, key1, key2, fun) {
  let $ = $dict.get(outer, key1);
  if ($ instanceof Ok) {
    let inner = $[0];
    return $dict.insert(outer, key1, fun(inner, key2));
  } else {
    return outer;
  }
}
