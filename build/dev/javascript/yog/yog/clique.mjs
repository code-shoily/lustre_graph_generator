/// <reference types="./clique.d.mts" />
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import { toList, prepend as listPrepend } from "../gleam.mjs";
import * as $model from "../yog/model.mjs";

function get_neighbor_ids_set(graph, id) {
  let _pipe = $model.neighbors(graph, id);
  let _pipe$1 = $list.map(_pipe, (neighbor) => { return neighbor[0]; });
  return $set.from_list(_pipe$1);
}

function bron_kerbosch_all(graph, r, p, x, acc) {
  let $ = $set.is_empty(p) && $set.is_empty(x);
  if ($) {
    return listPrepend(r, acc);
  } else {
    let _pipe = $set.to_list(p);
    let _pipe$1 = $list.fold(
      _pipe,
      [p, x, acc],
      (state, v) => {
        let curr_p;
        let curr_x;
        let curr_acc;
        curr_p = state[0];
        curr_x = state[1];
        curr_acc = state[2];
        let v_neighbors = get_neighbor_ids_set(graph, v);
        let new_acc = bron_kerbosch_all(
          graph,
          $set.insert(r, v),
          $set.intersection(curr_p, v_neighbors),
          $set.intersection(curr_x, v_neighbors),
          curr_acc,
        );
        return [$set.delete$(curr_p, v), $set.insert(curr_x, v), new_acc];
      },
    );
    return ((res) => { return res[2]; })(_pipe$1);
  }
}

/**
 * Finds all maximal cliques in an undirected graph.
 *
 * A maximal clique is a clique that cannot be extended by adding another node.
 * Note that there can be many maximal cliques, and they may have different sizes.
 *
 * **Time Complexity:** O(3^(n/3)) worst case
 *
 * ## Example
 *
 * ```gleam
 * import yog
 * import yog/clique
 *
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, "A")
 *   |> yog.add_node(2, "B")
 *   |> yog.add_node(3, "C")
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *
 * clique.all_maximal_cliques(graph)
 * // => [set.from_list([1, 2]), set.from_list([2, 3])]
 * ```
 */
export function all_maximal_cliques(graph) {
  let all_nodes = $model.all_nodes(graph);
  let p = $set.from_list(all_nodes);
  let r = $set.new$();
  let x = $set.new$();
  return bron_kerbosch_all(graph, r, p, x, toList([]));
}

function choose_pivot(p, x) {
  let _pipe = $set.union(p, x);
  let _pipe$1 = $set.to_list(_pipe);
  let _pipe$2 = $list.first(_pipe$1);
  return $result.unwrap(_pipe$2, -1);
}

function bron_kerbosch_pivot(graph, r, p, x) {
  let $ = $set.is_empty(p) && $set.is_empty(x);
  if ($) {
    return r;
  } else {
    let pivot = choose_pivot(p, x);
    let pivot_neighbors = get_neighbor_ids_set(graph, pivot);
    let candidates = $set.drop(p, $set.to_list(pivot_neighbors));
    let _pipe = $set.to_list(candidates);
    let _pipe$1 = $list.fold(
      _pipe,
      [p, x, $set.new$()],
      (acc, v) => {
        let curr_p;
        let curr_x;
        let best_r;
        curr_p = acc[0];
        curr_x = acc[1];
        best_r = acc[2];
        let v_neighbors = get_neighbor_ids_set(graph, v);
        let recursive_r = bron_kerbosch_pivot(
          graph,
          $set.insert(r, v),
          $set.intersection(curr_p, v_neighbors),
          $set.intersection(curr_x, v_neighbors),
        );
        let _block;
        let $1 = $set.size(recursive_r) > $set.size(best_r);
        if ($1) {
          _block = recursive_r;
        } else {
          _block = best_r;
        }
        let new_best = _block;
        return [$set.delete$(curr_p, v), $set.insert(curr_x, v), new_best];
      },
    );
    return ((res) => { return res[2]; })(_pipe$1);
  }
}

