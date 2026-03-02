-record(builder, {
    graph :: yog@model:graph(any(), any()),
    label_to_id :: gleam@dict:dict(any(), integer()),
    next_id :: integer()
}).
