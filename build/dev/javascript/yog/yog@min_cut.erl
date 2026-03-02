-module(yog@min_cut).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/min_cut.gleam").
-export([global_min_cut/1]).
-export_type([min_cut/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type min_cut() :: {min_cut, integer(), integer(), integer()}.

-file("src/yog/min_cut.gleam", 186).
-spec get_next_mas_node(
    gleamy@pairing_heap:heap({integer(), integer()}),
    gleam@set:set(integer()),
    gleam@dict:dict(integer(), integer())
) -> {integer(), gleamy@pairing_heap:heap({integer(), integer()})}.
get_next_mas_node(Queue, Remaining, Weights) ->
    case gleamy@priority_queue:pop(Queue) of
        {ok, {{W, Node}, Q_rest}} ->
            case gleam@set:contains(Remaining, Node) of
                true ->
                    Current_weight = case gleam_stdlib:map_get(Weights, Node) of
                        {ok, V} ->
                            V;

                        {error, _} ->
                            0
                    end,
                    case W =:= Current_weight of
                        true ->
                            {Node, Q_rest};

                        false ->
                            get_next_mas_node(Q_rest, Remaining, Weights)
                    end;

                false ->
                    get_next_mas_node(Q_rest, Remaining, Weights)
            end;

        {error, _} ->
            Node@2 = case begin
                _pipe = gleam@set:to_list(Remaining),
                gleam@list:first(_pipe)
            end of
                {ok, Node@1} -> Node@1;
                _assert_fail ->
                    erlang:error(#{gleam_error => let_assert,
                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                file => <<?FILEPATH/utf8>>,
                                module => <<"yog/min_cut"/utf8>>,
                                function => <<"get_next_mas_node"/utf8>>,
                                line => 210,
                                value => _assert_fail,
                                start => 6237,
                                'end' => 6297,
                                pattern_start => 6248,
                                pattern_end => 6256})
            end,
            {Node@2, Queue}
    end.

-file("src/yog/min_cut.gleam", 141).
?DOC(" Builds the MAS ordering by greedily adding the most tightly connected node.\n").
-spec build_mas_order(
    yog@model:graph(integer(), integer()),
    list(integer()),
    gleam@set:set(integer()),
    gleam@dict:dict(integer(), integer()),
    gleamy@pairing_heap:heap({integer(), integer()})
) -> list(integer()).
build_mas_order(Graph, Current_order, Remaining, Weights, Queue) ->
    case gleam@set:size(Remaining) of
        0 ->
            Current_order;

        _ ->
            {Node, New_queue} = get_next_mas_node(Queue, Remaining, Weights),
            New_remaining = gleam@set:delete(Remaining, Node),
            {New_weights, Updated_queue} = begin
                _pipe = yog@model:neighbors(Graph, Node),
                gleam@list:fold(
                    _pipe,
                    {Weights, New_queue},
                    fun(Acc, Edge) ->
                        {Weights_acc, Queue_acc} = Acc,
                        {Neighbor, Weight} = Edge,
                        case gleam@set:contains(New_remaining, Neighbor) of
                            true ->
                                Existing_w = case gleam_stdlib:map_get(
                                    Weights_acc,
                                    Neighbor
                                ) of
                                    {ok, V} ->
                                        V;

                                    {error, _} ->
                                        0
                                end,
                                New_w = Existing_w + Weight,
                                {gleam@dict:insert(Weights_acc, Neighbor, New_w),
                                    gleamy@priority_queue:push(
                                        Queue_acc,
                                        {New_w, Neighbor}
                                    )};

                            false ->
                                Acc
                        end
                    end
                )
            end,
            build_mas_order(
                Graph,
                [Node | Current_order],
                New_remaining,
                New_weights,
                Updated_queue
            )
    end.

-file("src/yog/min_cut.gleam", 216).
-spec compare_max({integer(), integer()}, {integer(), integer()}) -> gleam@order:order().
compare_max(A, B) ->
    case gleam@int:compare(erlang:element(1, B), erlang:element(1, A)) of
        eq ->
            gleam@int:compare(erlang:element(2, A), erlang:element(2, B));

        Other ->
            Other
    end.

-file("src/yog/min_cut.gleam", 97).
?DOC(
    " Maximum Adjacency Search (MAS): finds the two most tightly connected nodes.\n"
    "\n"
    " Returns #(s, t, cut_weight) where:\n"
    " - s: second-to-last node added\n"
    " - t: last node added\n"
    " - cut_weight: sum of edge weights connecting t to the rest of the graph\n"
    "\n"
    " This is similar to Prim's algorithm but picks nodes by maximum total\n"
    " connection weight to the current set, not minimum edge weight.\n"
).
-spec maximum_adjacency_search(yog@model:graph(integer(), integer())) -> {integer(),
    integer(),
    integer()}.
maximum_adjacency_search(Graph) ->
    All_nodes = yog@model:all_nodes(Graph),
    Start@1 = case gleam@list:first(All_nodes) of
        {ok, Start} -> Start;
        _assert_fail ->
            erlang:error(#{gleam_error => let_assert,
                        message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                        file => <<?FILEPATH/utf8>>,
                        module => <<"yog/min_cut"/utf8>>,
                        function => <<"maximum_adjacency_search"/utf8>>,
                        line => 100,
                        value => _assert_fail,
                        start => 3025,
                        'end' => 3069,
                        pattern_start => 3036,
                        pattern_end => 3045})
    end,
    Initial_order = [Start@1],
    Remaining = begin
        _pipe = gleam@set:from_list(All_nodes),
        gleam@set:delete(_pipe, Start@1)
    end,
    {Initial_weights, Initial_queue} = begin
        _pipe@1 = yog@model:neighbors(Graph, Start@1),
        gleam@list:fold(
            _pipe@1,
            {maps:new(), gleamy@priority_queue:new(fun compare_max/2)},
            fun(Acc, Edge) ->
                {Weights_acc, Queue_acc} = Acc,
                {Neighbor, Weight} = Edge,
                case gleam@set:contains(Remaining, Neighbor) of
                    true ->
                        {gleam@dict:insert(Weights_acc, Neighbor, Weight),
                            gleamy@priority_queue:push(
                                Queue_acc,
                                {Weight, Neighbor}
                            )};

                    false ->
                        Acc
                end
            end
        )
    end,
    Final_order = build_mas_order(
        Graph,
        Initial_order,
        Remaining,
        Initial_weights,
        Initial_queue
    ),
    {T@1, S@1} = case Final_order of
        [T, S | _] -> {T, S};
        _assert_fail@1 ->
            erlang:error(#{gleam_error => let_assert,
                        message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                        file => <<?FILEPATH/utf8>>,
                        module => <<"yog/min_cut"/utf8>>,
                        function => <<"maximum_adjacency_search"/utf8>>,
                        line => 128,
                        value => _assert_fail@1,
                        start => 3839,
                        'end' => 3874,
                        pattern_start => 3850,
                        pattern_end => 3860})
    end,
    Cut_weight = begin
        _pipe@2 = yog@model:neighbors(Graph, T@1),
        gleam@list:fold(
            _pipe@2,
            0,
            fun(Sum, Edge@1) ->
                {_, Weight@1} = Edge@1,
                Sum + Weight@1
            end
        )
    end,
    {S@1, T@1, Cut_weight}.

