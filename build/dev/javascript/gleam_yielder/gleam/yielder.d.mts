import type * as $dict from "../../gleam_stdlib/gleam/dict.d.mts";
import type * as $list from "../../gleam_stdlib/gleam/list.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

declare class Stop extends _.CustomType {}

declare class Continue<IKC> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: IKC, argument$1: () => Action$<any>);
  /** @deprecated */
  0: IKC;
  /** @deprecated */
  1: () => Action$<any>;
}

type Action$<IKC> = Stop | Continue<IKC>;

declare class Yielder<IKD> extends _.CustomType {
  /** @deprecated */
  constructor(continuation: () => Action$<any>);
  /** @deprecated */
  continuation: () => Action$<any>;
}

export type Yielder$<IKD> = Yielder<IKD>;

export class Next<IKF, IKE> extends _.CustomType {
  /** @deprecated */
  constructor(element: IKE, accumulator: IKF);
  /** @deprecated */
  element: IKE;
  /** @deprecated */
  accumulator: IKF;
}
export function Step$Next<IKE, IKF>(
  element: IKE,
  accumulator: IKF,
): Step$<IKE, IKF>;
export function Step$isNext<IKE, IKF>(value: Step$<IKE, IKF>): boolean;
export function Step$Next$0<IKE, IKF>(value: Step$<IKE, IKF>): IKE;
export function Step$Next$element<IKF, IKE>(value: Step$<IKE, IKF>): IKE;
export function Step$Next$1<IKE, IKF>(value: Step$<IKE, IKF>): IKF;
export function Step$Next$accumulator<IKE, IKF>(value: Step$<IKE, IKF>): IKF;

export class Done extends _.CustomType {}
export function Step$Done<IKF, IKE>(): Step$<IKE, IKF>;
export function Step$isDone<IKF, IKE>(value: Step$<IKE, IKF>): boolean;

export type Step$<IKE, IKF> = Next<IKF, IKE> | Done;

declare class AnotherBy<IKG, IKH> extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: _.List<any>,
    argument$1: IKH,
    argument$2: IKG,
    argument$3: () => Action$<any>
  );
  /** @deprecated */
  0: _.List<any>;
  /** @deprecated */
  1: IKH;
  /** @deprecated */
  2: IKG;
  /** @deprecated */
  3: () => Action$<any>;
}

declare class LastBy<IKG> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.List<any>);
  /** @deprecated */
  0: _.List<any>;
}

type Chunk$<IKG, IKH> = AnotherBy<IKH, IKG> | LastBy<IKG>;

declare class Another<IKI> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.List<any>, argument$1: () => Action$<any>);
  /** @deprecated */
  0: _.List<any>;
  /** @deprecated */
  1: () => Action$<any>;
}

declare class Last<IKI> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.List<any>);
  /** @deprecated */
  0: _.List<any>;
}

declare class NoMore extends _.CustomType {}

type SizedChunk$<IKI> = Another<IKI> | Last<IKI> | NoMore;

export function unfold<IKL, IKM>(initial: IKL, f: (x0: IKL) => Step$<IKM, IKL>): Yielder$<
  IKM
>;

export function repeatedly<IKV>(f: () => IKV): Yielder$<IKV>;

export function repeat<IKX>(x: IKX): Yielder$<IKX>;

export function from_list<IKZ>(list: _.List<IKZ>): Yielder$<IKZ>;

export function transform<ILJ, ILL, ILM>(
  yielder: Yielder$<ILJ>,
  initial: ILL,
  f: (x0: ILL, x1: ILJ) => Step$<ILM, ILL>
): Yielder$<ILM>;

export function fold<ILQ, ILS>(
  yielder: Yielder$<ILQ>,
  initial: ILS,
  f: (x0: ILS, x1: ILQ) => ILS
): ILS;

export function run(yielder: Yielder$<any>): undefined;

export function to_list<ILY>(yielder: Yielder$<ILY>): _.List<ILY>;

export function step<IMB>(yielder: Yielder$<IMB>): Step$<IMB, Yielder$<IMB>>;

export function take<IMG>(yielder: Yielder$<IMG>, desired: number): Yielder$<
  IMG
>;

export function drop<IMM>(yielder: Yielder$<IMM>, desired: number): Yielder$<
  IMM
>;

export function map<IMS, IMU>(yielder: Yielder$<IMS>, f: (x0: IMS) => IMU): Yielder$<
  IMU
>;

export function map2<INA, INC, INE>(
  yielder1: Yielder$<INA>,
  yielder2: Yielder$<INC>,
  fun: (x0: INA, x1: INC) => INE
): Yielder$<INE>;

export function append<INM>(first: Yielder$<INM>, second: Yielder$<INM>): Yielder$<
  INM
