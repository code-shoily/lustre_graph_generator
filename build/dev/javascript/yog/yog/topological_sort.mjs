/// <reference types="./topological_sort.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $priority_queue from "../../gleamy_structures/gleamy/priority_queue.mjs";
import { Ok, Error, toList, Empty as $Empty, prepend as listPrepend } from "../gleam.mjs";
import * as $model from "../yog/model.mjs";

function do_lexical_kahn(
  loop$graph,
  loop$q,
  loop$in_degrees,
  loop$acc,
  loop$total_count
) {
  while (true) {
    let graph = loop$graph;
    let q = loop$q;
    let in_degrees = loop$in_degrees;
    let acc = loop$acc;
    let total_count = loop$total_count;
    let $ = $priority_queue.pop(q);
    if ($ instanceof Ok) {
      let head = $[0][0];
      let rest_q = $[0][1];
      let neighbors = $model.successor_ids(graph, head);
      let $1 = $list.fold(
        neighbors,
        [rest_q, in_degrees],
        (state, neighbor) => {
          let current_q;
          let degrees;
          current_q = state[0];
          degrees = state[1];
          let _block;
          let _pipe = $dict.get(degrees, neighbor);
          _block = $result.unwrap(_pipe, 0);
          let current_degree = _block;
          let new_degree = current_degree - 1;
          let new_degrees = $dict.insert(degrees, neighbor, new_degree);
          let _block$1;
          let $2 = new_degree === 0;
          if ($2) {
            _block$1 = $priority_queue.push(current_q, neighbor);
          } else {
            _block$1 = current_q;
          }
          let updated_q = _block$1;
          return [updated_q, new_degrees];
        },
      );
      let next_q;
      let next_in_degrees;
      next_q = $1[0];
      next_in_degrees = $1[1];
      loop$graph = graph;
      loop$q = next_q;
      loop$in_degrees = next_in_degrees;
      loop$acc = listPrepend(head, acc);
      loop$total_count = total_count;
    } else {
      let $1 = $list.length(acc) === total_count;
      if ($1) {
        return new Ok($list.reverse(acc));
      } else {
        return new Error(undefined);
      }
    }
  }
}

/**
 * Performs a topological sort that returns the lexicographically smallest sequence.
 *
 * Uses a heap-based version of Kahn's algorithm to ensure that when multiple
 * nodes have in-degree 0, the smallest one (according to `compare_nodes`) is chosen first.
 *
 * The comparison function operates on **node data**, not node IDs, allowing intuitive
 * comparisons like `string.compare` for alphabetical ordering.
 *
 * Returns `Error(Nil)` if the graph contains a cycle.
 *
 * **Time Complexity:** O(V log V + E) due to heap operations
 *
 * ## Example
 *
 * ```gleam
 * // Get alphabetical ordering by node data
 * topological_sort.lexicographical_topological_sort(graph, string.compare)
 * // => Ok([0, 1, 2])  // Node IDs ordered by their string data
 *
 * // Custom comparison by priority
 * topological_sort.lexicographical_topological_sort(graph, fn(a, b) {
 *   int.compare(a.priority, b.priority)
 * })
 * ```
 */
export function lexicographical_topological_sort(graph, compare_nodes) {
  let all_nodes = $model.all_nodes(graph);
  let _block;
  let _pipe = all_nodes;
  let _pipe$1 = $list.map(
    _pipe,
    (id) => {
      let _block$1;
      let _pipe$1 = $dict.get(graph.in_edges, id);
      let _pipe$2 = $result.map(_pipe$1, $dict.size);
      _block$1 = $result.unwrap(_pipe$2, 0);
      let degree = _block$1;
      return [id, degree];
    },
  );
  _block = $dict.from_list(_pipe$1);
  let in_degrees = _block;
  let compare_by_data = (id_a, id_b) => {
    let $ = $dict.get(graph.nodes, id_a);
    let $1 = $dict.get(graph.nodes, id_b);
    if ($ instanceof Ok && $1 instanceof Ok) {
      let data_a = $[0];
      let data_b = $1[0];
      return compare_nodes(data_a, data_b);
    } else {
      return new $order.Eq();
    }
  };
  let _block$1;
  let _pipe$2 = $dict.to_list(in_degrees);
  let _pipe$3 = $list.filter(_pipe$2, (pair) => { return pair[1] === 0; });
  let _pipe$4 = $list.map(_pipe$3, (pair) => { return pair[0]; });
  _block$1 = $list.fold(
    _pipe$4,
    $priority_queue.new$(compare_by_data),
    (q, id) => { return $priority_queue.push(q, id); },
  );
  let initial_queue = _block$1;
  return do_lexical_kahn(
    graph,
    initial_queue,
    in_degrees,
    toList([]),
    $list.length(all_nodes),
  );
}

