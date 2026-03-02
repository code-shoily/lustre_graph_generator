import type * as _ from "../../../gleam.d.mts";

export class Ok<HFY, HFX> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: HFX, argument$1: HFY);
  /** @deprecated */
  0: HFX;
  /** @deprecated */
  1: HFY;
}
export function Result2$Ok<HFX, HFY, HFZ>(
  $0: HFX,
  $1: HFY,
): Result2$<HFZ, HFX, HFY>;
export function Result2$isOk<HFZ, HFY, HFX>(
  value: Result2$<HFZ, HFX, HFY>,
): boolean;
export function Result2$Ok$0<HFX, HFY, HFZ>(value: Result2$<HFZ, HFX, HFY>): HFX;
export function Result2$Ok$1<HFX, HFY, HFZ>(
  value: Result2$<HFZ, HFX, HFY>,
): HFY;

export class Error<HFZ> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: HFZ);
  /** @deprecated */
  0: HFZ;
}
export function Result2$Error<HFZ, HFX, HFY>($0: HFZ): Result2$<HFZ, HFX, HFY>;
export function Result2$isError<HFY, HFZ, HFX>(
  value: Result2$<HFZ, HFX, HFY>,
): boolean;
export function Result2$Error$0<HFZ, HFX, HFY>(value: Result2$<HFZ, HFX, HFY>): HFZ;

export type Result2$<HFZ, HFX, HFY> = Ok<HFY, HFX> | Error<HFZ>;
