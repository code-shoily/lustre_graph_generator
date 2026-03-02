import type * as $atom from "../../../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $charlist from "../../../gleam_erlang/gleam/erlang/charlist.d.mts";
import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $http from "../../../gleam_http/gleam/http.d.mts";
import type * as $request from "../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $bytes_tree from "../../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $yielder from "../../../gleam_yielder/gleam/yielder.d.mts";
import type * as $socket from "../../../glisten/glisten/socket.d.mts";
import type * as $transport from "../../../glisten/glisten/transport.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $buffer from "../../mist/internal/buffer.d.mts";
import type * as $file from "../../mist/internal/file.d.mts";

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

export class Connection extends _.CustomType {
  /** @deprecated */
  constructor(
    body: Body$,
    socket: $socket.Socket$,
    transport: $transport.Transport$
  );
  /** @deprecated */
  body: Body$;
  /** @deprecated */
  socket: $socket.Socket$;
  /** @deprecated */
  transport: $transport.Transport$;
}
export function Connection$Connection(
  body: Body$,
  socket: $socket.Socket$,
  transport: $transport.Transport$,
): Connection$;
export function Connection$isConnection(value: Connection$): boolean;
export function Connection$Connection$0(value: Connection$): Body$;
export function Connection$Connection$body(value: Connection$): Body$;
export function Connection$Connection$1(value: Connection$): $socket.Socket$;
export function Connection$Connection$socket(value: Connection$): $socket.Socket$;
export function Connection$Connection$2(
  value: Connection$,
): $transport.Transport$;
export function Connection$Connection$transport(value: Connection$): $transport.Transport$;

export type Connection$ = Connection;

export class Http extends _.CustomType {}
export function PacketType$Http(): PacketType$;
export function PacketType$isHttp(value: PacketType$): boolean;

export class HttphBin extends _.CustomType {}
export function PacketType$HttphBin(): PacketType$;
export function PacketType$isHttphBin(value: PacketType$): boolean;

export class HttpBin extends _.CustomType {}
export function PacketType$HttpBin(): PacketType$;
export function PacketType$isHttpBin(value: PacketType$): boolean;

export type PacketType$ = Http | HttphBin | HttpBin;

export class AbsPath extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function HttpUri$AbsPath($0: _.BitArray): HttpUri$;
export function HttpUri$isAbsPath(value: HttpUri$): boolean;
export function HttpUri$AbsPath$0(value: HttpUri$): _.BitArray;

export type HttpUri$ = AbsPath;

export class HttpRequest extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: $dynamic.Dynamic$,
    argument$1: HttpUri$,
    argument$2: [number, number]
  );
  /** @deprecated */
  0: $dynamic.Dynamic$;
  /** @deprecated */
  1: HttpUri$;
  /** @deprecated */
  2: [number, number];
}
export function HttpPacket$HttpRequest(
  $0: $dynamic.Dynamic$,
  $1: HttpUri$,
  $2: [number, number],
): HttpPacket$;
export function HttpPacket$isHttpRequest(value: HttpPacket$): boolean;
export function HttpPacket$HttpRequest$0(value: HttpPacket$): $dynamic.Dynamic$;
export function HttpPacket$HttpRequest$1(value: HttpPacket$): HttpUri$;
export function HttpPacket$HttpRequest$2(value: HttpPacket$): [number, number];

export class HttpHeader extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: number,
    argument$1: $atom.Atom$,
    argument$2: _.BitArray,
    argument$3: _.BitArray
  );
  /** @deprecated */
  0: number;
  /** @deprecated */
  1: $atom.Atom$;
  /** @deprecated */
  2: _.BitArray;
  /** @deprecated */
  3: _.BitArray;
}
export function HttpPacket$HttpHeader(
  $0: number,
  $1: $atom.Atom$,
  $2: _.BitArray,
  $3: _.BitArray,
): HttpPacket$;
export function HttpPacket$isHttpHeader(value: HttpPacket$): boolean;
export function HttpPacket$HttpHeader$0(value: HttpPacket$): number;
export function HttpPacket$HttpHeader$1(value: HttpPacket$): $atom.Atom$;
export function HttpPacket$HttpHeader$2(value: HttpPacket$): _.BitArray;
export function HttpPacket$HttpHeader$3(value: HttpPacket$): _.BitArray;

export type HttpPacket$ = HttpRequest | HttpHeader;

export class BinaryData extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: HttpPacket$, argument$1: _.BitArray);
  /** @deprecated */
  0: HttpPacket$;
  /** @deprecated */
  1: _.BitArray;
}
export function DecodedPacket$BinaryData(
  $0: HttpPacket$,
  $1: _.BitArray,
): DecodedPacket$;
export function DecodedPacket$isBinaryData(value: DecodedPacket$): boolean;
export function DecodedPacket$BinaryData$0(value: DecodedPacket$): HttpPacket$;
export function DecodedPacket$BinaryData$1(value: DecodedPacket$): _.BitArray;

