import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $bytes_tree from "../../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as _ from "../../gleam.d.mts";

export function status_to_bit_array(status: number): _.BitArray;

export function encode_headers(headers: _.List<[string, string]>): $bytes_tree.BytesTree$;

export function response_builder(
  status: number,
  headers: _.List<[string, string]>,
  version: string
): $bytes_tree.BytesTree$;

export function to_bytes_tree(
  resp: $response.Response$<$bytes_tree.BytesTree$>,
  version: string
): $bytes_tree.BytesTree$;
