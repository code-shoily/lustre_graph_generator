-module(gleamy@pairing_heap).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch]).
-define(FILEPATH, "src/gleamy/pairing_heap.gleam").
-export([new/1, find_min/1, insert/2, merge/2, delete_min/1]).
-export_type([tree/1, heap/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of the pairing heap data structure,\n"
    " a type of self-adjusting heap with efficient insert, find_min, and delete_min, and merge operations.\n"
).

-type tree(HOB) :: empty | {tree, HOB, list(tree(HOB))}.

-opaque heap(HOC) :: {heap, tree(HOC), fun((HOC, HOC) -> gleam@order:order())}.

-file("src/gleamy/pairing_heap.gleam", 18).
?DOC(" Creates a new empty heap with the provided comparison function.\n").
-spec new(fun((HOD, HOD) -> gleam@order:order())) -> heap(HOD).
new(Compare) ->
    {heap, empty, Compare}.

-file("src/gleamy/pairing_heap.gleam", 30).
?DOC(
    " Returns the minimum element in the heap, if the heap is not empty.\n"
    " Time complexity: O(1)\n"
).
-spec find_min(heap(HOI)) -> {ok, HOI} | {error, nil}.
find_min(Heap) ->
    case erlang:element(2, Heap) of
        {tree, X, _} ->
            {ok, X};

        empty ->
            {error, nil}
    end.

-file("src/gleamy/pairing_heap.gleam", 56).
-spec merge_trees(tree(HOV), tree(HOV), fun((HOV, HOV) -> gleam@order:order())) -> tree(HOV).
merge_trees(X, Y, Compare) ->
    case {X, Y} of
        {X@1, empty} ->
            X@1;

        {empty, Y@1} ->
            Y@1;

        {{tree, Xk, Xs}, {tree, Yk, Ys}} ->
            case Compare(Xk, Yk) of
                gt ->
                    {tree, Yk, [X | Ys]};

                _ ->
                    {tree, Xk, [Y | Xs]}
            end
    end.

-file("src/gleamy/pairing_heap.gleam", 24).
?DOC(
    " Inserts a new item into the heap, preserving the heap property.\n"
    " Time complexity: O(1)\n"
).
-spec insert(heap(HOF), HOF) -> heap(HOF).
insert(Heap, Key) ->
    {heap,
        merge_trees(
            {tree, Key, []},
            erlang:element(2, Heap),
            erlang:element(3, Heap)
        ),
        erlang:element(3, Heap)}.

-file("src/gleamy/pairing_heap.gleam", 51).
?DOC(
    " Merges two heaps into a new heap containing all elements from both heaps,\n"
    " preserving the heap property.\n"
    " The given heaps must have the same comparison function.\n"
    " Time complexity: O(1)\n"
).
-spec merge(heap(HOR), heap(HOR)) -> heap(HOR).
merge(Heap1, Heap2) ->
    Compare = erlang:element(3, Heap1),
    {heap,
        merge_trees(erlang:element(2, Heap1), erlang:element(2, Heap2), Compare),
        Compare}.

-file("src/gleamy/pairing_heap.gleam", 68).
-spec merge_pairs(list(tree(HOZ)), fun((HOZ, HOZ) -> gleam@order:order())) -> tree(HOZ).
merge_pairs(L, Compare) ->
    case L of
        [] ->
            empty;

        [H] ->
            H;

        [H1, H2 | Hs] ->
            merge_trees(
                merge_trees(H1, H2, Compare),
                merge_pairs(Hs, Compare),
                Compare
            )
    end.

-file("src/gleamy/pairing_heap.gleam", 40).
?DOC(
    " Removes and returns the minimum element from the heap along with the\n"
    " new heap after deletion, if the heap is not empty.\n"
    " Time complexity: O(log n) amortized\n"
).
-spec delete_min(heap(HOM)) -> {ok, {HOM, heap(HOM)}} | {error, nil}.
delete_min(Heap) ->
    case erlang:element(2, Heap) of
        {tree, X, Xs} ->
            {ok,
                {X,
                    {heap,
                        merge_pairs(Xs, erlang:element(3, Heap)),
                        erlang:element(3, Heap)}}};

        empty ->
            {error, nil}
    end.
