import type * as $process from "../../../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";
import type * as $socket from "../../glisten/socket.d.mts";
import type * as $options from "../../glisten/socket/options.d.mts";
import type * as $transport from "../../glisten/transport.d.mts";

export class Close extends _.CustomType {}
export function InternalMessage$Close(): InternalMessage$;
export function InternalMessage$isClose(value: InternalMessage$): boolean;

export class Ready extends _.CustomType {}
export function InternalMessage$Ready(): InternalMessage$;
export function InternalMessage$isReady(value: InternalMessage$): boolean;

export class ReceiveMessage extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function InternalMessage$ReceiveMessage(
  $0: _.BitArray,
): InternalMessage$;
export function InternalMessage$isReceiveMessage(
  value: InternalMessage$,
): boolean;
export function InternalMessage$ReceiveMessage$0(value: InternalMessage$): _.BitArray;

export class SslClosed extends _.CustomType {}
export function InternalMessage$SslClosed(): InternalMessage$;
export function InternalMessage$isSslClosed(value: InternalMessage$): boolean;

export class TcpClosed extends _.CustomType {}
export function InternalMessage$TcpClosed(): InternalMessage$;
export function InternalMessage$isTcpClosed(value: InternalMessage$): boolean;

export type InternalMessage$ = Close | Ready | ReceiveMessage | SslClosed | TcpClosed;

export class Internal extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: InternalMessage$);
  /** @deprecated */
  0: InternalMessage$;
}
export function Message$Internal<OIK>($0: InternalMessage$): Message$<OIK>;
export function Message$isInternal<OIK>(value: Message$<OIK>): boolean;
export function Message$Internal$0<OIK>(value: Message$<OIK>): InternalMessage$;

export class User<OIK> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: OIK);
  /** @deprecated */
  0: OIK;
}
export function Message$User<OIK>($0: OIK): Message$<OIK>;
export function Message$isUser<OIK>(value: Message$<OIK>): boolean;
export function Message$User$0<OIK>(value: Message$<OIK>): OIK;

export type Message$<OIK> = Internal | User<OIK>;

export class Packet extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function LoopMessage$Packet<OIL>($0: _.BitArray): LoopMessage$<OIL>;
export function LoopMessage$isPacket<OIL>(value: LoopMessage$<OIL>): boolean;
export function LoopMessage$Packet$0<OIL>(value: LoopMessage$<OIL>): _.BitArray;

export class Custom<OIL> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: OIL);
  /** @deprecated */
  0: OIL;
}
export function LoopMessage$Custom<OIL>($0: OIL): LoopMessage$<OIL>;
export function LoopMessage$isCustom<OIL>(value: LoopMessage$<OIL>): boolean;
export function LoopMessage$Custom$0<OIL>(value: LoopMessage$<OIL>): OIL;

export type LoopMessage$<OIL> = Packet | Custom<OIL>;

export class LoopState<OIN, OIM> extends _.CustomType {
  /** @deprecated */
  constructor(
    client_ip: _.Result<[$options.IpAddress$, number], undefined>,
    socket: $socket.Socket$,
    sender: $process.Subject$<Message$<any>>,
    transport: $transport.Transport$,
    state: OIM
  );
  /** @deprecated */
  client_ip: _.Result<[$options.IpAddress$, number], undefined>;
  /** @deprecated */
  socket: $socket.Socket$;
  /** @deprecated */
  sender: $process.Subject$<Message$<any>>;
  /** @deprecated */
  transport: $transport.Transport$;
  /** @deprecated */
  state: OIM;
}
export function LoopState$LoopState<OIM, OIN>(
  client_ip: _.Result<[$options.IpAddress$, number], undefined>,
  socket: $socket.Socket$,
  sender: $process.Subject$<Message$<any>>,
  transport: $transport.Transport$,
  state: OIM,
): LoopState$<OIM, OIN>;
export function LoopState$isLoopState<OIM, OIN>(
  value: LoopState$<OIM, OIN>,
): boolean;
export function LoopState$LoopState$0<OIM, OIN>(value: LoopState$<OIM, OIN>): _.Result<
  [$options.IpAddress$, number],
  undefined
>;
export function LoopState$LoopState$client_ip<OIN, OIM>(value: LoopState$<
    OIM,
    OIN
  >): _.Result<[$options.IpAddress$, number], undefined>;
