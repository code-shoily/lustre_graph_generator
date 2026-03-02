-module(yog@pathfinding).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/pathfinding.gleam").
-export([shortest_path/6, single_source_distances/5, a_star/7, bellman_ford/6, floyd_warshall/4, distance_matrix/5, implicit_dijkstra/6, implicit_dijkstra_by/7, implicit_a_star/7, implicit_a_star_by/8, implicit_bellman_ford/6, implicit_bellman_ford_by/7]).
-export_type([path/1, bellman_ford_result/1, implicit_bellman_ford_result/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type path(KXO) :: {path, list(integer()), KXO}.

-type bellman_ford_result(KXP) :: {shortest_path, path(KXP)} |
    negative_cycle |
    no_path.

-type implicit_bellman_ford_result(KXQ) :: {found_goal, KXQ} |
    detected_negative_cycle |
    no_goal.

-file("src/yog/pathfinding.gleam", 99).
-spec compare_frontier(
    {KYH, list(integer())},
    {KYH, list(integer())},
    fun((KYH, KYH) -> gleam@order:order())
) -> gleam@order:order().
compare_frontier(A, B, Cmp) ->
    Cmp(erlang:element(1, A), erlang:element(1, B)).

-file("src/yog/pathfinding.gleam", 107).
-spec compare_distance_frontier(
    {KYK, integer()},
    {KYK, integer()},
    fun((KYK, KYK) -> gleam@order:order())
) -> gleam@order:order().
compare_distance_frontier(A, B, Cmp) ->
    Cmp(erlang:element(1, A), erlang:element(1, B)).

-file("src/yog/pathfinding.gleam", 115).
-spec compare_a_star_frontier(
    {KYL, KYL, list(integer())},
    {KYL, KYL, list(integer())},
    fun((KYL, KYL) -> gleam@order:order())
) -> gleam@order:order().
compare_a_star_frontier(A, B, Cmp) ->
    Cmp(erlang:element(1, A), erlang:element(1, B)).

-file("src/yog/pathfinding.gleam", 125).
?DOC(
    " Helper to determine if a node should be explored based on distance comparison.\n"
    " Returns True if the node hasn't been visited or if the new distance is shorter.\n"
).
-spec should_explore_node(
    gleam@dict:dict(integer(), KYO),
    integer(),
    KYO,
    fun((KYO, KYO) -> gleam@order:order())
) -> boolean().
should_explore_node(Visited, Node, New_dist, Compare) ->
    case gleam_stdlib:map_get(Visited, Node) of
        {ok, Prev_dist} ->
            case Compare(New_dist, Prev_dist) of
                lt ->
                    true;

                _ ->
                    false
            end;

        {error, nil} ->
            true
    end.

-file("src/yog/pathfinding.gleam", 56).
-spec do_dijkstra(
    yog@model:graph(any(), KXY),
    integer(),
    gleamy@pairing_heap:heap({KXY, list(integer())}),
    gleam@dict:dict(integer(), KXY),
    fun((KXY, KXY) -> KXY),
    fun((KXY, KXY) -> gleam@order:order())
) -> gleam@option:option(path(KXY)).
do_dijkstra(Graph, Goal, Frontier, Visited, Add, Compare) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            none;

        {ok, {{Dist, [Current | _] = Path}, Rest_frontier}} ->
            case Current =:= Goal of
                true ->
                    {some, {path, lists:reverse(Path), Dist}};

                false ->
                    Should_explore = should_explore_node(
                        Visited,
                        Current,
                        Dist,
                        Compare
                    ),
                    case Should_explore of
                        false ->
                            do_dijkstra(
                                Graph,
                                Goal,
                                Rest_frontier,
                                Visited,
                                Add,
                                Compare
                            );

                        true ->
                            New_visited = gleam@dict:insert(
                                Visited,
                                Current,
                                Dist
                            ),
                            Next_frontier = begin
                                _pipe = yog@model:successors(Graph, Current),
                                gleam@list:fold(
                                    _pipe,
                                    Rest_frontier,
                                    fun(H, Neighbor) ->
                                        {Next_id, Weight} = Neighbor,
                                        gleamy@priority_queue:push(
                                            H,
                                            {Add(Dist, Weight),
                                                [Next_id | Path]}
                                        )
                                    end
                                )
                            end,
                            do_dijkstra(
                                Graph,
                                Goal,
                                Next_frontier,
                                New_visited,
                                Add,
                                Compare
                            )
                    end
            end;

        {ok, _} ->
            none
    end.

-file("src/yog/pathfinding.gleam", 41).
?DOC(
    " Finds the shortest path between two nodes using Dijkstra's algorithm.\n"
    "\n"
    " Works with non-negative edge weights only. For negative weights, use `bellman_ford`.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V) with heap\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `zero`: The identity element for addition (e.g., 0 for integers)\n"
    " - `add`: Function to add two weights\n"
    " - `compare`: Function to compare two weights\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " pathfinding.shortest_path(\n"
    "   in: graph,\n"
    "   from: 1,\n"
    "   to: 5,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare\n"
    " )\n"
    " // => Some(Path([1, 2, 5], 15))\n"
    " ```\n"
).
-spec shortest_path(
    yog@model:graph(any(), KXS),
    integer(),
    integer(),
    KXS,
    fun((KXS, KXS) -> KXS),
    fun((KXS, KXS) -> gleam@order:order())
) -> gleam@option:option(path(KXS)).
shortest_path(Graph, Start, Goal, Zero, Add, Compare) ->
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> compare_frontier(A, B, Compare) end
        ),
        gleamy@priority_queue:push(_pipe, {Zero, [Start]})
    end,
    do_dijkstra(Graph, Goal, Frontier, maps:new(), Add, Compare).

-file("src/yog/pathfinding.gleam", 200).
-spec do_single_source_dijkstra(
    yog@model:graph(any(), KYY),
    gleamy@pairing_heap:heap({KYY, integer()}),
    gleam@dict:dict(integer(), KYY),
    fun((KYY, KYY) -> KYY),
    fun((KYY, KYY) -> gleam@order:order())
) -> gleam@dict:dict(integer(), KYY).
do_single_source_dijkstra(Graph, Frontier, Distances, Add, Compare) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            Distances;

        {ok, {{Dist, Current}, Rest_frontier}} ->
            Should_explore = should_explore_node(
                Distances,
                Current,
                Dist,
                Compare
            ),
            case Should_explore of
                false ->
                    do_single_source_dijkstra(
                        Graph,
                        Rest_frontier,
                        Distances,
                        Add,
                        Compare
                    );

                true ->
                    New_distances = gleam@dict:insert(Distances, Current, Dist),
                    Next_frontier = begin
                        _pipe = yog@model:successors(Graph, Current),
                        gleam@list:fold(
                            _pipe,
                            Rest_frontier,
                            fun(H, Neighbor) ->
                                {Next_id, Weight} = Neighbor,
                                gleamy@priority_queue:push(
                                    H,
                                    {Add(Dist, Weight), Next_id}
                                )
                            end
                        )
                    end,
                    do_single_source_dijkstra(
                        Graph,
                        Next_frontier,
                        New_distances,
                        Add,
                        Compare
                    )
            end
    end.

-file("src/yog/pathfinding.gleam", 186).
?DOC(
    " Computes shortest distances from a source node to all reachable nodes.\n"
    "\n"
    " Returns a dictionary mapping each reachable node to its shortest distance\n"
    " from the source. Unreachable nodes are not included in the result.\n"
    "\n"
    " This is useful when you need distances to multiple destinations, or want\n"
    " to find the closest target among many options. More efficient than running\n"
    " `shortest_path` multiple times.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V) with heap\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `zero`: The identity element for addition (e.g., 0 for integers)\n"
    " - `add`: Function to add two weights\n"
    " - `compare`: Function to compare two weights\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Find distances from node 1 to all reachable nodes\n"
    " let distances = pathfinding.single_source_distances(\n"
    "   in: graph,\n"
    "   from: 1,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare\n"
    " )\n"
    " // => dict.from_list([#(1, 0), #(2, 5), #(3, 8), #(4, 15)])\n"
    "\n"
    " // Find closest target among many options\n"
    " let targets = [10, 20, 30]\n"
    " let closest = targets\n"
    "   |> list.filter_map(fn(t) { dict.get(distances, t) })\n"
    "   |> list.sort(int.compare)\n"
    "   |> list.first\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Finding nearest target among multiple options\n"
    " - Computing distance maps for game AI\n"
    " - Network routing table generation\n"
    " - Graph analysis (centrality measures)\n"
    " - Reverse pathfinding (with `transform.transpose`)\n"
).
-spec single_source_distances(
    yog@model:graph(any(), KYS),
    integer(),
    KYS,
    fun((KYS, KYS) -> KYS),
    fun((KYS, KYS) -> gleam@order:order())
) -> gleam@dict:dict(integer(), KYS).
single_source_distances(Graph, Source, Zero, Add, Compare) ->
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> compare_distance_frontier(A, B, Compare) end
        ),
        gleamy@priority_queue:push(_pipe, {Zero, Source})
    end,
    do_single_source_dijkstra(Graph, Frontier, maps:new(), Add, Compare).

-file("src/yog/pathfinding.gleam", 297).
-spec do_a_star(
    yog@model:graph(any(), LIS),
    integer(),
    gleamy@pairing_heap:heap({LIP, LIP, list(integer())}),
    gleam@dict:dict(integer(), LIP),
    fun((LIP, LIS) -> LIP),
    fun((LIP, LIP) -> gleam@order:order()),
    fun((integer(), integer()) -> LIS)
) -> gleam@option:option(path(LIP)).
do_a_star(Graph, Goal, Frontier, Visited, Add, Compare, H) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            none;

        {ok, {{_, Dist, [Current | _] = Path}, Rest_frontier}} ->
            case Current =:= Goal of
                true ->
                    {some, {path, lists:reverse(Path), Dist}};

                false ->
                    Should_explore = should_explore_node(
                        Visited,
                        Current,
                        Dist,
                        Compare
                    ),
                    case Should_explore of
                        false ->
                            do_a_star(
                                Graph,
                                Goal,
                                Rest_frontier,
                                Visited,
                                Add,
                                Compare,
                                H
                            );

                        true ->
                            New_visited = gleam@dict:insert(
                                Visited,
                                Current,
                                Dist
                            ),
                            Next_frontier = begin
                                _pipe = yog@model:successors(Graph, Current),
                                gleam@list:fold(
                                    _pipe,
                                    Rest_frontier,
                                    fun(Acc_h, Neighbor) ->
                                        {Next_id, Weight} = Neighbor,
                                        Next_dist = Add(Dist, Weight),
                                        F_score = Add(
                                            Next_dist,
                                            H(Next_id, Goal)
                                        ),
                                        gleamy@priority_queue:push(
                                            Acc_h,
                                            {F_score,
                                                Next_dist,
                                                [Next_id | Path]}
                                        )
                                    end
                                )
                            end,
                            do_a_star(
                                Graph,
                                Goal,
                                Next_frontier,
                                New_visited,
                                Add,
                                Compare,
                                H
                            )
                    end
            end;

        _ ->
            none
    end.

-file("src/yog/pathfinding.gleam", 279).
?DOC(
    " Finds the shortest path using A* search with a heuristic function.\n"
    "\n"
    " A* is more efficient than Dijkstra when you have a good heuristic estimate\n"
    " of the remaining distance to the goal. The heuristic must be admissible\n"
    " (never overestimate the actual distance) to guarantee finding the shortest path.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V), but often faster than Dijkstra in practice\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `heuristic`: A function that estimates distance from any node to the goal.\n"
    "   Must be admissible (h(n) ≤ actual distance) to guarantee shortest path.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Manhattan distance heuristic for grid\n"
    " let h = fn(node, goal) {\n"
    "   int.absolute_value(node.x - goal.x) + int.absolute_value(node.y - goal.y)\n"
    " }\n"
    "\n"
    " pathfinding.a_star(\n"
    "   in: graph,\n"
    "   from: start,\n"
    "   to: goal,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare,\n"
    "   heuristic: h\n"
    " )\n"
    " ```\n"
).
-spec a_star(
    yog@model:graph(any(), KZH),
    integer(),
    integer(),
    KZH,
    fun((KZH, KZH) -> KZH),
    fun((KZH, KZH) -> gleam@order:order()),
    fun((integer(), integer()) -> KZH)
) -> gleam@option:option(path(KZH)).
a_star(Graph, Start, Goal, Zero, Add, Compare, H) ->
    Initial_f = H(Start, Goal),
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> compare_a_star_frontier(A, B, Compare) end
        ),
        gleamy@priority_queue:push(_pipe, {Initial_f, Zero, [Start]})
    end,
    do_a_star(Graph, Goal, Frontier, maps:new(), Add, Compare, H).

