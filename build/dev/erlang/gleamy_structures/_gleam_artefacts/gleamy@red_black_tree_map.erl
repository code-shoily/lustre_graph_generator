-module(gleamy@red_black_tree_map).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/gleamy/red_black_tree_map.gleam").
-export([new/1, clear/1, insert/3, delete/2, find/2, larger/2, smaller/2, fold/3, foldr/3]).
-export_type([color/0, node_/2, map_/2, min_del/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides an implementation of a red-black tree map, a self-balancing\n"
    " binary search tree data structure that maintains a balanced shape which ensures\n"
    " tree operations stay efficient.\n"
    " It associates keys with values, where each key is unique and ordered according\n"
    " to the comparison function.\n"
).

-type color() :: r | b | b_b.

-type node_(JXV, JXW) :: e |
    e_e |
    {t, color(), node_(JXV, JXW), {JXV, JXW}, node_(JXV, JXW)}.

-opaque map_(JXX, JXY) :: {map,
        node_(JXX, JXY),
        fun((JXX, JXX) -> gleam@order:order())}.

-type min_del(JXZ, JYA) :: {min, {JXZ, JYA}, node_(JXZ, JYA)} | none.

-file("src/gleamy/red_black_tree_map.gleam", 29).
?DOC(" Creates a new empty map with the provided comparison function for keys.\n").
-spec new(fun((JYB, JYB) -> gleam@order:order())) -> map_(JYB, any()).
new(Compare) ->
    {map, e, Compare}.

-file("src/gleamy/red_black_tree_map.gleam", 35).
?DOC(
    " Removes all elements from the map, resulting in an empty map.\n"
    " Time complexity: O(1)\n"
).
-spec clear(map_(JYF, JYG)) -> map_(JYF, JYG).
clear(Tree) ->
    {map, e, erlang:element(3, Tree)}.

-file("src/gleamy/red_black_tree_map.gleam", 108).
-spec blacken(node_(KAF, KAG)) -> node_(KAF, KAG).
blacken(Node) ->
    case Node of
        {t, r, {t, r, _, _, _} = L, Y, C} ->
            {t, b, L, Y, C};

        {t, r, K, X, {t, r, _, _, _} = R} ->
            {t, b, K, X, R};

        T ->
            T
    end.

-file("src/gleamy/red_black_tree_map.gleam", 116).
-spec balance(color(), node_(KAL, KAM), {KAL, KAM}, node_(KAL, KAM)) -> node_(KAL, KAM).
balance(C, L, V, R) ->
    case {C, L, V, R} of
        {b, {t, r, {t, r, K, X, B}, Y, C@1}, Z, D} ->
            {t, r, {t, b, K, X, B}, Y, {t, b, C@1, Z, D}};

        {b, {t, r, K@1, X@1, {t, r, B@1, Y@1, C@2}}, Z@1, D@1} ->
            {t, r, {t, b, K@1, X@1, B@1}, Y@1, {t, b, C@2, Z@1, D@1}};

        {b, K@2, X@2, {t, r, {t, r, B@2, Y@2, C@3}, Z@2, D@2}} ->
            {t, r, {t, b, K@2, X@2, B@2}, Y@2, {t, b, C@3, Z@2, D@2}};

        {b, K@3, X@3, {t, r, B@3, Y@3, {t, r, C@4, Z@3, D@3}}} ->
            {t, r, {t, b, K@3, X@3, B@3}, Y@3, {t, b, C@4, Z@3, D@3}};

        {b_b, K@4, X@4, {t, r, {t, r, B@4, Y@4, C@5}, Z@4, D@4}} ->
            {t, b, {t, b, K@4, X@4, B@4}, Y@4, {t, b, C@5, Z@4, D@4}};

        {b_b, {t, r, K@5, X@5, {t, r, B@5, Y@5, C@6}}, Z@5, D@5} ->
            {t, b, {t, b, K@5, X@5, B@5}, Y@5, {t, b, C@6, Z@5, D@5}};

        {C@7, K@6, X@6, B@6} ->
            {t, C@7, K@6, X@6, B@6}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 95).
