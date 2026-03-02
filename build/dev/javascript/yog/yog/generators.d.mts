import type * as $model from "../yog/model.d.mts";

export const complete: (x0: number) => $model.Graph$<undefined, number>;

export const complete_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const cycle: (x0: number) => $model.Graph$<undefined, number>;

export const cycle_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const path: (x0: number) => $model.Graph$<undefined, number>;

export const path_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const star: (x0: number) => $model.Graph$<undefined, number>;

export const star_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const wheel: (x0: number) => $model.Graph$<undefined, number>;

export const wheel_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const complete_bipartite: (x0: number, x1: number) => $model.Graph$<
  undefined,
  number
>;

export const complete_bipartite_with_type: (
  x0: number,
  x1: number,
  x2: $model.GraphType$
) => $model.Graph$<undefined, number>;

export const empty: (x0: number) => $model.Graph$<undefined, number>;

export const empty_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const binary_tree: (x0: number) => $model.Graph$<undefined, number>;

export const binary_tree_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const grid_2d: (x0: number, x1: number) => $model.Graph$<
  undefined,
  number
>;

export const grid_2d_with_type: (x0: number, x1: number, x2: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const petersen: () => $model.Graph$<undefined, number>;

export const petersen_with_type: (x0: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;

export const erdos_renyi_gnp: (x0: number, x1: number) => $model.Graph$<
  undefined,
  number
>;

export const erdos_renyi_gnp_with_type: (
  x0: number,
  x1: number,
  x2: $model.GraphType$
) => $model.Graph$<undefined, number>;

export const erdos_renyi_gnm: (x0: number, x1: number) => $model.Graph$<
  undefined,
  number
>;

export const erdos_renyi_gnm_with_type: (
  x0: number,
  x1: number,
  x2: $model.GraphType$
) => $model.Graph$<undefined, number>;

export const barabasi_albert: (x0: number, x1: number) => $model.Graph$<
  undefined,
  number
>;

export const barabasi_albert_with_type: (
  x0: number,
  x1: number,
  x2: $model.GraphType$
) => $model.Graph$<undefined, number>;

export const watts_strogatz: (x0: number, x1: number, x2: number) => $model.Graph$<
  undefined,
  number
>;

export const watts_strogatz_with_type: (
  x0: number,
  x1: number,
  x2: number,
  x3: $model.GraphType$
) => $model.Graph$<undefined, number>;

export const random_tree: (x0: number) => $model.Graph$<undefined, number>;

export const random_tree_with_type: (x0: number, x1: $model.GraphType$) => $model.Graph$<
  undefined,
  number
>;
