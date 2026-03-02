import type * as $order from "../../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $duration from "../../gleam/time/duration.d.mts";

export class Date extends _.CustomType {
  /** @deprecated */
  constructor(year: number, month: Month$, day: number);
  /** @deprecated */
  year: number;
  /** @deprecated */
  month: Month$;
  /** @deprecated */
  day: number;
}
export function Date$Date(year: number, month: Month$, day: number): Date$;
export function Date$isDate(value: Date$): boolean;
export function Date$Date$0(value: Date$): number;
export function Date$Date$year(value: Date$): number;
export function Date$Date$1(value: Date$): Month$;
export function Date$Date$month(value: Date$): Month$;
export function Date$Date$2(value: Date$): number;
export function Date$Date$day(value: Date$): number;

export type Date$ = Date;

export class TimeOfDay extends _.CustomType {
  /** @deprecated */
  constructor(
    hours: number,
    minutes: number,
    seconds: number,
    nanoseconds: number
  );
  /** @deprecated */
  hours: number;
  /** @deprecated */
  minutes: number;
  /** @deprecated */
  seconds: number;
  /** @deprecated */
  nanoseconds: number;
}
export function TimeOfDay$TimeOfDay(
  hours: number,
  minutes: number,
  seconds: number,
  nanoseconds: number,
): TimeOfDay$;
export function TimeOfDay$isTimeOfDay(value: TimeOfDay$): boolean;
export function TimeOfDay$TimeOfDay$0(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$hours(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$1(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$minutes(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$2(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$seconds(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$3(value: TimeOfDay$): number;
export function TimeOfDay$TimeOfDay$nanoseconds(value: TimeOfDay$): number;

export type TimeOfDay$ = TimeOfDay;

export class January extends _.CustomType {}
export function Month$January(): Month$;
export function Month$isJanuary(value: Month$): boolean;

export class February extends _.CustomType {}
export function Month$February(): Month$;
export function Month$isFebruary(value: Month$): boolean;

export class March extends _.CustomType {}
export function Month$March(): Month$;
export function Month$isMarch(value: Month$): boolean;

export class April extends _.CustomType {}
export function Month$April(): Month$;
export function Month$isApril(value: Month$): boolean;

export class May extends _.CustomType {}
export function Month$May(): Month$;
export function Month$isMay(value: Month$): boolean;

export class June extends _.CustomType {}
export function Month$June(): Month$;
export function Month$isJune(value: Month$): boolean;

export class July extends _.CustomType {}
export function Month$July(): Month$;
export function Month$isJuly(value: Month$): boolean;

export class August extends _.CustomType {}
export function Month$August(): Month$;
export function Month$isAugust(value: Month$): boolean;

export class September extends _.CustomType {}
export function Month$September(): Month$;
export function Month$isSeptember(value: Month$): boolean;

export class October extends _.CustomType {}
export function Month$October(): Month$;
export function Month$isOctober(value: Month$): boolean;

export class November extends _.CustomType {}
export function Month$November(): Month$;
export function Month$isNovember(value: Month$): boolean;

export class December extends _.CustomType {}
export function Month$December(): Month$;
export function Month$isDecember(value: Month$): boolean;

export type Month$ = January | February | March | April | May | June | July | August | September | October | November | December;

export const utc_offset: $duration.Duration$;

export function local_offset(): $duration.Duration$;

export function month_to_string(month: Month$): string;

export function month_to_int(month: Month$): number;

export function month_from_int(month: number): _.Result<Month$, undefined>;

export function is_leap_year(year: number): boolean;

export function is_valid_date(date: Date$): boolean;

export function is_valid_time_of_day(time: TimeOfDay$): boolean;

export function naive_date_compare(one: Date$, other: Date$): $order.Order$;
