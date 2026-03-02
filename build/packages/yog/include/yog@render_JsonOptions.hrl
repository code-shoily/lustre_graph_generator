-record(json_options, {
    node_mapper :: fun((integer(), binary()) -> gleam@json:json()),
    edge_mapper :: fun((integer(), integer(), binary()) -> gleam@json:json())
}).
