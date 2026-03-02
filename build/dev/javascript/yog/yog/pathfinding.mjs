/// <reference types="./pathfinding.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Lt } from "../../gleam_stdlib/gleam/order.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import * as $priority_queue from "../../gleamy_structures/gleamy/priority_queue.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $queue from "../yog/internal/queue.mjs";
import * as $model from "../yog/model.mjs";

export class Path extends $CustomType {
  constructor(nodes, total_weight) {
    super();
    this.nodes = nodes;
    this.total_weight = total_weight;
  }
}
export const Path$Path = (nodes, total_weight) => new Path(nodes, total_weight);
export const Path$isPath = (value) => value instanceof Path;
export const Path$Path$nodes = (value) => value.nodes;
export const Path$Path$0 = (value) => value.nodes;
export const Path$Path$total_weight = (value) => value.total_weight;
export const Path$Path$1 = (value) => value.total_weight;

/**
 * A shortest path was found successfully
 */
export class ShortestPath extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}
export const BellmanFordResult$ShortestPath = (path) => new ShortestPath(path);
export const BellmanFordResult$isShortestPath = (value) =>
  value instanceof ShortestPath;
export const BellmanFordResult$ShortestPath$path = (value) => value.path;
export const BellmanFordResult$ShortestPath$0 = (value) => value.path;

export class NegativeCycle extends $CustomType {}
export const BellmanFordResult$NegativeCycle = () => new NegativeCycle();
export const BellmanFordResult$isNegativeCycle = (value) =>
  value instanceof NegativeCycle;

export class NoPath extends $CustomType {}
export const BellmanFordResult$NoPath = () => new NoPath();
export const BellmanFordResult$isNoPath = (value) => value instanceof NoPath;

/**
 * A shortest distance to goal was found
 */
export class FoundGoal extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const ImplicitBellmanFordResult$FoundGoal = ($0) => new FoundGoal($0);
export const ImplicitBellmanFordResult$isFoundGoal = (value) =>
  value instanceof FoundGoal;
export const ImplicitBellmanFordResult$FoundGoal$0 = (value) => value[0];

export class DetectedNegativeCycle extends $CustomType {}
export const ImplicitBellmanFordResult$DetectedNegativeCycle = () =>
  new DetectedNegativeCycle();
export const ImplicitBellmanFordResult$isDetectedNegativeCycle = (value) =>
  value instanceof DetectedNegativeCycle;

export class NoGoal extends $CustomType {}
export const ImplicitBellmanFordResult$NoGoal = () => new NoGoal();
export const ImplicitBellmanFordResult$isNoGoal = (value) =>
  value instanceof NoGoal;

function compare_frontier(a, b, cmp) {
  return cmp(a[0], b[0]);
}

function compare_distance_frontier(a, b, cmp) {
  return cmp(a[0], b[0]);
}

function compare_a_star_frontier(a, b, cmp) {
  return cmp(a[0], b[0]);
}

/**
 * Helper to determine if a node should be explored based on distance comparison.
 * Returns True if the node hasn't been visited or if the new distance is shorter.
 * 
 * @ignore
 */
function should_explore_node(visited, node, new_dist, compare) {
  let $ = $dict.get(visited, node);
  if ($ instanceof Ok) {
    let prev_dist = $[0];
    let $1 = compare(new_dist, prev_dist);
    if ($1 instanceof Lt) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function do_dijkstra(
  loop$graph,
  loop$goal,
  loop$frontier,
  loop$visited,
  loop$add,
  loop$compare
) {
  while (true) {
    let graph = loop$graph;
    let goal = loop$goal;
    let frontier = loop$frontier;
    let visited = loop$visited;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let $1 = $[0][0][1];
      if ($1 instanceof $Empty) {
        return new None();
      } else {
        let rest_frontier = $[0][1];
        let dist = $[0][0][0];
        let path = $1;
        let current = $1.head;
        let $2 = current === goal;
        if ($2) {
          return new Some(new Path($list.reverse(path), dist));
        } else {
          let should_explore = should_explore_node(
            visited,
            current,
            dist,
            compare,
          );
          if (should_explore) {
            let new_visited = $dict.insert(visited, current, dist);
            let _block;
            let _pipe = $model.successors(graph, current);
            _block = $list.fold(
              _pipe,
              rest_frontier,
              (h, neighbor) => {
                let next_id;
                let weight;
                next_id = neighbor[0];
                weight = neighbor[1];
                return $priority_queue.push(
                  h,
                  [add(dist, weight), listPrepend(next_id, path)],
                );
              },
            );
            let next_frontier = _block;
            loop$graph = graph;
            loop$goal = goal;
            loop$frontier = next_frontier;
            loop$visited = new_visited;
            loop$add = add;
            loop$compare = compare;
          } else {
            loop$graph = graph;
            loop$goal = goal;
            loop$frontier = rest_frontier;
            loop$visited = visited;
            loop$add = add;
            loop$compare = compare;
          }
        }
      }
    } else {
      return new None();
    }
  }
}

/**
 * Finds the shortest path between two nodes using Dijkstra's algorithm.
 *
 * Works with non-negative edge weights only. For negative weights, use `bellman_ford`.
 *
 * **Time Complexity:** O((V + E) log V) with heap
 *
 * ## Parameters
 *
 * - `zero`: The identity element for addition (e.g., 0 for integers)
 * - `add`: Function to add two weights
 * - `compare`: Function to compare two weights
 *
 * ## Example
 *
 * ```gleam
 * pathfinding.shortest_path(
 *   in: graph,
 *   from: 1,
 *   to: 5,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare
 * )
 * // => Some(Path([1, 2, 5], 15))
 * ```
 */
export function shortest_path(graph, start, goal, zero, add, compare) {
  let _block;
  let _pipe = $priority_queue.new$(
    (a, b) => { return compare_frontier(a, b, compare); },
  );
  _block = $priority_queue.push(_pipe, [zero, toList([start])]);
  let frontier = _block;
  return do_dijkstra(graph, goal, frontier, $dict.new$(), add, compare);
}

function do_single_source_dijkstra(
  loop$graph,
  loop$frontier,
  loop$distances,
  loop$add,
  loop$compare
) {
  while (true) {
    let graph = loop$graph;
    let frontier = loop$frontier;
    let distances = loop$distances;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let rest_frontier = $[0][1];
      let dist = $[0][0][0];
      let current = $[0][0][1];
      let should_explore = should_explore_node(
        distances,
        current,
        dist,
        compare,
      );
      if (should_explore) {
        let new_distances = $dict.insert(distances, current, dist);
        let _block;
        let _pipe = $model.successors(graph, current);
        _block = $list.fold(
          _pipe,
          rest_frontier,
          (h, neighbor) => {
            let next_id;
            let weight;
            next_id = neighbor[0];
            weight = neighbor[1];
            return $priority_queue.push(h, [add(dist, weight), next_id]);
          },
        );
        let next_frontier = _block;
        loop$graph = graph;
        loop$frontier = next_frontier;
        loop$distances = new_distances;
        loop$add = add;
        loop$compare = compare;
      } else {
        loop$graph = graph;
        loop$frontier = rest_frontier;
        loop$distances = distances;
        loop$add = add;
        loop$compare = compare;
      }
    } else {
      return distances;
    }
  }
}

