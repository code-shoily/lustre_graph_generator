import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $mutable_map from "../../lustre/internals/mutable_map.d.mts";
import type * as $path from "../../lustre/vdom/path.d.mts";
import type * as $vattr from "../../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

declare class Cache<UDF> extends _.CustomType {
  /** @deprecated */
  constructor(
    events: Events$<any>,
    vdoms: $mutable_map.MutableMap$<
      () => $vnode.Element$<any>,
      $vnode.Element$<any>
    >,
    old_vdoms: $mutable_map.MutableMap$<
      () => $vnode.Element$<any>,
      $vnode.Element$<any>
    >,
    dispatched_paths: _.List<string>,
    next_dispatched_paths: _.List<string>
  );
  /** @deprecated */
  events: Events$<any>;
  /** @deprecated */
  vdoms: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >;
  /** @deprecated */
  old_vdoms: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >;
  /** @deprecated */
  dispatched_paths: _.List<string>;
  /** @deprecated */
  next_dispatched_paths: _.List<string>;
}

export type Cache$<UDF> = Cache<UDF>;

declare class Events<UDG> extends _.CustomType {
  /** @deprecated */
  constructor(
    handlers: $mutable_map.MutableMap$<
      string,
      $decode.Decoder$<$vattr.Handler$<any>>
    >,
    children: $mutable_map.MutableMap$<string, Child$<any>>
  );
  /** @deprecated */
  handlers: $mutable_map.MutableMap$<
    string,
    $decode.Decoder$<$vattr.Handler$<any>>
  >;
  /** @deprecated */
  children: $mutable_map.MutableMap$<string, Child$<any>>;
}

export type Events$<UDG> = Events<UDG>;

declare class Child<UDH> extends _.CustomType {
  /** @deprecated */
  constructor(
    mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$,
    events: Events$<any>
  );
  /** @deprecated */
  mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$;
  /** @deprecated */
  events: Events$<any>;
}

type Child$<UDH> = Child<UDH>;

declare class AddedChildren<UDI> extends _.CustomType {
  /** @deprecated */
  constructor(
    handlers: $mutable_map.MutableMap$<
      string,
      $decode.Decoder$<$vattr.Handler$<any>>
    >,
    children: $mutable_map.MutableMap$<string, Child$<any>>,
    vdoms: $mutable_map.MutableMap$<
      () => $vnode.Element$<any>,
      $vnode.Element$<any>
    >
  );
  /** @deprecated */
  handlers: $mutable_map.MutableMap$<
    string,
    $decode.Decoder$<$vattr.Handler$<any>>
  >;
  /** @deprecated */
  children: $mutable_map.MutableMap$<string, Child$<any>>;
  /** @deprecated */
  vdoms: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >;
}

type AddedChildren$<UDI> = AddedChildren<UDI>;

declare class DecodedEvent<UDJ> extends _.CustomType {
  /** @deprecated */
  constructor(path: string, handler: $vattr.Handler$<any>);
  /** @deprecated */
  path: string;
  /** @deprecated */
  handler: $vattr.Handler$<any>;
}

declare class DispatchedEvent extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}

export type DecodedEvent$<UDJ> = DecodedEvent<UDJ> | DispatchedEvent;

export type Mapper = (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$;

export function compose_mapper(
  mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$,
  child_mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$
): (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$;

export function new_events(): Events$<any>;

export function new$(): Cache$<any>;

export function tick<UDR>(cache: Cache$<UDR>): Cache$<UDR>;

export function events<UDU>(cache: Cache$<UDU>): Events$<UDU>;

export function update_events<UDX>(cache: Cache$<UDX>, events: Events$<UDX>): Cache$<
  UDX
>;

export function memos<UEB>(cache: Cache$<UEB>): $mutable_map.MutableMap$<
  () => $vnode.Element$<UEB>,
  $vnode.Element$<UEB>
>;

export function get_old_memo<UEE>(
  cache: Cache$<UEE>,
  old: () => $vnode.Element$<UEE>,
  new$: () => $vnode.Element$<UEE>
): $vnode.Element$<UEE>;

export function keep_memo<UEJ>(
  cache: Cache$<UEJ>,
  old: () => $vnode.Element$<UEJ>,
  new$: () => $vnode.Element$<UEJ>
): Cache$<UEJ>;

export function add_memo<UEO>(
  cache: Cache$<UEO>,
  new$: () => $vnode.Element$<UEO>,
  node: $vnode.Element$<UEO>
): Cache$<UEO>;

export function get_subtree<UET>(
  events: Events$<UET>,
  path: string,
  old_mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$
): Events$<UET>;

export function update_subtree<UEW>(
  parent: Events$<UEW>,
  path: string,
  mapper: (x0: $dynamic.Dynamic$) => $dynamic.Dynamic$,
  events: Events$<UEW>
): Events$<UEW>;

export function add_event<UFA>(
  events: Events$<UFA>,
  path: $path.Path$,
  name: string,
  handler: $decode.Decoder$<$vattr.Handler$<UFA>>
): Events$<UFA>;

export function remove_event<UFQ>(
  events: Events$<UFQ>,
  path: $path.Path$,
  name: string
): Events$<UFQ>;

export function add_children<UGT>(
  cache: Cache$<UGT>,
  events: Events$<UGT>,
  path: $path.Path$,
  child_index: number,
  nodes: _.List<$vnode.Element$<UGT>>
): [Cache$<UGT>, Events$<UGT>];

export function add_child<UGC>(
  cache: Cache$<UGC>,
  events: Events$<UGC>,
  parent: $path.Path$,
  index: number,
  child: $vnode.Element$<UGC>
): [Cache$<UGC>, Events$<UGC>];

export function from_node<UDO>(root: $vnode.Element$<UDO>): Cache$<UDO>;

export function remove_child<UHM>(
  cache: Cache$<UHM>,
  events: Events$<UHM>,
  parent: $path.Path$,
  child_index: number,
  child: $vnode.Element$<UHM>
): Events$<UHM>;

export function replace_child<UIO>(
  cache: Cache$<UIO>,
  events: Events$<UIO>,
  parent: $path.Path$,
  child_index: number,
  prev: $vnode.Element$<UIO>,
  next: $vnode.Element$<UIO>
): [Cache$<UIO>, Events$<UIO>];

export function dispatch<UJC>(cache: Cache$<UJC>, event: DecodedEvent$<UJC>): [
  Cache$<UJC>,
  _.Result<$vattr.Handler$<UJC>, undefined>
];

export function has_dispatched_events(cache: Cache$<any>, path: $path.Path$): boolean;

export function decode(
  cache: Cache$<any>,
  path: string,
  name: string,
  event: $dynamic.Dynamic$
): DecodedEvent$<any>;

export function handle<UJG>(
  cache: Cache$<UJG>,
  path: string,
  name: string,
  event: $dynamic.Dynamic$
): [Cache$<UJG>, _.Result<$vattr.Handler$<UJG>, undefined>];
