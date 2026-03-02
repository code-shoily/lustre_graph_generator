import type * as $process from "../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $http from "../gleam_http/gleam/http.d.mts";
import type * as $request from "../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../gleam_http/gleam/http/response.d.mts";
import type * as $actor from "../gleam_otp/gleam/otp/actor.d.mts";
import type * as $static_supervisor from "../gleam_otp/gleam/otp/static_supervisor.d.mts";
import type * as $supervision from "../gleam_otp/gleam/otp/supervision.d.mts";
import type * as $bytes_tree from "../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $string_tree from "../gleam_stdlib/gleam/string_tree.d.mts";
import type * as $yielder from "../gleam_yielder/gleam/yielder.d.mts";
import type * as $glisten from "../glisten/glisten.d.mts";
import type * as $socket from "../glisten/glisten/socket.d.mts";
import type * as $transport from "../glisten/glisten/transport.d.mts";
import type * as _ from "./gleam.d.mts";
import type * as $buffer from "./mist/internal/buffer.d.mts";
import type * as $file from "./mist/internal/file.d.mts";
import type * as $http from "./mist/internal/http.d.mts";
import type * as $next from "./mist/internal/next.d.mts";
import type * as $websocket from "./mist/internal/websocket.d.mts";

declare class Continue<ACJZ, ACKA> extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: ACJZ,
    argument$1: $option.Option$<$process.Selector$<any>>
  );
  /** @deprecated */
  0: ACJZ;
  /** @deprecated */
  1: $option.Option$<$process.Selector$<any>>;
}

declare class NormalStop extends _.CustomType {}

declare class AbnormalStop extends _.CustomType {
  /** @deprecated */
  constructor(reason: string);
  /** @deprecated */
  reason: string;
}

export type Next$<ACKA, ACJZ> = Continue<ACKA, ACJZ> | NormalStop | AbnormalStop;

export class IpV4 extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: number,
    argument$1: number,
    argument$2: number,
    argument$3: number
  );
  /** @deprecated */
  0: number;
  /** @deprecated */
  1: number;
  /** @deprecated */
  2: number;
  /** @deprecated */
  3: number;
}
export function IpAddress$IpV4(
  $0: number,
  $1: number,
  $2: number,
  $3: number,
): IpAddress$;
export function IpAddress$isIpV4(value: IpAddress$): boolean;
export function IpAddress$IpV4$0(value: IpAddress$): number;
export function IpAddress$IpV4$1(value: IpAddress$): number;
export function IpAddress$IpV4$2(value: IpAddress$): number;
export function IpAddress$IpV4$3(value: IpAddress$): number;

export class IpV6 extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: number,
    argument$1: number,
    argument$2: number,
    argument$3: number,
    argument$4: number,
    argument$5: number,
    argument$6: number,
    argument$7: number
  );
  /** @deprecated */
  0: number;
  /** @deprecated */
  1: number;
  /** @deprecated */
  2: number;
  /** @deprecated */
  3: number;
  /** @deprecated */
  4: number;
  /** @deprecated */
  5: number;
  /** @deprecated */
  6: number;
  /** @deprecated */
  7: number;
}
export function IpAddress$IpV6(
  $0: number,
  $1: number,
  $2: number,
  $3: number,
  $4: number,
  $5: number,
  $6: number,
  $7: number,
): IpAddress$;
export function IpAddress$isIpV6(value: IpAddress$): boolean;
export function IpAddress$IpV6$0(value: IpAddress$): number;
export function IpAddress$IpV6$1(value: IpAddress$): number;
export function IpAddress$IpV6$2(value: IpAddress$): number;
export function IpAddress$IpV6$3(value: IpAddress$): number;
export function IpAddress$IpV6$4(value: IpAddress$): number;
export function IpAddress$IpV6$5(value: IpAddress$): number;
export function IpAddress$IpV6$6(value: IpAddress$): number;
export function IpAddress$IpV6$7(value: IpAddress$): number;

export type IpAddress$ = IpV4 | IpV6;

export class ConnectionInfo extends _.CustomType {
  /** @deprecated */
  constructor(port: number, ip_address: IpAddress$);
  /** @deprecated */
  port: number;
  /** @deprecated */
  ip_address: IpAddress$;
}
export function ConnectionInfo$ConnectionInfo(
  port: number,
  ip_address: IpAddress$,
): ConnectionInfo$;
export function ConnectionInfo$isConnectionInfo(
  value: ConnectionInfo$,
): boolean;
export function ConnectionInfo$ConnectionInfo$0(value: ConnectionInfo$): number;
export function ConnectionInfo$ConnectionInfo$port(value: ConnectionInfo$): number;
export function ConnectionInfo$ConnectionInfo$1(
  value: ConnectionInfo$,
): IpAddress$;
export function ConnectionInfo$ConnectionInfo$ip_address(value: ConnectionInfo$): IpAddress$;

