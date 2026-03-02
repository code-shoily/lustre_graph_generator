/// <reference types="./labeled.d.mts" />
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import { Ok, Error, CustomType as $CustomType } from "../../gleam.mjs";
import * as $model from "../../yog/model.mjs";

export class Builder extends $CustomType {
  constructor(graph, label_to_id, next_id) {
    super();
    this.graph = graph;
    this.label_to_id = label_to_id;
    this.next_id = next_id;
  }
}
export const Builder$Builder = (graph, label_to_id, next_id) =>
  new Builder(graph, label_to_id, next_id);
export const Builder$isBuilder = (value) => value instanceof Builder;
export const Builder$Builder$graph = (value) => value.graph;
export const Builder$Builder$0 = (value) => value.graph;
export const Builder$Builder$label_to_id = (value) => value.label_to_id;
export const Builder$Builder$1 = (value) => value.label_to_id;
export const Builder$Builder$next_id = (value) => value.next_id;
export const Builder$Builder$2 = (value) => value.next_id;

/**
 * Creates a new empty labeled graph builder.
 *
 * ## Example
 *
 * ```gleam
 * import yog/builder/labeled
 * import yog/model.{Directed}
 *
 * let builder = labeled.new(Directed)
 * ```
 */
export function new$(graph_type) {
  return new Builder($model.new$(graph_type), $dict.new$(), 0);
}

/**
 * Creates a new empty labeled directed graph builder.
 *
 * This is a convenience function equivalent to `labeled.new(Directed)`.
 *
 * ## Example
 *
 * ```gleam
 * import yog/builder/labeled
 *
 * let builder =
 *   labeled.directed()
 *   |> labeled.add_edge("home", "work", 10)
 * ```
 */
export function directed() {
  return new Builder($model.new$(new $model.Directed()), $dict.new$(), 0);
}

/**
 * Creates a new empty labeled undirected graph builder.
 *
 * This is a convenience function equivalent to `labeled.new(Undirected)`.
 *
 * ## Example
 *
 * ```gleam
 * import yog/builder/labeled
 *
 * let builder =
 *   labeled.undirected()
 *   |> labeled.add_edge("A", "B", 5)
 * ```
 */
export function undirected() {
  return new Builder($model.new$(new $model.Undirected()), $dict.new$(), 0);
}

/**
 * Gets or creates a node for the given label, returning the builder and node ID.
 *
 * If a node with this label already exists, returns its ID without modification.
 * If it doesn't exist, creates a new node with the label as its data.
 *
 * ## Example
 *
 * ```gleam
 * let #(builder, node_a) = labeled.ensure_node(builder, "Node A")
 * let #(builder, node_b) = labeled.ensure_node(builder, "Node B")
 * // Now you have the IDs and can use them with lower-level operations
 * ```
 */
export function ensure_node(builder, label) {
  let $ = $dict.get(builder.label_to_id, label);
  if ($ instanceof Ok) {
    let id = $[0];
    return [builder, id];
  } else {
    let id = builder.next_id;
    let new_graph = $model.add_node(builder.graph, id, label);
    let new_mapping = $dict.insert(builder.label_to_id, label, id);
    return [new Builder(new_graph, new_mapping, id + 1), id];
  }
}

/**
 * Adds a node with the given label explicitly.
 *
 * If a node with this label already exists, its data will be replaced.
 * This is useful when you want to add nodes before adding edges.
 *
 * ## Example
 *
 * ```gleam
 * builder
 * |> labeled.add_node("Node A")
 * |> labeled.add_node("Node B")
 * |> labeled.add_edge("Node A", "Node B", 5)
 * ```
 */
export function add_node(builder, label) {
  let $ = ensure_node(builder, label);
  let new_builder;
  new_builder = $[0];
  return new_builder;
}

/**
 * Adds an edge between two labeled nodes.
 *
 * If either node doesn't exist, it will be created automatically.
 * For directed graphs, adds a single edge from `from` to `to`.
 * For undirected graphs, adds edges in both directions.
 *
 * ## Example
 *
 * ```gleam
 * builder
 * |> labeled.add_edge(from: "A", to: "B", with: 10)
 * |> labeled.add_edge(from: "B", to: "C", with: 5)
 * ```
 */
export function add_edge(builder, src_label, dst_label, weight) {
  let $ = ensure_node(builder, src_label);
  let builder$1;
  let src_id;
  builder$1 = $[0];
  src_id = $[1];
  let $1 = ensure_node(builder$1, dst_label);
  let builder$2;
  let dst_id;
  builder$2 = $1[0];
  dst_id = $1[1];
  let new_graph = $model.add_edge(builder$2.graph, src_id, dst_id, weight);
  return new Builder(new_graph, builder$2.label_to_id, builder$2.next_id);
}

/**
 * Adds an unweighted edge between two labeled nodes.
 *
 * This is a convenience function for graphs where edges have no meaningful weight.
 * Uses `Nil` as the edge data type. Nodes are created automatically if they don't exist.
 *
 * ## Example
 *
 * ```gleam
 * import yog/builder/labeled
 *
 * let builder: labeled.Builder(String, Nil) = labeled.directed()
 *   |> labeled.add_unweighted_edge("A", "B")
 *   |> labeled.add_unweighted_edge("B", "C")
 * ```
 */
export function add_unweighted_edge(builder, src_label, dst_label) {
  let $ = ensure_node(builder, src_label);
  let builder$1;
  let src_id;
  builder$1 = $[0];
  src_id = $[1];
  let $1 = ensure_node(builder$1, dst_label);
  let builder$2;
  let dst_id;
  builder$2 = $1[0];
  dst_id = $1[1];
  let new_graph = $model.add_edge(builder$2.graph, src_id, dst_id, undefined);
  return new Builder(new_graph, builder$2.label_to_id, builder$2.next_id);
}