-file("src/yog/pathfinding.gleam", 428).
-spec relaxation_passes(
    yog@model:graph(any(), LAA),
    list(integer()),
    gleam@dict:dict(integer(), LAA),
    gleam@dict:dict(integer(), integer()),
    integer(),
    fun((LAA, LAA) -> LAA),
    fun((LAA, LAA) -> gleam@order:order())
) -> {gleam@dict:dict(integer(), LAA), gleam@dict:dict(integer(), integer())}.
relaxation_passes(
    Graph,
    Nodes,
    Distances,
    Predecessors,
    Remaining,
    Add,
    Compare
) ->
    case Remaining =< 0 of
        true ->
            {Distances, Predecessors};

        false ->
            {New_distances, New_predecessors} = gleam@list:fold(
                Nodes,
                {Distances, Predecessors},
                fun(Acc, U) ->
                    {Dists, Preds} = Acc,
                    case gleam_stdlib:map_get(Dists, U) of
                        {error, nil} ->
                            Acc;

                        {ok, U_dist} ->
                            Neighbors = yog@model:successors(Graph, U),
                            gleam@list:fold(
                                Neighbors,
                                {Dists, Preds},
                                fun(Inner_acc, Edge) ->
                                    {V, Weight} = Edge,
                                    {Curr_dists, Curr_preds} = Inner_acc,
                                    New_dist = Add(U_dist, Weight),
                                    case gleam_stdlib:map_get(Curr_dists, V) of
                                        {error, nil} ->
                                            {gleam@dict:insert(
                                                    Curr_dists,
                                                    V,
                                                    New_dist
                                                ),
                                                gleam@dict:insert(
                                                    Curr_preds,
                                                    V,
                                                    U
                                                )};

                                        {ok, V_dist} ->
                                            case Compare(New_dist, V_dist) of
                                                lt ->
                                                    {gleam@dict:insert(
                                                            Curr_dists,
                                                            V,
                                                            New_dist
                                                        ),
                                                        gleam@dict:insert(
                                                            Curr_preds,
                                                            V,
                                                            U
                                                        )};

                                                _ ->
                                                    Inner_acc
                                            end
                                    end
                                end
                            )
                    end
                end
            ),
            relaxation_passes(
                Graph,
                Nodes,
                New_distances,
                New_predecessors,
                Remaining - 1,
                Add,
                Compare
            )
    end.

-file("src/yog/pathfinding.gleam", 492).
-spec has_negative_cycle(
    yog@model:graph(any(), LAN),
    list(integer()),
    gleam@dict:dict(integer(), LAN),
    fun((LAN, LAN) -> LAN),
    fun((LAN, LAN) -> gleam@order:order())
) -> boolean().
has_negative_cycle(Graph, Nodes, Distances, Add, Compare) ->
    gleam@list:any(Nodes, fun(U) -> case gleam_stdlib:map_get(Distances, U) of
                {error, nil} ->
                    false;

                {ok, U_dist} ->
                    _pipe = yog@model:successors(Graph, U),
                    gleam@list:any(
                        _pipe,
                        fun(Edge) ->
                            {V, Weight} = Edge,
                            New_dist = Add(U_dist, Weight),
                            case gleam_stdlib:map_get(Distances, V) of
                                {error, nil} ->
                                    false;

                                {ok, V_dist} ->
                                    case Compare(New_dist, V_dist) of
                                        lt ->
                                            true;

                                        _ ->
                                            false
                                    end
                            end
                        end
                    )
            end end).

