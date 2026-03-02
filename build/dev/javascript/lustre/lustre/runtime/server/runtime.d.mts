import type * as $process from "../../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $json from "../../../../gleam_json/gleam/json.d.mts";
import type * as $actor from "../../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $dict from "../../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $decode from "../../../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as $option from "../../../../gleam_stdlib/gleam/option.d.mts";
import type * as $set from "../../../../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "../../../gleam.d.mts";
import type * as $effect from "../../../lustre/effect.d.mts";
import type * as $transport from "../../../lustre/runtime/transport.d.mts";
import type * as $cache from "../../../lustre/vdom/cache.d.mts";
import type * as $vnode from "../../../lustre/vdom/vnode.d.mts";

export class State<UUA, UTZ> extends _.CustomType {
  /** @deprecated */
  constructor(
    self: $process.Subject$<Message$<any>>,
    selector: $process.Selector$<Message$<any>>,
    base_selector: $process.Selector$<Message$<any>>,
    model: UTZ,
    update: (x0: any, x1: any) => [any, $effect.Effect$<any>],
    view: (x0: any) => $vnode.Element$<any>,
    config: Config$<any>,
    vdom: $vnode.Element$<any>,
    cache: $cache.Cache$<any>,
    providers: $dict.Dict$<string, $json.Json$>,
    subscribers: $dict.Dict$<
      $process.Subject$<$transport.ClientMessage$<any>>,
      $process.Monitor$
    >,
    callbacks: $set.Set$<(x0: $transport.ClientMessage$<any>) => undefined>
  );
  /** @deprecated */
  self: $process.Subject$<Message$<any>>;
  /** @deprecated */
  selector: $process.Selector$<Message$<any>>;
  /** @deprecated */
  base_selector: $process.Selector$<Message$<any>>;
  /** @deprecated */
  model: UTZ;
  /** @deprecated */
  update: (x0: any, x1: any) => [any, $effect.Effect$<any>];
  /** @deprecated */
  view: (x0: any) => $vnode.Element$<any>;
  /** @deprecated */
  config: Config$<any>;
  /** @deprecated */
  vdom: $vnode.Element$<any>;
  /** @deprecated */
  cache: $cache.Cache$<any>;
  /** @deprecated */
  providers: $dict.Dict$<string, $json.Json$>;
  /** @deprecated */
  subscribers: $dict.Dict$<
    $process.Subject$<$transport.ClientMessage$<any>>,
    $process.Monitor$
  >;
  /** @deprecated */
  callbacks: $set.Set$<(x0: $transport.ClientMessage$<any>) => undefined>;
}
export function State$State<UTZ, UUA>(
  self: $process.Subject$<Message$<any>>,
  selector: $process.Selector$<Message$<any>>,
  base_selector: $process.Selector$<Message$<any>>,
  model: UTZ,
  update: (x0: any, x1: any) => [any, $effect.Effect$<any>],
  view: (x0: any) => $vnode.Element$<any>,
  config: Config$<any>,
  vdom: $vnode.Element$<any>,
  cache: $cache.Cache$<any>,
  providers: $dict.Dict$<string, $json.Json$>,
  subscribers: $dict.Dict$<
    $process.Subject$<$transport.ClientMessage$<any>>,
    $process.Monitor$
  >,
  callbacks: $set.Set$<(x0: $transport.ClientMessage$<any>) => undefined>,
): State$<UUA, UTZ>;
export function State$isState<UTZ, UUA>(value: State$<UUA, UTZ>): boolean;
export function State$State$0<UTZ, UUA>(value: State$<UUA, UTZ>): $process.Subject$<
  Message$<any>
>;
export function State$State$self<UUA, UTZ>(value: State$<UUA, UTZ>): $process.Subject$<
  Message$<any>
>;
export function State$State$1<UTZ, UUA>(value: State$<UUA, UTZ>): $process.Selector$<
  Message$<any>
>;
export function State$State$selector<UUA, UTZ>(value: State$<UUA, UTZ>): $process.Selector$<
  Message$<any>
>;
export function State$State$2<UTZ, UUA>(value: State$<UUA, UTZ>): $process.Selector$<
  Message$<any>
>;
export function State$State$base_selector<UUA, UTZ>(value: State$<UUA, UTZ>): $process.Selector$<
  Message$<any>
>;
export function State$State$3<UTZ, UUA>(value: State$<UUA, UTZ>): UTZ;
export function State$State$model<UUA, UTZ>(value: State$<UUA, UTZ>): UTZ;
export function State$State$4<UTZ, UUA>(value: State$<UUA, UTZ>): (
  x0: any,
  x1: any
) => [any, $effect.Effect$<any>];
export function State$State$update<UTZ, UUA>(value: State$<UUA, UTZ>): (
  x0: any,
  x1: any
) => [any, $effect.Effect$<any>];
export function State$State$5<UUA, UTZ>(value: State$<UUA, UTZ>): (x0: any) => $vnode.Element$<
  any
