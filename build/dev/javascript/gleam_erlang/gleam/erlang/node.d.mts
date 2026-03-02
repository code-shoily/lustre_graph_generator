import type * as _ from "../../gleam.d.mts";
import type * as $atom from "../../gleam/erlang/atom.d.mts";

export type Node$ = any;

export class FailedToConnect extends _.CustomType {}
export function ConnectError$FailedToConnect(): ConnectError$;
export function ConnectError$isFailedToConnect(value: ConnectError$): boolean;

export class LocalNodeIsNotAlive extends _.CustomType {}
export function ConnectError$LocalNodeIsNotAlive(): ConnectError$;
export function ConnectError$isLocalNodeIsNotAlive(
  value: ConnectError$,
): boolean;

export type ConnectError$ = FailedToConnect | LocalNodeIsNotAlive;

export function self(): Node$;

export function visible(): _.List<Node$>;

export function connect(node: $atom.Atom$): _.Result<Node$, ConnectError$>;

export function name(node: Node$): $atom.Atom$;
