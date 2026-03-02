/// <reference types="./bipartite.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $model from "../yog/model.mjs";

export class Partition extends $CustomType {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
}
export const Partition$Partition = (left, right) => new Partition(left, right);
export const Partition$isPartition = (value) => value instanceof Partition;
export const Partition$Partition$left = (value) => value.left;
export const Partition$Partition$0 = (value) => value.left;
export const Partition$Partition$right = (value) => value.right;
export const Partition$Partition$1 = (value) => value.right;

class Matching extends $CustomType {
  constructor(left_to_right, right_to_left) {
    super();
    this.left_to_right = left_to_right;
    this.right_to_left = right_to_left;
  }
}

export class StableMarriage extends $CustomType {
  constructor(matches) {
    super();
    this.matches = matches;
  }
}
export const StableMarriage$StableMarriage = (matches) =>
  new StableMarriage(matches);
export const StableMarriage$isStableMarriage = (value) =>
  value instanceof StableMarriage;
export const StableMarriage$StableMarriage$matches = (value) => value.matches;
export const StableMarriage$StableMarriage$0 = (value) => value.matches;

function get_neighbors(graph, node) {
  let $ = graph.kind;
  if ($ instanceof $model.Directed) {
    let _block;
    let $1 = $dict.get(graph.out_edges, node);
    if ($1 instanceof Ok) {
      let neighbors = $1[0];
      _block = $dict.keys(neighbors);
    } else {
      _block = toList([]);
    }
    let out_neighbors = _block;
    let _block$1;
    let $2 = $dict.get(graph.in_edges, node);
    if ($2 instanceof Ok) {
      let neighbors = $2[0];
      _block$1 = $dict.keys(neighbors);
    } else {
      _block$1 = toList([]);
    }
    let in_neighbors = _block$1;
    let _pipe = $list.append(out_neighbors, in_neighbors);
    return $list.unique(_pipe);
  } else {
    let $1 = $dict.get(graph.out_edges, node);
    if ($1 instanceof Ok) {
      let neighbors = $1[0];
      return $dict.keys(neighbors);
    } else {
      return toList([]);
    }
  }
}

function do_bfs_color(loop$graph, loop$queue, loop$colors) {
  while (true) {
    let graph = loop$graph;
    let queue = loop$queue;
    let colors = loop$colors;
    if (queue instanceof $Empty) {
      return new Some(colors);
    } else {
      let rest = queue.tail;
      let node = queue.head[0];
      let color = queue.head[1];
      let $ = $dict.get(colors, node);
      if ($ instanceof Ok) {
        let existing_color = $[0];
        let $1 = existing_color === color;
        if ($1) {
          loop$graph = graph;
          loop$queue = rest;
          loop$colors = colors;
        } else {
          return new None();
        }
      } else {
        let new_colors = $dict.insert(colors, node, color);
        let neighbors = get_neighbors(graph, node);
        let next_color = !color;
        let new_queue = $list.fold(
          neighbors,
          rest,
          (q, neighbor) => { return listPrepend([neighbor, next_color], q); },
        );
        loop$graph = graph;
        loop$queue = new_queue;
        loop$colors = new_colors;
      }
    }
  }
}

function bfs_color(graph, start, start_color, colors) {
  let queue = toList([[start, start_color]]);
  return do_bfs_color(graph, queue, colors);
}

function color_graph(loop$graph, loop$remaining_nodes, loop$colors) {
  while (true) {
    let graph = loop$graph;
    let remaining_nodes = loop$remaining_nodes;
    let colors = loop$colors;
    if (remaining_nodes instanceof $Empty) {
      return new Some(colors);
    } else {
      let node = remaining_nodes.head;
      let rest = remaining_nodes.tail;
      let $ = $dict.has_key(colors, node);
      if ($) {
        loop$graph = graph;
        loop$remaining_nodes = rest;
        loop$colors = colors;
      } else {
        let $1 = bfs_color(graph, node, true, colors);
        if ($1 instanceof Some) {
          let updated_colors = $1[0];
          loop$graph = graph;
          loop$remaining_nodes = rest;
          loop$colors = updated_colors;
        } else {
          return $1;
        }
      }
    }
  }
}

