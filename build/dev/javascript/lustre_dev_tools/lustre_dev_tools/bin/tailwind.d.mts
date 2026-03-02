import type * as _ from "../../gleam.d.mts";
import type * as $error from "../../lustre_dev_tools/error.d.mts";
import type * as $project from "../../lustre_dev_tools/project.d.mts";

export class HasViableEntry extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Detection$HasViableEntry(path: string): Detection$;
export function Detection$isHasViableEntry(value: Detection$): boolean;
export function Detection$HasViableEntry$0(value: Detection$): string;
export function Detection$HasViableEntry$path(value: Detection$): string;

export class HasTailwindEntry extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Detection$HasTailwindEntry(path: string): Detection$;
export function Detection$isHasTailwindEntry(value: Detection$): boolean;
export function Detection$HasTailwindEntry$0(value: Detection$): string;
export function Detection$HasTailwindEntry$path(value: Detection$): string;

export class HasLegacyConfig extends _.CustomType {}
export function Detection$HasLegacyConfig(): Detection$;
export function Detection$isHasLegacyConfig(value: Detection$): boolean;

export class Nothing extends _.CustomType {}
export function Detection$Nothing(): Detection$;
export function Detection$isNothing(value: Detection$): boolean;

export type Detection$ = HasViableEntry | HasTailwindEntry | HasLegacyConfig | Nothing;

export function detect(project: $project.Project$, entry: string): _.Result<
  Detection$,
  $error.Error$
>;

export function download(
  project: $project.Project$,
  quiet: boolean,
  timeout_ms: number
): _.Result<string, $error.Error$>;

export function build(
  project: $project.Project$,
  entry: string,
  out: string,
  minify: boolean,
  quiet: boolean
): _.Result<undefined, $error.Error$>;

export function watch(
  project: $project.Project$,
  entry: string,
  out: string,
  quiet: boolean,
  handle_change: () => undefined
): _.Result<undefined, $error.Error$>;
