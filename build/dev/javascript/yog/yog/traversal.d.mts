import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as $pairing_heap from "../../gleamy_structures/gleamy/pairing_heap.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $queue from "../yog/internal/queue.d.mts";
import type * as $model from "../yog/model.d.mts";

export class BreadthFirst extends _.CustomType {}
export function Order$BreadthFirst(): Order$;
export function Order$isBreadthFirst(value: Order$): boolean;

export class DepthFirst extends _.CustomType {}
export function Order$DepthFirst(): Order$;
export function Order$isDepthFirst(value: Order$): boolean;

export type Order$ = BreadthFirst | DepthFirst;

export class Continue extends _.CustomType {}
export function WalkControl$Continue(): WalkControl$;
export function WalkControl$isContinue(value: WalkControl$): boolean;

export class Stop extends _.CustomType {}
export function WalkControl$Stop(): WalkControl$;
export function WalkControl$isStop(value: WalkControl$): boolean;

export class Halt extends _.CustomType {}
export function WalkControl$Halt(): WalkControl$;
export function WalkControl$isHalt(value: WalkControl$): boolean;

export type WalkControl$ = Continue | Stop | Halt;

export class WalkMetadata<AOBY> extends _.CustomType {
  /** @deprecated */
  constructor(depth: number, parent: $option.Option$<any>);
  /** @deprecated */
  depth: number;
  /** @deprecated */
  parent: $option.Option$<any>;
}
export function WalkMetadata$WalkMetadata<AOBY>(
  depth: number,
  parent: $option.Option$<any>,
): WalkMetadata$<AOBY>;
export function WalkMetadata$isWalkMetadata<AOBY>(
  value: WalkMetadata$<AOBY>,
): boolean;
export function WalkMetadata$WalkMetadata$0<AOBY>(value: WalkMetadata$<AOBY>): number;
export function WalkMetadata$WalkMetadata$depth<AOBY>(
  value: WalkMetadata$<AOBY>,
): number;
export function WalkMetadata$WalkMetadata$1<AOBY>(value: WalkMetadata$<AOBY>): $option.Option$<
  any
>;
export function WalkMetadata$WalkMetadata$parent<AOBY>(value: WalkMetadata$<
    AOBY
  >): $option.Option$<any>;

export type WalkMetadata$<AOBY> = WalkMetadata<AOBY>;

export function fold_walk<AOCN>(
  graph: $model.Graph$<any, any>,
  start: number,
  order: Order$,
  acc: AOCN,
  folder: (x0: AOCN, x1: number, x2: WalkMetadata$<number>) => [
    WalkControl$,
    AOCN
  ]
): AOCN;

export function walk(
  start_id: number,
  graph: $model.Graph$<any, any>,
  order: Order$
): _.List<number>;

export function walk_until(
  start_id: number,
  graph: $model.Graph$<any, any>,
  order: Order$,
  should_stop: (x0: number) => boolean
): _.List<number>;

export function implicit_fold<AOCP, AOCQ>(
  start: AOCP,
  order: Order$,
  acc: AOCQ,
  successors: (x0: AOCP) => _.List<AOCP>,
  folder: (x0: AOCQ, x1: AOCP, x2: WalkMetadata$<AOCP>) => [WalkControl$, AOCQ]
): AOCQ;

export function implicit_fold_by<AOCT, AOCU>(
  start: AOCT,
  order: Order$,
  acc: AOCU,
  successors: (x0: AOCT) => _.List<AOCT>,
  key_fn: (x0: AOCT) => any,
  folder: (x0: AOCU, x1: AOCT, x2: WalkMetadata$<AOCT>) => [WalkControl$, AOCU]
): AOCU;

export function implicit_dijkstra<AOEU, AOEV>(
  start: AOEU,
  acc: AOEV,
  successors: (x0: AOEU) => _.List<[AOEU, number]>,
  folder: (x0: AOEV, x1: AOEU, x2: number) => [WalkControl$, AOEV]
): AOEV;
