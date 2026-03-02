-record(heap, {
    root :: gleamy@leftist_heap:tree(any()),
    compare :: fun((any(), any()) -> gleam@order:order())
}).
