-module(yog@internal@examples@social_network_analysis).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/yog/internal/examples/social_network_analysis.gleam").
-export([main/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/yog/internal/examples/social_network_analysis.gleam", 6).
?DOC(false).
-spec main() -> nil.
main() ->
    Social_graph = begin
        _pipe = yog@model:new(directed),
        _pipe@1 = yog@model:add_node(_pipe, 1, <<"Alice"/utf8>>),
        _pipe@2 = yog@model:add_node(_pipe@1, 2, <<"Bob"/utf8>>),
        _pipe@3 = yog@model:add_node(_pipe@2, 3, <<"Carol"/utf8>>),
        _pipe@4 = yog@model:add_edge(_pipe@3, 1, 2, nil),
        _pipe@5 = yog@model:add_edge(_pipe@4, 2, 3, nil),
        yog@model:add_edge(_pipe@5, 3, 1, nil)
    end,
    Communities = yog@components:strongly_connected_components(Social_graph),
    gleam_stdlib:println(gleam@string:inspect(Communities)).
