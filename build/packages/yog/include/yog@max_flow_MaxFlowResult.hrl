-record(max_flow_result, {
    max_flow :: any(),
    residual_graph :: yog@model:graph(nil, any()),
    source :: integer(),
    sink :: integer()
}).