/**
 * Computes shortest distances from a source node to all reachable nodes.
 *
 * Returns a dictionary mapping each reachable node to its shortest distance
 * from the source. Unreachable nodes are not included in the result.
 *
 * This is useful when you need distances to multiple destinations, or want
 * to find the closest target among many options. More efficient than running
 * `shortest_path` multiple times.
 *
 * **Time Complexity:** O((V + E) log V) with heap
 *
 * ## Parameters
 *
 * - `zero`: The identity element for addition (e.g., 0 for integers)
 * - `add`: Function to add two weights
 * - `compare`: Function to compare two weights
 *
 * ## Example
 *
 * ```gleam
 * // Find distances from node 1 to all reachable nodes
 * let distances = pathfinding.single_source_distances(
 *   in: graph,
 *   from: 1,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare
 * )
 * // => dict.from_list([#(1, 0), #(2, 5), #(3, 8), #(4, 15)])
 *
 * // Find closest target among many options
 * let targets = [10, 20, 30]
 * let closest = targets
 *   |> list.filter_map(fn(t) { dict.get(distances, t) })
 *   |> list.sort(int.compare)
 *   |> list.first
 * ```
 *
 * ## Use Cases
 *
 * - Finding nearest target among multiple options
 * - Computing distance maps for game AI
 * - Network routing table generation
 * - Graph analysis (centrality measures)
 * - Reverse pathfinding (with `transform.transpose`)
 */
export function single_source_distances(graph, source, zero, add, compare) {
  let _block;
  let _pipe = $priority_queue.new$(
    (a, b) => { return compare_distance_frontier(a, b, compare); },
  );
  _block = $priority_queue.push(_pipe, [zero, source]);
  let frontier = _block;
  return do_single_source_dijkstra(graph, frontier, $dict.new$(), add, compare);
}

function do_a_star(
  loop$graph,
  loop$goal,
  loop$frontier,
  loop$visited,
  loop$add,
  loop$compare,
  loop$h
) {
  while (true) {
    let graph = loop$graph;
    let goal = loop$goal;
    let frontier = loop$frontier;
    let visited = loop$visited;
    let add = loop$add;
    let compare = loop$compare;
    let h = loop$h;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let $1 = $[0][0][2];
      if ($1 instanceof $Empty) {
        return new None();
      } else {
        let rest_frontier = $[0][1];
        let dist = $[0][0][1];
        let path = $1;
        let current = $1.head;
        let $2 = current === goal;
        if ($2) {
          return new Some(new Path($list.reverse(path), dist));
        } else {
          let should_explore = should_explore_node(
            visited,
            current,
            dist,
            compare,
          );
          if (should_explore) {
            let new_visited = $dict.insert(visited, current, dist);
            let _block;
            let _pipe = $model.successors(graph, current);
            _block = $list.fold(
              _pipe,
              rest_frontier,
              (acc_h, neighbor) => {
                let next_id;
                let weight;
                next_id = neighbor[0];
                weight = neighbor[1];
                let next_dist = add(dist, weight);
                let f_score = add(next_dist, h(next_id, goal));
                return $priority_queue.push(
                  acc_h,
                  [f_score, next_dist, listPrepend(next_id, path)],
                );
              },
            );
            let next_frontier = _block;
            loop$graph = graph;
            loop$goal = goal;
            loop$frontier = next_frontier;
            loop$visited = new_visited;
            loop$add = add;
            loop$compare = compare;
            loop$h = h;
          } else {
            loop$graph = graph;
            loop$goal = goal;
            loop$frontier = rest_frontier;
            loop$visited = visited;
            loop$add = add;
            loop$compare = compare;
            loop$h = h;
          }
        }
      }
    } else {
      return new None();
    }
  }
}

/**
 * Finds the shortest path using A* search with a heuristic function.
 *
 * A* is more efficient than Dijkstra when you have a good heuristic estimate
 * of the remaining distance to the goal. The heuristic must be admissible
 * (never overestimate the actual distance) to guarantee finding the shortest path.
 *
 * **Time Complexity:** O((V + E) log V), but often faster than Dijkstra in practice
 *
 * ## Parameters
 *
 * - `heuristic`: A function that estimates distance from any node to the goal.
 *   Must be admissible (h(n) ≤ actual distance) to guarantee shortest path.
 *
 * ## Example
 *
 * ```gleam
 * // Manhattan distance heuristic for grid
 * let h = fn(node, goal) {
 *   int.absolute_value(node.x - goal.x) + int.absolute_value(node.y - goal.y)
 * }
 *
 * pathfinding.a_star(
 *   in: graph,
 *   from: start,
 *   to: goal,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare,
 *   heuristic: h
 * )
 * ```
 */
export function a_star(graph, start, goal, zero, add, compare, h) {
  let initial_f = h(start, goal);
  let _block;
  let _pipe = $priority_queue.new$(
    (a, b) => { return compare_a_star_frontier(a, b, compare); },
  );
  _block = $priority_queue.push(_pipe, [initial_f, zero, toList([start])]);
  let frontier = _block;
  return do_a_star(graph, goal, frontier, $dict.new$(), add, compare, h);
}

function relaxation_passes(
  loop$graph,
  loop$nodes,
  loop$distances,
  loop$predecessors,
  loop$remaining,
  loop$add,
  loop$compare
) {
  while (true) {
    let graph = loop$graph;
    let nodes = loop$nodes;
    let distances = loop$distances;
    let predecessors = loop$predecessors;
    let remaining = loop$remaining;
    let add = loop$add;
    let compare = loop$compare;
    let $ = remaining <= 0;
    if ($) {
      return [distances, predecessors];
    } else {
      let $1 = $list.fold(
        nodes,
        [distances, predecessors],
        (acc, u) => {
          let dists;
          let preds;
          dists = acc[0];
          preds = acc[1];
          let $2 = $dict.get(dists, u);
          if ($2 instanceof Ok) {
            let u_dist = $2[0];
            let neighbors = $model.successors(graph, u);
            return $list.fold(
              neighbors,
              [dists, preds],
              (inner_acc, edge) => {
                let v;
                let weight;
                v = edge[0];
                weight = edge[1];
                let curr_dists;
                let curr_preds;
                curr_dists = inner_acc[0];
                curr_preds = inner_acc[1];
                let new_dist = add(u_dist, weight);
                let $3 = $dict.get(curr_dists, v);
                if ($3 instanceof Ok) {
                  let v_dist = $3[0];
                  let $4 = compare(new_dist, v_dist);
                  if ($4 instanceof Lt) {
                    return [
                      $dict.insert(curr_dists, v, new_dist),
                      $dict.insert(curr_preds, v, u),
                    ];
                  } else {
                    return inner_acc;
                  }
                } else {
                  return [
                    $dict.insert(curr_dists, v, new_dist),
                    $dict.insert(curr_preds, v, u),
                  ];
                }
              },
            );
          } else {
            return acc;
          }
        },
      );
      let new_distances;
      let new_predecessors;
      new_distances = $1[0];
      new_predecessors = $1[1];
      loop$graph = graph;
      loop$nodes = nodes;
      loop$distances = new_distances;
      loop$predecessors = new_predecessors;
      loop$remaining = remaining - 1;
      loop$add = add;
      loop$compare = compare;
    }
  }
}

