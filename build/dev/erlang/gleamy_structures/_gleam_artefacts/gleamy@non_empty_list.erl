-module(gleamy@non_empty_list).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
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

-type non_empty_list(LBA) :: {'end', LBA} | {next, LBA, non_empty_list(LBA)}.

-file("src/gleamy/non_empty_list.gleam", 16).
?DOC(
    " Applies a function to every element in the non-empty list, accumulating\n"
    " the results with the provided initial accumulator value.\n"
).
-spec fold(non_empty_list(LBB), LBD, fun((LBD, LBB) -> LBD)) -> LBD.
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
-spec filter(non_empty_list(LBK), fun((LBK) -> boolean())) -> list(LBK).
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
-spec to_list(non_empty_list(LBN)) -> list(LBN).
to_list(List) ->
    _pipe = fold(List, [], fun(Acc, Item) -> [Item | Acc] end),
    lists:reverse(_pipe).

-file("src/gleamy/non_empty_list.gleam", 64).
?DOC(
    " Tries to create a non-empty list from a regular (potentially empty) list.\n"
    " Returns an error if the input list is empty.\n"
).
-spec from_list(list(LBQ)) -> {ok, non_empty_list(LBQ)} | {error, nil}.
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
-spec reverse(non_empty_list(LBV)) -> non_empty_list(LBV).
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
-spec map(non_empty_list(LBG), fun((LBG) -> LBI)) -> non_empty_list(LBI).
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
