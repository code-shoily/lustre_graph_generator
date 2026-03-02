import type * as $order from "../../gleam_stdlib/gleam/order.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $red_black_tree_map from "../gleamy/red_black_tree_map.d.mts";

export type Map = $tree.Map$<any, any>;

export function new$<KVZ>(compare: (x0: KVZ, x1: KVZ) => $order.Order$): $tree.Map$<
  KVZ,
  any
>;

export function insert<KWD, KWE>(
  map: $tree.Map$<KWD, KWE>,
  key: KWD,
  value: KWE
): $tree.Map$<KWD, KWE>;

export function get<KWJ, KWK>(map: $tree.Map$<KWJ, KWK>, key: KWJ): _.Result<
  KWK,
  undefined
>;

export function has_key<KWP>(map: $tree.Map$<KWP, any>, key: KWP): boolean;

export function delete$<KWT, KWU>(map: $tree.Map$<KWT, KWU>, key: KWT): $tree.Map$<
  KWT,
  KWU
>;

export function count(map: $tree.Map$<any, any>): number;

export function fold<KXD, KXE, KXH>(
  map: $tree.Map$<KXD, KXE>,
  initial: KXH,
  reducer: (x0: KXH, x1: KXD, x2: KXE) => KXH
): KXH;

export function filter<KXI, KXJ>(
  map: $tree.Map$<KXI, KXJ>,
  property: (x0: KXI, x1: KXJ) => boolean
): $tree.Map$<KXI, KXJ>;

export function merge<KXO, KXP>(
  dict: $tree.Map$<KXO, KXP>,
  new_entries: $tree.Map$<KXO, KXP>
): $tree.Map$<KXO, KXP>;

export function take<KXW, KXX>(map: $tree.Map$<KXW, KXX>, desired: _.List<KXW>): $tree.Map$<
  KXW,
  KXX
>;

export function from_list<KYD, KYE>(
  members: _.List<[KYD, KYE]>,
  compare: (x0: KYD, x1: KYD) => $order.Order$
): $tree.Map$<KYD, KYE>;

export function to_list<KYI, KYJ>(map: $tree.Map$<KYI, KYJ>): _.List<[KYI, KYJ]>;
