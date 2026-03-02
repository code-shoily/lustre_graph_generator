import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $effect from "../../lustre/effect.d.mts";
import type * as $runtime from "../../lustre/runtime/server/runtime.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

export class App<UWK, UWJ, UWI> extends _.CustomType {
  /** @deprecated */
  constructor(
    name: $option.Option$<$process.Name$<$runtime.Message$<any>>>,
    init: (x0: any) => [any, $effect.Effect$<any>],
    update: (x0: any, x1: any) => [any, $effect.Effect$<any>],
    view: (x0: any) => $vnode.Element$<any>,
    config: Config$<any>
  );
  /** @deprecated */
  name: $option.Option$<$process.Name$<$runtime.Message$<any>>>;
  /** @deprecated */
  init: (x0: any) => [any, $effect.Effect$<any>];
  /** @deprecated */
  update: (x0: any, x1: any) => [any, $effect.Effect$<any>];
  /** @deprecated */
  view: (x0: any) => $vnode.Element$<any>;
  /** @deprecated */
  config: Config$<any>;
}
export function App$App<UWI, UWJ, UWK>(
  name: $option.Option$<$process.Name$<$runtime.Message$<any>>>,
  init: (x0: any) => [any, $effect.Effect$<any>],
  update: (x0: any, x1: any) => [any, $effect.Effect$<any>],
  view: (x0: any) => $vnode.Element$<any>,
  config: Config$<any>,
): App$<UWI, UWK, UWJ>;
export function App$isApp<UWJ, UWK, UWI>(value: App$<UWI, UWK, UWJ>): boolean;
export function App$App$0<UWJ, UWI, UWK>(value: App$<UWI, UWK, UWJ>): $option.Option$<
  $process.Name$<$runtime.Message$<any>>
>;
export function App$App$name<UWI, UWK, UWJ>(value: App$<UWI, UWK, UWJ>): $option.Option$<
  $process.Name$<$runtime.Message$<any>>
>;
export function App$App$1<UWK, UWJ, UWI>(value: App$<UWI, UWK, UWJ>): (x0: any) => [
  any,
  $effect.Effect$<any>
];
export function App$App$init<UWJ, UWK, UWI>(value: App$<UWI, UWK, UWJ>): (
  x0: any
) => [any, $effect.Effect$<any>];
export function App$App$2<UWI, UWK, UWJ>(value: App$<UWI, UWK, UWJ>): (
  x0: any,
  x1: any
) => [any, $effect.Effect$<any>];
export function App$App$update<UWK, UWI, UWJ>(value: App$<UWI, UWK, UWJ>): (
  x0: any,
  x1: any
) => [any, $effect.Effect$<any>];
export function App$App$3<UWI, UWJ, UWK>(value: App$<UWI, UWK, UWJ>): (x0: any) => $vnode.Element$<
  any
>;
export function App$App$view<UWJ, UWK, UWI>(value: App$<UWI, UWK, UWJ>): (
  x0: any
) => $vnode.Element$<any>;
export function App$App$4<UWI, UWJ, UWK>(value: App$<UWI, UWK, UWJ>): Config$<
  any
>;
export function App$App$config<UWJ, UWK, UWI>(value: App$<UWI, UWK, UWJ>): Config$<
  any
>;

export type App$<UWI, UWK, UWJ> = App<UWK, UWI, UWJ>;

