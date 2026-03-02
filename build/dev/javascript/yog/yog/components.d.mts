import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export class TarjanState extends _.CustomType {
  /** @deprecated */
  constructor(
    index: number,
    stack: _.List<number>,
    on_stack: $dict.Dict$<number, boolean>,
    indices: $dict.Dict$<number, number>,
    low_links: $dict.Dict$<number, number>,
    components: _.List<_.List<number>>
  );
  /** @deprecated */
  index: number;
  /** @deprecated */
  stack: _.List<number>;
  /** @deprecated */
  on_stack: $dict.Dict$<number, boolean>;
  /** @deprecated */
  indices: $dict.Dict$<number, number>;
  /** @deprecated */
  low_links: $dict.Dict$<number, number>;
  /** @deprecated */
  components: _.List<_.List<number>>;
}
export function TarjanState$TarjanState(
  index: number,
  stack: _.List<number>,
  on_stack: $dict.Dict$<number, boolean>,
  indices: $dict.Dict$<number, number>,
  low_links: $dict.Dict$<number, number>,
  components: _.List<_.List<number>>,
): TarjanState$;
export function TarjanState$isTarjanState(value: TarjanState$): boolean;
export function TarjanState$TarjanState$0(value: TarjanState$): number;
export function TarjanState$TarjanState$index(value: TarjanState$): number;
export function TarjanState$TarjanState$1(value: TarjanState$): _.List<number>;
export function TarjanState$TarjanState$stack(value: TarjanState$): _.List<
  number
>;
export function TarjanState$TarjanState$2(value: TarjanState$): $dict.Dict$<
  number,
  boolean
>;
export function TarjanState$TarjanState$on_stack(value: TarjanState$): $dict.Dict$<
  number,
  boolean
>;
export function TarjanState$TarjanState$3(value: TarjanState$): $dict.Dict$<
  number,
  number
>;
export function TarjanState$TarjanState$indices(value: TarjanState$): $dict.Dict$<
  number,
  number
>;
export function TarjanState$TarjanState$4(value: TarjanState$): $dict.Dict$<
  number,
  number
>;
export function TarjanState$TarjanState$low_links(value: TarjanState$): $dict.Dict$<
  number,
  number
>;
export function TarjanState$TarjanState$5(value: TarjanState$): _.List<
  _.List<number>
>;
export function TarjanState$TarjanState$components(value: TarjanState$): _.List<
  _.List<number>
>;

export type TarjanState$ = TarjanState;

export function strongly_connected_components(graph: $model.Graph$<any, any>): _.List<
  _.List<number>
>;

export function kosaraju(graph: $model.Graph$<any, any>): _.List<_.List<number>>;
