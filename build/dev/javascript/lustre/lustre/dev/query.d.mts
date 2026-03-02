import type * as _ from "../../gleam.d.mts";
import type * as $path from "../../lustre/vdom/path.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

declare class FindElement extends _.CustomType {
  /** @deprecated */
  constructor(matching: Selector$);
  /** @deprecated */
  matching: Selector$;
}

declare class FindChild extends _.CustomType {
  /** @deprecated */
  constructor(of: Query$, matching: Selector$);
  /** @deprecated */
  of: Query$;
  /** @deprecated */
  matching: Selector$;
}

declare class FindDescendant extends _.CustomType {
  /** @deprecated */
  constructor(of: Query$, matching: Selector$);
  /** @deprecated */
  of: Query$;
  /** @deprecated */
  matching: Selector$;
}

export type Query$ = FindElement | FindChild | FindDescendant;

declare class All extends _.CustomType {
  /** @deprecated */
  constructor(of: _.List<Selector$>);
  /** @deprecated */
  of: _.List<Selector$>;
}

declare class Type extends _.CustomType {
  /** @deprecated */
  constructor(namespace: string, tag: string);
  /** @deprecated */
  namespace: string;
  /** @deprecated */
  tag: string;
}

declare class HasAttribute extends _.CustomType {
  /** @deprecated */
  constructor(name: string, value: string);
  /** @deprecated */
  name: string;
  /** @deprecated */
  value: string;
}

declare class HasClass extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}

declare class HasStyle extends _.CustomType {
  /** @deprecated */
  constructor(name: string, value: string);
  /** @deprecated */
  name: string;
  /** @deprecated */
  value: string;
}

declare class Contains extends _.CustomType {
  /** @deprecated */
  constructor(content: string);
  /** @deprecated */
  content: string;
}

export type Selector$ = All | Type | HasAttribute | HasClass | HasStyle | Contains;

export function element(selector: Selector$): Query$;

export function child(parent: Query$, selector: Selector$): Query$;

export function descendant(parent: Query$, selector: Selector$): Query$;

export function and(first: Selector$, second: Selector$): Selector$;

export function tag(value: string): Selector$;

export function namespaced(namespace: string, tag: string): Selector$;

export function attribute(name: string, value: string): Selector$;

export function class$(name: string): Selector$;

export function style(name: string, value: string): Selector$;

export function id(name: string): Selector$;

export function data(name: string, value: string): Selector$;

export function test_id(value: string): Selector$;

export function aria(name: string, value: string): Selector$;

export function text(content: string): Selector$;

export function matches(element: $vnode.Element$<any>, selector: Selector$): boolean;

export function to_readable_string(query: Query$): string;

export function find_all<VYS>(root: $vnode.Element$<VYS>, query: Query$): _.List<
  $vnode.Element$<VYS>
>;

export function find_path<VXG>(
  root: $vnode.Element$<VXG>,
  query: Query$,
  index: number,
  path: $path.Path$
): _.Result<[$vnode.Element$<VXG>, $path.Path$], undefined>;

export function find<VXB>(root: $vnode.Element$<VXB>, query: Query$): _.Result<
  $vnode.Element$<VXB>,
  undefined
>;

export function has(element: $vnode.Element$<any>, selector: Selector$): boolean;
