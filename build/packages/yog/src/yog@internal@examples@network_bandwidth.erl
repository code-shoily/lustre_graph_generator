-module(yog@internal@examples@network_bandwidth).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/network_bandwidth.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/network_bandwidth.gleam", 103).
?DOC(false).
-spec list_to_string(list(integer())) -> binary().
list_to_string(Nodes) ->
    case Nodes of
        [] ->
            <<""/utf8>>;

        [Node] ->
            <<"  Node "/utf8, (erlang:integer_to_binary(Node))/binary>>;

        [First | Rest] ->
            <<<<<<"  Node "/utf8, (erlang:integer_to_binary(First))/binary>>/binary,
                    "\n"/utf8>>/binary,
                (list_to_string(Rest))/binary>>
    end.

-file("src/yog/internal/examples/network_bandwidth.gleam", 91).
?DOC(false).
-spec print_node_list(list(integer())) -> nil.
print_node_list(Nodes) ->
    case Nodes of
        [] ->
            gleam_stdlib:println(<<"  (none)"/utf8>>);

        _ ->
            _pipe = Nodes,
            _pipe@1 = list_to_string(_pipe),
            gleam_stdlib:println(_pipe@1),
            nil
    end.

-file("src/yog/internal/examples/network_bandwidth.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    gleam_stdlib:println(<<"=== Network Bandwidth Allocation ===\n"/utf8>>),
    Network = begin
        _pipe = yog:directed(),
        _pipe@1 = yog:add_edge(_pipe, 0, 1, 20),
        _pipe@2 = yog:add_edge(_pipe@1, 0, 2, 30),
        _pipe@3 = yog:add_edge(_pipe@2, 1, 2, 10),
        _pipe@4 = yog:add_edge(_pipe@3, 1, 3, 15),
        _pipe@5 = yog:add_edge(_pipe@4, 2, 3, 25),
        _pipe@6 = yog:add_edge(_pipe@5, 2, 4, 20),
        _pipe@7 = yog:add_edge(_pipe@6, 3, 5, 30),
        yog:add_edge(_pipe@7, 4, 5, 15)
    end,
    gleam_stdlib:println(<<"Network topology:"/utf8>>),
    gleam_stdlib:println(<<"  Source (0) -> RouterA (1): 20 Mbps"/utf8>>),
    gleam_stdlib:println(<<"  Source (0) -> RouterB (2): 30 Mbps"/utf8>>),
    gleam_stdlib:println(<<"  RouterA (1) -> RouterC (3): 15 Mbps"/utf8>>),
    gleam_stdlib:println(<<"  RouterB (2) -> RouterC (3): 25 Mbps"/utf8>>),
    gleam_stdlib:println(<<"  RouterB (2) -> RouterD (4): 20 Mbps"/utf8>>),
    gleam_stdlib:println(<<"  RouterC (3) -> Dest (5): 30 Mbps"/utf8>>),
    gleam_stdlib:println(<<"  RouterD (4) -> Dest (5): 15 Mbps\n"/utf8>>),
    Result = yog@max_flow:edmonds_karp(
        Network,
        0,
        5,
        0,
        fun gleam@int:add/2,
        fun(A, B) -> A - B end,
        fun gleam@int:compare/2,
        fun gleam@int:min/2
    ),
    gleam_stdlib:println(
        <<<<"Maximum bandwidth from source to destination: "/utf8,
                (erlang:integer_to_binary(erlang:element(2, Result)))/binary>>/binary,
            " Mbps"/utf8>>
    ),
    Cut = yog@max_flow:min_cut(Result, 0, fun gleam@int:compare/2),
    gleam_stdlib:println(<<"\n=== Minimum Cut Analysis ==="/utf8>>),
    gleam_stdlib:println(
        <<"This identifies the bottleneck that limits network capacity.\n"/utf8>>
    ),
    gleam_stdlib:println(<<"Source side nodes:"/utf8>>),
    _pipe@8 = gleam@set:to_list(erlang:element(2, Cut)),
    print_node_list(_pipe@8),
    gleam_stdlib:println(<<"\nSink side nodes:"/utf8>>),
    _pipe@9 = gleam@set:to_list(erlang:element(3, Cut)),
    print_node_list(_pipe@9),
    gleam_stdlib:println(
        <<"\nThe edges crossing from source side to sink side form the bottleneck."/utf8>>
    ),
    gleam_stdlib:println(
        <<<<"Their total capacity ("/utf8,
                (erlang:integer_to_binary(erlang:element(2, Result)))/binary>>/binary,
            " Mbps) equals the maximum flow."/utf8>>
    ),
    gleam_stdlib:println(
        <<"\nThis tells us which links to upgrade to increase network capacity."/utf8>>
    ).