>;
export function State$State$view<UTZ, UUA>(value: State$<UUA, UTZ>): (x0: any) => $vnode.Element$<
  any
>;
export function State$State$6<UUA, UTZ>(value: State$<UUA, UTZ>): Config$<any>;
export function State$State$config<UUA, UTZ>(value: State$<UUA, UTZ>): Config$<
  any
>;
export function State$State$7<UUA, UTZ>(value: State$<UUA, UTZ>): $vnode.Element$<
  any
>;
export function State$State$vdom<UUA, UTZ>(value: State$<UUA, UTZ>): $vnode.Element$<
  any
>;
export function State$State$8<UTZ, UUA>(value: State$<UUA, UTZ>): $cache.Cache$<
  any
>;
export function State$State$cache<UTZ, UUA>(value: State$<UUA, UTZ>): $cache.Cache$<
  any
>;
export function State$State$9<UTZ, UUA>(value: State$<UUA, UTZ>): $dict.Dict$<
  string,
  $json.Json$
>;
export function State$State$providers<UUA, UTZ>(value: State$<UUA, UTZ>): $dict.Dict$<
  string,
  $json.Json$
>;
export function State$State$10<UTZ, UUA>(value: State$<UUA, UTZ>): $dict.Dict$<
  $process.Subject$<$transport.ClientMessage$<any>>,
  $process.Monitor$
>;
export function State$State$subscribers<UTZ, UUA>(value: State$<UUA, UTZ>): $dict.Dict$<
  $process.Subject$<$transport.ClientMessage$<any>>,
  $process.Monitor$
>;
export function State$State$11<UUA, UTZ>(value: State$<UUA, UTZ>): $set.Set$<
  (x0: $transport.ClientMessage$<any>) => undefined
>;
export function State$State$callbacks<UTZ, UUA>(value: State$<UUA, UTZ>): $set.Set$<
  (x0: $transport.ClientMessage$<any>) => undefined
>;

export type State$<UUA, UTZ> = State<UUA, UTZ>;

export class Config<UUB> extends _.CustomType {
  /** @deprecated */
  constructor(
    open_shadow_root: boolean,
    adopt_styles: boolean,
    attributes: $dict.Dict$<string, (x0: string) => _.Result<any, undefined>>,
    properties: $dict.Dict$<string, $decode.Decoder$<any>>,
    contexts: $dict.Dict$<string, $decode.Decoder$<any>>,
    on_connect: $option.Option$<any>,
    on_disconnect: $option.Option$<any>
  );
  /** @deprecated */
  open_shadow_root: boolean;
  /** @deprecated */
  adopt_styles: boolean;
  /** @deprecated */
  attributes: $dict.Dict$<string, (x0: string) => _.Result<any, undefined>>;
  /** @deprecated */
  properties: $dict.Dict$<string, $decode.Decoder$<any>>;
  /** @deprecated */
  contexts: $dict.Dict$<string, $decode.Decoder$<any>>;
  /** @deprecated */
  on_connect: $option.Option$<any>;
  /** @deprecated */
  on_disconnect: $option.Option$<any>;
}
export function Config$Config<UUB>(
  open_shadow_root: boolean,
  adopt_styles: boolean,
  attributes: $dict.Dict$<string, (x0: string) => _.Result<any, undefined>>,
  properties: $dict.Dict$<string, $decode.Decoder$<any>>,
  contexts: $dict.Dict$<string, $decode.Decoder$<any>>,
  on_connect: $option.Option$<any>,
  on_disconnect: $option.Option$<any>,
): Config$<UUB>;
export function Config$isConfig<UUB>(value: Config$<UUB>): boolean;
export function Config$Config$0<UUB>(value: Config$<UUB>): boolean;
export function Config$Config$open_shadow_root<UUB>(value: Config$<UUB>): boolean;
export function Config$Config$1<UUB>(
  value: Config$<UUB>,
): boolean;
export function Config$Config$adopt_styles<UUB>(value: Config$<UUB>): boolean;
export function Config$Config$2<UUB>(value: Config$<UUB>): $dict.Dict$<
  string,
  (x0: string) => _.Result<any, undefined>
>;
export function Config$Config$attributes<UUB>(value: Config$<UUB>): $dict.Dict$<
  string,
  (x0: string) => _.Result<any, undefined>
