import type * as $json from "../../../gleam_json/gleam/json.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $mutable_map from "../../lustre/internals/mutable_map.d.mts";
import type * as $vattr from "../../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

export class Patch<TSE> extends _.CustomType {
  /** @deprecated */
  constructor(
    index: number,
    removed: number,
    changes: _.List<Change$<any>>,
    children: _.List<Patch$<any>>
  );
  /** @deprecated */
  index: number;
  /** @deprecated */
  removed: number;
  /** @deprecated */
  changes: _.List<Change$<any>>;
  /** @deprecated */
  children: _.List<Patch$<any>>;
}
export function Patch$Patch<TSE>(
  index: number,
  removed: number,
  changes: _.List<Change$<any>>,
  children: _.List<Patch$<any>>,
): Patch$<TSE>;
export function Patch$isPatch<TSE>(value: Patch$<TSE>): boolean;
export function Patch$Patch$0<TSE>(value: Patch$<TSE>): number;
export function Patch$Patch$index<TSE>(value: Patch$<TSE>): number;
export function Patch$Patch$1<TSE>(value: Patch$<TSE>): number;
export function Patch$Patch$removed<TSE>(value: Patch$<TSE>): number;
export function Patch$Patch$2<TSE>(value: Patch$<TSE>): _.List<Change$<any>>;
export function Patch$Patch$changes<TSE>(value: Patch$<TSE>): _.List<
  Change$<any>
>;
export function Patch$Patch$3<TSE>(value: Patch$<TSE>): _.List<Patch$<any>>;
export function Patch$Patch$children<TSE>(value: Patch$<TSE>): _.List<
  Patch$<any>
>;

export type Patch$<TSE> = Patch<TSE>;

export class ReplaceText extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, content: string);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  content: string;
}
export function Change$ReplaceText<TSF>(
  kind: number,
  content: string,
): Change$<TSF>;
export function Change$isReplaceText<TSF>(value: Change$<TSF>): boolean;
export function Change$ReplaceText$0<TSF>(value: Change$<TSF>): number;
export function Change$ReplaceText$kind<TSF>(value: Change$<TSF>): number;
export function Change$ReplaceText$1<TSF>(value: Change$<TSF>): string;
export function Change$ReplaceText$content<TSF>(value: Change$<TSF>): string;

export class ReplaceInnerHtml extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, inner_html: string);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  inner_html: string;
}
export function Change$ReplaceInnerHtml<TSF>(
  kind: number,
  inner_html: string,
): Change$<TSF>;
export function Change$isReplaceInnerHtml<TSF>(value: Change$<TSF>): boolean;
export function Change$ReplaceInnerHtml$0<TSF>(value: Change$<TSF>): number;
export function Change$ReplaceInnerHtml$kind<TSF>(value: Change$<TSF>): number;
export function Change$ReplaceInnerHtml$1<TSF>(value: Change$<TSF>): string;
export function Change$ReplaceInnerHtml$inner_html<TSF>(value: Change$<TSF>): string;

export class Update<TSF> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    added: _.List<$vattr.Attribute$<any>>,
    removed: _.List<$vattr.Attribute$<any>>
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  added: _.List<$vattr.Attribute$<any>>;
  /** @deprecated */
  removed: _.List<$vattr.Attribute$<any>>;
}
export function Change$Update<TSF>(
  kind: number,
  added: _.List<$vattr.Attribute$<any>>,
  removed: _.List<$vattr.Attribute$<any>>,
): Change$<TSF>;
export function Change$isUpdate<TSF>(value: Change$<TSF>): boolean;
export function Change$Update$0<TSF>(value: Change$<TSF>): number;
export function Change$Update$kind<TSF>(value: Change$<TSF>): number;
export function Change$Update$1<TSF>(value: Change$<TSF>): _.List<
  $vattr.Attribute$<any>
>;
export function Change$Update$added<TSF>(value: Change$<TSF>): _.List<
  $vattr.Attribute$<any>
>;
export function Change$Update$2<TSF>(value: Change$<TSF>): _.List<
  $vattr.Attribute$<any>
>;
export function Change$Update$removed<TSF>(value: Change$<TSF>): _.List<
  $vattr.Attribute$<any>
>;

