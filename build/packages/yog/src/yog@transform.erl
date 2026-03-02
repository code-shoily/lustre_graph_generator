-module(yog@transform).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/transform.gleam").
-export([transpose/1, map_nodes/2, map_edges/2, filter_nodes/2, merge/2, subgraph/2, contract/4]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-file("src/yog/transform.gleam", 34).
?DOC(
    " Reverses the direction of every edge in the graph (graph transpose).\n"
    "\n"
    " Due to the dual-map representation (storing both out_edges and in_edges),\n"
    " this is an **O(1) operation** - just a pointer swap! This is dramatically\n"
    " faster than most graph libraries where transpose is O(E).\n"
    "\n"
    " **Time Complexity:** O(1)\n"
    "\n"
    " **Property:** `transpose(transpose(G)) = G`\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 20)\n"
    "\n"
    " let reversed = transform.transpose(graph)\n"
    " // Now has edges: 2->1 and 3->2\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Computing strongly connected components (Kosaraju's algorithm)\n"
    " - Finding all nodes that can reach a target node\n"
    " - Reversing dependencies in a DAG\n"
).
-spec transpose(yog@model:graph(IDV, IDW)) -> yog@model:graph(IDV, IDW).
transpose(Graph) ->
    {graph,
        erlang:element(2, Graph),
        erlang:element(3, Graph),
        erlang:element(5, Graph),
        erlang:element(4, Graph)}.

-file("src/yog/transform.gleam", 72).
?DOC(
    " Transforms node data using a function, preserving graph structure.\n"
    "\n"
    " This is a functor operation - it applies a function to every node's data\n"
    " while keeping all edges and the graph structure unchanged.\n"
    "\n"
    " **Time Complexity:** O(V) where V is the number of nodes\n"
    "\n"
    " **Functor Law:** `map_nodes(map_nodes(g, f), h) = map_nodes(g, fn(x) { h(f(x)) })`\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"alice\")\n"
    "   |> model.add_node(2, \"bob\")\n"
    "\n"
    " let uppercased = transform.map_nodes(graph, string.uppercase)\n"
    " // Nodes now contain \"ALICE\" and \"BOB\"\n"
    " ```\n"
    "\n"
    " ## Type Changes\n"
    "\n"
    " Can change the node data type:\n"
    "\n"
    " ```gleam\n"
    " // Convert string node data to integers\n"
    " transform.map_nodes(graph, fn(s) {\n"
    "   case int.parse(s) {\n"
    "     Ok(n) -> n\n"
    "     Error(_) -> 0\n"
    "   }\n"
    " })\n"
    " ```\n"
).
-spec map_nodes(yog@model:graph(IEB, IEC), fun((IEB) -> IEF)) -> yog@model:graph(IEF, IEC).
map_nodes(Graph, Fun) ->
    New_nodes = gleam@dict:map_values(
        erlang:element(3, Graph),
        fun(_, Data) -> Fun(Data) end
    ),
    {graph,
        erlang:element(2, Graph),
        New_nodes,
        erlang:element(4, Graph),
        erlang:element(5, Graph)}.

-file("src/yog/transform.gleam", 116).
?DOC(
    " Transforms edge weights using a function, preserving graph structure.\n"
    "\n"
    " This is a functor operation - it applies a function to every edge's weight/data\n"
    " while keeping all nodes and the graph topology unchanged.\n"
    "\n"
    " **Time Complexity:** O(E) where E is the number of edges\n"
    "\n"
    " **Functor Law:** `map_edges(map_edges(g, f), h) = map_edges(g, fn(x) { h(f(x)) })`\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 20)\n"
    "\n"
    " // Double all weights\n"
    " let doubled = transform.map_edges(graph, fn(w) { w * 2 })\n"
    " // Edges now have weights 20 and 40\n"
    " ```\n"
    "\n"
    " ## Type Changes\n"
    "\n"
    " Can change the edge weight type:\n"
    "\n"
    " ```gleam\n"
    " // Convert integer weights to floats\n"
    " transform.map_edges(graph, int.to_float)\n"
    "\n"
    " // Convert weights to labels\n"
    " transform.map_edges(graph, fn(w) {\n"
    "   case w < 10 {\n"
    "     True -> \"short\"\n"
    "     False -> \"long\"\n"
    "   }\n"
    " })\n"
    " ```\n"
).
-spec map_edges(yog@model:graph(IEI, IEJ), fun((IEJ) -> IEM)) -> yog@model:graph(IEI, IEM).
map_edges(Graph, Fun) ->
    Transform_inner = fun(Inner_map) ->
        gleam@dict:map_values(Inner_map, fun(_, Weight) -> Fun(Weight) end)
    end,
    Transform_outer = fun(Outer_map) ->
        gleam@dict:map_values(
            Outer_map,
            fun(_, Inner_map@1) -> Transform_inner(Inner_map@1) end
        )
    end,
    {graph,
        erlang:element(2, Graph),
        erlang:element(3, Graph),
        Transform_outer(erlang:element(4, Graph)),
        Transform_outer(erlang:element(5, Graph))}.

-file("src/yog/transform.gleam", 165).
?DOC(
    " Filters nodes by a predicate, automatically pruning connected edges.\n"
    "\n"
    " Returns a new graph containing only nodes whose data satisfies the predicate.\n"
    " All edges connected to removed nodes (both incoming and outgoing) are\n"
    " automatically removed to maintain graph consistency.\n"
    "\n"
    " **Time Complexity:** O(V + E) where V is nodes and E is edges\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"apple\")\n"
    "   |> model.add_node(2, \"banana\")\n"
    "   |> model.add_node(3, \"apricot\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 2)\n"
    "\n"
    " // Keep only nodes starting with 'a'\n"
    " let filtered = transform.filter_nodes(graph, fn(s) {\n"
    "   string.starts_with(s, \"a\")\n"
    " })\n"
    " // Result has nodes 1 and 3, edge 1->2 is removed (node 2 gone)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Extract subgraphs based on node properties\n"
    " - Remove inactive/disabled nodes from a network\n"
    " - Filter by node importance/centrality\n"
).
-spec filter_nodes(yog@model:graph(IEP, IEQ), fun((IEP) -> boolean())) -> yog@model:graph(IEP, IEQ).
filter_nodes(Graph, Predicate) ->
    Kept_nodes = gleam@dict:filter(
        erlang:element(3, Graph),
        fun(_, Data) -> Predicate(Data) end
    ),
    Kept_ids = maps:keys(Kept_nodes),
    Prune_edges = fun(Outer_map) ->
        _pipe = gleam@dict:filter(
            Outer_map,
            fun(Src, _) -> gleam@list:contains(Kept_ids, Src) end
        ),
        gleam@dict:map_values(
            _pipe,
            fun(_, Inner_map) ->
                gleam@dict:filter(
                    Inner_map,
                    fun(Dst, _) -> gleam@list:contains(Kept_ids, Dst) end
                )
            end
        )
    end,
    {graph,
        erlang:element(2, Graph),
        Kept_nodes,
        Prune_edges(erlang:element(4, Graph)),
        Prune_edges(erlang:element(5, Graph))}.

-file("src/yog/transform.gleam", 229).
?DOC(
    " Combines two graphs, with the second graph's data taking precedence on conflicts.\n"
    "\n"
    " Merges nodes, out_edges, and in_edges from both graphs. When a node exists in\n"
    " both graphs, the node data from `other` overwrites `base`. When the same edge\n"
    " exists in both graphs, the edge weight from `other` overwrites `base`.\n"
    "\n"
    " Importantly, edges from different nodes are combined - if `base` has edges\n"
    " 1->2 and 1->3, and `other` has edges 1->4 and 1->5, the result will have\n"
    " all four edges from node 1.\n"
    "\n"
    " The resulting graph uses the `kind` (Directed/Undirected) from the base graph.\n"
    "\n"
    " **Time Complexity:** O(V + E) for both graphs combined\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let base =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"Original\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> model.add_edge(from: 1, to: 3, with: 15)\n"
    "\n"
    " let other =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"Updated\")\n"
    "   |> model.add_edge(from: 1, to: 4, with: 20)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 25)\n"
    "\n"
    " let merged = transform.merge(base, other)\n"
    " // Node 1 has \"Updated\" (from other)\n"
    " // Node 1 has edges to: 2, 3, and 4 (all edges combined)\n"
    " // Node 2 has edge to: 3\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Combining disjoint subgraphs\n"
    " - Applying updates/patches to a graph\n"
    " - Building graphs incrementally from multiple sources\n"
).
-spec merge(yog@model:graph(IEV, IEW), yog@model:graph(IEV, IEW)) -> yog@model:graph(IEV, IEW).
merge(Base, Other) ->
    Merge_inner = fun(M1, M2) -> maps:merge(M1, M2) end,
    Merge_outer = fun(Outer1, Outer2) ->
        gleam@dict:combine(Outer1, Outer2, Merge_inner)
    end,
    {graph,
        erlang:element(2, Base),
        maps:merge(erlang:element(3, Base), erlang:element(3, Other)),
        Merge_outer(erlang:element(4, Base), erlang:element(4, Other)),
        Merge_outer(erlang:element(5, Base), erlang:element(5, Other))}.

-file("src/yog/transform.gleam", 287).
?DOC(
    " Extracts a subgraph containing only the specified nodes and their connecting edges.\n"
    "\n"
    " Returns a new graph with only the nodes whose IDs are in the provided list,\n"
    " along with any edges that connect nodes within this subset. Nodes not in the\n"
    " list are removed, and all edges touching removed nodes are pruned.\n"
    "\n"
    " **Time Complexity:** O(V + E) where V is nodes and E is edges\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"A\")\n"
    "   |> model.add_node(2, \"B\")\n"
    "   |> model.add_node(3, \"C\")\n"
    "   |> model.add_node(4, \"D\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 10)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 20)\n"
    "   |> model.add_edge(from: 3, to: 4, with: 30)\n"
    "\n"
    " // Extract only nodes 2 and 3\n"
    " let sub = transform.subgraph(graph, keeping: [2, 3])\n"
    " // Result has nodes 2, 3 and edge 2->3\n"
    " // Edges 1->2 and 3->4 are removed (endpoints outside subgraph)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Extracting connected components found by algorithms\n"
    " - Analyzing k-hop neighborhoods around specific nodes\n"
    " - Working with strongly connected components (extract each SCC)\n"
    " - Removing nodes found by some criteria (keep the inverse set)\n"
    " - Visualizing specific portions of large graphs\n"
    "\n"
    " ## Comparison with `filter_nodes()`\n"
    "\n"
    " - `filter_nodes()` - Filters by predicate on node data (e.g., \"keep active users\")\n"
    " - `subgraph()` - Filters by explicit node IDs (e.g., \"keep nodes [1, 5, 7]\")\n"
).
-spec subgraph(yog@model:graph(IFD, IFE), list(integer())) -> yog@model:graph(IFD, IFE).
subgraph(Graph, Ids) ->
    Id_set = gleam@set:from_list(Ids),
    Nodes = gleam@dict:filter(
        erlang:element(3, Graph),
        fun(Id, _) -> gleam@set:contains(Id_set, Id) end
    ),
    Prune = fun(Outer) ->
        _pipe = gleam@dict:filter(
            Outer,
            fun(Src, _) -> gleam@set:contains(Id_set, Src) end
        ),
        gleam@dict:map_values(
            _pipe,
            fun(_, Inner) ->
                gleam@dict:filter(
                    Inner,
                    fun(Dst, _) -> gleam@set:contains(Id_set, Dst) end
                )
            end
        )
    end,
    {graph,
        erlang:element(2, Graph),
        Nodes,
        Prune(erlang:element(4, Graph)),
        Prune(erlang:element(5, Graph))}.

-file("src/yog/transform.gleam", 368).
?DOC(
    " Contracts an edge by merging node `b` into node `a`.\n"
    "\n"
    " Node `b` is removed from the graph, and all edges connected to `b` are\n"
    " redirected to `a`. If both `a` and `b` had edges to the same neighbor,\n"
    " their weights are combined using `with_combine`.\n"
    "\n"
    " Self-loops (edges from a node to itself) are removed during contraction.\n"
    "\n"
    " **Important for undirected graphs:** Since undirected edges are stored\n"
    " bidirectionally, each logical edge is processed twice during contraction,\n"
    " causing weights to be combined twice. For example, if edge weights represent\n"
    " capacities, this effectively doubles them. Consider dividing weights by 2\n"
    " or using a custom combine function if this behavior is undesired.\n"
    "\n"
    " **Time Complexity:** O(deg(a) + deg(b)) - proportional to the combined\n"
    " degree of both nodes.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Undirected)\n"
    "   |> model.add_node(1, \"A\")\n"
    "   |> model.add_node(2, \"B\")\n"
    "   |> model.add_node(3, \"C\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 5)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 10)\n"
    "\n"
    " let contracted = transform.contract(\n"
    "   in: graph,\n"
    "   merge: 1,\n"
    "   with: 2,\n"
    "   combine_weights: int.add,\n"
    " )\n"
    " // Result: nodes [1, 3], edge 1-3 with weight 10\n"
    " // Node 2 is merged into node 1\n"
    " ```\n"
    "\n"
    " ## Combining Weights\n"
    "\n"
    " When both `a` and `b` have edges to the same neighbor `c`:\n"
    "\n"
    " ```gleam\n"
    " // Before: a-[5]->c, b-[10]->c\n"
    " let contracted = transform.contract(\n"
    "   in: graph,\n"
    "   merge: a,\n"
    "   with: b,\n"
    "   combine_weights: int.add,\n"
    " )\n"
    " // After: a-[15]->c (5 + 10)\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - **Stoer-Wagner algorithm** for minimum cut\n"
    " - **Graph simplification** by merging strongly connected nodes\n"
    " - **Community detection** by contracting nodes in the same community\n"
    " - **Karger's algorithm** for minimum cut (randomized)\n"
).
-spec contract(
    yog@model:graph(IFK, IFL),
    integer(),
    integer(),
    fun((IFL, IFL) -> IFL)
) -> yog@model:graph(IFK, IFL).
contract(Graph, A, B, With_combine) ->
    B_out = begin
        _pipe = gleam_stdlib:map_get(erlang:element(4, Graph), B),
        gleam@result:unwrap(_pipe, maps:new())
    end,
    Graph@1 = gleam@dict:fold(
        B_out,
        Graph,
        fun(Acc_g, Neighbor, Weight) ->
            case (Neighbor =:= A) orelse (Neighbor =:= B) of
                true ->
                    Acc_g;

                false ->
                    yog@model:add_edge_with_combine(
                        Acc_g,
                        A,
                        Neighbor,
                        Weight,
                        With_combine
                    )
            end
        end
    ),
    Graph@2 = case erlang:element(2, Graph@1) of
        undirected ->
            Graph@1;

        directed ->
            B_in = begin
                _pipe@1 = gleam_stdlib:map_get(erlang:element(5, Graph@1), B),
                gleam@result:unwrap(_pipe@1, maps:new())
            end,
            gleam@dict:fold(
                B_in,
                Graph@1,
                fun(Acc_g@1, Neighbor@1, Weight@1) ->
                    case (Neighbor@1 =:= A) orelse (Neighbor@1 =:= B) of
                        true ->
                            Acc_g@1;

                        false ->
                            yog@model:add_edge_with_combine(
                                Acc_g@1,
                                Neighbor@1,
                                A,
                                Weight@1,
                                With_combine
                            )
                    end
                end
            )
    end,
    yog@model:remove_node(Graph@2, B).
