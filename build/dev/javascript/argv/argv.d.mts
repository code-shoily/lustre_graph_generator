import type * as _ from "./gleam.d.mts";

export class Argv extends _.CustomType {
  /** @deprecated */
  constructor(runtime: string, program: string, arguments$: _.List<string>);
  /** @deprecated */
  runtime: string;
  /** @deprecated */
  program: string;
  /** @deprecated */
  arguments$: _.List<string>;
}
export function Argv$Argv(
  runtime: string,
  program: string,
  arguments$: _.List<string>,
): Argv$;
export function Argv$isArgv(value: Argv$): boolean;
export function Argv$Argv$0(value: Argv$): string;
export function Argv$Argv$runtime(value: Argv$): string;
export function Argv$Argv$1(value: Argv$): string;
export function Argv$Argv$program(value: Argv$): string;
export function Argv$Argv$2(value: Argv$): _.List<string>;
export function Argv$Argv$arguments(value: Argv$): _.List<string>;

export type Argv$ = Argv;

export function load(): Argv$;
