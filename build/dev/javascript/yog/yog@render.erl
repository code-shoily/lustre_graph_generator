-module(yog@render).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/render.gleam").
-export([default_options/0, to_mermaid/2, path_to_options/2, default_dot_options/0, to_dot/2, path_to_dot_options/2, default_json_options/0, to_json/2]).
-export_type([mermaid_options/0, dot_options/0, json_options/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type mermaid_options() :: {mermaid_options,
        fun((integer(), binary()) -> binary()),
        fun((binary()) -> binary()),
        gleam@option:option(list(integer())),
        gleam@option:option(list({integer(), integer()}))}.

-type dot_options() :: {dot_options,
        fun((integer(), binary()) -> binary()),
        fun((binary()) -> binary()),
        gleam@option:option(list(integer())),
        gleam@option:option(list({integer(), integer()})),
        binary(),
        binary()}.

-type json_options() :: {json_options,
        fun((integer(), binary()) -> gleam@json:json()),
        fun((integer(), integer(), binary()) -> gleam@json:json())}.

-file("src/yog/render.gleam", 28).
?DOC(
    " Creates default Mermaid options with simple labeling.\n"
    "\n"
    " Uses node ID as label and edge weight as-is.\n"
).
-spec default_options() -> mermaid_options().
default_options() ->
    {mermaid_options,
        fun(Id, _) -> erlang:integer_to_binary(Id) end,
        fun(Weight) -> Weight end,
        none,
        none}.

-file("src/yog/render.gleam", 78).
?DOC(
    " Converts a graph to Mermaid diagram syntax.\n"
    "\n"
    " The graph's node data and edge data must be convertible to strings.\n"
    " Use the options to customize labels and highlight specific paths.\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"Start\")\n"
    "   |> model.add_node(2, \"Process\")\n"
    "   |> model.add_node(3, \"End\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: \"5\")\n"
    "   |> model.add_edge(from: 2, to: 3, with: \"3\")\n"
    "\n"
    " // Basic rendering\n"
    " let diagram = render.to_mermaid(graph, default_options())\n"
    "\n"
    " // Highlight a path\n"
    " let options = MermaidOptions(\n"
    "   ..default_options(),\n"
    "   highlighted_nodes: Some([1, 2, 3]),\n"
    "   highlighted_edges: Some([#(1, 2), #(2, 3)]),\n"
    " )\n"
    " let highlighted = render.to_mermaid(graph, options)\n"
    " ```\n"
    "\n"
    " The output can be embedded in markdown:\n"
    " ````markdown\n"
    " ```mermaid\n"
    " graph TD\n"
    "   1[\"Start\"]\n"
    "   2[\"Process\"]\n"
    "   3[\"End\"]\n"
    "   1 -->|5| 2\n"
    "   2 -->|3| 3\n"
    " ```\n"
    " ````\n"
).
-spec to_mermaid(yog@model:graph(binary(), binary()), mermaid_options()) -> binary().
to_mermaid(Graph, Options) ->
    Graph_type = case erlang:element(2, Graph) of
        directed ->
            <<"graph TD\n"/utf8>>;

        undirected ->
            <<"graph LR\n"/utf8>>
    end,
    Styles = case {erlang:element(4, Options), erlang:element(5, Options)} of
        {{some, _}, _} ->
            <<"  classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:3px\n"/utf8,
                "  classDef highlightEdge stroke:#f57c00,stroke-width:3px\n"/utf8>>;

        {_, {some, _}} ->
            <<"  classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:3px\n"/utf8,
                "  classDef highlightEdge stroke:#f57c00,stroke-width:3px\n"/utf8>>;

        {none, none} ->
            <<""/utf8>>
    end,
    Nodes = begin
        _pipe = gleam@dict:fold(
            erlang:element(3, Graph),
            [],
            fun(Acc, Id, Data) ->
                Label = (erlang:element(2, Options))(Id, Data),
                Node_def = <<<<<<<<"  "/utf8,
                                (erlang:integer_to_binary(Id))/binary>>/binary,
                            "[\""/utf8>>/binary,
                        Label/binary>>/binary,
                    "\"]"/utf8>>,
                Node_with_highlight = case erlang:element(4, Options) of
                    {some, Highlighted} ->
                        case gleam@list:contains(Highlighted, Id) of
                            true ->
                                <<Node_def/binary, ":::highlight"/utf8>>;

                            false ->
                                Node_def
                        end;

                    none ->
                        Node_def
                end,
                [Node_with_highlight | Acc]
            end
        ),
        gleam@string:join(_pipe, <<"\n"/utf8>>)
    end,
    Edges@1 = begin
        _pipe@1 = gleam@dict:fold(
            erlang:element(4, Graph),
            [],
            fun(Acc@1, From_id, Targets) ->
                Inner_edges = gleam@dict:fold(
                    Targets,
                    [],
                    fun(Inner_acc, To_id, Weight) ->
                        case erlang:element(2, Graph) of
                            undirected when From_id > To_id ->
                                Inner_acc;

                            _ ->
                                Arrow = case erlang:element(2, Graph) of
                                    directed ->
                                        <<"-->"/utf8>>;

                                    undirected ->
                                        <<"---"/utf8>>
                                end,
                                Is_highlighted = case erlang:element(5, Options) of
                                    {some, Edges} ->
                                        gleam@list:contains(
                                            Edges,
                                            {From_id, To_id}
                                        )
                                        orelse gleam@list:contains(
                                            Edges,
                                            {To_id, From_id}
                                        );

                                    none ->
                                        false
                                end,
                                Edge_def = <<<<<<<<<<<<<<"  "/utf8,
                                                            (erlang:integer_to_binary(
                                                                From_id
                                                            ))/binary>>/binary,
                                                        " "/utf8>>/binary,
                                                    Arrow/binary>>/binary,
                                                "|"/utf8>>/binary,
                                            ((erlang:element(3, Options))(
                                                Weight
                                            ))/binary>>/binary,
                                        "| "/utf8>>/binary,
                                    (erlang:integer_to_binary(To_id))/binary>>,
                                Edge_with_highlight = case Is_highlighted of
                                    true ->
                                        <<Edge_def/binary,
                                            ":::highlightEdge"/utf8>>;

                                    false ->
                                        Edge_def
                                end,
                                [Edge_with_highlight | Inner_acc]
                        end
                    end
                ),
                lists:append([Inner_edges, Acc@1])
            end
        ),
        gleam@string:join(_pipe@1, <<"\n"/utf8>>)
    end,
    <<<<<<<<Graph_type/binary, Styles/binary>>/binary, Nodes/binary>>/binary,
            "\n"/utf8>>/binary,
        Edges@1/binary>>.

-file("src/yog/render.gleam", 204).
-spec path_to_edges(list(integer())) -> list({integer(), integer()}).
path_to_edges(Nodes) ->
    case Nodes of
        [] ->
            [];

        [_] ->
            [];

        [First, Second | Rest] ->
            [{First, Second} | path_to_edges([Second | Rest])]
    end.

-file("src/yog/render.gleam", 189).
?DOC(
    " Converts a shortest path result to highlighted Mermaid options.\n"
    "\n"
    " Useful for visualizing pathfinding algorithm results.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let path = pathfinding.shortest_path(\n"
    "   in: graph,\n"
    "   from: 1,\n"
    "   to: 5,\n"
    "   with_zero: \"0\",\n"
    "   with_add: string_add,\n"
    "   with_compare: string_compare,\n"
    " )\n"
    "\n"
    " case path {\n"
    "   Some(p) -> {\n"
    "     let options = render.path_to_options(p, default_options())\n"
    "     let diagram = render.to_mermaid(graph, options)\n"
    "     io.println(diagram)\n"
    "   }\n"
    "   None -> io.println(\"No path found\")\n"
    " }\n"
    " ```\n"
).
-spec path_to_options(yog@pathfinding:path(any()), mermaid_options()) -> mermaid_options().
path_to_options(Path, Base_options) ->
    Nodes = erlang:element(2, Path),
    Edges = path_to_edges(Nodes),
    {mermaid_options,
        erlang:element(2, Base_options),
        erlang:element(3, Base_options),
        {some, Nodes},
        {some, Edges}}.

-file("src/yog/render.gleam", 237).
?DOC(" Creates default DOT options with simple labeling.\n").
-spec default_dot_options() -> dot_options().
default_dot_options() ->
    {dot_options,
        fun(Id, _) -> erlang:integer_to_binary(Id) end,
        fun(Weight) -> Weight end,
        none,
        none,
        <<"ellipse"/utf8>>,
        <<"red"/utf8>>}.

-file("src/yog/render.gleam", 278).
?DOC(
    " Converts a graph to DOT (Graphviz) syntax.\n"
    "\n"
    " The graph's node data and edge data must be convertible to strings.\n"
    " Use the options to customize labels and highlighting.\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"Start\")\n"
    "   |> model.add_node(2, \"Process\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: \"5\")\n"
    "\n"
    " let diagram = render.to_dot(graph, default_dot_options())\n"
    " // io.println(diagram)\n"
    " ```\n"
    "\n"
    " This output can be processed by Graphviz tools (e.g., `dot -Tpng -o graph.png`):\n"
    " ````dot\n"
    " digraph G {\n"
    "   node [shape=ellipse];\n"
    "   1 [label=\"Start\"];\n"
    "   2 [label=\"Process\"];\n"
    "   1 -> 2 [label=\"5\"];\n"
    " }\n"
    " ````\n"
    " Converts a graph to DOT (Graphviz) syntax.\n"
).
-spec to_dot(yog@model:graph(binary(), binary()), dot_options()) -> binary().
to_dot(Graph, Options) ->
    Graph_type = case erlang:element(2, Graph) of
        directed ->
            <<"digraph G {\n"/utf8>>;

        undirected ->
            <<"graph G {\n"/utf8>>
    end,
    Base_node_style = <<<<"  node [shape="/utf8,
            (erlang:element(6, Options))/binary>>/binary,
        "];\n"/utf8>>,
    Base_edge_style = <<"  edge [fontname=\"Helvetica\", fontsize=10];\n"/utf8>>,
    Nodes = begin
        _pipe = gleam@dict:fold(
            erlang:element(3, Graph),
            [],
            fun(Acc, Id, Data) ->
                Label = (erlang:element(2, Options))(Id, Data),
                Id_str = erlang:integer_to_binary(Id),
                Mut_attrs = case erlang:element(4, Options) of
                    {some, Highlighted} ->
                        case gleam@list:contains(Highlighted, Id) of
                            true ->
                                <<<<" fillcolor=\""/utf8,
                                        (erlang:element(7, Options))/binary>>/binary,
                                    "\", style=filled"/utf8>>;

                            false ->
                                <<""/utf8>>
                        end;

                    none ->
                        <<""/utf8>>
                end,
                [<<<<<<<<<<<<"  "/utf8, Id_str/binary>>/binary,
                                        " [label=\""/utf8>>/binary,
                                    Label/binary>>/binary,
                                "\""/utf8>>/binary,
                            Mut_attrs/binary>>/binary,
                        "];"/utf8>> |
                    Acc]
            end
        ),
        gleam@string:join(_pipe, <<"\n"/utf8>>)
    end,
    Edges = begin
        _pipe@1 = gleam@dict:fold(
            erlang:element(4, Graph),
            [],
            fun(Acc@1, From_id, Targets) ->
                Inner_edges = gleam@dict:fold(
                    Targets,
                    [],
                    fun(Inner_acc, To_id, Weight) ->
                        Is_valid = case erlang:element(2, Graph) of
                            undirected ->
                                From_id =< To_id;

                            directed ->
                                true
                        end,
                        case Is_valid of
                            false ->
                                Inner_acc;

                            true ->
                                Connector = case erlang:element(2, Graph) of
                                    directed ->
                                        <<" -> "/utf8>>;

                                    undirected ->
                                        <<" -- "/utf8>>
                                end,
                                Is_highlighted = case erlang:element(5, Options) of
                                    {some, Highlighted@1} ->
                                        gleam@list:contains(
                                            Highlighted@1,
                                            {From_id, To_id}
                                        )
                                        orelse gleam@list:contains(
                                            Highlighted@1,
                                            {To_id, From_id}
                                        );

                                    none ->
                                        false
                                end,
                                Mut_attrs@1 = case Is_highlighted of
                                    true ->
                                        <<<<" color=\""/utf8,
                                                (erlang:element(7, Options))/binary>>/binary,
                                            "\", penwidth=2"/utf8>>;

                                    false ->
                                        <<""/utf8>>
                                end,
                                Edge_def = <<<<<<<<<<<<<<<<"  "/utf8,
                                                                (erlang:integer_to_binary(
                                                                    From_id
                                                                ))/binary>>/binary,
                                                            Connector/binary>>/binary,
                                                        (erlang:integer_to_binary(
                                                            To_id
                                                        ))/binary>>/binary,
                                                    " [label=\""/utf8>>/binary,
                                                ((erlang:element(3, Options))(
                                                    Weight
                                                ))/binary>>/binary,
                                            "\""/utf8>>/binary,
                                        Mut_attrs@1/binary>>/binary,
                                    "];"/utf8>>,
                                [Edge_def | Inner_acc]
                        end
                    end
                ),
                lists:append([Inner_edges, Acc@1])
            end
        ),
        gleam@string:join(_pipe@1, <<"\n"/utf8>>)
    end,
    <<<<<<<<<<<<Graph_type/binary, Base_node_style/binary>>/binary,
                        Base_edge_style/binary>>/binary,
                    Nodes/binary>>/binary,
                "\n"/utf8>>/binary,
            Edges/binary>>/binary,
        "\n}"/utf8>>.

-file("src/yog/render.gleam", 390).
?DOC(
    " Converts a shortest path result to highlighted DOT options.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let path = pathfinding.shortest_path(\n"
    "   in: graph,\n"
    "   from: 1,\n"
    "   to: 5,\n"
    "   with_zero: \"0\",\n"
    "   with_add: string_add, // Assume these exist or map to int/float\n"
    "   with_compare: string_compare,\n"
    " )\n"
    "\n"
    " case path {\n"
    "   Some(p) -> {\n"
    "     let options = render.path_to_dot_options(p, default_dot_options())\n"
    "     let diagram = render.to_dot(graph, options)\n"
    "     io.println(diagram)\n"
    "   }\n"
    "   None -> io.println(\"No path found\")\n"
    " }\n"
    " ```\n"
).
-spec path_to_dot_options(yog@pathfinding:path(any()), dot_options()) -> dot_options().
path_to_dot_options(Path, Base_options) ->
    Nodes = erlang:element(2, Path),
    Edges = path_to_edges(Nodes),
    {dot_options,
        erlang:element(2, Base_options),
        erlang:element(3, Base_options),
        {some, Nodes},
        {some, Edges},
        erlang:element(6, Base_options),
        erlang:element(7, Base_options)}.

-file("src/yog/render.gleam", 422).
?DOC(
    " Creates default JSON options.\n"
    "\n"
    " Nodes are `{ \"id\": 1, \"label\": \"Node A\" }`.\n"
    " Edges are `{ \"source\": 1, \"target\": 2, \"weight\": \"5\" }`.\n"
).
-spec default_json_options() -> json_options().
default_json_options() ->
    {json_options,
        fun(Id, Data) ->
            gleam@json:object(
                [{<<"id"/utf8>>, gleam@json:int(Id)},
                    {<<"label"/utf8>>, gleam@json:string(Data)}]
            )
        end,
        fun(From, To, Weight) ->
            gleam@json:object(
                [{<<"source"/utf8>>, gleam@json:int(From)},
                    {<<"target"/utf8>>, gleam@json:int(To)},
                    {<<"weight"/utf8>>, gleam@json:string(Weight)}]
            )
        end}.

-file("src/yog/render.gleam", 477).
?DOC(
    " Converts a graph to a JSON string compatible with many visualization libraries (e.g., D3.js).\n"
    "\n"
    " The graph's node data and edge data must be convertible to strings.\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import gleam/io\n"
    " import gleam/json\n"
    " import yog/model\n"
    "\n"
    " pub fn main() {\n"
    "   let graph =\n"
    "     model.new(model.Directed)\n"
    "     |> model.add_node(1, \"Alice\")\n"
    "     |> model.add_node(2, \"Bob\")\n"
    "     |> model.add_edge(from: 1, to: 2, with: \"follows\")\n"
    "\n"
    "   let json_string = render.to_json(graph, render.default_json_options())\n"
    "   io.println(json_string)\n"
    " }\n"
    " ```\n"
    "\n"
    " This outputs:\n"
    " ````json\n"
    " {\n"
    "   \"nodes\": [\n"
    "     {\"id\": 1, \"label\": \"Alice\"},\n"
    "     {\"id\": 2, \"label\": \"Bob\"}\n"
    "   ],\n"
    "   \"edges\": [\n"
    "     {\"source\": 1, \"target\": 2, \"weight\": \"follows\"}\n"
    "   ]\n"
    " }\n"
    " ````\n"
).
-spec to_json(yog@model:graph(binary(), binary()), json_options()) -> binary().
to_json(Graph, Options) ->
    Nodes_json = gleam@dict:fold(
        erlang:element(3, Graph),
        [],
        fun(Acc, Id, Data) -> [(erlang:element(2, Options))(Id, Data) | Acc] end
    ),
    Edges_json = gleam@dict:fold(
        erlang:element(4, Graph),
        [],
        fun(Acc@1, From_id, Targets) ->
            Inner_edges = gleam@dict:fold(
                Targets,
                [],
                fun(Inner_acc, To_id, Weight) ->
                    case erlang:element(2, Graph) of
                        undirected when From_id > To_id ->
                            Inner_acc;

                        _ ->
                            [(erlang:element(3, Options))(
                                    From_id,
                                    To_id,
                                    Weight
                                ) |
                                Inner_acc]
                    end
                end
            ),
            lists:append([Inner_edges, Acc@1])
        end
    ),
    gleam@json:to_string(
        gleam@json:object(
            [{<<"nodes"/utf8>>,
                    gleam@json:array(Nodes_json, fun gleam@function:identity/1)},
                {<<"edges"/utf8>>,
                    gleam@json:array(Edges_json, fun gleam@function:identity/1)}]
        )
    ).
