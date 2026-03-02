import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Empty extends _.CustomType {}

declare class Tree<JUU> extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: number,
    argument$1: JUU,
    argument$2: Tree$<any>,
    argument$3: Tree$<any>
  );
  /** @deprecated */
  0: number;
  /** @deprecated */
  1: JUU;
  /** @deprecated */
  2: Tree$<any>;
  /** @deprecated */
  3: Tree$<any>;
}

type Tree$<JUU> = Empty | Tree<JUU>;

declare class Heap<JUV> extends _.CustomType {
  /** @deprecated */
  constructor(root: Tree$<any>, compare: (x0: any, x1: any) => $order.Order$);
  /** @deprecated */
  root: Tree$<any>;
  /** @deprecated */
  compare: (x0: any, x1: any) => $order.Order$;
}

export type Heap$<JUV> = Heap<JUV>;

export function new$<JUW>(compare: (x0: JUW, x1: JUW) => $order.Order$): Heap$<
  JUW
>;

export function find_min<JVB>(heap: Heap$<JVB>): _.Result<JVB, undefined>;

export function insert<JUY>(heap: Heap$<JUY>, item: JUY): Heap$<JUY>;

export function delete_min<JVF>(heap: Heap$<JVF>): _.Result<
  [JVF, Heap$<JVF>],
  undefined
>;

export function merge<JVK>(heap1: Heap$<JVK>, heap2: Heap$<JVK>): Heap$<JVK>;
