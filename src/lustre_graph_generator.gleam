import gleam/dict
import gleam/float
import gleam/int
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import lustre
import lustre/attribute
import lustre/effect
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import yog/generators/classic
import yog/generators/random
import yog/model
import yog/render

pub type Tab {
  Json
  Mermaid
}

pub type Model {
  Model(
    graph_type: GraphType,
    nodes: String,
    density: String,
    width: String,
    height: String,
    m: String,
    k: String,
    p: String,
    depth: String,
    generated_json: String,
    mermaid_code: String,
    active_tab: Tab,
    validation_error: Option(String),
  )
}

pub type GraphType {
  Complete
  Cycle
  Path
  Star
  Wheel
  Bipartite
  Empty
  BinaryTree
  Grid2D
  Petersen
  ErdosRenyiGnp
  ErdosRenyiGnm
  BarabasiAlbert
  WattsStrogatz
  RandomTree
}

fn init(_flags) -> #(Model, effect.Effect(Msg)) {
  #(
    Model(
      graph_type: ErdosRenyiGnp,
      nodes: "10",
      density: "0.3",
      width: "5",
      height: "5",
      m: "2",
      k: "4",
      p: "0.1",
      depth: "3",
      generated_json: "",
      mermaid_code: "",
      active_tab: Json,
      validation_error: None,
    ),
    effect.none(),
  )
}

// =============================================================================
// UPDATE
// =============================================================================

pub type Msg {
  SelectGraphType(GraphType)
  UpdateNodes(String)
  UpdateDensity(String)
  UpdateWidth(String)
  UpdateHeight(String)
  UpdateM(String)
  UpdateK(String)
  UpdateP(String)
  UpdateDepth(String)
  GenerateGraph
  CopyJson
  CopyMermaid
  SelectTab(Tab)
}

fn update(m: Model, msg: Msg) -> #(Model, effect.Effect(Msg)) {
  case msg {
    SelectGraphType(graph_type) -> #(
      Model(..m, graph_type: graph_type),
      effect.none(),
    )
    UpdateNodes(value) -> #(Model(..m, nodes: value), effect.none())
    UpdateDensity(value) -> #(Model(..m, density: value), effect.none())
    UpdateWidth(value) -> #(Model(..m, width: value), effect.none())
    UpdateHeight(value) -> #(Model(..m, height: value), effect.none())
    UpdateM(value) -> #(Model(..m, m: value), effect.none())
    UpdateK(value) -> #(Model(..m, k: value), effect.none())
    UpdateP(value) -> #(Model(..m, p: value), effect.none())
    UpdateDepth(value) -> #(Model(..m, depth: value), effect.none())
    GenerateGraph -> {
      case validate_params(m) {
        Ok(_) -> {
          let json = generate_graph_json(m) |> format_json
          let mermaid = generate_mermaid_code(m)
          #(
            Model(
              ..m,
              generated_json: json,
              mermaid_code: mermaid,
              validation_error: None,
            ),
            effect.batch([
              render_graph_effect(json),
              render_mermaid_effect(mermaid),
            ]),
          )
        }
        Error(err) -> #(Model(..m, validation_error: Some(err)), effect.none())
      }
    }
    CopyJson -> {
      #(m, copy_to_clipboard_effect(m.generated_json))
    }
    CopyMermaid -> {
      #(m, copy_to_clipboard_effect(m.mermaid_code))
    }
    SelectTab(tab) -> {
      let m = Model(..m, active_tab: tab)
      let eff = case tab {
        Json -> render_graph_effect(m.generated_json)
        Mermaid -> render_mermaid_effect(m.mermaid_code)
      }
      #(m, eff)
    }
  }
}

fn validate_params(model: Model) -> Result(Nil, String) {
  case model.graph_type {
    BinaryTree -> {
      let d = int.parse(model.depth) |> result.unwrap(0)
      case d > 10 {
        True ->
          Error("Binary Tree depth cannot exceed 10 (it grows exponentially!)")
        False -> Ok(Nil)
      }
    }
    Complete -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 100 {
        True -> Error("Complete graph nodes cannot exceed 100")
        False -> Ok(Nil)
      }
    }
    Grid2D -> {
      let r = int.parse(model.height) |> result.unwrap(0)
      let c = int.parse(model.width) |> result.unwrap(0)
      case r * c > 2500 {
        True -> Error("Grid size (Rows x Cols) cannot exceed 2500")
        False -> Ok(Nil)
      }
    }
    ErdosRenyiGnp | ErdosRenyiGnm | BarabasiAlbert | WattsStrogatz -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 500 {
        True -> Error("Random graph nodes cannot exceed 500")
        False -> Ok(Nil)
      }
    }
    _ -> Ok(Nil)
  }
}

