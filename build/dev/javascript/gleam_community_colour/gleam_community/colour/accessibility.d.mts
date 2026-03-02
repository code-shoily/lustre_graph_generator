import type * as _ from "../../gleam.d.mts";
import type * as $colour from "../../gleam_community/colour.d.mts";

export function luminance(colour: $colour.Colour$): number;

export function contrast_ratio(
  colour_a: $colour.Colour$,
  colour_b: $colour.Colour$
): number;

export function maximum_contrast(
  base: $colour.Colour$,
  colours: _.List<$colour.Colour$>
): _.Result<$colour.Colour$, undefined>;
