/// <reference types="./random.d.mts" />
import * as $float from "../../../gleam_stdlib/gleam/float.mjs";
import * as $int from "../../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $set from "../../../gleam_stdlib/gleam/set.mjs";
import { Ok, Error, toList, Empty as $Empty, remainderInt } from "../../gleam.mjs";
import * as $utils from "../../yog/internal/utils.mjs";
import * as $model from "../../yog/model.mjs";

function add_random_edges(
  loop$graph,
  loop$n,
  loop$m,
  loop$existing,
  loop$graph_type
) {
  while (true) {
    let graph = loop$graph;
    let n = loop$n;
    let m = loop$m;
    let existing = loop$existing;
    let graph_type = loop$graph_type;
    let $ = m <= 0;
    if ($) {
      return graph;
    } else {
      let i = $int.random(n);
      let j = $int.random(n);
      let $1 = i === j;
      if ($1) {
        loop$graph = graph;
        loop$n = n;
        loop$m = m;
        loop$existing = existing;
        loop$graph_type = graph_type;
      } else {
        let _block;
        if (graph_type instanceof $model.Directed) {
          _block = [i, j];
        } else {
          let $2 = i < j;
          if ($2) {
            _block = [i, j];
          } else {
            _block = [j, i];
          }
        }
        let edge = _block;
        let $2 = $set.contains(existing, edge);
        if ($2) {
          loop$graph = graph;
          loop$n = n;
          loop$m = m;
          loop$existing = existing;
          loop$graph_type = graph_type;
        } else {
          let new_graph = $model.add_edge(graph, edge[0], edge[1], 1);
          let new_existing = $set.insert(existing, edge);
          loop$graph = new_graph;
          loop$n = n;
          loop$m = m - 1;
          loop$existing = new_existing;
          loop$graph_type = graph_type;
        }
      }
    }
  }
}

function build_degree_list(graph, graph_type) {
  let _pipe = $model.all_nodes(graph);
  return $list.flat_map(
    _pipe,
    (node) => {
      let _block;
      if (graph_type instanceof $model.Directed) {
        _block = $list.length($model.successors(graph, node));
      } else {
        _block = $list.length($model.neighbors(graph, node));
      }
      let degree = _block;
      return $list.repeat(node, $int.max(degree, 1));
    },
  );
}

function add_random_edge_not_to(loop$graph, loop$from, loop$n) {
  while (true) {
    let graph = loop$graph;
    let from = loop$from;
    let n = loop$n;
    let to = $int.random(n);
    let $ = to === from;
    if ($) {
      loop$graph = graph;
      loop$from = from;
      loop$n = n;
    } else {
      let neighbors = $model.successors(graph, from);
      let neighbor_ids = $list.map(neighbors, (pair) => { return pair[0]; });
      let $1 = $list.contains(neighbor_ids, to);
      if ($1) {
        loop$graph = graph;
        loop$from = from;
        loop$n = n;
      } else {
        return $model.add_edge(graph, from, to, 1);
      }
    }
  }
}

function create_nodes(graph, n) {
  let _pipe = $utils.range(0, n - 1);
  return $list.fold(
    _pipe,
    graph,
    (g, i) => { return $model.add_node(g, i, undefined); },
  );
}

/**
 * Generates an Erdős-Rényi G(n, p) graph with specified graph type.
 */
export function erdos_renyi_gnp_with_type(n, p, graph_type) {
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
              let $1 = $float.random() < p;
              if ($1) {
                return $model.add_edge(acc, i, j, 1);
              } else {
                return acc;
              }
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
          (acc, j) => {
            let $ = $float.random() < p;
            if ($) {
              return $model.add_edge(acc, i, j, 1);
            } else {
              return acc;
            }
          },
        );
      },
    );
  }
}

/**
 * Generates a random graph using the Erdős-Rényi G(n, p) model.
 *
 * Each possible edge is included independently with probability p.
 *
 * **Expected edges:** p * n(n-1)/2 for undirected, p * n(n-1) for directed
 *
 * **Time Complexity:** O(n²) - must consider all possible edges
 *
 * ## Example
 *
 * ```gleam
 * // 50 nodes, each edge exists with 10% probability
 * // Expected ~122 edges for undirected
 * let graph = random.erdos_renyi_gnp(50, 0.1)
 * ```
 *
 * ## Use Cases
 *
 * - Baseline for comparing other random graph models
 * - Modeling networks with uniform connection probability
 * - Testing graph algorithms on random structures
 * - Phase transitions in network connectivity (p ~ 1/n)
 */
export function erdos_renyi_gnp(n, p) {
  return erdos_renyi_gnp_with_type(n, p, new $model.Undirected());
}

/**
 * Generates an Erdős-Rényi G(n, m) graph with specified graph type.
 */
