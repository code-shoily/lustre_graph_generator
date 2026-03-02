-module(gleamy@bimap).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/gleamy/bimap.gleam").
-export([new/0, to_list/1, get_by_key/2, has_key/2, get_by_value/2, has_value/2, delete_by_key/2, delete_by_value/2, insert/3, from_list/1, count/1]).
-export_type([bimap/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " This module provides a simple implementation of a bidirectional map.\n"
    " Each key can have a single value, and each value can have a single key.\n"
    " The bimap is based on Gleam `dict.Dict`s, so ordering is not guaranteed.\n"
).

-opaque bimap(JOS, JOT) :: {bimap,
        gleam@dict:dict(JOS, JOT),
        gleam@dict:dict(JOT, JOS)}.

-file("src/gleamy/bimap.gleam", 15).
?DOC(" Creates a new empty bimap.\n").
-spec new() -> bimap(any(), any()).
new() ->
    {bimap, maps:new(), maps:new()}.

-file("src/gleamy/bimap.gleam", 29).
?DOC(" Converts a bimap into a list of key-value pairs.\n").
-spec to_list(bimap(JPD, JPE)) -> list({JPD, JPE}).
to_list(Bimap) ->
    maps:to_list(erlang:element(2, Bimap)).

-file("src/gleamy/bimap.gleam", 48).
?DOC(" Get a value by its key, if present.\n").
-spec get_by_key(bimap(JPO, JPP), JPO) -> {ok, JPP} | {error, nil}.
get_by_key(Bimap, Key) ->
    gleam_stdlib:map_get(erlang:element(2, Bimap), Key).

-file("src/gleamy/bimap.gleam", 53).
?DOC(" Check if a key exists in the bimap.\n").
-spec has_key(bimap(JPU, any()), JPU) -> boolean().
has_key(Bimap, Key) ->
    gleam@dict:has_key(erlang:element(2, Bimap), Key).

-file("src/gleamy/bimap.gleam", 58).
?DOC(" Get a key by its value, if present.\n").
-spec get_by_value(bimap(JPY, JPZ), JPZ) -> {ok, JPY} | {error, nil}.
get_by_value(Bimap, Value) ->
    gleam_stdlib:map_get(erlang:element(3, Bimap), Value).

-file("src/gleamy/bimap.gleam", 63).
?DOC(" Check if a value exists in the bimap.\n").
-spec has_value(bimap(any(), JQF), JQF) -> boolean().
has_value(Bimap, Value) ->
    gleam@dict:has_key(erlang:element(3, Bimap), Value).

-file("src/gleamy/bimap.gleam", 68).
?DOC(" Delete a key-value pair from the bimap by key.\n").
-spec delete_by_key(bimap(JQI, JQJ), JQI) -> bimap(JQI, JQJ).
delete_by_key(Bimap, Key) ->
    case gleam_stdlib:map_get(erlang:element(2, Bimap), Key) of
        {error, _} ->
            Bimap;

        {ok, Value} ->
            From_key = gleam@dict:delete(erlang:element(2, Bimap), Key),
            To_key = gleam@dict:delete(erlang:element(3, Bimap), Value),
            {bimap, From_key, To_key}
    end.

-file("src/gleamy/bimap.gleam", 80).
?DOC(" Delete a key-value pair from the bimap by value.\n").
-spec delete_by_value(bimap(JQO, JQP), JQP) -> bimap(JQO, JQP).
delete_by_value(Bimap, Value) ->
    case gleam_stdlib:map_get(erlang:element(3, Bimap), Value) of
        {error, _} ->
            Bimap;

        {ok, Key} ->
            From_key = gleam@dict:delete(erlang:element(2, Bimap), Key),
            To_key = gleam@dict:delete(erlang:element(3, Bimap), Value),
            {bimap, From_key, To_key}
    end.

-file("src/gleamy/bimap.gleam", 35).
?DOC(
    " Insert a new key-value pair into the bimap. If either the key or value\n"
    " already exists, the existing pair is removed before inserting the new one.\n"
).
-spec insert(bimap(JPI, JPJ), JPI, JPJ) -> bimap(JPI, JPJ).
insert(Bimap, Key, Value) ->
    Cleaned = begin
        _pipe = Bimap,
        _pipe@1 = delete_by_key(_pipe, Key),
        delete_by_value(_pipe@1, Value)
    end,
    {bimap,
        gleam@dict:insert(erlang:element(2, Cleaned), Key, Value),
        gleam@dict:insert(erlang:element(3, Cleaned), Value, Key)}.

-file("src/gleamy/bimap.gleam", 20).
?DOC(" Create a bimap from list entries.\n").
-spec from_list(list({JOY, JOZ})) -> bimap(JOY, JOZ).
from_list(Members) ->
    _pipe = Members,
    gleam@list:fold(
        _pipe,
        new(),
        fun(Bimap, Member) ->
            {Key, Value} = Member,
            insert(Bimap, Key, Value)
        end
    ).

-file("src/gleamy/bimap.gleam", 92).
?DOC(" Get the count of key-value pairs in the bimap.\n").
-spec count(bimap(any(), any())) -> integer().
count(Bimap) ->
    maps:size(erlang:element(2, Bimap)).
