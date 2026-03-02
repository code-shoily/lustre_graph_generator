import type * as $snag from "../../snag/snag.d.mts";
import type * as _ from "../gleam.d.mts";

export type Constraint = (x0: any) => _.Result<any, $snag.Snag$>;

export function one_of<MHY>(allowed: _.List<MHY>): (x0: MHY) => _.Result<
  MHY,
  $snag.Snag$
>;

export function none_of<MIB>(disallowed: _.List<MIB>): (x0: MIB) => _.Result<
  MIB,
  $snag.Snag$
>;

export function each<MIE>(constraint: (x0: MIE) => _.Result<MIE, $snag.Snag$>): (
  x0: _.List<MIE>
) => _.Result<_.List<MIE>, $snag.Snag$>;
