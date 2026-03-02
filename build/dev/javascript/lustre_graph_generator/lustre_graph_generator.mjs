/// <reference types="./lustre_graph_generator.d.mts" />
import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attribute from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $classic from "../yog/yog/generators/classic.mjs";
import * as $random from "../yog/yog/generators/random.mjs";
import * as $model from "../yog/yog/model.mjs";
import * as $pathfinding from "../yog/yog/pathfinding.mjs";
import * as $render from "../yog/yog/render.mjs";
import * as $topological_sort from "../yog/yog/topological_sort.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "./gleam.mjs";
import {
  renderGraph as render_graph_js,
  copyToClipboard as copy_to_clipboard_js,
  renderMermaid as render_mermaid_js,
  renderDot as render_dot_js,
  formatJSON as format_json,
  downloadImage as download_image_js,
} from "./graph_ffi.mjs";

const FILEPATH = "src/lustre_graph_generator.gleam";

export class Json extends $CustomType {}
export const Tab$Json = () => new Json();
export const Tab$isJson = (value) => value instanceof Json;

export class Mermaid extends $CustomType {}
export const Tab$Mermaid = () => new Mermaid();
export const Tab$isMermaid = (value) => value instanceof Mermaid;

export class Dot extends $CustomType {}
export const Tab$Dot = () => new Dot();
export const Tab$isDot = (value) => value instanceof Dot;

export class Model extends $CustomType {
  constructor(graph_type, nodes, density, width, height, m, k, p, depth, generated_json, mermaid_code, dot_code, csv_input, analysis_source, analysis_target, analysis_result, active_tab, validation_error) {
    super();
    this.graph_type = graph_type;
    this.nodes = nodes;
    this.density = density;
    this.width = width;
    this.height = height;
    this.m = m;
    this.k = k;
    this.p = p;
    this.depth = depth;
    this.generated_json = generated_json;
    this.mermaid_code = mermaid_code;
    this.dot_code = dot_code;
    this.csv_input = csv_input;
    this.analysis_source = analysis_source;
    this.analysis_target = analysis_target;
    this.analysis_result = analysis_result;
    this.active_tab = active_tab;
    this.validation_error = validation_error;
  }
}
export const Model$Model = (graph_type, nodes, density, width, height, m, k, p, depth, generated_json, mermaid_code, dot_code, csv_input, analysis_source, analysis_target, analysis_result, active_tab, validation_error) =>
  new Model(graph_type,
  nodes,
  density,
  width,
  height,
  m,
  k,
  p,
  depth,
  generated_json,
  mermaid_code,
  dot_code,
  csv_input,
  analysis_source,
  analysis_target,
  analysis_result,
  active_tab,
  validation_error);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$graph_type = (value) => value.graph_type;
export const Model$Model$0 = (value) => value.graph_type;
export const Model$Model$nodes = (value) => value.nodes;
export const Model$Model$1 = (value) => value.nodes;
export const Model$Model$density = (value) => value.density;
export const Model$Model$2 = (value) => value.density;
export const Model$Model$width = (value) => value.width;
export const Model$Model$3 = (value) => value.width;
export const Model$Model$height = (value) => value.height;
export const Model$Model$4 = (value) => value.height;
export const Model$Model$m = (value) => value.m;
export const Model$Model$5 = (value) => value.m;
export const Model$Model$k = (value) => value.k;
export const Model$Model$6 = (value) => value.k;
export const Model$Model$p = (value) => value.p;
export const Model$Model$7 = (value) => value.p;
export const Model$Model$depth = (value) => value.depth;
export const Model$Model$8 = (value) => value.depth;
export const Model$Model$generated_json = (value) => value.generated_json;
export const Model$Model$9 = (value) => value.generated_json;
export const Model$Model$mermaid_code = (value) => value.mermaid_code;
export const Model$Model$10 = (value) => value.mermaid_code;
export const Model$Model$dot_code = (value) => value.dot_code;
export const Model$Model$11 = (value) => value.dot_code;
export const Model$Model$csv_input = (value) => value.csv_input;
export const Model$Model$12 = (value) => value.csv_input;
export const Model$Model$analysis_source = (value) => value.analysis_source;
export const Model$Model$13 = (value) => value.analysis_source;
export const Model$Model$analysis_target = (value) => value.analysis_target;
export const Model$Model$14 = (value) => value.analysis_target;
export const Model$Model$analysis_result = (value) => value.analysis_result;
export const Model$Model$15 = (value) => value.analysis_result;
export const Model$Model$active_tab = (value) => value.active_tab;
export const Model$Model$16 = (value) => value.active_tab;
export const Model$Model$validation_error = (value) => value.validation_error;
export const Model$Model$17 = (value) => value.validation_error;

export class Complete extends $CustomType {}
export const GraphType$Complete = () => new Complete();
export const GraphType$isComplete = (value) => value instanceof Complete;

export class Cycle extends $CustomType {}
export const GraphType$Cycle = () => new Cycle();
export const GraphType$isCycle = (value) => value instanceof Cycle;

export class Path extends $CustomType {}
export const GraphType$Path = () => new Path();
export const GraphType$isPath = (value) => value instanceof Path;

export class Star extends $CustomType {}
export const GraphType$Star = () => new Star();
export const GraphType$isStar = (value) => value instanceof Star;

export class Wheel extends $CustomType {}
export const GraphType$Wheel = () => new Wheel();
export const GraphType$isWheel = (value) => value instanceof Wheel;

export class Bipartite extends $CustomType {}
export const GraphType$Bipartite = () => new Bipartite();
export const GraphType$isBipartite = (value) => value instanceof Bipartite;

export class Empty extends $CustomType {}
export const GraphType$Empty = () => new Empty();
export const GraphType$isEmpty = (value) => value instanceof Empty;

export class BinaryTree extends $CustomType {}
export const GraphType$BinaryTree = () => new BinaryTree();
export const GraphType$isBinaryTree = (value) => value instanceof BinaryTree;

export class Grid2D extends $CustomType {}
export const GraphType$Grid2D = () => new Grid2D();
export const GraphType$isGrid2D = (value) => value instanceof Grid2D;

export class Petersen extends $CustomType {}
export const GraphType$Petersen = () => new Petersen();
export const GraphType$isPetersen = (value) => value instanceof Petersen;

export class ErdosRenyiGnp extends $CustomType {}
export const GraphType$ErdosRenyiGnp = () => new ErdosRenyiGnp();
export const GraphType$isErdosRenyiGnp = (value) =>
  value instanceof ErdosRenyiGnp;

export class ErdosRenyiGnm extends $CustomType {}
export const GraphType$ErdosRenyiGnm = () => new ErdosRenyiGnm();
export const GraphType$isErdosRenyiGnm = (value) =>
  value instanceof ErdosRenyiGnm;

export class BarabasiAlbert extends $CustomType {}
export const GraphType$BarabasiAlbert = () => new BarabasiAlbert();
export const GraphType$isBarabasiAlbert = (value) =>
  value instanceof BarabasiAlbert;

export class WattsStrogatz extends $CustomType {}
export const GraphType$WattsStrogatz = () => new WattsStrogatz();
export const GraphType$isWattsStrogatz = (value) =>
  value instanceof WattsStrogatz;

export class RandomTree extends $CustomType {}
export const GraphType$RandomTree = () => new RandomTree();
export const GraphType$isRandomTree = (value) => value instanceof RandomTree;

export class CSV extends $CustomType {}
export const GraphType$CSV = () => new CSV();
export const GraphType$isCSV = (value) => value instanceof CSV;

export class SelectGraphType extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectGraphType = ($0) => new SelectGraphType($0);
export const Msg$isSelectGraphType = (value) =>
  value instanceof SelectGraphType;
export const Msg$SelectGraphType$0 = (value) => value[0];

export class UpdateNodes extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateNodes = ($0) => new UpdateNodes($0);
export const Msg$isUpdateNodes = (value) => value instanceof UpdateNodes;
export const Msg$UpdateNodes$0 = (value) => value[0];