>;
export function Config$Config$3<UUB>(value: Config$<UUB>): $dict.Dict$<
  string,
  $decode.Decoder$<any>
>;
export function Config$Config$properties<UUB>(value: Config$<UUB>): $dict.Dict$<
  string,
  $decode.Decoder$<any>
>;
export function Config$Config$4<UUB>(value: Config$<UUB>): $dict.Dict$<
  string,
  $decode.Decoder$<any>
>;
export function Config$Config$contexts<UUB>(value: Config$<UUB>): $dict.Dict$<
  string,
  $decode.Decoder$<any>
>;
export function Config$Config$5<UUB>(value: Config$<UUB>): $option.Option$<any>;
export function Config$Config$on_connect<UUB>(value: Config$<UUB>): $option.Option$<
  any
>;
export function Config$Config$6<UUB>(value: Config$<UUB>): $option.Option$<any>;
export function Config$Config$on_disconnect<UUB>(value: Config$<UUB>): $option.Option$<
  any
>;

export type Config$<UUB> = Config<UUB>;

export class ClientDispatchedMessage extends _.CustomType {
  /** @deprecated */
  constructor(message: $transport.ServerMessage$);
  /** @deprecated */
  message: $transport.ServerMessage$;
}
export function Message$ClientDispatchedMessage<UUC>(
  message: $transport.ServerMessage$,
): Message$<UUC>;
export function Message$isClientDispatchedMessage<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$ClientDispatchedMessage$0<UUC>(value: Message$<UUC>): $transport.ServerMessage$;
export function Message$ClientDispatchedMessage$message<UUC>(
  value: Message$<UUC>,
): $transport.ServerMessage$;

export class ClientRegisteredSubject<UUC> extends _.CustomType {
  /** @deprecated */
  constructor(client: $process.Subject$<$transport.ClientMessage$<any>>);
  /** @deprecated */
  client: $process.Subject$<$transport.ClientMessage$<any>>;
}
export function Message$ClientRegisteredSubject<UUC>(
  client: $process.Subject$<$transport.ClientMessage$<any>>,
): Message$<UUC>;
export function Message$isClientRegisteredSubject<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$ClientRegisteredSubject$0<UUC>(value: Message$<UUC>): $process.Subject$<
  $transport.ClientMessage$<any>
>;
export function Message$ClientRegisteredSubject$client<UUC>(value: Message$<UUC>): $process.Subject$<
  $transport.ClientMessage$<any>
>;

export class ClientDeregisteredSubject<UUC> extends _.CustomType {
  /** @deprecated */
  constructor(client: $process.Subject$<$transport.ClientMessage$<any>>);
  /** @deprecated */
  client: $process.Subject$<$transport.ClientMessage$<any>>;
}
export function Message$ClientDeregisteredSubject<UUC>(
  client: $process.Subject$<$transport.ClientMessage$<any>>,
): Message$<UUC>;
export function Message$isClientDeregisteredSubject<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$ClientDeregisteredSubject$0<UUC>(value: Message$<UUC>): $process.Subject$<
  $transport.ClientMessage$<any>
>;
export function Message$ClientDeregisteredSubject$client<UUC>(value: Message$<
    UUC
  >): $process.Subject$<$transport.ClientMessage$<any>>;

export class ClientRegisteredCallback<UUC> extends _.CustomType {
  /** @deprecated */
  constructor(callback: (x0: $transport.ClientMessage$<any>) => undefined);
  /** @deprecated */
  callback: (x0: $transport.ClientMessage$<any>) => undefined;
}
export function Message$ClientRegisteredCallback<UUC>(
  callback: (x0: $transport.ClientMessage$<any>) => undefined,
): Message$<UUC>;
export function Message$isClientRegisteredCallback<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$ClientRegisteredCallback$0<UUC>(value: Message$<UUC>): (
  x0: $transport.ClientMessage$<any>
) => undefined;
export function Message$ClientRegisteredCallback$callback<UUC>(value: Message$<
    UUC
  >): (x0: $transport.ClientMessage$<any>) => undefined;

export class ClientDeregisteredCallback<UUC> extends _.CustomType {
  /** @deprecated */
  constructor(callback: (x0: $transport.ClientMessage$<any>) => undefined);
  /** @deprecated */
  callback: (x0: $transport.ClientMessage$<any>) => undefined;
}
export function Message$ClientDeregisteredCallback<UUC>(
  callback: (x0: $transport.ClientMessage$<any>) => undefined,
): Message$<UUC>;
export function Message$isClientDeregisteredCallback<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$ClientDeregisteredCallback$0<UUC>(value: Message$<UUC>): (
  x0: $transport.ClientMessage$<any>
) => undefined;
export function Message$ClientDeregisteredCallback$callback<UUC>(value: Message$<
    UUC
  >): (x0: $transport.ClientMessage$<any>) => undefined;

