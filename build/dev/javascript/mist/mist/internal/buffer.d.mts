import type * as _ from "../../gleam.d.mts";

export class Buffer extends _.CustomType {
  /** @deprecated */
  constructor(remaining: number, data: _.BitArray);
  /** @deprecated */
  remaining: number;
  /** @deprecated */
  data: _.BitArray;
}
export function Buffer$Buffer(remaining: number, data: _.BitArray): Buffer$;
export function Buffer$isBuffer(value: Buffer$): boolean;
export function Buffer$Buffer$0(value: Buffer$): number;
export function Buffer$Buffer$remaining(value: Buffer$): number;
export function Buffer$Buffer$1(value: Buffer$): _.BitArray;
export function Buffer$Buffer$data(value: Buffer$): _.BitArray;

export type Buffer$ = Buffer;

export function empty(): Buffer$;

export function new$(data: _.BitArray): Buffer$;

export function append(buffer: Buffer$, data: _.BitArray): Buffer$;

export function slice(buffer: Buffer$, bits: number): [_.BitArray, _.BitArray];

export function with_capacity(buffer: Buffer$, size: number): Buffer$;

export function size(remaining: number): Buffer$;
