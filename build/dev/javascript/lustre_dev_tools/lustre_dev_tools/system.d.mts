import type * as _ from "../gleam.d.mts";

export function detect_os(): string;

export function executable_name(name: string): string;

export function detect_arch(): string;

export function is_alpine(): boolean;

export function run(
  command: string,
  args: _.List<string>,
  variables: _.List<[string, string]>
): _.Result<string, string>;

export function find(executable: string): _.Result<string, undefined>;

export function cwd(): string;

export function exit(code: number): undefined;