function has_negative_cycle(graph, nodes, distances, add, compare) {
  return $list.any(
    nodes,
    (u) => {
      let $ = $dict.get(distances, u);
      if ($ instanceof Ok) {
        let u_dist = $[0];
        let _pipe = $model.successors(graph, u);
        return $list.any(
          _pipe,
          (edge) => {
            let v;
            let weight;
            v = edge[0];
            weight = edge[1];
            let new_dist = add(u_dist, weight);
            let $1 = $dict.get(distances, v);
            if ($1 instanceof Ok) {
              let v_dist = $1[0];
              let $2 = compare(new_dist, v_dist);
              if ($2 instanceof Lt) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          },
        );
      } else {
        return false;
      }
    },
  );
}

function reconstruct_path(loop$predecessors, loop$start, loop$current, loop$acc) {
  while (true) {
    let predecessors = loop$predecessors;
    let start = loop$start;
    let current = loop$current;
    let acc = loop$acc;
    let $ = current === start;
    if ($) {
      return new Ok(acc);
    } else {
      let $1 = $dict.get(predecessors, current);
      if ($1 instanceof Ok) {
        let pred = $1[0];
        loop$predecessors = predecessors;
        loop$start = start;
        loop$current = pred;
        loop$acc = listPrepend(pred, acc);
      } else {
        return $1;
      }
    }
  }
}

/**
 * Finds shortest path with support for negative edge weights using Bellman-Ford.
 *
 * Unlike Dijkstra and A*, this algorithm can handle negative edge weights.
 * It also detects negative cycles reachable from the source node.
 *
 * **Time Complexity:** O(VE) where V is vertices and E is edges
 *
 * ## Returns
 *
 * - `ShortestPath(path)`: If a valid shortest path exists
 * - `NegativeCycle`: If a negative cycle is reachable from the start node
 * - `NoPath`: If no path exists from start to goal
 *
 * ## Example
 *
 * ```gleam
 * pathfinding.bellman_ford(
 *   in: graph,
 *   from: 1,
 *   to: 5,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare
 * )
 * // => ShortestPath(Path([1, 3, 5], -2))  // Can have negative total weight
 * // or NegativeCycle                       // If cycle detected
 * // or NoPath                              // If unreachable
 * ```
 */
export function bellman_ford(graph, start, goal, zero, add, compare) {
  let all_nodes = $model.all_nodes(graph);
  let initial_distances = $dict.from_list(toList([[start, zero]]));
  let initial_predecessors = $dict.new$();
  let node_count = $list.length(all_nodes);
  let $ = relaxation_passes(
    graph,
    all_nodes,
    initial_distances,
    initial_predecessors,
    node_count - 1,
    add,
    compare,
  );
  let distances;
  let predecessors;
  distances = $[0];
  predecessors = $[1];
  let $1 = has_negative_cycle(graph, all_nodes, distances, add, compare);
  if ($1) {
    return new NegativeCycle();
  } else {
    let $2 = $dict.get(distances, goal);
    if ($2 instanceof Ok) {
      let dist = $2[0];
      let $3 = reconstruct_path(predecessors, start, goal, toList([goal]));
      if ($3 instanceof Ok) {
        let path = $3[0];
        return new ShortestPath(new Path(path, dist));
      } else {
        return new NoPath();
      }
    } else {
      return new NoPath();
    }
  }
}

/**
 * Detects if there's a negative cycle by checking if any node has negative distance to itself
 * 
 * @ignore
 */
function detect_negative_cycle(distances, nodes, zero, compare) {
  let _pipe = nodes;
  return $list.any(
    _pipe,
    (i) => {
      let $ = $dict.get(distances, [i, i]);
      if ($ instanceof Ok) {
        let dist = $[0];
        let $1 = compare(dist, zero);
        if ($1 instanceof Lt) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  );
}

/**
 * Computes shortest paths between all pairs of nodes using the Floyd-Warshall algorithm.
 *
 * Returns a nested dictionary where `distances[i][j]` gives the shortest distance from node `i` to node `j`.
 * If no path exists between two nodes, the pair will not be present in the dictionary.
 *
 * Returns `Error(Nil)` if a negative cycle is detected in the graph.
 *
 * **Time Complexity:** O(V³)
 * **Space Complexity:** O(V²)
 *
 * ## Parameters
 *
 * - `zero`: The identity element for addition (e.g., `0` for integers, `0.0` for floats)
 * - `add`: Function to add two weights
 * - `compare`: Function to compare two weights
 *
 * ## Example
 *
 * ```gleam
 * import gleam/dict
 * import gleam/int
 * import gleam/io
 * import yog
 * import yog/pathfinding
 *
 * pub fn main() {
 *   let graph =
 *     yog.directed()
 *     |> yog.add_node(1, "A")
 *     |> yog.add_node(2, "B")
 *     |> yog.add_node(3, "C")
 *     |> yog.add_edge(from: 1, to: 2, with: 4)
 *     |> yog.add_edge(from: 2, to: 3, with: 3)
 *     |> yog.add_edge(from: 1, to: 3, with: 10)
 *
 *   case pathfinding.floyd_warshall(
 *     in: graph,
 *     with_zero: 0,
 *     with_add: int.add,
 *     with_compare: int.compare
 *   ) {
 *     Ok(distances) -> {
 *       // Query distance from node 1 to node 3
 *       let assert Ok(row) = dict.get(distances, 1)
 *       let assert Ok(dist) = dict.get(row, 3)
 *       // dist = 7 (via node 2: 4 + 3)
 *       io.println("Distance from 1 to 3: " <> int.to_string(dist))
 *     }
 *     Error(Nil) -> io.println("Negative cycle detected!")
 *   }
 * }
 * ```
 *
 * ## Handling Negative Weights
 *
 * Floyd-Warshall can handle negative edge weights and will detect negative cycles:
 *
 * ```gleam
 * let graph_with_negative_cycle =
 *   yog.directed()
 *   |> yog.add_node(1, "A")
 *   |> yog.add_node(2, "B")
 *   |> yog.add_edge(from: 1, to: 2, with: 5)
 *   |> yog.add_edge(from: 2, to: 1, with: -10)
 *
 * case pathfinding.floyd_warshall(
 *   in: graph_with_negative_cycle,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare
 * ) {
 *   Ok(_) -> io.println("No negative cycle")
 *   Error(Nil) -> io.println("Negative cycle detected!")  // This will execute
 * }
 * ```
 *
 * ## Use Cases
 *
 * - Computing distance matrices for all node pairs
 * - Finding transitive closure of a graph
 * - Detecting negative cycles
 * - Preprocessing for queries about arbitrary node pairs
 * - Graph metrics (diameter, centrality)
 */
export function floyd_warshall(graph, zero, add, compare) {
  let nodes = $dict.keys(graph.nodes);
  let _block;
  let _pipe = nodes;
  _block = $list.fold(
    _pipe,
    $dict.new$(),
    (distances, i) => {
      let _pipe$1 = nodes;
      return $list.fold(
        _pipe$1,
        distances,
        (distances, j) => {
          let $ = i === j;
          if ($) {
            let $1 = $dict.get(graph.out_edges, i);
            if ($1 instanceof Ok) {
              let neighbors = $1[0];
              let $2 = $dict.get(neighbors, j);
              if ($2 instanceof Ok) {
                let weight = $2[0];
                let $3 = compare(weight, zero);
                if ($3 instanceof Lt) {
                  return $dict.insert(distances, [i, j], weight);
                } else {
                  return $dict.insert(distances, [i, j], zero);
                }
              } else {
                return $dict.insert(distances, [i, j], zero);
              }
            } else {
              return $dict.insert(distances, [i, j], zero);
            }
          } else {
            let $1 = $dict.get(graph.out_edges, i);
            if ($1 instanceof Ok) {
              let neighbors = $1[0];
              let $2 = $dict.get(neighbors, j);
              if ($2 instanceof Ok) {
                let weight = $2[0];
                return $dict.insert(distances, [i, j], weight);
              } else {
                return distances;
              }
            } else {
              return distances;
            }
          }
        },
      );
    },
  );
  let initial_distances = _block;
  let _block$1;
  let _pipe$1 = nodes;
  _block$1 = $list.fold(
    _pipe$1,
    initial_distances,
    (distances, k) => {
      let _pipe$2 = nodes;
      return $list.fold(
        _pipe$2,
        distances,
        (distances, i) => {
          let _pipe$3 = nodes;
          return $list.fold(
            _pipe$3,
            distances,
            (distances, j) => {
              let $ = $dict.get(distances, [i, k]);
              if ($ instanceof Ok) {
                let dist_ik = $[0];
                let $1 = $dict.get(distances, [k, j]);
                if ($1 instanceof Ok) {
                  let dist_kj = $1[0];
                  let new_dist = add(dist_ik, dist_kj);
                  let $2 = $dict.get(distances, [i, j]);
                  if ($2 instanceof Ok) {
                    let current_dist = $2[0];
                    let $3 = compare(new_dist, current_dist);
                    if ($3 instanceof Lt) {
                      return $dict.insert(distances, [i, j], new_dist);
                    } else {
                      return distances;
                    }
                  } else {
                    return $dict.insert(distances, [i, j], new_dist);
                  }
                } else {
                  return distances;
                }
              } else {
                return distances;
              }
            },
          );
        },
      );
    },
  );
  let final_distances = _block$1;
  let $ = detect_negative_cycle(final_distances, nodes, zero, compare);
  if ($) {
    return new Error(undefined);
  } else {
    return new Ok(final_distances);
  }
}

/**
 * Computes shortest distances between all pairs of points of interest.
 *
 * Automatically chooses the most efficient algorithm based on the density
 * of points of interest relative to the total graph size:
 * - When POIs are dense (> 1/3 of nodes): Uses Floyd-Warshall O(V³)
 * - When POIs are sparse (≤ 1/3 of nodes): Uses multiple single-source Dijkstra O(P × (V+E) log V)
 *
 * Returns only distances between the specified points of interest, not all node pairs.
 *
 * **Time Complexity:** Automatically optimized based on POI density
 *
 * ## Parameters
 *
 * - `between`: List of points of interest (POI) nodes
 * - `zero`: The identity element for addition (e.g., `0` for integers)
 * - `add`: Function to add two weights
 * - `compare`: Function to compare two weights
 *
 * ## Returns
 *
 * - `Ok(distances)`: Dictionary mapping POI pairs to their shortest distances
 * - `Error(Nil)`: If a negative cycle is detected (only when using Floyd-Warshall)
 *
 * ## Example
 *
 * ```gleam
 * import gleam/dict
 * import yog
 * import yog/pathfinding
 *
 * // Graph with many nodes, but only care about distances between a few POIs
 * let graph = build_large_graph()  // 1000 nodes
 * let pois = [1, 5, 10, 42]       // 4 points of interest
 *
 * // Efficiently computes only POI-to-POI distances
 * case pathfinding.distance_matrix(
 *   in: graph,
 *   between: pois,
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare
 * ) {
 *   Ok(distances) -> {
 *     // Get distance from POI 1 to POI 42
 *     dict.get(distances, #(1, 42))
 *   }
 *   Error(Nil) -> panic as "Negative cycle detected"
 * }
 * ```
 *
 * ## Use Cases
 *
 * - AoC 2016 Day 24: Computing distances between numbered locations
 * - TSP-like problems: Finding optimal tour through specific landmarks
 * - Network analysis: Distances between server hubs
 * - Game pathfinding: Distances between quest objectives
 *
 * ## Algorithm Selection
 *
 * The function automatically chooses the optimal algorithm:
 * - **Floyd-Warshall** when POIs are dense: Computes all-pairs shortest paths once,
 *   then filters to POIs. Efficient when you need distances for most nodes.
 * - **Multiple Dijkstra** when POIs are sparse: Runs single-source shortest paths
 *   from each POI. Efficient when POIs are much fewer than total nodes.
 */
export function distance_matrix(graph, points_of_interest, zero, add, compare) {
  let num_nodes = $dict.size(graph.nodes);
  let num_pois = $list.length(points_of_interest);
  let poi_set = $set.from_list(points_of_interest);
  let $ = num_pois * 3 > num_nodes;
  if ($) {
    let $1 = floyd_warshall(graph, zero, add, compare);
    if ($1 instanceof Ok) {
      let all_distances = $1[0];
      let poi_distances = $dict.filter(
        all_distances,
        (key, _) => {
          let from_node;
          let to_node;
          from_node = key[0];
          to_node = key[1];
          return $set.contains(poi_set, from_node) && $set.contains(
            poi_set,
            to_node,
          );
        },
      );
      return new Ok(poi_distances);
    } else {
      return $1;
    }
  } else {
    let result = $list.fold(
      points_of_interest,
      $dict.new$(),
      (acc, source) => {
        let distances = single_source_distances(
          graph,
          source,
          zero,
          add,
          compare,
        );
        return $list.fold(
          points_of_interest,
          acc,
          (acc2, target) => {
            let $1 = $dict.get(distances, target);
            if ($1 instanceof Ok) {
              let dist = $1[0];
              return $dict.insert(acc2, [source, target], dist);
            } else {
              return acc2;
            }
          },
        );
      },
    );
    return new Ok(result);
  }
}

function do_implicit_dijkstra(
  loop$frontier,
  loop$distances,
  loop$successors,
  loop$is_goal,
  loop$add,
  loop$compare
) {
  while (true) {
    let frontier = loop$frontier;
    let distances = loop$distances;
    let successors = loop$successors;
    let is_goal = loop$is_goal;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let rest_frontier = $[0][1];
      let dist = $[0][0][0];
      let current = $[0][0][1];
      let $1 = is_goal(current);
      if ($1) {
        return new Some(dist);
      } else {
        let _block;
        let $2 = $dict.get(distances, current);
        if ($2 instanceof Ok) {
          let prev_dist = $2[0];
          let $3 = compare(dist, prev_dist);
          if ($3 instanceof Lt) {
            _block = true;
          } else {
            _block = false;
          }
        } else {
          _block = true;
        }
        let should_explore = _block;
        if (should_explore) {
          let new_distances = $dict.insert(distances, current, dist);
          let _block$1;
          let _pipe = successors(current);
          _block$1 = $list.fold(
            _pipe,
            rest_frontier,
            (h, neighbor) => {
              let next_state;
              let cost;
              next_state = neighbor[0];
              cost = neighbor[1];
              return $priority_queue.push(h, [add(dist, cost), next_state]);
            },
          );
          let next_frontier = _block$1;
          loop$frontier = next_frontier;
          loop$distances = new_distances;
          loop$successors = successors;
          loop$is_goal = is_goal;
          loop$add = add;
          loop$compare = compare;
        } else {
          loop$frontier = rest_frontier;
          loop$distances = distances;
          loop$successors = successors;
          loop$is_goal = is_goal;
          loop$add = add;
          loop$compare = compare;
        }
      }
    } else {
      return new None();
    }
  }
}

/**
 * Finds the shortest path in an implicit graph using Dijkstra's algorithm.
 *
 * Unlike `shortest_path`, this does not require a materialized `Graph` value.
 * Instead, you provide a `successors_with_cost` function that computes weighted
 * neighbors on demand — ideal for state-space search, puzzles, or graphs too
 * large to build upfront.
 *
 * Returns the shortest distance to any state satisfying `is_goal`, or `None`
 * if no goal state is reachable.
 *
 * **Time Complexity:** O((V + E) log V) where V is visited states and E is explored transitions
 *
 * ## Parameters
 *
 * - `successors_with_cost`: Function that generates weighted successors for a state
 * - `is_goal`: Predicate that identifies goal states
 * - `zero`: The identity element for addition (e.g., 0 for integers)
 * - `add`: Function to add two costs
 * - `compare`: Function to compare two costs
 *
 * ## Example
 *
 * ```gleam
 * // Find shortest path in a state-space where each state is (x, y, collected_keys)
 * type State { State(x: Int, y: Int, keys: Int) }
 *
 * pathfinding.implicit_dijkstra(
 *   from: State(0, 0, 0),
 *   successors_with_cost: fn(state) {
 *     // Generate neighbor states with their costs
 *     [
 *       #(State(state.x + 1, state.y, state.keys), 1),
 *       #(State(state.x, state.y + 1, state.keys), 1),
 *       // ... more neighbors
 *     ]
 *   },
 *   is_goal: fn(state) { state.keys == all_keys_mask },
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare,
 * )
 * // => Some(42)  // Shortest distance to goal
 * ```
 *
 * ## Use Cases
 *
 * - Puzzle solving: State-space search for optimal solutions
 * - Game AI: Pathfinding with complex state (position + inventory)
 * - Planning problems: Finding cheapest action sequences
 * - AoC problems: 2019 Day 18, 2021 Day 23, 2022 Day 16, etc.
 *
 * ## Notes
 *
 * - States are deduplicated by their full value (using `Dict(state, cost)`)
 * - If your state carries extra data beyond identity, use `implicit_dijkstra_by`
 * - First path to reach a state with minimal cost wins
 * - Works with any cost type that supports addition and comparison
 */
export function implicit_dijkstra(
  start,
  successors,
  is_goal,
  zero,
  add,
  compare
) {
  let _block;
  let _pipe = $priority_queue.new$((a, b) => { return compare(a[0], b[0]); });
  _block = $priority_queue.push(_pipe, [zero, start]);
  let frontier = _block;
  return do_implicit_dijkstra(
    frontier,
    $dict.new$(),
    successors,
    is_goal,
    add,
    compare,
  );
}

function do_implicit_dijkstra_by(
  loop$frontier,
  loop$distances,
  loop$successors,
  loop$key_fn,
  loop$is_goal,
  loop$add,
  loop$compare
) {
  while (true) {
    let frontier = loop$frontier;
    let distances = loop$distances;
    let successors = loop$successors;
    let key_fn = loop$key_fn;
    let is_goal = loop$is_goal;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let rest_frontier = $[0][1];
      let dist = $[0][0][0];
      let current = $[0][0][1];
      let $1 = is_goal(current);
      if ($1) {
        return new Some(dist);
      } else {
        let current_key = key_fn(current);
        let _block;
        let $2 = $dict.get(distances, current_key);
        if ($2 instanceof Ok) {
          let prev_dist = $2[0];
          let $3 = compare(dist, prev_dist);
          if ($3 instanceof Lt) {
            _block = true;
          } else {
            _block = false;
          }
        } else {
          _block = true;
        }
        let should_explore = _block;
        if (should_explore) {
          let new_distances = $dict.insert(distances, current_key, dist);
          let _block$1;
          let _pipe = successors(current);
          _block$1 = $list.fold(
            _pipe,
            rest_frontier,
            (h, neighbor) => {
              let next_state;
              let cost;
              next_state = neighbor[0];
              cost = neighbor[1];
              return $priority_queue.push(h, [add(dist, cost), next_state]);
            },
          );
          let next_frontier = _block$1;
          loop$frontier = next_frontier;
          loop$distances = new_distances;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$is_goal = is_goal;
          loop$add = add;
          loop$compare = compare;
        } else {
          loop$frontier = rest_frontier;
          loop$distances = distances;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$is_goal = is_goal;
          loop$add = add;
          loop$compare = compare;
        }
      }
    } else {
      return new None();
    }
  }
}

/**
 * Like `implicit_dijkstra`, but deduplicates visited states by a custom key.
 *
 * Essential when your state carries extra data beyond what defines identity.
 * For example, in state-space search you might have `#(Position, ExtraData)` states,
 * but only want to visit each `Position` once — the `ExtraData` is carried state,
 * not part of the identity.
 *
 * The `visited_by` function extracts the deduplication key from each state.
 * Internally, a `Dict(key, cost)` tracks the best cost to each key, but the
 * full state value is still passed to your successor function and goal predicate.
 *
 * **Time Complexity:** O((V + E) log V) where V and E are measured in unique *keys*
 *
 * ## Parameters
 *
 * - `visited_by`: Function that extracts the deduplication key from a state
 *
 * ## Example
 *
 * ```gleam
 * // State-space search where states carry metadata
 * // Node is #(position, path_history) but we dedupe by position only
 * pathfinding.implicit_dijkstra_by(
 *   from: #(start_pos, []),
 *   successors_with_cost: fn(state) {
 *     let #(pos, history) = state
 *     neighbors(pos)
 *     |> list.map(fn(next_pos) {
 *       #(#(next_pos, [pos, ..history]), move_cost(pos, next_pos))
 *     })
 *   },
 *   visited_by: fn(state) { state.0 },  // Dedupe by position only
 *   is_goal: fn(state) { state.0 == goal_pos },
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare,
 * )
 * ```
 *
 * ## Use Cases
 *
 * - AoC 2019 Day 18: `#(at_key, collected_mask)` → dedupe by both
 * - Puzzle solving: `#(board_state, move_count)` → dedupe by `board_state`
 * - Pathfinding with budget: `#(position, fuel_left)` → dedupe by `position`
 * - A* with metadata: `#(node_id, came_from)` → dedupe by `node_id`
 *
 * ## Comparison to `implicit_dijkstra`
 *
 * - `implicit_dijkstra`: Deduplicates by the entire state value
 * - `implicit_dijkstra_by`: Deduplicates by `visited_by(state)` but keeps full state
 *
 * Similar to SQL's `DISTINCT ON(key)` or Python's `key=` parameter.
 */
export function implicit_dijkstra_by(
  start,
  successors,
  key_fn,
  is_goal,
  zero,
  add,
  compare
) {
  let _block;
  let _pipe = $priority_queue.new$((a, b) => { return compare(a[0], b[0]); });
  _block = $priority_queue.push(_pipe, [zero, start]);
  let frontier = _block;
  return do_implicit_dijkstra_by(
    frontier,
    $dict.new$(),
    successors,
    key_fn,
    is_goal,
    add,
    compare,
  );
}

function do_implicit_a_star(
  loop$frontier,
  loop$distances,
  loop$successors,
  loop$is_goal,
  loop$h,
  loop$add,
  loop$compare
) {
  while (true) {
    let frontier = loop$frontier;
    let distances = loop$distances;
    let successors = loop$successors;
    let is_goal = loop$is_goal;
    let h = loop$h;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let rest_frontier = $[0][1];
      let dist = $[0][0][1];
      let current = $[0][0][2];
      let $1 = is_goal(current);
      if ($1) {
        return new Some(dist);
      } else {
        let _block;
        let $2 = $dict.get(distances, current);
        if ($2 instanceof Ok) {
          let prev_dist = $2[0];
          let $3 = compare(dist, prev_dist);
          if ($3 instanceof Lt) {
            _block = true;
          } else {
            _block = false;
          }
        } else {
          _block = true;
        }
        let should_explore = _block;
        if (should_explore) {
          let new_distances = $dict.insert(distances, current, dist);
          let _block$1;
          let _pipe = successors(current);
          _block$1 = $list.fold(
            _pipe,
            rest_frontier,
            (frontier_acc, neighbor) => {
              let next_state;
              let edge_cost;
              next_state = neighbor[0];
              edge_cost = neighbor[1];
              let next_dist = add(dist, edge_cost);
              let f_score = add(next_dist, h(next_state));
              return $priority_queue.push(
                frontier_acc,
                [f_score, next_dist, next_state],
              );
            },
          );
          let next_frontier = _block$1;
          loop$frontier = next_frontier;
          loop$distances = new_distances;
          loop$successors = successors;
          loop$is_goal = is_goal;
          loop$h = h;
          loop$add = add;
          loop$compare = compare;
        } else {
          loop$frontier = rest_frontier;
          loop$distances = distances;
          loop$successors = successors;
          loop$is_goal = is_goal;
          loop$h = h;
          loop$add = add;
          loop$compare = compare;
        }
      }
    } else {
      return new None();
    }
  }
}

