import type * as $crypto from "../gleam_crypto/gleam/crypto.d.mts";
import type * as $atom from "../gleam_erlang/gleam/erlang/atom.d.mts";
import type * as $http from "../gleam_http/gleam/http.d.mts";
import type * as $request from "../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../gleam_http/gleam/http/response.d.mts";
import type * as $bytes_tree from "../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $string_tree from "../gleam_stdlib/gleam/string_tree.d.mts";
import type * as $logging from "../logging/logging.d.mts";
import type * as $simplifile from "../simplifile/simplifile.d.mts";
import type * as _ from "./gleam.d.mts";
import type * as $internal from "./wisp/internal.d.mts";

export class Text extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Body$Text($0: string): Body$;
export function Body$isText(value: Body$): boolean;
export function Body$Text$0(value: Body$): string;

export class Bytes extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $bytes_tree.BytesTree$);
  /** @deprecated */
  0: $bytes_tree.BytesTree$;
}
export function Body$Bytes($0: $bytes_tree.BytesTree$): Body$;
export function Body$isBytes(value: Body$): boolean;
export function Body$Bytes$0(value: Body$): $bytes_tree.BytesTree$;

export class File extends _.CustomType {
  /** @deprecated */
  constructor(path: string, offset: number, limit: $option.Option$<number>);
  /** @deprecated */
  path: string;
  /** @deprecated */
  offset: number;
  /** @deprecated */
  limit: $option.Option$<number>;
}
export function Body$File(
  path: string,
  offset: number,
  limit: $option.Option$<number>,
): Body$;
export function Body$isFile(value: Body$): boolean;
export function Body$File$0(value: Body$): string;
export function Body$File$path(value: Body$): string;
export function Body$File$1(value: Body$): number;
export function Body$File$offset(value: Body$): number;
export function Body$File$2(value: Body$): $option.Option$<number>;
export function Body$File$limit(value: Body$): $option.Option$<number>;

export type Body$ = Text | Bytes | File;

declare class BufferedReader extends _.CustomType {
  /** @deprecated */
  constructor(
    reader: (x0: number) => _.Result<$internal.Read$, undefined>,
    buffer: _.BitArray
  );
  /** @deprecated */
  reader: (x0: number) => _.Result<$internal.Read$, undefined>;
  /** @deprecated */
  buffer: _.BitArray;
}

type BufferedReader$ = BufferedReader;

declare class Quotas extends _.CustomType {
  /** @deprecated */
  constructor(body: number, files: number);
  /** @deprecated */
  body: number;
  /** @deprecated */
  files: number;
}

type Quotas$ = Quotas;

export class FormData extends _.CustomType {
  /** @deprecated */
  constructor(
    values: _.List<[string, string]>,
    files: _.List<[string, UploadedFile$]>
  );
  /** @deprecated */
  values: _.List<[string, string]>;
  /** @deprecated */
  files: _.List<[string, UploadedFile$]>;
}
export function FormData$FormData(
  values: _.List<[string, string]>,
  files: _.List<[string, UploadedFile$]>,
): FormData$;
export function FormData$isFormData(value: FormData$): boolean;
export function FormData$FormData$0(value: FormData$): _.List<[string, string]>;
export function FormData$FormData$values(value: FormData$): _.List<
  [string, string]
>;
export function FormData$FormData$1(value: FormData$): _.List<
  [string, UploadedFile$]
>;
export function FormData$FormData$files(value: FormData$): _.List<
  [string, UploadedFile$]
>;

export type FormData$ = FormData;

export class UploadedFile extends _.CustomType {
  /** @deprecated */
  constructor(file_name: string, path: string);
  /** @deprecated */
  file_name: string;
  /** @deprecated */
  path: string;
}
export function UploadedFile$UploadedFile(
  file_name: string,
  path: string,
): UploadedFile$;
export function UploadedFile$isUploadedFile(value: UploadedFile$): boolean;
export function UploadedFile$UploadedFile$0(value: UploadedFile$): string;
export function UploadedFile$UploadedFile$file_name(value: UploadedFile$): string;
export function UploadedFile$UploadedFile$1(
  value: UploadedFile$,
): string;
export function UploadedFile$UploadedFile$path(value: UploadedFile$): string;

export type UploadedFile$ = UploadedFile;

type DoNotLeak$ = any;

declare class Errored extends _.CustomType {}

declare class Thrown extends _.CustomType {}

declare class Exited extends _.CustomType {}

type ErrorKind$ = Errored | Thrown | Exited;

