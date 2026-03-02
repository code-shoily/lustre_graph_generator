-module(yog@internal@examples@network_cable_layout).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/network_cable_layout.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/network_cable_layout.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    Buildings = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Building A"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Building B"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Building C"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 4, <<"Building D"/utf8>>),
        _pipe@5 = yog@model:add_edge(_pipe@4, 1, 2, 100),
        _pipe@6 = yog@model:add_edge(_pipe@5, 1, 3, 150),
        _pipe@7 = yog@model:add_edge(_pipe@6, 2, 3, 50),
        _pipe@8 = yog@model:add_edge(_pipe@7, 2, 4, 200),
        yog@model:add_edge(_pipe@8, 3, 4, 100)
    end,
    Cables = yog@mst:kruskal(Buildings, fun gleam@int:compare/2),
    Total_cost = gleam@list:fold(
        Cables,
        0,
        fun(Sum, Edge) -> Sum + erlang:element(4, Edge) end
    ),
    gleam_stdlib:println(
        <<"Minimum cable cost is "/utf8,
            (erlang:integer_to_binary(Total_cost))/binary>>
    ).
