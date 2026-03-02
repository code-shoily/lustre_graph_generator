import type * as $charlist from "../../../gleam_erlang/gleam/erlang/charlist.d.mts";
import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $system from "../../gleam/otp/system.d.mts";

declare class Message<GMW> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: GMW);
  /** @deprecated */
  0: GMW;
}

declare class System extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $system.SystemMessage$);
  /** @deprecated */
  0: $system.SystemMessage$;
}

declare class Unexpected extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $dynamic.Dynamic$);
  /** @deprecated */
  0: $dynamic.Dynamic$;
}

type Message$<GMW> = Message<GMW> | System | Unexpected;

declare class Continue<GMX, GMY> extends _.CustomType {
  /** @deprecated */
  constructor(state: GMX, selector: $option.Option$<$process.Selector$<any>>);
  /** @deprecated */
  state: GMX;
  /** @deprecated */
  selector: $option.Option$<$process.Selector$<any>>;
}

declare class Stop extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $process.ExitReason$);
  /** @deprecated */
  0: $process.ExitReason$;
}

export type Next$<GMX, GMY> = Continue<GMY, GMX> | Stop;

declare class Self<GMZ, GNA> extends _.CustomType {
  /** @deprecated */
  constructor(
    mode: $system.Mode$,
    parent: $process.Pid$,
    state: GMZ,
    selector: $process.Selector$<Message$<any>>,
    debug_state: $system.DebugState$,
    message_handler: (x0: any, x1: any) => Next$<any, any>
  );
  /** @deprecated */
  mode: $system.Mode$;
  /** @deprecated */
  parent: $process.Pid$;
  /** @deprecated */
  state: GMZ;
  /** @deprecated */
  selector: $process.Selector$<Message$<any>>;
  /** @deprecated */
  debug_state: $system.DebugState$;
  /** @deprecated */
  message_handler: (x0: any, x1: any) => Next$<any, any>;
}

type Self$<GMZ, GNA> = Self<GNA, GMZ>;

export class Started<GNB> extends _.CustomType {
  /** @deprecated */
  constructor(pid: $process.Pid$, data: GNB);
  /** @deprecated */
  pid: $process.Pid$;
  /** @deprecated */
  data: GNB;
}
export function Started$Started<GNB>(
  pid: $process.Pid$,
  data: GNB,
): Started$<GNB>;
export function Started$isStarted<GNB>(value: Started$<GNB>): boolean;
export function Started$Started$0<GNB>(value: Started$<GNB>): $process.Pid$;
export function Started$Started$pid<GNB>(value: Started$<GNB>): $process.Pid$;
export function Started$Started$1<GNB>(value: Started$<GNB>): GNB;
export function Started$Started$data<GNB>(value: Started$<GNB>): GNB;

export type Started$<GNB> = Started<GNB>;

declare class Initialised<GND, GNE, GNC> extends _.CustomType {
  /** @deprecated */
  constructor(
    state: GNC,
    selector: $option.Option$<$process.Selector$<any>>,
    return$: GNE
  );
  /** @deprecated */
  state: GNC;
  /** @deprecated */
  selector: $option.Option$<$process.Selector$<any>>;
  /** @deprecated */
  return$: GNE;
}

export type Initialised$<GNC, GNE, GND> = Initialised<GNC, GND, GNE>;

declare class Builder<GNF, GNH, GNG> extends _.CustomType {
  /** @deprecated */
  constructor(
    initialise: (x0: $process.Subject$<any>) => _.Result<
      Initialised$<any, any, any>,
      string
    >,
    initialisation_timeout: number,
    on_message: (x0: any, x1: any) => Next$<any, any>,
    name: $option.Option$<$process.Name$<any>>
  );
  /** @deprecated */
  initialise: (x0: $process.Subject$<any>) => _.Result<
    Initialised$<any, any, any>,
    string
  >;
  /** @deprecated */
  initialisation_timeout: number;
  /** @deprecated */
  on_message: (x0: any, x1: any) => Next$<any, any>;
  /** @deprecated */
  name: $option.Option$<$process.Name$<any>>;
}

export type Builder$<GNF, GNG, GNH> = Builder<GNG, GNF, GNH>;

export class InitTimeout extends _.CustomType {}
export function StartError$InitTimeout(): StartError$;
export function StartError$isInitTimeout(value: StartError$): boolean;

export class InitFailed extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function StartError$InitFailed($0: string): StartError$;
export function StartError$isInitFailed(value: StartError$): boolean;
export function StartError$InitFailed$0(value: StartError$): string;

export class InitExited extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $process.ExitReason$);
  /** @deprecated */
  0: $process.ExitReason$;
}
export function StartError$InitExited($0: $process.ExitReason$): StartError$;
export function StartError$isInitExited(value: StartError$): boolean;
export function StartError$InitExited$0(value: StartError$): $process.ExitReason$;

export type StartError$ = InitTimeout | InitFailed | InitExited;

declare class Ack<GNI> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.Result<any, string>);
  /** @deprecated */
  0: _.Result<any, string>;
}

declare class Mon extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $process.Down$);
  /** @deprecated */
  0: $process.Down$;
}

type StartInitMessage$<GNI> = Ack<GNI> | Mon;

export type StartResult = _.Result<Started$<any>, StartError$>;

export function continue$<GNN>(state: GNN): Next$<GNN, any>;

export function stop(): Next$<any, any>;

export function stop_abnormal(reason: string): Next$<any, any>;

export function with_selector<GNZ, GOA>(
  value: Next$<GNZ, GOA>,
  selector: $process.Selector$<GOA>
): Next$<GNZ, GOA>;

export function initialised<GOG>(state: GOG): Initialised$<GOG, any, undefined>;

export function selecting<GOL, GON, GOR>(
  initialised: Initialised$<GOL, any, GON>,
  selector: $process.Selector$<GOR>
): Initialised$<GOL, GOR, GON>;

export function returning<GOW, GOX, GPC>(
  initialised: Initialised$<GOW, GOX, any>,
  return$: GPC
): Initialised$<GOW, GOX, GPC>;

export function new$<GPG, GPH>(state: GPG): Builder$<
  GPG,
  GPH,
  $process.Subject$<GPH>
>;

export function new_with_initialiser<GPM, GPO, GPP>(
  timeout: number,
  initialise: (x0: $process.Subject$<GPM>) => _.Result<
    Initialised$<GPO, GPM, GPP>,
    string
  >
): Builder$<GPO, GPM, GPP>;

export function on_message<GPY, GPZ, GQA>(
  builder: Builder$<GPY, GPZ, GQA>,
  handler: (x0: GPY, x1: GPZ) => Next$<GPY, GPZ>
): Builder$<GPY, GPZ, GQA>;

export function named<GQJ, GQK, GQL>(
  builder: Builder$<GQJ, GQK, GQL>,
  name: $process.Name$<GQK>
): Builder$<GQJ, GQK, GQL>;

export function start<GSE>(builder: Builder$<any, any, GSE>): _.Result<
  Started$<GSE>,
  StartError$
>;

export function send<GSL>(subject: $process.Subject$<GSL>, msg: GSL): undefined;

export function call<GSN, GSP>(
  subject: $process.Subject$<GSN>,
  timeout: number,
  make_message: (x0: $process.Subject$<GSP>) => GSN
): GSP;
