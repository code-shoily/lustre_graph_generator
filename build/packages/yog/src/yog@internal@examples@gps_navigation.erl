-module(yog@internal@examples@gps_navigation).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/gps_navigation.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/gps_navigation.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    Road_network = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Home"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Office"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Mall"/utf8>>),
        _pipe@4 = yog@model:add_edge(_pipe@3, 1, 2, 15),
        _pipe@5 = yog@model:add_edge(_pipe@4, 2, 3, 10),
        yog@model:add_edge(_pipe@5, 1, 3, 30)
    end,
    Straight_line_distance = fun(From, To) -> case From =:= To of
            true ->
                0;

            false ->
                5
        end end,
    case yog@pathfinding:a_star(
        Road_network,
        1,
        3,
        0,
        fun gleam@int:add/2,
        fun gleam@int:compare/2,
        Straight_line_distance
    ) of
        {some, Path} ->
            gleam_stdlib:println(
                <<<<"Fastest route takes "/utf8,
                        (erlang:integer_to_binary(erlang:element(3, Path)))/binary>>/binary,
                    " minutes"/utf8>>
            );

        none ->
            gleam_stdlib:println(<<"No route found"/utf8>>)
    end.
