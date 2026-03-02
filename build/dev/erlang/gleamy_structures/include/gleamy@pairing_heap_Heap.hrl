-record(heap, {
    root :: gleamy@pairing_heap:tree(any()),
    compare :: fun((any(), any()) -> gleam@order:order())
}).
