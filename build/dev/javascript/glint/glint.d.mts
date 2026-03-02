import type * as $colour from "../gleam_community_colour/gleam_community/colour.d.mts";
import type * as $dict from "../gleam_stdlib/gleam/dict.d.mts";
import type * as $option from "../gleam_stdlib/gleam/option.d.mts";
import type * as $snag from "../snag/snag.d.mts";
import type * as _ from "./gleam.d.mts";
import type * as $help from "./glint/internal/help.d.mts";

declare class Config extends _.CustomType {
  /** @deprecated */
  constructor(
    pretty_help: $option.Option$<PrettyHelp$>,
    name: $option.Option$<string>,
    as_module: boolean,
    description: $option.Option$<string>,
    exit: boolean,
    indent_width: number,
    max_output_width: number,
    min_first_column_width: number,
    column_gap: number
  );
  /** @deprecated */
  pretty_help: $option.Option$<PrettyHelp$>;
  /** @deprecated */
  name: $option.Option$<string>;
  /** @deprecated */
  as_module: boolean;
  /** @deprecated */
  description: $option.Option$<string>;
  /** @deprecated */
  exit: boolean;
  /** @deprecated */
  indent_width: number;
  /** @deprecated */
  max_output_width: number;
  /** @deprecated */
  min_first_column_width: number;
  /** @deprecated */
  column_gap: number;
}

type Config$ = Config;

export class PrettyHelp extends _.CustomType {
  /** @deprecated */
  constructor(
    usage: $colour.Colour$,
    flags: $colour.Colour$,
    subcommands: $colour.Colour$
  );
  /** @deprecated */
  usage: $colour.Colour$;
  /** @deprecated */
  flags: $colour.Colour$;
  /** @deprecated */
  subcommands: $colour.Colour$;
}
export function PrettyHelp$PrettyHelp(
  usage: $colour.Colour$,
  flags: $colour.Colour$,
  subcommands: $colour.Colour$,
): PrettyHelp$;
export function PrettyHelp$isPrettyHelp(value: PrettyHelp$): boolean;
export function PrettyHelp$PrettyHelp$0(value: PrettyHelp$): $colour.Colour$;
export function PrettyHelp$PrettyHelp$usage(value: PrettyHelp$): $colour.Colour$;
export function PrettyHelp$PrettyHelp$1(
  value: PrettyHelp$,
): $colour.Colour$;
export function PrettyHelp$PrettyHelp$flags(value: PrettyHelp$): $colour.Colour$;
export function PrettyHelp$PrettyHelp$2(
  value: PrettyHelp$,
): $colour.Colour$;
export function PrettyHelp$PrettyHelp$subcommands(value: PrettyHelp$): $colour.Colour$;

export type PrettyHelp$ = PrettyHelp;

declare class Glint<MOI> extends _.CustomType {
  /** @deprecated */
  constructor(config: Config$, cmd: CommandNode$<any>);
  /** @deprecated */
  config: Config$;
  /** @deprecated */
  cmd: CommandNode$<any>;
}

export type Glint$<MOI> = Glint<MOI>;

export class EqArgs extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function ArgsCount$EqArgs($0: number): ArgsCount$;
export function ArgsCount$isEqArgs(value: ArgsCount$): boolean;
export function ArgsCount$EqArgs$0(value: ArgsCount$): number;

export class MinArgs extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function ArgsCount$MinArgs($0: number): ArgsCount$;
export function ArgsCount$isMinArgs(value: ArgsCount$): boolean;
export function ArgsCount$MinArgs$0(value: ArgsCount$): number;

export type ArgsCount$ = EqArgs | MinArgs;

declare class Command<MOJ> extends _.CustomType {
  /** @deprecated */
  constructor(
    do$: (x0: NamedArgs$, x1: _.List<string>, x2: Flags$) => any,
    flags: Flags$,
    description: string,
    unnamed_args: $option.Option$<ArgsCount$>,
    named_args: _.List<string>
  );
  /** @deprecated */
  do$: (x0: NamedArgs$, x1: _.List<string>, x2: Flags$) => any;
  /** @deprecated */
  flags: Flags$;
  /** @deprecated */
  description: string;
  /** @deprecated */
  unnamed_args: $option.Option$<ArgsCount$>;
  /** @deprecated */
  named_args: _.List<string>;
}

export type Command$<MOJ> = Command<MOJ>;

