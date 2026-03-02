import type * as $string_tree from "../../gleam_stdlib/gleam/string_tree.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $ref from "../lustre/internals/ref.d.mts";
import type * as $vattr from "../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../lustre/vdom/vnode.d.mts";

export type Element = $vnode.Element$<any>;

export type Ref = $ref.Ref$;

export function element<SIN>(
  tag: string,
  attributes: _.List<$vattr.Attribute$<SIN>>,
  children: _.List<$vnode.Element$<SIN>>
): $vnode.Element$<SIN>;

export function namespaced<SIT>(
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<SIT>>,
  children: _.List<$vnode.Element$<SIT>>
): $vnode.Element$<SIT>;

export function advanced<SIZ>(
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<SIZ>>,
  children: _.List<$vnode.Element$<SIZ>>,
  self_closing: boolean,
  void$: boolean
): $vnode.Element$<SIZ>;

export function text(content: string): $vnode.Element$<any>;

export function none(): $vnode.Element$<any>;

export function fragment<SJJ>(children: _.List<$vnode.Element$<SJJ>>): $vnode.Element$<
  SJJ
>;

export function unsafe_raw_html<SJN>(
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<SJN>>,
  inner_html: string
): $vnode.Element$<SJN>;

export function memo<SJS>(
  dependencies: _.List<$ref.Ref$>,
  view: () => $vnode.Element$<SJS>
): $vnode.Element$<SJS>;

export function ref(value: any): $ref.Ref$;

export function map<SJW, SJY>(
  element: $vnode.Element$<SJW>,
  f: (x0: SJW) => SJY
): $vnode.Element$<SJY>;

export function to_string(element: $vnode.Element$<any>): string;

export function to_document_string(el: $vnode.Element$<any>): string;

export function to_string_tree(element: $vnode.Element$<any>): $string_tree.StringTree$;

export function to_document_string_tree(el: $vnode.Element$<any>): $string_tree.StringTree$;

export function to_readable_string(el: $vnode.Element$<any>): string;
