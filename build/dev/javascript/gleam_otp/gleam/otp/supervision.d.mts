import type * as _ from "../../gleam.d.mts";
import type * as $actor from "../../gleam/otp/actor.d.mts";

export class Permanent extends _.CustomType {}
export function Restart$Permanent(): Restart$;
export function Restart$isPermanent(value: Restart$): boolean;

export class Transient extends _.CustomType {}
export function Restart$Transient(): Restart$;
export function Restart$isTransient(value: Restart$): boolean;

export class Temporary extends _.CustomType {}
export function Restart$Temporary(): Restart$;
export function Restart$isTemporary(value: Restart$): boolean;

export type Restart$ = Permanent | Transient | Temporary;

export class Worker extends _.CustomType {
  /** @deprecated */
  constructor(shutdown_ms: number);
  /** @deprecated */
  shutdown_ms: number;
}
export function ChildType$Worker(shutdown_ms: number): ChildType$;
export function ChildType$isWorker(value: ChildType$): boolean;
export function ChildType$Worker$0(value: ChildType$): number;
export function ChildType$Worker$shutdown_ms(value: ChildType$): number;

export class Supervisor extends _.CustomType {}
export function ChildType$Supervisor(): ChildType$;
export function ChildType$isSupervisor(value: ChildType$): boolean;

export type ChildType$ = Worker | Supervisor;

export class ChildSpecification<HGB> extends _.CustomType {
  /** @deprecated */
  constructor(
    start: () => _.Result<$actor.Started$<any>, $actor.StartError$>,
    restart: Restart$,
    significant: boolean,
    child_type: ChildType$
  );
  /** @deprecated */
  start: () => _.Result<$actor.Started$<any>, $actor.StartError$>;
  /** @deprecated */
  restart: Restart$;
  /** @deprecated */
  significant: boolean;
  /** @deprecated */
  child_type: ChildType$;
}
export function ChildSpecification$ChildSpecification<HGB>(
  start: () => _.Result<$actor.Started$<any>, $actor.StartError$>,
  restart: Restart$,
  significant: boolean,
  child_type: ChildType$,
): ChildSpecification$<HGB>;
export function ChildSpecification$isChildSpecification<HGB>(
  value: ChildSpecification$<HGB>,
): boolean;
export function ChildSpecification$ChildSpecification$0<HGB>(value: ChildSpecification$<
    HGB
  >): () => _.Result<$actor.Started$<any>, $actor.StartError$>;
export function ChildSpecification$ChildSpecification$start<HGB>(value: ChildSpecification$<
    HGB
  >): () => _.Result<$actor.Started$<any>, $actor.StartError$>;
export function ChildSpecification$ChildSpecification$1<HGB>(value: ChildSpecification$<
    HGB
  >): Restart$;
export function ChildSpecification$ChildSpecification$restart<HGB>(value: ChildSpecification$<
    HGB
  >): Restart$;
export function ChildSpecification$ChildSpecification$2<HGB>(value: ChildSpecification$<
    HGB
  >): boolean;
export function ChildSpecification$ChildSpecification$significant<HGB>(value: ChildSpecification$<
    HGB
  >): boolean;
export function ChildSpecification$ChildSpecification$3<HGB>(value: ChildSpecification$<
    HGB
  >): ChildType$;
export function ChildSpecification$ChildSpecification$child_type<HGB>(value: ChildSpecification$<
    HGB
  >): ChildType$;

export type ChildSpecification$<HGB> = ChildSpecification<HGB>;

export function worker<HGC>(
  start: () => _.Result<$actor.Started$<HGC>, $actor.StartError$>
): ChildSpecification$<HGC>;

export function supervisor<HGH>(
  start: () => _.Result<$actor.Started$<HGH>, $actor.StartError$>
): ChildSpecification$<HGH>;

export function significant<HGM>(
  child: ChildSpecification$<HGM>,
  significant: boolean
): ChildSpecification$<HGM>;

export function timeout<HGP>(child: ChildSpecification$<HGP>, ms: number): ChildSpecification$<
  HGP
>;

export function restart<HGS>(child: ChildSpecification$<HGS>, restart: Restart$): ChildSpecification$<
  HGS
>;

export function map_data<HGV, HGX>(
  child: ChildSpecification$<HGV>,
  transform: (x0: HGV) => HGX
): ChildSpecification$<HGX>;
