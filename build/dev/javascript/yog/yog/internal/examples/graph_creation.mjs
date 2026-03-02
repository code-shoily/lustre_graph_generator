/// <reference types="./graph_creation.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import { toList, Empty as $Empty } from "../../../gleam.mjs";
import * as $yog from "../../../yog.mjs";
import * as $labeled from "../../../yog/builder/labeled.mjs";
import * as $model from "../../../yog/model.mjs";

function count_list(list) {
  if (list instanceof $Empty) {
    return 0;
  } else {
    let rest = list.tail;
    return 1 + count_list(rest);
  }
}

function count_nodes(graph) {
  let _pipe = $yog.all_nodes(graph);
  let _pipe$1 = ((nodes) => { return nodes; })(_pipe);
  return ((nodes) => { return count_list(nodes); })(_pipe$1);
}

export function main() {
  $io.println("=== Graph Creation Methods ===\n");
  $io.println("1. Builder Pattern (most flexible)");
  let _block;
  let _pipe = $yog.directed();
  let _pipe$1 = $yog.add_node(_pipe, 1, "Node A");
  let _pipe$2 = $yog.add_node(_pipe$1, 2, "Node B");
  let _pipe$3 = $yog.add_node(_pipe$2, 3, "Node C");
  let _pipe$4 = $yog.add_edge(_pipe$3, 1, 2, 10);
  _block = $yog.add_edge(_pipe$4, 2, 3, 5);
  let graph1 = _block;
  $io.println(
    ("  Built graph with " + $int.to_string(count_nodes(graph1))) + " nodes using builder pattern",
  );
  $io.println("\n2. From Edge List (quick and concise)");
  let graph2 = $yog.from_edges(
    new $model.Directed(),
    toList([[1, 2, 10], [2, 3, 5], [1, 3, 15]]),
  );
  $io.println(
    ("  Created graph with " + $int.to_string(count_nodes(graph2))) + " nodes from edge list",
  );
  $io.println("\n3. From Unweighted Edges (no weights needed)");
  let graph3 = $yog.from_unweighted_edges(
    new $model.Directed(),
    toList([[1, 2], [2, 3], [3, 4]]),
  );
  $io.println(
    ("  Created unweighted graph with " + $int.to_string(count_nodes(graph3))) + " nodes",
  );
  $io.println("\n4. From Adjacency List (natural representation)");
  let graph4 = $yog.from_adjacency_list(
    new $model.Directed(),
    toList([[1, toList([[2, 10], [3, 5]])], [2, toList([[3, 3]])]]),
  );
  $io.println(
    ("  Created graph with " + $int.to_string(count_nodes(graph4))) + " nodes from adjacency list",
  );
  $io.println("\n5. Simple Edges (default weight 1)");
  let _block$1;
  let _pipe$5 = $yog.directed();
  let _pipe$6 = $yog.add_simple_edge(_pipe$5, 1, 2);
  _block$1 = $yog.add_simple_edge(_pipe$6, 2, 3);
  let graph5 = _block$1;
  $io.println(
    ("  Created graph with " + $int.to_string(count_nodes(graph5))) + " nodes using simple edges",
  );
  $io.println("\n6. Labeled Builder (use strings as node IDs)");
  let _block$2;
  let _pipe$7 = $labeled.directed();
  let _pipe$8 = $labeled.add_edge(_pipe$7, "home", "work", 10);
  let _pipe$9 = $labeled.add_edge(_pipe$8, "work", "gym", 5);
  _block$2 = $labeled.add_edge(_pipe$9, "home", "gym", 15);
  let builder = _block$2;
  let graph6 = $labeled.to_graph(builder);
  $io.println(
    ("  Created labeled graph with " + $int.to_string(count_nodes(graph6))) + " nodes",
  );
  $io.println("\n7. Labeled From List (bulk creation with labels)");
  let builder2 = $labeled.from_list(
    new $model.Directed(),
    toList([["A", "B", 10], ["B", "C", 5], ["C", "D", 3]]),
  );
  let graph7 = $labeled.to_graph(builder2);
  $io.println(
    ("  Created labeled graph with " + $int.to_string(count_nodes(graph7))) + " nodes from list",
  );
  $io.println("\n8. Labeled Unweighted From List");
  let builder3 = $labeled.from_unweighted_list(
    new $model.Directed(),
    toList([["start", "middle"], ["middle", "end"]]),
  );
  let graph8 = $labeled.to_graph(builder3);
  $io.println(
    ("  Created unweighted labeled graph with " + $int.to_string(
      count_nodes(graph8),
    )) + " nodes",
  );
  $io.println("\n9. Labeled Simple Edges (labels + weight 1)");
  let _block$3;
  let _pipe$10 = $labeled.directed();
  let _pipe$11 = $labeled.add_simple_edge(_pipe$10, "Alice", "Bob");
  let _pipe$12 = $labeled.add_simple_edge(_pipe$11, "Bob", "Carol");
  _block$3 = $labeled.add_simple_edge(_pipe$12, "Carol", "Dave");
  let builder4 = _block$3;
  let graph9 = $labeled.to_graph(builder4);
  $io.println(
    ("  Created simple labeled graph with " + $int.to_string(
      count_nodes(graph9),
    )) + " nodes",
  );
  $io.println("\n10. Undirected Graphs (all methods work)");
  let _block$4;
  let _pipe$13 = $yog.undirected();
  _block$4 = $yog.add_edge(_pipe$13, 1, 2, 5);
  let graph10 = _block$4;
  $io.println(
    ("  Created undirected graph (edges work both ways) with " + $int.to_string(
      count_nodes(graph10),
    )) + " nodes",
  );
  $io.println("\n=== Summary ===");
  $io.println("• Builder pattern: Most flexible, good for complex graphs");
  $io.println("• from_edges: Quick creation from edge list");
  $io.println("• from_adjacency_list: Natural for adjacency list data");
  $io.println("• Labeled builder: Use strings/any type as node identifiers");
  $io.println("• from_list variants: Bulk creation with labels");
  return $io.println(
    "• Simple/unweighted: Convenient for unit weights or no weights",
  );
}