-file("src/yog/pathfinding.gleam", 524).
-spec reconstruct_path(
    gleam@dict:dict(integer(), integer()),
    integer(),
    integer(),
    list(integer())
) -> {ok, list(integer())} | {error, nil}.
reconstruct_path(Predecessors, Start, Current, Acc) ->
    case Current =:= Start of
        true ->
            {ok, Acc};

        false ->
            case gleam_stdlib:map_get(Predecessors, Current) of
                {error, nil} ->
                    {error, nil};

                {ok, Pred} ->
                    reconstruct_path(Predecessors, Start, Pred, [Pred | Acc])
            end
    end.

-file("src/yog/pathfinding.gleam", 382).
?DOC(
    " Finds shortest path with support for negative edge weights using Bellman-Ford.\n"
    "\n"
    " Unlike Dijkstra and A*, this algorithm can handle negative edge weights.\n"
    " It also detects negative cycles reachable from the source node.\n"
    "\n"
    " **Time Complexity:** O(VE) where V is vertices and E is edges\n"
    "\n"
    " ## Returns\n"
    "\n"
    " - `ShortestPath(path)`: If a valid shortest path exists\n"
    " - `NegativeCycle`: If a negative cycle is reachable from the start node\n"
    " - `NoPath`: If no path exists from start to goal\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " pathfinding.bellman_ford(\n"
    "   in: graph,\n"
    "   from: 1,\n"
    "   to: 5,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare\n"
    " )\n"
    " // => ShortestPath(Path([1, 3, 5], -2))  // Can have negative total weight\n"
    " // or NegativeCycle                       // If cycle detected\n"
    " // or NoPath                              // If unreachable\n"
    " ```\n"
).
-spec bellman_ford(
    yog@model:graph(any(), KZV),
    integer(),
    integer(),
    KZV,
    fun((KZV, KZV) -> KZV),
    fun((KZV, KZV) -> gleam@order:order())
) -> bellman_ford_result(KZV).
bellman_ford(Graph, Start, Goal, Zero, Add, Compare) ->
    All_nodes = yog@model:all_nodes(Graph),
    Initial_distances = maps:from_list([{Start, Zero}]),
    Initial_predecessors = maps:new(),
    Node_count = erlang:length(All_nodes),
    {Distances, Predecessors} = relaxation_passes(
        Graph,
        All_nodes,
        Initial_distances,
        Initial_predecessors,
        Node_count - 1,
        Add,
        Compare
    ),
    case has_negative_cycle(Graph, All_nodes, Distances, Add, Compare) of
        true ->
            negative_cycle;

        false ->
            case gleam_stdlib:map_get(Distances, Goal) of
                {error, nil} ->
                    no_path;

                {ok, Dist} ->
                    case reconstruct_path(Predecessors, Start, Goal, [Goal]) of
                        {ok, Path} ->
                            {shortest_path, {path, Path, Dist}};

                        {error, nil} ->
                            no_path
                    end
            end
    end.

-file("src/yog/pathfinding.gleam", 721).
?DOC(" Detects if there's a negative cycle by checking if any node has negative distance to itself\n").
-spec detect_negative_cycle(
    gleam@dict:dict({integer(), integer()}, LBH),
    list(integer()),
    LBH,
    fun((LBH, LBH) -> gleam@order:order())
) -> boolean().
detect_negative_cycle(Distances, Nodes, Zero, Compare) ->
    _pipe = Nodes,
    gleam@list:any(
        _pipe,
        fun(I) -> case gleam_stdlib:map_get(Distances, {I, I}) of
                {ok, Dist} ->
                    case Compare(Dist, Zero) of
                        lt ->
                            true;

                        _ ->
                            false
                    end;

                {error, nil} ->
                    false
            end end
    ).

-file("src/yog/pathfinding.gleam", 627).
?DOC(
    " Computes shortest paths between all pairs of nodes using the Floyd-Warshall algorithm.\n"
    "\n"
    " Returns a nested dictionary where `distances[i][j]` gives the shortest distance from node `i` to node `j`.\n"
    " If no path exists between two nodes, the pair will not be present in the dictionary.\n"
    "\n"
    " Returns `Error(Nil)` if a negative cycle is detected in the graph.\n"
    "\n"
    " **Time Complexity:** O(V³)\n"
    " **Space Complexity:** O(V²)\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `zero`: The identity element for addition (e.g., `0` for integers, `0.0` for floats)\n"
    " - `add`: Function to add two weights\n"
    " - `compare`: Function to compare two weights\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import gleam/dict\n"
    " import gleam/int\n"
    " import gleam/io\n"
    " import yog\n"
    " import yog/pathfinding\n"
    "\n"
    " pub fn main() {\n"
    "   let graph =\n"
    "     yog.directed()\n"
    "     |> yog.add_node(1, \"A\")\n"
    "     |> yog.add_node(2, \"B\")\n"
    "     |> yog.add_node(3, \"C\")\n"
    "     |> yog.add_edge(from: 1, to: 2, with: 4)\n"
    "     |> yog.add_edge(from: 2, to: 3, with: 3)\n"
    "     |> yog.add_edge(from: 1, to: 3, with: 10)\n"
    "\n"
    "   case pathfinding.floyd_warshall(\n"
    "     in: graph,\n"
    "     with_zero: 0,\n"
    "     with_add: int.add,\n"
    "     with_compare: int.compare\n"
    "   ) {\n"
    "     Ok(distances) -> {\n"
    "       // Query distance from node 1 to node 3\n"
    "       let assert Ok(row) = dict.get(distances, 1)\n"
    "       let assert Ok(dist) = dict.get(row, 3)\n"
    "       // dist = 7 (via node 2: 4 + 3)\n"
    "       io.println(\"Distance from 1 to 3: \" <> int.to_string(dist))\n"
    "     }\n"
    "     Error(Nil) -> io.println(\"Negative cycle detected!\")\n"
    "   }\n"
    " }\n"
    " ```\n"
    "\n"
    " ## Handling Negative Weights\n"
    "\n"
    " Floyd-Warshall can handle negative edge weights and will detect negative cycles:\n"
    "\n"
    " ```gleam\n"
    " let graph_with_negative_cycle =\n"
    "   yog.directed()\n"
    "   |> yog.add_node(1, \"A\")\n"
    "   |> yog.add_node(2, \"B\")\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 5)\n"
    "   |> yog.add_edge(from: 2, to: 1, with: -10)\n"
    "\n"
    " case pathfinding.floyd_warshall(\n"
    "   in: graph_with_negative_cycle,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare\n"
    " ) {\n"
    "   Ok(_) -> io.println(\"No negative cycle\")\n"
    "   Error(Nil) -> io.println(\"Negative cycle detected!\")  // This will execute\n"
    " }\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Computing distance matrices for all node pairs\n"
    " - Finding transitive closure of a graph\n"
    " - Detecting negative cycles\n"
    " - Preprocessing for queries about arbitrary node pairs\n"
    " - Graph metrics (diameter, centrality)\n"
).
-spec floyd_warshall(
    yog@model:graph(any(), LBA),
    LBA,
    fun((LBA, LBA) -> LBA),
    fun((LBA, LBA) -> gleam@order:order())
) -> {ok, gleam@dict:dict({integer(), integer()}, LBA)} | {error, nil}.
floyd_warshall(Graph, Zero, Add, Compare) ->
    Nodes = maps:keys(erlang:element(3, Graph)),
    Initial_distances = begin
        _pipe = Nodes,
        gleam@list:fold(_pipe, maps:new(), fun(Distances, I) -> _pipe@1 = Nodes,
                gleam@list:fold(
                    _pipe@1,
                    Distances,
                    fun(Distances@1, J) -> case I =:= J of
                            true ->
                                case gleam_stdlib:map_get(
                                    erlang:element(4, Graph),
                                    I
                                ) of
                                    {ok, Neighbors} ->
                                        case gleam_stdlib:map_get(Neighbors, J) of
                                            {ok, Weight} ->
                                                case Compare(Weight, Zero) of
                                                    lt ->
                                                        gleam@dict:insert(
                                                            Distances@1,
                                                            {I, J},
                                                            Weight
                                                        );

                                                    _ ->
                                                        gleam@dict:insert(
                                                            Distances@1,
                                                            {I, J},
                                                            Zero
                                                        )
                                                end;

                                            {error, nil} ->
                                                gleam@dict:insert(
                                                    Distances@1,
                                                    {I, J},
                                                    Zero
                                                )
                                        end;

                                    {error, nil} ->
                                        gleam@dict:insert(
                                            Distances@1,
                                            {I, J},
                                            Zero
                                        )
                                end;

                            false ->
                                case gleam_stdlib:map_get(
                                    erlang:element(4, Graph),
                                    I
                                ) of
                                    {ok, Neighbors@1} ->
                                        case gleam_stdlib:map_get(
                                            Neighbors@1,
                                            J
                                        ) of
                                            {ok, Weight@1} ->
                                                gleam@dict:insert(
                                                    Distances@1,
                                                    {I, J},
                                                    Weight@1
                                                );

                                            {error, nil} ->
                                                Distances@1
                                        end;

                                    {error, nil} ->
                                        Distances@1
                                end
                        end end
                ) end)
    end,
    Final_distances = begin
        _pipe@2 = Nodes,
        gleam@list:fold(
            _pipe@2,
            Initial_distances,
            fun(Distances@2, K) -> _pipe@3 = Nodes,
                gleam@list:fold(
                    _pipe@3,
                    Distances@2,
                    fun(Distances@3, I@1) -> _pipe@4 = Nodes,
                        gleam@list:fold(
                            _pipe@4,
                            Distances@3,
                            fun(Distances@4, J@1) ->
                                case gleam_stdlib:map_get(Distances@4, {I@1, K}) of
                                    {error, nil} ->
                                        Distances@4;

                                    {ok, Dist_ik} ->
                                        case gleam_stdlib:map_get(
                                            Distances@4,
                                            {K, J@1}
                                        ) of
                                            {error, nil} ->
                                                Distances@4;

                                            {ok, Dist_kj} ->
                                                New_dist = Add(Dist_ik, Dist_kj),
                                                case gleam_stdlib:map_get(
                                                    Distances@4,
                                                    {I@1, J@1}
                                                ) of
                                                    {error, nil} ->
                                                        gleam@dict:insert(
                                                            Distances@4,
                                                            {I@1, J@1},
                                                            New_dist
                                                        );

                                                    {ok, Current_dist} ->
                                                        case Compare(
                                                            New_dist,
                                                            Current_dist
                                                        ) of
                                                            lt ->
                                                                gleam@dict:insert(
                                                                    Distances@4,
                                                                    {I@1, J@1},
                                                                    New_dist
                                                                );

                                                            _ ->
                                                                Distances@4
                                                        end
                                                end
                                        end
                                end
                            end
                        ) end
                ) end
        )
    end,
    case detect_negative_cycle(Final_distances, Nodes, Zero, Compare) of
        true ->
            {error, nil};

        false ->
            {ok, Final_distances}
    end.

-file("src/yog/pathfinding.gleam", 807).
?DOC(
    " Computes shortest distances between all pairs of points of interest.\n"
    "\n"
    " Automatically chooses the most efficient algorithm based on the density\n"
    " of points of interest relative to the total graph size:\n"
    " - When POIs are dense (> 1/3 of nodes): Uses Floyd-Warshall O(V³)\n"
    " - When POIs are sparse (≤ 1/3 of nodes): Uses multiple single-source Dijkstra O(P × (V+E) log V)\n"
    "\n"
    " Returns only distances between the specified points of interest, not all node pairs.\n"
    "\n"
    " **Time Complexity:** Automatically optimized based on POI density\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `between`: List of points of interest (POI) nodes\n"
    " - `zero`: The identity element for addition (e.g., `0` for integers)\n"
    " - `add`: Function to add two weights\n"
    " - `compare`: Function to compare two weights\n"
    "\n"
    " ## Returns\n"
    "\n"
    " - `Ok(distances)`: Dictionary mapping POI pairs to their shortest distances\n"
    " - `Error(Nil)`: If a negative cycle is detected (only when using Floyd-Warshall)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import gleam/dict\n"
    " import yog\n"
    " import yog/pathfinding\n"
    "\n"
    " // Graph with many nodes, but only care about distances between a few POIs\n"
    " let graph = build_large_graph()  // 1000 nodes\n"
    " let pois = [1, 5, 10, 42]       // 4 points of interest\n"
    "\n"
    " // Efficiently computes only POI-to-POI distances\n"
    " case pathfinding.distance_matrix(\n"
    "   in: graph,\n"
    "   between: pois,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare\n"
    " ) {\n"
    "   Ok(distances) -> {\n"
    "     // Get distance from POI 1 to POI 42\n"
    "     dict.get(distances, #(1, 42))\n"
    "   }\n"
    "   Error(Nil) -> panic as \"Negative cycle detected\"\n"
    " }\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - AoC 2016 Day 24: Computing distances between numbered locations\n"
    " - TSP-like problems: Finding optimal tour through specific landmarks\n"
    " - Network analysis: Distances between server hubs\n"
    " - Game pathfinding: Distances between quest objectives\n"
    "\n"
    " ## Algorithm Selection\n"
    "\n"
    " The function automatically chooses the optimal algorithm:\n"
    " - **Floyd-Warshall** when POIs are dense: Computes all-pairs shortest paths once,\n"
    "   then filters to POIs. Efficient when you need distances for most nodes.\n"
    " - **Multiple Dijkstra** when POIs are sparse: Runs single-source shortest paths\n"
    "   from each POI. Efficient when POIs are much fewer than total nodes.\n"
).
-spec distance_matrix(
    yog@model:graph(any(), LBM),
    list(integer()),
    LBM,
    fun((LBM, LBM) -> LBM),
    fun((LBM, LBM) -> gleam@order:order())
) -> {ok, gleam@dict:dict({integer(), integer()}, LBM)} | {error, nil}.
distance_matrix(Graph, Points_of_interest, Zero, Add, Compare) ->
    Num_nodes = maps:size(erlang:element(3, Graph)),
    Num_pois = erlang:length(Points_of_interest),
    Poi_set = gleam@set:from_list(Points_of_interest),
    case (Num_pois * 3) > Num_nodes of
        true ->
            case floyd_warshall(Graph, Zero, Add, Compare) of
                {error, nil} ->
                    {error, nil};

                {ok, All_distances} ->
                    Poi_distances = gleam@dict:filter(
                        All_distances,
                        fun(Key, _) ->
                            {From_node, To_node} = Key,
                            gleam@set:contains(Poi_set, From_node) andalso gleam@set:contains(
                                Poi_set,
                                To_node
                            )
                        end
                    ),
                    {ok, Poi_distances}
            end;

        false ->
            Result = gleam@list:fold(
                Points_of_interest,
                maps:new(),
                fun(Acc, Source) ->
                    Distances = single_source_distances(
                        Graph,
                        Source,
                        Zero,
                        Add,
                        Compare
                    ),
                    gleam@list:fold(
                        Points_of_interest,
                        Acc,
                        fun(Acc2, Target) ->
                            case gleam_stdlib:map_get(Distances, Target) of
                                {ok, Dist} ->
                                    gleam@dict:insert(
                                        Acc2,
                                        {Source, Target},
                                        Dist
                                    );

                                {error, nil} ->
                                    Acc2
                            end
                        end
                    )
                end
            ),
            {ok, Result}
    end.

-file("src/yog/pathfinding.gleam", 948).
-spec do_implicit_dijkstra(
    gleamy@pairing_heap:heap({LBY, LBZ}),
    gleam@dict:dict(LBZ, LBY),
    fun((LBZ) -> list({LBZ, LBY})),
    fun((LBZ) -> boolean()),
    fun((LBY, LBY) -> LBY),
    fun((LBY, LBY) -> gleam@order:order())
) -> gleam@option:option(LBY).
do_implicit_dijkstra(Frontier, Distances, Successors, Is_goal, Add, Compare) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            none;

        {ok, {{Dist, Current}, Rest_frontier}} ->
            case Is_goal(Current) of
                true ->
                    {some, Dist};

                false ->
                    Should_explore = case gleam_stdlib:map_get(
                        Distances,
                        Current
                    ) of
                        {ok, Prev_dist} ->
                            case Compare(Dist, Prev_dist) of
                                lt ->
                                    true;

                                _ ->
                                    false
                            end;

                        {error, nil} ->
                            true
                    end,
                    case Should_explore of
                        false ->
                            do_implicit_dijkstra(
                                Rest_frontier,
                                Distances,
                                Successors,
                                Is_goal,
                                Add,
                                Compare
                            );

                        true ->
                            New_distances = gleam@dict:insert(
                                Distances,
                                Current,
                                Dist
                            ),
                            Next_frontier = begin
                                _pipe = Successors(Current),
                                gleam@list:fold(
                                    _pipe,
                                    Rest_frontier,
                                    fun(H, Neighbor) ->
                                        {Next_state, Cost} = Neighbor,
                                        gleamy@priority_queue:push(
                                            H,
                                            {Add(Dist, Cost), Next_state}
                                        )
                                    end
                                )
                            end,
                            do_implicit_dijkstra(
                                Next_frontier,
                                New_distances,
                                Successors,
                                Is_goal,
                                Add,
                                Compare
                            )
                    end
            end
    end.

-file("src/yog/pathfinding.gleam", 931).
?DOC(
    " Finds the shortest path in an implicit graph using Dijkstra's algorithm.\n"
    "\n"
    " Unlike `shortest_path`, this does not require a materialized `Graph` value.\n"
    " Instead, you provide a `successors_with_cost` function that computes weighted\n"
    " neighbors on demand — ideal for state-space search, puzzles, or graphs too\n"
    " large to build upfront.\n"
    "\n"
    " Returns the shortest distance to any state satisfying `is_goal`, or `None`\n"
    " if no goal state is reachable.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V) where V is visited states and E is explored transitions\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `successors_with_cost`: Function that generates weighted successors for a state\n"
    " - `is_goal`: Predicate that identifies goal states\n"
    " - `zero`: The identity element for addition (e.g., 0 for integers)\n"
    " - `add`: Function to add two costs\n"
    " - `compare`: Function to compare two costs\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Find shortest path in a state-space where each state is (x, y, collected_keys)\n"
    " type State { State(x: Int, y: Int, keys: Int) }\n"
    "\n"
    " pathfinding.implicit_dijkstra(\n"
    "   from: State(0, 0, 0),\n"
    "   successors_with_cost: fn(state) {\n"
    "     // Generate neighbor states with their costs\n"
    "     [\n"
    "       #(State(state.x + 1, state.y, state.keys), 1),\n"
    "       #(State(state.x, state.y + 1, state.keys), 1),\n"
    "       // ... more neighbors\n"
    "     ]\n"
    "   },\n"
    "   is_goal: fn(state) { state.keys == all_keys_mask },\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare,\n"
    " )\n"
    " // => Some(42)  // Shortest distance to goal\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Puzzle solving: State-space search for optimal solutions\n"
    " - Game AI: Pathfinding with complex state (position + inventory)\n"
    " - Planning problems: Finding cheapest action sequences\n"
    " - AoC problems: 2019 Day 18, 2021 Day 23, 2022 Day 16, etc.\n"
    "\n"
    " ## Notes\n"
    "\n"
    " - States are deduplicated by their full value (using `Dict(state, cost)`)\n"
    " - If your state carries extra data beyond identity, use `implicit_dijkstra_by`\n"
    " - First path to reach a state with minimal cost wins\n"
    " - Works with any cost type that supports addition and comparison\n"
).
-spec implicit_dijkstra(
    LBU,
    fun((LBU) -> list({LBU, LBV})),
    fun((LBU) -> boolean()),
    LBV,
    fun((LBV, LBV) -> LBV),
    fun((LBV, LBV) -> gleam@order:order())
) -> gleam@option:option(LBV).
implicit_dijkstra(Start, Successors, Is_goal, Zero, Add, Compare) ->
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> Compare(erlang:element(1, A), erlang:element(1, B)) end
        ),
        gleamy@priority_queue:push(_pipe, {Zero, Start})
    end,
    do_implicit_dijkstra(
        Frontier,
        maps:new(),
        Successors,
        Is_goal,
        Add,
        Compare
    ).

