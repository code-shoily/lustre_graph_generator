-module(yog@internal@examples@render_dot).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/render_dot.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/render_dot.gleam", 9).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(directed),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Start"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Middle"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"End"/utf8>>),
        _pipe@4 = yog@model:add_edge(_pipe@3, 1, 2, 5),
        _pipe@5 = yog@model:add_edge(_pipe@4, 2, 3, 3),
        yog@model:add_edge(_pipe@5, 1, 3, 10)
    end,
    gleam_stdlib:println(<<"--- Basic DOT Output ---"/utf8>>),
    Dot_basic = yog@render:to_dot(
        begin
            _pipe@6 = Graph,
            yog@transform:map_edges(_pipe@6, fun erlang:integer_to_binary/1)
        end,
        yog@render:default_dot_options()
    ),
    gleam_stdlib:println(Dot_basic),
    gleam_stdlib:println(<<"\n--- DOT with Highlighted Path ---"/utf8>>),
    case yog@pathfinding:shortest_path(
        Graph,
        1,
        3,
        0,
        fun gleam@int:add/2,
        fun gleam@int:compare/2
    ) of
        {some, Path} ->
            Options = yog@render:path_to_dot_options(
                Path,
                yog@render:default_dot_options()
            ),
            Dot_highlighted = yog@render:to_dot(
                begin
                    _pipe@7 = Graph,
                    yog@transform:map_edges(
                        _pipe@7,
                        fun erlang:integer_to_binary/1
                    )
                end,
                Options
            ),
            gleam_stdlib:println(Dot_highlighted);

        none ->
            gleam_stdlib:println(<<"No path found"/utf8>>)
    end,
    gleam_stdlib:println(
        <<"\nTip: You can render this by piping to Graphviz:"/utf8>>
    ),
    gleam_stdlib:println(
        <<"gleam run -m examples/render_dot | dot -Tpng -o graph.png"/utf8>>
    ).
