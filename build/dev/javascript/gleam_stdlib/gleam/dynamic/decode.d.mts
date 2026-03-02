import type * as _ from "../../gleam.d.mts";
import type * as $dict from "../../gleam/dict.d.mts";
import type * as $dynamic from "../../gleam/dynamic.d.mts";
import type * as $option from "../../gleam/option.d.mts";

export class DecodeError extends _.CustomType {
  /** @deprecated */
  constructor(expected: string, found: string, path: _.List<string>);
  /** @deprecated */
  expected: string;
  /** @deprecated */
  found: string;
  /** @deprecated */
  path: _.List<string>;
}
export function DecodeError$DecodeError(
  expected: string,
  found: string,
  path: _.List<string>,
): DecodeError$;
export function DecodeError$isDecodeError(value: DecodeError$): boolean;
export function DecodeError$DecodeError$0(value: DecodeError$): string;
export function DecodeError$DecodeError$expected(value: DecodeError$): string;
export function DecodeError$DecodeError$1(value: DecodeError$): string;
export function DecodeError$DecodeError$found(value: DecodeError$): string;
export function DecodeError$DecodeError$2(value: DecodeError$): _.List<string>;
export function DecodeError$DecodeError$path(value: DecodeError$): _.List<
  string
>;

export type DecodeError$ = DecodeError;

declare class Decoder<BXA> extends _.CustomType {
  /** @deprecated */
  constructor(function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>]);
  /** @deprecated */
  function$: (x0: $dynamic.Dynamic$) => [any, _.List<DecodeError$>];
}

export type Decoder$<BXA> = Decoder<BXA>;

export type Dynamic = $dynamic.Dynamic$;

export const dynamic: Decoder$<$dynamic.Dynamic$>;

export const bool: Decoder$<boolean>;

export const int: Decoder$<number>;

export const float: Decoder$<number>;

export const bit_array: Decoder$<_.BitArray>;

export const string: Decoder$<string>;

export function run<BXI>(data: $dynamic.Dynamic$, decoder: Decoder$<BXI>): _.Result<
  BXI,
  _.List<DecodeError$>
>;

export function success<BYJ>(data: BYJ): Decoder$<BYJ>;

export function map<CBG, CBI>(
  decoder: Decoder$<CBG>,
  transformer: (x0: CBG) => CBI
): Decoder$<CBI>;

export function map_errors<CBK>(
  decoder: Decoder$<CBK>,
  transformer: (x0: _.List<DecodeError$>) => _.List<DecodeError$>
): Decoder$<CBK>;

export function then$<CBS, CBU>(
  decoder: Decoder$<CBS>,
  next: (x0: CBS) => Decoder$<CBU>
): Decoder$<CBU>;

export function one_of<CBX>(
  first: Decoder$<CBX>,
  alternatives: _.List<Decoder$<CBX>>
): Decoder$<CBX>;

export function recursive<CCN>(inner: () => Decoder$<CCN>): Decoder$<CCN>;

export function optional<CBC>(inner: Decoder$<CBC>): Decoder$<
  $option.Option$<CBC>
>;

export function decode_error(expected: string, found: $dynamic.Dynamic$): _.List<
  DecodeError$
>;

export function collapse_errors<CBP>(decoder: Decoder$<CBP>, name: string): Decoder$<
  CBP
>;

export function failure<CCH>(placeholder: CCH, name: string): Decoder$<CCH>;

export function new_primitive_decoder<CCJ>(
  name: string,
  decoding_function: (x0: $dynamic.Dynamic$) => _.Result<CCJ, CCJ>
): Decoder$<CCJ>;

export function dict<CAH, CAJ>(key: Decoder$<CAH>, value: Decoder$<CAJ>): Decoder$<
  $dict.Dict$<CAH, CAJ>
>;

export function list<BZV>(inner: Decoder$<BZV>): Decoder$<_.List<BZV>>;

export function subfield<BXD, BXF>(
  field_path: _.List<any>,
  field_decoder: Decoder$<BXD>,
  next: (x0: BXD) => Decoder$<BXF>
): Decoder$<BXF>;

export function at<BXP>(path: _.List<any>, inner: Decoder$<BXP>): Decoder$<BXP>;

export function field<BYN, BYP>(
  field_name: any,
  field_decoder: Decoder$<BYN>,
  next: (x0: BYN) => Decoder$<BYP>
): Decoder$<BYP>;

export function optional_field<BYT, BYV>(
  key: any,
  default$: BYT,
  field_decoder: Decoder$<BYT>,
  next: (x0: BYT) => Decoder$<BYV>
): Decoder$<BYV>;

export function optionally_at<BZA>(
  path: _.List<any>,
  default$: BZA,
  inner: Decoder$<BZA>
): Decoder$<BZA>;
