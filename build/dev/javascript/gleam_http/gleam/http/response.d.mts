import type * as _ from "../../gleam.d.mts";
import type * as $cookie from "../../gleam/http/cookie.d.mts";

export class Response<GCF> extends _.CustomType {
  /** @deprecated */
  constructor(status: number, headers: _.List<[string, string]>, body: GCF);
  /** @deprecated */
  status: number;
  /** @deprecated */
  headers: _.List<[string, string]>;
  /** @deprecated */
  body: GCF;
}
export function Response$Response<GCF>(
  status: number,
  headers: _.List<[string, string]>,
  body: GCF,
): Response$<GCF>;
export function Response$isResponse<GCF>(value: Response$<GCF>): boolean;
export function Response$Response$0<GCF>(value: Response$<GCF>): number;
export function Response$Response$status<GCF>(value: Response$<GCF>): number;
export function Response$Response$1<GCF>(value: Response$<GCF>): _.List<
  [string, string]
>;
export function Response$Response$headers<GCF>(value: Response$<GCF>): _.List<
  [string, string]
>;
export function Response$Response$2<GCF>(value: Response$<GCF>): GCF;
export function Response$Response$body<GCF>(value: Response$<GCF>): GCF;

export type Response$<GCF> = Response<GCF>;

export function new$(status: number): Response$<string>;

export function get_header(response: Response$<any>, key: string): _.Result<
  string,
  undefined
>;

export function set_header<GCU>(
  response: Response$<GCU>,
  key: string,
  value: string
): Response$<GCU>;

export function prepend_header<GCX>(
  response: Response$<GCX>,
  key: string,
  value: string
): Response$<GCX>;

export function set_body<GDC>(response: Response$<any>, body: GDC): Response$<
  GDC
>;

export function try_map<GCG, GCI, GCJ>(
  response: Response$<GCG>,
  transform: (x0: GCG) => _.Result<GCI, GCJ>
): _.Result<Response$<GCI>, GCJ>;

export function map<GDE, GDG>(
  response: Response$<GDE>,
  transform: (x0: GDE) => GDG
): Response$<GDG>;

export function redirect(uri: string): Response$<string>;

export function get_cookies(resp: Response$<any>): _.List<[string, string]>;

export function set_cookie<GDM>(
  response: Response$<GDM>,
  name: string,
  value: string,
  attributes: $cookie.Attributes$
): Response$<GDM>;

export function expire_cookie<GDP>(
  response: Response$<GDP>,
  name: string,
  attributes: $cookie.Attributes$
): Response$<GDP>;