@external(javascript, "./graph_ffi.mjs", "renderGraph")
fn render_graph_js(json: String) -> Nil

fn render_graph_effect(json: String) -> effect.Effect(Msg) {
  effect.from(fn(_dispatch) { render_graph_js(json) })
}

@external(javascript, "./graph_ffi.mjs", "copyToClipboard")
fn copy_to_clipboard_js(text: String) -> Nil

fn copy_to_clipboard_effect(text: String) -> effect.Effect(Msg) {
  effect.from(fn(_dispatch) { copy_to_clipboard_js(text) })
}

@external(javascript, "./graph_ffi.mjs", "renderMermaid")
fn render_mermaid_js(mermaid: String) -> Nil

fn render_mermaid_effect(mermaid: String) -> effect.Effect(Msg) {
  effect.from(fn(_dispatch) { render_mermaid_js(mermaid) })
}

@external(javascript, "./graph_ffi.mjs", "formatJSON")
fn format_json(json: String) -> String

fn generate_mermaid_code(model: Model) -> String {
  let graph = case model.graph_type {
    Complete -> {
      let n = int.parse(model.nodes) |> result.unwrap(5) |> int.max(1)
      classic.complete(n)
    }
    Cycle -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(3)
      classic.cycle(n)
    }
    Path -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      classic.path(n)
    }
    Star -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      classic.star(n)
    }
    Wheel -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(4)
      classic.wheel(n)
    }
    Bipartite -> {
      let m = int.parse(model.width) |> result.unwrap(3) |> int.max(1)
      let n = int.parse(model.height) |> result.unwrap(3) |> int.max(1)
      classic.complete_bipartite(m, n)
    }
    Empty -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(0)
      classic.empty(n)
    }
    BinaryTree -> {
      let d = int.parse(model.depth) |> result.unwrap(3) |> int.max(0)
      classic.binary_tree(d)
    }
    Grid2D -> {
      let r = int.parse(model.height) |> result.unwrap(5) |> int.max(1)
      let c = int.parse(model.width) |> result.unwrap(5) |> int.max(1)
      classic.grid_2d(r, c)
    }
    Petersen -> classic.petersen()
    ErdosRenyiGnp -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let p = float.parse(model.density) |> result.unwrap(0.3)
      random.erdos_renyi_gnp(n, p)
    }
    ErdosRenyiGnm -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let m = int.parse(model.m) |> result.unwrap(10) |> int.max(0)
      random.erdos_renyi_gnm(n, m)
    }
    BarabasiAlbert -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(2)
      let m = int.parse(model.m) |> result.unwrap(1) |> int.max(1)
      random.barabasi_albert(n, m)
    }
    WattsStrogatz -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(3)
      let k = int.parse(model.k) |> result.unwrap(4) |> int.max(2)
      let p = float.parse(model.p) |> result.unwrap(0.1)
      random.watts_strogatz(n, k, p)
    }
    RandomTree -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      random.random_tree(n)
    }
  }

  let string_graph =
    model.Graph(
      kind: graph.kind,
      nodes: graph.nodes
        |> dict.map_values(fn(_k, v) {
          case string.is_empty(string.inspect(v)) {
            True -> "node"
            False -> string.inspect(v) |> string.replace("\"", "")
          }
        }),
      out_edges: graph.out_edges
        |> dict.map_values(fn(_k, edges) {
          edges |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
        }),
      in_edges: graph.in_edges
        |> dict.map_values(fn(_k, edges) {
          edges |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
        }),
    )

  render.to_mermaid(string_graph, render.default_options())
}

// =============================================================================
// VIEW
// =============================================================================

