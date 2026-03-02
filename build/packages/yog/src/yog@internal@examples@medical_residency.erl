-module(yog@internal@examples@medical_residency).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/medical_residency.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/medical_residency.gleam", 154).
?DOC(false).
-spec list_at(list(NGN), integer()) -> gleam@option:option(NGN).
list_at(Lst, Index) ->
    case {Index, Lst} of
        {0, [First | _]} ->
            {some, First};

        {N, [_ | Rest]} when N > 0 ->
            list_at(Rest, N - 1);

        {_, _} ->
            none
    end.

-file("src/yog/internal/examples/medical_residency.gleam", 133).
?DOC(false).
-spec get_name(list(binary()), integer()) -> binary().
get_name(Names, Index) ->
    case list_at(Names, Index) of
        {some, Name} ->
            Name;

        none ->
            <<"Unknown"/utf8>>
    end.

-file("src/yog/internal/examples/medical_residency.gleam", 167).
?DOC(false).
-spec do_index_of(list(NGT), NGT, integer()) -> gleam@option:option(integer()).
do_index_of(Lst, Target, Current) ->
    case Lst of
        [] ->
            none;

        [First | Rest] ->
            case First =:= Target of
                true ->
                    {some, Current};

                false ->
                    do_index_of(Rest, Target, Current + 1)
            end
    end.

-file("src/yog/internal/examples/medical_residency.gleam", 163).
?DOC(false).
-spec list_index_of(list(NGQ), NGQ) -> gleam@option:option(integer()).
list_index_of(Lst, Target) ->
    do_index_of(Lst, Target, 0).

-file("src/yog/internal/examples/medical_residency.gleam", 141).
?DOC(false).
-spec get_rank(
    gleam@dict:dict(integer(), list(integer())),
    integer(),
    integer()
) -> integer().
get_rank(Prefs, Person, Target) ->
    case gleam_stdlib:map_get(Prefs, Person) of
        {ok, Pref_list} ->
            case list_index_of(Pref_list, Target) of
                {some, Idx} ->
                    Idx + 1;

                none ->
                    999
            end;

        {error, _} ->
            999
    end.

-file("src/yog/internal/examples/medical_residency.gleam", 179).
?DOC(false).
-spec list_range(integer(), integer()) -> list(integer()).
list_range(Start, End) ->
    case Start > End of
        true ->
            [];

        false ->
            [Start | list_range(Start + 1, End)]
    end.