/**
 * Finds the shortest path in an implicit graph using A* search with a heuristic.
 *
 * Like `implicit_dijkstra`, but uses a heuristic to guide the search toward the goal.
 * The heuristic must be admissible (never overestimate the actual distance) to guarantee
 * finding the shortest path.
 *
 * **Time Complexity:** O((V + E) log V), but often faster than Dijkstra in practice
 *
 * ## Parameters
 *
 * - `heuristic`: Function that estimates remaining cost from any state to goal.
 *   Must be admissible (h(state) ≤ actual cost) to guarantee shortest path.
 *
 * ## Example
 *
 * ```gleam
 * // Grid pathfinding with Manhattan distance heuristic
 * type Pos { Pos(x: Int, y: Int) }
 *
 * pathfinding.implicit_a_star(
 *   from: Pos(0, 0),
 *   successors_with_cost: fn(pos) {
 *     [
 *       #(Pos(pos.x + 1, pos.y), 1),
 *       #(Pos(pos.x, pos.y + 1), 1),
 *     ]
 *   },
 *   is_goal: fn(pos) { pos.x == 10 && pos.y == 10 },
 *   heuristic: fn(pos) {
 *     // Manhattan distance to goal
 *     int.absolute_value(10 - pos.x) + int.absolute_value(10 - pos.y)
 *   },
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare,
 * )
 * ```
 *
 * ## Use Cases
 *
 * - Grid pathfinding with spatial heuristics (Manhattan, Euclidean)
 * - Puzzle solving where you can estimate "distance to solution"
 * - Game AI pathfinding on maps
 * - Any scenario where Dijkstra works but you have a good heuristic
 */
