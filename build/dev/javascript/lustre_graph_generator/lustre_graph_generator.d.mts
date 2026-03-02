import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $lustre from "../lustre/lustre.d.mts";
import type * as $effect from "../lustre/lustre/effect.d.mts";
import type * as $vnode from "../lustre/lustre/vdom/vnode.d.mts";
import type * as $model from "../yog/yog/model.d.mts";
import type * as _ from "./gleam.d.mts";

export class Json extends _.CustomType {}
export function Tab$Json(): Tab$;
export function Tab$isJson(value: Tab$): boolean;

export class Mermaid extends _.CustomType {}
export function Tab$Mermaid(): Tab$;
export function Tab$isMermaid(value: Tab$): boolean;

export class Dot extends _.CustomType {}
export function Tab$Dot(): Tab$;
export function Tab$isDot(value: Tab$): boolean;

export type Tab$ = Json | Mermaid | Dot;

export class Model extends _.CustomType {
  /** @deprecated */
  constructor(
    graph_type: GraphType$,
    nodes: string,
    density: string,
    width: string,
    height: string,
    m: string,
    k: string,
    p: string,
    depth: string,
    generated_json: string,
    mermaid_code: string,
    dot_code: string,
    csv_input: string,
    analysis_source: string,
    analysis_target: string,
    analysis_result: $option.Option$<string>,
    active_tab: Tab$,
    validation_error: $option.Option$<string>
  );
  /** @deprecated */
  graph_type: GraphType$;
  /** @deprecated */
  nodes: string;
  /** @deprecated */
  density: string;
  /** @deprecated */
  width: string;
  /** @deprecated */
  height: string;
  /** @deprecated */
  m: string;
  /** @deprecated */
  k: string;
  /** @deprecated */
  p: string;
  /** @deprecated */
  depth: string;
  /** @deprecated */
  generated_json: string;
  /** @deprecated */
  mermaid_code: string;
  /** @deprecated */
  dot_code: string;
  /** @deprecated */
  csv_input: string;
  /** @deprecated */
  analysis_source: string;
  /** @deprecated */
  analysis_target: string;
  /** @deprecated */
  analysis_result: $option.Option$<string>;
  /** @deprecated */
  active_tab: Tab$;
  /** @deprecated */
  validation_error: $option.Option$<string>;
}
export function Model$Model(
  graph_type: GraphType$,
  nodes: string,
  density: string,
  width: string,
  height: string,
  m: string,
  k: string,
  p: string,
  depth: string,
  generated_json: string,
  mermaid_code: string,
  dot_code: string,
  csv_input: string,
  analysis_source: string,
  analysis_target: string,
  analysis_result: $option.Option$<string>,
  active_tab: Tab$,
  validation_error: $option.Option$<string>,
): Model$;
export function Model$isModel(value: Model$): boolean;
export function Model$Model$0(value: Model$): GraphType$;
export function Model$Model$graph_type(value: Model$): GraphType$;
export function Model$Model$1(value: Model$): string;
export function Model$Model$nodes(value: Model$): string;
export function Model$Model$2(value: Model$): string;
export function Model$Model$density(value: Model$): string;
export function Model$Model$3(value: Model$): string;
export function Model$Model$width(value: Model$): string;
export function Model$Model$4(value: Model$): string;
export function Model$Model$height(value: Model$): string;
export function Model$Model$5(value: Model$): string;
export function Model$Model$m(value: Model$): string;
export function Model$Model$6(value: Model$): string;
export function Model$Model$k(value: Model$): string;
export function Model$Model$7(value: Model$): string;
export function Model$Model$p(value: Model$): string;
export function Model$Model$8(value: Model$): string;
export function Model$Model$depth(value: Model$): string;
export function Model$Model$9(value: Model$): string;
export function Model$Model$generated_json(value: Model$): string;
export function Model$Model$10(value: Model$): string;
export function Model$Model$mermaid_code(value: Model$): string;
export function Model$Model$11(value: Model$): string;
export function Model$Model$dot_code(value: Model$): string;
export function Model$Model$12(value: Model$): string;
export function Model$Model$csv_input(value: Model$): string;
export function Model$Model$13(value: Model$): string;
export function Model$Model$analysis_source(value: Model$): string;
export function Model$Model$14(value: Model$): string;
export function Model$Model$analysis_target(value: Model$): string;
export function Model$Model$15(value: Model$): $option.Option$<string>;
export function Model$Model$analysis_result(value: Model$): $option.Option$<
  string
