import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as $pairing_heap from "../../gleamy_structures/gleamy/pairing_heap.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export function lexicographical_topological_sort<ATAO>(
  graph: $model.Graph$<ATAO, any>,
  compare_nodes: (x0: ATAO, x1: ATAO) => $order.Order$
): _.Result<_.List<number>, undefined>;

export function topological_sort(graph: $model.Graph$<any, any>): _.Result<
  _.List<number>,
  undefined
>;
