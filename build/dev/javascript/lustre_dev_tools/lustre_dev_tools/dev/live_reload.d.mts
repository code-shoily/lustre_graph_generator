import type * as $booklet from "../../../booklet/booklet.d.mts";
import type * as $request from "../../../gleam_http/gleam/http/request.d.mts";
import type * as $response from "../../../gleam_http/gleam/http/response.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $group_registry from "../../../group_registry/group_registry.d.mts";
import type * as $mist from "../../../mist/mist.d.mts";
import type * as $http from "../../../mist/mist/internal/http.d.mts";
import type * as $watcher from "../../lustre_dev_tools/dev/watcher.d.mts";
import type * as $error from "../../lustre_dev_tools/error.d.mts";
import type * as $project from "../../lustre_dev_tools/project.d.mts";

export function start(
  request: $request.Request$<$http.Connection$>,
  project: $project.Project$,
  error: $booklet.Booklet$<$option.Option$<$error.Error$>>,
  watcher: $group_registry.GroupRegistry$<$watcher.Event$>
): $response.Response$<$mist.ResponseData$>;