export class Range extends _.CustomType {
  /** @deprecated */
  constructor(offset: number, limit: $option.Option$<number>);
  /** @deprecated */
  offset: number;
  /** @deprecated */
  limit: $option.Option$<number>;
}
export function Range$Range(
  offset: number,
  limit: $option.Option$<number>,
): Range$;
export function Range$isRange(value: Range$): boolean;
export function Range$Range$0(value: Range$): number;
export function Range$Range$offset(value: Range$): number;
export function Range$Range$1(value: Range$): $option.Option$<number>;
export function Range$Range$limit(value: Range$): $option.Option$<number>;

export type Range$ = Range;

export class EmergencyLevel extends _.CustomType {}
export function LogLevel$EmergencyLevel(): LogLevel$;
export function LogLevel$isEmergencyLevel(value: LogLevel$): boolean;

export class AlertLevel extends _.CustomType {}
export function LogLevel$AlertLevel(): LogLevel$;
export function LogLevel$isAlertLevel(value: LogLevel$): boolean;

export class CriticalLevel extends _.CustomType {}
export function LogLevel$CriticalLevel(): LogLevel$;
export function LogLevel$isCriticalLevel(value: LogLevel$): boolean;

export class ErrorLevel extends _.CustomType {}
export function LogLevel$ErrorLevel(): LogLevel$;
export function LogLevel$isErrorLevel(value: LogLevel$): boolean;

export class WarningLevel extends _.CustomType {}
export function LogLevel$WarningLevel(): LogLevel$;
export function LogLevel$isWarningLevel(value: LogLevel$): boolean;

export class NoticeLevel extends _.CustomType {}
export function LogLevel$NoticeLevel(): LogLevel$;
export function LogLevel$isNoticeLevel(value: LogLevel$): boolean;

export class InfoLevel extends _.CustomType {}
export function LogLevel$InfoLevel(): LogLevel$;
export function LogLevel$isInfoLevel(value: LogLevel$): boolean;

export class DebugLevel extends _.CustomType {}
export function LogLevel$DebugLevel(): LogLevel$;
export function LogLevel$isDebugLevel(value: LogLevel$): boolean;

export type LogLevel$ = EmergencyLevel | AlertLevel | CriticalLevel | ErrorLevel | WarningLevel | NoticeLevel | InfoLevel | DebugLevel;

export class PlainText extends _.CustomType {}
export function Security$PlainText(): Security$;
export function Security$isPlainText(value: Security$): boolean;

export class Signed extends _.CustomType {}
export function Security$Signed(): Security$;
export function Security$isSigned(value: Security$): boolean;

export type Security$ = PlainText | Signed;

export type Response = $response.Response$<Body$>;

export type Connection = $internal.Connection$;

export type Request = $request.Request$<$internal.Connection$>;

export const path_segments: (x0: $request.Request$<any>) => _.List<string>;

export const set_header: (x0: $response.Response$<any>, x1: string, x2: string) => $response.Response$<
  any
>;

export const priv_directory: (x0: string) => _.Result<string, undefined>;

export function response(status: number): $response.Response$<Body$>;

export function set_body(response: $response.Response$<Body$>, body: Body$): $response.Response$<
  Body$
>;

export function file_download(
  response: $response.Response$<Body$>,
  name: string,
  path: string
): $response.Response$<Body$>;

export function file_download_from_memory(
  response: $response.Response$<Body$>,
  name: string,
  data: $bytes_tree.BytesTree$
): $response.Response$<Body$>;

export function html_response(html: string, status: number): $response.Response$<
  Body$
>;

export function json_response(json: string, status: number): $response.Response$<
  Body$
>;

export function html_body(response: $response.Response$<Body$>, html: string): $response.Response$<
  Body$
>;

export function json_body(response: $response.Response$<Body$>, json: string): $response.Response$<
  Body$
>;

export function string_tree_body(
  response: $response.Response$<Body$>,
  content: $string_tree.StringTree$
): $response.Response$<Body$>;

export function string_body(
  response: $response.Response$<Body$>,
  content: string
): $response.Response$<Body$>;

export function escape_html(content: string): string;

export function method_not_allowed(methods: _.List<$http.Method$>): $response.Response$<
  Body$
>;

export function no_content(): $response.Response$<Body$>;

export function set_max_body_size(
  request: $request.Request$<$internal.Connection$>,
  size: number
): $request.Request$<$internal.Connection$>;

export function get_max_body_size(
  request: $request.Request$<$internal.Connection$>
): number;

export function set_secret_key_base(
  request: $request.Request$<$internal.Connection$>,
  key: string
): $request.Request$<$internal.Connection$>;

export function get_secret_key_base(
  request: $request.Request$<$internal.Connection$>
): string;

export function set_max_files_size(
  request: $request.Request$<$internal.Connection$>,
  size: number
): $request.Request$<$internal.Connection$>;

export function get_max_files_size(
  request: $request.Request$<$internal.Connection$>
): number;

export function set_read_chunk_size(
  request: $request.Request$<$internal.Connection$>,
  size: number
): $request.Request$<$internal.Connection$>;

