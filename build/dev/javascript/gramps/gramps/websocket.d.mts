import type * as $bytes_tree from "../../gleam_stdlib/gleam/bytes_tree.d.mts";
import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../gleam.d.mts";
import type * as $compression from "../gramps/websocket/compression.d.mts";

export class TextFrame extends _.CustomType {
  /** @deprecated */
  constructor(payload: _.BitArray);
  /** @deprecated */
  payload: _.BitArray;
}
export function DataFrame$TextFrame(payload: _.BitArray): DataFrame$;
export function DataFrame$isTextFrame(value: DataFrame$): boolean;
export function DataFrame$TextFrame$0(value: DataFrame$): _.BitArray;
export function DataFrame$TextFrame$payload(value: DataFrame$): _.BitArray;

export class BinaryFrame extends _.CustomType {
  /** @deprecated */
  constructor(payload: _.BitArray);
  /** @deprecated */
  payload: _.BitArray;
}
export function DataFrame$BinaryFrame(payload: _.BitArray): DataFrame$;
export function DataFrame$isBinaryFrame(value: DataFrame$): boolean;
export function DataFrame$BinaryFrame$0(value: DataFrame$): _.BitArray;
export function DataFrame$BinaryFrame$payload(value: DataFrame$): _.BitArray;

export type DataFrame$ = TextFrame | BinaryFrame;

export function DataFrame$payload(value: DataFrame$): _.BitArray;

export class NotProvided extends _.CustomType {}
export function CloseReason$NotProvided(): CloseReason$;
export function CloseReason$isNotProvided(value: CloseReason$): boolean;

export class Normal extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$Normal(body: _.BitArray): CloseReason$;
export function CloseReason$isNormal(value: CloseReason$): boolean;
export function CloseReason$Normal$0(value: CloseReason$): _.BitArray;
export function CloseReason$Normal$body(value: CloseReason$): _.BitArray;

export class GoingAway extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$GoingAway(body: _.BitArray): CloseReason$;
export function CloseReason$isGoingAway(value: CloseReason$): boolean;
export function CloseReason$GoingAway$0(value: CloseReason$): _.BitArray;
export function CloseReason$GoingAway$body(value: CloseReason$): _.BitArray;

export class ProtocolError extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$ProtocolError(body: _.BitArray): CloseReason$;
export function CloseReason$isProtocolError(value: CloseReason$): boolean;
export function CloseReason$ProtocolError$0(value: CloseReason$): _.BitArray;
export function CloseReason$ProtocolError$body(value: CloseReason$): _.BitArray;

export class UnexpectedDataType extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$UnexpectedDataType(body: _.BitArray): CloseReason$;
export function CloseReason$isUnexpectedDataType(value: CloseReason$): boolean;
export function CloseReason$UnexpectedDataType$0(value: CloseReason$): _.BitArray;
export function CloseReason$UnexpectedDataType$body(
  value: CloseReason$,
): _.BitArray;

export class InconsistentDataType extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$InconsistentDataType(
  body: _.BitArray,
): CloseReason$;
export function CloseReason$isInconsistentDataType(
  value: CloseReason$,
): boolean;
export function CloseReason$InconsistentDataType$0(value: CloseReason$): _.BitArray;
export function CloseReason$InconsistentDataType$body(
  value: CloseReason$,
): _.BitArray;

export class PolicyViolation extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$PolicyViolation(body: _.BitArray): CloseReason$;
export function CloseReason$isPolicyViolation(value: CloseReason$): boolean;
export function CloseReason$PolicyViolation$0(value: CloseReason$): _.BitArray;
export function CloseReason$PolicyViolation$body(value: CloseReason$): _.BitArray;

export class MessageTooBig extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$MessageTooBig(body: _.BitArray): CloseReason$;
export function CloseReason$isMessageTooBig(value: CloseReason$): boolean;
export function CloseReason$MessageTooBig$0(value: CloseReason$): _.BitArray;
export function CloseReason$MessageTooBig$body(value: CloseReason$): _.BitArray;

