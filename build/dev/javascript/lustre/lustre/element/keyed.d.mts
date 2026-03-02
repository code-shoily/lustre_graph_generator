import type * as _ from "../../gleam.d.mts";
import type * as $mutable_map from "../../lustre/internals/mutable_map.d.mts";
import type * as $vattr from "../../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

export function element<WUO>(
  tag: string,
  attributes: _.List<$vattr.Attribute$<WUO>>,
  children: _.List<[string, $vnode.Element$<WUO>]>
): $vnode.Element$<WUO>;

export function namespaced<WUU>(
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<WUU>>,
  children: _.List<[string, $vnode.Element$<WUU>]>
): $vnode.Element$<WUU>;

export function fragment<WVA>(children: _.List<[string, $vnode.Element$<WVA>]>): $vnode.Element$<
  WVA
>;

export function ul<WVE>(
  attributes: _.List<$vattr.Attribute$<WVE>>,
  children: _.List<[string, $vnode.Element$<WVE>]>
): $vnode.Element$<WVE>;

export function ol<WVK>(
  attributes: _.List<$vattr.Attribute$<WVK>>,
  children: _.List<[string, $vnode.Element$<WVK>]>
): $vnode.Element$<WVK>;

export function div<WVQ>(
  attributes: _.List<$vattr.Attribute$<WVQ>>,
  children: _.List<[string, $vnode.Element$<WVQ>]>
): $vnode.Element$<WVQ>;

export function tbody<WVW>(
  attributes: _.List<$vattr.Attribute$<WVW>>,
  children: _.List<[string, $vnode.Element$<WVW>]>
): $vnode.Element$<WVW>;

export function dl<WWC>(
  attributes: _.List<$vattr.Attribute$<WWC>>,
  children: _.List<[string, $vnode.Element$<WWC>]>
): $vnode.Element$<WWC>;