-file("src/yog/pathfinding.gleam", 1086).
-spec do_implicit_dijkstra_by(
    gleamy@pairing_heap:heap({LCK, LCL}),
    gleam@dict:dict(LCN, LCK),
    fun((LCL) -> list({LCL, LCK})),
    fun((LCL) -> LCN),
    fun((LCL) -> boolean()),
    fun((LCK, LCK) -> LCK),
    fun((LCK, LCK) -> gleam@order:order())
) -> gleam@option:option(LCK).
do_implicit_dijkstra_by(
    Frontier,
    Distances,
    Successors,
    Key_fn,
    Is_goal,
    Add,
    Compare
) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            none;

        {ok, {{Dist, Current}, Rest_frontier}} ->
            case Is_goal(Current) of
                true ->
                    {some, Dist};

                false ->
                    Current_key = Key_fn(Current),
                    Should_explore = case gleam_stdlib:map_get(
                        Distances,
                        Current_key
                    ) of
                        {ok, Prev_dist} ->
                            case Compare(Dist, Prev_dist) of
                                lt ->
                                    true;

                                _ ->
                                    false
                            end;

                        {error, nil} ->
                            true
                    end,
                    case Should_explore of
                        false ->
                            do_implicit_dijkstra_by(
                                Rest_frontier,
                                Distances,
                                Successors,
                                Key_fn,
                                Is_goal,
                                Add,
                                Compare
                            );

                        true ->
                            New_distances = gleam@dict:insert(
                                Distances,
                                Current_key,
                                Dist
                            ),
                            Next_frontier = begin
                                _pipe = Successors(Current),
                                gleam@list:fold(
                                    _pipe,
                                    Rest_frontier,
                                    fun(H, Neighbor) ->
                                        {Next_state, Cost} = Neighbor,
                                        gleamy@priority_queue:push(
                                            H,
                                            {Add(Dist, Cost), Next_state}
                                        )
                                    end
                                )
                            end,
                            do_implicit_dijkstra_by(
                                Next_frontier,
                                New_distances,
                                Successors,
                                Key_fn,
                                Is_goal,
                                Add,
                                Compare
                            )
                    end
            end
    end.

