import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $port from "../../gleam/erlang/port.d.mts";
import type * as $reference from "../../gleam/erlang/reference.d.mts";

export type Pid$ = any;

declare class Subject extends _.CustomType {
  /** @deprecated */
  constructor(owner: Pid$, tag: $dynamic.Dynamic$);
  /** @deprecated */
  owner: Pid$;
  /** @deprecated */
  tag: $dynamic.Dynamic$;
}

declare class NamedSubject<EWJ> extends _.CustomType {
  /** @deprecated */
  constructor(name: Name$<any>);
  /** @deprecated */
  name: Name$<any>;
}

export type Subject$<EWJ> = Subject | NamedSubject<EWJ>;

export type Name$<EWK> = any;

type DoNotLeak$ = any;

export type Selector$<EWL> = any;

export class ExitMessage extends _.CustomType {
  /** @deprecated */
  constructor(pid: Pid$, reason: ExitReason$);
  /** @deprecated */
  pid: Pid$;
  /** @deprecated */
  reason: ExitReason$;
}
export function ExitMessage$ExitMessage(
  pid: Pid$,
  reason: ExitReason$,
): ExitMessage$;
export function ExitMessage$isExitMessage(value: ExitMessage$): boolean;
export function ExitMessage$ExitMessage$0(value: ExitMessage$): Pid$;
export function ExitMessage$ExitMessage$pid(value: ExitMessage$): Pid$;
export function ExitMessage$ExitMessage$1(value: ExitMessage$): ExitReason$;
export function ExitMessage$ExitMessage$reason(value: ExitMessage$): ExitReason$;

export type ExitMessage$ = ExitMessage;

export class Normal extends _.CustomType {}
export function ExitReason$Normal(): ExitReason$;
export function ExitReason$isNormal(value: ExitReason$): boolean;

export class Killed extends _.CustomType {}
export function ExitReason$Killed(): ExitReason$;
export function ExitReason$isKilled(value: ExitReason$): boolean;

export class Abnormal extends _.CustomType {
  /** @deprecated */
  constructor(reason: $dynamic.Dynamic$);
  /** @deprecated */
  reason: $dynamic.Dynamic$;
}
export function ExitReason$Abnormal(reason: $dynamic.Dynamic$): ExitReason$;
export function ExitReason$isAbnormal(value: ExitReason$): boolean;
export function ExitReason$Abnormal$0(value: ExitReason$): $dynamic.Dynamic$;
export function ExitReason$Abnormal$reason(value: ExitReason$): $dynamic.Dynamic$;

export type ExitReason$ = Normal | Killed | Abnormal;

declare class Anything extends _.CustomType {}

type AnythingSelectorTag$ = Anything;

declare class Process extends _.CustomType {}

type ProcessMonitorFlag$ = Process;

export type Monitor$ = any;

export class ProcessDown extends _.CustomType {
  /** @deprecated */
  constructor(monitor: Monitor$, pid: Pid$, reason: ExitReason$);
  /** @deprecated */
  monitor: Monitor$;
  /** @deprecated */
  pid: Pid$;
  /** @deprecated */
  reason: ExitReason$;
}
export function Down$ProcessDown(
  monitor: Monitor$,
  pid: Pid$,
  reason: ExitReason$,
): Down$;
export function Down$isProcessDown(value: Down$): boolean;
export function Down$ProcessDown$0(value: Down$): Monitor$;
export function Down$ProcessDown$monitor(value: Down$): Monitor$;
export function Down$ProcessDown$1(value: Down$): Pid$;
export function Down$ProcessDown$pid(value: Down$): Pid$;
export function Down$ProcessDown$2(value: Down$): ExitReason$;
export function Down$ProcessDown$reason(value: Down$): ExitReason$;

export class PortDown extends _.CustomType {
  /** @deprecated */
  constructor(monitor: Monitor$, port: $port.Port$, reason: ExitReason$);
  /** @deprecated */
  monitor: Monitor$;
  /** @deprecated */
  port: $port.Port$;
  /** @deprecated */
  reason: ExitReason$;
}
export function Down$PortDown(
  monitor: Monitor$,
  port: $port.Port$,
  reason: ExitReason$,
): Down$;
export function Down$isPortDown(value: Down$): boolean;
export function Down$PortDown$0(value: Down$): Monitor$;
export function Down$PortDown$monitor(value: Down$): Monitor$;
export function Down$PortDown$1(value: Down$): $port.Port$;
export function Down$PortDown$port(value: Down$): $port.Port$;
export function Down$PortDown$2(value: Down$): ExitReason$;
export function Down$PortDown$reason(value: Down$): ExitReason$;

export type Down$ = ProcessDown | PortDown;

export function Down$monitor(value: Down$): Monitor$;
export function Down$reason(value: Down$): ExitReason$;

export type Timer$ = any;

export class TimerNotFound extends _.CustomType {}
export function Cancelled$TimerNotFound(): Cancelled$;
export function Cancelled$isTimerNotFound(value: Cancelled$): boolean;

