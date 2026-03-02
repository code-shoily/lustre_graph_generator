import type * as $order from "../../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $calendar from "../../gleam/time/calendar.d.mts";
import type * as $duration from "../../gleam/time/duration.d.mts";

declare class Timestamp extends _.CustomType {
  /** @deprecated */
  constructor(seconds: number, nanoseconds: number);
  /** @deprecated */
  seconds: number;
  /** @deprecated */
  nanoseconds: number;
}

export type Timestamp$ = Timestamp;

export const unix_epoch: Timestamp$;

export function compare(left: Timestamp$, right: Timestamp$): $order.Order$;

export function system_time(): Timestamp$;

export function difference(left: Timestamp$, right: Timestamp$): $duration.Duration$;

export function add(timestamp: Timestamp$, duration: $duration.Duration$): Timestamp$;

export function to_calendar(timestamp: Timestamp$, offset: $duration.Duration$): [
  $calendar.Date$,
  $calendar.TimeOfDay$
];

export function to_rfc3339(timestamp: Timestamp$, offset: $duration.Duration$): string;

export function from_unix_seconds(seconds: number): Timestamp$;

export function from_unix_seconds_and_nanoseconds(
  seconds: number,
  nanoseconds: number
): Timestamp$;

export function to_unix_seconds(timestamp: Timestamp$): number;

export function to_unix_seconds_and_nanoseconds(timestamp: Timestamp$): [
  number,
  number
];

export function from_calendar(
  date: $calendar.Date$,
  time: $calendar.TimeOfDay$,
  offset: $duration.Duration$
): Timestamp$;

export function parse_rfc3339(input: string): _.Result<Timestamp$, undefined>;