-file("src/yog/pathfinding.gleam", 1060).
?DOC(
    " Like `implicit_dijkstra`, but deduplicates visited states by a custom key.\n"
    "\n"
    " Essential when your state carries extra data beyond what defines identity.\n"
    " For example, in state-space search you might have `#(Position, ExtraData)` states,\n"
    " but only want to visit each `Position` once — the `ExtraData` is carried state,\n"
    " not part of the identity.\n"
    "\n"
    " The `visited_by` function extracts the deduplication key from each state.\n"
    " Internally, a `Dict(key, cost)` tracks the best cost to each key, but the\n"
    " full state value is still passed to your successor function and goal predicate.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V) where V and E are measured in unique *keys*\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `visited_by`: Function that extracts the deduplication key from a state\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // State-space search where states carry metadata\n"
    " // Node is #(position, path_history) but we dedupe by position only\n"
    " pathfinding.implicit_dijkstra_by(\n"
    "   from: #(start_pos, []),\n"
    "   successors_with_cost: fn(state) {\n"
    "     let #(pos, history) = state\n"
    "     neighbors(pos)\n"
    "     |> list.map(fn(next_pos) {\n"
    "       #(#(next_pos, [pos, ..history]), move_cost(pos, next_pos))\n"
    "     })\n"
    "   },\n"
    "   visited_by: fn(state) { state.0 },  // Dedupe by position only\n"
    "   is_goal: fn(state) { state.0 == goal_pos },\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare,\n"
    " )\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - AoC 2019 Day 18: `#(at_key, collected_mask)` → dedupe by both\n"
    " - Puzzle solving: `#(board_state, move_count)` → dedupe by `board_state`\n"
    " - Pathfinding with budget: `#(position, fuel_left)` → dedupe by `position`\n"
    " - A* with metadata: `#(node_id, came_from)` → dedupe by `node_id`\n"
    "\n"
    " ## Comparison to `implicit_dijkstra`\n"
    "\n"
    " - `implicit_dijkstra`: Deduplicates by the entire state value\n"
    " - `implicit_dijkstra_by`: Deduplicates by `visited_by(state)` but keeps full state\n"
    "\n"
    " Similar to SQL's `DISTINCT ON(key)` or Python's `key=` parameter.\n"
).
-spec implicit_dijkstra_by(
    LCF,
    fun((LCF) -> list({LCF, LCG})),
    fun((LCF) -> any()),
    fun((LCF) -> boolean()),
    LCG,
    fun((LCG, LCG) -> LCG),
    fun((LCG, LCG) -> gleam@order:order())
) -> gleam@option:option(LCG).
implicit_dijkstra_by(Start, Successors, Key_fn, Is_goal, Zero, Add, Compare) ->
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> Compare(erlang:element(1, A), erlang:element(1, B)) end
        ),
        gleamy@priority_queue:push(_pipe, {Zero, Start})
    end,
    do_implicit_dijkstra_by(
        Frontier,
        maps:new(),
        Successors,
        Key_fn,
        Is_goal,
        Add,
        Compare
    ).

