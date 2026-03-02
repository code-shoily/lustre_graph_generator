import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as $calendar from "../gleam_time/gleam/time/calendar.d.mts";
import type * as $duration from "../gleam_time/gleam/time/duration.d.mts";
import type * as $timestamp from "../gleam_time/gleam/time/timestamp.d.mts";
import type * as _ from "./gleam.d.mts";

export class Int extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Toml$Int($0: number): Toml$;
export function Toml$isInt(value: Toml$): boolean;
export function Toml$Int$0(value: Toml$): number;

export class Float extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Toml$Float($0: number): Toml$;
export function Toml$isFloat(value: Toml$): boolean;
export function Toml$Float$0(value: Toml$): number;

export class Infinity extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Sign$);
  /** @deprecated */
  0: Sign$;
}
export function Toml$Infinity($0: Sign$): Toml$;
export function Toml$isInfinity(value: Toml$): boolean;
export function Toml$Infinity$0(value: Toml$): Sign$;

export class Nan extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Sign$);
  /** @deprecated */
  0: Sign$;
}
export function Toml$Nan($0: Sign$): Toml$;
export function Toml$isNan(value: Toml$): boolean;
export function Toml$Nan$0(value: Toml$): Sign$;

export class Bool extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: boolean);
  /** @deprecated */
  0: boolean;
}
export function Toml$Bool($0: boolean): Toml$;
export function Toml$isBool(value: Toml$): boolean;
export function Toml$Bool$0(value: Toml$): boolean;

export class String extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Toml$String($0: string): Toml$;
export function Toml$isString(value: Toml$): boolean;
export function Toml$String$0(value: Toml$): string;

export class Date extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $calendar.Date$);
  /** @deprecated */
  0: $calendar.Date$;
}
export function Toml$Date($0: $calendar.Date$): Toml$;
export function Toml$isDate(value: Toml$): boolean;
export function Toml$Date$0(value: Toml$): $calendar.Date$;

export class Time extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $calendar.TimeOfDay$);
  /** @deprecated */
  0: $calendar.TimeOfDay$;
}
export function Toml$Time($0: $calendar.TimeOfDay$): Toml$;
export function Toml$isTime(value: Toml$): boolean;
export function Toml$Time$0(value: Toml$): $calendar.TimeOfDay$;

export class DateTime extends _.CustomType {
  /** @deprecated */
  constructor(
    date: $calendar.Date$,
    time: $calendar.TimeOfDay$,
    offset: Offset$
  );
  /** @deprecated */
  date: $calendar.Date$;
  /** @deprecated */
  time: $calendar.TimeOfDay$;
  /** @deprecated */
  offset: Offset$;
}
export function Toml$DateTime(
  date: $calendar.Date$,
  time: $calendar.TimeOfDay$,
  offset: Offset$,
): Toml$;
export function Toml$isDateTime(value: Toml$): boolean;
export function Toml$DateTime$0(value: Toml$): $calendar.Date$;
export function Toml$DateTime$date(value: Toml$): $calendar.Date$;
export function Toml$DateTime$1(value: Toml$): $calendar.TimeOfDay$;
export function Toml$DateTime$time(value: Toml$): $calendar.TimeOfDay$;
export function Toml$DateTime$2(value: Toml$): Offset$;
export function Toml$DateTime$offset(value: Toml$): Offset$;

export class Array extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.List<Toml$>);
  /** @deprecated */
  0: _.List<Toml$>;
}
export function Toml$Array($0: _.List<Toml$>): Toml$;
export function Toml$isArray(value: Toml$): boolean;
export function Toml$Array$0(value: Toml$): _.List<Toml$>;

export class ArrayOfTables extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.List<$dict.Dict$<string, Toml$>>);
  /** @deprecated */
  0: _.List<$dict.Dict$<string, Toml$>>;
}
export function Toml$ArrayOfTables(
  $0: _.List<$dict.Dict$<string, Toml$>>,
): Toml$;
export function Toml$isArrayOfTables(value: Toml$): boolean;
export function Toml$ArrayOfTables$0(value: Toml$): _.List<
  $dict.Dict$<string, Toml$>
