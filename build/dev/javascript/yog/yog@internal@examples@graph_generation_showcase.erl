-module(yog@internal@examples@graph_generation_showcase).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/graph_generation_showcase.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/graph_generation_showcase.gleam", 113).
?DOC(false).
-spec list_length(list(any())) -> integer().
list_length(List) ->
    case List of
        [] ->
            0;

        [_ | Rest] ->
            1 + list_length(Rest)
    end.

-file("src/yog/internal/examples/graph_generation_showcase.gleam", 120).
?DOC(false).
-spec list_fold(list(MQV), MQX, fun((MQX, MQV) -> MQX)) -> MQX.
list_fold(List, Initial, Fun) ->
    case List of
        [] ->
            Initial;

        [X | Rest] ->
            list_fold(Rest, Fun(Initial, X), Fun)
    end.

-file("src/yog/internal/examples/graph_generation_showcase.gleam", 105).
?DOC(false).
-spec count_edges(yog@model:graph(nil, integer())) -> integer().
count_edges(Graph) ->
    _pipe = yog@model:all_nodes(Graph),
    list_fold(
        _pipe,
        0,
        fun(Count, Node) ->
            Successors = yog@model:successors(Graph, Node),
            Count + list_length(Successors)
        end
    ).

-file("src/yog/internal/examples/graph_generation_showcase.gleam", 91).
?DOC(false).
-spec print_graph_stats(binary(), yog@model:graph(nil, integer())) -> nil.
print_graph_stats(_, Graph) ->
    Node_count = begin
        _pipe = yog@model:all_nodes(Graph),
        list_length(_pipe)
    end,
    Edge_count = count_edges(Graph),
    Display_edges = case erlang:element(2, Graph) of
        undirected ->
            Edge_count div 2;

        directed ->
            Edge_count
    end,
    gleam_stdlib:println(
        <<"  Nodes: "/utf8, (erlang:integer_to_binary(Node_count))/binary>>
    ),
    gleam_stdlib:println(
        <<"  Edges: "/utf8, (erlang:integer_to_binary(Display_edges))/binary>>
    ).

-file("src/yog/internal/examples/graph_generation_showcase.gleam", 6).
?DOC(false).
-spec main() -> nil.
main() ->
    gleam_stdlib:println(<<"=== Graph Generation Showcase ===\n"/utf8>>),
    gleam_stdlib:println(<<"1. Complete Graph K_5"/utf8>>),
    K5 = fun yog@generators@classic:complete/1(5),
    print_graph_stats(<<"K_5"/utf8>>, K5),
    gleam_stdlib:println(<<"  Every node connected to every other node"/utf8>>),
    gleam_stdlib:println(
        <<"  Perfect for studying maximum connectivity\n"/utf8>>
    ),
    gleam_stdlib:println(<<"2. Cycle Graph C_6"/utf8>>),
    C6 = fun yog@generators@classic:cycle/1(6),
    print_graph_stats(<<"C_6"/utf8>>, C6),
    gleam_stdlib:println(<<"  Nodes form a ring: 0-1-2-3-4-5-0"/utf8>>),
    gleam_stdlib:println(
        <<"  Perfect for studying circular structures\n"/utf8>>
    ),
    gleam_stdlib:println(<<"3. Path Graph P_5"/utf8>>),
    P5 = fun yog@generators@classic:path/1(5),
    print_graph_stats(<<"P_5"/utf8>>, P5),
    gleam_stdlib:println(<<"  Linear chain: 0-1-2-3-4"/utf8>>),
    gleam_stdlib:println(
        <<"  Perfect for studying sequential processes\n"/utf8>>
    ),
    gleam_stdlib:println(<<"4. Star Graph S_6"/utf8>>),
    S6 = fun yog@generators@classic:star/1(6),
    print_graph_stats(<<"S_6"/utf8>>, S6),
    gleam_stdlib:println(<<"  Central node (0) connected to all others"/utf8>>),
    gleam_stdlib:println(
        <<"  Perfect for studying hub-and-spoke networks\n"/utf8>>
    ),
    gleam_stdlib:println(<<"5. Wheel Graph W_6"/utf8>>),
    W6 = fun yog@generators@classic:wheel/1(6),
    print_graph_stats(<<"W_6"/utf8>>, W6),
    gleam_stdlib:println(<<"  Cycle with central hub"/utf8>>),
    gleam_stdlib:println(<<"  Perfect for studying hybrid topologies\n"/utf8>>),
    gleam_stdlib:println(<<"6. Complete Bipartite K_{3,3}"/utf8>>),
    K33 = fun yog@generators@classic:complete_bipartite/2(3, 3),
    print_graph_stats(<<"K_3,3"/utf8>>, K33),
    gleam_stdlib:println(<<"  Two groups: nodes 0-2 and 3-5"/utf8>>),
    gleam_stdlib:println(
        <<"  Every node in one group connected to all in other"/utf8>>
    ),
    gleam_stdlib:println(<<"  Perfect for studying matching problems\n"/utf8>>),
    gleam_stdlib:println(<<"7. Binary Tree (depth 3)"/utf8>>),
    Tree = fun yog@generators@classic:binary_tree/1(3),
    print_graph_stats(<<"Binary Tree"/utf8>>, Tree),
    gleam_stdlib:println(<<"  Complete binary tree with 15 nodes"/utf8>>),
    gleam_stdlib:println(<<"  Root at 0, children at 2i+1 and 2i+2"/utf8>>),
    gleam_stdlib:println(
        <<"  Perfect for studying hierarchical structures\n"/utf8>>
    ),
    gleam_stdlib:println(<<"8. 2D Grid (3x4)"/utf8>>),
    Grid = fun yog@generators@classic:grid_2d/2(3, 4),
    print_graph_stats(<<"3x4 Grid"/utf8>>, Grid),
    gleam_stdlib:println(<<"  Rectangular lattice with 12 nodes"/utf8>>),
    gleam_stdlib:println(<<"  Perfect for studying spatial problems\n"/utf8>>),
    gleam_stdlib:println(<<"9. Petersen Graph"/utf8>>),
    Petersen = fun yog@generators@classic:petersen/0(),
    print_graph_stats(<<"Petersen"/utf8>>, Petersen),
    gleam_stdlib:println(<<"  Famous 3-regular graph with 10 nodes"/utf8>>),
    gleam_stdlib:println(
        <<"  Perfect for counterexamples in graph theory\n"/utf8>>
    ),
    gleam_stdlib:println(<<"=== Use Cases ==="/utf8>>),
    gleam_stdlib:println(<<"• Testing: Graphs with known properties"/utf8>>),
    gleam_stdlib:println(<<"• Benchmarking: Graphs of various sizes"/utf8>>),
    gleam_stdlib:println(
        <<"• Education: Classic structures for learning"/utf8>>
    ),
    gleam_stdlib:println(<<"• Prototyping: Quick graph creation\n"/utf8>>),
    gleam_stdlib:println(<<"=== Directed vs Undirected ==="/utf8>>),
    Directed_k4 = fun yog@generators@classic:complete_with_type/2(4, directed),
    Undirected_k4 = fun yog@generators@classic:complete_with_type/2(
        4,
        undirected
    ),
    gleam_stdlib:println(
        <<"Directed K_4 edges: "/utf8,
            (erlang:integer_to_binary(count_edges(Directed_k4)))/binary>>
    ),
    gleam_stdlib:println(
        <<"Undirected K_4 edges: "/utf8,
            (erlang:integer_to_binary(count_edges(Undirected_k4) div 2))/binary>>
    ),
    gleam_stdlib:println(<<"(Directed has edges in both directions)"/utf8>>).
