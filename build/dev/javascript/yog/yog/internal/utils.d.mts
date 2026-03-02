import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as _ from "../../gleam.d.mts";

export function range(start: number, end: number): _.List<number>;

export function dict_update_inner<ALCB, ALCC, ALCD>(
  outer: $dict.Dict$<ALCB, $dict.Dict$<ALCC, ALCD>>,
  key1: ALCB,
  key2: ALCC,
  fun: (x0: $dict.Dict$<ALCC, ALCD>, x1: ALCC) => $dict.Dict$<ALCC, ALCD>
): $dict.Dict$<ALCB, $dict.Dict$<ALCC, ALCD>>;
