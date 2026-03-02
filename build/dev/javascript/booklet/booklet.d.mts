export type Booklet$<S> = any;

export function new$<T>(initial_value: T): Booklet$<T>;

export function get<V>(booklet: Booklet$<V>): V;

export function update<X>(booklet: Booklet$<X>, updater: (x0: X) => X): X;

export function set<Z>(booklet: Booklet$<Z>, new_value: Z): undefined;

export function erase(booklet: Booklet$<any>): undefined;
