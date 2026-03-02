import type * as _ from "../gleam.d.mts";

export class Connection extends _.CustomType {
  /** @deprecated */
  constructor(
    reader: (x0: number) => _.Result<Read$, undefined>,
    max_body_size: number,
    max_files_size: number,
    read_chunk_size: number,
    secret_key_base: string,
    temporary_directory: string
  );
  /** @deprecated */
  reader: (x0: number) => _.Result<Read$, undefined>;
  /** @deprecated */
  max_body_size: number;
  /** @deprecated */
  max_files_size: number;
  /** @deprecated */
  read_chunk_size: number;
  /** @deprecated */
  secret_key_base: string;
  /** @deprecated */
  temporary_directory: string;
}
export function Connection$Connection(
  reader: (x0: number) => _.Result<Read$, undefined>,
  max_body_size: number,
  max_files_size: number,
  read_chunk_size: number,
  secret_key_base: string,
  temporary_directory: string,
): Connection$;
export function Connection$isConnection(value: Connection$): boolean;
export function Connection$Connection$0(value: Connection$): (x0: number) => _.Result<
  Read$,
  undefined
>;
export function Connection$Connection$reader(value: Connection$): (x0: number) => _.Result<
  Read$,
  undefined
>;
export function Connection$Connection$1(value: Connection$): number;
export function Connection$Connection$max_body_size(value: Connection$): number;
export function Connection$Connection$2(value: Connection$): number;
export function Connection$Connection$max_files_size(value: Connection$): number;
export function Connection$Connection$3(
  value: Connection$,
): number;
export function Connection$Connection$read_chunk_size(value: Connection$): number;
export function Connection$Connection$4(
  value: Connection$,
): string;
export function Connection$Connection$secret_key_base(value: Connection$): string;
export function Connection$Connection$5(
  value: Connection$,
): string;
export function Connection$Connection$temporary_directory(value: Connection$): string;

export type Connection$ = Connection;

export class Chunk extends _.CustomType {
  /** @deprecated */
  constructor(
    argument$0: _.BitArray,
    next: (x0: number) => _.Result<Read$, undefined>
  );
  /** @deprecated */
  0: _.BitArray;
  /** @deprecated */
  next: (x0: number) => _.Result<Read$, undefined>;
}
export function Read$Chunk(
  $0: _.BitArray,
  next: (x0: number) => _.Result<Read$, undefined>,
): Read$;
export function Read$isChunk(value: Read$): boolean;
export function Read$Chunk$0(value: Read$): _.BitArray;
export function Read$Chunk$1(value: Read$): (x0: number) => _.Result<
  Read$,
  undefined
>;
export function Read$Chunk$next(value: Read$): (x0: number) => _.Result<
  Read$,
  undefined
>;

export class ReadingFinished extends _.CustomType {}
export function Read$ReadingFinished(): Read$;
export function Read$isReadingFinished(value: Read$): boolean;

export type Read$ = Chunk | ReadingFinished;

export type Reader = (x0: number) => _.Result<Read$, undefined>;

export function remove_preceeding_slashes(string: string): string;

export function random_string(length: number): string;

export function random_slug(): string;

export function make_connection(
  body_reader: (x0: number) => _.Result<Read$, undefined>,
  secret_key_base: string
): Connection$;

export function generate_etag(file_size: number, mtime_seconds: number): string;
