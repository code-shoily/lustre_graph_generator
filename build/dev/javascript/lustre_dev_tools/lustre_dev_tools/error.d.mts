import type * as $httpc from "../../gleam_httpc/gleam/httpc.d.mts";
import type * as $actor from "../../gleam_otp/gleam/otp/actor.d.mts";
import type * as $simplifile from "../../simplifile/simplifile.d.mts";
import type * as _ from "../gleam.d.mts";

export class CouldNotDownloadBunBinary extends _.CustomType {
  /** @deprecated */
  constructor(reason: $httpc.HttpError$);
  /** @deprecated */
  reason: $httpc.HttpError$;
}
export function Error$CouldNotDownloadBunBinary(
  reason: $httpc.HttpError$,
): Error$;
export function Error$isCouldNotDownloadBunBinary(value: Error$): boolean;
export function Error$CouldNotDownloadBunBinary$0(value: Error$): $httpc.HttpError$;
export function Error$CouldNotDownloadBunBinary$reason(
  value: Error$,
): $httpc.HttpError$;

export class CouldNotDownloadTailwindBinary extends _.CustomType {
  /** @deprecated */
  constructor(reason: $httpc.HttpError$);
  /** @deprecated */
  reason: $httpc.HttpError$;
}
export function Error$CouldNotDownloadTailwindBinary(
  reason: $httpc.HttpError$,
): Error$;
export function Error$isCouldNotDownloadTailwindBinary(value: Error$): boolean;
export function Error$CouldNotDownloadTailwindBinary$0(value: Error$): $httpc.HttpError$;
export function Error$CouldNotDownloadTailwindBinary$reason(
  value: Error$,
): $httpc.HttpError$;

export class CouldNotExtractBunArchive extends _.CustomType {
  /** @deprecated */
  constructor(os: string, arch: string, version: string);
  /** @deprecated */
  os: string;
  /** @deprecated */
  arch: string;
  /** @deprecated */
  version: string;
}
export function Error$CouldNotExtractBunArchive(
  os: string,
  arch: string,
  version: string,
): Error$;
export function Error$isCouldNotExtractBunArchive(value: Error$): boolean;
export function Error$CouldNotExtractBunArchive$0(value: Error$): string;
export function Error$CouldNotExtractBunArchive$os(value: Error$): string;
export function Error$CouldNotExtractBunArchive$1(value: Error$): string;
export function Error$CouldNotExtractBunArchive$arch(value: Error$): string;
export function Error$CouldNotExtractBunArchive$2(value: Error$): string;
export function Error$CouldNotExtractBunArchive$version(value: Error$): string;

export class CouldNotInitialiseDevTools extends _.CustomType {
  /** @deprecated */
  constructor(reason: $simplifile.FileError$);
  /** @deprecated */
  reason: $simplifile.FileError$;
}
export function Error$CouldNotInitialiseDevTools(
  reason: $simplifile.FileError$,
): Error$;
export function Error$isCouldNotInitialiseDevTools(value: Error$): boolean;
export function Error$CouldNotInitialiseDevTools$0(value: Error$): $simplifile.FileError$;
export function Error$CouldNotInitialiseDevTools$reason(
  value: Error$,
): $simplifile.FileError$;

export class CouldNotLocateBunBinary extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Error$CouldNotLocateBunBinary(path: string): Error$;
export function Error$isCouldNotLocateBunBinary(value: Error$): boolean;
export function Error$CouldNotLocateBunBinary$0(value: Error$): string;
export function Error$CouldNotLocateBunBinary$path(value: Error$): string;

export class CouldNotLocateTailwindBinary extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Error$CouldNotLocateTailwindBinary(path: string): Error$;
export function Error$isCouldNotLocateTailwindBinary(value: Error$): boolean;
export function Error$CouldNotLocateTailwindBinary$0(value: Error$): string;
export function Error$CouldNotLocateTailwindBinary$path(value: Error$): string;

export class CouldNotLocateGleamBinary extends _.CustomType {}
export function Error$CouldNotLocateGleamBinary(): Error$;
export function Error$isCouldNotLocateGleamBinary(value: Error$): boolean;

