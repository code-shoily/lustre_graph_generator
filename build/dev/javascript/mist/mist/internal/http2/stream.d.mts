import type * as $process from "../../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $request from "../../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../../gleam_http/gleam/http/response.d.mts";
import type * as $actor from "../../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $option from "../../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../../gleam.d.mts";
import type * as $http from "../../../mist/internal/http.d.mts";
import type * as $frame from "../../../mist/internal/http2/frame.d.mts";

export class Ready extends _.CustomType {}
export function Message$Ready(): Message$;
export function Message$isReady(value: Message$): boolean;

export class Data extends _.CustomType {
  /** @deprecated */
  constructor(bits: _.BitArray, end: boolean);
  /** @deprecated */
  bits: _.BitArray;
  /** @deprecated */
  end: boolean;
}
export function Message$Data(bits: _.BitArray, end: boolean): Message$;
export function Message$isData(value: Message$): boolean;
export function Message$Data$0(value: Message$): _.BitArray;
export function Message$Data$bits(value: Message$): _.BitArray;
export function Message$Data$1(value: Message$): boolean;
export function Message$Data$end(value: Message$): boolean;

export class Done extends _.CustomType {}
export function Message$Done(): Message$;
export function Message$isDone(value: Message$): boolean;

export type Message$ = Ready | Data | Done;

export class Send extends _.CustomType {
  /** @deprecated */
  constructor(
    identifier: $frame.StreamIdentifier$<$frame.Frame$>,
    resp: $response.Response$<$http.ResponseData$>
  );
  /** @deprecated */
  identifier: $frame.StreamIdentifier$<$frame.Frame$>;
  /** @deprecated */
  resp: $response.Response$<$http.ResponseData$>;
}
export function SendMessage$Send(
  identifier: $frame.StreamIdentifier$<$frame.Frame$>,
  resp: $response.Response$<$http.ResponseData$>,
): SendMessage$;
export function SendMessage$isSend(value: SendMessage$): boolean;
export function SendMessage$Send$0(value: SendMessage$): $frame.StreamIdentifier$<
  $frame.Frame$
>;
export function SendMessage$Send$identifier(value: SendMessage$): $frame.StreamIdentifier$<
  $frame.Frame$
>;
export function SendMessage$Send$1(value: SendMessage$): $response.Response$<
  $http.ResponseData$
>;
export function SendMessage$Send$resp(value: SendMessage$): $response.Response$<
  $http.ResponseData$
>;

export type SendMessage$ = Send;

export class Open extends _.CustomType {}
export function StreamState$Open(): StreamState$;
export function StreamState$isOpen(value: StreamState$): boolean;

export class RemoteClosed extends _.CustomType {}
export function StreamState$RemoteClosed(): StreamState$;
export function StreamState$isRemoteClosed(value: StreamState$): boolean;

export class LocalClosed extends _.CustomType {}
export function StreamState$LocalClosed(): StreamState$;
export function StreamState$isLocalClosed(value: StreamState$): boolean;

export class Closed extends _.CustomType {}
export function StreamState$Closed(): StreamState$;
export function StreamState$isClosed(value: StreamState$): boolean;

export type StreamState$ = Open | RemoteClosed | LocalClosed | Closed;

export class State extends _.CustomType {
  /** @deprecated */
  constructor(
    id: $frame.StreamIdentifier$<$frame.Frame$>,
    state: StreamState$,
    subject: $process.Subject$<Message$>,
    receive_window_size: number,
    send_window_size: number,
    pending_content_length: $option.Option$<number>
  );
  /** @deprecated */
  id: $frame.StreamIdentifier$<$frame.Frame$>;
  /** @deprecated */
  state: StreamState$;
  /** @deprecated */
  subject: $process.Subject$<Message$>;
  /** @deprecated */
  receive_window_size: number;
  /** @deprecated */
  send_window_size: number;
  /** @deprecated */
  pending_content_length: $option.Option$<number>;
}
export function State$State(
  id: $frame.StreamIdentifier$<$frame.Frame$>,
  state: StreamState$,
  subject: $process.Subject$<Message$>,
  receive_window_size: number,
  send_window_size: number,
  pending_content_length: $option.Option$<number>,
): State$;
export function State$isState(value: State$): boolean;
export function State$State$0(value: State$): $frame.StreamIdentifier$<
  $frame.Frame$
