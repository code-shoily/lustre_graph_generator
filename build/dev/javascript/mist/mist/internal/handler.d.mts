import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $request from "../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $glisten from "../../../glisten/glisten.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $http from "../../mist/internal/http.d.mts";
import type * as $handler from "../../mist/internal/http/handler.d.mts";
import type * as $handler from "../../mist/internal/http2/handler.d.mts";
import type * as $stream from "../../mist/internal/http2/stream.d.mts";

export class InvalidRequest extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $http.DecodeError$);
  /** @deprecated */
  0: $http.DecodeError$;
}
export function HandlerError$InvalidRequest(
  $0: $http.DecodeError$,
): HandlerError$;
export function HandlerError$isInvalidRequest(value: HandlerError$): boolean;
export function HandlerError$InvalidRequest$0(value: HandlerError$): $http.DecodeError$;

export class NotFound extends _.CustomType {}
export function HandlerError$NotFound(): HandlerError$;
export function HandlerError$isNotFound(value: HandlerError$): boolean;

export type HandlerError$ = InvalidRequest | NotFound;

export class Http1 extends _.CustomType {
  /** @deprecated */
  constructor(
    state: $http_handler.State$,
    self: $process.Subject$<$stream.SendMessage$>
  );
  /** @deprecated */
  state: $http_handler.State$;
  /** @deprecated */
  self: $process.Subject$<$stream.SendMessage$>;
}
export function State$Http1(
  state: $http_handler.State$,
  self: $process.Subject$<$stream.SendMessage$>,
): State$;
export function State$isHttp1(value: State$): boolean;
export function State$Http1$0(value: State$): $http_handler.State$;
export function State$Http1$state(value: State$): $http_handler.State$;
export function State$Http1$1(value: State$): $process.Subject$<
  $stream.SendMessage$
>;
export function State$Http1$self(value: State$): $process.Subject$<
  $stream.SendMessage$
>;

export class Http2 extends _.CustomType {
  /** @deprecated */
  constructor(state: $http2_handler.State$);
  /** @deprecated */
  state: $http2_handler.State$;
}
export function State$Http2(state: $http2_handler.State$): State$;
export function State$isHttp2(value: State$): boolean;
export function State$Http2$0(value: State$): $http2_handler.State$;
export function State$Http2$state(value: State$): $http2_handler.State$;

export type State$ = Http1 | Http2;

export function new_state(subj: $process.Subject$<$stream.SendMessage$>): State$;

export function init(x0: any): [
  State$,
  $option.Option$<$process.Selector$<$stream.SendMessage$>>
];

export function with_func(
  handler: (x0: $request.Request$<$http.Connection$>) => $response.Response$<
    $http.ResponseData$
  >
): (
  x0: State$,
  x1: $glisten.Message$<$stream.SendMessage$>,
  x2: $glisten.Connection$<$stream.SendMessage$>
) => $glisten.Next$<State$, $glisten.Message$<$stream.SendMessage$>>;
