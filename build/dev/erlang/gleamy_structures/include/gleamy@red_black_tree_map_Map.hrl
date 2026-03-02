-record(map, {
    root :: gleamy@red_black_tree_map:node_(any(), any()),
    compare :: fun((any(), any()) -> gleam@order:order())
}).
