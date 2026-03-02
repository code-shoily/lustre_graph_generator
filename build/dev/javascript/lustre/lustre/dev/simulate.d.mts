import type * as $json from "../../../gleam_json/gleam/json.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $query from "../../lustre/dev/query.d.mts";
import type * as $effect from "../../lustre/effect.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

declare class App<WLP, WLQ, WLR> extends _.CustomType {
  /** @deprecated */
  constructor(
    init: (x0: any) => [any, $effect.Effect$<any>],
    update: (x0: any, x1: any) => [any, $effect.Effect$<any>],
    view: (x0: any) => $vnode.Element$<any>
  );
  /** @deprecated */
  init: (x0: any) => [any, $effect.Effect$<any>];
  /** @deprecated */
  update: (x0: any, x1: any) => [any, $effect.Effect$<any>];
  /** @deprecated */
  view: (x0: any) => $vnode.Element$<any>;
}

export type App$<WLR, WLQ, WLP> = App<WLP, WLR, WLQ>;

declare class Simulation<WLS, WLT> extends _.CustomType {
  /** @deprecated */
  constructor(
    update: (x0: any, x1: any) => [any, $effect.Effect$<any>],
    view: (x0: any) => $vnode.Element$<any>,
    history: _.List<Event$<any>>,
    model: WLS,
    html: $vnode.Element$<any>
  );
  /** @deprecated */
  update: (x0: any, x1: any) => [any, $effect.Effect$<any>];
  /** @deprecated */
  view: (x0: any) => $vnode.Element$<any>;
  /** @deprecated */
  history: _.List<Event$<any>>;
  /** @deprecated */
  model: WLS;
  /** @deprecated */
  html: $vnode.Element$<any>;
}

export type Simulation$<WLS, WLT> = Simulation<WLS, WLT>;

export class Dispatch<WLU> extends _.CustomType {
  /** @deprecated */
  constructor(message: WLU);
  /** @deprecated */
  message: WLU;
}
export function Event$Dispatch<WLU>(message: WLU): Event$<WLU>;
export function Event$isDispatch<WLU>(value: Event$<WLU>): boolean;
export function Event$Dispatch$0<WLU>(value: Event$<WLU>): WLU;
export function Event$Dispatch$message<WLU>(value: Event$<WLU>): WLU;

export class Event extends _.CustomType {
  /** @deprecated */
  constructor(target: $query.Query$, name: string, data: $json.Json$);
  /** @deprecated */
  target: $query.Query$;
  /** @deprecated */
  name: string;
  /** @deprecated */
  data: $json.Json$;
}
export function Event$Event<WLU>(
  target: $query.Query$,
  name: string,
  data: $json.Json$,
): Event$<WLU>;
export function Event$isEvent<WLU>(value: Event$<WLU>): boolean;
export function Event$Event$0<WLU>(value: Event$<WLU>): $query.Query$;
export function Event$Event$target<WLU>(value: Event$<WLU>): $query.Query$;
export function Event$Event$1<WLU>(value: Event$<WLU>): string;
export function Event$Event$name<WLU>(value: Event$<WLU>): string;
export function Event$Event$2<WLU>(value: Event$<WLU>): $json.Json$;
export function Event$Event$data<WLU>(value: Event$<WLU>): $json.Json$;

export class Problem extends _.CustomType {
  /** @deprecated */
  constructor(name: string, message: string);
  /** @deprecated */
  name: string;
  /** @deprecated */
  message: string;
}
export function Event$Problem<WLU>(name: string, message: string): Event$<WLU>;
export function Event$isProblem<WLU>(value: Event$<WLU>): boolean;
export function Event$Problem$0<WLU>(value: Event$<WLU>): string;
export function Event$Problem$name<WLU>(value: Event$<WLU>): string;
export function Event$Problem$1<WLU>(value: Event$<WLU>): string;
export function Event$Problem$message<WLU>(value: Event$<WLU>): string;

export type Event$<WLU> = Dispatch<WLU> | Event | Problem;

export function simple<WLV, WLW, WLX>(
  init: (x0: WLV) => WLW,
  update: (x0: WLW, x1: WLX) => WLW,
  view: (x0: WLW) => $vnode.Element$<WLX>
): App$<WLV, WLW, WLX>;

export function application<WMC, WMD, WME>(
  init: (x0: WMC) => [WMD, $effect.Effect$<WME>],
  update: (x0: WMD, x1: WME) => [WMD, $effect.Effect$<WME>],
  view: (x0: WMD) => $vnode.Element$<WME>
): App$<WMC, WMD, WME>;

export function start<WML, WMM, WMN>(app: App$<WML, WMM, WMN>, args: WML): Simulation$<
  WMM,
  WMN
>;

export function message<WMT, WMU>(simulation: Simulation$<WMT, WMU>, msg: WMU): Simulation$<
  WMT,
  WMU
>;

export function problem<WNZ, WOA>(
  simulation: Simulation$<WNZ, WOA>,
  name: string,
  message: string
): Simulation$<WNZ, WOA>;

export function model<WOF>(simulation: Simulation$<WOF, any>): WOF;

export function view<WOK>(simulation: Simulation$<any, WOK>): $vnode.Element$<
  WOK
>;

export function history<WOP>(simulation: Simulation$<any, WOP>): _.List<
  Event$<WOP>
>;

export function event<WMZ, WNA>(
  simulation: Simulation$<WMZ, WNA>,
  query: $query.Query$,
  event: string,
  payload: _.List<[string, $json.Json$]>
): Simulation$<WMZ, WNA>;

export function click<WNG, WNH>(
  simulation: Simulation$<WNG, WNH>,
  query: $query.Query$
): Simulation$<WNG, WNH>;

export function input<WNM, WNN>(
  simulation: Simulation$<WNM, WNN>,
  query: $query.Query$,
  value: string
): Simulation$<WNM, WNN>;

export function submit<WNS, WNT>(
  simulation: Simulation$<WNS, WNT>,
  query: $query.Query$,
  form_data: _.List<[string, string]>
): Simulation$<WNS, WNT>;
