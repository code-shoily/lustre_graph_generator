import type * as _ from "../../../gleam.d.mts";

export function compute_receive_window(
  receive_window_size: number,
  data_size: number
): [number, number];

export function update_send_window(
  current_send_window: number,
  increment: number
): _.Result<number, string>;
