import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $pairing_heap from "../gleamy/pairing_heap.d.mts";

export type Queue = $heap.Heap$<any>;

export function new$<LHL>(compare: (x0: LHL, x1: LHL) => $order.Order$): $heap.Heap$<
  LHL
>;

export function pop<LHN>(queue: $heap.Heap$<LHN>): _.Result<
  [LHN, $heap.Heap$<LHN>],
  undefined
>;

export function peek<LHS>(queue: $heap.Heap$<LHS>): _.Result<LHS, undefined>;

export function push<LHW>(queue: $heap.Heap$<LHW>, item: LHW): $heap.Heap$<LHW>;

export function is_empty(queue: $heap.Heap$<any>): boolean;

export function count(queue: $heap.Heap$<any>): number;

export function reorder<LID>(
  queue: $heap.Heap$<LID>,
  compare: (x0: LID, x1: LID) => $order.Order$
): $heap.Heap$<LID>;

export function from_list<LIG>(
  list: _.List<LIG>,
  compare: (x0: LIG, x1: LIG) => $order.Order$
): $heap.Heap$<LIG>;

export function to_list<LIJ>(queue: $heap.Heap$<LIJ>): _.List<LIJ>;
