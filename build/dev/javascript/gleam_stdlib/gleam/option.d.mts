import type * as _ from "../gleam.d.mts";

export class Some<FO> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FO);
  /** @deprecated */
  0: FO;
}
export function Option$Some<FO>($0: FO): Option$<FO>;
export function Option$isSome<FO>(value: Option$<FO>): boolean;
export function Option$Some$0<FO>(value: Option$<FO>): FO;

export class None extends _.CustomType {}
export function Option$None<FO>(): Option$<FO>;
export function Option$isNone<FO>(value: Option$<FO>): boolean;

export type Option$<FO> = Some<FO> | None;

export function all<FP>(list: _.List<Option$<FP>>): Option$<_.List<FP>>;

export function is_some(option: Option$<any>): boolean;

export function is_none(option: Option$<any>): boolean;

export function to_result<GL, GO>(option: Option$<GL>, e: GO): _.Result<GL, GO>;

export function from_result<GR>(result: _.Result<GR, any>): Option$<GR>;

export function unwrap<GW>(option: Option$<GW>, default$: GW): GW;

export function lazy_unwrap<GY>(option: Option$<GY>, default$: () => GY): GY;

export function map<HA, HC>(option: Option$<HA>, fun: (x0: HA) => HC): Option$<
  HC
>;

export function flatten<HE>(option: Option$<Option$<HE>>): Option$<HE>;

export function then$<HI, HK>(option: Option$<HI>, fun: (x0: HI) => Option$<HK>): Option$<
  HK
>;

export function or<HN>(first: Option$<HN>, second: Option$<HN>): Option$<HN>;

export function lazy_or<HR>(first: Option$<HR>, second: () => Option$<HR>): Option$<
  HR
>;

export function values<HV>(options: _.List<Option$<HV>>): _.List<HV>;
