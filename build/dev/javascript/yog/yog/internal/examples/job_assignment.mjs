/// <reference types="./job_assignment.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../../gleam_stdlib/gleam/option.mjs";
import * as $bipartite from "../../../yog/bipartite.mjs";
import * as $model from "../../../yog/model.mjs";

export function main() {
  let _block;
  let _pipe = $model.new$(new $model.Undirected());
  let _pipe$1 = $model.add_node(_pipe, 1, "Alice");
  let _pipe$2 = $model.add_node(_pipe$1, 2, "Bob");
  let _pipe$3 = $model.add_node(_pipe$2, 3, "Charlie");
  let _pipe$4 = $model.add_node(_pipe$3, 4, "Programming");
  let _pipe$5 = $model.add_node(_pipe$4, 5, "Design");
  let _pipe$6 = $model.add_node(_pipe$5, 6, "Testing");
  let _pipe$7 = $model.add_edge(_pipe$6, 1, 4, undefined);
  let _pipe$8 = $model.add_edge(_pipe$7, 1, 5, undefined);
  let _pipe$9 = $model.add_edge(_pipe$8, 2, 4, undefined);
  let _pipe$10 = $model.add_edge(_pipe$9, 3, 5, undefined);
  _block = $model.add_edge(_pipe$10, 3, 6, undefined);
  let graph = _block;
  $io.println("--- Bipartite Job Assignment ---");
  let $ = $bipartite.partition(graph);
  if ($ instanceof Some) {
    let partition = $[0];
    let matching = $bipartite.maximum_matching(graph, partition);
    $io.println(
      "Maximum assignments found: " + $int.to_string($list.length(matching)),
    );
    return $list.each(
      matching,
      (pair) => {
        let worker_id;
        let task_id;
        worker_id = pair[0];
        task_id = pair[1];
        return $io.println(
          (("Worker " + $int.to_string(worker_id)) + " -> Task ") + $int.to_string(
            task_id,
          ),
        );
      },
    );
  } else {
    return $io.println("This graph is not bipartite!");
  }
}