export class Move extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, key: string, before: number);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  key: string;
  /** @deprecated */
  before: number;
}
export function Change$Move<TSF>(
  kind: number,
  key: string,
  before: number,
): Change$<TSF>;
export function Change$isMove<TSF>(value: Change$<TSF>): boolean;
export function Change$Move$0<TSF>(value: Change$<TSF>): number;
export function Change$Move$kind<TSF>(value: Change$<TSF>): number;
export function Change$Move$1<TSF>(value: Change$<TSF>): string;
export function Change$Move$key<TSF>(value: Change$<TSF>): string;
export function Change$Move$2<TSF>(value: Change$<TSF>): number;
export function Change$Move$before<TSF>(value: Change$<TSF>): number;

export class Replace<TSF> extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, index: number, with$: $vnode.Element$<any>);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  index: number;
  /** @deprecated */
  with$: $vnode.Element$<any>;
}
export function Change$Replace<TSF>(
  kind: number,
  index: number,
  with$: $vnode.Element$<any>,
): Change$<TSF>;
export function Change$isReplace<TSF>(value: Change$<TSF>): boolean;
export function Change$Replace$0<TSF>(value: Change$<TSF>): number;
export function Change$Replace$kind<TSF>(value: Change$<TSF>): number;
export function Change$Replace$1<TSF>(value: Change$<TSF>): number;
export function Change$Replace$index<TSF>(value: Change$<TSF>): number;
export function Change$Replace$2<TSF>(value: Change$<TSF>): $vnode.Element$<any>;
export function Change$Replace$with<TSF>(
  value: Change$<TSF>,
): $vnode.Element$<any>;

export class Remove extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, index: number);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  index: number;
}
export function Change$Remove<TSF>(kind: number, index: number): Change$<TSF>;
export function Change$isRemove<TSF>(value: Change$<TSF>): boolean;
export function Change$Remove$0<TSF>(value: Change$<TSF>): number;
export function Change$Remove$kind<TSF>(value: Change$<TSF>): number;
export function Change$Remove$1<TSF>(value: Change$<TSF>): number;
export function Change$Remove$index<TSF>(value: Change$<TSF>): number;

export class Insert<TSF> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    children: _.List<$vnode.Element$<any>>,
    before: number
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  children: _.List<$vnode.Element$<any>>;
  /** @deprecated */
  before: number;
}
export function Change$Insert<TSF>(
  kind: number,
  children: _.List<$vnode.Element$<any>>,
  before: number,
): Change$<TSF>;
export function Change$isInsert<TSF>(value: Change$<TSF>): boolean;
export function Change$Insert$0<TSF>(value: Change$<TSF>): number;
export function Change$Insert$kind<TSF>(value: Change$<TSF>): number;
export function Change$Insert$1<TSF>(value: Change$<TSF>): _.List<
  $vnode.Element$<any>
>;
export function Change$Insert$children<TSF>(value: Change$<TSF>): _.List<
  $vnode.Element$<any>
>;
export function Change$Insert$2<TSF>(value: Change$<TSF>): number;
export function Change$Insert$before<TSF>(value: Change$<TSF>): number;

export type Change$<TSF> = ReplaceText | ReplaceInnerHtml | Update<TSF> | Move | Replace<
  TSF
> | Remove | Insert<TSF>;

export function Change$kind<TSF>(value: Change$<TSF>): number;

export const replace_text_kind: number;

export const replace_inner_html_kind: number;

export const update_kind: number;

export const move_kind: number;

export const remove_kind: number;

export const replace_kind: number;

export const insert_kind: number;

export function new$<TSG>(
  index: number,
  removed: number,
  changes: _.List<Change$<TSG>>,
  children: _.List<Patch$<TSG>>
): Patch$<TSG>;

export function is_empty(patch: Patch$<any>): boolean;

export function add_child<TTJ>(parent: Patch$<TTJ>, child: Patch$<TTJ>): Patch$<
  TTJ
>;

export function to_json<TTN>(
  patch: Patch$<TTN>,
  memos: $mutable_map.MutableMap$<
    () => $vnode.Element$<TTN>,
    $vnode.Element$<TTN>
  >
): $json.Json$;

export function replace_text(content: string): Change$<any>;

export function replace_inner_html(inner_html: string): Change$<any>;

export function update<TSQ>(
  added: _.List<$vattr.Attribute$<TSQ>>,
  removed: _.List<$vattr.Attribute$<TSQ>>
): Change$<TSQ>;

export function move(key: string, before: number): Change$<any>;

export function remove(index: number): Change$<any>;

export function replace<TTA>(index: number, with$: $vnode.Element$<TTA>): Change$<
  TTA
>;

export function insert<TTD>(
  children: _.List<$vnode.Element$<TTD>>,
  before: number
): Change$<TTD>;