function do_kahn(
  loop$graph,
  loop$queue,
  loop$in_degrees,
  loop$acc,
  loop$total_node_count
) {
  while (true) {
    let graph = loop$graph;
    let queue = loop$queue;
    let in_degrees = loop$in_degrees;
    let acc = loop$acc;
    let total_node_count = loop$total_node_count;
    if (queue instanceof $Empty) {
      let $ = $list.length(acc) === total_node_count;
      if ($) {
        return new Ok($list.reverse(acc));
      } else {
        return new Error(undefined);
      }
    } else {
      let head = queue.head;
      let tail = queue.tail;
      let neighbors = $model.successor_ids(graph, head);
      let $ = $list.fold(
        neighbors,
        [tail, in_degrees],
        (state, neighbor) => {
          let q;
          let degrees;
          q = state[0];
          degrees = state[1];
          let _block;
          let _pipe = $dict.get(degrees, neighbor);
          _block = $result.unwrap(_pipe, 0);
          let current_degree = _block;
          let new_degree = current_degree - 1;
          let new_degrees = $dict.insert(degrees, neighbor, new_degree);
          let _block$1;
          let $1 = new_degree === 0;
          if ($1) {
            _block$1 = listPrepend(neighbor, q);
          } else {
            _block$1 = q;
          }
          let new_q = _block$1;
          return [new_q, new_degrees];
        },
      );
      let next_queue;
      let next_in_degrees;
      next_queue = $[0];
      next_in_degrees = $[1];
      loop$graph = graph;
      loop$queue = next_queue;
      loop$in_degrees = next_in_degrees;
      loop$acc = listPrepend(head, acc);
      loop$total_node_count = total_node_count;
    }
  }
}

/**
 * Performs a topological sort on a directed graph using Kahn's algorithm.
 *
 * Returns a linear ordering of nodes such that for every directed edge (u, v),
 * node u comes before node v in the ordering.
 *
 * Returns `Error(Nil)` if the graph contains a cycle.
 *
 * **Time Complexity:** O(V + E) where V is vertices and E is edges
 *
 * ## Example
 *
 * ```gleam
 * topological_sort.topological_sort(graph)
 * // => Ok([1, 2, 3, 4])  // Valid ordering
 * // or Error(Nil)         // Cycle detected
 * ```
 */
export function topological_sort(graph) {
  let all_nodes = $model.all_nodes(graph);
  let _block;
  let _pipe = all_nodes;
  let _pipe$1 = $list.map(
    _pipe,
    (id) => {
      let _block$1;
      let _pipe$1 = $dict.get(graph.in_edges, id);
      let _pipe$2 = $result.map(_pipe$1, $dict.size);
      _block$1 = $result.unwrap(_pipe$2, 0);
      let degree = _block$1;
      return [id, degree];
    },
  );
  _block = $dict.from_list(_pipe$1);
  let in_degrees = _block;
  let _block$1;
  let _pipe$2 = $dict.to_list(in_degrees);
  let _pipe$3 = $list.filter(_pipe$2, (pair) => { return pair[1] === 0; });
  _block$1 = $list.map(_pipe$3, (pair) => { return pair[0]; });
  let queue = _block$1;
  return do_kahn(graph, queue, in_degrees, toList([]), $list.length(all_nodes));
}
