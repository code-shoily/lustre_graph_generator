import type * as _ from "../../gleam.d.mts";
import type * as $model from "../../yog/model.d.mts";

export class Grid<AMHP, AMHQ> extends _.CustomType {
  /** @deprecated */
  constructor(graph: $model.Graph$<any, any>, rows: number, cols: number);
  /** @deprecated */
  graph: $model.Graph$<any, any>;
  /** @deprecated */
  rows: number;
  /** @deprecated */
  cols: number;
}
export function Grid$Grid<AMHP, AMHQ>(
  graph: $model.Graph$<any, any>,
  rows: number,
  cols: number,
): Grid$<AMHP, AMHQ>;
export function Grid$isGrid<AMHQ, AMHP>(value: Grid$<AMHP, AMHQ>): boolean;
export function Grid$Grid$0<AMHP, AMHQ>(value: Grid$<AMHP, AMHQ>): $model.Graph$<
  any,
  any
>;
export function Grid$Grid$graph<AMHQ, AMHP>(value: Grid$<AMHP, AMHQ>): $model.Graph$<
  any,
  any
>;
export function Grid$Grid$1<AMHP, AMHQ>(value: Grid$<AMHP, AMHQ>): number;
export function Grid$Grid$rows<AMHP, AMHQ>(value: Grid$<AMHP, AMHQ>): number;
export function Grid$Grid$2<AMHP, AMHQ>(value: Grid$<AMHP, AMHQ>): number;
export function Grid$Grid$cols<AMHP, AMHQ>(value: Grid$<AMHP, AMHQ>): number;

export type Grid$<AMHP, AMHQ> = Grid<AMHQ, AMHP>;

export function coord_to_id(row: number, col: number, cols: number): number;

export function from_2d_list<AMHR>(
  grid_data: _.List<_.List<AMHR>>,
  graph_type: $model.GraphType$,
  can_move: (x0: AMHR, x1: AMHR) => boolean
): Grid$<AMHR, number>;

export function id_to_coord(id: number, cols: number): [number, number];

export function get_cell<AMHW>(grid: Grid$<AMHW, any>, row: number, col: number): _.Result<
  AMHW,
  undefined
>;

export function to_graph<AMIC, AMID>(grid: Grid$<AMIC, AMID>): $model.Graph$<
  AMIC,
  AMID
>;

export function manhattan_distance(from_id: number, to_id: number, cols: number): number;

export function find_node<AMII>(
  grid: Grid$<AMII, any>,
  predicate: (x0: AMII) => boolean
): _.Result<number, undefined>;
