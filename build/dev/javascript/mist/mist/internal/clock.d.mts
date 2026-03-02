import type * as $atom from "../../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as _ from "../../gleam.d.mts";

export class SetTime extends _.CustomType {}
export function ClockMessage$SetTime(): ClockMessage$;
export function ClockMessage$isSetTime(value: ClockMessage$): boolean;

export type ClockMessage$ = SetTime;

declare class MistClock extends _.CustomType {}

type ClockTable$ = MistClock;

declare class DateHeader extends _.CustomType {}

type TableKey$ = DateHeader;

export class Set extends _.CustomType {}
export function EtsOpts$Set(): EtsOpts$;
export function EtsOpts$isSet(value: EtsOpts$): boolean;

export class Protected extends _.CustomType {}
export function EtsOpts$Protected(): EtsOpts$;
export function EtsOpts$isProtected(value: EtsOpts$): boolean;

export class NamedTable extends _.CustomType {}
export function EtsOpts$NamedTable(): EtsOpts$;
export function EtsOpts$isNamedTable(value: EtsOpts$): boolean;

export class ReadConcurrency extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: boolean);
  /** @deprecated */
  0: boolean;
}
export function EtsOpts$ReadConcurrency($0: boolean): EtsOpts$;
export function EtsOpts$isReadConcurrency(value: EtsOpts$): boolean;
export function EtsOpts$ReadConcurrency$0(value: EtsOpts$): boolean;

export type EtsOpts$ = Set | Protected | NamedTable | ReadConcurrency;

export function stop(x0: any): $atom.Atom$;

export function start(x0: any, x1: any): _.Result<
  $process.Pid$,
  $actor.StartError$
>;

export function get_date(): string;