export class EndOfHeaders extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function DecodedPacket$EndOfHeaders($0: _.BitArray): DecodedPacket$;
export function DecodedPacket$isEndOfHeaders(value: DecodedPacket$): boolean;
export function DecodedPacket$EndOfHeaders$0(value: DecodedPacket$): _.BitArray;

export class MoreData extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $option.Option$<number>);
  /** @deprecated */
  0: $option.Option$<number>;
}
export function DecodedPacket$MoreData(
  $0: $option.Option$<number>,
): DecodedPacket$;
export function DecodedPacket$isMoreData(value: DecodedPacket$): boolean;
export function DecodedPacket$MoreData$0(value: DecodedPacket$): $option.Option$<
  number
>;

export class Http2Upgrade extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function DecodedPacket$Http2Upgrade($0: _.BitArray): DecodedPacket$;
export function DecodedPacket$isHttp2Upgrade(value: DecodedPacket$): boolean;
export function DecodedPacket$Http2Upgrade$0(value: DecodedPacket$): _.BitArray;

export type DecodedPacket$ = BinaryData | EndOfHeaders | MoreData | Http2Upgrade;

export class MalformedRequest extends _.CustomType {}
export function DecodeError$MalformedRequest(): DecodeError$;
export function DecodeError$isMalformedRequest(value: DecodeError$): boolean;

export class InvalidMethod extends _.CustomType {}
export function DecodeError$InvalidMethod(): DecodeError$;
export function DecodeError$isInvalidMethod(value: DecodeError$): boolean;

export class InvalidPath extends _.CustomType {}
export function DecodeError$InvalidPath(): DecodeError$;
export function DecodeError$isInvalidPath(value: DecodeError$): boolean;

export class UnknownHeader extends _.CustomType {}
export function DecodeError$UnknownHeader(): DecodeError$;
export function DecodeError$isUnknownHeader(value: DecodeError$): boolean;

export class UnknownMethod extends _.CustomType {}
export function DecodeError$UnknownMethod(): DecodeError$;
export function DecodeError$isUnknownMethod(value: DecodeError$): boolean;

export class InvalidBody extends _.CustomType {}
export function DecodeError$InvalidBody(): DecodeError$;
export function DecodeError$isInvalidBody(value: DecodeError$): boolean;

export class DiscardPacket extends _.CustomType {}
export function DecodeError$DiscardPacket(): DecodeError$;
export function DecodeError$isDiscardPacket(value: DecodeError$): boolean;

export class NoHostHeader extends _.CustomType {}
export function DecodeError$NoHostHeader(): DecodeError$;
export function DecodeError$isNoHostHeader(value: DecodeError$): boolean;

export class InvalidHttpVersion extends _.CustomType {}
export function DecodeError$InvalidHttpVersion(): DecodeError$;
export function DecodeError$isInvalidHttpVersion(value: DecodeError$): boolean;

export type DecodeError$ = MalformedRequest | InvalidMethod | InvalidPath | UnknownHeader | UnknownMethod | InvalidBody | DiscardPacket | NoHostHeader | InvalidHttpVersion;

export class Chunk extends _.CustomType {
  /** @deprecated */
  constructor(data: _.BitArray, buffer: $buffer.Buffer$);
  /** @deprecated */
  data: _.BitArray;
  /** @deprecated */
  buffer: $buffer.Buffer$;
}
export function Chunk$Chunk(data: _.BitArray, buffer: $buffer.Buffer$): Chunk$;
export function Chunk$isChunk(value: Chunk$): boolean;
export function Chunk$Chunk$0(value: Chunk$): _.BitArray;
export function Chunk$Chunk$data(value: Chunk$): _.BitArray;
export function Chunk$Chunk$1(value: Chunk$): $buffer.Buffer$;
export function Chunk$Chunk$buffer(value: Chunk$): $buffer.Buffer$;

export class Complete extends _.CustomType {}
export function Chunk$Complete(): Chunk$;
export function Chunk$isComplete(value: Chunk$): boolean;

export type Chunk$ = Chunk | Complete;

export class Http1 extends _.CustomType {}
export function HttpVersion$Http1(): HttpVersion$;
export function HttpVersion$isHttp1(value: HttpVersion$): boolean;

export class Http11 extends _.CustomType {}
export function HttpVersion$Http11(): HttpVersion$;
export function HttpVersion$isHttp11(value: HttpVersion$): boolean;

export type HttpVersion$ = Http1 | Http11;

