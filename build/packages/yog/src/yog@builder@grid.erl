-module(yog@builder@grid).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/builder/grid.gleam").
-export([coord_to_id/3, from_2d_list/3, id_to_coord/2, get_cell/3, to_graph/1, manhattan_distance/3, find_node/2]).
-export_type([grid/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " A builder for creating graphs from 2D grids.\n"
    "\n"
    " This module provides convenient ways to convert 2D grids (like heightmaps,\n"
    " mazes, or game boards) into graphs for pathfinding and traversal algorithms.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/grid\n"
    " import yog/model.{Directed}\n"
    " import yog/traversal.{BreadthFirst}\n"
    "\n"
    " pub fn main() {\n"
    "   // A simple heightmap where you can only climb up by 1\n"
    "   let heightmap = [\n"
    "     [1, 2, 3],\n"
    "     [4, 5, 6],\n"
    "     [7, 8, 9]\n"
    "   ]\n"
    "\n"
    "   // Build a graph where edges exist only if height diff <= 1\n"
    "   let grid = grid.from_2d_list(\n"
    "     heightmap,\n"
    "     Directed,\n"
    "     can_move: fn(from_height, to_height) {\n"
    "       to_height - from_height <= 1\n"
    "     }\n"
    "   )\n"
    "\n"
    "   // Convert to graph and use with algorithms\n"
    "   let graph = grid.to_graph(grid)\n"
    "   let start = grid.coord_to_id(0, 0, grid.cols)\n"
    "   let goal = grid.coord_to_id(2, 2, grid.cols)\n"
    "\n"
    "   traversal.walk_until(\n"
    "     from: start,\n"
    "     in: graph,\n"
    "     using: BreadthFirst,\n"
    "     until: fn(node) { node == goal }\n"
    "   )\n"
    " }\n"
    " ```\n"
).

-type grid(HJQ, HJR) :: {grid, yog@model:graph(HJQ, HJR), integer(), integer()}.

-file("src/yog/builder/grid.gleam", 175).
?DOC(
    " Converts grid coordinates (row, col) to a node ID.\n"
    "\n"
    " Uses row-major ordering: id = row * cols + col\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " grid.coord_to_id(0, 0, 3)  // => 0\n"
    " grid.coord_to_id(1, 2, 3)  // => 5\n"
    " grid.coord_to_id(2, 1, 3)  // => 7\n"
    " ```\n"
).
-spec coord_to_id(integer(), integer(), integer()) -> integer().
coord_to_id(Row, Col, Cols) ->
    (Row * Cols) + Col.

-file("src/yog/builder/grid.gleam", 82).
?DOC(
    " Creates a graph from a 2D list (list of rows).\n"
    "\n"
    " Each cell becomes a node, and edges are added between adjacent cells\n"
    " (up/down/left/right) if the `can_move` predicate returns True.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // A heightmap where you can only climb 1 unit at a time\n"
    " let heightmap = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]\n"
    "\n"
    " let grid = grid.from_2d_list(\n"
    "   heightmap,\n"
    "   model.Directed,\n"
    "   can_move: fn(from, to) { to - from <= 1 }\n"
    " )\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(rows * cols)\n"
).
-spec from_2d_list(
    list(list(HJS)),
    yog@model:graph_type(),
    fun((HJS, HJS) -> boolean())
) -> grid(HJS, integer()).
from_2d_list(Grid_data, Graph_type, Can_move) ->
    Rows = erlang:length(Grid_data),
    Cols = case Grid_data of
        [First_row | _] ->
            erlang:length(First_row);

        [] ->
            0
    end,
    Mut_graph = yog@model:new(Graph_type),
    Cells = begin
        _pipe = Grid_data,
        _pipe@2 = gleam@list:index_map(
            _pipe,
            fun(Row, Row_idx) -> _pipe@1 = Row,
                gleam@list:index_map(
                    _pipe@1,
                    fun(Cell, Col_idx) -> {Row_idx, Col_idx, Cell} end
                ) end
        ),
        lists:append(_pipe@2)
    end,
    Graph_with_nodes = begin
        _pipe@3 = Cells,
        gleam@list:fold(
            _pipe@3,
            Mut_graph,
            fun(G, Cell@1) ->
                {Row@1, Col, Data} = Cell@1,
                Id = coord_to_id(Row@1, Col, Cols),
                yog@model:add_node(G, Id, Data)
            end
        )
    end,
    Graph_with_edges = begin
        _pipe@4 = Cells,
        gleam@list:fold(
            _pipe@4,
            Graph_with_nodes,
            fun(G@1, Cell@2) ->
                {Row@2, Col@1, From_data} = Cell@2,
                From_id = coord_to_id(Row@2, Col@1, Cols),
                Neighbors = [{Row@2 - 1, Col@1},
                    {Row@2 + 1, Col@1},
                    {Row@2, Col@1 - 1},
                    {Row@2, Col@1 + 1}],
                _pipe@5 = Neighbors,
                gleam@list:fold(
                    _pipe@5,
                    G@1,
                    fun(Acc_g, Neighbor) ->
                        {N_row, N_col} = Neighbor,
                        case (((N_row >= 0) andalso (N_row < Rows)) andalso (N_col
                        >= 0))
                        andalso (N_col < Cols) of
                            false ->
                                Acc_g;

                            true ->
                                To_id = coord_to_id(N_row, N_col, Cols),
                                case gleam_stdlib:map_get(
                                    erlang:element(3, Graph_with_nodes),
                                    To_id
                                ) of
                                    {ok, To_data} ->
                                        case Can_move(From_data, To_data) of
                                            true ->
                                                yog@model:add_edge(
                                                    Acc_g,
                                                    From_id,
                                                    To_id,
                                                    1
                                                );

                                            false ->
                                                Acc_g
                                        end;

                                    {error, _} ->
                                        Acc_g
                                end
                        end
                    end
                )
            end
        )
    end,
    {grid, Graph_with_edges, Rows, Cols}.

-file("src/yog/builder/grid.gleam", 188).
?DOC(
    " Converts a node ID back to grid coordinates (row, col).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " grid.id_to_coord(0, 3)  // => #(0, 0)\n"
    " grid.id_to_coord(5, 3)  // => #(1, 2)\n"
    " grid.id_to_coord(7, 3)  // => #(2, 1)\n"
    " ```\n"
).
-spec id_to_coord(integer(), integer()) -> {integer(), integer()}.
id_to_coord(Id, Cols) ->
    {case Cols of
            0 -> 0;
            Gleam@denominator -> Id div Gleam@denominator
        end, case Cols of
            0 -> 0;
            Gleam@denominator@1 -> Id rem Gleam@denominator@1
        end}.

-file("src/yog/builder/grid.gleam", 204).
?DOC(
    " Gets the cell data at the specified grid coordinate.\n"
    "\n"
    " Returns `Ok(cell_data)` if the coordinate is valid, `Error(Nil)` otherwise.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " case grid.get_cell(grid, 1, 2) {\n"
    "   Ok(cell) -> // Use cell data\n"
    "   Error(_) -> // Out of bounds\n"
    " }\n"
    " ```\n"
).
-spec get_cell(grid(HJX, any()), integer(), integer()) -> {ok, HJX} |
    {error, nil}.
get_cell(Grid, Row, Col) ->
    case (((Row >= 0) andalso (Row < erlang:element(3, Grid))) andalso (Col >= 0))
    andalso (Col < erlang:element(4, Grid)) of
        false ->
            {error, nil};

        true ->
            Id = coord_to_id(Row, Col, erlang:element(4, Grid)),
            gleam_stdlib:map_get(erlang:element(3, erlang:element(2, Grid)), Id)
    end.

-file("src/yog/builder/grid.gleam", 228).
?DOC(
    " Converts the grid to a standard `Graph`.\n"
    "\n"
    " The resulting graph can be used with all yog algorithms.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph = grid.to_graph(grid)\n"
    " // Now use with pathfinding, traversal, etc.\n"
    " ```\n"
).
-spec to_graph(grid(HKD, HKE)) -> yog@model:graph(HKD, HKE).
to_graph(Grid) ->
    erlang:element(2, Grid).

-file("src/yog/builder/grid.gleam", 246).
?DOC(
    " Calculates the Manhattan distance between two node IDs.\n"
    "\n"
    " This is useful as a heuristic for A* pathfinding on grids.\n"
    " Manhattan distance is the sum of absolute differences in coordinates:\n"
    " |x1 - x2| + |y1 - y2|\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let start = grid.coord_to_id(0, 0, 10)\n"
    " let goal = grid.coord_to_id(3, 4, 10)\n"
    " let distance = grid.manhattan_distance(start, goal, 10)\n"
    " // => 7 (3 + 4)\n"
    " ```\n"
).
-spec manhattan_distance(integer(), integer(), integer()) -> integer().
manhattan_distance(From_id, To_id, Cols) ->
    {From_row, From_col} = id_to_coord(From_id, Cols),
    {To_row, To_col} = id_to_coord(To_id, Cols),
    Row_diff = case From_row > To_row of
        true ->
            From_row - To_row;

        false ->
            To_row - From_row
    end,
    Col_diff = case From_col > To_col of
        true ->
            From_col - To_col;

        false ->
            To_col - From_col
    end,
    Row_diff + Col_diff.

-file("src/yog/builder/grid.gleam", 276).
?DOC(
    " Finds a node in the grid where the cell data matches a predicate.\n"
    "\n"
    " Returns the node ID of the first matching cell, or Error(Nil) if not found.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Find the starting position marked with 'S'\n"
    " case grid.find_node(grid, fn(cell) { cell == \"S\" }) {\n"
    "   Ok(start_id) -> // Use start_id\n"
    "   Error(_) -> // Not found\n"
    " }\n"
    " ```\n"
).
-spec find_node(grid(HKJ, any()), fun((HKJ) -> boolean())) -> {ok, integer()} |
    {error, nil}.
find_node(Grid, Predicate) ->
    Max_id = (erlang:element(3, Grid) * erlang:element(4, Grid)) - 1,
    _pipe = yog@internal@utils:range(0, Max_id),
    gleam@list:find_map(
        _pipe,
        fun(Id) ->
            case gleam_stdlib:map_get(
                erlang:element(3, erlang:element(2, Grid)),
                Id
            ) of
                {ok, Data} ->
                    case Predicate(Data) of
                        true ->
                            {ok, Id};

                        false ->
                            {error, nil}
                    end;

                {error, _} ->
                    {error, nil}
            end
        end
    ).
