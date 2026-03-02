import type * as $atom from "../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $process from "../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $bytes_tree from "../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $socket from "../glisten/socket.d.mts";
import type * as $options from "../glisten/socket/options.d.mts";

export function controlling_process(socket: $socket.Socket$, pid: $process.Pid$): _.Result<
  undefined,
  $atom.Atom$
>;

export function accept_timeout(socket: $socket.ListenSocket$, timeout: number): _.Result<
  $socket.Socket$,
  $socket.SocketReason$
>;

export function accept(socket: $socket.ListenSocket$): _.Result<
  $socket.Socket$,
  $socket.SocketReason$
>;

export function receive_timeout(
  socket: $socket.Socket$,
  length: number,
  timeout: number
): _.Result<_.BitArray, $socket.SocketReason$>;

export function receive(socket: $socket.Socket$, length: number): _.Result<
  _.BitArray,
  $socket.SocketReason$
>;

export function send(socket: $socket.Socket$, packet: $bytes_tree.BytesTree$): _.Result<
  undefined,
  $socket.SocketReason$
>;

export function socket_info(socket: $socket.Socket$): $dict.Dict$<any, any>;

export function close(socket: any): _.Result<undefined, $socket.SocketReason$>;

export function do_shutdown(socket: $socket.Socket$, write: $atom.Atom$): _.Result<
  undefined,
  $socket.SocketReason$
>;

export function shutdown(socket: $socket.Socket$): _.Result<
  undefined,
  $socket.SocketReason$
>;

export function set_opts(
  socket: $socket.Socket$,
  opts: _.List<$options.TcpOption$>
): _.Result<undefined, undefined>;

export function listen(port: number, opts: _.List<$options.TcpOption$>): _.Result<
  $socket.ListenSocket$,
  $socket.SocketReason$
>;

export function handshake(socket: $socket.Socket$): _.Result<
  $socket.Socket$,
  undefined
>;

export function negotiated_protocol(socket: $socket.Socket$): any;

export function peername(socket: $socket.Socket$): _.Result<
  [$dynamic.Dynamic$, number],
  undefined
>;

export function get_socket_opts(
  socket: $socket.Socket$,
  opts: _.List<$atom.Atom$>
): _.Result<_.List<[$atom.Atom$, $dynamic.Dynamic$]>, undefined>;

export function sockname(socket: $socket.ListenSocket$): _.Result<
  [$dynamic.Dynamic$, number],
  $socket.SocketReason$
>;
