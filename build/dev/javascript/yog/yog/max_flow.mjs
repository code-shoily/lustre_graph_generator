/// <reference types="./max_flow.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Gt } from "../../gleam_stdlib/gleam/order.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $queue from "../yog/internal/queue.mjs";
import * as $model from "../yog/model.mjs";

export class MaxFlowResult extends $CustomType {
  constructor(max_flow, residual_graph, source, sink) {
    super();
    this.max_flow = max_flow;
    this.residual_graph = residual_graph;
    this.source = source;
    this.sink = sink;
  }
}
export const MaxFlowResult$MaxFlowResult = (max_flow, residual_graph, source, sink) =>
  new MaxFlowResult(max_flow, residual_graph, source, sink);
export const MaxFlowResult$isMaxFlowResult = (value) =>
  value instanceof MaxFlowResult;
export const MaxFlowResult$MaxFlowResult$max_flow = (value) => value.max_flow;
export const MaxFlowResult$MaxFlowResult$0 = (value) => value.max_flow;
export const MaxFlowResult$MaxFlowResult$residual_graph = (value) =>
  value.residual_graph;
export const MaxFlowResult$MaxFlowResult$1 = (value) => value.residual_graph;
export const MaxFlowResult$MaxFlowResult$source = (value) => value.source;
export const MaxFlowResult$MaxFlowResult$2 = (value) => value.source;
export const MaxFlowResult$MaxFlowResult$sink = (value) => value.sink;
export const MaxFlowResult$MaxFlowResult$3 = (value) => value.sink;

export class MinCut extends $CustomType {
  constructor(source_side, sink_side) {
    super();
    this.source_side = source_side;
    this.sink_side = sink_side;
  }
}
export const MinCut$MinCut = (source_side, sink_side) =>
  new MinCut(source_side, sink_side);
export const MinCut$isMinCut = (value) => value instanceof MinCut;
export const MinCut$MinCut$source_side = (value) => value.source_side;
export const MinCut$MinCut$0 = (value) => value.source_side;
export const MinCut$MinCut$sink_side = (value) => value.sink_side;
export const MinCut$MinCut$1 = (value) => value.sink_side;

function build_adjacency_list(residuals) {
  return $dict.fold(
    residuals,
    $dict.new$(),
    (adj, edge, _) => {
      let from;
      let to;
      from = edge[0];
      to = edge[1];
      return $dict.upsert(
        adj,
        from,
        (existing) => {
          if (existing instanceof Some) {
            let neighbors = existing[0];
            return listPrepend(to, neighbors);
          } else {
            return toList([to]);
          }
        },
      );
    },
  );
}

function do_reconstruct_path(
  loop$parents,
  loop$current,
  loop$path,
  loop$bottleneck,
  loop$is_first,
  loop$min
) {
  while (true) {
    let parents = loop$parents;
    let current = loop$current;
    let path = loop$path;
    let bottleneck = loop$bottleneck;
    let is_first = loop$is_first;
    let min = loop$min;
    let new_path = listPrepend(current, path);
    let $ = $dict.get(parents, current);
    if ($ instanceof Ok) {
      let parent = $[0][0];
      let capacity = $[0][1];
      if (parent === -1) {
        return [new_path, bottleneck];
      } else {
        let _block;
        if (is_first) {
          _block = capacity;
        } else {
          _block = min(capacity, bottleneck);
        }
        let new_bottleneck = _block;
        loop$parents = parents;
        loop$current = parent;
        loop$path = new_path;
        loop$bottleneck = new_bottleneck;
        loop$is_first = false;
        loop$min = min;
      }
    } else {
      return [new_path, bottleneck];
    }
  }
}

function reconstruct_path(parents, sink, zero, min) {
  return do_reconstruct_path(parents, sink, toList([]), zero, true, min);
}