export function implicit_a_star(
  start,
  successors,
  is_goal,
  h,
  zero,
  add,
  compare
) {
  let initial_f = h(start);
  let _block;
  let _pipe = $priority_queue.new$((a, b) => { return compare(a[0], b[0]); });
  _block = $priority_queue.push(_pipe, [initial_f, zero, start]);
  let frontier = _block;
  return do_implicit_a_star(
    frontier,
    $dict.new$(),
    successors,
    is_goal,
    h,
    add,
    compare,
  );
}

function do_implicit_a_star_by(
  loop$frontier,
  loop$distances,
  loop$successors,
  loop$key_fn,
  loop$is_goal,
  loop$h,
  loop$add,
  loop$compare
) {
  while (true) {
    let frontier = loop$frontier;
    let distances = loop$distances;
    let successors = loop$successors;
    let key_fn = loop$key_fn;
    let is_goal = loop$is_goal;
    let h = loop$h;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let rest_frontier = $[0][1];
      let dist = $[0][0][1];
      let current = $[0][0][2];
      let $1 = is_goal(current);
      if ($1) {
        return new Some(dist);
      } else {
        let current_key = key_fn(current);
        let _block;
        let $2 = $dict.get(distances, current_key);
        if ($2 instanceof Ok) {
          let prev_dist = $2[0];
          let $3 = compare(dist, prev_dist);
          if ($3 instanceof Lt) {
            _block = true;
          } else {
            _block = false;
          }
        } else {
          _block = true;
        }
        let should_explore = _block;
        if (should_explore) {
          let new_distances = $dict.insert(distances, current_key, dist);
          let _block$1;
          let _pipe = successors(current);
          _block$1 = $list.fold(
            _pipe,
            rest_frontier,
            (frontier_acc, neighbor) => {
              let next_state;
              let edge_cost;
              next_state = neighbor[0];
              edge_cost = neighbor[1];
              let next_dist = add(dist, edge_cost);
              let f_score = add(next_dist, h(next_state));
              return $priority_queue.push(
                frontier_acc,
                [f_score, next_dist, next_state],
              );
            },
          );
          let next_frontier = _block$1;
          loop$frontier = next_frontier;
          loop$distances = new_distances;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$is_goal = is_goal;
          loop$h = h;
          loop$add = add;
          loop$compare = compare;
        } else {
          loop$frontier = rest_frontier;
          loop$distances = distances;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$is_goal = is_goal;
          loop$h = h;
          loop$add = add;
          loop$compare = compare;
        }
      }
    } else {
      return new None();
    }
  }
}

