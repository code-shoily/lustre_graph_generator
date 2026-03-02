/// <reference types="./model.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import { Ok, toList, prepend as listPrepend, CustomType as $CustomType } from "../gleam.mjs";
import * as $utils from "../yog/internal/utils.mjs";

export class Directed extends $CustomType {}
export const GraphType$Directed = () => new Directed();
export const GraphType$isDirected = (value) => value instanceof Directed;

export class Undirected extends $CustomType {}
export const GraphType$Undirected = () => new Undirected();
export const GraphType$isUndirected = (value) => value instanceof Undirected;

export class Graph extends $CustomType {
  constructor(kind, nodes, out_edges, in_edges) {
    super();
    this.kind = kind;
    this.nodes = nodes;
    this.out_edges = out_edges;
    this.in_edges = in_edges;
  }
}
export const Graph$Graph = (kind, nodes, out_edges, in_edges) =>
  new Graph(kind, nodes, out_edges, in_edges);
export const Graph$isGraph = (value) => value instanceof Graph;
export const Graph$Graph$kind = (value) => value.kind;
export const Graph$Graph$0 = (value) => value.kind;
export const Graph$Graph$nodes = (value) => value.nodes;
export const Graph$Graph$1 = (value) => value.nodes;
export const Graph$Graph$out_edges = (value) => value.out_edges;
export const Graph$Graph$2 = (value) => value.out_edges;
export const Graph$Graph$in_edges = (value) => value.in_edges;
export const Graph$Graph$3 = (value) => value.in_edges;

/**
 * Creates a new empty graph of the specified type.
 *
 * ## Example
 *
 * ```gleam
 * let graph = model.new(Directed)
 * ```
 */
export function new$(graph_type) {
  return new Graph(graph_type, $dict.new$(), $dict.new$(), $dict.new$());
}

/**
 * Adds a node to the graph with the given ID and data.
 * If a node with this ID already exists, its data will be replaced.
 *
 * ## Example
 *
 * ```gleam
 * graph
 * |> model.add_node(1, "Node A")
 * |> model.add_node(2, "Node B")
 * ```
 */
export function add_node(graph, id, data) {
  let new_nodes = $dict.insert(graph.nodes, id, data);
  return new Graph(graph.kind, new_nodes, graph.out_edges, graph.in_edges);
}

/**
 * Gets nodes you can travel TO (Successors).
 */
export function successors(graph, id) {
  let _pipe = graph.out_edges;
  let _pipe$1 = $dict.get(_pipe, id);
  let _pipe$2 = $result.map(_pipe$1, $dict.to_list);
  return $result.unwrap(_pipe$2, toList([]));
}

/**
 * Gets nodes you came FROM (Predecessors).
 */
export function predecessors(graph, id) {
  let _pipe = graph.in_edges;
  let _pipe$1 = $dict.get(_pipe, id);
  let _pipe$2 = $result.map(_pipe$1, $dict.to_list);
  return $result.unwrap(_pipe$2, toList([]));
}

/**
 * Gets everyone connected to the node, regardless of direction.
 * Useful for algorithms like finding "connected components."
 */
export function neighbors(graph, id) {
  let $ = graph.kind;
  if ($ instanceof Directed) {
    let out = successors(graph, id);
    let in_ = predecessors(graph, id);
    return $list.fold(
      in_,
      out,
      (acc, incoming) => {
        let in_id;
        in_id = incoming[0];
        let $1 = $list.any(out, (o) => { return o[0] === in_id; });
        if ($1) {
          return acc;
        } else {
          return listPrepend(incoming, acc);
        }
      },
    );
  } else {
    return successors(graph, id);
  }
}

/**
 * Returns all node IDs in the graph.
 * This includes all nodes, even isolated nodes with no edges.
 */
export function all_nodes(graph) {
  return $dict.keys(graph.nodes);
}

/**
 * Returns the number of nodes in the graph (graph order).
 *
 * **Time Complexity:** O(1)
 */
export function order(graph) {
  return $dict.size(graph.nodes);
}

/**
 * Returns just the NodeIds of successors (without edge weights).
 * Convenient for traversal algorithms that only need the IDs.
 */
export function successor_ids(graph, id) {
  let _pipe = successors(graph, id);
  return $list.map(_pipe, (edge) => { return edge[0]; });
}

function do_add_directed_edge(graph, src, dst, weight) {
  let out_update_fn = (maybe_inner_map) => {
    if (maybe_inner_map instanceof $option.Some) {
      let m = maybe_inner_map[0];
      return $dict.insert(m, dst, weight);
    } else {
      return $dict.from_list(toList([[dst, weight]]));
    }
  };
  let in_update_fn = (maybe_inner_map) => {
    if (maybe_inner_map instanceof $option.Some) {
      let m = maybe_inner_map[0];
      return $dict.insert(m, src, weight);
    } else {
      return $dict.from_list(toList([[src, weight]]));
    }
  };
  let new_out = $dict.upsert(graph.out_edges, src, out_update_fn);
  let new_in = $dict.upsert(graph.in_edges, dst, in_update_fn);
  return new Graph(graph.kind, graph.nodes, new_out, new_in);
}