export class UpdateDensity extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateDensity = ($0) => new UpdateDensity($0);
export const Msg$isUpdateDensity = (value) => value instanceof UpdateDensity;
export const Msg$UpdateDensity$0 = (value) => value[0];

export class UpdateWidth extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateWidth = ($0) => new UpdateWidth($0);
export const Msg$isUpdateWidth = (value) => value instanceof UpdateWidth;
export const Msg$UpdateWidth$0 = (value) => value[0];

export class UpdateHeight extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateHeight = ($0) => new UpdateHeight($0);
export const Msg$isUpdateHeight = (value) => value instanceof UpdateHeight;
export const Msg$UpdateHeight$0 = (value) => value[0];

export class UpdateM extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateM = ($0) => new UpdateM($0);
export const Msg$isUpdateM = (value) => value instanceof UpdateM;
export const Msg$UpdateM$0 = (value) => value[0];

export class UpdateK extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateK = ($0) => new UpdateK($0);
export const Msg$isUpdateK = (value) => value instanceof UpdateK;
export const Msg$UpdateK$0 = (value) => value[0];

export class UpdateP extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateP = ($0) => new UpdateP($0);
export const Msg$isUpdateP = (value) => value instanceof UpdateP;
export const Msg$UpdateP$0 = (value) => value[0];

export class UpdateDepth extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateDepth = ($0) => new UpdateDepth($0);
export const Msg$isUpdateDepth = (value) => value instanceof UpdateDepth;
export const Msg$UpdateDepth$0 = (value) => value[0];

export class GenerateGraph extends $CustomType {}
export const Msg$GenerateGraph = () => new GenerateGraph();
export const Msg$isGenerateGraph = (value) => value instanceof GenerateGraph;

export class CopyJson extends $CustomType {}
export const Msg$CopyJson = () => new CopyJson();
export const Msg$isCopyJson = (value) => value instanceof CopyJson;

export class CopyMermaid extends $CustomType {}
export const Msg$CopyMermaid = () => new CopyMermaid();
export const Msg$isCopyMermaid = (value) => value instanceof CopyMermaid;

export class CopyDot extends $CustomType {}
export const Msg$CopyDot = () => new CopyDot();
export const Msg$isCopyDot = (value) => value instanceof CopyDot;

export class SelectTab extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectTab = ($0) => new SelectTab($0);
export const Msg$isSelectTab = (value) => value instanceof SelectTab;
export const Msg$SelectTab$0 = (value) => value[0];

export class DownloadImage extends $CustomType {}
export const Msg$DownloadImage = () => new DownloadImage();
export const Msg$isDownloadImage = (value) => value instanceof DownloadImage;

export class UpdateCSV extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateCSV = ($0) => new UpdateCSV($0);
export const Msg$isUpdateCSV = (value) => value instanceof UpdateCSV;
export const Msg$UpdateCSV$0 = (value) => value[0];

export class UpdateAnalysisSource extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateAnalysisSource = ($0) => new UpdateAnalysisSource($0);
export const Msg$isUpdateAnalysisSource = (value) =>
  value instanceof UpdateAnalysisSource;
export const Msg$UpdateAnalysisSource$0 = (value) => value[0];

export class UpdateAnalysisTarget extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UpdateAnalysisTarget = ($0) => new UpdateAnalysisTarget($0);
export const Msg$isUpdateAnalysisTarget = (value) =>
  value instanceof UpdateAnalysisTarget;
export const Msg$UpdateAnalysisTarget$0 = (value) => value[0];

function init(_) {
  return [
    new Model(
      new ErdosRenyiGnp(),
      "10",
      "0.3",
      "5",
      "5",
      "2",
      "4",
      "0.1",
      "3",
      "",
      "",
      "",
      "A, B, 1, Directed\nB, C, 2, Directed\nC, A, 3, Directed\nB, D, 1, Undirected",
      "",
      "",
      new None(),
      new Json(),
      new None(),
    ),
    $effect.none(),
  ];
}

function find_node_id_by_label(graph, label) {
  let _pipe = graph.nodes;
  let _pipe$1 = $dict.to_list(_pipe);
  let _pipe$2 = $list.find(_pipe$1, (n) => { return n[1] === label; });
  return $result.map(_pipe$2, (n) => { return n[0]; });
}

function run_graph_analysis(graph, m) {
  let _block;
  let $ = find_node_id_by_label(graph, m.analysis_source);
  let $1 = find_node_id_by_label(graph, m.analysis_target);
  if ($ instanceof Ok && $1 instanceof Ok) {
    let src = $[0];
    let dst = $1[0];
    let $2 = $pathfinding.shortest_path(
      graph,
      src,
      dst,
      0,
      $int.add,
      $int.compare,
    );
    if ($2 instanceof Some) {
      let path = $2[0];
      let _block$1;
      let _pipe = path.nodes;
      let _pipe$1 = $list.map(
        _pipe,
        (id) => {
          let _pipe$1 = $dict.get(graph.nodes, id);
          return $result.unwrap(_pipe$1, $int.to_string(id));
        },
      );
      _block$1 = $string.join(_pipe$1, " → ");
      let path_labels = _block$1;
      _block = ((("📍 Shortest Path: " + path_labels) + " (Total Weight: ") + $int.to_string(
        path.total_weight,
      )) + ")";
    } else {
      _block = (("🚫 No path found from " + m.analysis_source) + " to ") + m.analysis_target;
    }
  } else {
    let $2 = $string.is_empty(m.analysis_source) || $string.is_empty(
      m.analysis_target,
    );
    if ($2) {
      _block = "";
    } else {
      _block = "⚠️ Enter valid node labels (e.g., A, B) to find shortest path.";
    }
  }
  let shortest_path_msg = _block;
  let _block$1;
  let $2 = $topological_sort.topological_sort(graph);
  if ($2 instanceof Ok) {
    let sorted_ids = $2[0];
    let _block$2;
    let _pipe = sorted_ids;
    let _pipe$1 = $list.map(
      _pipe,
      (id) => {
        let _pipe$1 = $dict.get(graph.nodes, id);
        return $result.unwrap(_pipe$1, $int.to_string(id));
      },
    );
    _block$2 = $string.join(_pipe$1, ", ");
    let sorted_labels = _block$2;
    _block$1 = "📐 Topological Sort: " + sorted_labels;
  } else {
    _block$1 = "🔄 Graph has cycles, topological sort not possible.";
  }
  let topo_msg = _block$1;
  if (shortest_path_msg === "") {
    let tm = topo_msg;
    return new Some(tm);
  } else {
    let sm = shortest_path_msg;
    let tm = topo_msg;
    return new Some((sm + "\n\n") + tm);
  }
}

