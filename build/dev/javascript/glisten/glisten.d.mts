import type * as $charlist from "../gleam_erlang/gleam/erlang/charlist.d.mts";
import type * as $process from "../gleam_erlang/gleam/erlang/process.d.mts";
import type * as $actor from "../gleam_otp/gleam/otp/actor.d.mts";
import type * as $static_supervisor from "../gleam_otp/gleam/otp/static_supervisor.d.mts";
import type * as $supervision from "../gleam_otp/gleam/otp/supervision.d.mts";
import type * as $bytes_tree from "../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "./gleam.d.mts";
import type * as $handler from "./glisten/internal/handler.d.mts";
import type * as $listener from "./glisten/internal/listener.d.mts";
import type * as $socket from "./glisten/socket.d.mts";
import type * as $options from "./glisten/socket/options.d.mts";
import type * as $transport from "./glisten/transport.d.mts";

export class Packet extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function Message$Packet<PCL>($0: _.BitArray): Message$<PCL>;
export function Message$isPacket<PCL>(value: Message$<PCL>): boolean;
export function Message$Packet$0<PCL>(value: Message$<PCL>): _.BitArray;

export class User<PCL> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: PCL);
  /** @deprecated */
  0: PCL;
}
export function Message$User<PCL>($0: PCL): Message$<PCL>;
export function Message$isUser<PCL>(value: Message$<PCL>): boolean;
export function Message$User$0<PCL>(value: Message$<PCL>): PCL;

export type Message$<PCL> = Packet | User<PCL>;

export class IpV4 extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: number,
    argument$1: number,
    argument$2: number,
    argument$3: number
  );
  /** @deprecated */
  0: number;
  /** @deprecated */
  1: number;
  /** @deprecated */
  2: number;
  /** @deprecated */
  3: number;
}
export function IpAddress$IpV4(
  $0: number,
  $1: number,
  $2: number,
  $3: number,
): IpAddress$;
export function IpAddress$isIpV4(value: IpAddress$): boolean;
export function IpAddress$IpV4$0(value: IpAddress$): number;
export function IpAddress$IpV4$1(value: IpAddress$): number;
export function IpAddress$IpV4$2(value: IpAddress$): number;
export function IpAddress$IpV4$3(value: IpAddress$): number;

export class IpV6 extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: number,
    argument$1: number,
    argument$2: number,
    argument$3: number,
    argument$4: number,
    argument$5: number,
    argument$6: number,
    argument$7: number
  );
  /** @deprecated */
  0: number;
  /** @deprecated */
  1: number;
  /** @deprecated */
  2: number;
  /** @deprecated */
  3: number;
  /** @deprecated */
  4: number;
  /** @deprecated */
  5: number;
  /** @deprecated */
  6: number;
  /** @deprecated */
  7: number;
}
export function IpAddress$IpV6(
  $0: number,
  $1: number,
  $2: number,
  $3: number,
  $4: number,
  $5: number,
  $6: number,
  $7: number,
): IpAddress$;
export function IpAddress$isIpV6(value: IpAddress$): boolean;
export function IpAddress$IpV6$0(value: IpAddress$): number;
export function IpAddress$IpV6$1(value: IpAddress$): number;
export function IpAddress$IpV6$2(value: IpAddress$): number;
export function IpAddress$IpV6$3(value: IpAddress$): number;
export function IpAddress$IpV6$4(value: IpAddress$): number;
export function IpAddress$IpV6$5(value: IpAddress$): number;
export function IpAddress$IpV6$6(value: IpAddress$): number;
export function IpAddress$IpV6$7(value: IpAddress$): number;

export type IpAddress$ = IpV4 | IpV6;

export class ConnectionInfo extends _.CustomType {
  /** @deprecated */
  constructor(port: number, ip_address: IpAddress$);
  /** @deprecated */
  port: number;
  /** @deprecated */
  ip_address: IpAddress$;
}
export function ConnectionInfo$ConnectionInfo(
  port: number,
  ip_address: IpAddress$,
): ConnectionInfo$;
export function ConnectionInfo$isConnectionInfo(
  value: ConnectionInfo$,
): boolean;
export function ConnectionInfo$ConnectionInfo$0(value: ConnectionInfo$): number;
export function ConnectionInfo$ConnectionInfo$port(value: ConnectionInfo$): number;
export function ConnectionInfo$ConnectionInfo$1(
  value: ConnectionInfo$,
): IpAddress$;
export function ConnectionInfo$ConnectionInfo$ip_address(value: ConnectionInfo$): IpAddress$;

export type ConnectionInfo$ = ConnectionInfo;

export class Connection<PCM> extends _.CustomType {
  /** @deprecated */
  constructor(
    socket: $socket.Socket$,
    transport: $transport.Transport$,
    subject: $process.Subject$<$handler.Message$<any>>
  );
  /** @deprecated */
  socket: $socket.Socket$;
  /** @deprecated */
  transport: $transport.Transport$;
  /** @deprecated */
  subject: $process.Subject$<$handler.Message$<any>>;
}
export function Connection$Connection<PCM>(
  socket: $socket.Socket$,
  transport: $transport.Transport$,
  subject: $process.Subject$<$handler.Message$<any>>,
): Connection$<PCM>;
export function Connection$isConnection<PCM>(value: Connection$<PCM>): boolean;
export function Connection$Connection$0<PCM>(value: Connection$<PCM>): $socket.Socket$;
export function Connection$Connection$socket<PCM>(
  value: Connection$<PCM>,
): $socket.Socket$;
export function Connection$Connection$1<PCM>(value: Connection$<PCM>): $transport.Transport$;
export function Connection$Connection$transport<PCM>(
  value: Connection$<PCM>,
): $transport.Transport$;
export function Connection$Connection$2<PCM>(value: Connection$<PCM>): $process.Subject$<
  $handler.Message$<any>
