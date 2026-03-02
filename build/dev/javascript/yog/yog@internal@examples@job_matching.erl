-module(yog@internal@examples@job_matching).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/job_matching.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/job_matching.gleam", 183).
?DOC(false).
-spec find_edge_weight(list({integer(), integer()}), integer()) -> integer().
find_edge_weight(Edges, Target) ->
    case Edges of
        [] ->
            0;

        [{Node, Weight} | Rest] ->
            case Node =:= Target of
                true ->
                    Weight;

                false ->
                    find_edge_weight(Rest, Target)
            end
    end.

-file("src/yog/internal/examples/job_matching.gleam", 149).
?DOC(false).
-spec find_assignment(
    yog@model:graph(nil, integer()),
    yog@model:graph(nil, integer()),
    integer(),
    binary(),
    list({integer(), binary()})
) -> {ok, {binary(), binary()}} | {error, nil}.
find_assignment(Residual, Original, Candidate_id, Candidate_name, Jobs) ->
    case Jobs of
        [] ->
            {error, nil};

        [{Job_id, Job_name} | Rest_jobs] ->
            Original_capacity = begin
                _pipe = yog@model:successors(Original, Candidate_id),
                find_edge_weight(_pipe, Job_id)
            end,
            Residual_capacity = begin
                _pipe@1 = yog@model:successors(Residual, Candidate_id),
                find_edge_weight(_pipe@1, Job_id)
            end,
            case {Original_capacity, Residual_capacity} of
                {1, 0} ->
                    {ok, {Candidate_name, Job_name}};

                {_, _} ->
                    find_assignment(
                        Residual,
                        Original,
                        Candidate_id,
                        Candidate_name,
                        Rest_jobs
                    )
            end
    end.

-file("src/yog/internal/examples/job_matching.gleam", 124).
?DOC(false).
-spec extract_assignments(
    yog@model:graph(nil, integer()),
    yog@model:graph(nil, integer()),
    list({integer(), binary()}),
    list({integer(), binary()})
) -> list({binary(), binary()}).
extract_assignments(Residual, Original, Candidates, Jobs) ->
    case Candidates of
        [] ->
            [];

        [{Candidate_id, Candidate_name} | Rest_candidates] ->
            Assignment = find_assignment(
                Residual,
                Original,
                Candidate_id,
                Candidate_name,
                Jobs
            ),
            case Assignment of
                {ok, Match} ->
                    [Match |
                        extract_assignments(
                            Residual,
                            Original,
                            Rest_candidates,
                            Jobs
                        )];

                {error, _} ->
                    extract_assignments(
                        Residual,
                        Original,
                        Rest_candidates,
                        Jobs
                    )
            end
    end.

-file("src/yog/internal/examples/job_matching.gleam", 194).
?DOC(false).
-spec print_assignments(list({binary(), binary()})) -> nil.
print_assignments(Assignments) ->
    case Assignments of
        [] ->
            nil;

        [{Candidate, Job} | Rest] ->
            gleam_stdlib:println(
                <<<<<<"  "/utf8, Candidate/binary>>/binary, " -> "/utf8>>/binary,
                    Job/binary>>
            ),
            print_assignments(Rest)
    end.

-file("src/yog/internal/examples/job_matching.gleam", 7).
?DOC(false).
-spec main() -> nil.
main() ->
    gleam_stdlib:println(<<"=== Job Matching with Max Flow ===\n"/utf8>>),
    gleam_stdlib:println(<<"Candidates and their qualifications:"/utf8>>),
    gleam_stdlib:println(
        <<"  Alice (1): Qualified for Software Engineer (5), Data Analyst (6)"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Bob (2): Qualified for Software Engineer (5), Project Manager (7)"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Carol (3): Qualified for Data Analyst (6), Designer (8)"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Dave (4): Qualified for Project Manager (7), Designer (8)\n"/utf8>>
    ),
    Network = begin
        _pipe = yog:directed(),
        _pipe@1 = yog:add_edge(_pipe, 0, 1, 1),
        _pipe@2 = yog:add_edge(_pipe@1, 0, 2, 1),
        _pipe@3 = yog:add_edge(_pipe@2, 0, 3, 1),
        _pipe@4 = yog:add_edge(_pipe@3, 0, 4, 1),
        _pipe@5 = yog:add_edge(_pipe@4, 1, 5, 1),
        _pipe@6 = yog:add_edge(_pipe@5, 1, 6, 1),
        _pipe@7 = yog:add_edge(_pipe@6, 2, 5, 1),
        _pipe@8 = yog:add_edge(_pipe@7, 2, 7, 1),
        _pipe@9 = yog:add_edge(_pipe@8, 3, 6, 1),
        _pipe@10 = yog:add_edge(_pipe@9, 3, 8, 1),
        _pipe@11 = yog:add_edge(_pipe@10, 4, 7, 1),
        _pipe@12 = yog:add_edge(_pipe@11, 4, 8, 1),
        _pipe@13 = yog:add_edge(_pipe@12, 5, 9, 1),
        _pipe@14 = yog:add_edge(_pipe@13, 6, 9, 1),
        _pipe@15 = yog:add_edge(_pipe@14, 7, 9, 1),
        yog:add_edge(_pipe@15, 8, 9, 1)
    end,
    Result = yog@max_flow:edmonds_karp(
        Network,
        0,
        9,
        0,
        fun gleam@int:add/2,
        fun(A, B) -> A - B end,
        fun gleam@int:compare/2,
        fun gleam@int:min/2
    ),
    gleam_stdlib:println(
        <<<<"Maximum matching: "/utf8,
                (erlang:integer_to_binary(erlang:element(2, Result)))/binary>>/binary,
            " people can be assigned to jobs"/utf8>>
    ),
    case erlang:element(2, Result) =:= 4 of
        true ->
            gleam_stdlib:println(
                <<"Perfect matching! All jobs can be filled."/utf8>>
            );

        false ->
            gleam_stdlib:println(
                <<<<"Only "/utf8,
                        (erlang:integer_to_binary(erlang:element(2, Result)))/binary>>/binary,
                    " jobs can be filled with qualified candidates."/utf8>>
            )
    end,
    gleam_stdlib:println(<<"\nAssignments (by analyzing flow):"/utf8>>),
    gleam_stdlib:println(
        <<"To see actual assignments, check which edges from candidates to jobs have flow > 0"/utf8>>
    ),
    Assignments = extract_assignments(
        erlang:element(3, Result),
        Network,
        [{1, <<"Alice"/utf8>>},
            {2, <<"Bob"/utf8>>},
            {3, <<"Carol"/utf8>>},
            {4, <<"Dave"/utf8>>}],
        [{5, <<"Software Engineer"/utf8>>},
            {6, <<"Data Analyst"/utf8>>},
            {7, <<"Project Manager"/utf8>>},
            {8, <<"Designer"/utf8>>}]
    ),
    print_assignments(Assignments).
