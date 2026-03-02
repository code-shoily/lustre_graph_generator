-module(yog@topological_sort).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/topological_sort.gleam").
-export([lexicographical_topological_sort/2, topological_sort/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-file("src/yog/topological_sort.gleam", 113).
-spec do_lexical_kahn(
    yog@model:graph(any(), any()),
    gleamy@pairing_heap:heap(integer()),
    gleam@dict:dict(integer(), integer()),
    list(integer()),
    integer()
) -> {ok, list(integer())} | {error, nil}.
do_lexical_kahn(Graph, Q, In_degrees, Acc, Total_count) ->
    case gleamy@priority_queue:pop(Q) of
        {error, nil} ->
            case erlang:length(Acc) =:= Total_count of
                true ->
                    {ok, lists:reverse(Acc)};

                false ->
                    {error, nil}
            end;

        {ok, {Head, Rest_q}} ->
            Neighbors = yog@model:successor_ids(Graph, Head),
            {Next_q, Next_in_degrees} = gleam@list:fold(
                Neighbors,
                {Rest_q, In_degrees},
                fun(State, Neighbor) ->
                    {Current_q, Degrees} = State,
                    Current_degree = begin
                        _pipe = gleam_stdlib:map_get(Degrees, Neighbor),
                        gleam@result:unwrap(_pipe, 0)
                    end,
                    New_degree = Current_degree - 1,
                    New_degrees = gleam@dict:insert(
                        Degrees,
                        Neighbor,
                        New_degree
                    ),
                    Updated_q = case New_degree =:= 0 of
                        true ->
                            gleamy@priority_queue:push(Current_q, Neighbor);

                        false ->
                            Current_q
                    end,
                    {Updated_q, New_degrees}
                end
            ),
            do_lexical_kahn(
                Graph,
                Next_q,
                Next_in_degrees,
                [Head | Acc],
                Total_count
            )
    end.

-file("src/yog/topological_sort.gleam", 73).
?DOC(
    " Performs a topological sort that returns the lexicographically smallest sequence.\n"
    "\n"
    " Uses a heap-based version of Kahn's algorithm to ensure that when multiple\n"
    " nodes have in-degree 0, the smallest one (according to `compare_nodes`) is chosen first.\n"
    "\n"
    " The comparison function operates on **node data**, not node IDs, allowing intuitive\n"
    " comparisons like `string.compare` for alphabetical ordering.\n"
    "\n"
    " Returns `Error(Nil)` if the graph contains a cycle.\n"
    "\n"
    " **Time Complexity:** O(V log V + E) due to heap operations\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Get alphabetical ordering by node data\n"
    " topological_sort.lexicographical_topological_sort(graph, string.compare)\n"
    " // => Ok([0, 1, 2])  // Node IDs ordered by their string data\n"
    "\n"
    " // Custom comparison by priority\n"
    " topological_sort.lexicographical_topological_sort(graph, fn(a, b) {\n"
    "   int.compare(a.priority, b.priority)\n"
    " })\n"
    " ```\n"
).
-spec lexicographical_topological_sort(
    yog@model:graph(AUIO, any()),
    fun((AUIO, AUIO) -> gleam@order:order())
) -> {ok, list(integer())} | {error, nil}.
lexicographical_topological_sort(Graph, Compare_nodes) ->
    All_nodes = yog@model:all_nodes(Graph),
    In_degrees = begin
        _pipe = All_nodes,
        _pipe@3 = gleam@list:map(
            _pipe,
            fun(Id) ->
                Degree = begin
                    _pipe@1 = gleam_stdlib:map_get(erlang:element(5, Graph), Id),
                    _pipe@2 = gleam@result:map(_pipe@1, fun maps:size/1),
                    gleam@result:unwrap(_pipe@2, 0)
                end,
                {Id, Degree}
            end
        ),
        maps:from_list(_pipe@3)
    end,
    Compare_by_data = fun(Id_a, Id_b) ->
        case {gleam_stdlib:map_get(erlang:element(3, Graph), Id_a),
            gleam_stdlib:map_get(erlang:element(3, Graph), Id_b)} of
            {{ok, Data_a}, {ok, Data_b}} ->
                Compare_nodes(Data_a, Data_b);

            {_, _} ->
                eq
        end
    end,
    Initial_queue = begin
        _pipe@4 = maps:to_list(In_degrees),
        _pipe@5 = gleam@list:filter(
            _pipe@4,
            fun(Pair) -> erlang:element(2, Pair) =:= 0 end
        ),
        _pipe@6 = gleam@list:map(
            _pipe@5,
            fun(Pair@1) -> erlang:element(1, Pair@1) end
        ),
        gleam@list:fold(
            _pipe@6,
            gleamy@priority_queue:new(Compare_by_data),
            fun(Q, Id@1) -> gleamy@priority_queue:push(Q, Id@1) end
        )
    end,
    do_lexical_kahn(
        Graph,
        Initial_queue,
        In_degrees,
        [],
        erlang:length(All_nodes)
    ).

-file("src/yog/topological_sort.gleam", 149).
-spec do_kahn(
    yog@model:graph(any(), any()),
    list(integer()),
    gleam@dict:dict(integer(), integer()),
    list(integer()),
    integer()
) -> {ok, list(integer())} | {error, nil}.
do_kahn(Graph, Queue, In_degrees, Acc, Total_node_count) ->
    case Queue of
        [] ->
            case erlang:length(Acc) =:= Total_node_count of
                true ->
                    {ok, lists:reverse(Acc)};

                false ->
                    {error, nil}
            end;

        [Head | Tail] ->
            Neighbors = yog@model:successor_ids(Graph, Head),
            {Next_queue, Next_in_degrees} = gleam@list:fold(
                Neighbors,
                {Tail, In_degrees},
                fun(State, Neighbor) ->
                    {Q, Degrees} = State,
                    Current_degree = begin
                        _pipe = gleam_stdlib:map_get(Degrees, Neighbor),
                        gleam@result:unwrap(_pipe, 0)
                    end,
                    New_degree = Current_degree - 1,
                    New_degrees = gleam@dict:insert(
                        Degrees,
                        Neighbor,
                        New_degree
                    ),
                    New_q = case New_degree =:= 0 of
                        true ->
                            [Neighbor | Q];

                        false ->
                            Q
                    end,
                    {New_q, New_degrees}
                end
            ),
            do_kahn(
                Graph,
                Next_queue,
                Next_in_degrees,
                [Head | Acc],
                Total_node_count
            )
    end.

-file("src/yog/topological_sort.gleam", 24).
?DOC(
    " Performs a topological sort on a directed graph using Kahn's algorithm.\n"
    "\n"
    " Returns a linear ordering of nodes such that for every directed edge (u, v),\n"
    " node u comes before node v in the ordering.\n"
    "\n"
    " Returns `Error(Nil)` if the graph contains a cycle.\n"
    "\n"
    " **Time Complexity:** O(V + E) where V is vertices and E is edges\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " topological_sort.topological_sort(graph)\n"
    " // => Ok([1, 2, 3, 4])  // Valid ordering\n"
    " // or Error(Nil)         // Cycle detected\n"
    " ```\n"
).
-spec topological_sort(yog@model:graph(any(), any())) -> {ok, list(integer())} |
    {error, nil}.
topological_sort(Graph) ->
    All_nodes = yog@model:all_nodes(Graph),
    In_degrees = begin
        _pipe = All_nodes,
        _pipe@3 = gleam@list:map(
            _pipe,
            fun(Id) ->
                Degree = begin
                    _pipe@1 = gleam_stdlib:map_get(erlang:element(5, Graph), Id),
                    _pipe@2 = gleam@result:map(_pipe@1, fun maps:size/1),
                    gleam@result:unwrap(_pipe@2, 0)
                end,
                {Id, Degree}
            end
        ),
        maps:from_list(_pipe@3)
    end,
    Queue = begin
        _pipe@4 = maps:to_list(In_degrees),
        _pipe@5 = gleam@list:filter(
            _pipe@4,
            fun(Pair) -> erlang:element(2, Pair) =:= 0 end
        ),
        gleam@list:map(_pipe@5, fun(Pair@1) -> erlang:element(1, Pair@1) end)
    end,
    do_kahn(Graph, Queue, In_degrees, [], erlang:length(All_nodes)).
