import type * as $set from "../../../gleam_stdlib/gleam/set.d.mts";
import type * as $model from "../../yog/model.d.mts";

export function erdos_renyi_gnp_with_type(
  n: number,
  p: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function erdos_renyi_gnp(n: number, p: number): $model.Graph$<
  undefined,
  number
>;

export function erdos_renyi_gnm_with_type(
  n: number,
  m: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function erdos_renyi_gnm(n: number, m: number): $model.Graph$<
  undefined,
  number
>;

export function watts_strogatz_with_type(
  n: number,
  k: number,
  p: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function watts_strogatz(n: number, k: number, p: number): $model.Graph$<
  undefined,
  number
>;

export function barabasi_albert_with_type(
  n: number,
  m: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function barabasi_albert(n: number, m: number): $model.Graph$<
  undefined,
  number
>;

export function random_tree_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function random_tree(n: number): $model.Graph$<undefined, number>;
