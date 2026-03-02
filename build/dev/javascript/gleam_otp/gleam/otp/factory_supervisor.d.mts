import type * as $atom from "../../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $actor from "../../gleam/otp/actor.d.mts";
import type * as $result2 from "../../gleam/otp/internal/result2.d.mts";
import type * as $supervision from "../../gleam/otp/supervision.d.mts";

declare class Supervisor extends _.CustomType {
  /** @deprecated */
  constructor(pid: $process.Pid$);
  /** @deprecated */
  pid: $process.Pid$;
}

declare class NamedSupervisor<HIQ, HIP> extends _.CustomType {
  /** @deprecated */
  constructor(name: $process.Name$<Message$<any, any>>);
  /** @deprecated */
  name: $process.Name$<Message$<any, any>>;
}

export type Supervisor$<HIP, HIQ> = Supervisor | NamedSupervisor<HIQ, HIP>;

export type Message$<HIS, HIR> = any;

declare class Builder<HIU, HIT> extends _.CustomType {
  /** @deprecated */
  constructor(
    child_type: $supervision.ChildType$,
    template: (x0: any) => _.Result<$actor.Started$<any>, $actor.StartError$>,
    restart_strategy: $supervision.Restart$,
    intensity: number,
    period: number,
    name: $option.Option$<$process.Name$<Message$<any, any>>>
  );
  /** @deprecated */
  child_type: $supervision.ChildType$;
  /** @deprecated */
  template: (x0: any) => _.Result<$actor.Started$<any>, $actor.StartError$>;
  /** @deprecated */
  restart_strategy: $supervision.Restart$;
  /** @deprecated */
  intensity: number;
  /** @deprecated */
  period: number;
  /** @deprecated */
  name: $option.Option$<$process.Name$<Message$<any, any>>>;
}

export type Builder$<HIU, HIT> = Builder<HIT, HIU>;

type ErlangStartFlags$ = any;

declare class Local<HIV, HIW> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $process.Name$<Message$<any, any>>);
  /** @deprecated */
  0: $process.Name$<Message$<any, any>>;
}

type ErlangSupervisorName$<HIV, HIW> = Local<HIV, HIW>;

declare class SimpleOneForOne extends _.CustomType {}

type Strategy$ = SimpleOneForOne;

declare class Strategy extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Strategy$);
  /** @deprecated */
  0: Strategy$;
}

declare class Intensity extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}

declare class Period extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}

type ErlangStartFlag$<HIX> = Strategy | Intensity | Period;

type ErlangChildSpec$ = any;

declare class Id extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}

declare class Start<HIZ, HIY> extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: [
      $atom.Atom$,
      $atom.Atom$,
      _.List<(x0: any) => _.Result<$actor.Started$<any>, $actor.StartError$>>
    ]
  );
  /** @deprecated */
  0: [
    $atom.Atom$,
    $atom.Atom$,
    _.List<(x0: any) => _.Result<$actor.Started$<any>, $actor.StartError$>>
  ];
}

declare class Restart extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $supervision.Restart$);
  /** @deprecated */
  0: $supervision.Restart$;
}

declare class Type extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $atom.Atom$);
  /** @deprecated */
  0: $atom.Atom$;
}

declare class Shutdown extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Timeout$);
  /** @deprecated */
  0: Timeout$;
}

type ErlangChildSpecProperty$<HIZ, HIY> = Id | Start<HIZ, HIY> | Restart | Type | Shutdown;

type Timeout$ = any;

export function get_by_name<HJA, HJB>(name: $process.Name$<Message$<HJA, HJB>>): Supervisor$<
  HJA,
  HJB
>;

export function named<HJR, HJS>(
  builder: Builder$<HJR, HJS>,
  name: $process.Name$<Message$<HJR, HJS>>
): Builder$<HJR, HJS>;

export function restart_tolerance<HKA, HKB>(
  builder: Builder$<HKA, HKB>,
  intensity: number,
  period: number
): Builder$<HKA, HKB>;

export function timeout<HKG, HKH>(builder: Builder$<HKG, HKH>, ms: number): Builder$<
  HKG,
  HKH
>;

export function restart_strategy<HKM, HKN>(
  builder: Builder$<HKM, HKN>,
  restart_strategy: $supervision.Restart$
): Builder$<HKM, HKN>;

export function start<HKS, HKT>(builder: Builder$<HKS, HKT>): _.Result<
  $actor.Started$<Supervisor$<HKS, HKT>>,
  $actor.StartError$
>;

export function supervised<HLR, HLS>(builder: Builder$<HLR, HLS>): $supervision.ChildSpecification$<
  Supervisor$<HLR, HLS>
>;

export function start_child<HLY, HLZ>(
  supervisor: Supervisor$<HLY, HLZ>,
  argument: HLY
): _.Result<$actor.Started$<HLZ>, $actor.StartError$>;

export function init(start_data: $dynamic.Dynamic$): _.Result<
  $dynamic.Dynamic$,
  any
>;

export function start_child_callback<HMW, HMX>(
  start: (x0: HMW) => _.Result<$actor.Started$<HMX>, $actor.StartError$>,
  argument: HMW
): $result2.Result2$<$process.Pid$, HMX, $actor.StartError$>;

export function worker_child<HJH, HJI>(
  template: (x0: HJH) => _.Result<$actor.Started$<HJI>, $actor.StartError$>
): Builder$<HJH, HJI>;

export function supervisor_child<HJM, HJN>(
  template: (x0: HJM) => _.Result<$actor.Started$<HJN>, $actor.StartError$>
): Builder$<HJM, HJN>;
