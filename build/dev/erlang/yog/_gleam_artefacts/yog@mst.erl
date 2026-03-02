-module(yog@mst).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/mst.gleam").
-export([kruskal/2, prim/2]).
-export_type([edge/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type edge(ATQC) :: {edge, integer(), integer(), ATQC}.

-file("src/yog/mst.gleam", 55).
-spec do_kruskal(
    list(edge(ATQJ)),
    yog@disjoint_set:disjoint_set(integer()),
    list(edge(ATQJ))
) -> list(edge(ATQJ)).
do_kruskal(Edges, Disjoint_set_state, Acc) ->
    case Edges of
        [] ->
            lists:reverse(Acc);

        [Edge | Rest] ->
            {Disjoint_set1, Root_from} = yog@disjoint_set:find(
                Disjoint_set_state,
                erlang:element(2, Edge)
            ),
            {Disjoint_set2, Root_to} = yog@disjoint_set:find(
                Disjoint_set1,
                erlang:element(3, Edge)
            ),
            case Root_from =:= Root_to of
                true ->
                    do_kruskal(Rest, Disjoint_set2, Acc);

                false ->
                    Next_disjoint_set = yog@disjoint_set:union(
                        Disjoint_set2,
                        erlang:element(2, Edge),
                        erlang:element(3, Edge)
                    ),
                    do_kruskal(Rest, Next_disjoint_set, [Edge | Acc])
            end
    end.

-file("src/yog/mst.gleam", 27).
?DOC(
    " Finds the Minimum Spanning Tree (MST) using Kruskal's algorithm.\n"
    "\n"
    " Returns a list of edges that form the MST. The total weight of these edges\n"
    " is minimized while ensuring all nodes are connected.\n"
    "\n"
    " **Time Complexity:** O(E log E) where E is the number of edges\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let mst_edges = mst.kruskal(in: graph, with_compare: int.compare)\n"
    " // => [Edge(1, 2, 5), Edge(2, 3, 3), ...]\n"
    " ```\n"
).
-spec kruskal(
    yog@model:graph(any(), ATQE),
    fun((ATQE, ATQE) -> gleam@order:order())
) -> list(edge(ATQE)).
kruskal(Graph, Compare) ->
    Node_ids = maps:keys(erlang:element(3, Graph)),
    Edges = begin
        _pipe = gleam@dict:fold(
            erlang:element(4, Graph),
            [],
            fun(Acc, From_id, Targets) ->
                Inner_edges = gleam@dict:fold(
                    Targets,
                    [],
                    fun(Inner_acc, To_id, Weight) ->
                        case (erlang:element(2, Graph) =:= undirected) andalso (From_id
                        > To_id) of
                            true ->
                                Inner_acc;

                            false ->
                                [{edge, From_id, To_id, Weight} | Inner_acc]
                        end
                    end
                ),
                lists:append([Inner_edges, Acc])
            end
        ),
        gleam@list:sort(
            _pipe,
            fun(A, B) -> Compare(erlang:element(4, A), erlang:element(4, B)) end
        )
    end,
    Initial_disjoint_set = gleam@list:fold(
        Node_ids,
        yog@disjoint_set:new(),
        fun yog@disjoint_set:add/2
    ),
    do_kruskal(Edges, Initial_disjoint_set, []).

-file("src/yog/mst.gleam", 157).
-spec get_edges_from_node(yog@model:graph(any(), ATRI), integer()) -> list(edge(ATRI)).
get_edges_from_node(Graph, From) ->
    case gleam_stdlib:map_get(erlang:element(4, Graph), From) of
        {ok, Targets} ->
            gleam@dict:fold(
                Targets,
                [],
                fun(Acc, To_id, Weight) ->
                    case (erlang:element(2, Graph) =:= undirected) andalso (From
                    > To_id) of
                        true ->
                            Acc;

                        false ->
                            [{edge, From, To_id, Weight} | Acc]
                    end
                end
            );

        {error, nil} ->
            []
    end.

-file("src/yog/mst.gleam", 122).
-spec do_prim(
    yog@model:graph(any(), ATQX),
    gleamy@pairing_heap:heap(edge(ATQX)),
    gleam@set:set(integer()),
    list(edge(ATQX))
) -> list(edge(ATQX)).
do_prim(Graph, Pq, Visited, Acc) ->
    case gleamy@priority_queue:pop(Pq) of
        {error, nil} ->
            lists:reverse(Acc);

        {ok, {Edge, Rest_pq}} ->
            case gleam@set:contains(Visited, erlang:element(3, Edge)) of
                true ->
                    do_prim(Graph, Rest_pq, Visited, Acc);

                false ->
                    New_visited = gleam@set:insert(
                        Visited,
                        erlang:element(3, Edge)
                    ),
                    New_acc = [Edge | Acc],
                    New_edges = get_edges_from_node(
                        Graph,
                        erlang:element(3, Edge)
                    ),
                    Filtered_edges = gleam@list:filter(
                        New_edges,
                        fun(E) ->
                            not gleam@set:contains(
                                New_visited,
                                erlang:element(3, E)
                            )
                        end
                    ),
                    New_pq = gleam@list:fold(
                        Filtered_edges,
                        Rest_pq,
                        fun(Pq@1, E@1) ->
                            gleamy@priority_queue:push(Pq@1, E@1)
                        end
                    ),
                    do_prim(Graph, New_pq, New_visited, New_acc)
            end
    end.

-file("src/yog/mst.gleam", 93).
?DOC(
    " Finds the Minimum Spanning Tree (MST) using Prim's algorithm.\n"
    "\n"
    " Returns a list of edges that form the MST. Unlike Kruskal's which processes\n"
    " all edges globally, Prim's grows the MST from a starting node by repeatedly\n"
    " adding the minimum-weight edge that connects a visited node to an unvisited node.\n"
    "\n"
    " **Time Complexity:** O(E log V) where E is the number of edges and V is the number of vertices\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let mst_edges = mst.prim(in: graph, with_compare: int.compare)\n"
    " // => [Edge(1, 2, 5), Edge(2, 3, 3), ...]\n"
    " ```\n"
).
-spec prim(
    yog@model:graph(any(), ATQR),
    fun((ATQR, ATQR) -> gleam@order:order())
) -> list(edge(ATQR)).
prim(Graph, Compare) ->
    Node_ids = maps:keys(erlang:element(3, Graph)),
    case Node_ids of
        [] ->
            [];

        [Start | _] ->
            Edge_compare = fun(A, B) ->
                Compare(erlang:element(4, A), erlang:element(4, B))
            end,
            Initial_pq = gleamy@priority_queue:new(Edge_compare),
            Initial_visited = gleam@set:from_list([Start]),
            Initial_edges = get_edges_from_node(Graph, Start),
            Pq_with_initial_edges = gleam@list:fold(
                Initial_edges,
                Initial_pq,
                fun(Pq, Edge) -> gleamy@priority_queue:push(Pq, Edge) end
            ),
            do_prim(Graph, Pq_with_initial_edges, Initial_visited, [])
    end.
