/// <reference types="./classic.d.mts" />
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $utils from "../../yog/internal/utils.mjs";
import * as $model from "../../yog/model.mjs";

function create_nodes(graph, n) {
  let _pipe = $utils.range(0, n - 1);
  return $list.fold(
    _pipe,
    graph,
    (g, i) => { return $model.add_node(g, i, undefined); },
  );
}

/**
 * Generates a complete graph with specified graph type.
 *
 * ## Example
 *
 * ```gleam
 * let directed_k4 = generate.complete_with_type(4, model.Directed)
 * ```
 */
export function complete_with_type(n, graph_type) {
  let graph = create_nodes($model.new$(graph_type), n);
  if (graph_type instanceof $model.Directed) {
    let _pipe = $utils.range(0, n - 1);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => {
        let _pipe$1 = $utils.range(0, n - 1);
        return $list.fold(
          _pipe$1,
          g,
          (acc, j) => {
            let $ = i === j;
            if ($) {
              return acc;
            } else {
              return $model.add_edge(acc, i, j, 1);
            }
          },
        );
      },
    );
  } else {
    let _pipe = $utils.range(0, n - 1);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => {
        let _pipe$1 = $utils.range(i + 1, n - 1);
        return $list.fold(
          _pipe$1,
          g,
          (acc, j) => { return $model.add_edge(acc, i, j, 1); },
        );
      },
    );
  }
}

/**
 * Generates a complete graph K_n where every node is connected to every other node.
 *
 * In a complete graph with n nodes, there are n(n-1)/2 edges for undirected
 * graphs and n(n-1) edges for directed graphs.
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(n²)
 *
 * ## Example
 *
 * ```gleam
 * let k5 = generate.complete(5)
 * // Creates a complete graph with 5 nodes
 * // Each node connected to all other 4 nodes
 * ```
 */
export function complete(n) {
  return complete_with_type(n, new $model.Undirected());
}

/**
 * Generates a cycle graph with specified graph type.
 */
export function cycle_with_type(n, graph_type) {
  let $ = n < 3;
  if ($) {
    return $model.new$(graph_type);
  } else {
    let graph = create_nodes($model.new$(graph_type), n);
    let _pipe = $utils.range(0, n - 1);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => {
        let _block;
        let $1 = i === (n - 1);
        if ($1) {
          _block = 0;
        } else {
          _block = i + 1;
        }
        let next = _block;
        return $model.add_edge(g, i, next, 1);
      },
    );
  }
}

/**
 * Generates a cycle graph C_n where nodes form a ring.
 *
 * A cycle graph connects n nodes in a circular pattern:
 * 0 -> 1 -> 2 -> ... -> (n-1) -> 0
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(n)
 *
 * ## Example
 *
 * ```gleam
 * let c6 = generate.cycle(6)
 * // Creates a cycle: 0-1-2-3-4-5-0
 * ```
 */
export function cycle(n) {
  return cycle_with_type(n, new $model.Undirected());
}

/**
 * Generates a path graph with specified graph type.
 */
export function path_with_type(n, graph_type) {
  let $ = n < 2;
  if ($) {
    return create_nodes($model.new$(graph_type), n);
  } else {
    let graph = create_nodes($model.new$(graph_type), n);
    let _pipe = $utils.range(0, n - 2);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => { return $model.add_edge(g, i, i + 1, 1); },
    );
  }
}

/**
 * Generates a path graph P_n where nodes form a linear chain.
 *
 * A path graph connects n nodes in a line:
 * 0 - 1 - 2 - ... - (n-1)
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(n)
 *
 * ## Example
 *
 * ```gleam
 * let p5 = generate.path(5)
 * // Creates a path: 0-1-2-3-4
 * ```
 */
export function path(n) {
  return path_with_type(n, new $model.Undirected());
}

/**
 * Generates a star graph with specified graph type.
 */
export function star_with_type(n, graph_type) {
  let $ = n < 2;
  if ($) {
    return create_nodes($model.new$(graph_type), n);
  } else {
    let graph = create_nodes($model.new$(graph_type), n);
    let _pipe = $utils.range(1, n - 1);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => { return $model.add_edge(g, 0, i, 1); },
    );
  }
}

/**
 * Generates a star graph where one central node is connected to all others.
 *
 * Node 0 is the center, connected to nodes 1 through n-1.
 * A star with n nodes has n-1 edges.
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(n)
 *
 * ## Example
 *
 * ```gleam
 * let s6 = generate.star(6)
 * // Center node 0 connected to nodes 1, 2, 3, 4, 5
 * ```
 */