/**
 * Adds a simple edge with weight 1 between two labeled nodes.
 *
 * This is a convenience function for graphs with integer weights where
 * a default weight of 1 is appropriate (e.g., unweighted graphs, hop counts).
 * Nodes are created automatically if they don't exist.
 *
 * ## Example
 *
 * ```gleam
 * import yog/builder/labeled
 *
 * let builder = labeled.directed()
 *   |> labeled.add_simple_edge("home", "work")
 *   |> labeled.add_simple_edge("work", "gym")
 * // Both edges have weight 1
 * ```
 */
export function add_simple_edge(builder, src_label, dst_label) {
  let $ = ensure_node(builder, src_label);
  let builder$1;
  let src_id;
  builder$1 = $[0];
  src_id = $[1];
  let $1 = ensure_node(builder$1, dst_label);
  let builder$2;
  let dst_id;
  builder$2 = $1[0];
  dst_id = $1[1];
  let new_graph = $model.add_edge(builder$2.graph, src_id, dst_id, 1);
  return new Builder(new_graph, builder$2.label_to_id, builder$2.next_id);
}

/**
 * Looks up the internal node ID for a given label.
 *
 * Returns `Ok(id)` if the label exists, `Error(Nil)` if it doesn't.
 *
 * ## Example
 *
 * ```gleam
 * case labeled.get_id(builder, "Node A") {
 *   Ok(id) -> // Use the ID
 *   Error(_) -> // Label doesn't exist
 * }
 * ```
 */
export function get_id(builder, label) {
  return $dict.get(builder.label_to_id, label);
}

/**
 * Converts the builder to a standard `Graph`.
 *
 * The resulting graph uses integer IDs internally and stores the labels
 * as node data. This graph can be used with all yog algorithms.
 *
 * ## Example
 *
 * ```gleam
 * let graph = labeled.to_graph(builder)
 * // Now use with pathfinding, traversal, etc.
 * ```
 */
export function to_graph(builder) {
  return builder.graph;
}

/**
 * Creates a labeled graph builder from a list of edges #(src_label, dst_label, weight).
 *
 * ## Example
 *
 * ```gleam
 * let builder = labeled.from_list(model.Directed, [#("A", "B", 10), #("B", "C", 5)])
 * ```
 */
export function from_list(graph_type, edges) {
  return $list.fold(
    edges,
    new$(graph_type),
    (b, edge) => {
      let src;
      let dst;
      let weight;
      src = edge[0];
      dst = edge[1];
      weight = edge[2];
      return add_edge(b, src, dst, weight);
    },
  );
}

/**
 * Creates a labeled graph builder from a list of unweighted edges #(src_label, dst_label).
 *
 * ## Example
 *
 * ```gleam
 * let builder = labeled.from_unweighted_list(model.Directed, [#("A", "B"), #("B", "C")])
 * ```
 */
export function from_unweighted_list(graph_type, edges) {
  return $list.fold(
    edges,
    new$(graph_type),
    (b, edge) => {
      let src;
      let dst;
      src = edge[0];
      dst = edge[1];
      return add_unweighted_edge(b, src, dst);
    },
  );
}

/**
 * Returns all labels that have been added to the builder.
 *
 * ## Example
 *
 * ```gleam
 * let labels = labeled.all_labels(builder)
 * // ["Node A", "Node B", "Node C"]
 * ```
 */
export function all_labels(builder) {
  return $dict.keys(builder.label_to_id);
}

function list_map_ids_to_labels(edges, graph) {
  let _pipe = edges;
  return $list.filter_map(
    _pipe,
    (edge) => {
      let node_id;
      let edge_data;
      node_id = edge[0];
      edge_data = edge[1];
      let $ = $dict.get(graph.nodes, node_id);
      if ($ instanceof Ok) {
        let label = $[0];
        return new Ok([label, edge_data]);
      } else {
        return new Error(undefined);
      }
    },
  );
}

/**
 * Gets the successors of a node by its label.
 *
 * Returns a list of tuples containing the successor's label and edge data.
 *
 * ## Example
 *
 * ```gleam
 * case labeled.successors(builder, "Node A") {
 *   Ok(successors) -> // List of #(label, edge_data)
 *   Error(_) -> // Node doesn't exist
 * }
 * ```
 */
export function successors(builder, label) {
  return $result.try$(
    get_id(builder, label),
    (id) => {
      let successor_edges = $model.successors(builder.graph, id);
      let _pipe = successor_edges;
      let _pipe$1 = list_map_ids_to_labels(_pipe, builder.graph);
      return new Ok(_pipe$1);
    },
  );
}

/**
 * Gets the predecessors of a node by its label.
 *
 * Returns a list of tuples containing the predecessor's label and edge data.
 *
 * ## Example
 *
 * ```gleam
 * case labeled.predecessors(builder, "Node A") {
 *   Ok(predecessors) -> // List of #(label, edge_data)
 *   Error(_) -> // Node doesn't exist
 * }
 * ```
 */
export function predecessors(builder, label) {
  return $result.try$(
    get_id(builder, label),
    (id) => {
      let predecessor_edges = $model.predecessors(builder.graph, id);
      let _pipe = predecessor_edges;
      let _pipe$1 = list_map_ids_to_labels(_pipe, builder.graph);
      return new Ok(_pipe$1);
    },
  );
}
