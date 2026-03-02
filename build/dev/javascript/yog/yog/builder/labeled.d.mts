import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $model from "../../yog/model.d.mts";

export class Builder<AMME, AMMD> extends _.CustomType {
  /** @deprecated */
  constructor(
    graph: $model.Graph$<any, any>,
    label_to_id: $dict.Dict$<any, number>,
    next_id: number
  );
  /** @deprecated */
  graph: $model.Graph$<any, any>;
  /** @deprecated */
  label_to_id: $dict.Dict$<any, number>;
  /** @deprecated */
  next_id: number;
}
export function Builder$Builder<AMME, AMMD>(
  graph: $model.Graph$<any, any>,
  label_to_id: $dict.Dict$<any, number>,
  next_id: number,
): Builder$<AMMD, AMME>;
export function Builder$isBuilder<AMME, AMMD>(
  value: Builder$<AMMD, AMME>,
): boolean;
export function Builder$Builder$0<AMME, AMMD>(value: Builder$<AMMD, AMME>): $model.Graph$<
  any,
  any
>;
export function Builder$Builder$graph<AMME, AMMD>(value: Builder$<AMMD, AMME>): $model.Graph$<
  any,
  any
>;
export function Builder$Builder$1<AMMD, AMME>(value: Builder$<AMMD, AMME>): $dict.Dict$<
  any,
  number
>;
export function Builder$Builder$label_to_id<AMME, AMMD>(value: Builder$<
    AMMD,
    AMME
  >): $dict.Dict$<any, number>;
export function Builder$Builder$2<AMMD, AMME>(value: Builder$<AMMD, AMME>): number;
export function Builder$Builder$next_id<AMME, AMMD>(
  value: Builder$<AMMD, AMME>,
): number;

export type Builder$<AMMD, AMME> = Builder<AMME, AMMD>;

export function new$(graph_type: $model.GraphType$): Builder$<any, any>;

export function directed(): Builder$<any, any>;

export function undirected(): Builder$<any, any>;

export function ensure_node<AMMR, AMMS>(
  builder: Builder$<AMMR, AMMS>,
  label: AMMR
): [Builder$<AMMR, AMMS>, number];

export function add_node<AMMX, AMMY>(builder: Builder$<AMMX, AMMY>, label: AMMX): Builder$<
  AMMX,
  AMMY
>;

export function add_edge<AMND, AMNE>(
  builder: Builder$<AMND, AMNE>,
  src_label: AMND,
  dst_label: AMND,
  weight: AMNE
): Builder$<AMND, AMNE>;

export function add_unweighted_edge<AMNJ>(
  builder: Builder$<AMNJ, undefined>,
  src_label: AMNJ,
  dst_label: AMNJ
): Builder$<AMNJ, undefined>;

export function add_simple_edge<AMNO>(
  builder: Builder$<AMNO, number>,
  src_label: AMNO,
  dst_label: AMNO
): Builder$<AMNO, number>;

export function get_id<AMNT>(builder: Builder$<AMNT, any>, label: AMNT): _.Result<
  number,
  undefined
>;

export function to_graph<AMNZ, AMOA>(builder: Builder$<AMNZ, AMOA>): $model.Graph$<
  AMNZ,
  AMOA
>;

export function from_list<AMOF, AMOG>(
  graph_type: $model.GraphType$,
  edges: _.List<[AMOF, AMOF, AMOG]>
): Builder$<AMOF, AMOG>;

export function from_unweighted_list<AMOK>(
  graph_type: $model.GraphType$,
  edges: _.List<[AMOK, AMOK]>
): Builder$<AMOK, undefined>;

export function all_labels<AMOO>(builder: Builder$<AMOO, any>): _.List<AMOO>;

export function successors<AMOT, AMOU>(
  builder: Builder$<AMOT, AMOU>,
  label: AMOT
): _.Result<_.List<[AMOT, AMOU]>, undefined>;

export function predecessors<AMPA, AMPB>(
  builder: Builder$<AMPA, AMPB>,
  label: AMPA
): _.Result<_.List<[AMPA, AMPB]>, undefined>;