-file("src/yog/internal/examples/medical_residency.gleam", 8).
?DOC(false).
-spec main() -> nil.
main() ->
    gleam_stdlib:println(
        <<"--- Medical Residency Matching (NRMP Style) ---"/utf8>>
    ),
    gleam_stdlib:println(<<""/utf8>>),
    Residents = maps:from_list(
        [{1, [101, 102, 103, 104, 105]},
            {2, [102, 105, 101, 103, 104]},
            {3, [103, 101, 104, 102, 105]},
            {4, [104, 103, 105, 102, 101]},
            {5, [105, 104, 103, 102, 101]}]
    ),
    Hospitals = maps:from_list(
        [{101, [3, 1, 2, 4, 5]},
            {102, [1, 2, 5, 3, 4]},
            {103, [3, 4, 1, 2, 5]},
            {104, [4, 5, 3, 2, 1]},
            {105, [5, 2, 4, 3, 1]}]
    ),
    gleam_stdlib:println(<<"Resident Preferences:"/utf8>>),
    gleam_stdlib:println(
        <<"  Dr. Anderson (1): City General, Metro, University, Regional, Coastal"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Dr. Brown (2):    Metro, Coastal, City General, University, Regional"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Dr. Chen (3):     University, City General, Regional, Metro, Coastal"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Dr. Davis (4):    Regional, University, Coastal, Metro, City General"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Dr. Evans (5):    Coastal, Regional, University, Metro, City General"/utf8>>
    ),
    gleam_stdlib:println(<<""/utf8>>),
    gleam_stdlib:println(<<"Hospital Preferences:"/utf8>>),
    gleam_stdlib:println(
        <<"  City General (101):  Chen, Anderson, Brown, Davis, Evans"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Metro Hospital (102): Anderson, Brown, Evans, Chen, Davis"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  University Med (103): Chen, Davis, Anderson, Brown, Evans"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Regional Care (104):  Davis, Evans, Chen, Brown, Anderson"/utf8>>
    ),
    gleam_stdlib:println(
        <<"  Coastal Medical (105): Evans, Brown, Davis, Chen, Anderson"/utf8>>
    ),
    gleam_stdlib:println(<<""/utf8>>),
    Matching = yog@bipartite:stable_marriage(Residents, Hospitals),
    gleam_stdlib:println(<<"=== Stable Matching Results ==="/utf8>>),
    gleam_stdlib:println(<<""/utf8>>),
    Resident_names = [<<"Anderson"/utf8>>,
        <<"Brown"/utf8>>,
        <<"Chen"/utf8>>,
        <<"Davis"/utf8>>,
        <<"Evans"/utf8>>],
    Hospital_names = [<<"City General"/utf8>>,
        <<"Metro Hospital"/utf8>>,
        <<"University Med"/utf8>>,
        <<"Regional Care"/utf8>>,
        <<"Coastal Medical"/utf8>>],
    _pipe = list_range(1, 5),
    gleam@list:each(
        _pipe,
        fun(Resident_id) ->
            case yog@bipartite:get_partner(Matching, Resident_id) of
                {some, Hospital_id} ->
                    Resident_name = get_name(Resident_names, Resident_id - 1),
                    Hospital_name = get_name(Hospital_names, Hospital_id - 101),
                    Resident_rank = get_rank(
                        Residents,
                        Resident_id,
                        Hospital_id
                    ),
                    Hospital_rank = get_rank(
                        Hospitals,
                        Hospital_id,
                        Resident_id
                    ),
                    gleam_stdlib:println(
                        <<<<<<<<<<<<<<<<"Dr. "/utf8, Resident_name/binary>>/binary,
                                                    " (#"/utf8>>/binary,
                                                (erlang:integer_to_binary(
                                                    Resident_id
                                                ))/binary>>/binary,
                                            ") matched to "/utf8>>/binary,
                                        Hospital_name/binary>>/binary,
                                    " (#"/utf8>>/binary,
                                (erlang:integer_to_binary(Hospital_id))/binary>>/binary,
                            ")"/utf8>>
                    ),
                    gleam_stdlib:println(
                        <<<<"  - Resident's rank for this hospital: "/utf8,
                                (erlang:integer_to_binary(Resident_rank))/binary>>/binary,
                            " of 5"/utf8>>
                    ),
                    gleam_stdlib:println(
                        <<<<"  - Hospital's rank for this resident: "/utf8,
                                (erlang:integer_to_binary(Hospital_rank))/binary>>/binary,
                            " of 5"/utf8>>
                    );

                none ->
                    Resident_name@1 = get_name(Resident_names, Resident_id - 1),
                    gleam_stdlib:println(
                        <<<<"Dr. "/utf8, Resident_name@1/binary>>/binary,
                            " was not matched"/utf8>>
                    )
            end
        end
    ),
    gleam_stdlib:println(<<""/utf8>>),
    gleam_stdlib:println(<<"--- Properties of This Matching ---"/utf8>>),
    gleam_stdlib:println(
        <<"✓ Stable: No resident-hospital pair would both prefer each other"/utf8>>
    ),
    gleam_stdlib:println(
        <<"✓ Complete: All participants are matched (groups are equal size)"/utf8>>
    ),
    gleam_stdlib:println(
        <<"✓ Resident-optimal: Residents get best stable outcome possible"/utf8>>
    ),
    gleam_stdlib:println(
        <<"✓ Hospital-pessimal: Hospitals get worst stable outcome possible"/utf8>>
    ),
    gleam_stdlib:println(<<""/utf8>>),
    gleam_stdlib:println(
        <<"This is the same algorithm used by the real NRMP!"/utf8>>
    ).
