/// <reference types="./grid.d.mts" />
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  CustomType as $CustomType,
  remainderInt,
  divideInt,
} from "../../gleam.mjs";
import * as $utils from "../../yog/internal/utils.mjs";
import * as $model from "../../yog/model.mjs";

export class Grid extends $CustomType {
  constructor(graph, rows, cols) {
    super();
    this.graph = graph;
    this.rows = rows;
    this.cols = cols;
  }
}
export const Grid$Grid = (graph, rows, cols) => new Grid(graph, rows, cols);
export const Grid$isGrid = (value) => value instanceof Grid;
export const Grid$Grid$graph = (value) => value.graph;
export const Grid$Grid$0 = (value) => value.graph;
export const Grid$Grid$rows = (value) => value.rows;
export const Grid$Grid$1 = (value) => value.rows;
export const Grid$Grid$cols = (value) => value.cols;
export const Grid$Grid$2 = (value) => value.cols;

/**
 * Converts grid coordinates (row, col) to a node ID.
 *
 * Uses row-major ordering: id = row * cols + col
 *
 * ## Example
 *
 * ```gleam
 * grid.coord_to_id(0, 0, 3)  // => 0
 * grid.coord_to_id(1, 2, 3)  // => 5
 * grid.coord_to_id(2, 1, 3)  // => 7
 * ```
 */
export function coord_to_id(row, col, cols) {
  return row * cols + col;
}

/**
 * Creates a graph from a 2D list (list of rows).
 *
 * Each cell becomes a node, and edges are added between adjacent cells
 * (up/down/left/right) if the `can_move` predicate returns True.
 *
 * ## Example
 *
 * ```gleam
 * // A heightmap where you can only climb 1 unit at a time
 * let heightmap = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * let grid = grid.from_2d_list(
 *   heightmap,
 *   model.Directed,
 *   can_move: fn(from, to) { to - from <= 1 }
 * )
 * ```
 *
 * **Time Complexity:** O(rows * cols)
 */
export function from_2d_list(grid_data, graph_type, can_move) {
  let rows = $list.length(grid_data);
  let _block;
  if (grid_data instanceof $Empty) {
    _block = 0;
  } else {
    let first_row = grid_data.head;
    _block = $list.length(first_row);
  }
  let cols = _block;
  let mut_graph = $model.new$(graph_type);
  let _block$1;
  let _pipe = grid_data;
  let _pipe$1 = $list.index_map(
    _pipe,
    (row, row_idx) => {
      let _pipe$1 = row;
      return $list.index_map(
        _pipe$1,
        (cell, col_idx) => { return [row_idx, col_idx, cell]; },
      );
    },
  );
  _block$1 = $list.flatten(_pipe$1);
  let cells = _block$1;
  let _block$2;
  let _pipe$2 = cells;
  _block$2 = $list.fold(
    _pipe$2,
    mut_graph,
    (g, cell) => {
      let row;
      let col;
      let data;
      row = cell[0];
      col = cell[1];
      data = cell[2];
      let id = coord_to_id(row, col, cols);
      return $model.add_node(g, id, data);
    },
  );
  let graph_with_nodes = _block$2;
  let _block$3;
  let _pipe$3 = cells;
  _block$3 = $list.fold(
    _pipe$3,
    graph_with_nodes,
    (g, cell) => {
      let row;
      let col;
      let from_data;
      row = cell[0];
      col = cell[1];
      from_data = cell[2];
      let from_id = coord_to_id(row, col, cols);
      let neighbors = toList([
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ]);
      let _pipe$4 = neighbors;
      return $list.fold(
        _pipe$4,
        g,
        (acc_g, neighbor) => {
          let n_row;
          let n_col;
          n_row = neighbor[0];
          n_col = neighbor[1];
          let $ = (((n_row >= 0) && (n_row < rows)) && (n_col >= 0)) && (n_col < cols);
          if ($) {
            let to_id = coord_to_id(n_row, n_col, cols);
            let $1 = $dict.get(graph_with_nodes.nodes, to_id);
            if ($1 instanceof Ok) {
              let to_data = $1[0];
              let $2 = can_move(from_data, to_data);
              if ($2) {
                return $model.add_edge(acc_g, from_id, to_id, 1);
              } else {
                return acc_g;
              }
            } else {
              return acc_g;
            }
          } else {
            return acc_g;
          }
        },
      );
    },
  );
  let graph_with_edges = _block$3;
  return new Grid(graph_with_edges, rows, cols);
}

