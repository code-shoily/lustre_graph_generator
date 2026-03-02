import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Bimap<JOX, JOY> extends _.CustomType {
  /** @deprecated */
  constructor(from_key: $dict.Dict$<any, any>, to_key: $dict.Dict$<any, any>);
  /** @deprecated */
  from_key: $dict.Dict$<any, any>;
  /** @deprecated */
  to_key: $dict.Dict$<any, any>;
}

export type Bimap$<JOY, JOX> = Bimap<JOX, JOY>;

export function new$(): Bimap$<any, any>;

export function to_list<JPI, JPJ>(bimap: Bimap$<JPI, JPJ>): _.List<[JPI, JPJ]>;

export function get_by_key<JPT, JPU>(bimap: Bimap$<JPT, JPU>, key: JPT): _.Result<
  JPU,
  undefined
>;

export function has_key<JPZ>(bimap: Bimap$<JPZ, any>, key: JPZ): boolean;

export function get_by_value<JQD, JQE>(bimap: Bimap$<JQD, JQE>, value: JQE): _.Result<
  JQD,
  undefined
>;

export function has_value<JQK>(bimap: Bimap$<any, JQK>, value: JQK): boolean;

export function delete_by_key<JQN, JQO>(bimap: Bimap$<JQN, JQO>, key: JQN): Bimap$<
  JQN,
  JQO
>;

export function delete_by_value<JQT, JQU>(bimap: Bimap$<JQT, JQU>, value: JQU): Bimap$<
  JQT,
  JQU
>;

export function insert<JPN, JPO>(bimap: Bimap$<JPN, JPO>, key: JPN, value: JPO): Bimap$<
  JPN,
  JPO
>;

export function from_list<JPD, JPE>(members: _.List<[JPD, JPE]>): Bimap$<
  JPD,
  JPE
>;

export function count(bimap: Bimap$<any, any>): number;