>;
export function State$State$id(value: State$): $frame.StreamIdentifier$<
  $frame.Frame$
>;
export function State$State$1(value: State$): StreamState$;
export function State$State$state(value: State$): StreamState$;
export function State$State$2(value: State$): $process.Subject$<Message$>;
export function State$State$subject(value: State$): $process.Subject$<Message$>;
export function State$State$3(value: State$): number;
export function State$State$receive_window_size(value: State$): number;
export function State$State$4(value: State$): number;
export function State$State$send_window_size(value: State$): number;
export function State$State$5(value: State$): $option.Option$<number>;
export function State$State$pending_content_length(value: State$): $option.Option$<
  number
>;

export type State$ = State;

export class InternalState extends _.CustomType {
  /** @deprecated */
  constructor(
    data_selector: $process.Selector$<Message$>,
    data_subject: $process.Subject$<Message$>,
    end: boolean,
    pending_response: $option.Option$<$response.Response$<$http.ResponseData$>>,
    to_remove: _.BitArray
  );
  /** @deprecated */
  data_selector: $process.Selector$<Message$>;
  /** @deprecated */
  data_subject: $process.Subject$<Message$>;
  /** @deprecated */
  end: boolean;
  /** @deprecated */
  pending_response: $option.Option$<$response.Response$<$http.ResponseData$>>;
  /** @deprecated */
  to_remove: _.BitArray;
}
export function InternalState$InternalState(
  data_selector: $process.Selector$<Message$>,
  data_subject: $process.Subject$<Message$>,
  end: boolean,
  pending_response: $option.Option$<$response.Response$<$http.ResponseData$>>,
  to_remove: _.BitArray,
): InternalState$;
export function InternalState$isInternalState(value: InternalState$): boolean;
export function InternalState$InternalState$0(value: InternalState$): $process.Selector$<
  Message$
>;
export function InternalState$InternalState$data_selector(value: InternalState$): $process.Selector$<
  Message$
>;
export function InternalState$InternalState$1(value: InternalState$): $process.Subject$<
  Message$
>;
export function InternalState$InternalState$data_subject(value: InternalState$): $process.Subject$<
  Message$
>;
export function InternalState$InternalState$2(value: InternalState$): boolean;
export function InternalState$InternalState$end(value: InternalState$): boolean;
export function InternalState$InternalState$3(value: InternalState$): $option.Option$<
  $response.Response$<$http.ResponseData$>
>;
export function InternalState$InternalState$pending_response(value: InternalState$): $option.Option$<
  $response.Response$<$http.ResponseData$>
>;
export function InternalState$InternalState$4(value: InternalState$): _.BitArray;
export function InternalState$InternalState$to_remove(
  value: InternalState$,
): _.BitArray;

export type InternalState$ = InternalState;

export function make_request(
  headers: _.List<[string, string]>,
  req: $request.Request$<$http.Connection$>
): _.Result<$request.Request$<$http.Connection$>, undefined>;

export function new$(
  identifier: $frame.StreamIdentifier$<$frame.Frame$>,
  handler: (x0: $request.Request$<$http.Connection$>) => $response.Response$<
    $http.ResponseData$
  >,
  headers: _.List<[string, string]>,
  connection: $http.Connection$,
  sender: $process.Subject$<SendMessage$>,
  end: boolean
): _.Result<$actor.Started$<$process.Subject$<Message$>>, $actor.StartError$>;

export function receive_data(state: State$, size: number): [State$, number];