export type ConnectionInfo$ = ConnectionInfo;

export class Websocket extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $process.Selector$<$process.Down$>);
  /** @deprecated */
  0: $process.Selector$<$process.Down$>;
}
export function ResponseData$Websocket(
  $0: $process.Selector$<$process.Down$>,
): ResponseData$;
export function ResponseData$isWebsocket(value: ResponseData$): boolean;
export function ResponseData$Websocket$0(value: ResponseData$): $process.Selector$<
  $process.Down$
>;

export class Bytes extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $bytes_tree.BytesTree$);
  /** @deprecated */
  0: $bytes_tree.BytesTree$;
}
export function ResponseData$Bytes($0: $bytes_tree.BytesTree$): ResponseData$;
export function ResponseData$isBytes(value: ResponseData$): boolean;
export function ResponseData$Bytes$0(value: ResponseData$): $bytes_tree.BytesTree$;

export class Chunked extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $yielder.Yielder$<$bytes_tree.BytesTree$>);
  /** @deprecated */
  0: $yielder.Yielder$<$bytes_tree.BytesTree$>;
}
export function ResponseData$Chunked(
  $0: $yielder.Yielder$<$bytes_tree.BytesTree$>,
): ResponseData$;
export function ResponseData$isChunked(value: ResponseData$): boolean;
export function ResponseData$Chunked$0(value: ResponseData$): $yielder.Yielder$<
  $bytes_tree.BytesTree$
>;

export class File extends _.CustomType {
  /** @deprecated */
  constructor(descriptor: $file.FileDescriptor$, offset: number, length: number);
  /** @deprecated */
  descriptor: $file.FileDescriptor$;
  /** @deprecated */
  offset: number;
  /** @deprecated */
  length: number;
}
export function ResponseData$File(
  descriptor: $file.FileDescriptor$,
  offset: number,
  length: number,
): ResponseData$;
export function ResponseData$isFile(value: ResponseData$): boolean;
export function ResponseData$File$0(value: ResponseData$): $file.FileDescriptor$;
export function ResponseData$File$descriptor(
  value: ResponseData$,
): $file.FileDescriptor$;
export function ResponseData$File$1(value: ResponseData$): number;
export function ResponseData$File$offset(value: ResponseData$): number;
export function ResponseData$File$2(value: ResponseData$): number;
export function ResponseData$File$length(value: ResponseData$): number;

export class ServerSentEvents extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $process.Selector$<$process.Down$>);
  /** @deprecated */
  0: $process.Selector$<$process.Down$>;
}
export function ResponseData$ServerSentEvents(
  $0: $process.Selector$<$process.Down$>,
): ResponseData$;
export function ResponseData$isServerSentEvents(value: ResponseData$): boolean;
export function ResponseData$ServerSentEvents$0(value: ResponseData$): $process.Selector$<
  $process.Down$
>;

export type ResponseData$ = Websocket | Bytes | Chunked | File | ServerSentEvents;

export class IsDir extends _.CustomType {}
export function FileError$IsDir(): FileError$;
export function FileError$isIsDir(value: FileError$): boolean;

export class NoAccess extends _.CustomType {}
export function FileError$NoAccess(): FileError$;
export function FileError$isNoAccess(value: FileError$): boolean;

export class NoEntry extends _.CustomType {}
export function FileError$NoEntry(): FileError$;
export function FileError$isNoEntry(value: FileError$): boolean;

export class UnknownFileError extends _.CustomType {}
export function FileError$UnknownFileError(): FileError$;
export function FileError$isUnknownFileError(value: FileError$): boolean;

export type FileError$ = IsDir | NoAccess | NoEntry | UnknownFileError;

export class ExcessBody extends _.CustomType {}
export function ReadError$ExcessBody(): ReadError$;
export function ReadError$isExcessBody(value: ReadError$): boolean;

export class MalformedBody extends _.CustomType {}
export function ReadError$MalformedBody(): ReadError$;
export function ReadError$isMalformedBody(value: ReadError$): boolean;

export type ReadError$ = ExcessBody | MalformedBody;

export class Chunk extends _.CustomType {
  /** @deprecated */
  constructor(
    data: _.BitArray,
    consume: (x0: number) => _.Result<Chunk$, ReadError$>
  );
  /** @deprecated */
  data: _.BitArray;
  /** @deprecated */
  consume: (x0: number) => _.Result<Chunk$, ReadError$>;
}
export function Chunk$Chunk(
  data: _.BitArray,
  consume: (x0: number) => _.Result<Chunk$, ReadError$>,
): Chunk$;
export function Chunk$isChunk(value: Chunk$): boolean;
export function Chunk$Chunk$0(value: Chunk$): _.BitArray;
export function Chunk$Chunk$data(value: Chunk$): _.BitArray;
export function Chunk$Chunk$1(value: Chunk$): (x0: number) => _.Result<
  Chunk$,
  ReadError$
