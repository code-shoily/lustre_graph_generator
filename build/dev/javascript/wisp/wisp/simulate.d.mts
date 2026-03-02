import type * as $http from "../../gleam_http/gleam/http.d.mts";
import type * as $request from "../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../gleam_http/gleam/http/response.d.mts";
import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $wisp from "../wisp.d.mts";
import type * as $internal from "../wisp/internal.d.mts";

export class FileUpload extends _.CustomType {
  /** @deprecated */
  constructor(file_name: string, content_type: string, content: _.BitArray);
  /** @deprecated */
  file_name: string;
  /** @deprecated */
  content_type: string;
  /** @deprecated */
  content: _.BitArray;
}
export function FileUpload$FileUpload(
  file_name: string,
  content_type: string,
  content: _.BitArray,
): FileUpload$;
export function FileUpload$isFileUpload(value: FileUpload$): boolean;
export function FileUpload$FileUpload$0(value: FileUpload$): string;
export function FileUpload$FileUpload$file_name(value: FileUpload$): string;
export function FileUpload$FileUpload$1(value: FileUpload$): string;
export function FileUpload$FileUpload$content_type(value: FileUpload$): string;
export function FileUpload$FileUpload$2(value: FileUpload$): _.BitArray;
export function FileUpload$FileUpload$content(value: FileUpload$): _.BitArray;

export type FileUpload$ = FileUpload;

export const default_secret_key_base: string;

export const default_host: string;

export const default_headers: _.List<[string, string]>;

export const default_browser_headers: _.List<[string, string]>;

export function read_body(response: $response.Response$<$wisp.Body$>): string;

export function read_body_bits(response: $response.Response$<$wisp.Body$>): _.BitArray;

export function header(
  request: $request.Request$<$internal.Connection$>,
  name: string,
  value: string
): $request.Request$<$internal.Connection$>;

export function session(
  next_request: $request.Request$<$internal.Connection$>,
  previous_request: $request.Request$<$internal.Connection$>,
  previous_response: $response.Response$<$wisp.Body$>
): $request.Request$<$internal.Connection$>;

export function cookie(
  request: $request.Request$<$internal.Connection$>,
  name: string,
  value: string,
  security: $wisp.Security$
): $request.Request$<$internal.Connection$>;

export function string_body(
  request: $request.Request$<$internal.Connection$>,
  text: string
): $request.Request$<$internal.Connection$>;

export function bit_array_body(
  request: $request.Request$<$internal.Connection$>,
  data: _.BitArray
): $request.Request$<$internal.Connection$>;

export function html_body(
  request: $request.Request$<$internal.Connection$>,
  html: string
): $request.Request$<$internal.Connection$>;

export function form_body(
  request: $request.Request$<$internal.Connection$>,
  data: _.List<[string, string]>
): $request.Request$<$internal.Connection$>;

export function json_body(
  request: $request.Request$<$internal.Connection$>,
  data: $json.Json$
): $request.Request$<$internal.Connection$>;

export function multipart_body(
  request: $request.Request$<$internal.Connection$>,
  values: _.List<[string, string]>,
  files: _.List<[string, FileUpload$]>
): $request.Request$<$internal.Connection$>;

export function request(method: $http.Method$, path: string): $request.Request$<
  $internal.Connection$
>;

export function browser_request(method: $http.Method$, path: string): $request.Request$<
  $internal.Connection$
>;
