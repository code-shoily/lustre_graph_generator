/// <reference types="./gps_navigation.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../../gleam_stdlib/gleam/option.mjs";
import * as $model from "../../../yog/model.mjs";
import { Undirected } from "../../../yog/model.mjs";
import * as $pathfinding from "../../../yog/pathfinding.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new Undirected());
  let _pipe$1 = $model.add_node(_pipe, 1, "Home");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Office");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Mall");
  let _pipe$4 = $model.add_edge(_pipe$3, 1, 2, 15);
  let _pipe$5 = $model.add_edge(_pipe$4, 2, 3, 10);
  _block = $model.add_edge(_pipe$5, 1, 3, 30);
  let road_network = _block;
  let straight_line_distance = (from, to) => {
    let $ = from === to;
    if ($) {
      return 0;
    } else {
      return 5;
    }
  };
  let $ = $pathfinding.a_star(
    road_network,
    1,
    3,
    0,
    $int.add,
    $int.compare,
    straight_line_distance,
  );
  if ($ instanceof Some) {
    let path = $[0];
    return $io.println(
      ("Fastest route takes " + $int.to_string(path.total_weight)) + " minutes",
    );
  } else {
    return $io.println("No route found");
  }
}
