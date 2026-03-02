export type MutableMap$<RUR, RUS> = any;

export function new$(): MutableMap$<any, any>;

export function unsafe_get<RUX, RUY>(map: MutableMap$<RUX, RUY>, key: RUX): RUY;

export function get_or_compute<RVF, RVG>(
  map: MutableMap$<RVF, RVG>,
  key: RVF,
  compute: () => RVG
): RVG;

export function has_key<RVP>(map: MutableMap$<RVP, any>, key: RVP): boolean;

export function insert<RVX, RVY>(
  map: MutableMap$<RVX, RVY>,
  key: RVX,
  value: RVY
): MutableMap$<RVX, RVY>;

export function delete$<RWJ, RWK>(map: MutableMap$<RWJ, RWK>, key: RWJ): MutableMap$<
  RWJ,
  RWK
>;

export function size(map: MutableMap$<any, any>): number;

export function is_empty(map: MutableMap$<any, any>): boolean;