-file("src/yog/min_cut.gleam", 51).
-spec do_min_cut(yog@model:graph(integer(), integer()), min_cut()) -> min_cut().
do_min_cut(Graph, Best) ->
    case yog@model:order(Graph) =< 1 of
        true ->
            Best;

        false ->
            {S, T, Cut_weight} = maximum_adjacency_search(Graph),
            T_size@1 = case gleam_stdlib:map_get(erlang:element(3, Graph), T) of
                {ok, T_size} -> T_size;
                _assert_fail ->
                    erlang:error(#{gleam_error => let_assert,
                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                file => <<?FILEPATH/utf8>>,
                                module => <<"yog/min_cut"/utf8>>,
                                function => <<"do_min_cut"/utf8>>,
                                line => 57,
                                value => _assert_fail,
                                start => 1769,
                                'end' => 1817,
                                pattern_start => 1780,
                                pattern_end => 1790})
            end,
            S_size@1 = case gleam_stdlib:map_get(erlang:element(3, Graph), S) of
                {ok, S_size} -> S_size;
                _assert_fail@1 ->
                    erlang:error(#{gleam_error => let_assert,
                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                file => <<?FILEPATH/utf8>>,
                                module => <<"yog/min_cut"/utf8>>,
                                function => <<"do_min_cut"/utf8>>,
                                line => 58,
                                value => _assert_fail@1,
                                start => 1824,
                                'end' => 1872,
                                pattern_start => 1835,
                                pattern_end => 1845})
            end,
            Total_nodes = gleam@list:fold(
                maps:values(erlang:element(3, Graph)),
                0,
                fun gleam@int:add/2
            ),
            Current_cut = {min_cut,
                Cut_weight,
                T_size@1,
                Total_nodes - T_size@1},
            Best@1 = case erlang:element(2, Current_cut) < erlang:element(
                2,
                Best
            ) of
                true ->
                    Current_cut;

                false ->
                    Best
            end,
            Next_graph = yog@transform:contract(
                Graph,
                S,
                T,
                fun gleam@int:add/2
            ),
            Next_graph@1 = yog@model:add_node(
                Next_graph,
                S,
                S_size@1 + T_size@1
            ),
            do_min_cut(Next_graph@1, Best@1)
    end.

-file("src/yog/min_cut.gleam", 41).
?DOC(
    " Finds the global minimum cut of an undirected weighted graph using the\n"
    " Stoer-Wagner algorithm.\n"
    "\n"
    " Returns the minimum cut weight and the sizes of the two partitions.\n"
    " Perfect for AoC 2023 Day 25, where you need to find the cut of weight 3\n"
    " and compute the product of partition sizes.\n"
    "\n"
    " **Time Complexity:** O(V³) or O(VE + V² log V) with a good priority queue\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_node(4, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 3, to: 4, with: 1)\n"
    "   |> yog.add_edge(from: 1, to: 4, with: 1)\n"
    "\n"
    " let result = min_cut.global_min_cut(in: graph)\n"
    " // result.weight == 2 (minimum cut)\n"
    " // result.group_a_size * result.group_b_size == product of partition sizes\n"
    " ```\n"
).
-spec global_min_cut(yog@model:graph(any(), integer())) -> min_cut().
global_min_cut(Graph) ->
    Graph@1 = yog@transform:map_nodes(Graph, fun(_) -> 1 end),
    do_min_cut(Graph@1, {min_cut, 999999999, 0, 0}).
