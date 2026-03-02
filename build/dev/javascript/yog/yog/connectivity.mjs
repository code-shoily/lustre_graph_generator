/// <reference types="./connectivity.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import {
  Ok,
  toList,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "../gleam.mjs";
import * as $model from "../yog/model.mjs";

const FILEPATH = "src/yog/connectivity.gleam";

export class ConnectivityResults extends $CustomType {
  constructor(bridges, articulation_points) {
    super();
    this.bridges = bridges;
    this.articulation_points = articulation_points;
  }
}
export const ConnectivityResults$ConnectivityResults = (bridges, articulation_points) =>
  new ConnectivityResults(bridges, articulation_points);
export const ConnectivityResults$isConnectivityResults = (value) =>
  value instanceof ConnectivityResults;
export const ConnectivityResults$ConnectivityResults$bridges = (value) =>
  value.bridges;
export const ConnectivityResults$ConnectivityResults$0 = (value) =>
  value.bridges;
export const ConnectivityResults$ConnectivityResults$articulation_points = (value) =>
  value.articulation_points;
export const ConnectivityResults$ConnectivityResults$1 = (value) =>
  value.articulation_points;

class InternalState extends $CustomType {
  constructor(tin, low, timer, bridges, points, visited) {
    super();
    this.tin = tin;
    this.low = low;
    this.timer = timer;
    this.bridges = bridges;
    this.points = points;
    this.visited = visited;
  }
}

function do_analyze(graph, v, parent, state) {
  let tin = $dict.insert(state.tin, v, state.timer);
  let low = $dict.insert(state.low, v, state.timer);
  let visited = $set.insert(state.visited, v);
  let timer = state.timer + 1;
  let state$1 = new InternalState(
    tin,
    low,
    timer,
    state.bridges,
    state.points,
    visited,
  );
  let neighbors = $model.successor_ids(graph, v);
  let $ = $list.fold(
    neighbors,
    [state$1, 0],
    (acc, to) => {
      let acc_state;
      let children_count;
      acc_state = acc[0];
      children_count = acc[1];
      if (parent instanceof Some) {
        let parent_id = parent[0];
        if (to === parent_id) {
          return acc;
        } else {
          let $1 = $set.contains(acc_state.visited, to);
          if ($1) {
            let $2 = $dict.get(acc_state.low, v);
            let v_low;
            if ($2 instanceof Ok) {
              v_low = $2[0];
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "yog/connectivity",
                109,
                "do_analyze",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $2,
                  start: 3169,
                  end: 3218,
                  pattern_start: 3180,
                  pattern_end: 3189
                }
              )
            }
            let $3 = $dict.get(acc_state.tin, to);
            let to_tin;
            if ($3 instanceof Ok) {
              to_tin = $3[0];
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "yog/connectivity",
                110,
                "do_analyze",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $3,
                  start: 3233,
                  end: 3284,
                  pattern_start: 3244,
                  pattern_end: 3254
                }
              )
            }
            let new_low = $int.min(v_low, to_tin);
            return [
              new InternalState(
                acc_state.tin,
                $dict.insert(acc_state.low, v, new_low),
                acc_state.timer,
                acc_state.bridges,
                acc_state.points,
                acc_state.visited,
              ),
              children_count,
            ];
          } else {
            let post_dfs_state = do_analyze(graph, to, new Some(v), acc_state);
            let $2 = $dict.get(post_dfs_state.low, v);
            let v_low;
            if ($2 instanceof Ok) {
              v_low = $2[0];
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "yog/connectivity",
                123,
                "do_analyze",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $2,
                  start: 3674,
                  end: 3728,
                  pattern_start: 3685,
                  pattern_end: 3694
                }
              )
            }
            let $3 = $dict.get(post_dfs_state.low, to);
            let to_low;
            if ($3 instanceof Ok) {
              to_low = $3[0];
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "yog/connectivity",
                124,
                "do_analyze",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $3,
                  start: 3743,
                  end: 3799,
                  pattern_start: 3754,
                  pattern_end: 3764
                }
              )
            }
            let new_v_low = $int.min(v_low, to_low);
            let $4 = $dict.get(post_dfs_state.tin, v);
            let v_tin;
            if ($4 instanceof Ok) {
              v_tin = $4[0];
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "yog/connectivity",
                127,
                "do_analyze",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $4,
                  start: 3868,
                  end: 3922,
                  pattern_start: 3879,
                  pattern_end: 3888
                }
              )
            }
            let _block;
            let $5 = to_low > v_tin;
            if ($5) {
              let _block$1;
              let $6 = v < to;
              if ($6) {
                _block$1 = [v, to];
              } else {
                _block$1 = [to, v];
              }
              let bridge = _block$1;
              _block = listPrepend(bridge, post_dfs_state.bridges);
            } else {
              _block = post_dfs_state.bridges;
            }
            let new_bridges = _block;
            let _block$1;
            let $6 = to_low >= v_tin;
            if (parent instanceof Some && $6) {
              _block$1 = $set.insert(post_dfs_state.points, v);
            } else {
              _block$1 = post_dfs_state.points;
            }
            let new_points = _block$1;
            return [
              new InternalState(
                post_dfs_state.tin,
                $dict.insert(post_dfs_state.low, v, new_v_low),
                post_dfs_state.timer,
                new_bridges,
                new_points,
                post_dfs_state.visited,
              ),
              children_count + 1,
            ];
          }
        }
      } else {
        let $1 = $set.contains(acc_state.visited, to);
        if ($1) {
          let $2 = $dict.get(acc_state.low, v);
          let v_low;
          if ($2 instanceof Ok) {
            v_low = $2[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "yog/connectivity",
              109,
              "do_analyze",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $2,
                start: 3169,
                end: 3218,
                pattern_start: 3180,
                pattern_end: 3189
              }
            )
          }
          let $3 = $dict.get(acc_state.tin, to);
          let to_tin;
          if ($3 instanceof Ok) {
            to_tin = $3[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "yog/connectivity",
              110,
              "do_analyze",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $3,
                start: 3233,
                end: 3284,
                pattern_start: 3244,
                pattern_end: 3254
              }
            )
          }
          let new_low = $int.min(v_low, to_tin);
          return [
            new InternalState(
              acc_state.tin,
              $dict.insert(acc_state.low, v, new_low),
              acc_state.timer,
              acc_state.bridges,
              acc_state.points,
              acc_state.visited,
            ),
            children_count,
          ];
        } else {
          let post_dfs_state = do_analyze(graph, to, new Some(v), acc_state);
          let $2 = $dict.get(post_dfs_state.low, v);
          let v_low;
          if ($2 instanceof Ok) {
            v_low = $2[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "yog/connectivity",
              123,
              "do_analyze",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $2,
                start: 3674,
                end: 3728,
                pattern_start: 3685,
                pattern_end: 3694
              }
            )
          }
          let $3 = $dict.get(post_dfs_state.low, to);
          let to_low;
          if ($3 instanceof Ok) {
            to_low = $3[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "yog/connectivity",
              124,
              "do_analyze",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $3,
                start: 3743,
                end: 3799,
                pattern_start: 3754,
                pattern_end: 3764
              }
            )
          }
          let new_v_low = $int.min(v_low, to_low);
          let $4 = $dict.get(post_dfs_state.tin, v);
          let v_tin;
          if ($4 instanceof Ok) {
            v_tin = $4[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "yog/connectivity",
              127,
              "do_analyze",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $4,
                start: 3868,
                end: 3922,
                pattern_start: 3879,
                pattern_end: 3888
              }
            )
          }
          let _block;
          let $5 = to_low > v_tin;
          if ($5) {
            let _block$1;
            let $6 = v < to;
            if ($6) {
              _block$1 = [v, to];
            } else {
              _block$1 = [to, v];
            }
            let bridge = _block$1;
            _block = listPrepend(bridge, post_dfs_state.bridges);
          } else {
            _block = post_dfs_state.bridges;
          }
          let new_bridges = _block;
          let _block$1;
          let $6 = to_low >= v_tin;
          if (parent instanceof Some && $6) {
            _block$1 = $set.insert(post_dfs_state.points, v);
          } else {
            _block$1 = post_dfs_state.points;
          }
          let new_points = _block$1;
          return [
            new InternalState(
              post_dfs_state.tin,
              $dict.insert(post_dfs_state.low, v, new_v_low),
              post_dfs_state.timer,
              new_bridges,
              new_points,
              post_dfs_state.visited,
            ),
            children_count + 1,
          ];
        }
      }
    },
  );
  let final_state;
  let children;
  final_state = $[0];
  children = $[1];
  let $1 = children > 1;
  if (parent instanceof None && $1) {
    return new InternalState(
      final_state.tin,
      final_state.low,
      final_state.timer,
      final_state.bridges,
      $set.insert(final_state.points, v),
      final_state.visited,
    );
  } else {
    return final_state;
  }
}

