-module(yog).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog.gleam").
-export([new/1, directed/0, undirected/0, add_node/3, add_edge/4, add_unweighted_edge/3, add_simple_edge/3, successors/2, predecessors/2, neighbors/2, all_nodes/1, from_edges/2, from_unweighted_edges/2, from_adjacency_list/2, successor_ids/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " Yog - A comprehensive graph algorithm library for Gleam.\n"
    "\n"
    " Provides efficient implementations of classic graph algorithms with a\n"
    " clean, functional API.\n"
    "\n"
    " ## Quick Start\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/pathfinding\n"
    " import gleam/int\n"
    "\n"
    " pub fn main() {\n"
    "   let graph =\n"
    "     yog.directed()\n"
    "     |> yog.add_node(1, \"Start\")\n"
    "     |> yog.add_node(2, \"Middle\")\n"
    "     |> yog.add_node(3, \"End\")\n"
    "     |> yog.add_edge(from: 1, to: 2, with: 5)\n"
    "     |> yog.add_edge(from: 2, to: 3, with: 3)\n"
    "     |> yog.add_edge(from: 1, to: 3, with: 10)\n"
    "\n"
    "   case pathfinding.shortest_path(\n"
    "     in: graph,\n"
    "     from: 1,\n"
    "     to: 3,\n"
    "     with_zero: 0,\n"
    "     with_add: int.add,\n"
    "     with_compare: int.compare\n"
    "   ) {\n"
    "     Some(path) -> {\n"
    "       // Path(nodes: [1, 2, 3], total_weight: 8)\n"
    "       io.println(\"Shortest path found!\")\n"
    "     }\n"
    "     None -> io.println(\"No path exists\")\n"
    "   }\n"
    " }\n"
    " ```\n"
    "\n"
    " ## Modules\n"
    "\n"
    " ### Core\n"
    " - **`yog/model`** - Graph data structures and basic operations\n"
    "   - Create directed/undirected graphs\n"
    "   - Add nodes and edges\n"
    "   - Query successors, predecessors, neighbors\n"
    "\n"
    " - **`yog/builder/labeled`** - Build graphs with arbitrary labels\n"
    "   - Use strings or any type as node identifiers\n"
    "   - Automatically maps labels to internal integer IDs\n"
    "   - Convert to standard Graph for use with all algorithms\n"
    "\n"
    " ### Algorithms\n"
    " - **`yog/pathfinding`** - Shortest path algorithms\n"
    "   - Dijkstra's algorithm (non-negative weights)\n"
    "   - A* search (with heuristics)\n"
    "   - Bellman-Ford (negative weights, cycle detection)\n"
    "\n"
    " - **`yog/traversal`** - Graph traversal\n"
    "   - Breadth-First Search (BFS)\n"
    "   - Depth-First Search (DFS)\n"
    "   - Early termination support\n"
    "\n"
    " - **`yog/mst`** - Minimum Spanning Tree\n"
    "   - Kruskal's algorithm with Union-Find\n"
    "   - Prim's algorithm with priority queue\n"
    "\n"
    " - **`yog/topological_sort`** - Topological ordering\n"
    "   - Kahn's algorithm\n"
    "   - Lexicographical variant (heap-based)\n"
    "\n"
    " - **`yog/components`** - Connected components\n"
    "   - Tarjan's algorithm for Strongly Connected Components (SCC)\n"
    "   - Kosaraju's algorithm for SCC (two-pass with transpose)\n"
    "\n"
    " - **`yog/connectivity`** - Graph connectivity analysis\n"
    "   - Tarjan's algorithm for bridges and articulation points\n"
    "\n"
    " - **`yog/min_cut`** - Minimum cut algorithms\n"
    "   - Stoer-Wagner algorithm for global minimum cut\n"
    "\n"
    " - **`yog/eulerian`** - Eulerian paths and circuits\n"
    "   - Detection of Eulerian paths and circuits\n"
    "   - Hierholzer's algorithm for finding paths\n"
    "   - Works on both directed and undirected graphs\n"
    "\n"
    " - **`yog/bipartite`** - Bipartite graph detection and matching\n"
    "   - Bipartite detection (2-coloring)\n"
    "   - Partition extraction (independent sets)\n"
    "   - Maximum matching (augmenting path algorithm)\n"
    "\n"
    " ### Data Structures\n"
    " - **`yog/disjoint_set`** - Union-Find / Disjoint Set\n"
    "   - Path compression and union by rank\n"
    "   - O(α(n)) amortized operations (practically constant)\n"
    "   - Dynamic connectivity queries\n"
    "   - Generic over any type\n"
    "\n"
    " ### Transformations\n"
    " - **`yog/transform`** - Graph transformations\n"
    "   - Transpose (O(1) edge reversal!)\n"
    "   - Map nodes and edges (functor operations)\n"
    "   - Filter nodes with auto-pruning\n"
    "   - Merge graphs\n"
    "\n"
    " ### Visualization\n"
    " - **`yog/render`** - Graph visualization\n"
    "   - Mermaid diagram generation (GitHub/GitLab compatible)\n"
    "   - Path highlighting for algorithm results\n"
    "   - Customizable node and edge labels\n"
    "\n"
    " ## Features\n"
    "\n"
    " - **Functional and Immutable**: All operations return new graphs\n"
    " - **Generic**: Works with any node/edge data types\n"
    " - **Type-Safe**: Leverages Gleam's type system\n"
    " - **Well-Tested**: 494+ tests covering all algorithms and data structures\n"
    " - **Efficient**: Optimal data structures (pairing heaps, union-find)\n"
    " - **Documented**: Every function has examples\n"
).

-file("src/yog.gleam", 148).
?DOC(
    " Creates a new empty graph of the specified type.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    " import yog/model.{Directed}\n"
    "\n"
    " let graph = yog.new(Directed)\n"
    " ```\n"
).
-spec new(yog@model:graph_type()) -> yog@model:graph(any(), any()).
new(Graph_type) ->
    yog@model:new(Graph_type).

-file("src/yog.gleam", 168).
?DOC(
    " Creates a new empty directed graph.\n"
    "\n"
    " This is a convenience function that's equivalent to `yog.new(Directed)`,\n"
    " but requires only a single import.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    "\n"
    " let graph =\n"
    "   yog.directed()\n"
    "   |> yog.add_node(1, \"Start\")\n"
    "   |> yog.add_node(2, \"End\")\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 10)\n"
    " ```\n"
).
-spec directed() -> yog@model:graph(any(), any()).
directed() ->
    yog@model:new(directed).

-file("src/yog.gleam", 188).
?DOC(
    " Creates a new empty undirected graph.\n"
    "\n"
    " This is a convenience function that's equivalent to `yog.new(Undirected)`,\n"
    " but requires only a single import.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " import yog\n"
    "\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, \"A\")\n"
    "   |> yog.add_node(2, \"B\")\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 5)\n"
    " ```\n"
).
-spec undirected() -> yog@model:graph(any(), any()).
undirected() ->
    yog@model:new(undirected).

-file("src/yog.gleam", 202).
?DOC(
    " Adds a node to the graph with the given ID and data.\n"
    " If a node with this ID already exists, its data will be replaced.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " graph\n"
    " |> yog.add_node(1, \"Node A\")\n"
    " |> yog.add_node(2, \"Node B\")\n"
    " ```\n"
).
-spec add_node(yog@model:graph(GRD, GRE), integer(), GRD) -> yog@model:graph(GRD, GRE).
add_node(Graph, Id, Data) ->
    yog@model:add_node(Graph, Id, Data).

-file("src/yog.gleam", 217).
?DOC(
    " Adds an edge to the graph with the given weight.\n"
    "\n"
    " For directed graphs, adds a single edge from `src` to `dst`.\n"
    " For undirected graphs, adds edges in both directions.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " graph\n"
    " |> yog.add_edge(from: 1, to: 2, with: 10)\n"
    " ```\n"
).
-spec add_edge(yog@model:graph(GRJ, GRK), integer(), integer(), GRK) -> yog@model:graph(GRJ, GRK).
add_edge(Graph, Src, Dst, Weight) ->
    yog@model:add_edge(Graph, Src, Dst, Weight).

-file("src/yog.gleam", 239).
?DOC(
    " Adds an unweighted edge to the graph.\n"
    "\n"
    " This is a convenience function for graphs where edges have no meaningful weight.\n"
    " Uses `Nil` as the edge data type.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph: Graph(String, Nil) = yog.directed()\n"
    "   |> yog.add_node(1, \"A\")\n"
    "   |> yog.add_node(2, \"B\")\n"
    "   |> yog.add_unweighted_edge(from: 1, to: 2)\n"
    " ```\n"
).
-spec add_unweighted_edge(yog@model:graph(GRP, nil), integer(), integer()) -> yog@model:graph(GRP, nil).
add_unweighted_edge(Graph, Src, Dst) ->
    yog@model:add_edge(Graph, Src, Dst, nil).

-file("src/yog.gleam", 260).
?DOC(
    " Adds a simple edge with weight 1.\n"
    "\n"
    " This is a convenience function for graphs with integer weights where\n"
    " a default weight of 1 is appropriate (e.g., unweighted graphs, hop counts).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " graph\n"
    " |> yog.add_simple_edge(from: 1, to: 2)\n"
    " |> yog.add_simple_edge(from: 2, to: 3)\n"
    " // Both edges have weight 1\n"
    " ```\n"
).
-spec add_simple_edge(yog@model:graph(GRU, integer()), integer(), integer()) -> yog@model:graph(GRU, integer()).
add_simple_edge(Graph, Src, Dst) ->
    yog@model:add_edge(Graph, Src, Dst, 1).

-file("src/yog.gleam", 270).
?DOC(
    " Gets nodes you can travel TO from the given node (successors).\n"
    " Returns a list of tuples containing the destination node ID and edge data.\n"
).
-spec successors(yog@model:graph(any(), GSA), integer()) -> list({integer(),
    GSA}).
successors(Graph, Id) ->
    yog@model:successors(Graph, Id).

-file("src/yog.gleam", 276).
?DOC(
    " Gets nodes you came FROM to reach the given node (predecessors).\n"
    " Returns a list of tuples containing the source node ID and edge data.\n"
).
-spec predecessors(yog@model:graph(any(), GSF), integer()) -> list({integer(),
    GSF}).
predecessors(Graph, Id) ->
    yog@model:predecessors(Graph, Id).

-file("src/yog.gleam", 283).
?DOC(
    " Gets all nodes connected to the given node, regardless of direction.\n"
    " For undirected graphs, this is equivalent to successors.\n"
    " For directed graphs, this combines successors and predecessors.\n"
).
-spec neighbors(yog@model:graph(any(), GSK), integer()) -> list({integer(), GSK}).
neighbors(Graph, Id) ->
    yog@model:neighbors(Graph, Id).

-file("src/yog.gleam", 288).
?DOC(" Returns all unique node IDs that have edges in the graph.\n").
-spec all_nodes(yog@model:graph(any(), any())) -> list(integer()).
all_nodes(Graph) ->
    yog@model:all_nodes(Graph).

-file("src/yog.gleam", 299).
?DOC(
    " Creates a graph from a list of edges #(src, dst, weight).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph = yog.from_edges(model.Directed, [#(1, 2, 10), #(2, 3, 5)])\n"
    " ```\n"
).
-spec from_edges(yog@model:graph_type(), list({integer(), integer(), GST})) -> yog@model:graph(nil, GST).
from_edges(Graph_type, Edges) ->
    gleam@list:fold(
        Edges,
        new(Graph_type),
        fun(G, Edge) ->
            {Src, Dst, Weight} = Edge,
            _pipe = G,
            _pipe@1 = add_node(_pipe, Src, nil),
            _pipe@2 = add_node(_pipe@1, Dst, nil),
            add_edge(_pipe@2, Src, Dst, Weight)
        end
    ).

-file("src/yog.gleam", 319).
?DOC(
    " Creates a graph from a list of unweighted edges #(src, dst).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph = yog.from_unweighted_edges(model.Directed, [#(1, 2), #(2, 3)])\n"
    " ```\n"
).
-spec from_unweighted_edges(
    yog@model:graph_type(),
    list({integer(), integer()})
) -> yog@model:graph(nil, nil).
from_unweighted_edges(Graph_type, Edges) ->
    gleam@list:fold(
        Edges,
        new(Graph_type),
        fun(G, Edge) ->
            {Src, Dst} = Edge,
            _pipe = G,
            _pipe@1 = add_node(_pipe, Src, nil),
            _pipe@2 = add_node(_pipe@1, Dst, nil),
            add_unweighted_edge(_pipe@2, Src, Dst)
        end
    ).

-file("src/yog.gleam", 339).
?DOC(
    " Creates a graph from an adjacency list #(src, List(#(dst, weight))).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph = yog.from_adjacency_list(model.Directed, [#(1, [#(2, 10), #(3, 5)])])\n"
    " ```\n"
).
-spec from_adjacency_list(
    yog@model:graph_type(),
    list({integer(), list({integer(), GTA})})
) -> yog@model:graph(nil, GTA).
from_adjacency_list(Graph_type, Adj_list) ->
    gleam@list:fold(
        Adj_list,
        new(Graph_type),
        fun(G, Entry) ->
            {Src, Edges} = Entry,
            gleam@list:fold(
                Edges,
                add_node(G, Src, nil),
                fun(Acc, Edge) ->
                    {Dst, Weight} = Edge,
                    _pipe = Acc,
                    _pipe@1 = add_node(_pipe, Dst, nil),
                    add_edge(_pipe@1, Src, Dst, Weight)
                end
            )
        end
    ).

-file("src/yog.gleam", 356).
?DOC(
    " Returns just the NodeIds of successors (without edge data).\n"
    " Convenient for traversal algorithms that only need the IDs.\n"
).
-spec successor_ids(yog@model:graph(any(), any()), integer()) -> list(integer()).
successor_ids(Graph, Id) ->
    yog@model:successor_ids(Graph, Id).
