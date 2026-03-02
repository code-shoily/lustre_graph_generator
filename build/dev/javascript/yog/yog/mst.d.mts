import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as $pairing_heap from "../../gleamy_structures/gleamy/pairing_heap.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $disjoint_set from "../yog/disjoint_set.d.mts";
import type * as $model from "../yog/model.d.mts";

export class Edge<ASIC> extends _.CustomType {
  /** @deprecated */
  constructor(from: number, to: number, weight: ASIC);
  /** @deprecated */
  from: number;
  /** @deprecated */
  to: number;
  /** @deprecated */
  weight: ASIC;
}
export function Edge$Edge<ASIC>(
  from: number,
  to: number,
  weight: ASIC,
): Edge$<ASIC>;
export function Edge$isEdge<ASIC>(value: Edge$<ASIC>): boolean;
export function Edge$Edge$0<ASIC>(value: Edge$<ASIC>): number;
export function Edge$Edge$from<ASIC>(value: Edge$<ASIC>): number;
export function Edge$Edge$1<ASIC>(value: Edge$<ASIC>): number;
export function Edge$Edge$to<ASIC>(value: Edge$<ASIC>): number;
export function Edge$Edge$2<ASIC>(value: Edge$<ASIC>): ASIC;
export function Edge$Edge$weight<ASIC>(value: Edge$<ASIC>): ASIC;

export type Edge$<ASIC> = Edge<ASIC>;

export function kruskal<ASIE>(
  graph: $model.Graph$<any, ASIE>,
  compare: (x0: ASIE, x1: ASIE) => $order.Order$
): _.List<Edge$<ASIE>>;

export function prim<ASIR>(
  graph: $model.Graph$<any, ASIR>,
  compare: (x0: ASIR, x1: ASIR) => $order.Order$
): _.List<Edge$<ASIR>>;
