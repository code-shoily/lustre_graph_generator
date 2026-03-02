-module(yog@traversal).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/traversal.gleam").
-export([fold_walk/5, walk/3, walk_until/4, implicit_fold/5, implicit_fold_by/6, implicit_dijkstra/4]).
-export_type([order/0, walk_control/0, walk_metadata/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type order() :: breadth_first | depth_first.

-type walk_control() :: continue | stop | halt.

-type walk_metadata(APJY) :: {walk_metadata,
        integer(),
        gleam@option:option(APJY)}.

-file("src/yog/traversal.gleam", 358).
-spec do_fold_walk_bfs(
    yog@model:graph(any(), any()),
    yog@internal@queue:queue({integer(), walk_metadata(integer())}),
    gleam@set:set(integer()),
    APLF,
    fun((APLF, integer(), walk_metadata(integer())) -> {walk_control(), APLF})
) -> APLF.
do_fold_walk_bfs(Graph, Q, Visited, Acc, Folder) ->
    case yog@internal@queue:pop(Q) of
        {error, nil} ->
            Acc;

        {ok, {{Node_id, Metadata}, Rest}} ->
            case gleam@set:contains(Visited, Node_id) of
                true ->
                    do_fold_walk_bfs(Graph, Rest, Visited, Acc, Folder);

                false ->
                    {Control, New_acc} = Folder(Acc, Node_id, Metadata),
                    New_visited = gleam@set:insert(Visited, Node_id),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_fold_walk_bfs(
                                Graph,
                                Rest,
                                New_visited,
                                New_acc,
                                Folder
                            );

                        continue ->
                            Next_nodes = yog@model:successor_ids(Graph, Node_id),
                            Next_queue = gleam@list:fold(
                                Next_nodes,
                                Rest,
                                fun(Current_queue, Next_id) ->
                                    Next_meta = {walk_metadata,
                                        erlang:element(2, Metadata) + 1,
                                        {some, Node_id}},
                                    yog@internal@queue:push(
                                        Current_queue,
                                        {Next_id, Next_meta}
                                    )
                                end
                            ),
                            do_fold_walk_bfs(
                                Graph,
                                Next_queue,
                                New_visited,
                                New_acc,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 401).
-spec do_fold_walk_dfs(
    yog@model:graph(any(), any()),
    list({integer(), walk_metadata(integer())}),
    gleam@set:set(integer()),
    APLO,
    fun((APLO, integer(), walk_metadata(integer())) -> {walk_control(), APLO})
) -> APLO.
do_fold_walk_dfs(Graph, Stack, Visited, Acc, Folder) ->
    case Stack of
        [] ->
            Acc;

        [{Node_id, Metadata} | Tail] ->
            case gleam@set:contains(Visited, Node_id) of
                true ->
                    do_fold_walk_dfs(Graph, Tail, Visited, Acc, Folder);

                false ->
                    {Control, New_acc} = Folder(Acc, Node_id, Metadata),
                    New_visited = gleam@set:insert(Visited, Node_id),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_fold_walk_dfs(
                                Graph,
                                Tail,
                                New_visited,
                                New_acc,
                                Folder
                            );

                        continue ->
                            Next_nodes = yog@model:successor_ids(Graph, Node_id),
                            Next_stack = gleam@list:fold(
                                lists:reverse(Next_nodes),
                                Tail,
                                fun(Current_stack, Next_id) ->
                                    Next_meta = {walk_metadata,
                                        erlang:element(2, Metadata) + 1,
                                        {some, Node_id}},
                                    [{Next_id, Next_meta} | Current_stack]
                                end
                            ),
                            do_fold_walk_dfs(
                                Graph,
                                Next_stack,
                                New_visited,
                                New_acc,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 194).
?DOC(
    " Folds over nodes during graph traversal, accumulating state with metadata.\n"
    "\n"
    " This function combines traversal with state accumulation, providing metadata\n"
    " about each visited node (depth and parent). The folder function controls the\n"
    " traversal flow:\n"
    "\n"
    " - `Continue`: Explore successors of the current node normally\n"
    " - `Stop`: Skip successors of this node, but continue processing other queued nodes\n"
    " - `Halt`: Stop the entire traversal immediately and return the accumulator\n"
    "\n"
    " **Time Complexity:** O(V + E) for both BFS and DFS\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `folder`: Called for each visited node with (accumulator, node_id, metadata).\n"
    "   Returns `#(WalkControl, new_accumulator)`.\n"
    "\n"
    " ## Examples\n"
    "\n"
    " ```gleam\n"
    " import gleam/dict\n"
    " import yog/traversal.{BreadthFirst, Continue, Halt, Stop, WalkMetadata}\n"
    "\n"
    " // Find all nodes within distance 3 from start\n"
    " let nearby = traversal.fold_walk(\n"
    "   over: graph,\n"
    "   from: 1,\n"
    "   using: BreadthFirst,\n"
    "   initial: dict.new(),\n"
    "   with: fn(acc, node_id, meta) {\n"
    "     case meta.depth <= 3 {\n"
    "       True -> #(Continue, dict.insert(acc, node_id, meta.depth))\n"
    "       False -> #(Stop, acc)  // Don't explore beyond depth 3\n"
    "     }\n"
    "   }\n"
    " )\n"
    "\n"
    " // Stop immediately when target is found (like walk_until)\n"
    " let path_to_target = traversal.fold_walk(\n"
    "   over: graph,\n"
    "   from: start,\n"
    "   using: BreadthFirst,\n"
    "   initial: [],\n"
    "   with: fn(acc, node_id, _meta) {\n"
    "     let new_acc = [node_id, ..acc]\n"
    "     case node_id == target {\n"
    "       True -> #(Halt, new_acc)   // Stop entire traversal\n"
    "       False -> #(Continue, new_acc)\n"
    "     }\n"
    "   }\n"
    " )\n"
    "\n"
    " // Build a parent map for path reconstruction\n"
    " let parents = traversal.fold_walk(\n"
    "   over: graph,\n"
    "   from: start,\n"
    "   using: BreadthFirst,\n"
    "   initial: dict.new(),\n"
    "   with: fn(acc, node_id, meta) {\n"
    "     let new_acc = case meta.parent {\n"
    "       Some(p) -> dict.insert(acc, node_id, p)\n"
    "       None -> acc\n"
    "     }\n"
    "     #(Continue, new_acc)\n"
    "   }\n"
    " )\n"
    "\n"
    " // Count nodes at each depth level\n"
    " let depth_counts = traversal.fold_walk(\n"
    "   over: graph,\n"
    "   from: root,\n"
    "   using: BreadthFirst,\n"
    "   initial: dict.new(),\n"
    "   with: fn(acc, _node_id, meta) {\n"
    "     let count = dict.get(acc, meta.depth) |> result.unwrap(0)\n"
    "     #(Continue, dict.insert(acc, meta.depth, count + 1))\n"
    "   }\n"
    " )\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Finding nodes within a certain distance\n"
    " - Building shortest path trees (parent pointers)\n"
    " - Collecting nodes with custom filtering logic\n"
    " - Computing statistics during traversal (depth distribution, etc.)\n"
    " - BFS/DFS with early termination based on accumulated state\n"
).
-spec fold_walk(
    yog@model:graph(any(), any()),
    integer(),
    order(),
    APKN,
    fun((APKN, integer(), walk_metadata(integer())) -> {walk_control(), APKN})
) -> APKN.
fold_walk(Graph, Start, Order, Acc, Folder) ->
    Start_metadata = {walk_metadata, 0, none},
    case Order of
        breadth_first ->
            do_fold_walk_bfs(
                Graph,
                begin
                    _pipe = yog@internal@queue:new(),
                    yog@internal@queue:push(_pipe, {Start, Start_metadata})
                end,
                gleam@set:new(),
                Acc,
                Folder
            );

        depth_first ->
            do_fold_walk_dfs(
                Graph,
                [{Start, Start_metadata}],
                gleam@set:new(),
                Acc,
                Folder
            )
    end.

-file("src/yog/traversal.gleam", 54).
?DOC(
    " Walks the graph starting from the given node, visiting all reachable nodes.\n"
    "\n"
    " Returns a list of NodeIds in the order they were visited.\n"
    " Uses successors to follow directed paths.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // BFS traversal\n"
    " traversal.walk(from: 1, in: graph, using: BreadthFirst)\n"
    " // => [1, 2, 3, 4, 5]\n"
    "\n"
    " // DFS traversal\n"
    " traversal.walk(from: 1, in: graph, using: DepthFirst)\n"
    " // => [1, 2, 4, 5, 3]\n"
    " ```\n"
).
-spec walk(integer(), yog@model:graph(any(), any()), order()) -> list(integer()).
walk(Start_id, Graph, Order) ->
    _pipe = fold_walk(
        Graph,
        Start_id,
        Order,
        [],
        fun(Acc, Node_id, _) -> {continue, [Node_id | Acc]} end
    ),
    lists:reverse(_pipe).

-file("src/yog/traversal.gleam", 85).
?DOC(
    " Walks the graph but stops early when a condition is met.\n"
    "\n"
    " Traverses the graph until `should_stop` returns True for a node.\n"
    " Returns all nodes visited including the one that stopped traversal.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Stop when we find node 5\n"
    " traversal.walk_until(\n"
    "   from: 1,\n"
    "   in: graph,\n"
    "   using: BreadthFirst,\n"
    "   until: fn(node) { node == 5 }\n"
    " )\n"
    " ```\n"
).
-spec walk_until(
    integer(),
    yog@model:graph(any(), any()),
    order(),
    fun((integer()) -> boolean())
) -> list(integer()).
walk_until(Start_id, Graph, Order, Should_stop) ->
    _pipe = fold_walk(
        Graph,
        Start_id,
        Order,
        [],
        fun(Acc, Node_id, _) ->
            New_acc = [Node_id | Acc],
            case Should_stop(Node_id) of
                true ->
                    {halt, New_acc};

                false ->
                    {continue, New_acc}
            end
        end
    ),
    lists:reverse(_pipe).

-file("src/yog/traversal.gleam", 445).
-spec do_virtual_bfs(
    yog@internal@queue:queue({APLQ, walk_metadata(APLQ)}),
    gleam@set:set(APLQ),
    APLU,
    fun((APLQ) -> list(APLQ)),
    fun((APLU, APLQ, walk_metadata(APLQ)) -> {walk_control(), APLU})
) -> APLU.
do_virtual_bfs(Q, Visited, Acc, Successors, Folder) ->
    case yog@internal@queue:pop(Q) of
        {error, nil} ->
            Acc;

        {ok, {{Node_id, Metadata}, Rest}} ->
            case gleam@set:contains(Visited, Node_id) of
                true ->
                    do_virtual_bfs(Rest, Visited, Acc, Successors, Folder);

                false ->
                    {Control, New_acc} = Folder(Acc, Node_id, Metadata),
                    New_visited = gleam@set:insert(Visited, Node_id),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_virtual_bfs(
                                Rest,
                                New_visited,
                                New_acc,
                                Successors,
                                Folder
                            );

                        continue ->
                            Next_queue = gleam@list:fold(
                                Successors(Node_id),
                                Rest,
                                fun(Q2, Next_id) ->
                                    yog@internal@queue:push(
                                        Q2,
                                        {Next_id,
                                            {walk_metadata,
                                                erlang:element(2, Metadata) + 1,
                                                {some, Node_id}}}
                                    )
                                end
                            ),
                            do_virtual_bfs(
                                Next_queue,
                                New_visited,
                                New_acc,
                                Successors,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 490).
-spec do_virtual_dfs(
    list({APLX, walk_metadata(APLX)}),
    gleam@set:set(APLX),
    APMB,
    fun((APLX) -> list(APLX)),
    fun((APMB, APLX, walk_metadata(APLX)) -> {walk_control(), APMB})
) -> APMB.
do_virtual_dfs(Stack, Visited, Acc, Successors, Folder) ->
    case Stack of
        [] ->
            Acc;

        [{Node_id, Metadata} | Tail] ->
            case gleam@set:contains(Visited, Node_id) of
                true ->
                    do_virtual_dfs(Tail, Visited, Acc, Successors, Folder);

                false ->
                    {Control, New_acc} = Folder(Acc, Node_id, Metadata),
                    New_visited = gleam@set:insert(Visited, Node_id),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_virtual_dfs(
                                Tail,
                                New_visited,
                                New_acc,
                                Successors,
                                Folder
                            );

                        continue ->
                            Next_stack = gleam@list:fold(
                                lists:reverse(Successors(Node_id)),
                                Tail,
                                fun(Stk, Next_id) ->
                                    [{Next_id,
                                            {walk_metadata,
                                                erlang:element(2, Metadata) + 1,
                                                {some, Node_id}}} |
                                        Stk]
                                end
                            ),
                            do_virtual_dfs(
                                Next_stack,
                                New_visited,
                                New_acc,
                                Successors,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 248).
?DOC(
    " Traverses an *implicit* graph using BFS or DFS,\n"
    " folding over visited nodes with metadata.\n"
    "\n"
    " Unlike `fold_walk`, this does not require a materialised `Graph` value.\n"
    " Instead, you supply a `successors_of` function that computes neighbours\n"
    " on the fly — ideal for infinite grids, state-space search, or any\n"
    " graph that is too large or expensive to build upfront.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // BFS shortest path in an implicit maze\n"
    " traversal.implicit_fold(\n"
    "   from: #(1, 1),\n"
    "   using: BreadthFirst,\n"
    "   initial: -1,\n"
    "   successors_of: fn(pos) { open_neighbours(pos, fav) },\n"
    "   with: fn(acc, pos, meta) {\n"
    "     case pos == target {\n"
    "       True -> #(Halt, meta.depth)\n"
    "       False -> #(Continue, acc)\n"
    "     }\n"
    "   },\n"
    " )\n"
    " ```\n"
).
-spec implicit_fold(
    APKP,
    order(),
    APKQ,
    fun((APKP) -> list(APKP)),
    fun((APKQ, APKP, walk_metadata(APKP)) -> {walk_control(), APKQ})
) -> APKQ.
implicit_fold(Start, Order, Acc, Successors, Folder) ->
    Start_meta = {walk_metadata, 0, none},
    case Order of
        breadth_first ->
            do_virtual_bfs(
                begin
                    _pipe = yog@internal@queue:new(),
                    yog@internal@queue:push(_pipe, {Start, Start_meta})
                end,
                gleam@set:new(),
                Acc,
                Successors,
                Folder
            );

        depth_first ->
            do_virtual_dfs(
                [{Start, Start_meta}],
                gleam@set:new(),
                Acc,
                Successors,
                Folder
            )
    end.

-file("src/yog/traversal.gleam", 543).
-spec do_virtual_bfs_by(
    yog@internal@queue:queue({APME, walk_metadata(APME)}),
    gleam@set:set(APMH),
    APMJ,
    fun((APME) -> list(APME)),
    fun((APME) -> APMH),
    fun((APMJ, APME, walk_metadata(APME)) -> {walk_control(), APMJ})
) -> APMJ.
do_virtual_bfs_by(Q, Visited, Acc, Successors, Key_fn, Folder) ->
    case yog@internal@queue:pop(Q) of
        {error, nil} ->
            Acc;

        {ok, {{Node_id, Metadata}, Rest}} ->
            Node_key = Key_fn(Node_id),
            case gleam@set:contains(Visited, Node_key) of
                true ->
                    do_virtual_bfs_by(
                        Rest,
                        Visited,
                        Acc,
                        Successors,
                        Key_fn,
                        Folder
                    );

                false ->
                    {Control, New_acc} = Folder(Acc, Node_id, Metadata),
                    New_visited = gleam@set:insert(Visited, Node_key),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_virtual_bfs_by(
                                Rest,
                                New_visited,
                                New_acc,
                                Successors,
                                Key_fn,
                                Folder
                            );

                        continue ->
                            Next_queue = gleam@list:fold(
                                Successors(Node_id),
                                Rest,
                                fun(Q2, Next_id) ->
                                    yog@internal@queue:push(
                                        Q2,
                                        {Next_id,
                                            {walk_metadata,
                                                erlang:element(2, Metadata) + 1,
                                                {some, Node_id}}}
                                    )
                                end
                            ),
                            do_virtual_bfs_by(
                                Next_queue,
                                New_visited,
                                New_acc,
                                Successors,
                                Key_fn,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 601).
-spec do_virtual_dfs_by(
    list({APMM, walk_metadata(APMM)}),
    gleam@set:set(APMP),
    APMR,
    fun((APMM) -> list(APMM)),
    fun((APMM) -> APMP),
    fun((APMR, APMM, walk_metadata(APMM)) -> {walk_control(), APMR})
) -> APMR.
do_virtual_dfs_by(Stack, Visited, Acc, Successors, Key_fn, Folder) ->
    case Stack of
        [] ->
            Acc;

        [{Node_id, Metadata} | Tail] ->
            Node_key = Key_fn(Node_id),
            case gleam@set:contains(Visited, Node_key) of
                true ->
                    do_virtual_dfs_by(
                        Tail,
                        Visited,
                        Acc,
                        Successors,
                        Key_fn,
                        Folder
                    );

                false ->
                    {Control, New_acc} = Folder(Acc, Node_id, Metadata),
                    New_visited = gleam@set:insert(Visited, Node_key),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_virtual_dfs_by(
                                Tail,
                                New_visited,
                                New_acc,
                                Successors,
                                Key_fn,
                                Folder
                            );

                        continue ->
                            Next_stack = gleam@list:fold(
                                lists:reverse(Successors(Node_id)),
                                Tail,
                                fun(Stk, Next_id) ->
                                    [{Next_id,
                                            {walk_metadata,
                                                erlang:element(2, Metadata) + 1,
                                                {some, Node_id}}} |
                                        Stk]
                                end
                            ),
                            do_virtual_dfs_by(
                                Next_stack,
                                New_visited,
                                New_acc,
                                Successors,
                                Key_fn,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 326).
?DOC(
    " Like `implicit_fold`, but deduplicates visited nodes by a custom key.\n"
    "\n"
    " This is essential when your node type carries extra state beyond what\n"
    " defines \"identity\". For example, in state-space search you might have\n"
    " `#(Position, Mask)` nodes, but only want to visit each `Position` once —\n"
    " the `Mask` is just carried state, not part of the identity.\n"
    "\n"
    " The `visited_by` function extracts the deduplication key from each node.\n"
    " Internally, a `Set(key)` tracks which keys have been visited, but the\n"
    " full `nid` value (with all its state) is still passed to your folder.\n"
    "\n"
    " **Time Complexity:** O(V + E) for both BFS and DFS, where V and E are\n"
    " measured in terms of unique *keys* (not unique nodes).\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Search a maze where nodes carry both position and step count\n"
    " // but we only want to visit each position once (first-visit wins)\n"
    " type State {\n"
    "   State(pos: #(Int, Int), steps: Int)\n"
    " }\n"
    "\n"
    " traversal.implicit_fold_by(\n"
    "   from: State(#(0, 0), 0),\n"
    "   using: BreadthFirst,\n"
    "   initial: None,\n"
    "   successors_of: fn(state) {\n"
    "     neighbors(state.pos)\n"
    "     |> list.map(fn(next_pos) {\n"
    "       State(next_pos, state.steps + 1)\n"
    "     })\n"
    "   },\n"
    "   visited_by: fn(state) { state.pos },  // Dedupe by position only\n"
    "   with: fn(acc, state, _meta) {\n"
    "     case state.pos == target {\n"
    "       True -> #(Halt, Some(state.steps))\n"
    "       False -> #(Continue, acc)\n"
    "     }\n"
    "   },\n"
    " )\n"
    " ```\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - **Puzzle solving**: `#(board_state, moves)` → dedupe by `board_state`\n"
    " - **Path finding with budget**: `#(pos, fuel_left)` → dedupe by `pos`\n"
    " - **Game state search**: `#(position, inventory)` → dedupe by `position`\n"
    " - **Graph search with metadata**: `#(node_id, path_history)` → dedupe by `node_id`\n"
    "\n"
    " ## Comparison to `implicit_fold`\n"
    "\n"
    " - `implicit_fold`: Deduplicates by the entire node value `nid`\n"
    " - `implicit_fold_by`: Deduplicates by `visited_by(nid)` but keeps full `nid`\n"
    "\n"
    " Similar to SQL's `DISTINCT ON(key)` or Python's `key=` parameter.\n"
).
-spec implicit_fold_by(
    APKT,
    order(),
    APKU,
    fun((APKT) -> list(APKT)),
    fun((APKT) -> any()),
    fun((APKU, APKT, walk_metadata(APKT)) -> {walk_control(), APKU})
) -> APKU.
implicit_fold_by(Start, Order, Acc, Successors, Key_fn, Folder) ->
    Start_meta = {walk_metadata, 0, none},
    case Order of
        breadth_first ->
            do_virtual_bfs_by(
                begin
                    _pipe = yog@internal@queue:new(),
                    yog@internal@queue:push(_pipe, {Start, Start_meta})
                end,
                gleam@set:new(),
                Acc,
                Successors,
                Key_fn,
                Folder
            );

        depth_first ->
            do_virtual_dfs_by(
                [{Start, Start_meta}],
                gleam@set:new(),
                Acc,
                Successors,
                Key_fn,
                Folder
            )
    end.

-file("src/yog/traversal.gleam", 714).
-spec do_implicit_dijkstra(
    gleamy@pairing_heap:heap({integer(), APMX}),
    gleam@dict:dict(APMX, integer()),
    APNB,
    fun((APMX) -> list({APMX, integer()})),
    fun((APNB, APMX, integer()) -> {walk_control(), APNB})
) -> APNB.
do_implicit_dijkstra(Frontier, Best, Acc, Successors, Folder) ->
    case gleamy@priority_queue:pop(Frontier) of
        {error, nil} ->
            Acc;

        {ok, {{Cost, Node}, Rest}} ->
            case gleam_stdlib:map_get(Best, Node) of
                {ok, Prev} when Prev < Cost ->
                    do_implicit_dijkstra(Rest, Best, Acc, Successors, Folder);

                _ ->
                    New_best = gleam@dict:insert(Best, Node, Cost),
                    {Control, New_acc} = Folder(Acc, Node, Cost),
                    case Control of
                        halt ->
                            New_acc;

                        stop ->
                            do_implicit_dijkstra(
                                Rest,
                                New_best,
                                New_acc,
                                Successors,
                                Folder
                            );

                        continue ->
                            Next_frontier = gleam@list:fold(
                                Successors(Node),
                                Rest,
                                fun(Q, Neighbor) ->
                                    {Nb_node, Edge_cost} = Neighbor,
                                    New_cost = Cost + Edge_cost,
                                    case gleam_stdlib:map_get(New_best, Nb_node) of
                                        {ok, Prev_cost} when Prev_cost =< New_cost ->
                                            Q;

                                        _ ->
                                            gleamy@priority_queue:push(
                                                Q,
                                                {New_cost, Nb_node}
                                            )
                                    end
                                end
                            ),
                            do_implicit_dijkstra(
                                Next_frontier,
                                New_best,
                                New_acc,
                                Successors,
                                Folder
                            )
                    end
            end
    end.

-file("src/yog/traversal.gleam", 700).
?DOC(
    " Traverses an *implicit* weighted graph using Dijkstra's algorithm,\n"
    " folding over visited nodes in order of increasing cost.\n"
    "\n"
    " Like `implicit_fold` but uses a priority queue so nodes are visited\n"
    " cheapest-first. Ideal for shortest-path problems on implicit state spaces\n"
    " where edge costs vary — e.g., state-space search with Manhattan moves, or\n"
    " multi-robot coordination where multiple robots share a key-bitmask state.\n"
    "\n"
    " - `successors_of`: Given a node, return `List(#(neighbor, edge_cost))`.\n"
    "   Include only valid transitions (filtering here avoids dead states).\n"
    " - `folder`: Called once per node, with `(acc, node, cost_so_far)`.\n"
    "   Return `#(Halt, result)` to stop immediately, `#(Stop, acc)` to skip\n"
    "   expanding this node's successors, or `#(Continue, acc)` to continue.\n"
    "\n"
    " Internally maintains a `Dict(nid, Int)` of best-known costs;\n"
    " stale priority-queue entries are automatically skipped.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Shortest path in an implicit maze with uniform cost\n"
    " traversal.implicit_dijkstra(\n"
    "   from: start,\n"
    "   initial: -1,\n"
    "   successors_of: fn(pos) {\n"
    "     neighbours(pos)\n"
    "     |> list.map(fn(nb) { #(nb, 1) })  // uniform cost\n"
    "   },\n"
    "   with: fn(acc, pos, cost) {\n"
    "     case pos == target {\n"
    "       True -> #(Halt, cost)\n"
    "       False -> #(Continue, acc)\n"
    "     }\n"
    "   },\n"
    " )\n"
    " ```\n"
).
-spec implicit_dijkstra(
    APMU,
    APMV,
    fun((APMU) -> list({APMU, integer()})),
    fun((APMV, APMU, integer()) -> {walk_control(), APMV})
) -> APMV.
implicit_dijkstra(Start, Acc, Successors, Folder) ->
    Frontier = begin
        _pipe = gleamy@priority_queue:new(
            fun(A, B) ->
                gleam@int:compare(erlang:element(1, A), erlang:element(1, B))
            end
        ),
        gleamy@priority_queue:push(_pipe, {0, Start})
    end,
    do_implicit_dijkstra(Frontier, maps:new(), Acc, Successors, Folder).
