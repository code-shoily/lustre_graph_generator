import type * as _ from "./gleam.d.mts";

export function tmp_dir(): _.Result<string, undefined>;

export function home_dir(): _.Result<string, undefined>;

export function cache_dir(): _.Result<string, undefined>;

export function config_dir(): _.Result<string, undefined>;

export function config_local_dir(): _.Result<string, undefined>;

export function data_dir(): _.Result<string, undefined>;

export function data_local_dir(): _.Result<string, undefined>;

export function executable_dir(): _.Result<string, undefined>;

export function preference_dir(): _.Result<string, undefined>;

export function runtime_dir(): _.Result<string, undefined>;

export function state_dir(): _.Result<string, undefined>;