export class Cancelled extends _.CustomType {
  /** @deprecated */
  constructor(time_remaining: number);
  /** @deprecated */
  time_remaining: number;
}
export function Cancelled$Cancelled(time_remaining: number): Cancelled$;
export function Cancelled$isCancelled(value: Cancelled$): boolean;
export function Cancelled$Cancelled$0(value: Cancelled$): number;
export function Cancelled$Cancelled$time_remaining(value: Cancelled$): number;

export type Cancelled$ = TimerNotFound | Cancelled;

declare class Kill extends _.CustomType {}

type KillFlag$ = Kill;

export function self(): Pid$;

export function spawn(running: () => any): Pid$;

export function spawn_unlinked(a: () => any): Pid$;

export function unsafely_create_subject(owner: Pid$, tag: $dynamic.Dynamic$): Subject$<
  any
>;

export function new_name(prefix: string): Name$<any>;

export function named_subject<EWS>(name: Name$<EWS>): Subject$<EWS>;

export function subject_name<EWV>(subject: Subject$<EWV>): _.Result<
  Name$<EWV>,
  undefined
>;

export function receive<EXJ>(subject: Subject$<EXJ>, timeout: number): _.Result<
  EXJ,
  undefined
>;

export function receive_forever<EXR>(subject: Subject$<EXR>): EXR;

export function new_selector(): Selector$<any>;

export function selector_receive<EXV>(from: Selector$<EXV>, within: number): _.Result<
  EXV,
  undefined
>;

export function selector_receive_forever<EXZ>(from: Selector$<EXZ>): EXZ;

export function map_selector<EYB, EYD>(a: Selector$<EYB>, b: (x0: EYB) => EYD): Selector$<
  EYD
>;

export function merge_selector<EYF>(a: Selector$<EYF>, b: Selector$<EYF>): Selector$<
  EYF
>;

export function flush_messages(): undefined;

export function select_map<EYQ, EYS>(
  selector: Selector$<EYQ>,
  subject: Subject$<EYS>,
  transform: (x0: EYS) => EYQ
): Selector$<EYQ>;

export function select<EYM>(selector: Selector$<EYM>, subject: Subject$<EYM>): Selector$<
  EYM
>;

export function select_record<EZA>(
  selector: Selector$<EZA>,
  tag: any,
  arity: number,
  transform: (x0: $dynamic.Dynamic$) => EZA
): Selector$<EZA>;

export function select_other<EZE>(
  selector: Selector$<EZE>,
  handler: (x0: $dynamic.Dynamic$) => EZE
): Selector$<EZE>;

export function deselect<EYV>(selector: Selector$<EYV>, subject: Subject$<any>): Selector$<
  EYV
>;

export function sleep(a: number): undefined;

export function sleep_forever(): undefined;

export function is_alive(a: Pid$): boolean;

export function monitor(pid: Pid$): Monitor$;

export function select_specific_monitor<EZQ>(
  selector: Selector$<EZQ>,
  monitor: Monitor$,
  mapping: (x0: Down$) => EZQ
): Selector$<EZQ>;

export function select_monitors<EZT>(
  selector: Selector$<EZT>,
  mapping: (x0: Down$) => EZT
): Selector$<EZT>;

export function select_trapped_exits<EYJ>(
  selector: Selector$<EYJ>,
  handler: (x0: ExitMessage$) => EYJ
): Selector$<EYJ>;

export function demonitor_process(monitor: Monitor$): undefined;

export function deselect_specific_monitor<EZW>(
  selector: Selector$<EZW>,
  monitor: Monitor$
): Selector$<EZW>;

export function link(pid: Pid$): boolean;

export function unlink(pid: Pid$): undefined;

export function send_after<FAS>(
  subject: Subject$<FAS>,
  delay: number,
  message: FAS
): Timer$;

export function new_subject(): Subject$<any>;

export function cancel_timer(timer: Timer$): Cancelled$;

export function kill(pid: Pid$): undefined;

export function send_exit(pid: Pid$): undefined;

export function send_abnormal_exit(pid: Pid$, reason: any): undefined;

export function trap_exits(a: boolean): undefined;

export function register(pid: Pid$, name: Name$<any>): _.Result<
  undefined,
  undefined
>;

export function unregister(name: Name$<any>): _.Result<undefined, undefined>;

export function named(name: Name$<any>): _.Result<Pid$, undefined>;

export function subject_owner(subject: Subject$<any>): _.Result<Pid$, undefined>;

export function send<EXH>(subject: Subject$<EXH>, message: EXH): undefined;

export function call<FAG, FAI>(
  subject: Subject$<FAG>,
  timeout: number,
  make_request: (x0: Subject$<FAI>) => FAG
): FAI;

export function call_forever<FAK, FAM>(
  subject: Subject$<FAK>,
  make_request: (x0: Subject$<FAM>) => FAK
): FAM;