>;
export function Chunk$Chunk$consume(value: Chunk$): (x0: number) => _.Result<
  Chunk$,
  ReadError$
>;

export class Done extends _.CustomType {}
export function Chunk$Done(): Chunk$;
export function Chunk$isDone(value: Chunk$): boolean;

export type Chunk$ = Chunk | Done;

declare class ChunkState extends _.CustomType {
  /** @deprecated */
  constructor(
    data_buffer: $buffer.Buffer$,
    chunk_buffer: $buffer.Buffer$,
    done: boolean
  );
  /** @deprecated */
  data_buffer: $buffer.Buffer$;
  /** @deprecated */
  chunk_buffer: $buffer.Buffer$;
  /** @deprecated */
  done: boolean;
}

type ChunkState$ = ChunkState;

declare class CertKeyFiles extends _.CustomType {
  /** @deprecated */
  constructor(certfile: string, keyfile: string);
  /** @deprecated */
  certfile: string;
  /** @deprecated */
  keyfile: string;
}

type TlsOptions$ = CertKeyFiles;

declare class Builder<ACKC, ACKB> extends _.CustomType {
  /** @deprecated */
  constructor(
    port: number,
    handler: (x0: $request.Request$<any>) => $response.Response$<any>,
    after_start: (x0: number, x1: $gleam_http.Scheme$, x2: IpAddress$) => undefined,
    interface$: string,
    ipv6_support: boolean,
    tls_options: $option.Option$<TlsOptions$>
  );
  /** @deprecated */
  port: number;
  /** @deprecated */
  handler: (x0: $request.Request$<any>) => $response.Response$<any>;
  /** @deprecated */
  after_start: (x0: number, x1: $gleam_http.Scheme$, x2: IpAddress$) => undefined;
  /** @deprecated */
  interface$: string;
  /** @deprecated */
  ipv6_support: boolean;
  /** @deprecated */
  tls_options: $option.Option$<TlsOptions$>;
}

export type Builder$<ACKC, ACKB> = Builder<ACKC, ACKB>;

export class Assigned extends _.CustomType {}
export function Port$Assigned(): Port$;
export function Port$isAssigned(value: Port$): boolean;

export class Provided extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Port$Provided($0: number): Port$;
export function Port$isProvided(value: Port$): boolean;
export function Port$Provided$0(value: Port$): number;

export type Port$ = Assigned | Provided;

export class Text extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function WebsocketMessage$Text<ACKD>(
  $0: string,
): WebsocketMessage$<ACKD>;
export function WebsocketMessage$isText<ACKD>(
  value: WebsocketMessage$<ACKD>,
): boolean;
export function WebsocketMessage$Text$0<ACKD>(value: WebsocketMessage$<ACKD>): string;

export class Binary extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function WebsocketMessage$Binary<ACKD>(
  $0: _.BitArray,
): WebsocketMessage$<ACKD>;
export function WebsocketMessage$isBinary<ACKD>(
  value: WebsocketMessage$<ACKD>,
): boolean;
export function WebsocketMessage$Binary$0<ACKD>(value: WebsocketMessage$<ACKD>): _.BitArray;

export class Closed extends _.CustomType {}
export function WebsocketMessage$Closed<ACKD>(): WebsocketMessage$<ACKD>;
export function WebsocketMessage$isClosed<ACKD>(
  value: WebsocketMessage$<ACKD>,
): boolean;

export class Shutdown extends _.CustomType {}
export function WebsocketMessage$Shutdown<ACKD>(): WebsocketMessage$<ACKD>;
export function WebsocketMessage$isShutdown<ACKD>(
  value: WebsocketMessage$<ACKD>,
): boolean;

export class Custom<ACKD> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ACKD);
  /** @deprecated */
  0: ACKD;
}
export function WebsocketMessage$Custom<ACKD>(
  $0: ACKD,
): WebsocketMessage$<ACKD>;
export function WebsocketMessage$isCustom<ACKD>(
  value: WebsocketMessage$<ACKD>,
): boolean;
export function WebsocketMessage$Custom$0<ACKD>(value: WebsocketMessage$<ACKD>): ACKD;

export type WebsocketMessage$<ACKD> = Text | Binary | Closed | Shutdown | Custom<
  ACKD
>;

declare class SSEConnection extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $http.Connection$);
  /** @deprecated */
  0: $http.Connection$;
}

export type SSEConnection$ = SSEConnection;

