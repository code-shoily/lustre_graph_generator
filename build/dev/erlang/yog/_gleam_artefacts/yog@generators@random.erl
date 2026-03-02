-module(yog@generators@random).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/generators/random.gleam").
-export([erdos_renyi_gnp_with_type/3, erdos_renyi_gnp/2, erdos_renyi_gnm_with_type/3, erdos_renyi_gnm/2, watts_strogatz_with_type/4, watts_strogatz/3, barabasi_albert_with_type/3, barabasi_albert/2, random_tree_with_type/2, random_tree/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " Random graph generators for stochastic network models.\n"
    "\n"
    " This module provides functions to generate random graphs using well-known\n"
    " probabilistic models:\n"
    " - **Erdős-Rényi**: Random graphs with uniform edge probability\n"
    " - **Barabási-Albert**: Scale-free networks with power-law degree distribution\n"
    " - **Watts-Strogatz**: Small-world networks with high clustering\n"
    " - **Random trees**: Uniformly random spanning trees\n"
    "\n"
    " These generators are useful for:\n"
    " - **Testing**: Generate graphs with known statistical properties\n"
    " - **Simulation**: Model real-world networks (social, biological, technological)\n"
    " - **Benchmarking**: Create graphs of various sizes and structures\n"
    " - **Research**: Study network properties and algorithm behavior\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/generators/random\n"
    "\n"
    " pub fn main() {\n"
    "   // Erdős-Rényi: 100 nodes, each edge exists with 5% probability\n"
    "   let er_graph = random.erdos_renyi_gnp(100, 0.05)\n"
    "\n"
    "   // Barabási-Albert: 100 nodes, each new node connects to 3 existing nodes\n"
    "   let ba_graph = random.barabasi_albert(100, 3)\n"
    "\n"
    "   // Watts-Strogatz: 100 nodes in a ring, each connected to 4 neighbors, 10% rewiring\n"
    "   let ws_graph = random.watts_strogatz(100, 4, 0.1)\n"
    " }\n"
    " ```\n"
).

-file("src/yog/generators/random.gleam", 150).
-spec add_random_edges(
    yog@model:graph(nil, integer()),
    integer(),
    integer(),
    gleam@set:set({integer(), integer()}),
    yog@model:graph_type()
) -> yog@model:graph(nil, integer()).
add_random_edges(Graph, N, M, Existing, Graph_type) ->
    case M =< 0 of
        true ->
            Graph;

        false ->
            I = gleam@int:random(N),
            J = gleam@int:random(N),
            case I =:= J of
                true ->
                    add_random_edges(Graph, N, M, Existing, Graph_type);

                false ->
                    Edge = case Graph_type of
                        undirected ->
                            case I < J of
                                true ->
                                    {I, J};

                                false ->
                                    {J, I}
                            end;

                        directed ->
                            {I, J}
                    end,
                    case gleam@set:contains(Existing, Edge) of
                        true ->
                            add_random_edges(Graph, N, M, Existing, Graph_type);

                        false ->
                            New_graph = yog@model:add_edge(
                                Graph,
                                erlang:element(1, Edge),
                                erlang:element(2, Edge),
                                1
                            ),
                            New_existing = gleam@set:insert(Existing, Edge),
                            add_random_edges(
                                New_graph,
                                N,
                                M - 1,
                                New_existing,
                                Graph_type
                            )
                    end
            end
    end.

-file("src/yog/generators/random.gleam", 296).
-spec build_degree_list(yog@model:graph(nil, integer()), yog@model:graph_type()) -> list(integer()).
build_degree_list(Graph, Graph_type) ->
    _pipe = yog@model:all_nodes(Graph),
    gleam@list:flat_map(
        _pipe,
        fun(Node) ->
            Degree = case Graph_type of
                undirected ->
                    erlang:length(yog@model:neighbors(Graph, Node));

                directed ->
                    erlang:length(yog@model:successors(Graph, Node))
            end,
            gleam@list:repeat(Node, gleam@int:max(Degree, 1))
        end
    ).

-file("src/yog/generators/random.gleam", 402).
-spec add_random_edge_not_to(
    yog@model:graph(nil, integer()),
    integer(),
    integer()
) -> yog@model:graph(nil, integer()).
add_random_edge_not_to(Graph, From, N) ->
    To = gleam@int:random(N),
    case To =:= From of
        true ->
            add_random_edge_not_to(Graph, From, N);

        false ->
            Neighbors = yog@model:successors(Graph, From),
            Neighbor_ids = gleam@list:map(
                Neighbors,
                fun(Pair) -> erlang:element(1, Pair) end
            ),
            case gleam@list:contains(Neighbor_ids, To) of
                true ->
                    add_random_edge_not_to(Graph, From, N);

                false ->
                    yog@model:add_edge(Graph, From, To, 1)
            end
    end.

-file("src/yog/generators/random.gleam", 497).
-spec create_nodes(yog@model:graph(nil, AQSD), integer()) -> yog@model:graph(nil, AQSD).
create_nodes(Graph, N) ->
    _pipe = yog@internal@utils:range(0, N - 1),
    gleam@list:fold(
        _pipe,
        Graph,
        fun(G, I) -> yog@model:add_node(G, I, nil) end
    ).

-file("src/yog/generators/random.gleam", 67).
?DOC(" Generates an Erdős-Rényi G(n, p) graph with specified graph type.\n").
-spec erdos_renyi_gnp_with_type(integer(), float(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
erdos_renyi_gnp_with_type(N, P, Graph_type) ->
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
                        fun(Acc, J) -> case rand:uniform() < P of
                                true ->
                                    yog@model:add_edge(Acc, I, J, 1);

                                false ->
                                    Acc
                            end end
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
                                    case rand:uniform() < P of
                                        true ->
                                            yog@model:add_edge(
                                                Acc@1,
                                                I@1,
                                                J@1,
                                                1
                                            );

                                        false ->
                                            Acc@1
                                    end
                            end end
                    ) end
            )
    end.

-file("src/yog/generators/random.gleam", 62).
?DOC(
    " Generates a random graph using the Erdős-Rényi G(n, p) model.\n"
    "\n"
    " Each possible edge is included independently with probability p.\n"
    "\n"
    " **Expected edges:** p * n(n-1)/2 for undirected, p * n(n-1) for directed\n"
    "\n"
    " **Time Complexity:** O(n²) - must consider all possible edges\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // 50 nodes, each edge exists with 10% probability\n"
    " // Expected ~122 edges for undirected\n"
    " let graph = random.erdos_renyi_gnp(50, 0.1)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Baseline for comparing other random graph models\n"
    " - Modeling networks with uniform connection probability\n"
    " - Testing graph algorithms on random structures\n"
    " - Phase transitions in network connectivity (p ~ 1/n)\n"
).
-spec erdos_renyi_gnp(integer(), float()) -> yog@model:graph(nil, integer()).
erdos_renyi_gnp(N, P) ->
    erdos_renyi_gnp_with_type(N, P, undirected).

-file("src/yog/generators/random.gleam", 131).
?DOC(" Generates an Erdős-Rényi G(n, m) graph with specified graph type.\n").
-spec erdos_renyi_gnm_with_type(integer(), integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
erdos_renyi_gnm_with_type(N, M, Graph_type) ->
    Graph = create_nodes(yog@model:new(Graph_type), N),
    Max_edges = case Graph_type of
        undirected ->
            (N * (N - 1)) div 2;

        directed ->
            N * (N - 1)
    end,
    Actual_m = gleam@int:min(M, Max_edges),
    add_random_edges(Graph, N, Actual_m, gleam@set:new(), Graph_type).

-file("src/yog/generators/random.gleam", 126).
?DOC(
    " Generates a random graph using the Erdős-Rényi G(n, m) model.\n"
    "\n"
    " Exactly m edges are added uniformly at random (without replacement).\n"
    "\n"
    " **Time Complexity:** O(m) expected, O(m log m) worst case\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // 50 nodes, exactly 100 edges\n"
    " let graph = random.erdos_renyi_gnm(50, 100)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Control exact edge count for testing\n"
    " - Generate sparse graphs efficiently (m << n²)\n"
    " - Benchmark algorithms with precise graph sizes\n"
).
-spec erdos_renyi_gnm(integer(), integer()) -> yog@model:graph(nil, integer()).
erdos_renyi_gnm(N, M) ->
    erdos_renyi_gnm_with_type(N, M, undirected).

-file("src/yog/generators/random.gleam", 366).
?DOC(" Generates a Watts-Strogatz graph with specified graph type.\n").
-spec watts_strogatz_with_type(
    integer(),
    integer(),
    float(),
    yog@model:graph_type()
) -> yog@model:graph(nil, integer()).
watts_strogatz_with_type(N, K, P, Graph_type) ->
    case ((N < 3) orelse (K < 2)) orelse (K >= N) of
        true ->
            yog@model:new(Graph_type);

        false ->
            Graph = create_nodes(yog@model:new(Graph_type), N),
            Half_k = K div 2,
            _pipe = yog@internal@utils:range(0, N - 1),
            gleam@list:fold(
                _pipe,
                Graph,
                fun(G, I) -> _pipe@1 = yog@internal@utils:range(1, Half_k),
                    gleam@list:fold(
                        _pipe@1,
                        G,
                        fun(Acc, Offset) -> case rand:uniform() < P of
                                false ->
                                    J = case N of
                                        0 -> 0;
                                        Gleam@denominator -> (I + Offset) rem Gleam@denominator
                                    end,
                                    yog@model:add_edge(Acc, I, J, 1);

                                true ->
                                    add_random_edge_not_to(Acc, I, N)
                            end end
                    ) end
            )
    end.

-file("src/yog/generators/random.gleam", 361).
?DOC(
    " Generates a small-world network using the Watts-Strogatz model.\n"
    "\n"
    " Creates a ring lattice where each node connects to k nearest neighbors,\n"
    " then rewires each edge with probability p.\n"
    "\n"
    " **Properties:**\n"
    " - High clustering coefficient (like regular lattices)\n"
    " - Short average path length (like random graphs)\n"
    " - \"Small-world\" phenomenon: most nodes reachable in few hops\n"
    "\n"
    " **Parameters:**\n"
    " - n: Number of nodes\n"
    " - k: Each node connects to k nearest neighbors (must be even)\n"
    " - p: Rewiring probability (0 = regular lattice, 1 = random graph)\n"
    "\n"
    " **Time Complexity:** O(nk)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // 100 nodes, each connected to 4 neighbors, 10% rewiring\n"
    " let graph = random.watts_strogatz(100, 4, 0.1)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Model social networks (friends of friends, but some random connections)\n"
    " - Neural networks (local connectivity with long-range connections)\n"
    " - Study information diffusion and epidemic spreading\n"
    " - Test algorithms on networks with community structure\n"
).
-spec watts_strogatz(integer(), integer(), float()) -> yog@model:graph(nil, integer()).
watts_strogatz(N, K, P) ->
    watts_strogatz_with_type(N, K, P, undirected).

-file("src/yog/generators/random.gleam", 503).
-spec list_at(list(AQSI), integer()) -> {ok, AQSI} | {error, nil}.
list_at(Lst, Index) ->
    case {Index, Lst} of
        {0, [First | _]} ->
            {ok, First};

        {N, [_ | Rest]} when N > 0 ->
            list_at(Rest, N - 1);

        {_, _} ->
            {error, nil}
    end.

-file("src/yog/generators/random.gleam", 309).
-spec select_preferential_targets(
    list(integer()),
    integer(),
    gleam@set:set(integer())
) -> gleam@set:set(integer()).
select_preferential_targets(Degree_list, M, Selected) ->
    case (gleam@set:size(Selected) >= M) orelse gleam@list:is_empty(Degree_list) of
        true ->
            Selected;

        false ->
            List_size = erlang:length(Degree_list),
            Index = gleam@int:random(List_size),
            case list_at(Degree_list, Index) of
                {ok, Target} ->
                    New_selected = gleam@set:insert(Selected, Target),
                    select_preferential_targets(Degree_list, M, New_selected);

                {error, _} ->
                    Selected
            end
    end.

-file("src/yog/generators/random.gleam", 273).
-spec add_node_with_preferential_attachment(
    yog@model:graph(nil, integer()),
    integer(),
    integer(),
    yog@model:graph_type()
) -> yog@model:graph(nil, integer()).
add_node_with_preferential_attachment(Graph, New_node, M, Graph_type) ->
    With_node = yog@model:add_node(Graph, New_node, nil),
    Degree_list = build_degree_list(Graph, Graph_type),
    Targets = select_preferential_targets(Degree_list, M, gleam@set:new()),
    _pipe = Targets,
    _pipe@1 = gleam@set:to_list(_pipe),
    gleam@list:fold(
        _pipe@1,
        With_node,
        fun(G, Target) -> yog@model:add_edge(G, New_node, Target, 1) end
    ).

-file("src/yog/generators/random.gleam", 224).
?DOC(" Generates a Barabási-Albert graph with specified graph type.\n").
-spec barabasi_albert_with_type(integer(), integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
barabasi_albert_with_type(N, M, Graph_type) ->
    case (N < M) orelse (M < 1) of
        true ->
            yog@model:new(Graph_type);

        false ->
            M0 = gleam@int:max(M, 2),
            Initial = begin
                _pipe = yog@internal@utils:range(0, M0 - 1),
                gleam@list:fold(
                    _pipe,
                    yog@model:new(Graph_type),
                    fun(G, I) -> yog@model:add_node(G, I, nil) end
                )
            end,
            Initial_with_edges = case Graph_type of
                undirected ->
                    _pipe@1 = yog@internal@utils:range(0, M0 - 1),
                    gleam@list:fold(
                        _pipe@1,
                        Initial,
                        fun(G@1, I@1) ->
                            _pipe@2 = yog@internal@utils:range(I@1 + 1, M0 - 1),
                            gleam@list:fold(
                                _pipe@2,
                                G@1,
                                fun(Acc, J) ->
                                    yog@model:add_edge(Acc, I@1, J, 1)
                                end
                            )
                        end
                    );

                directed ->
                    _pipe@3 = yog@internal@utils:range(0, M0 - 1),
                    gleam@list:fold(
                        _pipe@3,
                        Initial,
                        fun(G@2, I@2) ->
                            _pipe@4 = yog@internal@utils:range(0, M0 - 1),
                            gleam@list:fold(
                                _pipe@4,
                                G@2,
                                fun(Acc@1, J@1) -> case I@2 =:= J@1 of
                                        true ->
                                            Acc@1;

                                        false ->
                                            yog@model:add_edge(
                                                Acc@1,
                                                I@2,
                                                J@1,
                                                1
                                            )
                                    end end
                            )
                        end
                    )
            end,
            _pipe@5 = yog@internal@utils:range(M0, N - 1),
            gleam@list:fold(
                _pipe@5,
                Initial_with_edges,
                fun(G@3, New_node) ->
                    add_node_with_preferential_attachment(
                        G@3,
                        New_node,
                        M,
                        Graph_type
                    )
                end
            )
    end.

-file("src/yog/generators/random.gleam", 219).
?DOC(
    " Generates a scale-free network using the Barabási-Albert model.\n"
    "\n"
    " Starts with m₀ nodes in a complete graph, then adds n - m₀ nodes.\n"
    " Each new node connects to m existing nodes via preferential attachment\n"
    " (probability proportional to node degree).\n"
    "\n"
    " **Properties:**\n"
    " - Power-law degree distribution P(k) ~ k^(-γ)\n"
    " - Scale-free (no characteristic scale)\n"
    " - Robust to random failures, vulnerable to targeted attacks\n"
    "\n"
    " **Time Complexity:** O(nm)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // 100 nodes, each new node connects to 3 existing nodes\n"
    " // Results in ~300 edges\n"
    " let graph = random.barabasi_albert(100, 3)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Model the internet, citation networks, social networks\n"
    " - Study robustness and vulnerability\n"
    " - Test algorithms on scale-free topologies\n"
    " - Simulate viral spread on networks with hubs\n"
).
-spec barabasi_albert(integer(), integer()) -> yog@model:graph(nil, integer()).
barabasi_albert(N, M) ->
    barabasi_albert_with_type(N, M, undirected).

-file("src/yog/generators/random.gleam", 469).
-spec build_random_tree(
    yog@model:graph(nil, integer()),
    integer(),
    gleam@set:set(integer()),
    integer()
) -> yog@model:graph(nil, integer()).
build_random_tree(Graph, N, In_tree, Next_node) ->
    case Next_node >= N of
        true ->
            Graph;

        false ->
            Tree_list = gleam@set:to_list(In_tree),
            Tree_size = erlang:length(Tree_list),
            Index = gleam@int:random(Tree_size),
            case list_at(Tree_list, Index) of
                {ok, Parent} ->
                    New_graph = yog@model:add_edge(Graph, Parent, Next_node, 1),
                    New_in_tree = gleam@set:insert(In_tree, Next_node),
                    build_random_tree(New_graph, N, New_in_tree, Next_node + 1);

                {error, _} ->
                    Graph
            end
    end.

-file("src/yog/generators/random.gleam", 453).
?DOC(" Generates a random tree with specified graph type.\n").
-spec random_tree_with_type(integer(), yog@model:graph_type()) -> yog@model:graph(nil, integer()).
random_tree_with_type(N, Graph_type) ->
    case N < 2 of
        true ->
            create_nodes(yog@model:new(Graph_type), N);

        false ->
            Graph = create_nodes(yog@model:new(Graph_type), N),
            In_tree = gleam@set:from_list([0]),
            build_random_tree(Graph, N, In_tree, 1)
    end.

-file("src/yog/generators/random.gleam", 448).
?DOC(
    " Generates a uniformly random tree on n nodes.\n"
    "\n"
    " Uses a random walk approach to generate a spanning tree.\n"
    " Every labeled tree on n vertices has equal probability.\n"
    "\n"
    " **Properties:**\n"
    " - Exactly n - 1 edges\n"
    " - Connected and acyclic\n"
    " - Random structure (no preferential attachment or locality bias)\n"
    "\n"
    " **Time Complexity:** O(n²) expected\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Random tree with 50 nodes\n"
    " let tree = random.random_tree(50)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Test tree algorithms (DFS, BFS, LCA, diameter)\n"
    " - Model hierarchical structures with random branching\n"
    " - Generate random spanning trees\n"
    " - Benchmark on tree topologies\n"
).
-spec random_tree(integer()) -> yog@model:graph(nil, integer()).
random_tree(N) ->
    random_tree_with_type(N, undirected).
