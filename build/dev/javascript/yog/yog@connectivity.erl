-module(yog@connectivity).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/connectivity.gleam").
-export([analyze/1]).
-export_type([connectivity_results/0, internal_state/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type connectivity_results() :: {connectivity_results,
        list({integer(), integer()}),
        list(integer())}.

-type internal_state() :: {internal_state,
        gleam@dict:dict(integer(), integer()),
        gleam@dict:dict(integer(), integer()),
        integer(),
        list({integer(), integer()}),
        gleam@set:set(integer()),
        gleam@set:set(integer())}.

-file("src/yog/connectivity.gleam", 87).
-spec do_analyze(
    yog@model:graph(any(), any()),
    integer(),
    gleam@option:option(integer()),
    internal_state()
) -> internal_state().
do_analyze(Graph, V, Parent, State) ->
    Tin = gleam@dict:insert(
        erlang:element(2, State),
        V,
        erlang:element(4, State)
    ),
    Low = gleam@dict:insert(
        erlang:element(3, State),
        V,
        erlang:element(4, State)
    ),
    Visited = gleam@set:insert(erlang:element(7, State), V),
    Timer = erlang:element(4, State) + 1,
    State@1 = {internal_state,
        Tin,
        Low,
        Timer,
        erlang:element(5, State),
        erlang:element(6, State),
        Visited},
    Neighbors = yog@model:successor_ids(Graph, V),
    {Final_state, Children} = gleam@list:fold(
        Neighbors,
        {State@1, 0},
        fun(Acc, To) ->
            {Acc_state, Children_count} = Acc,
            case Parent of
                {some, Parent_id} when To =:= Parent_id ->
                    Acc;

                _ ->
                    case gleam@set:contains(erlang:element(7, Acc_state), To) of
                        true ->
                            V_low@1 = case gleam_stdlib:map_get(
                                erlang:element(3, Acc_state),
                                V
                            ) of
                                {ok, V_low} -> V_low;
                                _assert_fail ->
                                    erlang:error(#{gleam_error => let_assert,
                                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                                file => <<?FILEPATH/utf8>>,
                                                module => <<"yog/connectivity"/utf8>>,
                                                function => <<"do_analyze"/utf8>>,
                                                line => 109,
                                                value => _assert_fail,
                                                start => 3169,
                                                'end' => 3218,
                                                pattern_start => 3180,
                                                pattern_end => 3189})
                            end,
                            To_tin@1 = case gleam_stdlib:map_get(
                                erlang:element(2, Acc_state),
                                To
                            ) of
                                {ok, To_tin} -> To_tin;
                                _assert_fail@1 ->
                                    erlang:error(#{gleam_error => let_assert,
                                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                                file => <<?FILEPATH/utf8>>,
                                                module => <<"yog/connectivity"/utf8>>,
                                                function => <<"do_analyze"/utf8>>,
                                                line => 110,
                                                value => _assert_fail@1,
                                                start => 3233,
                                                'end' => 3284,
                                                pattern_start => 3244,
                                                pattern_end => 3254})
                            end,
                            New_low = gleam@int:min(V_low@1, To_tin@1),
                            {{internal_state,
                                    erlang:element(2, Acc_state),
                                    gleam@dict:insert(
                                        erlang:element(3, Acc_state),
                                        V,
                                        New_low
                                    ),
                                    erlang:element(4, Acc_state),
                                    erlang:element(5, Acc_state),
                                    erlang:element(6, Acc_state),
                                    erlang:element(7, Acc_state)},
                                Children_count};

                        false ->
                            Post_dfs_state = do_analyze(
                                Graph,
                                To,
                                {some, V},
                                Acc_state
                            ),
                            V_low@3 = case gleam_stdlib:map_get(
                                erlang:element(3, Post_dfs_state),
                                V
                            ) of
                                {ok, V_low@2} -> V_low@2;
                                _assert_fail@2 ->
                                    erlang:error(#{gleam_error => let_assert,
                                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                                file => <<?FILEPATH/utf8>>,
                                                module => <<"yog/connectivity"/utf8>>,
                                                function => <<"do_analyze"/utf8>>,
                                                line => 123,
                                                value => _assert_fail@2,
                                                start => 3674,
                                                'end' => 3728,
                                                pattern_start => 3685,
                                                pattern_end => 3694})
                            end,
                            To_low@1 = case gleam_stdlib:map_get(
                                erlang:element(3, Post_dfs_state),
                                To
                            ) of
                                {ok, To_low} -> To_low;
                                _assert_fail@3 ->
                                    erlang:error(#{gleam_error => let_assert,
                                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                                file => <<?FILEPATH/utf8>>,
                                                module => <<"yog/connectivity"/utf8>>,
                                                function => <<"do_analyze"/utf8>>,
                                                line => 124,
                                                value => _assert_fail@3,
                                                start => 3743,
                                                'end' => 3799,
                                                pattern_start => 3754,
                                                pattern_end => 3764})
                            end,
                            New_v_low = gleam@int:min(V_low@3, To_low@1),
                            V_tin@1 = case gleam_stdlib:map_get(
                                erlang:element(2, Post_dfs_state),
                                V
                            ) of
                                {ok, V_tin} -> V_tin;
                                _assert_fail@4 ->
                                    erlang:error(#{gleam_error => let_assert,
                                                message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                                file => <<?FILEPATH/utf8>>,
                                                module => <<"yog/connectivity"/utf8>>,
                                                function => <<"do_analyze"/utf8>>,
                                                line => 127,
                                                value => _assert_fail@4,
                                                start => 3868,
                                                'end' => 3922,
                                                pattern_start => 3879,
                                                pattern_end => 3888})
                            end,
                            New_bridges = case To_low@1 > V_tin@1 of
                                true ->
                                    Bridge = case V < To of
                                        true ->
                                            {V, To};

                                        false ->
                                            {To, V}
                                    end,
                                    [Bridge | erlang:element(5, Post_dfs_state)];

                                false ->
                                    erlang:element(5, Post_dfs_state)
                            end,
                            New_points = case {Parent, To_low@1 >= V_tin@1} of
                                {{some, _}, true} ->
                                    gleam@set:insert(
                                        erlang:element(6, Post_dfs_state),
                                        V
                                    );

                                {_, _} ->
                                    erlang:element(6, Post_dfs_state)
                            end,
                            {{internal_state,
                                    erlang:element(2, Post_dfs_state),
                                    gleam@dict:insert(
                                        erlang:element(3, Post_dfs_state),
                                        V,
                                        New_v_low
                                    ),
                                    erlang:element(4, Post_dfs_state),
                                    New_bridges,
                                    New_points,
                                    erlang:element(7, Post_dfs_state)},
                                Children_count + 1}
                    end
            end
        end
    ),
    case {Parent, Children > 1} of
        {none, true} ->
            {internal_state,
                erlang:element(2, Final_state),
                erlang:element(3, Final_state),
                erlang:element(4, Final_state),
                erlang:element(5, Final_state),
                gleam@set:insert(erlang:element(6, Final_state), V),
                erlang:element(7, Final_state)};

        {_, _} ->
            Final_state
    end.

