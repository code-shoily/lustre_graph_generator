import type * as $json from "../../../gleam_json/gleam/json.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $string_tree from "../../../gleam_stdlib/gleam/string_tree.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $mutable_map from "../../lustre/internals/mutable_map.d.mts";
import type * as $ref from "../../lustre/internals/ref.d.mts";
import type * as $vattr from "../../lustre/vdom/vattr.d.mts";

export class Fragment<RXZ> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    key: string,
    children: _.List<Element$<any>>,
    keyed_children: $mutable_map.MutableMap$<string, Element$<any>>
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  children: _.List<Element$<any>>;
  /** @deprecated */
  keyed_children: $mutable_map.MutableMap$<string, Element$<any>>;
}
export function Element$Fragment<RXZ>(
  kind: number,
  key: string,
  children: _.List<Element$<any>>,
  keyed_children: $mutable_map.MutableMap$<string, Element$<any>>,
): Element$<RXZ>;
export function Element$isFragment<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Fragment$0<RXZ>(value: Element$<RXZ>): number;
export function Element$Fragment$kind<RXZ>(value: Element$<RXZ>): number;
export function Element$Fragment$1<RXZ>(value: Element$<RXZ>): string;
export function Element$Fragment$key<RXZ>(value: Element$<RXZ>): string;
export function Element$Fragment$2<RXZ>(value: Element$<RXZ>): _.List<
  Element$<any>
>;
export function Element$Fragment$children<RXZ>(value: Element$<RXZ>): _.List<
  Element$<any>
>;
export function Element$Fragment$3<RXZ>(value: Element$<RXZ>): $mutable_map.MutableMap$<
  string,
  Element$<any>
>;
export function Element$Fragment$keyed_children<RXZ>(value: Element$<RXZ>): $mutable_map.MutableMap$<
  string,
  Element$<any>
>;

export class Element<RXZ> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    key: string,
    namespace: string,
    tag: string,
    attributes: _.List<$vattr.Attribute$<any>>,
    children: _.List<Element$<any>>,
    keyed_children: $mutable_map.MutableMap$<string, Element$<any>>,
    self_closing: boolean,
    void$: boolean
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  namespace: string;
  /** @deprecated */
  tag: string;
  /** @deprecated */
  attributes: _.List<$vattr.Attribute$<any>>;
  /** @deprecated */
  children: _.List<Element$<any>>;
  /** @deprecated */
  keyed_children: $mutable_map.MutableMap$<string, Element$<any>>;
  /** @deprecated */
  self_closing: boolean;
  /** @deprecated */
  void$: boolean;
}
export function Element$Element<RXZ>(
  kind: number,
  key: string,
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<any>>,
  children: _.List<Element$<any>>,
  keyed_children: $mutable_map.MutableMap$<string, Element$<any>>,
  self_closing: boolean,
  void$: boolean,
): Element$<RXZ>;
export function Element$isElement<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Element$0<RXZ>(value: Element$<RXZ>): number;
export function Element$Element$kind<RXZ>(value: Element$<RXZ>): number;
export function Element$Element$1<RXZ>(value: Element$<RXZ>): string;
export function Element$Element$key<RXZ>(value: Element$<RXZ>): string;
export function Element$Element$2<RXZ>(value: Element$<RXZ>): string;
export function Element$Element$namespace<RXZ>(value: Element$<RXZ>): string;
export function Element$Element$3<RXZ>(value: Element$<RXZ>): string;
export function Element$Element$tag<RXZ>(value: Element$<RXZ>): string;
export function Element$Element$4<RXZ>(value: Element$<RXZ>): _.List<
  $vattr.Attribute$<any>
>;
export function Element$Element$attributes<RXZ>(value: Element$<RXZ>): _.List<
  $vattr.Attribute$<any>
>;
export function Element$Element$5<RXZ>(value: Element$<RXZ>): _.List<
  Element$<any>
>;
export function Element$Element$children<RXZ>(value: Element$<RXZ>): _.List<
  Element$<any>