/**
 * Returns the two partitions of a bipartite graph, or None if the graph is not bipartite.
 *
 * Uses BFS with 2-coloring to detect bipartiteness and construct the partitions.
 * Handles disconnected graphs by checking all components.
 *
 * ## Example
 * ```gleam
 * case bipartite.partition(graph) {
 *   Some(Partition(left, right)) -> {
 *     // left and right are the two independent sets
 *     io.println("Graph is bipartite!")
 *   }
 *   None -> io.println("Graph is not bipartite")
 * }
 * ```
 *
 * **Time Complexity:** O(V + E)
 */
export function partition(graph) {
  let nodes = $dict.keys(graph.nodes);
  let initial_colors = $dict.new$();
  let $ = color_graph(graph, nodes, initial_colors);
  if ($ instanceof Some) {
    let colors = $[0];
    let $1 = $dict.fold(
      colors,
      [$set.new$(), $set.new$()],
      (acc, node, color) => {
        let left_set;
        let right_set;
        left_set = acc[0];
        right_set = acc[1];
        if (color) {
          return [$set.insert(left_set, node), right_set];
        } else {
          return [left_set, $set.insert(right_set, node)];
        }
      },
    );
    let left;
    let right;
    left = $1[0];
    right = $1[1];
    return new Some(new Partition(left, right));
  } else {
    return $;
  }
}

/**
 * Checks if a graph is bipartite (2-colorable).
 *
 * A graph is bipartite if its vertices can be divided into two disjoint sets
 * such that every edge connects a vertex in one set to a vertex in the other set.
 *
 * ## Example
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_node(4, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *   |> yog.add_edge(from: 3, to: 4, with: 1)
 *
 * bipartite.is_bipartite(graph)  // => True (can color as: 1,3 vs 2,4)
 * ```
 *
 * **Time Complexity:** O(V + E)
 */