export function LoopState$LoopState$1<OIM, OIN>(value: LoopState$<OIM, OIN>): $socket.Socket$;
export function LoopState$LoopState$socket<OIM, OIN>(
  value: LoopState$<OIM, OIN>,
): $socket.Socket$;
export function LoopState$LoopState$2<OIM, OIN>(value: LoopState$<OIM, OIN>): $process.Subject$<
  Message$<any>
>;
export function LoopState$LoopState$sender<OIN, OIM>(value: LoopState$<OIM, OIN>): $process.Subject$<
  Message$<any>
>;
export function LoopState$LoopState$3<OIN, OIM>(value: LoopState$<OIM, OIN>): $transport.Transport$;
export function LoopState$LoopState$transport<OIN, OIM>(
  value: LoopState$<OIM, OIN>,
): $transport.Transport$;
export function LoopState$LoopState$4<OIN, OIM>(value: LoopState$<OIM, OIN>): OIM;
export function LoopState$LoopState$state<OIN, OIM>(
  value: LoopState$<OIM, OIN>,
): OIM;

export type LoopState$<OIM, OIN> = LoopState<OIN, OIM>;

export class Connection<OIO> extends _.CustomType {
  /** @deprecated */
  constructor(
    client_ip: _.Result<[$options.IpAddress$, number], undefined>,
    socket: $socket.Socket$,
    transport: $transport.Transport$,
    sender: $process.Subject$<Message$<any>>
  );
  /** @deprecated */
  client_ip: _.Result<[$options.IpAddress$, number], undefined>;
  /** @deprecated */
  socket: $socket.Socket$;
  /** @deprecated */
  transport: $transport.Transport$;
  /** @deprecated */
  sender: $process.Subject$<Message$<any>>;
}
export function Connection$Connection<OIO>(
  client_ip: _.Result<[$options.IpAddress$, number], undefined>,
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  sender: $process.Subject$<Message$<any>>,
): Connection$<OIO>;
export function Connection$isConnection<OIO>(value: Connection$<OIO>): boolean;
export function Connection$Connection$0<OIO>(value: Connection$<OIO>): _.Result<
  [$options.IpAddress$, number],
  undefined
>;
export function Connection$Connection$client_ip<OIO>(value: Connection$<OIO>): _.Result<
  [$options.IpAddress$, number],
  undefined
>;
export function Connection$Connection$1<OIO>(value: Connection$<OIO>): $socket.Socket$;
export function Connection$Connection$socket<OIO>(
  value: Connection$<OIO>,
): $socket.Socket$;
export function Connection$Connection$2<OIO>(value: Connection$<OIO>): $transport.Transport$;
export function Connection$Connection$transport<OIO>(
  value: Connection$<OIO>,
): $transport.Transport$;
export function Connection$Connection$3<OIO>(value: Connection$<OIO>): $process.Subject$<
  Message$<any>
>;
export function Connection$Connection$sender<OIO>(value: Connection$<OIO>): $process.Subject$<
  Message$<any>
>;

export type Connection$<OIO> = Connection<OIO>;

export class Continue<OIP, OIQ> extends _.CustomType {
  /** @deprecated */
  constructor(state: OIP, selector: $option.Option$<$process.Selector$<any>>);
  /** @deprecated */
  state: OIP;
  /** @deprecated */
  selector: $option.Option$<$process.Selector$<any>>;
}
export function Next$Continue<OIP, OIQ>(
  state: OIP,
  selector: $option.Option$<$process.Selector$<any>>,
): Next$<OIP, OIQ>;
export function Next$isContinue<OIP, OIQ>(value: Next$<OIP, OIQ>): boolean;
export function Next$Continue$0<OIP, OIQ>(value: Next$<OIP, OIQ>): OIP;
export function Next$Continue$state<OIP, OIQ>(value: Next$<OIP, OIQ>): OIP;
export function Next$Continue$1<OIP, OIQ>(value: Next$<OIP, OIQ>): $option.Option$<
  $process.Selector$<any>
>;
export function Next$Continue$selector<OIP, OIQ>(value: Next$<OIP, OIQ>): $option.Option$<
  $process.Selector$<any>
>;

export class NormalStop extends _.CustomType {}
export function Next$NormalStop<OIQ, OIP>(): Next$<OIP, OIQ>;
export function Next$isNormalStop<OIP, OIQ>(value: Next$<OIP, OIQ>): boolean;

export class AbnormalStop extends _.CustomType {
  /** @deprecated */
  constructor(reason: string);
  /** @deprecated */
  reason: string;
}
export function Next$AbnormalStop<OIP, OIQ>(reason: string): Next$<OIP, OIQ>;
export function Next$isAbnormalStop<OIP, OIQ>(value: Next$<OIP, OIQ>): boolean;
export function Next$AbnormalStop$0<OIQ, OIP>(value: Next$<OIP, OIQ>): string;
export function Next$AbnormalStop$reason<OIQ, OIP>(value: Next$<OIP, OIQ>): string;

