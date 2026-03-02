import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../gleam.d.mts";

export class Directed extends _.CustomType {}
export function GraphType$Directed(): GraphType$;
export function GraphType$isDirected(value: GraphType$): boolean;

export class Undirected extends _.CustomType {}
export function GraphType$Undirected(): GraphType$;
export function GraphType$isUndirected(value: GraphType$): boolean;

export type GraphType$ = Directed | Undirected;

export class Graph<ALDF, ALDE> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: GraphType$,
    nodes: $dict.Dict$<number, any>,
    out_edges: $dict.Dict$<number, $dict.Dict$<number, any>>,
    in_edges: $dict.Dict$<number, $dict.Dict$<number, any>>
  );
  /** @deprecated */
  kind: GraphType$;
  /** @deprecated */
  nodes: $dict.Dict$<number, any>;
  /** @deprecated */
  out_edges: $dict.Dict$<number, $dict.Dict$<number, any>>;
  /** @deprecated */
  in_edges: $dict.Dict$<number, $dict.Dict$<number, any>>;
}
export function Graph$Graph<ALDE, ALDF>(
  kind: GraphType$,
  nodes: $dict.Dict$<number, any>,
  out_edges: $dict.Dict$<number, $dict.Dict$<number, any>>,
  in_edges: $dict.Dict$<number, $dict.Dict$<number, any>>,
): Graph$<ALDF, ALDE>;
export function Graph$isGraph<ALDF, ALDE>(value: Graph$<ALDF, ALDE>): boolean;
export function Graph$Graph$0<ALDF, ALDE>(value: Graph$<ALDF, ALDE>): GraphType$;
export function Graph$Graph$kind<ALDE, ALDF>(
  value: Graph$<ALDF, ALDE>,
): GraphType$;
export function Graph$Graph$1<ALDF, ALDE>(value: Graph$<ALDF, ALDE>): $dict.Dict$<
  number,
  any
>;
export function Graph$Graph$nodes<ALDF, ALDE>(value: Graph$<ALDF, ALDE>): $dict.Dict$<
  number,
  any
>;
export function Graph$Graph$2<ALDF, ALDE>(value: Graph$<ALDF, ALDE>): $dict.Dict$<
  number,
  $dict.Dict$<number, any>
>;
export function Graph$Graph$out_edges<ALDF, ALDE>(value: Graph$<ALDF, ALDE>): $dict.Dict$<
  number,
  $dict.Dict$<number, any>
>;
export function Graph$Graph$3<ALDE, ALDF>(value: Graph$<ALDF, ALDE>): $dict.Dict$<
  number,
  $dict.Dict$<number, any>
>;
export function Graph$Graph$in_edges<ALDE, ALDF>(value: Graph$<ALDF, ALDE>): $dict.Dict$<
  number,
  $dict.Dict$<number, any>
>;

export type Graph$<ALDF, ALDE> = Graph<ALDF, ALDE>;

export type NodeId = number;

export function new$(graph_type: GraphType$): Graph$<any, any>;

export function add_node<ALDK, ALDL>(
  graph: Graph$<ALDK, ALDL>,
  id: number,
  data: ALDK
): Graph$<ALDK, ALDL>;

export function successors<ALDX>(graph: Graph$<any, ALDX>, id: number): _.List<
  [number, ALDX]
>;

export function predecessors<ALEC>(graph: Graph$<any, ALEC>, id: number): _.List<
  [number, ALEC]
>;

export function neighbors<ALEH>(graph: Graph$<any, ALEH>, id: number): _.List<
  [number, ALEH]
>;

export function all_nodes(graph: Graph$<any, any>): _.List<number>;

export function order(graph: Graph$<any, any>): number;

export function successor_ids(graph: Graph$<any, any>, id: number): _.List<
  number
>;

export function add_edge<ALDQ, ALDR>(
  graph: Graph$<ALDQ, ALDR>,
  src: number,
  dst: number,
  weight: ALDR
): Graph$<ALDQ, ALDR>;

export function remove_node<ALFF, ALFG>(graph: Graph$<ALFF, ALFG>, id: number): Graph$<
  ALFF,
  ALFG
>;

export function add_edge_with_combine<ALFL, ALFM>(
  graph: Graph$<ALFL, ALFM>,
  src: number,
  dst: number,
  weight: ALFM,
  with_combine: (x0: ALFM, x1: ALFM) => ALFM
): Graph$<ALFL, ALFM>;
