-module(yog@internal@examples@task_scheduling).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/task_scheduling.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/task_scheduling.gleam", 6).
?DOC(false).
-spec main() -> nil.
main() ->
    Tasks = begin
        _pipe = yog@model:new(directed),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Design"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Implement"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Test"/utf8>>),
        _pipe@4 = yog@model:add_node(_pipe@3, 4, <<"Deploy"/utf8>>),
        _pipe@5 = yog@model:add_edge(_pipe@4, 1, 2, nil),
        _pipe@6 = yog@model:add_edge(_pipe@5, 2, 3, nil),
        yog@model:add_edge(_pipe@6, 3, 4, nil)
    end,
    case yog@topological_sort:topological_sort(Tasks) of
        {ok, Order} ->
            gleam_stdlib:println(
                <<"Execute tasks in order: "/utf8,
                    (gleam@string:inspect(Order))/binary>>
            );

        {error, nil} ->
            gleam_stdlib:println(<<"Circular dependency detected!"/utf8>>)
    end.