export class MissingExtensions extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$MissingExtensions(body: _.BitArray): CloseReason$;
export function CloseReason$isMissingExtensions(value: CloseReason$): boolean;
export function CloseReason$MissingExtensions$0(value: CloseReason$): _.BitArray;
export function CloseReason$MissingExtensions$body(
  value: CloseReason$,
): _.BitArray;

export class UnexpectedCondition extends _.CustomType {
  /** @deprecated */
  constructor(body: _.BitArray);
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$UnexpectedCondition(body: _.BitArray): CloseReason$;
export function CloseReason$isUnexpectedCondition(value: CloseReason$): boolean;
export function CloseReason$UnexpectedCondition$0(value: CloseReason$): _.BitArray;
export function CloseReason$UnexpectedCondition$body(
  value: CloseReason$,
): _.BitArray;

export class CustomCloseReason extends _.CustomType {
  /** @deprecated */
  constructor(code: number, body: _.BitArray);
  /** @deprecated */
  code: number;
  /** @deprecated */
  body: _.BitArray;
}
export function CloseReason$CustomCloseReason(
  code: number,
  body: _.BitArray,
): CloseReason$;
export function CloseReason$isCustomCloseReason(value: CloseReason$): boolean;
export function CloseReason$CustomCloseReason$0(value: CloseReason$): number;
export function CloseReason$CustomCloseReason$code(value: CloseReason$): number;
export function CloseReason$CustomCloseReason$1(value: CloseReason$): _.BitArray;
export function CloseReason$CustomCloseReason$body(
  value: CloseReason$,
): _.BitArray;

export type CloseReason$ = NotProvided | Normal | GoingAway | ProtocolError | UnexpectedDataType | InconsistentDataType | PolicyViolation | MessageTooBig | MissingExtensions | UnexpectedCondition | CustomCloseReason;

export class CloseFrame extends _.CustomType {
  /** @deprecated */
  constructor(reason: CloseReason$);
  /** @deprecated */
  reason: CloseReason$;
}
export function ControlFrame$CloseFrame(reason: CloseReason$): ControlFrame$;
export function ControlFrame$isCloseFrame(value: ControlFrame$): boolean;
export function ControlFrame$CloseFrame$0(value: ControlFrame$): CloseReason$;
export function ControlFrame$CloseFrame$reason(value: ControlFrame$): CloseReason$;

export class PingFrame extends _.CustomType {
  /** @deprecated */
  constructor(payload: _.BitArray);
  /** @deprecated */
  payload: _.BitArray;
}
export function ControlFrame$PingFrame(payload: _.BitArray): ControlFrame$;
export function ControlFrame$isPingFrame(value: ControlFrame$): boolean;
export function ControlFrame$PingFrame$0(value: ControlFrame$): _.BitArray;
export function ControlFrame$PingFrame$payload(value: ControlFrame$): _.BitArray;

export class PongFrame extends _.CustomType {
  /** @deprecated */
  constructor(payload: _.BitArray);
  /** @deprecated */
  payload: _.BitArray;
}
export function ControlFrame$PongFrame(payload: _.BitArray): ControlFrame$;
export function ControlFrame$isPongFrame(value: ControlFrame$): boolean;
export function ControlFrame$PongFrame$0(value: ControlFrame$): _.BitArray;
export function ControlFrame$PongFrame$payload(value: ControlFrame$): _.BitArray;

export type ControlFrame$ = CloseFrame | PingFrame | PongFrame;

export class Data extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: DataFrame$);
  /** @deprecated */
  0: DataFrame$;
}
export function Frame$Data($0: DataFrame$): Frame$;
export function Frame$isData(value: Frame$): boolean;
export function Frame$Data$0(value: Frame$): DataFrame$;

export class Control extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: ControlFrame$);
  /** @deprecated */
  0: ControlFrame$;
}
export function Frame$Control($0: ControlFrame$): Frame$;
export function Frame$isControl(value: Frame$): boolean;
export function Frame$Control$0(value: Frame$): ControlFrame$;

