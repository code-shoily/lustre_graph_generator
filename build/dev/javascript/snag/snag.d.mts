import type * as _ from "./gleam.d.mts";

export class Snag extends _.CustomType {
  /** @deprecated */
  constructor(issue: string, cause: _.List<string>);
  /** @deprecated */
  issue: string;
  /** @deprecated */
  cause: _.List<string>;
}
export function Snag$Snag(issue: string, cause: _.List<string>): Snag$;
export function Snag$isSnag(value: Snag$): boolean;
export function Snag$Snag$0(value: Snag$): string;
export function Snag$Snag$issue(value: Snag$): string;
export function Snag$Snag$1(value: Snag$): _.List<string>;
export function Snag$Snag$cause(value: Snag$): _.List<string>;

export type Snag$ = Snag;

export type Result = _.Result<any, Snag$>;

export function new$(issue: string): Snag$;

export function error(issue: string): _.Result<any, Snag$>;

export function layer(snag: Snag$, issue: string): Snag$;

export function context<MFO>(result: _.Result<MFO, Snag$>, issue: string): _.Result<
  MFO,
  Snag$
>;

export function map_error<MFR, MFS>(
  result: _.Result<MFR, MFS>,
  describer: (x0: MFS) => string
): _.Result<MFR, Snag$>;

export function replace_error<MFW>(result: _.Result<MFW, any>, issue: string): _.Result<
  MFW,
  Snag$
>;

export function pretty_print(snag: Snag$): string;

export function line_print(snag: Snag$): string;
