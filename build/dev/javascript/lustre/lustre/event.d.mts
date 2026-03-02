import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $effect from "../lustre/effect.d.mts";
import type * as $vattr from "../lustre/vdom/vattr.d.mts";

export type Handler = $vattr.Handler$<any>;

export function emit(event: string, data: $json.Json$): $effect.Effect$<any>;

export function on<XVP>(name: string, handler: $decode.Decoder$<XVP>): $vattr.Attribute$<
  XVP
>;

export function advanced<XVS>(
  name: string,
  handler: $decode.Decoder$<$vattr.Handler$<XVS>>
): $vattr.Attribute$<XVS>;

export function handler<XVW>(
  message: XVW,
  prevent_default: boolean,
  stop_propagation: boolean
): $vattr.Handler$<XVW>;

export function prevent_default<XVY>(event: $vattr.Attribute$<XVY>): $vattr.Attribute$<
  XVY
>;

export function stop_propagation<XWB>(event: $vattr.Attribute$<XWB>): $vattr.Attribute$<
  XWB
>;

export function debounce<XWE>(event: $vattr.Attribute$<XWE>, delay: number): $vattr.Attribute$<
  XWE
>;

export function throttle<XWH>(event: $vattr.Attribute$<XWH>, delay: number): $vattr.Attribute$<
  XWH
>;

export function on_click<XWK>(msg: XWK): $vattr.Attribute$<XWK>;

export function on_mouse_down<XWM>(msg: XWM): $vattr.Attribute$<XWM>;

export function on_mouse_up<XWO>(msg: XWO): $vattr.Attribute$<XWO>;

export function on_mouse_enter<XWQ>(msg: XWQ): $vattr.Attribute$<XWQ>;

export function on_mouse_leave<XWS>(msg: XWS): $vattr.Attribute$<XWS>;

export function on_mouse_over<XWU>(msg: XWU): $vattr.Attribute$<XWU>;

export function on_mouse_out<XWW>(msg: XWW): $vattr.Attribute$<XWW>;

export function on_keypress<XWY>(msg: (x0: string) => XWY): $vattr.Attribute$<
  XWY
>;

export function on_keydown<XXA>(msg: (x0: string) => XXA): $vattr.Attribute$<
  XXA
>;

export function on_keyup<XXC>(msg: (x0: string) => XXC): $vattr.Attribute$<XXC>;

export function on_input<XXE>(msg: (x0: string) => XXE): $vattr.Attribute$<XXE>;

export function on_change<XXG>(msg: (x0: string) => XXG): $vattr.Attribute$<XXG>;

export function on_check<XXI>(msg: (x0: boolean) => XXI): $vattr.Attribute$<XXI>;

export function on_submit<XXL>(msg: (x0: _.List<[string, string]>) => XXL): $vattr.Attribute$<
  XXL
>;

export function on_focus<XXP>(msg: XXP): $vattr.Attribute$<XXP>;

export function on_blur<XXR>(msg: XXR): $vattr.Attribute$<XXR>;
