/// <reference types="./render.d.mts" />
import * as $json from "../../gleam_json/gleam/json.mjs";
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $function from "../../gleam_stdlib/gleam/function.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import {
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $model from "../yog/model.mjs";
import { Directed, Undirected } from "../yog/model.mjs";
import * as $pathfinding from "../yog/pathfinding.mjs";

export class MermaidOptions extends $CustomType {
  constructor(node_label, edge_label, highlighted_nodes, highlighted_edges) {
    super();
    this.node_label = node_label;
    this.edge_label = edge_label;
    this.highlighted_nodes = highlighted_nodes;
    this.highlighted_edges = highlighted_edges;
  }
}
export const MermaidOptions$MermaidOptions = (node_label, edge_label, highlighted_nodes, highlighted_edges) =>
  new MermaidOptions(node_label,
  edge_label,
  highlighted_nodes,
  highlighted_edges);
export const MermaidOptions$isMermaidOptions = (value) =>
  value instanceof MermaidOptions;
export const MermaidOptions$MermaidOptions$node_label = (value) =>
  value.node_label;
export const MermaidOptions$MermaidOptions$0 = (value) => value.node_label;
export const MermaidOptions$MermaidOptions$edge_label = (value) =>
  value.edge_label;
export const MermaidOptions$MermaidOptions$1 = (value) => value.edge_label;
export const MermaidOptions$MermaidOptions$highlighted_nodes = (value) =>
  value.highlighted_nodes;
export const MermaidOptions$MermaidOptions$2 = (value) =>
  value.highlighted_nodes;
export const MermaidOptions$MermaidOptions$highlighted_edges = (value) =>
  value.highlighted_edges;
export const MermaidOptions$MermaidOptions$3 = (value) =>
  value.highlighted_edges;

export class DotOptions extends $CustomType {
  constructor(node_label, edge_label, highlighted_nodes, highlighted_edges, node_shape, highlight_color) {
    super();
    this.node_label = node_label;
    this.edge_label = edge_label;
    this.highlighted_nodes = highlighted_nodes;
    this.highlighted_edges = highlighted_edges;
    this.node_shape = node_shape;
    this.highlight_color = highlight_color;
  }
}
export const DotOptions$DotOptions = (node_label, edge_label, highlighted_nodes, highlighted_edges, node_shape, highlight_color) =>
  new DotOptions(node_label,
  edge_label,
  highlighted_nodes,
  highlighted_edges,
  node_shape,
  highlight_color);
export const DotOptions$isDotOptions = (value) => value instanceof DotOptions;
export const DotOptions$DotOptions$node_label = (value) => value.node_label;
export const DotOptions$DotOptions$0 = (value) => value.node_label;
export const DotOptions$DotOptions$edge_label = (value) => value.edge_label;
export const DotOptions$DotOptions$1 = (value) => value.edge_label;
export const DotOptions$DotOptions$highlighted_nodes = (value) =>
  value.highlighted_nodes;
export const DotOptions$DotOptions$2 = (value) => value.highlighted_nodes;
export const DotOptions$DotOptions$highlighted_edges = (value) =>
  value.highlighted_edges;
export const DotOptions$DotOptions$3 = (value) => value.highlighted_edges;
export const DotOptions$DotOptions$node_shape = (value) => value.node_shape;
export const DotOptions$DotOptions$4 = (value) => value.node_shape;
export const DotOptions$DotOptions$highlight_color = (value) =>
  value.highlight_color;
export const DotOptions$DotOptions$5 = (value) => value.highlight_color;

export class JsonOptions extends $CustomType {
  constructor(node_mapper, edge_mapper) {
    super();
    this.node_mapper = node_mapper;
    this.edge_mapper = edge_mapper;
  }
}
export const JsonOptions$JsonOptions = (node_mapper, edge_mapper) =>
  new JsonOptions(node_mapper, edge_mapper);
export const JsonOptions$isJsonOptions = (value) =>
  value instanceof JsonOptions;
export const JsonOptions$JsonOptions$node_mapper = (value) => value.node_mapper;
export const JsonOptions$JsonOptions$0 = (value) => value.node_mapper;
export const JsonOptions$JsonOptions$edge_mapper = (value) => value.edge_mapper;
export const JsonOptions$JsonOptions$1 = (value) => value.edge_mapper;

/**
 * Creates default Mermaid options with simple labeling.
 *
 * Uses node ID as label and edge weight as-is.
 */
export function default_options() {
  return new MermaidOptions(
    (id, _) => { return $int.to_string(id); },
    (weight) => { return weight; },
    new None(),
    new None(),
  );
}

