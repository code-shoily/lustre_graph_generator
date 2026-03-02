-record(disjoint_set, {
    parents :: gleam@dict:dict(any(), any()),
    ranks :: gleam@dict:dict(any(), integer())
}).
