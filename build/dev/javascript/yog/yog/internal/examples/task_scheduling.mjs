/// <reference types="./task_scheduling.d.mts" />
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $string from "../../../../gleam_stdlib/gleam/string.mjs";
import { Ok } from "../../../gleam.mjs";
import * as $model from "../../../yog/model.mjs";
import { Directed } from "../../../yog/model.mjs";
import * as $topological_sort from "../../../yog/topological_sort.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new Directed());
  let _pipe$1 = $model.add_node(_pipe, 1, "Design");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Implement");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Test");
  let _pipe$4 = $model.add_node(_pipe$3, 4, "Deploy");
  let _pipe$5 = $model.add_edge(_pipe$4, 1, 2, undefined);
  let _pipe$6 = $model.add_edge(_pipe$5, 2, 3, undefined);
  _block = $model.add_edge(_pipe$6, 3, 4, undefined);
  let tasks = _block;
  let $ = $topological_sort.topological_sort(tasks);
  if ($ instanceof Ok) {
    let order = $[0];
    return $io.println("Execute tasks in order: " + $string.inspect(order));
  } else {
    return $io.println("Circular dependency detected!");
  }
}
