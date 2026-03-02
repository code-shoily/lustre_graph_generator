/// <reference types="./yog.d.mts" />
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $model from "./yog/model.mjs";

/**
 * Creates a new empty graph of the specified type.
 *
 * ## Example
 *
 * ```gleam
 * import yog
 * import yog/model.{Directed}
 *
 * let graph = yog.new(Directed)
 * ```
 */
export function new$(graph_type) {
  return $model.new$(graph_type);
}

/**
 * Creates a new empty directed graph.
 *
 * This is a convenience function that's equivalent to `yog.new(Directed)`,
 * but requires only a single import.
 *
 * ## Example
 *
 * ```gleam
 * import yog
 *
 * let graph =
 *   yog.directed()
 *   |> yog.add_node(1, "Start")
 *   |> yog.add_node(2, "End")
 *   |> yog.add_edge(from: 1, to: 2, with: 10)
 * ```
 */
export function directed() {
  return $model.new$(new $model.Directed());
}

/**
 * Creates a new empty undirected graph.
 *
 * This is a convenience function that's equivalent to `yog.new(Undirected)`,
 * but requires only a single import.
 *
 * ## Example
 *
 * ```gleam
 * import yog
 *
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, "A")
 *   |> yog.add_node(2, "B")
 *   |> yog.add_edge(from: 1, to: 2, with: 5)
 * ```
 */
export function undirected() {
  return $model.new$(new $model.Undirected());
}

/**
 * Adds a node to the graph with the given ID and data.
 * If a node with this ID already exists, its data will be replaced.
 *
 * ## Example
 *
 * ```gleam
 * graph
 * |> yog.add_node(1, "Node A")
 * |> yog.add_node(2, "Node B")
 * ```
 */
export function add_node(graph, id, data) {
  return $model.add_node(graph, id, data);
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
 * |> yog.add_edge(from: 1, to: 2, with: 10)
 * ```
 */
export function add_edge(graph, src, dst, weight) {
  return $model.add_edge(graph, src, dst, weight);
}

/**
 * Adds an unweighted edge to the graph.
 *
 * This is a convenience function for graphs where edges have no meaningful weight.
 * Uses `Nil` as the edge data type.
 *
 * ## Example
 *
 * ```gleam
 * let graph: Graph(String, Nil) = yog.directed()
 *   |> yog.add_node(1, "A")
 *   |> yog.add_node(2, "B")
 *   |> yog.add_unweighted_edge(from: 1, to: 2)
 * ```
 */
export function add_unweighted_edge(graph, src, dst) {
  return $model.add_edge(graph, src, dst, undefined);
}

/**
 * Adds a simple edge with weight 1.
 *
 * This is a convenience function for graphs with integer weights where
 * a default weight of 1 is appropriate (e.g., unweighted graphs, hop counts).
 *
 * ## Example
 *
 * ```gleam
 * graph
 * |> yog.add_simple_edge(from: 1, to: 2)
 * |> yog.add_simple_edge(from: 2, to: 3)
 * // Both edges have weight 1
 * ```
 */
export function add_simple_edge(graph, src, dst) {
  return $model.add_edge(graph, src, dst, 1);
}

/**
 * Gets nodes you can travel TO from the given node (successors).
 * Returns a list of tuples containing the destination node ID and edge data.
 */
export function successors(graph, id) {
  return $model.successors(graph, id);
}

/**
 * Gets nodes you came FROM to reach the given node (predecessors).
 * Returns a list of tuples containing the source node ID and edge data.
 */
export function predecessors(graph, id) {
  return $model.predecessors(graph, id);
}

/**
 * Gets all nodes connected to the given node, regardless of direction.
 * For undirected graphs, this is equivalent to successors.
 * For directed graphs, this combines successors and predecessors.
 */
export function neighbors(graph, id) {
  return $model.neighbors(graph, id);
}

/**
 * Returns all unique node IDs that have edges in the graph.
 */
export function all_nodes(graph) {
  return $model.all_nodes(graph);
}

/**
 * Creates a graph from a list of edges #(src, dst, weight).
 *
 * ## Example
 *
 * ```gleam
 * let graph = yog.from_edges(model.Directed, [#(1, 2, 10), #(2, 3, 5)])
 * ```
 */
export function from_edges(graph_type, edges) {
  return $list.fold(
    edges,
    new$(graph_type),
    (g, edge) => {
      let src;
      let dst;
      let weight;
      src = edge[0];
      dst = edge[1];
      weight = edge[2];
      let _pipe = g;
      let _pipe$1 = add_node(_pipe, src, undefined);
      let _pipe$2 = add_node(_pipe$1, dst, undefined);
      return add_edge(_pipe$2, src, dst, weight);
    },
  );
}

/**
 * Creates a graph from a list of unweighted edges #(src, dst).
 *
 * ## Example
 *
 * ```gleam
 * let graph = yog.from_unweighted_edges(model.Directed, [#(1, 2), #(2, 3)])
 * ```
 */
export function from_unweighted_edges(graph_type, edges) {
  return $list.fold(
    edges,
    new$(graph_type),
    (g, edge) => {
      let src;
      let dst;
      src = edge[0];
      dst = edge[1];
      let _pipe = g;
      let _pipe$1 = add_node(_pipe, src, undefined);
      let _pipe$2 = add_node(_pipe$1, dst, undefined);
      return add_unweighted_edge(_pipe$2, src, dst);
    },
  );
}

/**
 * Creates a graph from an adjacency list #(src, List(#(dst, weight))).
 *
 * ## Example
 *
 * ```gleam
 * let graph = yog.from_adjacency_list(model.Directed, [#(1, [#(2, 10), #(3, 5)])])
 * ```
 */
export function from_adjacency_list(graph_type, adj_list) {
  return $list.fold(
    adj_list,
    new$(graph_type),
    (g, entry) => {
      let src;
      let edges;
      src = entry[0];
      edges = entry[1];
      return $list.fold(
        edges,
        add_node(g, src, undefined),
        (acc, edge) => {
          let dst;
          let weight;
          dst = edge[0];
          weight = edge[1];
          let _pipe = acc;
          let _pipe$1 = add_node(_pipe, dst, undefined);
          return add_edge(_pipe$1, src, dst, weight);
        },
      );
    },
  );
}

/**
 * Returns just the NodeIds of successors (without edge data).
 * Convenient for traversal algorithms that only need the IDs.
 */
export function successor_ids(graph, id) {
  return $model.successor_ids(graph, id);
}