/**
 * Adds an edge to the graph with the given weight.
 *
 * For directed graphs, adds a single edge from `src` to `dst`.
 * For undirected graphs, adds edges in both directions.
 *
 * ## Example
 *
 * ```gleam
 * graph
 * |> model.add_edge(from: 1, to: 2, with: 10)
 * ```
 */
export function add_edge(graph, src, dst, weight) {
  let graph$1 = do_add_directed_edge(graph, src, dst, weight);
  let $ = graph$1.kind;
  if ($ instanceof Directed) {
    return graph$1;
  } else {
    return do_add_directed_edge(graph$1, dst, src, weight);
  }
}

/**
 * Removes a node and all its connected edges (incoming and outgoing).
 *
 * **Time Complexity:** O(deg(v)) - proportional to the number of edges
 * connected to the node, not the whole graph.
 *
 * ## Example
 *
 * ```gleam
 * let graph =
 *   model.new(Directed)
 *   |> model.add_node(1, "A")
 *   |> model.add_node(2, "B")
 *   |> model.add_node(3, "C")
 *   |> model.add_edge(from: 1, to: 2, with: 10)
 *   |> model.add_edge(from: 2, to: 3, with: 20)
 *
 * let graph = model.remove_node(graph, 2)
 * // Node 2 is removed, along with edges 1->2 and 2->3
 * ```
 */
export function remove_node(graph, id) {
  let targets = successors(graph, id);
  let sources = predecessors(graph, id);
  let new_nodes = $dict.delete$(graph.nodes, id);
  let new_out = $dict.delete$(graph.out_edges, id);
  let new_in_cleaned = $list.fold(
    targets,
    graph.in_edges,
    (acc_in, target) => {
      let target_id;
      target_id = target[0];
      return $utils.dict_update_inner(acc_in, target_id, id, $dict.delete$);
    },
  );
  let new_in = $dict.delete$(new_in_cleaned, id);
  let new_out_cleaned = $list.fold(
    sources,
    new_out,
    (acc_out, source) => {
      let source_id;
      source_id = source[0];
      return $utils.dict_update_inner(acc_out, source_id, id, $dict.delete$);
    },
  );
  return new Graph(graph.kind, new_nodes, new_out_cleaned, new_in);
}

function do_add_directed_combine(graph, src, dst, weight, with_combine) {
  let update_fn = (maybe_inner_map) => {
    if (maybe_inner_map instanceof $option.Some) {
      let m = maybe_inner_map[0];
      let _block;
      let $ = $dict.get(m, dst);
      if ($ instanceof Ok) {
        let existing = $[0];
        _block = with_combine(existing, weight);
      } else {
        _block = weight;
      }
      let new_weight = _block;
      return $dict.insert(m, dst, new_weight);
    } else {
      return $dict.from_list(toList([[dst, weight]]));
    }
  };
  let new_out = $dict.upsert(graph.out_edges, src, update_fn);
  let new_in = $dict.upsert(
    graph.in_edges,
    dst,
    (maybe_m) => {
      if (maybe_m instanceof $option.Some) {
        let m = maybe_m[0];
        let _block;
        let $ = $dict.get(m, src);
        if ($ instanceof Ok) {
          let existing = $[0];
          _block = with_combine(existing, weight);
        } else {
          _block = weight;
        }
        let new_weight = _block;
        return $dict.insert(m, src, new_weight);
      } else {
        return $dict.from_list(toList([[src, weight]]));
      }
    },
  );
  return new Graph(graph.kind, graph.nodes, new_out, new_in);
}

/**
 * Adds an edge, but if an edge already exists between `src` and `dst`,
 * it combines the new weight with the existing one using `with_combine`.
 *
 * The combine function receives `(existing_weight, new_weight)` and should
 * return the combined weight.
 *
 * **Time Complexity:** O(1)
 *
 * ## Example
 *
 * ```gleam
 * let graph =
 *   model.new(Directed)
 *   |> model.add_node(1, "A")
 *   |> model.add_node(2, "B")
 *   |> model.add_edge(from: 1, to: 2, with: 10)
 *   |> model.add_edge_with_combine(from: 1, to: 2, with: 5, using: int.add)
 * // Edge 1->2 now has weight 15 (10 + 5)
 * ```
 *
 * ## Use Cases
 *
 * - **Edge contraction** in graph algorithms (Stoer-Wagner min-cut)
 * - **Multi-graph support** (adding parallel edges with combined weights)
 * - **Incremental graph building** (accumulating weights from multiple sources)
 */
export function add_edge_with_combine(graph, src, dst, weight, with_combine) {
  let graph$1 = do_add_directed_combine(graph, src, dst, weight, with_combine);
  let $ = graph$1.kind;
  if ($ instanceof Directed) {
    return graph$1;
  } else {
    return do_add_directed_combine(graph$1, dst, src, weight, with_combine);
  }
}
