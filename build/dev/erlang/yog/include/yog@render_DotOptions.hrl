-record(dot_options, {
    node_label :: fun((integer(), binary()) -> binary()),
    edge_label :: fun((binary()) -> binary()),
    highlighted_nodes :: gleam@option:option(list(integer())),
    highlighted_edges :: gleam@option:option(list({integer(), integer()})),
    node_shape :: binary(),
    highlight_color :: binary()
}).