-spec ins(node_(JZZ, KAA), {JZZ, KAA}, fun((JZZ, JZZ) -> gleam@order:order())) -> node_(JZZ, KAA).
ins(Node, X, Compare) ->
    case Node of
        e ->
            {t, r, e, X, e};

        {t, C, K, Y, B} ->
            case Compare(erlang:element(1, X), erlang:element(1, Y)) of
                lt ->
                    balance(C, ins(K, X, Compare), Y, B);

                gt ->
                    balance(C, K, Y, ins(B, X, Compare));

                eq ->
                    {t, C, K, X, B}
            end;

        _ ->
            Node
    end.

-file("src/gleamy/red_black_tree_map.gleam", 43).
?DOC(
    " Inserts a new key-value pair into the map.\n"
    " If the key already exists, its associated value is updated with the new value.\n"
    " Time complexity: O(log n)\n"
).
-spec insert(map_(JYL, JYM), JYL, JYM) -> map_(JYL, JYM).
insert(Tree, Key, Value) ->
    {map,
        blacken(
            ins(erlang:element(2, Tree), {Key, Value}, erlang:element(3, Tree))
        ),
        erlang:element(3, Tree)}.

-file("src/gleamy/red_black_tree_map.gleam", 128).
-spec redden(node_(KAT, KAU)) -> node_(KAT, KAU).
redden(Node) ->
    case Node of
        {t, b, {t, b, _, _, _} = L, Y, {t, b, _, _, _} = R} ->
            {t, r, L, Y, R};

        T ->
            T
    end.

-file("src/gleamy/red_black_tree_map.gleam", 168).
-spec rotate(color(), node_(KBF, KBG), {KBF, KBG}, node_(KBF, KBG)) -> node_(KBF, KBG).
rotate(C, L, V, R) ->
    case {C, L, V, R} of
        {r, {t, b_b, K, X, B}, Y, {t, b, C@1, Z, D}} ->
            balance(b, {t, r, {t, b, K, X, B}, Y, C@1}, Z, D);

        {r, e_e, Y@1, {t, b, C@2, Z@1, D@1}} ->
            balance(b, {t, r, e, Y@1, C@2}, Z@1, D@1);

        {r, {t, b, K@1, X@1, B@1}, Y@2, {t, b_b, C@3, Z@2, D@2}} ->
            balance(b, K@1, X@1, {t, r, B@1, Y@2, {t, b, C@3, Z@2, D@2}});

        {r, {t, b, K@2, X@2, B@2}, Y@3, e_e} ->
            balance(b, K@2, X@2, {t, r, B@2, Y@3, e});

        {b, {t, b_b, K@3, X@3, B@3}, Y@4, {t, b, C@4, Z@3, D@3}} ->
            balance(b_b, {t, r, {t, b, K@3, X@3, B@3}, Y@4, C@4}, Z@3, D@3);

        {b, e_e, Y@5, {t, b, C@5, Z@4, D@4}} ->
            balance(b_b, {t, r, e, Y@5, C@5}, Z@4, D@4);

        {b, {t, b, K@4, X@4, B@4}, Y@6, {t, b_b, C@6, Z@5, D@5}} ->
            balance(b_b, K@4, X@4, {t, r, B@4, Y@6, {t, b, C@6, Z@5, D@5}});

        {b, {t, b, K@5, X@5, B@5}, Y@7, e_e} ->
            balance(b_b, K@5, X@5, {t, r, B@5, Y@7, e});

        {b, {t, b_b, K@6, W, B@6}, X@6, {t, r, {t, b, C@7, Y@8, D@6}, Z@6, E}} ->
            {t,
                b,
                balance(b, {t, r, {t, b, K@6, W, B@6}, X@6, C@7}, Y@8, D@6),
                Z@6,
                E};

        {b, e_e, X@7, {t, r, {t, b, C@8, Y@9, D@7}, Z@7, E@1}} ->
            {t, b, balance(b, {t, r, e, X@7, C@8}, Y@9, D@7), Z@7, E@1};

        {b,
            {t, r, K@7, W@1, {t, b, B@7, X@8, C@9}},
            Y@10,
            {t, b_b, D@8, Z@8, E@2}} ->
            {t,
                b,
                K@7,
                W@1,
                balance(b, B@7, X@8, {t, r, C@9, Y@10, {t, b, D@8, Z@8, E@2}})};

        {b, {t, r, K@8, W@2, {t, b, B@8, X@9, C@10}}, Y@11, e_e} ->
            {t, b, K@8, W@2, balance(b, B@8, X@9, {t, r, C@10, Y@11, e})};

        {C@11, K@9, X@10, B@9} ->
            {t, C@11, K@9, X@10, B@9}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 199).
