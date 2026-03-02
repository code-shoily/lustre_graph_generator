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
): Next$<ABVK, ABVL>;
export function Next$isContinue<ABVK, ABVL>(value: Next$<ABVK, ABVL>): boolean;
export function Next$Continue$0<ABVL, ABVK>(value: Next$<ABVK, ABVL>): ABVK;
export function Next$Continue$state<ABVK, ABVL>(value: Next$<ABVK, ABVL>): ABVK;
export function Next$Continue$1<ABVL, ABVK>(value: Next$<ABVK, ABVL>): $option.Option$<
  $process.Selector$<any>
>;
export function Next$Continue$selector<ABVL, ABVK>(value: Next$<ABVK, ABVL>): $option.Option$<
  $process.Selector$<any>
>;

export class NormalStop extends _.CustomType {}
export function Next$NormalStop<ABVL, ABVK>(): Next$<ABVK, ABVL>;
export function Next$isNormalStop<ABVK, ABVL>(
  value: Next$<ABVK, ABVL>,
): boolean;

export class AbnormalStop extends _.CustomType {
  /** @deprecated */
  constructor(reason: string);
  /** @deprecated */
  reason: string;
}
export function Next$AbnormalStop<ABVK, ABVL>(
  reason: string,
): Next$<ABVK, ABVL>;
export function Next$isAbnormalStop<ABVK, ABVL>(
  value: Next$<ABVK, ABVL>,
): boolean;
export function Next$AbnormalStop$0<ABVK, ABVL>(value: Next$<ABVK, ABVL>): string;
export function Next$AbnormalStop$reason<ABVL, ABVK>(
  value: Next$<ABVK, ABVL>,
): string;

export type Next$<ABVK, ABVL> = Continue<ABVL, ABVK> | NormalStop | AbnormalStop;