declare class SSEEvent extends _.CustomType {
  /** @deprecated */
  constructor(
    id: $option.Option$<string>,
    event: $option.Option$<string>,
    retry: $option.Option$<number>,
    data: $string_tree.StringTree$
  );
  /** @deprecated */
  id: $option.Option$<string>;
  /** @deprecated */
  event: $option.Option$<string>;
  /** @deprecated */
  retry: $option.Option$<number>;
  /** @deprecated */
  data: $string_tree.StringTree$;
}

export type SSEEvent$ = SSEEvent;

export type Connection = $http.Connection$;

export type WebsocketConnection = $websocket.WebsocketConnection$;

export function continue$<ACKE>(state: ACKE): Next$<ACKE, any>;

export function with_selector<ACKI, ACKJ>(
  next: Next$<ACKI, ACKJ>,
  selector: $process.Selector$<ACKJ>
): Next$<ACKI, ACKJ>;

export function stop(): Next$<any, any>;

export function stop_abnormal(reason: string): Next$<any, any>;

export function ip_address_to_string(address: IpAddress$): string;

export function get_client_info(conn: $http.Connection$): _.Result<
  ConnectionInfo$,
  undefined
>;

export function send_file(
  path: string,
  offset: number,
  limit: $option.Option$<number>
): _.Result<ResponseData$, FileError$>;

export function read_body(
  req: $request.Request$<$http.Connection$>,
  max_body_limit: number
): _.Result<$request.Request$<_.BitArray>, ReadError$>;

export function stream(req: $request.Request$<$http.Connection$>): _.Result<
  (x0: number) => _.Result<Chunk$, ReadError$>,
  ReadError$
>;

export function new$<ACLZ, ACMB>(
  handler: (x0: $request.Request$<ACLZ>) => $response.Response$<ACMB>
): Builder$<ACLZ, ACMB>;

export function port<ACMF, ACMG>(builder: Builder$<ACMF, ACMG>, port: number): Builder$<
  ACMF,
  ACMG
>;

export function read_request_body<ACML>(
  builder: Builder$<_.BitArray, ACML>,
  bytes_limit: number,
  failure_response: $response.Response$<ACML>
): Builder$<$http.Connection$, ACML>;

export function after_start<ACMR, ACMS>(
  builder: Builder$<ACMR, ACMS>,
  after_start: (x0: number, x1: $gleam_http.Scheme$, x2: IpAddress$) => undefined
): Builder$<ACMR, ACMS>;

export function bind<ACMX, ACMY>(
  builder: Builder$<ACMX, ACMY>,
  interface$: string
): Builder$<ACMX, ACMY>;

export function with_ipv6<ACND, ACNE>(builder: Builder$<ACND, ACNE>): Builder$<
  ACND,
  ACNE
>;

export function with_tls<ACNJ, ACNK>(
  builder: Builder$<ACNJ, ACNK>,
  cert: string,
  key: string
): Builder$<ACNJ, ACNK>;

export function start(builder: Builder$<$http.Connection$, ResponseData$>): _.Result<
  $actor.Started$<$static_supervisor.Supervisor$>,
  $actor.StartError$
>;

export function supervised(builder: Builder$<$http.Connection$, ResponseData$>): $supervision.ChildSpecification$<
  $static_supervisor.Supervisor$
>;

export function websocket<ACOF, ACOG>(
  request: $request.Request$<$http.Connection$>,
  handler: (
    x0: ACOF,
    x1: WebsocketMessage$<ACOG>,
    x2: $websocket.WebsocketConnection$
  ) => Next$<ACOF, ACOG>,
  on_init: (x0: $websocket.WebsocketConnection$) => [
    ACOF,
    $option.Option$<$process.Selector$<ACOG>>
  ],
  on_close: (x0: ACOF) => undefined
): $response.Response$<ResponseData$>;

export function send_binary_frame(
  connection: $websocket.WebsocketConnection$,
  frame: _.BitArray
): _.Result<undefined, $socket.SocketReason$>;

export function send_text_frame(
  connection: $websocket.WebsocketConnection$,
  frame: string
): _.Result<undefined, $socket.SocketReason$>;

export function event(data: $string_tree.StringTree$): SSEEvent$;

export function event_id(event: SSEEvent$, id: string): SSEEvent$;

export function event_name(event: SSEEvent$, name: string): SSEEvent$;

export function event_retry(event: SSEEvent$, retry: number): SSEEvent$;

export function server_sent_events<ACOU, ACOW>(
  req: $request.Request$<$http.Connection$>,
  resp: $response.Response$<any>,
  init: (x0: $process.Subject$<ACOU>) => _.Result<
    $actor.Initialised$<ACOW, ACOU, any>,
    string
  >,
  loop: (x0: ACOW, x1: ACOU, x2: SSEConnection$) => $actor.Next$<ACOW, ACOU>
): $response.Response$<ResponseData$>;

export function send_event(conn: SSEConnection$, event: SSEEvent$): _.Result<
  undefined,
  undefined
>;
