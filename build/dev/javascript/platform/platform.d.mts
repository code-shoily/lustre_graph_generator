import type * as _ from "./gleam.d.mts";

export class Erlang extends _.CustomType {}
export function Runtime$Erlang(): Runtime$;
export function Runtime$isErlang(value: Runtime$): boolean;

export class Node extends _.CustomType {}
export function Runtime$Node(): Runtime$;
export function Runtime$isNode(value: Runtime$): boolean;

export class Bun extends _.CustomType {}
export function Runtime$Bun(): Runtime$;
export function Runtime$isBun(value: Runtime$): boolean;

export class Deno extends _.CustomType {}
export function Runtime$Deno(): Runtime$;
export function Runtime$isDeno(value: Runtime$): boolean;

export class Browser extends _.CustomType {}
export function Runtime$Browser(): Runtime$;
export function Runtime$isBrowser(value: Runtime$): boolean;

export class OtherRuntime extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Runtime$OtherRuntime($0: string): Runtime$;
export function Runtime$isOtherRuntime(value: Runtime$): boolean;
export function Runtime$OtherRuntime$0(value: Runtime$): string;

export type Runtime$ = Erlang | Node | Bun | Deno | Browser | OtherRuntime;

export class Aix extends _.CustomType {}
export function Os$Aix(): Os$;
export function Os$isAix(value: Os$): boolean;

export class Darwin extends _.CustomType {}
export function Os$Darwin(): Os$;
export function Os$isDarwin(value: Os$): boolean;

export class FreeBsd extends _.CustomType {}
export function Os$FreeBsd(): Os$;
export function Os$isFreeBsd(value: Os$): boolean;

export class Linux extends _.CustomType {}
export function Os$Linux(): Os$;
export function Os$isLinux(value: Os$): boolean;

export class OpenBsd extends _.CustomType {}
export function Os$OpenBsd(): Os$;
export function Os$isOpenBsd(value: Os$): boolean;

export class SunOs extends _.CustomType {}
export function Os$SunOs(): Os$;
export function Os$isSunOs(value: Os$): boolean;

export class Win32 extends _.CustomType {}
export function Os$Win32(): Os$;
export function Os$isWin32(value: Os$): boolean;

export class OtherOs extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Os$OtherOs($0: string): Os$;
export function Os$isOtherOs(value: Os$): boolean;
export function Os$OtherOs$0(value: Os$): string;

export type Os$ = Aix | Darwin | FreeBsd | Linux | OpenBsd | SunOs | Win32 | OtherOs;

export class Arm extends _.CustomType {}
export function Arch$Arm(): Arch$;
export function Arch$isArm(value: Arch$): boolean;

export class Arm64 extends _.CustomType {}
export function Arch$Arm64(): Arch$;
export function Arch$isArm64(value: Arch$): boolean;

export class X86 extends _.CustomType {}
export function Arch$X86(): Arch$;
export function Arch$isX86(value: Arch$): boolean;

export class X64 extends _.CustomType {}
export function Arch$X64(): Arch$;
export function Arch$isX64(value: Arch$): boolean;

export class Loong64 extends _.CustomType {}
export function Arch$Loong64(): Arch$;
export function Arch$isLoong64(value: Arch$): boolean;

export class Mips extends _.CustomType {}
export function Arch$Mips(): Arch$;
export function Arch$isMips(value: Arch$): boolean;

export class MipsLittleEndian extends _.CustomType {}
export function Arch$MipsLittleEndian(): Arch$;
export function Arch$isMipsLittleEndian(value: Arch$): boolean;

export class PPC extends _.CustomType {}
export function Arch$PPC(): Arch$;
export function Arch$isPPC(value: Arch$): boolean;

export class PPC64 extends _.CustomType {}
export function Arch$PPC64(): Arch$;
export function Arch$isPPC64(value: Arch$): boolean;

export class RiscV64 extends _.CustomType {}
export function Arch$RiscV64(): Arch$;
export function Arch$isRiscV64(value: Arch$): boolean;

export class S390 extends _.CustomType {}
export function Arch$S390(): Arch$;
export function Arch$isS390(value: Arch$): boolean;

export class S390X extends _.CustomType {}
export function Arch$S390X(): Arch$;
export function Arch$isS390X(value: Arch$): boolean;

export class OtherArch extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Arch$OtherArch($0: string): Arch$;
export function Arch$isOtherArch(value: Arch$): boolean;
export function Arch$OtherArch$0(value: Arch$): string;

export type Arch$ = Arm | Arm64 | X86 | X64 | Loong64 | Mips | MipsLittleEndian | PPC | PPC64 | RiscV64 | S390 | S390X | OtherArch;

export function runtime(): Runtime$;

export function os(): Os$;

export function arch(): Arch$;
