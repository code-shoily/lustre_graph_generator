import type * as $port from "../../gleam_erlang/gleam/erlang/port.d.mts";
import type * as $process from "../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as $actor from "../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $dynamic from "../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Send extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}

declare class Data extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}

declare class Exit extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}

declare class Unknown extends _.CustomType {}

export type Message$ = Send | Data | Exit | Unknown;

export function send(port: $process.Subject$<Message$>, data: $json.Json$): undefined;

export function start(
  program: string,
  args: _.List<string>,
  handle_data: (x0: $dynamic.Dynamic$) => undefined,
  handle_unknown: () => undefined
): _.Result<$process.Subject$<Message$>, $actor.StartError$>;
