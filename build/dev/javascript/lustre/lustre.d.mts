import type * as $process from "../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../gleam_otp/gleam/otp/actor.d.mts";
import type * as $factory_supervisor from "../gleam_otp/gleam/otp/factory_supervisor.d.mts";
import type * as $supervision from "../gleam_otp/gleam/otp/supervision.d.mts";
import type * as _ from "./gleam.d.mts";
import type * as $effect from "./lustre/effect.d.mts";
import type * as $app from "./lustre/runtime/app.d.mts";
import type * as $runtime from "./lustre/runtime/server/runtime.d.mts";
import type * as $vnode from "./lustre/vdom/vnode.d.mts";

export class ActorError extends _.CustomType {
  /** @deprecated */
  constructor(reason: $actor.StartError$);
  /** @deprecated */
  reason: $actor.StartError$;
}
export function Error$ActorError(reason: $actor.StartError$): Error$;
export function Error$isActorError(value: Error$): boolean;
export function Error$ActorError$0(value: Error$): $actor.StartError$;
export function Error$ActorError$reason(value: Error$): $actor.StartError$;

export class BadComponentName extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}
export function Error$BadComponentName(name: string): Error$;
export function Error$isBadComponentName(value: Error$): boolean;
export function Error$BadComponentName$0(value: Error$): string;
export function Error$BadComponentName$name(value: Error$): string;

export class ComponentAlreadyRegistered extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}
export function Error$ComponentAlreadyRegistered(name: string): Error$;
export function Error$isComponentAlreadyRegistered(value: Error$): boolean;
export function Error$ComponentAlreadyRegistered$0(value: Error$): string;
export function Error$ComponentAlreadyRegistered$name(value: Error$): string;

export class ElementNotFound extends _.CustomType {
  /** @deprecated */
  constructor(selector: string);
  /** @deprecated */
  selector: string;
}
export function Error$ElementNotFound(selector: string): Error$;
export function Error$isElementNotFound(value: Error$): boolean;
export function Error$ElementNotFound$0(value: Error$): string;
export function Error$ElementNotFound$selector(value: Error$): string;

export class NotABrowser extends _.CustomType {}
export function Error$NotABrowser(): Error$;
export function Error$isNotABrowser(value: Error$): boolean;

export type Error$ = ActorError | BadComponentName | ComponentAlreadyRegistered | ElementNotFound | NotABrowser;

export type Runtime$<VNB> = any;

export type App = $app.App$<any, any, any>;

export type RuntimeMessage = $runtime.Message$<any>;

export function application<VNX, VNY, VNZ>(
  init: (x0: VNX) => [VNY, $effect.Effect$<VNZ>],
  update: (x0: VNY, x1: VNZ) => [VNY, $effect.Effect$<VNZ>],
  view: (x0: VNY) => $vnode.Element$<VNZ>
): $app.App$<VNX, VNY, VNZ>;

export function element<VNK>(view: $vnode.Element$<VNK>): $app.App$<
  any,
  undefined,
  VNK
>;

export function simple<VNQ, VNR, VNS>(
  init: (x0: VNQ) => VNR,
  update: (x0: VNR, x1: VNS) => VNR,
  view: (x0: VNR) => $vnode.Element$<VNS>
): $app.App$<VNQ, VNR, VNS>;

export function component<VOG, VOH, VOI>(
  init: (x0: VOG) => [VOH, $effect.Effect$<VOI>],
  update: (x0: VOH, x1: VOI) => [VOH, $effect.Effect$<VOI>],
  view: (x0: VOH) => $vnode.Element$<VOI>,
  options: _.List<$app.Option$<VOI>>
): $app.App$<VOG, VOH, VOI>;

export function named<VOR, VOS, VOT>(
  app: $app.App$<VOR, VOS, VOT>,
  name: $process.Name$<$runtime.Message$<VOT>>
): $app.App$<VOR, VOS, VOT>;

export function supervised<VQD, VQF>(
  app: $app.App$<VQD, any, VQF>,
  arguments$: VQD
): $supervision.ChildSpecification$<$process.Subject$<$runtime.Message$<VQF>>>;

export function factory<VQM, VQO>(app: $app.App$<VQM, any, VQO>): $factory_supervisor.Builder$<
  VQM,
  $process.Subject$<$runtime.Message$<VQO>>
>;

export function register(x0: $app.App$<undefined, any, any>, x1: string): _.Result<
  undefined,
  Error$
>;

export function send<VRD>(
  runtime: Runtime$<VRD>,
  message: $runtime.Message$<VRD>
): undefined;

export function dispatch<VRG>(message: VRG): $runtime.Message$<VRG>;

export function shutdown(): $runtime.Message$<any>;

export function is_browser(): boolean;

export function start<VPC, VPE>(
  app: $app.App$<VPC, any, VPE>,
  selector: string,
  arguments$: VPC
): _.Result<Runtime$<VPE>, Error$>;

export function is_registered(x0: string): boolean;

export function start_server_component<VPU, VPW>(
  app: $app.App$<VPU, any, VPW>,
  arguments$: VPU
): _.Result<Runtime$<VPW>, Error$>;
