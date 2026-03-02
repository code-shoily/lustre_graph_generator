import type * as $json from "../../../gleam_json/gleam/json.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $mutable_map from "../../lustre/internals/mutable_map.d.mts";
import type * as $patch from "../../lustre/vdom/patch.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

export class Mount<TXK> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    open_shadow_root: boolean,
    will_adopt_styles: boolean,
    observed_attributes: _.List<string>,
    observed_properties: _.List<string>,
    requested_contexts: _.List<string>,
    provided_contexts: $dict.Dict$<string, $json.Json$>,
    vdom: $vnode.Element$<any>,
    memos: $mutable_map.MutableMap$<
      () => $vnode.Element$<any>,
      $vnode.Element$<any>
    >
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  open_shadow_root: boolean;
  /** @deprecated */
  will_adopt_styles: boolean;
  /** @deprecated */
  observed_attributes: _.List<string>;
  /** @deprecated */
  observed_properties: _.List<string>;
  /** @deprecated */
  requested_contexts: _.List<string>;
  /** @deprecated */
  provided_contexts: $dict.Dict$<string, $json.Json$>;
  /** @deprecated */
  vdom: $vnode.Element$<any>;
  /** @deprecated */
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >;
}
export function ClientMessage$Mount<TXK>(
  kind: number,
  open_shadow_root: boolean,
  will_adopt_styles: boolean,
  observed_attributes: _.List<string>,
  observed_properties: _.List<string>,
  requested_contexts: _.List<string>,
  provided_contexts: $dict.Dict$<string, $json.Json$>,
  vdom: $vnode.Element$<any>,
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >,
): ClientMessage$<TXK>;
export function ClientMessage$isMount<TXK>(value: ClientMessage$<TXK>): boolean;
export function ClientMessage$Mount$0<TXK>(value: ClientMessage$<TXK>): number;
export function ClientMessage$Mount$kind<TXK>(value: ClientMessage$<TXK>): number;
export function ClientMessage$Mount$1<TXK>(
  value: ClientMessage$<TXK>,
): boolean;
export function ClientMessage$Mount$open_shadow_root<TXK>(value: ClientMessage$<
    TXK
  >): boolean;
export function ClientMessage$Mount$2<TXK>(value: ClientMessage$<TXK>): boolean;
export function ClientMessage$Mount$will_adopt_styles<TXK>(value: ClientMessage$<
    TXK
  >): boolean;
export function ClientMessage$Mount$3<TXK>(value: ClientMessage$<TXK>): _.List<
  string
>;
export function ClientMessage$Mount$observed_attributes<TXK>(value: ClientMessage$<
    TXK
  >): _.List<string>;
export function ClientMessage$Mount$4<TXK>(value: ClientMessage$<TXK>): _.List<
  string
>;
export function ClientMessage$Mount$observed_properties<TXK>(value: ClientMessage$<
    TXK
  >): _.List<string>;
export function ClientMessage$Mount$5<TXK>(value: ClientMessage$<TXK>): _.List<
  string
>;
export function ClientMessage$Mount$requested_contexts<TXK>(value: ClientMessage$<
    TXK
  >): _.List<string>;
export function ClientMessage$Mount$6<TXK>(value: ClientMessage$<TXK>): $dict.Dict$<
  string,
  $json.Json$
>;
export function ClientMessage$Mount$provided_contexts<TXK>(value: ClientMessage$<
    TXK
  >): $dict.Dict$<string, $json.Json$>;
export function ClientMessage$Mount$7<TXK>(value: ClientMessage$<TXK>): $vnode.Element$<
  any
>;
export function ClientMessage$Mount$vdom<TXK>(value: ClientMessage$<TXK>): $vnode.Element$<
  any
>;
export function ClientMessage$Mount$8<TXK>(value: ClientMessage$<TXK>): $mutable_map.MutableMap$<
  () => $vnode.Element$<any>,
  $vnode.Element$<any>
>;
export function ClientMessage$Mount$memos<TXK>(value: ClientMessage$<TXK>): $mutable_map.MutableMap$<
  () => $vnode.Element$<any>,
  $vnode.Element$<any>
>;

export class Reconcile<TXK> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    patch: $patch.Patch$<any>,
    memos: $mutable_map.MutableMap$<
      () => $vnode.Element$<any>,
      $vnode.Element$<any>
    >
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  patch: $patch.Patch$<any>;
  /** @deprecated */
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >;
}
export function ClientMessage$Reconcile<TXK>(
  kind: number,
  patch: $patch.Patch$<any>,
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<any>,
    $vnode.Element$<any>
  >,
): ClientMessage$<TXK>;
export function ClientMessage$isReconcile<TXK>(
  value: ClientMessage$<TXK>,
): boolean;
export function ClientMessage$Reconcile$0<TXK>(value: ClientMessage$<TXK>): number;
export function ClientMessage$Reconcile$kind<TXK>(
  value: ClientMessage$<TXK>,
): number;
export function ClientMessage$Reconcile$1<TXK>(value: ClientMessage$<TXK>): $patch.Patch$<
  any
