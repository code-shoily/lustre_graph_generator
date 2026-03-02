import type * as _ from "./gleam.d.mts";

export class Emergency extends _.CustomType {}
export function LogLevel$Emergency(): LogLevel$;
export function LogLevel$isEmergency(value: LogLevel$): boolean;

export class Alert extends _.CustomType {}
export function LogLevel$Alert(): LogLevel$;
export function LogLevel$isAlert(value: LogLevel$): boolean;

export class Critical extends _.CustomType {}
export function LogLevel$Critical(): LogLevel$;
export function LogLevel$isCritical(value: LogLevel$): boolean;

export class Error extends _.CustomType {}
export function LogLevel$Error(): LogLevel$;
export function LogLevel$isError(value: LogLevel$): boolean;

export class Warning extends _.CustomType {}
export function LogLevel$Warning(): LogLevel$;
export function LogLevel$isWarning(value: LogLevel$): boolean;

export class Notice extends _.CustomType {}
export function LogLevel$Notice(): LogLevel$;
export function LogLevel$isNotice(value: LogLevel$): boolean;

export class Info extends _.CustomType {}
export function LogLevel$Info(): LogLevel$;
export function LogLevel$isInfo(value: LogLevel$): boolean;

export class Debug extends _.CustomType {}
export function LogLevel$Debug(): LogLevel$;
export function LogLevel$isDebug(value: LogLevel$): boolean;

export type LogLevel$ = Emergency | Alert | Critical | Error | Warning | Notice | Info | Debug;

type DoNotLeak$ = any;

declare class Level extends _.CustomType {}

type Key$ = Level;

export function configure(): undefined;

export function log(level: LogLevel$, message: string): undefined;

export function set_level(level: LogLevel$): undefined;
