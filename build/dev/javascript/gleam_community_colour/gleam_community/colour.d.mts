import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Rgba extends _.CustomType {
  /** @deprecated */
  constructor(r: number, g: number, b: number, a: number);
  /** @deprecated */
  r: number;
  /** @deprecated */
  g: number;
  /** @deprecated */
  b: number;
  /** @deprecated */
  a: number;
}

declare class Hsla extends _.CustomType {
  /** @deprecated */
  constructor(h: number, s: number, l: number, a: number);
  /** @deprecated */
  h: number;
  /** @deprecated */
  s: number;
  /** @deprecated */
  l: number;
  /** @deprecated */
  a: number;
}

export type Colour$ = Rgba | Hsla;

export type Color = Colour$;

export const light_red: Colour$;

export const red: Colour$;

export const dark_red: Colour$;

export const light_orange: Colour$;

export const orange: Colour$;

export const dark_orange: Colour$;

export const light_yellow: Colour$;

export const yellow: Colour$;

export const dark_yellow: Colour$;

export const light_green: Colour$;

export const green: Colour$;

export const dark_green: Colour$;

export const light_blue: Colour$;

export const blue: Colour$;

export const dark_blue: Colour$;

export const light_purple: Colour$;

export const purple: Colour$;

export const dark_purple: Colour$;

export const light_brown: Colour$;

export const brown: Colour$;

export const dark_brown: Colour$;

export const black: Colour$;

export const white: Colour$;

export const light_grey: Colour$;

export const grey: Colour$;

export const dark_grey: Colour$;

export const light_gray: Colour$;

export const gray: Colour$;

export const dark_gray: Colour$;

export const light_charcoal: Colour$;

export const charcoal: Colour$;

export const dark_charcoal: Colour$;

export const pink: Colour$;

export function from_rgb255(red: number, green: number, blue: number): _.Result<
  Colour$,
  undefined
>;

export function from_rgb(red: number, green: number, blue: number): _.Result<
  Colour$,
  undefined
>;

export function from_rgba(
  red: number,
  green: number,
  blue: number,
  alpha: number
): _.Result<Colour$, undefined>;

export function from_hsla(
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number
): _.Result<Colour$, undefined>;

export function from_hsl(hue: number, saturation: number, lightness: number): _.Result<
  Colour$,
  undefined
>;

export function from_rgb_hex(hex: number): _.Result<Colour$, undefined>;

export function from_rgb_hex_string(hex_string: string): _.Result<
  Colour$,
  undefined
>;

export function from_rgba_hex(hex: number): _.Result<Colour$, undefined>;

export function from_rgba_hex_string(hex_string: string): _.Result<
  Colour$,
  undefined
>;

export function to_rgba(colour: Colour$): [number, number, number, number];

export function to_hsla(colour: Colour$): [number, number, number, number];

export function to_css_rgba_string(colour: Colour$): string;

export function to_rgba_hex(colour: Colour$): number;

export function to_rgba_hex_string(colour: Colour$): string;

export function to_rgb_hex(colour: Colour$): number;

export function to_rgb_hex_string(colour: Colour$): string;

export function encode(colour: Colour$): $json.Json$;

export function decoder(): $decode.Decoder$<Colour$>;
