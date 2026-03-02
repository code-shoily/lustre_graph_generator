import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as $pairing_heap from "../../gleamy_structures/gleamy/pairing_heap.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $queue from "../yog/internal/queue.d.mts";
import type * as $model from "../yog/model.d.mts";

export class Path<APVN> extends _.CustomType {
  /** @deprecated */
  constructor(nodes: _.List<number>, total_weight: APVN);
  /** @deprecated */
  nodes: _.List<number>;
  /** @deprecated */
  total_weight: APVN;
}
export function Path$Path<APVN>(
  nodes: _.List<number>,
  total_weight: APVN,
): Path$<APVN>;
export function Path$isPath<APVN>(value: Path$<APVN>): boolean;
export function Path$Path$0<APVN>(value: Path$<APVN>): _.List<number>;
export function Path$Path$nodes<APVN>(value: Path$<APVN>): _.List<number>;
export function Path$Path$1<APVN>(value: Path$<APVN>): APVN;
export function Path$Path$total_weight<APVN>(value: Path$<APVN>): APVN;

export type Path$<APVN> = Path<APVN>;

export class ShortestPath<APVO> extends _.CustomType {
  /** @deprecated */
  constructor(path: Path$<any>);
  /** @deprecated */
  path: Path$<any>;
}
export function BellmanFordResult$ShortestPath<APVO>(
  path: Path$<any>,
): BellmanFordResult$<APVO>;
export function BellmanFordResult$isShortestPath<APVO>(
  value: BellmanFordResult$<APVO>,
): boolean;
export function BellmanFordResult$ShortestPath$0<APVO>(value: BellmanFordResult$<
    APVO
  >): Path$<any>;
export function BellmanFordResult$ShortestPath$path<APVO>(value: BellmanFordResult$<
    APVO
  >): Path$<any>;

export class NegativeCycle extends _.CustomType {}
export function BellmanFordResult$NegativeCycle<APVO>(
  
): BellmanFordResult$<APVO>;
export function BellmanFordResult$isNegativeCycle<APVO>(
  value: BellmanFordResult$<APVO>,
): boolean;

export class NoPath extends _.CustomType {}
export function BellmanFordResult$NoPath<APVO>(): BellmanFordResult$<APVO>;
export function BellmanFordResult$isNoPath<APVO>(
  value: BellmanFordResult$<APVO>,
): boolean;

export type BellmanFordResult$<APVO> = ShortestPath<APVO> | NegativeCycle | NoPath;

export class FoundGoal<APVP> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: APVP);
  /** @deprecated */
  0: APVP;
}
export function ImplicitBellmanFordResult$FoundGoal<APVP>(
  $0: APVP,
): ImplicitBellmanFordResult$<APVP>;
export function ImplicitBellmanFordResult$isFoundGoal<APVP>(
  value: ImplicitBellmanFordResult$<APVP>,
): boolean;
export function ImplicitBellmanFordResult$FoundGoal$0<APVP>(value: ImplicitBellmanFordResult$<
    APVP
  >): APVP;

export class DetectedNegativeCycle extends _.CustomType {}
export function ImplicitBellmanFordResult$DetectedNegativeCycle<APVP>(
  
): ImplicitBellmanFordResult$<APVP>;
export function ImplicitBellmanFordResult$isDetectedNegativeCycle<APVP>(
  value: ImplicitBellmanFordResult$<APVP>,
): boolean;

export class NoGoal extends _.CustomType {}
export function ImplicitBellmanFordResult$NoGoal<APVP>(
  
): ImplicitBellmanFordResult$<APVP>;
export function ImplicitBellmanFordResult$isNoGoal<APVP>(
  value: ImplicitBellmanFordResult$<APVP>,
): boolean;

export type ImplicitBellmanFordResult$<APVP> = FoundGoal<APVP> | DetectedNegativeCycle | NoGoal;

export function shortest_path<APVR>(
  graph: $model.Graph$<any, APVR>,
  start: number,
  goal: number,
  zero: APVR,
  add: (x0: APVR, x1: APVR) => APVR,
  compare: (x0: APVR, x1: APVR) => $order.Order$
): $option.Option$<Path$<APVR>>;

export function single_source_distances<APWR>(
  graph: $model.Graph$<any, APWR>,
  source: number,
  zero: APWR,
  add: (x0: APWR, x1: APWR) => APWR,
  compare: (x0: APWR, x1: APWR) => $order.Order$
): $dict.Dict$<number, APWR>;

