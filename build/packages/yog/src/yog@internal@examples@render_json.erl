-module(yog@internal@examples@render_json).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/render_json.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/render_json.gleam", 6).
?DOC(false).
-spec main() -> nil.
main() ->
    Graph = begin
        _pipe = yog@model:new(directed),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Node A"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Node B"/utf8>>),
        yog@model:add_edge(_pipe@2, 1, 2, <<"connects"/utf8>>)
    end,
    gleam_stdlib:println(<<"--- Basic JSON Output ---"/utf8>>),
    Json_basic = yog@render:to_json(Graph, yog@render:default_json_options()),
    gleam_stdlib:println(Json_basic),
    gleam_stdlib:println(<<"\n--- Custom JSON Output ---"/utf8>>),
    Options = {json_options,
        fun(Id, Data) ->
            gleam@json:object(
                [{<<"id"/utf8>>, gleam@json:int(Id)},
                    {<<"label"/utf8>>, gleam@json:string(Data)},
                    {<<"type"/utf8>>, gleam@json:string(<<"user"/utf8>>)}]
            )
        end,
        fun(Source, Target, Weight) ->
            gleam@json:object(
                [{<<"from"/utf8>>, gleam@json:int(Source)},
                    {<<"to"/utf8>>, gleam@json:int(Target)},
                    {<<"metadata"/utf8>>,
                        gleam@json:object(
                            [{<<"weight"/utf8>>, gleam@json:string(Weight)}]
                        )}]
            )
        end},
    Json_custom = yog@render:to_json(Graph, Options),
    gleam_stdlib:println(Json_custom).
