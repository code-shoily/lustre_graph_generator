import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $queue from "../yog/internal/queue.d.mts";
import type * as $model from "../yog/model.d.mts";

export class MaxFlowResult<ARRA> extends _.CustomType {
  /** @deprecated */
  constructor(
    max_flow: ARRA,
    residual_graph: $model.Graph$<undefined, any>,
    source: number,
    sink: number
  );
  /** @deprecated */
  max_flow: ARRA;
  /** @deprecated */
  residual_graph: $model.Graph$<undefined, any>;
  /** @deprecated */
  source: number;
  /** @deprecated */
  sink: number;
}
export function MaxFlowResult$MaxFlowResult<ARRA>(
  max_flow: ARRA,
  residual_graph: $model.Graph$<undefined, any>,
  source: number,
  sink: number,
): MaxFlowResult$<ARRA>;
export function MaxFlowResult$isMaxFlowResult<ARRA>(
  value: MaxFlowResult$<ARRA>,
): boolean;
export function MaxFlowResult$MaxFlowResult$0<ARRA>(value: MaxFlowResult$<ARRA>): ARRA;
export function MaxFlowResult$MaxFlowResult$max_flow<ARRA>(
  value: MaxFlowResult$<ARRA>,
): ARRA;
export function MaxFlowResult$MaxFlowResult$1<ARRA>(value: MaxFlowResult$<ARRA>): $model.Graph$<
  undefined,
  any
>;
export function MaxFlowResult$MaxFlowResult$residual_graph<ARRA>(value: MaxFlowResult$<
    ARRA
  >): $model.Graph$<undefined, any>;
export function MaxFlowResult$MaxFlowResult$2<ARRA>(value: MaxFlowResult$<ARRA>): number;
export function MaxFlowResult$MaxFlowResult$source<ARRA>(
  value: MaxFlowResult$<ARRA>,
): number;
export function MaxFlowResult$MaxFlowResult$3<ARRA>(value: MaxFlowResult$<ARRA>): number;
export function MaxFlowResult$MaxFlowResult$sink<ARRA>(
  value: MaxFlowResult$<ARRA>,
): number;

export type MaxFlowResult$<ARRA> = MaxFlowResult<ARRA>;

export class MinCut extends _.CustomType {
  /** @deprecated */
  constructor(source_side: $set.Set$<number>, sink_side: $set.Set$<number>);
  /** @deprecated */
  source_side: $set.Set$<number>;
  /** @deprecated */
  sink_side: $set.Set$<number>;
}
export function MinCut$MinCut(
  source_side: $set.Set$<number>,
  sink_side: $set.Set$<number>,
): MinCut$;
export function MinCut$isMinCut(value: MinCut$): boolean;
export function MinCut$MinCut$0(value: MinCut$): $set.Set$<number>;
export function MinCut$MinCut$source_side(value: MinCut$): $set.Set$<number>;
export function MinCut$MinCut$1(value: MinCut$): $set.Set$<number>;
export function MinCut$MinCut$sink_side(value: MinCut$): $set.Set$<number>;

export type MinCut$ = MinCut;

export function edmonds_karp<ARRI>(
  graph: $model.Graph$<any, ARRI>,
  source: number,
  sink: number,
  zero: ARRI,
  add: (x0: ARRI, x1: ARRI) => ARRI,
  subtract: (x0: ARRI, x1: ARRI) => ARRI,
  compare: (x0: ARRI, x1: ARRI) => $order.Order$,
  min: (x0: ARRI, x1: ARRI) => ARRI
): MaxFlowResult$<ARRI>;

export function min_cut<ARRM>(
  result: MaxFlowResult$<ARRM>,
  zero: ARRM,
  compare: (x0: ARRM, x1: ARRM) => $order.Order$
): MinCut$;
