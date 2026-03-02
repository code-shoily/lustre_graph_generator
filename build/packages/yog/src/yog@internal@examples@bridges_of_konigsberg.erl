-module(yog@internal@examples@bridges_of_konigsberg).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/bridges_of_konigsberg.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/bridges_of_konigsberg.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(undirected),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Island A"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Bank B"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Bank C"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 4, <<"Island D"/utf8>>),
        _pipe@5 = yog@model:add_edge(_pipe@4, 1, 2, <<"b1"/utf8>>),
        _pipe@6 = yog@model:add_edge(_pipe@5, 1, 2, <<"b2"/utf8>>),
        _pipe@7 = yog@model:add_edge(_pipe@6, 1, 3, <<"b3"/utf8>>),
        _pipe@8 = yog@model:add_edge(_pipe@7, 1, 3, <<"b4"/utf8>>),
        _pipe@9 = yog@model:add_edge(_pipe@8, 1, 4, <<"b5"/utf8>>),
        _pipe@10 = yog@model:add_edge(_pipe@9, 2, 4, <<"b6"/utf8>>),
        yog@model:add_edge(_pipe@10, 3, 4, <<"b7"/utf8>>)
    end,
    gleam_stdlib:println(<<"--- Seven Bridges of Königsberg ---"/utf8>>),
    case yog@eulerian:has_eulerian_circuit(Graph) of
        true ->
            gleam_stdlib:println(<<"Eulerian circuit exists!"/utf8>>);

        false ->
            gleam_stdlib:println(<<"No Eulerian circuit exists."/utf8>>)
    end,
    case yog@eulerian:has_eulerian_path(Graph) of
        true ->
            gleam_stdlib:println(<<"Eulerian path exists!"/utf8>>),
            case yog@eulerian:find_eulerian_path(Graph) of
                {some, Path} ->
                    gleam_stdlib:println(
                        <<"Path: "/utf8, (gleam@string:inspect(Path))/binary>>
                    );

                none ->
                    nil
            end;

        false ->
            gleam_stdlib:println(<<"No Eulerian path exists either."/utf8>>)
    end,
    Circuit_graph = begin
        _pipe@11 = yog@model:new(undirected),
        _pipe@12 = yog@model:add_node(_pipe@11, 1, <<"A"/utf8>>),
        _pipe@13 = yog@model:add_node(_pipe@12, 2, <<"B"/utf8>>),
        _pipe@14 = yog@model:add_node(_pipe@13, 3, <<"C"/utf8>>),
        _pipe@15 = yog@model:add_edge(_pipe@14, 1, 2, nil),
        _pipe@16 = yog@model:add_edge(_pipe@15, 2, 3, nil),
        yog@model:add_edge(_pipe@16, 3, 1, nil)
    end,
    gleam_stdlib:println(<<"\n--- Simple Triangle ---"/utf8>>),
    case yog@eulerian:find_eulerian_circuit(Circuit_graph) of
        {some, Circuit} ->
            gleam_stdlib:println(
                <<"Circuit found: "/utf8,
                    (gleam@string:inspect(Circuit))/binary>>
            );

        none ->
            gleam_stdlib:println(<<"No circuit found"/utf8>>)
    end.