function do_bfs(
  loop$residuals,
  loop$adj_list,
  loop$q,
  loop$parents,
  loop$sink,
  loop$zero,
  loop$compare,
  loop$min
) {
  while (true) {
    let residuals = loop$residuals;
    let adj_list = loop$adj_list;
    let q = loop$q;
    let parents = loop$parents;
    let sink = loop$sink;
    let zero = loop$zero;
    let compare = loop$compare;
    let min = loop$min;
    let $ = $queue.pop(q);
    if ($ instanceof Ok) {
      let current = $[0][0];
      let rest = $[0][1];
      let $1 = current === sink;
      if ($1) {
        let $2 = reconstruct_path(parents, sink, zero, min);
        let path;
        let bottleneck;
        path = $2[0];
        bottleneck = $2[1];
        return new Ok([path, bottleneck]);
      } else {
        let _block;
        let _pipe = $dict.get(adj_list, current);
        _block = $result.unwrap(_pipe, toList([]));
        let neighbors = _block;
        let $2 = $list.fold(
          neighbors,
          [toList([]), parents],
          (acc, neighbor) => {
            let neighbors_acc;
            let parents_acc;
            neighbors_acc = acc[0];
            parents_acc = acc[1];
            let _block$1;
            let _pipe$1 = $dict.get(residuals, [current, neighbor]);
            _block$1 = $result.unwrap(_pipe$1, zero);
            let cap = _block$1;
            let already_visited = $dict.has_key(parents_acc, neighbor);
            let has_capacity = compare(cap, zero) instanceof Gt;
            let $3 = already_visited || !has_capacity;
            if ($3) {
              return acc;
            } else {
              let updated_parents = $dict.insert(
                parents_acc,
                neighbor,
                [current, cap],
              );
              return [listPrepend(neighbor, neighbors_acc), updated_parents];
            }
          },
        );
        let new_neighbors;
        let new_parents;
        new_neighbors = $2[0];
        new_parents = $2[1];
        let new_queue = $queue.push_list(rest, new_neighbors);
        loop$residuals = residuals;
        loop$adj_list = adj_list;
        loop$q = new_queue;
        loop$parents = new_parents;
        loop$sink = sink;
        loop$zero = zero;
        loop$compare = compare;
        loop$min = min;
      }
    } else {
      return $;
    }
  }
}

function find_augmenting_path_bfs(
  residuals,
  adj_list,
  source,
  sink,
  zero,
  compare,
  min
) {
  let _block;
  let _pipe = $queue.new$();
  _block = $queue.push(_pipe, source);
  let initial_queue = _block;
  return do_bfs(
    residuals,
    adj_list,
    initial_queue,
    $dict.from_list(toList([[source, [-1, zero]]])),
    sink,
    zero,
    compare,
    min,
  );
}

function do_augment_path(
  loop$residuals,
  loop$path,
  loop$bottleneck,
  loop$add,
  loop$subtract
) {
  while (true) {
    let residuals = loop$residuals;
    let path = loop$path;
    let bottleneck = loop$bottleneck;
    let add = loop$add;
    let subtract = loop$subtract;
    if (path instanceof $Empty) {
      return residuals;
    } else {
      let $ = path.tail;
      if ($ instanceof $Empty) {
        return residuals;
      } else {
        let from = path.head;
        let to = $.head;
        let rest = $.tail;
        let forward_key = [from, to];
        let backward_key = [to, from];
        let _block;
        let _pipe = $dict.get(residuals, forward_key);
        _block = $result.unwrap(_pipe, bottleneck);
        let forward_cap = _block;
        let _block$1;
        let _pipe$1 = $dict.get(residuals, backward_key);
        _block$1 = $result.unwrap(_pipe$1, bottleneck);
        let backward_cap = _block$1;
        let _block$2;
        let _pipe$2 = residuals;
        let _pipe$3 = $dict.insert(
          _pipe$2,
          forward_key,
          subtract(forward_cap, bottleneck),
        );
        _block$2 = $dict.insert(
          _pipe$3,
          backward_key,
          add(backward_cap, bottleneck),
        );
        let new_residuals = _block$2;
        loop$residuals = new_residuals;
        loop$path = listPrepend(to, rest);
        loop$bottleneck = bottleneck;
        loop$add = add;
        loop$subtract = subtract;
      }
    }
  }
}

function augment_path(residuals, path, bottleneck, add, subtract) {
  return do_augment_path(residuals, path, bottleneck, add, subtract);
}

