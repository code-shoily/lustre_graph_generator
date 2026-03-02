/// <reference types="./traversal.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import * as $priority_queue from "../../gleamy_structures/gleamy/priority_queue.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $queue from "../yog/internal/queue.mjs";
import * as $model from "../yog/model.mjs";

export class BreadthFirst extends $CustomType {}
export const Order$BreadthFirst = () => new BreadthFirst();
export const Order$isBreadthFirst = (value) => value instanceof BreadthFirst;

export class DepthFirst extends $CustomType {}
export const Order$DepthFirst = () => new DepthFirst();
export const Order$isDepthFirst = (value) => value instanceof DepthFirst;

export class Continue extends $CustomType {}
export const WalkControl$Continue = () => new Continue();
export const WalkControl$isContinue = (value) => value instanceof Continue;

export class Stop extends $CustomType {}
export const WalkControl$Stop = () => new Stop();
export const WalkControl$isStop = (value) => value instanceof Stop;

export class Halt extends $CustomType {}
export const WalkControl$Halt = () => new Halt();
export const WalkControl$isHalt = (value) => value instanceof Halt;

export class WalkMetadata extends $CustomType {
  constructor(depth, parent) {
    super();
    this.depth = depth;
    this.parent = parent;
  }
}
export const WalkMetadata$WalkMetadata = (depth, parent) =>
  new WalkMetadata(depth, parent);
export const WalkMetadata$isWalkMetadata = (value) =>
  value instanceof WalkMetadata;
export const WalkMetadata$WalkMetadata$depth = (value) => value.depth;
export const WalkMetadata$WalkMetadata$0 = (value) => value.depth;
export const WalkMetadata$WalkMetadata$parent = (value) => value.parent;
export const WalkMetadata$WalkMetadata$1 = (value) => value.parent;

