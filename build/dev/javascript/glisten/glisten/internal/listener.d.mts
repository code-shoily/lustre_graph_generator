import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $socket from "../../glisten/socket.d.mts";
import type * as $options from "../../glisten/socket/options.d.mts";
import type * as $transport from "../../glisten/transport.d.mts";

export class Info extends _.CustomType {
  /** @deprecated */
  constructor(caller: $process.Subject$<State$>);
  /** @deprecated */
  caller: $process.Subject$<State$>;
}
export function Message$Info(caller: $process.Subject$<State$>): Message$;
export function Message$isInfo(value: Message$): boolean;
export function Message$Info$0(value: Message$): $process.Subject$<State$>;
export function Message$Info$caller(value: Message$): $process.Subject$<State$>;

export type Message$ = Info;

export class State extends _.CustomType {
  /** @deprecated */
  constructor(
    listen_socket: $socket.ListenSocket$,
    port: number,
    ip_address: $options.IpAddress$
  );
  /** @deprecated */
  listen_socket: $socket.ListenSocket$;
  /** @deprecated */
  port: number;
  /** @deprecated */
  ip_address: $options.IpAddress$;
}
export function State$State(
  listen_socket: $socket.ListenSocket$,
  port: number,
  ip_address: $options.IpAddress$,
): State$;
export function State$isState(value: State$): boolean;
export function State$State$0(value: State$): $socket.ListenSocket$;
export function State$State$listen_socket(value: State$): $socket.ListenSocket$;
export function State$State$1(value: State$): number;
export function State$State$port(value: State$): number;
export function State$State$2(value: State$): $options.IpAddress$;
export function State$State$ip_address(value: State$): $options.IpAddress$;

export type State$ = State;

export function start(
  port: number,
  transport: $transport.Transport$,
  options: _.List<$options.TcpOption$>,
  name: $process.Name$<Message$>
): _.Result<$actor.Started$<$process.Subject$<Message$>>, $actor.StartError$>;