/**
 * Converts a graph to Mermaid diagram syntax.
 *
 * The graph's node data and edge data must be convertible to strings.
 * Use the options to customize labels and highlight specific paths.
 *
 * **Time Complexity:** O(V + E)
 *
 * ## Example
 *
 * ```gleam
 * let graph =
 *   model.new(Directed)
 *   |> model.add_node(1, "Start")
 *   |> model.add_node(2, "Process")
 *   |> model.add_node(3, "End")
 *   |> model.add_edge(from: 1, to: 2, with: "5")
 *   |> model.add_edge(from: 2, to: 3, with: "3")
 *
 * // Basic rendering
 * let diagram = render.to_mermaid(graph, default_options())
 *
 * // Highlight a path
 * let options = MermaidOptions(
 *   ..default_options(),
 *   highlighted_nodes: Some([1, 2, 3]),
 *   highlighted_edges: Some([#(1, 2), #(2, 3)]),
 * )
 * let highlighted = render.to_mermaid(graph, options)
 * ```
 *
 * The output can be embedded in markdown:
 * ````markdown
 * ```mermaid
 * graph TD
 *   1["Start"]
 *   2["Process"]
 *   3["End"]
 *   1 -->|5| 2
 *   2 -->|3| 3
 * ```
 * ````
 */
export function to_mermaid(graph, options) {
  let _block;
  let $ = graph.kind;
  if ($ instanceof Directed) {
    _block = "graph TD\n";
  } else {
    _block = "graph LR\n";
  }
  let graph_type = _block;
  let _block$1;
  let $1 = options.highlighted_nodes;
  let $2 = options.highlighted_edges;
  if ($1 instanceof Some) {
    _block$1 = "  classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:3px\n" + "  classDef highlightEdge stroke:#f57c00,stroke-width:3px\n";
  } else if ($2 instanceof Some) {
    _block$1 = "  classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:3px\n" + "  classDef highlightEdge stroke:#f57c00,stroke-width:3px\n";
  } else {
    _block$1 = "";
  }
  let styles = _block$1;
  let _block$2;
  let _pipe = $dict.fold(
    graph.nodes,
    toList([]),
    (acc, id, data) => {
      let label = options.node_label(id, data);
      let node_def = ((("  " + $int.to_string(id)) + "[\"") + label) + "\"]";
      let _block$3;
      let $3 = options.highlighted_nodes;
      if ($3 instanceof Some) {
        let highlighted = $3[0];
        let $4 = $list.contains(highlighted, id);
        if ($4) {
          _block$3 = node_def + ":::highlight";
        } else {
          _block$3 = node_def;
        }
      } else {
        _block$3 = node_def;
      }
      let node_with_highlight = _block$3;
      return listPrepend(node_with_highlight, acc);
    },
  );
  _block$2 = $string.join(_pipe, "\n");
  let nodes = _block$2;
  let _block$3;
  let _pipe$1 = $dict.fold(
    graph.out_edges,
    toList([]),
    (acc, from_id, targets) => {
      let inner_edges = $dict.fold(
        targets,
        toList([]),
        (inner_acc, to_id, weight) => {
          let $3 = graph.kind;
          if ($3 instanceof Undirected && from_id > to_id) {
            return inner_acc;
          } else {
            let _block$4;
            let $4 = graph.kind;
            if ($4 instanceof Directed) {
              _block$4 = "-->";
            } else {
              _block$4 = "---";
            }
            let arrow = _block$4;
            let _block$5;
            let $5 = options.highlighted_edges;
            if ($5 instanceof Some) {
              let edges = $5[0];
              _block$5 = $list.contains(edges, [from_id, to_id]) || $list.contains(
                edges,
                [to_id, from_id],
              );
            } else {
              _block$5 = false;
            }
            let is_highlighted = _block$5;
            let edge_def = (((((("  " + $int.to_string(from_id)) + " ") + arrow) + "|") + options.edge_label(
              weight,
            )) + "| ") + $int.to_string(to_id);
            let _block$6;
            if (is_highlighted) {
              _block$6 = edge_def + ":::highlightEdge";
            } else {
              _block$6 = edge_def;
            }
            let edge_with_highlight = _block$6;
            return listPrepend(edge_with_highlight, inner_acc);
          }
        },
      );
      return $list.flatten(toList([inner_edges, acc]));
    },
  );
  _block$3 = $string.join(_pipe$1, "\n");
  let edges = _block$3;
  return (((graph_type + styles) + nodes) + "\n") + edges;
}

