import type * as _ from "../gleam.d.mts";
import type * as $dict from "../gleam/dict.d.mts";
import type * as $order from "../gleam/order.d.mts";

export class Continue<ABH> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ABH);
  /** @deprecated */
  0: ABH;
}
export function ContinueOrStop$Continue<ABH>($0: ABH): ContinueOrStop$<ABH>;
export function ContinueOrStop$isContinue<ABH>(
  value: ContinueOrStop$<ABH>,
): boolean;
export function ContinueOrStop$Continue$0<ABH>(value: ContinueOrStop$<ABH>): ABH;

export class Stop<ABH> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ABH);
  /** @deprecated */
  0: ABH;
}
export function ContinueOrStop$Stop<ABH>($0: ABH): ContinueOrStop$<ABH>;
export function ContinueOrStop$isStop<ABH>(
  value: ContinueOrStop$<ABH>,
): boolean;
export function ContinueOrStop$Stop$0<ABH>(value: ContinueOrStop$<ABH>): ABH;

export type ContinueOrStop$<ABH> = Continue<ABH> | Stop<ABH>;

declare class Ascending extends _.CustomType {}

declare class Descending extends _.CustomType {}

type Sorting$ = Ascending | Descending;

export function length(list: _.List<any>): number;

export function count<ABM>(list: _.List<ABM>, predicate: (x0: ABM) => boolean): number;

export function reverse<ABQ>(list: _.List<ABQ>): _.List<ABQ>;

export function is_empty(list: _.List<any>): boolean;

export function contains<ABZ>(list: _.List<ABZ>, elem: ABZ): boolean;

export function first<ACB>(list: _.List<ACB>): _.Result<ACB, undefined>;

export function rest<ACF>(list: _.List<ACF>): _.Result<_.List<ACF>, undefined>;

export function group<ACK, ACM>(list: _.List<ACK>, key: (x0: ACK) => ACM): $dict.Dict$<
  ACM,
  _.List<ACK>
>;

export function filter<ACQ>(list: _.List<ACQ>, predicate: (x0: ACQ) => boolean): _.List<
  ACQ
>;

export function filter_map<ACX, ACZ>(
  list: _.List<ACX>,
  fun: (x0: ACX) => _.Result<ACZ, any>
): _.List<ACZ>;

export function map<ADM, ADO>(list: _.List<ADM>, fun: (x0: ADM) => ADO): _.List<
  ADO
>;

export function map2<ADV, ADX, ADZ>(
  list1: _.List<ADV>,
  list2: _.List<ADX>,
  fun: (x0: ADV, x1: ADX) => ADZ
): _.List<ADZ>;

export function map_fold<AEI, AEK, AEL>(
  list: _.List<AEI>,
  initial: AEK,
  fun: (x0: AEK, x1: AEI) => [AEK, AEL]
): [AEK, _.List<AEL>];

export function index_map<AET, AEV>(
  list: _.List<AET>,
  fun: (x0: AET, x1: number) => AEV
): _.List<AEV>;

export function try_map<AFC, AFE, AFF>(
  list: _.List<AFC>,
  fun: (x0: AFC) => _.Result<AFE, AFF>
): _.Result<_.List<AFE>, AFF>;

export function drop<AFV>(list: _.List<AFV>, n: number): _.List<AFV>;

export function take<AFY>(list: _.List<AFY>, n: number): _.List<AFY>;

export function new$(): _.List<any>;

export function wrap<AGH>(item: AGH): _.List<AGH>;

export function append<AGJ>(first: _.List<AGJ>, second: _.List<AGJ>): _.List<
  AGJ
>;

export function prepend<AGR>(list: _.List<AGR>, item: AGR): _.List<AGR>;

export function flatten<AGU>(lists: _.List<_.List<AGU>>): _.List<AGU>;

export function flat_map<AHD, AHF>(
  list: _.List<AHD>,
  fun: (x0: AHD) => _.List<AHF>
): _.List<AHF>;

export function fold<AHI, AHK>(
  list: _.List<AHI>,
  initial: AHK,
  fun: (x0: AHK, x1: AHI) => AHK
): AHK;

export function fold_right<AHL, AHN>(
  list: _.List<AHL>,
  initial: AHN,
  fun: (x0: AHN, x1: AHL) => AHN
): AHN;

export function index_fold<AHO, AHQ>(
  list: _.List<AHO>,
  initial: AHQ,
  fun: (x0: AHQ, x1: AHO, x2: number) => AHQ
): AHQ;

export function try_fold<AHU, AHW, AHX>(
  list: _.List<AHU>,
  initial: AHW,
  fun: (x0: AHW, x1: AHU) => _.Result<AHW, AHX>
): _.Result<AHW, AHX>;

export function fold_until<AIC, AIE>(
  list: _.List<AIC>,
  initial: AIE,
  fun: (x0: AIE, x1: AIC) => ContinueOrStop$<AIE>
): AIE;