export function erdos_renyi_gnm_with_type(n, m, graph_type) {
  let graph = create_nodes($model.new$(graph_type), n);
  let _block;
  if (graph_type instanceof $model.Directed) {
    _block = n * (n - 1);
  } else {
    _block = globalThis.Math.trunc((n * (n - 1)) / 2);
  }
  let max_edges = _block;
  let actual_m = $int.min(m, max_edges);
  return add_random_edges(graph, n, actual_m, $set.new$(), graph_type);
}

/**
 * Generates a random graph using the Erdős-Rényi G(n, m) model.
 *
 * Exactly m edges are added uniformly at random (without replacement).
 *
 * **Time Complexity:** O(m) expected, O(m log m) worst case
 *
 * ## Example
 *
 * ```gleam
 * // 50 nodes, exactly 100 edges
 * let graph = random.erdos_renyi_gnm(50, 100)
 * ```
 *
 * ## Use Cases
 *
 * - Control exact edge count for testing
 * - Generate sparse graphs efficiently (m << n²)
 * - Benchmark algorithms with precise graph sizes
 */
export function erdos_renyi_gnm(n, m) {
  return erdos_renyi_gnm_with_type(n, m, new $model.Undirected());
}

/**
 * Generates a Watts-Strogatz graph with specified graph type.
 */
export function watts_strogatz_with_type(n, k, p, graph_type) {
  let $ = ((n < 3) || (k < 2)) || (k >= n);
  if ($) {
    return $model.new$(graph_type);
  } else {
    let graph = create_nodes($model.new$(graph_type), n);
    let half_k = globalThis.Math.trunc(k / 2);
    let _pipe = $utils.range(0, n - 1);
    return $list.fold(
      _pipe,
      graph,
      (g, i) => {
        let _pipe$1 = $utils.range(1, half_k);
        return $list.fold(
          _pipe$1,
          g,
          (acc, offset) => {
            let $1 = $float.random() < p;
            if ($1) {
              return add_random_edge_not_to(acc, i, n);
            } else {
              let j = remainderInt((i + offset), n);
              return $model.add_edge(acc, i, j, 1);
            }
          },
        );
      },
    );
  }
}

/**
 * Generates a small-world network using the Watts-Strogatz model.
 *
 * Creates a ring lattice where each node connects to k nearest neighbors,
 * then rewires each edge with probability p.
 *
 * **Properties:**
 * - High clustering coefficient (like regular lattices)
 * - Short average path length (like random graphs)
 * - "Small-world" phenomenon: most nodes reachable in few hops
 *
 * **Parameters:**
 * - n: Number of nodes
 * - k: Each node connects to k nearest neighbors (must be even)
 * - p: Rewiring probability (0 = regular lattice, 1 = random graph)
 *
 * **Time Complexity:** O(nk)
 *
 * ## Example
 *
 * ```gleam
 * // 100 nodes, each connected to 4 neighbors, 10% rewiring
 * let graph = random.watts_strogatz(100, 4, 0.1)
 * ```
 *
 * ## Use Cases
 *
 * - Model social networks (friends of friends, but some random connections)
 * - Neural networks (local connectivity with long-range connections)
 * - Study information diffusion and epidemic spreading
 * - Test algorithms on networks with community structure
 */
export function watts_strogatz(n, k, p) {
  return watts_strogatz_with_type(n, k, p, new $model.Undirected());
}

function list_at(loop$lst, loop$index) {
  while (true) {
    let lst = loop$lst;
    let index = loop$index;
    if (lst instanceof $Empty) {
      return new Error(undefined);
    } else if (index === 0) {
      let first = lst.head;
      return new Ok(first);
    } else {
      let n = index;
      if (n > 0) {
        let rest = lst.tail;
        loop$lst = rest;
        loop$index = n - 1;
      } else {
        return new Error(undefined);
      }
    }
  }
}

function select_preferential_targets(loop$degree_list, loop$m, loop$selected) {
  while (true) {
    let degree_list = loop$degree_list;
    let m = loop$m;
    let selected = loop$selected;
    let $ = ($set.size(selected) >= m) || $list.is_empty(degree_list);
    if ($) {
      return selected;
    } else {
      let list_size = $list.length(degree_list);
      let index = $int.random(list_size);
      let $1 = list_at(degree_list, index);
      if ($1 instanceof Ok) {
        let target = $1[0];
        let new_selected = $set.insert(selected, target);
        loop$degree_list = degree_list;
        loop$m = m;
        loop$selected = new_selected;
      } else {
        return selected;
      }
    }
  }
}

function add_node_with_preferential_attachment(graph, new_node, m, graph_type) {
  let with_node = $model.add_node(graph, new_node, undefined);
  let degree_list = build_degree_list(graph, graph_type);
  let targets = select_preferential_targets(degree_list, m, $set.new$());
  let _pipe = targets;
  let _pipe$1 = $set.to_list(_pipe);
  return $list.fold(
    _pipe$1,
    with_node,
    (g, target) => { return $model.add_edge(g, new_node, target, 1); },
  );
}

/**
 * Generates a Barabási-Albert graph with specified graph type.
 */