export function get_read_chunk_size(
  request: $request.Request$<$internal.Connection$>
): number;

export function require_method(
  request: $request.Request$<any>,
  method: $http.Method$,
  next: () => $response.Response$<Body$>
): $response.Response$<Body$>;

export function get_query(request: $request.Request$<$internal.Connection$>): _.List<
  [string, string]
>;

export function method_override<AGTS>(request: $request.Request$<AGTS>): $request.Request$<
  AGTS
>;

export function read_body_bits(
  request: $request.Request$<$internal.Connection$>
): _.Result<_.BitArray, undefined>;

export function parse_range_header(range_header: string): _.Result<
  Range$,
  undefined
>;

export function handle_head(
  req: $request.Request$<$internal.Connection$>,
  handler: (x0: $request.Request$<$internal.Connection$>) => $response.Response$<
    Body$
  >
): $response.Response$<Body$>;

export function new_temporary_file(
  request: $request.Request$<$internal.Connection$>
): _.Result<string, $simplifile.FileError$>;

export function delete_temporary_files(
  request: $request.Request$<$internal.Connection$>
): _.Result<undefined, $simplifile.FileError$>;

export function configure_logger(): undefined;

export function set_logger_level(log_level: LogLevel$): undefined;

export function log_emergency(message: string): undefined;

export function log_alert(message: string): undefined;

export function log_critical(message: string): undefined;

export function log_error(message: string): undefined;

export function log_warning(message: string): undefined;

export function log_notice(message: string): undefined;

export function log_info(message: string): undefined;

export function log_request(
  req: $request.Request$<$internal.Connection$>,
  handler: () => $response.Response$<Body$>
): $response.Response$<Body$>;

export function log_debug(message: string): undefined;

export function random_string(length: number): string;

export function sign_message(
  request: $request.Request$<$internal.Connection$>,
  message: _.BitArray,
  algorithm: $crypto.HashAlgorithm$
): string;

export function verify_signed_message(
  request: $request.Request$<$internal.Connection$>,
  message: string
): _.Result<_.BitArray, undefined>;

export function set_cookie(
  response: $response.Response$<Body$>,
  request: $request.Request$<$internal.Connection$>,
  name: string,
  value: string,
  security: Security$,
  max_age: number
): $response.Response$<Body$>;

export function get_cookie(
  request: $request.Request$<$internal.Connection$>,
  name: string,
  security: Security$
): _.Result<string, undefined>;

export function create_canned_connection(
  body: _.BitArray,
  secret_key_base: string
): $internal.Connection$;

export function content_security_policy_protection(
  handle_request: (x0: string) => $response.Response$<Body$>
): $response.Response$<Body$>;

export function ok(): $response.Response$<Body$>;

export function created(): $response.Response$<Body$>;

export function accepted(): $response.Response$<Body$>;

export function redirect(url: string): $response.Response$<Body$>;

export function permanent_redirect(url: string): $response.Response$<Body$>;

export function not_found(): $response.Response$<Body$>;

export function bad_request(detail: string): $response.Response$<Body$>;

export function content_too_large(): $response.Response$<Body$>;

export function unsupported_media_type(acceptable: _.List<string>): $response.Response$<
  Body$
>;

export function unprocessable_content(): $response.Response$<Body$>;

export function internal_server_error(): $response.Response$<Body$>;

export function require_bit_array_body(
  request: $request.Request$<$internal.Connection$>,
  next: (x0: _.BitArray) => $response.Response$<Body$>
): $response.Response$<Body$>;

export function require_content_type(
  request: $request.Request$<$internal.Connection$>,
  expected: string,
  next: () => $response.Response$<Body$>
): $response.Response$<Body$>;

export function rescue_crashes(handler: () => $response.Response$<Body$>): $response.Response$<
  Body$
>;

export function require_string_body(
  request: $request.Request$<$internal.Connection$>,
  next: (x0: string) => $response.Response$<Body$>
): $response.Response$<Body$>;

export function require_json(
  request: $request.Request$<$internal.Connection$>,
  next: (x0: $dynamic.Dynamic$) => $response.Response$<Body$>
): $response.Response$<Body$>;

export function csrf_known_header_protection(
  request: $request.Request$<$internal.Connection$>,
  next: (x0: $request.Request$<$internal.Connection$>) => $response.Response$<
    Body$
  >
): $response.Response$<Body$>;

export function require_form(
  request: $request.Request$<$internal.Connection$>,
  next: (x0: FormData$) => $response.Response$<Body$>
): $response.Response$<Body$>;

export function serve_static(
  req: $request.Request$<$internal.Connection$>,
  prefix: string,
  directory: string,
  handler: () => $response.Response$<Body$>
): $response.Response$<Body$>;
