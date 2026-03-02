-module(yog@eulerian).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/eulerian.gleam").
-export([has_eulerian_circuit/1, has_eulerian_path/1, find_eulerian_circuit/1, find_eulerian_path/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-file("src/yog/eulerian.gleam", 230).
-spec get_degree_undirected(yog@model:graph(any(), any()), integer()) -> integer().
get_degree_undirected(Graph, Node) ->
    case gleam_stdlib:map_get(erlang:element(4, Graph), Node) of
        {error, _} ->
            0;

        {ok, Neighbors} ->
            maps:size(Neighbors)
    end.

-file("src/yog/eulerian.gleam", 237).
-spec get_in_degree(yog@model:graph(any(), any()), integer()) -> integer().
get_in_degree(Graph, Node) ->
    case gleam_stdlib:map_get(erlang:element(5, Graph), Node) of
        {error, _} ->
            0;

        {ok, Neighbors} ->
            maps:size(Neighbors)
    end.

-file("src/yog/eulerian.gleam", 244).
-spec get_out_degree(yog@model:graph(any(), any()), integer()) -> integer().
get_out_degree(Graph, Node) ->
    case gleam_stdlib:map_get(erlang:element(4, Graph), Node) of
        {error, _} ->
            0;

        {ok, Neighbors} ->
            maps:size(Neighbors)
    end.

-file("src/yog/eulerian.gleam", 251).
-spec is_connected(yog@model:graph(any(), any())) -> boolean().
is_connected(Graph) ->
    case begin
        _pipe = maps:keys(erlang:element(3, Graph)),
        gleam@list:first(_pipe)
    end of
        {error, _} ->
            true;

        {ok, Start} ->
            Visited = yog@traversal:walk(Start, Graph, breadth_first),
            erlang:length(Visited) =:= maps:size(erlang:element(3, Graph))
    end.

-file("src/yog/eulerian.gleam", 155).
-spec check_eulerian_circuit_undirected(yog@model:graph(any(), any())) -> boolean().
check_eulerian_circuit_undirected(Graph) ->
    All_even = begin
        _pipe = maps:keys(erlang:element(3, Graph)),
        gleam@list:all(
            _pipe,
            fun(Node) ->
                Degree = get_degree_undirected(Graph, Node),
                (Degree rem 2) =:= 0
            end
        )
    end,
    case All_even of
        false ->
            false;

        true ->
            is_connected(Graph)
    end.

-file("src/yog/eulerian.gleam", 170).
-spec check_eulerian_path_undirected(yog@model:graph(any(), any())) -> boolean().
check_eulerian_path_undirected(Graph) ->
    Odd_count = begin
        _pipe = maps:keys(erlang:element(3, Graph)),
        _pipe@1 = gleam@list:filter(
            _pipe,
            fun(Node) ->
                Degree = get_degree_undirected(Graph, Node),
                (Degree rem 2) =:= 1
            end
        ),
        erlang:length(_pipe@1)
    end,
    case Odd_count of
        0 ->
            is_connected(Graph);

        2 ->
            is_connected(Graph);

        _ ->
            false
    end.

-file("src/yog/eulerian.gleam", 188).
-spec check_eulerian_circuit_directed(yog@model:graph(any(), any())) -> boolean().
check_eulerian_circuit_directed(Graph) ->
    All_balanced = begin
        _pipe = maps:keys(erlang:element(3, Graph)),
        gleam@list:all(
            _pipe,
            fun(Node) ->
                In_deg = get_in_degree(Graph, Node),
                Out_deg = get_out_degree(Graph, Node),
                In_deg =:= Out_deg
            end
        )
    end,
    All_balanced andalso is_connected(Graph).

-file("src/yog/eulerian.gleam", 28).
?DOC(
    " Checks if the graph has an Eulerian circuit (a cycle that visits every edge exactly once).\n"
    "\n"
    " ## Conditions\n"
    " - **Undirected graph:** All vertices must have even degree and the graph must be connected\n"
    " - **Directed graph:** All vertices must have equal in-degree and out-degree, and the graph must be strongly connected\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 3, to: 1, with: 1)\n"
    "\n"
    " has_eulerian_circuit(graph)  // => True (triangle)\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
).
-spec has_eulerian_circuit(yog@model:graph(any(), any())) -> boolean().
has_eulerian_circuit(Graph) ->
    case maps:size(erlang:element(3, Graph)) of
        0 ->
            false;

        _ ->
            case erlang:element(2, Graph) of
                undirected ->
                    check_eulerian_circuit_undirected(Graph);

                directed ->
                    check_eulerian_circuit_directed(Graph)
            end
    end.

-file("src/yog/eulerian.gleam", 201).
-spec check_eulerian_path_directed(yog@model:graph(any(), any())) -> boolean().
check_eulerian_path_directed(Graph) ->
    {Start_count, End_count, Balanced} = begin
        _pipe = maps:keys(erlang:element(3, Graph)),
        gleam@list:fold(
            _pipe,
            {0, 0, true},
            fun(Acc, Node) ->
                {Starts, Ends, Still_balanced} = Acc,
                In_deg = get_in_degree(Graph, Node),
                Out_deg = get_out_degree(Graph, Node),
                Diff = Out_deg - In_deg,
                case Diff of
                    1 ->
                        {Starts + 1, Ends, Still_balanced};

                    -1 ->
                        {Starts, Ends + 1, Still_balanced};

                    0 ->
                        Acc;

                    _ ->
                        {Starts, Ends, false}
                end
            end
        )
    end,
    case Balanced of
        false ->
            false;

        true ->
            case {Start_count, End_count} of
                {0, 0} ->
                    is_connected(Graph);

                {1, 1} ->
                    is_connected(Graph);

                {_, _} ->
                    false
            end
    end.

-file("src/yog/eulerian.gleam", 60).
?DOC(
    " Checks if the graph has an Eulerian path (a path that visits every edge exactly once).\n"
    "\n"
    " ## Conditions\n"
    " - **Undirected graph:** Exactly 0 or 2 vertices must have odd degree, and the graph must be connected\n"
    " - **Directed graph:** At most one vertex with (out-degree - in-degree = 1), at most one with (in-degree - out-degree = 1), all others balanced\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "\n"
    " has_eulerian_path(graph)  // => True (path from 1 to 3)\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
).
-spec has_eulerian_path(yog@model:graph(any(), any())) -> boolean().
has_eulerian_path(Graph) ->
    case maps:size(erlang:element(3, Graph)) of
        0 ->
            false;

        _ ->
            case erlang:element(2, Graph) of
                undirected ->
                    check_eulerian_path_undirected(Graph);

                directed ->
                    check_eulerian_path_directed(Graph)
            end
    end.

-file("src/yog/eulerian.gleam", 262).
-spec find_odd_degree_vertex(yog@model:graph(any(), any())) -> gleam@option:option(integer()).
find_odd_degree_vertex(Graph) ->
    _pipe = maps:keys(erlang:element(3, Graph)),
    _pipe@1 = gleam@list:find(
        _pipe,
        fun(Node) ->
            Degree = get_degree_undirected(Graph, Node),
            (Degree rem 2) =:= 1
        end
    ),
    _pipe@2 = gleam@option:from_result(_pipe@1),
    gleam@option:'or'(
        _pipe@2,
        begin
            _pipe@3 = maps:keys(erlang:element(3, Graph)),
            _pipe@4 = gleam@list:find(
                _pipe@3,
                fun(Node@1) -> get_degree_undirected(Graph, Node@1) > 0 end
            ),
            gleam@option:from_result(_pipe@4)
        end
    ).

-file("src/yog/eulerian.gleam", 277).
-spec find_unbalanced_vertex(yog@model:graph(any(), any())) -> gleam@option:option(integer()).
find_unbalanced_vertex(Graph) ->
    _pipe = maps:keys(erlang:element(3, Graph)),
    _pipe@1 = gleam@list:find(
        _pipe,
        fun(Node) ->
            In_deg = get_in_degree(Graph, Node),
            Out_deg = get_out_degree(Graph, Node),
            Out_deg > In_deg
        end
    ),
    _pipe@2 = gleam@option:from_result(_pipe@1),
    gleam@option:'or'(
        _pipe@2,
        begin
            _pipe@3 = maps:keys(erlang:element(3, Graph)),
            _pipe@4 = gleam@list:find(
                _pipe@3,
                fun(Node@1) -> get_out_degree(Graph, Node@1) > 0 end
            ),
            gleam@option:from_result(_pipe@4)
        end
    ).

-file("src/yog/eulerian.gleam", 333).
-spec find_and_remove_edge_helper(
    yog@model:graph(any(), any()),
    integer(),
    list({integer(), integer()}),
    list({integer(), integer()})
) -> gleam@option:option({integer(), list({integer(), integer()})}).
find_and_remove_edge_helper(Graph, From, Edges, Checked) ->
    case Edges of
        [] ->
            none;

        [{F, T} | Rest] when F =:= From ->
            Remaining = case erlang:element(2, Graph) of
                directed ->
                    lists:append(Checked, Rest);

                undirected ->
                    _pipe = lists:append(Checked, Rest),
                    gleam@list:filter(
                        _pipe,
                        fun(Edge) ->
                            {A, B} = Edge,
                            (A /= T) orelse (B /= F)
                        end
                    )
            end,
            {some, {T, Remaining}};

        [Edge@1 | Rest@1] ->
            find_and_remove_edge_helper(Graph, From, Rest@1, [Edge@1 | Checked])
    end.

-file("src/yog/eulerian.gleam", 325).
-spec find_and_remove_edge(
    yog@model:graph(any(), any()),
    integer(),
    list({integer(), integer()})
) -> gleam@option:option({integer(), list({integer(), integer()})}).
find_and_remove_edge(Graph, From, Edges) ->
    find_and_remove_edge_helper(Graph, From, Edges, []).

-file("src/yog/eulerian.gleam", 301).
-spec do_hierholzer(
    yog@model:graph(any(), any()),
    integer(),
    list({integer(), integer()}),
    list(integer())
) -> {list({integer(), integer()}), list(integer())}.
do_hierholzer(Graph, Current, Available_edges, Path) ->
    case find_and_remove_edge(Graph, Current, Available_edges) of
        none ->
            {Available_edges, [Current | Path]};

        {some, {Next, Remaining_edges}} ->
            _pipe = do_hierholzer(Graph, Next, Remaining_edges, Path),
            (fun(Result) ->
                {Edges_left, Built_path} = Result,
                {Edges_left, [Current | Built_path]}
            end)(_pipe)
    end.

-file("src/yog/eulerian.gleam", 363).
-spec build_edge_list(yog@model:graph(any(), any())) -> list({integer(),
    integer()}).
build_edge_list(Graph) ->
    gleam@dict:fold(
        erlang:element(4, Graph),
        [],
        fun(Acc, From, Neighbors) ->
            Edges_from_node = begin
                _pipe = maps:keys(Neighbors),
                gleam@list:map(_pipe, fun(To) -> {From, To} end)
            end,
            lists:append(Acc, Edges_from_node)
        end
    ).

-file("src/yog/eulerian.gleam", 295).
-spec hierholzer(yog@model:graph(any(), any()), integer()) -> list(integer()).
hierholzer(Graph, Start) ->
    All_edges = build_edge_list(Graph),
    {_, Path} = do_hierholzer(Graph, Start, All_edges, []),
    Path.

-file("src/yog/eulerian.gleam", 92).
?DOC(
    " Finds an Eulerian circuit in the graph using Hierholzer's algorithm.\n"
    "\n"
    " Returns the path as a list of node IDs that form a circuit (starts and ends at the same node).\n"
    " Returns None if no Eulerian circuit exists.\n"
    "\n"
    " **Time Complexity:** O(E)\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 3, to: 1, with: 1)\n"
    "\n"
    " find_eulerian_circuit(graph)  // => Some([1, 2, 3, 1])\n"
    " ```\n"
).
-spec find_eulerian_circuit(yog@model:graph(any(), any())) -> gleam@option:option(list(integer())).
find_eulerian_circuit(Graph) ->
    case has_eulerian_circuit(Graph) of
        false ->
            none;

        true ->
            case begin
                _pipe = maps:keys(erlang:element(3, Graph)),
                gleam@list:first(_pipe)
            end of
                {error, _} ->
                    none;

                {ok, Start} ->
                    Result = hierholzer(Graph, Start),
                    case gleam@list:is_empty(Result) of
                        true ->
                            none;

                        false ->
                            {some, Result}
                    end
            end
    end.

-file("src/yog/eulerian.gleam", 129).
?DOC(
    " Finds an Eulerian path in the graph using Hierholzer's algorithm.\n"
    "\n"
    " Returns the path as a list of node IDs. Returns None if no Eulerian path exists.\n"
    "\n"
    " **Time Complexity:** O(E)\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "\n"
    " find_eulerian_path(graph)  // => Some([1, 2, 3])\n"
    " ```\n"
).
-spec find_eulerian_path(yog@model:graph(any(), any())) -> gleam@option:option(list(integer())).
find_eulerian_path(Graph) ->
    case has_eulerian_path(Graph) of
        false ->
            none;

        true ->
            Start = case erlang:element(2, Graph) of
                undirected ->
                    find_odd_degree_vertex(Graph);

                directed ->
                    find_unbalanced_vertex(Graph)
            end,
            case Start of
                none ->
                    none;

                {some, Start_node} ->
                    Result = hierholzer(Graph, Start_node),
                    case gleam@list:is_empty(Result) of
                        true ->
                            none;

                        false ->
                            {some, Result}
                    end
            end
    end.
