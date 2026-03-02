-record(tarjan_state, {
    index :: integer(),
    stack :: list(integer()),
    on_stack :: gleam@dict:dict(integer(), boolean()),
    indices :: gleam@dict:dict(integer(), integer()),
    low_links :: gleam@dict:dict(integer(), integer()),
    components :: list(list(integer()))
}).