fn view(model: Model) -> Element(Msg) {
  html.div([attribute.class("max-w-[1400px] mx-auto")], [
    html.div(
      [
        attribute.class(
          "bg-slate-800/70 backdrop-blur-xl border border-white/10 rounded overflow-hidden p-12 shadow-2xl mb-12",
        ),
      ],
      [
        html.div(
          [
            attribute.class(
              "grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 mb-12",
            ),
          ],
          [
            // Left panel - Controls
            html.div([], [
              html.h1(
                [
                  attribute.class(
                    "text-4xl font-extrabold mb-2 text-white leading-tight",
                  ),
                ],
                [
                  element.text("🎨 Yog Graph Generator"),
                ],
              ),
              html.p([attribute.class("text-slate-400 mb-8 font-medium")], [
                element.text(
                  "Generate graphs interactively with Yog and visualize with Cytoscape.js!",
                ),
              ]),
              html.h3(
                [
                  attribute.class(
                    "text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
                  ),
                ],
                [element.text("Graph Type")],
              ),
              html.select(
                [
                  event.on_input(fn(val) {
                    case val {
                      "Complete" -> SelectGraphType(Complete)
                      "Cycle" -> SelectGraphType(Cycle)
                      "Path" -> SelectGraphType(Path)
                      "Star" -> SelectGraphType(Star)
                      "Wheel" -> SelectGraphType(Wheel)
                      "Bipartite" -> SelectGraphType(Bipartite)
                      "Empty" -> SelectGraphType(Empty)
                      "BinaryTree" -> SelectGraphType(BinaryTree)
                      "Grid2D" -> SelectGraphType(Grid2D)
                      "Petersen" -> SelectGraphType(Petersen)
                      "ErdosRenyiGnp" -> SelectGraphType(ErdosRenyiGnp)
                      "ErdosRenyiGnm" -> SelectGraphType(ErdosRenyiGnm)
                      "BarabasiAlbert" -> SelectGraphType(BarabasiAlbert)
                      "WattsStrogatz" -> SelectGraphType(WattsStrogatz)
                      "RandomTree" -> SelectGraphType(RandomTree)
                      _ -> SelectGraphType(ErdosRenyiGnp)
                    }
                  }),
                  attribute.class(
                    "w-full p-3 bg-slate-900/80 border border-white/10 rounded text-white font-sans text-base cursor-pointer outline-none focus:border-sky-500 transition-colors appearance-none",
                  ),
                  attribute.value(case model.graph_type {
                    Complete -> "Complete"
                    Cycle -> "Cycle"
                    Path -> "Path"
                    Star -> "Star"
                    Wheel -> "Wheel"
                    Bipartite -> "Bipartite"
                    Empty -> "Empty"
                    BinaryTree -> "BinaryTree"
                    Grid2D -> "Grid2D"
                    Petersen -> "Petersen"
                    ErdosRenyiGnp -> "ErdosRenyiGnp"
                    ErdosRenyiGnm -> "ErdosRenyiGnm"
                    BarabasiAlbert -> "BarabasiAlbert"
                    WattsStrogatz -> "WattsStrogatz"
                    RandomTree -> "RandomTree"
                  }),
                ],
                [
                  html.option([attribute.value("Complete")], "♾️ Complete"),
                  html.option([attribute.value("Cycle")], "⭕ Cycle"),
                  html.option([attribute.value("Path")], "📏 Path"),
                  html.option([attribute.value("Star")], "⭐ Star"),
                  html.option([attribute.value("Wheel")], "🎡 Wheel"),
                  html.option([attribute.value("Bipartite")], "👥 Bipartite"),
                  html.option([attribute.value("Empty")], "🕳️ Empty"),
                  html.option([attribute.value("BinaryTree")], "🌳 Binary Tree"),
                  html.option([attribute.value("Grid2D")], "🏁 Grid 2D"),
                  html.option([attribute.value("Petersen")], "📐 Petersen"),
                  html.option(
                    [attribute.value("ErdosRenyiGnp")],
                    "🎲 Random (Gnp)",
                  ),
                  html.option(
                    [attribute.value("ErdosRenyiGnm")],
                    "🎲 Random (Gnm)",
                  ),
                  html.option(
                    [attribute.value("BarabasiAlbert")],
                    "📈 Scale-free (BA)",
                  ),
                  html.option(
                    [attribute.value("WattsStrogatz")],
                    "🌐 Small-world (WS)",
                  ),
                  html.option([attribute.value("RandomTree")], "🎋 Random Tree"),
                ],
              ),
              html.h3(
                [
                  attribute.class(
                    "text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
                  ),
                ],
                [element.text("Parameters")],
              ),
              parameters_form(model),
              case model.validation_error {
                Some(err) ->
                  html.div(
                    [
                      attribute.class(
                        "mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded",
                      ),
                    ],
                    [
                      html.p(
                        [
                          attribute.class(
                            "text-red-400 text-xs font-medium m-0",
                          ),
                        ],
                        [element.text("⚠️ " <> err)],
                      ),
                    ],
                  )
                None -> element.none()
              },
              html.div([attribute.class("mt-8")], [
                html.button(
                  [
                    event.on_click(GenerateGraph),
                    attribute.class(
                      "w-full bg-sky-500 hover:bg-sky-600 text-white border-none p-4 rounded cursor-pointer text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-sky-500/20",
                    ),
                  ],
                  [element.text("✨ Generate & Visualize")],
                ),
              ]),
            ]),
            // Right panel - Results (JSON / Mermaid)
            html.div([], [
              html.div(
                [
                  attribute.class(
                    "flex gap-4 mb-4 border-b border-white/10 pb-2",
                  ),
                ],
                [
                  tab_button("JSON", Json, model.active_tab == Json),
                  tab_button("Mermaid", Mermaid, model.active_tab == Mermaid),
                ],
              ),
              html.div([], [
                case model.active_tab {
                  Json -> {
                    html.div([], [
                      html.div(
                        [
                          attribute.class(
                            "flex justify-between items-center mb-2",
                          ),
                        ],
                        [
                          html.h3(
                            [
                              attribute.class(
                                "text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0",
                              ),
                            ],
                            [
                              element.text("Generated JSON"),
                            ],
                          ),
                          case model.generated_json {
                            "" -> element.none()
                            _ ->
                              html.button(
                                [
                                  attribute.class(
                                    "bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                  ),
                                  event.on_click(CopyJson),
                                ],
                                [element.text("📋 Copy")],
                              )
                          },
                        ],
                      ),
                      case model.generated_json {
                        "" ->
                          html.p(
                            [attribute.class("text-slate-400 mb-8 font-medium")],
                            [
                              element.text("Click 'Generate' to see output"),
                            ],
                          )
                        json ->
                          html.pre(
                            [
                              attribute.class(
                                "bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400",
                              ),
                            ],
                            [element.text(json)],
                          )
                      },
                    ])
                  }
                  Mermaid -> {
                    html.div([], [
                      html.div(
                        [
                          attribute.class(
                            "flex justify-between items-center mb-2",
                          ),
                        ],
                        [
                          html.h3(
                            [
                              attribute.class(
                                "text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0",
                              ),
                            ],
                            [
                              element.text("Mermaid Definition"),
                            ],
                          ),
                          case model.mermaid_code {
                            "" -> element.none()
                            _ ->
                              html.button(
                                [
                                  attribute.class(
                                    "bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                  ),
                                  event.on_click(CopyMermaid),
                                ],
                                [element.text("📋 Copy")],
                              )
                          },
                        ],
                      ),
                      case model.mermaid_code {
                        "" ->
                          html.p(
                            [attribute.class("text-slate-400 mb-8 font-medium")],
                            [
                              element.text("Click 'Generate' to see definition"),
                            ],
                          )
                        code ->
                          html.pre(
                            [
                              attribute.class(
                                "bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400",
                              ),
                            ],
                            [element.text(code)],
                          )
                      },
                    ])
                  }
                },
              ]),
            ]),
          ],
        ),
        // Shared visualization area at the bottom
        html.div([], [
          html.h3(
            [
              attribute.class(
                "text-slate-400 text-[10px] mb-3 font-bold uppercase tracking-widest",
              ),
            ],
            [
              element.text(case model.active_tab {
                Json -> "Cytoscape Visualization"
                Mermaid -> "Mermaid Diagram"
              }),
            ],
          ),
          html.div(
            [
              attribute.id("cy"),
              attribute.class(case model.active_tab {
                Json ->
                  "w-full h-[600px] bg-slate-900/40 border border-white/10 rounded mt-4"
                Mermaid -> "hidden"
              }),
            ],
            [],
          ),
          html.div(
            [
              attribute.id("mermaid-graph"),
              attribute.class(case model.active_tab {
                Mermaid ->
                  "w-full min-h-[400px] bg-white p-8 rounded flex justify-center overflow-auto mt-4"
                Json -> "hidden"
              }),
            ],
            [],
          ),
        ]),
      ],
    ),
  ])
}

fn tab_button(label: String, tab: Tab, is_active: Bool) -> Element(Msg) {
  html.button(
    [
      event.on_click(SelectTab(tab)),
      attribute.class(case is_active {
        True ->
          "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-sky-500 text-sky-500 bg-sky-500/10"
        False ->
          "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-transparent text-slate-400 hover:text-white hover:bg-white/5"
      }),
    ],
    [element.text(label)],
  )
}

fn parameters_form(model: Model) -> Element(Msg) {
  html.div([], case model.graph_type {
    Complete | Cycle | Path | Star | Wheel | Empty | RandomTree -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
    ]
    Bipartite -> [
      input_field("Partition M", model.width, UpdateWidth, "number", "1"),
      input_field("Partition N", model.height, UpdateHeight, "number", "1"),
    ]
    BinaryTree -> [
      input_field("Depth", model.depth, UpdateDepth, "number", "1"),
    ]
    Grid2D -> [
      input_field("Rows", model.height, UpdateHeight, "number", "1"),
      input_field("Cols", model.width, UpdateWidth, "number", "1"),
    ]
    Petersen -> []
    ErdosRenyiGnp -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Probability", model.density, UpdateDensity, "number", "0.01"),
    ]
    ErdosRenyiGnm -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Edges (M)", model.m, UpdateM, "number", "1"),
    ]
    BarabasiAlbert -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Edges per node (M)", model.m, UpdateM, "number", "1"),
    ]
    WattsStrogatz -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Neighbors (K)", model.k, UpdateK, "number", "2"),
      input_field("Rewiring Prob (P)", model.p, UpdateP, "number", "0.01"),
    ]
  })
}