export class Http1Request extends _.CustomType {
  /** @deprecated */
  constructor(request: $request.Request$<Connection$>, version: HttpVersion$);
  /** @deprecated */
  request: $request.Request$<Connection$>;
  /** @deprecated */
  version: HttpVersion$;
}
export function ParsedRequest$Http1Request(
  request: $request.Request$<Connection$>,
  version: HttpVersion$,
): ParsedRequest$;
export function ParsedRequest$isHttp1Request(value: ParsedRequest$): boolean;
export function ParsedRequest$Http1Request$0(value: ParsedRequest$): $request.Request$<
  Connection$
>;
export function ParsedRequest$Http1Request$request(value: ParsedRequest$): $request.Request$<
  Connection$
>;
export function ParsedRequest$Http1Request$1(value: ParsedRequest$): HttpVersion$;
export function ParsedRequest$Http1Request$version(
  value: ParsedRequest$,
): HttpVersion$;

export class Upgrade extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function ParsedRequest$Upgrade($0: _.BitArray): ParsedRequest$;
export function ParsedRequest$isUpgrade(value: ParsedRequest$): boolean;
export function ParsedRequest$Upgrade$0(value: ParsedRequest$): _.BitArray;

export type ParsedRequest$ = Http1Request | Upgrade;

export class Initial extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function Body$Initial($0: _.BitArray): Body$;
export function Body$isInitial(value: Body$): boolean;
export function Body$Initial$0(value: Body$): _.BitArray;

export class Stream extends _.CustomType {
  /** @deprecated */
  constructor(
    selector: $process.Selector$<_.BitArray>,
    data: _.BitArray,
    remaining: number,
    attempts: number
  );
  /** @deprecated */
  selector: $process.Selector$<_.BitArray>;
  /** @deprecated */
  data: _.BitArray;
  /** @deprecated */
  remaining: number;
  /** @deprecated */
  attempts: number;
}
export function Body$Stream(
  selector: $process.Selector$<_.BitArray>,
  data: _.BitArray,
  remaining: number,
  attempts: number,
): Body$;
export function Body$isStream(value: Body$): boolean;
export function Body$Stream$0(value: Body$): $process.Selector$<_.BitArray>;
export function Body$Stream$selector(value: Body$): $process.Selector$<
  _.BitArray
>;
export function Body$Stream$1(value: Body$): _.BitArray;
export function Body$Stream$data(value: Body$): _.BitArray;
export function Body$Stream$2(value: Body$): number;
export function Body$Stream$remaining(value: Body$): number;
export function Body$Stream$3(value: Body$): number;
export function Body$Stream$attempts(value: Body$): number;

export type Body$ = Initial | Stream;

export class Sha extends _.CustomType {}
export function ShaHash$Sha(): ShaHash$;
export function ShaHash$isSha(value: ShaHash$): boolean;

export type ShaHash$ = Sha;

export type Handler = (x0: $request.Request$<Connection$>) => $response.Response$<
  ResponseData$
>;

export function from_header(value: _.BitArray): string;

export function read_data(
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  buffer: $buffer.Buffer$,
  error: DecodeError$
): _.Result<_.BitArray, DecodeError$>;

export function version_to_string(version: HttpVersion$): string;

export function add_date_header<YYP>(resp: $response.Response$<YYP>): $response.Response$<
  YYP
>;

export function connection_close<YYS>(resp: $response.Response$<YYS>): $response.Response$<
  YYS
>;

export function keep_alive<YYV>(resp: $response.Response$<YYV>): $response.Response$<
  YYV
>;

export function maybe_keep_alive<YYY>(resp: $response.Response$<YYY>): $response.Response$<
  YYY
>;

export function add_content_length<YZD>(when: boolean, length: number): (
  x0: $response.Response$<YZD>
) => $response.Response$<YZD>;

export function add_default_headers(
  resp: $response.Response$<$bytes_tree.BytesTree$>,
  is_head_response: boolean
): $response.Response$<$bytes_tree.BytesTree$>;

export function handle_continue(req: $request.Request$<Connection$>): _.Result<
  undefined,
  DecodeError$
>;

export function parse_headers(
  bs: _.BitArray,
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  headers: $dict.Dict$<string, string>
): _.Result<[$dict.Dict$<string, string>, _.BitArray], DecodeError$>;

export function crypto_hash(hash: ShaHash$, data: string): string;

export function base64_encode(data: string): string;

export function parse_chunk(string: _.BitArray): Chunk$;

export function parse_request(bs: _.BitArray, conn: Connection$): _.Result<
  ParsedRequest$,
  DecodeError$
>;

export function read_body(req: $request.Request$<Connection$>): _.Result<
  $request.Request$<_.BitArray>,
  DecodeError$
>;

export function upgrade_socket(
  req: $request.Request$<Connection$>,
  extensions: _.List<string>
): _.Result<
  $response.Response$<$bytes_tree.BytesTree$>,
  $request.Request$<Connection$>
>;

export function upgrade(
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  extensions: _.List<string>,
  req: $request.Request$<Connection$>
): _.Result<undefined, undefined>;