export class EffectAddedSelector<UUC> extends _.CustomType {
  /** @deprecated */
  constructor(selector: $process.Selector$<Message$<any>>);
  /** @deprecated */
  selector: $process.Selector$<Message$<any>>;
}
export function Message$EffectAddedSelector<UUC>(
  selector: $process.Selector$<Message$<any>>,
): Message$<UUC>;
export function Message$isEffectAddedSelector<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$EffectAddedSelector$0<UUC>(value: Message$<UUC>): $process.Selector$<
  Message$<any>
>;
export function Message$EffectAddedSelector$selector<UUC>(value: Message$<UUC>): $process.Selector$<
  Message$<any>
>;

export class EffectDispatchedMessage<UUC> extends _.CustomType {
  /** @deprecated */
  constructor(message: UUC);
  /** @deprecated */
  message: UUC;
}
export function Message$EffectDispatchedMessage<UUC>(
  message: UUC,
): Message$<UUC>;
export function Message$isEffectDispatchedMessage<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$EffectDispatchedMessage$0<UUC>(value: Message$<UUC>): UUC;
export function Message$EffectDispatchedMessage$message<UUC>(
  value: Message$<UUC>,
): UUC;

export class EffectEmitEvent extends _.CustomType {
  /** @deprecated */
  constructor(name: string, data: $json.Json$);
  /** @deprecated */
  name: string;
  /** @deprecated */
  data: $json.Json$;
}
export function Message$EffectEmitEvent<UUC>(
  name: string,
  data: $json.Json$,
): Message$<UUC>;
export function Message$isEffectEmitEvent<UUC>(value: Message$<UUC>): boolean;
export function Message$EffectEmitEvent$0<UUC>(value: Message$<UUC>): string;
export function Message$EffectEmitEvent$name<UUC>(value: Message$<UUC>): string;
export function Message$EffectEmitEvent$1<UUC>(value: Message$<UUC>): $json.Json$;
export function Message$EffectEmitEvent$data<UUC>(
  value: Message$<UUC>,
): $json.Json$;

export class EffectProvidedValue extends _.CustomType {
  /** @deprecated */
  constructor(key: string, value: $json.Json$);
  /** @deprecated */
  key: string;
  /** @deprecated */
  value: $json.Json$;
}
export function Message$EffectProvidedValue<UUC>(
  key: string,
  value: $json.Json$,
): Message$<UUC>;
export function Message$isEffectProvidedValue<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$EffectProvidedValue$0<UUC>(value: Message$<UUC>): string;
export function Message$EffectProvidedValue$key<UUC>(
  value: Message$<UUC>,
): string;
export function Message$EffectProvidedValue$1<UUC>(value: Message$<UUC>): $json.Json$;
export function Message$EffectProvidedValue$value<UUC>(
  value: Message$<UUC>,
): $json.Json$;

export class MonitorReportedDown extends _.CustomType {
  /** @deprecated */
  constructor(monitor: $process.Monitor$);
  /** @deprecated */
  monitor: $process.Monitor$;
}
export function Message$MonitorReportedDown<UUC>(
  monitor: $process.Monitor$,
): Message$<UUC>;
export function Message$isMonitorReportedDown<UUC>(
  value: Message$<UUC>,
): boolean;
export function Message$MonitorReportedDown$0<UUC>(value: Message$<UUC>): $process.Monitor$;
export function Message$MonitorReportedDown$monitor<UUC>(
  value: Message$<UUC>,
): $process.Monitor$;

export class SystemRequestedShutdown extends _.CustomType {}
export function Message$SystemRequestedShutdown<UUC>(): Message$<UUC>;
export function Message$isSystemRequestedShutdown<UUC>(
  value: Message$<UUC>,
): boolean;

export type Message$<UUC> = ClientDispatchedMessage | ClientRegisteredSubject<
  UUC
> | ClientDeregisteredSubject<UUC> | ClientRegisteredCallback<UUC> | ClientDeregisteredCallback<
  UUC
> | EffectAddedSelector<UUC> | EffectDispatchedMessage<UUC> | EffectEmitEvent | EffectProvidedValue | MonitorReportedDown | SystemRequestedShutdown;

export type ServerComponent = $process.Subject$<Message$<any>>;

export function start(x0: any, x1: any, x2: any, x3: any, x4: any, x5: any): _.Result<
  $actor.Started$<$process.Subject$<Message$<any>>>,
  $actor.StartError$
>;