fn input_field(
  label: String,
  val: String,
  msg: fn(String) -> Msg,
  typ: String,
  step: String,
) -> Element(Msg) {
  html.div([attribute.class("mb-4")], [
    html.label(
      [
        attribute.class(
          "block text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1",
        ),
      ],
      [
        element.text(label),
      ],
    ),
    html.input([
      attribute.type_(typ),
      attribute.value(val),
      event.on_input(msg),
      attribute.attribute("step", step),
      attribute.class(
        "w-full p-3 bg-slate-900/80 border border-white/10 rounded text-white font-sans text-sm outline-none focus:border-sky-500 transition-colors",
      ),
    ]),
  ])
}

fn generate_graph_json(model: Model) -> String {
  let graph = case model.graph_type {
    Complete -> {
      let n = int.parse(model.nodes) |> result.unwrap(5) |> int.max(1)
      classic.complete(n)
    }
    Cycle -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(3)
      classic.cycle(n)
    }
    Path -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      classic.path(n)
    }
    Star -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      classic.star(n)
    }
    Wheel -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(4)
      classic.wheel(n)
    }
    Bipartite -> {
      let m = int.parse(model.width) |> result.unwrap(3) |> int.max(1)
      let n = int.parse(model.height) |> result.unwrap(3) |> int.max(1)
      classic.complete_bipartite(m, n)
    }
    Empty -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(0)
      classic.empty(n)
    }
    BinaryTree -> {
      let d = int.parse(model.depth) |> result.unwrap(3) |> int.max(0)
      classic.binary_tree(d)
    }
    Grid2D -> {
      let r = int.parse(model.height) |> result.unwrap(5) |> int.max(1)
      let c = int.parse(model.width) |> result.unwrap(5) |> int.max(1)
      classic.grid_2d(r, c)
    }
    Petersen -> classic.petersen()
    ErdosRenyiGnp -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let p = float.parse(model.density) |> result.unwrap(0.3)
      random.erdos_renyi_gnp(n, p)
    }
    ErdosRenyiGnm -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let m = int.parse(model.m) |> result.unwrap(10) |> int.max(0)
      random.erdos_renyi_gnm(n, m)
    }
    BarabasiAlbert -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(2)
      let m = int.parse(model.m) |> result.unwrap(1) |> int.max(1)
      random.barabasi_albert(n, m)
    }
    WattsStrogatz -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(3)
      let k = int.parse(model.k) |> result.unwrap(4) |> int.max(2)
      let p = float.parse(model.p) |> result.unwrap(0.1)
      random.watts_strogatz(n, k, p)
    }
    RandomTree -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      random.random_tree(n)
    }
  }

  // Convert to string graph for JSON rendering
  let string_graph =
    model.Graph(
      kind: graph.kind,
      nodes: graph.nodes
        |> dict.map_values(fn(_k, v) {
          case string.is_empty(string.inspect(v)) {
            True -> "node"
            False -> string.inspect(v) |> string.replace("\"", "")
          }
        }),
      out_edges: graph.out_edges
        |> dict.map_values(fn(_k, edges) {
          edges |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
        }),
      in_edges: graph.in_edges
        |> dict.map_values(fn(_k, edges) {
          edges |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
        }),
    )

  render.to_json(string_graph, render.default_json_options())
}

// =============================================================================
// MAIN
// =============================================================================

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
}