/**
 * Like `implicit_a_star`, but deduplicates visited states by a custom key.
 *
 * Essential when your state carries extra data beyond what defines identity.
 * The heuristic still operates on the full state, but deduplication uses only the key.
 *
 * **Time Complexity:** O((V + E) log V) where V and E are measured in unique *keys*
 *
 * ## Example
 *
 * ```gleam
 * // Grid with carried items, but dedupe by position only
 * // Heuristic considers only position, not items
 * pathfinding.implicit_a_star_by(
 *   from: #(Pos(0, 0), []),
 *   successors_with_cost: fn(state) {
 *     let #(pos, items) = state
 *     neighbors(pos)
 *     |> list.map(fn(next_pos) { #(#(next_pos, items), 1) })
 *   },
 *   visited_by: fn(state) { state.0 },  // Dedupe by position
 *   is_goal: fn(state) { state.0 == goal_pos },
 *   heuristic: fn(state) { manhattan_distance(state.0, goal_pos) },
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare,
 * )
 * ```
 */
export function implicit_a_star_by(
  start,
  successors,
  key_fn,
  is_goal,
  h,
  zero,
  add,
  compare
) {
  let initial_f = h(start);
  let _block;
  let _pipe = $priority_queue.new$((a, b) => { return compare(a[0], b[0]); });
  _block = $priority_queue.push(_pipe, [initial_f, zero, start]);
  let frontier = _block;
  return do_implicit_a_star_by(
    frontier,
    $dict.new$(),
    successors,
    key_fn,
    is_goal,
    h,
    add,
    compare,
  );
}

