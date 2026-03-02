-module(yog@clique).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/clique.gleam").
-export([all_maximal_cliques/1, max_clique/1, k_cliques/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " Maximum clique finding using the Bron-Kerbosch algorithm.\n"
    "\n"
    " A clique is a subset of vertices where every two vertices are adjacent\n"
    " (i.e., a complete subgraph). Finding the maximum clique is NP-complete,\n"
    " but the Bron-Kerbosch algorithm with pivoting is efficient in practice.\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Social network analysis: Finding tightly-knit friend groups\n"
    " - Computational biology: Identifying protein complexes\n"
    " - Code analysis: Detecting mutually dependent modules\n"
    " - Graph coloring: Chromatic number lower bounds\n"
    " - AoC 2024 Day 23: Finding largest sets of interconnected computers\n"
).

-file("src/yog/clique.gleam", 225).
-spec get_neighbor_ids_set(yog@model:graph(any(), any()), integer()) -> gleam@set:set(integer()).
get_neighbor_ids_set(Graph, Id) ->
    _pipe = yog@model:neighbors(Graph, Id),
    _pipe@1 = gleam@list:map(
        _pipe,
        fun(Neighbor) -> erlang:element(1, Neighbor) end
    ),
    gleam@set:from_list(_pipe@1).

-file("src/yog/clique.gleam", 193).
-spec bron_kerbosch_all(
    yog@model:graph(any(), any()),
    gleam@set:set(integer()),
    gleam@set:set(integer()),
    gleam@set:set(integer()),
    list(gleam@set:set(integer()))
) -> list(gleam@set:set(integer())).
bron_kerbosch_all(Graph, R, P, X, Acc) ->
    case gleam@set:is_empty(P) andalso gleam@set:is_empty(X) of
        true ->
            [R | Acc];

        false ->
            _pipe = gleam@set:to_list(P),
            _pipe@1 = gleam@list:fold(
                _pipe,
                {P, X, Acc},
                fun(State, V) ->
                    {Curr_p, Curr_x, Curr_acc} = State,
                    V_neighbors = get_neighbor_ids_set(Graph, V),
                    New_acc = bron_kerbosch_all(
                        Graph,
                        gleam@set:insert(R, V),
                        gleam@set:intersection(Curr_p, V_neighbors),
                        gleam@set:intersection(Curr_x, V_neighbors),
                        Curr_acc
                    ),
                    {gleam@set:delete(Curr_p, V),
                        gleam@set:insert(Curr_x, V),
                        New_acc}
                end
            ),
            (fun(Res) -> erlang:element(3, Res) end)(_pipe@1)
    end.

-file("src/yog/clique.gleam", 89).
?DOC(
    " Finds all maximal cliques in an undirected graph.\n"
    "\n"
    " A maximal clique is a clique that cannot be extended by adding another node.\n"
    " Note that there can be many maximal cliques, and they may have different sizes.\n"
    "\n"
    " **Time Complexity:** O(3^(n/3)) worst case\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/clique\n"
    "\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, \"A\")\n"
    "   |> yog.add_node(2, \"B\")\n"
    "   |> yog.add_node(3, \"C\")\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "\n"
    " clique.all_maximal_cliques(graph)\n"
    " // => [set.from_list([1, 2]), set.from_list([2, 3])]\n"
    " ```\n"
).
-spec all_maximal_cliques(yog@model:graph(any(), any())) -> list(gleam@set:set(integer())).
all_maximal_cliques(Graph) ->
    All_nodes = yog@model:all_nodes(Graph),
    P = gleam@set:from_list(All_nodes),
    R = gleam@set:new(),
    X = gleam@set:new(),
    bron_kerbosch_all(Graph, R, P, X, []).

-file("src/yog/clique.gleam", 232).
-spec choose_pivot(gleam@set:set(integer()), gleam@set:set(integer())) -> integer().
choose_pivot(P, X) ->
    _pipe = gleam@set:union(P, X),
    _pipe@1 = gleam@set:to_list(_pipe),
    _pipe@2 = gleam@list:first(_pipe@1),
    gleam@result:unwrap(_pipe@2, -1).

-file("src/yog/clique.gleam", 152).
-spec bron_kerbosch_pivot(
    yog@model:graph(any(), any()),
    gleam@set:set(integer()),
    gleam@set:set(integer()),
    gleam@set:set(integer())
) -> gleam@set:set(integer()).
bron_kerbosch_pivot(Graph, R, P, X) ->
    case gleam@set:is_empty(P) andalso gleam@set:is_empty(X) of
        true ->
            R;

        false ->
            Pivot = choose_pivot(P, X),
            Pivot_neighbors = get_neighbor_ids_set(Graph, Pivot),
            Candidates = gleam@set:drop(P, gleam@set:to_list(Pivot_neighbors)),
            _pipe = gleam@set:to_list(Candidates),
            _pipe@1 = gleam@list:fold(
                _pipe,
                {P, X, gleam@set:new()},
                fun(Acc, V) ->
                    {Curr_p, Curr_x, Best_r} = Acc,
                    V_neighbors = get_neighbor_ids_set(Graph, V),
                    Recursive_r = bron_kerbosch_pivot(
                        Graph,
                        gleam@set:insert(R, V),
                        gleam@set:intersection(Curr_p, V_neighbors),
                        gleam@set:intersection(Curr_x, V_neighbors)
                    ),
                    New_best = case gleam@set:size(Recursive_r) > gleam@set:size(
                        Best_r
                    ) of
                        true ->
                            Recursive_r;

                        false ->
                            Best_r
                    end,
                    {gleam@set:delete(Curr_p, V),
                        gleam@set:insert(Curr_x, V),
                        New_best}
                end
            ),
            (fun(Res) -> erlang:element(3, Res) end)(_pipe@1)
    end.

-file("src/yog/clique.gleam", 56).
?DOC(
    " Finds the maximum clique in an undirected graph.\n"
    "\n"
    " A clique is a subset of nodes where every pair of nodes is connected.\n"
    " This function returns the largest such subset found using the Bron-Kerbosch\n"
    " algorithm with pivoting.\n"
    "\n"
    " **Time Complexity:** O(3^(n/3)) worst case, but much faster in practice due to pivoting\n"
    "\n"
    " **Note:** This algorithm works on undirected graphs. For directed graphs,\n"
    " consider using the underlying undirected structure.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/clique\n"
    "\n"
    " // Create a graph with a 4-clique\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, \"A\")\n"
    "   |> yog.add_node(2, \"B\")\n"
    "   |> yog.add_node(3, \"C\")\n"
    "   |> yog.add_node(4, \"D\")\n"
    "   |> yog.add_node(5, \"E\")\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 1, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 1, to: 4, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 4, with: 1)\n"
    "   |> yog.add_edge(from: 3, to: 4, with: 1)\n"
    "   |> yog.add_edge(from: 4, to: 5, with: 1)\n"
    "\n"
    " clique.max_clique(graph)\n"
    " // => set.from_list([1, 2, 3, 4])  // The 4-clique\n"
    " ```\n"
).
-spec max_clique(yog@model:graph(any(), any())) -> gleam@set:set(integer()).
max_clique(Graph) ->
    All_nodes = yog@model:all_nodes(Graph),
    P = gleam@set:from_list(All_nodes),
    R = gleam@set:new(),
    X = gleam@set:new(),
    bron_kerbosch_pivot(Graph, R, P, X).

-file("src/yog/clique.gleam", 240).
-spec bron_kerbosch_k(
    yog@model:graph(any(), any()),
    gleam@set:set(integer()),
    gleam@set:set(integer()),
    integer(),
    list(gleam@set:set(integer()))
) -> list(gleam@set:set(integer())).
bron_kerbosch_k(Graph, R, P, K, Acc) ->
    R_size = gleam@set:size(R),
    case R_size =:= K of
        true ->
            [R | Acc];

        false ->
            case (R_size + gleam@set:size(P)) < K of
                true ->
                    Acc;

                false ->
                    _pipe = gleam@set:to_list(P),
                    _pipe@1 = gleam@list:fold(
                        _pipe,
                        {P, Acc},
                        fun(State, V) ->
                            {Curr_p, Curr_acc} = State,
                            V_neighbors = get_neighbor_ids_set(Graph, V),
                            New_acc = bron_kerbosch_k(
                                Graph,
                                gleam@set:insert(R, V),
                                gleam@set:intersection(Curr_p, V_neighbors),
                                K,
                                Curr_acc
                            ),
                            {gleam@set:delete(Curr_p, V), New_acc}
                        end
                    ),
                    (fun(Res) -> erlang:element(2, Res) end)(_pipe@1)
            end
    end.

-file("src/yog/clique.gleam", 138).
?DOC(
    " Finds all cliques of exactly size k in an undirected graph.\n"
    "\n"
    " Returns all subsets of k nodes where every pair of nodes is connected.\n"
    " Uses a modified Bron-Kerbosch algorithm with early pruning for efficiency.\n"
    "\n"
    " **Time Complexity:** Generally faster than finding all maximal cliques when k is small,\n"
    " as branches are pruned when they cannot reach size k.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/clique\n"
    "\n"
    " // Create a graph with triangles (3-cliques)\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, \"A\")\n"
    "   |> yog.add_node(2, \"B\")\n"
    "   |> yog.add_node(3, \"C\")\n"
    "   |> yog.add_node(4, \"D\")\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 1, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 3, to: 4, with: 1)\n"
    "\n"
    " clique.k_cliques(graph, 3)\n"
    " // => [set.from_list([1, 2, 3])]  // The single triangle\n"
    "\n"
    " clique.k_cliques(graph, 2)\n"
    " // => [set.from_list([1, 2]), set.from_list([1, 3]),\n"
    " //     set.from_list([2, 3]), set.from_list([3, 4])]  // All edges\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Finding triangles (k=3) in social networks\n"
    " - Detecting specific-sized communities\n"
    " - Pattern matching in biological networks\n"
    " - Computational chemistry (finding molecular motifs)\n"
).
-spec k_cliques(yog@model:graph(any(), any()), integer()) -> list(gleam@set:set(integer())).
k_cliques(Graph, K) ->
    case K =< 0 of
        true ->
            [];

        false ->
            All_nodes = yog@model:all_nodes(Graph),
            P = gleam@set:from_list(All_nodes),
            R = gleam@set:new(),
            bron_kerbosch_k(Graph, R, P, K, [])
    end.
