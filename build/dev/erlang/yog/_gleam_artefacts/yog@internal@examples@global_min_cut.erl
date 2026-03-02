-module(yog@internal@examples@global_min_cut).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/global_min_cut.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/global_min_cut.gleam", 6).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"a"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"b"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"c"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 4, <<"d"/utf8>>),
        _pipe@5 = yog@model:add_node(_pipe@4, 5, <<"e"/utf8>>),
        _pipe@6 = yog@model:add_node(_pipe@5, 6, <<"f"/utf8>>),
        _pipe@7 = yog@model:add_node(_pipe@6, 7, <<"g"/utf8>>),
        _pipe@8 = yog@model:add_node(_pipe@7, 8, <<"h"/utf8>>),
        _pipe@9 = yog@model:add_edge(_pipe@8, 1, 2, 1),
        _pipe@10 = yog@model:add_edge(_pipe@9, 1, 5, 1),
        _pipe@11 = yog@model:add_edge(_pipe@10, 2, 5, 1),
        _pipe@12 = yog@model:add_edge(_pipe@11, 2, 6, 1),
        _pipe@13 = yog@model:add_edge(_pipe@12, 3, 4, 1),
        _pipe@14 = yog@model:add_edge(_pipe@13, 3, 7, 1),
        _pipe@15 = yog@model:add_edge(_pipe@14, 3, 8, 1),
        _pipe@16 = yog@model:add_edge(_pipe@15, 4, 7, 1),
        _pipe@17 = yog@model:add_edge(_pipe@16, 4, 8, 1),
        _pipe@18 = yog@model:add_edge(_pipe@17, 7, 8, 1),
        _pipe@19 = yog@model:add_edge(_pipe@18, 2, 3, 1),
        yog@model:add_edge(_pipe@19, 5, 3, 1)
    end,
    gleam_stdlib:println(<<"--- Global Minimum Cut ---"/utf8>>),
    Result = yog@min_cut:global_min_cut(Graph),
    gleam_stdlib:println(
        <<"Min cut weight: "/utf8,
            (erlang:integer_to_binary(erlang:element(2, Result)))/binary>>
    ),
    gleam_stdlib:println(
        <<"Group A size: "/utf8,
            (erlang:integer_to_binary(erlang:element(3, Result)))/binary>>
    ),
    gleam_stdlib:println(
        <<"Group B size: "/utf8,
            (erlang:integer_to_binary(erlang:element(4, Result)))/binary>>
    ),
    Answer = erlang:element(3, Result) * erlang:element(4, Result),
    gleam_stdlib:println(
        <<"Multiplied sizes (AoC style): "/utf8,
            (erlang:integer_to_binary(Answer))/binary>>
    ).