-file("src/yog/pathfinding.gleam", 1215).
-spec do_implicit_a_star(
    gleamy@pairing_heap:heap({LCW, LCW, LCX}),
    gleam@dict:dict(LCX, LCW),
    fun((LCX) -> list({LCX, LCW})),
    fun((LCX) -> boolean()),
    fun((LCX) -> LCW),
    fun((LCW, LCW) -> LCW),
    fun((LCW, LCW) -> gleam@order:order())
) -> gleam@option:option(LCW).
do_implicit_a_star(Frontier, Distances, Successors, Is_goal, H, Add, Compare) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            none;

        {ok, {{_, Dist, Current}, Rest_frontier}} ->
            case Is_goal(Current) of
                true ->
                    {some, Dist};

                false ->
                    Should_explore = case gleam_stdlib:map_get(
                        Distances,
                        Current
                    ) of
                        {ok, Prev_dist} ->
                            case Compare(Dist, Prev_dist) of
                                lt ->
                                    true;

                                _ ->
                                    false
                            end;

                        {error, nil} ->
                            true
                    end,
                    case Should_explore of
                        false ->
                            do_implicit_a_star(
                                Rest_frontier,
                                Distances,
                                Successors,
                                Is_goal,
                                H,
                                Add,
                                Compare
                            );

                        true ->
                            New_distances = gleam@dict:insert(
                                Distances,
                                Current,
                                Dist
                            ),
                            Next_frontier = begin
                                _pipe = Successors(Current),
                                gleam@list:fold(
                                    _pipe,
                                    Rest_frontier,
                                    fun(Frontier_acc, Neighbor) ->
                                        {Next_state, Edge_cost} = Neighbor,
                                        Next_dist = Add(Dist, Edge_cost),
                                        F_score = Add(Next_dist, H(Next_state)),
                                        gleamy@priority_queue:push(
                                            Frontier_acc,
                                            {F_score, Next_dist, Next_state}
                                        )
                                    end
                                )
                            end,
                            do_implicit_a_star(
                                Next_frontier,
                                New_distances,
                                Successors,
                                Is_goal,
                                H,
                                Add,
                                Compare
                            )
                    end
            end
    end.

-file("src/yog/pathfinding.gleam", 1196).
?DOC(
    " Finds the shortest path in an implicit graph using A* search with a heuristic.\n"
    "\n"
    " Like `implicit_dijkstra`, but uses a heuristic to guide the search toward the goal.\n"
    " The heuristic must be admissible (never overestimate the actual distance) to guarantee\n"
    " finding the shortest path.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V), but often faster than Dijkstra in practice\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `heuristic`: Function that estimates remaining cost from any state to goal.\n"
    "   Must be admissible (h(state) ≤ actual cost) to guarantee shortest path.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Grid pathfinding with Manhattan distance heuristic\n"
    " type Pos { Pos(x: Int, y: Int) }\n"
    "\n"
    " pathfinding.implicit_a_star(\n"
    "   from: Pos(0, 0),\n"
    "   successors_with_cost: fn(pos) {\n"
    "     [\n"
    "       #(Pos(pos.x + 1, pos.y), 1),\n"
    "       #(Pos(pos.x, pos.y + 1), 1),\n"
    "     ]\n"
    "   },\n"
    "   is_goal: fn(pos) { pos.x == 10 && pos.y == 10 },\n"
    "   heuristic: fn(pos) {\n"
    "     // Manhattan distance to goal\n"
    "     int.absolute_value(10 - pos.x) + int.absolute_value(10 - pos.y)\n"
    "   },\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare,\n"
    " )\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Grid pathfinding with spatial heuristics (Manhattan, Euclidean)\n"
    " - Puzzle solving where you can estimate \"distance to solution\"\n"
    " - Game AI pathfinding on maps\n"
    " - Any scenario where Dijkstra works but you have a good heuristic\n"
).
-spec implicit_a_star(
    LCS,
    fun((LCS) -> list({LCS, LCT})),
    fun((LCS) -> boolean()),
    fun((LCS) -> LCT),
    LCT,
    fun((LCT, LCT) -> LCT),
    fun((LCT, LCT) -> gleam@order:order())
) -> gleam@option:option(LCT).
implicit_a_star(Start, Successors, Is_goal, H, Zero, Add, Compare) ->
    Initial_f = H(Start),
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> Compare(erlang:element(1, A), erlang:element(1, B)) end
        ),
        gleamy@priority_queue:push(_pipe, {Initial_f, Zero, Start})
    end,
    do_implicit_a_star(
        Frontier,
        maps:new(),
        Successors,
        Is_goal,
        H,
        Add,
        Compare
    ).

-file("src/yog/pathfinding.gleam", 1340).
-spec do_implicit_a_star_by(
    gleamy@pairing_heap:heap({LDI, LDI, LDJ}),
    gleam@dict:dict(LDL, LDI),
    fun((LDJ) -> list({LDJ, LDI})),
    fun((LDJ) -> LDL),
    fun((LDJ) -> boolean()),
    fun((LDJ) -> LDI),
    fun((LDI, LDI) -> LDI),
    fun((LDI, LDI) -> gleam@order:order())
) -> gleam@option:option(LDI).
do_implicit_a_star_by(
    Frontier,
    Distances,
    Successors,
    Key_fn,
    Is_goal,
    H,
    Add,
    Compare
) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            none;

        {ok, {{_, Dist, Current}, Rest_frontier}} ->
            case Is_goal(Current) of
                true ->
                    {some, Dist};

                false ->
                    Current_key = Key_fn(Current),
                    Should_explore = case gleam_stdlib:map_get(
                        Distances,
                        Current_key
                    ) of
                        {ok, Prev_dist} ->
                            case Compare(Dist, Prev_dist) of
                                lt ->
                                    true;

                                _ ->
                                    false
                            end;

                        {error, nil} ->
                            true
                    end,
                    case Should_explore of
                        false ->
                            do_implicit_a_star_by(
                                Rest_frontier,
                                Distances,
                                Successors,
                                Key_fn,
                                Is_goal,
                                H,
                                Add,
                                Compare
                            );

                        true ->
                            New_distances = gleam@dict:insert(
                                Distances,
                                Current_key,
                                Dist
                            ),
                            Next_frontier = begin
                                _pipe = Successors(Current),
                                gleam@list:fold(
                                    _pipe,
                                    Rest_frontier,
                                    fun(Frontier_acc, Neighbor) ->
                                        {Next_state, Edge_cost} = Neighbor,
                                        Next_dist = Add(Dist, Edge_cost),
                                        F_score = Add(Next_dist, H(Next_state)),
                                        gleamy@priority_queue:push(
                                            Frontier_acc,
                                            {F_score, Next_dist, Next_state}
                                        )
                                    end
                                )
                            end,
                            do_implicit_a_star_by(
                                Next_frontier,
                                New_distances,
                                Successors,
                                Key_fn,
                                Is_goal,
                                H,
                                Add,
                                Compare
                            )
                    end
            end
    end.