export class CouldNotReadFile extends _.CustomType {
  /** @deprecated */
  constructor(path: string, reason: $simplifile.FileError$);
  /** @deprecated */
  path: string;
  /** @deprecated */
  reason: $simplifile.FileError$;
}
export function Error$CouldNotReadFile(
  path: string,
  reason: $simplifile.FileError$,
): Error$;
export function Error$isCouldNotReadFile(value: Error$): boolean;
export function Error$CouldNotReadFile$0(value: Error$): string;
export function Error$CouldNotReadFile$path(value: Error$): string;
export function Error$CouldNotReadFile$1(value: Error$): $simplifile.FileError$;
export function Error$CouldNotReadFile$reason(value: Error$): $simplifile.FileError$;

export class CouldNotSetFilePermissions extends _.CustomType {
  /** @deprecated */
  constructor(path: string, reason: $simplifile.FileError$);
  /** @deprecated */
  path: string;
  /** @deprecated */
  reason: $simplifile.FileError$;
}
export function Error$CouldNotSetFilePermissions(
  path: string,
  reason: $simplifile.FileError$,
): Error$;
export function Error$isCouldNotSetFilePermissions(value: Error$): boolean;
export function Error$CouldNotSetFilePermissions$0(value: Error$): string;
export function Error$CouldNotSetFilePermissions$path(value: Error$): string;
export function Error$CouldNotSetFilePermissions$1(value: Error$): $simplifile.FileError$;
export function Error$CouldNotSetFilePermissions$reason(
  value: Error$,
): $simplifile.FileError$;

export class CouldNotStartDevServer extends _.CustomType {
  /** @deprecated */
  constructor(reason: $actor.StartError$);
  /** @deprecated */
  reason: $actor.StartError$;
}
export function Error$CouldNotStartDevServer(
  reason: $actor.StartError$,
): Error$;
export function Error$isCouldNotStartDevServer(value: Error$): boolean;
export function Error$CouldNotStartDevServer$0(value: Error$): $actor.StartError$;
export function Error$CouldNotStartDevServer$reason(
  value: Error$,
): $actor.StartError$;

export class CouldNotStartFileWatcher extends _.CustomType {
  /** @deprecated */
  constructor(watcher: string, os: string, arch: string);
  /** @deprecated */
  watcher: string;
  /** @deprecated */
  os: string;
  /** @deprecated */
  arch: string;
}
export function Error$CouldNotStartFileWatcher(
  watcher: string,
  os: string,
  arch: string,
): Error$;
export function Error$isCouldNotStartFileWatcher(value: Error$): boolean;
export function Error$CouldNotStartFileWatcher$0(value: Error$): string;
export function Error$CouldNotStartFileWatcher$watcher(value: Error$): string;
export function Error$CouldNotStartFileWatcher$1(value: Error$): string;
export function Error$CouldNotStartFileWatcher$os(value: Error$): string;
export function Error$CouldNotStartFileWatcher$2(value: Error$): string;
export function Error$CouldNotStartFileWatcher$arch(value: Error$): string;

export class CouldNotVerifyBunHash extends _.CustomType {
  /** @deprecated */
  constructor(expected: string, actual: string);
  /** @deprecated */
  expected: string;
  /** @deprecated */
  actual: string;
}
export function Error$CouldNotVerifyBunHash(
  expected: string,
  actual: string,
): Error$;
export function Error$isCouldNotVerifyBunHash(value: Error$): boolean;
export function Error$CouldNotVerifyBunHash$0(value: Error$): string;
export function Error$CouldNotVerifyBunHash$expected(value: Error$): string;
export function Error$CouldNotVerifyBunHash$1(value: Error$): string;
export function Error$CouldNotVerifyBunHash$actual(value: Error$): string;

export class CouldNotVerifyTailwindHash extends _.CustomType {
  /** @deprecated */
  constructor(expected: string, actual: string);
  /** @deprecated */
  expected: string;
  /** @deprecated */
  actual: string;
}
export function Error$CouldNotVerifyTailwindHash(
  expected: string,
  actual: string,
): Error$;
export function Error$isCouldNotVerifyTailwindHash(value: Error$): boolean;
export function Error$CouldNotVerifyTailwindHash$0(value: Error$): string;
export function Error$CouldNotVerifyTailwindHash$expected(value: Error$): string;
export function Error$CouldNotVerifyTailwindHash$1(
  value: Error$,
): string;
export function Error$CouldNotVerifyTailwindHash$actual(value: Error$): string;

