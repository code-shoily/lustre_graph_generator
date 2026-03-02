-module(gleamy@map).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch]).
-define(FILEPATH, "src/gleamy/map.gleam").
-export([new/1, insert/3, get/2, has_key/2, delete/2, count/1, fold/3, filter/2, merge/2, take/2, from_list/2, to_list/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of an ordered map data structure based on\n"
    " red-black trees. It associates keys of type `k` with values of type `v`.\n"
    " Keys are ordered by the comparison function.\n"
).

-file("src/gleamy/map.gleam", 15).
?DOC(" Creates a new empty map with the provided comparison function for keys.\n").
-spec new(fun((HFT, HFT) -> gleam@order:order())) -> gleamy@red_black_tree_map:map_(HFT, any()).
new(Compare) ->
    gleamy@red_black_tree_map:new(Compare).

-file("src/gleamy/map.gleam", 21).
?DOC(
    " Inserts a new key-value pair into the map, overwriting the value if the key\n"
    " already exists.\n"
).
-spec insert(gleamy@red_black_tree_map:map_(HFX, HFY), HFX, HFY) -> gleamy@red_black_tree_map:map_(HFX, HFY).
insert(Map, Key, Value) ->
    gleamy@red_black_tree_map:insert(Map, Key, Value).

-file("src/gleamy/map.gleam", 26).
?DOC(" Get the value associated with a given key in the map, if present.\n").
-spec get(gleamy@red_black_tree_map:map_(HGD, HGE), HGD) -> {ok, HGE} |
    {error, nil}.
get(Map, Key) ->
    gleamy@red_black_tree_map:find(Map, Key).

-file("src/gleamy/map.gleam", 31).
?DOC(" Checks if the map contains a given key.\n").
-spec has_key(gleamy@red_black_tree_map:map_(HGJ, any()), HGJ) -> boolean().
has_key(Map, Key) ->
    case gleamy@red_black_tree_map:find(Map, Key) of
        {ok, _} ->
            true;

        {error, _} ->
            false
    end.

-file("src/gleamy/map.gleam", 39).
?DOC(" Removes a key-value pair from the map, if the key exists.\n").
-spec delete(gleamy@red_black_tree_map:map_(HGN, HGO), HGN) -> gleamy@red_black_tree_map:map_(HGN, HGO).
delete(Map, Key) ->
    gleamy@red_black_tree_map:delete(Map, Key).

-file("src/gleamy/map.gleam", 45).
?DOC(
    " Returns the number of key-value pairs in the map.\n"
    " Time complexity: O(n)\n"
).
-spec count(gleamy@red_black_tree_map:map_(any(), any())) -> integer().
count(Map) ->
    gleamy@red_black_tree_map:fold(Map, 0, fun(A, _, _) -> A + 1 end).

-file("src/gleamy/map.gleam", 51).
?DOC(
    " Applies a function to every key-value pair in the map, accumulating\n"
    " the results with the provided initial accumulator value.\n"
).
-spec fold(
    gleamy@red_black_tree_map:map_(HGX, HGY),
    HHB,
    fun((HHB, HGX, HGY) -> HHB)
) -> HHB.
fold(Map, Initial, Reducer) ->
    gleamy@red_black_tree_map:fold(Map, Initial, Reducer).

-file("src/gleamy/map.gleam", 61).
?DOC(
    " Creates a new map containing only the key-value pairs from the original map\n"
    " that satisfy a given predicate function.\n"
).
-spec filter(
    gleamy@red_black_tree_map:map_(HHC, HHD),
    fun((HHC, HHD) -> boolean())
) -> gleamy@red_black_tree_map:map_(HHC, HHD).
filter(Map, Property) ->
    gleamy@red_black_tree_map:fold(
        Map,
        Map,
        fun(Map@1, K, V) -> case Property(K, V) of
                true ->
                    Map@1;

                false ->
                    gleamy@red_black_tree_map:delete(Map@1, K)
            end end
    ).

-file("src/gleamy/map.gleam", 72).
?DOC(
    " Merges two maps into a new map, keeping values from the second map\n"
    " if keys collide.\n"
).
-spec merge(
    gleamy@red_black_tree_map:map_(HHI, HHJ),
    gleamy@red_black_tree_map:map_(HHI, HHJ)
) -> gleamy@red_black_tree_map:map_(HHI, HHJ).
merge(Dict, New_entries) ->
    gleamy@red_black_tree_map:fold(
        New_entries,
        Dict,
        fun(A, K, V) -> gleamy@red_black_tree_map:insert(A, K, V) end
    ).

-file("src/gleamy/map.gleam", 78).
?DOC(
    " Creates a new map containing only the key-value pairs from the original map\n"
    " where the keys are present in the given list of desired keys.\n"
).
-spec take(gleamy@red_black_tree_map:map_(HHQ, HHR), list(HHQ)) -> gleamy@red_black_tree_map:map_(HHQ, HHR).
take(Map, Desired) ->
    case Desired of
        [X | Xs] ->
            case gleamy@red_black_tree_map:find(Map, X) of
                {ok, V} ->
                    gleamy@red_black_tree_map:insert(take(Map, Xs), X, V);

                {error, _} ->
                    take(Map, Xs)
            end;

        [] ->
            gleamy@red_black_tree_map:clear(Map)
    end.

-file("src/gleamy/map.gleam", 91).
?DOC(
    " Creates a new map from a list of key-value pairs and a comparison function\n"
    " for keys.\n"
).
-spec from_list(list({HHX, HHY}), fun((HHX, HHX) -> gleam@order:order())) -> gleamy@red_black_tree_map:map_(HHX, HHY).
from_list(Members, Compare) ->
    gleam@list:fold(
        Members,
        gleamy@red_black_tree_map:new(Compare),
        fun(Tree, I) ->
            gleamy@red_black_tree_map:insert(
                Tree,
                erlang:element(1, I),
                erlang:element(2, I)
            )
        end
    ).

-file("src/gleamy/map.gleam", 101).
?DOC(" Converts the map to a list of key-value pairs.\n").
-spec to_list(gleamy@red_black_tree_map:map_(HIC, HID)) -> list({HIC, HID}).
to_list(Map) ->
    gleamy@red_black_tree_map:foldr(Map, [], fun(A, K, V) -> [{K, V} | A] end).
