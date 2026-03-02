import type * as $process from "../../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $request from "../../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../../gleam_http/gleam/http/response.d.mts";
import type * as $dict from "../../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../../gleam.d.mts";
import type * as $buffer from "../../../mist/internal/buffer.d.mts";
import type * as $http from "../../../mist/internal/http.d.mts";
import type * as $http2 from "../../../mist/internal/http2.d.mts";
import type * as $frame from "../../../mist/internal/http2/frame.d.mts";
import type * as $stream from "../../../mist/internal/http2/stream.d.mts";

export class PendingSend extends _.CustomType {}
export function PendingSend$PendingSend(): PendingSend$;
export function PendingSend$isPendingSend(value: PendingSend$): boolean;

export type PendingSend$ = PendingSend;

export class State extends _.CustomType {
  /** @deprecated */
  constructor(
    fragment: $option.Option$<$frame.Frame$>,
    frame_buffer: $buffer.Buffer$,
    pending_sends: _.List<PendingSend$>,
    receive_hpack_context: $http2.HpackContext$,
    self: $process.Subject$<$stream.SendMessage$>,
    send_hpack_context: $http2.HpackContext$,
    send_window_size: number,
    receive_window_size: number,
    settings: $http2.Http2Settings$,
    streams: $dict.Dict$<
      $frame.StreamIdentifier$<$frame.Frame$>,
      $stream.State$
    >
  );
  /** @deprecated */
  fragment: $option.Option$<$frame.Frame$>;
  /** @deprecated */
  frame_buffer: $buffer.Buffer$;
  /** @deprecated */
  pending_sends: _.List<PendingSend$>;
  /** @deprecated */
  receive_hpack_context: $http2.HpackContext$;
  /** @deprecated */
  self: $process.Subject$<$stream.SendMessage$>;
  /** @deprecated */
  send_hpack_context: $http2.HpackContext$;
  /** @deprecated */
  send_window_size: number;
  /** @deprecated */
  receive_window_size: number;
  /** @deprecated */
  settings: $http2.Http2Settings$;
  /** @deprecated */
  streams: $dict.Dict$<$frame.StreamIdentifier$<$frame.Frame$>, $stream.State$>;
}
export function State$State(
  fragment: $option.Option$<$frame.Frame$>,
  frame_buffer: $buffer.Buffer$,
  pending_sends: _.List<PendingSend$>,
  receive_hpack_context: $http2.HpackContext$,
  self: $process.Subject$<$stream.SendMessage$>,
  send_hpack_context: $http2.HpackContext$,
  send_window_size: number,
  receive_window_size: number,
  settings: $http2.Http2Settings$,
  streams: $dict.Dict$<$frame.StreamIdentifier$<$frame.Frame$>, $stream.State$>,
): State$;
export function State$isState(value: State$): boolean;
export function State$State$0(value: State$): $option.Option$<$frame.Frame$>;
export function State$State$fragment(value: State$): $option.Option$<
  $frame.Frame$
>;
export function State$State$1(value: State$): $buffer.Buffer$;
export function State$State$frame_buffer(value: State$): $buffer.Buffer$;
export function State$State$2(value: State$): _.List<PendingSend$>;
export function State$State$pending_sends(value: State$): _.List<PendingSend$>;
export function State$State$3(value: State$): $http2.HpackContext$;
export function State$State$receive_hpack_context(value: State$): $http2.HpackContext$;
export function State$State$4(
  value: State$,
): $process.Subject$<$stream.SendMessage$>;
export function State$State$self(value: State$): $process.Subject$<
  $stream.SendMessage$
>;
export function State$State$5(value: State$): $http2.HpackContext$;
export function State$State$send_hpack_context(value: State$): $http2.HpackContext$;
export function State$State$6(
  value: State$,
): number;
export function State$State$send_window_size(value: State$): number;
export function State$State$7(value: State$): number;
export function State$State$receive_window_size(value: State$): number;
export function State$State$8(value: State$): $http2.Http2Settings$;
export function State$State$settings(value: State$): $http2.Http2Settings$;
export function State$State$9(value: State$): $dict.Dict$<
  $frame.StreamIdentifier$<$frame.Frame$>,
  $stream.State$
>;
export function State$State$streams(value: State$): $dict.Dict$<
  $frame.StreamIdentifier$<$frame.Frame$>,
  $stream.State$
>;

export type State$ = State;

export function send_hpack_context(state: State$, context: $http2.HpackContext$): State$;

export function receive_hpack_context(
  state: State$,
  context: $http2.HpackContext$
): State$;

export function append_data(state: State$, data: _.BitArray): State$;

export function upgrade(
  data: _.BitArray,
  conn: $http.Connection$,
  self: $process.Subject$<$stream.SendMessage$>
): _.Result<State$, string>;

export function call(
  state: State$,
  conn: $http.Connection$,
  handler: (x0: $request.Request$<$http.Connection$>) => $response.Response$<
    $http.ResponseData$
  >
): _.Result<State$, _.Result<undefined, string>>;
