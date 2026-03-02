/// <reference types="./network_bandwidth.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $set from "../../../../gleam_stdlib/gleam/set.mjs";
import { Empty as $Empty } from "../../../gleam.mjs";
import * as $yog from "../../../yog.mjs";
import * as $max_flow from "../../../yog/max_flow.mjs";

function list_to_string(nodes) {
  if (nodes instanceof $Empty) {
    return "";
  } else {
    let $ = nodes.tail;
    if ($ instanceof $Empty) {
      let node = nodes.head;
      return "  Node " + $int.to_string(node);
    } else {
      let first = nodes.head;
      let rest = $;
      return (("  Node " + $int.to_string(first)) + "\n") + list_to_string(rest);
    }
  }
}

function print_node_list(nodes) {
  if (nodes instanceof $Empty) {
    return $io.println("  (none)");
  } else {
    let _pipe = nodes;
    let _pipe$1 = list_to_string(_pipe);
    $io.println(_pipe$1)
    return undefined;
  }
}

export function main() {
  $io.println("=== Network Bandwidth Allocation ===\n");
  let _block;
  let _pipe = $yog.directed();
  let _pipe$1 = $yog.add_edge(_pipe, 0, 1, 20);
  let _pipe$2 = $yog.add_edge(_pipe$1, 0, 2, 30);
  let _pipe$3 = $yog.add_edge(_pipe$2, 1, 2, 10);
  let _pipe$4 = $yog.add_edge(_pipe$3, 1, 3, 15);
  let _pipe$5 = $yog.add_edge(_pipe$4, 2, 3, 25);
  let _pipe$6 = $yog.add_edge(_pipe$5, 2, 4, 20);
  let _pipe$7 = $yog.add_edge(_pipe$6, 3, 5, 30);
  _block = $yog.add_edge(_pipe$7, 4, 5, 15);
  let network = _block;
  $io.println("Network topology:");
  $io.println("  Source (0) -> RouterA (1): 20 Mbps");
  $io.println("  Source (0) -> RouterB (2): 30 Mbps");
  $io.println("  RouterA (1) -> RouterC (3): 15 Mbps");
  $io.println("  RouterB (2) -> RouterC (3): 25 Mbps");
  $io.println("  RouterB (2) -> RouterD (4): 20 Mbps");
  $io.println("  RouterC (3) -> Dest (5): 30 Mbps");
  $io.println("  RouterD (4) -> Dest (5): 15 Mbps\n");
  let result = $max_flow.edmonds_karp(
    network,
    0,
    5,
    0,
    $int.add,
    (a, b) => { return a - b; },
    $int.compare,
    $int.min,
  );
  $io.println(
    ("Maximum bandwidth from source to destination: " + $int.to_string(
      result.max_flow,
    )) + " Mbps",
  );
  let cut = $max_flow.min_cut(result, 0, $int.compare);
  $io.println("\n=== Minimum Cut Analysis ===");
  $io.println("This identifies the bottleneck that limits network capacity.\n");
  $io.println("Source side nodes:");
  let _pipe$8 = $set.to_list(cut.source_side);
  print_node_list(_pipe$8)
  $io.println("\nSink side nodes:");
  let _pipe$9 = $set.to_list(cut.sink_side);
  print_node_list(_pipe$9)
  $io.println(
    "\nThe edges crossing from source side to sink side form the bottleneck.",
  );
  $io.println(
    ("Their total capacity (" + $int.to_string(result.max_flow)) + " Mbps) equals the maximum flow.",
  );
  return $io.println(
    "\nThis tells us which links to upgrade to increase network capacity.",
  );
}
