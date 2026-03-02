import type * as $booklet from "../../../booklet/booklet.d.mts";
import type * as $request from "../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $static_supervisor from "../../../gleam_otp/gleam/otp/static_supervisor.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $group_registry from "../../../group_registry/group_registry.d.mts";
import type * as $wisp from "../../../wisp/wisp.d.mts";
import type * as $internal from "../../../wisp/wisp/internal.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $proxy from "../../lustre_dev_tools/dev/proxy.d.mts";
import type * as $watcher from "../../lustre_dev_tools/dev/watcher.d.mts";
import type * as $error from "../../lustre_dev_tools/error.d.mts";
import type * as $project from "../../lustre_dev_tools/project.d.mts";

declare class Context extends _.CustomType {
  /** @deprecated */
  constructor(
    project: $project.Project$,
    entry: string,
    tailwind_entry: $option.Option$<string>,
    priv: string,
    proxy: $proxy.Proxy$
  );
  /** @deprecated */
  project: $project.Project$;
  /** @deprecated */
  entry: string;
  /** @deprecated */
  tailwind_entry: $option.Option$<string>;
  /** @deprecated */
  priv: string;
  /** @deprecated */
  proxy: $proxy.Proxy$;
}

type Context$ = Context;

export function start(
  project: $project.Project$,
  error: $booklet.Booklet$<$option.Option$<$error.Error$>>,
  watcher: $group_registry.GroupRegistry$<$watcher.Event$>,
  proxy: $proxy.Proxy$,
  entry: string,
  tailwind_entry: $option.Option$<string>,
  host: string,
  port: number
): _.Result<$actor.Started$<$static_supervisor.Supervisor$>, $error.Error$>;