>;
export function Model$Model$16(value: Model$): Tab$;
export function Model$Model$active_tab(value: Model$): Tab$;
export function Model$Model$17(value: Model$): $option.Option$<string>;
export function Model$Model$validation_error(value: Model$): $option.Option$<
  string
>;

export type Model$ = Model;

export class Complete extends _.CustomType {}
export function GraphType$Complete(): GraphType$;
export function GraphType$isComplete(value: GraphType$): boolean;

export class Cycle extends _.CustomType {}
export function GraphType$Cycle(): GraphType$;
export function GraphType$isCycle(value: GraphType$): boolean;

export class Path extends _.CustomType {}
export function GraphType$Path(): GraphType$;
export function GraphType$isPath(value: GraphType$): boolean;

export class Star extends _.CustomType {}
export function GraphType$Star(): GraphType$;
export function GraphType$isStar(value: GraphType$): boolean;

export class Wheel extends _.CustomType {}
export function GraphType$Wheel(): GraphType$;
export function GraphType$isWheel(value: GraphType$): boolean;

export class Bipartite extends _.CustomType {}
export function GraphType$Bipartite(): GraphType$;
export function GraphType$isBipartite(value: GraphType$): boolean;

export class Empty extends _.CustomType {}
export function GraphType$Empty(): GraphType$;
export function GraphType$isEmpty(value: GraphType$): boolean;

export class BinaryTree extends _.CustomType {}
export function GraphType$BinaryTree(): GraphType$;
export function GraphType$isBinaryTree(value: GraphType$): boolean;

export class Grid2D extends _.CustomType {}
export function GraphType$Grid2D(): GraphType$;
export function GraphType$isGrid2D(value: GraphType$): boolean;

export class Petersen extends _.CustomType {}
export function GraphType$Petersen(): GraphType$;
export function GraphType$isPetersen(value: GraphType$): boolean;

export class ErdosRenyiGnp extends _.CustomType {}
export function GraphType$ErdosRenyiGnp(): GraphType$;
export function GraphType$isErdosRenyiGnp(value: GraphType$): boolean;

export class ErdosRenyiGnm extends _.CustomType {}
export function GraphType$ErdosRenyiGnm(): GraphType$;
export function GraphType$isErdosRenyiGnm(value: GraphType$): boolean;

export class BarabasiAlbert extends _.CustomType {}
export function GraphType$BarabasiAlbert(): GraphType$;
export function GraphType$isBarabasiAlbert(value: GraphType$): boolean;

export class WattsStrogatz extends _.CustomType {}
export function GraphType$WattsStrogatz(): GraphType$;
export function GraphType$isWattsStrogatz(value: GraphType$): boolean;

export class RandomTree extends _.CustomType {}
export function GraphType$RandomTree(): GraphType$;
export function GraphType$isRandomTree(value: GraphType$): boolean;

export class CSV extends _.CustomType {}
export function GraphType$CSV(): GraphType$;
export function GraphType$isCSV(value: GraphType$): boolean;

export type GraphType$ = Complete | Cycle | Path | Star | Wheel | Bipartite | Empty | BinaryTree | Grid2D | Petersen | ErdosRenyiGnp | ErdosRenyiGnm | BarabasiAlbert | WattsStrogatz | RandomTree | CSV;

export class SelectGraphType extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: GraphType$);
  /** @deprecated */
  0: GraphType$;
}
export function Msg$SelectGraphType($0: GraphType$): Msg$;
export function Msg$isSelectGraphType(value: Msg$): boolean;
export function Msg$SelectGraphType$0(value: Msg$): GraphType$;