>;
export function Element$Element$6<RXZ>(value: Element$<RXZ>): $mutable_map.MutableMap$<
  string,
  Element$<any>
>;
export function Element$Element$keyed_children<RXZ>(value: Element$<RXZ>): $mutable_map.MutableMap$<
  string,
  Element$<any>
>;
export function Element$Element$7<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Element$self_closing<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Element$8<RXZ>(
  value: Element$<RXZ>,
): boolean;
export function Element$Element$void<RXZ>(value: Element$<RXZ>): boolean;

export class Text extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, key: string, content: string);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  content: string;
}
export function Element$Text<RXZ>(
  kind: number,
  key: string,
  content: string,
): Element$<RXZ>;
export function Element$isText<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Text$0<RXZ>(value: Element$<RXZ>): number;
export function Element$Text$kind<RXZ>(value: Element$<RXZ>): number;
export function Element$Text$1<RXZ>(value: Element$<RXZ>): string;
export function Element$Text$key<RXZ>(value: Element$<RXZ>): string;
export function Element$Text$2<RXZ>(value: Element$<RXZ>): string;
export function Element$Text$content<RXZ>(value: Element$<RXZ>): string;

export class UnsafeInnerHtml<RXZ> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    key: string,
    namespace: string,
    tag: string,
    attributes: _.List<$vattr.Attribute$<any>>,
    inner_html: string
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  namespace: string;
  /** @deprecated */
  tag: string;
  /** @deprecated */
  attributes: _.List<$vattr.Attribute$<any>>;
  /** @deprecated */
  inner_html: string;
}
export function Element$UnsafeInnerHtml<RXZ>(
  kind: number,
  key: string,
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<any>>,
  inner_html: string,
): Element$<RXZ>;
export function Element$isUnsafeInnerHtml<RXZ>(value: Element$<RXZ>): boolean;
export function Element$UnsafeInnerHtml$0<RXZ>(value: Element$<RXZ>): number;
export function Element$UnsafeInnerHtml$kind<RXZ>(value: Element$<RXZ>): number;
export function Element$UnsafeInnerHtml$1<RXZ>(value: Element$<RXZ>): string;
export function Element$UnsafeInnerHtml$key<RXZ>(value: Element$<RXZ>): string;
export function Element$UnsafeInnerHtml$2<RXZ>(value: Element$<RXZ>): string;
export function Element$UnsafeInnerHtml$namespace<RXZ>(value: Element$<RXZ>): string;
export function Element$UnsafeInnerHtml$3<RXZ>(
  value: Element$<RXZ>,
): string;
export function Element$UnsafeInnerHtml$tag<RXZ>(value: Element$<RXZ>): string;
export function Element$UnsafeInnerHtml$4<RXZ>(value: Element$<RXZ>): _.List<
  $vattr.Attribute$<any>
>;
export function Element$UnsafeInnerHtml$attributes<RXZ>(value: Element$<RXZ>): _.List<
  $vattr.Attribute$<any>
>;
export function Element$UnsafeInnerHtml$5<RXZ>(value: Element$<RXZ>): string;
export function Element$UnsafeInnerHtml$inner_html<RXZ>(value: Element$<RXZ>): string;

export class Map<RXZ> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    key: string,
    mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$,
    child: Element$<any>
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$;
  /** @deprecated */
  child: Element$<any>;
}
export function Element$Map<RXZ>(
  kind: number,
  key: string,
  mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$,
  child: Element$<any>,
): Element$<RXZ>;
export function Element$isMap<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Map$0<RXZ>(value: Element$<RXZ>): number;
export function Element$Map$kind<RXZ>(value: Element$<RXZ>): number;
export function Element$Map$1<RXZ>(value: Element$<RXZ>): string;
export function Element$Map$key<RXZ>(value: Element$<RXZ>): string;
export function Element$Map$2<RXZ>(value: Element$<RXZ>): (
  x0: $dynamic.Dynamic$
) => $dynamic.Dynamic$;
export function Element$Map$mapper<RXZ>(value: Element$<RXZ>): (
  x0: $dynamic.Dynamic$
) => $dynamic.Dynamic$;
export function Element$Map$3<RXZ>(value: Element$<RXZ>): Element$<any>;
export function Element$Map$child<RXZ>(value: Element$<RXZ>): Element$<any>;

