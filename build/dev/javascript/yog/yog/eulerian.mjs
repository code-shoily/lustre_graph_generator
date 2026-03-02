/// <reference types="./eulerian.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import { Ok, toList, Empty as $Empty, prepend as listPrepend } from "../gleam.mjs";
import * as $model from "../yog/model.mjs";
import { Directed, Undirected } from "../yog/model.mjs";
import * as $traversal from "../yog/traversal.mjs";

function get_degree_undirected(graph, node) {
  let $ = $dict.get(graph.out_edges, node);
  if ($ instanceof Ok) {
    let neighbors = $[0];
    return $dict.size(neighbors);
  } else {
    return 0;
  }
}

function get_in_degree(graph, node) {
  let $ = $dict.get(graph.in_edges, node);
  if ($ instanceof Ok) {
    let neighbors = $[0];
    return $dict.size(neighbors);
  } else {
    return 0;
  }
}

function get_out_degree(graph, node) {
  let $ = $dict.get(graph.out_edges, node);
  if ($ instanceof Ok) {
    let neighbors = $[0];
    return $dict.size(neighbors);
  } else {
    return 0;
  }
}

function is_connected(graph) {
  let $ = (() => {
    let _pipe = $dict.keys(graph.nodes);
    return $list.first(_pipe);
  })();
  if ($ instanceof Ok) {
    let start = $[0];
    let visited = $traversal.walk(start, graph, new $traversal.BreadthFirst());
    return $list.length(visited) === $dict.size(graph.nodes);
  } else {
    return true;
  }
}

function check_eulerian_circuit_undirected(graph) {
  let _block;
  let _pipe = $dict.keys(graph.nodes);
  _block = $list.all(
    _pipe,
    (node) => {
      let degree = get_degree_undirected(graph, node);
      return (degree % 2) === 0;
    },
  );
  let all_even = _block;
  if (all_even) {
    return is_connected(graph);
  } else {
    return all_even;
  }
}

function check_eulerian_path_undirected(graph) {
  let _block;
  let _pipe = $dict.keys(graph.nodes);
  let _pipe$1 = $list.filter(
    _pipe,
    (node) => {
      let degree = get_degree_undirected(graph, node);
      return (degree % 2) === 1;
    },
  );
  _block = $list.length(_pipe$1);
  let odd_count = _block;
  if (odd_count === 0) {
    return is_connected(graph);
  } else if (odd_count === 2) {
    return is_connected(graph);
  } else {
    return false;
  }
}

function check_eulerian_circuit_directed(graph) {
  let _block;
  let _pipe = $dict.keys(graph.nodes);
  _block = $list.all(
    _pipe,
    (node) => {
      let in_deg = get_in_degree(graph, node);
      let out_deg = get_out_degree(graph, node);
      return in_deg === out_deg;
    },
  );
  let all_balanced = _block;
  return all_balanced && is_connected(graph);
}

/**
 * Checks if the graph has an Eulerian circuit (a cycle that visits every edge exactly once).
 *
 * ## Conditions
 * - **Undirected graph:** All vertices must have even degree and the graph must be connected
 * - **Directed graph:** All vertices must have equal in-degree and out-degree, and the graph must be strongly connected
 *
 * ## Example
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *   |> yog.add_edge(from: 3, to: 1, with: 1)
 *
 * has_eulerian_circuit(graph)  // => True (triangle)
 * ```
 *
 * **Time Complexity:** O(V + E)
 */
export function has_eulerian_circuit(graph) {
  let $ = $dict.size(graph.nodes);
  if ($ === 0) {
    return false;
  } else {
    let $1 = graph.kind;
    if ($1 instanceof Directed) {
      return check_eulerian_circuit_directed(graph);
    } else {
      return check_eulerian_circuit_undirected(graph);
    }
  }
}

