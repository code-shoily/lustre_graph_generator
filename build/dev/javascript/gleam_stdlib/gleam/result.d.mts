import type * as _ from "../gleam.d.mts";

export function is_ok(result: _.Result<any, any>): boolean;

export function is_error(result: _.Result<any, any>): boolean;

export function map<COE, COF, COI>(
  result: _.Result<COE, COF>,
  fun: (x0: COE) => COI
): _.Result<COI, COF>;

export function map_error<COL, COM, COP>(
  result: _.Result<COL, COM>,
  fun: (x0: COM) => COP
): _.Result<COL, COP>;

export function flatten<COS, COT>(result: _.Result<_.Result<COS, COT>, COT>): _.Result<
  COS,
  COT
>;

export function try$<CPA, CPB, CPE>(
  result: _.Result<CPA, CPB>,
  fun: (x0: CPA) => _.Result<CPE, CPB>
): _.Result<CPE, CPB>;

export function unwrap<CPJ>(result: _.Result<CPJ, any>, default$: CPJ): CPJ;

export function lazy_unwrap<CPN>(
  result: _.Result<CPN, any>,
  default$: () => CPN
): CPN;

export function unwrap_error<CPS>(result: _.Result<any, CPS>, default$: CPS): CPS;

export function or<CPV, CPW>(
  first: _.Result<CPV, CPW>,
  second: _.Result<CPV, CPW>
): _.Result<CPV, CPW>;

export function lazy_or<CQD, CQE>(
  first: _.Result<CQD, CQE>,
  second: () => _.Result<CQD, CQE>
): _.Result<CQD, CQE>;

export function all<CQL, CQM>(results: _.List<_.Result<CQL, CQM>>): _.Result<
  _.List<CQL>,
  CQM
>;

export function partition<CQT, CQU>(results: _.List<_.Result<CQT, CQU>>): [
  _.List<CQT>,
  _.List<CQU>
];

export function replace<CRJ, CRM>(result: _.Result<any, CRJ>, value: CRM): _.Result<
  CRM,
  CRJ
>;

export function replace_error<CRP, CRT>(result: _.Result<CRP, any>, error: CRT): _.Result<
  CRP,
  CRT
>;

export function values<CRW>(results: _.List<_.Result<CRW, any>>): _.List<CRW>;

export function try_recover<CSC, CSD, CSG>(
  result: _.Result<CSC, CSD>,
  fun: (x0: CSD) => _.Result<CSC, CSG>
): _.Result<CSC, CSG>;
