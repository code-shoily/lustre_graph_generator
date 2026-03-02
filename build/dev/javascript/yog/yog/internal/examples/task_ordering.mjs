/// <reference types="./task_ordering.d.mts" />
import * as $dict from "../../../../gleam_stdlib/gleam/dict.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../../../gleam_stdlib/gleam/string.mjs";
import { Ok, toList, makeError } from "../../../gleam.mjs";
import * as $model from "../../../yog/model.mjs";
import * as $topological_sort from "../../../yog/topological_sort.mjs";

const FILEPATH = "src/yog/internal/examples/task_ordering.gleam";

function char_to_ascii(s) {
  let _block;
  let _pipe = $string.to_utf_codepoints(s);
  _block = $list.first(_pipe);
  let $ = _block;
  let codepoint;
  if ($ instanceof Ok) {
    codepoint = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "yog/internal/examples/task_ordering",
      62,
      "char_to_ascii",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 1571,
        end: 1639,
        pattern_start: 1582,
        pattern_end: 1595
      }
    )
  }
  return $string.utf_codepoint_to_int(codepoint);
}

export function main() {
  let dependencies = toList([
    ["C", "A"],
    ["C", "F"],
    ["A", "B"],
    ["A", "D"],
    ["B", "E"],
    ["D", "E"],
    ["F", "E"],
  ]);
  let _block;
  let _pipe = dependencies;
  _block = $list.fold(
    _pipe,
    $model.new$(new $model.Directed()),
    (g, dep) => {
      let prereq;
      let step;
      prereq = dep[0];
      step = dep[1];
      let prereq_id = char_to_ascii(prereq);
      let step_id = char_to_ascii(step);
      let _pipe$1 = g;
      let _pipe$2 = $model.add_node(_pipe$1, prereq_id, prereq);
      let _pipe$3 = $model.add_node(_pipe$2, step_id, step);
      return $model.add_edge(_pipe$3, prereq_id, step_id, undefined);
    },
  );
  let graph = _block;
  let $ = $topological_sort.lexicographical_topological_sort(
    graph,
    $string.compare,
  );
  if ($ instanceof Ok) {
    let order = $[0];
    let _block$1;
    let _pipe$1 = order;
    let _pipe$2 = $list.map(
      _pipe$1,
      (id) => {
        let $1 = $dict.get(graph.nodes, id);
        let task;
        if ($1 instanceof Ok) {
          task = $1[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "yog/internal/examples/task_ordering",
            49,
            "main",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $1,
              start: 1252,
              end: 1299,
              pattern_start: 1263,
              pattern_end: 1271
            }
          )
        }
        return task;
      },
    );
    _block$1 = $string.join(_pipe$2, "");
    let task_order = _block$1;
    return $io.println("Task execution order: " + task_order);
  } else {
    return $io.println("Circular dependency detected!");
  }
}
