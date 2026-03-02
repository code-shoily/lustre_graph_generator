import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";

declare class R extends _.CustomType {}

declare class B extends _.CustomType {}

declare class BB extends _.CustomType {}

type Color$ = R | B | BB;

declare class E extends _.CustomType {}

declare class EE extends _.CustomType {}

declare class T<JYA, JYB> extends _.CustomType {
  /** @deprecated */
  constructor(c: Color$, l: Node$<any, any>, k: [any, any], r: Node$<any, any>);
  /** @deprecated */
  c: Color$;
  /** @deprecated */
  l: Node$<any, any>;
  /** @deprecated */
  k: [any, any];
  /** @deprecated */
  r: Node$<any, any>;
}

type Node$<JYB, JYA> = E | EE | T<JYA, JYB>;

declare class Map<JYD, JYC> extends _.CustomType {
  /** @deprecated */
  constructor(
    root: Node$<any, any>,
    compare: (x0: any, x1: any) => $order.Order$
  );
  /** @deprecated */
  root: Node$<any, any>;
  /** @deprecated */
  compare: (x0: any, x1: any) => $order.Order$;
}

export type Map$<JYD, JYC> = Map<JYD, JYC>;

declare class Min<JYF, JYE> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: [any, any], argument$1: Node$<any, any>);
  /** @deprecated */
  0: [any, any];
  /** @deprecated */
  1: Node$<any, any>;
}

declare class None extends _.CustomType {}

type MinDel$<JYE, JYF> = Min<JYE, JYF> | None;

export function new$<JYG>(compare: (x0: JYG, x1: JYG) => $order.Order$): Map$<
  JYG,
  any
>;

export function clear<JYK, JYL>(tree: Map$<JYK, JYL>): Map$<JYK, JYL>;

export function insert<JYQ, JYR>(tree: Map$<JYQ, JYR>, key: JYQ, value: JYR): Map$<
  JYQ,
  JYR
>;

export function delete$<JYW, JYX>(tree: Map$<JYW, JYX>, key: JYW): Map$<
  JYW,
  JYX
>;

export function find<JZC, JZD>(tree: Map$<JZC, JZD>, key: JZC): _.Result<
  JZD,
  undefined
>;

export function larger<JZI, JZJ>(tree: Map$<JZI, JZJ>, key: JZI): _.Result<
  [JZI, JZJ],
  undefined
>;

export function smaller<JZO, JZP>(tree: Map$<JZO, JZP>, key: JZO): _.Result<
  [JZO, JZP],
  undefined
>;

export function fold<JZU, JZV, JZY>(
  tree: Map$<JZU, JZV>,
  acc: JZY,
  fun: (x0: JZY, x1: JZU, x2: JZV) => JZY
): JZY;

export function foldr<JZZ, KAA, KAD>(
  tree: Map$<JZZ, KAA>,
  acc: KAD,
  fun: (x0: KAD, x1: JZZ, x2: KAA) => KAD
): KAD;