-spec min_del(node_(KBN, KBO)) -> min_del(KBN, KBO).
min_del(Node) ->
    case Node of
        {t, r, e, X, e} ->
            {min, X, e};

        {t, b, e, X@1, e} ->
            {min, X@1, e_e};

        {t, b, e, X@2, {t, r, e, Y, e}} ->
            {min, X@2, {t, b, e, Y, e}};

        {t, C, K, X@3, B} ->
            case min_del(K) of
                {min, X1, A1} ->
                    {min, X1, rotate(C, A1, X@3, B)};

                none ->
                    none
            end;

        _ ->
            none
    end.

-file("src/gleamy/red_black_tree_map.gleam", 135).
-spec del(node_(KAZ, KBA), KAZ, fun((KAZ, KAZ) -> gleam@order:order())) -> node_(KAZ, KBA).
del(Node, X, Compare) ->
    case Node of
        e ->
            Node;

        {t, r, e, Y, e} ->
            case Compare(X, erlang:element(1, Y)) of
                eq ->
                    e;

                _ ->
                    Node
            end;

        {t, b, e, Y@1, e} ->
            case Compare(X, erlang:element(1, Y@1)) of
                eq ->
                    e_e;

                _ ->
                    Node
            end;

        {t, b, {t, r, e, Y@2, e} = L, Z, e} ->
            case Compare(X, erlang:element(1, Z)) of
                lt ->
                    {t, b, del(L, X, Compare), Z, e};

                gt ->
                    Node;

                eq ->
                    {t, b, e, Y@2, e}
            end;

        {t, C, K, Y@3, B} ->
            case Compare(X, erlang:element(1, Y@3)) of
                lt ->
                    rotate(C, del(K, X, Compare), Y@3, B);

                gt ->
                    rotate(C, K, Y@3, del(B, X, Compare));

                eq ->
                    case min_del(B) of
                        {min, Y1, B1} ->
                            rotate(C, K, Y1, B1);

                        none ->
                            e
                    end
            end;

        _ ->
            Node
    end.

-file("src/gleamy/red_black_tree_map.gleam", 50).
?DOC(
    " Removes a key-value pair from the map, if the key exists.\n"
    " Time complexity: O(log n)\n"
).
-spec delete(map_(JYR, JYS), JYR) -> map_(JYR, JYS).
delete(Tree, Key) ->
    {map,
        del(redden(erlang:element(2, Tree)), Key, erlang:element(3, Tree)),
        erlang:element(3, Tree)}.

-file("src/gleamy/red_black_tree_map.gleam", 213).
-spec do_find(node_(KBT, KBU), KBT, fun((KBT, KBT) -> gleam@order:order())) -> {ok,
        {KBT, KBU}} |
    {error, nil}.
do_find(Node, Key, Compare) ->
    case Node of
        {t, _, L, K, R} ->
            case Compare(Key, erlang:element(1, K)) of
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

-file("src/gleamy/red_black_tree_map.gleam", 56).
?DOC(
    " Searches for a key in the map and returns the associated value if found.\n"
    " Time complexity: O(log n)\n"
).
-spec find(map_(JYX, JYY), JYX) -> {ok, JYY} | {error, nil}.
find(Tree, Key) ->
    case do_find(erlang:element(2, Tree), Key, erlang:element(3, Tree)) of
        {ok, Entry} ->
            {ok, erlang:element(2, Entry)};

        _ ->
            {error, nil}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 229).
-spec do_larger(node_(KBZ, KCA), KBZ, fun((KBZ, KBZ) -> gleam@order:order())) -> {ok,
        {KBZ, KCA}} |
    {error, nil}.