export function star(n) {
  return star_with_type(n, new $model.Undirected());
}

/**
 * Generates a wheel graph with specified graph type.
 */
export function wheel_with_type(n, graph_type) {
  let $ = n < 4;
  if ($) {
    return $model.new$(graph_type);
  } else {
    let with_star = star_with_type(n, graph_type);
    let _pipe = $utils.range(1, n - 1);
    return $list.fold(
      _pipe,
      with_star,
      (g, i) => {
        let _block;
        let $1 = i === (n - 1);
        if ($1) {
          _block = 1;
        } else {
          _block = i + 1;
        }
        let next = _block;
        return $model.add_edge(g, i, next, 1);
      },
    );
  }
}

/**
 * Generates a wheel graph: a cycle with a central hub.
 *
 * A wheel graph is a cycle of n-1 nodes with an additional central node
 * connected to all nodes in the cycle.
 *
 * Node 0 is the center, nodes 1 through n-1 form the cycle.
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(n)
 *
 * ## Example
 *
 * ```gleam
 * let w6 = generate.wheel(6)
 * // Center node 0, cycle 1-2-3-4-5-1, center connected to all
 * ```
 */
export function wheel(n) {
  return wheel_with_type(n, new $model.Undirected());
}

/**
 * Generates a complete bipartite graph with specified graph type.
 */
export function complete_bipartite_with_type(m, n, graph_type) {
  let total = m + n;
  let graph = create_nodes($model.new$(graph_type), total);
  let _pipe = $utils.range(0, m - 1);
  return $list.fold(
    _pipe,
    graph,
    (g, left) => {
      let _pipe$1 = $utils.range(m, total - 1);
      return $list.fold(
        _pipe$1,
        g,
        (acc, right) => { return $model.add_edge(acc, left, right, 1); },
      );
    },
  );
}

/**
 * Generates a complete bipartite graph K_{m,n}.
 *
 * A complete bipartite graph has two partitions of nodes where every node
 * in the first partition is connected to every node in the second partition.
 *
 * Nodes 0 to m-1 form the left partition.
 * Nodes m to m+n-1 form the right partition.
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(mn)
 *
 * ## Example
 *
 * ```gleam
 * let k33 = generate.complete_bipartite(3, 3)
 * // Nodes 0,1,2 on left, nodes 3,4,5 on right
 * // All left nodes connected to all right nodes
 * ```
 */
export function complete_bipartite(m, n) {
  return complete_bipartite_with_type(m, n, new $model.Undirected());
}

/**
 * Generates an empty graph with specified graph type.
 */
export function empty_with_type(n, graph_type) {
  return create_nodes($model.new$(graph_type), n);
}

/**
 * Generates an empty graph with n nodes and no edges.
 *
 * Useful as a starting point for custom graph construction.
 *
 * **Time Complexity:** O(n)
 *
 * ## Example
 *
 * ```gleam
 * let empty = generate.empty(10)
 * // 10 isolated nodes, no edges
 * ```
 */
export function empty(n) {
  return empty_with_type(n, new $model.Undirected());
}

/**
 * Generates a 2D grid graph with specified graph type.
 */
export function grid_2d_with_type(rows, cols, graph_type) {
  let n = rows * cols;
  let graph = create_nodes($model.new$(graph_type), n);
  let _block;
  let _pipe = $utils.range(0, rows - 1);
  _block = $list.fold(
    _pipe,
    graph,
    (g, row) => {
      let _pipe$1 = $utils.range(0, cols - 2);
      return $list.fold(
        _pipe$1,
        g,
        (acc, col) => {
          let node = row * cols + col;
          return $model.add_edge(acc, node, node + 1, 1);
        },
      );
    },
  );
  let with_horizontal = _block;
  let _pipe$1 = $utils.range(0, rows - 2);
  return $list.fold(
    _pipe$1,
    with_horizontal,
    (g, row) => {
      let _pipe$2 = $utils.range(0, cols - 1);
      return $list.fold(
        _pipe$2,
        g,
        (acc, col) => {
          let node = row * cols + col;
          let below = node + cols;
          return $model.add_edge(acc, node, below, 1);
        },
      );
    },
  );
}

/**
 * Generates a 2D grid graph (lattice).
 *
 * Creates a grid of rows × cols nodes arranged in a rectangular lattice.
 * Each internal node has 4 neighbors (up, down, left, right).
 * Edge nodes have fewer neighbors.
 *
 * Node IDs are assigned row-major: node_id = row * cols + col
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(rows * cols)
 *
 * ## Example
 *
 * ```gleam
 * let grid = generate.grid_2d(3, 4)
 * // Creates a 3×4 grid:
 * //   0 - 1 - 2 - 3
 * //   |   |   |   |
 * //   4 - 5 - 6 - 7
 * //   |   |   |   |
 * //   8 - 9 -10 -11
 * ```
 */
