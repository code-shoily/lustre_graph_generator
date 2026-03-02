-module(yog@internal@examples@cave_path_counting).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/cave_path_counting.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/cave_path_counting.gleam", 37).
?DOC(false).
-spec count_paths(
    yog@model:graph(binary(), nil),
    integer(),
    gleam@set:set(binary()),
    boolean()
) -> integer().
count_paths(Graph, Current, Visited_small, Can_revisit_one) ->
    Cave_name@1 = case gleam_stdlib:map_get(erlang:element(3, Graph), Current) of
        {ok, Cave_name} -> Cave_name;
        _assert_fail ->
            erlang:error(#{gleam_error => let_assert,
                        message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                        file => <<?FILEPATH/utf8>>,
                        module => <<"yog/internal/examples/cave_path_counting"/utf8>>,
                        function => <<"count_paths"/utf8>>,
                        line => 43,
                        value => _assert_fail,
                        start => 1306,
                        'end' => 1363,
                        pattern_start => 1317,
                        pattern_end => 1330})
    end,
    case Cave_name@1 of
        <<"end"/utf8>> ->
            1;

        _ ->
            _pipe = yog@model:successors(Graph, Current),
            gleam@list:fold(
                _pipe,
                0,
                fun(Count, Neighbor) ->
                    {Neighbor_id, _} = Neighbor,
                    Neighbor_name@1 = case gleam_stdlib:map_get(
                        erlang:element(3, Graph),
                        Neighbor_id
                    ) of
                        {ok, Neighbor_name} -> Neighbor_name;
                        _assert_fail@1 ->
                            erlang:error(#{gleam_error => let_assert,
                                        message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                        file => <<?FILEPATH/utf8>>,
                                        module => <<"yog/internal/examples/cave_path_counting"/utf8>>,
                                        function => <<"count_paths"/utf8>>,
                                        line => 52,
                                        value => _assert_fail@1,
                                        start => 1571,
                                        'end' => 1636,
                                        pattern_start => 1582,
                                        pattern_end => 1599})
                    end,
                    Is_small = string:lowercase(Neighbor_name@1) =:= Neighbor_name@1,
                    Already_visited = gleam@set:contains(
                        Visited_small,
                        Neighbor_name@1
                    ),
                    case {Neighbor_name@1, Is_small, Already_visited} of
                        {<<"start"/utf8>>, _, _} ->
                            Count;

                        {_, false, _} ->
                            Count + count_paths(
                                Graph,
                                Neighbor_id,
                                Visited_small,
                                Can_revisit_one
                            );

                        {_, true, false} ->
                            New_visited = gleam@set:insert(
                                Visited_small,
                                Neighbor_name@1
                            ),
                            Count + count_paths(
                                Graph,
                                Neighbor_id,
                                New_visited,
                                Can_revisit_one
                            );

                        {_, true, true} when Can_revisit_one ->
                            Count + count_paths(
                                Graph,
                                Neighbor_id,
                                Visited_small,
                                false
                            );

                        {_, true, true} ->
                            Count
                    end
                end
            )
    end.

-file("src/yog/internal/examples/cave_path_counting.gleam", 9).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 0, <<"start"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 1, <<"A"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 2, <<"b"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 3, <<"c"/utf8>>),
        _pipe@5 = yog@model:add_node(_pipe@4, 4, <<"d"/utf8>>),
        _pipe@6 = yog@model:add_node(_pipe@5, 5, <<"end"/utf8>>),
        _pipe@7 = yog@model:add_edge(_pipe@6, 0, 1, nil),
        _pipe@8 = yog@model:add_edge(_pipe@7, 0, 2, nil),
        _pipe@9 = yog@model:add_edge(_pipe@8, 1, 3, nil),
        _pipe@10 = yog@model:add_edge(_pipe@9, 1, 2, nil),
        _pipe@11 = yog@model:add_edge(_pipe@10, 2, 4, nil),
        _pipe@12 = yog@model:add_edge(_pipe@11, 1, 5, nil),
        yog@model:add_edge(_pipe@12, 4, 5, nil)
    end,
    Paths = count_paths(Graph, 0, gleam@set:new(), false),
    gleam_stdlib:println(
        <<<<"Found "/utf8, (erlang:integer_to_binary(Paths))/binary>>/binary,
            " valid paths through the cave system"/utf8>>
    ).
