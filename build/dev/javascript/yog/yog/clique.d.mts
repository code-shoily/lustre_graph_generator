import type * as $set from "../../gleam_stdlib/gleam/set.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export function all_maximal_cliques(graph: $model.Graph$<any, any>): _.List<
  $set.Set$<number>
>;

export function max_clique(graph: $model.Graph$<any, any>): $set.Set$<number>;

export function k_cliques(graph: $model.Graph$<any, any>, k: number): _.List<
  $set.Set$<number>
>;
