import type * as $json from "../../../gleam_json/gleam/json.d.mts";
import type * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.d.mts";
import type * as $order from "../../../gleam_stdlib/gleam/order.d.mts";
import type * as $string_tree from "../../../gleam_stdlib/gleam/string_tree.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Attribute extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, name: string, value: string);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  name: string;
  /** @deprecated */
  value: string;
}
export function Attribute$Attribute<QPV>(
  kind: number,
  name: string,
  value: string,
): Attribute$<QPV>;
export function Attribute$isAttribute<QPV>(value: Attribute$<QPV>): boolean;
export function Attribute$Attribute$0<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Attribute$kind<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Attribute$1<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Attribute$name<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Attribute$2<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Attribute$value<QPV>(value: Attribute$<QPV>): string;

export class Property extends _.CustomType {
  /** @deprecated */
  constructor(kind: number, name: string, value: $json.Json$);
  /** @deprecated */
  kind: number;
  /** @deprecated */
  name: string;
  /** @deprecated */
  value: $json.Json$;
}
export function Attribute$Property<QPV>(
  kind: number,
  name: string,
  value: $json.Json$,
): Attribute$<QPV>;
export function Attribute$isProperty<QPV>(value: Attribute$<QPV>): boolean;
export function Attribute$Property$0<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Property$kind<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Property$1<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Property$name<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Property$2<QPV>(value: Attribute$<QPV>): $json.Json$;
export function Attribute$Property$value<QPV>(value: Attribute$<QPV>): $json.Json$;

export class Event<QPV> extends _.CustomType {
  /** @deprecated */
  constructor(
    kind: number,
    name: string,
    handler: $decode.Decoder$<Handler$<any>>,
    include: _.List<string>,
    prevent_default: EventBehaviour$,
    stop_propagation: EventBehaviour$,
    debounce: number,
    throttle: number
  );
  /** @deprecated */
  kind: number;
  /** @deprecated */
  name: string;
  /** @deprecated */
  handler: $decode.Decoder$<Handler$<any>>;
  /** @deprecated */
  include: _.List<string>;
  /** @deprecated */
  prevent_default: EventBehaviour$;
  /** @deprecated */
  stop_propagation: EventBehaviour$;
  /** @deprecated */
  debounce: number;
  /** @deprecated */
  throttle: number;
}
export function Attribute$Event<QPV>(
  kind: number,
  name: string,
  handler: $decode.Decoder$<Handler$<any>>,
  include: _.List<string>,
  prevent_default: EventBehaviour$,
  stop_propagation: EventBehaviour$,
  debounce: number,
  throttle: number,
): Attribute$<QPV>;
export function Attribute$isEvent<QPV>(value: Attribute$<QPV>): boolean;
export function Attribute$Event$0<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Event$kind<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Event$1<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Event$name<QPV>(value: Attribute$<QPV>): string;
export function Attribute$Event$2<QPV>(value: Attribute$<QPV>): $decode.Decoder$<
  Handler$<any>
>;
export function Attribute$Event$handler<QPV>(value: Attribute$<QPV>): $decode.Decoder$<
  Handler$<any>
>;
export function Attribute$Event$3<QPV>(value: Attribute$<QPV>): _.List<string>;
export function Attribute$Event$include<QPV>(value: Attribute$<QPV>): _.List<
  string
>;
export function Attribute$Event$4<QPV>(value: Attribute$<QPV>): EventBehaviour$;
export function Attribute$Event$prevent_default<QPV>(value: Attribute$<QPV>): EventBehaviour$;
export function Attribute$Event$5<QPV>(
  value: Attribute$<QPV>,
): EventBehaviour$;
export function Attribute$Event$stop_propagation<QPV>(value: Attribute$<QPV>): EventBehaviour$;
export function Attribute$Event$6<QPV>(
  value: Attribute$<QPV>,
): number;
export function Attribute$Event$debounce<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Event$7<QPV>(value: Attribute$<QPV>): number;
export function Attribute$Event$throttle<QPV>(value: Attribute$<QPV>): number;

export type Attribute$<QPV> = Attribute | Property | Event<QPV>;

