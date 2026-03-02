-module(gleamy@set).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/gleamy/set.gleam").
-export([new/1, insert/2, contains/2, delete/2, filter/2, fold/3, intersection/2, union/2, difference/2, count/1, from_list/2, to_list/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of an ordered set data structure\n"
    " based on red-black trees.\n"
    " A set is a collection of unique values, ordered by the comparison function.\n"
).

-file("src/gleamy/set.gleam", 14).
?DOC(" Creates a new empty set with the provided comparison function.\n").
-spec new(fun((LVR, LVR) -> gleam@order:order())) -> gleamy@red_black_tree_set:set(LVR).
new(Compare) ->
    gleamy@red_black_tree_set:new(Compare).

-file("src/gleamy/set.gleam", 19).
?DOC(" Inserts a new element into the set, if it is not already present.\n").
-spec insert(gleamy@red_black_tree_set:set(LVT), LVT) -> gleamy@red_black_tree_set:set(LVT).
insert(Set, Member) ->
    gleamy@red_black_tree_set:insert(Set, Member).

-file("src/gleamy/set.gleam", 24).
?DOC(" Checks if the set contains a given element.\n").
-spec contains(gleamy@red_black_tree_set:set(LVW), LVW) -> boolean().
contains(Set, Member) ->
    case gleamy@red_black_tree_set:find(Set, Member) of
        {ok, _} ->
            true;

        {error, _} ->
            false
    end.

-file("src/gleamy/set.gleam", 32).
?DOC(" Removes an element from the set, if it exists.\n").
-spec delete(gleamy@red_black_tree_set:set(LVY), LVY) -> gleamy@red_black_tree_set:set(LVY).
delete(Set, Member) ->
    gleamy@red_black_tree_set:delete(Set, Member).

-file("src/gleamy/set.gleam", 38).
?DOC(
    " Creates a new set containing only the elements from the original set\n"
    " that satisfy a given predicate function.\n"
).
-spec filter(gleamy@red_black_tree_set:set(LWB), fun((LWB) -> boolean())) -> gleamy@red_black_tree_set:set(LWB).
filter(Set, Property) ->
    gleamy@red_black_tree_set:fold(
        Set,
        Set,
        fun(Set@1, I) -> case Property(I) of
                true ->
                    Set@1;

                false ->
                    gleamy@red_black_tree_set:delete(Set@1, I)
            end end
    ).

-file("src/gleamy/set.gleam", 49).
?DOC(
    " Applies a function to every element in the set, accumulating\n"
    " the results with the provided initial accumulator value.\n"
).
-spec fold(gleamy@red_black_tree_set:set(LWE), LWG, fun((LWG, LWE) -> LWG)) -> LWG.
fold(Set, Initial, Reducer) ->
    gleamy@red_black_tree_set:fold(Set, Initial, Reducer).

-file("src/gleamy/set.gleam", 54).
?DOC(" Creates a new set containing the intersection (common elements) of two sets.\n").
-spec intersection(
    gleamy@red_black_tree_set:set(LWH),
    gleamy@red_black_tree_set:set(LWH)
) -> gleamy@red_black_tree_set:set(LWH).
intersection(First, Second) ->
    gleamy@red_black_tree_set:fold(
        Second,
        gleamy@red_black_tree_set:clear(First),
        fun(A, I) -> case gleamy@red_black_tree_set:find(First, I) of
                {ok, _} ->
                    gleamy@red_black_tree_set:insert(A, I);

                {error, _} ->
                    A
            end end
    ).

-file("src/gleamy/set.gleam", 64).
?DOC(" Creates a new set containing the union (all elements) of two sets.\n").
-spec union(
    gleamy@red_black_tree_set:set(LWL),
    gleamy@red_black_tree_set:set(LWL)
) -> gleamy@red_black_tree_set:set(LWL).
union(First, Second) ->
    gleamy@red_black_tree_set:fold(
        First,
        Second,
        fun(A, I) -> gleamy@red_black_tree_set:insert(A, I) end
    ).

-file("src/gleamy/set.gleam", 70).
?DOC(
    " Creates a new set containing the elements of the first set except for elements\n"
    " that are also in the second set.\n"
).
-spec difference(
    gleamy@red_black_tree_set:set(LWP),
    gleamy@red_black_tree_set:set(LWP)
) -> gleamy@red_black_tree_set:set(LWP).
difference(Set, Removal) ->
    gleamy@red_black_tree_set:fold(
        Removal,
        Set,
        fun(Set@1, I) -> gleamy@red_black_tree_set:delete(Set@1, I) end
    ).

-file("src/gleamy/set.gleam", 76).
?DOC(
    " Returns the number of elements in the set.\n"
    " Time complexity: O(n)\n"
).
-spec count(gleamy@red_black_tree_set:set(any())) -> integer().
count(Set) ->
    gleamy@red_black_tree_set:fold(Set, 0, fun(A, _) -> A + 1 end).

-file("src/gleamy/set.gleam", 81).
?DOC(" Creates a new set from a list of elements and a comparison function.\n").
-spec from_list(list(LWV), fun((LWV, LWV) -> gleam@order:order())) -> gleamy@red_black_tree_set:set(LWV).
from_list(Members, Compare) ->
    gleam@list:fold(
        Members,
        gleamy@red_black_tree_set:new(Compare),
        fun gleamy@red_black_tree_set:insert/2
    ).

-file("src/gleamy/set.gleam", 86).
?DOC(" Converts the set to a list of its elements.\n").
-spec to_list(gleamy@red_black_tree_set:set(LWY)) -> list(LWY).
to_list(Set) ->
    gleamy@red_black_tree_set:foldr(Set, [], fun(A, I) -> [I | A] end).