function ford_fulkerson(
  loop$residuals,
  loop$adj_list,
  loop$source,
  loop$sink,
  loop$total_flow,
  loop$zero,
  loop$add,
  loop$subtract,
  loop$compare,
  loop$min
) {
  while (true) {
    let residuals = loop$residuals;
    let adj_list = loop$adj_list;
    let source = loop$source;
    let sink = loop$sink;
    let total_flow = loop$total_flow;
    let zero = loop$zero;
    let add = loop$add;
    let subtract = loop$subtract;
    let compare = loop$compare;
    let min = loop$min;
    let $ = find_augmenting_path_bfs(
      residuals,
      adj_list,
      source,
      sink,
      zero,
      compare,
      min,
    );
    if ($ instanceof Ok) {
      let path = $[0][0];
      let bottleneck = $[0][1];
      let new_residuals = augment_path(
        residuals,
        path,
        bottleneck,
        add,
        subtract,
      );
      loop$residuals = new_residuals;
      loop$adj_list = adj_list;
      loop$source = source;
      loop$sink = sink;
      loop$total_flow = add(total_flow, bottleneck);
      loop$zero = zero;
      loop$add = add;
      loop$subtract = subtract;
      loop$compare = compare;
      loop$min = min;
    } else {
      return [residuals, total_flow];
    }
  }
}

function residuals_to_graph(residuals, all_nodes) {
  let graph = $set.fold(
    all_nodes,
    $model.new$(new $model.Directed()),
    (g, node) => { return $model.add_node(g, node, undefined); },
  );
  return $dict.fold(
    residuals,
    graph,
    (g, edge, capacity) => {
      let from;
      let to;
      from = edge[0];
      to = edge[1];
      return $model.add_edge(g, from, to, capacity);
    },
  );
}

function extract_all_nodes_from_edges(graph) {
  let source_nodes = $set.from_list($dict.keys(graph.out_edges));
  let _block;
  let _pipe = $dict.values(graph.out_edges);
  let _pipe$1 = $list.flat_map(
    _pipe,
    (edge_dict) => { return $dict.keys(edge_dict); },
  );
  _block = $set.from_list(_pipe$1);
  let dest_nodes = _block;
  return $set.union(source_nodes, dest_nodes);
}

function build_residuals(graph, zero) {
  let _block;
  let _pipe = extract_all_nodes_from_edges(graph);
  _block = $set.union(_pipe, $set.from_list($model.all_nodes(graph)));
  let nodes_set = _block;
  let all_nodes_list = $set.to_list(nodes_set);
  let residuals = $list.fold(
    all_nodes_list,
    $dict.new$(),
    (caps, node_id) => {
      let successors = $model.successors(graph, node_id);
      return $list.fold(
        successors,
        caps,
        (acc, edge) => {
          let neighbor;
          let capacity;
          neighbor = edge[0];
          capacity = edge[1];
          let with_forward = $dict.insert(acc, [node_id, neighbor], capacity);
          let $ = $dict.has_key(with_forward, [neighbor, node_id]);
          if ($) {
            return with_forward;
          } else {
            return $dict.insert(with_forward, [neighbor, node_id], zero);
          }
        },
      );
    },
  );
  return [residuals, nodes_set];
}

/**
 * Finds the maximum flow using the Edmonds-Karp algorithm.
 *
 * Edmonds-Karp is a specific implementation of the Ford-Fulkerson method
 * that uses BFS to find the shortest augmenting path. This guarantees
 * O(VE²) time complexity.
 *
 * **Time Complexity:** O(VE²)
 *
 * ## Parameters
 *
 * - `in` - The flow network (directed graph where edge weights are capacities)
 * - `from` - The source node (where flow originates)
 * - `to` - The sink node (where flow terminates)
 * - `with_zero` - The zero element for the capacity type (e.g., 0 for Int)
 * - `with_add` - Function to add two capacity values
 * - `with_subtract` - Function to subtract capacity values
 * - `with_compare` - Function to compare capacity values
 * - `with_min` - Function to find minimum of two capacity values
 *
 * ## Returns
 *
 * A `MaxFlowResult` containing:
 * - The maximum flow value
 * - The residual graph (for extracting flow paths or min-cut)
 * - Source and sink node IDs
 *
 * ## Example
 *
 * ```gleam
 * import gleam/int
 * import yog
 * import yog/max_flow
 *
 * let network =
 *   yog.directed()
 *   |> yog.add_edge(from: 0, to: 1, with: 16)
 *   |> yog.add_edge(from: 0, to: 2, with: 13)
 *   |> yog.add_edge(from: 1, to: 2, with: 10)
 *   |> yog.add_edge(from: 1, to: 3, with: 12)
 *   |> yog.add_edge(from: 2, to: 1, with: 4)
 *   |> yog.add_edge(from: 2, to: 4, with: 14)
 *   |> yog.add_edge(from: 3, to: 2, with: 9)
 *   |> yog.add_edge(from: 3, to: 5, with: 20)
 *   |> yog.add_edge(from: 4, to: 3, with: 7)
 *   |> yog.add_edge(from: 4, to: 5, with: 4)
 *
 * let result = max_flow.edmonds_karp(
 *   in: network,
 *   from: 0,
 *   to: 5,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_subtract: fn(a, b) { a - b },
 *   with_compare: int.compare,
 *   with_min: int.min,
 * )
 *
 * // result.max_flow => 23
 * ```
 */