declare class InternalCommand<MOK> extends _.CustomType {
  /** @deprecated */
  constructor(
    do$: (x0: NamedArgs$, x1: _.List<string>, x2: Flags$) => any,
    flags: Flags$,
    unnamed_args: $option.Option$<ArgsCount$>,
    named_args: _.List<string>
  );
  /** @deprecated */
  do$: (x0: NamedArgs$, x1: _.List<string>, x2: Flags$) => any;
  /** @deprecated */
  flags: Flags$;
  /** @deprecated */
  unnamed_args: $option.Option$<ArgsCount$>;
  /** @deprecated */
  named_args: _.List<string>;
}

type InternalCommand$<MOK> = InternalCommand<MOK>;

declare class NamedArgs extends _.CustomType {
  /** @deprecated */
  constructor(internal: $dict.Dict$<string, string>);
  /** @deprecated */
  internal: $dict.Dict$<string, string>;
}

export type NamedArgs$ = NamedArgs;

declare class CommandNode<MOL> extends _.CustomType {
  /** @deprecated */
  constructor(
    contents: $option.Option$<InternalCommand$<any>>,
    subcommands: $dict.Dict$<string, CommandNode$<any>>,
    group_flags: Flags$,
    description: string
  );
  /** @deprecated */
  contents: $option.Option$<InternalCommand$<any>>;
  /** @deprecated */
  subcommands: $dict.Dict$<string, CommandNode$<any>>;
  /** @deprecated */
  group_flags: Flags$;
  /** @deprecated */
  description: string;
}

type CommandNode$<MOL> = CommandNode<MOL>;

export class Out<MOM> extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: MOM);
  /** @deprecated */
  0: MOM;
}
export function Out$Out<MOM>($0: MOM): Out$<MOM>;
export function Out$isOut<MOM>(value: Out$<MOM>): boolean;
export function Out$Out$0<MOM>(value: Out$<MOM>): MOM;

export class Help extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: string);
  /** @deprecated */
  0: string;
}
export function Out$Help<MOM>($0: string): Out$<MOM>;
export function Out$isHelp<MOM>(value: Out$<MOM>): boolean;
export function Out$Help$0<MOM>(value: Out$<MOM>): string;

export type Out$<MOM> = Out<MOM> | Help;

declare class B extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<boolean>);
  /** @deprecated */
  0: FlagInternals$<boolean>;
}

declare class I extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<number>);
  /** @deprecated */
  0: FlagInternals$<number>;
}

declare class LI extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<_.List<number>>);
  /** @deprecated */
  0: FlagInternals$<_.List<number>>;
}

declare class F extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<number>);
  /** @deprecated */
  0: FlagInternals$<number>;
}

declare class LF extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<_.List<number>>);
  /** @deprecated */
  0: FlagInternals$<_.List<number>>;
}

declare class S extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<string>);
  /** @deprecated */
  0: FlagInternals$<string>;
}

declare class LS extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: FlagInternals$<_.List<string>>);
  /** @deprecated */
  0: FlagInternals$<_.List<string>>;
}

type Value$ = B | I | LI | F | LF | S | LS;

declare class Flag<MON> extends _.CustomType {
  /** @deprecated */
  constructor(
    name: string,
    desc: string,
    parser: (x0: string) => _.Result<any, $snag.Snag$>,
    value: (x0: FlagInternals$<any>) => Value$,
    getter: (x0: Flags$, x1: string) => _.Result<any, $snag.Snag$>,
    default$: $option.Option$<any>
  );
  /** @deprecated */
  name: string;
  /** @deprecated */
  desc: string;
  /** @deprecated */
  parser: (x0: string) => _.Result<any, $snag.Snag$>;
  /** @deprecated */
  value: (x0: FlagInternals$<any>) => Value$;
  /** @deprecated */
  getter: (x0: Flags$, x1: string) => _.Result<any, $snag.Snag$>;
  /** @deprecated */
  default$: $option.Option$<any>;
}

export type Flag$<MON> = Flag<MON>;

declare class FlagInternals<MOO> extends _.CustomType {
  /** @deprecated */
  constructor(
    value: $option.Option$<any>,
    parser: (x0: string) => _.Result<any, $snag.Snag$>
  );
  /** @deprecated */
  value: $option.Option$<any>;
  /** @deprecated */
  parser: (x0: string) => _.Result<any, $snag.Snag$>;
}

type FlagInternals$<MOO> = FlagInternals<MOO>;

