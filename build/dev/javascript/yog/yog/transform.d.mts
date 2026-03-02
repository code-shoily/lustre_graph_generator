import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export function transpose<ANBU, ANBV>(graph: $model.Graph$<ANBU, ANBV>): $model.Graph$<
  ANBU,
  ANBV
>;

export function map_nodes<ANCA, ANCB, ANCE>(
  graph: $model.Graph$<ANCA, ANCB>,
  fun: (x0: ANCA) => ANCE
): $model.Graph$<ANCE, ANCB>;

export function map_edges<ANCH, ANCI, ANCL>(
  graph: $model.Graph$<ANCH, ANCI>,
  fun: (x0: ANCI) => ANCL
): $model.Graph$<ANCH, ANCL>;

export function filter_nodes<ANCO, ANCP>(
  graph: $model.Graph$<ANCO, ANCP>,
  predicate: (x0: ANCO) => boolean
): $model.Graph$<ANCO, ANCP>;

export function merge<ANCU, ANCV>(
  base: $model.Graph$<ANCU, ANCV>,
  other: $model.Graph$<ANCU, ANCV>
): $model.Graph$<ANCU, ANCV>;

export function subgraph<ANDC, ANDD>(
  graph: $model.Graph$<ANDC, ANDD>,
  ids: _.List<number>
): $model.Graph$<ANDC, ANDD>;

export function contract<ANDJ, ANDK>(
  graph: $model.Graph$<ANDJ, ANDK>,
  a: number,
  b: number,
  with_combine: (x0: ANDK, x1: ANDK) => ANDK
): $model.Graph$<ANDJ, ANDK>;