export function grid_2d(rows, cols) {
  return grid_2d_with_type(rows, cols, new $model.Undirected());
}

/**
 * Generates a Petersen graph with specified graph type.
 */
export function petersen_with_type(graph_type) {
  let graph = create_nodes($model.new$(graph_type), 10);
  let _block;
  let _pipe = graph;
  let _pipe$1 = $model.add_edge(_pipe, 0, 1, 1);
  let _pipe$2 = $model.add_edge(_pipe$1, 1, 2, 1);
  let _pipe$3 = $model.add_edge(_pipe$2, 2, 3, 1);
  let _pipe$4 = $model.add_edge(_pipe$3, 3, 4, 1);
  _block = $model.add_edge(_pipe$4, 4, 0, 1);
  let with_outer = _block;
  let _block$1;
  let _pipe$5 = with_outer;
  let _pipe$6 = $model.add_edge(_pipe$5, 5, 7, 1);
  let _pipe$7 = $model.add_edge(_pipe$6, 7, 9, 1);
  let _pipe$8 = $model.add_edge(_pipe$7, 9, 6, 1);
  let _pipe$9 = $model.add_edge(_pipe$8, 6, 8, 1);
  _block$1 = $model.add_edge(_pipe$9, 8, 5, 1);
  let with_inner = _block$1;
  let _pipe$10 = with_inner;
  let _pipe$11 = $model.add_edge(_pipe$10, 0, 5, 1);
  let _pipe$12 = $model.add_edge(_pipe$11, 1, 6, 1);
  let _pipe$13 = $model.add_edge(_pipe$12, 2, 7, 1);
  let _pipe$14 = $model.add_edge(_pipe$13, 3, 8, 1);
  return $model.add_edge(_pipe$14, 4, 9, 1);
}

/**
 * Generates a Petersen graph.
 *
 * The Petersen graph is a famous graph in graph theory, often used as
 * a counterexample. It has 10 nodes and 15 edges, and is non-planar.
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(1) - fixed size
 *
 * ## Example
 *
 * ```gleam
 * let petersen = generate.petersen()
 * // Creates the classic Petersen graph with 10 nodes
 * ```
 */
export function petersen() {
  return petersen_with_type(new $model.Undirected());
}

function do_power(loop$base, loop$exp, loop$acc) {
  while (true) {
    let base = loop$base;
    let exp = loop$exp;
    let acc = loop$acc;
    if (exp === 0) {
      return acc;
    } else {
      loop$base = base;
      loop$exp = exp - 1;
      loop$acc = acc * base;
    }
  }
}

function power(base, exp) {
  return do_power(base, exp, 1);
}

/**
 * Generates a complete binary tree with specified graph type.
 */
export function binary_tree_with_type(depth, graph_type) {
  let $ = depth < 0;
  if ($) {
    return $model.new$(graph_type);
  } else {
    let n = power(2, depth + 1) - 1;
    let graph = create_nodes($model.new$(graph_type), n);
    let _pipe = $utils.range(0, n - 1);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => {
        let left_child = 2 * i + 1;
        let right_child = 2 * i + 2;
        let _block;
        let $1 = left_child < n;
        if ($1) {
          _block = $model.add_edge(g, i, left_child, 1);
        } else {
          _block = g;
        }
        let with_left = _block;
        let $2 = right_child < n;
        if ($2) {
          return $model.add_edge(with_left, i, right_child, 1);
        } else {
          return with_left;
        }
      },
    );
  }
}

/**
 * Generates a complete binary tree of given depth.
 *
 * A complete binary tree where:
 * - Node 0 is the root
 * - For node i: left child is 2i+1, right child is 2i+2
 * - Total nodes: 2^(depth+1) - 1
 *
 * All edges have unit weight (1).
 *
 * **Time Complexity:** O(2^depth)
 *
 * ## Example
 *
 * ```gleam
 * let tree = generate.binary_tree(3)
 * // Creates a binary tree with 15 nodes (depth 3)
 * //        0
 * //      /   \
 * //     1     2
 * //    / \   / \
 * //   3   4 5   6
 * //  /|\ /|\ ...
 * ```
 */
export function binary_tree(depth) {
  return binary_tree_with_type(depth, new $model.Undirected());
}