>;
export function Connection$Connection$subject<PCM>(value: Connection$<PCM>): $process.Subject$<
  $handler.Message$<any>
>;

export type Connection$<PCM> = Connection<PCM>;

declare class Continue<PCO, PCN> extends _.CustomType {
  /** @deprecated */
  constructor(state: PCN, selector: $option.Option$<$process.Selector$<any>>);
  /** @deprecated */
  state: PCN;
  /** @deprecated */
  selector: $option.Option$<$process.Selector$<any>>;
}

declare class NormalStop extends _.CustomType {}

declare class AbnormalStop extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}

export type Next$<PCN, PCO> = Continue<PCN, PCO> | NormalStop | AbnormalStop;

declare class Builder<PCQ, PCP> extends _.CustomType {
  /** @deprecated */
  constructor(
    interface$: $options.Interface$,
    on_init: (x0: Connection$<any>) => [
      any,
      $option.Option$<$process.Selector$<any>>
    ],
    loop: (x0: any, x1: Message$<any>, x2: Connection$<any>) => Next$<
      any,
      Message$<any>
    >,
    on_close: $option.Option$<(x0: any) => undefined>,
    pool_size: number,
    http2_support: boolean,
    ipv6_support: boolean,
    tls_options: $option.Option$<$options.TlsCerts$>
  );
  /** @deprecated */
  interface$: $options.Interface$;
  /** @deprecated */
  on_init: (x0: Connection$<any>) => [
    any,
    $option.Option$<$process.Selector$<any>>
  ];
  /** @deprecated */
  loop: (x0: any, x1: Message$<any>, x2: Connection$<any>) => Next$<
    any,
    Message$<any>
  >;
  /** @deprecated */
  on_close: $option.Option$<(x0: any) => undefined>;
  /** @deprecated */
  pool_size: number;
  /** @deprecated */
  http2_support: boolean;
  /** @deprecated */
  ipv6_support: boolean;
  /** @deprecated */
  tls_options: $option.Option$<$options.TlsCerts$>;
}

export type Builder$<PCP, PCQ> = Builder<PCQ, PCP>;

export type Socket = $socket.Socket$;

export type SocketReason = $socket.SocketReason$;

export type Loop = (x0: any, x1: Message$<any>, x2: Connection$<any>) => Next$<
  any,
  Message$<any>
>;

export function convert_ip_address(ip: $options.IpAddress$): IpAddress$;

export function get_server_info(
  listener: $process.Name$<$listener.Message$>,
  timeout: number
): ConnectionInfo$;

export function ip_address_to_string(address: IpAddress$): string;

export function get_client_info(conn: Connection$<any>): _.Result<
  ConnectionInfo$,
  undefined
>;

export function send(conn: Connection$<any>, msg: $bytes_tree.BytesTree$): _.Result<
  undefined,
  $socket.SocketReason$
>;

export function continue$<PDQ>(state: PDQ): Next$<PDQ, any>;

export function with_selector<PDU, PDV>(
  next: Next$<PDU, PDV>,
  selector: $process.Selector$<PDV>
): Next$<PDU, PDV>;

export function stop(): Next$<any, any>;

export function stop_abnormal(reason: string): Next$<any, any>;

export function convert_next<PEJ, PEK>(next: Next$<PEJ, PEK>): $handler.Next$<
  PEJ,
  PEK
>;

export function map_selector<PEP, PEQ, PET>(
  next: Next$<PEP, PEQ>,
  mapper: (x0: PEQ) => PET
): Next$<PEP, PET>;

export function new$<PFP, PFR>(
  on_init: (x0: Connection$<PFP>) => [
    PFR,
    $option.Option$<$process.Selector$<PFP>>
  ],
  loop: (x0: PFR, x1: Message$<PFP>, x2: Connection$<PFP>) => Next$<
    PFR,
    Message$<PFP>
  >
): Builder$<PFR, PFP>;

export function with_close<PFY, PFZ>(
  builder: Builder$<PFY, PFZ>,
  on_close: (x0: PFY) => undefined
): Builder$<PFY, PFZ>;

export function with_pool_size<PGE, PGF>(
  builder: Builder$<PGE, PGF>,
  size: number
): Builder$<PGE, PGF>;

export function with_http2<PGK, PGL>(builder: Builder$<PGK, PGL>): Builder$<
  PGK,
  PGL
>;

export function with_ipv6<PGW, PGX>(builder: Builder$<PGW, PGX>): Builder$<
  PGW,
  PGX
>;

export function with_tls<PHC, PHD>(
  builder: Builder$<PHC, PHD>,
  cert: string,
  key: string
): Builder$<PHC, PHD>;

export function start_with_listener_name(
  builder: Builder$<any, any>,
  port: number,
  listener_name: $process.Name$<$listener.Message$>
): _.Result<$actor.Started$<$supervisor.Supervisor$>, $actor.StartError$>;

export function start(builder: Builder$<any, any>, port: number): _.Result<
  $actor.Started$<$supervisor.Supervisor$>,
  $actor.StartError$
>;

export function bind<PGQ, PGR>(builder: Builder$<PGQ, PGR>, interface$: string): Builder$<
  PGQ,
  PGR
>;

export function supervised(handler: Builder$<any, any>, port: number): $supervision.ChildSpecification$<
  $supervisor.Supervisor$
>;