/**
 * Converts a node ID back to grid coordinates (row, col).
 *
 * ## Example
 *
 * ```gleam
 * grid.id_to_coord(0, 3)  // => #(0, 0)
 * grid.id_to_coord(5, 3)  // => #(1, 2)
 * grid.id_to_coord(7, 3)  // => #(2, 1)
 * ```
 */
export function id_to_coord(id, cols) {
  return [divideInt(id, cols), remainderInt(id, cols)];
}

/**
 * Gets the cell data at the specified grid coordinate.
 *
 * Returns `Ok(cell_data)` if the coordinate is valid, `Error(Nil)` otherwise.
 *
 * ## Example
 *
 * ```gleam
 * case grid.get_cell(grid, 1, 2) {
 *   Ok(cell) -> // Use cell data
 *   Error(_) -> // Out of bounds
 * }
 * ```
 */
export function get_cell(grid, row, col) {
  let $ = (((row >= 0) && (row < grid.rows)) && (col >= 0)) && (col < grid.cols);
  if ($) {
    let id = coord_to_id(row, col, grid.cols);
    return $dict.get(grid.graph.nodes, id);
  } else {
    return new Error(undefined);
  }
}

/**
 * Converts the grid to a standard `Graph`.
 *
 * The resulting graph can be used with all yog algorithms.
 *
 * ## Example
 *
 * ```gleam
 * let graph = grid.to_graph(grid)
 * // Now use with pathfinding, traversal, etc.
 * ```
 */
export function to_graph(grid) {
  return grid.graph;
}

/**
 * Calculates the Manhattan distance between two node IDs.
 *
 * This is useful as a heuristic for A* pathfinding on grids.
 * Manhattan distance is the sum of absolute differences in coordinates:
 * |x1 - x2| + |y1 - y2|
 *
 * ## Example
 *
 * ```gleam
 * let start = grid.coord_to_id(0, 0, 10)
 * let goal = grid.coord_to_id(3, 4, 10)
 * let distance = grid.manhattan_distance(start, goal, 10)
 * // => 7 (3 + 4)
 * ```
 */
export function manhattan_distance(from_id, to_id, cols) {
  let $ = id_to_coord(from_id, cols);
  let from_row;
  let from_col;
  from_row = $[0];
  from_col = $[1];
  let $1 = id_to_coord(to_id, cols);
  let to_row;
  let to_col;
  to_row = $1[0];
  to_col = $1[1];
  let _block;
  let $2 = from_row > to_row;
  if ($2) {
    _block = from_row - to_row;
  } else {
    _block = to_row - from_row;
  }
  let row_diff = _block;
  let _block$1;
  let $3 = from_col > to_col;
  if ($3) {
    _block$1 = from_col - to_col;
  } else {
    _block$1 = to_col - from_col;
  }
  let col_diff = _block$1;
  return row_diff + col_diff;
}

/**
 * Finds a node in the grid where the cell data matches a predicate.
 *
 * Returns the node ID of the first matching cell, or Error(Nil) if not found.
 *
 * ## Example
 *
 * ```gleam
 * // Find the starting position marked with 'S'
 * case grid.find_node(grid, fn(cell) { cell == "S" }) {
 *   Ok(start_id) -> // Use start_id
 *   Error(_) -> // Not found
 * }
 * ```
 */
export function find_node(grid, predicate) {
  let max_id = grid.rows * grid.cols - 1;
  let _pipe = $utils.range(0, max_id);
  return $list.find_map(
    _pipe,
    (id) => {
      let $ = $dict.get(grid.graph.nodes, id);
      if ($ instanceof Ok) {
        let data = $[0];
        let $1 = predicate(data);
        if ($1) {
          return new Ok(id);
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    },
  );
}
