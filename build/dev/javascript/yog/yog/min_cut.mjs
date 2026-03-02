/// <reference types="./min_cut.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import * as $priority_queue from "../../gleamy_structures/gleamy/priority_queue.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "../gleam.mjs";
import * as $model from "../yog/model.mjs";
import * as $transform from "../yog/transform.mjs";

const FILEPATH = "src/yog/min_cut.gleam";

export class MinCut extends $CustomType {
  constructor(weight, group_a_size, group_b_size) {
    super();
    this.weight = weight;
    this.group_a_size = group_a_size;
    this.group_b_size = group_b_size;
  }
}
export const MinCut$MinCut = (weight, group_a_size, group_b_size) =>
  new MinCut(weight, group_a_size, group_b_size);
export const MinCut$isMinCut = (value) => value instanceof MinCut;
export const MinCut$MinCut$weight = (value) => value.weight;
export const MinCut$MinCut$0 = (value) => value.weight;
export const MinCut$MinCut$group_a_size = (value) => value.group_a_size;
export const MinCut$MinCut$1 = (value) => value.group_a_size;
export const MinCut$MinCut$group_b_size = (value) => value.group_b_size;
export const MinCut$MinCut$2 = (value) => value.group_b_size;

function get_next_mas_node(loop$queue, loop$remaining, loop$weights) {
  while (true) {
    let queue = loop$queue;
    let remaining = loop$remaining;
    let weights = loop$weights;
    let $ = $priority_queue.pop(queue);
    if ($ instanceof Ok) {
      let q_rest = $[0][1];
      let w = $[0][0][0];
      let node = $[0][0][1];
      let $1 = $set.contains(remaining, node);
      if ($1) {
        let _block;
        let $2 = $dict.get(weights, node);
        if ($2 instanceof Ok) {
          let v = $2[0];
          _block = v;
        } else {
          _block = 0;
        }
        let current_weight = _block;
        let $3 = w === current_weight;
        if ($3) {
          return [node, q_rest];
        } else {
          loop$queue = q_rest;
          loop$remaining = remaining;
          loop$weights = weights;
        }
      } else {
        loop$queue = q_rest;
        loop$remaining = remaining;
        loop$weights = weights;
      }
    } else {
      let _block;
      let _pipe = $set.to_list(remaining);
      _block = $list.first(_pipe);
      let $1 = _block;
      let node;
      if ($1 instanceof Ok) {
        node = $1[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "yog/min_cut",
          210,
          "get_next_mas_node",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 6237,
            end: 6297,
            pattern_start: 6248,
            pattern_end: 6256
          }
        )
      }
      return [node, queue];
    }
  }
}

/**
 * Builds the MAS ordering by greedily adding the most tightly connected node.
 * 
 * @ignore
 */
function build_mas_order(
  loop$graph,
  loop$current_order,
  loop$remaining,
  loop$weights,
  loop$queue
) {
  while (true) {
    let graph = loop$graph;
    let current_order = loop$current_order;
    let remaining = loop$remaining;
    let weights = loop$weights;
    let queue = loop$queue;
    let $ = $set.size(remaining);
    if ($ === 0) {
      return current_order;
    } else {
      let $1 = get_next_mas_node(queue, remaining, weights);
      let node;
      let new_queue;
      node = $1[0];
      new_queue = $1[1];
      let new_remaining = $set.delete$(remaining, node);
      let _block;
      let _pipe = $model.neighbors(graph, node);
      _block = $list.fold(
        _pipe,
        [weights, new_queue],
        (acc, edge) => {
          let weights_acc;
          let queue_acc;
          weights_acc = acc[0];
          queue_acc = acc[1];
          let neighbor;
          let weight;
          neighbor = edge[0];
          weight = edge[1];
          let $3 = $set.contains(new_remaining, neighbor);
          if ($3) {
            let _block$1;
            let $4 = $dict.get(weights_acc, neighbor);
            if ($4 instanceof Ok) {
              let v = $4[0];
              _block$1 = v;
            } else {
              _block$1 = 0;
            }
            let existing_w = _block$1;
            let new_w = existing_w + weight;
            return [
              $dict.insert(weights_acc, neighbor, new_w),
              $priority_queue.push(queue_acc, [new_w, neighbor]),
            ];
          } else {
            return acc;
          }
        },
      );
      let $2 = _block;
      let new_weights;
      let updated_queue;
      new_weights = $2[0];
      updated_queue = $2[1];
      loop$graph = graph;
      loop$current_order = listPrepend(node, current_order);
      loop$remaining = new_remaining;
      loop$weights = new_weights;
      loop$queue = updated_queue;
    }
  }
}

function compare_max(a, b) {
  let $ = $int.compare(b[0], a[0]);
  if ($ instanceof $order.Eq) {
    return $int.compare(a[1], b[1]);
  } else {
    return $;
  }
}

/**
 * Maximum Adjacency Search (MAS): finds the two most tightly connected nodes.
 *
 * Returns #(s, t, cut_weight) where:
 * - s: second-to-last node added
 * - t: last node added
 * - cut_weight: sum of edge weights connecting t to the rest of the graph
 *
 * This is similar to Prim's algorithm but picks nodes by maximum total
 * connection weight to the current set, not minimum edge weight.
 * 
 * @ignore
 */
