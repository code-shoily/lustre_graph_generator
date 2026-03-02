/// <reference types="./render_dot.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../../gleam_stdlib/gleam/option.mjs";
import * as $model from "../../../yog/model.mjs";
import * as $pathfinding from "../../../yog/pathfinding.mjs";
import * as $render from "../../../yog/render.mjs";
import * as $transform from "../../../yog/transform.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Directed());
  let _pipe$1 = $model.add_node(_pipe, 1, "Start");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Middle");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "End");
  let _pipe$4 = $model.add_edge(_pipe$3, 1, 2, 5);
  let _pipe$5 = $model.add_edge(_pipe$4, 2, 3, 3);
  _block = $model.add_edge(_pipe$5, 1, 3, 10);
  let graph = _block;
  $io.println("--- Basic DOT Output ---");
  let dot_basic = $render.to_dot(
    (() => {
      let _pipe$6 = graph;
      return $transform.map_edges(_pipe$6, $int.to_string);
    })(),
    $render.default_dot_options(),
  );
  $io.println(dot_basic);
  $io.println("\n--- DOT with Highlighted Path ---");
  let $ = $pathfinding.shortest_path(graph, 1, 3, 0, $int.add, $int.compare);
  if ($ instanceof Some) {
    let path = $[0];
    let options = $render.path_to_dot_options(
      path,
      $render.default_dot_options(),
    );
    let dot_highlighted = $render.to_dot(
      (() => {
        let _pipe$6 = graph;
        return $transform.map_edges(_pipe$6, $int.to_string);
      })(),
      options,
    );
    $io.println(dot_highlighted)
  } else {
    $io.println("No path found")
  }
  $io.println("\nTip: You can render this by piping to Graphviz:");
  return $io.println(
    "gleam run -m examples/render_dot | dot -Tpng -o graph.png",
  );
}
