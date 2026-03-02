import type * as $dynamic from "../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "./gleam.d.mts";

export class Errored extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $dynamic.Dynamic$);
  /** @deprecated */
  0: $dynamic.Dynamic$;
}
export function Exception$Errored($0: $dynamic.Dynamic$): Exception$;
export function Exception$isErrored(value: Exception$): boolean;
export function Exception$Errored$0(value: Exception$): $dynamic.Dynamic$;

export class Thrown extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $dynamic.Dynamic$);
  /** @deprecated */
  0: $dynamic.Dynamic$;
}
export function Exception$Thrown($0: $dynamic.Dynamic$): Exception$;
export function Exception$isThrown(value: Exception$): boolean;
export function Exception$Thrown$0(value: Exception$): $dynamic.Dynamic$;

export class Exited extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $dynamic.Dynamic$);
  /** @deprecated */
  0: $dynamic.Dynamic$;
}
export function Exception$Exited($0: $dynamic.Dynamic$): Exception$;
export function Exception$isExited(value: Exception$): boolean;
export function Exception$Exited$0(value: Exception$): $dynamic.Dynamic$;

export type Exception$ = Errored | Thrown | Exited;

export function rescue<ECU>(body: () => ECU): _.Result<ECU, Exception$>;

export function defer<ECY>(cleanup: () => any, body: () => ECY): ECY;

export function on_crash<EDA>(cleanup: () => any, body: () => EDA): EDA;
