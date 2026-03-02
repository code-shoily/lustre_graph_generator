import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";

declare class Set<CWT> extends _.CustomType {
  /** @deprecated */
  constructor(dict: $dict.Dict$<any, undefined>);
  /** @deprecated */
  dict: $dict.Dict$<any, undefined>;
}

export type Set$<CWT> = Set<CWT>;

export function new$(): Set$<any>;

export function size(set: Set$<any>): number;

export function is_empty(set: Set$<any>): boolean;

export function contains<CXD>(set: Set$<CXD>, member: CXD): boolean;

export function delete$<CXF>(set: Set$<CXF>, member: CXF): Set$<CXF>;

export function to_list<CXI>(set: Set$<CXI>): _.List<CXI>;

export function fold<CXO, CXQ>(
  set: Set$<CXO>,
  initial: CXQ,
  reducer: (x0: CXQ, x1: CXO) => CXQ
): CXQ;

export function filter<CXR>(set: Set$<CXR>, predicate: (x0: CXR) => boolean): Set$<
  CXR
>;

export function drop<CXY>(set: Set$<CXY>, disallowed: _.List<CXY>): Set$<CXY>;

export function take<CYC>(set: Set$<CYC>, desired: _.List<CYC>): Set$<CYC>;

export function intersection<CYP>(first: Set$<CYP>, second: Set$<CYP>): Set$<
  CYP
>;

export function difference<CYT>(first: Set$<CYT>, second: Set$<CYT>): Set$<CYT>;

export function is_subset<CYX>(first: Set$<CYX>, second: Set$<CYX>): boolean;

export function is_disjoint<CZA>(first: Set$<CZA>, second: Set$<CZA>): boolean;

export function each<CZH>(set: Set$<CZH>, fun: (x0: CZH) => any): undefined;

export function insert<CXA>(set: Set$<CXA>, member: CXA): Set$<CXA>;

export function from_list<CXL>(members: _.List<CXL>): Set$<CXL>;

export function map<CXU, CXW>(set: Set$<CXU>, fun: (x0: CXU) => CXW): Set$<CXW>;

export function union<CYG>(first: Set$<CYG>, second: Set$<CYG>): Set$<CYG>;

export function symmetric_difference<CZD>(first: Set$<CZD>, second: Set$<CZD>): Set$<
  CZD
>;
