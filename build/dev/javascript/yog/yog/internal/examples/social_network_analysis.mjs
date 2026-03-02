/// <reference types="./social_network_analysis.d.mts" />
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $string from "../../../../gleam_stdlib/gleam/string.mjs";
import * as $components from "../../../yog/components.mjs";
import * as $model from "../../../yog/model.mjs";
import { Directed } from "../../../yog/model.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new Directed());
  let _pipe$1 = $model.add_node(_pipe, 1, "Alice");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Bob");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Carol");
  let _pipe$4 = $model.add_edge(_pipe$3, 1, 2, undefined);
  let _pipe$5 = $model.add_edge(_pipe$4, 2, 3, undefined);
  _block = $model.add_edge(_pipe$5, 3, 1, undefined);
  let social_graph = _block;
  let communities = $components.strongly_connected_components(social_graph);
  return $io.println($string.inspect(communities));
}
