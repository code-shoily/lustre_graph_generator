export function first<CNH>(pair: [CNH, any]): CNH;

export function second<CNK>(pair: [any, CNK]): CNK;

export function swap<CNL, CNM>(pair: [CNL, CNM]): [CNM, CNL];

export function map_first<CNN, CNO, CNP>(
  pair: [CNN, CNO],
  fun: (x0: CNN) => CNP
): [CNP, CNO];

export function map_second<CNQ, CNR, CNS>(
  pair: [CNQ, CNR],
  fun: (x0: CNR) => CNS
): [CNQ, CNS];

export function new$<CNT, CNU>(first: CNT, second: CNU): [CNT, CNU];
