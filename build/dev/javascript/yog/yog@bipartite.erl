-module(yog@bipartite).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/bipartite.gleam").
-export([partition/1, is_bipartite/1, get_partner/2, stable_marriage/2, maximum_matching/2]).
-export_type([partition/0, matching/0, stable_marriage/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type partition() :: {partition,
        gleam@set:set(integer()),
        gleam@set:set(integer())}.

-type matching() :: {matching,
        gleam@dict:dict(integer(), integer()),
        gleam@dict:dict(integer(), integer())}.

-type stable_marriage() :: {stable_marriage,
        gleam@dict:dict(integer(), integer())}.

-file("src/yog/bipartite.gleam", 221).
-spec get_neighbors(yog@model:graph(any(), any()), integer()) -> list(integer()).
get_neighbors(Graph, Node) ->
    case erlang:element(2, Graph) of
        undirected ->
            case gleam_stdlib:map_get(erlang:element(4, Graph), Node) of
                {error, _} ->
                    [];

                {ok, Neighbors} ->
                    maps:keys(Neighbors)
            end;

        directed ->
            Out_neighbors = case gleam_stdlib:map_get(
                erlang:element(4, Graph),
                Node
            ) of
                {error, _} ->
                    [];

                {ok, Neighbors@1} ->
                    maps:keys(Neighbors@1)
            end,
            In_neighbors = case gleam_stdlib:map_get(
                erlang:element(5, Graph),
                Node
            ) of
                {error, _} ->
                    [];

                {ok, Neighbors@2} ->
                    maps:keys(Neighbors@2)
            end,
            _pipe = lists:append(Out_neighbors, In_neighbors),
            gleam@list:unique(_pipe)
    end.

-file("src/yog/bipartite.gleam", 189).
-spec do_bfs_color(
    yog@model:graph(any(), any()),
    list({integer(), boolean()}),
    gleam@dict:dict(integer(), boolean())
) -> gleam@option:option(gleam@dict:dict(integer(), boolean())).
do_bfs_color(Graph, Queue, Colors) ->
    case Queue of
        [] ->
            {some, Colors};

        [{Node, Color} | Rest] ->
            case gleam_stdlib:map_get(Colors, Node) of
                {ok, Existing_color} ->
                    case Existing_color =:= Color of
                        true ->
                            do_bfs_color(Graph, Rest, Colors);

                        false ->
                            none
                    end;

                {error, _} ->
                    New_colors = gleam@dict:insert(Colors, Node, Color),
                    Neighbors = get_neighbors(Graph, Node),
                    Next_color = not Color,
                    New_queue = gleam@list:fold(
                        Neighbors,
                        Rest,
                        fun(Q, Neighbor) -> [{Neighbor, Next_color} | Q] end
                    ),
                    do_bfs_color(Graph, New_queue, New_colors)
            end
    end.

-file("src/yog/bipartite.gleam", 179).
-spec bfs_color(
    yog@model:graph(any(), any()),
    integer(),
    boolean(),
    gleam@dict:dict(integer(), boolean())
) -> gleam@option:option(gleam@dict:dict(integer(), boolean())).
bfs_color(Graph, Start, Start_color, Colors) ->
    Queue = [{Start, Start_color}],
    do_bfs_color(Graph, Queue, Colors).

-file("src/yog/bipartite.gleam", 157).
-spec color_graph(
    yog@model:graph(any(), any()),
    list(integer()),
    gleam@dict:dict(integer(), boolean())
) -> gleam@option:option(gleam@dict:dict(integer(), boolean())).
color_graph(Graph, Remaining_nodes, Colors) ->
    case Remaining_nodes of
        [] ->
            {some, Colors};

        [Node | Rest] ->
            case gleam@dict:has_key(Colors, Node) of
                true ->
                    color_graph(Graph, Rest, Colors);

                false ->
                    case bfs_color(Graph, Node, true, Colors) of
                        none ->
                            none;

                        {some, Updated_colors} ->
                            color_graph(Graph, Rest, Updated_colors)
                    end
            end
    end.

-file("src/yog/bipartite.gleam", 61).
?DOC(
    " Returns the two partitions of a bipartite graph, or None if the graph is not bipartite.\n"
    "\n"
    " Uses BFS with 2-coloring to detect bipartiteness and construct the partitions.\n"
    " Handles disconnected graphs by checking all components.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " case bipartite.partition(graph) {\n"
    "   Some(Partition(left, right)) -> {\n"
    "     // left and right are the two independent sets\n"
    "     io.println(\"Graph is bipartite!\")\n"
    "   }\n"
    "   None -> io.println(\"Graph is not bipartite\")\n"
    " }\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
).
-spec partition(yog@model:graph(any(), any())) -> gleam@option:option(partition()).
partition(Graph) ->
    Nodes = maps:keys(erlang:element(3, Graph)),
    Initial_colors = maps:new(),
    case color_graph(Graph, Nodes, Initial_colors) of
        none ->
            none;

        {some, Colors} ->
            {Left, Right} = gleam@dict:fold(
                Colors,
                {gleam@set:new(), gleam@set:new()},
                fun(Acc, Node, Color) ->
                    {Left_set, Right_set} = Acc,
                    case Color of
                        true ->
                            {gleam@set:insert(Left_set, Node), Right_set};

                        false ->
                            {Left_set, gleam@set:insert(Right_set, Node)}
                    end
                end
            ),
            {some, {partition, Left, Right}}
    end.

-file("src/yog/bipartite.gleam", 37).
?DOC(
    " Checks if a graph is bipartite (2-colorable).\n"
    "\n"
    " A graph is bipartite if its vertices can be divided into two disjoint sets\n"
    " such that every edge connects a vertex in one set to a vertex in the other set.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)\n"
    "   |> yog.add_node(2, Nil)\n"
    "   |> yog.add_node(3, Nil)\n"
    "   |> yog.add_node(4, Nil)\n"
    "   |> yog.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 3, to: 4, with: 1)\n"
    "\n"
    " bipartite.is_bipartite(graph)  // => True (can color as: 1,3 vs 2,4)\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(V + E)\n"
).
-spec is_bipartite(yog@model:graph(any(), any())) -> boolean().
is_bipartite(Graph) ->
    case partition(Graph) of
        {some, _} ->
            true;

        none ->
            false
    end.

-file("src/yog/bipartite.gleam", 446).
?DOC(
    " Get the partner of a person in a stable matching.\n"
    "\n"
    " Returns `Some(partner)` if the person is matched, `None` otherwise.\n"
).
-spec get_partner(stable_marriage(), integer()) -> gleam@option:option(integer()).
get_partner(Marriage, Person) ->
    _pipe = gleam_stdlib:map_get(erlang:element(2, Marriage), Person),
    gleam@option:from_result(_pipe).

-file("src/yog/bipartite.gleam", 453).
-spec build_rankings(gleam@dict:dict(integer(), list(integer()))) -> gleam@dict:dict(integer(), gleam@dict:dict(integer(), integer())).
build_rankings(Prefs) ->
    gleam@dict:fold(
        Prefs,
        maps:new(),
        fun(Rankings, Person, Pref_list) ->
            Ranking = gleam@list:index_fold(
                Pref_list,
                maps:new(),
                fun(Rank_map, Candidate, Index) ->
                    gleam@dict:insert(Rank_map, Candidate, Index)
                end
            ),
            gleam@dict:insert(Rankings, Person, Ranking)
        end
    ).

-file("src/yog/bipartite.gleam", 557).
-spec get_current_match(gleam@dict:dict(integer(), integer()), integer()) -> gleam@option:option(integer()).
get_current_match(Matches, Person) ->
    _pipe = gleam_stdlib:map_get(Matches, Person),
    gleam@option:from_result(_pipe).

-file("src/yog/bipartite.gleam", 566).
-spec prefers(
    gleam@dict:dict(integer(), gleam@dict:dict(integer(), integer())),
    integer(),
    integer(),
    integer()
) -> boolean().
prefers(Rankings, Receiver, Proposer, Current_partner) ->
    case gleam_stdlib:map_get(Rankings, Receiver) of
        {error, _} ->
            false;

        {ok, Receiver_ranking} ->
            Proposer_rank = begin
                _pipe = gleam_stdlib:map_get(Receiver_ranking, Proposer),
                gleam@result:unwrap(_pipe, 999999)
            end,
            Current_rank = begin
                _pipe@1 = gleam_stdlib:map_get(
                    Receiver_ranking,
                    Current_partner
                ),
                gleam@result:unwrap(_pipe@1, 999999)
            end,
            Proposer_rank < Current_rank
    end.

-file("src/yog/bipartite.gleam", 466).
-spec gale_shapley(
    list(integer()),
    gleam@dict:dict(integer(), list(integer())),
    gleam@dict:dict(integer(), gleam@dict:dict(integer(), integer())),
    gleam@dict:dict(integer(), integer()),
    gleam@dict:dict(integer(), integer())
) -> gleam@dict:dict(integer(), integer()).
gale_shapley(Free_left, Left_prefs, Right_rankings, Matches, Next_proposal) ->
    case Free_left of
        [] ->
            Matches;

        [Proposer | Rest_free] ->
            Pref_list = begin
                _pipe = gleam_stdlib:map_get(Left_prefs, Proposer),
                gleam@result:unwrap(_pipe, [])
            end,
            Proposal_index = begin
                _pipe@1 = gleam_stdlib:map_get(Next_proposal, Proposer),
                gleam@result:unwrap(_pipe@1, 0)
            end,
            case gleam@list:drop(Pref_list, Proposal_index) of
                [] ->
                    gale_shapley(
                        Rest_free,
                        Left_prefs,
                        Right_rankings,
                        Matches,
                        Next_proposal
                    );

                [Receiver | _] ->
                    Updated_next = gleam@dict:insert(
                        Next_proposal,
                        Proposer,
                        Proposal_index + 1
                    ),
                    case get_current_match(Matches, Receiver) of
                        none ->
                            New_matches = begin
                                _pipe@2 = Matches,
                                _pipe@3 = gleam@dict:insert(
                                    _pipe@2,
                                    Proposer,
                                    Receiver
                                ),
                                gleam@dict:insert(_pipe@3, Receiver, Proposer)
                            end,
                            gale_shapley(
                                Rest_free,
                                Left_prefs,
                                Right_rankings,
                                New_matches,
                                Updated_next
                            );

                        {some, Current_partner} ->
                            case prefers(
                                Right_rankings,
                                Receiver,
                                Proposer,
                                Current_partner
                            ) of
                                true ->
                                    New_matches@1 = begin
                                        _pipe@4 = Matches,
                                        _pipe@5 = gleam@dict:delete(
                                            _pipe@4,
                                            Current_partner
                                        ),
                                        _pipe@6 = gleam@dict:insert(
                                            _pipe@5,
                                            Proposer,
                                            Receiver
                                        ),
                                        gleam@dict:insert(
                                            _pipe@6,
                                            Receiver,
                                            Proposer
                                        )
                                    end,
                                    New_free = [Current_partner | Rest_free],
                                    gale_shapley(
                                        New_free,
                                        Left_prefs,
                                        Right_rankings,
                                        New_matches@1,
                                        Updated_next
                                    );

                                false ->
                                    gale_shapley(
                                        [Proposer | Rest_free],
                                        Left_prefs,
                                        Right_rankings,
                                        Matches,
                                        Updated_next
                                    )
                            end
                    end
            end
    end.

-file("src/yog/bipartite.gleam", 421).
?DOC(
    " Finds a stable matching given preference lists for two groups.\n"
    "\n"
    " Uses the Gale-Shapley algorithm to find a stable matching where no two people\n"
    " would both prefer each other over their current partners.\n"
    "\n"
    " The algorithm is \"proposer-optimal\" - it finds the best stable matching for\n"
    " the proposing group (left), and the worst stable matching for the receiving\n"
    " group (right).\n"
    "\n"
    " ## Parameters\n"
    "\n"
    " - `left_prefs` - Dict mapping each left person to their preference list (most preferred first)\n"
    " - `right_prefs` - Dict mapping each right person to their preference list (most preferred first)\n"
    "\n"
    " ## Returns\n"
    "\n"
    " A `StableMarriage` containing the matched pairs. Use `get_partner()` to query matches.\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " // Medical residency matching\n"
    " let residents = dict.from_list([\n"
    "   #(1, [101, 102, 103]),  // Resident 1 prefers hospitals 101, 102, 103\n"
    "   #(2, [102, 101, 103]),\n"
    "   #(3, [101, 103, 102]),\n"
    " ])\n"
    "\n"
    " let hospitals = dict.from_list([\n"
    "   #(101, [1, 2, 3]),      // Hospital 101 prefers residents 1, 2, 3\n"
    "   #(102, [2, 1, 3]),\n"
    "   #(103, [1, 2, 3]),\n"
    " ])\n"
    "\n"
    " let matching = bipartite.stable_marriage(residents, hospitals)\n"
    " case get_partner(matching, 1) {\n"
    "   Some(hospital) -> io.println(\"Resident 1 matched to hospital \" <> int.to_string(hospital))\n"
    "   None -> io.println(\"Resident 1 unmatched\")\n"
    " }\n"
    " ```\n"
    "\n"
    " ## Properties\n"
    "\n"
    " - **Stable:** No two people would both prefer each other over their current partners\n"
    " - **Complete:** Everyone is matched (if groups are equal size)\n"
    " - **Optimal for proposers:** Left group gets best stable matching possible\n"
    " - **Pessimal for receivers:** Right group gets worst stable matching possible\n"
    "\n"
    " **Time Complexity:** O(n²) where n is the size of each group\n"
    "\n"
    " ## Use Cases\n"
    "\n"
    " - Medical residency matching (NRMP)\n"
    " - College admissions\n"
    " - Job assignments\n"
    " - Roommate pairing\n"
    " - Task allocation\n"
).
-spec stable_marriage(
    gleam@dict:dict(integer(), list(integer())),
    gleam@dict:dict(integer(), list(integer()))
) -> stable_marriage().
stable_marriage(Left_prefs, Right_prefs) ->
    Right_rankings = build_rankings(Right_prefs),
    Free_left = begin
        _pipe = maps:to_list(Left_prefs),
        _pipe@1 = gleam@list:sort(
            _pipe,
            fun(A, B) ->
                gleam@int:compare(erlang:element(1, A), erlang:element(1, B))
            end
        ),
        gleam@list:map(_pipe@1, fun(Pair) -> erlang:element(1, Pair) end)
    end,
    Matches = maps:new(),
    Next_proposal = maps:new(),
    Final_matches = gale_shapley(
        Free_left,
        Left_prefs,
        Right_rankings,
        Matches,
        Next_proposal
    ),
    {stable_marriage, Final_matches}.

-file("src/yog/bipartite.gleam", 272).
-spec try_neighbors(
    yog@model:graph(any(), any()),
    integer(),
    list(integer()),
    partition(),
    matching(),
    gleam@set:set(integer())
) -> gleam@option:option(matching()).
try_neighbors(Graph, Left_node, Right_neighbors, Partition, Matching, Visited) ->
    case Right_neighbors of
        [] ->
            none;

        [Right_node | Rest] ->
            case gleam@set:contains(Visited, Right_node) of
                true ->
                    try_neighbors(
                        Graph,
                        Left_node,
                        Rest,
                        Partition,
                        Matching,
                        Visited
                    );

                false ->
                    New_visited = gleam@set:insert(Visited, Right_node),
                    case gleam_stdlib:map_get(
                        erlang:element(3, Matching),
                        Right_node
                    ) of
                        {error, _} ->
                            {some,
                                {matching,
                                    gleam@dict:insert(
                                        erlang:element(2, Matching),
                                        Left_node,
                                        Right_node
                                    ),
                                    gleam@dict:insert(
                                        erlang:element(3, Matching),
                                        Right_node,
                                        Left_node
                                    )}};

                        {ok, Matched_left} ->
                            case find_augmenting_path(
                                Graph,
                                Matched_left,
                                Partition,
                                {matching,
                                    gleam@dict:delete(
                                        erlang:element(2, Matching),
                                        Matched_left
                                    ),
                                    gleam@dict:delete(
                                        erlang:element(3, Matching),
                                        Right_node
                                    )},
                                New_visited
                            ) of
                                none ->
                                    try_neighbors(
                                        Graph,
                                        Left_node,
                                        Rest,
                                        Partition,
                                        Matching,
                                        Visited
                                    );

                                {some, Updated_matching} ->
                                    {some,
                                        {matching,
                                            gleam@dict:insert(
                                                erlang:element(
                                                    2,
                                                    Updated_matching
                                                ),
                                                Left_node,
                                                Right_node
                                            ),
                                            gleam@dict:insert(
                                                erlang:element(
                                                    3,
                                                    Updated_matching
                                                ),
                                                Right_node,
                                                Left_node
                                            )}}
                            end
                    end
            end
    end.

-file("src/yog/bipartite.gleam", 246).
-spec find_augmenting_path(
    yog@model:graph(any(), any()),
    integer(),
    partition(),
    matching(),
    gleam@set:set(integer())
) -> gleam@option:option(matching()).
find_augmenting_path(Graph, Left_node, Partition, Matching, Visited) ->
    case gleam@dict:has_key(erlang:element(2, Matching), Left_node) of
        true ->
            none;

        false ->
            Right_neighbors = begin
                _pipe = get_neighbors(Graph, Left_node),
                gleam@list:filter(
                    _pipe,
                    fun(N) ->
                        gleam@set:contains(erlang:element(3, Partition), N)
                    end
                )
            end,
            try_neighbors(
                Graph,
                Left_node,
                Right_neighbors,
                Partition,
                Matching,
                Visited
            )
    end.

-file("src/yog/bipartite.gleam", 116).
?DOC(
    " Finds a maximum matching in a bipartite graph.\n"
    "\n"
    " A matching is a set of edges with no common vertices. A maximum matching\n"
    " has the largest possible number of edges.\n"
    "\n"
    " Uses the augmenting path algorithm (also known as the Hungarian algorithm\n"
    " for unweighted bipartite matching).\n"
    "\n"
    " Returns a list of matched pairs `#(left_node, right_node)`.\n"
    "\n"
    " ## Example\n"
    " ```gleam\n"
    " let graph =\n"
    "   yog.undirected()\n"
    "   |> yog.add_node(1, Nil)  // left\n"
    "   |> yog.add_node(2, Nil)  // left\n"
    "   |> yog.add_node(3, Nil)  // right\n"
    "   |> yog.add_node(4, Nil)  // right\n"
    "   |> yog.add_edge(from: 1, to: 3, with: 1)\n"
    "   |> yog.add_edge(from: 1, to: 4, with: 1)\n"
    "   |> yog.add_edge(from: 2, to: 3, with: 1)\n"
    "\n"
    " case bipartite.partition(graph) {\n"
    "   Some(p) -> {\n"
    "     let matching = bipartite.maximum_matching(graph, p)\n"
    "     // => [#(1, 3), #(2, 4)] or [#(1, 4), #(2, 3)]\n"
    "   }\n"
    "   None -> panic as \"Not bipartite\"\n"
    " }\n"
    " ```\n"
    "\n"
    " **Time Complexity:** O(V * E)\n"
).
-spec maximum_matching(yog@model:graph(any(), any()), partition()) -> list({integer(),
    integer()}).
maximum_matching(Graph, Partition) ->
    Matching = {matching, maps:new(), maps:new()},
    Left_list = gleam@set:to_list(erlang:element(2, Partition)),
    Final_matching = gleam@list:fold(
        Left_list,
        Matching,
        fun(Current_matching, Left_node) ->
            Visited = gleam@set:new(),
            case find_augmenting_path(
                Graph,
                Left_node,
                Partition,
                Current_matching,
                Visited
            ) of
                none ->
                    Current_matching;

                {some, Updated_matching} ->
                    Updated_matching
            end
        end
    ),
    gleam@dict:fold(
        erlang:element(2, Final_matching),
        [],
        fun(Acc, Left, Right) -> [{Left, Right} | Acc] end
    ).
