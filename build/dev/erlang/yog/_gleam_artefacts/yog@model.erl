-module(yog@model).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/model.gleam").
-export([new/1, add_node/3, successors/2, predecessors/2, neighbors/2, all_nodes/1, order/1, successor_ids/2, add_edge/4, remove_node/2, add_edge_with_combine/5]).
-export_type([graph_type/0, graph/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type graph_type() :: directed | undirected.

-type graph(AMLE, AMLF) :: {graph,
        graph_type(),
        gleam@dict:dict(integer(), AMLE),
        gleam@dict:dict(integer(), gleam@dict:dict(integer(), AMLF)),
        gleam@dict:dict(integer(), gleam@dict:dict(integer(), AMLF))}.

-file("src/yog/model.gleam", 39).
?DOC(
    " Creates a new empty graph of the specified type.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph = model.new(Directed)\n"
    " ```\n"
).
-spec new(graph_type()) -> graph(any(), any()).
new(Graph_type) ->
    {graph, Graph_type, maps:new(), maps:new(), maps:new()}.

-file("src/yog/model.gleam", 58).
?DOC(
    " Adds a node to the graph with the given ID and data.\n"
    " If a node with this ID already exists, its data will be replaced.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " graph\n"
    " |> model.add_node(1, \"Node A\")\n"
    " |> model.add_node(2, \"Node B\")\n"
    " ```\n"
).
-spec add_node(graph(AMLK, AMLL), integer(), AMLK) -> graph(AMLK, AMLL).
add_node(Graph, Id, Data) ->
    New_nodes = gleam@dict:insert(erlang:element(3, Graph), Id, Data),
    {graph,
        erlang:element(2, Graph),
        New_nodes,
        erlang:element(4, Graph),
        erlang:element(5, Graph)}.

-file("src/yog/model.gleam", 89).
?DOC(" Gets nodes you can travel TO (Successors).\n").
-spec successors(graph(any(), AMLX), integer()) -> list({integer(), AMLX}).
successors(Graph, Id) ->
    _pipe = erlang:element(4, Graph),
    _pipe@1 = gleam_stdlib:map_get(_pipe, Id),
    _pipe@2 = gleam@result:map(_pipe@1, fun maps:to_list/1),
    gleam@result:unwrap(_pipe@2, []).

-file("src/yog/model.gleam", 97).
?DOC(" Gets nodes you came FROM (Predecessors).\n").
-spec predecessors(graph(any(), AMMC), integer()) -> list({integer(), AMMC}).
predecessors(Graph, Id) ->
    _pipe = erlang:element(5, Graph),
    _pipe@1 = gleam_stdlib:map_get(_pipe, Id),
    _pipe@2 = gleam@result:map(_pipe@1, fun maps:to_list/1),
    gleam@result:unwrap(_pipe@2, []).

-file("src/yog/model.gleam", 106).
?DOC(
    " Gets everyone connected to the node, regardless of direction.\n"
    " Useful for algorithms like finding \"connected components.\"\n"
).
-spec neighbors(graph(any(), AMMH), integer()) -> list({integer(), AMMH}).
neighbors(Graph, Id) ->
    case erlang:element(2, Graph) of
        undirected ->
            successors(Graph, Id);

        directed ->
            Out = successors(Graph, Id),
            In_ = predecessors(Graph, Id),
            gleam@list:fold(
                In_,
                Out,
                fun(Acc, Incoming) ->
                    {In_id, _} = Incoming,
                    case gleam@list:any(
                        Out,
                        fun(O) -> erlang:element(1, O) =:= In_id end
                    ) of
                        true ->
                            Acc;

                        false ->
                            [Incoming | Acc]
                    end
                end
            )
    end.

-file("src/yog/model.gleam", 127).
?DOC(
    " Returns all node IDs in the graph.\n"
    " This includes all nodes, even isolated nodes with no edges.\n"
).
-spec all_nodes(graph(any(), any())) -> list(integer()).
all_nodes(Graph) ->
    maps:keys(erlang:element(3, Graph)).

-file("src/yog/model.gleam", 134).
?DOC(
    " Returns the number of nodes in the graph (graph order).\n"
    "\n"
    " **Time Complexity:** O(1)\n"
).
-spec order(graph(any(), any())) -> integer().
order(Graph) ->
    maps:size(erlang:element(3, Graph)).

-file("src/yog/model.gleam", 140).
?DOC(
    " Returns just the NodeIds of successors (without edge weights).\n"
    " Convenient for traversal algorithms that only need the IDs.\n"
).
-spec successor_ids(graph(any(), any()), integer()) -> list(integer()).
successor_ids(Graph, Id) ->
    _pipe = successors(Graph, Id),
    gleam@list:map(_pipe, fun(Edge) -> erlang:element(1, Edge) end).

-file("src/yog/model.gleam", 145).
-spec do_add_directed_edge(graph(AMMZ, AMNA), integer(), integer(), AMNA) -> graph(AMMZ, AMNA).
do_add_directed_edge(Graph, Src, Dst, Weight) ->
    Out_update_fn = fun(Maybe_inner_map) -> case Maybe_inner_map of
            {some, M} ->
                gleam@dict:insert(M, Dst, Weight);

            none ->
                maps:from_list([{Dst, Weight}])
        end end,
    In_update_fn = fun(Maybe_inner_map@1) -> case Maybe_inner_map@1 of
            {some, M@1} ->
                gleam@dict:insert(M@1, Src, Weight);

            none ->
                maps:from_list([{Src, Weight}])
        end end,
    New_out = gleam@dict:upsert(erlang:element(4, Graph), Src, Out_update_fn),
    New_in = gleam@dict:upsert(erlang:element(5, Graph), Dst, In_update_fn),
    {graph, erlang:element(2, Graph), erlang:element(3, Graph), New_out, New_in}.

-file("src/yog/model.gleam", 74).
?DOC(
    " Adds an edge to the graph with the given weight.\n"
    "\n"
    " For directed graphs, adds a single edge from `src` to `dst`.\n"
    " For undirected graphs, adds edges in both directions.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " graph\n"
    " |> model.add_edge(from: 1, to: 2, with: 10)\n"
    " ```\n"
).
-spec add_edge(graph(AMLQ, AMLR), integer(), integer(), AMLR) -> graph(AMLQ, AMLR).
add_edge(Graph, Src, Dst, Weight) ->
    Graph@1 = do_add_directed_edge(Graph, Src, Dst, Weight),
    case erlang:element(2, Graph@1) of
        directed ->
            Graph@1;

        undirected ->
            do_add_directed_edge(Graph@1, Dst, Src, Weight)
    end.

-file("src/yog/model.gleam", 190).
?DOC(
    " Removes a node and all its connected edges (incoming and outgoing).\n"
    "\n"
    " **Time Complexity:** O(deg(v)) - proportional to the number of edges\n"
    " connected to the node, not the whole graph.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"A\")\n"
    "   |> model.add_node(2, \"B\")\n"
    "   |> model.add_node(3, \"C\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 20)\n"
    "\n"
    " let graph = model.remove_node(graph, 2)\n"
    " // Node 2 is removed, along with edges 1->2 and 2->3\n"
    " ```\n"
).
-spec remove_node(graph(AMNF, AMNG), integer()) -> graph(AMNF, AMNG).
remove_node(Graph, Id) ->
    Targets = successors(Graph, Id),
    Sources = predecessors(Graph, Id),
    New_nodes = gleam@dict:delete(erlang:element(3, Graph), Id),
    New_out = gleam@dict:delete(erlang:element(4, Graph), Id),
    New_in_cleaned = gleam@list:fold(
        Targets,
        erlang:element(5, Graph),
        fun(Acc_in, Target) ->
            {Target_id, _} = Target,
            yog@internal@utils:dict_update_inner(
                Acc_in,
                Target_id,
                Id,
                fun gleam@dict:delete/2
            )
        end
    ),
    New_in = gleam@dict:delete(New_in_cleaned, Id),
    New_out_cleaned = gleam@list:fold(
        Sources,
        New_out,
        fun(Acc_out, Source) ->
            {Source_id, _} = Source,
            yog@internal@utils:dict_update_inner(
                Acc_out,
                Source_id,
                Id,
                fun gleam@dict:delete/2
            )
        end
    ),
    {graph, erlang:element(2, Graph), New_nodes, New_out_cleaned, New_in}.

-file("src/yog/model.gleam", 253).
-spec do_add_directed_combine(
    graph(AMNR, AMNS),
    integer(),
    integer(),
    AMNS,
    fun((AMNS, AMNS) -> AMNS)
) -> graph(AMNR, AMNS).
do_add_directed_combine(Graph, Src, Dst, Weight, With_combine) ->
    Update_fn = fun(Maybe_inner_map) -> case Maybe_inner_map of
            {some, M} ->
                New_weight = case gleam_stdlib:map_get(M, Dst) of
                    {ok, Existing} ->
                        With_combine(Existing, Weight);

                    {error, _} ->
                        Weight
                end,
                gleam@dict:insert(M, Dst, New_weight);

            none ->
                maps:from_list([{Dst, Weight}])
        end end,
    New_out = gleam@dict:upsert(erlang:element(4, Graph), Src, Update_fn),
    New_in = gleam@dict:upsert(
        erlang:element(5, Graph),
        Dst,
        fun(Maybe_m) -> case Maybe_m of
                {some, M@1} ->
                    New_weight@1 = case gleam_stdlib:map_get(M@1, Src) of
                        {ok, Existing@1} ->
                            With_combine(Existing@1, Weight);

                        {error, _} ->
                            Weight
                    end,
                    gleam@dict:insert(M@1, Src, New_weight@1);

                none ->
                    maps:from_list([{Src, Weight}])
            end end
    ),
    {graph, erlang:element(2, Graph), erlang:element(3, Graph), New_out, New_in}.

-file("src/yog/model.gleam", 238).
?DOC(
    " Adds an edge, but if an edge already exists between `src` and `dst`,\n"
    " it combines the new weight with the existing one using `with_combine`.\n"
    "\n"
    " The combine function receives `(existing_weight, new_weight)` and should\n"
    " return the combined weight.\n"
    "\n"
    " **Time Complexity:** O(1)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"A\")\n"
    "   |> model.add_node(2, \"B\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> model.add_edge_with_combine(from: 1, to: 2, with: 5, using: int.add)\n"
    " // Edge 1->2 now has weight 15 (10 + 5)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - **Edge contraction** in graph algorithms (Stoer-Wagner min-cut)\n"
    " - **Multi-graph support** (adding parallel edges with combined weights)\n"
    " - **Incremental graph building** (accumulating weights from multiple sources)\n"
).
-spec add_edge_with_combine(
    graph(AMNL, AMNM),
    integer(),
    integer(),
    AMNM,
    fun((AMNM, AMNM) -> AMNM)
) -> graph(AMNL, AMNM).
add_edge_with_combine(Graph, Src, Dst, Weight, With_combine) ->
    Graph@1 = do_add_directed_combine(Graph, Src, Dst, Weight, With_combine),
    case erlang:element(2, Graph@1) of
        directed ->
            Graph@1;

        undirected ->
            do_add_directed_combine(Graph@1, Dst, Src, Weight, With_combine)
    end.
