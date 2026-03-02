import type * as _ from "../gleam.d.mts";
import type * as $option from "../gleam/option.d.mts";

export type Dict$<KP, KO> = any;

type TransientDict$<KR, KQ> = any;

export function size(dict: Dict$<any, any>): number;

export function is_empty(dict: Dict$<any, any>): boolean;

export function has_key<MD>(dict: Dict$<MD, any>, key: MD): boolean;

export function new$(): Dict$<any, any>;

export function get<MP, MQ>(from: Dict$<MP, MQ>, get: MP): _.Result<
  MQ,
  undefined
>;

export function insert<MV, MW>(dict: Dict$<MV, MW>, key: MV, value: MW): Dict$<
  MV,
  MW
>;

export function from_list<LR, LS>(list: _.List<[LR, LS]>): Dict$<LR, LS>;

export function map_values<NN, NO, NR>(
  dict: Dict$<NN, NO>,
  fun: (x0: NN, x1: NO) => NR
): Dict$<NN, NR>;

export function take<OX, OY>(dict: Dict$<OX, OY>, desired_keys: _.List<OX>): Dict$<
  OX,
  OY
>;

export function delete$<QC, QD>(dict: Dict$<QC, QD>, key: QC): Dict$<QC, QD>;

export function drop<QO, QP>(dict: Dict$<QO, QP>, disallowed_keys: _.List<QO>): Dict$<
  QO,
  QP
>;

export function upsert<RJ, RK>(
  dict: Dict$<RJ, RK>,
  key: RJ,
  fun: (x0: $option.Option$<RK>) => RK
): Dict$<RJ, RK>;

export function fold<RQ, RR, RU>(
  dict: Dict$<RQ, RR>,
  initial: RU,
  fun: (x0: RU, x1: RQ, x2: RR) => RU
): RU;

export function to_list<LM, LN>(dict: Dict$<LM, LN>): _.List<[LM, LN]>;

export function keys<OB>(dict: Dict$<OB, any>): _.List<OB>;

export function values<OH>(dict: Dict$<any, OH>): _.List<OH>;

export function filter<OL, OM>(
  dict: Dict$<OL, OM>,
  predicate: (x0: OL, x1: OM) => boolean
): Dict$<OL, OM>;

export function each<SA, SB>(dict: Dict$<SA, SB>, fun: (x0: SA, x1: SB) => any): undefined;

export function combine<SF, SG>(
  dict: Dict$<SF, SG>,
  other: Dict$<SF, SG>,
  fun: (x0: SG, x1: SG) => SG
): Dict$<SF, SG>;

export function merge<PU, PV>(dict: Dict$<PU, PV>, new_entries: Dict$<PU, PV>): Dict$<
  PU,
  PV
>;

export function group<TB, TC>(key: (x0: TB) => TC, list: _.List<TB>): Dict$<
  TC,
  _.List<TB>
>;
