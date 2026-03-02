/// <reference types="./render_mermaid.d.mts" />
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
  let _pipe = $model.new$(new $model.Undirected());
  let _pipe$1 = $model.add_node(_pipe, 1, "Home");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Gym");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Office");
  let _pipe$4 = $model.add_edge(_pipe$3, 1, 2, 10);
  let _pipe$5 = $model.add_edge(_pipe$4, 2, 3, 5);
  _block = $model.add_edge(_pipe$5, 1, 3, 20);
  let graph = _block;
  $io.println("--- Basic Mermaid Output ---");
  let mermaid_basic = $render.to_mermaid(
    (() => {
      let _pipe$6 = graph;
      return $transform.map_edges(_pipe$6, $int.to_string);
    })(),
    $render.default_options(),
  );
  $io.println("```mermaid");
  $io.println(mermaid_basic);
  $io.println("```");
  $io.println("\n--- Mermaid with Custom Labels & Highlighting ---");
  let $ = $pathfinding.shortest_path(graph, 1, 3, 0, $int.add, $int.compare);
  if ($ instanceof Some) {
    let path = $[0];
    let base_options = new $render.MermaidOptions(
      (id, data) => { return ((data + " (ID: ") + $int.to_string(id)) + ")"; },
      (weight) => { return weight + " km"; },
      new None(),
      new None(),
    );
    let options = $render.path_to_options(path, base_options);
    let mermaid_custom = $render.to_mermaid(
      (() => {
        let _pipe$6 = graph;
        return $transform.map_edges(_pipe$6, $int.to_string);
      })(),
      options,
    );
    $io.println("```mermaid");
    $io.println(mermaid_custom);
    $io.println("```")
  } else {
    $io.println("No path found")
  }
  $io.println("\nTip: Paste the output into a GitHub markdown file or");
  return $io.println(
    "the Mermaid Live Editor (https://mermaid.live/) to see it rendered.",
  );
}
