import type * as $process from "../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $effect from "../lustre/effect.d.mts";
import type * as $runtime from "../lustre/runtime/server/runtime.d.mts";
import type * as $transport from "../lustre/runtime/transport.d.mts";
import type * as $vattr from "../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../lustre/vdom/vnode.d.mts";

export class WebSocket extends _.CustomType {}
export function TransportMethod$WebSocket(): TransportMethod$;
export function TransportMethod$isWebSocket(value: TransportMethod$): boolean;

export class ServerSentEvents extends _.CustomType {}
export function TransportMethod$ServerSentEvents(): TransportMethod$;
export function TransportMethod$isServerSentEvents(
  value: TransportMethod$,
): boolean;

export class Polling extends _.CustomType {}
export function TransportMethod$Polling(): TransportMethod$;
export function TransportMethod$isPolling(value: TransportMethod$): boolean;

export type TransportMethod$ = WebSocket | ServerSentEvents | Polling;

export type ClientMessage = $transport.ClientMessage$<any>;

export function element<YDY>(
  attributes: _.List<$vattr.Attribute$<YDY>>,
  children: _.List<$vnode.Element$<YDY>>
): $vnode.Element$<YDY>;

export function script(): $vnode.Element$<any>;

export function route(path: string): $vattr.Attribute$<any>;

export function method(value: TransportMethod$): $vattr.Attribute$<any>;

export function include<YEK>(
  event: $vattr.Attribute$<YEK>,
  properties: _.List<string>
): $vattr.Attribute$<YEK>;

export function register_subject<YEO>(
  client: $process.Subject$<$transport.ClientMessage$<YEO>>
): $runtime.Message$<YEO>;

export function deregister_subject<YES>(
  client: $process.Subject$<$transport.ClientMessage$<YES>>
): $runtime.Message$<YES>;

export function register_callback<YEW>(
  callback: (x0: $transport.ClientMessage$<YEW>) => undefined
): $runtime.Message$<YEW>;

export function deregister_callback<YEZ>(
  callback: (x0: $transport.ClientMessage$<YEZ>) => undefined
): $runtime.Message$<YEZ>;

export function emit(event: string, data: $json.Json$): $effect.Effect$<any>;

export function select<YFE>(
  sel: (x0: (x0: YFE) => undefined, x1: $process.Subject$<any>) => $process.Selector$<
    YFE
  >
): $effect.Effect$<YFE>;

export function runtime_message_decoder(): $decode.Decoder$<
  $runtime.Message$<any>
>;

export function client_message_to_json(message: $transport.ClientMessage$<any>): $json.Json$;
