import type * as $atom from "../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $process from "../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $bytes_tree from "../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $socket from "../glisten/socket.d.mts";
import type * as $options from "../glisten/socket/options.d.mts";

export class Tcp extends _.CustomType {}
export function Transport$Tcp(): Transport$;
export function Transport$isTcp(value: Transport$): boolean;

export class Ssl extends _.CustomType {}
export function Transport$Ssl(): Transport$;
export function Transport$isSsl(value: Transport$): boolean;

export type Transport$ = Tcp | Ssl;

export function controlling_process(
  transport: Transport$,
  socket: $socket.Socket$,
  pid: $process.Pid$
): _.Result<undefined, $atom.Atom$>;

export function listen(
  transport: Transport$,
  port: number,
  opts: _.List<$options.TcpOption$>
): _.Result<$socket.ListenSocket$, $socket.SocketReason$>;

export function accept_timeout(
  transport: Transport$,
  socket: $socket.ListenSocket$,
  timeout: number
): _.Result<$socket.Socket$, $socket.SocketReason$>;

export function accept(transport: Transport$, socket: $socket.ListenSocket$): _.Result<
  $socket.Socket$,
  $socket.SocketReason$
>;

export function handshake(transport: Transport$, socket: $socket.Socket$): _.Result<
  $socket.Socket$,
  undefined
>;

export function receive_timeout(
  transport: Transport$,
  socket: $socket.Socket$,
  amount: number,
  timeout: number
): _.Result<_.BitArray, $socket.SocketReason$>;

export function receive(
  transport: Transport$,
  socket: $socket.Socket$,
  amount: number
): _.Result<_.BitArray, $socket.SocketReason$>;

export function send(
  transport: Transport$,
  socket: $socket.Socket$,
  data: $bytes_tree.BytesTree$
): _.Result<undefined, $socket.SocketReason$>;

export function close(transport: Transport$, socket: $socket.Socket$): _.Result<
  undefined,
  $socket.SocketReason$
>;

export function shutdown(transport: Transport$, socket: $socket.Socket$): _.Result<
  undefined,
  $socket.SocketReason$
>;

export function set_opts(
  transport: Transport$,
  socket: $socket.Socket$,
  opts: _.List<$options.TcpOption$>
): _.Result<undefined, undefined>;

export function negotiated_protocol(
  transport: Transport$,
  socket: $socket.Socket$
): _.Result<string, string>;

export function decode_ip(): $decode.Decoder$<$options.IpAddress$>;

export function peername(transport: Transport$, socket: $socket.Socket$): _.Result<
  [$options.IpAddress$, number],
  undefined
>;

export function socket_info(socket: $socket.Socket$): $dict.Dict$<
  $atom.Atom$,
  $dynamic.Dynamic$
>;

export function get_socket_opts(
  transport: Transport$,
  socket: $socket.Socket$,
  opts: _.List<$atom.Atom$>
): _.Result<_.List<[$atom.Atom$, $dynamic.Dynamic$]>, undefined>;

export function set_buffer_size(transport: Transport$, socket: $socket.Socket$): _.Result<
  undefined,
  undefined
>;

export function sockname(transport: Transport$, socket: $socket.ListenSocket$): _.Result<
  [$options.IpAddress$, number],
  $socket.SocketReason$
>;