export function is_bipartite(graph) {
  let $ = partition(graph);
  if ($ instanceof Some) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get the partner of a person in a stable matching.
 *
 * Returns `Some(partner)` if the person is matched, `None` otherwise.
 */
export function get_partner(marriage, person) {
  let _pipe = $dict.get(marriage.matches, person);
  return $option.from_result(_pipe);
}

function build_rankings(prefs) {
  return $dict.fold(
    prefs,
    $dict.new$(),
    (rankings, person, pref_list) => {
      let ranking = $list.index_fold(
        pref_list,
        $dict.new$(),
        (rank_map, candidate, index) => {
          return $dict.insert(rank_map, candidate, index);
        },
      );
      return $dict.insert(rankings, person, ranking);
    },
  );
}

function get_current_match(matches, person) {
  let _pipe = $dict.get(matches, person);
  return $option.from_result(_pipe);
}

function prefers(rankings, receiver, proposer, current_partner) {
  let $ = $dict.get(rankings, receiver);
  if ($ instanceof Ok) {
    let receiver_ranking = $[0];
    let _block;
    let _pipe = $dict.get(receiver_ranking, proposer);
    _block = $result.unwrap(_pipe, 999_999);
    let proposer_rank = _block;
    let _block$1;
    let _pipe$1 = $dict.get(receiver_ranking, current_partner);
    _block$1 = $result.unwrap(_pipe$1, 999_999);
    let current_rank = _block$1;
    return proposer_rank < current_rank;
  } else {
    return false;
  }
}

function gale_shapley(
  loop$free_left,
  loop$left_prefs,
  loop$right_rankings,
  loop$matches,
  loop$next_proposal
) {
  while (true) {
    let free_left = loop$free_left;
    let left_prefs = loop$left_prefs;
    let right_rankings = loop$right_rankings;
    let matches = loop$matches;
    let next_proposal = loop$next_proposal;
    if (free_left instanceof $Empty) {
      return matches;
    } else {
      let proposer = free_left.head;
      let rest_free = free_left.tail;
      let _block;
      let _pipe = $dict.get(left_prefs, proposer);
      _block = $result.unwrap(_pipe, toList([]));
      let pref_list = _block;
      let _block$1;
      let _pipe$1 = $dict.get(next_proposal, proposer);
      _block$1 = $result.unwrap(_pipe$1, 0);
      let proposal_index = _block$1;
      let $ = $list.drop(pref_list, proposal_index);
      if ($ instanceof $Empty) {
        loop$free_left = rest_free;
        loop$left_prefs = left_prefs;
        loop$right_rankings = right_rankings;
        loop$matches = matches;
        loop$next_proposal = next_proposal;
      } else {
        let receiver = $.head;
        let updated_next = $dict.insert(
          next_proposal,
          proposer,
          proposal_index + 1,
        );
        let $1 = get_current_match(matches, receiver);
        if ($1 instanceof Some) {
          let current_partner = $1[0];
          let $2 = prefers(right_rankings, receiver, proposer, current_partner);
          if ($2) {
            let _block$2;
            let _pipe$2 = matches;
            let _pipe$3 = $dict.delete$(_pipe$2, current_partner);
            let _pipe$4 = $dict.insert(_pipe$3, proposer, receiver);
            _block$2 = $dict.insert(_pipe$4, receiver, proposer);
            let new_matches = _block$2;
            let new_free = listPrepend(current_partner, rest_free);
            loop$free_left = new_free;
            loop$left_prefs = left_prefs;
            loop$right_rankings = right_rankings;
            loop$matches = new_matches;
            loop$next_proposal = updated_next;
          } else {
            loop$free_left = listPrepend(proposer, rest_free);
            loop$left_prefs = left_prefs;
            loop$right_rankings = right_rankings;
            loop$matches = matches;
            loop$next_proposal = updated_next;
          }
        } else {
          let _block$2;
          let _pipe$2 = matches;
          let _pipe$3 = $dict.insert(_pipe$2, proposer, receiver);
          _block$2 = $dict.insert(_pipe$3, receiver, proposer);
          let new_matches = _block$2;
          loop$free_left = rest_free;
          loop$left_prefs = left_prefs;
          loop$right_rankings = right_rankings;
          loop$matches = new_matches;
          loop$next_proposal = updated_next;
        }
      }
    }
  }
}

/**
 * Finds a stable matching given preference lists for two groups.
 *
 * Uses the Gale-Shapley algorithm to find a stable matching where no two people
 * would both prefer each other over their current partners.
 *
 * The algorithm is "proposer-optimal" - it finds the best stable matching for
 * the proposing group (left), and the worst stable matching for the receiving
 * group (right).
 *
 * ## Parameters
 *
 * - `left_prefs` - Dict mapping each left person to their preference list (most preferred first)
 * - `right_prefs` - Dict mapping each right person to their preference list (most preferred first)
 *
 * ## Returns
 *
 * A `StableMarriage` containing the matched pairs. Use `get_partner()` to query matches.
 *
 * ## Example
 *
 * ```gleam
 * // Medical residency matching
 * let residents = dict.from_list([
 *   #(1, [101, 102, 103]),  // Resident 1 prefers hospitals 101, 102, 103
 *   #(2, [102, 101, 103]),
 *   #(3, [101, 103, 102]),
 * ])
 *
 * let hospitals = dict.from_list([
 *   #(101, [1, 2, 3]),      // Hospital 101 prefers residents 1, 2, 3
 *   #(102, [2, 1, 3]),
 *   #(103, [1, 2, 3]),
 * ])
 *
 * let matching = bipartite.stable_marriage(residents, hospitals)
 * case get_partner(matching, 1) {
 *   Some(hospital) -> io.println("Resident 1 matched to hospital " <> int.to_string(hospital))
 *   None -> io.println("Resident 1 unmatched")
 * }
 * ```
 *
 * ## Properties
 *
 * - **Stable:** No two people would both prefer each other over their current partners
 * - **Complete:** Everyone is matched (if groups are equal size)
 * - **Optimal for proposers:** Left group gets best stable matching possible
 * - **Pessimal for receivers:** Right group gets worst stable matching possible
 *
 * **Time Complexity:** O(n²) where n is the size of each group
 *
 * ## Use Cases
 *
 * - Medical residency matching (NRMP)
 * - College admissions
 * - Job assignments
 * - Roommate pairing
 * - Task allocation
 */
export function stable_marriage(left_prefs, right_prefs) {
  let right_rankings = build_rankings(right_prefs);
  let _block;
  let _pipe = $dict.to_list(left_prefs);
  let _pipe$1 = $list.sort(
    _pipe,
    (a, b) => { return $int.compare(a[0], b[0]); },
  );
  _block = $list.map(_pipe$1, (pair) => { return pair[0]; });
  let free_left = _block;
  let matches = $dict.new$();
  let next_proposal = $dict.new$();
  let final_matches = gale_shapley(
    free_left,
    left_prefs,
    right_rankings,
    matches,
    next_proposal,
  );
  return new StableMarriage(final_matches);
}

function try_neighbors(
  loop$graph,
  loop$left_node,
  loop$right_neighbors,
  loop$partition,
  loop$matching,
  loop$visited
) {
  while (true) {
    let graph = loop$graph;
    let left_node = loop$left_node;
    let right_neighbors = loop$right_neighbors;
    let partition = loop$partition;
    let matching = loop$matching;
    let visited = loop$visited;
    if (right_neighbors instanceof $Empty) {
      return new None();
    } else {
      let right_node = right_neighbors.head;
      let rest = right_neighbors.tail;
      let $ = $set.contains(visited, right_node);
      if ($) {
        loop$graph = graph;
        loop$left_node = left_node;
        loop$right_neighbors = rest;
        loop$partition = partition;
        loop$matching = matching;
        loop$visited = visited;
      } else {
        let new_visited = $set.insert(visited, right_node);
        let $1 = $dict.get(matching.right_to_left, right_node);
        if ($1 instanceof Ok) {
          let matched_left = $1[0];
          let $2 = find_augmenting_path(
            graph,
            matched_left,
            partition,
            new Matching(
              $dict.delete$(matching.left_to_right, matched_left),
              $dict.delete$(matching.right_to_left, right_node),
            ),
            new_visited,
          );
          if ($2 instanceof Some) {
            let updated_matching = $2[0];
            return new Some(
              new Matching(
                $dict.insert(
                  updated_matching.left_to_right,
                  left_node,
                  right_node,
                ),
                $dict.insert(
                  updated_matching.right_to_left,
                  right_node,
                  left_node,
                ),
              ),
            );
          } else {
            loop$graph = graph;
            loop$left_node = left_node;
            loop$right_neighbors = rest;
            loop$partition = partition;
            loop$matching = matching;
            loop$visited = visited;
          }
        } else {
          return new Some(
            new Matching(
              $dict.insert(matching.left_to_right, left_node, right_node),
              $dict.insert(matching.right_to_left, right_node, left_node),
            ),
          );
        }
      }
    }
  }
}

function find_augmenting_path(graph, left_node, partition, matching, visited) {
  let $ = $dict.has_key(matching.left_to_right, left_node);
  if ($) {
    return new None();
  } else {
    let _block;
    let _pipe = get_neighbors(graph, left_node);
    _block = $list.filter(
      _pipe,
      (n) => { return $set.contains(partition.right, n); },
    );
    let right_neighbors = _block;
    return try_neighbors(
      graph,
      left_node,
      right_neighbors,
      partition,
      matching,
      visited,
    );
  }
}

/**
 * Finds a maximum matching in a bipartite graph.
 *
 * A matching is a set of edges with no common vertices. A maximum matching
 * has the largest possible number of edges.
 *
 * Uses the augmenting path algorithm (also known as the Hungarian algorithm
 * for unweighted bipartite matching).
 *
 * Returns a list of matched pairs `#(left_node, right_node)`.
 *
 * ## Example
 * ```gleam
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)  // left
 *   |> yog.add_node(2, Nil)  // left
 *   |> yog.add_node(3, Nil)  // right
 *   |> yog.add_node(4, Nil)  // right
 *   |> yog.add_edge(from: 1, to: 3, with: 1)
 *   |> yog.add_edge(from: 1, to: 4, with: 1)
 *   |> yog.add_edge(from: 2, to: 3, with: 1)
 *
 * case bipartite.partition(graph) {
 *   Some(p) -> {
 *     let matching = bipartite.maximum_matching(graph, p)
 *     // => [#(1, 3), #(2, 4)] or [#(1, 4), #(2, 3)]
 *   }
 *   None -> panic as "Not bipartite"
 * }
 * ```
 *
 * **Time Complexity:** O(V * E)
 */
export function maximum_matching(graph, partition) {
  let matching = new Matching($dict.new$(), $dict.new$());
  let left_list = $set.to_list(partition.left);
  let final_matching = $list.fold(
    left_list,
    matching,
    (current_matching, left_node) => {
      let visited = $set.new$();
      let $ = find_augmenting_path(
        graph,
        left_node,
        partition,
        current_matching,
        visited,
      );
      if ($ instanceof Some) {
        let updated_matching = $[0];
        return updated_matching;
      } else {
        return current_matching;
      }
    },
  );
  return $dict.fold(
    final_matching.left_to_right,
    toList([]),
    (acc, left, right) => { return listPrepend([left, right], acc); },
  );
}
