-module(yog@internal@utils).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/utils.gleam").
-export([range/2, dict_update_inner/4]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/utils.gleam", 21).
?DOC(false).
-spec do_range(integer(), integer(), list(integer())) -> list(integer()).
do_range(Current, End, Acc) ->
    case Current > End of
        true ->
            Acc;

        false ->
            do_range(Current + 1, End, [Current | Acc])
    end.

-file("src/yog/internal/utils.gleam", 16).
?DOC(false).
-spec range(integer(), integer()) -> list(integer()).
range(Start, End) ->
    _pipe = do_range(Start, End, []),
    lists:reverse(_pipe).

-file("src/yog/internal/utils.gleam", 29).
?DOC(false).
-spec dict_update_inner(
    gleam@dict:dict(GEC, gleam@dict:dict(GED, GEE)),
    GEC,
    GED,
    fun((gleam@dict:dict(GED, GEE), GED) -> gleam@dict:dict(GED, GEE))
) -> gleam@dict:dict(GEC, gleam@dict:dict(GED, GEE)).
dict_update_inner(Outer, Key1, Key2, Fun) ->
    case gleam_stdlib:map_get(Outer, Key1) of
        {ok, Inner} ->
            gleam@dict:insert(Outer, Key1, Fun(Inner, Key2));

        {error, _} ->
            Outer
    end.
