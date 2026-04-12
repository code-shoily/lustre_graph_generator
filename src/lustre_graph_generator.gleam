import gleam/dict
import gleam/float
import gleam/int
import gleam/json
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import lustre
import lustre/attribute
import lustre/effect
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import yog/builder/grid
import yog/generator/classic
import yog/generator/maze
import yog/generator/random
import yog/model
import yog/pathfinding/dijkstra
import yog/render/ascii
import yog/render/dot
import yog/render/mermaid
import yog/traversal

pub type Tab {
  Json
  Mermaid
  Dot
  Ascii
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
    arity: String,
    spine_length: String,
    degree: String,
    communities: String,
    radius: String,
    generated_json: String,
    mermaid_code: String,
    dot_code: String,
    ascii_code: String,
    csv_input: String,
    matrix_input: String,
    analysis_source: String,
    analysis_target: String,
    analysis_result: Option(String),
    active_tab: Tab,
    validation_error: Option(String),
  )
}

pub type GraphType {
  // Classic
  Complete
  Cycle
  Path
  Star
  Wheel
  Bipartite
  Empty
  BinaryTree
  KAryTree
  CompleteKAry
  Caterpillar
  Grid2D
  Petersen
  Hypercube
  Ladder
  CircularLadder
  MobiusLadder
  Friendship
  Windmill
  Book
  Crown
  Turan
  Tetrahedron
  Cube
  Octahedron
  Dodecahedron
  Icosahedron
  // Random
  ErdosRenyiGnp
  ErdosRenyiGnm
  BarabasiAlbert
  WattsStrogatz
  RandomTree
  RandomRegular
  Sbm
  Geometric
  // Maze
  MazeBinaryTree
  MazeRecursiveBacktracker
  MazeWilson
  MazeKruskal
  MazePrimTrue
  MazeEllers
  // Input
  Matrix
  CSV
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
      arity: "3",
      spine_length: "5",
      degree: "3",
      communities: "3",
      radius: "0.3",
      generated_json: "",
      mermaid_code: "",
      dot_code: "",
      ascii_code: "",
      csv_input: "A, B, 1, Directed\nB, C, 2, Directed\nC, A, 3, Directed\nB, D, 1, Undirected",
      matrix_input: "0, 1, 0\n1, 0, 1\n0, 1, 0",
      analysis_source: "",
      analysis_target: "",
      analysis_result: None,
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
  UpdateArity(String)
  UpdateSpineLength(String)
  UpdateDegree(String)
  UpdateCommunities(String)
  UpdateRadius(String)
  UpdateMatrix(String)
  GenerateGraph
  CopyJson
  CopyMermaid
  CopyDot
  CopyAscii
  SelectTab(Tab)
  DownloadImage
  UpdateCSV(String)
  UpdateAnalysisSource(String)
  UpdateAnalysisTarget(String)
}

fn update(m: Model, msg: Msg) -> #(Model, effect.Effect(Msg)) {
  case msg {
    SelectGraphType(graph_type) -> {
      let new_tab = case is_maze(graph_type) {
        True -> Ascii
        False -> case m.active_tab {
          Ascii -> Json
          other -> other
        }
      }
      #(Model(..m, graph_type: graph_type, active_tab: new_tab), effect.none())
    }
    UpdateNodes(value) -> #(Model(..m, nodes: value), effect.none())
    UpdateDensity(value) -> #(Model(..m, density: value), effect.none())
    UpdateWidth(value) -> #(Model(..m, width: value), effect.none())
    UpdateHeight(value) -> #(Model(..m, height: value), effect.none())
    UpdateM(value) -> #(Model(..m, m: value), effect.none())
    UpdateK(value) -> #(Model(..m, k: value), effect.none())
    UpdateP(value) -> #(Model(..m, p: value), effect.none())
    UpdateDepth(value) -> #(Model(..m, depth: value), effect.none())
    UpdateArity(value) -> #(Model(..m, arity: value), effect.none())
    UpdateSpineLength(value) -> #(Model(..m, spine_length: value), effect.none())
    UpdateDegree(value) -> #(Model(..m, degree: value), effect.none())
    UpdateCommunities(value) -> #(Model(..m, communities: value), effect.none())
    UpdateRadius(value) -> #(Model(..m, radius: value), effect.none())
    UpdateMatrix(value) -> {
      let m = Model(..m, matrix_input: value)
      case m.graph_type {
        Matrix -> update(m, GenerateGraph)
        _ -> #(m, effect.none())
      }
    }
    GenerateGraph -> {
      case validate_params(m) {
        Ok(_) -> {
          let ascii = generate_ascii(m)
          let #(json, mermaid, dot, analysis_result) = case m.graph_type {
            CSV -> {
              case parse_csv_to_graph(m.csv_input) {
                Ok(graph) -> {
                  let analysis_result = run_graph_analysis(graph, m)
                  let string_graph =
                    model.Graph(
                      kind: graph.kind,
                      nodes: graph.nodes,
                      out_edges: graph.out_edges
                        |> dict.map_values(fn(_k, edges) {
                          edges
                          |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
                        }),
                      in_edges: graph.in_edges
                        |> dict.map_values(fn(_k, edges) {
                          edges
                          |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
                        }),
                    )
                  let json = graph_to_json(string_graph) |> format_json
                  let mermaid =
                    mermaid.to_mermaid(string_graph, mermaid.default_options())
                  let dot_code =
                    dot.to_dot(string_graph, dot.default_dot_options())
                  #(json, mermaid, dot_code, analysis_result)
                }
                Error(_) -> #("", "", "", None)
              }
            }
            Matrix -> {
              case parse_matrix_to_graph(m.matrix_input) {
                Ok(graph) -> {
                  let analysis_result = run_graph_analysis(graph, m)
                  let string_graph =
                    model.Graph(
                      kind: graph.kind,
                      nodes: graph.nodes,
                      out_edges: graph.out_edges
                        |> dict.map_values(fn(_k, edges) {
                          edges
                          |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
                        }),
                      in_edges: graph.in_edges
                        |> dict.map_values(fn(_k, edges) {
                          edges
                          |> dict.map_values(fn(_k2, v2) { int.to_string(v2) })
                        }),
                    )
                  let json = graph_to_json(string_graph) |> format_json
                  let mermaid =
                    mermaid.to_mermaid(string_graph, mermaid.default_options())
                  let dot_code =
                    dot.to_dot(string_graph, dot.default_dot_options())
                  #(json, mermaid, dot_code, analysis_result)
                }
                Error(_) -> #("", "", "", None)
              }
            }
            _ -> {
              let json = generate_graph_json(m) |> format_json
              let mermaid = generate_mermaid_code(m)
              let dot_code = generate_dot_code(m)
              #(json, mermaid, dot_code, None)
            }
          }

          case json == "" && { m.graph_type == CSV || m.graph_type == Matrix } {
            True -> {
              let err = case m.graph_type {
                CSV -> case parse_csv_to_graph(m.csv_input) {
                  Error(e) -> e
                  _ -> "Unknown CSV error"
                }
                Matrix -> case parse_matrix_to_graph(m.matrix_input) {
                  Error(e) -> e
                  _ -> "Unknown matrix error"
                }
                _ -> "Unknown error"
              }
              #(Model(..m, validation_error: Some(err)), effect.none())
            }
            False -> #(
              Model(
                ..m,
                generated_json: json,
                mermaid_code: mermaid,
                dot_code: dot,
                ascii_code: ascii,
                analysis_result: analysis_result,
                validation_error: None,
              ),
              effect.batch([
                render_graph_effect(json),
                render_mermaid_effect(mermaid),
                render_dot_effect(dot),
                render_ascii_effect(ascii),
              ]),
            )
          }
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
    CopyDot -> {
      #(m, copy_to_clipboard_effect(m.dot_code))
    }
    CopyAscii -> {
      #(m, copy_to_clipboard_effect(m.ascii_code))
    }
    SelectTab(tab) -> {
      let m = Model(..m, active_tab: tab)
      let eff = case tab {
        Json -> render_graph_effect(m.generated_json)
        Mermaid -> render_mermaid_effect(m.mermaid_code)
        Dot -> render_dot_effect(m.dot_code)
        Ascii -> render_ascii_effect(m.ascii_code)
      }
      #(m, eff)
    }
    DownloadImage -> {
      #(m, download_image_effect(m.active_tab))
    }
    UpdateCSV(value) -> {
      let m = Model(..m, csv_input: value)
      case m.graph_type {
        CSV -> update(m, GenerateGraph)
        _ -> #(m, effect.none())
      }
    }
    UpdateAnalysisSource(value) -> {
      let m = Model(..m, analysis_source: value)
      update(m, GenerateGraph)
    }
    UpdateAnalysisTarget(value) -> {
      let m = Model(..m, analysis_target: value)
      update(m, GenerateGraph)
    }
  }
}