export type Next$<OIP, OIQ> = Continue<OIP, OIQ> | NormalStop | AbnormalStop;

export class Handler<OIR, OIS> extends _.CustomType {
  /** @deprecated */
  constructor(
    socket: $socket.Socket$,
    loop: (x0: any, x1: LoopMessage$<any>, x2: Connection$<any>) => Next$<
      any,
      LoopMessage$<any>
    >,
    on_init: (x0: Connection$<any>) => [
      any,
      $option.Option$<$process.Selector$<any>>
    ],
    on_close: $option.Option$<(x0: any) => undefined>,
    transport: $transport.Transport$
  );
  /** @deprecated */
  socket: $socket.Socket$;
  /** @deprecated */
  loop: (x0: any, x1: LoopMessage$<any>, x2: Connection$<any>) => Next$<
    any,
    LoopMessage$<any>
  >;
  /** @deprecated */
  on_init: (x0: Connection$<any>) => [
    any,
    $option.Option$<$process.Selector$<any>>
  ];
  /** @deprecated */
  on_close: $option.Option$<(x0: any) => undefined>;
  /** @deprecated */
  transport: $transport.Transport$;
}
export function Handler$Handler<OIR, OIS>(
  socket: $socket.Socket$,
  loop: (x0: any, x1: LoopMessage$<any>, x2: Connection$<any>) => Next$<
    any,
    LoopMessage$<any>
  >,
  on_init: (x0: Connection$<any>) => [
    any,
    $option.Option$<$process.Selector$<any>>
  ],
  on_close: $option.Option$<(x0: any) => undefined>,
  transport: $transport.Transport$,
): Handler$<OIS, OIR>;
export function Handler$isHandler<OIR, OIS>(value: Handler$<OIS, OIR>): boolean;
export function Handler$Handler$0<OIR, OIS>(value: Handler$<OIS, OIR>): $socket.Socket$;
export function Handler$Handler$socket<OIR, OIS>(
  value: Handler$<OIS, OIR>,
): $socket.Socket$;
export function Handler$Handler$1<OIR, OIS>(value: Handler$<OIS, OIR>): (
  x0: any,
  x1: LoopMessage$<any>,
  x2: Connection$<any>
) => Next$<any, LoopMessage$<any>>;
export function Handler$Handler$loop<OIS, OIR>(value: Handler$<OIS, OIR>): (
  x0: any,
  x1: LoopMessage$<any>,
  x2: Connection$<any>
) => Next$<any, LoopMessage$<any>>;
export function Handler$Handler$2<OIS, OIR>(value: Handler$<OIS, OIR>): (
  x0: Connection$<any>
) => [any, $option.Option$<$process.Selector$<any>>];
export function Handler$Handler$on_init<OIR, OIS>(value: Handler$<OIS, OIR>): (
  x0: Connection$<any>
) => [any, $option.Option$<$process.Selector$<any>>];
export function Handler$Handler$3<OIR, OIS>(value: Handler$<OIS, OIR>): $option.Option$<
  (x0: any) => undefined
>;
export function Handler$Handler$on_close<OIS, OIR>(value: Handler$<OIS, OIR>): $option.Option$<
  (x0: any) => undefined
>;
export function Handler$Handler$4<OIS, OIR>(value: Handler$<OIS, OIR>): $transport.Transport$;
export function Handler$Handler$transport<OIR, OIS>(
  value: Handler$<OIS, OIR>,
): $transport.Transport$;

export type Handler$<OIS, OIR> = Handler<OIS, OIR>;

export type ClientIp = _.Result<[$options.IpAddress$, number], undefined>;

export type Loop = (x0: any, x1: LoopMessage$<any>, x2: Connection$<any>) => Next$<
  any,
  LoopMessage$<any>
>;

export function continue$<OJF>(state: OJF): Next$<OJF, any>;

export function with_selector<OJJ, OJK>(
  next: Next$<OJJ, OJK>,
  selector: $process.Selector$<OJK>
): Next$<OJJ, OJK>;

export function stop(): Next$<any, any>;

export function stop_abnormal(reason: string): Next$<any, any>;

export function start<OJZ>(handler: Handler$<any, OJZ>): _.Result<
  $actor.Started$<$process.Subject$<Message$<OJZ>>>,
  $actor.StartError$
>;