export class Memo<RXZ> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    key: string,
    dependencies: _.List<$ref.Ref$>,
    view: () => Element$<any>
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  dependencies: _.List<$ref.Ref$>;
  /** @deprecated */
  view: () => Element$<any>;
}
export function Element$Memo<RXZ>(
  kind: number,
  key: string,
  dependencies: _.List<$ref.Ref$>,
  view: () => Element$<any>,
): Element$<RXZ>;
export function Element$isMemo<RXZ>(value: Element$<RXZ>): boolean;
export function Element$Memo$0<RXZ>(value: Element$<RXZ>): number;
export function Element$Memo$kind<RXZ>(value: Element$<RXZ>): number;
export function Element$Memo$1<RXZ>(value: Element$<RXZ>): string;
export function Element$Memo$key<RXZ>(value: Element$<RXZ>): string;
export function Element$Memo$2<RXZ>(value: Element$<RXZ>): _.List<$ref.Ref$>;
export function Element$Memo$dependencies<RXZ>(value: Element$<RXZ>): _.List<
  $ref.Ref$
>;
export function Element$Memo$3<RXZ>(value: Element$<RXZ>): () => Element$<any>;
export function Element$Memo$view<RXZ>(value: Element$<RXZ>): () => Element$<
  any
>;

export type Element$<RXZ> = Fragment<RXZ> | Element<RXZ> | Text | UnsafeInnerHtml<
  RXZ
> | Map<RXZ> | Memo<RXZ>;

export function Element$key<RXZ>(value: Element$<RXZ>): string;
export function Element$kind<RXZ>(value: Element$<RXZ>): number;

export type Memos = $mutable_map.MutableMap$<() => Element$<any>, Element$<any>>;

export type View = () => Element$<any>;

export const fragment_kind: number;

export const element_kind: number;

export const text_kind: number;

export const unsafe_inner_html_kind: number;

export const map_kind: number;

export const memo_kind: number;

export function is_void_html_element(tag: string, namespace: string): boolean;

export function to_keyed<RZN>(key: string, node: Element$<RZN>): Element$<RZN>;

export function fragment<RYH>(
  key: string,
  children: _.List<Element$<RYH>>,
  keyed_children: $mutable_map.MutableMap$<string, Element$<RYH>>
): Element$<RYH>;

export function element<RYO>(
  key: string,
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<RYO>>,
  children: _.List<Element$<RYO>>,
  keyed_children: $mutable_map.MutableMap$<string, Element$<RYO>>,
  self_closing: boolean,
  void$: boolean
): Element$<RYO>;

export function text(key: string, content: string): Element$<any>;

export function unsafe_inner_html<RYZ>(
  key: string,
  namespace: string,
  tag: string,
  attributes: _.List<$vattr.Attribute$<RYZ>>,
  inner_html: string
): Element$<RYZ>;

export function map<RZD, RZF>(element: Element$<RZD>, mapper: (x0: RZD) => RZF): Element$<
  RZF
>;

export function memo<RZI>(
  key: string,
  dependencies: _.List<$ref.Ref$>,
  view: () => Element$<RZI>
): Element$<RZI>;

export function to_snapshot(node: Element$<any>, debug: boolean): string;

export function to_string_tree(node: Element$<any>, parent_namespace: string): $string_tree.StringTree$;

export function to_string(node: Element$<any>): string;

export function to_json<RZQ>(
  node: Element$<RZQ>,
  memos: $mutable_map.MutableMap$<() => Element$<RZQ>, Element$<RZQ>>
): $json.Json$;