>;
export function ClientMessage$Reconcile$patch<TXK>(value: ClientMessage$<TXK>): $patch.Patch$<
  any
>;
export function ClientMessage$Reconcile$2<TXK>(value: ClientMessage$<TXK>): $mutable_map.MutableMap$<
  () => $vnode.Element$<any>,
  $vnode.Element$<any>
>;
export function ClientMessage$Reconcile$memos<TXK>(value: ClientMessage$<TXK>): $mutable_map.MutableMap$<
  () => $vnode.Element$<any>,
  $vnode.Element$<any>
>;

export class Emit extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, name: string, data: $json.Json$);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  name: string;
  /** @deprecated */
  data: $json.Json$;
}
export function ClientMessage$Emit<TXK>(
  kind: number,
  name: string,
  data: $json.Json$,
): ClientMessage$<TXK>;
export function ClientMessage$isEmit<TXK>(value: ClientMessage$<TXK>): boolean;
export function ClientMessage$Emit$0<TXK>(value: ClientMessage$<TXK>): number;
export function ClientMessage$Emit$kind<TXK>(value: ClientMessage$<TXK>): number;
export function ClientMessage$Emit$1<TXK>(
  value: ClientMessage$<TXK>,
): string;
export function ClientMessage$Emit$name<TXK>(value: ClientMessage$<TXK>): string;
export function ClientMessage$Emit$2<TXK>(
  value: ClientMessage$<TXK>,
): $json.Json$;
export function ClientMessage$Emit$data<TXK>(value: ClientMessage$<TXK>): $json.Json$;

export class Provide extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, key: string, value: $json.Json$);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  value: $json.Json$;
}
export function ClientMessage$Provide<TXK>(
  kind: number,
  key: string,
  value: $json.Json$,
): ClientMessage$<TXK>;
export function ClientMessage$isProvide<TXK>(
  value: ClientMessage$<TXK>,
): boolean;
export function ClientMessage$Provide$0<TXK>(value: ClientMessage$<TXK>): number;
export function ClientMessage$Provide$kind<TXK>(
  value: ClientMessage$<TXK>,
): number;
export function ClientMessage$Provide$1<TXK>(value: ClientMessage$<TXK>): string;
export function ClientMessage$Provide$key<TXK>(
  value: ClientMessage$<TXK>,
): string;
export function ClientMessage$Provide$2<TXK>(value: ClientMessage$<TXK>): $json.Json$;
export function ClientMessage$Provide$value<TXK>(
  value: ClientMessage$<TXK>,
): $json.Json$;

export type ClientMessage$<TXK> = Mount<TXK> | Reconcile<TXK> | Emit | Provide;

export function ClientMessage$kind<TXK>(value: ClientMessage$<TXK>): number;

export class Batch extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, messages: _.List<ServerMessage$>);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  messages: _.List<ServerMessage$>;
}
export function ServerMessage$Batch(
  kind: number,
  messages: _.List<ServerMessage$>,
): ServerMessage$;
export function ServerMessage$isBatch(value: ServerMessage$): boolean;
export function ServerMessage$Batch$0(value: ServerMessage$): number;
export function ServerMessage$Batch$kind(value: ServerMessage$): number;
export function ServerMessage$Batch$1(value: ServerMessage$): _.List<
  ServerMessage$
>;
export function ServerMessage$Batch$messages(value: ServerMessage$): _.List<
  ServerMessage$
>;

export class AttributeChanged extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, name: string, value: string);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  name: string;
  /** @deprecated */
  value: string;
}
export function ServerMessage$AttributeChanged(
  kind: number,
  name: string,
  value: string,
): ServerMessage$;
export function ServerMessage$isAttributeChanged(
  value: ServerMessage$,
): boolean;
export function ServerMessage$AttributeChanged$0(value: ServerMessage$): number;
export function ServerMessage$AttributeChanged$kind(value: ServerMessage$): number;
export function ServerMessage$AttributeChanged$1(
  value: ServerMessage$,
): string;
export function ServerMessage$AttributeChanged$name(value: ServerMessage$): string;
export function ServerMessage$AttributeChanged$2(
  value: ServerMessage$,
): string;
export function ServerMessage$AttributeChanged$value(value: ServerMessage$): string;

