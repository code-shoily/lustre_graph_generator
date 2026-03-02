/// <reference types="./components.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $set from "../../gleam_stdlib/gleam/set.mjs";
import {
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "../gleam.mjs";
import * as $model from "../yog/model.mjs";
import * as $transform from "../yog/transform.mjs";

export class TarjanState extends $CustomType {
  constructor(index, stack, on_stack, indices, low_links, components) {
    super();
    this.index = index;
    this.stack = stack;
    this.on_stack = on_stack;
    this.indices = indices;
    this.low_links = low_links;
    this.components = components;
  }
}
export const TarjanState$TarjanState = (index, stack, on_stack, indices, low_links, components) =>
  new TarjanState(index, stack, on_stack, indices, low_links, components);
export const TarjanState$isTarjanState = (value) =>
  value instanceof TarjanState;
export const TarjanState$TarjanState$index = (value) => value.index;
export const TarjanState$TarjanState$0 = (value) => value.index;
export const TarjanState$TarjanState$stack = (value) => value.stack;
export const TarjanState$TarjanState$1 = (value) => value.stack;
export const TarjanState$TarjanState$on_stack = (value) => value.on_stack;
export const TarjanState$TarjanState$2 = (value) => value.on_stack;
export const TarjanState$TarjanState$indices = (value) => value.indices;
export const TarjanState$TarjanState$3 = (value) => value.indices;
export const TarjanState$TarjanState$low_links = (value) => value.low_links;
export const TarjanState$TarjanState$4 = (value) => value.low_links;
export const TarjanState$TarjanState$components = (value) => value.components;
export const TarjanState$TarjanState$5 = (value) => value.components;

function pop_stack_until(loop$u, loop$state, loop$component) {
  while (true) {
    let u = loop$u;
    let state = loop$state;
    let component = loop$component;
    let $ = state.stack;
    if ($ instanceof $Empty) {
      return state;
    } else {
      let head = $.head;
      let tail = $.tail;
      let new_component = listPrepend(head, component);
      let new_on_stack = $dict.insert(state.on_stack, head, false);
      let next_state = new TarjanState(
        state.index,
        tail,
        new_on_stack,
        state.indices,
        state.low_links,
        state.components,
      );
      let $1 = head === u;
      if ($1) {
        return new TarjanState(
          next_state.index,
          next_state.stack,
          next_state.on_stack,
          next_state.indices,
          next_state.low_links,
          listPrepend(new_component, state.components),
        );
      } else {
        loop$u = u;
        loop$state = next_state;
        loop$component = new_component;
      }
    }
  }
}

function strong_connect(graph, u, state) {
  let state$1 = new TarjanState(
    state.index + 1,
    listPrepend(u, state.stack),
    $dict.insert(state.on_stack, u, true),
    $dict.insert(state.indices, u, state.index),
    $dict.insert(state.low_links, u, state.index),
    state.components,
  );
  let successors = $model.successor_ids(graph, u);
  let state$2 = $list.fold(
    successors,
    state$1,
    (st, v) => {
      let $ = $dict.has_key(st.indices, v);
      if ($) {
        let $1 = (() => {
          let _pipe = $dict.get(st.on_stack, v);
          return $result.unwrap(_pipe, false);
        })();
        if ($1) {
          let _block;
          let _pipe = $dict.get(st.low_links, u);
          _block = $result.unwrap(_pipe, 0);
          let u_low = _block;
          let _block$1;
          let _pipe$1 = $dict.get(st.indices, v);
          _block$1 = $result.unwrap(_pipe$1, 0);
          let v_index = _block$1;
          return new TarjanState(
            st.index,
            st.stack,
            st.on_stack,
            st.indices,
            $dict.insert(st.low_links, u, $int.min(u_low, v_index)),
            st.components,
          );
        } else {
          return st;
        }
      } else {
        let st$1 = strong_connect(graph, v, st);
        let _block;
        let _pipe = $dict.get(st$1.low_links, u);
        _block = $result.unwrap(_pipe, 0);
        let u_low = _block;
        let _block$1;
        let _pipe$1 = $dict.get(st$1.low_links, v);
        _block$1 = $result.unwrap(_pipe$1, 0);
        let v_low = _block$1;
        return new TarjanState(
          st$1.index,
          st$1.stack,
          st$1.on_stack,
          st$1.indices,
          $dict.insert(st$1.low_links, u, $int.min(u_low, v_low)),
          st$1.components,
        );
      }
    },
  );
  let _block;
  let _pipe = $dict.get(state$2.indices, u);
  _block = $result.unwrap(_pipe, 0);
  let u_index = _block;
  let _block$1;
  let _pipe$1 = $dict.get(state$2.low_links, u);
  _block$1 = $result.unwrap(_pipe$1, 0);
  let u_low = _block$1;
  let $ = u_low === u_index;
  if ($) {
    return pop_stack_until(u, state$2, toList([]));
  } else {
    return state$2;
  }
}

/**
 * Finds Strongly Connected Components (SCC) using Tarjan's Algorithm.
 * Returns a list of components, where each component is a list of NodeIds.
 */
export function strongly_connected_components(graph) {
  let nodes = $model.all_nodes(graph);
  let initial_state = new TarjanState(
    0,
    toList([]),
    $dict.new$(),
    $dict.new$(),
    $dict.new$(),
    toList([]),
  );
  let final_state = $list.fold(
    nodes,
    initial_state,
    (state, node) => {
      let $ = $dict.has_key(state.indices, node);
      if ($) {
        return state;
      } else {
        return strong_connect(graph, node, state);
      }
    },
  );
  return final_state.components;
}

function first_dfs(graph, node, visited, stack) {
  let $ = $set.contains(visited, node);
  if ($) {
    return [stack, visited];
  } else {
    let new_visited = $set.insert(visited, node);
    let successors = $model.successor_ids(graph, node);
    let $1 = $list.fold(
      successors,
      [stack, new_visited],
      (acc, succ) => {
        let s;
        let v;
        s = acc[0];
        v = acc[1];
        return first_dfs(graph, succ, v, s);
      },
    );
    let new_stack;
    let final_visited;
    new_stack = $1[0];
    final_visited = $1[1];
    return [listPrepend(node, new_stack), final_visited];
  }
}

function second_dfs(transposed, node, visited, component) {
  let $ = $set.contains(visited, node);
  if ($) {
    return [component, visited];
  } else {
    let new_visited = $set.insert(visited, node);
    let new_component = listPrepend(node, component);
    let successors = $model.successor_ids(transposed, node);
    return $list.fold(
      successors,
      [new_component, new_visited],
      (acc, succ) => {
        let comp;
        let vis;
        comp = acc[0];
        vis = acc[1];
        return second_dfs(transposed, succ, vis, comp);
      },
    );
  }
}

/**
 * Finds Strongly Connected Components (SCC) using Kosaraju's Algorithm.
 *
 * Returns a list of components, where each component is a list of NodeIds.
 * Kosaraju's algorithm uses two DFS passes and graph transposition:
 *
 * 1. First DFS: Compute finishing times (nodes added to stack when DFS completes)
 * 2. Transpose the graph (reverse all edges) - O(1) operation!
 * 3. Second DFS: Process nodes in reverse finishing time order on transposed graph
 *
 * **Time Complexity:** O(V + E) where V is vertices and E is edges
 * **Space Complexity:** O(V) for the visited set and finish stack
 *
 * ## Example
 *
 * ```gleam
 * let graph =
 *   model.new(Directed)
 *   |> model.add_node(1, "A")
 *   |> model.add_node(2, "B")
 *   |> model.add_node(3, "C")
 *   |> model.add_edge(from: 1, to: 2, with: 1)
 *   |> model.add_edge(from: 2, to: 3, with: 1)
 *   |> model.add_edge(from: 3, to: 1, with: 1)
 *
 * let sccs = components.kosaraju(graph)
 * // => [[1, 2, 3]]  // All nodes form one SCC (cycle)
 * ```
 *
 * ## Comparison with Tarjan's Algorithm
 *
 * - **Kosaraju:** Two DFS passes, requires graph transposition, simpler to understand
 * - **Tarjan:** Single DFS pass, no transposition needed, uses low-link values
 *
 * Both have the same O(V + E) time complexity, but Kosaraju may be preferred when:
 * - The graph is already stored in a format supporting fast transposition
 * - Simplicity and clarity are prioritized over single-pass execution
 */
export function kosaraju(graph) {
  let nodes = $model.all_nodes(graph);
  let $ = $list.fold(
    nodes,
    [toList([]), $set.new$()],
    (acc, node) => {
      let stack;
      let visited;
      stack = acc[0];
      visited = acc[1];
      return first_dfs(graph, node, visited, stack);
    },
  );
  let finish_stack;
  finish_stack = $[0];
  let transposed = $transform.transpose(graph);
  let $1 = $list.fold(
    finish_stack,
    [toList([]), $set.new$()],
    (acc, node) => {
      let components;
      let visited;
      components = acc[0];
      visited = acc[1];
      let $2 = $set.contains(visited, node);
      if ($2) {
        return acc;
      } else {
        let $3 = second_dfs(transposed, node, visited, toList([]));
        let component;
        let new_visited;
        component = $3[0];
        new_visited = $3[1];
        return [listPrepend(component, components), new_visited];
      }
    },
  );
  let components;
  components = $1[0];
  return components;
}