>;

export class Table extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $dict.Dict$<string, Toml$>);
  /** @deprecated */
  0: $dict.Dict$<string, Toml$>;
}
export function Toml$Table($0: $dict.Dict$<string, Toml$>): Toml$;
export function Toml$isTable(value: Toml$): boolean;
export function Toml$Table$0(value: Toml$): $dict.Dict$<string, Toml$>;

export class InlineTable extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $dict.Dict$<string, Toml$>);
  /** @deprecated */
  0: $dict.Dict$<string, Toml$>;
}
export function Toml$InlineTable($0: $dict.Dict$<string, Toml$>): Toml$;
export function Toml$isInlineTable(value: Toml$): boolean;
export function Toml$InlineTable$0(value: Toml$): $dict.Dict$<string, Toml$>;

export type Toml$ = Int | Float | Infinity | Nan | Bool | String | Date | Time | DateTime | Array | ArrayOfTables | Table | InlineTable;

export class Local extends _.CustomType {}
export function Offset$Local(): Offset$;
export function Offset$isLocal(value: Offset$): boolean;

export class Offset extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $duration.Duration$);
  /** @deprecated */
  0: $duration.Duration$;
}
export function Offset$Offset($0: $duration.Duration$): Offset$;
export function Offset$isOffset(value: Offset$): boolean;
export function Offset$Offset$0(value: Offset$): $duration.Duration$;

export type Offset$ = Local | Offset;

export class Positive extends _.CustomType {}
export function Sign$Positive(): Sign$;
export function Sign$isPositive(value: Sign$): boolean;

export class Negative extends _.CustomType {}
export function Sign$Negative(): Sign$;
export function Sign$isNegative(value: Sign$): boolean;

export type Sign$ = Positive | Negative;

export class Unexpected extends _.CustomType {
  /** @deprecated */
  constructor(got: string, expected: string);
  /** @deprecated */
  got: string;
  /** @deprecated */
  expected: string;
}
export function ParseError$Unexpected(
  got: string,
  expected: string,
): ParseError$;
export function ParseError$isUnexpected(value: ParseError$): boolean;
export function ParseError$Unexpected$0(value: ParseError$): string;
export function ParseError$Unexpected$got(value: ParseError$): string;
export function ParseError$Unexpected$1(value: ParseError$): string;
export function ParseError$Unexpected$expected(value: ParseError$): string;

export class KeyAlreadyInUse extends _.CustomType {
  /** @deprecated */
  constructor(key: _.List<string>);
  /** @deprecated */
  key: _.List<string>;
}
export function ParseError$KeyAlreadyInUse(key: _.List<string>): ParseError$;
export function ParseError$isKeyAlreadyInUse(value: ParseError$): boolean;
export function ParseError$KeyAlreadyInUse$0(value: ParseError$): _.List<string>;
export function ParseError$KeyAlreadyInUse$key(
  value: ParseError$,
): _.List<string>;

export type ParseError$ = Unexpected | KeyAlreadyInUse;

export class NumberInt extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Number$NumberInt($0: number): Number$;
export function Number$isNumberInt(value: Number$): boolean;
export function Number$NumberInt$0(value: Number$): number;

export class NumberFloat extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Number$NumberFloat($0: number): Number$;
export function Number$isNumberFloat(value: Number$): boolean;
export function Number$NumberFloat$0(value: Number$): number;

export class NumberInfinity extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Sign$);
  /** @deprecated */
  0: Sign$;
}
export function Number$NumberInfinity($0: Sign$): Number$;
export function Number$isNumberInfinity(value: Number$): boolean;
export function Number$NumberInfinity$0(value: Number$): Sign$;

export class NumberNan extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Sign$);
  /** @deprecated */
  0: Sign$;
}
export function Number$NumberNan($0: Sign$): Number$;
export function Number$isNumberNan(value: Number$): boolean;
export function Number$NumberNan$0(value: Number$): Sign$;