export class PropertyChanged extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, name: string, value: $dynamic.Dynamic$);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  name: string;
  /** @deprecated */
  value: $dynamic.Dynamic$;
}
export function ServerMessage$PropertyChanged(
  kind: number,
  name: string,
  value: $dynamic.Dynamic$,
): ServerMessage$;
export function ServerMessage$isPropertyChanged(value: ServerMessage$): boolean;
export function ServerMessage$PropertyChanged$0(value: ServerMessage$): number;
export function ServerMessage$PropertyChanged$kind(value: ServerMessage$): number;
export function ServerMessage$PropertyChanged$1(
  value: ServerMessage$,
): string;
export function ServerMessage$PropertyChanged$name(value: ServerMessage$): string;
export function ServerMessage$PropertyChanged$2(
  value: ServerMessage$,
): $dynamic.Dynamic$;
export function ServerMessage$PropertyChanged$value(value: ServerMessage$): $dynamic.Dynamic$;

export class EventFired extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    path: string,
    name: string,
    event: $dynamic.Dynamic$
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  path: string;
  /** @deprecated */
  name: string;
  /** @deprecated */
  event: $dynamic.Dynamic$;
}
export function ServerMessage$EventFired(
  kind: number,
  path: string,
  name: string,
  event: $dynamic.Dynamic$,
): ServerMessage$;
export function ServerMessage$isEventFired(value: ServerMessage$): boolean;
export function ServerMessage$EventFired$0(value: ServerMessage$): number;
export function ServerMessage$EventFired$kind(value: ServerMessage$): number;
export function ServerMessage$EventFired$1(value: ServerMessage$): string;
export function ServerMessage$EventFired$path(value: ServerMessage$): string;
export function ServerMessage$EventFired$2(value: ServerMessage$): string;
export function ServerMessage$EventFired$name(value: ServerMessage$): string;
export function ServerMessage$EventFired$3(value: ServerMessage$): $dynamic.Dynamic$;
export function ServerMessage$EventFired$event(
  value: ServerMessage$,
): $dynamic.Dynamic$;

export class ContextProvided extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, key: string, value: $dynamic.Dynamic$);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  value: $dynamic.Dynamic$;
}
export function ServerMessage$ContextProvided(
  kind: number,
  key: string,
  value: $dynamic.Dynamic$,
): ServerMessage$;
export function ServerMessage$isContextProvided(value: ServerMessage$): boolean;
export function ServerMessage$ContextProvided$0(value: ServerMessage$): number;
export function ServerMessage$ContextProvided$kind(value: ServerMessage$): number;
export function ServerMessage$ContextProvided$1(
  value: ServerMessage$,
): string;
export function ServerMessage$ContextProvided$key(value: ServerMessage$): string;
export function ServerMessage$ContextProvided$2(
  value: ServerMessage$,
): $dynamic.Dynamic$;
export function ServerMessage$ContextProvided$value(value: ServerMessage$): $dynamic.Dynamic$;

export type ServerMessage$ = Batch | AttributeChanged | PropertyChanged | EventFired | ContextProvided;

export function ServerMessage$kind(value: ServerMessage$): number;

export const mount_kind: number;

export const reconcile_kind: number;

export const emit_kind: number;

export const provide_kind: number;

export const attribute_changed_kind: number;

export const event_fired_kind: number;

export const property_changed_kind: number;

export const batch_kind: number;

export const context_provided_kind: number;

export function client_message_to_json(message: ClientMessage$<any>): $json.Json$;

export function mount<TXQ>(
  open_shadow_root: boolean,
  will_adopt_styles: boolean,
  observed_attributes: _.List<string>,
  observed_properties: _.List<string>,
  requested_contexts: _.List<string>,
  provided_contexts: $dict.Dict$<string, $json.Json$>,
  vdom: $vnode.Element$<TXQ>,
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<TXQ>,
    $vnode.Element$<TXQ>
  >
): ClientMessage$<TXQ>;

export function reconcile<TXU>(
  patch: $patch.Patch$<TXU>,
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<TXU>,
    $vnode.Element$<TXU>
  >
): ClientMessage$<TXU>;

export function emit(name: string, data: $json.Json$): ClientMessage$<any>;

export function provide(key: string, value: $json.Json$): ClientMessage$<any>;

export function attribute_changed(name: string, value: string): ServerMessage$;

export function event_fired(
  path: string,
  name: string,
  event: $dynamic.Dynamic$
): ServerMessage$;

export function property_changed(name: string, value: $dynamic.Dynamic$): ServerMessage$;

export function batch(messages: _.List<ServerMessage$>): ServerMessage$;

export function context_provided(key: string, value: $dynamic.Dynamic$): ServerMessage$;

export function context_provided_decoder(): $decode.Decoder$<ServerMessage$>;

export function server_message_decoder(): $decode.Decoder$<ServerMessage$>;