export function Attribute$kind<QPV>(value: Attribute$<QPV>): number;
export function Attribute$name<QPV>(value: Attribute$<QPV>): string;

export class Handler<QPW> extends _.CustomType {
  /** @deprecated */
  constructor(prevent_default: boolean, stop_propagation: boolean, message: QPW);
  /** @deprecated */
  prevent_default: boolean;
  /** @deprecated */
  stop_propagation: boolean;
  /** @deprecated */
  message: QPW;
}
export function Handler$Handler<QPW>(
  prevent_default: boolean,
  stop_propagation: boolean,
  message: QPW,
): Handler$<QPW>;
export function Handler$isHandler<QPW>(value: Handler$<QPW>): boolean;
export function Handler$Handler$0<QPW>(value: Handler$<QPW>): boolean;
export function Handler$Handler$prevent_default<QPW>(value: Handler$<QPW>): boolean;
export function Handler$Handler$1<QPW>(
  value: Handler$<QPW>,
): boolean;
export function Handler$Handler$stop_propagation<QPW>(value: Handler$<QPW>): boolean;
export function Handler$Handler$2<QPW>(
  value: Handler$<QPW>,
): QPW;
export function Handler$Handler$message<QPW>(value: Handler$<QPW>): QPW;

export type Handler$<QPW> = Handler<QPW>;

export class Never extends _.CustomType {
  /** @deprecated */
  constructor(kind: number);
  /** @deprecated */
  kind: number;
}
export function EventBehaviour$Never(kind: number): EventBehaviour$;
export function EventBehaviour$isNever(value: EventBehaviour$): boolean;
export function EventBehaviour$Never$0(value: EventBehaviour$): number;
export function EventBehaviour$Never$kind(value: EventBehaviour$): number;

export class Possible extends _.CustomType {
  /** @deprecated */
  constructor(kind: number);
  /** @deprecated */
  kind: number;
}
export function EventBehaviour$Possible(kind: number): EventBehaviour$;
export function EventBehaviour$isPossible(value: EventBehaviour$): boolean;
export function EventBehaviour$Possible$0(value: EventBehaviour$): number;
export function EventBehaviour$Possible$kind(value: EventBehaviour$): number;

export class Always extends _.CustomType {
  /** @deprecated */
  constructor(kind: number);
  /** @deprecated */
  kind: number;
}
export function EventBehaviour$Always(kind: number): EventBehaviour$;
export function EventBehaviour$isAlways(value: EventBehaviour$): boolean;
export function EventBehaviour$Always$0(value: EventBehaviour$): number;
export function EventBehaviour$Always$kind(value: EventBehaviour$): number;

export type EventBehaviour$ = Never | Possible | Always;

export function EventBehaviour$kind(value: EventBehaviour$): number;

export const attribute_kind: number;

export const property_kind: number;

export const event_kind: number;

export const never_kind: number;

export const never: EventBehaviour$;

export const possible_kind: number;

export const possible: EventBehaviour$;

export const always_kind: number;

export const always: EventBehaviour$;

export function merge<QQL>(
  attributes: _.List<Attribute$<QQL>>,
  merged: _.List<Attribute$<QQL>>
): _.List<Attribute$<QQL>>;

export function compare<QQS>(a: Attribute$<QQS>, b: Attribute$<QQS>): $order.Order$;

export function prepare<QQG>(attributes: _.List<Attribute$<QQG>>): _.List<
  Attribute$<QQG>
>;

export function attribute(name: string, value: string): Attribute$<any>;

export function to_string_tree(
  key: string,
  namespace: string,
  parent_namespace: string,
  attributes: _.List<Attribute$<any>>
): $string_tree.StringTree$;

export function property(name: string, value: $json.Json$): Attribute$<any>;

export function event<QQB>(
  name: string,
  handler: $decode.Decoder$<Handler$<QQB>>,
  include: _.List<string>,
  prevent_default: EventBehaviour$,
  stop_propagation: EventBehaviour$,
  debounce: number,
  throttle: number
): Attribute$<QQB>;

export function to_json(attribute: Attribute$<any>): $json.Json$;
