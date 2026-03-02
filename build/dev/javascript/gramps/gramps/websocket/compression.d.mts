import type * as $atom from "../../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $bytes_tree from "../../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as _ from "../../gleam.d.mts";

export type CompressionContext$ = any;

export class Context extends _.CustomType {
  /** @deprecated */
  constructor(context: CompressionContext$, no_takeover: boolean);
  /** @deprecated */
  context: CompressionContext$;
  /** @deprecated */
  no_takeover: boolean;
}
export function Context$Context(
  context: CompressionContext$,
  no_takeover: boolean,
): Context$;
export function Context$isContext(value: Context$): boolean;
export function Context$Context$0(value: Context$): CompressionContext$;
export function Context$Context$context(value: Context$): CompressionContext$;
export function Context$Context$1(value: Context$): boolean;
export function Context$Context$no_takeover(value: Context$): boolean;

export type Context$ = Context;

declare class Sync extends _.CustomType {}

type Flush$ = Sync;

declare class Deflated extends _.CustomType {}

type Deflated$ = Deflated;

declare class Default extends _.CustomType {}

type Default$ = Default;

export class ContextTakeover extends _.CustomType {
  /** @deprecated */
  constructor(no_client: boolean, no_server: boolean);
  /** @deprecated */
  no_client: boolean;
  /** @deprecated */
  no_server: boolean;
}
export function ContextTakeover$ContextTakeover(
  no_client: boolean,
  no_server: boolean,
): ContextTakeover$;
export function ContextTakeover$isContextTakeover(
  value: ContextTakeover$,
): boolean;
export function ContextTakeover$ContextTakeover$0(value: ContextTakeover$): boolean;
export function ContextTakeover$ContextTakeover$no_client(
  value: ContextTakeover$,
): boolean;
export function ContextTakeover$ContextTakeover$1(value: ContextTakeover$): boolean;
export function ContextTakeover$ContextTakeover$no_server(
  value: ContextTakeover$,
): boolean;

export type ContextTakeover$ = ContextTakeover;

export class Compression extends _.CustomType {
  /** @deprecated */
  constructor(inflate: Context$, deflate: Context$);
  /** @deprecated */
  inflate: Context$;
  /** @deprecated */
  deflate: Context$;
}
export function Compression$Compression(
  inflate: Context$,
  deflate: Context$,
): Compression$;
export function Compression$isCompression(value: Compression$): boolean;
export function Compression$Compression$0(value: Compression$): Context$;
export function Compression$Compression$inflate(value: Compression$): Context$;
export function Compression$Compression$1(value: Compression$): Context$;
export function Compression$Compression$deflate(value: Compression$): Context$;

export type Compression$ = Compression;

export function init(takeover: ContextTakeover$): Compression$;

export function set_controlling_process(context: Context$, pid: $process.Pid$): $atom.Atom$;

export function close(context: Context$): undefined;

export function inflate(context: Context$, data: _.BitArray): _.BitArray;

export function deflate(context: Context$, data: _.BitArray): _.BitArray;