export function a_star<APXG>(
  graph: $model.Graph$<any, APXG>,
  start: number,
  goal: number,
  zero: APXG,
  add: (x0: APXG, x1: APXG) => APXG,
  compare: (x0: APXG, x1: APXG) => $order.Order$,
  h: (x0: number, x1: number) => APXG
): $option.Option$<Path$<APXG>>;

export function bellman_ford<APXU>(
  graph: $model.Graph$<any, APXU>,
  start: number,
  goal: number,
  zero: APXU,
  add: (x0: APXU, x1: APXU) => APXU,
  compare: (x0: APXU, x1: APXU) => $order.Order$
): BellmanFordResult$<APXU>;

export function floyd_warshall<APYZ>(
  graph: $model.Graph$<any, APYZ>,
  zero: APYZ,
  add: (x0: APYZ, x1: APYZ) => APYZ,
  compare: (x0: APYZ, x1: APYZ) => $order.Order$
): _.Result<$dict.Dict$<[number, number], APYZ>, undefined>;

export function distance_matrix<APZL>(
  graph: $model.Graph$<any, APZL>,
  points_of_interest: _.List<number>,
  zero: APZL,
  add: (x0: APZL, x1: APZL) => APZL,
  compare: (x0: APZL, x1: APZL) => $order.Order$
): _.Result<$dict.Dict$<[number, number], APZL>, undefined>;

export function implicit_dijkstra<APZT, APZU>(
  start: APZT,
  successors: (x0: APZT) => _.List<[APZT, APZU]>,
  is_goal: (x0: APZT) => boolean,
  zero: APZU,
  add: (x0: APZU, x1: APZU) => APZU,
  compare: (x0: APZU, x1: APZU) => $order.Order$
): $option.Option$<APZU>;

export function implicit_dijkstra_by<AQAE, AQAF>(
  start: AQAE,
  successors: (x0: AQAE) => _.List<[AQAE, AQAF]>,
  key_fn: (x0: AQAE) => any,
  is_goal: (x0: AQAE) => boolean,
  zero: AQAF,
  add: (x0: AQAF, x1: AQAF) => AQAF,
  compare: (x0: AQAF, x1: AQAF) => $order.Order$
): $option.Option$<AQAF>;

export function implicit_a_star<AQAR, AQAS>(
  start: AQAR,
  successors: (x0: AQAR) => _.List<[AQAR, AQAS]>,
  is_goal: (x0: AQAR) => boolean,
  h: (x0: AQAR) => AQAS,
  zero: AQAS,
  add: (x0: AQAS, x1: AQAS) => AQAS,
  compare: (x0: AQAS, x1: AQAS) => $order.Order$
): $option.Option$<AQAS>;

export function implicit_a_star_by<AQBC, AQBD>(
  start: AQBC,
  successors: (x0: AQBC) => _.List<[AQBC, AQBD]>,
  key_fn: (x0: AQBC) => any,
  is_goal: (x0: AQBC) => boolean,
  h: (x0: AQBC) => AQBD,
  zero: AQBD,
  add: (x0: AQBD, x1: AQBD) => AQBD,
  compare: (x0: AQBD, x1: AQBD) => $order.Order$
): $option.Option$<AQBD>;

export function implicit_bellman_ford<AQBP, AQBQ>(
  start: AQBP,
  successors: (x0: AQBP) => _.List<[AQBP, AQBQ]>,
  is_goal: (x0: AQBP) => boolean,
  zero: AQBQ,
  add: (x0: AQBQ, x1: AQBQ) => AQBQ,
  compare: (x0: AQBQ, x1: AQBQ) => $order.Order$
): ImplicitBellmanFordResult$<AQBQ>;

export function implicit_bellman_ford_by<AQCD, AQCE>(
  start: AQCD,
  successors: (x0: AQCD) => _.List<[AQCD, AQCE]>,
  key_fn: (x0: AQCD) => any,
  is_goal: (x0: AQCD) => boolean,
  zero: AQCE,
  add: (x0: AQCE, x1: AQCE) => AQCE,
  compare: (x0: AQCE, x1: AQCE) => $order.Order$
): ImplicitBellmanFordResult$<AQCE>;
