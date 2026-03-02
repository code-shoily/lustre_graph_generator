/// <reference types="./mst.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import * as $priority_queue from "../../gleamy_structures/gleamy/priority_queue.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $disjoint_set from "../yog/disjoint_set.mjs";
import * as $model from "../yog/model.mjs";
import { Undirected } from "../yog/model.mjs";

export class Edge extends $CustomType {
  constructor(from, to, weight) {
    super();
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}
export const Edge$Edge = (from, to, weight) => new Edge(from, to, weight);
export const Edge$isEdge = (value) => value instanceof Edge;
export const Edge$Edge$from = (value) => value.from;
export const Edge$Edge$0 = (value) => value.from;
export const Edge$Edge$to = (value) => value.to;
export const Edge$Edge$1 = (value) => value.to;
export const Edge$Edge$weight = (value) => value.weight;
export const Edge$Edge$2 = (value) => value.weight;

function do_kruskal(loop$edges, loop$disjoint_set_state, loop$acc) {
  while (true) {
    let edges = loop$edges;
    let disjoint_set_state = loop$disjoint_set_state;
    let acc = loop$acc;
    if (edges instanceof $Empty) {
      return $list.reverse(acc);
    } else {
      let edge = edges.head;
      let rest = edges.tail;
      let $ = $disjoint_set.find(disjoint_set_state, edge.from);
      let disjoint_set1;
      let root_from;
      disjoint_set1 = $[0];
      root_from = $[1];
      let $1 = $disjoint_set.find(disjoint_set1, edge.to);
      let disjoint_set2;
      let root_to;
      disjoint_set2 = $1[0];
      root_to = $1[1];
      let $2 = root_from === root_to;
      if ($2) {
        loop$edges = rest;
        loop$disjoint_set_state = disjoint_set2;
        loop$acc = acc;
      } else {
        let next_disjoint_set = $disjoint_set.union(
          disjoint_set2,
          edge.from,
          edge.to,
        );
        loop$edges = rest;
        loop$disjoint_set_state = next_disjoint_set;
        loop$acc = listPrepend(edge, acc);
      }
    }
  }
}

/**
 * Finds the Minimum Spanning Tree (MST) using Kruskal's algorithm.
 *
 * Returns a list of edges that form the MST. The total weight of these edges
 * is minimized while ensuring all nodes are connected.
 *
 * **Time Complexity:** O(E log E) where E is the number of edges
 *
 * ## Example
 *
 * ```gleam
 * let mst_edges = mst.kruskal(in: graph, with_compare: int.compare)
 * // => [Edge(1, 2, 5), Edge(2, 3, 3), ...]
 * ```
 */
export function kruskal(graph, compare) {
  let node_ids = $dict.keys(graph.nodes);
  let _block;
  let _pipe = $dict.fold(
    graph.out_edges,
    toList([]),
    (acc, from_id, targets) => {
      let inner_edges = $dict.fold(
        targets,
        toList([]),
        (inner_acc, to_id, weight) => {
          let $ = (graph.kind instanceof Undirected) && (from_id > to_id);
          if ($) {
            return inner_acc;
          } else {
            return listPrepend(new Edge(from_id, to_id, weight), inner_acc);
          }
        },
      );
      return $list.flatten(toList([inner_edges, acc]));
    },
  );
  _block = $list.sort(_pipe, (a, b) => { return compare(a.weight, b.weight); });
  let edges = _block;
  let initial_disjoint_set = $list.fold(
    node_ids,
    $disjoint_set.new$(),
    $disjoint_set.add,
  );
  return do_kruskal(edges, initial_disjoint_set, toList([]));
}

function get_edges_from_node(graph, from) {
  let $ = $dict.get(graph.out_edges, from);
  if ($ instanceof Ok) {
    let targets = $[0];
    return $dict.fold(
      targets,
      toList([]),
      (acc, to_id, weight) => {
        let $1 = (graph.kind instanceof Undirected) && (from > to_id);
        if ($1) {
          return acc;
        } else {
          return listPrepend(new Edge(from, to_id, weight), acc);
        }
      },
    );
  } else {
    return toList([]);
  }
}

function do_prim(loop$graph, loop$pq, loop$visited, loop$acc) {
  while (true) {
    let graph = loop$graph;
    let pq = loop$pq;
    let visited = loop$visited;
    let acc = loop$acc;
    let $ = $priority_queue.pop(pq);
    if ($ instanceof Ok) {
      let edge = $[0][0];
      let rest_pq = $[0][1];
      let $1 = $set.contains(visited, edge.to);
      if ($1) {
        loop$graph = graph;
        loop$pq = rest_pq;
        loop$visited = visited;
        loop$acc = acc;
      } else {
        let new_visited = $set.insert(visited, edge.to);
        let new_acc = listPrepend(edge, acc);
        let new_edges = get_edges_from_node(graph, edge.to);
        let filtered_edges = $list.filter(
          new_edges,
          (e) => { return !$set.contains(new_visited, e.to); },
        );
        let new_pq = $list.fold(
          filtered_edges,
          rest_pq,
          (pq, e) => { return $priority_queue.push(pq, e); },
        );
        loop$graph = graph;
        loop$pq = new_pq;
        loop$visited = new_visited;
        loop$acc = new_acc;
      }
    } else {
      return $list.reverse(acc);
    }
  }
}

/**
 * Finds the Minimum Spanning Tree (MST) using Prim's algorithm.
 *
 * Returns a list of edges that form the MST. Unlike Kruskal's which processes
 * all edges globally, Prim's grows the MST from a starting node by repeatedly
 * adding the minimum-weight edge that connects a visited node to an unvisited node.
 *
 * **Time Complexity:** O(E log V) where E is the number of edges and V is the number of vertices
 *
 * ## Example
 *
 * ```gleam
 * let mst_edges = mst.prim(in: graph, with_compare: int.compare)
 * // => [Edge(1, 2, 5), Edge(2, 3, 3), ...]
 * ```
 */
export function prim(graph, compare) {
  let node_ids = $dict.keys(graph.nodes);
  if (node_ids instanceof $Empty) {
    return node_ids;
  } else {
    let start = node_ids.head;
    let edge_compare = (a, b) => { return compare(a.weight, b.weight); };
    let initial_pq = $priority_queue.new$(edge_compare);
    let initial_visited = $set.from_list(toList([start]));
    let initial_edges = get_edges_from_node(graph, start);
    let pq_with_initial_edges = $list.fold(
      initial_edges,
      initial_pq,
      (pq, edge) => { return $priority_queue.push(pq, edge); },
    );
    return do_prim(graph, pq_with_initial_edges, initial_visited, toList([]));
  }
}
