-module(gleamy@priority_queue).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch]).
-define(FILEPATH, "src/gleamy/priority_queue.gleam").
-export([new/1, pop/1, peek/1, push/2, is_empty/1, count/1, reorder/2, from_list/2, to_list/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of a priority queue data structure\n"
    " based on the pairing heap. It allows efficient insertion, removal, and access\n"
    " to the minimum element in the queue.\n"
).

-file("src/gleamy/priority_queue.gleam", 14).
?DOC(" Creates a new empty priority queue with the provided comparison function.\n").
-spec new(fun((HRF, HRF) -> gleam@order:order())) -> gleamy@pairing_heap:heap(HRF).
new(Compare) ->
    gleamy@pairing_heap:new(Compare).

-file("src/gleamy/priority_queue.gleam", 20).
?DOC(
    " Removes and returns the minimum element from the priority queue,\n"
    " along with the new queue.\n"
).
-spec pop(gleamy@pairing_heap:heap(HRH)) -> {ok,
        {HRH, gleamy@pairing_heap:heap(HRH)}} |
    {error, nil}.
pop(Queue) ->
    gleamy@pairing_heap:delete_min(Queue).

-file("src/gleamy/priority_queue.gleam", 25).
?DOC(" Returns the minimum element in the priority queue without removing it.\n").
-spec peek(gleamy@pairing_heap:heap(HRM)) -> {ok, HRM} | {error, nil}.
peek(Queue) ->
    gleamy@pairing_heap:find_min(Queue).

-file("src/gleamy/priority_queue.gleam", 30).
?DOC(" Inserts a new element into the priority queue.\n").
-spec push(gleamy@pairing_heap:heap(HRQ), HRQ) -> gleamy@pairing_heap:heap(HRQ).
push(Queue, Item) ->
    gleamy@pairing_heap:insert(Queue, Item).

-file("src/gleamy/priority_queue.gleam", 35).
?DOC(" Checks whether the priority queue is empty or not.\n").
-spec is_empty(gleamy@pairing_heap:heap(any())) -> boolean().
is_empty(Queue) ->
    case gleamy@pairing_heap:find_min(Queue) of
        {ok, _} ->
            false;

        {error, _} ->
            true
    end.

-file("src/gleamy/priority_queue.gleam", 44).
?DOC(" Returns the number of elements in the priority queue.\n").
-spec count(gleamy@pairing_heap:heap(any())) -> integer().
count(Queue) ->
    case gleamy@pairing_heap:delete_min(Queue) of
        {ok, {_, Q}} ->
            count(Q) + 1;

        {error, _} ->
            0
    end.

-file("src/gleamy/priority_queue.gleam", 52).
?DOC(" Rebuilds the priority queue with a new comparison function.\n").
-spec reorder(
    gleamy@pairing_heap:heap(HRX),
    fun((HRX, HRX) -> gleam@order:order())
) -> gleamy@pairing_heap:heap(HRX).
reorder(Queue, Compare) ->
    case gleamy@pairing_heap:delete_min(Queue) of
        {ok, {X, Q}} ->
            gleamy@pairing_heap:insert(reorder(Q, Compare), X);

        {error, _} ->
            gleamy@pairing_heap:new(Compare)
    end.

-file("src/gleamy/priority_queue.gleam", 60).
?DOC(" Creates a new priority queue from a list of elements and a comparison function.\n").
-spec from_list(list(HSA), fun((HSA, HSA) -> gleam@order:order())) -> gleamy@pairing_heap:heap(HSA).
from_list(List, Compare) ->
    gleam@list:fold(List, new(Compare), fun gleamy@pairing_heap:insert/2).

-file("src/gleamy/priority_queue.gleam", 65).
?DOC(" Converts the priority queue to a list, preserving the order of elements.\n").
-spec to_list(gleamy@pairing_heap:heap(HSD)) -> list(HSD).
to_list(Queue) ->
    case gleamy@pairing_heap:delete_min(Queue) of
        {ok, {X, Q}} ->
            [X | to_list(Q)];

        {error, _} ->
            []
    end.