function parse_csv_to_graph(input) {
  let _block;
  let _pipe = $string.split(input, "\n");
  _block = $list.filter(
    _pipe,
    (l) => { return !$string.is_empty($string.trim(l)); },
  );
  let lines = _block;
  let _block$1;
  let _pipe$1 = lines;
  _block$1 = $list.index_fold(
    _pipe$1,
    new Ok([$dict.new$(), toList([]), 0]),
    (acc, line, idx) => {
      if (acc instanceof Ok) {
        let label_map = acc[0][0];
        let edges = acc[0][1];
        let next_id = acc[0][2];
        let _block$2;
        let _pipe$2 = $string.split(line, ",");
        _block$2 = $list.map(_pipe$2, $string.trim);
        let parts = _block$2;
        if (parts instanceof $Empty) {
          return new Error(
            ("Line " + $int.to_string(idx + 1)) + ": Invalid format. Use 'From, To, Weight'",
          );
        } else {
          let $ = parts.tail;
          if ($ instanceof $Empty) {
            return new Error(
              ("Line " + $int.to_string(idx + 1)) + ": Invalid format. Use 'From, To, Weight'",
            );
          } else {
            let $1 = $.tail;
            if ($1 instanceof $Empty) {
              let from_label = parts.head;
              let to_label = $.head;
              let _block$3;
              let $3 = $dict.get(label_map, from_label);
              if ($3 instanceof Ok) {
                let id = $3[0];
                _block$3 = [label_map, id, next_id];
              } else {
                _block$3 = [
                  $dict.insert(label_map, from_label, next_id),
                  next_id,
                  next_id + 1,
                ];
              }
              let $2 = _block$3;
              let label_map$1;
              let from_id;
              let next_id$1;
              label_map$1 = $2[0];
              from_id = $2[1];
              next_id$1 = $2[2];
              let _block$4;
              let $5 = $dict.get(label_map$1, to_label);
              if ($5 instanceof Ok) {
                let id = $5[0];
                _block$4 = [label_map$1, id, next_id$1];
              } else {
                _block$4 = [
                  $dict.insert(label_map$1, to_label, next_id$1),
                  next_id$1,
                  next_id$1 + 1,
                ];
              }
              let $4 = _block$4;
              let label_map$2;
              let to_id;
              let next_id$2;
              label_map$2 = $4[0];
              to_id = $4[1];
              next_id$2 = $4[2];
              return new Ok(
                [
                  label_map$2,
                  listPrepend([from_id, to_id, 1], edges),
                  next_id$2,
                ],
              );
            } else {
              let from_label = parts.head;
              let to_label = $.head;
              let weight_str = $1.head;
              let weight_res = $int.parse(weight_str);
              if (weight_res instanceof Ok) {
                let w = weight_res[0];
                let _block$3;
                let $3 = $dict.get(label_map, from_label);
                if ($3 instanceof Ok) {
                  let id = $3[0];
                  _block$3 = [label_map, id, next_id];
                } else {
                  _block$3 = [
                    $dict.insert(label_map, from_label, next_id),
                    next_id,
                    next_id + 1,
                  ];
                }
                let $2 = _block$3;
                let label_map$1;
                let from_id;
                let next_id$1;
                label_map$1 = $2[0];
                from_id = $2[1];
                next_id$1 = $2[2];
                let _block$4;
                let $5 = $dict.get(label_map$1, to_label);
                if ($5 instanceof Ok) {
                  let id = $5[0];
                  _block$4 = [label_map$1, id, next_id$1];
                } else {
                  _block$4 = [
                    $dict.insert(label_map$1, to_label, next_id$1),
                    next_id$1,
                    next_id$1 + 1,
                  ];
                }
                let $4 = _block$4;
                let label_map$2;
                let to_id;
                let next_id$2;
                label_map$2 = $4[0];
                to_id = $4[1];
                next_id$2 = $4[2];
                return new Ok(
                  [
                    label_map$2,
                    listPrepend([from_id, to_id, w], edges),
                    next_id$2,
                  ],
                );
              } else {
                return new Error(
                  ((("Line " + $int.to_string(idx + 1)) + ": Invalid weight '") + weight_str) + "'",
                );
              }
            }
          }
        }
      } else {
        return acc;
      }
    },
  );
  let result = _block$1;
  if (result instanceof Ok) {
    let label_map = result[0][0];
    let edges = result[0][1];
    let g = $model.new$(new $model.Directed());
    let g$1 = $dict.fold(
      label_map,
      g,
      (acc, label, id) => { return $model.add_node(acc, id, label); },
    );
    let g$2 = $list.fold(
      edges,
      g$1,
      (acc, e) => {
        let from;
        let to;
        let w;
        from = e[0];
        to = e[1];
        w = e[2];
        return $model.add_edge(acc, from, to, w);
      },
    );
    return new Ok(g$2);
  } else {
    return result;
  }
}

function validate_params(model) {
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block;
    let _pipe = $int.parse(model.nodes);
    _block = $result.unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 100;
    if ($1) {
      return new Error("Complete graph nodes cannot exceed 100");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof BinaryTree) {
    let _block;
    let _pipe = $int.parse(model.depth);
    _block = $result.unwrap(_pipe, 0);
    let d = _block;
    let $1 = d > 10;
    if ($1) {
      return new Error(
        "Binary Tree depth cannot exceed 10 (it grows exponentially!)",
      );
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof Grid2D) {
    let _block;
    let _pipe = $int.parse(model.height);
    _block = $result.unwrap(_pipe, 0);
    let r = _block;
    let _block$1;
    let _pipe$1 = $int.parse(model.width);
    _block$1 = $result.unwrap(_pipe$1, 0);
    let c = _block$1;
    let $1 = r * c > 2500;
    if ($1) {
      return new Error("Grid size (Rows x Cols) cannot exceed 2500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block;
    let _pipe = $int.parse(model.nodes);
    _block = $result.unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block;
    let _pipe = $int.parse(model.nodes);
    _block = $result.unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof BarabasiAlbert) {
    let _block;
    let _pipe = $int.parse(model.nodes);
    _block = $result.unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof WattsStrogatz) {
    let _block;
    let _pipe = $int.parse(model.nodes);
    _block = $result.unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof CSV) {
    let $1 = parse_csv_to_graph(model.csv_input);
    if ($1 instanceof Ok) {
      return new Ok(undefined);
    } else {
      return $1;
    }
  } else {
    return new Ok(undefined);
  }
}

function render_graph_effect(json) {
  return $effect.from((_) => { return render_graph_js(json); });
}

function copy_to_clipboard_effect(text) {
  return $effect.from((_) => { return copy_to_clipboard_js(text); });
}

function render_mermaid_effect(mermaid) {
  return $effect.from((_) => { return render_mermaid_js(mermaid); });
}

function render_dot_effect(dot) {
  return $effect.from((_) => { return render_dot_js(dot); });
}

function download_image_effect(tab) {
  return $effect.from((_) => { return download_image_js(tab); });
}

function generate_mermaid_code(model) {
  let _block;
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 5);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.complete(n);
  } else if ($ instanceof Cycle) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 3);
    let n = _block$1;
    _block = $classic.cycle(n);
  } else if ($ instanceof Path) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.path(n);
  } else if ($ instanceof Star) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.star(n);
  } else if ($ instanceof Wheel) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 4);
    let n = _block$1;
    _block = $classic.wheel(n);
  } else if ($ instanceof Bipartite) {
    let _block$1;
    let _pipe = $int.parse(model.width);
    let _pipe$1 = $result.unwrap(_pipe, 3);
    _block$1 = $int.max(_pipe$1, 1);
    let m = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.height);
    let _pipe$3 = $result.unwrap(_pipe$2, 3);
    _block$2 = $int.max(_pipe$3, 1);
    let n = _block$2;
    _block = $classic.complete_bipartite(m, n);
  } else if ($ instanceof Empty) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 0);
    let n = _block$1;
    _block = $classic.empty(n);
  } else if ($ instanceof BinaryTree) {
    let _block$1;
    let _pipe = $int.parse(model.depth);
    let _pipe$1 = $result.unwrap(_pipe, 3);
    _block$1 = $int.max(_pipe$1, 0);
    let d = _block$1;
    _block = $classic.binary_tree(d);
  } else if ($ instanceof Grid2D) {
    let _block$1;
    let _pipe = $int.parse(model.height);
    let _pipe$1 = $result.unwrap(_pipe, 5);
    _block$1 = $int.max(_pipe$1, 1);
    let r = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.width);
    let _pipe$3 = $result.unwrap(_pipe$2, 5);
    _block$2 = $int.max(_pipe$3, 1);
    let c = _block$2;
    _block = $classic.grid_2d(r, c);
  } else if ($ instanceof Petersen) {
    _block = $classic.petersen();
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $float.parse(model.density);
    _block$2 = $result.unwrap(_pipe$2, 0.3);
    let p = _block$2;
    _block = $random.erdos_renyi_gnp(n, p);
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.m);
    let _pipe$3 = $result.unwrap(_pipe$2, 10);
    _block$2 = $int.max(_pipe$3, 0);
    let m = _block$2;
    _block = $random.erdos_renyi_gnm(n, m);
  } else if ($ instanceof BarabasiAlbert) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 2);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.m);
    let _pipe$3 = $result.unwrap(_pipe$2, 1);
    _block$2 = $int.max(_pipe$3, 1);
    let m = _block$2;
    _block = $random.barabasi_albert(n, m);
  } else if ($ instanceof WattsStrogatz) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 3);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.k);
    let _pipe$3 = $result.unwrap(_pipe$2, 4);
    _block$2 = $int.max(_pipe$3, 2);
    let k = _block$2;
    let _block$3;
    let _pipe$4 = $float.parse(model.p);
    _block$3 = $result.unwrap(_pipe$4, 0.1);
    let p = _block$3;
    _block = $random.watts_strogatz(n, k, p);
  } else if ($ instanceof RandomTree) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $random.random_tree(n);
  } else {
    _block = $model.new$(new $model.Directed());
  }
  let graph = _block;
  let string_graph = new $model.Graph(
    graph.kind,
    (() => {
      let _pipe = graph.nodes;
      return $dict.map_values(
        _pipe,
        (_, v) => {
          let $1 = $string.is_empty($string.inspect(v));
          if ($1) {
            return "node";
          } else {
            let _pipe$1 = $string.inspect(v);
            return $string.replace(_pipe$1, "\"", "");
          }
        },
      );
    })(),
    (() => {
      let _pipe = graph.out_edges;
      return $dict.map_values(
        _pipe,
        (_, edges) => {
          let _pipe$1 = edges;
          return $dict.map_values(
            _pipe$1,
            (_, v2) => { return $int.to_string(v2); },
          );
        },
      );
    })(),
    (() => {
      let _pipe = graph.in_edges;
      return $dict.map_values(
        _pipe,
        (_, edges) => {
          let _pipe$1 = edges;
          return $dict.map_values(
            _pipe$1,
            (_, v2) => { return $int.to_string(v2); },
          );
        },
      );
    })(),
  );
  return $render.to_mermaid(string_graph, $render.default_options());
}

