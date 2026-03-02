import type * as _ from "../gleam.d.mts";

export class End<LBF> extends _.CustomType {
  /** @deprecated */
  constructor(first: LBF);
  /** @deprecated */
  first: LBF;
}
export function NonEmptyList$End<LBF>(first: LBF): NonEmptyList$<LBF>;
export function NonEmptyList$isEnd<LBF>(value: NonEmptyList$<LBF>): boolean;
export function NonEmptyList$End$0<LBF>(value: NonEmptyList$<LBF>): LBF;
export function NonEmptyList$End$first<LBF>(value: NonEmptyList$<LBF>): LBF;

export class Next<LBF> extends _.CustomType {
  /** @deprecated */
  constructor(first: LBF, rest: NonEmptyList$<any>);
  /** @deprecated */
  first: LBF;
  /** @deprecated */
  rest: NonEmptyList$<any>;
}
export function NonEmptyList$Next<LBF>(
  first: LBF,
  rest: NonEmptyList$<any>,
): NonEmptyList$<LBF>;
export function NonEmptyList$isNext<LBF>(value: NonEmptyList$<LBF>): boolean;
export function NonEmptyList$Next$0<LBF>(value: NonEmptyList$<LBF>): LBF;
export function NonEmptyList$Next$first<LBF>(value: NonEmptyList$<LBF>): LBF;
export function NonEmptyList$Next$1<LBF>(value: NonEmptyList$<LBF>): NonEmptyList$<
  any
>;
export function NonEmptyList$Next$rest<LBF>(value: NonEmptyList$<LBF>): NonEmptyList$<
  any
>;

export type NonEmptyList$<LBF> = End<LBF> | Next<LBF>;

export function NonEmptyList$first<LBF>(value: NonEmptyList$<LBF>): LBF;

export function fold<LBG, LBI>(
  list: NonEmptyList$<LBG>,
  initial: LBI,
  fun: (x0: LBI, x1: LBG) => LBI
): LBI;

export function count(list: NonEmptyList$<any>): number;

export function filter<LBP>(
  list: NonEmptyList$<LBP>,
  predicate: (x0: LBP) => boolean
): _.List<LBP>;

export function to_list<LBS>(list: NonEmptyList$<LBS>): _.List<LBS>;

export function from_list<LBV>(list: _.List<LBV>): _.Result<
  NonEmptyList$<LBV>,
  undefined
>;

export function reverse<LCA>(list: NonEmptyList$<LCA>): NonEmptyList$<LCA>;

export function map<LBL, LBN>(
  list: NonEmptyList$<LBL>,
  transform: (x0: LBL) => LBN
): NonEmptyList$<LBN>;