do_larger(Node, Key, Compare) ->
    case Node of
        {t, _, L, K, R} ->
            case Compare(Key, erlang:element(1, K)) of
                lt ->
                    case do_larger(L, Key, Compare) of
                        {ok, X} ->
                            {ok, X};

                        _ ->
                            {ok, K}
                    end;

                _ ->
                    do_larger(R, Key, Compare)
            end;

        _ ->
            {error, nil}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 65).
?DOC(
    " Find the smallest key that is larger than the given key.\n"
    " Time complexity: O(log n)\n"
).
-spec larger(map_(JZD, JZE), JZD) -> {ok, {JZD, JZE}} | {error, nil}.
larger(Tree, Key) ->
    case do_larger(erlang:element(2, Tree), Key, erlang:element(3, Tree)) of
        {ok, Entry} ->
            {ok, Entry};

        _ ->
            {error, nil}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 248).
-spec do_smaller(node_(KCF, KCG), KCF, fun((KCF, KCF) -> gleam@order:order())) -> {ok,
        {KCF, KCG}} |
    {error, nil}.
do_smaller(Node, Key, Compare) ->
    case Node of
        {t, _, L, K, R} ->
            case Compare(Key, erlang:element(1, K)) of
                gt ->
                    case do_smaller(R, Key, Compare) of
                        {ok, X} ->
                            {ok, X};

                        _ ->
                            {ok, K}
                    end;

                _ ->
                    do_smaller(L, Key, Compare)
            end;

        _ ->
            {error, nil}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 74).
?DOC(
    " Find the largest key that is smaller than the given key.\n"
    " Time complexity: O(log n)\n"
).
-spec smaller(map_(JZJ, JZK), JZJ) -> {ok, {JZJ, JZK}} | {error, nil}.
smaller(Tree, Key) ->
    case do_smaller(erlang:element(2, Tree), Key, erlang:element(3, Tree)) of
        {ok, Entry} ->
            {ok, Entry};

        _ ->
            {error, nil}
    end.

-file("src/gleamy/red_black_tree_map.gleam", 267).
-spec do_fold(node_(KCL, KCM), KCP, fun((KCP, KCL, KCM) -> KCP)) -> KCP.
do_fold(Node, Acc, Fun) ->
    case Node of
        {t, _, R, V, L} ->
            Acc@1 = do_fold(R, Acc, Fun),
            Acc@2 = Fun(Acc@1, erlang:element(1, V), erlang:element(2, V)),
            Acc@3 = do_fold(L, Acc@2, Fun),
            Acc@3;

        _ ->
            Acc
    end.

-file("src/gleamy/red_black_tree_map.gleam", 84).
?DOC(
    " Applies a function to every key-value pair in the map, accumulating\n"
    " the results with the provided initial accumulator value.\n"
    " Time complexity: O(n)\n"
).
-spec fold(map_(JZP, JZQ), JZT, fun((JZT, JZP, JZQ) -> JZT)) -> JZT.
fold(Tree, Acc, Fun) ->
    do_fold(erlang:element(2, Tree), Acc, Fun).

-file("src/gleamy/red_black_tree_map.gleam", 279).
-spec do_foldr(node_(KCQ, KCR), KCU, fun((KCU, KCQ, KCR) -> KCU)) -> KCU.
do_foldr(Node, Acc, Fun) ->
    case Node of
        {t, _, R, V, L} ->
            Acc@1 = do_foldr(L, Acc, Fun),
            Acc@2 = Fun(Acc@1, erlang:element(1, V), erlang:element(2, V)),
            Acc@3 = do_foldr(R, Acc@2, Fun),
            Acc@3;

        _ ->
            Acc
    end.

-file("src/gleamy/red_black_tree_map.gleam", 91).
?DOC(
    " Applies a function to every key-value pair in the map, accumulating\n"
    " the results with the provided initial accumulator value, but in reverse order.\n"
    " Time complexity: O(n)\n"
).
-spec foldr(map_(JZU, JZV), JZY, fun((JZY, JZU, JZV) -> JZY)) -> JZY.
foldr(Tree, Acc, Fun) ->
    do_foldr(erlang:element(2, Tree), Acc, Fun).
