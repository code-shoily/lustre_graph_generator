-module(yog@internal@examples@graph_creation).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/graph_creation.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/graph_creation.gleam", 163).
?DOC(false).
-spec count_list(list(any())) -> integer().
count_list(List) ->
    case List of
        [] ->
            0;

        [_ | Rest] ->
            1 + count_list(Rest)
    end.

-file("src/yog/internal/examples/graph_creation.gleam", 157).
?DOC(false).
-spec count_nodes(yog@model:graph(any(), any())) -> integer().
count_nodes(Graph) ->
    _pipe = yog:all_nodes(Graph),
    _pipe@1 = (fun(Nodes) -> Nodes end)(_pipe),
    (fun(Nodes@1) -> count_list(Nodes@1) end)(_pipe@1).

-file("src/yog/internal/examples/graph_creation.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    gleam_stdlib:println(<<"=== Graph Creation Methods ===\n"/utf8>>),
    gleam_stdlib:println(<<"1. Builder Pattern (most flexible)"/utf8>>),
    Graph1 = begin
        _pipe = yog:directed(),
        _pipe@1 = yog:add_node(_pipe, 1, <<"Node A"/utf8>>),
        _pipe@2 = yog:add_node(_pipe@1, 2, <<"Node B"/utf8>>),
        _pipe@3 = yog:add_node(_pipe@2, 3, <<"Node C"/utf8>>),
        _pipe@4 = yog:add_edge(_pipe@3, 1, 2, 10),
        yog:add_edge(_pipe@4, 2, 3, 5)
    end,
    gleam_stdlib:println(
        <<<<"  Built graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph1)))/binary>>/binary,
            " nodes using builder pattern"/utf8>>
    ),
    gleam_stdlib:println(<<"\n2. From Edge List (quick and concise)"/utf8>>),
    Graph2 = yog:from_edges(directed, [{1, 2, 10}, {2, 3, 5}, {1, 3, 15}]),
    gleam_stdlib:println(
        <<<<"  Created graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph2)))/binary>>/binary,
            " nodes from edge list"/utf8>>
    ),
    gleam_stdlib:println(
        <<"\n3. From Unweighted Edges (no weights needed)"/utf8>>
    ),
    Graph3 = yog:from_unweighted_edges(directed, [{1, 2}, {2, 3}, {3, 4}]),
    gleam_stdlib:println(
        <<<<"  Created unweighted graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph3)))/binary>>/binary,
            " nodes"/utf8>>
    ),
    gleam_stdlib:println(
        <<"\n4. From Adjacency List (natural representation)"/utf8>>
    ),
    Graph4 = yog:from_adjacency_list(
        directed,
        [{1, [{2, 10}, {3, 5}]}, {2, [{3, 3}]}]
    ),
    gleam_stdlib:println(
        <<<<"  Created graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph4)))/binary>>/binary,
            " nodes from adjacency list"/utf8>>
    ),
    gleam_stdlib:println(<<"\n5. Simple Edges (default weight 1)"/utf8>>),
    Graph5 = begin
        _pipe@5 = yog:directed(),
        _pipe@6 = yog:add_simple_edge(_pipe@5, 1, 2),
        yog:add_simple_edge(_pipe@6, 2, 3)
    end,
    gleam_stdlib:println(
        <<<<"  Created graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph5)))/binary>>/binary,
            " nodes using simple edges"/utf8>>
    ),
    gleam_stdlib:println(
        <<"\n6. Labeled Builder (use strings as node IDs)"/utf8>>
    ),
    Builder = begin
        _pipe@7 = yog@builder@labeled:directed(),
        _pipe@8 = yog@builder@labeled:add_edge(
            _pipe@7,
            <<"home"/utf8>>,
            <<"work"/utf8>>,
            10
        ),
        _pipe@9 = yog@builder@labeled:add_edge(
            _pipe@8,
            <<"work"/utf8>>,
            <<"gym"/utf8>>,
            5
        ),
        yog@builder@labeled:add_edge(
            _pipe@9,
            <<"home"/utf8>>,
            <<"gym"/utf8>>,
            15
        )
    end,
    Graph6 = yog@builder@labeled:to_graph(Builder),
    gleam_stdlib:println(
        <<<<"  Created labeled graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph6)))/binary>>/binary,
            " nodes"/utf8>>
    ),
    gleam_stdlib:println(
        <<"\n7. Labeled From List (bulk creation with labels)"/utf8>>
    ),
    Builder2 = yog@builder@labeled:from_list(
        directed,
        [{<<"A"/utf8>>, <<"B"/utf8>>, 10},
            {<<"B"/utf8>>, <<"C"/utf8>>, 5},
            {<<"C"/utf8>>, <<"D"/utf8>>, 3}]
    ),
    Graph7 = yog@builder@labeled:to_graph(Builder2),
    gleam_stdlib:println(
        <<<<"  Created labeled graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph7)))/binary>>/binary,
            " nodes from list"/utf8>>
    ),
    gleam_stdlib:println(<<"\n8. Labeled Unweighted From List"/utf8>>),
    Builder3 = yog@builder@labeled:from_unweighted_list(
        directed,
        [{<<"start"/utf8>>, <<"middle"/utf8>>},
            {<<"middle"/utf8>>, <<"end"/utf8>>}]
    ),
    Graph8 = yog@builder@labeled:to_graph(Builder3),
    gleam_stdlib:println(
        <<<<"  Created unweighted labeled graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph8)))/binary>>/binary,
            " nodes"/utf8>>
    ),
    gleam_stdlib:println(
        <<"\n9. Labeled Simple Edges (labels + weight 1)"/utf8>>
    ),
    Builder4 = begin
        _pipe@10 = yog@builder@labeled:directed(),
        _pipe@11 = yog@builder@labeled:add_simple_edge(
            _pipe@10,
            <<"Alice"/utf8>>,
            <<"Bob"/utf8>>
        ),
        _pipe@12 = yog@builder@labeled:add_simple_edge(
            _pipe@11,
            <<"Bob"/utf8>>,
            <<"Carol"/utf8>>
        ),
        yog@builder@labeled:add_simple_edge(
            _pipe@12,
            <<"Carol"/utf8>>,
            <<"Dave"/utf8>>
        )
    end,
    Graph9 = yog@builder@labeled:to_graph(Builder4),
    gleam_stdlib:println(
        <<<<"  Created simple labeled graph with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph9)))/binary>>/binary,
            " nodes"/utf8>>
    ),
    gleam_stdlib:println(<<"\n10. Undirected Graphs (all methods work)"/utf8>>),
    Graph10 = begin
        _pipe@13 = yog:undirected(),
        yog:add_edge(_pipe@13, 1, 2, 5)
    end,
    gleam_stdlib:println(
        <<<<"  Created undirected graph (edges work both ways) with "/utf8,
                (erlang:integer_to_binary(count_nodes(Graph10)))/binary>>/binary,
            " nodes"/utf8>>
    ),
    gleam_stdlib:println(<<"\n=== Summary ==="/utf8>>),
    gleam_stdlib:println(
        <<"• Builder pattern: Most flexible, good for complex graphs"/utf8>>
    ),
    gleam_stdlib:println(<<"• from_edges: Quick creation from edge list"/utf8>>),
    gleam_stdlib:println(
        <<"• from_adjacency_list: Natural for adjacency list data"/utf8>>
    ),
    gleam_stdlib:println(
        <<"• Labeled builder: Use strings/any type as node identifiers"/utf8>>
    ),
    gleam_stdlib:println(
        <<"• from_list variants: Bulk creation with labels"/utf8>>
    ),
    gleam_stdlib:println(
        <<"• Simple/unweighted: Convenient for unit weights or no weights"/utf8>>
    ).