function do_implicit_bellman_ford(
  loop$q,
  loop$distances,
  loop$relax_counts,
  loop$in_queue,
  loop$successors,
  loop$is_goal,
  loop$zero,
  loop$add,
  loop$compare
) {
  while (true) {
    let q = loop$q;
    let distances = loop$distances;
    let relax_counts = loop$relax_counts;
    let in_queue = loop$in_queue;
    let successors = loop$successors;
    let is_goal = loop$is_goal;
    let zero = loop$zero;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $queue.pop(q);
    if ($ instanceof Ok) {
      let current = $[0][0];
      let rest_queue = $[0][1];
      let new_in_queue = $set.delete$(in_queue, current);
      let _block;
      let _pipe = $dict.get(distances, current);
      _block = $result.unwrap(_pipe, zero);
      let current_dist = _block;
      let _block$1;
      let _pipe$1 = successors(current);
      _block$1 = $list.fold(
        _pipe$1,
        [distances, relax_counts, rest_queue, new_in_queue],
        (acc, neighbor) => {
          let dists;
          let counts;
          let q_acc;
          let in_q_acc;
          dists = acc[0];
          counts = acc[1];
          q_acc = acc[2];
          in_q_acc = acc[3];
          let next_state;
          let edge_cost;
          next_state = neighbor[0];
          edge_cost = neighbor[1];
          let new_dist = add(current_dist, edge_cost);
          let $2 = $dict.get(dists, next_state);
          if ($2 instanceof Ok) {
            let prev_dist = $2[0];
            let $3 = compare(new_dist, prev_dist);
            if ($3 instanceof Lt) {
              let updated_dists = $dict.insert(dists, next_state, new_dist);
              let _block$2;
              let _pipe$2 = $dict.get(counts, next_state);
              _block$2 = $result.unwrap(_pipe$2, 0);
              let relax_count = _block$2;
              let new_count = relax_count + 1;
              let updated_counts = $dict.insert(counts, next_state, new_count);
              let $4 = new_count > $dict.size(dists);
              if ($4) {
                return [updated_dists, updated_counts, q_acc, in_q_acc];
              } else {
                let $5 = $set.contains(in_q_acc, next_state);
                if ($5) {
                  return [updated_dists, updated_counts, q_acc, in_q_acc];
                } else {
                  return [
                    updated_dists,
                    updated_counts,
                    $queue.push(q_acc, next_state),
                    $set.insert(in_q_acc, next_state),
                  ];
                }
              }
            } else {
              return acc;
            }
          } else {
            let updated_dists = $dict.insert(dists, next_state, new_dist);
            let updated_counts = $dict.insert(counts, next_state, 1);
            return [
              updated_dists,
              updated_counts,
              $queue.push(q_acc, next_state),
              $set.insert(in_q_acc, next_state),
            ];
          }
        },
      );
      let $1 = _block$1;
      let new_distances;
      let new_counts;
      let new_queue;
      let new_in_q;
      new_distances = $1[0];
      new_counts = $1[1];
      new_queue = $1[2];
      new_in_q = $1[3];
      let _block$2;
      let _pipe$2 = new_counts;
      let _pipe$3 = $dict.to_list(_pipe$2);
      _block$2 = $list.any(
        _pipe$3,
        (entry) => { return entry[1] > $dict.size(new_distances); },
      );
      let has_negative_cycle$1 = _block$2;
      if (has_negative_cycle$1) {
        return new DetectedNegativeCycle();
      } else {
        loop$q = new_queue;
        loop$distances = new_distances;
        loop$relax_counts = new_counts;
        loop$in_queue = new_in_q;
        loop$successors = successors;
        loop$is_goal = is_goal;
        loop$zero = zero;
        loop$add = add;
        loop$compare = compare;
      }
    } else {
      let _pipe = distances;
      let _pipe$1 = $dict.to_list(_pipe);
      let _pipe$2 = $list.filter(
        _pipe$1,
        (entry) => { return is_goal(entry[0]); },
      );
      let _pipe$3 = $list.sort(
        _pipe$2,
        (a, b) => { return compare(a[1], b[1]); },
      );
      let _pipe$4 = $list.first(_pipe$3);
      let _pipe$5 = $result.map(
        _pipe$4,
        (entry) => { return new FoundGoal(entry[1]); },
      );
      return $result.unwrap(_pipe$5, new NoGoal());
    }
  }
}