function check_eulerian_path_directed(graph) {
  let _block;
  let _pipe = $dict.keys(graph.nodes);
  _block = $list.fold(
    _pipe,
    [0, 0, true],
    (acc, node) => {
      let starts;
      let ends;
      let still_balanced;
      starts = acc[0];
      ends = acc[1];
      still_balanced = acc[2];
      let in_deg = get_in_degree(graph, node);
      let out_deg = get_out_degree(graph, node);
      let diff = out_deg - in_deg;
      if (diff === 1) {
        return [starts + 1, ends, still_balanced];
      } else if (diff === -1) {
        return [starts, ends + 1, still_balanced];
      } else if (diff === 0) {
        return acc;
      } else {
        return [starts, ends, false];
      }
    },
  );
  let $ = _block;
  let start_count;
  let end_count;
  let balanced;
  start_count = $[0];
  end_count = $[1];
  balanced = $[2];
  if (balanced) {
    if (start_count === 0 && end_count === 0) {
      return is_connected(graph);
    } else if (start_count === 1 && end_count === 1) {
      return is_connected(graph);
    } else {
      return false;
    }
  } else {
    return balanced;
  }
}

/**
 * Checks if the graph has an Eulerian path (a path that visits every edge exactly once).
 *
 * ## Conditions
 * - **Undirected graph:** Exactly 0 or 2 vertices must have odd degree, and the graph must be connected
 * - **Directed graph:** At most one vertex with (out-degree - in-degree = 1), at most one with (in-degree - out-degree = 1), all others balanced
 *
 * ## Example
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *
 * has_eulerian_path(graph)  // => True (path from 1 to 3)
 * ```
 *
 * **Time Complexity:** O(V + E)
 */
export function has_eulerian_path(graph) {
  let $ = $dict.size(graph.nodes);
  if ($ === 0) {
    return false;
  } else {
    let $1 = graph.kind;
    if ($1 instanceof Directed) {
      return check_eulerian_path_directed(graph);
    } else {
      return check_eulerian_path_undirected(graph);
    }
  }
}

function find_odd_degree_vertex(graph) {
  let _pipe = $dict.keys(graph.nodes);
  let _pipe$1 = $list.find(
    _pipe,
    (node) => {
      let degree = get_degree_undirected(graph, node);
      return (degree % 2) === 1;
    },
  );
  let _pipe$2 = $option.from_result(_pipe$1);
  return $option.or(
    _pipe$2,
    (() => {
      let _pipe$3 = $dict.keys(graph.nodes);
      let _pipe$4 = $list.find(
        _pipe$3,
        (node) => { return get_degree_undirected(graph, node) > 0; },
      );
      return $option.from_result(_pipe$4);
    })(),
  );
}

function find_unbalanced_vertex(graph) {
  let _pipe = $dict.keys(graph.nodes);
  let _pipe$1 = $list.find(
    _pipe,
    (node) => {
      let in_deg = get_in_degree(graph, node);
      let out_deg = get_out_degree(graph, node);
      return out_deg > in_deg;
    },
  );
  let _pipe$2 = $option.from_result(_pipe$1);
  return $option.or(
    _pipe$2,
    (() => {
      let _pipe$3 = $dict.keys(graph.nodes);
      let _pipe$4 = $list.find(
        _pipe$3,
        (node) => { return get_out_degree(graph, node) > 0; },
      );
      return $option.from_result(_pipe$4);
    })(),
  );
}