function maximum_adjacency_search(graph) {
  let all_nodes = $model.all_nodes(graph);
  let $ = $list.first(all_nodes);
  let start;
  if ($ instanceof Ok) {
    start = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "yog/min_cut",
      100,
      "maximum_adjacency_search",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 3025,
        end: 3069,
        pattern_start: 3036,
        pattern_end: 3045
      }
    )
  }
  let initial_order = toList([start]);
  let _block;
  let _pipe = $set.from_list(all_nodes);
  _block = $set.delete$(_pipe, start);
  let remaining = _block;
  let _block$1;
  let _pipe$1 = $model.neighbors(graph, start);
  _block$1 = $list.fold(
    _pipe$1,
    [$dict.new$(), $priority_queue.new$(compare_max)],
    (acc, edge) => {
      let weights_acc;
      let queue_acc;
      weights_acc = acc[0];
      queue_acc = acc[1];
      let neighbor;
      let weight;
      neighbor = edge[0];
      weight = edge[1];
      let $2 = $set.contains(remaining, neighbor);
      if ($2) {
        return [
          $dict.insert(weights_acc, neighbor, weight),
          $priority_queue.push(queue_acc, [weight, neighbor]),
        ];
      } else {
        return acc;
      }
    },
  );
  let $1 = _block$1;
  let initial_weights;
  let initial_queue;
  initial_weights = $1[0];
  initial_queue = $1[1];
  let final_order = build_mas_order(
    graph,
    initial_order,
    remaining,
    initial_weights,
    initial_queue,
  );
  let t;
  let s;
  if (final_order instanceof $Empty) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "yog/min_cut",
      128,
      "maximum_adjacency_search",
      "Pattern match failed, no pattern matched the value.",
      {
        value: final_order,
        start: 3839,
        end: 3874,
        pattern_start: 3850,
        pattern_end: 3860
      }
    )
  } else {
    let $2 = final_order.tail;
    if ($2 instanceof $Empty) {
      throw makeError(
        "let_assert",
        FILEPATH,
        "yog/min_cut",
        128,
        "maximum_adjacency_search",
        "Pattern match failed, no pattern matched the value.",
        {
          value: final_order,
          start: 3839,
          end: 3874,
          pattern_start: 3850,
          pattern_end: 3860
        }
      )
    } else {
      t = final_order.head;
      s = $2.head;
    }
  }
  let _block$2;
  let _pipe$2 = $model.neighbors(graph, t);
  _block$2 = $list.fold(
    _pipe$2,
    0,
    (sum, edge) => {
      let weight;
      weight = edge[1];
      return sum + weight;
    },
  );
  let cut_weight = _block$2;
  return [s, t, cut_weight];
}

function do_min_cut(loop$graph, loop$best) {
  while (true) {
    let graph = loop$graph;
    let best = loop$best;
    let $ = $model.order(graph) <= 1;
    if ($) {
      return best;
    } else {
      let $1 = maximum_adjacency_search(graph);
      let s;
      let t;
      let cut_weight;
      s = $1[0];
      t = $1[1];
      cut_weight = $1[2];
      let $2 = $dict.get(graph.nodes, t);
      let t_size;
      if ($2 instanceof Ok) {
        t_size = $2[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "yog/min_cut",
          57,
          "do_min_cut",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $2,
            start: 1769,
            end: 1817,
            pattern_start: 1780,
            pattern_end: 1790
          }
        )
      }
      let $3 = $dict.get(graph.nodes, s);
      let s_size;
      if ($3 instanceof Ok) {
        s_size = $3[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "yog/min_cut",
          58,
          "do_min_cut",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $3,
            start: 1824,
            end: 1872,
            pattern_start: 1835,
            pattern_end: 1845
          }
        )
      }
      let total_nodes = $list.fold($dict.values(graph.nodes), 0, $int.add);
      let current_cut = new MinCut(cut_weight, t_size, total_nodes - t_size);
      let _block;
      let $4 = current_cut.weight < best.weight;
      if ($4) {
        _block = current_cut;
      } else {
        _block = best;
      }
      let best$1 = _block;
      let next_graph = $transform.contract(graph, s, t, $int.add);
      let next_graph$1 = $model.add_node(next_graph, s, s_size + t_size);
      loop$graph = next_graph$1;
      loop$best = best$1;
    }
  }
}

/**
 * Finds the global minimum cut of an undirected weighted graph using the
 * Stoer-Wagner algorithm.
 *
 * Returns the minimum cut weight and the sizes of the two partitions.
 * Perfect for AoC 2023 Day 25, where you need to find the cut of weight 3
 * and compute the product of partition sizes.
 *
 * **Time Complexity:** O(V³) or O(VE + V² log V) with a good priority queue
 *
 * ## Example
 *
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_node(4, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *   |> yog.add_edge(from: 3, to: 4, with: 1)
 *   |> yog.add_edge(from: 1, to: 4, with: 1)
 *
 * let result = min_cut.global_min_cut(in: graph)
 * // result.weight == 2 (minimum cut)
 * // result.group_a_size * result.group_b_size == product of partition sizes
 * ```
 */
export function global_min_cut(graph) {
  let graph$1 = $transform.map_nodes(graph, (_) => { return 1; });
  return do_min_cut(graph$1, new MinCut(999_999_999, 0, 0));
}