export class CouldNotWriteFile extends _.CustomType {
  /** @deprecated */
  constructor(path: string, reason: $simplifile.FileError$);
  /** @deprecated */
  path: string;
  /** @deprecated */
  reason: $simplifile.FileError$;
}
export function Error$CouldNotWriteFile(
  path: string,
  reason: $simplifile.FileError$,
): Error$;
export function Error$isCouldNotWriteFile(value: Error$): boolean;
export function Error$CouldNotWriteFile$0(value: Error$): string;
export function Error$CouldNotWriteFile$path(value: Error$): string;
export function Error$CouldNotWriteFile$1(value: Error$): $simplifile.FileError$;
export function Error$CouldNotWriteFile$reason(
  value: Error$,
): $simplifile.FileError$;

export class ExternalCommandFailed extends _.CustomType {
  /** @deprecated */
  constructor(command: string, reason: string);
  /** @deprecated */
  command: string;
  /** @deprecated */
  reason: string;
}
export function Error$ExternalCommandFailed(
  command: string,
  reason: string,
): Error$;
export function Error$isExternalCommandFailed(value: Error$): boolean;
export function Error$ExternalCommandFailed$0(value: Error$): string;
export function Error$ExternalCommandFailed$command(value: Error$): string;
export function Error$ExternalCommandFailed$1(value: Error$): string;
export function Error$ExternalCommandFailed$reason(value: Error$): string;

export class FailedToBuildProject extends _.CustomType {
  /** @deprecated */
  constructor(reason: string);
  /** @deprecated */
  reason: string;
}
export function Error$FailedToBuildProject(reason: string): Error$;
export function Error$isFailedToBuildProject(value: Error$): boolean;
export function Error$FailedToBuildProject$0(value: Error$): string;
export function Error$FailedToBuildProject$reason(value: Error$): string;

export class MissingRequiredFlag extends _.CustomType {
  /** @deprecated */
  constructor(name: _.List<string>);
  /** @deprecated */
  name: _.List<string>;
}
export function Error$MissingRequiredFlag(name: _.List<string>): Error$;
export function Error$isMissingRequiredFlag(value: Error$): boolean;
export function Error$MissingRequiredFlag$0(value: Error$): _.List<string>;
export function Error$MissingRequiredFlag$name(value: Error$): _.List<string>;

export class MustBeProjectRoot extends _.CustomType {
  /** @deprecated */
  constructor(path: string);
  /** @deprecated */
  path: string;
}
export function Error$MustBeProjectRoot(path: string): Error$;
export function Error$isMustBeProjectRoot(value: Error$): boolean;
export function Error$MustBeProjectRoot$0(value: Error$): string;
export function Error$MustBeProjectRoot$path(value: Error$): string;

export class ProxyInvalidTo extends _.CustomType {}
export function Error$ProxyInvalidTo(): Error$;
export function Error$isProxyInvalidTo(value: Error$): boolean;

export class ProxyMissingFrom extends _.CustomType {}
export function Error$ProxyMissingFrom(): Error$;
export function Error$isProxyMissingFrom(value: Error$): boolean;

export class ProxyMissingTo extends _.CustomType {}
export function Error$ProxyMissingTo(): Error$;
export function Error$isProxyMissingTo(value: Error$): boolean;

export class UnknownBuildTool extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}
export function Error$UnknownBuildTool(name: string): Error$;
export function Error$isUnknownBuildTool(value: Error$): boolean;
export function Error$UnknownBuildTool$0(value: Error$): string;
export function Error$UnknownBuildTool$name(value: Error$): string;

export class UnknownGleamModule extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}
export function Error$UnknownGleamModule(name: string): Error$;
export function Error$isUnknownGleamModule(value: Error$): boolean;
export function Error$UnknownGleamModule$0(value: Error$): string;
export function Error$UnknownGleamModule$name(value: Error$): string;