fn find_node_id_by_label(
  graph: model.Graph(String, w),
  label: String,
) -> Result(Int, Nil) {
  graph.nodes
  |> dict.to_list
  |> list.find(fn(n) { n.1 == label })
  |> result.map(fn(n) { n.0 })
}

fn run_graph_analysis(
  graph: model.Graph(String, Int),
  m: Model,
) -> Option(String) {
  let shortest_path_msg = case
    find_node_id_by_label(graph, m.analysis_source),
    find_node_id_by_label(graph, m.analysis_target)
  {
    Ok(src), Ok(dst) -> {
      case dijkstra.shortest_path(graph, src, dst, 0, int.add, int.compare) {
        Some(path) -> {
          let path_labels =
            path.nodes
            |> list.map(fn(id) {
              dict.get(graph.nodes, id) |> result.unwrap(int.to_string(id))
            })
            |> string.join(" → ")

          "Shortest Path: "
          <> path_labels
          <> " (Total Weight: "
          <> int.to_string(path.total_weight)
          <> ")"
        }
        None ->
          "No path found from "
          <> m.analysis_source
          <> " to "
          <> m.analysis_target
      }
    }
    _, _ -> {
      case
        string.is_empty(m.analysis_source) || string.is_empty(m.analysis_target)
      {
        True -> ""
        False -> "Enter valid node labels (e.g., A, B) to find shortest path."
      }
    }
  }

  let topo_msg = case traversal.topological_sort(graph) {
    Ok(sorted_ids) -> {
      let sorted_labels =
        sorted_ids
        |> list.map(fn(id) {
          dict.get(graph.nodes, id) |> result.unwrap(int.to_string(id))
        })
        |> string.join(", ")
      "Topological Sort: " <> sorted_labels
    }
    Error(_) -> "Graph has cycles, topological sort not possible."
  }

  case shortest_path_msg, topo_msg {
    "", tm -> Some(tm)
    sm, tm -> Some(sm <> "\n\n" <> tm)
  }
}

fn validate_params(model: Model) -> Result(Nil, String) {
  case model.graph_type {
    // Trees & exponential growth
    BinaryTree -> {
      let d = int.parse(model.depth) |> result.unwrap(0)
      case d > 8 {
        True -> Error("Binary tree depth cannot exceed 8")
        False -> Ok(Nil)
      }
    }
    KAryTree -> {
      let d = int.parse(model.depth) |> result.unwrap(0)
      let a = int.parse(model.arity) |> result.unwrap(0)
      case d > 8 {
        True -> Error("K-ary tree depth cannot exceed 8")
        False -> {
          case a > 10 && d > 4 {
            True -> Error("For arity > 10, depth cannot exceed 4")
            False -> Ok(Nil)
          }
        }
      }
    }
    CompleteKAry -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 500 {
        True -> Error("Complete K-ary tree nodes cannot exceed 500")
        False -> Ok(Nil)
      }
    }
    Caterpillar -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 500 {
        True -> Error("Caterpillar nodes cannot exceed 500")
        False -> Ok(Nil)
      }
    }

    // Dense classics
    Complete -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 100 {
        True -> Error("Complete graph nodes cannot exceed 100")
        False -> Ok(Nil)
      }
    }
    Bipartite -> {
      let m = int.parse(model.width) |> result.unwrap(0)
      let n = int.parse(model.height) |> result.unwrap(0)
      case m > 100 || n > 100 || m * n > 2500 {
        True -> Error("Bipartite partitions cannot exceed 100 each (max 2500 edges)")
        False -> Ok(Nil)
      }
    }
    Windmill -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      let k = int.parse(model.m) |> result.unwrap(0)
      case n > 100 {
        True -> Error("Windmill count cannot exceed 100")
        False -> {
          case k > 10 {
            True -> Error("Windmill clique size cannot exceed 10")
            False -> Ok(Nil)
          }
        }
      }
    }
    Turan -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      let r = int.parse(model.k) |> result.unwrap(0)
      case n > 200 {
        True -> Error("Turán graph nodes cannot exceed 200")
        False -> {
          case r > 20 {
            True -> Error("Turán partitions cannot exceed 20")
            False -> Ok(Nil)
          }
        }
      }
    }

    // Grids & mazes
    Grid2D | MazeBinaryTree | MazeRecursiveBacktracker | MazeWilson | MazeKruskal | MazePrimTrue | MazeEllers -> {
      let r = int.parse(model.height) |> result.unwrap(0)
      let c = int.parse(model.width) |> result.unwrap(0)
      case r * c > 2500 {
        True -> Error("Grid size (Rows x Cols) cannot exceed 2500")
        False -> Ok(Nil)
      }
    }

    // Random graphs
    ErdosRenyiGnp | ErdosRenyiGnm | BarabasiAlbert | WattsStrogatz | RandomRegular | Sbm | Geometric -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 500 {
        True -> Error("Random graph nodes cannot exceed 500")
        False -> Ok(Nil)
      }
    }

    // Special structures
    Hypercube -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 8 {
        True -> Error("Hypercube dimension cannot exceed 8 (2^8 = 256 nodes)")
        False -> Ok(Nil)
      }
    }

    // General sparse classics (catch-all for the rest)
    Cycle | Path | Star | Wheel | Empty | RandomTree | Petersen | Ladder | CircularLadder | MobiusLadder | Friendship | Book | Crown | Tetrahedron | Cube | Octahedron | Dodecahedron | Icosahedron -> {
      let n = int.parse(model.nodes) |> result.unwrap(0)
      case n > 500 {
        True -> Error("Graph nodes cannot exceed 500")
        False -> Ok(Nil)
      }
    }

    // Input formats
    Matrix -> {
      case parse_matrix_to_graph(model.matrix_input) {
        Ok(g) -> {
          let n = dict.size(g.nodes)
          case n > 50 {
            True -> Error("Matrix size cannot exceed 50x50")
            False -> Ok(Nil)
          }
        }
        Error(err) -> Error(err)
      }
    }
    CSV -> {
      case parse_csv_to_graph(model.csv_input) {
        Ok(_) -> Ok(Nil)
        Error(err) -> Error(err)
      }
    }
  }
}

