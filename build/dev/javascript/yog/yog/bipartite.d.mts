import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export class Partition extends _.CustomType {
  /** @deprecated */
  constructor(left: $set.Set$<number>, right: $set.Set$<number>);
  /** @deprecated */
  left: $set.Set$<number>;
  /** @deprecated */
  right: $set.Set$<number>;
}
export function Partition$Partition(
  left: $set.Set$<number>,
  right: $set.Set$<number>,
): Partition$;
export function Partition$isPartition(value: Partition$): boolean;
export function Partition$Partition$0(value: Partition$): $set.Set$<number>;
export function Partition$Partition$left(value: Partition$): $set.Set$<number>;
export function Partition$Partition$1(value: Partition$): $set.Set$<number>;
export function Partition$Partition$right(value: Partition$): $set.Set$<number>;

export type Partition$ = Partition;

declare class Matching extends _.CustomType {
  /** @deprecated */
  constructor(
    left_to_right: $dict.Dict$<number, number>,
    right_to_left: $dict.Dict$<number, number>
  );
  /** @deprecated */
  left_to_right: $dict.Dict$<number, number>;
  /** @deprecated */
  right_to_left: $dict.Dict$<number, number>;
}

type Matching$ = Matching;

export class StableMarriage extends _.CustomType {
  /** @deprecated */
  constructor(matches: $dict.Dict$<number, number>);
  /** @deprecated */
  matches: $dict.Dict$<number, number>;
}
export function StableMarriage$StableMarriage(
  matches: $dict.Dict$<number, number>,
): StableMarriage$;
export function StableMarriage$isStableMarriage(
  value: StableMarriage$,
): boolean;
export function StableMarriage$StableMarriage$0(value: StableMarriage$): $dict.Dict$<
  number,
  number
>;
export function StableMarriage$StableMarriage$matches(value: StableMarriage$): $dict.Dict$<
  number,
  number
>;

export type StableMarriage$ = StableMarriage;

export function partition(graph: $model.Graph$<any, any>): $option.Option$<
  Partition$
>;

export function is_bipartite(graph: $model.Graph$<any, any>): boolean;

export function get_partner(marriage: StableMarriage$, person: number): $option.Option$<
  number
>;

export function stable_marriage(
  left_prefs: $dict.Dict$<number, _.List<number>>,
  right_prefs: $dict.Dict$<number, _.List<number>>
): StableMarriage$;

export function maximum_matching(
  graph: $model.Graph$<any, any>,
  partition: Partition$
): _.List<[number, number]>;
