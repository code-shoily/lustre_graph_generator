-module(yog@internal@queue).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/queue.gleam").
-export([new/0, push/2, push_list/2, pop/1]).
-export_type([queue/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-type queue(APIF) :: {queue, list(APIF), list(APIF)}.

-file("src/yog/internal/queue.gleam", 21).
?DOC(false).
-spec new() -> queue(any()).
new() ->
    {queue, [], []}.

-file("src/yog/internal/queue.gleam", 26).
?DOC(false).
-spec push(queue(APII), APII) -> queue(APII).
push(Queue, Item) ->
    {queue, erlang:element(2, Queue), [Item | erlang:element(3, Queue)]}.

-file("src/yog/internal/queue.gleam", 34).
?DOC(false).
-spec push_list(queue(APIL), list(APIL)) -> queue(APIL).
push_list(Queue, Items) ->
    {queue,
        erlang:element(2, Queue),
        lists:append(lists:reverse(Items), erlang:element(3, Queue))}.

-file("src/yog/internal/queue.gleam", 42).
?DOC(false).
-spec pop(queue(APIP)) -> {ok, {APIP, queue(APIP)}} | {error, nil}.
pop(Queue) ->
    case erlang:element(2, Queue) of
        [Item | Rest] ->
            {ok, {Item, {queue, Rest, erlang:element(3, Queue)}}};

        [] ->
            case lists:reverse(erlang:element(3, Queue)) of
                [] ->
                    {error, nil};

                [Item@1 | Rest@1] ->
                    {ok, {Item@1, {queue, Rest@1, []}}}
            end
    end.
