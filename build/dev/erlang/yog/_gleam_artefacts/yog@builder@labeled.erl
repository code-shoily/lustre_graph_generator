-module(yog@builder@labeled).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/builder/labeled.gleam").
-export([new/1, directed/0, undirected/0, ensure_node/2, add_node/2, add_edge/4, add_unweighted_edge/3, add_simple_edge/3, get_id/2, to_graph/1, from_list/2, from_unweighted_list/2, all_labels/1, successors/2, predecessors/2]).
-export_type([builder/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " A builder for creating graphs using arbitrary labels instead of integer IDs.\n"
    "\n"
    " This module provides a convenient way to build graphs when your nodes are\n"
    " naturally identified by strings or other types, rather than integers. The\n"
    " builder maintains a mapping from labels to internal integer IDs and\n"
    " converts to a standard `Graph` when needed.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/labeled\n"
    " import yog/pathfinding\n"
    " import gleam/int\n"
    "\n"
    " pub fn main() {\n"
    "   // Build a graph using string labels\n"
    "   let builder =\n"
    "     labeled.directed()\n"
    "     |> labeled.add_edge(\"home\", \"work\", 10)\n"
    "     |> labeled.add_edge(\"work\", \"gym\", 5)\n"
    "     |> labeled.add_edge(\"home\", \"gym\", 12)\n"
    "\n"
    "   // Convert to a Graph to use with algorithms\n"
    "   let graph = labeled.to_graph(builder)\n"
    "\n"
    "   // Get the node IDs for the labels we care about\n"
    "   let assert Ok(home_id) = labeled.get_id(builder, \"home\")\n"
    "   let assert Ok(gym_id) = labeled.get_id(builder, \"gym\")\n"
    "\n"
    "   // Now use standard graph algorithms\n"
    "   case pathfinding.shortest_path(\n"
    "     in: graph,\n"
    "     from: home_id,\n"
    "     to: gym_id,\n"
    "     with_zero: 0,\n"
    "     with_add: int.add,\n"
    "     with_compare: int.compare,\n"
    "   ) {\n"
    "     Ok(path) -> // Path found!\n"
    "     Error(_) -> // No path\n"
    "   }\n"
    " }\n"
    " ```\n"
).

-type builder(ANUD, ANUE) :: {builder,
        yog@model:graph(ANUD, ANUE),
        gleam@dict:dict(ANUD, integer()),
        integer()}.

-file("src/yog/builder/labeled.gleam", 75).
?DOC(
    " Creates a new empty labeled graph builder.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/labeled\n"
    " import yog/model.{Directed}\n"
    "\n"
    " let builder = labeled.new(Directed)\n"
    " ```\n"
).
-spec new(yog@model:graph_type()) -> builder(any(), any()).
new(Graph_type) ->
    {builder, yog@model:new(Graph_type), maps:new(), 0}.

-file("src/yog/builder/labeled.gleam", 92).
?DOC(
    " Creates a new empty labeled directed graph builder.\n"
    "\n"
    " This is a convenience function equivalent to `labeled.new(Directed)`.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/labeled\n"
    "\n"
    " let builder =\n"
    "   labeled.directed()\n"
    "   |> labeled.add_edge(\"home\", \"work\", 10)\n"
    " ```\n"
).
-spec directed() -> builder(any(), any()).
directed() ->
    {builder, yog@model:new(directed), maps:new(), 0}.

-file("src/yog/builder/labeled.gleam", 109).
?DOC(
    " Creates a new empty labeled undirected graph builder.\n"
    "\n"
    " This is a convenience function equivalent to `labeled.new(Undirected)`.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/labeled\n"
    "\n"
    " let builder =\n"
    "   labeled.undirected()\n"
    "   |> labeled.add_edge(\"A\", \"B\", 5)\n"
    " ```\n"
).
-spec undirected() -> builder(any(), any()).
undirected() ->
    {builder, yog@model:new(undirected), maps:new(), 0}.

-file("src/yog/builder/labeled.gleam", 129).
?DOC(
    " Gets or creates a node for the given label, returning the builder and node ID.\n"
    "\n"
    " If a node with this label already exists, returns its ID without modification.\n"
    " If it doesn't exist, creates a new node with the label as its data.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let #(builder, node_a) = labeled.ensure_node(builder, \"Node A\")\n"
    " let #(builder, node_b) = labeled.ensure_node(builder, \"Node B\")\n"
    " // Now you have the IDs and can use them with lower-level operations\n"
    " ```\n"
).
-spec ensure_node(builder(ANUR, ANUS), ANUR) -> {builder(ANUR, ANUS), integer()}.
ensure_node(Builder, Label) ->
    case gleam_stdlib:map_get(erlang:element(3, Builder), Label) of
        {ok, Id} ->
            {Builder, Id};

        {error, _} ->
            Id@1 = erlang:element(4, Builder),
            New_graph = yog@model:add_node(
                erlang:element(2, Builder),
                Id@1,
                Label
            ),
            New_mapping = gleam@dict:insert(
                erlang:element(3, Builder),
                Label,
                Id@1
            ),
            {{builder, New_graph, New_mapping, Id@1 + 1}, Id@1}
    end.

-file("src/yog/builder/labeled.gleam", 160).
?DOC(
    " Adds a node with the given label explicitly.\n"
    "\n"
    " If a node with this label already exists, its data will be replaced.\n"
    " This is useful when you want to add nodes before adding edges.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " builder\n"
    " |> labeled.add_node(\"Node A\")\n"
    " |> labeled.add_node(\"Node B\")\n"
    " |> labeled.add_edge(\"Node A\", \"Node B\", 5)\n"
    " ```\n"
).
-spec add_node(builder(ANUX, ANUY), ANUX) -> builder(ANUX, ANUY).
add_node(Builder, Label) ->
    {New_builder, _} = ensure_node(Builder, Label),
    New_builder.

-file("src/yog/builder/labeled.gleam", 178).
?DOC(
    " Adds an edge between two labeled nodes.\n"
    "\n"
    " If either node doesn't exist, it will be created automatically.\n"
    " For directed graphs, adds a single edge from `from` to `to`.\n"
    " For undirected graphs, adds edges in both directions.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " builder\n"
    " |> labeled.add_edge(from: \"A\", to: \"B\", with: 10)\n"
    " |> labeled.add_edge(from: \"B\", to: \"C\", with: 5)\n"
    " ```\n"
).
-spec add_edge(builder(ANVD, ANVE), ANVD, ANVD, ANVE) -> builder(ANVD, ANVE).
add_edge(Builder, Src_label, Dst_label, Weight) ->
    {Builder@1, Src_id} = ensure_node(Builder, Src_label),
    {Builder@2, Dst_id} = ensure_node(Builder@1, Dst_label),
    New_graph = yog@model:add_edge(
        erlang:element(2, Builder@2),
        Src_id,
        Dst_id,
        Weight
    ),
    {builder,
        New_graph,
        erlang:element(3, Builder@2),
        erlang:element(4, Builder@2)}.

-file("src/yog/builder/labeled.gleam", 207).
?DOC(
    " Adds an unweighted edge between two labeled nodes.\n"
    "\n"
    " This is a convenience function for graphs where edges have no meaningful weight.\n"
    " Uses `Nil` as the edge data type. Nodes are created automatically if they don't exist.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/labeled\n"
    "\n"
    " let builder: labeled.Builder(String, Nil) = labeled.directed()\n"
    "   |> labeled.add_unweighted_edge(\"A\", \"B\")\n"
    "   |> labeled.add_unweighted_edge(\"B\", \"C\")\n"
    " ```\n"
).
-spec add_unweighted_edge(builder(ANVJ, nil), ANVJ, ANVJ) -> builder(ANVJ, nil).
add_unweighted_edge(Builder, Src_label, Dst_label) ->
    {Builder@1, Src_id} = ensure_node(Builder, Src_label),
    {Builder@2, Dst_id} = ensure_node(Builder@1, Dst_label),
    New_graph = yog@model:add_edge(
        erlang:element(2, Builder@2),
        Src_id,
        Dst_id,
        nil
    ),
    {builder,
        New_graph,
        erlang:element(3, Builder@2),
        erlang:element(4, Builder@2)}.

-file("src/yog/builder/labeled.gleam", 237).
?DOC(
    " Adds a simple edge with weight 1 between two labeled nodes.\n"
    "\n"
    " This is a convenience function for graphs with integer weights where\n"
    " a default weight of 1 is appropriate (e.g., unweighted graphs, hop counts).\n"
    " Nodes are created automatically if they don't exist.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog/builder/labeled\n"
    "\n"
    " let builder = labeled.directed()\n"
    "   |> labeled.add_simple_edge(\"home\", \"work\")\n"
    "   |> labeled.add_simple_edge(\"work\", \"gym\")\n"
    " // Both edges have weight 1\n"
    " ```\n"
).
-spec add_simple_edge(builder(ANVO, integer()), ANVO, ANVO) -> builder(ANVO, integer()).
add_simple_edge(Builder, Src_label, Dst_label) ->
    {Builder@1, Src_id} = ensure_node(Builder, Src_label),
    {Builder@2, Dst_id} = ensure_node(Builder@1, Dst_label),
    New_graph = yog@model:add_edge(
        erlang:element(2, Builder@2),
        Src_id,
        Dst_id,
        1
    ),
    {builder,
        New_graph,
        erlang:element(3, Builder@2),
        erlang:element(4, Builder@2)}.

-file("src/yog/builder/labeled.gleam", 263).
?DOC(
    " Looks up the internal node ID for a given label.\n"
    "\n"
    " Returns `Ok(id)` if the label exists, `Error(Nil)` if it doesn't.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " case labeled.get_id(builder, \"Node A\") {\n"
    "   Ok(id) -> // Use the ID\n"
    "   Error(_) -> // Label doesn't exist\n"
    " }\n"
    " ```\n"
).
-spec get_id(builder(ANVT, any()), ANVT) -> {ok, integer()} | {error, nil}.
get_id(Builder, Label) ->
    gleam_stdlib:map_get(erlang:element(3, Builder), Label).

-file("src/yog/builder/labeled.gleam", 278).
?DOC(
    " Converts the builder to a standard `Graph`.\n"
    "\n"
    " The resulting graph uses integer IDs internally and stores the labels\n"
    " as node data. This graph can be used with all yog algorithms.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph = labeled.to_graph(builder)\n"
    " // Now use with pathfinding, traversal, etc.\n"
    " ```\n"
).
-spec to_graph(builder(ANVZ, ANWA)) -> yog@model:graph(ANVZ, ANWA).
to_graph(Builder) ->
    erlang:element(2, Builder).

-file("src/yog/builder/labeled.gleam", 289).
?DOC(
    " Creates a labeled graph builder from a list of edges #(src_label, dst_label, weight).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let builder = labeled.from_list(model.Directed, [#(\"A\", \"B\", 10), #(\"B\", \"C\", 5)])\n"
    " ```\n"
).
-spec from_list(yog@model:graph_type(), list({ANWF, ANWF, ANWG})) -> builder(ANWF, ANWG).
from_list(Graph_type, Edges) ->
    gleam@list:fold(
        Edges,
        new(Graph_type),
        fun(B, Edge) ->
            {Src, Dst, Weight} = Edge,
            add_edge(B, Src, Dst, Weight)
        end
    ).

-file("src/yog/builder/labeled.gleam", 306).
?DOC(
    " Creates a labeled graph builder from a list of unweighted edges #(src_label, dst_label).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let builder = labeled.from_unweighted_list(model.Directed, [#(\"A\", \"B\"), #(\"B\", \"C\")])\n"
    " ```\n"
).
-spec from_unweighted_list(yog@model:graph_type(), list({ANWK, ANWK})) -> builder(ANWK, nil).
from_unweighted_list(Graph_type, Edges) ->
    gleam@list:fold(
        Edges,
        new(Graph_type),
        fun(B, Edge) ->
            {Src, Dst} = Edge,
            add_unweighted_edge(B, Src, Dst)
        end
    ).

-file("src/yog/builder/labeled.gleam", 324).
?DOC(
    " Returns all labels that have been added to the builder.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let labels = labeled.all_labels(builder)\n"
    " // [\"Node A\", \"Node B\", \"Node C\"]\n"
    " ```\n"
).
-spec all_labels(builder(ANWO, any())) -> list(ANWO).
all_labels(Builder) ->
    maps:keys(erlang:element(3, Builder)).

-file("src/yog/builder/labeled.gleam", 379).
-spec list_map_ids_to_labels(
    list({integer(), ANXH}),
    yog@model:graph(ANXJ, ANXH)
) -> list({ANXJ, ANXH}).
list_map_ids_to_labels(Edges, Graph) ->
    _pipe = Edges,
    gleam@list:filter_map(
        _pipe,
        fun(Edge) ->
            {Node_id, Edge_data} = Edge,
            case gleam_stdlib:map_get(erlang:element(3, Graph), Node_id) of
                {ok, Label} ->
                    {ok, {Label, Edge_data}};

                {error, _} ->
                    {error, nil}
            end
        end
    ).

-file("src/yog/builder/labeled.gleam", 340).
?DOC(
    " Gets the successors of a node by its label.\n"
    "\n"
    " Returns a list of tuples containing the successor's label and edge data.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " case labeled.successors(builder, \"Node A\") {\n"
    "   Ok(successors) -> // List of #(label, edge_data)\n"
    "   Error(_) -> // Node doesn't exist\n"
    " }\n"
    " ```\n"
).
-spec successors(builder(ANWT, ANWU), ANWT) -> {ok, list({ANWT, ANWU})} |
    {error, nil}.
successors(Builder, Label) ->
    gleam@result:'try'(
        get_id(Builder, Label),
        fun(Id) ->
            Successor_edges = yog@model:successors(
                erlang:element(2, Builder),
                Id
            ),
            _pipe = Successor_edges,
            _pipe@1 = list_map_ids_to_labels(_pipe, erlang:element(2, Builder)),
            {ok, _pipe@1}
        end
    ).

-file("src/yog/builder/labeled.gleam", 365).
?DOC(
    " Gets the predecessors of a node by its label.\n"
    "\n"
    " Returns a list of tuples containing the predecessor's label and edge data.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " case labeled.predecessors(builder, \"Node A\") {\n"
    "   Ok(predecessors) -> // List of #(label, edge_data)\n"
    "   Error(_) -> // Node doesn't exist\n"
    " }\n"
    " ```\n"
).
-spec predecessors(builder(ANXA, ANXB), ANXA) -> {ok, list({ANXA, ANXB})} |
    {error, nil}.
predecessors(Builder, Label) ->
    gleam@result:'try'(
        get_id(Builder, Label),
        fun(Id) ->
            Predecessor_edges = yog@model:predecessors(
                erlang:element(2, Builder),
                Id
            ),
            _pipe = Predecessor_edges,
            _pipe@1 = list_map_ids_to_labels(_pipe, erlang:element(2, Builder)),
            {ok, _pipe@1}
        end
    ).
