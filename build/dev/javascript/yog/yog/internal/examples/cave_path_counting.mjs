/// <reference types="./cave_path_counting.d.mts" />
import * as $dict from "../../../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../../../gleam_stdlib/gleam/list.mjs";
import * as $set from "../../../../gleam_stdlib/gleam/set.mjs";
import * as $string from "../../../../gleam_stdlib/gleam/string.mjs";
import { Ok, makeError } from "../../../gleam.mjs";
import * as $model from "../../../yog/model.mjs";

const FILEPATH = "src/yog/internal/examples/cave_path_counting.gleam";

function count_paths(graph, current, visited_small, can_revisit_one) {
  let $ = $dict.get(graph.nodes, current);
  let cave_name;
  if ($ instanceof Ok) {
    cave_name = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "yog/internal/examples/cave_path_counting",
      43,
      "count_paths",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1306,
        end: 1363,
        pattern_start: 1317,
        pattern_end: 1330
      }
    )
  }
  if (cave_name === "end") {
    return 1;
  } else {
    let _pipe = $model.successors(graph, current);
    return $list.fold(
      _pipe,
      0,
      (count, neighbor) => {
        let neighbor_id;
        neighbor_id = neighbor[0];
        let $1 = $dict.get(graph.nodes, neighbor_id);
        let neighbor_name;
        if ($1 instanceof Ok) {
          neighbor_name = $1[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "yog/internal/examples/cave_path_counting",
            52,
            "count_paths",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $1,
              start: 1571,
              end: 1636,
              pattern_start: 1582,
              pattern_end: 1599
            }
          )
        }
        let is_small = $string.lowercase(neighbor_name) === neighbor_name;
        let already_visited = $set.contains(visited_small, neighbor_name);
        if (neighbor_name === "start") {
          return count;
        } else if (is_small) {
          if (already_visited) {
            if (can_revisit_one) {
              return count + count_paths(
                graph,
                neighbor_id,
                visited_small,
                false,
              );
            } else {
              return count;
            }
          } else {
            let new_visited = $set.insert(visited_small, neighbor_name);
            return count + count_paths(
              graph,
              neighbor_id,
              new_visited,
              can_revisit_one,
            );
          }
        } else {
          return count + count_paths(
            graph,
            neighbor_id,
            visited_small,
            can_revisit_one,
          );
        }
      },
    );
  }
}

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Undirected());
  let _pipe$1 = $model.add_node(_pipe, 0, "start");
  let _pipe$2 = $model.add_node(_pipe$1, 1, "A");
  let _pipe$3 = $model.add_node(_pipe$2, 2, "b");
  let _pipe$4 = $model.add_node(_pipe$3, 3, "c");
  let _pipe$5 = $model.add_node(_pipe$4, 4, "d");
  let _pipe$6 = $model.add_node(_pipe$5, 5, "end");
  let _pipe$7 = $model.add_edge(_pipe$6, 0, 1, undefined);
  let _pipe$8 = $model.add_edge(_pipe$7, 0, 2, undefined);
  let _pipe$9 = $model.add_edge(_pipe$8, 1, 3, undefined);
  let _pipe$10 = $model.add_edge(_pipe$9, 1, 2, undefined);
  let _pipe$11 = $model.add_edge(_pipe$10, 2, 4, undefined);
  let _pipe$12 = $model.add_edge(_pipe$11, 1, 5, undefined);
  _block = $model.add_edge(_pipe$12, 4, 5, undefined);
  let graph = _block;
  let paths = count_paths(graph, 0, $set.new$(), false);
  return $io.println(
    ("Found " + $int.to_string(paths)) + " valid paths through the cave system",
  );
}