export function edmonds_karp(
  graph,
  source,
  sink,
  zero,
  add,
  subtract,
  compare,
  min
) {
  let $ = source === sink;
  if ($) {
    let empty_graph = $model.new$(new $model.Directed());
    return new MaxFlowResult(zero, empty_graph, source, sink);
  } else {
    let $1 = build_residuals(graph, zero);
    let residuals;
    let all_nodes;
    residuals = $1[0];
    all_nodes = $1[1];
    let adj_list = build_adjacency_list(residuals);
    let $2 = ford_fulkerson(
      residuals,
      adj_list,
      source,
      sink,
      zero,
      zero,
      add,
      subtract,
      compare,
      min,
    );
    let final_residuals;
    let total_flow;
    final_residuals = $2[0];
    total_flow = $2[1];
    let residual_graph = residuals_to_graph(final_residuals, all_nodes);
    return new MaxFlowResult(total_flow, residual_graph, source, sink);
  }
}

function do_dfs_reachable(
  loop$residual,
  loop$stack,
  loop$visited,
  loop$zero,
  loop$compare
) {
  while (true) {
    let residual = loop$residual;
    let stack = loop$stack;
    let visited = loop$visited;
    let zero = loop$zero;
    let compare = loop$compare;
    if (stack instanceof $Empty) {
      return visited;
    } else {
      let current = stack.head;
      let rest = stack.tail;
      let $ = $set.contains(visited, current);
      if ($) {
        loop$residual = residual;
        loop$stack = rest;
        loop$visited = visited;
        loop$zero = zero;
        loop$compare = compare;
      } else {
        let new_visited = $set.insert(visited, current);
        let _block;
        let _pipe = $model.successors(residual, current);
        _block = $list.fold(
          _pipe,
          rest,
          (stack_acc, edge) => {
            let node;
            let capacity;
            node = edge[0];
            capacity = edge[1];
            let $1 = !$set.contains(new_visited, node) && (compare(
              capacity,
              zero,
            ) instanceof Gt);
            if ($1) {
              return listPrepend(node, stack_acc);
            } else {
              return stack_acc;
            }
          },
        );
        let new_stack = _block;
        loop$residual = residual;
        loop$stack = new_stack;
        loop$visited = new_visited;
        loop$zero = zero;
        loop$compare = compare;
      }
    }
  }
}

function find_reachable_nodes(residual, source, zero, compare) {
  return do_dfs_reachable(
    residual,
    toList([source]),
    $set.new$(),
    zero,
    compare,
  );
}

/**
 * Extracts the minimum cut from a max flow result.
 *
 * Uses the max-flow min-cut theorem: the minimum cut can be found by
 * identifying all nodes reachable from the source in the residual graph
 * after computing max flow.
 *
 * The cut separates nodes reachable from source (source_side) from the
 * rest (sink_side). The capacity of edges crossing from source_side to
 * sink_side equals the max flow value.
 *
 * ## Parameters
 *
 * - `result` - The max flow result from `edmonds_karp`
 * - `with_zero` - The zero element for the capacity type
 * - `with_compare` - Function to compare capacity values
 *
 * ## Example
 *
 * ```gleam
 * let result = max_flow.edmonds_karp(...)
 * let cut = max_flow.min_cut(result, with_zero: 0, with_compare: int.compare)
 * // cut.source_side contains nodes on source side
 * // cut.sink_side contains nodes on sink side
 * ```
 */
export function min_cut(result, zero, compare) {
  let reachable = find_reachable_nodes(
    result.residual_graph,
    result.source,
    zero,
    compare,
  );
  let _block;
  let _pipe = $model.all_nodes(result.residual_graph);
  _block = $set.from_list(_pipe);
  let all_nodes = _block;
  let sink_side = $set.difference(all_nodes, reachable);
  return new MinCut(reachable, sink_side);
}