function do_fold_walk_bfs(
  loop$graph,
  loop$q,
  loop$visited,
  loop$acc,
  loop$folder
) {
  while (true) {
    let graph = loop$graph;
    let q = loop$q;
    let visited = loop$visited;
    let acc = loop$acc;
    let folder = loop$folder;
    let $ = $queue.pop(q);
    if ($ instanceof Ok) {
      let rest = $[0][1];
      let node_id = $[0][0][0];
      let metadata = $[0][0][1];
      let $1 = $set.contains(visited, node_id);
      if ($1) {
        loop$graph = graph;
        loop$q = rest;
        loop$visited = visited;
        loop$acc = acc;
        loop$folder = folder;
      } else {
        let $2 = folder(acc, node_id, metadata);
        let control;
        let new_acc;
        control = $2[0];
        new_acc = $2[1];
        let new_visited = $set.insert(visited, node_id);
        if (control instanceof Continue) {
          let next_nodes = $model.successor_ids(graph, node_id);
          let next_queue = $list.fold(
            next_nodes,
            rest,
            (current_queue, next_id) => {
              let next_meta = new WalkMetadata(
                metadata.depth + 1,
                new Some(node_id),
              );
              return $queue.push(current_queue, [next_id, next_meta]);
            },
          );
          loop$graph = graph;
          loop$q = next_queue;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$graph = graph;
          loop$q = rest;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    } else {
      return acc;
    }
  }
}

function do_fold_walk_dfs(
  loop$graph,
  loop$stack,
  loop$visited,
  loop$acc,
  loop$folder
) {
  while (true) {
    let graph = loop$graph;
    let stack = loop$stack;
    let visited = loop$visited;
    let acc = loop$acc;
    let folder = loop$folder;
    if (stack instanceof $Empty) {
      return acc;
    } else {
      let tail = stack.tail;
      let node_id = stack.head[0];
      let metadata = stack.head[1];
      let $ = $set.contains(visited, node_id);
      if ($) {
        loop$graph = graph;
        loop$stack = tail;
        loop$visited = visited;
        loop$acc = acc;
        loop$folder = folder;
      } else {
        let $1 = folder(acc, node_id, metadata);
        let control;
        let new_acc;
        control = $1[0];
        new_acc = $1[1];
        let new_visited = $set.insert(visited, node_id);
        if (control instanceof Continue) {
          let next_nodes = $model.successor_ids(graph, node_id);
          let next_stack = $list.fold(
            $list.reverse(next_nodes),
            tail,
            (current_stack, next_id) => {
              let next_meta = new WalkMetadata(
                metadata.depth + 1,
                new Some(node_id),
              );
              return listPrepend([next_id, next_meta], current_stack);
            },
          );
          loop$graph = graph;
          loop$stack = next_stack;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$graph = graph;
          loop$stack = tail;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    }
  }
}

/**
 * Folds over nodes during graph traversal, accumulating state with metadata.
 *
 * This function combines traversal with state accumulation, providing metadata
 * about each visited node (depth and parent). The folder function controls the
 * traversal flow:
 *
 * - `Continue`: Explore successors of the current node normally
 * - `Stop`: Skip successors of this node, but continue processing other queued nodes
 * - `Halt`: Stop the entire traversal immediately and return the accumulator
 *
 * **Time Complexity:** O(V + E) for both BFS and DFS
 *
 * ## Parameters
 *
 * - `folder`: Called for each visited node with (accumulator, node_id, metadata).
 *   Returns `#(WalkControl, new_accumulator)`.
 *
 * ## Examples
 *
 * ```gleam
 * import gleam/dict
 * import yog/traversal.{BreadthFirst, Continue, Halt, Stop, WalkMetadata}
 *
 * // Find all nodes within distance 3 from start
 * let nearby = traversal.fold_walk(
 *   over: graph,
 *   from: 1,
 *   using: BreadthFirst,
 *   initial: dict.new(),
 *   with: fn(acc, node_id, meta) {
 *     case meta.depth <= 3 {
 *       True -> #(Continue, dict.insert(acc, node_id, meta.depth))
 *       False -> #(Stop, acc)  // Don't explore beyond depth 3
 *     }
 *   }
 * )
 *
 * // Stop immediately when target is found (like walk_until)
 * let path_to_target = traversal.fold_walk(
 *   over: graph,
 *   from: start,
 *   using: BreadthFirst,
 *   initial: [],
 *   with: fn(acc, node_id, _meta) {
 *     let new_acc = [node_id, ..acc]
 *     case node_id == target {
 *       True -> #(Halt, new_acc)   // Stop entire traversal
 *       False -> #(Continue, new_acc)
 *     }
 *   }
 * )
 *
 * // Build a parent map for path reconstruction
 * let parents = traversal.fold_walk(
 *   over: graph,
 *   from: start,
 *   using: BreadthFirst,
 *   initial: dict.new(),
 *   with: fn(acc, node_id, meta) {
 *     let new_acc = case meta.parent {
 *       Some(p) -> dict.insert(acc, node_id, p)
 *       None -> acc
 *     }
 *     #(Continue, new_acc)
 *   }
 * )
 *
 * // Count nodes at each depth level
 * let depth_counts = traversal.fold_walk(
 *   over: graph,
 *   from: root,
 *   using: BreadthFirst,
 *   initial: dict.new(),
 *   with: fn(acc, _node_id, meta) {
 *     let count = dict.get(acc, meta.depth) |> result.unwrap(0)
 *     #(Continue, dict.insert(acc, meta.depth, count + 1))
 *   }
 * )
 * ```
 *
 * ## Use Cases
 *
 * - Finding nodes within a certain distance
 * - Building shortest path trees (parent pointers)
 * - Collecting nodes with custom filtering logic
 * - Computing statistics during traversal (depth distribution, etc.)
 * - BFS/DFS with early termination based on accumulated state
 */
export function fold_walk(graph, start, order, acc, folder) {
  let start_metadata = new WalkMetadata(0, new None());
  if (order instanceof BreadthFirst) {
    return do_fold_walk_bfs(
      graph,
      (() => {
        let _pipe = $queue.new$();
        return $queue.push(_pipe, [start, start_metadata]);
      })(),
      $set.new$(),
      acc,
      folder,
    );
  } else {
    return do_fold_walk_dfs(
      graph,
      toList([[start, start_metadata]]),
      $set.new$(),
      acc,
      folder,
    );
  }
}

/**
 * Walks the graph starting from the given node, visiting all reachable nodes.
 *
 * Returns a list of NodeIds in the order they were visited.
 * Uses successors to follow directed paths.
 *
 * ## Example
 *
 * ```gleam
 * // BFS traversal
 * traversal.walk(from: 1, in: graph, using: BreadthFirst)
 * // => [1, 2, 3, 4, 5]
 *
 * // DFS traversal
 * traversal.walk(from: 1, in: graph, using: DepthFirst)
 * // => [1, 2, 4, 5, 3]
 * ```
 */
export function walk(start_id, graph, order) {
  let _pipe = fold_walk(
    graph,
    start_id,
    order,
    toList([]),
    (acc, node_id, _) => { return [new Continue(), listPrepend(node_id, acc)]; },
  );
  return $list.reverse(_pipe);
}

/**
 * Walks the graph but stops early when a condition is met.
 *
 * Traverses the graph until `should_stop` returns True for a node.
 * Returns all nodes visited including the one that stopped traversal.
 *
 * ## Example
 *
 * ```gleam
 * // Stop when we find node 5
 * traversal.walk_until(
 *   from: 1,
 *   in: graph,
 *   using: BreadthFirst,
 *   until: fn(node) { node == 5 }
 * )
 * ```
 */
export function walk_until(start_id, graph, order, should_stop) {
  let _pipe = fold_walk(
    graph,
    start_id,
    order,
    toList([]),
    (acc, node_id, _) => {
      let new_acc = listPrepend(node_id, acc);
      let $ = should_stop(node_id);
      if ($) {
        return [new Halt(), new_acc];
      } else {
        return [new Continue(), new_acc];
      }
    },
  );
  return $list.reverse(_pipe);
}

function do_virtual_bfs(
  loop$q,
  loop$visited,
  loop$acc,
  loop$successors,
  loop$folder
) {
  while (true) {
    let q = loop$q;
    let visited = loop$visited;
    let acc = loop$acc;
    let successors = loop$successors;
    let folder = loop$folder;
    let $ = $queue.pop(q);
    if ($ instanceof Ok) {
      let rest = $[0][1];
      let node_id = $[0][0][0];
      let metadata = $[0][0][1];
      let $1 = $set.contains(visited, node_id);
      if ($1) {
        loop$q = rest;
        loop$visited = visited;
        loop$acc = acc;
        loop$successors = successors;
        loop$folder = folder;
      } else {
        let $2 = folder(acc, node_id, metadata);
        let control;
        let new_acc;
        control = $2[0];
        new_acc = $2[1];
        let new_visited = $set.insert(visited, node_id);
        if (control instanceof Continue) {
          let next_queue = $list.fold(
            successors(node_id),
            rest,
            (q2, next_id) => {
              return $queue.push(
                q2,
                [
                  next_id,
                  new WalkMetadata(metadata.depth + 1, new Some(node_id)),
                ],
              );
            },
          );
          loop$q = next_queue;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$q = rest;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    } else {
      return acc;
    }
  }
}

function do_virtual_dfs(
  loop$stack,
  loop$visited,
  loop$acc,
  loop$successors,
  loop$folder
) {
  while (true) {
    let stack = loop$stack;
    let visited = loop$visited;
    let acc = loop$acc;
    let successors = loop$successors;
    let folder = loop$folder;
    if (stack instanceof $Empty) {
      return acc;
    } else {
      let tail = stack.tail;
      let node_id = stack.head[0];
      let metadata = stack.head[1];
      let $ = $set.contains(visited, node_id);
      if ($) {
        loop$stack = tail;
        loop$visited = visited;
        loop$acc = acc;
        loop$successors = successors;
        loop$folder = folder;
      } else {
        let $1 = folder(acc, node_id, metadata);
        let control;
        let new_acc;
        control = $1[0];
        new_acc = $1[1];
        let new_visited = $set.insert(visited, node_id);
        if (control instanceof Continue) {
          let next_stack = $list.fold(
            $list.reverse(successors(node_id)),
            tail,
            (stk, next_id) => {
              return listPrepend(
                [
                  next_id,
                  new WalkMetadata(metadata.depth + 1, new Some(node_id)),
                ],
                stk,
              );
            },
          );
          loop$stack = next_stack;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$stack = tail;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    }
  }
}

/**
 * Traverses an *implicit* graph using BFS or DFS,
 * folding over visited nodes with metadata.
 *
 * Unlike `fold_walk`, this does not require a materialised `Graph` value.
 * Instead, you supply a `successors_of` function that computes neighbours
 * on the fly — ideal for infinite grids, state-space search, or any
 * graph that is too large or expensive to build upfront.
 *
 * ## Example
 *
 * ```gleam
 * // BFS shortest path in an implicit maze
 * traversal.implicit_fold(
 *   from: #(1, 1),
 *   using: BreadthFirst,
 *   initial: -1,
 *   successors_of: fn(pos) { open_neighbours(pos, fav) },
 *   with: fn(acc, pos, meta) {
 *     case pos == target {
 *       True -> #(Halt, meta.depth)
 *       False -> #(Continue, acc)
 *     }
 *   },
 * )
 * ```
 */
export function implicit_fold(start, order, acc, successors, folder) {
  let start_meta = new WalkMetadata(0, new None());
  if (order instanceof BreadthFirst) {
    return do_virtual_bfs(
      (() => {
        let _pipe = $queue.new$();
        return $queue.push(_pipe, [start, start_meta]);
      })(),
      $set.new$(),
      acc,
      successors,
      folder,
    );
  } else {
    return do_virtual_dfs(
      toList([[start, start_meta]]),
      $set.new$(),
      acc,
      successors,
      folder,
    );
  }
}

function do_virtual_bfs_by(
  loop$q,
  loop$visited,
  loop$acc,
  loop$successors,
  loop$key_fn,
  loop$folder
) {
  while (true) {
    let q = loop$q;
    let visited = loop$visited;
    let acc = loop$acc;
    let successors = loop$successors;
    let key_fn = loop$key_fn;
    let folder = loop$folder;
    let $ = $queue.pop(q);
    if ($ instanceof Ok) {
      let rest = $[0][1];
      let node_id = $[0][0][0];
      let metadata = $[0][0][1];
      let node_key = key_fn(node_id);
      let $1 = $set.contains(visited, node_key);
      if ($1) {
        loop$q = rest;
        loop$visited = visited;
        loop$acc = acc;
        loop$successors = successors;
        loop$key_fn = key_fn;
        loop$folder = folder;
      } else {
        let $2 = folder(acc, node_id, metadata);
        let control;
        let new_acc;
        control = $2[0];
        new_acc = $2[1];
        let new_visited = $set.insert(visited, node_key);
        if (control instanceof Continue) {
          let next_queue = $list.fold(
            successors(node_id),
            rest,
            (q2, next_id) => {
              return $queue.push(
                q2,
                [
                  next_id,
                  new WalkMetadata(metadata.depth + 1, new Some(node_id)),
                ],
              );
            },
          );
          loop$q = next_queue;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$q = rest;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    } else {
      return acc;
    }
  }
}

function do_virtual_dfs_by(
  loop$stack,
  loop$visited,
  loop$acc,
  loop$successors,
  loop$key_fn,
  loop$folder
) {
  while (true) {
    let stack = loop$stack;
    let visited = loop$visited;
    let acc = loop$acc;
    let successors = loop$successors;
    let key_fn = loop$key_fn;
    let folder = loop$folder;
    if (stack instanceof $Empty) {
      return acc;
    } else {
      let tail = stack.tail;
      let node_id = stack.head[0];
      let metadata = stack.head[1];
      let node_key = key_fn(node_id);
      let $ = $set.contains(visited, node_key);
      if ($) {
        loop$stack = tail;
        loop$visited = visited;
        loop$acc = acc;
        loop$successors = successors;
        loop$key_fn = key_fn;
        loop$folder = folder;
      } else {
        let $1 = folder(acc, node_id, metadata);
        let control;
        let new_acc;
        control = $1[0];
        new_acc = $1[1];
        let new_visited = $set.insert(visited, node_key);
        if (control instanceof Continue) {
          let next_stack = $list.fold(
            $list.reverse(successors(node_id)),
            tail,
            (stk, next_id) => {
              return listPrepend(
                [
                  next_id,
                  new WalkMetadata(metadata.depth + 1, new Some(node_id)),
                ],
                stk,
              );
            },
          );
          loop$stack = next_stack;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$stack = tail;
          loop$visited = new_visited;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$key_fn = key_fn;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    }
  }
}

/**
 * Like `implicit_fold`, but deduplicates visited nodes by a custom key.
 *
 * This is essential when your node type carries extra state beyond what
 * defines "identity". For example, in state-space search you might have
 * `#(Position, Mask)` nodes, but only want to visit each `Position` once —
 * the `Mask` is just carried state, not part of the identity.
 *
 * The `visited_by` function extracts the deduplication key from each node.
 * Internally, a `Set(key)` tracks which keys have been visited, but the
 * full `nid` value (with all its state) is still passed to your folder.
 *
 * **Time Complexity:** O(V + E) for both BFS and DFS, where V and E are
 * measured in terms of unique *keys* (not unique nodes).
 *
 * ## Example
 *
 * ```gleam
 * // Search a maze where nodes carry both position and step count
 * // but we only want to visit each position once (first-visit wins)
 * type State {
 *   State(pos: #(Int, Int), steps: Int)
 * }
 *
 * traversal.implicit_fold_by(
 *   from: State(#(0, 0), 0),
 *   using: BreadthFirst,
 *   initial: None,
 *   successors_of: fn(state) {
 *     neighbors(state.pos)
 *     |> list.map(fn(next_pos) {
 *       State(next_pos, state.steps + 1)
 *     })
 *   },
 *   visited_by: fn(state) { state.pos },  // Dedupe by position only
 *   with: fn(acc, state, _meta) {
 *     case state.pos == target {
 *       True -> #(Halt, Some(state.steps))
 *       False -> #(Continue, acc)
 *     }
 *   },
 * )
 * ```
 *
 * ## Use Cases
 *
 * - **Puzzle solving**: `#(board_state, moves)` → dedupe by `board_state`
 * - **Path finding with budget**: `#(pos, fuel_left)` → dedupe by `pos`
 * - **Game state search**: `#(position, inventory)` → dedupe by `position`
 * - **Graph search with metadata**: `#(node_id, path_history)` → dedupe by `node_id`
 *
 * ## Comparison to `implicit_fold`
 *
 * - `implicit_fold`: Deduplicates by the entire node value `nid`
 * - `implicit_fold_by`: Deduplicates by `visited_by(nid)` but keeps full `nid`
 *
 * Similar to SQL's `DISTINCT ON(key)` or Python's `key=` parameter.
 */
export function implicit_fold_by(start, order, acc, successors, key_fn, folder) {
  let start_meta = new WalkMetadata(0, new None());
  if (order instanceof BreadthFirst) {
    return do_virtual_bfs_by(
      (() => {
        let _pipe = $queue.new$();
        return $queue.push(_pipe, [start, start_meta]);
      })(),
      $set.new$(),
      acc,
      successors,
      key_fn,
      folder,
    );
  } else {
    return do_virtual_dfs_by(
      toList([[start, start_meta]]),
      $set.new$(),
      acc,
      successors,
      key_fn,
      folder,
    );
  }
}

function do_implicit_dijkstra(
  loop$frontier,
  loop$best,
  loop$acc,
  loop$successors,
  loop$folder
) {
  while (true) {
    let frontier = loop$frontier;
    let best = loop$best;
    let acc = loop$acc;
    let successors = loop$successors;
    let folder = loop$folder;
    let $ = $priority_queue.pop(frontier);
    if ($ instanceof Ok) {
      let rest = $[0][1];
      let cost = $[0][0][0];
      let node = $[0][0][1];
      let $1 = $dict.get(best, node);
      if ($1 instanceof Ok) {
        let prev = $1[0];
        if (prev < cost) {
          loop$frontier = rest;
          loop$best = best;
          loop$acc = acc;
          loop$successors = successors;
          loop$folder = folder;
        } else {
          let new_best = $dict.insert(best, node, cost);
          let $2 = folder(acc, node, cost);
          let control;
          let new_acc;
          control = $2[0];
          new_acc = $2[1];
          if (control instanceof Continue) {
            let next_frontier = $list.fold(
              successors(node),
              rest,
              (q, neighbor) => {
                let nb_node;
                let edge_cost;
                nb_node = neighbor[0];
                edge_cost = neighbor[1];
                let new_cost = cost + edge_cost;
                let $3 = $dict.get(new_best, nb_node);
                if ($3 instanceof Ok) {
                  let prev_cost = $3[0];
                  if (prev_cost <= new_cost) {
                    return q;
                  } else {
                    return $priority_queue.push(q, [new_cost, nb_node]);
                  }
                } else {
                  return $priority_queue.push(q, [new_cost, nb_node]);
                }
              },
            );
            loop$frontier = next_frontier;
            loop$best = new_best;
            loop$acc = new_acc;
            loop$successors = successors;
            loop$folder = folder;
          } else if (control instanceof Stop) {
            loop$frontier = rest;
            loop$best = new_best;
            loop$acc = new_acc;
            loop$successors = successors;
            loop$folder = folder;
          } else {
            return new_acc;
          }
        }
      } else {
        let new_best = $dict.insert(best, node, cost);
        let $2 = folder(acc, node, cost);
        let control;
        let new_acc;
        control = $2[0];
        new_acc = $2[1];
        if (control instanceof Continue) {
          let next_frontier = $list.fold(
            successors(node),
            rest,
            (q, neighbor) => {
              let nb_node;
              let edge_cost;
              nb_node = neighbor[0];
              edge_cost = neighbor[1];
              let new_cost = cost + edge_cost;
              let $3 = $dict.get(new_best, nb_node);
              if ($3 instanceof Ok) {
                let prev_cost = $3[0];
                if (prev_cost <= new_cost) {
                  return q;
                } else {
                  return $priority_queue.push(q, [new_cost, nb_node]);
                }
              } else {
                return $priority_queue.push(q, [new_cost, nb_node]);
              }
            },
          );
          loop$frontier = next_frontier;
          loop$best = new_best;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$folder = folder;
        } else if (control instanceof Stop) {
          loop$frontier = rest;
          loop$best = new_best;
          loop$acc = new_acc;
          loop$successors = successors;
          loop$folder = folder;
        } else {
          return new_acc;
        }
      }
    } else {
      return acc;
    }
  }
}

/**
 * Traverses an *implicit* weighted graph using Dijkstra's algorithm,
 * folding over visited nodes in order of increasing cost.
 *
 * Like `implicit_fold` but uses a priority queue so nodes are visited
 * cheapest-first. Ideal for shortest-path problems on implicit state spaces
 * where edge costs vary — e.g., state-space search with Manhattan moves, or
 * multi-robot coordination where multiple robots share a key-bitmask state.
 *
 * - `successors_of`: Given a node, return `List(#(neighbor, edge_cost))`.
 *   Include only valid transitions (filtering here avoids dead states).
 * - `folder`: Called once per node, with `(acc, node, cost_so_far)`.
 *   Return `#(Halt, result)` to stop immediately, `#(Stop, acc)` to skip
 *   expanding this node's successors, or `#(Continue, acc)` to continue.
 *
 * Internally maintains a `Dict(nid, Int)` of best-known costs;
 * stale priority-queue entries are automatically skipped.
 *
 * ## Example
 *
 * ```gleam
 * // Shortest path in an implicit maze with uniform cost
 * traversal.implicit_dijkstra(
 *   from: start,
 *   initial: -1,
 *   successors_of: fn(pos) {
 *     neighbours(pos)
 *     |> list.map(fn(nb) { #(nb, 1) })  // uniform cost
 *   },
 *   with: fn(acc, pos, cost) {
 *     case pos == target {
 *       True -> #(Halt, cost)
 *       False -> #(Continue, acc)
 *     }
 *   },
 * )
 * ```
 */
export function implicit_dijkstra(start, acc, successors, folder) {
  let _block;
  let _pipe = $priority_queue.new$(
    (a, b) => { return $int.compare(a[0], b[0]); },
  );
  _block = $priority_queue.push(_pipe, [0, start]);
  let frontier = _block;
  return do_implicit_dijkstra(frontier, $dict.new$(), acc, successors, folder);
}
