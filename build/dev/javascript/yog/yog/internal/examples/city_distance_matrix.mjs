/// <reference types="./city_distance_matrix.d.mts" />
import * as $dict from "../../../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import { Ok } from "../../../gleam.mjs";
import * as $model from "../../../yog/model.mjs";
import * as $pathfinding from "../../../yog/pathfinding.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Directed());
  let _pipe$1 = $model.add_node(_pipe, 1, "City A");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "City B");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "City C");
  let _pipe$4 = $model.add_node(_pipe$3, 4, "City D");
  let _pipe$5 = $model.add_edge(_pipe$4, 1, 2, 3);
  let _pipe$6 = $model.add_edge(_pipe$5, 2, 1, 8);
  let _pipe$7 = $model.add_edge(_pipe$6, 1, 4, 7);
  let _pipe$8 = $model.add_edge(_pipe$7, 4, 1, 2);
  let _pipe$9 = $model.add_edge(_pipe$8, 2, 3, 2);
  let _pipe$10 = $model.add_edge(_pipe$9, 3, 1, 5);
  _block = $model.add_edge(_pipe$10, 3, 4, 1);
  let graph = _block;
  $io.println("--- All-Pairs Shortest Paths (Floyd-Warshall) ---");
  let $ = $pathfinding.floyd_warshall(graph, 0, $int.add, $int.compare);
  if ($ instanceof Ok) {
    let matrix = $[0];
    return $dict.each(
      matrix,
      (key, weight) => {
        let from;
        let to;
        from = key[0];
        to = key[1];
        return $io.println(
          (((("From " + $int.to_string(from)) + " to ") + $int.to_string(to)) + ": ") + $int.to_string(
            weight,
          ),
        );
      },
    );
  } else {
    return $io.println("Negative cycle detected!");
  }
}
