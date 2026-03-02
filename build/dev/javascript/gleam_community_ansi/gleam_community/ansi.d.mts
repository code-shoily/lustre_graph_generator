import type * as $colour from "../../gleam_community_colour/gleam_community/colour.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Code extends _.CustomType {
  /** @deprecated */
  constructor(open: string, close: string, regexp: string);
  /** @deprecated */
  open: string;
  /** @deprecated */
  close: string;
  /** @deprecated */
  regexp: string;
}

type Code$ = Code;

export function strip(text: string): string;

export function reset(text: string): string;

export function bold(text: string): string;

export function dim(text: string): string;

export function italic(text: string): string;

export function underline(text: string): string;

export function inverse(text: string): string;

export function hidden(text: string): string;

export function strikethrough(text: string): string;

export function black(text: string): string;

export function red(text: string): string;

export function green(text: string): string;

export function yellow(text: string): string;

export function blue(text: string): string;

export function magenta(text: string): string;

export function cyan(text: string): string;

export function white(text: string): string;

export function bright_black(text: string): string;

export function grey(text: string): string;

export function gray(text: string): string;

export function bright_red(text: string): string;

export function bright_green(text: string): string;

export function bright_yellow(text: string): string;

export function bright_blue(text: string): string;

export function bright_magenta(text: string): string;

export function bright_cyan(text: string): string;

export function bright_white(text: string): string;

export function pink(text: string): string;

export function hex(text: string, colour: number): string;

export function colour(text: string, colour: $gc_colour.Colour$): string;

export function color(text: string, color: $gc_colour.Colour$): string;

export function bg_black(text: string): string;

export function bg_red(text: string): string;

export function bg_green(text: string): string;

export function bg_yellow(text: string): string;

export function bg_blue(text: string): string;

export function bg_magenta(text: string): string;

export function bg_cyan(text: string): string;

export function bg_white(text: string): string;

export function bg_bright_black(text: string): string;

export function bg_bright_red(text: string): string;

export function bg_bright_green(text: string): string;

export function bg_bright_yellow(text: string): string;

export function bg_bright_blue(text: string): string;

export function bg_bright_magenta(text: string): string;

export function bg_bright_cyan(text: string): string;

export function bg_bright_white(text: string): string;

export function bg_pink(text: string): string;

export function bg_hex(text: string, colour: number): string;

export function bg_colour(text: string, colour: $gc_colour.Colour$): string;

export function bg_color(text: string, colour: $gc_colour.Colour$): string;
