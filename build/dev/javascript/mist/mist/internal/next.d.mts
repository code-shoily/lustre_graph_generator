import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Continue<ABVL, ABVK> extends _.CustomType {
  /** @deprecated */
  constructor(state: ABVK, selector: $option.Option$<$process.Selector$<any>>);
  /** @deprecated */
  state: ABVK;
  /** @deprecated */
  selector: $option.Option$<$process.Selector$<any>>;
}
export function Next$Continue<ABVK, ABVL>(
  state: ABVK,
  selector: $option.Option$<$process.Selector$<any>>,
): Next$<ABVL, ABVK>;
export function Next$isContinue<ABVL, ABVK>(value: Next$<ABVL, ABVK>): boolean;
export function Next$Continue$0<ABVL, ABVK>(value: Next$<ABVL, ABVK>): ABVK;
export function Next$Continue$state<ABVK, ABVL>(value: Next$<ABVL, ABVK>): ABVK;
export function Next$Continue$1<ABVK, ABVL>(value: Next$<ABVL, ABVK>): $option.Option$<
  $process.Selector$<any>
>;
export function Next$Continue$selector<ABVL, ABVK>(value: Next$<ABVL, ABVK>): $option.Option$<
  $process.Selector$<any>
>;

export class NormalStop extends _.CustomType {}
export function Next$NormalStop<ABVK, ABVL>(): Next$<ABVL, ABVK>;
export function Next$isNormalStop<ABVL, ABVK>(
  value: Next$<ABVL, ABVK>,
): boolean;

export class AbnormalStop extends _.CustomType {
  /** @deprecated */
  constructor(reason: string);
  /** @deprecated */
  reason: string;
}
export function Next$AbnormalStop<ABVL, ABVK>(
  reason: string,
): Next$<ABVL, ABVK>;
export function Next$isAbnormalStop<ABVK, ABVL>(
  value: Next$<ABVL, ABVK>,
): boolean;
export function Next$AbnormalStop$0<ABVK, ABVL>(value: Next$<ABVL, ABVK>): string;
export function Next$AbnormalStop$reason<ABVK, ABVL>(
  value: Next$<ABVL, ABVK>,
): string;

export type Next$<ABVL, ABVK> = Continue<ABVK, ABVL> | NormalStop | AbnormalStop;
