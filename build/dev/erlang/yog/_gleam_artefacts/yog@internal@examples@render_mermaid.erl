-module(yog@internal@examples@render_mermaid).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/render_mermaid.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/render_mermaid.gleam", 9).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Home"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Gym"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Office"/utf8>>),
        _pipe@4 = yog@model:add_edge(_pipe@3, 1, 2, 10),
        _pipe@5 = yog@model:add_edge(_pipe@4, 2, 3, 5),
        yog@model:add_edge(_pipe@5, 1, 3, 20)
    end,
    gleam_stdlib:println(<<"--- Basic Mermaid Output ---"/utf8>>),
    Mermaid_basic = yog@render:to_mermaid(
        begin
            _pipe@6 = Graph,
            yog@transform:map_edges(_pipe@6, fun erlang:integer_to_binary/1)
        end,
        yog@render:default_options()
    ),
    gleam_stdlib:println(<<"```mermaid"/utf8>>),
    gleam_stdlib:println(Mermaid_basic),
    gleam_stdlib:println(<<"```"/utf8>>),
    gleam_stdlib:println(
        <<"\n--- Mermaid with Custom Labels & Highlighting ---"/utf8>>
    ),
    case yog@pathfinding:shortest_path(
        Graph,
        1,
        3,
        0,
        fun gleam@int:add/2,
        fun gleam@int:compare/2
    ) of
        {some, Path} ->
            Base_options = {mermaid_options,
                fun(Id, Data) ->
                    <<<<<<Data/binary, " (ID: "/utf8>>/binary,
                            (erlang:integer_to_binary(Id))/binary>>/binary,
                        ")"/utf8>>
                end,
                fun(Weight) -> <<Weight/binary, " km"/utf8>> end,
                none,
                none},
            Options = yog@render:path_to_options(Path, Base_options),
            Mermaid_custom = yog@render:to_mermaid(
                begin
                    _pipe@7 = Graph,
                    yog@transform:map_edges(
                        _pipe@7,
                        fun erlang:integer_to_binary/1
                    )
                end,
                Options
            ),
            gleam_stdlib:println(<<"```mermaid"/utf8>>),
            gleam_stdlib:println(Mermaid_custom),
            gleam_stdlib:println(<<"```"/utf8>>);

        none ->
            gleam_stdlib:println(<<"No path found"/utf8>>)
    end,
    gleam_stdlib:println(
        <<"\nTip: Paste the output into a GitHub markdown file or"/utf8>>
    ),
    gleam_stdlib:println(
        <<"the Mermaid Live Editor (https://mermaid.live/) to see it rendered."/utf8>>
    ).
