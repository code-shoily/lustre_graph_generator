import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $static_supervisor from "../../../gleam_otp/gleam/otp/static_supervisor.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $handler from "../../glisten/internal/handler.d.mts";
import type * as $listener from "../../glisten/internal/listener.d.mts";
import type * as $socket from "../../glisten/socket.d.mts";
import type * as $options from "../../glisten/socket/options.d.mts";
import type * as $transport from "../../glisten/transport.d.mts";

export class AcceptConnection extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $socket.ListenSocket$);
  /** @deprecated */
  0: $socket.ListenSocket$;
}
export function AcceptorMessage$AcceptConnection(
  $0: $socket.ListenSocket$,
): AcceptorMessage$;
export function AcceptorMessage$isAcceptConnection(
  value: AcceptorMessage$,
): boolean;
export function AcceptorMessage$AcceptConnection$0(value: AcceptorMessage$): $socket.ListenSocket$;

export type AcceptorMessage$ = AcceptConnection;

export class AcceptError extends _.CustomType {}
export function AcceptorError$AcceptError(): AcceptorError$;
export function AcceptorError$isAcceptError(value: AcceptorError$): boolean;

export class HandlerError extends _.CustomType {}
export function AcceptorError$HandlerError(): AcceptorError$;
export function AcceptorError$isHandlerError(value: AcceptorError$): boolean;

export class ControlError extends _.CustomType {}
export function AcceptorError$ControlError(): AcceptorError$;
export function AcceptorError$isControlError(value: AcceptorError$): boolean;

export type AcceptorError$ = AcceptError | HandlerError | ControlError;

export class AcceptorState extends _.CustomType {
  /** @deprecated */
  constructor(
    sender: $process.Subject$<AcceptorMessage$>,
    socket: $option.Option$<$socket.Socket$>,
    transport: $transport.Transport$
  );
  /** @deprecated */
  sender: $process.Subject$<AcceptorMessage$>;
  /** @deprecated */
  socket: $option.Option$<$socket.Socket$>;
  /** @deprecated */
  transport: $transport.Transport$;
}
export function AcceptorState$AcceptorState(
  sender: $process.Subject$<AcceptorMessage$>,
  socket: $option.Option$<$socket.Socket$>,
  transport: $transport.Transport$,
): AcceptorState$;
export function AcceptorState$isAcceptorState(value: AcceptorState$): boolean;
export function AcceptorState$AcceptorState$0(value: AcceptorState$): $process.Subject$<
  AcceptorMessage$
>;
export function AcceptorState$AcceptorState$sender(value: AcceptorState$): $process.Subject$<
  AcceptorMessage$
>;
export function AcceptorState$AcceptorState$1(value: AcceptorState$): $option.Option$<
  $socket.Socket$
>;
export function AcceptorState$AcceptorState$socket(value: AcceptorState$): $option.Option$<
  $socket.Socket$
>;
export function AcceptorState$AcceptorState$2(value: AcceptorState$): $transport.Transport$;
export function AcceptorState$AcceptorState$transport(
  value: AcceptorState$,
): $transport.Transport$;

export type AcceptorState$ = AcceptorState;

export class Pool<OXL, OXM> extends _.CustomType {
  /** @deprecated */
  constructor(
    handler: (
      x0: any,
      x1: $handler.LoopMessage$<any>,
      x2: $handler.Connection$<any>
    ) => $handler.Next$<any, $handler.LoopMessage$<any>>,
    pool_count: number,
    on_init: (x0: $handler.Connection$<any>) => [
      any,
      $option.Option$<$process.Selector$<any>>
    ],
    on_close: $option.Option$<(x0: any) => undefined>,
    transport: $transport.Transport$
  );
  /** @deprecated */
  handler: (
    x0: any,
    x1: $handler.LoopMessage$<any>,
    x2: $handler.Connection$<any>
  ) => $handler.Next$<any, $handler.LoopMessage$<any>>;
  /** @deprecated */
  pool_count: number;
  /** @deprecated */
  on_init: (x0: $handler.Connection$<any>) => [
    any,
    $option.Option$<$process.Selector$<any>>
  ];
  /** @deprecated */
  on_close: $option.Option$<(x0: any) => undefined>;
  /** @deprecated */
  transport: $transport.Transport$;
}
export function Pool$Pool<OXL, OXM>(
  handler: (
    x0: any,
    x1: $handler.LoopMessage$<any>,
    x2: $handler.Connection$<any>
  ) => $handler.Next$<any, $handler.LoopMessage$<any>>,
  pool_count: number,
  on_init: (x0: $handler.Connection$<any>) => [
    any,
    $option.Option$<$process.Selector$<any>>
  ],
  on_close: $option.Option$<(x0: any) => undefined>,
  transport: $transport.Transport$,
): Pool$<OXL, OXM>;
export function Pool$isPool<OXM, OXL>(value: Pool$<OXL, OXM>): boolean;
export function Pool$Pool$0<OXM, OXL>(value: Pool$<OXL, OXM>): (
  x0: any,
  x1: $handler.LoopMessage$<any>,
  x2: $handler.Connection$<any>
) => $handler.Next$<any, $handler.LoopMessage$<any>>;
export function Pool$Pool$handler<OXL, OXM>(value: Pool$<OXL, OXM>): (
  x0: any,
  x1: $handler.LoopMessage$<any>,
  x2: $handler.Connection$<any>
) => $handler.Next$<any, $handler.LoopMessage$<any>>;
export function Pool$Pool$1<OXL, OXM>(value: Pool$<OXL, OXM>): number;
export function Pool$Pool$pool_count<OXM, OXL>(value: Pool$<OXL, OXM>): number;
export function Pool$Pool$2<OXM, OXL>(value: Pool$<OXL, OXM>): (
  x0: $handler.Connection$<any>
) => [any, $option.Option$<$process.Selector$<any>>];
export function Pool$Pool$on_init<OXL, OXM>(value: Pool$<OXL, OXM>): (
  x0: $handler.Connection$<any>
) => [any, $option.Option$<$process.Selector$<any>>];
export function Pool$Pool$3<OXL, OXM>(value: Pool$<OXL, OXM>): $option.Option$<
  (x0: any) => undefined
>;
export function Pool$Pool$on_close<OXL, OXM>(value: Pool$<OXL, OXM>): $option.Option$<
  (x0: any) => undefined
>;
export function Pool$Pool$4<OXM, OXL>(value: Pool$<OXL, OXM>): $transport.Transport$;
export function Pool$Pool$transport<OXM, OXL>(
  value: Pool$<OXL, OXM>,
): $transport.Transport$;

export type Pool$<OXL, OXM> = Pool<OXL, OXM>;

export function start(
  pool: Pool$<any, any>,
  listener_name: $process.Name$<$listener.Message$>
): _.Result<
  $actor.Started$<$process.Subject$<AcceptorMessage$>>,
  $actor.StartError$
>;

export function start_pool(
  pool: Pool$<any, any>,
  transport: $transport.Transport$,
  port: number,
  options: _.List<$options.TcpOption$>,
  listener_name: $process.Name$<$listener.Message$>
): _.Result<$actor.Started$<$supervisor.Supervisor$>, $actor.StartError$>;
