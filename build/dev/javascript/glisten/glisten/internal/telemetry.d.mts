import type * as $atom from "../../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Data extends _.CustomType {
  /** @deprecated */
  constructor(latency: number, metadata: $dict.Dict$<string, $dynamic.Dynamic$>);
  /** @deprecated */
  latency: number;
  /** @deprecated */
  metadata: $dict.Dict$<string, $dynamic.Dynamic$>;
}
export function Data$Data(
  latency: number,
  metadata: $dict.Dict$<string, $dynamic.Dynamic$>,
): Data$;
export function Data$isData(value: Data$): boolean;
export function Data$Data$0(value: Data$): number;
export function Data$Data$latency(value: Data$): number;
export function Data$Data$1(value: Data$): $dict.Dict$<
  string,
  $dynamic.Dynamic$
>;
export function Data$Data$metadata(value: Data$): $dict.Dict$<
  string,
  $dynamic.Dynamic$
>;

export type Data$ = Data;

export class Start extends _.CustomType {}
export function Event$Start(): Event$;
export function Event$isStart(value: Event$): boolean;

export class Stop extends _.CustomType {}
export function Event$Stop(): Event$;
export function Event$isStop(value: Event$): boolean;

export class Glisten extends _.CustomType {}
export function Event$Glisten(): Event$;
export function Event$isGlisten(value: Event$): boolean;

export class Handshake extends _.CustomType {}
export function Event$Handshake(): Event$;
export function Event$isHandshake(value: Event$): boolean;

export class HandlerLoop extends _.CustomType {}
export function Event$HandlerLoop(): Event$;
export function Event$isHandlerLoop(value: Event$): boolean;

export class Listener extends _.CustomType {}
export function Event$Listener(): Event$;
export function Event$isListener(value: Event$): boolean;

export class Acceptor extends _.CustomType {}
export function Event$Acceptor(): Event$;
export function Event$isAcceptor(value: Event$): boolean;

export class HandlerStart extends _.CustomType {}
export function Event$HandlerStart(): Event$;
export function Event$isHandlerStart(value: Event$): boolean;

export class HandlerInit extends _.CustomType {}
export function Event$HandlerInit(): Event$;
export function Event$isHandlerInit(value: Event$): boolean;

export type Event$ = Start | Stop | Glisten | Handshake | HandlerLoop | Listener | Acceptor | HandlerStart | HandlerInit;

declare class Native extends _.CustomType {}

declare class Microsecond extends _.CustomType {}

type TimeUnit$ = Native | Microsecond;

export const events: _.List<_.List<Event$>>;

export function log(
  path: _.List<Event$>,
  measurements: $dict.Dict$<$atom.Atom$, $dynamic.Dynamic$>,
  x2: $dict.Dict$<string, $dynamic.Dynamic$>,
  x3: _.List<any>
): undefined;

export function span<PUU>(
  path: _.List<Event$>,
  metadata: $dict.Dict$<string, $dynamic.Dynamic$>,
  wrapping: () => PUU
): PUU;

export function attach_many(
  id: string,
  path: _.List<_.List<Event$>>,
  handler: (
    x0: _.List<Event$>,
    x1: $dict.Dict$<$atom.Atom$, $dynamic.Dynamic$>,
    x2: $dict.Dict$<string, $dynamic.Dynamic$>,
    x3: _.List<any>
  ) => undefined
): undefined;

export function attach(
  id: string,
  event: _.List<Event$>,
  handler: (
    x0: _.List<Event$>,
    x1: $dict.Dict$<$atom.Atom$, $dynamic.Dynamic$>,
    x2: $dict.Dict$<string, $dynamic.Dynamic$>,
    x3: _.List<any>
  ) => undefined,
  config: undefined
): undefined;

export function configure_logger(): undefined;
