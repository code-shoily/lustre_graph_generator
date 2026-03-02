import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $red_black_tree_set from "../gleamy/red_black_tree_set.d.mts";

export type Set = $tree.Set$<any>;

export function new$<LVW>(compare: (x0: LVW, x1: LVW) => $order.Order$): $tree.Set$<
  LVW
>;

export function insert<LVY>(set: $tree.Set$<LVY>, member: LVY): $tree.Set$<LVY>;

export function contains<LWB>(set: $tree.Set$<LWB>, member: LWB): boolean;

export function delete$<LWD>(set: $tree.Set$<LWD>, member: LWD): $tree.Set$<LWD>;

export function filter<LWG>(
  set: $tree.Set$<LWG>,
  property: (x0: LWG) => boolean
): $tree.Set$<LWG>;

export function fold<LWJ, LWL>(
  set: $tree.Set$<LWJ>,
  initial: LWL,
  reducer: (x0: LWL, x1: LWJ) => LWL
): LWL;

export function intersection<LWM>(
  first: $tree.Set$<LWM>,
  second: $tree.Set$<LWM>
): $tree.Set$<LWM>;

export function union<LWQ>(first: $tree.Set$<LWQ>, second: $tree.Set$<LWQ>): $tree.Set$<
  LWQ
>;

export function difference<LWU>(set: $tree.Set$<LWU>, removal: $tree.Set$<LWU>): $tree.Set$<
  LWU
>;

export function count(set: $tree.Set$<any>): number;

export function from_list<LXA>(
  members: _.List<LXA>,
  compare: (x0: LXA, x1: LXA) => $order.Order$
): $tree.Set$<LXA>;

export function to_list<LXD>(set: $tree.Set$<LXD>): _.List<LXD>;
