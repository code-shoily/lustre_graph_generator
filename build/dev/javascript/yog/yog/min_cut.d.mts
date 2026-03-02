import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as $pairing_heap from "../../gleamy_structures/gleamy/pairing_heap.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export class MinCut extends _.CustomType {
  /** @deprecated */
  constructor(weight: number, group_a_size: number, group_b_size: number);
  /** @deprecated */
  weight: number;
  /** @deprecated */
  group_a_size: number;
  /** @deprecated */
  group_b_size: number;
}
export function MinCut$MinCut(
  weight: number,
  group_a_size: number,
  group_b_size: number,
): MinCut$;
export function MinCut$isMinCut(value: MinCut$): boolean;
export function MinCut$MinCut$0(value: MinCut$): number;
export function MinCut$MinCut$weight(value: MinCut$): number;
export function MinCut$MinCut$1(value: MinCut$): number;
export function MinCut$MinCut$group_a_size(value: MinCut$): number;
export function MinCut$MinCut$2(value: MinCut$): number;
export function MinCut$MinCut$group_b_size(value: MinCut$): number;

export type MinCut$ = MinCut;

export function global_min_cut(graph: $model.Graph$<any, number>): MinCut$;
