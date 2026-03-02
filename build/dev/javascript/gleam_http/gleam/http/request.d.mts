import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $uri from "../../../gleam_stdlib/gleam/uri.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $http from "../../gleam/http.d.mts";

export class Request<FSB> extends _.CustomType {
  /** @deprecated */
  constructor(
    method: $http.Method$,
    headers: _.List<[string, string]>,
    body: FSB,
    scheme: $http.Scheme$,
    host: string,
    port: $option.Option$<number>,
    path: string,
    query: $option.Option$<string>
  );
  /** @deprecated */
  method: $http.Method$;
  /** @deprecated */
  headers: _.List<[string, string]>;
  /** @deprecated */
  body: FSB;
  /** @deprecated */
  scheme: $http.Scheme$;
  /** @deprecated */
  host: string;
  /** @deprecated */
  port: $option.Option$<number>;
  /** @deprecated */
  path: string;
  /** @deprecated */
  query: $option.Option$<string>;
}
export function Request$Request<FSB>(
  method: $http.Method$,
  headers: _.List<[string, string]>,
  body: FSB,
  scheme: $http.Scheme$,
  host: string,
  port: $option.Option$<number>,
  path: string,
  query: $option.Option$<string>,
): Request$<FSB>;
export function Request$isRequest<FSB>(value: Request$<FSB>): boolean;
export function Request$Request$0<FSB>(value: Request$<FSB>): $http.Method$;
export function Request$Request$method<FSB>(value: Request$<FSB>): $http.Method$;
export function Request$Request$1<FSB>(
  value: Request$<FSB>,
): _.List<[string, string]>;
export function Request$Request$headers<FSB>(value: Request$<FSB>): _.List<
  [string, string]
>;
export function Request$Request$2<FSB>(value: Request$<FSB>): FSB;
export function Request$Request$body<FSB>(value: Request$<FSB>): FSB;
export function Request$Request$3<FSB>(value: Request$<FSB>): $http.Scheme$;
export function Request$Request$scheme<FSB>(value: Request$<FSB>): $http.Scheme$;
export function Request$Request$4<FSB>(
  value: Request$<FSB>,
): string;
export function Request$Request$host<FSB>(value: Request$<FSB>): string;
export function Request$Request$5<FSB>(value: Request$<FSB>): $option.Option$<
  number
>;
export function Request$Request$port<FSB>(value: Request$<FSB>): $option.Option$<
  number
>;
export function Request$Request$6<FSB>(value: Request$<FSB>): string;
export function Request$Request$path<FSB>(value: Request$<FSB>): string;
export function Request$Request$7<FSB>(value: Request$<FSB>): $option.Option$<
  string
>;
export function Request$Request$query<FSB>(value: Request$<FSB>): $option.Option$<
  string
>;

export type Request$<FSB> = Request<FSB>;

export function to_uri(request: Request$<any>): $uri.Uri$;

export function from_uri(uri: $uri.Uri$): _.Result<Request$<string>, undefined>;

export function get_header(request: Request$<any>, key: string): _.Result<
  string,
  undefined
>;

export function set_header<FSL>(
  request: Request$<FSL>,
  key: string,
  value: string
): Request$<FSL>;

export function prepend_header<FSO>(
  request: Request$<FSO>,
  key: string,
  value: string
): Request$<FSO>;

export function set_body<FST>(req: Request$<any>, body: FST): Request$<FST>;

export function map<FSV, FSX>(
  request: Request$<FSV>,
  transform: (x0: FSV) => FSX
): Request$<FSX>;

export function path_segments(request: Request$<any>): _.List<string>;

export function get_query(request: Request$<any>): _.Result<
  _.List<[string, string]>,
  undefined
>;

export function set_query<FTH>(
  req: Request$<FTH>,
  query: _.List<[string, string]>
): Request$<FTH>;

export function set_method<FTL>(req: Request$<FTL>, method: $http.Method$): Request$<
  FTL
>;

export function new$(): Request$<string>;

export function to(url: string): _.Result<Request$<string>, undefined>;

export function set_scheme<FTS>(req: Request$<FTS>, scheme: $http.Scheme$): Request$<
  FTS
>;

export function set_host<FTV>(req: Request$<FTV>, host: string): Request$<FTV>;

export function set_port<FTY>(req: Request$<FTY>, port: number): Request$<FTY>;

export function set_path<FUB>(req: Request$<FUB>, path: string): Request$<FUB>;

export function set_cookie<FUE>(req: Request$<FUE>, name: string, value: string): Request$<
  FUE
>;

export function get_cookies(req: Request$<any>): _.List<[string, string]>;

export function remove_cookie<FUK>(req: Request$<FUK>, name: string): Request$<
  FUK
>;