-file("src/yog/connectivity.gleam", 50).
?DOC(
    " Analyzes an **undirected graph** to find all bridges and articulation points\n"
    " using Tarjan's algorithm in a single DFS pass.\n"
    "\n"
    " **Important:** This algorithm is designed for undirected graphs. For directed\n"
    " graphs, use strongly connected components analysis instead.\n"
    "\n"
    " **Bridges** are edges whose removal increases the number of connected components.\n"
    " **Articulation points** (cut vertices) are nodes whose removal increases the number\n"
    " of connected components.\n"
    "\n"
    " **Bridge ordering:** Bridges are returned as `#(lower_id, higher_id)` for consistency.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/connectivity\n"
    "\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: Nil)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: Nil)\n"
    "\n"
    " let results = connectivity.analyze(in: graph)\n"
    " // results.bridges == [#(1, 2), #(2, 3)]\n"
    " // results.articulation_points == [2]\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
).
-spec analyze(yog@model:graph(any(), any())) -> connectivity_results().
analyze(Graph) ->
    Nodes = maps:keys(erlang:element(3, Graph)),
    Initial_state = {internal_state,
        maps:new(),
        maps:new(),
        0,
        [],
        gleam@set:new(),
        gleam@set:new()},
    Final_state = gleam@list:fold(
        Nodes,
        Initial_state,
        fun(State, Node) ->
            case gleam@set:contains(erlang:element(7, State), Node) of
                true ->
                    State;

                false ->
                    do_analyze(Graph, Node, none, State)
            end
        end
    ),
    {connectivity_results,
        erlang:element(5, Final_state),
        gleam@set:to_list(erlang:element(6, Final_state))}.
