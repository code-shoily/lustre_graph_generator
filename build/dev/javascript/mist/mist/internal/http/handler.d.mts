import type * as $exception from "../../../../exception/exception.d.mts";
import type * as $process from "../../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $request from "../../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../../gleam_http/gleam/http/response.d.mts";
import type * as $bytes_tree from "../../../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $option from "../../../../gleam_stdlib/gleam/option.d.mts";
import type * as $yielder from "../../../../gleam_yielder/gleam/yielder.d.mts";
import type * as $handler from "../../../../glisten/glisten/internal/handler.d.mts";
import type * as $socket from "../../../../glisten/glisten/socket.d.mts";
import type * as $transport from "../../../../glisten/glisten/transport.d.mts";
import type * as _ from "../../../gleam.d.mts";
import type * as $http from "../../../mist/internal/http.d.mts";

export class State extends _.CustomType {
  /** @deprecated */
  constructor(idle_timer: $option.Option$<$process.Timer$>);
  /** @deprecated */
  idle_timer: $option.Option$<$process.Timer$>;
}
export function State$State(
  idle_timer: $option.Option$<$process.Timer$>,
): State$;
export function State$isState(value: State$): boolean;
export function State$State$0(value: State$): $option.Option$<$process.Timer$>;
export function State$State$idle_timer(value: State$): $option.Option$<
  $process.Timer$
>;

export type State$ = State;

export function initial_state(): State$;

export function call(
  req: $request.Request$<$http.Connection$>,
  handler: (x0: $request.Request$<$http.Connection$>) => $response.Response$<
    $http.ResponseData$
  >,
  conn: $http.Connection$,
  sender: $process.Subject$<$handler.Message$<any>>,
  version: $http.HttpVersion$
): _.Result<State$, _.Result<undefined, string>>;