function tab_button(label, tab, is_active) {
  return $html.button(
    toList([
      $event.on_click(new SelectTab(tab)),
      $attribute.class$(
        (() => {
          if (is_active) {
            return "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-sky-500 text-sky-500 bg-sky-500/10";
          } else {
            return "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-transparent text-slate-400 hover:text-white hover:bg-white/5";
          }
        })(),
      ),
    ]),
    toList([$element.text(label)]),
  );
}

function input_field(label, val, msg, typ, step) {
  return $html.div(
    toList([$attribute.class$("mb-4")]),
    toList([
      $html.label(
        toList([
          $attribute.class$(
            "block text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1",
          ),
        ]),
        toList([$element.text(label)]),
      ),
      $html.input(
        toList([
          $attribute.type_(typ),
          $attribute.value(val),
          $event.on_input(msg),
          $attribute.attribute("step", step),
          $attribute.class$(
            "w-full p-3 bg-slate-900/80 border border-white/10 rounded text-white font-sans text-sm outline-none focus:border-sky-500 transition-colors",
          ),
        ]),
      ),
    ]),
  );
}

function parameters_form(model) {
  return $html.div(
    toList([]),
    (() => {
      let $ = model.graph_type;
      if ($ instanceof Complete) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Cycle) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Path) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Star) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Wheel) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Bipartite) {
        return toList([
          input_field(
            "Partition M",
            model.width,
            (var0) => { return new UpdateWidth(var0); },
            "number",
            "1",
          ),
          input_field(
            "Partition N",
            model.height,
            (var0) => { return new UpdateHeight(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Empty) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof BinaryTree) {
        return toList([
          input_field(
            "Depth",
            model.depth,
            (var0) => { return new UpdateDepth(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Grid2D) {
        return toList([
          input_field(
            "Rows",
            model.height,
            (var0) => { return new UpdateHeight(var0); },
            "number",
            "1",
          ),
          input_field(
            "Cols",
            model.width,
            (var0) => { return new UpdateWidth(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof Petersen) {
        return toList([]);
      } else if ($ instanceof ErdosRenyiGnp) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
          input_field(
            "Probability",
            model.density,
            (var0) => { return new UpdateDensity(var0); },
            "number",
            "0.01",
          ),
        ]);
      } else if ($ instanceof ErdosRenyiGnm) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
          input_field(
            "Edges (M)",
            model.m,
            (var0) => { return new UpdateM(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof BarabasiAlbert) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
          input_field(
            "Edges per node (M)",
            model.m,
            (var0) => { return new UpdateM(var0); },
            "number",
            "1",
          ),
        ]);
      } else if ($ instanceof WattsStrogatz) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
          input_field(
            "Neighbors (K)",
            model.k,
            (var0) => { return new UpdateK(var0); },
            "number",
            "2",
          ),
          input_field(
            "Rewiring Prob (P)",
            model.p,
            (var0) => { return new UpdateP(var0); },
            "number",
            "0.01",
          ),
        ]);
      } else if ($ instanceof RandomTree) {
        return toList([
          input_field(
            "Nodes",
            model.nodes,
            (var0) => { return new UpdateNodes(var0); },
            "number",
            "1",
          ),
        ]);
      } else {
        return toList([
          $html.div(
            toList([$attribute.class$("mb-4")]),
            toList([
              $html.label(
                toList([
                  $attribute.class$(
                    "block text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1",
                  ),
                ]),
                toList([$element.text("CSV Input (From, To, Weight)")]),
              ),
              $html.textarea(
                toList([
                  $attribute.class$(
                    "w-full h-40 bg-slate-900 p-4 rounded border border-white/10 text-[13px] font-mono text-sky-400 focus:outline-none focus:border-sky-500/50 transition-colors resize-none",
                  ),
                  $attribute.value(model.csv_input),
                  $event.on_input((var0) => { return new UpdateCSV(var0); }),
                  $attribute.attribute("maxlength", "5000"),
                  $attribute.attribute("placeholder", "A, B, 1\nB, C, 2"),
                ]),
                "",
              ),
            ]),
          ),
          $html.h3(
            toList([
              $attribute.class$(
                "text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
              ),
            ]),
            toList([$element.text("Graph Analysis")]),
          ),
          $html.div(
            toList([$attribute.class$("grid grid-cols-2 gap-4 mb-4")]),
            toList([
              input_field(
                "Source Node",
                model.analysis_source,
                (var0) => { return new UpdateAnalysisSource(var0); },
                "text",
                "",
              ),
              input_field(
                "Target Node",
                model.analysis_target,
                (var0) => { return new UpdateAnalysisTarget(var0); },
                "text",
                "",
              ),
            ]),
          ),
          (() => {
            let $1 = model.analysis_result;
            if ($1 instanceof Some) {
              let result = $1[0];
              return $html.div(
                toList([
                  $attribute.class$(
                    "p-4 bg-sky-500/5 border border-sky-500/20 rounded text-[13px] font-medium text-sky-300 whitespace-pre-wrap leading-relaxed shadow-inner",
                  ),
                ]),
                toList([$element.text(result)]),
              );
            } else {
              return $element.none();
            }
          })(),
        ]);
      }
    })(),
  );
}

function view(model) {
  return $html.div(
    toList([$attribute.class$("max-w-[1400px] mx-auto")]),
    toList([
      $html.div(
        toList([
          $attribute.class$(
            "bg-slate-800/70 backdrop-blur-xl border border-white/10 rounded overflow-hidden p-12 shadow-2xl mb-12",
          ),
        ]),
        toList([
          $html.div(
            toList([
              $attribute.class$(
                "grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 mb-12",
              ),
            ]),
            toList([
              $html.div(
                toList([]),
                toList([
                  $html.h1(
                    toList([
                      $attribute.class$(
                        "text-4xl font-extrabold mb-2 text-white leading-tight",
                      ),
                    ]),
                    toList([$element.text("🎨 Yog Graph Playground")]),
                  ),
                  $html.p(
                    toList([
                      $attribute.class$("text-slate-400 mb-8 font-medium"),
                    ]),
                    toList([
                      $element.text(
                        "Generate graphs interactively with Yog and visualize with Cytoscape.js!",
                      ),
                    ]),
                  ),
                  $html.h3(
                    toList([
                      $attribute.class$(
                        "text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
                      ),
                    ]),
                    toList([$element.text("Graph Type")]),
                  ),
                  $html.select(
                    toList([
                      $event.on_input(
                        (val) => {
                          if (val === "Complete") {
                            return new SelectGraphType(new Complete());
                          } else if (val === "Cycle") {
                            return new SelectGraphType(new Cycle());
                          } else if (val === "Path") {
                            return new SelectGraphType(new Path());
                          } else if (val === "Star") {
                            return new SelectGraphType(new Star());
                          } else if (val === "Wheel") {
                            return new SelectGraphType(new Wheel());
                          } else if (val === "Bipartite") {
                            return new SelectGraphType(new Bipartite());
                          } else if (val === "Empty") {
                            return new SelectGraphType(new Empty());
                          } else if (val === "BinaryTree") {
                            return new SelectGraphType(new BinaryTree());
                          } else if (val === "Grid2D") {
                            return new SelectGraphType(new Grid2D());
                          } else if (val === "Petersen") {
                            return new SelectGraphType(new Petersen());
                          } else if (val === "ErdosRenyiGnp") {
                            return new SelectGraphType(new ErdosRenyiGnp());
                          } else if (val === "ErdosRenyiGnm") {
                            return new SelectGraphType(new ErdosRenyiGnm());
                          } else if (val === "BarabasiAlbert") {
                            return new SelectGraphType(new BarabasiAlbert());
                          } else if (val === "WattsStrogatz") {
                            return new SelectGraphType(new WattsStrogatz());
                          } else if (val === "RandomTree") {
                            return new SelectGraphType(new RandomTree());
                          } else if (val === "CSV") {
                            return new SelectGraphType(new CSV());
                          } else {
                            return new SelectGraphType(new ErdosRenyiGnp());
                          }
                        },
                      ),
                      $attribute.class$(
                        "w-full p-3 bg-slate-900/80 border border-white/10 rounded text-white font-sans text-base cursor-pointer outline-none focus:border-sky-500 transition-colors appearance-none",
                      ),
                      $attribute.value(
                        (() => {
                          let $ = model.graph_type;
                          if ($ instanceof Complete) {
                            return "Complete";
                          } else if ($ instanceof Cycle) {
                            return "Cycle";
                          } else if ($ instanceof Path) {
                            return "Path";
                          } else if ($ instanceof Star) {
                            return "Star";
                          } else if ($ instanceof Wheel) {
                            return "Wheel";
                          } else if ($ instanceof Bipartite) {
                            return "Bipartite";
                          } else if ($ instanceof Empty) {
                            return "Empty";
                          } else if ($ instanceof BinaryTree) {
                            return "BinaryTree";
                          } else if ($ instanceof Grid2D) {
                            return "Grid2D";
                          } else if ($ instanceof Petersen) {
                            return "Petersen";
                          } else if ($ instanceof ErdosRenyiGnp) {
                            return "ErdosRenyiGnp";
                          } else if ($ instanceof ErdosRenyiGnm) {
                            return "ErdosRenyiGnm";
                          } else if ($ instanceof BarabasiAlbert) {
                            return "BarabasiAlbert";
                          } else if ($ instanceof WattsStrogatz) {
                            return "WattsStrogatz";
                          } else if ($ instanceof RandomTree) {
                            return "RandomTree";
                          } else {
                            return "CSV";
                          }
                        })(),
                      ),
                    ]),
                    toList([
                      $html.option(
                        toList([$attribute.value("Complete")]),
                        "♾️ Complete",
                      ),
                      $html.option(
                        toList([$attribute.value("Cycle")]),
                        "⭕ Cycle",
                      ),
                      $html.option(toList([$attribute.value("Path")]), "📏 Path"),
                      $html.option(toList([$attribute.value("Star")]), "⭐ Star"),
                      $html.option(
                        toList([$attribute.value("Wheel")]),
                        "🎡 Wheel",
                      ),
                      $html.option(
                        toList([$attribute.value("Bipartite")]),
                        "👥 Bipartite",
                      ),
                      $html.option(
                        toList([$attribute.value("Empty")]),
                        "🕳️ Empty",
                      ),
                      $html.option(
                        toList([$attribute.value("BinaryTree")]),
                        "🌳 Binary Tree",
                      ),
                      $html.option(
                        toList([$attribute.value("Grid2D")]),
                        "🏁 Grid 2D",
                      ),
                      $html.option(
                        toList([$attribute.value("Petersen")]),
                        "📐 Petersen",
                      ),
                      $html.option(
                        toList([$attribute.value("ErdosRenyiGnp")]),
                        "🎲 Random (Gnp)",
                      ),
                      $html.option(
                        toList([$attribute.value("ErdosRenyiGnm")]),
                        "🎲 Random (Gnm)",
                      ),
                      $html.option(
                        toList([$attribute.value("BarabasiAlbert")]),
                        "📈 Scale-free (BA)",
                      ),
                      $html.option(
                        toList([$attribute.value("WattsStrogatz")]),
                        "🌐 Small-world (WS)",
                      ),
                      $html.option(
                        toList([$attribute.value("RandomTree")]),
                        "🎋 Random Tree",
                      ),
                      $html.option(
                        toList([$attribute.value("CSV")]),
                        "📊 CSV (Experimental)",
                      ),
                    ]),
                  ),
                  $html.h3(
                    toList([
                      $attribute.class$(
                        "text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest",
                      ),
                    ]),
                    toList([$element.text("Parameters")]),
                  ),
                  parameters_form(model),
                  (() => {
                    let $ = model.validation_error;
                    if ($ instanceof Some) {
                      let err = $[0];
                      return $html.div(
                        toList([
                          $attribute.class$(
                            "mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded",
                          ),
                        ]),
                        toList([
                          $html.p(
                            toList([
                              $attribute.class$(
                                "text-red-400 text-xs font-medium m-0",
                              ),
                            ]),
                            toList([$element.text("⚠️ " + err)]),
                          ),
                        ]),
                      );
                    } else {
                      return $element.none();
                    }
                  })(),
                  $html.div(
                    toList([$attribute.class$("mt-8")]),
                    toList([
                      $html.button(
                        toList([
                          $event.on_click(new GenerateGraph()),
                          $attribute.class$(
                            "w-full bg-sky-500 hover:bg-sky-600 text-white border-none p-4 rounded cursor-pointer text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-sky-500/20",
                          ),
                        ]),
                        toList([$element.text("✨ Generate & Visualize")]),
                      ),
                    ]),
                  ),
                ]),
              ),
              $html.div(
                toList([]),
                toList([
                  $html.div(
                    toList([
                      $attribute.class$(
                        "flex gap-4 mb-4 border-b border-white/10 pb-2",
                      ),
                    ]),
                    toList([
                      tab_button(
                        "JSON",
                        new Json(),
                        model.active_tab instanceof Json,
                      ),
                      tab_button(
                        "Mermaid",
                        new Mermaid(),
                        model.active_tab instanceof Mermaid,
                      ),
                      tab_button(
                        "DOT",
                        new Dot(),
                        model.active_tab instanceof Dot,
                      ),
                    ]),
                  ),
                  $html.div(
                    toList([]),
                    toList([
                      (() => {
                        let $ = model.active_tab;
                        if ($ instanceof Json) {
                          return $html.div(
                            toList([]),
                            toList([
                              $html.div(
                                toList([
                                  $attribute.class$(
                                    "flex justify-between items-center mb-2",
                                  ),
                                ]),
                                toList([
                                  $html.h3(
                                    toList([
                                      $attribute.class$(
                                        "text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0",
                                      ),
                                    ]),
                                    toList([$element.text("Generated JSON")]),
                                  ),
                                  (() => {
                                    let $1 = model.generated_json;
                                    if ($1 === "") {
                                      return $element.none();
                                    } else {
                                      return $html.div(
                                        toList([$attribute.class$("flex gap-2")]),
                                        toList([
                                          $html.button(
                                            toList([
                                              $attribute.class$(
                                                "bg-sky-600 hover:bg-sky-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                              ),
                                              $event.on_click(
                                                new DownloadImage(),
                                              ),
                                            ]),
                                            toList([$element.text("💾 Download")]),
                                          ),
                                          $html.button(
                                            toList([
                                              $attribute.class$(
                                                "bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                              ),
                                              $event.on_click(new CopyJson()),
                                            ]),
                                            toList([$element.text("📋 Copy")]),
                                          ),
                                        ]),
                                      );
                                    }
                                  })(),
                                ]),
                              ),
                              (() => {
                                let $1 = model.generated_json;
                                if ($1 === "") {
                                  return $html.p(
                                    toList([
                                      $attribute.class$(
                                        "text-slate-400 mb-8 font-medium",
                                      ),
                                    ]),
                                    toList([
                                      $element.text(
                                        "Click 'Generate' to see output",
                                      ),
                                    ]),
                                  );
                                } else {
                                  let json = $1;
                                  return $html.pre(
                                    toList([
                                      $attribute.class$(
                                        "bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400",
                                      ),
                                    ]),
                                    toList([$element.text(json)]),
                                  );
                                }
                              })(),
                            ]),
                          );
                        } else if ($ instanceof Mermaid) {
                          return $html.div(
                            toList([]),
                            toList([
                              $html.div(
                                toList([
                                  $attribute.class$(
                                    "flex justify-between items-center mb-2",
                                  ),
                                ]),
                                toList([
                                  $html.h3(
                                    toList([
                                      $attribute.class$(
                                        "text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0",
                                      ),
                                    ]),
                                    toList([$element.text("Mermaid Definition")]),
                                  ),
                                  (() => {
                                    let $1 = model.mermaid_code;
                                    if ($1 === "") {
                                      return $element.none();
                                    } else {
                                      return $html.div(
                                        toList([$attribute.class$("flex gap-2")]),
                                        toList([
                                          $html.button(
                                            toList([
                                              $attribute.class$(
                                                "bg-sky-600 hover:bg-sky-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                              ),
                                              $event.on_click(
                                                new DownloadImage(),
                                              ),
                                            ]),
                                            toList([$element.text("💾 Download")]),
                                          ),
                                          $html.button(
                                            toList([
                                              $attribute.class$(
                                                "bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                              ),
                                              $event.on_click(new CopyMermaid()),
                                            ]),
                                            toList([$element.text("📋 Copy")]),
                                          ),
                                        ]),
                                      );
                                    }
                                  })(),
                                ]),
                              ),
                              (() => {
                                let $1 = model.mermaid_code;
                                if ($1 === "") {
                                  return $html.p(
                                    toList([
                                      $attribute.class$(
                                        "text-slate-400 mb-8 font-medium",
                                      ),
                                    ]),
                                    toList([
                                      $element.text(
                                        "Click 'Generate' to see definition",
                                      ),
                                    ]),
                                  );
                                } else {
                                  let code = $1;
                                  return $html.pre(
                                    toList([
                                      $attribute.class$(
                                        "bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400",
                                      ),
                                    ]),
                                    toList([$element.text(code)]),
                                  );
                                }
                              })(),
                            ]),
                          );
                        } else {
                          return $html.div(
                            toList([]),
                            toList([
                              $html.div(
                                toList([
                                  $attribute.class$(
                                    "flex justify-between items-center mb-2",
                                  ),
                                ]),
                                toList([
                                  $html.h3(
                                    toList([
                                      $attribute.class$(
                                        "text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0",
                                      ),
                                    ]),
                                    toList([$element.text("DOT Definition")]),
                                  ),
                                  (() => {
                                    let $1 = model.dot_code;
                                    if ($1 === "") {
                                      return $element.none();
                                    } else {
                                      return $html.div(
                                        toList([$attribute.class$("flex gap-2")]),
                                        toList([
                                          $html.button(
                                            toList([
                                              $attribute.class$(
                                                "bg-sky-600 hover:bg-sky-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                              ),
                                              $event.on_click(
                                                new DownloadImage(),
                                              ),
                                            ]),
                                            toList([$element.text("💾 Download")]),
                                          ),
                                          $html.button(
                                            toList([
                                              $attribute.class$(
                                                "bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors",
                                              ),
                                              $event.on_click(new CopyDot()),
                                            ]),
                                            toList([$element.text("📋 Copy")]),
                                          ),
                                        ]),
                                      );
                                    }
                                  })(),
                                ]),
                              ),
                              (() => {
                                let $1 = model.dot_code;
                                if ($1 === "") {
                                  return $html.p(
                                    toList([
                                      $attribute.class$(
                                        "text-slate-400 mb-8 font-medium",
                                      ),
                                    ]),
                                    toList([
                                      $element.text(
                                        "Click 'Generate' to see definition",
                                      ),
                                    ]),
                                  );
                                } else {
                                  let code = $1;
                                  return $html.pre(
                                    toList([
                                      $attribute.class$(
                                        "bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400",
                                      ),
                                    ]),
                                    toList([$element.text(code)]),
                                  );
                                }
                              })(),
                            ]),
                          );
                        }
                      })(),
                    ]),
                  ),
                ]),
              ),
            ]),
          ),
          $html.div(
            toList([]),
            toList([
              $html.h3(
                toList([
                  $attribute.class$(
                    "text-slate-400 text-[10px] mb-3 font-bold uppercase tracking-widest",
                  ),
                ]),
                toList([
                  $element.text(
                    (() => {
                      let $ = model.active_tab;
                      if ($ instanceof Json) {
                        return "Cytoscape Visualization";
                      } else if ($ instanceof Mermaid) {
                        return "Mermaid Diagram";
                      } else {
                        return "Graphviz Visualization";
                      }
                    })(),
                  ),
                ]),
              ),
              $html.div(
                toList([
                  $attribute.id("cy"),
                  $attribute.class$(
                    (() => {
                      let $ = model.active_tab;
                      if ($ instanceof Json) {
                        return "w-full h-[600px] bg-slate-900/40 border border-white/10 rounded mt-4";
                      } else {
                        return "hidden";
                      }
                    })(),
                  ),
                ]),
                toList([]),
              ),
              $html.div(
                toList([
                  $attribute.id("mermaid-graph"),
                  $attribute.class$(
                    (() => {
                      let $ = model.active_tab;
                      if ($ instanceof Mermaid) {
                        return "w-full min-h-[400px] bg-white p-8 rounded flex justify-center overflow-auto mt-4";
                      } else {
                        return "hidden";
                      }
                    })(),
                  ),
                ]),
                toList([]),
              ),
              $html.div(
                toList([
                  $attribute.id("dot-graph"),
                  $attribute.class$(
                    (() => {
                      let $ = model.active_tab;
                      if ($ instanceof Dot) {
                        return "w-full min-h-[400px] bg-white p-8 rounded flex justify-center overflow-auto mt-4";
                      } else {
                        return "hidden";
                      }
                    })(),
                  ),
                ]),
                toList([]),
              ),
            ]),
          ),
        ]),
      ),
    ]),
  );
}

function generate_graph_json(model) {
  let _block;
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 5);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.complete(n);
  } else if ($ instanceof Cycle) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 3);
    let n = _block$1;
    _block = $classic.cycle(n);
  } else if ($ instanceof Path) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.path(n);
  } else if ($ instanceof Star) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.star(n);
  } else if ($ instanceof Wheel) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 4);
    let n = _block$1;
    _block = $classic.wheel(n);
  } else if ($ instanceof Bipartite) {
    let _block$1;
    let _pipe = $int.parse(model.width);
    let _pipe$1 = $result.unwrap(_pipe, 3);
    _block$1 = $int.max(_pipe$1, 1);
    let m = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.height);
    let _pipe$3 = $result.unwrap(_pipe$2, 3);
    _block$2 = $int.max(_pipe$3, 1);
    let n = _block$2;
    _block = $classic.complete_bipartite(m, n);
  } else if ($ instanceof Empty) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 0);
    let n = _block$1;
    _block = $classic.empty(n);
  } else if ($ instanceof BinaryTree) {
    let _block$1;
    let _pipe = $int.parse(model.depth);
    let _pipe$1 = $result.unwrap(_pipe, 3);
    _block$1 = $int.max(_pipe$1, 0);
    let d = _block$1;
    _block = $classic.binary_tree(d);
  } else if ($ instanceof Grid2D) {
    let _block$1;
    let _pipe = $int.parse(model.height);
    let _pipe$1 = $result.unwrap(_pipe, 5);
    _block$1 = $int.max(_pipe$1, 1);
    let r = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.width);
    let _pipe$3 = $result.unwrap(_pipe$2, 5);
    _block$2 = $int.max(_pipe$3, 1);
    let c = _block$2;
    _block = $classic.grid_2d(r, c);
  } else if ($ instanceof Petersen) {
    _block = $classic.petersen();
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $float.parse(model.density);
    _block$2 = $result.unwrap(_pipe$2, 0.3);
    let p = _block$2;
    _block = $random.erdos_renyi_gnp(n, p);
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.m);
    let _pipe$3 = $result.unwrap(_pipe$2, 10);
    _block$2 = $int.max(_pipe$3, 0);
    let m = _block$2;
    _block = $random.erdos_renyi_gnm(n, m);
  } else if ($ instanceof BarabasiAlbert) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 2);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.m);
    let _pipe$3 = $result.unwrap(_pipe$2, 1);
    _block$2 = $int.max(_pipe$3, 1);
    let m = _block$2;
    _block = $random.barabasi_albert(n, m);
  } else if ($ instanceof WattsStrogatz) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 3);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.k);
    let _pipe$3 = $result.unwrap(_pipe$2, 4);
    _block$2 = $int.max(_pipe$3, 2);
    let k = _block$2;
    let _block$3;
    let _pipe$4 = $float.parse(model.p);
    _block$3 = $result.unwrap(_pipe$4, 0.1);
    let p = _block$3;
    _block = $random.watts_strogatz(n, k, p);
  } else if ($ instanceof RandomTree) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $random.random_tree(n);
  } else {
    _block = $model.new$(new $model.Directed());
  }
  let graph = _block;
  let string_graph = new $model.Graph(
    graph.kind,
    (() => {
      let _pipe = graph.nodes;
      return $dict.map_values(
        _pipe,
        (_, v) => {
          let $1 = $string.is_empty($string.inspect(v));
          if ($1) {
            return "node";
          } else {
            let _pipe$1 = $string.inspect(v);
            return $string.replace(_pipe$1, "\"", "");
          }
        },
      );
    })(),
    (() => {
      let _pipe = graph.out_edges;
      return $dict.map_values(
        _pipe,
        (_, edges) => {
          let _pipe$1 = edges;
          return $dict.map_values(
            _pipe$1,
            (_, v2) => { return $int.to_string(v2); },
          );
        },
      );
    })(),
    (() => {
      let _pipe = graph.in_edges;
      return $dict.map_values(
        _pipe,
        (_, edges) => {
          let _pipe$1 = edges;
          return $dict.map_values(
            _pipe$1,
            (_, v2) => { return $int.to_string(v2); },
          );
        },
      );
    })(),
  );
  return $render.to_json(string_graph, $render.default_json_options());
}