/**
 * Finds the maximum clique in an undirected graph.
 *
 * A clique is a subset of nodes where every pair of nodes is connected.
 * This function returns the largest such subset found using the Bron-Kerbosch
 * algorithm with pivoting.
 *
 * **Time Complexity:** O(3^(n/3)) worst case, but much faster in practice due to pivoting
 *
 * **Note:** This algorithm works on undirected graphs. For directed graphs,
 * consider using the underlying undirected structure.
 *
 * ## Example
 *
 * ```gleam
 * import yog
 * import yog/clique
 *
 * // Create a graph with a 4-clique
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, "A")
 *   |> yog.add_node(2, "B")
 *   |> yog.add_node(3, "C")
 *   |> yog.add_node(4, "D")
 *   |> yog.add_node(5, "E")
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 1, to: 3, with: 1)
 *   |> yog.add_edge(from: 1, to: 4, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *   |> yog.add_edge(from: 2, to: 4, with: 1)
 *   |> yog.add_edge(from: 3, to: 4, with: 1)
 *   |> yog.add_edge(from: 4, to: 5, with: 1)
 *
 * clique.max_clique(graph)
 * // => set.from_list([1, 2, 3, 4])  // The 4-clique
 * ```
 */
export function max_clique(graph) {
  let all_nodes = $model.all_nodes(graph);
  let p = $set.from_list(all_nodes);
  let r = $set.new$();
  let x = $set.new$();
  return bron_kerbosch_pivot(graph, r, p, x);
}

function bron_kerbosch_k(graph, r, p, k, acc) {
  let r_size = $set.size(r);
  let $ = r_size === k;
  if ($) {
    return listPrepend(r, acc);
  } else {
    let $1 = (r_size + $set.size(p)) < k;
    if ($1) {
      return acc;
    } else {
      let _pipe = $set.to_list(p);
      let _pipe$1 = $list.fold(
        _pipe,
        [p, acc],
        (state, v) => {
          let curr_p;
          let curr_acc;
          curr_p = state[0];
          curr_acc = state[1];
          let v_neighbors = get_neighbor_ids_set(graph, v);
          let new_acc = bron_kerbosch_k(
            graph,
            $set.insert(r, v),
            $set.intersection(curr_p, v_neighbors),
            k,
            curr_acc,
          );
          return [$set.delete$(curr_p, v), new_acc];
        },
      );
      return ((res) => { return res[1]; })(_pipe$1);
    }
  }
}

/**
 * Finds all cliques of exactly size k in an undirected graph.
 *
 * Returns all subsets of k nodes where every pair of nodes is connected.
 * Uses a modified Bron-Kerbosch algorithm with early pruning for efficiency.
 *
 * **Time Complexity:** Generally faster than finding all maximal cliques when k is small,
 * as branches are pruned when they cannot reach size k.
 *
 * ## Example
 *
 * ```gleam
 * import yog
 * import yog/clique
 *
 * // Create a graph with triangles (3-cliques)
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, "A")
 *   |> yog.add_node(2, "B")
 *   |> yog.add_node(3, "C")
 *   |> yog.add_node(4, "D")
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *   |> yog.add_edge(from: 1, to: 3, with: 1)
 *   |> yog.add_edge(from: 3, to: 4, with: 1)
 *
 * clique.k_cliques(graph, 3)
 * // => [set.from_list([1, 2, 3])]  // The single triangle
 *
 * clique.k_cliques(graph, 2)
 * // => [set.from_list([1, 2]), set.from_list([1, 3]),
 * //     set.from_list([2, 3]), set.from_list([3, 4])]  // All edges
 * ```
 *
 * ## Use Cases
 *
 * - Finding triangles (k=3) in social networks
 * - Detecting specific-sized communities
 * - Pattern matching in biological networks
 * - Computational chemistry (finding molecular motifs)
 */
export function k_cliques(graph, k) {
  let $ = k <= 0;
  if ($) {
    return toList([]);
  } else {
    let all_nodes = $model.all_nodes(graph);
    let p = $set.from_list(all_nodes);
    let r = $set.new$();
    return bron_kerbosch_k(graph, r, p, k, toList([]));
  }
}
