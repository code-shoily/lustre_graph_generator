import type * as $process from "../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Effect<ROX> extends _.CustomType {
  /** @deprecated */
  constructor(
    synchronous: _.List<(x0: Actions$<any>) => undefined>,
    before_paint: _.List<(x0: Actions$<any>) => undefined>,
    after_paint: _.List<(x0: Actions$<any>) => undefined>
  );
  /** @deprecated */
  synchronous: _.List<(x0: Actions$<any>) => undefined>;
  /** @deprecated */
  before_paint: _.List<(x0: Actions$<any>) => undefined>;
  /** @deprecated */
  after_paint: _.List<(x0: Actions$<any>) => undefined>;
}

export type Effect$<ROX> = Effect<ROX>;

declare class Actions<ROY> extends _.CustomType {
  /** @deprecated */
  constructor(
    dispatch: (x0: any) => undefined,
    emit: (x0: string, x1: $json.Json$) => undefined,
    select: (x0: $process.Selector$<any>) => undefined,
    root: () => $dynamic.Dynamic$,
    provide: (x0: string, x1: $json.Json$) => undefined
  );
  /** @deprecated */
  dispatch: (x0: any) => undefined;
  /** @deprecated */
  emit: (x0: string, x1: $json.Json$) => undefined;
  /** @deprecated */
  select: (x0: $process.Selector$<any>) => undefined;
  /** @deprecated */
  root: () => $dynamic.Dynamic$;
  /** @deprecated */
  provide: (x0: string, x1: $json.Json$) => undefined;
}

type Actions$<ROY> = Actions<ROY>;

export function map<RPR, RPT>(effect: Effect$<RPR>, f: (x0: RPR) => RPT): Effect$<
  RPT
>;

export function perform<RQI>(
  effect: Effect$<RQI>,
  dispatch: (x0: RQI) => undefined,
  emit: (x0: string, x1: $json.Json$) => undefined,
  select: (x0: $process.Selector$<RQI>) => undefined,
  root: () => $dynamic.Dynamic$,
  provide: (x0: string, x1: $json.Json$) => undefined
): undefined;

export function none(): Effect$<any>;

export function from<RPB>(effect: (x0: (x0: RPB) => undefined) => undefined): Effect$<
  RPB
>;

export function before_paint<RPD>(
  effect: (x0: (x0: RPD) => undefined, x1: $dynamic.Dynamic$) => undefined
): Effect$<RPD>;

export function after_paint<RPF>(
  effect: (x0: (x0: RPF) => undefined, x1: $dynamic.Dynamic$) => undefined
): Effect$<RPF>;

export function event(name: string, data: $json.Json$): Effect$<any>;

export function select(x0: any): Effect$<any>;

export function provide(key: string, value: $json.Json$): Effect$<any>;

export function batch<RPN>(effects: _.List<Effect$<RPN>>): Effect$<RPN>;
