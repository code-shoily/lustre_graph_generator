-module(gleamy@non_empty_list).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch]).
-define(FILEPATH, "src/gleamy/non_empty_list.gleam").
-export([fold/3, count/1, filter/2, to_list/1, from_list/1, reverse/1, map/2]).
-export_type([non_empty_list/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides a type and functions for working with non-empty lists,\n"
    " which are lists that are guaranteed to have at least one element.\n"
).

-type non_empty_list(HKZ) :: {'end', HKZ} | {next, HKZ, non_empty_list(HKZ)}.

-file("src/gleamy/non_empty_list.gleam", 16).
?DOC(
    " Applies a function to every element in the non-empty list, accumulating\n"
    " the results with the provided initial accumulator value.\n"
).
-spec fold(non_empty_list(HLA), HLC, fun((HLC, HLA) -> HLC)) -> HLC.
fold(List, Initial, Fun) ->
    case List of
        {'end', Item} ->
            Fun(Initial, Item);

        {next, X, Xs} ->
            fold(Xs, Fun(Initial, X), Fun)
    end.

-file("src/gleamy/non_empty_list.gleam", 29).
?DOC(
    " Returns the count (number of elements) in the non-empty list.\n"
    " Time complexity: O(n)\n"
).
-spec count(non_empty_list(any())) -> integer().
count(List) ->
    fold(List, 0, fun(Acc, _) -> Acc + 1 end).

-file("src/gleamy/non_empty_list.gleam", 46).
?DOC(
    " Filters the elements of the non-empty list based on a predicate function\n"
    " and returns a (potentially empty) list with the elements that satisfy the predicate.\n"
).
-spec filter(non_empty_list(HLJ), fun((HLJ) -> boolean())) -> list(HLJ).
filter(List, Predicate) ->
    _pipe = fold(List, [], fun(Acc, Item) -> case Predicate(Item) of
                true ->
                    [Item | Acc];

                false ->
                    Acc
            end end),
    lists:reverse(_pipe).

-file("src/gleamy/non_empty_list.gleam", 57).
?DOC(" Converts the non-empty list to a regular (potentially empty) list.\n").
-spec to_list(non_empty_list(HLM)) -> list(HLM).
to_list(List) ->
    _pipe = fold(List, [], fun(Acc, Item) -> [Item | Acc] end),
    lists:reverse(_pipe).

-file("src/gleamy/non_empty_list.gleam", 64).
?DOC(
    " Tries to create a non-empty list from a regular (potentially empty) list.\n"
    " Returns an error if the input list is empty.\n"
).
-spec from_list(list(HLP)) -> {ok, non_empty_list(HLP)} | {error, nil}.
from_list(List) ->
    case List of
        [] ->
            {error, nil};

        [X | Xs] ->
            {ok,
                gleam@list:fold(
                    Xs,
                    {'end', X},
                    fun(Acc, Item) -> {next, Item, Acc} end
                )}
    end.

-file("src/gleamy/non_empty_list.gleam", 72).
?DOC(" Reverses the order of elements in the non-empty list.\n").
-spec reverse(non_empty_list(HLU)) -> non_empty_list(HLU).
reverse(List) ->
    case List of
        {'end', _} ->
            List;

        {next, X, Xs} ->
            fold(Xs, {'end', X}, fun(Acc, X@1) -> {next, X@1, Acc} end)
    end.

-file("src/gleamy/non_empty_list.gleam", 35).
?DOC(
    " Applies a transformation function to every element in the non-empty list\n"
    " and returns a new non-empty list with the transformed elements.\n"
).
-spec map(non_empty_list(HLF), fun((HLF) -> HLH)) -> non_empty_list(HLH).
map(List, Transform) ->
    case List of
        {'end', X} ->
            {'end', Transform(X)};

        {next, X@1, Xs} ->
            _pipe = fold(
                Xs,
                {'end', Transform(X@1)},
                fun(Acc, Item) -> {next, Transform(Item), Acc} end
            ),
            reverse(_pipe)
    end.
