import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../gleam.d.mts";

export class DisjointSet<ANUM> extends _.CustomType {
  /** @deprecated */
  constructor(parents: $dict.Dict$<any, any>, ranks: $dict.Dict$<any, number>);
  /** @deprecated */
  parents: $dict.Dict$<any, any>;
  /** @deprecated */
  ranks: $dict.Dict$<any, number>;
}
export function DisjointSet$DisjointSet<ANUM>(
  parents: $dict.Dict$<any, any>,
  ranks: $dict.Dict$<any, number>,
): DisjointSet$<ANUM>;
export function DisjointSet$isDisjointSet<ANUM>(
  value: DisjointSet$<ANUM>,
): boolean;
export function DisjointSet$DisjointSet$0<ANUM>(value: DisjointSet$<ANUM>): $dict.Dict$<
  any,
  any
>;
export function DisjointSet$DisjointSet$parents<ANUM>(value: DisjointSet$<ANUM>): $dict.Dict$<
  any,
  any
>;
export function DisjointSet$DisjointSet$1<ANUM>(value: DisjointSet$<ANUM>): $dict.Dict$<
  any,
  number
>;
export function DisjointSet$DisjointSet$ranks<ANUM>(value: DisjointSet$<ANUM>): $dict.Dict$<
  any,
  number
>;

export type DisjointSet$<ANUM> = DisjointSet<ANUM>;

export function new$(): DisjointSet$<any>;

export function add<ANUP>(disjoint_set: DisjointSet$<ANUP>, element: ANUP): DisjointSet$<
  ANUP
>;

export function find<ANUS>(disjoint_set: DisjointSet$<ANUS>, element: ANUS): [
  DisjointSet$<ANUS>,
  ANUS
];

export function union<ANUV>(disjoint_set: DisjointSet$<ANUV>, x: ANUV, y: ANUV): DisjointSet$<
  ANUV
>;

export function from_pairs<ANUY>(pairs: _.List<[ANUY, ANUY]>): DisjointSet$<
  ANUY
>;

export function connected<ANVB>(dsu: DisjointSet$<ANVB>, x: ANVB, y: ANVB): [
  DisjointSet$<ANVB>,
  boolean
];

export function size(dsu: DisjointSet$<any>): number;

export function count_sets(dsu: DisjointSet$<any>): number;

export function to_lists<ANVI>(dsu: DisjointSet$<ANVI>): _.List<_.List<ANVI>>;
