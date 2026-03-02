import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $glint from "../../glint/glint.d.mts";
import type * as $tom from "../../tom/tom.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $error from "../lustre_dev_tools/error.d.mts";
import type * as $project from "../lustre_dev_tools/project.d.mts";

export function log(message: string, quiet: boolean): undefined;

export function success(message: string, quiet: boolean): undefined;

export function string<AIFD>(
  name: string,
  path: _.List<string>,
  project: $project.Project$,
  description: string,
  continue$: (x0: (x0: $glint.Flags$) => _.Result<string, $error.Error$>) => $glint.Command$<
    AIFD
  >
): $glint.Command$<AIFD>;

export function bool<AIEX>(
  name: string,
  path: _.List<string>,
  project: $project.Project$,
  description: string,
  continue$: (x0: (x0: $glint.Flags$) => _.Result<boolean, $error.Error$>) => $glint.Command$<
    AIEX
  >
): $glint.Command$<AIEX>;

export function string_list<AIFK>(
  name: string,
  path: _.List<string>,
  project: $project.Project$,
  description: string,
  continue$: (
    x0: (x0: $glint.Flags$) => _.Result<_.List<string>, $error.Error$>
  ) => $glint.Command$<AIFK>
): $glint.Command$<AIFK>;

export function int<AIFQ>(
  name: string,
  path: _.List<string>,
  project: $project.Project$,
  description: string,
  continue$: (x0: (x0: $glint.Flags$) => _.Result<number, $error.Error$>) => $glint.Command$<
    AIFQ
  >
): $glint.Command$<AIFQ>;
