import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";

export function equal<MDF>(a: MDF, b: MDF): undefined;

export function not_equal<MDG>(a: MDG, b: MDG): undefined;

export function be_ok<MDH>(a: _.Result<MDH, any>): MDH;

export function be_error<MDM>(a: _.Result<any, MDM>): MDM;

export function be_some<MDP>(a: $option.Option$<MDP>): MDP;

export function be_none(a: $option.Option$<any>): undefined;

export function be_true(actual: boolean): undefined;

export function be_false(actual: boolean): undefined;

export function fail(): undefined;
