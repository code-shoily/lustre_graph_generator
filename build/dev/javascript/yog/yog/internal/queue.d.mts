import type * as _ from "../../gleam.d.mts";

export class Queue<AOAF> extends _.CustomType {
  /** @deprecated */
  constructor(front: _.List<any>, back: _.List<any>);
  /** @deprecated */
  front: _.List<any>;
  /** @deprecated */
  back: _.List<any>;
}
export function Queue$Queue<AOAF>(
  front: _.List<any>,
  back: _.List<any>,
): Queue$<AOAF>;
export function Queue$isQueue<AOAF>(value: Queue$<AOAF>): boolean;
export function Queue$Queue$0<AOAF>(value: Queue$<AOAF>): _.List<any>;
export function Queue$Queue$front<AOAF>(value: Queue$<AOAF>): _.List<any>;
export function Queue$Queue$1<AOAF>(value: Queue$<AOAF>): _.List<any>;
export function Queue$Queue$back<AOAF>(value: Queue$<AOAF>): _.List<any>;

export type Queue$<AOAF> = Queue<AOAF>;

export function new$(): Queue$<any>;

export function push<AOAI>(queue: Queue$<AOAI>, item: AOAI): Queue$<AOAI>;

export function push_list<AOAL>(queue: Queue$<AOAL>, items: _.List<AOAL>): Queue$<
  AOAL
>;

export function pop<AOAP>(queue: Queue$<AOAP>): _.Result<
  [AOAP, Queue$<AOAP>],
  undefined
>;