function find_and_remove_edge_helper(
  loop$graph,
  loop$from,
  loop$edges,
  loop$checked
) {
  while (true) {
    let graph = loop$graph;
    let from = loop$from;
    let edges = loop$edges;
    let checked = loop$checked;
    if (edges instanceof $Empty) {
      return new None();
    } else {
      let f = edges.head[0];
      if (f === from) {
        let rest = edges.tail;
        let t = edges.head[1];
        let _block;
        let $ = graph.kind;
        if ($ instanceof Directed) {
          _block = $list.append(checked, rest);
        } else {
          let _pipe = $list.append(checked, rest);
          _block = $list.filter(
            _pipe,
            (edge) => {
              let a;
              let b;
              a = edge[0];
              b = edge[1];
              return (a !== t) || (b !== f);
            },
          );
        }
        let remaining = _block;
        return new Some([t, remaining]);
      } else {
        let edge = edges.head;
        let rest = edges.tail;
        loop$graph = graph;
        loop$from = from;
        loop$edges = rest;
        loop$checked = listPrepend(edge, checked);
      }
    }
  }
}

function find_and_remove_edge(graph, from, edges) {
  return find_and_remove_edge_helper(graph, from, edges, toList([]));
}

function do_hierholzer(graph, current, available_edges, path) {
  let $ = find_and_remove_edge(graph, current, available_edges);
  if ($ instanceof Some) {
    let next = $[0][0];
    let remaining_edges = $[0][1];
    let _pipe = do_hierholzer(graph, next, remaining_edges, path);
    return ((result) => {
      let edges_left;
      let built_path;
      edges_left = result[0];
      built_path = result[1];
      return [edges_left, listPrepend(current, built_path)];
    })(_pipe);
  } else {
    return [available_edges, listPrepend(current, path)];
  }
}

function build_edge_list(graph) {
  return $dict.fold(
    graph.out_edges,
    toList([]),
    (acc, from, neighbors) => {
      let _block;
      let _pipe = $dict.keys(neighbors);
      _block = $list.map(_pipe, (to) => { return [from, to]; });
      let edges_from_node = _block;
      return $list.append(acc, edges_from_node);
    },
  );
}

function hierholzer(graph, start) {
  let all_edges = build_edge_list(graph);
  let $ = do_hierholzer(graph, start, all_edges, toList([]));
  let path;
  path = $[1];
  return path;
}

/**
 * Finds an Eulerian circuit in the graph using Hierholzer's algorithm.
 *
 * Returns the path as a list of node IDs that form a circuit (starts and ends at the same node).
 * Returns None if no Eulerian circuit exists.
 *
 * **Time Complexity:** O(E)
 *
 * ## Example
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *   |> yog.add_edge(from: 3, to: 1, with: 1)
 *
 * find_eulerian_circuit(graph)  // => Some([1, 2, 3, 1])
 * ```
 */
export function find_eulerian_circuit(graph) {
  let $ = has_eulerian_circuit(graph);
  if ($) {
    let $1 = (() => {
      let _pipe = $dict.keys(graph.nodes);
      return $list.first(_pipe);
    })();
    if ($1 instanceof Ok) {
      let start = $1[0];
      let result = hierholzer(graph, start);
      let $2 = $list.is_empty(result);
      if ($2) {
        return new None();
      } else {
        return new Some(result);
      }
    } else {
      return new None();
    }
  } else {
    return new None();
  }
}

/**
 * Finds an Eulerian path in the graph using Hierholzer's algorithm.
 *
 * Returns the path as a list of node IDs. Returns None if no Eulerian path exists.
 *
 * **Time Complexity:** O(E)
 *
 * ## Example
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *
 * find_eulerian_path(graph)  // => Some([1, 2, 3])
 * ```
 */
export function find_eulerian_path(graph) {
  let $ = has_eulerian_path(graph);
  if ($) {
    let _block;
    let $1 = graph.kind;
    if ($1 instanceof Directed) {
      _block = find_unbalanced_vertex(graph);
    } else {
      _block = find_odd_degree_vertex(graph);
    }
    let start = _block;
    if (start instanceof Some) {
      let start_node = start[0];
      let result = hierholzer(graph, start_node);
      let $2 = $list.is_empty(result);
      if ($2) {
        return new None();
      } else {
        return new Some(result);
      }
    } else {
      return start;
    }
  } else {
    return new None();
  }
}
