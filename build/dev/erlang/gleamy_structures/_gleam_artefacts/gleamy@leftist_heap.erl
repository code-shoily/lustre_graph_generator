-module(gleamy@leftist_heap).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/gleamy/leftist_heap.gleam").
-export([new/1, find_min/1, insert/2, delete_min/1, merge/2]).
-export_type([tree/1, heap/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of the leftist heap data structure,\n"
    " a type of binary heap with efficient insert, find_min, and delete_min, and merge operations.\n"
).

-type tree(JUP) :: empty | {tree, integer(), JUP, tree(JUP), tree(JUP)}.

-opaque heap(JUQ) :: {heap, tree(JUQ), fun((JUQ, JUQ) -> gleam@order:order())}.

-file("src/gleamy/leftist_heap.gleam", 18).
?DOC(" Creates a new empty heap with the provided comparison function.\n").
-spec new(fun((JUR, JUR) -> gleam@order:order())) -> heap(JUR).
new(Compare) ->
    {heap, empty, Compare}.

-file("src/gleamy/leftist_heap.gleam", 33).
?DOC(
    " Returns the minimum element in the heap, if the heap is not empty.\n"
    " Time complexity: O(1)\n"
).
-spec find_min(heap(JUW)) -> {ok, JUW} | {error, nil}.
find_min(Heap) ->
    case erlang:element(2, Heap) of
        {tree, _, X, _, _} ->
            {ok, X};

        empty ->
            {error, nil}
    end.

-file("src/gleamy/leftist_heap.gleam", 72).
-spec make(JWG, tree(JWG), tree(JWG)) -> tree(JWG).
make(X, A, B) ->
    Rank_a = case A of
        {tree, R, _, _, _} ->
            R;

        empty ->
            0
    end,
    Rank_b = case B of
        {tree, R@1, _, _, _} ->
            R@1;

        empty ->
            0
    end,
    case Rank_a < Rank_b of
        true ->
            {tree, Rank_a + 1, X, B, A};

        _ ->
            {tree, Rank_b + 1, X, A, B}
    end.

-file("src/gleamy/leftist_heap.gleam", 60).
-spec merge_trees(tree(JVJ), tree(JVJ), fun((JVJ, JVJ) -> gleam@order:order())) -> tree(JVJ).
merge_trees(H1, H2, Compare) ->
    case {H1, H2} of
        {H, empty} ->
            H;

        {empty, H@1} ->
            H@1;

        {{tree, _, X, A1, B1}, {tree, _, Y, A2, B2}} ->
            case Compare(X, Y) of
                gt ->
                    make(Y, A2, merge_trees(H1, B2, Compare));

                _ ->
                    make(X, A1, merge_trees(B1, H2, Compare))
            end
    end.

-file("src/gleamy/leftist_heap.gleam", 24).
?DOC(
    " Inserts a new item into the heap, preserving the heap property.\n"
    " Time complexity: O(log n)\n"
).
-spec insert(heap(JUT), JUT) -> heap(JUT).
insert(Heap, Item) ->
    {heap,
        merge_trees(
            {tree, 1, Item, empty, empty},
            erlang:element(2, Heap),
            erlang:element(3, Heap)
        ),
        erlang:element(3, Heap)}.

-file("src/gleamy/leftist_heap.gleam", 43).
?DOC(
    " Removes and returns the minimum element from the heap, along with the\n"
    " new heap after deletion, if the heap is not empty.\n"
    " Time complexity: O(log n)\n"
).
-spec delete_min(heap(JVA)) -> {ok, {JVA, heap(JVA)}} | {error, nil}.
delete_min(Heap) ->
    case erlang:element(2, Heap) of
        {tree, _, X, A, B} ->
            {ok,
                {X,
                    {heap,
                        merge_trees(A, B, erlang:element(3, Heap)),
                        erlang:element(3, Heap)}}};

        empty ->
            {error, nil}
    end.

-file("src/gleamy/leftist_heap.gleam", 55).
?DOC(
    " Merges two heaps into a new heap containing all elements from both heaps,\n"
    " preserving the heap property.\n"
    " The given heaps must have the same comparison function.\n"
    " Time complexity: O(log n)\n"
).
-spec merge(heap(JVF), heap(JVF)) -> heap(JVF).
merge(Heap1, Heap2) ->
    Compare = erlang:element(3, Heap1),
    {heap,
        merge_trees(erlang:element(2, Heap1), erlang:element(2, Heap2), Compare),
        Compare}.
