/// <reference types="./bridges_of_konigsberg.d.mts" />
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../../../gleam_stdlib/gleam/string.mjs";
import * as $eulerian from "../../../yog/eulerian.mjs";
import * as $model from "../../../yog/model.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Undirected());
  let _pipe$1 = $model.add_node(_pipe, 1, "Island A");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Bank B");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Bank C");
  let _pipe$4 = $model.add_node(_pipe$3, 4, "Island D");
  let _pipe$5 = $model.add_edge(_pipe$4, 1, 2, "b1");
  let _pipe$6 = $model.add_edge(_pipe$5, 1, 2, "b2");
  let _pipe$7 = $model.add_edge(_pipe$6, 1, 3, "b3");
  let _pipe$8 = $model.add_edge(_pipe$7, 1, 3, "b4");
  let _pipe$9 = $model.add_edge(_pipe$8, 1, 4, "b5");
  let _pipe$10 = $model.add_edge(_pipe$9, 2, 4, "b6");
  _block = $model.add_edge(_pipe$10, 3, 4, "b7");
  let graph = _block;
  $io.println("--- Seven Bridges of Königsberg ---");
  let $ = $eulerian.has_eulerian_circuit(graph);
  if ($) {
    $io.println("Eulerian circuit exists!")
  } else {
    $io.println("No Eulerian circuit exists.")
  }
  let $1 = $eulerian.has_eulerian_path(graph);
  if ($1) {
    $io.println("Eulerian path exists!");
    let $2 = $eulerian.find_eulerian_path(graph);
    if ($2 instanceof Some) {
      let path = $2[0];
      $io.println("Path: " + $string.inspect(path))
    } else {
      undefined
    }
  } else {
    $io.println("No Eulerian path exists either.")
  }
  let _block$1;
  let _pipe$11 = $model.new$(new $model.Undirected());
  let _pipe$12 = $model.add_node(_pipe$11, 1, "A");
  let _pipe$13 = $model.add_node(_pipe$12, 2, "B");
  let _pipe$14 = $model.add_node(_pipe$13, 3, "C");
  let _pipe$15 = $model.add_edge(_pipe$14, 1, 2, undefined);
  let _pipe$16 = $model.add_edge(_pipe$15, 2, 3, undefined);
  _block$1 = $model.add_edge(_pipe$16, 3, 1, undefined);
  let circuit_graph = _block$1;
  $io.println("\n--- Simple Triangle ---");
  let $2 = $eulerian.find_eulerian_circuit(circuit_graph);
  if ($2 instanceof Some) {
    let circuit = $2[0];
    return $io.println("Circuit found: " + $string.inspect(circuit));
  } else {
    return $io.println("No circuit found");
  }
}