function path_to_edges(nodes) {
  if (nodes instanceof $Empty) {
    return toList([]);
  } else {
    let $ = nodes.tail;
    if ($ instanceof $Empty) {
      return toList([]);
    } else {
      let first = nodes.head;
      let second = $.head;
      let rest = $.tail;
      return listPrepend(
        [first, second],
        path_to_edges(listPrepend(second, rest)),
      );
    }
  }
}

/**
 * Converts a shortest path result to highlighted Mermaid options.
 *
 * Useful for visualizing pathfinding algorithm results.
 *
 * ## Example
 *
 * ```gleam
 * let path = pathfinding.shortest_path(
 *   in: graph,
 *   from: 1,
 *   to: 5,
 *   with_zero: "0",
 *   with_add: string_add,
 *   with_compare: string_compare,
 * )
 *
 * case path {
 *   Some(p) -> {
 *     let options = render.path_to_options(p, default_options())
 *     let diagram = render.to_mermaid(graph, options)
 *     io.println(diagram)
 *   }
 *   None -> io.println("No path found")
 * }
 * ```
 */
export function path_to_options(path, base_options) {
  let nodes = path.nodes;
  let edges = path_to_edges(nodes);
  return new MermaidOptions(
    base_options.node_label,
    base_options.edge_label,
    new Some(nodes),
    new Some(edges),
  );
}

/**
 * Creates default DOT options with simple labeling.
 */
export function default_dot_options() {
  return new DotOptions(
    (id, _) => { return $int.to_string(id); },
    (weight) => { return weight; },
    new None(),
    new None(),
    "ellipse",
    "red",
  );
}

/**
 * Converts a graph to DOT (Graphviz) syntax.
 *
 * The graph's node data and edge data must be convertible to strings.
 * Use the options to customize labels and highlighting.
 *
 * **Time Complexity:** O(V + E)
 *
 * ## Example
 *
 * ```gleam
 * let graph =
 *   model.new(Directed)
 *   |> model.add_node(1, "Start")
 *   |> model.add_node(2, "Process")
 *   |> model.add_edge(from: 1, to: 2, with: "5")
 *
 * let diagram = render.to_dot(graph, default_dot_options())
 * // io.println(diagram)
 * ```
 *
 * This output can be processed by Graphviz tools (e.g., `dot -Tpng -o graph.png`):
 * ````dot
 * digraph G {
 *   node [shape=ellipse];
 *   1 [label="Start"];
 *   2 [label="Process"];
 *   1 -> 2 [label="5"];
 * }
 * ````
 * Converts a graph to DOT (Graphviz) syntax.
 */
export function to_dot(graph, options) {
  let _block;
  let $ = graph.kind;
  if ($ instanceof Directed) {
    _block = "digraph G {\n";
  } else {
    _block = "graph G {\n";
  }
  let graph_type = _block;
  let base_node_style = ("  node [shape=" + options.node_shape) + "];\n";
  let base_edge_style = "  edge [fontname=\"Helvetica\", fontsize=10];\n";
  let _block$1;
  let _pipe = $dict.fold(
    graph.nodes,
    toList([]),
    (acc, id, data) => {
      let label = options.node_label(id, data);
      let id_str = $int.to_string(id);
      let _block$2;
      let $1 = options.highlighted_nodes;
      if ($1 instanceof Some) {
        let highlighted = $1[0];
        let $2 = $list.contains(highlighted, id);
        if ($2) {
          _block$2 = (" fillcolor=\"" + options.highlight_color) + "\", style=filled";
        } else {
          _block$2 = "";
        }
      } else {
        _block$2 = "";
      }
      let mut_attrs = _block$2;
      return listPrepend(
        ((((("  " + id_str) + " [label=\"") + label) + "\"") + mut_attrs) + "];",
        acc,
      );
    },
  );
  _block$1 = $string.join(_pipe, "\n");
  let nodes = _block$1;
  let _block$2;
  let _pipe$1 = $dict.fold(
    graph.out_edges,
    toList([]),
    (acc, from_id, targets) => {
      let inner_edges = $dict.fold(
        targets,
        toList([]),
        (inner_acc, to_id, weight) => {
          let _block$3;
          let $1 = graph.kind;
          if ($1 instanceof Directed) {
            _block$3 = true;
          } else {
            _block$3 = from_id <= to_id;
          }
          let is_valid = _block$3;
          if (is_valid) {
            let _block$4;
            let $2 = graph.kind;
            if ($2 instanceof Directed) {
              _block$4 = " -> ";
            } else {
              _block$4 = " -- ";
            }
            let connector = _block$4;
            let _block$5;
            let $3 = options.highlighted_edges;
            if ($3 instanceof Some) {
              let highlighted = $3[0];
              _block$5 = $list.contains(highlighted, [from_id, to_id]) || $list.contains(
                highlighted,
                [to_id, from_id],
              );
            } else {
              _block$5 = false;
            }
            let is_highlighted = _block$5;
            let _block$6;
            if (is_highlighted) {
              _block$6 = (" color=\"" + options.highlight_color) + "\", penwidth=2";
            } else {
              _block$6 = "";
            }
            let mut_attrs = _block$6;
            let edge_def = ((((((("  " + $int.to_string(from_id)) + connector) + $int.to_string(
              to_id,
            )) + " [label=\"") + options.edge_label(weight)) + "\"") + mut_attrs) + "];";
            return listPrepend(edge_def, inner_acc);
          } else {
            return inner_acc;
          }
        },
      );
      return $list.flatten(toList([inner_edges, acc]));
    },
  );
  _block$2 = $string.join(_pipe$1, "\n");
  let edges = _block$2;
  return (((((graph_type + base_node_style) + base_edge_style) + nodes) + "\n") + edges) + "\n}";
}

