import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $effect from "../lustre/effect.d.mts";
import type * as $app from "../lustre/runtime/app.d.mts";
import type * as $vattr from "../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../lustre/vdom/vnode.d.mts";

export type Config = $app.Config$<any>;

export type Option = $app.Option$<any>;

export function on_attribute_change<UZE>(
  name: string,
  decoder: (x0: string) => _.Result<UZE, undefined>
): $app.Option$<UZE>;

export function on_property_change<UZI>(
  name: string,
  decoder: $decode.Decoder$<UZI>
): $app.Option$<UZI>;

export function on_context_change<UZL>(
  key: string,
  decoder: $decode.Decoder$<UZL>
): $app.Option$<UZL>;

export function form_associated(): $app.Option$<any>;

export function on_form_autofill<UZQ>(handler: (x0: string) => UZQ): $app.Option$<
  UZQ
>;

export function on_form_reset<UZS>(message: UZS): $app.Option$<UZS>;

export function on_form_restore<UZU>(handler: (x0: string) => UZU): $app.Option$<
  UZU
>;

export function open_shadow_root(open: boolean): $app.Option$<any>;

export function adopt_styles(adopt: boolean): $app.Option$<any>;

export function delegates_focus(delegates: boolean): $app.Option$<any>;

export function on_connect<VAC>(message: VAC): $app.Option$<VAC>;

export function on_adopt<VAE>(message: VAE): $app.Option$<VAE>;

export function on_disconnect<VAG>(message: VAG): $app.Option$<VAG>;

export function default_slot<VAI>(
  attributes: _.List<$vattr.Attribute$<VAI>>,
  fallback: _.List<$vnode.Element$<VAI>>
): $vnode.Element$<VAI>;

export function named_slot<VAO>(
  name: string,
  attributes: _.List<$vattr.Attribute$<VAO>>,
  fallback: _.List<$vnode.Element$<VAO>>
): $vnode.Element$<VAO>;

export function part(name: string): $vattr.Attribute$<any>;

export function parts(names: _.List<[string, boolean]>): $vattr.Attribute$<any>;

export function exportparts(names: _.List<string>): $vattr.Attribute$<any>;

export function slot(name: string): $vattr.Attribute$<any>;

export function set_form_value(value: string): $effect.Effect$<any>;

export function clear_form_value(): $effect.Effect$<any>;

export function set_pseudo_state(value: string): $effect.Effect$<any>;

export function remove_pseudo_state(value: string): $effect.Effect$<any>;

export function prerender<VBO>(
  component: $app.App$<undefined, any, VBO>,
  tag: string,
  attributes: _.List<$vattr.Attribute$<VBO>>,
  children: _.List<$vnode.Element$<VBO>>
): $vnode.Element$<VBO>;
