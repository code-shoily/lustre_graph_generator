/// <reference types="./global_min_cut.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $min_cut from "../../../yog/min_cut.mjs";
import * as $model from "../../../yog/model.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Undirected());
  let _pipe$1 = $model.add_node(_pipe, 1, "a");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "b");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "c");
  let _pipe$4 = $model.add_node(_pipe$3, 4, "d");
  let _pipe$5 = $model.add_node(_pipe$4, 5, "e");
  let _pipe$6 = $model.add_node(_pipe$5, 6, "f");
  let _pipe$7 = $model.add_node(_pipe$6, 7, "g");
  let _pipe$8 = $model.add_node(_pipe$7, 8, "h");
  let _pipe$9 = $model.add_edge(_pipe$8, 1, 2, 1);
  let _pipe$10 = $model.add_edge(_pipe$9, 1, 5, 1);
  let _pipe$11 = $model.add_edge(_pipe$10, 2, 5, 1);
  let _pipe$12 = $model.add_edge(_pipe$11, 2, 6, 1);
  let _pipe$13 = $model.add_edge(_pipe$12, 3, 4, 1);
  let _pipe$14 = $model.add_edge(_pipe$13, 3, 7, 1);
  let _pipe$15 = $model.add_edge(_pipe$14, 3, 8, 1);
  let _pipe$16 = $model.add_edge(_pipe$15, 4, 7, 1);
  let _pipe$17 = $model.add_edge(_pipe$16, 4, 8, 1);
  let _pipe$18 = $model.add_edge(_pipe$17, 7, 8, 1);
  let _pipe$19 = $model.add_edge(_pipe$18, 2, 3, 1);
  _block = $model.add_edge(_pipe$19, 5, 3, 1);
  let graph = _block;
  $io.println("--- Global Minimum Cut ---");
  let result = $min_cut.global_min_cut(graph);
  $io.println("Min cut weight: " + $int.to_string(result.weight));
  $io.println("Group A size: " + $int.to_string(result.group_a_size));
  $io.println("Group B size: " + $int.to_string(result.group_b_size));
  let answer = result.group_a_size * result.group_b_size;
  return $io.println("Multiplied sizes (AoC style): " + $int.to_string(answer));
}
