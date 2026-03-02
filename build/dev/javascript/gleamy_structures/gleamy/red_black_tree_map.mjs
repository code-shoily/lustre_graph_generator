/// <reference types="./red_black_tree_map.d.mts" />
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Eq, Gt, Lt } from "../../gleam_stdlib/gleam/order.mjs";
import { Ok, Error, CustomType as $CustomType } from "../gleam.mjs";

class R extends $CustomType {}

class B extends $CustomType {}

class BB extends $CustomType {}

class E extends $CustomType {}

class EE extends $CustomType {}

class T extends $CustomType {
  constructor(c, l, k, r) {
    super();
    this.c = c;
    this.l = l;
    this.k = k;
    this.r = r;
  }
}

class Map extends $CustomType {
  constructor(root, compare) {
    super();
    this.root = root;
    this.compare = compare;
  }
}

class Min extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}

class None extends $CustomType {}

/**
 * Creates a new empty map with the provided comparison function for keys.
 */
export function new$(compare) {
  return new Map(new E(), compare);
}

/**
 * Removes all elements from the map, resulting in an empty map.
 * Time complexity: O(1)
 */
export function clear(tree) {
  return new Map(new E(), tree.compare);
}

function blacken(node) {
  if (node instanceof T) {
    let $ = node.c;
    if ($ instanceof R) {
      let $1 = node.l;
      if ($1 instanceof T) {
        let $2 = $1.c;
        if ($2 instanceof R) {
          let l = $1;
          let y = node.k;
          let c = node.r;
          return new T(new B(), l, y, c);
        } else {
          let $3 = node.r;
          if ($3 instanceof T) {
            let $4 = $3.c;
            if ($4 instanceof R) {
              let k = $1;
              let x = node.k;
              let r = $3;
              return new T(new B(), k, x, r);
            } else {
              return node;
            }
          } else {
            return node;
          }
        }
      } else {
        let $2 = node.r;
        if ($2 instanceof T) {
          let $3 = $2.c;
          if ($3 instanceof R) {
            let k = $1;
            let x = node.k;
            let r = $2;
            return new T(new B(), k, x, r);
          } else {
            return node;
          }
        } else {
          return node;
        }
      }
    } else {
      return node;
    }
  } else {
    return node;
  }
}