export type Number$ = NumberInt | NumberFloat | NumberInfinity | NumberNan;

export class NotFound extends _.CustomType {
  /** @deprecated */
  constructor(key: _.List<string>);
  /** @deprecated */
  key: _.List<string>;
}
export function GetError$NotFound(key: _.List<string>): GetError$;
export function GetError$isNotFound(value: GetError$): boolean;
export function GetError$NotFound$0(value: GetError$): _.List<string>;
export function GetError$NotFound$key(value: GetError$): _.List<string>;

export class WrongType extends _.CustomType {
  /** @deprecated */
  constructor(key: _.List<string>, expected: string, got: string);
  /** @deprecated */
  key: _.List<string>;
  /** @deprecated */
  expected: string;
  /** @deprecated */
  got: string;
}
export function GetError$WrongType(
  key: _.List<string>,
  expected: string,
  got: string,
): GetError$;
export function GetError$isWrongType(value: GetError$): boolean;
export function GetError$WrongType$0(value: GetError$): _.List<string>;
export function GetError$WrongType$key(value: GetError$): _.List<string>;
export function GetError$WrongType$1(value: GetError$): string;
export function GetError$WrongType$expected(value: GetError$): string;
export function GetError$WrongType$2(value: GetError$): string;
export function GetError$WrongType$got(value: GetError$): string;

export type GetError$ = NotFound | WrongType;

export function GetError$key(value: GetError$): _.List<string>;

export function get(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  Toml$,
  GetError$
>;

export function get_int(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  number,
  GetError$
>;

export function get_float(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  number,
  GetError$
>;

export function get_bool(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  boolean,
  GetError$
>;

export function get_string(
  toml: $dict.Dict$<string, Toml$>,
  key: _.List<string>
): _.Result<string, GetError$>;

export function get_date(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  $calendar.Date$,
  GetError$
>;

export function get_time_of_day(
  toml: $dict.Dict$<string, Toml$>,
  key: _.List<string>
): _.Result<$calendar.TimeOfDay$, GetError$>;

export function get_calendar_time(
  toml: $dict.Dict$<string, Toml$>,
  key: _.List<string>
): _.Result<[$calendar.Date$, $calendar.TimeOfDay$, Offset$], GetError$>;

export function get_timestamp(
  toml: $dict.Dict$<string, Toml$>,
  key: _.List<string>
): _.Result<$timestamp.Timestamp$, GetError$>;

export function get_array(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  _.List<Toml$>,
  GetError$
>;

export function get_table(toml: $dict.Dict$<string, Toml$>, key: _.List<string>): _.Result<
  $dict.Dict$<string, Toml$>,
  GetError$
>;

export function get_number(
  toml: $dict.Dict$<string, Toml$>,
  key: _.List<string>
): _.Result<Number$, GetError$>;

export function as_int(toml: Toml$): _.Result<number, GetError$>;

export function as_float(toml: Toml$): _.Result<number, GetError$>;

export function as_bool(toml: Toml$): _.Result<boolean, GetError$>;

export function as_string(toml: Toml$): _.Result<string, GetError$>;

export function as_date(toml: Toml$): _.Result<$calendar.Date$, GetError$>;

export function as_time_of_day(toml: Toml$): _.Result<
  $calendar.TimeOfDay$,
  GetError$
>;

export function as_timestamp(toml: Toml$): _.Result<
  $timestamp.Timestamp$,
  GetError$
>;

export function as_calendar_time(toml: Toml$): _.Result<
  [$calendar.Date$, $calendar.TimeOfDay$, Offset$],
  GetError$
>;

export function as_array(toml: Toml$): _.Result<_.List<Toml$>, GetError$>;

export function as_table(toml: Toml$): _.Result<
  $dict.Dict$<string, Toml$>,
  GetError$
>;

export function as_number(toml: Toml$): _.Result<Number$, GetError$>;

export function parse(input: string): _.Result<
  $dict.Dict$<string, Toml$>,
  ParseError$
>;
