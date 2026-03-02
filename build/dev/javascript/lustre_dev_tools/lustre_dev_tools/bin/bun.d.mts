import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $error from "../../lustre_dev_tools/error.d.mts";
import type * as $port from "../../lustre_dev_tools/port.d.mts";
import type * as $project from "../../lustre_dev_tools/project.d.mts";

export function download(
  project: $project.Project$,
  quiet: boolean,
  timeout_ms: number
): _.Result<string, $error.Error$>;

export function watch(
  project: $project.Project$,
  directories: _.List<string>,
  on_change: (x0: string, x1: string) => undefined
): _.Result<$process.Subject$<$port.Message$>, $error.Error$>;

export function build(
  project: $project.Project$,
  entries: _.List<string>,
  outdir: string,
  minify: boolean,
  quiet: boolean
): _.Result<undefined, $error.Error$>;
