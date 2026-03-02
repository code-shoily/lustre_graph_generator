-module(yog@internal@examples@task_ordering).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/task_ordering.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/task_ordering.gleam", 61).
?DOC(false).
-spec char_to_ascii(binary()) -> integer().
char_to_ascii(S) ->
    Codepoint@1 = case begin
        _pipe = gleam@string:to_utf_codepoints(S),
        gleam@list:first(_pipe)
    end of
        {ok, Codepoint} -> Codepoint;
        _assert_fail ->
            erlang:error(#{gleam_error => let_assert,
                        message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                        file => <<?FILEPATH/utf8>>,
                        module => <<"yog/internal/examples/task_ordering"/utf8>>,
                        function => <<"char_to_ascii"/utf8>>,
                        line => 62,
                        value => _assert_fail,
                        start => 1571,
                        'end' => 1639,
                        pattern_start => 1582,
                        pattern_end => 1595})
    end,
    gleam_stdlib:identity(Codepoint@1).

-file("src/yog/internal/examples/task_ordering.gleam", 8).
?DOC(false).
-spec main() -> nil.
main() ->
    Dependencies = [{<<"C"/utf8>>, <<"A"/utf8>>},
        {<<"C"/utf8>>, <<"F"/utf8>>},
        {<<"A"/utf8>>, <<"B"/utf8>>},
        {<<"A"/utf8>>, <<"D"/utf8>>},
        {<<"B"/utf8>>, <<"E"/utf8>>},
        {<<"D"/utf8>>, <<"E"/utf8>>},
        {<<"F"/utf8>>, <<"E"/utf8>>}],
    Graph = begin
        _pipe = Dependencies,
        gleam@list:fold(
            _pipe,
            yog@model:new(directed),
            fun(G, Dep) ->
                {Prereq, Step} = Dep,
                Prereq_id = char_to_ascii(Prereq),
                Step_id = char_to_ascii(Step),
                _pipe@1 = G,
                _pipe@2 = yog@model:add_node(_pipe@1, Prereq_id, Prereq),
                _pipe@3 = yog@model:add_node(_pipe@2, Step_id, Step),
                yog@model:add_edge(_pipe@3, Prereq_id, Step_id, nil)
            end
        )
    end,
    case yog@topological_sort:lexicographical_topological_sort(
        Graph,
        fun gleam@string:compare/2
    ) of
        {ok, Order} ->
            Task_order = begin
                _pipe@4 = Order,
                _pipe@5 = gleam@list:map(
                    _pipe@4,
                    fun(Id) ->
                        Task@1 = case gleam_stdlib:map_get(
                            erlang:element(3, Graph),
                            Id
                        ) of
                            {ok, Task} -> Task;
                            _assert_fail ->
                                erlang:error(#{gleam_error => let_assert,
                                            message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                                            file => <<?FILEPATH/utf8>>,
                                            module => <<"yog/internal/examples/task_ordering"/utf8>>,
                                            function => <<"main"/utf8>>,
                                            line => 49,
                                            value => _assert_fail,
                                            start => 1252,
                                            'end' => 1299,
                                            pattern_start => 1263,
                                            pattern_end => 1271})
                        end,
                        Task@1
                    end
                ),
                gleam@string:join(_pipe@5, <<""/utf8>>)
            end,
            gleam_stdlib:println(
                <<"Task execution order: "/utf8, Task_order/binary>>
            );

        {error, nil} ->
            gleam_stdlib:println(<<"Circular dependency detected!"/utf8>>)
    end.