function generate_dot_code(model) {
  let _block;
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 5);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.complete(n);
  } else if ($ instanceof Cycle) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 3);
    let n = _block$1;
    _block = $classic.cycle(n);
  } else if ($ instanceof Path) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.path(n);
  } else if ($ instanceof Star) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $classic.star(n);
  } else if ($ instanceof Wheel) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 4);
    let n = _block$1;
    _block = $classic.wheel(n);
  } else if ($ instanceof Bipartite) {
    let _block$1;
    let _pipe = $int.parse(model.width);
    let _pipe$1 = $result.unwrap(_pipe, 3);
    _block$1 = $int.max(_pipe$1, 1);
    let m = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.height);
    let _pipe$3 = $result.unwrap(_pipe$2, 3);
    _block$2 = $int.max(_pipe$3, 1);
    let n = _block$2;
    _block = $classic.complete_bipartite(m, n);
  } else if ($ instanceof Empty) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 0);
    let n = _block$1;
    _block = $classic.empty(n);
  } else if ($ instanceof BinaryTree) {
    let _block$1;
    let _pipe = $int.parse(model.depth);
    let _pipe$1 = $result.unwrap(_pipe, 3);
    _block$1 = $int.max(_pipe$1, 0);
    let d = _block$1;
    _block = $classic.binary_tree(d);
  } else if ($ instanceof Grid2D) {
    let _block$1;
    let _pipe = $int.parse(model.height);
    let _pipe$1 = $result.unwrap(_pipe, 5);
    _block$1 = $int.max(_pipe$1, 1);
    let r = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.width);
    let _pipe$3 = $result.unwrap(_pipe$2, 5);
    _block$2 = $int.max(_pipe$3, 1);
    let c = _block$2;
    _block = $classic.grid_2d(r, c);
  } else if ($ instanceof Petersen) {
    _block = $classic.petersen();
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $float.parse(model.density);
    _block$2 = $result.unwrap(_pipe$2, 0.3);
    let p = _block$2;
    _block = $random.erdos_renyi_gnp(n, p);
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.m);
    let _pipe$3 = $result.unwrap(_pipe$2, 10);
    _block$2 = $int.max(_pipe$3, 0);
    let m = _block$2;
    _block = $random.erdos_renyi_gnm(n, m);
  } else if ($ instanceof BarabasiAlbert) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 2);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.m);
    let _pipe$3 = $result.unwrap(_pipe$2, 1);
    _block$2 = $int.max(_pipe$3, 1);
    let m = _block$2;
    _block = $random.barabasi_albert(n, m);
  } else if ($ instanceof WattsStrogatz) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 3);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = $int.parse(model.k);
    let _pipe$3 = $result.unwrap(_pipe$2, 4);
    _block$2 = $int.max(_pipe$3, 2);
    let k = _block$2;
    let _block$3;
    let _pipe$4 = $float.parse(model.p);
    _block$3 = $result.unwrap(_pipe$4, 0.1);
    let p = _block$3;
    _block = $random.watts_strogatz(n, k, p);
  } else if ($ instanceof RandomTree) {
    let _block$1;
    let _pipe = $int.parse(model.nodes);
    let _pipe$1 = $result.unwrap(_pipe, 10);
    _block$1 = $int.max(_pipe$1, 1);
    let n = _block$1;
    _block = $random.random_tree(n);
  } else {
    _block = $model.new$(new $model.Directed());
  }
  let graph = _block;
  let string_graph = new $model.Graph(
    graph.kind,
    (() => {
      let _pipe = graph.nodes;
      return $dict.map_values(
        _pipe,
        (_, v) => {
          let $1 = $string.is_empty($string.inspect(v));
          if ($1) {
            return "node";
          } else {
            let _pipe$1 = $string.inspect(v);
            return $string.replace(_pipe$1, "\"", "");
          }
        },
      );
    })(),
    (() => {
      let _pipe = graph.out_edges;
      return $dict.map_values(
        _pipe,
        (_, edges) => {
          let _pipe$1 = edges;
          return $dict.map_values(
            _pipe$1,
            (_, v2) => { return $int.to_string(v2); },
          );
        },
      );
    })(),
    (() => {
      let _pipe = graph.in_edges;
      return $dict.map_values(
        _pipe,
        (_, edges) => {
          let _pipe$1 = edges;
          return $dict.map_values(
            _pipe$1,
            (_, v2) => { return $int.to_string(v2); },
          );
        },
      );
    })(),
  );
  return $render.to_dot(string_graph, $render.default_dot_options());
}

