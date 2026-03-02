-record(set, {
    root :: gleamy@red_black_tree_set:node_(any()),
    compare :: fun((any(), any()) -> gleam@order:order())
}).
