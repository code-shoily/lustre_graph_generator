import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $bytes_tree from "../../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $socket from "../../../glisten/glisten/socket.d.mts";
import type * as $transport from "../../../glisten/glisten/transport.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $http from "../../mist/internal/http.d.mts";
import type * as $frame from "../../mist/internal/http2/frame.d.mts";

export class Http2Settings extends _.CustomType {
  /** @deprecated */
  constructor(
    header_table_size: number,
    server_push: $frame.PushState$,
    max_concurrent_streams: number,
    initial_window_size: number,
    max_frame_size: number,
    max_header_list_size: $option.Option$<number>
  );
  /** @deprecated */
  header_table_size: number;
  /** @deprecated */
  server_push: $frame.PushState$;
  /** @deprecated */
  max_concurrent_streams: number;
  /** @deprecated */
  initial_window_size: number;
  /** @deprecated */
  max_frame_size: number;
  /** @deprecated */
  max_header_list_size: $option.Option$<number>;
}
export function Http2Settings$Http2Settings(
  header_table_size: number,
  server_push: $frame.PushState$,
  max_concurrent_streams: number,
  initial_window_size: number,
  max_frame_size: number,
  max_header_list_size: $option.Option$<number>,
): Http2Settings$;
export function Http2Settings$isHttp2Settings(value: Http2Settings$): boolean;
export function Http2Settings$Http2Settings$0(value: Http2Settings$): number;
export function Http2Settings$Http2Settings$header_table_size(value: Http2Settings$): number;
export function Http2Settings$Http2Settings$1(
  value: Http2Settings$,
): $frame.PushState$;
export function Http2Settings$Http2Settings$server_push(value: Http2Settings$): $frame.PushState$;
export function Http2Settings$Http2Settings$2(
  value: Http2Settings$,
): number;
export function Http2Settings$Http2Settings$max_concurrent_streams(value: Http2Settings$): number;
export function Http2Settings$Http2Settings$3(
  value: Http2Settings$,
): number;
export function Http2Settings$Http2Settings$initial_window_size(value: Http2Settings$): number;
export function Http2Settings$Http2Settings$4(
  value: Http2Settings$,
): number;
export function Http2Settings$Http2Settings$max_frame_size(value: Http2Settings$): number;
export function Http2Settings$Http2Settings$5(
  value: Http2Settings$,
): $option.Option$<number>;
export function Http2Settings$Http2Settings$max_header_list_size(value: Http2Settings$): $option.Option$<
  number
>;

export type Http2Settings$ = Http2Settings;

export type HpackContext$ = any;

export class Compression extends _.CustomType {}
export function HpackError$Compression(): HpackError$;
export function HpackError$isCompression(value: HpackError$): boolean;

export class BadHeaderPacket extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function HpackError$BadHeaderPacket($0: _.BitArray): HpackError$;
export function HpackError$isBadHeaderPacket(value: HpackError$): boolean;
export function HpackError$BadHeaderPacket$0(value: HpackError$): _.BitArray;

export type HpackError$ = Compression | BadHeaderPacket;

export function default_settings(): Http2Settings$;

export function update_settings(
  current: Http2Settings$,
  settings: _.List<$frame.Setting$>
): Http2Settings$;

export function send_frame(
  frame_to_send: $frame.Frame$,
  socket: $socket.Socket$,
  transport: $transport.Transport$
): _.Result<undefined, $socket.SocketReason$>;

export function hpack_new_context(size: number): HpackContext$;

export function hpack_max_table_size(context: HpackContext$, size: number): HpackContext$;

export function hpack_decode(context: HpackContext$, bin: _.BitArray): _.Result<
  [_.List<[string, string]>, HpackContext$],
  HpackError$
>;

export function hpack_encode(
  context: HpackContext$,
  headers: _.List<[string, string]>
): _.Result<[_.BitArray, HpackContext$], any>;

export function send_bytes_tree(
  resp: $response.Response$<$bytes_tree.BytesTree$>,
  conn: $http.Connection$,
  context: HpackContext$,
  id: $frame.StreamIdentifier$<$frame.Frame$>
): _.Result<HpackContext$, string>;
