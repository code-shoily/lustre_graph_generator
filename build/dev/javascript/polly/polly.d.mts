import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $simplifile from "../simplifile/simplifile.d.mts";
import type * as _ from "./gleam.d.mts";

export class Created extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Event$Created(path: string): Event$;
export function Event$isCreated(value: Event$): boolean;
export function Event$Created$0(value: Event$): string;
export function Event$Created$path(value: Event$): string;

export class Changed extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Event$Changed(path: string): Event$;
export function Event$isChanged(value: Event$): boolean;
export function Event$Changed$0(value: Event$): string;
export function Event$Changed$path(value: Event$): string;

export class Deleted extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Event$Deleted(path: string): Event$;
export function Event$isDeleted(value: Event$): boolean;
export function Event$Deleted$0(value: Event$): string;
export function Event$Deleted$path(value: Event$): string;

export class Error extends _.CustomType {
  /** @deprecated */
  constructor(path: string, reason: $simplifile.FileError$);
  /** @deprecated */
  path: string;
  /** @deprecated */
  reason: $simplifile.FileError$;
}
export function Event$Error(
  path: string,
  reason: $simplifile.FileError$,
): Event$;
export function Event$isError(value: Event$): boolean;
export function Event$Error$0(value: Event$): string;
export function Event$Error$path(value: Event$): string;
export function Event$Error$1(value: Event$): $simplifile.FileError$;
export function Event$Error$reason(value: Event$): $simplifile.FileError$;

export type Event$ = Created | Changed | Deleted | Error;

export function Event$path(value: Event$): string;

declare class Options extends _.CustomType {
  /** @deprecated */
  constructor(
    interval: number,
    paths: _.List<string>,
    max_depth: number,
    filter: (x0: $simplifile.FileType$, x1: string) => boolean,
    ignore_initial_missing: boolean,
    callbacks: _.List<(x0: Event$) => undefined>
  );
  /** @deprecated */
  interval: number;
  /** @deprecated */
  paths: _.List<string>;
  /** @deprecated */
  max_depth: number;
  /** @deprecated */
  filter: (x0: $simplifile.FileType$, x1: string) => boolean;
  /** @deprecated */
  ignore_initial_missing: boolean;
  /** @deprecated */
  callbacks: _.List<(x0: Event$) => undefined>;
}

export type Options$ = Options;

declare class Watcher extends _.CustomType {
  /** @deprecated */
  constructor(stop: () => undefined);
  /** @deprecated */
  stop: () => undefined;
}

export type Watcher$ = Watcher;

declare class File extends _.CustomType {
  /** @deprecated */
  constructor(name: string, modkey: number);
  /** @deprecated */
  name: string;
  /** @deprecated */
  modkey: number;
}

declare class Folder extends _.CustomType {
  /** @deprecated */
  constructor(name: string, modkey: number, children: _.List<Vfs$>);
  /** @deprecated */
  name: string;
  /** @deprecated */
  modkey: number;
  /** @deprecated */
  children: _.List<Vfs$>;
}

type Vfs$ = File | Folder;

export function add_dir(options: Options$, path: string): Options$;

export function add_file(options: Options$, path: string): Options$;

export function max_depth(options: Options$, max_depth: number): Options$;

export function interval(options: Options$, interval: number): Options$;

export function filter(
  options: Options$,
  filter: (x0: $simplifile.FileType$, x1: string) => boolean
): Options$;

export function default_filter(x0: $simplifile.FileType$, path: string): boolean;

export function new$(): Options$;

export function ignore_initial_missing(options: Options$): Options$;

export function add_callback(
  options: Options$,
  callback: (x0: Event$) => undefined
): Options$;

export function stop(watcher: Watcher$): undefined;

export function describe_errors(
  errors: _.List<[string, $simplifile.FileError$]>
): string;

export function watch(options: Options$): _.Result<
  Watcher$,
  _.List<[string, $simplifile.FileError$]>
>;
