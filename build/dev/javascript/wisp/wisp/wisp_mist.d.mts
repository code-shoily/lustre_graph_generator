import type * as $request from "../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../gleam_http/gleam/http/response.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $mist from "../../mist/mist.d.mts";
import type * as $http from "../../mist/mist/internal/http.d.mts";
import type * as $wisp from "../wisp.d.mts";
import type * as $internal from "../wisp/internal.d.mts";

export function handler(
  handler: (x0: $request.Request$<$internal.Connection$>) => $response.Response$<
    $wisp.Body$
  >,
  secret_key_base: string
): (x0: $request.Request$<$http.Connection$>) => $response.Response$<
  $mist.ResponseData$
>;
