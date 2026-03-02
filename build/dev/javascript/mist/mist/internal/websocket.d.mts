import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as $socket from "../../../glisten/glisten/socket.d.mts";
import type * as $transport from "../../../glisten/glisten/transport.d.mts";
import type * as $websocket from "../../../gramps/gramps/websocket.d.mts";
import type * as $compression from "../../../gramps/gramps/websocket/compression.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $next from "../../mist/internal/next.d.mts";

export class SocketMessage extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function ValidMessage$SocketMessage<ABVP>(
  $0: _.BitArray,
): ValidMessage$<ABVP>;
export function ValidMessage$isSocketMessage<ABVP>(
  value: ValidMessage$<ABVP>,
): boolean;
export function ValidMessage$SocketMessage$0<ABVP>(value: ValidMessage$<ABVP>): _.BitArray;

export class SocketClosedMessage extends _.CustomType {}
export function ValidMessage$SocketClosedMessage<ABVP>(): ValidMessage$<ABVP>;
export function ValidMessage$isSocketClosedMessage<ABVP>(
  value: ValidMessage$<ABVP>,
): boolean;

export class UserMessage<ABVP> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ABVP);
  /** @deprecated */
  0: ABVP;
}
export function ValidMessage$UserMessage<ABVP>($0: ABVP): ValidMessage$<ABVP>;
export function ValidMessage$isUserMessage<ABVP>(
  value: ValidMessage$<ABVP>,
): boolean;
export function ValidMessage$UserMessage$0<ABVP>(value: ValidMessage$<ABVP>): ABVP;

export type ValidMessage$<ABVP> = SocketMessage | SocketClosedMessage | UserMessage<
  ABVP
>;

export class Valid<ABVQ> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ValidMessage$<any>);
  /** @deprecated */
  0: ValidMessage$<any>;
}
export function WebsocketMessage$Valid<ABVQ>(
  $0: ValidMessage$<any>,
): WebsocketMessage$<ABVQ>;
export function WebsocketMessage$isValid<ABVQ>(
  value: WebsocketMessage$<ABVQ>,
): boolean;
export function WebsocketMessage$Valid$0<ABVQ>(value: WebsocketMessage$<ABVQ>): ValidMessage$<
  any
>;

export class Invalid extends _.CustomType {}
export function WebsocketMessage$Invalid<ABVQ>(): WebsocketMessage$<ABVQ>;
export function WebsocketMessage$isInvalid<ABVQ>(
  value: WebsocketMessage$<ABVQ>,
): boolean;

export type WebsocketMessage$<ABVQ> = Valid<ABVQ> | Invalid;

export class WebsocketConnection extends _.CustomType {
  /** @deprecated */
  constructor(
    socket: $socket.Socket$,
    transport: $transport.Transport$,
    deflate: $option.Option$<$compression.Context$>
  );
  /** @deprecated */
  socket: $socket.Socket$;
  /** @deprecated */
  transport: $transport.Transport$;
  /** @deprecated */
  deflate: $option.Option$<$compression.Context$>;
}
export function WebsocketConnection$WebsocketConnection(
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  deflate: $option.Option$<$compression.Context$>,
): WebsocketConnection$;
export function WebsocketConnection$isWebsocketConnection(
  value: WebsocketConnection$,
): boolean;
export function WebsocketConnection$WebsocketConnection$0(value: WebsocketConnection$): $socket.Socket$;
export function WebsocketConnection$WebsocketConnection$socket(
  value: WebsocketConnection$,
): $socket.Socket$;
export function WebsocketConnection$WebsocketConnection$1(value: WebsocketConnection$): $transport.Transport$;
export function WebsocketConnection$WebsocketConnection$transport(
  value: WebsocketConnection$,
): $transport.Transport$;
export function WebsocketConnection$WebsocketConnection$2(value: WebsocketConnection$): $option.Option$<
  $compression.Context$
>;
export function WebsocketConnection$WebsocketConnection$deflate(value: WebsocketConnection$): $option.Option$<
  $compression.Context$
>;

export type WebsocketConnection$ = WebsocketConnection;

export class Internal extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $websocket.Frame$);
  /** @deprecated */
  0: $websocket.Frame$;
}
export function HandlerMessage$Internal<ABVR>(
  $0: $websocket.Frame$,
): HandlerMessage$<ABVR>;
export function HandlerMessage$isInternal<ABVR>(
  value: HandlerMessage$<ABVR>,
): boolean;
export function HandlerMessage$Internal$0<ABVR>(value: HandlerMessage$<ABVR>): $websocket.Frame$;

export class User<ABVR> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ABVR);
  /** @deprecated */
  0: ABVR;
}
export function HandlerMessage$User<ABVR>($0: ABVR): HandlerMessage$<ABVR>;
export function HandlerMessage$isUser<ABVR>(
  value: HandlerMessage$<ABVR>,
): boolean;
export function HandlerMessage$User$0<ABVR>(value: HandlerMessage$<ABVR>): ABVR;

export type HandlerMessage$<ABVR> = Internal | User<ABVR>;

export class WebsocketState<ABVS> extends _.CustomType {
  /** @deprecated */
  constructor(
    buffer: _.BitArray,
    user: ABVS,
    permessage_deflate: $option.Option$<$compression.Compression$>
  );
  /** @deprecated */
  buffer: _.BitArray;
  /** @deprecated */
  user: ABVS;
  /** @deprecated */
  permessage_deflate: $option.Option$<$compression.Compression$>;
}
export function WebsocketState$WebsocketState<ABVS>(
  buffer: _.BitArray,
  user: ABVS,
  permessage_deflate: $option.Option$<$compression.Compression$>,
): WebsocketState$<ABVS>;
export function WebsocketState$isWebsocketState<ABVS>(
  value: WebsocketState$<ABVS>,
): boolean;
export function WebsocketState$WebsocketState$0<ABVS>(value: WebsocketState$<
    ABVS
  >): _.BitArray;
export function WebsocketState$WebsocketState$buffer<ABVS>(value: WebsocketState$<
    ABVS
  >): _.BitArray;
export function WebsocketState$WebsocketState$1<ABVS>(value: WebsocketState$<
    ABVS
  >): ABVS;
export function WebsocketState$WebsocketState$user<ABVS>(value: WebsocketState$<
    ABVS
  >): ABVS;
export function WebsocketState$WebsocketState$2<ABVS>(value: WebsocketState$<
    ABVS
  >): $option.Option$<$compression.Compression$>;
export function WebsocketState$WebsocketState$permessage_deflate<ABVS>(value: WebsocketState$<
    ABVS
  >): $option.Option$<$compression.Compression$>;

export type WebsocketState$<ABVS> = WebsocketState<ABVS>;

export type Handler = (
  x0: any,
  x1: HandlerMessage$<any>,
  x2: WebsocketConnection$
) => $next.Next$<any, any>;

export function initialize_connection<ABWB, ABWC>(
  on_init: (x0: WebsocketConnection$) => [
    ABWB,
    $option.Option$<$process.Selector$<ABWC>>
  ],
  on_close: (x0: ABWB) => undefined,
  handler: (x0: ABWB, x1: HandlerMessage$<ABWC>, x2: WebsocketConnection$) => $next.Next$<
    ABWB,
    ABWC
  >,
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  extensions: _.List<string>
): _.Result<
  $actor.Started$<$process.Subject$<WebsocketMessage$<ABWC>>>,
  undefined
>;
