import type * as $json from "../../../gleam_json/gleam/json.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $mutable_map from "../../lustre/internals/mutable_map.d.mts";
import type * as $cache from "../../lustre/vdom/cache.d.mts";
import type * as $patch from "../../lustre/vdom/patch.d.mts";
import type * as $path from "../../lustre/vdom/path.d.mts";
import type * as $vattr from "../../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

export class Diff<YGT> extends _.CustomType {
  /** @deprecated */
  constructor(patch: $patch.Patch$<any>, cache: $cache.Cache$<any>);
  /** @deprecated */
  patch: $patch.Patch$<any>;
  /** @deprecated */
  cache: $cache.Cache$<any>;
}
export function Diff$Diff<YGT>(
  patch: $patch.Patch$<any>,
  cache: $cache.Cache$<any>,
): Diff$<YGT>;
export function Diff$isDiff<YGT>(value: Diff$<YGT>): boolean;
export function Diff$Diff$0<YGT>(value: Diff$<YGT>): $patch.Patch$<any>;
export function Diff$Diff$patch<YGT>(value: Diff$<YGT>): $patch.Patch$<any>;
export function Diff$Diff$1<YGT>(value: Diff$<YGT>): $cache.Cache$<any>;
export function Diff$Diff$cache<YGT>(value: Diff$<YGT>): $cache.Cache$<any>;

export type Diff$<YGT> = Diff<YGT>;

declare class PartialDiff<YGU> extends _.CustomType {
  /** @deprecated */
  constructor(
    patch: $patch.Patch$<any>,
    cache: $cache.Cache$<any>,
    events: $cache.Events$<any>
  );
  /** @deprecated */
  patch: $patch.Patch$<any>;
  /** @deprecated */
  cache: $cache.Cache$<any>;
  /** @deprecated */
  events: $cache.Events$<any>;
}

type PartialDiff$<YGU> = PartialDiff<YGU>;

declare class AttributeChange<YGV> extends _.CustomType {
  /** @deprecated */
  constructor(
    added: _.List<$vattr.Attribute$<any>>,
    removed: _.List<$vattr.Attribute$<any>>,
    events: $cache.Events$<any>
  );
  /** @deprecated */
  added: _.List<$vattr.Attribute$<any>>;
  /** @deprecated */
  removed: _.List<$vattr.Attribute$<any>>;
  /** @deprecated */
  events: $cache.Events$<any>;
}

type AttributeChange$<YGV> = AttributeChange<YGV>;

export function diff<YGW>(
  cache: $cache.Cache$<YGW>,
  old: $vnode.Element$<YGW>,
  new$: $vnode.Element$<YGW>
): Diff$<YGW>;
