import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";

declare class R extends _.CustomType {}

declare class B extends _.CustomType {}

declare class BB extends _.CustomType {}

type Color$ = R | B | BB;

declare class E extends _.CustomType {}

declare class EE extends _.CustomType {}

declare class T<LJX> extends _.CustomType {
  /** @deprecated */
  constructor(c: Color$, l: Node$<any>, k: LJX, r: Node$<any>);
  /** @deprecated */
  c: Color$;
  /** @deprecated */
  l: Node$<any>;
  /** @deprecated */
  k: LJX;
  /** @deprecated */
  r: Node$<any>;
}

type Node$<LJX> = E | EE | T<LJX>;

declare class Set<LJY> extends _.CustomType {
  /** @deprecated */
  constructor(root: Node$<any>, compare: (x0: any, x1: any) => $order.Order$);
  /** @deprecated */
  root: Node$<any>;
  /** @deprecated */
  compare: (x0: any, x1: any) => $order.Order$;
}

export type Set$<LJY> = Set<LJY>;

declare class Min<LJZ> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: LJZ, argument$1: Node$<any>);
  /** @deprecated */
  0: LJZ;
  /** @deprecated */
  1: Node$<any>;
}

declare class None extends _.CustomType {}

type MinDel$<LJZ> = Min<LJZ> | None;

export function new$<LKA>(compare: (x0: LKA, x1: LKA) => $order.Order$): Set$<
  LKA
>;

export function clear<LKC>(tree: Set$<LKC>): Set$<LKC>;

export function insert<LKF>(tree: Set$<LKF>, key: LKF): Set$<LKF>;

export function delete$<LKI>(tree: Set$<LKI>, key: LKI): Set$<LKI>;

export function find<LKL>(tree: Set$<LKL>, key: LKL): _.Result<LKL, undefined>;

export function fold<LKP, LKR>(
  tree: Set$<LKP>,
  acc: LKR,
  fun: (x0: LKR, x1: LKP) => LKR
): LKR;

export function foldr<LKS, LKU>(
  tree: Set$<LKS>,
  acc: LKU,
  fun: (x0: LKU, x1: LKS) => LKU
): LKU;
