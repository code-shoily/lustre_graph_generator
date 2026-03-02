import type * as $atom from "../../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Start extends _.CustomType {}
export function Event$Start(): Event$;
export function Event$isStart(value: Event$): boolean;

export class Stop extends _.CustomType {}
export function Event$Stop(): Event$;
export function Event$isStop(value: Event$): boolean;

export class Mist extends _.CustomType {}
export function Event$Mist(): Event$;
export function Event$isMist(value: Event$): boolean;

export class ParseRequest extends _.CustomType {}
export function Event$ParseRequest(): Event$;
export function Event$isParseRequest(value: Event$): boolean;

export class ParseRequest2 extends _.CustomType {}
export function Event$ParseRequest2(): Event$;
export function Event$isParseRequest2(value: Event$): boolean;

export class DecodePacket extends _.CustomType {}
export function Event$DecodePacket(): Event$;
export function Event$isDecodePacket(value: Event$): boolean;

export class ConvertPath extends _.CustomType {}
export function Event$ConvertPath(): Event$;
export function Event$isConvertPath(value: Event$): boolean;

export class ParseMethod extends _.CustomType {}
export function Event$ParseMethod(): Event$;
export function Event$isParseMethod(value: Event$): boolean;

export class ParseHeaders extends _.CustomType {}
export function Event$ParseHeaders(): Event$;
export function Event$isParseHeaders(value: Event$): boolean;

export class ParseRest extends _.CustomType {}
export function Event$ParseRest(): Event$;
export function Event$isParseRest(value: Event$): boolean;

export class ParsePath extends _.CustomType {}
export function Event$ParsePath(): Event$;
export function Event$isParsePath(value: Event$): boolean;

export class ParseTransport extends _.CustomType {}
export function Event$ParseTransport(): Event$;
export function Event$isParseTransport(value: Event$): boolean;

export class ParseHost extends _.CustomType {}
export function Event$ParseHost(): Event$;
export function Event$isParseHost(value: Event$): boolean;

export class ParsePort extends _.CustomType {}
export function Event$ParsePort(): Event$;
export function Event$isParsePort(value: Event$): boolean;

export class BuildRequest extends _.CustomType {}
export function Event$BuildRequest(): Event$;
export function Event$isBuildRequest(value: Event$): boolean;

export class ReadData extends _.CustomType {}
export function Event$ReadData(): Event$;
export function Event$isReadData(value: Event$): boolean;

export class Http1Handler extends _.CustomType {}
export function Event$Http1Handler(): Event$;
export function Event$isHttp1Handler(value: Event$): boolean;

export class HttpUpgrade extends _.CustomType {}
export function Event$HttpUpgrade(): Event$;
export function Event$isHttpUpgrade(value: Event$): boolean;

export class Http2Handler extends _.CustomType {}
export function Event$Http2Handler(): Event$;
export function Event$isHttp2Handler(value: Event$): boolean;

export type Event$ = Start | Stop | Mist | ParseRequest | ParseRequest2 | DecodePacket | ConvertPath | ParseMethod | ParseHeaders | ParseRest | ParsePath | ParseTransport | ParseHost | ParsePort | BuildRequest | ReadData | Http1Handler | HttpUpgrade | Http2Handler;

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

export function span<ADHY>(
  path: _.List<Event$>,
  metadata: $dict.Dict$<string, $dynamic.Dynamic$>,
  wrapping: () => ADHY
): ADHY;

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
