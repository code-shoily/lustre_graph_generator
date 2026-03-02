import type * as $socket from "../../../glisten/glisten/socket.d.mts";
import type * as $transport from "../../../glisten/glisten/transport.d.mts";
import type * as _ from "../../gleam.d.mts";

export type FileDescriptor$ = any;

export class IsDir extends _.CustomType {}
export function FileError$IsDir(): FileError$;
export function FileError$isIsDir(value: FileError$): boolean;

export class NoAccess extends _.CustomType {}
export function FileError$NoAccess(): FileError$;
export function FileError$isNoAccess(value: FileError$): boolean;

export class NoEntry extends _.CustomType {}
export function FileError$NoEntry(): FileError$;
export function FileError$isNoEntry(value: FileError$): boolean;

export class UnknownFileError extends _.CustomType {}
export function FileError$UnknownFileError(): FileError$;
export function FileError$isUnknownFileError(value: FileError$): boolean;

export type FileError$ = IsDir | NoAccess | NoEntry | UnknownFileError;

export class FileErr extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FileError$);
  /** @deprecated */
  0: FileError$;
}
export function SendError$FileErr($0: FileError$): SendError$;
export function SendError$isFileErr(value: SendError$): boolean;
export function SendError$FileErr$0(value: SendError$): FileError$;

export class SocketErr extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: $socket.SocketReason$);
  /** @deprecated */
  0: $socket.SocketReason$;
}
export function SendError$SocketErr($0: $socket.SocketReason$): SendError$;
export function SendError$isSocketErr(value: SendError$): boolean;
export function SendError$SocketErr$0(value: SendError$): $socket.SocketReason$;

export type SendError$ = FileErr | SocketErr;

export class File extends _.CustomType {
  /** @deprecated */
  constructor(descriptor: FileDescriptor$, file_size: number);
  /** @deprecated */
  descriptor: FileDescriptor$;
  /** @deprecated */
  file_size: number;
}
export function File$File(
  descriptor: FileDescriptor$,
  file_size: number,
): File$;
export function File$isFile(value: File$): boolean;
export function File$File$0(value: File$): FileDescriptor$;
export function File$File$descriptor(value: File$): FileDescriptor$;
export function File$File$1(value: File$): number;
export function File$File$file_size(value: File$): number;

export type File$ = File;

export function sendfile(
  transport: $transport.Transport$,
  file_descriptor: FileDescriptor$,
  socket: $socket.Socket$,
  offset: number,
  bytes: number,
  options: _.List<any>
): _.Result<undefined, SendError$>;

export function open(file: _.BitArray): _.Result<FileDescriptor$, FileError$>;

export function stat(filename: _.BitArray): _.Result<File$, FileError$>;

export function close(file: FileDescriptor$): _.Result<undefined, FileError$>;
