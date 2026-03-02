import type * as $booklet from "../../../booklet/booklet.d.mts";
import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $group_registry from "../../../group_registry/group_registry.d.mts";
import type * as $polly from "../../../polly/polly.d.mts";
import type * as $simplifile from "../../../simplifile/simplifile.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $error from "../../lustre_dev_tools/error.d.mts";
import type * as $port from "../../lustre_dev_tools/port.d.mts";
import type * as $project from "../../lustre_dev_tools/project.d.mts";

export class Events extends _.CustomType {}
export function Mode$Events(): Mode$;
export function Mode$isEvents(value: Mode$): boolean;

export class Polling extends _.CustomType {}
export function Mode$Polling(): Mode$;
export function Mode$isPolling(value: Mode$): boolean;

export type Mode$ = Events | Polling;

export class Change extends _.CustomType {
  /** @deprecated */
  constructor(in$: string, path: string);
  /** @deprecated */
  in$: string;
  /** @deprecated */
  path: string;
}
export function Event$Change(in$: string, path: string): Event$;
export function Event$isChange(value: Event$): boolean;
export function Event$Change$0(value: Event$): string;
export function Event$Change$in(value: Event$): string;
export function Event$Change$1(value: Event$): string;
export function Event$Change$path(value: Event$): string;

export class Styles extends _.CustomType {}
export function Event$Styles(): Event$;
export function Event$isStyles(value: Event$): boolean;

export class BuildError extends _.CustomType {}
export function Event$BuildError(): Event$;
export function Event$isBuildError(value: Event$): boolean;

export type Event$ = Change | Styles | BuildError;

declare class Waiting extends _.CustomType {
  /** @deprecated */
  constructor(self: $process.Subject$<BuildMessage$>);
  /** @deprecated */
  self: $process.Subject$<BuildMessage$>;
}

declare class Buffering extends _.CustomType {
  /** @deprecated */
  constructor(self: $process.Subject$<BuildMessage$>, timer: $process.Timer$);
  /** @deprecated */
  self: $process.Subject$<BuildMessage$>;
  /** @deprecated */
  timer: $process.Timer$;
}

declare class Building extends _.CustomType {
  /** @deprecated */
  constructor(
    self: $process.Subject$<BuildMessage$>,
    in$: string,
    path: string,
    queued: $option.Option$<[string, string]>
  );
  /** @deprecated */
  self: $process.Subject$<BuildMessage$>;
  /** @deprecated */
  in$: string;
  /** @deprecated */
  path: string;
  /** @deprecated */
  queued: $option.Option$<[string, string]>;
}

type BuildState$ = Waiting | Buffering | Building;

declare class BuildFinished extends _.CustomType {
  /** @deprecated */
  constructor(result: _.Result<undefined, $error.Error$>);
  /** @deprecated */
  result: _.Result<undefined, $error.Error$>;
}

declare class FileChanged extends _.CustomType {
  /** @deprecated */
  constructor(in$: string, path: string);
  /** @deprecated */
  in$: string;
  /** @deprecated */
  path: string;
}

declare class TimerCompleted extends _.CustomType {
  /** @deprecated */
  constructor(in$: string, path: string);
  /** @deprecated */
  in$: string;
  /** @deprecated */
  path: string;
}

type BuildMessage$ = BuildFinished | FileChanged | TimerCompleted;

export type Watcher = $group_registry.GroupRegistry$<Event$>;

export function subscribe(
  registry: $group_registry.GroupRegistry$<Event$>,
  client: $process.Pid$
): $process.Subject$<Event$>;

export function unsubscribe(
  registry: $group_registry.GroupRegistry$<Event$>,
  client: $process.Pid$
): undefined;

export function start(
  project: $project.Project$,
  mode: $option.Option$<Mode$>,
  error: $booklet.Booklet$<$option.Option$<$error.Error$>>,
  watch: _.List<string>,
  tailwind_entry: $option.Option$<string>
): _.Result<$group_registry.GroupRegistry$<Event$>, $error.Error$>;