-file("src/yog/pathfinding.gleam", 1311).
?DOC(
    " Like `implicit_a_star`, but deduplicates visited states by a custom key.\n"
    "\n"
    " Essential when your state carries extra data beyond what defines identity.\n"
    " The heuristic still operates on the full state, but deduplication uses only the key.\n"
    "\n"
    " **Time Complexity:** O((V + E) log V) where V and E are measured in unique *keys*\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Grid with carried items, but dedupe by position only\n"
    " // Heuristic considers only position, not items\n"
    " pathfinding.implicit_a_star_by(\n"
    "   from: #(Pos(0, 0), []),\n"
    "   successors_with_cost: fn(state) {\n"
    "     let #(pos, items) = state\n"
    "     neighbors(pos)\n"
    "     |> list.map(fn(next_pos) { #(#(next_pos, items), 1) })\n"
    "   },\n"
    "   visited_by: fn(state) { state.0 },  // Dedupe by position\n"
    "   is_goal: fn(state) { state.0 == goal_pos },\n"
    "   heuristic: fn(state) { manhattan_distance(state.0, goal_pos) },\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare,\n"
    " )\n"
    " ```\n"
).
-spec implicit_a_star_by(
    LDD,
    fun((LDD) -> list({LDD, LDE})),
    fun((LDD) -> any()),
    fun((LDD) -> boolean()),
    fun((LDD) -> LDE),
    LDE,
    fun((LDE, LDE) -> LDE),
    fun((LDE, LDE) -> gleam@order:order())
) -> gleam@option:option(LDE).
implicit_a_star_by(Start, Successors, Key_fn, Is_goal, H, Zero, Add, Compare) ->
    Initial_f = H(Start),
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) -> Compare(erlang:element(1, A), erlang:element(1, B)) end
        ),
        gleamy@priority_queue:push(_pipe, {Initial_f, Zero, Start})
    end,
    do_implicit_a_star_by(
        Frontier,
        maps:new(),
        Successors,
        Key_fn,
        Is_goal,
        H,
        Add,
        Compare
    ).

-file("src/yog/pathfinding.gleam", 1475).
-spec do_implicit_bellman_ford(
    yog@internal@queue:queue(LDU),
    gleam@dict:dict(LDU, LDW),
    gleam@dict:dict(LDU, integer()),
    gleam@set:set(LDU),
    fun((LDU) -> list({LDU, LDW})),
    fun((LDU) -> boolean()),
    LDW,
    fun((LDW, LDW) -> LDW),
    fun((LDW, LDW) -> gleam@order:order())
) -> implicit_bellman_ford_result(LDW).
do_implicit_bellman_ford(
    Q,
    Distances,
    Relax_counts,
    In_queue,
    Successors,
    Is_goal,
    Zero,
    Add,
    Compare
) ->
    case yog@internal@queue:pop(Q) of
        {error, nil} ->
            _pipe = Distances,
            _pipe@1 = maps:to_list(_pipe),
            _pipe@2 = gleam@list:filter(
                _pipe@1,
                fun(Entry) -> Is_goal(erlang:element(1, Entry)) end
            ),
            _pipe@3 = gleam@list:sort(
                _pipe@2,
                fun(A, B) ->
                    Compare(erlang:element(2, A), erlang:element(2, B))
                end
            ),
            _pipe@4 = gleam@list:first(_pipe@3),
            _pipe@5 = gleam@result:map(
                _pipe@4,
                fun(Entry@1) -> {found_goal, erlang:element(2, Entry@1)} end
            ),
            gleam@result:unwrap(_pipe@5, no_goal);

        {ok, {Current, Rest_queue}} ->
            New_in_queue = gleam@set:delete(In_queue, Current),
            Current_dist = begin
                _pipe@6 = gleam_stdlib:map_get(Distances, Current),
                gleam@result:unwrap(_pipe@6, Zero)
            end,
            {New_distances, New_counts, New_queue, New_in_q} = begin
                _pipe@7 = Successors(Current),
                gleam@list:fold(
                    _pipe@7,
                    {Distances, Relax_counts, Rest_queue, New_in_queue},
                    fun(Acc, Neighbor) ->
                        {Dists, Counts, Q_acc, In_q_acc} = Acc,
                        {Next_state, Edge_cost} = Neighbor,
                        New_dist = Add(Current_dist, Edge_cost),
                        case gleam_stdlib:map_get(Dists, Next_state) of
                            {ok, Prev_dist} ->
                                case Compare(New_dist, Prev_dist) of
                                    lt ->
                                        Updated_dists = gleam@dict:insert(
                                            Dists,
                                            Next_state,
                                            New_dist
                                        ),
                                        Relax_count = begin
                                            _pipe@8 = gleam_stdlib:map_get(
                                                Counts,
                                                Next_state
                                            ),
                                            gleam@result:unwrap(_pipe@8, 0)
                                        end,
                                        New_count = Relax_count + 1,
                                        Updated_counts = gleam@dict:insert(
                                            Counts,
                                            Next_state,
                                            New_count
                                        ),
                                        case New_count > maps:size(Dists) of
                                            true ->
                                                {Updated_dists,
                                                    Updated_counts,
                                                    Q_acc,
                                                    In_q_acc};

                                            false ->
                                                case gleam@set:contains(
                                                    In_q_acc,
                                                    Next_state
                                                ) of
                                                    true ->
                                                        {Updated_dists,
                                                            Updated_counts,
                                                            Q_acc,
                                                            In_q_acc};

                                                    false ->
                                                        {Updated_dists,
                                                            Updated_counts,
                                                            yog@internal@queue:push(
                                                                Q_acc,
                                                                Next_state
                                                            ),
                                                            gleam@set:insert(
                                                                In_q_acc,
                                                                Next_state
                                                            )}
                                                end
                                        end;

                                    _ ->
                                        Acc
                                end;

                            {error, nil} ->
                                Updated_dists@1 = gleam@dict:insert(
                                    Dists,
                                    Next_state,
                                    New_dist
                                ),
                                Updated_counts@1 = gleam@dict:insert(
                                    Counts,
                                    Next_state,
                                    1
                                ),
                                {Updated_dists@1,
                                    Updated_counts@1,
                                    yog@internal@queue:push(Q_acc, Next_state),
                                    gleam@set:insert(In_q_acc, Next_state)}
                        end
                    end
                )
            end,
            Has_negative_cycle = begin
                _pipe@9 = New_counts,
                _pipe@10 = maps:to_list(_pipe@9),
                gleam@list:any(
                    _pipe@10,
                    fun(Entry@2) ->
                        erlang:element(2, Entry@2) > maps:size(New_distances)
                    end
                )
            end,
            case Has_negative_cycle of
                true ->
                    detected_negative_cycle;

                false ->
                    do_implicit_bellman_ford(
                        New_queue,
                        New_distances,
                        New_counts,
                        New_in_q,
                        Successors,
                        Is_goal,
                        Zero,
                        Add,
                        Compare
                    )
            end
    end.