export class UnknownIntegration extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}
export function Error$UnknownIntegration(name: string): Error$;
export function Error$isUnknownIntegration(value: Error$): boolean;
export function Error$UnknownIntegration$0(value: Error$): string;
export function Error$UnknownIntegration$name(value: Error$): string;

export class UnknownWatchStrategy extends _.CustomType {
  /** @deprecated */
  constructor(name: string);
  /** @deprecated */
  name: string;
}
export function Error$UnknownWatchStrategy(name: string): Error$;
export function Error$isUnknownWatchStrategy(value: Error$): boolean;
export function Error$UnknownWatchStrategy$0(value: Error$): string;
export function Error$UnknownWatchStrategy$name(value: Error$): string;

export class UnsupportedBunVersion extends _.CustomType {
  /** @deprecated */
  constructor(path: string, expected: string, actual: string);
  /** @deprecated */
  path: string;
  /** @deprecated */
  expected: string;
  /** @deprecated */
  actual: string;
}
export function Error$UnsupportedBunVersion(
  path: string,
  expected: string,
  actual: string,
): Error$;
export function Error$isUnsupportedBunVersion(value: Error$): boolean;
export function Error$UnsupportedBunVersion$0(value: Error$): string;
export function Error$UnsupportedBunVersion$path(value: Error$): string;
export function Error$UnsupportedBunVersion$1(value: Error$): string;
export function Error$UnsupportedBunVersion$expected(value: Error$): string;
export function Error$UnsupportedBunVersion$2(value: Error$): string;
export function Error$UnsupportedBunVersion$actual(value: Error$): string;

export class UnsupportedPlatform extends _.CustomType {
  /** @deprecated */
  constructor(os: string, arch: string);
  /** @deprecated */
  os: string;
  /** @deprecated */
  arch: string;
}
export function Error$UnsupportedPlatform(os: string, arch: string): Error$;
export function Error$isUnsupportedPlatform(value: Error$): boolean;
export function Error$UnsupportedPlatform$0(value: Error$): string;
export function Error$UnsupportedPlatform$os(value: Error$): string;
export function Error$UnsupportedPlatform$1(value: Error$): string;
export function Error$UnsupportedPlatform$arch(value: Error$): string;

export class UnsupportedTailwindVersion extends _.CustomType {
  /** @deprecated */
  constructor(path: string, expected: string, actual: string);
  /** @deprecated */
  path: string;
  /** @deprecated */
  expected: string;
  /** @deprecated */
  actual: string;
}
export function Error$UnsupportedTailwindVersion(
  path: string,
  expected: string,
  actual: string,
): Error$;
export function Error$isUnsupportedTailwindVersion(value: Error$): boolean;
export function Error$UnsupportedTailwindVersion$0(value: Error$): string;
export function Error$UnsupportedTailwindVersion$path(value: Error$): string;
export function Error$UnsupportedTailwindVersion$1(value: Error$): string;
export function Error$UnsupportedTailwindVersion$expected(value: Error$): string;
export function Error$UnsupportedTailwindVersion$2(
  value: Error$,
): string;
export function Error$UnsupportedTailwindVersion$actual(value: Error$): string;

export type Error$ = CouldNotDownloadBunBinary | CouldNotDownloadTailwindBinary | CouldNotExtractBunArchive | CouldNotInitialiseDevTools | CouldNotLocateBunBinary | CouldNotLocateTailwindBinary | CouldNotLocateGleamBinary | CouldNotReadFile | CouldNotSetFilePermissions | CouldNotStartDevServer | CouldNotStartFileWatcher | CouldNotVerifyBunHash | CouldNotVerifyTailwindHash | CouldNotWriteFile | ExternalCommandFailed | FailedToBuildProject | MissingRequiredFlag | MustBeProjectRoot | ProxyInvalidTo | ProxyMissingFrom | ProxyMissingTo | UnknownBuildTool | UnknownGleamModule | UnknownIntegration | UnknownWatchStrategy | UnsupportedBunVersion | UnsupportedPlatform | UnsupportedTailwindVersion;

export function explain(error: Error$): string;