fn parse_csv_to_graph(input: String) -> Result(model.Graph(String, Int), String) {
  let lines =
    string.split(input, "\n")
    |> list.filter(fn(l) { !string.is_empty(string.trim(l)) })

  let result =
    lines
    |> list.index_fold(Ok(#(dict.new(), [], 0)), fn(acc, line, idx) {
      case acc {
        Error(e) -> Error(e)
        Ok(#(label_map, edges, next_id)) -> {
          let parts = string.split(line, ",") |> list.map(string.trim)
          case parts {
            [from_label, to_label, weight_str, ..] -> {
              let weight_res = int.parse(weight_str)
              case weight_res {
                Ok(w) -> {
                  let #(label_map, from_id, next_id) = case
                    dict.get(label_map, from_label)
                  {
                    Ok(id) -> #(label_map, id, next_id)
                    Error(_) -> #(
                      dict.insert(label_map, from_label, next_id),
                      next_id,
                      next_id + 1,
                    )
                  }
                  let #(label_map, to_id, next_id) = case
                    dict.get(label_map, to_label)
                  {
                    Ok(id) -> #(label_map, id, next_id)
                    Error(_) -> #(
                      dict.insert(label_map, to_label, next_id),
                      next_id,
                      next_id + 1,
                    )
                  }
                  Ok(#(label_map, [#(from_id, to_id, w), ..edges], next_id))
                }
                Error(_) ->
                  Error(
                    "Line "
                    <> int.to_string(idx + 1)
                    <> ": Invalid weight '"
                    <> weight_str
                    <> "'",
                  )
              }
            }
            [from_label, to_label] -> {
              let #(label_map, from_id, next_id) = case
                dict.get(label_map, from_label)
              {
                Ok(id) -> #(label_map, id, next_id)
                Error(_) -> #(
                  dict.insert(label_map, from_label, next_id),
                  next_id,
                  next_id + 1,
                )
              }
              let #(label_map, to_id, next_id) = case
                dict.get(label_map, to_label)
              {
                Ok(id) -> #(label_map, id, next_id)
                Error(_) -> #(
                  dict.insert(label_map, to_label, next_id),
                  next_id,
                  next_id + 1,
                )
              }
              Ok(#(label_map, [#(from_id, to_id, 1), ..edges], next_id))
            }
            _ ->
              Error(
                "Line "
                <> int.to_string(idx + 1)
                <> ": Invalid format. Use 'From, To, Weight'",
              )
          }
        }
      }
    })

  case result {
    Ok(#(label_map, edges, _)) -> {
      let g = model.new(model.Directed)
      let g =
        dict.fold(label_map, g, fn(acc, label, id) {
          model.add_node(acc, id, label)
        })
      let g =
        list.fold(edges, g, fn(acc, e) {
          let #(from, to, w) = e
          model.add_edge(acc, from, to, w)
          |> result.unwrap(acc)
        })
      Ok(g)
    }
    Error(err) -> Error(err)
  }
}

