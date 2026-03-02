import type * as $dict from "../../../gleam_stdlib/gleam/dict.d.mts";
import type * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.d.mts";
import type * as _ from "../../gleam.d.mts";

export class Binary extends _.CustomType {}
export function SocketMode$Binary(): SocketMode$;
export function SocketMode$isBinary(value: SocketMode$): boolean;

export type SocketMode$ = Binary;

export class Once extends _.CustomType {}
export function ActiveState$Once(): ActiveState$;
export function ActiveState$isOnce(value: ActiveState$): boolean;

export class Passive extends _.CustomType {}
export function ActiveState$Passive(): ActiveState$;
export function ActiveState$isPassive(value: ActiveState$): boolean;

export class Count extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function ActiveState$Count($0: number): ActiveState$;
export function ActiveState$isCount(value: ActiveState$): boolean;
export function ActiveState$Count$0(value: ActiveState$): number;

export class Active extends _.CustomType {}
export function ActiveState$Active(): ActiveState$;
export function ActiveState$isActive(value: ActiveState$): boolean;

export type ActiveState$ = Once | Passive | Count | Active;

export class Address extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: IpAddress$);
  /** @deprecated */
  0: IpAddress$;
}
export function Interface$Address($0: IpAddress$): Interface$;
export function Interface$isAddress(value: Interface$): boolean;
export function Interface$Address$0(value: Interface$): IpAddress$;

export class Any extends _.CustomType {}
export function Interface$Any(): Interface$;
export function Interface$isAny(value: Interface$): boolean;

export class Loopback extends _.CustomType {}
export function Interface$Loopback(): Interface$;
export function Interface$isLoopback(value: Interface$): boolean;

export type Interface$ = Address | Any | Loopback;

export class CertKeyFiles extends _.CustomType {
  /** @deprecated */
  constructor(certfile: string, keyfile: string);
  /** @deprecated */
  certfile: string;
  /** @deprecated */
  keyfile: string;
}
export function TlsCerts$CertKeyFiles(
  certfile: string,
  keyfile: string,
): TlsCerts$;
export function TlsCerts$isCertKeyFiles(value: TlsCerts$): boolean;
export function TlsCerts$CertKeyFiles$0(value: TlsCerts$): string;
export function TlsCerts$CertKeyFiles$certfile(value: TlsCerts$): string;
export function TlsCerts$CertKeyFiles$1(value: TlsCerts$): string;
export function TlsCerts$CertKeyFiles$keyfile(value: TlsCerts$): string;

export type TlsCerts$ = CertKeyFiles;

export class Backlog extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function TcpOption$Backlog($0: number): TcpOption$;
export function TcpOption$isBacklog(value: TcpOption$): boolean;
export function TcpOption$Backlog$0(value: TcpOption$): number;

export class Nodelay extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: boolean);
  /** @deprecated */
  0: boolean;
}
export function TcpOption$Nodelay($0: boolean): TcpOption$;
export function TcpOption$isNodelay(value: TcpOption$): boolean;
export function TcpOption$Nodelay$0(value: TcpOption$): boolean;

export class Linger extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: [boolean, number]);
  /** @deprecated */
  0: [boolean, number];
}
export function TcpOption$Linger($0: [boolean, number]): TcpOption$;
export function TcpOption$isLinger(value: TcpOption$): boolean;
export function TcpOption$Linger$0(value: TcpOption$): [boolean, number];

export class SendTimeout extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function TcpOption$SendTimeout($0: number): TcpOption$;
export function TcpOption$isSendTimeout(value: TcpOption$): boolean;
export function TcpOption$SendTimeout$0(value: TcpOption$): number;

export class SendTimeoutClose extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: boolean);
  /** @deprecated */
  0: boolean;
}
export function TcpOption$SendTimeoutClose($0: boolean): TcpOption$;
export function TcpOption$isSendTimeoutClose(value: TcpOption$): boolean;
export function TcpOption$SendTimeoutClose$0(value: TcpOption$): boolean;

export class Reuseaddr extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: boolean);
  /** @deprecated */
  0: boolean;
}
export function TcpOption$Reuseaddr($0: boolean): TcpOption$;
export function TcpOption$isReuseaddr(value: TcpOption$): boolean;
export function TcpOption$Reuseaddr$0(value: TcpOption$): boolean;

export class ActiveMode extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ActiveState$);
  /** @deprecated */
  0: ActiveState$;
}
export function TcpOption$ActiveMode($0: ActiveState$): TcpOption$;
export function TcpOption$isActiveMode(value: TcpOption$): boolean;
export function TcpOption$ActiveMode$0(value: TcpOption$): ActiveState$;

export class Mode extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: SocketMode$);
  /** @deprecated */
  0: SocketMode$;
}
export function TcpOption$Mode($0: SocketMode$): TcpOption$;
export function TcpOption$isMode(value: TcpOption$): boolean;
export function TcpOption$Mode$0(value: TcpOption$): SocketMode$;

export class CertKeyConfig extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: TlsCerts$);
  /** @deprecated */
  0: TlsCerts$;
}
export function TcpOption$CertKeyConfig($0: TlsCerts$): TcpOption$;
export function TcpOption$isCertKeyConfig(value: TcpOption$): boolean;
export function TcpOption$CertKeyConfig$0(value: TcpOption$): TlsCerts$;

export class AlpnPreferredProtocols extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.List<string>);
  /** @deprecated */
  0: _.List<string>;
}
export function TcpOption$AlpnPreferredProtocols(
  $0: _.List<string>,
): TcpOption$;
export function TcpOption$isAlpnPreferredProtocols(value: TcpOption$): boolean;
export function TcpOption$AlpnPreferredProtocols$0(value: TcpOption$): _.List<
  string
>;

export class Ipv6 extends _.CustomType {}
export function TcpOption$Ipv6(): TcpOption$;
export function TcpOption$isIpv6(value: TcpOption$): boolean;

export class Buffer extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function TcpOption$Buffer($0: number): TcpOption$;
export function TcpOption$isBuffer(value: TcpOption$): boolean;
export function TcpOption$Buffer$0(value: TcpOption$): number;

export class Ip extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Interface$);
  /** @deprecated */
  0: Interface$;
}
export function TcpOption$Ip($0: Interface$): TcpOption$;
export function TcpOption$isIp(value: TcpOption$): boolean;
export function TcpOption$Ip$0(value: TcpOption$): Interface$;

export type TcpOption$ = Backlog | Nodelay | Linger | SendTimeout | SendTimeoutClose | Reuseaddr | ActiveMode | Mode | CertKeyConfig | AlpnPreferredProtocols | Ipv6 | Buffer | Ip;

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

export const default_options: _.List<TcpOption$>;

export function to_dict(options: _.List<TcpOption$>): $dict.Dict$<
  $dynamic.Dynamic$,
  $dynamic.Dynamic$
>;

export function merge_with_defaults(options: _.List<TcpOption$>): _.List<
  TcpOption$
>;
