-module(gleamy@red_black_tree_set).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/gleamy/red_black_tree_set.gleam").
-export([new/1, clear/1, insert/2, delete/2, find/2, fold/3, foldr/3]).
-export_type([color/0, node_/1, set/1, min_del/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of a red-black tree set, a self-balancing\n"
    " binary search tree data structure that maintains a balanced shape which ensures\n"
    " tree operations stay efficient.\n"
    " This is an ordered set implementation, meaning the tree will contains values that\n"
    " are unique and ordered according to the comparison function.\n"
).

-type color() :: r | b | b_b.

-type node_(LJS) :: e | e_e | {t, color(), node_(LJS), LJS, node_(LJS)}.

-opaque set(LJT) :: {set, node_(LJT), fun((LJT, LJT) -> gleam@order:order())}.

-type min_del(LJU) :: {min, LJU, node_(LJU)} | none.

-file("src/gleamy/red_black_tree_set.gleam", 28).
?DOC(" Creates a new empty set with the provided comparison function.\n").
-spec new(fun((LJV, LJV) -> gleam@order:order())) -> set(LJV).
new(Compare) ->
    {set, e, Compare}.

-file("src/gleamy/red_black_tree_set.gleam", 34).
?DOC(
    " Removes all elements from the set, resulting in an empty set.\n"
    " Time complexity: O(1)\n"
).
-spec clear(set(LJX)) -> set(LJX).
clear(Tree) ->
    {set, e, erlang:element(3, Tree)}.

-file("src/gleamy/red_black_tree_set.gleam", 85).
-spec blacken(node_(LKU)) -> node_(LKU).
blacken(Node) ->
    case Node of
        {t, r, {t, r, _, _, _} = L, Y, C} ->
            {t, b, L, Y, C};

        {t, r, A, X, {t, r, _, _, _} = R} ->
            {t, b, A, X, R};

        T ->
            T
    end.

-file("src/gleamy/red_black_tree_set.gleam", 93).
-spec balance(color(), node_(LKX), LKX, node_(LKX)) -> node_(LKX).
balance(C, L, V, R) ->
    case {C, L, V, R} of
        {b, {t, r, {t, r, A, X, B}, Y, C@1}, Z, D} ->
            {t, r, {t, b, A, X, B}, Y, {t, b, C@1, Z, D}};

        {b, {t, r, A@1, X@1, {t, r, B@1, Y@1, C@2}}, Z@1, D@1} ->
            {t, r, {t, b, A@1, X@1, B@1}, Y@1, {t, b, C@2, Z@1, D@1}};

        {b, A@2, X@2, {t, r, {t, r, B@2, Y@2, C@3}, Z@2, D@2}} ->
            {t, r, {t, b, A@2, X@2, B@2}, Y@2, {t, b, C@3, Z@2, D@2}};

        {b, A@3, X@3, {t, r, B@3, Y@3, {t, r, C@4, Z@3, D@3}}} ->
            {t, r, {t, b, A@3, X@3, B@3}, Y@3, {t, b, C@4, Z@3, D@3}};

        {b_b, A@4, X@4, {t, r, {t, r, B@4, Y@4, C@5}, Z@4, D@4}} ->
            {t, b, {t, b, A@4, X@4, B@4}, Y@4, {t, b, C@5, Z@4, D@4}};

        {b_b, {t, r, A@5, X@5, {t, r, B@5, Y@5, C@6}}, Z@5, D@5} ->
            {t, b, {t, b, A@5, X@5, B@5}, Y@5, {t, b, C@6, Z@5, D@5}};

        {C@7, A@6, X@6, B@6} ->
            {t, C@7, A@6, X@6, B@6}
    end.

-file("src/gleamy/red_black_tree_set.gleam", 72).
-spec ins(node_(LOE), LOE, fun((LOE, LOE) -> gleam@order:order())) -> node_(LOE).
ins(Node, X, Compare) ->
    case Node of
        e ->
            {t, r, e, X, e};

        {t, C, A, Y, B} ->
            case Compare(X, Y) of
                lt ->
                    balance(C, ins(A, X, Compare), Y, B);

                gt ->
                    balance(C, A, Y, ins(B, X, Compare));

                eq ->
                    {t, C, A, X, B}
            end;

        _ ->
            Node
    end.

-file("src/gleamy/red_black_tree_set.gleam", 41).
?DOC(
    " Inserts a new element into the set, preserving the set property (no duplicates).\n"
    " Time complexity: O(log n)\n"
).
-spec insert(set(LKA), LKA) -> set(LKA).
insert(Tree, Key) ->
    {set,
        blacken(ins(erlang:element(2, Tree), Key, erlang:element(3, Tree))),
        erlang:element(3, Tree)}.

-file("src/gleamy/red_black_tree_set.gleam", 105).
-spec redden(node_(LLB)) -> node_(LLB).
redden(Node) ->
    case Node of
        {t, b, {t, b, _, _, _} = L, Y, {t, b, _, _, _} = R} ->
            {t, r, L, Y, R};

        T ->
            T
    end.

-file("src/gleamy/red_black_tree_set.gleam", 145).
-spec rotate(color(), node_(LLI), LLI, node_(LLI)) -> node_(LLI).
rotate(C, L, V, R) ->
    case {C, L, V, R} of
        {r, {t, b_b, A, X, B}, Y, {t, b, C@1, Z, D}} ->
            balance(b, {t, r, {t, b, A, X, B}, Y, C@1}, Z, D);

        {r, e_e, Y@1, {t, b, C@2, Z@1, D@1}} ->
            balance(b, {t, r, e, Y@1, C@2}, Z@1, D@1);

        {r, {t, b, A@1, X@1, B@1}, Y@2, {t, b_b, C@3, Z@2, D@2}} ->
            balance(b, A@1, X@1, {t, r, B@1, Y@2, {t, b, C@3, Z@2, D@2}});

        {r, {t, b, A@2, X@2, B@2}, Y@3, e_e} ->
            balance(b, A@2, X@2, {t, r, B@2, Y@3, e});

        {b, {t, b_b, A@3, X@3, B@3}, Y@4, {t, b, C@4, Z@3, D@3}} ->
            balance(b_b, {t, r, {t, b, A@3, X@3, B@3}, Y@4, C@4}, Z@3, D@3);

        {b, e_e, Y@5, {t, b, C@5, Z@4, D@4}} ->
            balance(b_b, {t, r, e, Y@5, C@5}, Z@4, D@4);

        {b, {t, b, A@4, X@4, B@4}, Y@6, {t, b_b, C@6, Z@5, D@5}} ->
            balance(b_b, A@4, X@4, {t, r, B@4, Y@6, {t, b, C@6, Z@5, D@5}});

        {b, {t, b, A@5, X@5, B@5}, Y@7, e_e} ->
            balance(b_b, A@5, X@5, {t, r, B@5, Y@7, e});

        {b, {t, b_b, A@6, W, B@6}, X@6, {t, r, {t, b, C@7, Y@8, D@6}, Z@6, E}} ->
            {t,
                b,
                balance(b, {t, r, {t, b, A@6, W, B@6}, X@6, C@7}, Y@8, D@6),
                Z@6,
                E};

        {b, e_e, X@7, {t, r, {t, b, C@8, Y@9, D@7}, Z@7, E@1}} ->
            {t, b, balance(b, {t, r, e, X@7, C@8}, Y@9, D@7), Z@7, E@1};

        {b,
            {t, r, A@7, W@1, {t, b, B@7, X@8, C@9}},
            Y@10,
            {t, b_b, D@8, Z@8, E@2}} ->
            {t,
                b,
                A@7,
                W@1,
                balance(b, B@7, X@8, {t, r, C@9, Y@10, {t, b, D@8, Z@8, E@2}})};

        {b, {t, r, A@8, W@2, {t, b, B@8, X@9, C@10}}, Y@11, e_e} ->
            {t, b, A@8, W@2, balance(b, B@8, X@9, {t, r, C@10, Y@11, e})};

        {C@11, A@9, X@10, B@9} ->
            {t, C@11, A@9, X@10, B@9}
    end.

-file("src/gleamy/red_black_tree_set.gleam", 176).
-spec min_del(node_(LLN)) -> min_del(LLN).
min_del(Node) ->
    case Node of
        {t, r, e, X, e} ->
            {min, X, e};

        {t, b, e, X@1, e} ->
            {min, X@1, e_e};

        {t, b, e, X@2, {t, r, e, Y, e}} ->
            {min, X@2, {t, b, e, Y, e}};

        {t, C, A, X@3, B} ->
            case min_del(A) of
                {min, X1, A1} ->
                    {min, X1, rotate(C, A1, X@3, B)};

                none ->
                    none
            end;

        _ ->
            none
    end.

-file("src/gleamy/red_black_tree_set.gleam", 112).
-spec del(node_(LUB), LLF, fun((LLF, LUB) -> gleam@order:order())) -> node_(LUB).
del(Node, X, Compare) ->
    case Node of
        e ->
            Node;

        {t, r, e, Y, e} ->
            case Compare(X, Y) of
                eq ->
                    e;

                _ ->
                    Node
            end;

        {t, b, e, Y@1, e} ->
            case Compare(X, Y@1) of
                eq ->
                    e_e;

                _ ->
                    Node
            end;

        {t, b, {t, r, e, Y@2, e} = L, Z, e} ->
            case Compare(X, Z) of
                lt ->
                    {t, b, del(L, X, Compare), Z, e};

                gt ->
                    Node;

                eq ->
                    {t, b, e, Y@2, e}
            end;

        {t, C, A, Y@3, B} ->
            case Compare(X, Y@3) of
                lt ->
                    rotate(C, del(A, X, Compare), Y@3, B);

                gt ->
                    rotate(C, A, Y@3, del(B, X, Compare));

                eq ->
                    case min_del(B) of
                        {min, Y1, B1} ->
                            rotate(C, A, Y1, B1);

                        none ->
                            e
                    end
            end;

        _ ->
            Node
    end.

-file("src/gleamy/red_black_tree_set.gleam", 48).
?DOC(
    " Removes an element from the set, if it exists.\n"
    " Time complexity: O(log n)\n"
).
-spec delete(set(LKD), LKD) -> set(LKD).
delete(Tree, Key) ->
    {set,
        del(redden(erlang:element(2, Tree)), Key, erlang:element(3, Tree)),
        erlang:element(3, Tree)}.

-file("src/gleamy/red_black_tree_set.gleam", 190).
-spec do_find(node_(LUS), LLQ, fun((LLQ, LUS) -> gleam@order:order())) -> {ok,
        LUS} |
    {error, nil}.
do_find(Node, Key, Compare) ->
    case Node of
        {t, _, L, K, R} ->
            case Compare(Key, K) of
                lt ->
                    do_find(L, Key, Compare);

                gt ->
                    do_find(R, Key, Compare);

                eq ->
                    {ok, K}
            end;

        _ ->
            {error, nil}
    end.

-file("src/gleamy/red_black_tree_set.gleam", 54).
?DOC(
    " Searches for an element in the set and returns it if found.\n"
    " Time complexity: O(log n)\n"
).
-spec find(set(LKG), LKG) -> {ok, LKG} | {error, nil}.
find(Tree, Key) ->
    do_find(erlang:element(2, Tree), Key, erlang:element(3, Tree)).

-file("src/gleamy/red_black_tree_set.gleam", 202).
-spec do_fold(node_(LUY), LVB, fun((LVB, LUY) -> LVB)) -> LVB.
do_fold(Node, Acc, Fun) ->
    case Node of
        {t, _, R, V, L} ->
            Acc@1 = do_fold(R, Acc, Fun),
            Acc@2 = Fun(Acc@1, V),
            Acc@3 = do_fold(L, Acc@2, Fun),
            Acc@3;

        _ ->
            Acc
    end.

-file("src/gleamy/red_black_tree_set.gleam", 61).
?DOC(
    " Applies a function to every element in the set, accumulating\n"
    " the results with the provided initial accumulator value.\n"
    " Time complexity: O(n)\n"
).
-spec fold(set(LKK), LKM, fun((LKM, LKK) -> LKM)) -> LKM.
fold(Tree, Acc, Fun) ->
    do_fold(erlang:element(2, Tree), Acc, Fun).

-file("src/gleamy/red_black_tree_set.gleam", 214).
-spec do_foldr(node_(LVG), LVJ, fun((LVJ, LVG) -> LVJ)) -> LVJ.
do_foldr(Node, Acc, Fun) ->
    case Node of
        {t, _, R, V, L} ->
            Acc@1 = do_foldr(L, Acc, Fun),
            Acc@2 = Fun(Acc@1, V),
            Acc@3 = do_foldr(R, Acc@2, Fun),
            Acc@3;

        _ ->
            Acc
    end.

-file("src/gleamy/red_black_tree_set.gleam", 68).
?DOC(
    " Applies a function to every element in set, accumulating the results with\n"
    " the provided initial accumulator value, but in reverse order.\n"
    " Time complexity: O(n)\n"
).
-spec foldr(set(LKN), LKP, fun((LKP, LKN) -> LKP)) -> LKP.
foldr(Tree, Acc, Fun) ->
    do_foldr(erlang:element(2, Tree), Acc, Fun).
