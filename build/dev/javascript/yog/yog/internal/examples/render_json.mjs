/// <reference types="./render_json.d.mts" />
import * as $json from "../../../../gleam_json/gleam/json.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import { toList } from "../../../gleam.mjs";
import * as $model from "../../../yog/model.mjs";
import * as $render from "../../../yog/render.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Directed());
  let _pipe$1 = $model.add_node(_pipe, 1, "Node A");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Node B");
  _block = $model.add_edge(_pipe$2, 1, 2, "connects");
  let graph = _block;
  $io.println("--- Basic JSON Output ---");
  let json_basic = $render.to_json(graph, $render.default_json_options());
  $io.println(json_basic);
  $io.println("\n--- Custom JSON Output ---");
  let options = new $render.JsonOptions(
    (id, data) => {
      return $json.object(
        toList([
          ["id", $json.int(id)],
          ["label", $json.string(data)],
          ["type", $json.string("user")],
        ]),
      );
    },
    (source, target, weight) => {
      return $json.object(
        toList([
          ["from", $json.int(source)],
          ["to", $json.int(target)],
          ["metadata", $json.object(toList([["weight", $json.string(weight)]]))],
        ]),
      );
    },
  );
  let json_custom = $render.to_json(graph, options);
  return $io.println(json_custom);
}