fn parse_matrix_to_graph(input: String) -> Result(model.Graph(String, Int), String) {
  let lines =
    string.split(input, "\n")
    |> list.filter(fn(l) { !string.is_empty(string.trim(l)) })

  case list.is_empty(lines) {
    True -> Error("Matrix is empty")
    False -> {
      let rows_result =
        lines
        |> list.index_map(fn(line, idx) {
          let parts =
            case string.contains(line, ",") {
              True -> string.split(line, ",") |> list.map(string.trim)
              False -> string.split(line, " ") |> list.map(string.trim) |> list.filter(fn(s) { !string.is_empty(s) })
            }
          let parsed =
            parts
            |> list.index_map(fn(val, col_idx) {
              case int.parse(val) {
                Ok(n) -> Ok(#(col_idx, n))
                Error(_) -> Error("Row " <> int.to_string(idx + 1) <> ", Col " <> int.to_string(col_idx + 1) <> ": invalid number '")
              }
            })
          case result.all(parsed) {
            Ok(cols) -> Ok(cols)
            Error(e) -> Error(e)
          }
        })

      case result.all(rows_result) {
        Error(e) -> Error(e)
        Ok(rows) -> {
          let n = list.length(rows)
          let cols_count =
            rows
            |> list.map(list.length)
          let all_same =
            cols_count
            |> list.all(fn(c) { c == n })

          case all_same {
            False -> Error("Matrix must be square (same number of rows and columns)")
            True -> {
              let g = model.new(model.Directed)
              let g =
                list.repeat(0, n)
                |> list.index_fold(g, fn(acc, _, i) {
                  model.add_node(acc, i, int.to_string(i))
                })

              let edges_result =
                rows
                |> list.index_fold(Ok(g), fn(acc, row, row_idx) {
                  case acc {
                    Error(e) -> Error(e)
                    Ok(graph) -> {
                      row
                      |> list.fold(Ok(graph), fn(inner_acc, pair) {
                        case inner_acc {
                          Error(e) -> Error(e)
                          Ok(inner_g) -> {
                            let #(col_idx, weight) = pair
                            case weight != 0 {
                              True -> {
                                case model.add_edge(inner_g, row_idx, col_idx, weight) {
                                  Ok(new_g) -> Ok(new_g)
                                  Error(e) -> Error(e)
                                }
                              }
                              False -> Ok(inner_g)
                            }
                          }
                        }
                      })
                    }
                  }
                })
              edges_result
            }
          }
        }
      }
    }
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

@external(javascript, "./graph_ffi.mjs", "renderDot")
fn render_dot_js(dot: String) -> Nil

fn render_dot_effect(dot: String) -> effect.Effect(Msg) {
  effect.from(fn(_dispatch) { render_dot_js(dot) })
}

@external(javascript, "./graph_ffi.mjs", "renderAscii")
fn render_ascii_js(ascii: String) -> Nil

fn render_ascii_effect(ascii: String) -> effect.Effect(Msg) {
  effect.from(fn(_dispatch) { render_ascii_js(ascii) })
}

@external(javascript, "./graph_ffi.mjs", "formatJSON")
fn format_json(json: String) -> String

@external(javascript, "./graph_ffi.mjs", "downloadImage")
fn download_image_js(tab: Tab) -> Nil

fn download_image_effect(tab: Tab) -> effect.Effect(Msg) {
  effect.from(fn(_dispatch) { download_image_js(tab) })
}

// =============================================================================
// JSON Serialization (yog no longer provides to_json)
// =============================================================================

fn graph_to_json(graph: model.Graph(String, String)) -> String {
  let nodes_json =
    dict.to_list(graph.nodes)
    |> list.map(fn(pair) {
      let #(id, data) = pair
      json.object([
        #("id", json.int(id)),
        #("label", json.string(data)),
      ])
    })

  let edges_json =
    dict.to_list(graph.out_edges)
    |> list.flat_map(fn(pair) {
      let #(from_id, targets) = pair
      dict.to_list(targets)
      |> list.map(fn(target_pair) {
        let #(to_id, weight) = target_pair
        json.object([
          #("source", json.int(from_id)),
          #("target", json.int(to_id)),
          #("weight", json.string(weight)),
        ])
      })
    })

  let kind_str = case graph.kind {
    model.Directed -> "Directed"
    model.Undirected -> "Undirected"
  }

  json.object([
    #("kind", json.string(kind_str)),
    #("nodes", json.preprocessed_array(nodes_json)),
    #("edges", json.preprocessed_array(edges_json)),
  ])
  |> json.to_string
}

// =============================================================================
// Graph Generation Helpers
// =============================================================================

fn generate_base_graph(model: Model) -> model.Graph(Nil, Int) {
  case model.graph_type {
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
    KAryTree -> {
      let d = int.parse(model.depth) |> result.unwrap(3) |> int.max(0)
      let a = int.parse(model.arity) |> result.unwrap(2) |> int.max(1)
      classic.kary_tree(d, arity: a)
    }
    CompleteKAry -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let a = int.parse(model.arity) |> result.unwrap(2) |> int.max(1)
      classic.complete_kary(n, arity: a)
    }
    Caterpillar -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let s = int.parse(model.spine_length) |> result.unwrap(3) |> int.max(1)
      classic.caterpillar(n, spine_length: s)
    }
    Grid2D -> {
      let r = int.parse(model.height) |> result.unwrap(5) |> int.max(1)
      let c = int.parse(model.width) |> result.unwrap(5) |> int.max(1)
      classic.grid_2d(r, c)
    }
    Petersen -> classic.petersen()
    Hypercube -> {
      let n = int.parse(model.nodes) |> result.unwrap(3) |> int.max(1)
      classic.hypercube(n)
    }
    Ladder -> {
      let n = int.parse(model.nodes) |> result.unwrap(5) |> int.max(1)
      classic.ladder(n)
    }
    CircularLadder -> {
      let n = int.parse(model.nodes) |> result.unwrap(5) |> int.max(3)
      classic.circular_ladder(n)
    }
    MobiusLadder -> {
      let n = int.parse(model.nodes) |> result.unwrap(5) |> int.max(3)
      classic.mobius_ladder(n)
    }
    Friendship -> {
      let n = int.parse(model.nodes) |> result.unwrap(3) |> int.max(1)
      classic.friendship(n)
    }
    Windmill -> {
      let n = int.parse(model.nodes) |> result.unwrap(3) |> int.max(1)
      let k = int.parse(model.m) |> result.unwrap(3) |> int.max(2)
      classic.windmill(n, clique_size: k)
    }
    Book -> {
      let n = int.parse(model.nodes) |> result.unwrap(3) |> int.max(1)
      classic.book(n)
    }
    Crown -> {
      let n = int.parse(model.nodes) |> result.unwrap(3) |> int.max(1)
      classic.crown(n)
    }
    Turan -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let r = int.parse(model.k) |> result.unwrap(2) |> int.max(2)
      classic.turan(n, r)
    }
    Tetrahedron -> classic.tetrahedron()
    Cube -> classic.cube()
    Octahedron -> classic.octahedron()
    Dodecahedron -> classic.dodecahedron()
    Icosahedron -> classic.icosahedron()
    ErdosRenyiGnp -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let p = float.parse(model.density) |> result.unwrap(0.3)
      random.erdos_renyi_gnp(n, p, seed: None)
    }
    ErdosRenyiGnm -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let m_edges = int.parse(model.m) |> result.unwrap(10) |> int.max(0)
      random.erdos_renyi_gnm(n, m_edges, seed: None)
    }
    BarabasiAlbert -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(2)
      let m_edges = int.parse(model.m) |> result.unwrap(1) |> int.max(1)
      random.barabasi_albert(n, m_edges, seed: None)
    }
    WattsStrogatz -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(3)
      let k = int.parse(model.k) |> result.unwrap(4) |> int.max(2)
      let p = float.parse(model.p) |> result.unwrap(0.1)
      random.watts_strogatz(n, k, p, seed: None)
    }
    RandomTree -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      random.random_tree(n, seed: None)
    }
    RandomRegular -> {
      let n = int.parse(model.nodes) |> result.unwrap(10) |> int.max(1)
      let d = int.parse(model.degree) |> result.unwrap(2) |> int.max(0)
      random.random_regular(n, d, seed: None)
    }
    Sbm -> {
      let n = int.parse(model.nodes) |> result.unwrap(50) |> int.max(1)
      let k = int.parse(model.communities) |> result.unwrap(2) |> int.max(1)
      let p_in = float.parse(model.p) |> result.unwrap(0.3)
      let p_out = float.parse(model.density) |> result.unwrap(0.05)
      random.sbm(n, k, p_in, p_out, seed: None)
    }
    Geometric -> {
      let n = int.parse(model.nodes) |> result.unwrap(50) |> int.max(1)
      let r = float.parse(model.radius) |> result.unwrap(0.3)
      random.geometric(n, r, seed: None)
    }
    MazeBinaryTree | MazeRecursiveBacktracker | MazeWilson | MazeKruskal | MazePrimTrue | MazeEllers -> {
      case generate_grid(model) {
        Some(g) -> grid.to_graph(g)
        None -> model.new(model.Undirected)
      }
    }
    Matrix -> model.new(model.Directed)
    CSV -> model.new(model.Directed)
  }
}

