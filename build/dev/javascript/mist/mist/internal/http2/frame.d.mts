import type * as $option from "../../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../../gleam.d.mts";

declare class StreamIdentifier extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}

export type StreamIdentifier$<AAVQ> = StreamIdentifier;

export class HeaderPriority extends _.CustomType {
  /** @deprecated */
  constructor(
    exclusive: boolean,
    stream_dependency: StreamIdentifier$<Frame$>,
    weight: number
  );
  /** @deprecated */
  exclusive: boolean;
  /** @deprecated */
  stream_dependency: StreamIdentifier$<Frame$>;
  /** @deprecated */
  weight: number;
}
export function HeaderPriority$HeaderPriority(
  exclusive: boolean,
  stream_dependency: StreamIdentifier$<Frame$>,
  weight: number,
): HeaderPriority$;
export function HeaderPriority$isHeaderPriority(
  value: HeaderPriority$,
): boolean;
export function HeaderPriority$HeaderPriority$0(value: HeaderPriority$): boolean;
export function HeaderPriority$HeaderPriority$exclusive(
  value: HeaderPriority$,
): boolean;
export function HeaderPriority$HeaderPriority$1(value: HeaderPriority$): StreamIdentifier$<
  Frame$
>;
export function HeaderPriority$HeaderPriority$stream_dependency(value: HeaderPriority$): StreamIdentifier$<
  Frame$
>;
export function HeaderPriority$HeaderPriority$2(value: HeaderPriority$): number;
export function HeaderPriority$HeaderPriority$weight(value: HeaderPriority$): number;

export type HeaderPriority$ = HeaderPriority;

export class Complete extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function Data$Complete($0: _.BitArray): Data$;
export function Data$isComplete(value: Data$): boolean;
export function Data$Complete$0(value: Data$): _.BitArray;

export class Continued extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function Data$Continued($0: _.BitArray): Data$;
export function Data$isContinued(value: Data$): boolean;
export function Data$Continued$0(value: Data$): _.BitArray;

export type Data$ = Complete | Continued;

export class Enabled extends _.CustomType {}
export function PushState$Enabled(): PushState$;
export function PushState$isEnabled(value: PushState$): boolean;

export class Disabled extends _.CustomType {}
export function PushState$Disabled(): PushState$;
export function PushState$isDisabled(value: PushState$): boolean;

export type PushState$ = Enabled | Disabled;

export class HeaderTableSize extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Setting$HeaderTableSize($0: number): Setting$;
export function Setting$isHeaderTableSize(value: Setting$): boolean;
export function Setting$HeaderTableSize$0(value: Setting$): number;

export class ServerPush extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: PushState$);
  /** @deprecated */
  0: PushState$;
}
export function Setting$ServerPush($0: PushState$): Setting$;
export function Setting$isServerPush(value: Setting$): boolean;
export function Setting$ServerPush$0(value: Setting$): PushState$;

export class MaxConcurrentStreams extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Setting$MaxConcurrentStreams($0: number): Setting$;
export function Setting$isMaxConcurrentStreams(value: Setting$): boolean;
export function Setting$MaxConcurrentStreams$0(value: Setting$): number;

export class InitialWindowSize extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Setting$InitialWindowSize($0: number): Setting$;
export function Setting$isInitialWindowSize(value: Setting$): boolean;
export function Setting$InitialWindowSize$0(value: Setting$): number;

export class MaxFrameSize extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Setting$MaxFrameSize($0: number): Setting$;
export function Setting$isMaxFrameSize(value: Setting$): boolean;
export function Setting$MaxFrameSize$0(value: Setting$): number;

export class MaxHeaderListSize extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function Setting$MaxHeaderListSize($0: number): Setting$;
export function Setting$isMaxHeaderListSize(value: Setting$): boolean;
export function Setting$MaxHeaderListSize$0(value: Setting$): number;

export type Setting$ = HeaderTableSize | ServerPush | MaxConcurrentStreams | InitialWindowSize | MaxFrameSize | MaxHeaderListSize;

