import type * as $json from "../../gleam_json/gleam/json.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $model from "../yog/model.d.mts";
import type * as $pathfinding from "../yog/pathfinding.d.mts";

export class MermaidOptions extends _.CustomType {
  /** @deprecated */
  constructor(
    node_label: (x0: number, x1: string) => string,
    edge_label: (x0: string) => string,
    highlighted_nodes: $option.Option$<_.List<number>>,
    highlighted_edges: $option.Option$<_.List<[number, number]>>
  );
  /** @deprecated */
  node_label: (x0: number, x1: string) => string;
  /** @deprecated */
  edge_label: (x0: string) => string;
  /** @deprecated */
  highlighted_nodes: $option.Option$<_.List<number>>;
  /** @deprecated */
  highlighted_edges: $option.Option$<_.List<[number, number]>>;
}
export function MermaidOptions$MermaidOptions(
  node_label: (x0: number, x1: string) => string,
  edge_label: (x0: string) => string,
  highlighted_nodes: $option.Option$<_.List<number>>,
  highlighted_edges: $option.Option$<_.List<[number, number]>>,
): MermaidOptions$;
export function MermaidOptions$isMermaidOptions(
  value: MermaidOptions$,
): boolean;
export function MermaidOptions$MermaidOptions$0(value: MermaidOptions$): (
  x0: number,
  x1: string
) => string;
export function MermaidOptions$MermaidOptions$node_label(value: MermaidOptions$): (
  x0: number,
  x1: string
) => string;
export function MermaidOptions$MermaidOptions$1(value: MermaidOptions$): (
  x0: string
) => string;
export function MermaidOptions$MermaidOptions$edge_label(value: MermaidOptions$): (
  x0: string
) => string;
export function MermaidOptions$MermaidOptions$2(value: MermaidOptions$): $option.Option$<
  _.List<number>
>;
export function MermaidOptions$MermaidOptions$highlighted_nodes(value: MermaidOptions$): $option.Option$<
  _.List<number>
>;
export function MermaidOptions$MermaidOptions$3(value: MermaidOptions$): $option.Option$<
  _.List<[number, number]>
>;
export function MermaidOptions$MermaidOptions$highlighted_edges(value: MermaidOptions$): $option.Option$<
  _.List<[number, number]>
>;

export type MermaidOptions$ = MermaidOptions;

export class DotOptions extends _.CustomType {
  /** @deprecated */
  constructor(
    node_label: (x0: number, x1: string) => string,
    edge_label: (x0: string) => string,
    highlighted_nodes: $option.Option$<_.List<number>>,
    highlighted_edges: $option.Option$<_.List<[number, number]>>,
    node_shape: string,
    highlight_color: string
  );
  /** @deprecated */
  node_label: (x0: number, x1: string) => string;
  /** @deprecated */
  edge_label: (x0: string) => string;
  /** @deprecated */
  highlighted_nodes: $option.Option$<_.List<number>>;
  /** @deprecated */
  highlighted_edges: $option.Option$<_.List<[number, number]>>;
  /** @deprecated */
  node_shape: string;
  /** @deprecated */
  highlight_color: string;
}
export function DotOptions$DotOptions(
  node_label: (x0: number, x1: string) => string,
  edge_label: (x0: string) => string,
  highlighted_nodes: $option.Option$<_.List<number>>,
  highlighted_edges: $option.Option$<_.List<[number, number]>>,
  node_shape: string,
  highlight_color: string,
): DotOptions$;
export function DotOptions$isDotOptions(value: DotOptions$): boolean;
export function DotOptions$DotOptions$0(value: DotOptions$): (
  x0: number,
  x1: string
) => string;
export function DotOptions$DotOptions$node_label(value: DotOptions$): (
  x0: number,
  x1: string
) => string;
export function DotOptions$DotOptions$1(value: DotOptions$): (x0: string) => string;
export function DotOptions$DotOptions$edge_label(
  value: DotOptions$,
): (x0: string) => string;
export function DotOptions$DotOptions$2(value: DotOptions$): $option.Option$<
  _.List<number>
>;
export function DotOptions$DotOptions$highlighted_nodes(value: DotOptions$): $option.Option$<
  _.List<number>
>;
export function DotOptions$DotOptions$3(value: DotOptions$): $option.Option$<
  _.List<[number, number]>
>;
export function DotOptions$DotOptions$highlighted_edges(value: DotOptions$): $option.Option$<
  _.List<[number, number]>
>;
export function DotOptions$DotOptions$4(value: DotOptions$): string;
export function DotOptions$DotOptions$node_shape(value: DotOptions$): string;
export function DotOptions$DotOptions$5(value: DotOptions$): string;
export function DotOptions$DotOptions$highlight_color(value: DotOptions$): string;

export type DotOptions$ = DotOptions;

export class JsonOptions extends _.CustomType {
  /** @deprecated */
  constructor(
    node_mapper: (x0: number, x1: string) => $json.Json$,
    edge_mapper: (x0: number, x1: number, x2: string) => $json.Json$
  );
  /** @deprecated */
  node_mapper: (x0: number, x1: string) => $json.Json$;
  /** @deprecated */
  edge_mapper: (x0: number, x1: number, x2: string) => $json.Json$;
}
export function JsonOptions$JsonOptions(
  node_mapper: (x0: number, x1: string) => $json.Json$,
  edge_mapper: (x0: number, x1: number, x2: string) => $json.Json$,
): JsonOptions$;
export function JsonOptions$isJsonOptions(value: JsonOptions$): boolean;
export function JsonOptions$JsonOptions$0(value: JsonOptions$): (
  x0: number,
  x1: string
) => $json.Json$;
export function JsonOptions$JsonOptions$node_mapper(value: JsonOptions$): (
  x0: number,
  x1: string
) => $json.Json$;
export function JsonOptions$JsonOptions$1(value: JsonOptions$): (
  x0: number,
  x1: number,
  x2: string
) => $json.Json$;
export function JsonOptions$JsonOptions$edge_mapper(value: JsonOptions$): (
  x0: number,
  x1: number,
  x2: string
) => $json.Json$;

export type JsonOptions$ = JsonOptions;

export function default_options(): MermaidOptions$;

export function to_mermaid(
  graph: $model.Graph$<string, string>,
  options: MermaidOptions$
): string;

export function path_to_options(
  path: $pathfinding.Path$<any>,
  base_options: MermaidOptions$
): MermaidOptions$;

export function default_dot_options(): DotOptions$;

export function to_dot(
  graph: $model.Graph$<string, string>,
  options: DotOptions$
): string;

export function path_to_dot_options(
  path: $pathfinding.Path$<any>,
  base_options: DotOptions$
): DotOptions$;

export function default_json_options(): JsonOptions$;

export function to_json(
  graph: $model.Graph$<string, string>,
  options: JsonOptions$
): string;
