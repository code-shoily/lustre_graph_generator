import type * as $model from "../../yog/model.d.mts";

export function complete_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function complete(n: number): $model.Graph$<undefined, number>;

export function cycle_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function cycle(n: number): $model.Graph$<undefined, number>;

export function path_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function path(n: number): $model.Graph$<undefined, number>;

export function star_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function star(n: number): $model.Graph$<undefined, number>;

export function wheel_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function wheel(n: number): $model.Graph$<undefined, number>;

export function complete_bipartite_with_type(
  m: number,
  n: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function complete_bipartite(m: number, n: number): $model.Graph$<
  undefined,
  number
>;

export function empty_with_type(n: number, graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function empty(n: number): $model.Graph$<undefined, number>;

export function grid_2d_with_type(
  rows: number,
  cols: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function grid_2d(rows: number, cols: number): $model.Graph$<
  undefined,
  number
>;

export function petersen_with_type(graph_type: $model.GraphType$): $model.Graph$<
  undefined,
  number
>;

export function petersen(): $model.Graph$<undefined, number>;

export function binary_tree_with_type(
  depth: number,
  graph_type: $model.GraphType$
): $model.Graph$<undefined, number>;

export function binary_tree(depth: number): $model.Graph$<undefined, number>;