/**
 * Converts a shortest path result to highlighted DOT options.
 *
 * ## Example
 *
 * ```gleam
 * let path = pathfinding.shortest_path(
 *   in: graph,
 *   from: 1,
 *   to: 5,
 *   with_zero: "0",
 *   with_add: string_add, // Assume these exist or map to int/float
 *   with_compare: string_compare,
 * )
 *
 * case path {
 *   Some(p) -> {
 *     let options = render.path_to_dot_options(p, default_dot_options())
 *     let diagram = render.to_dot(graph, options)
 *     io.println(diagram)
 *   }
 *   None -> io.println("No path found")
 * }
 * ```
 */
export function path_to_dot_options(path, base_options) {
  let nodes = path.nodes;
  let edges = path_to_edges(nodes);
  return new DotOptions(
    base_options.node_label,
    base_options.edge_label,
    new Some(nodes),
    new Some(edges),
    base_options.node_shape,
    base_options.highlight_color,
  );
}

/**
 * Creates default JSON options.
 *
 * Nodes are `{ "id": 1, "label": "Node A" }`.
 * Edges are `{ "source": 1, "target": 2, "weight": "5" }`.
 */
export function default_json_options() {
  return new JsonOptions(
    (id, data) => {
      return $json.object(
        toList([["id", $json.int(id)], ["label", $json.string(data)]]),
      );
    },
    (from, to, weight) => {
      return $json.object(
        toList([
          ["source", $json.int(from)],
          ["target", $json.int(to)],
          ["weight", $json.string(weight)],
        ]),
      );
    },
  );
}

/**
 * Converts a graph to a JSON string compatible with many visualization libraries (e.g., D3.js).
 *
 * The graph's node data and edge data must be convertible to strings.
 *
 * **Time Complexity:** O(V + E)
 *
 * ## Example
 *
 * ```gleam
 * import gleam/io
 * import gleam/json
 * import yog/model
 *
 * pub fn main() {
 *   let graph =
 *     model.new(model.Directed)
 *     |> model.add_node(1, "Alice")
 *     |> model.add_node(2, "Bob")
 *     |> model.add_edge(from: 1, to: 2, with: "follows")
 *
 *   let json_string = render.to_json(graph, render.default_json_options())
 *   io.println(json_string)
 * }
 * ```
 *
 * This outputs:
 * ````json
 * {
 *   "nodes": [
 *     {"id": 1, "label": "Alice"},
 *     {"id": 2, "label": "Bob"}
 *   ],
 *   "edges": [
 *     {"source": 1, "target": 2, "weight": "follows"}
 *   ]
 * }
 * ````
 */
export function to_json(graph, options) {
  let nodes_json = $dict.fold(
    graph.nodes,
    toList([]),
    (acc, id, data) => {
      return listPrepend(options.node_mapper(id, data), acc);
    },
  );
  let edges_json = $dict.fold(
    graph.out_edges,
    toList([]),
    (acc, from_id, targets) => {
      let inner_edges = $dict.fold(
        targets,
        toList([]),
        (inner_acc, to_id, weight) => {
          let $ = graph.kind;
          if ($ instanceof Undirected && from_id > to_id) {
            return inner_acc;
          } else {
            return listPrepend(
              options.edge_mapper(from_id, to_id, weight),
              inner_acc,
            );
          }
        },
      );
      return $list.flatten(toList([inner_edges, acc]));
    },
  );
  return $json.to_string(
    $json.object(
      toList([
        ["nodes", $json.array(nodes_json, $function.identity)],
        ["edges", $json.array(edges_json, $function.identity)],
      ]),
    ),
  );
}