fn is_maze(graph_type: GraphType) -> Bool {
  case graph_type {
    MazeBinaryTree | MazeRecursiveBacktracker | MazeWilson | MazeKruskal | MazePrimTrue | MazeEllers -> True
    _ -> False
  }
}

fn generate_grid(model: Model) -> Option(grid.Grid(Nil, Int)) {
  case model.graph_type {
    MazeBinaryTree -> {
      let rows = int.parse(model.height) |> result.unwrap(10) |> int.max(1)
      let cols = int.parse(model.width) |> result.unwrap(10) |> int.max(1)
      Some(maze.binary_tree(rows, cols, seed: None))
    }
    MazeRecursiveBacktracker -> {
      let rows = int.parse(model.height) |> result.unwrap(10) |> int.max(1)
      let cols = int.parse(model.width) |> result.unwrap(10) |> int.max(1)
      Some(maze.recursive_backtracker(rows, cols, seed: None))
    }
    MazeWilson -> {
      let rows = int.parse(model.height) |> result.unwrap(10) |> int.max(1)
      let cols = int.parse(model.width) |> result.unwrap(10) |> int.max(1)
      Some(maze.wilson(rows, cols, seed: None))
    }
    MazeKruskal -> {
      let rows = int.parse(model.height) |> result.unwrap(10) |> int.max(1)
      let cols = int.parse(model.width) |> result.unwrap(10) |> int.max(1)
      Some(maze.kruskal(rows, cols, seed: None))
    }
    MazePrimTrue -> {
      let rows = int.parse(model.height) |> result.unwrap(10) |> int.max(1)
      let cols = int.parse(model.width) |> result.unwrap(10) |> int.max(1)
      Some(maze.prim_true(rows, cols, seed: None))
    }
    MazeEllers -> {
      let rows = int.parse(model.height) |> result.unwrap(10) |> int.max(1)
      let cols = int.parse(model.width) |> result.unwrap(10) |> int.max(1)
      Some(maze.ellers(rows, cols, seed: None))
    }
    _ -> None
  }
}

fn generate_ascii(model: Model) -> String {
  case generate_grid(model) {
    Some(g) -> ascii.grid_to_string_unicode(g)
    None -> ""
  }
}

fn graph_to_string_graph(graph: model.Graph(Nil, Int)) -> model.Graph(String, String) {
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
}

fn shows_weights(graph_type: GraphType) -> Bool {
  case graph_type {
    CSV | Matrix -> True
    _ -> False
  }
}

fn mermaid_options(show_weights: Bool) -> mermaid.MermaidOptions {
  let base = mermaid.default_options()
  case show_weights {
    True -> base
    False -> mermaid.MermaidOptions(..base, edge_label: fn(_) { "" })
  }
}

fn dot_options(show_weights: Bool) -> dot.DotOptions(String, String) {
  let base = dot.default_dot_options()
  let base = dot.DotOptions(
    ..base,
    bgcolor: Some("#000000"),
    node_color: "#22c55e",
    node_style: dot.Filled,
    node_fontcolor: "#000000",
    node_shape: dot.Circle,
    node_fontname: "JetBrains Mono",
    edge_color: "#14532d",
    edge_style: dot.Solid,
    edge_penwidth: 1.5,
    edge_fontname: "JetBrains Mono",
    highlight_color: "#4ade80",
    highlight_penwidth: 2.5,
  )
  case show_weights {
    True -> base
    False -> dot.DotOptions(..base, edge_label: fn(_) { "" })
  }
}

fn post_process_mermaid(code: String, show_weights: Bool) -> String {
  case show_weights {
    True -> code
    False -> {
      code
      |> string.replace("-->| | ", "--> ")
      |> string.replace("-->|| ", "--> ")
      |> string.replace("---| | ", "--- ")
      |> string.replace("---|| ", "--- ")
    }
  }
}

fn post_process_dot(code: String, show_weights: Bool) -> String {
  case show_weights {
    True -> code
    False -> {
      code
      |> string.replace(" [label=\"\"];", ";")
      |> string.replace(" [label=\"\", ", " [")
      |> string.replace(", label=\"\"];", "];")
      |> string.replace(", label=\"\", ", ", ")
    }
  }
}

fn generate_mermaid_code(model: Model) -> String {
  let graph = generate_base_graph(model) |> graph_to_string_graph
  let show = shows_weights(model.graph_type)
  mermaid.to_mermaid(graph, mermaid_options(show))
  |> post_process_mermaid(show)
}

fn generate_graph_json(model: Model) -> String {
  let graph = generate_base_graph(model) |> graph_to_string_graph
  graph_to_json(graph)
}

fn generate_dot_code(model: Model) -> String {
  let graph = generate_base_graph(model) |> graph_to_string_graph
  let show = shows_weights(model.graph_type)
  dot.to_dot(graph, dot_options(show))
  |> post_process_dot(show)
}

// =============================================================================
// VIEW
// =============================================================================