export class Data extends _.CustomType {
  /** @deprecated */
  constructor(
    data: _.BitArray,
    end_stream: boolean,
    identifier: StreamIdentifier$<Frame$>
  );
  /** @deprecated */
  data: _.BitArray;
  /** @deprecated */
  end_stream: boolean;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
}
export function Frame$Data(
  data: _.BitArray,
  end_stream: boolean,
  identifier: StreamIdentifier$<Frame$>,
): Frame$;
export function Frame$isData(value: Frame$): boolean;
export function Frame$Data$0(value: Frame$): _.BitArray;
export function Frame$Data$data(value: Frame$): _.BitArray;
export function Frame$Data$1(value: Frame$): boolean;
export function Frame$Data$end_stream(value: Frame$): boolean;
export function Frame$Data$2(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$Data$identifier(value: Frame$): StreamIdentifier$<Frame$>;

export class Header extends _.CustomType {
  /** @deprecated */
  constructor(
    data: Data$,
    end_stream: boolean,
    identifier: StreamIdentifier$<Frame$>,
    priority: $option.Option$<HeaderPriority$>
  );
  /** @deprecated */
  data: Data$;
  /** @deprecated */
  end_stream: boolean;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
  /** @deprecated */
  priority: $option.Option$<HeaderPriority$>;
}
export function Frame$Header(
  data: Data$,
  end_stream: boolean,
  identifier: StreamIdentifier$<Frame$>,
  priority: $option.Option$<HeaderPriority$>,
): Frame$;
export function Frame$isHeader(value: Frame$): boolean;
export function Frame$Header$0(value: Frame$): Data$;
export function Frame$Header$data(value: Frame$): Data$;
export function Frame$Header$1(value: Frame$): boolean;
export function Frame$Header$end_stream(value: Frame$): boolean;
export function Frame$Header$2(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$Header$identifier(value: Frame$): StreamIdentifier$<
  Frame$
>;
export function Frame$Header$3(value: Frame$): $option.Option$<HeaderPriority$>;
export function Frame$Header$priority(value: Frame$): $option.Option$<
  HeaderPriority$
>;

export class Priority extends _.CustomType {
  /** @deprecated */
  constructor(
    exclusive: boolean,
    identifier: StreamIdentifier$<Frame$>,
    stream_dependency: StreamIdentifier$<Frame$>,
    weight: number
  );
  /** @deprecated */
  exclusive: boolean;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
  /** @deprecated */
  stream_dependency: StreamIdentifier$<Frame$>;
  /** @deprecated */
  weight: number;
}
export function Frame$Priority(
  exclusive: boolean,
  identifier: StreamIdentifier$<Frame$>,
  stream_dependency: StreamIdentifier$<Frame$>,
  weight: number,
): Frame$;
export function Frame$isPriority(value: Frame$): boolean;
export function Frame$Priority$0(value: Frame$): boolean;
export function Frame$Priority$exclusive(value: Frame$): boolean;
export function Frame$Priority$1(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$Priority$identifier(value: Frame$): StreamIdentifier$<
  Frame$
>;
export function Frame$Priority$2(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$Priority$stream_dependency(value: Frame$): StreamIdentifier$<
  Frame$
>;
export function Frame$Priority$3(value: Frame$): number;
export function Frame$Priority$weight(value: Frame$): number;

export class Termination extends _.CustomType {
  /** @deprecated */
  constructor(error: ConnectionError$, identifier: StreamIdentifier$<Frame$>);
  /** @deprecated */
  error: ConnectionError$;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
}
export function Frame$Termination(
  error: ConnectionError$,
  identifier: StreamIdentifier$<Frame$>,
): Frame$;
export function Frame$isTermination(value: Frame$): boolean;
export function Frame$Termination$0(value: Frame$): ConnectionError$;
export function Frame$Termination$error(value: Frame$): ConnectionError$;
export function Frame$Termination$1(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$Termination$identifier(value: Frame$): StreamIdentifier$<
  Frame$
>;

export class Settings extends _.CustomType {
  /** @deprecated */
  constructor(ack: boolean, settings: _.List<Setting$>);
  /** @deprecated */
  ack: boolean;
  /** @deprecated */
  settings: _.List<Setting$>;
}
export function Frame$Settings(
  ack: boolean,
  settings: _.List<Setting$>,
): Frame$;
export function Frame$isSettings(value: Frame$): boolean;
export function Frame$Settings$0(value: Frame$): boolean;
export function Frame$Settings$ack(value: Frame$): boolean;
export function Frame$Settings$1(value: Frame$): _.List<Setting$>;
export function Frame$Settings$settings(value: Frame$): _.List<Setting$>;

export class PushPromise extends _.CustomType {
  /** @deprecated */
  constructor(
    data: Data$,
    identifier: StreamIdentifier$<Frame$>,
    promised_stream_id: StreamIdentifier$<Frame$>
  );
  /** @deprecated */
  data: Data$;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
  /** @deprecated */
  promised_stream_id: StreamIdentifier$<Frame$>;
}
export function Frame$PushPromise(
  data: Data$,
  identifier: StreamIdentifier$<Frame$>,
  promised_stream_id: StreamIdentifier$<Frame$>,
): Frame$;
export function Frame$isPushPromise(value: Frame$): boolean;
export function Frame$PushPromise$0(value: Frame$): Data$;
export function Frame$PushPromise$data(value: Frame$): Data$;
export function Frame$PushPromise$1(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$PushPromise$identifier(value: Frame$): StreamIdentifier$<
  Frame$
>;
export function Frame$PushPromise$2(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$PushPromise$promised_stream_id(value: Frame$): StreamIdentifier$<
  Frame$
>;

export class Ping extends _.CustomType {
  /** @deprecated */
  constructor(ack: boolean, data: _.BitArray);
  /** @deprecated */
  ack: boolean;
  /** @deprecated */
  data: _.BitArray;
}
export function Frame$Ping(ack: boolean, data: _.BitArray): Frame$;
export function Frame$isPing(value: Frame$): boolean;
export function Frame$Ping$0(value: Frame$): boolean;
export function Frame$Ping$ack(value: Frame$): boolean;
export function Frame$Ping$1(value: Frame$): _.BitArray;
export function Frame$Ping$data(value: Frame$): _.BitArray;

export class GoAway extends _.CustomType {
  /** @deprecated */
  constructor(
    data: _.BitArray,
    error: ConnectionError$,
    last_stream_id: StreamIdentifier$<Frame$>
  );
  /** @deprecated */
  data: _.BitArray;
  /** @deprecated */
  error: ConnectionError$;
  /** @deprecated */
  last_stream_id: StreamIdentifier$<Frame$>;
}
export function Frame$GoAway(
  data: _.BitArray,
  error: ConnectionError$,
  last_stream_id: StreamIdentifier$<Frame$>,
): Frame$;
export function Frame$isGoAway(value: Frame$): boolean;
export function Frame$GoAway$0(value: Frame$): _.BitArray;
export function Frame$GoAway$data(value: Frame$): _.BitArray;
export function Frame$GoAway$1(value: Frame$): ConnectionError$;
export function Frame$GoAway$error(value: Frame$): ConnectionError$;
export function Frame$GoAway$2(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$GoAway$last_stream_id(value: Frame$): StreamIdentifier$<
  Frame$
>;

export class WindowUpdate extends _.CustomType {
  /** @deprecated */
  constructor(amount: number, identifier: StreamIdentifier$<Frame$>);
  /** @deprecated */
  amount: number;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
}
export function Frame$WindowUpdate(
  amount: number,
  identifier: StreamIdentifier$<Frame$>,
): Frame$;
export function Frame$isWindowUpdate(value: Frame$): boolean;
export function Frame$WindowUpdate$0(value: Frame$): number;
export function Frame$WindowUpdate$amount(value: Frame$): number;
export function Frame$WindowUpdate$1(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$WindowUpdate$identifier(value: Frame$): StreamIdentifier$<
  Frame$
>;

export class Continuation extends _.CustomType {
  /** @deprecated */
  constructor(data: Data$, identifier: StreamIdentifier$<Frame$>);
  /** @deprecated */
  data: Data$;
  /** @deprecated */
  identifier: StreamIdentifier$<Frame$>;
}
export function Frame$Continuation(
  data: Data$,
  identifier: StreamIdentifier$<Frame$>,
): Frame$;
export function Frame$isContinuation(value: Frame$): boolean;
export function Frame$Continuation$0(value: Frame$): Data$;
export function Frame$Continuation$data(value: Frame$): Data$;
export function Frame$Continuation$1(value: Frame$): StreamIdentifier$<Frame$>;
export function Frame$Continuation$identifier(value: Frame$): StreamIdentifier$<
  Frame$
>;

export type Frame$ = Data | Header | Priority | Termination | Settings | PushPromise | Ping | GoAway | WindowUpdate | Continuation;

export class NoError extends _.CustomType {}
export function ConnectionError$NoError(): ConnectionError$;
export function ConnectionError$isNoError(value: ConnectionError$): boolean;

export class ProtocolError extends _.CustomType {}
export function ConnectionError$ProtocolError(): ConnectionError$;
export function ConnectionError$isProtocolError(
  value: ConnectionError$,
): boolean;

export class InternalError extends _.CustomType {}
export function ConnectionError$InternalError(): ConnectionError$;
export function ConnectionError$isInternalError(
  value: ConnectionError$,
): boolean;

export class FlowControlError extends _.CustomType {}
export function ConnectionError$FlowControlError(): ConnectionError$;
export function ConnectionError$isFlowControlError(
  value: ConnectionError$,
): boolean;

export class SettingsTimeout extends _.CustomType {}
export function ConnectionError$SettingsTimeout(): ConnectionError$;
export function ConnectionError$isSettingsTimeout(
  value: ConnectionError$,
): boolean;

export class StreamClosed extends _.CustomType {}
export function ConnectionError$StreamClosed(): ConnectionError$;
export function ConnectionError$isStreamClosed(
  value: ConnectionError$,
): boolean;

export class FrameSizeError extends _.CustomType {}
export function ConnectionError$FrameSizeError(): ConnectionError$;
export function ConnectionError$isFrameSizeError(
  value: ConnectionError$,
): boolean;

export class RefusedStream extends _.CustomType {}
export function ConnectionError$RefusedStream(): ConnectionError$;
export function ConnectionError$isRefusedStream(
  value: ConnectionError$,
): boolean;

export class Cancel extends _.CustomType {}
export function ConnectionError$Cancel(): ConnectionError$;
export function ConnectionError$isCancel(value: ConnectionError$): boolean;

export class CompressionError extends _.CustomType {}
export function ConnectionError$CompressionError(): ConnectionError$;
export function ConnectionError$isCompressionError(
  value: ConnectionError$,
): boolean;

export class ConnectError extends _.CustomType {}
export function ConnectionError$ConnectError(): ConnectionError$;
export function ConnectionError$isConnectError(
  value: ConnectionError$,
): boolean;

export class EnhanceYourCalm extends _.CustomType {}
export function ConnectionError$EnhanceYourCalm(): ConnectionError$;
export function ConnectionError$isEnhanceYourCalm(
  value: ConnectionError$,
): boolean;

export class InadequateSecurity extends _.CustomType {}
export function ConnectionError$InadequateSecurity(): ConnectionError$;
export function ConnectionError$isInadequateSecurity(
  value: ConnectionError$,
): boolean;

export class Http11Required extends _.CustomType {}
export function ConnectionError$Http11Required(): ConnectionError$;
export function ConnectionError$isHttp11Required(
  value: ConnectionError$,
): boolean;

export class Unsupported extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function ConnectionError$Unsupported($0: number): ConnectionError$;
export function ConnectionError$isUnsupported(value: ConnectionError$): boolean;
export function ConnectionError$Unsupported$0(value: ConnectionError$): number;

export type ConnectionError$ = NoError | ProtocolError | InternalError | FlowControlError | SettingsTimeout | StreamClosed | FrameSizeError | RefusedStream | Cancel | CompressionError | ConnectError | EnhanceYourCalm | InadequateSecurity | Http11Required | Unsupported;

export function stream_identifier(value: number): StreamIdentifier$<Frame$>;

export function get_stream_identifier(identifier: StreamIdentifier$<any>): number;

export function decode(frame: _.BitArray): _.Result<
  [Frame$, _.BitArray],
  ConnectionError$
>;

export function encode(frame: Frame$): _.BitArray;

export function settings_ack(): Frame$;