export class Config<UWL> extends _.CustomType {
  /** @deprecated */
  constructor(
    open_shadow_root: boolean,
    adopt_styles: boolean,
    delegates_focus: boolean,
    attributes: _.List<[string, (x0: string) => _.Result<any, undefined>]>,
    properties: _.List<[string, $decode.Decoder$<any>]>,
    contexts: _.List<[string, $decode.Decoder$<any>]>,
    is_form_associated: boolean,
    on_form_autofill: $option.Option$<(x0: string) => any>,
    on_form_reset: $option.Option$<any>,
    on_form_restore: $option.Option$<(x0: string) => any>,
    on_connect: $option.Option$<any>,
    on_adopt: $option.Option$<any>,
    on_disconnect: $option.Option$<any>
  );
  /** @deprecated */
  open_shadow_root: boolean;
  /** @deprecated */
  adopt_styles: boolean;
  /** @deprecated */
  delegates_focus: boolean;
  /** @deprecated */
  attributes: _.List<[string, (x0: string) => _.Result<any, undefined>]>;
  /** @deprecated */
  properties: _.List<[string, $decode.Decoder$<any>]>;
  /** @deprecated */
  contexts: _.List<[string, $decode.Decoder$<any>]>;
  /** @deprecated */
  is_form_associated: boolean;
  /** @deprecated */
  on_form_autofill: $option.Option$<(x0: string) => any>;
  /** @deprecated */
  on_form_reset: $option.Option$<any>;
  /** @deprecated */
  on_form_restore: $option.Option$<(x0: string) => any>;
  /** @deprecated */
  on_connect: $option.Option$<any>;
  /** @deprecated */
  on_adopt: $option.Option$<any>;
  /** @deprecated */
  on_disconnect: $option.Option$<any>;
}
export function Config$Config<UWL>(
  open_shadow_root: boolean,
  adopt_styles: boolean,
  delegates_focus: boolean,
  attributes: _.List<[string, (x0: string) => _.Result<any, undefined>]>,
  properties: _.List<[string, $decode.Decoder$<any>]>,
  contexts: _.List<[string, $decode.Decoder$<any>]>,
  is_form_associated: boolean,
  on_form_autofill: $option.Option$<(x0: string) => any>,
  on_form_reset: $option.Option$<any>,
  on_form_restore: $option.Option$<(x0: string) => any>,
  on_connect: $option.Option$<any>,
  on_adopt: $option.Option$<any>,
  on_disconnect: $option.Option$<any>,
): Config$<UWL>;
export function Config$isConfig<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$0<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$open_shadow_root<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$1<UWL>(
  value: Config$<UWL>,
): boolean;
export function Config$Config$adopt_styles<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$2<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$delegates_focus<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$3<UWL>(
  value: Config$<UWL>,
): _.List<[string, (x0: string) => _.Result<any, undefined>]>;
export function Config$Config$attributes<UWL>(value: Config$<UWL>): _.List<
  [string, (x0: string) => _.Result<any, undefined>]
>;
export function Config$Config$4<UWL>(value: Config$<UWL>): _.List<
  [string, $decode.Decoder$<any>]
>;
export function Config$Config$properties<UWL>(value: Config$<UWL>): _.List<
  [string, $decode.Decoder$<any>]
>;
export function Config$Config$5<UWL>(value: Config$<UWL>): _.List<
  [string, $decode.Decoder$<any>]
>;
export function Config$Config$contexts<UWL>(value: Config$<UWL>): _.List<
  [string, $decode.Decoder$<any>]
>;
export function Config$Config$6<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$is_form_associated<UWL>(value: Config$<UWL>): boolean;
export function Config$Config$7<UWL>(
  value: Config$<UWL>,
): $option.Option$<(x0: string) => any>;
export function Config$Config$on_form_autofill<UWL>(value: Config$<UWL>): $option.Option$<
  (x0: string) => any
>;
export function Config$Config$8<UWL>(value: Config$<UWL>): $option.Option$<any>;
export function Config$Config$on_form_reset<UWL>(value: Config$<UWL>): $option.Option$<
  any
>;
export function Config$Config$9<UWL>(value: Config$<UWL>): $option.Option$<
  (x0: string) => any
>;
export function Config$Config$on_form_restore<UWL>(value: Config$<UWL>): $option.Option$<
  (x0: string) => any
>;
export function Config$Config$10<UWL>(value: Config$<UWL>): $option.Option$<any>;
export function Config$Config$on_connect<UWL>(
  value: Config$<UWL>,
): $option.Option$<any>;
export function Config$Config$11<UWL>(value: Config$<UWL>): $option.Option$<any>;
export function Config$Config$on_adopt<UWL>(
  value: Config$<UWL>,
): $option.Option$<any>;
export function Config$Config$12<UWL>(value: Config$<UWL>): $option.Option$<any>;
export function Config$Config$on_disconnect<UWL>(
  value: Config$<UWL>,
): $option.Option$<any>;

export type Config$<UWL> = Config<UWL>;

export class Option<UWM> extends _.CustomType {
  /** @deprecated */
  constructor(apply: (x0: Config$<any>) => Config$<any>);
  /** @deprecated */
  apply: (x0: Config$<any>) => Config$<any>;
}
export function Option$Option<UWM>(
  apply: (x0: Config$<any>) => Config$<any>,
): Option$<UWM>;
export function Option$isOption<UWM>(value: Option$<UWM>): boolean;
export function Option$Option$0<UWM>(value: Option$<UWM>): (x0: Config$<any>) => Config$<
  any
>;
export function Option$Option$apply<UWM>(value: Option$<UWM>): (
  x0: Config$<any>
) => Config$<any>;

export type Option$<UWM> = Option<UWM>;

export const default_config: Config$<any>;

export function configure_server_component<UWR>(config: Config$<UWR>): $runtime.Config$<
  UWR
>;

export function configure<UWN>(options: _.List<Option$<UWN>>): Config$<UWN>;