function balance(c, l, v, r) {
  if (c instanceof B) {
    if (l instanceof T) {
      let $ = l.c;
      if ($ instanceof R) {
        let $1 = l.l;
        if ($1 instanceof T) {
          let $2 = $1.c;
          if ($2 instanceof R) {
            let z = v;
            let d = r;
            let y = l.k;
            let c$1 = l.r;
            let k = $1.l;
            let x = $1.k;
            let b = $1.r;
            return new T(
              new R(),
              new T(new B(), k, x, b),
              y,
              new T(new B(), c$1, z, d),
            );
          } else {
            let $3 = l.r;
            if ($3 instanceof T) {
              let $4 = $3.c;
              if ($4 instanceof R) {
                let z = v;
                let d = r;
                let k = $1;
                let x = l.k;
                let b = $3.l;
                let y = $3.k;
                let c$1 = $3.r;
                return new T(
                  new R(),
                  new T(new B(), k, x, b),
                  y,
                  new T(new B(), c$1, z, d),
                );
              } else if (r instanceof T) {
                let $5 = r.c;
                if ($5 instanceof R) {
                  let $6 = r.l;
                  if ($6 instanceof T) {
                    let $7 = $6.c;
                    if ($7 instanceof R) {
                      let k = l;
                      let x = v;
                      let z = r.k;
                      let d = r.r;
                      let b = $6.l;
                      let y = $6.k;
                      let c$1 = $6.r;
                      return new T(
                        new R(),
                        new T(new B(), k, x, b),
                        y,
                        new T(new B(), c$1, z, d),
                      );
                    } else {
                      let $8 = r.r;
                      if ($8 instanceof T) {
                        let $9 = $8.c;
                        if ($9 instanceof R) {
                          let k = l;
                          let x = v;
                          let b = $6;
                          let y = r.k;
                          let c$1 = $8.l;
                          let z = $8.k;
                          let d = $8.r;
                          return new T(
                            new R(),
                            new T(new B(), k, x, b),
                            y,
                            new T(new B(), c$1, z, d),
                          );
                        } else {
                          let c$1 = c;
                          let k = l;
                          let x = v;
                          let b = r;
                          return new T(c$1, k, x, b);
                        }
                      } else {
                        let c$1 = c;
                        let k = l;
                        let x = v;
                        let b = r;
                        return new T(c$1, k, x, b);
                      }
                    }
                  } else {
                    let $7 = r.r;
                    if ($7 instanceof T) {
                      let $8 = $7.c;
                      if ($8 instanceof R) {
                        let k = l;
                        let x = v;
                        let b = $6;
                        let y = r.k;
                        let c$1 = $7.l;
                        let z = $7.k;
                        let d = $7.r;
                        return new T(
                          new R(),
                          new T(new B(), k, x, b),
                          y,
                          new T(new B(), c$1, z, d),
                        );
                      } else {
                        let c$1 = c;
                        let k = l;
                        let x = v;
                        let b = r;
                        return new T(c$1, k, x, b);
                      }
                    } else {
                      let c$1 = c;
                      let k = l;
                      let x = v;
                      let b = r;
                      return new T(c$1, k, x, b);
                    }
                  }
                } else {
                  let c$1 = c;
                  let k = l;
                  let x = v;
                  let b = r;
                  return new T(c$1, k, x, b);
                }
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else if (r instanceof T) {
              let $4 = r.c;
              if ($4 instanceof R) {
                let $5 = r.l;
                if ($5 instanceof T) {
                  let $6 = $5.c;
                  if ($6 instanceof R) {
                    let k = l;
                    let x = v;
                    let z = r.k;
                    let d = r.r;
                    let b = $5.l;
                    let y = $5.k;
                    let c$1 = $5.r;
                    return new T(
                      new R(),
                      new T(new B(), k, x, b),
                      y,
                      new T(new B(), c$1, z, d),
                    );
                  } else {
                    let $7 = r.r;
                    if ($7 instanceof T) {
                      let $8 = $7.c;
                      if ($8 instanceof R) {
                        let k = l;
                        let x = v;
                        let b = $5;
                        let y = r.k;
                        let c$1 = $7.l;
                        let z = $7.k;
                        let d = $7.r;
                        return new T(
                          new R(),
                          new T(new B(), k, x, b),
                          y,
                          new T(new B(), c$1, z, d),
                        );
                      } else {
                        let c$1 = c;
                        let k = l;
                        let x = v;
                        let b = r;
                        return new T(c$1, k, x, b);
                      }
                    } else {
                      let c$1 = c;
                      let k = l;
                      let x = v;
                      let b = r;
                      return new T(c$1, k, x, b);
                    }
                  }
                } else {
                  let $6 = r.r;
                  if ($6 instanceof T) {
                    let $7 = $6.c;
                    if ($7 instanceof R) {
                      let k = l;
                      let x = v;
                      let b = $5;
                      let y = r.k;
                      let c$1 = $6.l;
                      let z = $6.k;
                      let d = $6.r;
                      return new T(
                        new R(),
                        new T(new B(), k, x, b),
                        y,
                        new T(new B(), c$1, z, d),
                      );
                    } else {
                      let c$1 = c;
                      let k = l;
                      let x = v;
                      let b = r;
                      return new T(c$1, k, x, b);
                    }
                  } else {
                    let c$1 = c;
                    let k = l;
                    let x = v;
                    let b = r;
                    return new T(c$1, k, x, b);
                  }
                }
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          }
        } else {
          let $2 = l.r;
          if ($2 instanceof T) {
            let $3 = $2.c;
            if ($3 instanceof R) {
              let z = v;
              let d = r;
              let k = $1;
              let x = l.k;
              let b = $2.l;
              let y = $2.k;
              let c$1 = $2.r;
              return new T(
                new R(),
                new T(new B(), k, x, b),
                y,
                new T(new B(), c$1, z, d),
              );
            } else if (r instanceof T) {
              let $4 = r.c;
              if ($4 instanceof R) {
                let $5 = r.l;
                if ($5 instanceof T) {
                  let $6 = $5.c;
                  if ($6 instanceof R) {
                    let k = l;
                    let x = v;
                    let z = r.k;
                    let d = r.r;
                    let b = $5.l;
                    let y = $5.k;
                    let c$1 = $5.r;
                    return new T(
                      new R(),
                      new T(new B(), k, x, b),
                      y,
                      new T(new B(), c$1, z, d),
                    );
                  } else {
                    let $7 = r.r;
                    if ($7 instanceof T) {
                      let $8 = $7.c;
                      if ($8 instanceof R) {
                        let k = l;
                        let x = v;
                        let b = $5;
                        let y = r.k;
                        let c$1 = $7.l;
                        let z = $7.k;
                        let d = $7.r;
                        return new T(
                          new R(),
                          new T(new B(), k, x, b),
                          y,
                          new T(new B(), c$1, z, d),
                        );
                      } else {
                        let c$1 = c;
                        let k = l;
                        let x = v;
                        let b = r;
                        return new T(c$1, k, x, b);
                      }
                    } else {
                      let c$1 = c;
                      let k = l;
                      let x = v;
                      let b = r;
                      return new T(c$1, k, x, b);
                    }
                  }
                } else {
                  let $6 = r.r;
                  if ($6 instanceof T) {
                    let $7 = $6.c;
                    if ($7 instanceof R) {
                      let k = l;
                      let x = v;
                      let b = $5;
                      let y = r.k;
                      let c$1 = $6.l;
                      let z = $6.k;
                      let d = $6.r;
                      return new T(
                        new R(),
                        new T(new B(), k, x, b),
                        y,
                        new T(new B(), c$1, z, d),
                      );
                    } else {
                      let c$1 = c;
                      let k = l;
                      let x = v;
                      let b = r;
                      return new T(c$1, k, x, b);
                    }
                  } else {
                    let c$1 = c;
                    let k = l;
                    let x = v;
                    let b = r;
                    return new T(c$1, k, x, b);
                  }
                }
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else if (r instanceof T) {
            let $3 = r.c;
            if ($3 instanceof R) {
              let $4 = r.l;
              if ($4 instanceof T) {
                let $5 = $4.c;
                if ($5 instanceof R) {
                  let k = l;
                  let x = v;
                  let z = r.k;
                  let d = r.r;
                  let b = $4.l;
                  let y = $4.k;
                  let c$1 = $4.r;
                  return new T(
                    new R(),
                    new T(new B(), k, x, b),
                    y,
                    new T(new B(), c$1, z, d),
                  );
                } else {
                  let $6 = r.r;
                  if ($6 instanceof T) {
                    let $7 = $6.c;
                    if ($7 instanceof R) {
                      let k = l;
                      let x = v;
                      let b = $4;
                      let y = r.k;
                      let c$1 = $6.l;
                      let z = $6.k;
                      let d = $6.r;
                      return new T(
                        new R(),
                        new T(new B(), k, x, b),
                        y,
                        new T(new B(), c$1, z, d),
                      );
                    } else {
                      let c$1 = c;
                      let k = l;
                      let x = v;
                      let b = r;
                      return new T(c$1, k, x, b);
                    }
                  } else {
                    let c$1 = c;
                    let k = l;
                    let x = v;
                    let b = r;
                    return new T(c$1, k, x, b);
                  }
                }
              } else {
                let $5 = r.r;
                if ($5 instanceof T) {
                  let $6 = $5.c;
                  if ($6 instanceof R) {
                    let k = l;
                    let x = v;
                    let b = $4;
                    let y = r.k;
                    let c$1 = $5.l;
                    let z = $5.k;
                    let d = $5.r;
                    return new T(
                      new R(),
                      new T(new B(), k, x, b),
                      y,
                      new T(new B(), c$1, z, d),
                    );
                  } else {
                    let c$1 = c;
                    let k = l;
                    let x = v;
                    let b = r;
                    return new T(c$1, k, x, b);
                  }
                } else {
                  let c$1 = c;
                  let k = l;
                  let x = v;
                  let b = r;
                  return new T(c$1, k, x, b);
                }
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        }
      } else if (r instanceof T) {
        let $1 = r.c;
        if ($1 instanceof R) {
          let $2 = r.l;
          if ($2 instanceof T) {
            let $3 = $2.c;
            if ($3 instanceof R) {
              let k = l;
              let x = v;
              let z = r.k;
              let d = r.r;
              let b = $2.l;
              let y = $2.k;
              let c$1 = $2.r;
              return new T(
                new R(),
                new T(new B(), k, x, b),
                y,
                new T(new B(), c$1, z, d),
              );
            } else {
              let $4 = r.r;
              if ($4 instanceof T) {
                let $5 = $4.c;
                if ($5 instanceof R) {
                  let k = l;
                  let x = v;
                  let b = $2;
                  let y = r.k;
                  let c$1 = $4.l;
                  let z = $4.k;
                  let d = $4.r;
                  return new T(
                    new R(),
                    new T(new B(), k, x, b),
                    y,
                    new T(new B(), c$1, z, d),
                  );
                } else {
                  let c$1 = c;
                  let k = l;
                  let x = v;
                  let b = r;
                  return new T(c$1, k, x, b);
                }
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            }
          } else {
            let $3 = r.r;
            if ($3 instanceof T) {
              let $4 = $3.c;
              if ($4 instanceof R) {
                let k = l;
                let x = v;
                let b = $2;
                let y = r.k;
                let c$1 = $3.l;
                let z = $3.k;
                let d = $3.r;
                return new T(
                  new R(),
                  new T(new B(), k, x, b),
                  y,
                  new T(new B(), c$1, z, d),
                );
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          }
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else if (r instanceof T) {
      let $ = r.c;
      if ($ instanceof R) {
        let $1 = r.l;
        if ($1 instanceof T) {
          let $2 = $1.c;
          if ($2 instanceof R) {
            let k = l;
            let x = v;
            let z = r.k;
            let d = r.r;
            let b = $1.l;
            let y = $1.k;
            let c$1 = $1.r;
            return new T(
              new R(),
              new T(new B(), k, x, b),
              y,
              new T(new B(), c$1, z, d),
            );
          } else {
            let $3 = r.r;
            if ($3 instanceof T) {
              let $4 = $3.c;
              if ($4 instanceof R) {
                let k = l;
                let x = v;
                let b = $1;
                let y = r.k;
                let c$1 = $3.l;
                let z = $3.k;
                let d = $3.r;
                return new T(
                  new R(),
                  new T(new B(), k, x, b),
                  y,
                  new T(new B(), c$1, z, d),
                );
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          }
        } else {
          let $2 = r.r;
          if ($2 instanceof T) {
            let $3 = $2.c;
            if ($3 instanceof R) {
              let k = l;
              let x = v;
              let b = $1;
              let y = r.k;
              let c$1 = $2.l;
              let z = $2.k;
              let d = $2.r;
              return new T(
                new R(),
                new T(new B(), k, x, b),
                y,
                new T(new B(), c$1, z, d),
              );
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        }
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else {
      let c$1 = c;
      let k = l;
      let x = v;
      let b = r;
      return new T(c$1, k, x, b);
    }
  } else if (c instanceof BB) {
    if (r instanceof T) {
      let $ = r.c;
      if ($ instanceof R) {
        let $1 = r.l;
        if ($1 instanceof T) {
          let $2 = $1.c;
          if ($2 instanceof R) {
            let k = l;
            let x = v;
            let z = r.k;
            let d = r.r;
            let b = $1.l;
            let y = $1.k;
            let c$1 = $1.r;
            return new T(
              new B(),
              new T(new B(), k, x, b),
              y,
              new T(new B(), c$1, z, d),
            );
          } else if (l instanceof T) {
            let $3 = l.c;
            if ($3 instanceof R) {
              let $4 = l.r;
              if ($4 instanceof T) {
                let $5 = $4.c;
                if ($5 instanceof R) {
                  let z = v;
                  let d = r;
                  let k = l.l;
                  let x = l.k;
                  let b = $4.l;
                  let y = $4.k;
                  let c$1 = $4.r;
                  return new T(
                    new B(),
                    new T(new B(), k, x, b),
                    y,
                    new T(new B(), c$1, z, d),
                  );
                } else {
                  let c$1 = c;
                  let k = l;
                  let x = v;
                  let b = r;
                  return new T(c$1, k, x, b);
                }
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else if (l instanceof T) {
          let $2 = l.c;
          if ($2 instanceof R) {
            let $3 = l.r;
            if ($3 instanceof T) {
              let $4 = $3.c;
              if ($4 instanceof R) {
                let z = v;
                let d = r;
                let k = l.l;
                let x = l.k;
                let b = $3.l;
                let y = $3.k;
                let c$1 = $3.r;
                return new T(
                  new B(),
                  new T(new B(), k, x, b),
                  y,
                  new T(new B(), c$1, z, d),
                );
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else if (l instanceof T) {
        let $1 = l.c;
        if ($1 instanceof R) {
          let $2 = l.r;
          if ($2 instanceof T) {
            let $3 = $2.c;
            if ($3 instanceof R) {
              let z = v;
              let d = r;
              let k = l.l;
              let x = l.k;
              let b = $2.l;
              let y = $2.k;
              let c$1 = $2.r;
              return new T(
                new B(),
                new T(new B(), k, x, b),
                y,
                new T(new B(), c$1, z, d),
              );
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else if (l instanceof T) {
      let $ = l.c;
      if ($ instanceof R) {
        let $1 = l.r;
        if ($1 instanceof T) {
          let $2 = $1.c;
          if ($2 instanceof R) {
            let z = v;
            let d = r;
            let k = l.l;
            let x = l.k;
            let b = $1.l;
            let y = $1.k;
            let c$1 = $1.r;
            return new T(
              new B(),
              new T(new B(), k, x, b),
              y,
              new T(new B(), c$1, z, d),
            );
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else {
      let c$1 = c;
      let k = l;
      let x = v;
      let b = r;
      return new T(c$1, k, x, b);
    }
  } else {
    let c$1 = c;
    let k = l;
    let x = v;
    let b = r;
    return new T(c$1, k, x, b);
  }
}

function ins(node, x, compare) {
  if (node instanceof E) {
    return new T(new R(), new E(), x, new E());
  } else if (node instanceof T) {
    let c = node.c;
    let k = node.l;
    let y = node.k;
    let b = node.r;
    let $ = compare(x[0], y[0]);
    if ($ instanceof Lt) {
      return balance(c, ins(k, x, compare), y, b);
    } else if ($ instanceof Eq) {
      return new T(c, k, x, b);
    } else {
      return balance(c, k, y, ins(b, x, compare));
    }
  } else {
    return node;
  }
}

/**
 * Inserts a new key-value pair into the map.
 * If the key already exists, its associated value is updated with the new value.
 * Time complexity: O(log n)
 */
export function insert(tree, key, value) {
  return new Map(
    blacken(ins(tree.root, [key, value], tree.compare)),
    tree.compare,
  );
}

function redden(node) {
  if (node instanceof T) {
    let $ = node.c;
    if ($ instanceof B) {
      let $1 = node.l;
      if ($1 instanceof T) {
        let $2 = node.r;
        if ($2 instanceof T) {
          let $3 = $1.c;
          if ($3 instanceof B) {
            let $4 = $2.c;
            if ($4 instanceof B) {
              let l = $1;
              let y = node.k;
              let r = $2;
              return new T(new R(), l, y, r);
            } else {
              return node;
            }
          } else {
            return node;
          }
        } else {
          return node;
        }
      } else {
        return node;
      }
    } else {
      return node;
    }
  } else {
    return node;
  }
}

function rotate(c, l, v, r) {
  if (c instanceof R) {
    if (l instanceof EE && r instanceof T) {
      let $ = r.c;
      if ($ instanceof B) {
        let y = v;
        let c$1 = r.l;
        let z = r.k;
        let d = r.r;
        return balance(new B(), new T(new R(), new E(), y, c$1), z, d);
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else if (l instanceof T) {
      if (r instanceof EE) {
        let $ = l.c;
        if ($ instanceof B) {
          let y = v;
          let k = l.l;
          let x = l.k;
          let b = l.r;
          return balance(new B(), k, x, new T(new R(), b, y, new E()));
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else if (r instanceof T) {
        let $ = l.c;
        if ($ instanceof B) {
          let $1 = r.c;
          if ($1 instanceof BB) {
            let y = v;
            let k = l.l;
            let x = l.k;
            let b = l.r;
            let c$1 = r.l;
            let z = r.k;
            let d = r.r;
            return balance(
              new B(),
              k,
              x,
              new T(new R(), b, y, new T(new B(), c$1, z, d)),
            );
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else if ($ instanceof BB) {
          let $1 = r.c;
          if ($1 instanceof B) {
            let y = v;
            let k = l.l;
            let x = l.k;
            let b = l.r;
            let c$1 = r.l;
            let z = r.k;
            let d = r.r;
            return balance(
              new B(),
              new T(new R(), new T(new B(), k, x, b), y, c$1),
              z,
              d,
            );
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else {
      let c$1 = c;
      let k = l;
      let x = v;
      let b = r;
      return new T(c$1, k, x, b);
    }
  } else if (c instanceof B) {
    if (l instanceof EE && r instanceof T) {
      let $ = r.c;
      if ($ instanceof R) {
        let $1 = r.l;
        if ($1 instanceof T) {
          let $2 = $1.c;
          if ($2 instanceof B) {
            let x = v;
            let z = r.k;
            let e = r.r;
            let c$1 = $1.l;
            let y = $1.k;
            let d = $1.r;
            return new T(
              new B(),
              balance(new B(), new T(new R(), new E(), x, c$1), y, d),
              z,
              e,
            );
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else if ($ instanceof B) {
        let y = v;
        let c$1 = r.l;
        let z = r.k;
        let d = r.r;
        return balance(new BB(), new T(new R(), new E(), y, c$1), z, d);
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else if (l instanceof T) {
      if (r instanceof EE) {
        let $ = l.c;
        if ($ instanceof R) {
          let $1 = l.r;
          if ($1 instanceof T) {
            let $2 = $1.c;
            if ($2 instanceof B) {
              let y = v;
              let k = l.l;
              let w = l.k;
              let b = $1.l;
              let x = $1.k;
              let c$1 = $1.r;
              return new T(
                new B(),
                k,
                w,
                balance(new B(), b, x, new T(new R(), c$1, y, new E())),
              );
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else if ($ instanceof B) {
          let y = v;
          let k = l.l;
          let x = l.k;
          let b = l.r;
          return balance(new BB(), k, x, new T(new R(), b, y, new E()));
        } else {
          let c$1 = c;
          let k = l;
          let x = v;
          let b = r;
          return new T(c$1, k, x, b);
        }
      } else if (r instanceof T) {
        let $ = l.c;
        if ($ instanceof R) {
          let $1 = l.r;
          if ($1 instanceof T) {
            let $2 = r.c;
            if ($2 instanceof BB) {
              let $3 = $1.c;
              if ($3 instanceof B) {
                let y = v;
                let k = l.l;
                let w = l.k;
                let d = r.l;
                let z = r.k;
                let e = r.r;
                let b = $1.l;
                let x = $1.k;
                let c$1 = $1.r;
                return new T(
                  new B(),
                  k,
                  w,
                  balance(
                    new B(),
                    b,
                    x,
                    new T(new R(), c$1, y, new T(new B(), d, z, e)),
                  ),
                );
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else if ($ instanceof B) {
          let $1 = r.c;
          if ($1 instanceof BB) {
            let y = v;
            let k = l.l;
            let x = l.k;
            let b = l.r;
            let c$1 = r.l;
            let z = r.k;
            let d = r.r;
            return balance(
              new BB(),
              k,
              x,
              new T(new R(), b, y, new T(new B(), c$1, z, d)),
            );
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        } else {
          let $1 = r.c;
          if ($1 instanceof R) {
            let $2 = r.l;
            if ($2 instanceof T) {
              let $3 = $2.c;
              if ($3 instanceof B) {
                let x = v;
                let k = l.l;
                let w = l.k;
                let b = l.r;
                let z = r.k;
                let e = r.r;
                let c$1 = $2.l;
                let y = $2.k;
                let d = $2.r;
                return new T(
                  new B(),
                  balance(
                    new B(),
                    new T(new R(), new T(new B(), k, w, b), x, c$1),
                    y,
                    d,
                  ),
                  z,
                  e,
                );
              } else {
                let c$1 = c;
                let k = l;
                let x = v;
                let b = r;
                return new T(c$1, k, x, b);
              }
            } else {
              let c$1 = c;
              let k = l;
              let x = v;
              let b = r;
              return new T(c$1, k, x, b);
            }
          } else if ($1 instanceof B) {
            let y = v;
            let k = l.l;
            let x = l.k;
            let b = l.r;
            let c$1 = r.l;
            let z = r.k;
            let d = r.r;
            return balance(
              new BB(),
              new T(new R(), new T(new B(), k, x, b), y, c$1),
              z,
              d,
            );
          } else {
            let c$1 = c;
            let k = l;
            let x = v;
            let b = r;
            return new T(c$1, k, x, b);
          }
        }
      } else {
        let c$1 = c;
        let k = l;
        let x = v;
        let b = r;
        return new T(c$1, k, x, b);
      }
    } else {
      let c$1 = c;
      let k = l;
      let x = v;
      let b = r;
      return new T(c$1, k, x, b);
    }
  } else {
    let c$1 = c;
    let k = l;
    let x = v;
    let b = r;
    return new T(c$1, k, x, b);
  }
}

function min_del(node) {
  if (node instanceof T) {
    let $ = node.c;
    if ($ instanceof R) {
      let $1 = node.l;
      if ($1 instanceof E) {
        let $2 = node.r;
        if ($2 instanceof E) {
          let x = node.k;
          return new Min(x, new E());
        } else {
          let c = $;
          let k = $1;
          let x = node.k;
          let b = $2;
          let $3 = min_del(k);
          if ($3 instanceof Min) {
            let x1 = $3[0];
            let a1 = $3[1];
            return new Min(x1, rotate(c, a1, x, b));
          } else {
            return $3;
          }
        }
      } else {
        let c = $;
        let k = $1;
        let x = node.k;
        let b = node.r;
        let $2 = min_del(k);
        if ($2 instanceof Min) {
          let x1 = $2[0];
          let a1 = $2[1];
          return new Min(x1, rotate(c, a1, x, b));
        } else {
          return $2;
        }
      }
    } else if ($ instanceof B) {
      let $1 = node.l;
      if ($1 instanceof E) {
        let $2 = node.r;
        if ($2 instanceof E) {
          let x = node.k;
          return new Min(x, new EE());
        } else if ($2 instanceof T) {
          let $3 = $2.c;
          if ($3 instanceof R) {
            let $4 = $2.l;
            if ($4 instanceof E) {
              let $5 = $2.r;
              if ($5 instanceof E) {
                let x = node.k;
                let y = $2.k;
                return new Min(x, new T(new B(), new E(), y, new E()));
              } else {
                let c = $;
                let k = $1;
                let x = node.k;
                let b = $2;
                let $6 = min_del(k);
                if ($6 instanceof Min) {
                  let x1 = $6[0];
                  let a1 = $6[1];
                  return new Min(x1, rotate(c, a1, x, b));
                } else {
                  return $6;
                }
              }
            } else {
              let c = $;
              let k = $1;
              let x = node.k;
              let b = $2;
              let $5 = min_del(k);
              if ($5 instanceof Min) {
                let x1 = $5[0];
                let a1 = $5[1];
                return new Min(x1, rotate(c, a1, x, b));
              } else {
                return $5;
              }
            }
          } else {
            let c = $;
            let k = $1;
            let x = node.k;
            let b = $2;
            let $4 = min_del(k);
            if ($4 instanceof Min) {
              let x1 = $4[0];
              let a1 = $4[1];
              return new Min(x1, rotate(c, a1, x, b));
            } else {
              return $4;
            }
          }
        } else {
          let c = $;
          let k = $1;
          let x = node.k;
          let b = $2;
          let $3 = min_del(k);
          if ($3 instanceof Min) {
            let x1 = $3[0];
            let a1 = $3[1];
            return new Min(x1, rotate(c, a1, x, b));
          } else {
            return $3;
          }
        }
      } else {
        let c = $;
        let k = $1;
        let x = node.k;
        let b = node.r;
        let $2 = min_del(k);
        if ($2 instanceof Min) {
          let x1 = $2[0];
          let a1 = $2[1];
          return new Min(x1, rotate(c, a1, x, b));
        } else {
          return $2;
        }
      }
    } else {
      let c = $;
      let k = node.l;
      let x = node.k;
      let b = node.r;
      let $1 = min_del(k);
      if ($1 instanceof Min) {
        let x1 = $1[0];
        let a1 = $1[1];
        return new Min(x1, rotate(c, a1, x, b));
      } else {
        return $1;
      }
    }
  } else {
    return new None();
  }
}

function del(node, x, compare) {
  if (node instanceof E) {
    return node;
  } else if (node instanceof T) {
    let $ = node.c;
    if ($ instanceof R) {
      let $1 = node.l;
      if ($1 instanceof E) {
        let $2 = node.r;
        if ($2 instanceof E) {
          let y = node.k;
          let $3 = compare(x, y[0]);
          if ($3 instanceof Eq) {
            return new E();
          } else {
            return node;
          }
        } else {
          let c = $;
          let k = $1;
          let y = node.k;
          let b = $2;
          let $3 = compare(x, y[0]);
          if ($3 instanceof Lt) {
            return rotate(c, del(k, x, compare), y, b);
          } else if ($3 instanceof Eq) {
            let $4 = min_del(b);
            if ($4 instanceof Min) {
              let y1 = $4[0];
              let b1 = $4[1];
              return rotate(c, k, y1, b1);
            } else {
              return new E();
            }
          } else {
            return rotate(c, k, y, del(b, x, compare));
          }
        }
      } else {
        let c = $;
        let k = $1;
        let y = node.k;
        let b = node.r;
        let $2 = compare(x, y[0]);
        if ($2 instanceof Lt) {
          return rotate(c, del(k, x, compare), y, b);
        } else if ($2 instanceof Eq) {
          let $3 = min_del(b);
          if ($3 instanceof Min) {
            let y1 = $3[0];
            let b1 = $3[1];
            return rotate(c, k, y1, b1);
          } else {
            return new E();
          }
        } else {
          return rotate(c, k, y, del(b, x, compare));
        }
      }
    } else if ($ instanceof B) {
      let $1 = node.l;
      if ($1 instanceof E) {
        let $2 = node.r;
        if ($2 instanceof E) {
          let y = node.k;
          let $3 = compare(x, y[0]);
          if ($3 instanceof Eq) {
            return new EE();
          } else {
            return node;
          }
        } else {
          let c = $;
          let k = $1;
          let y = node.k;
          let b = $2;
          let $3 = compare(x, y[0]);
          if ($3 instanceof Lt) {
            return rotate(c, del(k, x, compare), y, b);
          } else if ($3 instanceof Eq) {
            let $4 = min_del(b);
            if ($4 instanceof Min) {
              let y1 = $4[0];
              let b1 = $4[1];
              return rotate(c, k, y1, b1);
            } else {
              return new E();
            }
          } else {
            return rotate(c, k, y, del(b, x, compare));
          }
        }
      } else if ($1 instanceof T) {
        let $2 = node.r;
        if ($2 instanceof E) {
          let $3 = $1.c;
          if ($3 instanceof R) {
            let $4 = $1.l;
            if ($4 instanceof E) {
              let $5 = $1.r;
              if ($5 instanceof E) {
                let l = $1;
                let z = node.k;
                let y = $1.k;
                let $6 = compare(x, z[0]);
                if ($6 instanceof Lt) {
                  return new T(new B(), del(l, x, compare), z, new E());
                } else if ($6 instanceof Eq) {
                  return new T(new B(), new E(), y, new E());
                } else {
                  return node;
                }
              } else {
                let c = $;
                let k = $1;
                let y = node.k;
                let b = $2;
                let $6 = compare(x, y[0]);
                if ($6 instanceof Lt) {
                  return rotate(c, del(k, x, compare), y, b);
                } else if ($6 instanceof Eq) {
                  let $7 = min_del(b);
                  if ($7 instanceof Min) {
                    let y1 = $7[0];
                    let b1 = $7[1];
                    return rotate(c, k, y1, b1);
                  } else {
                    return new E();
                  }
                } else {
                  return rotate(c, k, y, del(b, x, compare));
                }
              }
            } else {
              let c = $;
              let k = $1;
              let y = node.k;
              let b = $2;
              let $5 = compare(x, y[0]);
              if ($5 instanceof Lt) {
                return rotate(c, del(k, x, compare), y, b);
              } else if ($5 instanceof Eq) {
                let $6 = min_del(b);
                if ($6 instanceof Min) {
                  let y1 = $6[0];
                  let b1 = $6[1];
                  return rotate(c, k, y1, b1);
                } else {
                  return new E();
                }
              } else {
                return rotate(c, k, y, del(b, x, compare));
              }
            }
          } else {
            let c = $;
            let k = $1;
            let y = node.k;
            let b = $2;
            let $4 = compare(x, y[0]);
            if ($4 instanceof Lt) {
              return rotate(c, del(k, x, compare), y, b);
            } else if ($4 instanceof Eq) {
              let $5 = min_del(b);
              if ($5 instanceof Min) {
                let y1 = $5[0];
                let b1 = $5[1];
                return rotate(c, k, y1, b1);
              } else {
                return new E();
              }
            } else {
              return rotate(c, k, y, del(b, x, compare));
            }
          }
        } else {
          let c = $;
          let k = $1;
          let y = node.k;
          let b = $2;
          let $3 = compare(x, y[0]);
          if ($3 instanceof Lt) {
            return rotate(c, del(k, x, compare), y, b);
          } else if ($3 instanceof Eq) {
            let $4 = min_del(b);
            if ($4 instanceof Min) {
              let y1 = $4[0];
              let b1 = $4[1];
              return rotate(c, k, y1, b1);
            } else {
              return new E();
            }
          } else {
            return rotate(c, k, y, del(b, x, compare));
          }
        }
      } else {
        let c = $;
        let k = $1;
        let y = node.k;
        let b = node.r;
        let $2 = compare(x, y[0]);
        if ($2 instanceof Lt) {
          return rotate(c, del(k, x, compare), y, b);
        } else if ($2 instanceof Eq) {
          let $3 = min_del(b);
          if ($3 instanceof Min) {
            let y1 = $3[0];
            let b1 = $3[1];
            return rotate(c, k, y1, b1);
          } else {
            return new E();
          }
        } else {
          return rotate(c, k, y, del(b, x, compare));
        }
      }
    } else {
      let c = $;
      let k = node.l;
      let y = node.k;
      let b = node.r;
      let $1 = compare(x, y[0]);
      if ($1 instanceof Lt) {
        return rotate(c, del(k, x, compare), y, b);
      } else if ($1 instanceof Eq) {
        let $2 = min_del(b);
        if ($2 instanceof Min) {
          let y1 = $2[0];
          let b1 = $2[1];
          return rotate(c, k, y1, b1);
        } else {
          return new E();
        }
      } else {
        return rotate(c, k, y, del(b, x, compare));
      }
    }
  } else {
    return node;
  }
}

/**
 * Removes a key-value pair from the map, if the key exists.
 * Time complexity: O(log n)
 */
export function delete$(tree, key) {
  return new Map(del(redden(tree.root), key, tree.compare), tree.compare);
}

function do_find(loop$node, loop$key, loop$compare) {
  while (true) {
    let node = loop$node;
    let key = loop$key;
    let compare = loop$compare;
    if (node instanceof T) {
      let l = node.l;
      let k = node.k;
      let r = node.r;
      let $ = compare(key, k[0]);
      if ($ instanceof Lt) {
        loop$node = l;
        loop$key = key;
        loop$compare = compare;
      } else if ($ instanceof Eq) {
        return new Ok(k);
      } else {
        loop$node = r;
        loop$key = key;
        loop$compare = compare;
      }
    } else {
      return new Error(undefined);
    }
  }
}

/**
 * Searches for a key in the map and returns the associated value if found.
 * Time complexity: O(log n)
 */
export function find(tree, key) {
  let $ = do_find(tree.root, key, tree.compare);
  if ($ instanceof Ok) {
    let entry = $[0];
    return new Ok(entry[1]);
  } else {
    return new Error(undefined);
  }
}

function do_larger(loop$node, loop$key, loop$compare) {
  while (true) {
    let node = loop$node;
    let key = loop$key;
    let compare = loop$compare;
    if (node instanceof T) {
      let l = node.l;
      let k = node.k;
      let r = node.r;
      let $ = compare(key, k[0]);
      if ($ instanceof Lt) {
        let $1 = do_larger(l, key, compare);
        if ($1 instanceof Ok) {
          return $1;
        } else {
          return new Ok(k);
        }
      } else {
        loop$node = r;
        loop$key = key;
        loop$compare = compare;
      }
    } else {
      return new Error(undefined);
    }
  }
}

/**
 * Find the smallest key that is larger than the given key.
 * Time complexity: O(log n)
 */
export function larger(tree, key) {
  let $ = do_larger(tree.root, key, tree.compare);
  if ($ instanceof Ok) {
    return $;
  } else {
    return new Error(undefined);
  }
}

function do_smaller(loop$node, loop$key, loop$compare) {
  while (true) {
    let node = loop$node;
    let key = loop$key;
    let compare = loop$compare;
    if (node instanceof T) {
      let l = node.l;
      let k = node.k;
      let r = node.r;
      let $ = compare(key, k[0]);
      if ($ instanceof Gt) {
        let $1 = do_smaller(r, key, compare);
        if ($1 instanceof Ok) {
          return $1;
        } else {
          return new Ok(k);
        }
      } else {
        loop$node = l;
        loop$key = key;
        loop$compare = compare;
      }
    } else {
      return new Error(undefined);
    }
  }
}

/**
 * Find the largest key that is smaller than the given key.
 * Time complexity: O(log n)
 */
export function smaller(tree, key) {
  let $ = do_smaller(tree.root, key, tree.compare);
  if ($ instanceof Ok) {
    return $;
  } else {
    return new Error(undefined);
  }
}

function do_fold(node, acc, fun) {
  if (node instanceof T) {
    let r = node.l;
    let v = node.k;
    let l = node.r;
    let acc$1 = do_fold(r, acc, fun);
    let acc$2 = fun(acc$1, v[0], v[1]);
    let acc$3 = do_fold(l, acc$2, fun);
    return acc$3;
  } else {
    return acc;
  }
}

/**
 * Applies a function to every key-value pair in the map, accumulating
 * the results with the provided initial accumulator value.
 * Time complexity: O(n)
 */
export function fold(tree, acc, fun) {
  return do_fold(tree.root, acc, fun);
}

function do_foldr(node, acc, fun) {
  if (node instanceof T) {
    let r = node.l;
    let v = node.k;
    let l = node.r;
    let acc$1 = do_foldr(l, acc, fun);
    let acc$2 = fun(acc$1, v[0], v[1]);
    let acc$3 = do_foldr(r, acc$2, fun);
    return acc$3;
  } else {
    return acc;
  }
}

/**
 * Applies a function to every key-value pair in the map, accumulating
 * the results with the provided initial accumulator value, but in reverse order.
 * Time complexity: O(n)
 */
export function foldr(tree, acc, fun) {
  return do_foldr(tree.root, acc, fun);
}
