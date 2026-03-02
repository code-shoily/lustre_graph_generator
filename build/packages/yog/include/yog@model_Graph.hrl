-record(graph, {
    kind :: yog@model:graph_type(),
    nodes :: gleam@dict:dict(integer(), any()),
    out_edges :: gleam@dict:dict(integer(), gleam@dict:dict(integer(), any())),
    in_edges :: gleam@dict:dict(integer(), gleam@dict:dict(integer(), any()))
}).
