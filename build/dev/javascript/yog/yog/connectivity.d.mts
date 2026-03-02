import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export class ConnectivityResults extends _.CustomType {
  /** @deprecated */
  constructor(
    bridges: _.List<[number, number]>,
    articulation_points: _.List<number>
  );
  /** @deprecated */
  bridges: _.List<[number, number]>;
  /** @deprecated */
  articulation_points: _.List<number>;
}
export function ConnectivityResults$ConnectivityResults(
  bridges: _.List<[number, number]>,
  articulation_points: _.List<number>,
): ConnectivityResults$;
export function ConnectivityResults$isConnectivityResults(
  value: ConnectivityResults$,
): boolean;
export function ConnectivityResults$ConnectivityResults$0(value: ConnectivityResults$): _.List<
  [number, number]
>;
export function ConnectivityResults$ConnectivityResults$bridges(value: ConnectivityResults$): _.List<
  [number, number]
>;
export function ConnectivityResults$ConnectivityResults$1(value: ConnectivityResults$): _.List<
  number
>;
export function ConnectivityResults$ConnectivityResults$articulation_points(value: ConnectivityResults$): _.List<
  number
>;

export type ConnectivityResults$ = ConnectivityResults;

declare class InternalState extends _.CustomType {
  /** @deprecated */
  constructor(
    tin: $dict.Dict$<number, number>,
    low: $dict.Dict$<number, number>,
    timer: number,
    bridges: _.List<[number, number]>,
    points: $set.Set$<number>,
    visited: $set.Set$<number>
  );
  /** @deprecated */
  tin: $dict.Dict$<number, number>;
  /** @deprecated */
  low: $dict.Dict$<number, number>;
  /** @deprecated */
  timer: number;
  /** @deprecated */
  bridges: _.List<[number, number]>;
  /** @deprecated */
  points: $set.Set$<number>;
  /** @deprecated */
  visited: $set.Set$<number>;
}

type InternalState$ = InternalState;

export type Bridge = [number, number];

export function analyze(graph: $model.Graph$<any, any>): ConnectivityResults$;