fn view(model: Model) -> Element(Msg) {
  html.div([attribute.class("max-w-[1400px] mx-auto")], [
    html.div(
      [
        attribute.class(
          "bg-black/80 backdrop-blur-xl border border-green-500/30 rounded overflow-hidden p-12 shadow-[0_0_30px_rgba(34,197,94,0.15)] mb-12",
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
                [element.text("YOG_GRAPH_PLAYGROUND")],
              ),
              html.p([attribute.class("text-green-600 mb-8 font-medium")], [
                element.text(
                  "Generate graphs with Yog v6 and visualize as Cytoscape, Mermaid, DOT, or ASCII mazes!",
                ),
              ]),
              html.h3(
                [
                  attribute.class(
                    "text-green-600 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
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
                      "KAryTree" -> SelectGraphType(KAryTree)
                      "CompleteKAry" -> SelectGraphType(CompleteKAry)
                      "Caterpillar" -> SelectGraphType(Caterpillar)
                      "Grid2D" -> SelectGraphType(Grid2D)
                      "Petersen" -> SelectGraphType(Petersen)
                      "Hypercube" -> SelectGraphType(Hypercube)
                      "Ladder" -> SelectGraphType(Ladder)
                      "CircularLadder" -> SelectGraphType(CircularLadder)
                      "MobiusLadder" -> SelectGraphType(MobiusLadder)
                      "Friendship" -> SelectGraphType(Friendship)
                      "Windmill" -> SelectGraphType(Windmill)
                      "Book" -> SelectGraphType(Book)
                      "Crown" -> SelectGraphType(Crown)
                      "Turan" -> SelectGraphType(Turan)
                      "Tetrahedron" -> SelectGraphType(Tetrahedron)
                      "Cube" -> SelectGraphType(Cube)
                      "Octahedron" -> SelectGraphType(Octahedron)
                      "Dodecahedron" -> SelectGraphType(Dodecahedron)
                      "Icosahedron" -> SelectGraphType(Icosahedron)
                      "ErdosRenyiGnp" -> SelectGraphType(ErdosRenyiGnp)
                      "ErdosRenyiGnm" -> SelectGraphType(ErdosRenyiGnm)
                      "BarabasiAlbert" -> SelectGraphType(BarabasiAlbert)
                      "WattsStrogatz" -> SelectGraphType(WattsStrogatz)
                      "RandomTree" -> SelectGraphType(RandomTree)
                      "RandomRegular" -> SelectGraphType(RandomRegular)
                      "Sbm" -> SelectGraphType(Sbm)
                      "Geometric" -> SelectGraphType(Geometric)
                      "MazeBinaryTree" -> SelectGraphType(MazeBinaryTree)
                      "MazeRecursiveBacktracker" -> SelectGraphType(MazeRecursiveBacktracker)
                      "MazeWilson" -> SelectGraphType(MazeWilson)
                      "MazeKruskal" -> SelectGraphType(MazeKruskal)
                      "MazePrimTrue" -> SelectGraphType(MazePrimTrue)
                      "MazeEllers" -> SelectGraphType(MazeEllers)
                      "Matrix" -> SelectGraphType(Matrix)
                      "CSV" -> SelectGraphType(CSV)
                      _ -> SelectGraphType(ErdosRenyiGnp)
                    }
                  }),
                  attribute.class(
                    "w-full p-3 bg-black/80 border border-green-500/30 rounded text-green-100 font-sans text-base cursor-pointer outline-none focus:border-green-500 transition-colors appearance-none",
                  ),
                  attribute.value(graph_type_to_string(model.graph_type)),
                ],
                [
                  html.optgroup([attribute.attribute("label", "Classic")], [
                    html.option([attribute.value("Complete")], "Complete"),
                    html.option([attribute.value("Cycle")], "Cycle"),
                    html.option([attribute.value("Path")], "Path"),
                    html.option([attribute.value("Star")], "Star"),
                    html.option([attribute.value("Wheel")], "Wheel"),
                    html.option([attribute.value("Bipartite")], "Bipartite"),
                    html.option([attribute.value("Empty")], "Empty"),
                    html.option([attribute.value("BinaryTree")], "Binary Tree"),
                    html.option([attribute.value("KAryTree")], "K-Ary Tree"),
                    html.option([attribute.value("CompleteKAry")], "Complete K-Ary"),
                    html.option([attribute.value("Caterpillar")], "Caterpillar"),
                    html.option([attribute.value("Grid2D")], "Grid 2D"),
                    html.option([attribute.value("Petersen")], "Petersen"),
                    html.option([attribute.value("Hypercube")], "Hypercube"),
                    html.option([attribute.value("Ladder")], "Ladder"),
                    html.option([attribute.value("CircularLadder")], "Circular Ladder"),
                    html.option([attribute.value("MobiusLadder")], "Möbius Ladder"),
                    html.option([attribute.value("Friendship")], "Friendship"),
                    html.option([attribute.value("Windmill")], "Windmill"),
                    html.option([attribute.value("Book")], "Book"),
                    html.option([attribute.value("Crown")], "Crown"),
                    html.option([attribute.value("Turan")], "Turán"),
                    html.option([attribute.value("Tetrahedron")], "Tetrahedron"),
                    html.option([attribute.value("Cube")], "Cube"),
                    html.option([attribute.value("Octahedron")], "Octahedron"),
                    html.option([attribute.value("Dodecahedron")], "Dodecahedron"),
                    html.option([attribute.value("Icosahedron")], "Icosahedron"),
                  ]),
                  html.optgroup([attribute.attribute("label", "Random")], [
                    html.option(
                      [attribute.value("ErdosRenyiGnp")],
                      "Random (Gnp)",
                    ),
                    html.option(
                      [attribute.value("ErdosRenyiGnm")],
                      "Random (Gnm)",
                    ),
                    html.option(
                      [attribute.value("BarabasiAlbert")],
                      "Scale-free (BA)",
                    ),
                    html.option(
                      [attribute.value("WattsStrogatz")],
                      "Small-world (WS)",
                    ),
                    html.option([attribute.value("RandomTree")], "Random Tree"),
                    html.option([attribute.value("RandomRegular")], "Random Regular"),
                    html.option([attribute.value("Sbm")], "Stochastic Block Model"),
                    html.option([attribute.value("Geometric")], "Random Geometric"),
                  ]),
                  html.optgroup([attribute.attribute("label", "Maze")], [
                    html.option([attribute.value("MazeBinaryTree")], "Maze: Binary Tree"),
                    html.option([attribute.value("MazeRecursiveBacktracker")], "Maze: Recursive Backtracker"),
                    html.option([attribute.value("MazeWilson")], "Maze: Wilson"),
                    html.option([attribute.value("MazeKruskal")], "Maze: Kruskal"),
                    html.option([attribute.value("MazePrimTrue")], "Maze: Prim True"),
                    html.option([attribute.value("MazeEllers")], "Maze: Eller"),
                  ]),
                  html.optgroup([attribute.attribute("label", "Other")], [
                    html.option([attribute.value("Matrix")], "Weighted Matrix"),
                    html.option([attribute.value("CSV")], "CSV (Experimental)"),
                  ]),
                ],
              ),
              html.h3(
                [
                  attribute.class(
                    "text-green-600 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
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
                        "mt-4 p-3 bg-red-950/50 border border-red-500/40 rounded",
                      ),
                    ],
                    [
                      html.p(
                        [
                          attribute.class(
                            "text-red-500 text-xs font-medium m-0",
                          ),
                        ],
                        [element.text("" <> err)],
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
                      "w-full bg-green-600 hover:bg-green-500 text-black border-none p-4 rounded cursor-pointer text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]",
                    ),
                  ],
                  [element.text("Generate & Visualize")],
                ),
              ]),
            ]),
            // Right panel - Results (JSON / Mermaid)
            html.div([], [
              html.div(
                [
                  attribute.class(
                    "flex gap-4 mb-4 border-b border-green-500/30 pb-2",
                  ),
                ],
                [
                  tab_button("JSON", Json, model.active_tab == Json),
                  tab_button("Mermaid", Mermaid, model.active_tab == Mermaid),
                  tab_button("DOT", Dot, model.active_tab == Dot),
                  case is_maze(model.graph_type) {
                    True -> tab_button("ASCII", Ascii, model.active_tab == Ascii)
                    False -> element.none()
                  },
                ],
              ),
              html.div([], [
                case model.active_tab {
                  Json -> json_tab_view(model)
                  Mermaid -> mermaid_tab_view(model)
                  Dot -> dot_tab_view(model)
                  Ascii -> ascii_tab_view(model)
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
                "text-green-600 text-[10px] mb-3 font-bold uppercase tracking-widest",
              ),
            ],
            [
              element.text(case model.active_tab {
                Json -> "Cytoscape Visualization"
                Mermaid -> "Mermaid Diagram"
                Dot -> "Graphviz Visualization"
                Ascii -> "ASCII Art"
              }),
            ],
          ),
          html.div(
            [
              attribute.id("cy"),
              attribute.class(case model.active_tab {
                Json ->
                  "w-full h-[600px] bg-black/60 border border-green-500/30 rounded mt-4 shadow-[inset_0_0_30px_rgba(34,197,94,0.1)]"
                _ -> "hidden"
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
                _ -> "hidden"
              }),
            ],
            [],
          ),
          html.div(
            [
              attribute.id("dot-graph"),
              attribute.class(case model.active_tab {
                Dot ->
                  "w-full min-h-[400px] bg-white p-8 rounded flex justify-center overflow-auto mt-4"
                _ -> "hidden"
              }),
            ],
            [],
          ),
          html.div(
            [
              attribute.id("ascii-graph"),
              attribute.class(case model.active_tab {
                Ascii ->
                  "w-full min-h-[400px] bg-black p-8 rounded flex justify-center overflow-auto mt-4 font-mono text-green-400 whitespace-pre shadow-[inset_0_0_30px_rgba(34,197,94,0.1)]"
                _ -> "hidden"
              }),
            ],
            [],
          ),
        ]),
      ],
    ),
  ])
}

