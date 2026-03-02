import type * as $process from "../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../gleam_otp/gleam/otp/actor.d.mts";
import type * as $supervision from "../gleam_otp/gleam/otp/supervision.d.mts";
import type * as $dynamic from "../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "./gleam.d.mts";

export type GroupRegistry$<QKE> = any;

export type Message$<QKF> = any;

type DoNotLeak$ = any;

export function get_registry<QKQ>(name: $process.Name$<Message$<QKQ>>): GroupRegistry$<
  QKQ
>;

export function start<QKG>(name: $process.Name$<Message$<QKG>>): _.Result<
  $actor.Started$<GroupRegistry$<QKG>>,
  $actor.StartError$
>;

export function supervised<QKL>(name: $process.Name$<Message$<QKL>>): $supervision.ChildSpecification$<
  GroupRegistry$<QKL>
>;

export function leave(
  registry: GroupRegistry$<any>,
  group: string,
  members: _.List<$process.Pid$>
): undefined;

export function join<QKU>(
  registry: GroupRegistry$<QKU>,
  group: string,
  new_member: $process.Pid$
): $process.Subject$<QKU>;

export function members<QLA>(registry: GroupRegistry$<QLA>, group: string): _.List<
  $process.Subject$<QLA>
>;
