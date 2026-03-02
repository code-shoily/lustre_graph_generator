import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $glint from "../../glint/glint.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $proxy from "../lustre_dev_tools/dev/proxy.d.mts";
import type * as $watcher from "../lustre_dev_tools/dev/watcher.d.mts";
import type * as $error from "../lustre_dev_tools/error.d.mts";
import type * as $project from "../lustre_dev_tools/project.d.mts";

declare class AddOptions extends _.CustomType {
  /** @deprecated */
  constructor(integrations: _.List<string>, timeout: number);
  /** @deprecated */
  integrations: _.List<string>;
  /** @deprecated */
  timeout: number;
}

type AddOptions$ = AddOptions;

declare class BuildOptions extends _.CustomType {
  /** @deprecated */
  constructor(
    minify: boolean,
    outdir: string,
    entries: _.List<string>,
    skip_html: boolean,
    skip_tailwind: boolean
  );
  /** @deprecated */
  minify: boolean;
  /** @deprecated */
  outdir: string;
  /** @deprecated */
  entries: _.List<string>;
  /** @deprecated */
  skip_html: boolean;
  /** @deprecated */
  skip_tailwind: boolean;
}

type BuildOptions$ = BuildOptions;

declare class StartOptions extends _.CustomType {
  /** @deprecated */
  constructor(
    watch: _.List<string>,
    watch_mode: $option.Option$<$watcher.Mode$>,
    proxy: $proxy.Proxy$,
    entry: string,
    tailwind_entry: $option.Option$<string>,
    host: string,
    port: number
  );
  /** @deprecated */
  watch: _.List<string>;
  /** @deprecated */
  watch_mode: $option.Option$<$watcher.Mode$>;
  /** @deprecated */
  proxy: $proxy.Proxy$;
  /** @deprecated */
  entry: string;
  /** @deprecated */
  tailwind_entry: $option.Option$<string>;
  /** @deprecated */
  host: string;
  /** @deprecated */
  port: number;
}

type StartOptions$ = StartOptions;

export function main(): undefined;