fn json_tab_view(model: Model) -> Element(Msg) {
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
              "text-green-600 text-[10px] font-bold uppercase tracking-widest m-0",
            ),
          ],
          [
            element.text("Generated JSON"),
          ],
        ),
        case model.generated_json {
          "" -> element.none()
          _ ->
            html.div([attribute.class("flex gap-2")], [
              html.button(
                [
                  attribute.class(
                    "bg-green-700 hover:bg-green-600 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(DownloadImage),
                ],
                [element.text("Download")],
              ),
              html.button(
                [
                  attribute.class(
                    "bg-emerald-800 hover:bg-emerald-700 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(CopyJson),
                ],
                [element.text("Copy")],
              ),
            ])
        },
      ],
    ),
    case model.generated_json {
      "" ->
        html.p(
          [attribute.class("text-green-600 mb-8 font-medium")],
          [
            element.text("Click 'Generate' to see output"),
          ],
        )
      json ->
        html.pre(
          [
            attribute.class(
              "bg-black p-6 rounded border border-green-500/30 overflow-x-auto h-[480px] text-[13px] font-mono text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]",
            ),
          ],
          [element.text(json)],
        )
    },
  ])
}

fn mermaid_tab_view(model: Model) -> Element(Msg) {
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
              "text-green-600 text-[10px] font-bold uppercase tracking-widest m-0",
            ),
          ],
          [
            element.text("Mermaid Definition"),
          ],
        ),
        case model.mermaid_code {
          "" -> element.none()
          _ ->
            html.div([attribute.class("flex gap-2")], [
              html.button(
                [
                  attribute.class(
                    "bg-green-700 hover:bg-green-600 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(DownloadImage),
                ],
                [element.text("Download")],
              ),
              html.button(
                [
                  attribute.class(
                    "bg-emerald-800 hover:bg-emerald-700 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(CopyMermaid),
                ],
                [element.text("Copy")],
              ),
            ])
        },
      ],
    ),
    case model.mermaid_code {
      "" ->
        html.p(
          [attribute.class("text-green-600 mb-8 font-medium")],
          [
            element.text("Click 'Generate' to see definition"),
          ],
        )
      code ->
        html.pre(
          [
            attribute.class(
              "bg-black p-6 rounded border border-green-500/30 overflow-x-auto h-[480px] text-[13px] font-mono text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]",
            ),
          ],
          [element.text(code)],
        )
    },
  ])
}

fn dot_tab_view(model: Model) -> Element(Msg) {
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
              "text-green-600 text-[10px] font-bold uppercase tracking-widest m-0",
            ),
          ],
          [
            element.text("DOT Definition"),
          ],
        ),
        case model.dot_code {
          "" -> element.none()
          _ ->
            html.div([attribute.class("flex gap-2")], [
              html.button(
                [
                  attribute.class(
                    "bg-green-700 hover:bg-green-600 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(DownloadImage),
                ],
                [element.text("Download")],
              ),
              html.button(
                [
                  attribute.class(
                    "bg-emerald-800 hover:bg-emerald-700 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(CopyDot),
                ],
                [element.text("Copy")],
              ),
            ])
        },
      ],
    ),
    case model.dot_code {
      "" ->
        html.p(
          [attribute.class("text-green-600 mb-8 font-medium")],
          [
            element.text("Click 'Generate' to see definition"),
          ],
        )
      code ->
        html.pre(
          [
            attribute.class(
              "bg-black p-6 rounded border border-green-500/30 overflow-x-auto h-[480px] text-[13px] font-mono text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]",
            ),
          ],
          [element.text(code)],
        )
    },
  ])
}

fn ascii_tab_view(model: Model) -> Element(Msg) {
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
              "text-green-600 text-[10px] font-bold uppercase tracking-widest m-0",
            ),
          ],
          [
            element.text("ASCII Art"),
          ],
        ),
        case model.ascii_code {
          "" -> element.none()
          _ ->
            html.div([attribute.class("flex gap-2")], [
              html.button(
                [
                  attribute.class(
                    "bg-emerald-800 hover:bg-emerald-700 text-green-100 text-[10px] px-3 py-1.5 rounded font-semibold transition-colors border border-green-500/40",
                  ),
                  event.on_click(CopyAscii),
                ],
                [element.text("Copy")],
              ),
            ])
        },
      ],
    ),
    case model.ascii_code {
      "" ->
        html.p(
          [attribute.class("text-green-600 mb-8 font-medium")],
          [
            element.text("Click 'Generate' to see ASCII art"),
          ],
        )
      code ->
        html.pre(
          [
            attribute.class(
              "bg-black p-6 rounded border border-green-500/30 overflow-x-auto h-[480px] text-[13px] font-mono text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]",
            ),
          ],
          [element.text(code)],
        )
    },
  ])
}

fn tab_button(label: String, tab: Tab, is_active: Bool) -> Element(Msg) {
  html.button(
    [
      event.on_click(SelectTab(tab)),
      attribute.class(case is_active {
        True ->
          "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-green-500 text-green-500 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
        False ->
          "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-transparent text-green-600 hover:text-green-100 hover:bg-green-500/10"
      }),
    ],
    [element.text(label)],
  )
}

