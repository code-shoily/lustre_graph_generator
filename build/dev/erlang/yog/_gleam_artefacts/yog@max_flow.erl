-module(yog@max_flow).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/max_flow.gleam").
-export([edmonds_karp/8, min_cut/3]).
-export_type([max_flow_result/1, min_cut/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " Maximum flow algorithms for network flow problems.\n"
    "\n"
    " This module provides implementations of maximum flow algorithms, which solve\n"
    " the problem of finding the maximum amount of \"flow\" that can be sent from a\n"
    " source node to a sink node in a flow network, respecting edge capacity constraints.\n"
    "\n"
    " ## Algorithms\n"
    "\n"
    " - **Edmonds-Karp** - Ford-Fulkerson with BFS for finding augmenting paths\n"
    "   - Time Complexity: O(VE²)\n"
    "   - Most straightforward and reliable implementation\n"
    "   - Good performance for most practical problems\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/max_flow\n"
    " import gleam/int\n"
    "\n"
    " pub fn main() {\n"
    "   // Create a flow network\n"
    "   // Edges represent capacity constraints\n"
    "   let network =\n"
    "     yog.directed()\n"
    "     |> yog.add_edge(from: 0, to: 1, with: 10)  // source to A, capacity 10\n"
    "     |> yog.add_edge(from: 0, to: 2, with: 10)  // source to B, capacity 10\n"
    "     |> yog.add_edge(from: 1, to: 3, with: 4)   // A to C, capacity 4\n"
    "     |> yog.add_edge(from: 1, to: 2, with: 2)   // A to B, capacity 2\n"
    "     |> yog.add_edge(from: 2, to: 3, with: 9)   // B to C, capacity 9\n"
    "\n"
    "   let result = max_flow.edmonds_karp(\n"
    "     in: network,\n"
    "     from: 0,  // source\n"
    "     to: 3,    // sink\n"
    "     with_zero: 0,\n"
    "     with_add: int.add,\n"
    "     with_subtract: fn(a, b) { a - b },\n"
    "     with_compare: int.compare,\n"
    "     with_min: int.min,\n"
    "   )\n"
    "\n"
    "   // result.max_flow => 13\n"
    "   // result.min_cut => [0] on one side, [1, 2, 3] on other\n"
    " }\n"
    " ```\n"
    "\n"
    " ## Applications\n"
    "\n"
    " - **Network flow optimization** - Bandwidth allocation, traffic routing, pipe networks\n"
    " - **Bipartite matching** - Assignment problems, job scheduling\n"
    " - **Min-cut problems** - Network reliability, graph partitioning via max-flow min-cut theorem\n"
    " - **Image segmentation** - Computer vision applications\n"
    " - **Circulation with demands** - Supply chain, resource distribution\n"
    " - **Project selection** - Maximize profit subject to dependencies\n"
).

-type max_flow_result(ASZA) :: {max_flow_result,
        ASZA,
        yog@model:graph(nil, ASZA),
        integer(),
        integer()}.

-type min_cut() :: {min_cut, gleam@set:set(integer()), gleam@set:set(integer())}.

-file("src/yog/max_flow.gleam", 289).
-spec build_adjacency_list(gleam@dict:dict({integer(), integer()}, any())) -> gleam@dict:dict(integer(), list(integer())).
build_adjacency_list(Residuals) ->
    gleam@dict:fold(
        Residuals,
        maps:new(),
        fun(Adj, Edge, _) ->
            {From, To} = Edge,
            gleam@dict:upsert(Adj, From, fun(Existing) -> case Existing of
                        {some, Neighbors} ->
                            [To | Neighbors];

                        none ->
                            [To]
                    end end)
        end
    ).

-file("src/yog/max_flow.gleam", 449).
-spec do_reconstruct_path(
    gleam@dict:dict(integer(), {integer(), ATAQ}),
    integer(),
    list(integer()),
    ATAQ,
    boolean(),
    fun((ATAQ, ATAQ) -> ATAQ)
) -> {list(integer()), ATAQ}.
do_reconstruct_path(Parents, Current, Path, Bottleneck, Is_first, Min) ->
    New_path = [Current | Path],
    case gleam_stdlib:map_get(Parents, Current) of
        {error, nil} ->
            {New_path, Bottleneck};

        {ok, {Parent, Capacity}} ->
            case Parent of
                -1 ->
                    {New_path, Bottleneck};

                _ ->
                    New_bottleneck = case Is_first of
                        true ->
                            Capacity;

                        false ->
                            Min(Capacity, Bottleneck)
                    end,
                    do_reconstruct_path(
                        Parents,
                        Parent,
                        New_path,
                        New_bottleneck,
                        false,
                        Min
                    )
            end
    end.

-file("src/yog/max_flow.gleam", 440).
-spec reconstruct_path(
    gleam@dict:dict(integer(), {integer(), ATAM}),
    integer(),
    ATAM,
    fun((ATAM, ATAM) -> ATAM)
) -> {list(integer()), ATAM}.
reconstruct_path(Parents, Sink, Zero, Min) ->
    do_reconstruct_path(Parents, Sink, [], Zero, true, Min).

-file("src/yog/max_flow.gleam", 374).
-spec do_bfs(
    gleam@dict:dict({integer(), integer()}, ATAE),
    gleam@dict:dict(integer(), list(integer())),
    yog@internal@queue:queue(integer()),
    gleam@dict:dict(integer(), {integer(), ATAE}),
    integer(),
    ATAE,
    fun((ATAE, ATAE) -> gleam@order:order()),
    fun((ATAE, ATAE) -> ATAE)
) -> {ok, {list(integer()), ATAE}} | {error, nil}.
do_bfs(Residuals, Adj_list, Q, Parents, Sink, Zero, Compare, Min) ->
    case yog@internal@queue:pop(Q) of
        {error, nil} ->
            {error, nil};

        {ok, {Current, Rest}} ->
            case Current =:= Sink of
                true ->
                    {Path, Bottleneck} = reconstruct_path(
                        Parents,
                        Sink,
                        Zero,
                        Min
                    ),
                    {ok, {Path, Bottleneck}};

                false ->
                    Neighbors = begin
                        _pipe = gleam_stdlib:map_get(Adj_list, Current),
                        gleam@result:unwrap(_pipe, [])
                    end,
                    {New_neighbors, New_parents} = gleam@list:fold(
                        Neighbors,
                        {[], Parents},
                        fun(Acc, Neighbor) ->
                            {Neighbors_acc, Parents_acc} = Acc,
                            Cap = begin
                                _pipe@1 = gleam_stdlib:map_get(
                                    Residuals,
                                    {Current, Neighbor}
                                ),
                                gleam@result:unwrap(_pipe@1, Zero)
                            end,
                            Already_visited = gleam@dict:has_key(
                                Parents_acc,
                                Neighbor
                            ),
                            Has_capacity = Compare(Cap, Zero) =:= gt,
                            case Already_visited orelse not Has_capacity of
                                true ->
                                    Acc;

                                false ->
                                    Updated_parents = gleam@dict:insert(
                                        Parents_acc,
                                        Neighbor,
                                        {Current, Cap}
                                    ),
                                    {[Neighbor | Neighbors_acc],
                                        Updated_parents}
                            end
                        end
                    ),
                    New_queue = yog@internal@queue:push_list(
                        Rest,
                        New_neighbors
                    ),
                    do_bfs(
                        Residuals,
                        Adj_list,
                        New_queue,
                        New_parents,
                        Sink,
                        Zero,
                        Compare,
                        Min
                    )
            end
    end.

-file("src/yog/max_flow.gleam", 351).
-spec find_augmenting_path_bfs(
    gleam@dict:dict({integer(), integer()}, ASZZ),
    gleam@dict:dict(integer(), list(integer())),
    integer(),
    integer(),
    ASZZ,
    fun((ASZZ, ASZZ) -> gleam@order:order()),
    fun((ASZZ, ASZZ) -> ASZZ)
) -> {ok, {list(integer()), ASZZ}} | {error, nil}.
find_augmenting_path_bfs(Residuals, Adj_list, Source, Sink, Zero, Compare, Min) ->
    Initial_queue = begin
        _pipe = yog@internal@queue:new(),
        yog@internal@queue:push(_pipe, Source)
    end,
    do_bfs(
        Residuals,
        Adj_list,
        Initial_queue,
        maps:from_list([{Source, {-1, Zero}}]),
        Sink,
        Zero,
        Compare,
        Min
    ).

-file("src/yog/max_flow.gleam", 495).
-spec do_augment_path(
    gleam@dict:dict({integer(), integer()}, ATAZ),
    list(integer()),
    ATAZ,
    fun((ATAZ, ATAZ) -> ATAZ),
    fun((ATAZ, ATAZ) -> ATAZ)
) -> gleam@dict:dict({integer(), integer()}, ATAZ).
do_augment_path(Residuals, Path, Bottleneck, Add, Subtract) ->
    case Path of
        [] ->
            Residuals;

        [_] ->
            Residuals;

        [From, To | Rest] ->
            Forward_key = {From, To},
            Backward_key = {To, From},
            Forward_cap = begin
                _pipe = gleam_stdlib:map_get(Residuals, Forward_key),
                gleam@result:unwrap(_pipe, Bottleneck)
            end,
            Backward_cap = begin
                _pipe@1 = gleam_stdlib:map_get(Residuals, Backward_key),
                gleam@result:unwrap(_pipe@1, Bottleneck)
            end,
            New_residuals = begin
                _pipe@2 = Residuals,
                _pipe@3 = gleam@dict:insert(
                    _pipe@2,
                    Forward_key,
                    Subtract(Forward_cap, Bottleneck)
                ),
                gleam@dict:insert(
                    _pipe@3,
                    Backward_key,
                    Add(Backward_cap, Bottleneck)
                )
            end,
            do_augment_path(
                New_residuals,
                [To | Rest],
                Bottleneck,
                Add,
                Subtract
            )
    end.

-file("src/yog/max_flow.gleam", 485).
-spec augment_path(
    gleam@dict:dict({integer(), integer()}, ATAV),
    list(integer()),
    ATAV,
    fun((ATAV, ATAV) -> ATAV),
    fun((ATAV, ATAV) -> ATAV)
) -> gleam@dict:dict({integer(), integer()}, ATAV).
augment_path(Residuals, Path, Bottleneck, Add, Subtract) ->
    do_augment_path(Residuals, Path, Bottleneck, Add, Subtract).

-file("src/yog/max_flow.gleam", 302).
-spec ford_fulkerson(
    gleam@dict:dict({integer(), integer()}, ASZW),
    gleam@dict:dict(integer(), list(integer())),
    integer(),
    integer(),
    ASZW,
    ASZW,
    fun((ASZW, ASZW) -> ASZW),
    fun((ASZW, ASZW) -> ASZW),
    fun((ASZW, ASZW) -> gleam@order:order()),
    fun((ASZW, ASZW) -> ASZW)
) -> {gleam@dict:dict({integer(), integer()}, ASZW), ASZW}.
ford_fulkerson(
    Residuals,
    Adj_list,
    Source,
    Sink,
    Total_flow,
    Zero,
    Add,
    Subtract,
    Compare,
    Min
) ->
    case find_augmenting_path_bfs(
        Residuals,
        Adj_list,
        Source,
        Sink,
        Zero,
        Compare,
        Min
    ) of
        {error, nil} ->
            {Residuals, Total_flow};

        {ok, {Path, Bottleneck}} ->
            New_residuals = augment_path(
                Residuals,
                Path,
                Bottleneck,
                Add,
                Subtract
            ),
            ford_fulkerson(
                New_residuals,
                Adj_list,
                Source,
                Sink,
                Add(Total_flow, Bottleneck),
                Zero,
                Add,
                Subtract,
                Compare,
                Min
            )
    end.

-file("src/yog/max_flow.gleam", 526).
-spec residuals_to_graph(
    gleam@dict:dict({integer(), integer()}, ATBD),
    gleam@set:set(integer())
) -> yog@model:graph(nil, ATBD).
residuals_to_graph(Residuals, All_nodes) ->
    Graph = gleam@set:fold(
        All_nodes,
        yog@model:new(directed),
        fun(G, Node) -> yog@model:add_node(G, Node, nil) end
    ),
    gleam@dict:fold(
        Residuals,
        Graph,
        fun(G@1, Edge, Capacity) ->
            {From, To} = Edge,
            yog@model:add_edge(G@1, From, To, Capacity)
        end
    ).

-file("src/yog/max_flow.gleam", 544).
-spec extract_all_nodes_from_edges(yog@model:graph(any(), any())) -> gleam@set:set(integer()).
extract_all_nodes_from_edges(Graph) ->
    Source_nodes = gleam@set:from_list(maps:keys(erlang:element(4, Graph))),
    Dest_nodes = begin
        _pipe = maps:values(erlang:element(4, Graph)),
        _pipe@1 = gleam@list:flat_map(
            _pipe,
            fun(Edge_dict) -> maps:keys(Edge_dict) end
        ),
        gleam@set:from_list(_pipe@1)
    end,
    gleam@set:union(Source_nodes, Dest_nodes).

-file("src/yog/max_flow.gleam", 261).
-spec build_residuals(yog@model:graph(any(), ASZP), ASZP) -> {gleam@dict:dict({integer(),
        integer()}, ASZP),
    gleam@set:set(integer())}.
build_residuals(Graph, Zero) ->
    Nodes_set = begin
        _pipe = extract_all_nodes_from_edges(Graph),
        gleam@set:union(_pipe, gleam@set:from_list(yog@model:all_nodes(Graph)))
    end,
    All_nodes_list = gleam@set:to_list(Nodes_set),
    Residuals = gleam@list:fold(
        All_nodes_list,
        maps:new(),
        fun(Caps, Node_id) ->
            Successors = yog@model:successors(Graph, Node_id),
            gleam@list:fold(
                Successors,
                Caps,
                fun(Acc, Edge) ->
                    {Neighbor, Capacity} = Edge,
                    With_forward = gleam@dict:insert(
                        Acc,
                        {Node_id, Neighbor},
                        Capacity
                    ),
                    case gleam@dict:has_key(With_forward, {Neighbor, Node_id}) of
                        true ->
                            With_forward;

                        false ->
                            gleam@dict:insert(
                                With_forward,
                                {Neighbor, Node_id},
                                Zero
                            )
                    end
                end
            )
        end
    ),
    {Residuals, Nodes_set}.

-file("src/yog/max_flow.gleam", 164).
?DOC(
    " Finds the maximum flow using the Edmonds-Karp algorithm.\n"
    "\n"
    " Edmonds-Karp is a specific implementation of the Ford-Fulkerson method\n"
    " that uses BFS to find the shortest augmenting path. This guarantees\n"
    " O(VE²) time complexity.\n"
    "\n"
    " **Time Complexity:** O(VE²)\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `in` - The flow network (directed graph where edge weights are capacities)\n"
    " - `from` - The source node (where flow originates)\n"
    " - `to` - The sink node (where flow terminates)\n"
    " - `with_zero` - The zero element for the capacity type (e.g., 0 for Int)\n"
    " - `with_add` - Function to add two capacity values\n"
    " - `with_subtract` - Function to subtract capacity values\n"
    " - `with_compare` - Function to compare capacity values\n"
    " - `with_min` - Function to find minimum of two capacity values\n"
    "\n"
    " ## Returns\n"
    "\n"
    " A `MaxFlowResult` containing:\n"
    " - The maximum flow value\n"
    " - The residual graph (for extracting flow paths or min-cut)\n"
    " - Source and sink node IDs\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import gleam/int\n"
    " import yog\n"
    " import yog/max_flow\n"
    "\n"
    " let network =\n"
    "   yog.directed()\n"
    "   |> yog.add_edge(from: 0, to: 1, with: 16)\n"
    "   |> yog.add_edge(from: 0, to: 2, with: 13)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> yog.add_edge(from: 1, to: 3, with: 12)\n"
    "   |> yog.add_edge(from: 2, to: 1, with: 4)\n"
    "   |> yog.add_edge(from: 2, to: 4, with: 14)\n"
    "   |> yog.add_edge(from: 3, to: 2, with: 9)\n"
    "   |> yog.add_edge(from: 3, to: 5, with: 20)\n"
    "   |> yog.add_edge(from: 4, to: 3, with: 7)\n"
    "   |> yog.add_edge(from: 4, to: 5, with: 4)\n"
    "\n"
    " let result = max_flow.edmonds_karp(\n"
    "   in: network,\n"
    "   from: 0,\n"
    "   to: 5,\n"
    "   with_zero: 0,\n"
    "   with_add: int.add,\n"
    "   with_subtract: fn(a, b) { a - b },\n"
    "   with_compare: int.compare,\n"
    "   with_min: int.min,\n"
    " )\n"
    "\n"
    " // result.max_flow => 23\n"
    " ```\n"
).
-spec edmonds_karp(
    yog@model:graph(any(), ASZI),
    integer(),
    integer(),
    ASZI,
    fun((ASZI, ASZI) -> ASZI),
    fun((ASZI, ASZI) -> ASZI),
    fun((ASZI, ASZI) -> gleam@order:order()),
    fun((ASZI, ASZI) -> ASZI)
) -> max_flow_result(ASZI).
edmonds_karp(Graph, Source, Sink, Zero, Add, Subtract, Compare, Min) ->
    case Source =:= Sink of
        true ->
            Empty_graph = yog@model:new(directed),
            {max_flow_result, Zero, Empty_graph, Source, Sink};

        false ->
            {Residuals, All_nodes} = build_residuals(Graph, Zero),
            Adj_list = build_adjacency_list(Residuals),
            {Final_residuals, Total_flow} = ford_fulkerson(
                Residuals,
                Adj_list,
                Source,
                Sink,
                Zero,
                Zero,
                Add,
                Subtract,
                Compare,
                Min
            ),
            Residual_graph = residuals_to_graph(Final_residuals, All_nodes),
            {max_flow_result, Total_flow, Residual_graph, Source, Sink}
    end.

-file("src/yog/max_flow.gleam", 568).
-spec do_dfs_reachable(
    yog@model:graph(nil, ATBR),
    list(integer()),
    gleam@set:set(integer()),
    ATBR,
    fun((ATBR, ATBR) -> gleam@order:order())
) -> gleam@set:set(integer()).
do_dfs_reachable(Residual, Stack, Visited, Zero, Compare) ->
    case Stack of
        [] ->
            Visited;

        [Current | Rest] ->
            case gleam@set:contains(Visited, Current) of
                true ->
                    do_dfs_reachable(Residual, Rest, Visited, Zero, Compare);

                false ->
                    New_visited = gleam@set:insert(Visited, Current),
                    New_stack = begin
                        _pipe = yog@model:successors(Residual, Current),
                        gleam@list:fold(
                            _pipe,
                            Rest,
                            fun(Stack_acc, Edge) ->
                                {Node, Capacity} = Edge,
                                case not gleam@set:contains(New_visited, Node)
                                andalso (Compare(Capacity, Zero) =:= gt) of
                                    true ->
                                        [Node | Stack_acc];

                                    false ->
                                        Stack_acc
                                end
                            end
                        )
                    end,
                    do_dfs_reachable(
                        Residual,
                        New_stack,
                        New_visited,
                        Zero,
                        Compare
                    )
            end
    end.

-file("src/yog/max_flow.gleam", 559).
-spec find_reachable_nodes(
    yog@model:graph(nil, ATBN),
    integer(),
    ATBN,
    fun((ATBN, ATBN) -> gleam@order:order())
) -> gleam@set:set(integer()).
find_reachable_nodes(Residual, Source, Zero, Compare) ->
    do_dfs_reachable(Residual, [Source], gleam@set:new(), Zero, Compare).

-file("src/yog/max_flow.gleam", 244).
?DOC(
    " Extracts the minimum cut from a max flow result.\n"
    "\n"
    " Uses the max-flow min-cut theorem: the minimum cut can be found by\n"
    " identifying all nodes reachable from the source in the residual graph\n"
    " after computing max flow.\n"
    "\n"
    " The cut separates nodes reachable from source (source_side) from the\n"
    " rest (sink_side). The capacity of edges crossing from source_side to\n"
    " sink_side equals the max flow value.\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `result` - The max flow result from `edmonds_karp`\n"
    " - `with_zero` - The zero element for the capacity type\n"
    " - `with_compare` - Function to compare capacity values\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let result = max_flow.edmonds_karp(...)\n"
    " let cut = max_flow.min_cut(result, with_zero: 0, with_compare: int.compare)\n"
    " // cut.source_side contains nodes on source side\n"
    " // cut.sink_side contains nodes on sink side\n"
    " ```\n"
).
-spec min_cut(
    max_flow_result(ASZM),
    ASZM,
    fun((ASZM, ASZM) -> gleam@order:order())
) -> min_cut().
min_cut(Result, Zero, Compare) ->
    Reachable = find_reachable_nodes(
        erlang:element(3, Result),
        erlang:element(4, Result),
        Zero,
        Compare
    ),
    All_nodes = begin
        _pipe = yog@model:all_nodes(erlang:element(3, Result)),
        gleam@set:from_list(_pipe)
    end,
    Sink_side = gleam@set:difference(All_nodes, Reachable),
    {min_cut, Reachable, Sink_side}.