-file("src/yog/pathfinding.gleam", 1454).
?DOC(
    " Finds shortest path in implicit graphs with support for negative edge weights.\n"
    "\n"
    " Uses SPFA (Shortest Path Faster Algorithm), a queue-based variant of Bellman-Ford\n"
    " that works naturally with implicit graphs. Detects negative cycles by counting\n"
    " relaxations per state.\n"
    "\n"
    " **Time Complexity:** O(VE) average case where V and E are discovered dynamically\n"
    "\n"
    " ## Returns\n"
    "\n"
    " - `FoundGoal(cost)`: If a valid shortest path to goal exists\n"
    " - `DetectedNegativeCycle`: If a negative cycle is reachable from start\n"
    " - `NoGoal`: If no goal state is reached before exhausting reachable states\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " pathfinding.implicit_bellman_ford(\n"
    "   from: start_state,\n"
    "   successors_with_cost: fn(state) {\n"
    "     // Can include negative costs\n"
    "     [#(next_state1, -5), #(next_state2, 10)]\n"
    "   },\n"
    "   is_goal: fn(state) { state == goal },\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_compare: int.compare,\n"
    " )\n"
    " ```\n"
).
-spec implicit_bellman_ford(
    LDQ,
    fun((LDQ) -> list({LDQ, LDR})),
    fun((LDQ) -> boolean()),
    LDR,
    fun((LDR, LDR) -> LDR),
    fun((LDR, LDR) -> gleam@order:order())
) -> implicit_bellman_ford_result(LDR).
implicit_bellman_ford(Start, Successors, Is_goal, Zero, Add, Compare) ->
    do_implicit_bellman_ford(
        begin
            _pipe = yog@internal@queue:new(),
            yog@internal@queue:push(_pipe, Start)
        end,
        maps:from_list([{Start, Zero}]),
        maps:from_list([{Start, 0}]),
        gleam@set:new(),
        Successors,
        Is_goal,
        Zero,
        Add,
        Compare
    ).

-file("src/yog/pathfinding.gleam", 1616).
-spec do_implicit_bellman_ford_by(
    yog@internal@queue:queue(LEJ),
    gleam@dict:dict(LEL, {LEM, LEJ}),
    gleam@dict:dict(LEL, integer()),
    gleam@set:set(LEJ),
    fun((LEJ) -> list({LEJ, LEM})),
    fun((LEJ) -> LEL),
    fun((LEJ) -> boolean()),
    LEM,
    fun((LEM, LEM) -> LEM),
    fun((LEM, LEM) -> gleam@order:order())
) -> implicit_bellman_ford_result(LEM).
do_implicit_bellman_ford_by(
    Q,
    Distances,
    Relax_counts,
    In_queue,
    Successors,
    Key_fn,
    Is_goal,
    Zero,
    Add,
    Compare
) ->
    case yog@internal@queue:pop(Q) of
        {error, nil} ->
            _pipe = Distances,
            _pipe@1 = maps:to_list(_pipe),
            _pipe@2 = gleam@list:filter(
                _pipe@1,
                fun(Entry) ->
                    Is_goal(erlang:element(2, erlang:element(2, Entry)))
                end
            ),
            _pipe@3 = gleam@list:sort(
                _pipe@2,
                fun(A, B) ->
                    Compare(
                        erlang:element(1, erlang:element(2, A)),
                        erlang:element(1, erlang:element(2, B))
                    )
                end
            ),
            _pipe@4 = gleam@list:first(_pipe@3),
            _pipe@5 = gleam@result:map(
                _pipe@4,
                fun(Entry@1) ->
                    {found_goal, erlang:element(1, erlang:element(2, Entry@1))}
                end
            ),
            gleam@result:unwrap(_pipe@5, no_goal);

        {ok, {Current, Rest_queue}} ->
            Current_key = Key_fn(Current),
            New_in_queue = gleam@set:delete(In_queue, Current),
            Current_dist = begin
                _pipe@6 = gleam_stdlib:map_get(Distances, Current_key),
                _pipe@7 = gleam@result:map(
                    _pipe@6,
                    fun(Pair) -> erlang:element(1, Pair) end
                ),
                gleam@result:unwrap(_pipe@7, Zero)
            end,
            {New_distances, New_counts, New_queue, New_in_q} = begin
                _pipe@8 = Successors(Current),
                gleam@list:fold(
                    _pipe@8,
                    {Distances, Relax_counts, Rest_queue, New_in_queue},
                    fun(Acc, Neighbor) ->
                        {Dists, Counts, Q_acc, In_q_acc} = Acc,
                        {Next_state, Edge_cost} = Neighbor,
                        Next_key = Key_fn(Next_state),
                        New_dist = Add(Current_dist, Edge_cost),
                        case gleam_stdlib:map_get(Dists, Next_key) of
                            {ok, {Prev_dist, _}} ->
                                case Compare(New_dist, Prev_dist) of
                                    lt ->
                                        Updated_dists = gleam@dict:insert(
                                            Dists,
                                            Next_key,
                                            {New_dist, Next_state}
                                        ),
                                        Relax_count = begin
                                            _pipe@9 = gleam_stdlib:map_get(
                                                Counts,
                                                Next_key
                                            ),
                                            gleam@result:unwrap(_pipe@9, 0)
                                        end,
                                        New_count = Relax_count + 1,
                                        Updated_counts = gleam@dict:insert(
                                            Counts,
                                            Next_key,
                                            New_count
                                        ),
                                        case New_count > maps:size(Dists) of
                                            true ->
                                                {Updated_dists,
                                                    Updated_counts,
                                                    Q_acc,
                                                    In_q_acc};

                                            false ->
                                                case gleam@set:contains(
                                                    In_q_acc,
                                                    Next_state
                                                ) of
                                                    true ->
                                                        {Updated_dists,
                                                            Updated_counts,
                                                            Q_acc,
                                                            In_q_acc};

                                                    false ->
                                                        {Updated_dists,
                                                            Updated_counts,
                                                            yog@internal@queue:push(
                                                                Q_acc,
                                                                Next_state
                                                            ),
                                                            gleam@set:insert(
                                                                In_q_acc,
                                                                Next_state
                                                            )}
                                                end
                                        end;

                                    _ ->
                                        Acc
                                end;

                            {error, nil} ->
                                Updated_dists@1 = gleam@dict:insert(
                                    Dists,
                                    Next_key,
                                    {New_dist, Next_state}
                                ),
                                Updated_counts@1 = gleam@dict:insert(
                                    Counts,
                                    Next_key,
                                    1
                                ),
                                {Updated_dists@1,
                                    Updated_counts@1,
                                    yog@internal@queue:push(Q_acc, Next_state),
                                    gleam@set:insert(In_q_acc, Next_state)}
                        end
                    end
                )
            end,
            Has_negative_cycle = begin
                _pipe@10 = New_counts,
                _pipe@11 = maps:to_list(_pipe@10),
                gleam@list:any(
                    _pipe@11,
                    fun(Entry@2) ->
                        erlang:element(2, Entry@2) > maps:size(New_distances)
                    end
                )
            end,
            case Has_negative_cycle of
                true ->
                    detected_negative_cycle;

                false ->
                    do_implicit_bellman_ford_by(
                        New_queue,
                        New_distances,
                        New_counts,
                        New_in_q,
                        Successors,
                        Key_fn,
                        Is_goal,
                        Zero,
                        Add,
                        Compare
                    )
            end
    end.

-file("src/yog/pathfinding.gleam", 1592).
?DOC(
    " Like `implicit_bellman_ford`, but deduplicates visited states by a custom key.\n"
    "\n"
    " **Time Complexity:** O(VE) where V and E are measured in unique *keys*\n"
).
-spec implicit_bellman_ford_by(
    LEE,
    fun((LEE) -> list({LEE, LEF})),
    fun((LEE) -> any()),
    fun((LEE) -> boolean()),
    LEF,
    fun((LEF, LEF) -> LEF),
    fun((LEF, LEF) -> gleam@order:order())
) -> implicit_bellman_ford_result(LEF).
implicit_bellman_ford_by(Start, Successors, Key_fn, Is_goal, Zero, Add, Compare) ->
    Start_key = Key_fn(Start),
    do_implicit_bellman_ford_by(
        begin
            _pipe = yog@internal@queue:new(),
            yog@internal@queue:push(_pipe, Start)
        end,
        maps:from_list([{Start_key, {Zero, Start}}]),
        maps:from_list([{Start_key, 0}]),
        gleam@set:new(),
        Successors,
        Key_fn,
        Is_goal,
        Zero,
        Add,
        Compare
    ).
