import type * as $colour from "../../../gleam_community_colour/gleam_community/colour.d.mts";
import type * as $option from "../../../gleam_stdlib/gleam/option.d.mts";
import type * as _ from "../../gleam.d.mts";

export class MinArgs extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function ArgsCount$MinArgs($0: number): ArgsCount$;
export function ArgsCount$isMinArgs(value: ArgsCount$): boolean;
export function ArgsCount$MinArgs$0(value: ArgsCount$): number;

export class EqArgs extends _.CustomType {
  /** @deprecated */
  constructor(argument$0: number);
  /** @deprecated */
  0: number;
}
export function ArgsCount$EqArgs($0: number): ArgsCount$;
export function ArgsCount$isEqArgs(value: ArgsCount$): boolean;
export function ArgsCount$EqArgs$0(value: ArgsCount$): number;

export type ArgsCount$ = MinArgs | EqArgs;

export class Config extends _.CustomType {
  /** @deprecated */
  constructor(
    name: $option.Option$<string>,
    usage_colour: $option.Option$<$colour.Colour$>,
    flags_colour: $option.Option$<$colour.Colour$>,
    subcommands_colour: $option.Option$<$colour.Colour$>,
    as_module: boolean,
    description: $option.Option$<string>,
    indent_width: number,
    max_output_width: number,
    min_first_column_width: number,
    column_gap: number,
    flag_prefix: string,
    flag_delimiter: string
  );
  /** @deprecated */
  name: $option.Option$<string>;
  /** @deprecated */
  usage_colour: $option.Option$<$colour.Colour$>;
  /** @deprecated */
  flags_colour: $option.Option$<$colour.Colour$>;
  /** @deprecated */
  subcommands_colour: $option.Option$<$colour.Colour$>;
  /** @deprecated */
  as_module: boolean;
  /** @deprecated */
  description: $option.Option$<string>;
  /** @deprecated */
  indent_width: number;
  /** @deprecated */
  max_output_width: number;
  /** @deprecated */
  min_first_column_width: number;
  /** @deprecated */
  column_gap: number;
  /** @deprecated */
  flag_prefix: string;
  /** @deprecated */
  flag_delimiter: string;
}
export function Config$Config(
  name: $option.Option$<string>,
  usage_colour: $option.Option$<$colour.Colour$>,
  flags_colour: $option.Option$<$colour.Colour$>,
  subcommands_colour: $option.Option$<$colour.Colour$>,
  as_module: boolean,
  description: $option.Option$<string>,
  indent_width: number,
  max_output_width: number,
  min_first_column_width: number,
  column_gap: number,
  flag_prefix: string,
  flag_delimiter: string,
): Config$;
export function Config$isConfig(value: Config$): boolean;
export function Config$Config$0(value: Config$): $option.Option$<string>;
export function Config$Config$name(value: Config$): $option.Option$<string>;
export function Config$Config$1(value: Config$): $option.Option$<
  $colour.Colour$
>;
export function Config$Config$usage_colour(value: Config$): $option.Option$<
  $colour.Colour$
>;
export function Config$Config$2(value: Config$): $option.Option$<
  $colour.Colour$
>;
export function Config$Config$flags_colour(value: Config$): $option.Option$<
  $colour.Colour$
>;
export function Config$Config$3(value: Config$): $option.Option$<
  $colour.Colour$
>;
export function Config$Config$subcommands_colour(value: Config$): $option.Option$<
  $colour.Colour$
>;
export function Config$Config$4(value: Config$): boolean;
export function Config$Config$as_module(value: Config$): boolean;
export function Config$Config$5(value: Config$): $option.Option$<string>;
export function Config$Config$description(value: Config$): $option.Option$<
  string
>;
export function Config$Config$6(value: Config$): number;
export function Config$Config$indent_width(value: Config$): number;
export function Config$Config$7(value: Config$): number;
export function Config$Config$max_output_width(value: Config$): number;
export function Config$Config$8(value: Config$): number;
export function Config$Config$min_first_column_width(value: Config$): number;
export function Config$Config$9(value: Config$): number;
export function Config$Config$column_gap(value: Config$): number;
export function Config$Config$10(value: Config$): string;
export function Config$Config$flag_prefix(value: Config$): string;
export function Config$Config$11(value: Config$): string;
export function Config$Config$flag_delimiter(value: Config$): string;

export type Config$ = Config;

export class Metadata extends _.CustomType {
  /** @deprecated */
  constructor(name: string, description: string);
  /** @deprecated */
  name: string;
  /** @deprecated */
  description: string;
}
export function Metadata$Metadata(name: string, description: string): Metadata$;
export function Metadata$isMetadata(value: Metadata$): boolean;
export function Metadata$Metadata$0(value: Metadata$): string;
export function Metadata$Metadata$name(value: Metadata$): string;
export function Metadata$Metadata$1(value: Metadata$): string;
export function Metadata$Metadata$description(value: Metadata$): string;

export type Metadata$ = Metadata;

export class Flag extends _.CustomType {
  /** @deprecated */
  constructor(meta: Metadata$, type_: string);
  /** @deprecated */
  meta: Metadata$;
  /** @deprecated */
  type_: string;
}
export function Flag$Flag(meta: Metadata$, type_: string): Flag$;
export function Flag$isFlag(value: Flag$): boolean;
export function Flag$Flag$0(value: Flag$): Metadata$;
export function Flag$Flag$meta(value: Flag$): Metadata$;
export function Flag$Flag$1(value: Flag$): string;
export function Flag$Flag$type_(value: Flag$): string;

export type Flag$ = Flag;

export class Command extends _.CustomType {
  /** @deprecated */
  constructor(
    meta: Metadata$,
    flags: _.List<Flag$>,
    subcommands: _.List<Metadata$>,
    unnamed_args: $option.Option$<ArgsCount$>,
    named_args: _.List<string>
  );
  /** @deprecated */
  meta: Metadata$;
  /** @deprecated */
  flags: _.List<Flag$>;
  /** @deprecated */
  subcommands: _.List<Metadata$>;
  /** @deprecated */
  unnamed_args: $option.Option$<ArgsCount$>;
  /** @deprecated */
  named_args: _.List<string>;
}
export function Command$Command(
  meta: Metadata$,
  flags: _.List<Flag$>,
  subcommands: _.List<Metadata$>,
  unnamed_args: $option.Option$<ArgsCount$>,
  named_args: _.List<string>,
): Command$;
export function Command$isCommand(value: Command$): boolean;
export function Command$Command$0(value: Command$): Metadata$;
export function Command$Command$meta(value: Command$): Metadata$;
export function Command$Command$1(value: Command$): _.List<Flag$>;
export function Command$Command$flags(value: Command$): _.List<Flag$>;
export function Command$Command$2(value: Command$): _.List<Metadata$>;
export function Command$Command$subcommands(value: Command$): _.List<Metadata$>;
export function Command$Command$3(value: Command$): $option.Option$<ArgsCount$>;
export function Command$Command$unnamed_args(value: Command$): $option.Option$<
  ArgsCount$
>;
export function Command$Command$4(value: Command$): _.List<string>;
export function Command$Command$named_args(value: Command$): _.List<string>;

export type Command$ = Command;

export const help_flag: Flag$;

export function command_help_to_string(help: Command$, config: Config$): string;