/**
 * Finds shortest path in implicit graphs with support for negative edge weights.
 *
 * Uses SPFA (Shortest Path Faster Algorithm), a queue-based variant of Bellman-Ford
 * that works naturally with implicit graphs. Detects negative cycles by counting
 * relaxations per state.
 *
 * **Time Complexity:** O(VE) average case where V and E are discovered dynamically
 *
 * ## Returns
 *
 * - `FoundGoal(cost)`: If a valid shortest path to goal exists
 * - `DetectedNegativeCycle`: If a negative cycle is reachable from start
 * - `NoGoal`: If no goal state is reached before exhausting reachable states
 *
 * ## Example
 *
 * ```gleam
 * pathfinding.implicit_bellman_ford(
 *   from: start_state,
 *   successors_with_cost: fn(state) {
 *     // Can include negative costs
 *     [#(next_state1, -5), #(next_state2, 10)]
 *   },
 *   is_goal: fn(state) { state == goal },
 *   with_zero: 0,
 *   with_add: int.add,
 *   with_compare: int.compare,
 * )
 * ```
 */
export function implicit_bellman_ford(
  start,
  successors,
  is_goal,
  zero,
  add,
  compare
) {
  return do_implicit_bellman_ford(
    (() => {
      let _pipe = $queue.new$();
      return $queue.push(_pipe, start);
    })(),
    $dict.from_list(toList([[start, zero]])),
    $dict.from_list(toList([[start, 0]])),
    $set.new$(),
    successors,
    is_goal,
    zero,
    add,
    compare,
  );
}

function do_implicit_bellman_ford_by(
  loop$q,
  loop$distances,
  loop$relax_counts,
  loop$in_queue,
  loop$successors,
  loop$key_fn,
  loop$is_goal,
  loop$zero,
  loop$add,
  loop$compare
) {
  while (true) {
    let q = loop$q;
    let distances = loop$distances;
    let relax_counts = loop$relax_counts;
    let in_queue = loop$in_queue;
    let successors = loop$successors;
    let key_fn = loop$key_fn;
    let is_goal = loop$is_goal;
    let zero = loop$zero;
    let add = loop$add;
    let compare = loop$compare;
    let $ = $queue.pop(q);
    if ($ instanceof Ok) {
      let current = $[0][0];
      let rest_queue = $[0][1];
      let current_key = key_fn(current);
      let new_in_queue = $set.delete$(in_queue, current);
      let _block;
      let _pipe = $dict.get(distances, current_key);
      let _pipe$1 = $result.map(_pipe, (pair) => { return pair[0]; });
      _block = $result.unwrap(_pipe$1, zero);
      let current_dist = _block;
      let _block$1;
      let _pipe$2 = successors(current);
      _block$1 = $list.fold(
        _pipe$2,
        [distances, relax_counts, rest_queue, new_in_queue],
        (acc, neighbor) => {
          let dists;
          let counts;
          let q_acc;
          let in_q_acc;
          dists = acc[0];
          counts = acc[1];
          q_acc = acc[2];
          in_q_acc = acc[3];
          let next_state;
          let edge_cost;
          next_state = neighbor[0];
          edge_cost = neighbor[1];
          let next_key = key_fn(next_state);
          let new_dist = add(current_dist, edge_cost);
          let $2 = $dict.get(dists, next_key);
          if ($2 instanceof Ok) {
            let prev_dist = $2[0][0];
            let $3 = compare(new_dist, prev_dist);
            if ($3 instanceof Lt) {
              let updated_dists = $dict.insert(
                dists,
                next_key,
                [new_dist, next_state],
              );
              let _block$2;
              let _pipe$3 = $dict.get(counts, next_key);
              _block$2 = $result.unwrap(_pipe$3, 0);
              let relax_count = _block$2;
              let new_count = relax_count + 1;
              let updated_counts = $dict.insert(counts, next_key, new_count);
              let $4 = new_count > $dict.size(dists);
              if ($4) {
                return [updated_dists, updated_counts, q_acc, in_q_acc];
              } else {
                let $5 = $set.contains(in_q_acc, next_state);
                if ($5) {
                  return [updated_dists, updated_counts, q_acc, in_q_acc];
                } else {
                  return [
                    updated_dists,
                    updated_counts,
                    $queue.push(q_acc, next_state),
                    $set.insert(in_q_acc, next_state),
                  ];
                }
              }
            } else {
              return acc;
            }
          } else {
            let updated_dists = $dict.insert(
              dists,
              next_key,
              [new_dist, next_state],
            );
            let updated_counts = $dict.insert(counts, next_key, 1);
            return [
              updated_dists,
              updated_counts,
              $queue.push(q_acc, next_state),
              $set.insert(in_q_acc, next_state),
            ];
          }
        },
      );
      let $1 = _block$1;
      let new_distances;
      let new_counts;
      let new_queue;
      let new_in_q;
      new_distances = $1[0];
      new_counts = $1[1];
      new_queue = $1[2];
      new_in_q = $1[3];
      let _block$2;
      let _pipe$3 = new_counts;
      let _pipe$4 = $dict.to_list(_pipe$3);
      _block$2 = $list.any(
        _pipe$4,
        (entry) => { return entry[1] > $dict.size(new_distances); },
      );
      let has_negative_cycle$1 = _block$2;
      if (has_negative_cycle$1) {
        return new DetectedNegativeCycle();
      } else {
        loop$q = new_queue;
        loop$distances = new_distances;
        loop$relax_counts = new_counts;
        loop$in_queue = new_in_q;
        loop$successors = successors;
        loop$key_fn = key_fn;
        loop$is_goal = is_goal;
        loop$zero = zero;
        loop$add = add;
        loop$compare = compare;
      }
    } else {
      let _pipe = distances;
      let _pipe$1 = $dict.to_list(_pipe);
      let _pipe$2 = $list.filter(
        _pipe$1,
        (entry) => { return is_goal(entry[1][1]); },
      );
      let _pipe$3 = $list.sort(
        _pipe$2,
        (a, b) => { return compare(a[1][0], b[1][0]); },
      );
      let _pipe$4 = $list.first(_pipe$3);
      let _pipe$5 = $result.map(
        _pipe$4,
        (entry) => { return new FoundGoal(entry[1][0]); },
      );
      return $result.unwrap(_pipe$5, new NoGoal());
    }
  }
}

/**
 * Like `implicit_bellman_ford`, but deduplicates visited states by a custom key.
 *
 * **Time Complexity:** O(VE) where V and E are measured in unique *keys*
 */
export function implicit_bellman_ford_by(
  start,
  successors,
  key_fn,
  is_goal,
  zero,
  add,
  compare
) {
  let start_key = key_fn(start);
  return do_implicit_bellman_ford_by(
    (() => {
      let _pipe = $queue.new$();
      return $queue.push(_pipe, start);
    })(),
    $dict.from_list(toList([[start_key, [zero, start]]])),
    $dict.from_list(toList([[start_key, 0]])),
    $set.new$(),
    successors,
    key_fn,
    is_goal,
    zero,
    add,
    compare,
  );
}