export class UpdateNodes extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateNodes($0: string): Msg$;
export function Msg$isUpdateNodes(value: Msg$): boolean;
export function Msg$UpdateNodes$0(value: Msg$): string;

export class UpdateDensity extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateDensity($0: string): Msg$;
export function Msg$isUpdateDensity(value: Msg$): boolean;
export function Msg$UpdateDensity$0(value: Msg$): string;

export class UpdateWidth extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateWidth($0: string): Msg$;
export function Msg$isUpdateWidth(value: Msg$): boolean;
export function Msg$UpdateWidth$0(value: Msg$): string;

export class UpdateHeight extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateHeight($0: string): Msg$;
export function Msg$isUpdateHeight(value: Msg$): boolean;
export function Msg$UpdateHeight$0(value: Msg$): string;

export class UpdateM extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateM($0: string): Msg$;
export function Msg$isUpdateM(value: Msg$): boolean;
export function Msg$UpdateM$0(value: Msg$): string;

export class UpdateK extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateK($0: string): Msg$;
export function Msg$isUpdateK(value: Msg$): boolean;
export function Msg$UpdateK$0(value: Msg$): string;

export class UpdateP extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateP($0: string): Msg$;
export function Msg$isUpdateP(value: Msg$): boolean;
export function Msg$UpdateP$0(value: Msg$): string;

export class UpdateDepth extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateDepth($0: string): Msg$;
export function Msg$isUpdateDepth(value: Msg$): boolean;
export function Msg$UpdateDepth$0(value: Msg$): string;

export class GenerateGraph extends _.CustomType {}
export function Msg$GenerateGraph(): Msg$;
export function Msg$isGenerateGraph(value: Msg$): boolean;

export class CopyJson extends _.CustomType {}
export function Msg$CopyJson(): Msg$;
export function Msg$isCopyJson(value: Msg$): boolean;

export class CopyMermaid extends _.CustomType {}
export function Msg$CopyMermaid(): Msg$;
export function Msg$isCopyMermaid(value: Msg$): boolean;

export class CopyDot extends _.CustomType {}
export function Msg$CopyDot(): Msg$;
export function Msg$isCopyDot(value: Msg$): boolean;

export class SelectTab extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Tab$);
  /** @deprecated */
  0: Tab$;
}
export function Msg$SelectTab($0: Tab$): Msg$;
export function Msg$isSelectTab(value: Msg$): boolean;
export function Msg$SelectTab$0(value: Msg$): Tab$;

export class DownloadImage extends _.CustomType {}
export function Msg$DownloadImage(): Msg$;
export function Msg$isDownloadImage(value: Msg$): boolean;

export class UpdateCSV extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateCSV($0: string): Msg$;
export function Msg$isUpdateCSV(value: Msg$): boolean;
export function Msg$UpdateCSV$0(value: Msg$): string;

export class UpdateAnalysisSource extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateAnalysisSource($0: string): Msg$;
export function Msg$isUpdateAnalysisSource(value: Msg$): boolean;
export function Msg$UpdateAnalysisSource$0(value: Msg$): string;

export class UpdateAnalysisTarget extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Msg$UpdateAnalysisTarget($0: string): Msg$;
export function Msg$isUpdateAnalysisTarget(value: Msg$): boolean;
export function Msg$UpdateAnalysisTarget$0(value: Msg$): string;

export type Msg$ = SelectGraphType | UpdateNodes | UpdateDensity | UpdateWidth | UpdateHeight | UpdateM | UpdateK | UpdateP | UpdateDepth | GenerateGraph | CopyJson | CopyMermaid | CopyDot | SelectTab | DownloadImage | UpdateCSV | UpdateAnalysisSource | UpdateAnalysisTarget;

export function main(): _.Result<$lustre.Runtime$<Msg$>, $lustre.Error$>;
