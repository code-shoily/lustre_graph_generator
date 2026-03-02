/// <reference types="./network_cable_layout.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../../../gleam_stdlib/gleam/list.mjs";
import * as $model from "../../../yog/model.mjs";
import { Undirected } from "../../../yog/model.mjs";
import * as $mst from "../../../yog/mst.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new Undirected());
  let _pipe$1 = $model.add_node(_pipe, 1, "Building A");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Building B");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Building C");
  let _pipe$4 = $model.add_node(_pipe$3, 4, "Building D");
  let _pipe$5 = $model.add_edge(_pipe$4, 1, 2, 100);
  let _pipe$6 = $model.add_edge(_pipe$5, 1, 3, 150);
  let _pipe$7 = $model.add_edge(_pipe$6, 2, 3, 50);
  let _pipe$8 = $model.add_edge(_pipe$7, 2, 4, 200);
  _block = $model.add_edge(_pipe$8, 3, 4, 100);
  let buildings = _block;
  let cables = $mst.kruskal(buildings, $int.compare);
  let total_cost = $list.fold(
    cables,
    0,
    (sum, edge) => { return sum + edge.weight; },
  );
  return $io.println("Minimum cable cost is " + $int.to_string(total_cost));
}
