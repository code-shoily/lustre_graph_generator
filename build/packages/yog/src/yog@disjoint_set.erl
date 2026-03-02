-module(yog@disjoint_set).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/disjoint_set.gleam").
-export([new/0, add/2, find/2, union/3, from_pairs/1, connected/3, size/1, count_sets/1, to_lists/1]).
-export_type([disjoint_set/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type disjoint_set(IWN) :: {disjoint_set,
        gleam@dict:dict(IWN, IWN),
        gleam@dict:dict(IWN, integer())}.

-file("src/yog/disjoint_set.gleam", 18).
?DOC(" Creates a new empty disjoint set structure.\n").
-spec new() -> disjoint_set(any()).
new() ->
    {disjoint_set, maps:new(), maps:new()}.

-file("src/yog/disjoint_set.gleam", 26).
?DOC(
    " Adds a new element to the disjoint set.\n"
    "\n"
    " The element starts in its own singleton set.\n"
    " If the element already exists, the structure is returned unchanged.\n"
).
-spec add(disjoint_set(IWQ), IWQ) -> disjoint_set(IWQ).
add(Disjoint_set, Element) ->
    case gleam@dict:has_key(erlang:element(2, Disjoint_set), Element) of
        true ->
            Disjoint_set;

        false ->
            {disjoint_set,
                gleam@dict:insert(
                    erlang:element(2, Disjoint_set),
                    Element,
                    Element
                ),
                gleam@dict:insert(erlang:element(3, Disjoint_set), Element, 0)}
    end.

-file("src/yog/disjoint_set.gleam", 43).
?DOC(
    " Finds the representative (root) of the set containing the element.\n"
    "\n"
    " Uses path compression to flatten the tree structure for future queries.\n"
    " If the element doesn't exist, it's automatically added first.\n"
    "\n"
    " Returns a tuple of `#(updated_disjoint_set, root)`.\n"
).
-spec find(disjoint_set(IWT), IWT) -> {disjoint_set(IWT), IWT}.
find(Disjoint_set, Element) ->
    case gleam_stdlib:map_get(erlang:element(2, Disjoint_set), Element) of
        {error, _} ->
            {add(Disjoint_set, Element), Element};

        {ok, Parent} when Parent =:= Element ->
            {Disjoint_set, Element};

        {ok, Parent@1} ->
            {Updated_disjoint_set, Root} = find(Disjoint_set, Parent@1),
            New_parents = gleam@dict:insert(
                erlang:element(2, Updated_disjoint_set),
                Element,
                Root
            ),
            {{disjoint_set,
                    New_parents,
                    erlang:element(3, Updated_disjoint_set)},
                Root}
    end.

-file("src/yog/disjoint_set.gleam", 60).
?DOC(
    " Merges the sets containing the two elements.\n"
    "\n"
    " Uses union by rank to keep the tree balanced.\n"
    " If the elements are already in the same set, returns unchanged.\n"
).
-spec union(disjoint_set(IWW), IWW, IWW) -> disjoint_set(IWW).
union(Disjoint_set, X, Y) ->
    {Disjoint_set1, Root_x} = find(Disjoint_set, X),
    {Disjoint_set2, Root_y} = find(Disjoint_set1, Y),
    case Root_x =:= Root_y of
        true ->
            Disjoint_set2;

        false ->
            Rank_x = begin
                _pipe = gleam_stdlib:map_get(
                    erlang:element(3, Disjoint_set2),
                    Root_x
                ),
                gleam@result:unwrap(_pipe, 0)
            end,
            Rank_y = begin
                _pipe@1 = gleam_stdlib:map_get(
                    erlang:element(3, Disjoint_set2),
                    Root_y
                ),
                gleam@result:unwrap(_pipe@1, 0)
            end,
            case Rank_x < Rank_y of
                true ->
                    {disjoint_set,
                        gleam@dict:insert(
                            erlang:element(2, Disjoint_set2),
                            Root_x,
                            Root_y
                        ),
                        erlang:element(3, Disjoint_set2)};

                false ->
                    Disjoint_set3 = {disjoint_set,
                        gleam@dict:insert(
                            erlang:element(2, Disjoint_set2),
                            Root_y,
                            Root_x
                        ),
                        erlang:element(3, Disjoint_set2)},
                    case Rank_x =:= Rank_y of
                        true ->
                            {disjoint_set,
                                erlang:element(2, Disjoint_set3),
                                gleam@dict:insert(
                                    erlang:element(3, Disjoint_set3),
                                    Root_x,
                                    Rank_x + 1
                                )};

                        false ->
                            Disjoint_set3
                    end
            end
    end.

-file("src/yog/disjoint_set.gleam", 106).
?DOC(
    " Creates a disjoint set from a list of pairs to union.\n"
    "\n"
    " This is a convenience function for building a disjoint set from edge lists\n"
    " or connection pairs. Perfect for graph problems, AoC, and competitive programming.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let dsu = disjoint_set.from_pairs([#(1, 2), #(3, 4), #(2, 3)])\n"
    " // Results in: {1,2,3,4} as one set\n"
    " ```\n"
).
-spec from_pairs(list({IWZ, IWZ})) -> disjoint_set(IWZ).
from_pairs(Pairs) ->
    gleam@list:fold(
        Pairs,
        new(),
        fun(Dsu, Pair) ->
            union(Dsu, erlang:element(1, Pair), erlang:element(2, Pair))
        end
    ).

-file("src/yog/disjoint_set.gleam", 120).
?DOC(
    " Checks if two elements are in the same set (connected).\n"
    "\n"
    " Returns the updated disjoint set (due to path compression) and a boolean result.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let dsu = from_pairs([#(1, 2), #(3, 4)])\n"
    " let #(dsu2, result) = connected(dsu, 1, 2)  // => True\n"
    " let #(dsu3, result) = connected(dsu2, 1, 3) // => False\n"
    " ```\n"
).
-spec connected(disjoint_set(IXC), IXC, IXC) -> {disjoint_set(IXC), boolean()}.
connected(Dsu, X, Y) ->
    {Dsu1, Root_x} = find(Dsu, X),
    {Dsu2, Root_y} = find(Dsu1, Y),
    {Dsu2, Root_x =:= Root_y}.

-file("src/yog/disjoint_set.gleam", 127).
?DOC(" Returns the total number of elements in the structure.\n").
-spec size(disjoint_set(any())) -> integer().
size(Dsu) ->
    maps:size(erlang:element(2, Dsu)).

-file("src/yog/disjoint_set.gleam", 175).
-spec find_root_readonly(disjoint_set(IXN), IXN) -> IXN.
find_root_readonly(Dsu, Element) ->
    case gleam_stdlib:map_get(erlang:element(2, Dsu), Element) of
        {error, _} ->
            Element;

        {ok, Parent} when Parent =:= Element ->
            Element;

        {ok, Parent@1} ->
            find_root_readonly(Dsu, Parent@1)
    end.

-file("src/yog/disjoint_set.gleam", 140).
?DOC(
    " Returns the number of disjoint sets.\n"
    "\n"
    " Counts the distinct sets by finding the unique roots.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let dsu = from_pairs([#(1, 2), #(3, 4)])\n"
    " count_sets(dsu)  // => 2 (sets: {1,2} and {3,4})\n"
    " ```\n"
).
-spec count_sets(disjoint_set(any())) -> integer().
count_sets(Dsu) ->
    _pipe = maps:keys(erlang:element(2, Dsu)),
    _pipe@1 = gleam@list:map(
        _pipe,
        fun(Element) -> find_root_readonly(Dsu, Element) end
    ),
    _pipe@2 = gleam@set:from_list(_pipe@1),
    gleam@set:size(_pipe@2).

-file("src/yog/disjoint_set.gleam", 160).
?DOC(
    " Returns all disjoint sets as a list of lists.\n"
    "\n"
    " Each inner list contains all members of one set. The order of sets and\n"
    " elements within sets is unspecified.\n"
    "\n"
    " Note: This operation doesn't perform path compression, so the structure\n"
    " is not modified.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let dsu = from_pairs([#(1, 2), #(3, 4), #(5, 6)])\n"
    " to_lists(dsu)  // => [[1, 2], [3, 4], [5, 6]] (order may vary)\n"
    " ```\n"
).
-spec to_lists(disjoint_set(IXJ)) -> list(list(IXJ)).
to_lists(Dsu) ->
    _pipe = maps:keys(erlang:element(2, Dsu)),
    _pipe@1 = gleam@list:fold(
        _pipe,
        maps:new(),
        fun(Acc, Element) ->
            Root = find_root_readonly(Dsu, Element),
            gleam@dict:upsert(Acc, Root, fun(Existing) -> case Existing of
                        {some, Members} ->
                            [Element | Members];

                        none ->
                            [Element]
                    end end)
        end
    ),
    maps:values(_pipe@1).
