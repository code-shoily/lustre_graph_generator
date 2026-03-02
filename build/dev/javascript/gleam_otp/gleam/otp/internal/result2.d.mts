import type * as _ from "../../../gleam.d.mts";

export class Ok<HFX, HFY> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: HFX, argument$1: HFY);
  /** @deprecated */
  0: HFX;
  /** @deprecated */
  1: HFY;
}
export function Result2$Ok<HFY, HFX, HFZ>(
  $0: HFX,
  $1: HFY,
): Result2$<HFY, HFX, HFZ>;
export function Result2$isOk<HFX, HFY, HFZ>(
  value: Result2$<HFY, HFX, HFZ>,
): boolean;
export function Result2$Ok$0<HFY, HFX, HFZ>(value: Result2$<HFY, HFX, HFZ>): HFX;
export function Result2$Ok$1<HFZ, HFY, HFX>(
  value: Result2$<HFY, HFX, HFZ>,
): HFY;

export class Error<HFZ> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: HFZ);
  /** @deprecated */
  0: HFZ;
}
export function Result2$Error<HFX, HFZ, HFY>($0: HFZ): Result2$<HFY, HFX, HFZ>;
export function Result2$isError<HFZ, HFY, HFX>(
  value: Result2$<HFY, HFX, HFZ>,
): boolean;
export function Result2$Error$0<HFZ, HFX, HFY>(value: Result2$<HFY, HFX, HFZ>): HFZ;

export type Result2$<HFY, HFX, HFZ> = Ok<HFY, HFX> | Error<HFZ>;
