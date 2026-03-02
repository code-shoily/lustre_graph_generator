-module(yog@components).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/components.gleam").
-export([strongly_connected_components/1, kosaraju/1]).
-export_type([tarjan_state/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type tarjan_state() :: {tarjan_state,
        integer(),
        list(integer()),
        gleam@dict:dict(integer(), boolean()),
        gleam@dict:dict(integer(), integer()),
        gleam@dict:dict(integer(), integer()),
        list(list(integer()))}.

-file("src/yog/components.gleam", 105).
-spec pop_stack_until(integer(), tarjan_state(), list(integer())) -> tarjan_state().
pop_stack_until(U, State, Component) ->
    case erlang:element(3, State) of
        [] ->
            State;

        [Head | Tail] ->
            New_component = [Head | Component],
            New_on_stack = gleam@dict:insert(
                erlang:element(4, State),
                Head,
                false
            ),
            Next_state = {tarjan_state,
                erlang:element(2, State),
                Tail,
                New_on_stack,
                erlang:element(5, State),
                erlang:element(6, State),
                erlang:element(7, State)},
            case Head =:= U of
                true ->
                    {tarjan_state,
                        erlang:element(2, Next_state),
                        erlang:element(3, Next_state),
                        erlang:element(4, Next_state),
                        erlang:element(5, Next_state),
                        erlang:element(6, Next_state),
                        [New_component | erlang:element(7, State)]};

                false ->
                    pop_stack_until(U, Next_state, New_component)
            end
    end.

-file("src/yog/components.gleam", 46).
-spec strong_connect(yog@model:graph(any(), any()), integer(), tarjan_state()) -> tarjan_state().
strong_connect(Graph, U, State) ->
    State@1 = {tarjan_state,
        erlang:element(2, State) + 1,
        [U | erlang:element(3, State)],
        gleam@dict:insert(erlang:element(4, State), U, true),
        gleam@dict:insert(erlang:element(5, State), U, erlang:element(2, State)),
        gleam@dict:insert(erlang:element(6, State), U, erlang:element(2, State)),
        erlang:element(7, State)},
    Successors = yog@model:successor_ids(Graph, U),
    State@2 = gleam@list:fold(
        Successors,
        State@1,
        fun(St, V) -> case gleam@dict:has_key(erlang:element(5, St), V) of
                false ->
                    St@1 = strong_connect(Graph, V, St),
                    U_low = begin
                        _pipe = gleam_stdlib:map_get(erlang:element(6, St@1), U),
                        gleam@result:unwrap(_pipe, 0)
                    end,
                    V_low = begin
                        _pipe@1 = gleam_stdlib:map_get(
                            erlang:element(6, St@1),
                            V
                        ),
                        gleam@result:unwrap(_pipe@1, 0)
                    end,
                    {tarjan_state,
                        erlang:element(2, St@1),
                        erlang:element(3, St@1),
                        erlang:element(4, St@1),
                        erlang:element(5, St@1),
                        gleam@dict:insert(
                            erlang:element(6, St@1),
                            U,
                            gleam@int:min(U_low, V_low)
                        ),
                        erlang:element(7, St@1)};

                true ->
                    case begin
                        _pipe@2 = gleam_stdlib:map_get(erlang:element(4, St), V),
                        gleam@result:unwrap(_pipe@2, false)
                    end of
                        true ->
                            U_low@1 = begin
                                _pipe@3 = gleam_stdlib:map_get(
                                    erlang:element(6, St),
                                    U
                                ),
                                gleam@result:unwrap(_pipe@3, 0)
                            end,
                            V_index = begin
                                _pipe@4 = gleam_stdlib:map_get(
                                    erlang:element(5, St),
                                    V
                                ),
                                gleam@result:unwrap(_pipe@4, 0)
                            end,
                            {tarjan_state,
                                erlang:element(2, St),
                                erlang:element(3, St),
                                erlang:element(4, St),
                                erlang:element(5, St),
                                gleam@dict:insert(
                                    erlang:element(6, St),
                                    U,
                                    gleam@int:min(U_low@1, V_index)
                                ),
                                erlang:element(7, St)};

                        false ->
                            St
                    end
            end end
    ),
    U_index = begin
        _pipe@5 = gleam_stdlib:map_get(erlang:element(5, State@2), U),
        gleam@result:unwrap(_pipe@5, 0)
    end,
    U_low@2 = begin
        _pipe@6 = gleam_stdlib:map_get(erlang:element(6, State@2), U),
        gleam@result:unwrap(_pipe@6, 0)
    end,
    case U_low@2 =:= U_index of
        true ->
            pop_stack_until(U, State@2, []);

        false ->
            State@2
    end.

-file("src/yog/components.gleam", 22).
?DOC(
    " Finds Strongly Connected Components (SCC) using Tarjan's Algorithm.\n"
    " Returns a list of components, where each component is a list of NodeIds.\n"
).
-spec strongly_connected_components(yog@model:graph(any(), any())) -> list(list(integer())).
strongly_connected_components(Graph) ->
    Nodes = yog@model:all_nodes(Graph),
    Initial_state = {tarjan_state,
        0,
        [],
        maps:new(),
        maps:new(),
        maps:new(),
        []},
    Final_state = gleam@list:fold(
        Nodes,
        Initial_state,
        fun(State, Node) ->
            case gleam@dict:has_key(erlang:element(5, State), Node) of
                true ->
                    State;

                false ->
                    strong_connect(Graph, Node, State)
            end
        end
    ),
    erlang:element(7, Final_state).

-file("src/yog/components.gleam", 196).
-spec first_dfs(
    yog@model:graph(any(), any()),
    integer(),
    gleam@set:set(integer()),
    list(integer())
) -> {list(integer()), gleam@set:set(integer())}.
first_dfs(Graph, Node, Visited, Stack) ->
    case gleam@set:contains(Visited, Node) of
        true ->
            {Stack, Visited};

        false ->
            New_visited = gleam@set:insert(Visited, Node),
            Successors = yog@model:successor_ids(Graph, Node),
            {New_stack, Final_visited} = gleam@list:fold(
                Successors,
                {Stack, New_visited},
                fun(Acc, Succ) ->
                    {S, V} = Acc,
                    first_dfs(Graph, Succ, V, S)
                end
            ),
            {[Node | New_stack], Final_visited}
    end.

-file("src/yog/components.gleam", 222).
-spec second_dfs(
    yog@model:graph(any(), any()),
    integer(),
    gleam@set:set(integer()),
    list(integer())
) -> {list(integer()), gleam@set:set(integer())}.
second_dfs(Transposed, Node, Visited, Component) ->
    case gleam@set:contains(Visited, Node) of
        true ->
            {Component, Visited};

        false ->
            New_visited = gleam@set:insert(Visited, Node),
            New_component = [Node | Component],
            Successors = yog@model:successor_ids(Transposed, Node),
            gleam@list:fold(
                Successors,
                {New_component, New_visited},
                fun(Acc, Succ) ->
                    {Comp, Vis} = Acc,
                    second_dfs(Transposed, Succ, Vis, Comp)
                end
            )
    end.

-file("src/yog/components.gleam", 165).
?DOC(
    " Finds Strongly Connected Components (SCC) using Kosaraju's Algorithm.\n"
    "\n"
    " Returns a list of components, where each component is a list of NodeIds.\n"
    " Kosaraju's algorithm uses two DFS passes and graph transposition:\n"
    "\n"
    " 1. First DFS: Compute finishing times (nodes added to stack when DFS completes)\n"
    " 2. Transpose the graph (reverse all edges) - O(1) operation!\n"
    " 3. Second DFS: Process nodes in reverse finishing time order on transposed graph\n"
    "\n"
    " **Time Complexity:** O(V + E) where V is vertices and E is edges\n"
    " **Space Complexity:** O(V) for the visited set and finish stack\n"
    "\n"
    " ## Example\n"
    "\n"
    " ```gleam\n"
    " let graph =\n"
    "   model.new(Directed)\n"
    "   |> model.add_node(1, \"A\")\n"
    "   |> model.add_node(2, \"B\")\n"
    "   |> model.add_node(3, \"C\")\n"
    "   |> model.add_edge(from: 1, to: 2, with: 1)\n"
    "   |> model.add_edge(from: 2, to: 3, with: 1)\n"
    "   |> model.add_edge(from: 3, to: 1, with: 1)\n"
    "\n"
    " let sccs = components.kosaraju(graph)\n"
    " // => [[1, 2, 3]]  // All nodes form one SCC (cycle)\n"
    " ```\n"
    "\n"
    " ## Comparison with Tarjan's Algorithm\n"
    "\n"
    " - **Kosaraju:** Two DFS passes, requires graph transposition, simpler to understand\n"
    " - **Tarjan:** Single DFS pass, no transposition needed, uses low-link values\n"
    "\n"
    " Both have the same O(V + E) time complexity, but Kosaraju may be preferred when:\n"
    " - The graph is already stored in a format supporting fast transposition\n"
    " - Simplicity and clarity are prioritized over single-pass execution\n"
).
-spec kosaraju(yog@model:graph(any(), any())) -> list(list(integer())).
kosaraju(Graph) ->
    Nodes = yog@model:all_nodes(Graph),
    {Finish_stack, _} = gleam@list:fold(
        Nodes,
        {[], gleam@set:new()},
        fun(Acc, Node) ->
            {Stack, Visited} = Acc,
            first_dfs(Graph, Node, Visited, Stack)
        end
    ),
    Transposed = yog@transform:transpose(Graph),
    {Components@1, _} = gleam@list:fold(
        Finish_stack,
        {[], gleam@set:new()},
        fun(Acc@1, Node@1) ->
            {Components, Visited@1} = Acc@1,
            case gleam@set:contains(Visited@1, Node@1) of
                true ->
                    Acc@1;

                false ->
                    {Component, New_visited} = second_dfs(
                        Transposed,
                        Node@1,
                        Visited@1,
                        []
                    ),
                    {[Component | Components], New_visited}
            end
        end
    ),
    Components@1.
