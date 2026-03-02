import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Empty extends _.CustomType {}

declare class Tree<LEH> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: LEH, argument$1: _.List<Tree$<any>>);
  /** @deprecated */
  0: LEH;
  /** @deprecated */
  1: _.List<Tree$<any>>;
}

type Tree$<LEH> = Empty | Tree<LEH>;

declare class Heap<LEI> extends _.CustomType {
  /** @deprecated */
  constructor(root: Tree$<any>, compare: (x0: any, x1: any) => $order.Order$);
  /** @deprecated */
  root: Tree$<any>;
  /** @deprecated */
  compare: (x0: any, x1: any) => $order.Order$;
}

export type Heap$<LEI> = Heap<LEI>;

export function new$<LEJ>(compare: (x0: LEJ, x1: LEJ) => $order.Order$): Heap$<
  LEJ
>;

export function find_min<LEO>(heap: Heap$<LEO>): _.Result<LEO, undefined>;

export function insert<LEL>(heap: Heap$<LEL>, key: LEL): Heap$<LEL>;

export function merge<LEX>(heap1: Heap$<LEX>, heap2: Heap$<LEX>): Heap$<LEX>;

export function delete_min<LES>(heap: Heap$<LES>): _.Result<
  [LES, Heap$<LES>],
  undefined
>;