export class Continuation extends _.CustomType {
  /** @deprecated */
  constructor(length: number, payload: _.BitArray);
  /** @deprecated */
  length: number;
  /** @deprecated */
  payload: _.BitArray;
}
export function Frame$Continuation(length: number, payload: _.BitArray): Frame$;
export function Frame$isContinuation(value: Frame$): boolean;
export function Frame$Continuation$0(value: Frame$): number;
export function Frame$Continuation$length(value: Frame$): number;
export function Frame$Continuation$1(value: Frame$): _.BitArray;
export function Frame$Continuation$payload(value: Frame$): _.BitArray;

export type Frame$ = Data | Control | Continuation;

export class NeedMoreData extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: _.BitArray);
  /** @deprecated */
  0: _.BitArray;
}
export function FrameParseError$NeedMoreData($0: _.BitArray): FrameParseError$;
export function FrameParseError$isNeedMoreData(
  value: FrameParseError$,
): boolean;
export function FrameParseError$NeedMoreData$0(value: FrameParseError$): _.BitArray;

export class InvalidFrame extends _.CustomType {}
export function FrameParseError$InvalidFrame(): FrameParseError$;
export function FrameParseError$isInvalidFrame(
  value: FrameParseError$,
): boolean;

export type FrameParseError$ = NeedMoreData | InvalidFrame;

export class Complete extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Frame$);
  /** @deprecated */
  0: Frame$;
}
export function ParsedFrame$Complete($0: Frame$): ParsedFrame$;
export function ParsedFrame$isComplete(value: ParsedFrame$): boolean;
export function ParsedFrame$Complete$0(value: ParsedFrame$): Frame$;

export class Incomplete extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: Frame$);
  /** @deprecated */
  0: Frame$;
}
export function ParsedFrame$Incomplete($0: Frame$): ParsedFrame$;
export function ParsedFrame$isIncomplete(value: ParsedFrame$): boolean;
export function ParsedFrame$Incomplete$0(value: ParsedFrame$): Frame$;

export type ParsedFrame$ = Complete | Incomplete;

declare class Compressed extends _.CustomType {}

declare class Uncompressed extends _.CustomType {}

type Compression$ = Compressed | Uncompressed;

declare class Sha extends _.CustomType {}

type ShaHash$ = Sha;

export function apply_mask(data: _.BitArray, mask: $option.Option$<_.BitArray>): _.BitArray;

export function encode_close_frame(
  reason: CloseReason$,
  mask: $option.Option$<_.BitArray>
): $bytes_tree.BytesTree$;

export function encode_continuation_frame(
  data: _.BitArray,
  total_size: number,
  mask: $option.Option$<_.BitArray>
): $bytes_tree.BytesTree$;

export function apply_deflate(
  data: _.BitArray,
  context: $option.Option$<$compression.Context$>
): _.BitArray;

export function apply_inflate(
  data: _.BitArray,
  context: $option.Option$<$compression.Context$>
): _.BitArray;

export function encode_text_frame(
  data: string,
  context: $option.Option$<$compression.Context$>,
  mask: $option.Option$<_.BitArray>
): $bytes_tree.BytesTree$;

export function encode_binary_frame(
  data: _.BitArray,
  context: $option.Option$<$compression.Context$>,
  mask: $option.Option$<_.BitArray>
): $bytes_tree.BytesTree$;

export function encode_ping_frame(
  data: _.BitArray,
  mask: $option.Option$<_.BitArray>
): $bytes_tree.BytesTree$;

export function encode_pong_frame(
  data: _.BitArray,
  mask: $option.Option$<_.BitArray>
): $bytes_tree.BytesTree$;

export function aggregate_frames(
  frames: _.List<ParsedFrame$>,
  previous: $option.Option$<Frame$>,
  joined: _.List<Frame$>
): _.Result<_.List<Frame$>, undefined>;

export function make_client_key(): string;

export function decode_frame(
  message: _.BitArray,
  context: $option.Option$<$compression.Context$>
): _.Result<[ParsedFrame$, _.BitArray], FrameParseError$>;

export function decode_many_frames(
  data: _.BitArray,
  context: $option.Option$<$compression.Context$>,
  frames: _.List<ParsedFrame$>
): [_.List<ParsedFrame$>, _.BitArray];

export function has_deflate(extensions: _.List<string>): boolean;

export function get_context_takeovers(extensions: _.List<string>): $compression.ContextTakeover$;

export function parse_websocket_key(key: string): string;