declare class FlagEntry extends _.CustomType {
  /** @deprecated */
  constructor(value: Value$, description: string);
  /** @deprecated */
  value: Value$;
  /** @deprecated */
  description: string;
}

type FlagEntry$ = FlagEntry;

declare class Flags extends _.CustomType {
  /** @deprecated */
  constructor(internal: $dict.Dict$<string, FlagEntry$>);
  /** @deprecated */
  internal: $dict.Dict$<string, FlagEntry$>;
}

export type Flags$ = Flags;

export type Runner = (x0: NamedArgs$, x1: _.List<string>, x2: Flags$) => any;

export function pretty_help<MOV>(glint: Glint$<MOV>, pretty: PrettyHelp$): Glint$<
  MOV
>;

export function with_name<MOY>(glint: Glint$<MOY>, name: string): Glint$<MOY>;

export function without_exit<MPB>(glint: Glint$<MPB>): Glint$<MPB>;

export function as_module<MPE>(glint: Glint$<MPE>): Glint$<MPE>;

export function with_indent_width<MPH>(glint: Glint$<MPH>, indent_width: number): Glint$<
  MPH
>;

export function with_max_output_width<MPK>(
  glint: Glint$<MPK>,
  max_output_width: number
): Glint$<MPK>;

export function with_min_first_column_width<MPN>(
  glint: Glint$<MPN>,
  min_first_column_width: number
): Glint$<MPN>;

export function with_column_gap<MPQ>(glint: Glint$<MPQ>, column_gap: number): Glint$<
  MPQ
>;

export function global_help<MPZ>(glint: Glint$<MPZ>, description: string): Glint$<
  MPZ
>;

export function map_command<MQO, MQQ>(
  command: Command$<MQO>,
  fun: (x0: MQO) => MQQ
): Command$<MQQ>;

export function command_help<MQS>(desc: string, f: () => Command$<MQS>): Command$<
  MQS
>;

export function unnamed_args<MQV>(count: ArgsCount$, f: () => Command$<MQV>): Command$<
  MQV
>;

export function named_arg<MQY>(
  name: string,
  f: (x0: (x0: NamedArgs$) => string) => Command$<MQY>
): Command$<MQY>;

export function default_pretty_help(): PrettyHelp$;

export function flag_constraint<MTU>(
  builder: Flag$<MTU>,
  constraint: (x0: MTU) => _.Result<MTU, $snag.Snag$>
): Flag$<MTU>;

export function flag_help<MUN>(flag: Flag$<MUN>, description: string): Flag$<
  MUN
>;

export function flag_default<MUQ>(flag: Flag$<MUQ>, default$: MUQ): Flag$<MUQ>;

export function flag<MRB, MRE>(
  flag: Flag$<MRB>,
  f: (x0: (x0: Flags$) => _.Result<MRB, $snag.Snag$>) => Command$<MRE>
): Command$<MRE>;

export function command<MQL>(
  runner: (x0: NamedArgs$, x1: _.List<string>, x2: Flags$) => MQL
): Command$<MQL>;

export function get_flag<MVJ>(flags: Flags$, flag: Flag$<MVJ>): _.Result<
  MVJ,
  $snag.Snag$
>;

export function int_flag(name: string): Flag$<number>;

export function ints_flag(name: string): Flag$<_.List<number>>;

export function bool_flag(name: string): Flag$<boolean>;

export function string_flag(name: string): Flag$<string>;

export function strings_flag(name: string): Flag$<_.List<string>>;

export function float_flag(name: string): Flag$<number>;

export function floats_flag(name: string): Flag$<_.List<number>>;

export function path_help<MPV>(
  glint: Glint$<MPV>,
  path: _.List<string>,
  description: string
): Glint$<MPV>;

export function add<MQC>(
  glint: Glint$<MQC>,
  path: _.List<string>,
  command: Command$<MQC>
): Glint$<MQC>;

export function group_flag<MRH>(
  glint: Glint$<MRH>,
  path: _.List<string>,
  flag: Flag$<any>
): Glint$<MRH>;

export function new$(): Glint$<any>;

export function execute<MRN>(glint: Glint$<MRN>, args: _.List<string>): _.Result<
  Out$<MRN>,
  string
>;

export function run_and_handle<MSM>(
  glint: Glint$<MSM>,
  args: _.List<string>,
  handle: (x0: MSM) => any
): undefined;

export function run(glint: Glint$<any>, args: _.List<string>): undefined;
