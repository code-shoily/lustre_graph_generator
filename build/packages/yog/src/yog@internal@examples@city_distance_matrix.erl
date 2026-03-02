-module(yog@internal@examples@city_distance_matrix).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/city_distance_matrix.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/city_distance_matrix.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(directed),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"City A"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"City B"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"City C"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 4, <<"City D"/utf8>>),
        _pipe@5 = yog@model:add_edge(_pipe@4, 1, 2, 3),
        _pipe@6 = yog@model:add_edge(_pipe@5, 2, 1, 8),
        _pipe@7 = yog@model:add_edge(_pipe@6, 1, 4, 7),
        _pipe@8 = yog@model:add_edge(_pipe@7, 4, 1, 2),
        _pipe@9 = yog@model:add_edge(_pipe@8, 2, 3, 2),
        _pipe@10 = yog@model:add_edge(_pipe@9, 3, 1, 5),
        yog@model:add_edge(_pipe@10, 3, 4, 1)
    end,
    gleam_stdlib:println(
        <<"--- All-Pairs Shortest Paths (Floyd-Warshall) ---"/utf8>>
    ),
    case yog@pathfinding:floyd_warshall(
        Graph,
        0,
        fun gleam@int:add/2,
        fun gleam@int:compare/2
    ) of
        {ok, Matrix} ->
            gleam@dict:each(
                Matrix,
                fun(Key, Weight) ->
                    {From, To} = Key,
                    gleam_stdlib:println(
                        <<<<<<<<<<"From "/utf8,
                                            (erlang:integer_to_binary(From))/binary>>/binary,
                                        " to "/utf8>>/binary,
                                    (erlang:integer_to_binary(To))/binary>>/binary,
                                ": "/utf8>>/binary,
                            (erlang:integer_to_binary(Weight))/binary>>
                    )
                end
            );

        {error, _} ->
            gleam_stdlib:println(<<"Negative cycle detected!"/utf8>>)
    end.
