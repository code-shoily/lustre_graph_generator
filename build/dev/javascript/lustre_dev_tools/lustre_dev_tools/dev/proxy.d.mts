import type * as $request from "../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $uri from "../../../gleam_stdlib/gleam/uri.d.mts";
import type * as $wisp from "../../../wisp/wisp.d.mts";
import type * as $internal from "../../../wisp/wisp/internal.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $error from "../../lustre_dev_tools/error.d.mts";

export class Proxy extends _.CustomType {
  /** @deprecated */
  constructor(from: string, to: $uri.Uri$);
  /** @deprecated */
  from: string;
  /** @deprecated */
  to: $uri.Uri$;
}
export function Proxy$Proxy(from: string, to: $uri.Uri$): Proxy$;
export function Proxy$isProxy(value: Proxy$): boolean;
export function Proxy$Proxy$0(value: Proxy$): string;
export function Proxy$Proxy$from(value: Proxy$): string;
export function Proxy$Proxy$1(value: Proxy$): $uri.Uri$;
export function Proxy$Proxy$to(value: Proxy$): $uri.Uri$;

export class None extends _.CustomType {}
export function Proxy$None(): Proxy$;
export function Proxy$isNone(value: Proxy$): boolean;

export type Proxy$ = Proxy | None;

export function new$(from: string, to: string): _.Result<Proxy$, $error.Error$>;

export function handle(
  request: $request.Request$<$internal.Connection$>,
  proxy: Proxy$,
  next: () => $response.Response$<$wisp.Body$>
): $response.Response$<$wisp.Body$>;