>;

export function flatten<INU>(yielder: Yielder$<Yielder$<INU>>): Yielder$<INU>;

export function concat<IOC>(yielders: _.List<Yielder$<IOC>>): Yielder$<IOC>;

export function flat_map<IOG, IOI>(
  yielder: Yielder$<IOG>,
  f: (x0: IOG) => Yielder$<IOI>
): Yielder$<IOI>;

export function filter<IOL>(
  yielder: Yielder$<IOL>,
  predicate: (x0: IOL) => boolean
): Yielder$<IOL>;

export function filter_map<IOR, IOT>(
  yielder: Yielder$<IOR>,
  f: (x0: IOR) => _.Result<IOT, any>
): Yielder$<IOT>;

export function cycle<IPF>(yielder: Yielder$<IPF>): Yielder$<IPF>;

export function find<IPJ>(
  haystack: Yielder$<IPJ>,
  is_desired: (x0: IPJ) => boolean
): _.Result<IPJ, undefined>;

export function find_map<IPR, IPT>(
  haystack: Yielder$<IPR>,
  is_desired: (x0: IPR) => _.Result<IPT, any>
): _.Result<IPT, undefined>;

export function index<IQH>(yielder: Yielder$<IQH>): Yielder$<[IQH, number]>;

export function iterate<IQN>(initial: IQN, f: (x0: IQN) => IQN): Yielder$<IQN>;

export function take_while<IQP>(
  yielder: Yielder$<IQP>,
  predicate: (x0: IQP) => boolean
): Yielder$<IQP>;

export function drop_while<IQV>(
  yielder: Yielder$<IQV>,
  predicate: (x0: IQV) => boolean
): Yielder$<IQV>;

export function scan<IRB, IRD>(
  yielder: Yielder$<IRB>,
  initial: IRD,
  f: (x0: IRD, x1: IRB) => IRD
): Yielder$<IRD>;

export function zip<IRJ, IRL>(left: Yielder$<IRJ>, right: Yielder$<IRL>): Yielder$<
  [IRJ, IRL]
>;

export function chunk<IRT>(yielder: Yielder$<IRT>, f: (x0: IRT) => any): Yielder$<
  _.List<IRT>
>;

export function sized_chunk<ISJ>(yielder: Yielder$<ISJ>, count: number): Yielder$<
  _.List<ISJ>
>;

export function intersperse<ISV>(yielder: Yielder$<ISV>, elem: ISV): Yielder$<
  ISV
>;

export function any<ITB>(
  yielder: Yielder$<ITB>,
  predicate: (x0: ITB) => boolean
): boolean;

export function all<ITF>(
  yielder: Yielder$<ITF>,
  predicate: (x0: ITF) => boolean
): boolean;

export function group<ITJ, ITL>(yielder: Yielder$<ITJ>, key: (x0: ITJ) => ITL): $dict.Dict$<
  ITL,
  _.List<ITJ>
>;

export function reduce<IUB>(
  yielder: Yielder$<IUB>,
  f: (x0: IUB, x1: IUB) => IUB
): _.Result<IUB, undefined>;

export function last<IUF>(yielder: Yielder$<IUF>): _.Result<IUF, undefined>;

export function empty(): Yielder$<any>;

export function once<IUL>(f: () => IUL): Yielder$<IUL>;

export function range(start: number, stop: number): Yielder$<number>;

export function single<IUN>(elem: IUN): Yielder$<IUN>;

export function interleave<IUP>(left: Yielder$<IUP>, right: Yielder$<IUP>): Yielder$<
  IUP
>;

export function fold_until<IUX, IUZ>(
  yielder: Yielder$<IUX>,
  initial: IUZ,
  f: (x0: IUZ, x1: IUX) => $list.ContinueOrStop$<IUZ>
): IUZ;

export function try_fold<IVF, IVH, IVI>(
  yielder: Yielder$<IVF>,
  initial: IVH,
  f: (x0: IVH, x1: IVF) => _.Result<IVH, IVI>
): _.Result<IVH, IVI>;

export function first<IVV>(yielder: Yielder$<IVV>): _.Result<IVV, undefined>;

export function at<IVZ>(yielder: Yielder$<IVZ>, index: number): _.Result<
  IVZ,
  undefined
>;

export function length(yielder: Yielder$<any>): number;

export function each<IWH>(yielder: Yielder$<IWH>, f: (x0: IWH) => any): undefined;

export function yield$<IWK>(element: IWK, next: () => Yielder$<IWK>): Yielder$<
  IWK
>;

export function prepend<IWN>(yielder: Yielder$<IWN>, element: IWN): Yielder$<
  IWN
>;
