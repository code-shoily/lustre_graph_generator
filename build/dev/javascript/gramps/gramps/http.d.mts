import type * as $http from "../../gleam_http/gleam/http.d.mts";
import type * as $request from "../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../gleam_http/gleam/http/response.d.mts";
import type * as $bytes_tree from "../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../gleam.d.mts";

export class HttphBin extends _.CustomType {}
export function PacketType$HttphBin(): PacketType$;
export function PacketType$isHttphBin(value: PacketType$): boolean;

export class HttpBin extends _.CustomType {}
export function PacketType$HttpBin(): PacketType$;
export function PacketType$isHttpBin(value: PacketType$): boolean;

export type PacketType$ = HttphBin | HttpBin;

export class More extends _.CustomType {
  /** @deprecated */
  constructor(length: number);
  /** @deprecated */
  length: number;
}
export function DecodePacketError$More(length: number): DecodePacketError$;
export function DecodePacketError$isMore(value: DecodePacketError$): boolean;
export function DecodePacketError$More$0(value: DecodePacketError$): number;
export function DecodePacketError$More$length(value: DecodePacketError$): number;

export class HttpError extends _.CustomType {
  /** @deprecated */
  constructor(reason: string);
  /** @deprecated */
  reason: string;
}
export function DecodePacketError$HttpError(reason: string): DecodePacketError$;
export function DecodePacketError$isHttpError(
  value: DecodePacketError$,
): boolean;
export function DecodePacketError$HttpError$0(value: DecodePacketError$): string;
export function DecodePacketError$HttpError$reason(
  value: DecodePacketError$,
): string;

export type DecodePacketError$ = More | HttpError;

declare class AbsPath extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}

declare class AbsoluteUri extends _.CustomType {
  /** @deprecated */
  constructor(scheme: $http.Scheme$, host: string, port: number, path: string);
  /** @deprecated */
  scheme: $http.Scheme$;
  /** @deprecated */
  host: string;
  /** @deprecated */
  port: number;
  /** @deprecated */
  path: string;
}

type UriPacket$ = AbsPath | AbsoluteUri;

declare class HttpRequest extends _.CustomType {
  /** @deprecated */
  constructor(method: string, uri: UriPacket$, version: [number, number]);
  /** @deprecated */
  method: string;
  /** @deprecated */
  uri: UriPacket$;
  /** @deprecated */
  version: [number, number];
}

declare class HttpResponse extends _.CustomType {
  /** @deprecated */
  constructor(version: [number, number], status: number, text: string);
  /** @deprecated */
  version: [number, number];
  /** @deprecated */
  status: number;
  /** @deprecated */
  text: string;
}

declare class HttpHeader extends _.CustomType {
  /** @deprecated */
  constructor(
    unknown: number,
    field: $dynamic.Dynamic$,
    raw_field: string,
    value: string
  );
  /** @deprecated */
  unknown: number;
  /** @deprecated */
  field: $dynamic.Dynamic$;
  /** @deprecated */
  raw_field: string;
  /** @deprecated */
  value: string;
}

declare class HttpEoh extends _.CustomType {}

type DecodedPacket$ = HttpRequest | HttpResponse | HttpHeader | HttpEoh;

export function read_response(data: _.BitArray): _.Result<
  [$response.Response$<undefined>, _.BitArray],
  DecodePacketError$
>;

export function read_request(data: _.BitArray): _.Result<
  [$request.Request$<undefined>, _.BitArray],
  DecodePacketError$
>;

export function status_to_bit_array(status: number): _.BitArray;

export function encode_headers(headers: _.List<[string, string]>): $bytes_tree.BytesTree$;

export function response_builder(
  status: number,
  headers: _.List<[string, string]>
): $bytes_tree.BytesTree$;

export function to_bytes_tree(resp: $response.Response$<$bytes_tree.BytesTree$>): $bytes_tree.BytesTree$;
