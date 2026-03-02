import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $vattr from "../../../lustre/lustre/vdom/vattr.d.mts";
import type * as $vnode from "../../../lustre/lustre/vdom/vnode.d.mts";
import type * as $tom from "../../../tom/tom.d.mts";
import type * as $project from "../../lustre_dev_tools/project.d.mts";

export function generate(
  project: $project.Project$,
  entry: string,
  tailwind_entry: $option.Option$<string>,
  minify: boolean
): string;

export function dev(
  project: $project.Project$,
  entry: string,
  tailwind_entry: $option.Option$<string>
): string;