fn graph_type_to_string(graph_type: GraphType) -> String {
  case graph_type {
    Complete -> "Complete"
    Cycle -> "Cycle"
    Path -> "Path"
    Star -> "Star"
    Wheel -> "Wheel"
    Bipartite -> "Bipartite"
    Empty -> "Empty"
    BinaryTree -> "BinaryTree"
    KAryTree -> "KAryTree"
    CompleteKAry -> "CompleteKAry"
    Caterpillar -> "Caterpillar"
    Grid2D -> "Grid2D"
    Petersen -> "Petersen"
    Hypercube -> "Hypercube"
    Ladder -> "Ladder"
    CircularLadder -> "CircularLadder"
    MobiusLadder -> "MobiusLadder"
    Friendship -> "Friendship"
    Windmill -> "Windmill"
    Book -> "Book"
    Crown -> "Crown"
    Turan -> "Turan"
    Tetrahedron -> "Tetrahedron"
    Cube -> "Cube"
    Octahedron -> "Octahedron"
    Dodecahedron -> "Dodecahedron"
    Icosahedron -> "Icosahedron"
    ErdosRenyiGnp -> "ErdosRenyiGnp"
    ErdosRenyiGnm -> "ErdosRenyiGnm"
    BarabasiAlbert -> "BarabasiAlbert"
    WattsStrogatz -> "WattsStrogatz"
    RandomTree -> "RandomTree"
    RandomRegular -> "RandomRegular"
    Sbm -> "Sbm"
    Geometric -> "Geometric"
    MazeBinaryTree -> "MazeBinaryTree"
    MazeRecursiveBacktracker -> "MazeRecursiveBacktracker"
    MazeWilson -> "MazeWilson"
    MazeKruskal -> "MazeKruskal"
    MazePrimTrue -> "MazePrimTrue"
    MazeEllers -> "MazeEllers"
    Matrix -> "Matrix"
    CSV -> "CSV"
  }
}

fn parameters_form(model: Model) -> Element(Msg) {
  html.div([], case model.graph_type {
    Complete | Cycle | Path | Star | Wheel | Empty | RandomTree | Petersen | Tetrahedron | Cube | Octahedron | Dodecahedron | Icosahedron -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
    ]
    Bipartite -> [
      input_field("Partition M", model.width, UpdateWidth, "number", "1"),
      input_field("Partition N", model.height, UpdateHeight, "number", "1"),
    ]
    BinaryTree -> [
      input_field("Depth", model.depth, UpdateDepth, "number", "1"),
    ]
    KAryTree -> [
      input_field("Depth", model.depth, UpdateDepth, "number", "1"),
      input_field("Arity", model.arity, UpdateArity, "number", "1"),
    ]
    CompleteKAry -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Arity", model.arity, UpdateArity, "number", "1"),
    ]
    Caterpillar -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Spine Length", model.spine_length, UpdateSpineLength, "number", "1"),
    ]
    Grid2D | MazeBinaryTree | MazeRecursiveBacktracker | MazeWilson | MazeKruskal | MazePrimTrue | MazeEllers -> [
      input_field("Rows", model.height, UpdateHeight, "number", "1"),
      input_field("Cols", model.width, UpdateWidth, "number", "1"),
    ]
    Hypercube -> [
      input_field("Dimension", model.nodes, UpdateNodes, "number", "1"),
    ]
    Ladder | CircularLadder | MobiusLadder | Friendship | Book | Crown -> [
      input_field("Nodes / Rungs", model.nodes, UpdateNodes, "number", "1"),
    ]
    Windmill -> [
      input_field("Windmills", model.nodes, UpdateNodes, "number", "1"),
      input_field("Clique Size", model.m, UpdateM, "number", "1"),
    ]
    Turan -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Partitions", model.k, UpdateK, "number", "1"),
    ]
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
    RandomRegular -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Degree", model.degree, UpdateDegree, "number", "1"),
    ]
    Sbm -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Communities", model.communities, UpdateCommunities, "number", "1"),
      input_field("P in", model.p, UpdateP, "number", "0.01"),
      input_field("P out", model.density, UpdateDensity, "number", "0.01"),
    ]
    Geometric -> [
      input_field("Nodes", model.nodes, UpdateNodes, "number", "1"),
      input_field("Radius", model.radius, UpdateRadius, "number", "0.01"),
    ]
    Matrix | CSV -> [
      html.div([attribute.class("mb-4")], [
        html.label(
          [
            attribute.class(
              "block text-green-600 text-[10px] font-bold uppercase tracking-widest mb-1",
            ),
          ],
          [element.text(case model.graph_type {
            Matrix -> "Adjacency Matrix (0 = no edge)"
            CSV -> "CSV Input (From, To, Weight)"
            _ -> "Input"
          })],
        ),
        html.textarea(
          [
            attribute.class(
              "w-full h-40 bg-black p-4 rounded border border-green-500/30 text-[13px] font-mono text-green-400 focus:outline-none focus:border-green-500 transition-colors resize-none",
            ),
            attribute.value(case model.graph_type {
              Matrix -> model.matrix_input
              CSV -> model.csv_input
              _ -> ""
            }),
            event.on_input(case model.graph_type {
              Matrix -> UpdateMatrix
              CSV -> UpdateCSV
              _ -> fn(_) { UpdateNodes("") }
            }),
            attribute.attribute("maxlength", "5000"),
            attribute.attribute("placeholder", case model.graph_type {
              Matrix -> "0, 1, 0\n1, 0, 1\n0, 1, 0"
              CSV -> "A, B, 1\nB, C, 2"
              _ -> ""
            }),
          ],
          "",
        ),
      ]),
      html.h3(
        [
          attribute.class(
            "text-green-600 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
          ),
        ],
        [element.text("Graph Analysis")],
      ),
      html.div([attribute.class("grid grid-cols-2 gap-4 mb-4")], [
        input_field(
          "Source Node",
          model.analysis_source,
          UpdateAnalysisSource,
          "text",
          "",
        ),
        input_field(
          "Target Node",
          model.analysis_target,
          UpdateAnalysisTarget,
          "text",
          "",
        ),
      ]),
      case model.analysis_result {
        Some(result) ->
          html.div(
            [
              attribute.class(
                "p-4 bg-green-500/10 border border-green-500/30 rounded text-[13px] font-medium text-green-300 whitespace-pre-wrap leading-relaxed shadow-[0_0_10px_rgba(34,197,94,0.1)]",
              ),
            ],
            [element.text(result)],
          )
        None -> element.none()
      },
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
          "block text-green-600 text-[10px] font-bold uppercase tracking-widest mb-1",
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
        "w-full p-3 bg-black/80 border border-green-500/30 rounded text-green-100 font-sans text-sm outline-none focus:border-green-500 transition-colors",
      ),
    ]),
  ])
}

// =============================================================================
// MAIN
// =============================================================================

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
}