/**
 * Analyzes an **undirected graph** to find all bridges and articulation points
 * using Tarjan's algorithm in a single DFS pass.
 *
 * **Important:** This algorithm is designed for undirected graphs. For directed
 * graphs, use strongly connected components analysis instead.
 *
 * **Bridges** are edges whose removal increases the number of connected components.
 * **Articulation points** (cut vertices) are nodes whose removal increases the number
 * of connected components.
 *
 * **Bridge ordering:** Bridges are returned as `#(lower_id, higher_id)` for consistency.
 *
 * ## Example
 *
 * ```gleam
 * import yog
 * import yog/connectivity
 *
 * let graph =
 *   yog.undirected()
 *   |> yog.add_node(1, Nil)
 *   |> yog.add_node(2, Nil)
 *   |> yog.add_node(3, Nil)
 *   |> yog.add_edge(from: 1, to: 2, with: Nil)
 *   |> yog.add_edge(from: 2, to: 3, with: Nil)
 *
 * let results = connectivity.analyze(in: graph)
 * // results.bridges == [#(1, 2), #(2, 3)]
 * // results.articulation_points == [2]
 * ```
 *
 * **Time Complexity:** O(V + E)
 */
export function analyze(graph) {
  let nodes = $dict.keys(graph.nodes);
  let initial_state = new InternalState(
    $dict.new$(),
    $dict.new$(),
    0,
    toList([]),
    $set.new$(),
    $set.new$(),
  );
  let final_state = $list.fold(
    nodes,
    initial_state,
    (state, node) => {
      let $ = $set.contains(state.visited, node);
      if ($) {
        return state;
      } else {
        return do_analyze(graph, node, new None(), state);
      }
    },
  );
  return new ConnectivityResults(
    final_state.bridges,
    $set.to_list(final_state.points),
  );
}
