import type * as _ from "./gleam.d.mts";
import type * as $model from "./yog/model.d.mts";

export type Graph = $model.Graph$<any, any>;

export type NodeId = number;

export type GraphType = $model.GraphType$;

export function new$(graph_type: $model.GraphType$): $model.Graph$<any, any>;

export function directed(): $model.Graph$<any, any>;

export function undirected(): $model.Graph$<any, any>;

export function add_node<ALPC, ALPD>(
  graph: $model.Graph$<ALPC, ALPD>,
  id: number,
  data: ALPC
): $model.Graph$<ALPC, ALPD>;

export function add_edge<ALPI, ALPJ>(
  graph: $model.Graph$<ALPI, ALPJ>,
  src: number,
  dst: number,
  weight: ALPJ
): $model.Graph$<ALPI, ALPJ>;

export function add_unweighted_edge<ALPO>(
  graph: $model.Graph$<ALPO, undefined>,
  src: number,
  dst: number
): $model.Graph$<ALPO, undefined>;

export function add_simple_edge<ALPT>(
  graph: $model.Graph$<ALPT, number>,
  src: number,
  dst: number
): $model.Graph$<ALPT, number>;

export function successors<ALPZ>(graph: $model.Graph$<any, ALPZ>, id: number): _.List<
  [number, ALPZ]
>;

export function predecessors<ALQE>(graph: $model.Graph$<any, ALQE>, id: number): _.List<
  [number, ALQE]
>;

export function neighbors<ALQJ>(graph: $model.Graph$<any, ALQJ>, id: number): _.List<
  [number, ALQJ]
>;

export function all_nodes(graph: $model.Graph$<any, any>): _.List<number>;

export function from_edges<ALQS>(
  graph_type: $model.GraphType$,
  edges: _.List<[number, number, ALQS]>
): $model.Graph$<undefined, ALQS>;

export function from_unweighted_edges(
  graph_type: $model.GraphType$,
  edges: _.List<[number, number]>
): $model.Graph$<undefined, undefined>;

export function from_adjacency_list<ALQZ>(
  graph_type: $model.GraphType$,
  adj_list: _.List<[number, _.List<[number, ALQZ]>]>
): $model.Graph$<undefined, ALQZ>;

export function successor_ids(graph: $model.Graph$<any, any>, id: number): _.List<
  number
>;
