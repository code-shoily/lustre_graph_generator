import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";

export function has_eulerian_circuit(graph: $model.Graph$<any, any>): boolean;

export function has_eulerian_path(graph: $model.Graph$<any, any>): boolean;

export function find_eulerian_circuit(graph: $model.Graph$<any, any>): $option.Option$<
  _.List<number>
>;

export function find_eulerian_path(graph: $model.Graph$<any, any>): $option.Option$<
  _.List<number>
>;
