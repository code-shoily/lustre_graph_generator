import type * as $order from "../../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../../gleam.d.mts";

declare class Duration extends _.CustomType {
  /** @deprecated */
  constructor(seconds: number, nanoseconds: number);
  /** @deprecated */
  seconds: number;
  /** @deprecated */
  nanoseconds: number;
}

export type Duration$ = Duration;

export class Nanosecond extends _.CustomType {}
export function Unit$Nanosecond(): Unit$;
export function Unit$isNanosecond(value: Unit$): boolean;

export class Microsecond extends _.CustomType {}
export function Unit$Microsecond(): Unit$;
export function Unit$isMicrosecond(value: Unit$): boolean;

export class Millisecond extends _.CustomType {}
export function Unit$Millisecond(): Unit$;
export function Unit$isMillisecond(value: Unit$): boolean;

export class Second extends _.CustomType {}
export function Unit$Second(): Unit$;
export function Unit$isSecond(value: Unit$): boolean;

export class Minute extends _.CustomType {}
export function Unit$Minute(): Unit$;
export function Unit$isMinute(value: Unit$): boolean;

export class Hour extends _.CustomType {}
export function Unit$Hour(): Unit$;
export function Unit$isHour(value: Unit$): boolean;

export class Day extends _.CustomType {}
export function Unit$Day(): Unit$;
export function Unit$isDay(value: Unit$): boolean;

export class Week extends _.CustomType {}
export function Unit$Week(): Unit$;
export function Unit$isWeek(value: Unit$): boolean;

export class Month extends _.CustomType {}
export function Unit$Month(): Unit$;
export function Unit$isMonth(value: Unit$): boolean;

export class Year extends _.CustomType {}
export function Unit$Year(): Unit$;
export function Unit$isYear(value: Unit$): boolean;

export type Unit$ = Nanosecond | Microsecond | Millisecond | Second | Minute | Hour | Day | Week | Month | Year;

export const empty: Duration$;

export function approximate(duration: Duration$): [number, Unit$];

export function compare(left: Duration$, right: Duration$): $order.Order$;

export function difference(left: Duration$, right: Duration$): Duration$;

export function add(left: Duration$, right: Duration$): Duration$;

export function seconds(amount: number): Duration$;

export function minutes(amount: number): Duration$;

export function hours(amount: number): Duration$;

export function milliseconds(amount: number): Duration$;

export function nanoseconds(amount: number): Duration$;

export function to_seconds(duration: Duration$): number;

export function to_seconds_and_nanoseconds(duration: Duration$): [
  number,
  number
];

export function to_milliseconds(duration: Duration$): number;

export function to_iso8601_string(duration: Duration$): string;
