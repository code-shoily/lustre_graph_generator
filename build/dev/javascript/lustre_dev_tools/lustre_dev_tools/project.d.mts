import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $tom from "../../tom/tom.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $error from "../lustre_dev_tools/error.d.mts";

export class Project extends _.CustomType {
  /** @deprecated */
  constructor(
    name: string,
    options: $dict.Dict$<string, $tom.Toml$>,
    root: string,
    src: string,
    dev: string,
    assets: string,
    bin: string,
    build: string,
    has_node_modules: boolean
  );
  /** @deprecated */
  name: string;
  /** @deprecated */
  options: $dict.Dict$<string, $tom.Toml$>;
  /** @deprecated */
  root: string;
  /** @deprecated */
  src: string;
  /** @deprecated */
  dev: string;
  /** @deprecated */
  assets: string;
  /** @deprecated */
  bin: string;
  /** @deprecated */
  build: string;
  /** @deprecated */
  has_node_modules: boolean;
}
export function Project$Project(
  name: string,
  options: $dict.Dict$<string, $tom.Toml$>,
  root: string,
  src: string,
  dev: string,
  assets: string,
  bin: string,
  build: string,
  has_node_modules: boolean,
): Project$;
export function Project$isProject(value: Project$): boolean;
export function Project$Project$0(value: Project$): string;
export function Project$Project$name(value: Project$): string;
export function Project$Project$1(value: Project$): $dict.Dict$<
  string,
  $tom.Toml$
>;
export function Project$Project$options(value: Project$): $dict.Dict$<
  string,
  $tom.Toml$
>;
export function Project$Project$2(value: Project$): string;
export function Project$Project$root(value: Project$): string;
export function Project$Project$3(value: Project$): string;
export function Project$Project$src(value: Project$): string;
export function Project$Project$4(value: Project$): string;
export function Project$Project$dev(value: Project$): string;
export function Project$Project$5(value: Project$): string;
export function Project$Project$assets(value: Project$): string;
export function Project$Project$6(value: Project$): string;
export function Project$Project$bin(value: Project$): string;
export function Project$Project$7(value: Project$): string;
export function Project$Project$build(value: Project$): string;
export function Project$Project$8(value: Project$): boolean;
export function Project$Project$has_node_modules(value: Project$): boolean;

export type Project$ = Project;

export function config(): Project$;

export function initialise(): _.Result<Project$, $error.Error$>;

export function exists(project: Project$, module: string): boolean;