export function find<AIG>(list: _.List<AIG>, is_desired: (x0: AIG) => boolean): _.Result<
  AIG,
  undefined
>;

export function find_map<AIK, AIM>(
  list: _.List<AIK>,
  fun: (x0: AIK) => _.Result<AIM, any>
): _.Result<AIM, undefined>;

export function all<AIS>(list: _.List<AIS>, predicate: (x0: AIS) => boolean): boolean;

export function any<AIU>(list: _.List<AIU>, predicate: (x0: AIU) => boolean): boolean;

export function zip<AIW, AIY>(list: _.List<AIW>, other: _.List<AIY>): _.List<
  [AIW, AIY]
>;

export function strict_zip<AJH, AJJ>(list: _.List<AJH>, other: _.List<AJJ>): _.Result<
  _.List<[AJH, AJJ]>,
  undefined
>;

export function unzip<AJW, AJX>(input: _.List<[AJW, AJX]>): [
  _.List<AJW>,
  _.List<AJX>
];

export function intersperse<AKI>(list: _.List<AKI>, elem: AKI): _.List<AKI>;

export function unique<AKP>(list: _.List<AKP>): _.List<AKP>;

export function sort<AKY>(
  list: _.List<AKY>,
  compare: (x0: AKY, x1: AKY) => $order.Order$
): _.List<AKY>;

export function range(start: number, stop: number): _.List<number>;

export function repeat<AML>(a: AML, times: number): _.List<AML>;

export function split<AMQ>(list: _.List<AMQ>, index: number): [
  _.List<AMQ>,
  _.List<AMQ>
];

export function split_while<AMZ>(
  list: _.List<AMZ>,
  predicate: (x0: AMZ) => boolean
): [_.List<AMZ>, _.List<AMZ>];

export function key_find<ANI, ANJ>(
  keyword_list: _.List<[ANI, ANJ]>,
  desired_key: ANI
): _.Result<ANJ, undefined>;

export function key_filter<ANN, ANO>(
  keyword_list: _.List<[ANN, ANO]>,
  desired_key: ANN
): _.List<ANO>;

export function key_pop<ANR, ANS>(list: _.List<[ANR, ANS]>, key: ANR): _.Result<
  [ANS, _.List<[ANR, ANS]>],
  undefined
>;

export function key_set<AOE, AOF>(
  list: _.List<[AOE, AOF]>,
  key: AOE,
  value: AOF
): _.List<[AOE, AOF]>;

export function each<AON>(list: _.List<AON>, f: (x0: AON) => any): undefined;

export function try_each<AOQ, AOT>(
  list: _.List<AOQ>,
  fun: (x0: AOQ) => _.Result<any, AOT>
): _.Result<undefined, AOT>;

export function partition<AOY>(
  list: _.List<AOY>,
  categorise: (x0: AOY) => boolean
): [_.List<AOY>, _.List<AOY>];

export function window<AQB>(list: _.List<AQB>, n: number): _.List<_.List<AQB>>;

export function window_by_2<AQL>(list: _.List<AQL>): _.List<[AQL, AQL]>;

export function drop_while<AQO>(
  list: _.List<AQO>,
  predicate: (x0: AQO) => boolean
): _.List<AQO>;

export function take_while<AQR>(
  list: _.List<AQR>,
  predicate: (x0: AQR) => boolean
): _.List<AQR>;

export function chunk<AQY>(list: _.List<AQY>, f: (x0: AQY) => any): _.List<
  _.List<AQY>
>;

export function sized_chunk<ARL>(list: _.List<ARL>, count: number): _.List<
  _.List<ARL>
>;

export function reduce<ARW>(list: _.List<ARW>, fun: (x0: ARW, x1: ARW) => ARW): _.Result<
  ARW,
  undefined
>;

export function scan<ASA, ASC>(
  list: _.List<ASA>,
  initial: ASC,
  fun: (x0: ASC, x1: ASA) => ASC
): _.List<ASC>;

export function last<ASJ>(list: _.List<ASJ>): _.Result<ASJ, undefined>;

export function combinations<ASN>(items: _.List<ASN>, n: number): _.List<
  _.List<ASN>
>;

export function combination_pairs<ASR>(items: _.List<ASR>): _.List<[ASR, ASR]>;

export function transpose<ATC>(list_of_lists: _.List<_.List<ATC>>): _.List<
  _.List<ATC>
>;

export function interleave<ASY>(list: _.List<_.List<ASY>>): _.List<ASY>;

export function shuffle<ATX>(list: _.List<ATX>): _.List<ATX>;

export function max<AUH>(
  list: _.List<AUH>,
  compare: (x0: AUH, x1: AUH) => $order.Order$
): _.Result<AUH, undefined>;

export function sample<AUP>(list: _.List<AUP>, n: number): _.List<AUP>;

export function permutations<APH>(list: _.List<APH>): _.List<_.List<APH>>;