export function barabasi_albert_with_type(n, m, graph_type) {
  let $ = (n < m) || (m < 1);
  if ($) {
    return $model.new$(graph_type);
  } else {
    let m0 = $int.max(m, 2);
    let _block;
    let _pipe = $utils.range(0, m0 - 1);
    _block = $list.fold(
      _pipe,
      $model.new$(graph_type),
      (g, i) => { return $model.add_node(g, i, undefined); },
    );
    let initial = _block;
    let _block$1;
    if (graph_type instanceof $model.Directed) {
      let _pipe$1 = $utils.range(0, m0 - 1);
      _block$1 = $list.fold(
        _pipe$1,
        initial,
        (g, i) => {
          let _pipe$2 = $utils.range(0, m0 - 1);
          return $list.fold(
            _pipe$2,
            g,
            (acc, j) => {
              let $1 = i === j;
              if ($1) {
                return acc;
              } else {
                return $model.add_edge(acc, i, j, 1);
              }
            },
          );
        },
      );
    } else {
      let _pipe$1 = $utils.range(0, m0 - 1);
      _block$1 = $list.fold(
        _pipe$1,
        initial,
        (g, i) => {
          let _pipe$2 = $utils.range(i + 1, m0 - 1);
          return $list.fold(
            _pipe$2,
            g,
            (acc, j) => { return $model.add_edge(acc, i, j, 1); },
          );
        },
      );
    }
    let initial_with_edges = _block$1;
    let _pipe$1 = $utils.range(m0, n - 1);
    return $list.fold(
      _pipe$1,
      initial_with_edges,
      (g, new_node) => {
        return add_node_with_preferential_attachment(g, new_node, m, graph_type);
      },
    );
  }
}

/**
 * Generates a scale-free network using the Barabási-Albert model.
 *
 * Starts with m₀ nodes in a complete graph, then adds n - m₀ nodes.
 * Each new node connects to m existing nodes via preferential attachment
 * (probability proportional to node degree).
 *
 * **Properties:**
 * - Power-law degree distribution P(k) ~ k^(-γ)
 * - Scale-free (no characteristic scale)
 * - Robust to random failures, vulnerable to targeted attacks
 *
 * **Time Complexity:** O(nm)
 *
 * ## Example
 *
 * ```gleam
 * // 100 nodes, each new node connects to 3 existing nodes
 * // Results in ~300 edges
 * let graph = random.barabasi_albert(100, 3)
 * ```
 *
 * ## Use Cases
 *
 * - Model the internet, citation networks, social networks
 * - Study robustness and vulnerability
 * - Test algorithms on scale-free topologies
 * - Simulate viral spread on networks with hubs
 */
export function barabasi_albert(n, m) {
  return barabasi_albert_with_type(n, m, new $model.Undirected());
}

function build_random_tree(loop$graph, loop$n, loop$in_tree, loop$next_node) {
  while (true) {
    let graph = loop$graph;
    let n = loop$n;
    let in_tree = loop$in_tree;
    let next_node = loop$next_node;
    let $ = next_node >= n;
    if ($) {
      return graph;
    } else {
      let tree_list = $set.to_list(in_tree);
      let tree_size = $list.length(tree_list);
      let index = $int.random(tree_size);
      let $1 = list_at(tree_list, index);
      if ($1 instanceof Ok) {
        let parent = $1[0];
        let new_graph = $model.add_edge(graph, parent, next_node, 1);
        let new_in_tree = $set.insert(in_tree, next_node);
        loop$graph = new_graph;
        loop$n = n;
        loop$in_tree = new_in_tree;
        loop$next_node = next_node + 1;
      } else {
        return graph;
      }
    }
  }
}

/**
 * Generates a random tree with specified graph type.
 */
export function random_tree_with_type(n, graph_type) {
  let $ = n < 2;
  if ($) {
    return create_nodes($model.new$(graph_type), n);
  } else {
    let graph = create_nodes($model.new$(graph_type), n);
    let in_tree = $set.from_list(toList([0]));
    return build_random_tree(graph, n, in_tree, 1);
  }
}

/**
 * Generates a uniformly random tree on n nodes.
 *
 * Uses a random walk approach to generate a spanning tree.
 * Every labeled tree on n vertices has equal probability.
 *
 * **Properties:**
 * - Exactly n - 1 edges
 * - Connected and acyclic
 * - Random structure (no preferential attachment or locality bias)
 *
 * **Time Complexity:** O(n²) expected
 *
 * ## Example
 *
 * ```gleam
 * // Random tree with 50 nodes
 * let tree = random.random_tree(50)
 * ```
 *
 * ## Use Cases
 *
 * - Test tree algorithms (DFS, BFS, LCA, diameter)
 * - Model hierarchical structures with random branching
 * - Generate random spanning trees
 * - Benchmark on tree topologies
 */
export function random_tree(n) {
  return random_tree_with_type(n, new $model.Undirected());
}
