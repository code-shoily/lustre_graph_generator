-module(yog@internal@examples@job_assignment).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/job_assignment.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/job_assignment.gleam", 8).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Alice"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Bob"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Charlie"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 4, <<"Programming"/utf8>>),
        _pipe@5 = yog@model:add_node(_pipe@4, 5, <<"Design"/utf8>>),
        _pipe@6 = yog@model:add_node(_pipe@5, 6, <<"Testing"/utf8>>),
        _pipe@7 = yog@model:add_edge(_pipe@6, 1, 4, nil),
        _pipe@8 = yog@model:add_edge(_pipe@7, 1, 5, nil),
        _pipe@9 = yog@model:add_edge(_pipe@8, 2, 4, nil),
        _pipe@10 = yog@model:add_edge(_pipe@9, 3, 5, nil),
        yog@model:add_edge(_pipe@10, 3, 6, nil)
    end,
    gleam_stdlib:println(<<"--- Bipartite Job Assignment ---"/utf8>>),
    case yog@bipartite:partition(Graph) of
        {some, Partition} ->
            Matching = yog@bipartite:maximum_matching(Graph, Partition),
            gleam_stdlib:println(
                <<"Maximum assignments found: "/utf8,
                    (erlang:integer_to_binary(erlang:length(Matching)))/binary>>
            ),
            gleam@list:each(
                Matching,
                fun(Pair) ->
                    {Worker_id, Task_id} = Pair,
                    gleam_stdlib:println(
                        <<<<<<"Worker "/utf8,
                                    (erlang:integer_to_binary(Worker_id))/binary>>/binary,
                                " -> Task "/utf8>>/binary,
                            (erlang:integer_to_binary(Task_id))/binary>>
                    )
                end
            );

        none ->
            gleam_stdlib:println(<<"This graph is not bipartite!"/utf8>>)
    end.
