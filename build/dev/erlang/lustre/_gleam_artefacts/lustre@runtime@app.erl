-module(lustre@runtime@app).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/runtime/app.gleam").
-export([configure_server_component/1, configure/1]).
-export_type([app/3, config/1, option/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-type app(WPA, WPB, WPC) :: {app,
        gleam@option:option(gleam@erlang@process:name(lustre@runtime@server@runtime:message(WPC))),
        fun((WPA) -> {WPB, lustre@effect:effect(WPC)}),
        fun((WPB, WPC) -> {WPB, lustre@effect:effect(WPC)}),
        fun((WPB) -> lustre@vdom@vnode:element(WPC)),
        config(WPC)}.

-type config(WPD) :: {config,
        boolean(),
        boolean(),
        boolean(),
        list({binary(), fun((binary()) -> {ok, WPD} | {error, nil})}),
        list({binary(), gleam@dynamic@decode:decoder(WPD)}),
        list({binary(), gleam@dynamic@decode:decoder(WPD)}),
        boolean(),
        gleam@option:option(fun((binary()) -> WPD)),
        gleam@option:option(WPD),
        gleam@option:option(fun((binary()) -> WPD)),
        gleam@option:option(WPD),
        gleam@option:option(WPD),
        gleam@option:option(WPD)}.

-type option(WPE) :: {option, fun((config(WPE)) -> config(WPE))}.

-file("src/lustre/runtime/app.gleam", 75).
?DOC(false).
-spec configure_server_component(config(WPJ)) -> lustre@runtime@server@runtime:config(WPJ).
configure_server_component(Config) ->
    {config,
        erlang:element(2, Config),
        erlang:element(3, Config),
        maps:from_list(lists:reverse(erlang:element(5, Config))),
        maps:from_list(lists:reverse(erlang:element(6, Config))),
        maps:from_list(lists:reverse(erlang:element(7, Config))),
        erlang:element(12, Config),
        erlang:element(14, Config)}.

-file("src/lustre/runtime/app.gleam", 71).
?DOC(false).
-spec configure(list(option(WPF))) -> config(WPF).
configure(Options) ->
    gleam@list:fold(
        Options,
        {config,
            true,
            true,
            false,
            [],
            [],
            [],
            false,
            none,
            none,
            none,
            none,
            none,
            none},
        fun(Config, Option) -> (erlang:element(2, Option))(Config) end
    ).