function update(loop$m, loop$msg) {
  while (true) {
    let m = loop$m;
    let msg = loop$msg;
    if (msg instanceof SelectGraphType) {
      let graph_type = msg[0];
      return [
        new Model(
          graph_type,
          m.nodes,
          m.density,
          m.width,
          m.height,
          m.m,
          m.k,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateNodes) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          value,
          m.density,
          m.width,
          m.height,
          m.m,
          m.k,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateDensity) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          value,
          m.width,
          m.height,
          m.m,
          m.k,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateWidth) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          m.density,
          value,
          m.height,
          m.m,
          m.k,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateHeight) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          m.density,
          m.width,
          value,
          m.m,
          m.k,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateM) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          m.density,
          m.width,
          m.height,
          value,
          m.k,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateK) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          m.density,
          m.width,
          m.height,
          m.m,
          value,
          m.p,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateP) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          m.density,
          m.width,
          m.height,
          m.m,
          m.k,
          value,
          m.depth,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof UpdateDepth) {
      let value = msg[0];
      return [
        new Model(
          m.graph_type,
          m.nodes,
          m.density,
          m.width,
          m.height,
          m.m,
          m.k,
          m.p,
          value,
          m.generated_json,
          m.mermaid_code,
          m.dot_code,
          m.csv_input,
          m.analysis_source,
          m.analysis_target,
          m.analysis_result,
          m.active_tab,
          m.validation_error,
        ),
        $effect.none(),
      ];
    } else if (msg instanceof GenerateGraph) {
      let $ = validate_params(m);
      if ($ instanceof Ok) {
        let _block;
        let $2 = m.graph_type;
        if ($2 instanceof CSV) {
          let $3 = parse_csv_to_graph(m.csv_input);
          if ($3 instanceof Ok) {
            let graph = $3[0];
            let analysis_result = run_graph_analysis(graph, m);
            let string_graph = new $model.Graph(
              graph.kind,
              graph.nodes,
              (() => {
                let _pipe = graph.out_edges;
                return $dict.map_values(
                  _pipe,
                  (_, edges) => {
                    let _pipe$1 = edges;
                    return $dict.map_values(
                      _pipe$1,
                      (_, v2) => { return $int.to_string(v2); },
                    );
                  },
                );
              })(),
              (() => {
                let _pipe = graph.in_edges;
                return $dict.map_values(
                  _pipe,
                  (_, edges) => {
                    let _pipe$1 = edges;
                    return $dict.map_values(
                      _pipe$1,
                      (_, v2) => { return $int.to_string(v2); },
                    );
                  },
                );
              })(),
            );
            let _block$1;
            let _pipe = $render.to_json(
              string_graph,
              $render.default_json_options(),
            );
            _block$1 = format_json(_pipe);
            let json = _block$1;
            let mermaid = $render.to_mermaid(
              string_graph,
              $render.default_options(),
            );
            let dot = $render.to_dot(
              string_graph,
              $render.default_dot_options(),
            );
            _block = [json, mermaid, dot, analysis_result];
          } else {
            _block = ["", "", "", new None()];
          }
        } else {
          let _block$1;
          let _pipe = generate_graph_json(m);
          _block$1 = format_json(_pipe);
          let json = _block$1;
          let mermaid = generate_mermaid_code(m);
          let dot = generate_dot_code(m);
          _block = [json, mermaid, dot, new None()];
        }
        let $1 = _block;
        let json;
        let mermaid;
        let dot;
        let analysis_result;
        json = $1[0];
        mermaid = $1[1];
        dot = $1[2];
        analysis_result = $1[3];
        let $3 = (json === "") && (m.graph_type instanceof CSV);
        if ($3) {
          let _block$1;
          let $4 = parse_csv_to_graph(m.csv_input);
          if ($4 instanceof Error) {
            let e = $4[0];
            _block$1 = e;
          } else {
            _block$1 = "Unknown CSV error";
          }
          let err = _block$1;
          return [
            new Model(
              m.graph_type,
              m.nodes,
              m.density,
              m.width,
              m.height,
              m.m,
              m.k,
              m.p,
              m.depth,
              m.generated_json,
              m.mermaid_code,
              m.dot_code,
              m.csv_input,
              m.analysis_source,
              m.analysis_target,
              m.analysis_result,
              m.active_tab,
              new Some(err),
            ),
            $effect.none(),
          ];
        } else {
          return [
            new Model(
              m.graph_type,
              m.nodes,
              m.density,
              m.width,
              m.height,
              m.m,
              m.k,
              m.p,
              m.depth,
              json,
              mermaid,
              dot,
              m.csv_input,
              m.analysis_source,
              m.analysis_target,
              analysis_result,
              m.active_tab,
              new None(),
            ),
            $effect.batch(
              toList([
                render_graph_effect(json),
                render_mermaid_effect(mermaid),
                render_dot_effect(dot),
              ]),
            ),
          ];
        }
      } else {
        let err = $[0];
        return [
          new Model(
            m.graph_type,
            m.nodes,
            m.density,
            m.width,
            m.height,
            m.m,
            m.k,
            m.p,
            m.depth,
            m.generated_json,
            m.mermaid_code,
            m.dot_code,
            m.csv_input,
            m.analysis_source,
            m.analysis_target,
            m.analysis_result,
            m.active_tab,
            new Some(err),
          ),
          $effect.none(),
        ];
      }
    } else if (msg instanceof CopyJson) {
      return [m, copy_to_clipboard_effect(m.generated_json)];
    } else if (msg instanceof CopyMermaid) {
      return [m, copy_to_clipboard_effect(m.mermaid_code)];
    } else if (msg instanceof CopyDot) {
      return [m, copy_to_clipboard_effect(m.dot_code)];
    } else if (msg instanceof SelectTab) {
      let tab = msg[0];
      let m$1 = new Model(
        m.graph_type,
        m.nodes,
        m.density,
        m.width,
        m.height,
        m.m,
        m.k,
        m.p,
        m.depth,
        m.generated_json,
        m.mermaid_code,
        m.dot_code,
        m.csv_input,
        m.analysis_source,
        m.analysis_target,
        m.analysis_result,
        tab,
        m.validation_error,
      );
      let _block;
      if (tab instanceof Json) {
        _block = render_graph_effect(m$1.generated_json);
      } else if (tab instanceof Mermaid) {
        _block = render_mermaid_effect(m$1.mermaid_code);
      } else {
        _block = render_dot_effect(m$1.dot_code);
      }
      let eff = _block;
      return [m$1, eff];
    } else if (msg instanceof DownloadImage) {
      return [m, download_image_effect(m.active_tab)];
    } else if (msg instanceof UpdateCSV) {
      let value = msg[0];
      let m$1 = new Model(
        m.graph_type,
        m.nodes,
        m.density,
        m.width,
        m.height,
        m.m,
        m.k,
        m.p,
        m.depth,
        m.generated_json,
        m.mermaid_code,
        m.dot_code,
        value,
        m.analysis_source,
        m.analysis_target,
        m.analysis_result,
        m.active_tab,
        m.validation_error,
      );
      let $ = m$1.graph_type;
      if ($ instanceof CSV) {
        loop$m = m$1;
        loop$msg = new GenerateGraph();
      } else {
        return [m$1, $effect.none()];
      }
    } else if (msg instanceof UpdateAnalysisSource) {
      let value = msg[0];
      let m$1 = new Model(
        m.graph_type,
        m.nodes,
        m.density,
        m.width,
        m.height,
        m.m,
        m.k,
        m.p,
        m.depth,
        m.generated_json,
        m.mermaid_code,
        m.dot_code,
        m.csv_input,
        value,
        m.analysis_target,
        m.analysis_result,
        m.active_tab,
        m.validation_error,
      );
      loop$m = m$1;
      loop$msg = new GenerateGraph();
    } else {
      let value = msg[0];
      let m$1 = new Model(
        m.graph_type,
        m.nodes,
        m.density,
        m.width,
        m.height,
        m.m,
        m.k,
        m.p,
        m.depth,
        m.generated_json,
        m.mermaid_code,
        m.dot_code,
        m.csv_input,
        m.analysis_source,
        value,
        m.analysis_result,
        m.active_tab,
        m.validation_error,
      );
      loop$m = m$1;
      loop$msg = new GenerateGraph();
    }
  }
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "lustre_graph_generator",
      1352,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 46297,
        end: 46346,
        pattern_start: 46308,
        pattern_end: 46313
      }
    )
  }
  return $;
}
