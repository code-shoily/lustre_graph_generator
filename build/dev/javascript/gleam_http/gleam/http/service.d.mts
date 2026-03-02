import type * as $http from "../../gleam/http.d.mts";
import type * as $request from "../../gleam/http/request.d.mts";
import type * as $response from "../../gleam/http/response.d.mts";

export type Service = (x0: $request.Request$<any>) => $response.Response$<any>;

export type Middleware = (
  x0: (x0: $request.Request$<any>) => $response.Response$<any>
) => (x0: $request.Request$<any>) => $response.Response$<any>;

export function map_response_body<GGB, GGC, GGE>(
  service: (x0: GGB) => $response.Response$<GGC>,
  mapper: (x0: GGC) => GGE
): (x0: GGB) => $response.Response$<GGE>;

export function prepend_response_header<GGG, GGH>(
  service: (x0: GGG) => $response.Response$<GGH>,
  key: string,
  value: string
): (x0: GGG) => $response.Response$<GGH>;

export function method_override<GGT, GGV>(
  service: (x0: $request.Request$<GGT>) => GGV
): (x0: $request.Request$<GGT>) => GGV;
