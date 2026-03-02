-module(yog@generators@classic).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/generators/classic.gleam").
-export([complete_with_type/2, complete/1, cycle_with_type/2, cycle/1, path_with_type/2, path/1, star_with_type/2, star/1, wheel_with_type/2, wheel/1, complete_bipartite_with_type/3, complete_bipartite/2, empty_with_type/2, empty/1, grid_2d_with_type/3, grid_2d/2, petersen_with_type/1, petersen/0, binary_tree_with_type/2, binary_tree/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " Classic graph patterns generator.\n"
    "\n"
    " This module provides functions to generate well-known graph structures:\n"
    " - **Complete graphs**: K_n where every node connects to every other\n"
    " - **Cycles**: C_n nodes forming a ring\n"
    " - **Paths**: P_n linear chains\n"
    " - **Stars**: Central hub with spokes\n"
    " - **Wheels**: Cycle with central hub\n"
    " - **Bipartite**: Complete bipartite graphs K_{m,n}\n"
    " - **Trees**: Binary trees, hierarchical structures\n"
    " - **Grids**: 2D lattices\n"
    " - **Famous graphs**: Petersen graph\n"
    "\n"
    " These generators are useful for:\n"
    " - **Testing**: Create graphs with known properties\n"
    " - **Benchmarking**: Generate graphs of various sizes\n"
    " - **Education**: Demonstrate algorithms on well-known structures\n"
    " - **Prototyping**: Quickly create graph structures\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/generators/classic\n"
    "\n"
    " pub fn main() {\n"
    "   // Generate a cycle graph with 5 nodes\n"
    "   let cycle = classic.cycle(5)\n"
    "\n"
    "   // Generate a complete graph with 4 nodes\n"
    "   let complete = classic.complete(4)\n"
    "\n"
    "   // Generate a binary tree of depth 3\n"
    "   let tree = classic.binary_tree(3)\n"
    " }\n"
    " ```\n"
).

-file("src/yog/generators/classic.gleam", 481).
-spec create_nodes(yog@model:graph(nil, AQJS), integer()) -> yog@model:graph(nil, AQJS).
create_nodes(Graph, N) ->
    _pipe = yog@internal@utils:range(0, N - 1),
    gleam@list:fold(
        _pipe,
        Graph,
        fun(G, I) -> yog@model:add_node(G, I, nil) end
    ).

-file("src/yog/generators/classic.gleam", 68).
?DOC(
    " Generates a complete graph with specified graph type.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let directed_k4 = generate.complete_with_type(4, model.Directed)\n"
    " ```\n"
).
-spec complete_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
complete_with_type(N, Graph_type) ->
    Graph = create_nodes(yog@model:new(Graph_type), N),
    case Graph_type of
        undirected ->
            _pipe = yog@internal@utils:range(0, N - 1),
            gleam@list:fold(
                _pipe,
                Graph,
                fun(G, I) -> _pipe@1 = yog@internal@utils:range(I + 1, N - 1),
                    gleam@list:fold(
                        _pipe@1,
                        G,
                        fun(Acc, J) -> yog@model:add_edge(Acc, I, J, 1) end
                    ) end
            );

        directed ->
            _pipe@2 = yog@internal@utils:range(0, N - 1),
            gleam@list:fold(
                _pipe@2,
                Graph,
                fun(G@1, I@1) -> _pipe@3 = yog@internal@utils:range(0, N - 1),
                    gleam@list:fold(
                        _pipe@3,
                        G@1,
                        fun(Acc@1, J@1) -> case I@1 =:= J@1 of
                                true ->
                                    Acc@1;

                                false ->
                                    yog@model:add_edge(Acc@1, I@1, J@1, 1)
                            end end
                    ) end
            )
    end.

-file("src/yog/generators/classic.gleam", 57).
?DOC(
    " Generates a complete graph K_n where every node is connected to every other node.\n"
    "\n"
    " In a complete graph with n nodes, there are n(n-1)/2 edges for undirected\n"
    " graphs and n(n-1) edges for directed graphs.\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(n²)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let k5 = generate.complete(5)\n"
    " // Creates a complete graph with 5 nodes\n"
    " // Each node connected to all other 4 nodes\n"
    " ```\n"
).
-spec complete(integer()) -> yog@model:graph(nil, integer()).
complete(N) ->
    complete_with_type(N, undirected).

-file("src/yog/generators/classic.gleam", 119).
?DOC(" Generates a cycle graph with specified graph type.\n").
-spec cycle_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
cycle_with_type(N, Graph_type) ->
    case N < 3 of
        true ->
            yog@model:new(Graph_type);

        false ->
            Graph = create_nodes(yog@model:new(Graph_type), N),
            _pipe = yog@internal@utils:range(0, N - 1),
            gleam@list:fold(
                _pipe,
                Graph,
                fun(G, I) ->
                    Next = case I =:= (N - 1) of
                        true ->
                            0;

                        false ->
                            I + 1
                    end,
                    yog@model:add_edge(G, I, Next, 1)
                end
            )
    end.

-file("src/yog/generators/classic.gleam", 114).
?DOC(
    " Generates a cycle graph C_n where nodes form a ring.\n"
    "\n"
    " A cycle graph connects n nodes in a circular pattern:\n"
    " 0 -> 1 -> 2 -> ... -> (n-1) -> 0\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(n)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let c6 = generate.cycle(6)\n"
    " // Creates a cycle: 0-1-2-3-4-5-0\n"
    " ```\n"
).
-spec cycle(integer()) -> yog@model:graph(nil, integer()).
cycle(N) ->
    cycle_with_type(N, undirected).

-file("src/yog/generators/classic.gleam", 158).
?DOC(" Generates a path graph with specified graph type.\n").
-spec path_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
path_with_type(N, Graph_type) ->
    case N < 2 of
        true ->
            create_nodes(yog@model:new(Graph_type), N);

        false ->
            Graph = create_nodes(yog@model:new(Graph_type), N),
            _pipe = yog@internal@utils:range(0, N - 2),
            gleam@list:fold(
                _pipe,
                Graph,
                fun(G, I) -> yog@model:add_edge(G, I, I + 1, 1) end
            )
    end.

-file("src/yog/generators/classic.gleam", 153).
?DOC(
    " Generates a path graph P_n where nodes form a linear chain.\n"
    "\n"
    " A path graph connects n nodes in a line:\n"
    " 0 - 1 - 2 - ... - (n-1)\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(n)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let p5 = generate.path(5)\n"
    " // Creates a path: 0-1-2-3-4\n"
    " ```\n"
).
-spec path(integer()) -> yog@model:graph(nil, integer()).
path(N) ->
    path_with_type(N, undirected).

-file("src/yog/generators/classic.gleam", 193).
?DOC(" Generates a star graph with specified graph type.\n").
-spec star_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
star_with_type(N, Graph_type) ->
    case N < 2 of
        true ->
            create_nodes(yog@model:new(Graph_type), N);

        false ->
            Graph = create_nodes(yog@model:new(Graph_type), N),
            _pipe = yog@internal@utils:range(1, N - 1),
            gleam@list:fold(
                _pipe,
                Graph,
                fun(G, I) -> yog@model:add_edge(G, 0, I, 1) end
            )
    end.

-file("src/yog/generators/classic.gleam", 188).
?DOC(
    " Generates a star graph where one central node is connected to all others.\n"
    "\n"
    " Node 0 is the center, connected to nodes 1 through n-1.\n"
    " A star with n nodes has n-1 edges.\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(n)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let s6 = generate.star(6)\n"
    " // Center node 0 connected to nodes 1, 2, 3, 4, 5\n"
    " ```\n"
).
-spec star(integer()) -> yog@model:graph(nil, integer()).
star(N) ->
    star_with_type(N, undirected).

-file("src/yog/generators/classic.gleam", 230).
?DOC(" Generates a wheel graph with specified graph type.\n").
-spec wheel_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
wheel_with_type(N, Graph_type) ->
    case N < 4 of
        true ->
            yog@model:new(Graph_type);

        false ->
            With_star = star_with_type(N, Graph_type),
            _pipe = yog@internal@utils:range(1, N - 1),
            gleam@list:fold(
                _pipe,
                With_star,
                fun(G, I) ->
                    Next = case I =:= (N - 1) of
                        true ->
                            1;

                        false ->
                            I + 1
                    end,
                    yog@model:add_edge(G, I, Next, 1)
                end
            )
    end.

-file("src/yog/generators/classic.gleam", 225).
?DOC(
    " Generates a wheel graph: a cycle with a central hub.\n"
    "\n"
    " A wheel graph is a cycle of n-1 nodes with an additional central node\n"
    " connected to all nodes in the cycle.\n"
    "\n"
    " Node 0 is the center, nodes 1 through n-1 form the cycle.\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(n)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let w6 = generate.wheel(6)\n"
    " // Center node 0, cycle 1-2-3-4-5-1, center connected to all\n"
    " ```\n"
).
-spec wheel(integer()) -> yog@model:graph(nil, integer()).
wheel(N) ->
    wheel_with_type(N, undirected).

-file("src/yog/generators/classic.gleam", 274).
?DOC(" Generates a complete bipartite graph with specified graph type.\n").
-spec complete_bipartite_with_type(integer(), integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
complete_bipartite_with_type(M, N, Graph_type) ->
    Total = M + N,
    Graph = create_nodes(yog@model:new(Graph_type), Total),
    _pipe = yog@internal@utils:range(0, M - 1),
    gleam@list:fold(
        _pipe,
        Graph,
        fun(G, Left) -> _pipe@1 = yog@internal@utils:range(M, Total - 1),
            gleam@list:fold(
                _pipe@1,
                G,
                fun(Acc, Right) -> yog@model:add_edge(Acc, Left, Right, 1) end
            ) end
    ).

-file("src/yog/generators/classic.gleam", 269).
?DOC(
    " Generates a complete bipartite graph K_{m,n}.\n"
    "\n"
    " A complete bipartite graph has two partitions of nodes where every node\n"
    " in the first partition is connected to every node in the second partition.\n"
    "\n"
    " Nodes 0 to m-1 form the left partition.\n"
    " Nodes m to m+n-1 form the right partition.\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(mn)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let k33 = generate.complete_bipartite(3, 3)\n"
    " // Nodes 0,1,2 on left, nodes 3,4,5 on right\n"
    " // All left nodes connected to all right nodes\n"
    " ```\n"
).
-spec complete_bipartite(integer(), integer()) -> yog@model:graph(nil, integer()).
complete_bipartite(M, N) ->
    complete_bipartite_with_type(M, N, undirected).

-file("src/yog/generators/classic.gleam", 309).
?DOC(" Generates an empty graph with specified graph type.\n").
-spec empty_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
empty_with_type(N, Graph_type) ->
    create_nodes(yog@model:new(Graph_type), N).

-file("src/yog/generators/classic.gleam", 304).
?DOC(
    " Generates an empty graph with n nodes and no edges.\n"
    "\n"
    " Useful as a starting point for custom graph construction.\n"
    "\n"
    " **Time Complexity:** O(n)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let empty = generate.empty(10)\n"
    " // 10 isolated nodes, no edges\n"
    " ```\n"
).
-spec empty(integer()) -> yog@model:graph(nil, integer()).
empty(N) ->
    empty_with_type(N, undirected).

-file("src/yog/generators/classic.gleam", 399).
?DOC(" Generates a 2D grid graph with specified graph type.\n").
-spec grid_2d_with_type(integer(), integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
grid_2d_with_type(Rows, Cols, Graph_type) ->
    N = Rows * Cols,
    Graph = create_nodes(yog@model:new(Graph_type), N),
    With_horizontal = begin
        _pipe = yog@internal@utils:range(0, Rows - 1),
        gleam@list:fold(
            _pipe,
            Graph,
            fun(G, Row) -> _pipe@1 = yog@internal@utils:range(0, Cols - 2),
                gleam@list:fold(
                    _pipe@1,
                    G,
                    fun(Acc, Col) ->
                        Node = (Row * Cols) + Col,
                        yog@model:add_edge(Acc, Node, Node + 1, 1)
                    end
                ) end
        )
    end,
    _pipe@2 = yog@internal@utils:range(0, Rows - 2),
    gleam@list:fold(
        _pipe@2,
        With_horizontal,
        fun(G@1, Row@1) -> _pipe@3 = yog@internal@utils:range(0, Cols - 1),
            gleam@list:fold(
                _pipe@3,
                G@1,
                fun(Acc@1, Col@1) ->
                    Node@1 = (Row@1 * Cols) + Col@1,
                    Below = Node@1 + Cols,
                    yog@model:add_edge(Acc@1, Node@1, Below, 1)
                end
            ) end
    ).

-file("src/yog/generators/classic.gleam", 394).
?DOC(
    " Generates a 2D grid graph (lattice).\n"
    "\n"
    " Creates a grid of rows × cols nodes arranged in a rectangular lattice.\n"
    " Each internal node has 4 neighbors (up, down, left, right).\n"
    " Edge nodes have fewer neighbors.\n"
    "\n"
    " Node IDs are assigned row-major: node_id = row * cols + col\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(rows * cols)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let grid = generate.grid_2d(3, 4)\n"
    " // Creates a 3×4 grid:\n"
    " //   0 - 1 - 2 - 3\n"
    " //   |   |   |   |\n"
    " //   4 - 5 - 6 - 7\n"
    " //   |   |   |   |\n"
    " //   8 - 9 -10 -11\n"
    " ```\n"
).
-spec grid_2d(integer(), integer()) -> yog@model:graph(nil, integer()).
grid_2d(Rows, Cols) ->
    grid_2d_with_type(Rows, Cols, undirected).

-file("src/yog/generators/classic.gleam", 450).
?DOC(" Generates a Petersen graph with specified graph type.\n").
-spec petersen_with_type(yog@model:graph_type()) -> yog@model:graph(nil, integer()).
petersen_with_type(Graph_type) ->
    Graph = create_nodes(yog@model:new(Graph_type), 10),
    With_outer = begin
        _pipe = Graph,
        _pipe@1 = yog@model:add_edge(_pipe, 0, 1, 1),
        _pipe@2 = yog@model:add_edge(_pipe@1, 1, 2, 1),
        _pipe@3 = yog@model:add_edge(_pipe@2, 2, 3, 1),
        _pipe@4 = yog@model:add_edge(_pipe@3, 3, 4, 1),
        yog@model:add_edge(_pipe@4, 4, 0, 1)
    end,
    With_inner = begin
        _pipe@5 = With_outer,
        _pipe@6 = yog@model:add_edge(_pipe@5, 5, 7, 1),
        _pipe@7 = yog@model:add_edge(_pipe@6, 7, 9, 1),
        _pipe@8 = yog@model:add_edge(_pipe@7, 9, 6, 1),
        _pipe@9 = yog@model:add_edge(_pipe@8, 6, 8, 1),
        yog@model:add_edge(_pipe@9, 8, 5, 1)
    end,
    _pipe@10 = With_inner,
    _pipe@11 = yog@model:add_edge(_pipe@10, 0, 5, 1),
    _pipe@12 = yog@model:add_edge(_pipe@11, 1, 6, 1),
    _pipe@13 = yog@model:add_edge(_pipe@12, 2, 7, 1),
    _pipe@14 = yog@model:add_edge(_pipe@13, 3, 8, 1),
    yog@model:add_edge(_pipe@14, 4, 9, 1).

-file("src/yog/generators/classic.gleam", 445).
?DOC(
    " Generates a Petersen graph.\n"
    "\n"
    " The Petersen graph is a famous graph in graph theory, often used as\n"
    " a counterexample. It has 10 nodes and 15 edges, and is non-planar.\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(1) - fixed size\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let petersen = generate.petersen()\n"
    " // Creates the classic Petersen graph with 10 nodes\n"
    " ```\n"
).
-spec petersen() -> yog@model:graph(nil, integer()).
petersen() ->
    petersen_with_type(undirected).

-file("src/yog/generators/classic.gleam", 491).
-spec do_power(integer(), integer(), integer()) -> integer().
do_power(Base, Exp, Acc) ->
    case Exp of
        0 ->
            Acc;

        _ ->
            do_power(Base, Exp - 1, Acc * Base)
    end.

-file("src/yog/generators/classic.gleam", 487).
-spec power(integer(), integer()) -> integer().
power(Base, Exp) ->
    do_power(Base, Exp, 1).

-file("src/yog/generators/classic.gleam", 341).
?DOC(" Generates a complete binary tree with specified graph type.\n").
-spec binary_tree_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
binary_tree_with_type(Depth, Graph_type) ->
    case Depth < 0 of
        true ->
            yog@model:new(Graph_type);

        false ->
            N = power(2, Depth + 1) - 1,
            Graph = create_nodes(yog@model:new(Graph_type), N),
            _pipe = yog@internal@utils:range(0, N - 1),
            gleam@list:fold(
                _pipe,
                Graph,
                fun(G, I) ->
                    Left_child = (2 * I) + 1,
                    Right_child = (2 * I) + 2,
                    With_left = case Left_child < N of
                        true ->
                            yog@model:add_edge(G, I, Left_child, 1);

                        false ->
                            G
                    end,
                    case Right_child < N of
                        true ->
                            yog@model:add_edge(With_left, I, Right_child, 1);

                        false ->
                            With_left
                    end
                end
            )
    end.

-file("src/yog/generators/classic.gleam", 336).
?DOC(
    " Generates a complete binary tree of given depth.\n"
    "\n"
    " A complete binary tree where:\n"
    " - Node 0 is the root\n"
    " - For node i: left child is 2i+1, right child is 2i+2\n"
    " - Total nodes: 2^(depth+1) - 1\n"
    "\n"
    " All edges have unit weight (1).\n"
    "\n"
    " **Time Complexity:** O(2^depth)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let tree = generate.binary_tree(3)\n"
    " // Creates a binary tree with 15 nodes (depth 3)\n"
    " //        0\n"
    " //      /   \\\n"
    " //     1     2\n"
    " //    / \\   / \\\n"
    " //   3   4 5   6\n"
    " //  /|\\ /|\\ ...\n"
    " ```\n"
).
-spec binary_tree(integer()) -> yog@model:graph(nil, integer()).
binary_tree(Depth) ->
    binary_tree_with_type(Depth, undirected).
