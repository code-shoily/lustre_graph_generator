var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// build/dev/javascript/prelude.mjs
class CustomType {
  withFields(fields) {
    let properties = Object.keys(this).map((label) => (label in fields) ? fields[label] : this[label]);
    return new this.constructor(...properties);
  }
}

class List {
  static fromArray(array, tail) {
    let t = tail || new Empty;
    for (let i = array.length - 1;i >= 0; --i) {
      t = new NonEmpty(array[i], t);
    }
    return t;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
  toArray() {
    return [...this];
  }
  atLeastLength(desired) {
    let current = this;
    while (desired-- > 0 && current)
      current = current.tail;
    return current !== undefined;
  }
  hasLength(desired) {
    let current = this;
    while (desired-- > 0 && current)
      current = current.tail;
    return desired === -1 && current instanceof Empty;
  }
  countLength() {
    let current = this;
    let length = 0;
    while (current) {
      current = current.tail;
      length++;
    }
    return length - 1;
  }
}
function prepend(element, tail) {
  return new NonEmpty(element, tail);
}
function toList(elements, tail) {
  return List.fromArray(elements, tail);
}

class ListIterator {
  #current;
  constructor(current) {
    this.#current = current;
  }
  next() {
    if (this.#current instanceof Empty) {
      return { done: true };
    } else {
      let { head, tail } = this.#current;
      this.#current = tail;
      return { value: head, done: false };
    }
  }
}

class Empty extends List {
}
var List$Empty = () => new Empty;
var List$isEmpty = (value) => value instanceof Empty;

class NonEmpty extends List {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
}
var List$NonEmpty = (head, tail) => new NonEmpty(head, tail);
var List$isNonEmpty = (value) => value instanceof NonEmpty;
var List$NonEmpty$first = (value) => value.head;
var List$NonEmpty$rest = (value) => value.tail;

class BitArray {
  bitSize;
  byteSize;
  bitOffset;
  rawBuffer;
  constructor(buffer, bitSize, bitOffset) {
    if (!(buffer instanceof Uint8Array)) {
      throw globalThis.Error("BitArray can only be constructed from a Uint8Array");
    }
    this.bitSize = bitSize ?? buffer.length * 8;
    this.byteSize = Math.trunc((this.bitSize + 7) / 8);
    this.bitOffset = bitOffset ?? 0;
    if (this.bitSize < 0) {
      throw globalThis.Error(`BitArray bit size is invalid: ${this.bitSize}`);
    }
    if (this.bitOffset < 0 || this.bitOffset > 7) {
      throw globalThis.Error(`BitArray bit offset is invalid: ${this.bitOffset}`);
    }
    if (buffer.length !== Math.trunc((this.bitOffset + this.bitSize + 7) / 8)) {
      throw globalThis.Error("BitArray buffer length is invalid");
    }
    this.rawBuffer = buffer;
  }
  byteAt(index) {
    if (index < 0 || index >= this.byteSize) {
      return;
    }
    return bitArrayByteAt(this.rawBuffer, this.bitOffset, index);
  }
  equals(other) {
    if (this.bitSize !== other.bitSize) {
      return false;
    }
    const wholeByteCount = Math.trunc(this.bitSize / 8);
    if (this.bitOffset === 0 && other.bitOffset === 0) {
      for (let i = 0;i < wholeByteCount; i++) {
        if (this.rawBuffer[i] !== other.rawBuffer[i]) {
          return false;
        }
      }
      const trailingBitsCount = this.bitSize % 8;
      if (trailingBitsCount) {
        const unusedLowBitCount = 8 - trailingBitsCount;
        if (this.rawBuffer[wholeByteCount] >> unusedLowBitCount !== other.rawBuffer[wholeByteCount] >> unusedLowBitCount) {
          return false;
        }
      }
    } else {
      for (let i = 0;i < wholeByteCount; i++) {
        const a = bitArrayByteAt(this.rawBuffer, this.bitOffset, i);
        const b = bitArrayByteAt(other.rawBuffer, other.bitOffset, i);
        if (a !== b) {
          return false;
        }
      }
      const trailingBitsCount = this.bitSize % 8;
      if (trailingBitsCount) {
        const a = bitArrayByteAt(this.rawBuffer, this.bitOffset, wholeByteCount);
        const b = bitArrayByteAt(other.rawBuffer, other.bitOffset, wholeByteCount);
        const unusedLowBitCount = 8 - trailingBitsCount;
        if (a >> unusedLowBitCount !== b >> unusedLowBitCount) {
          return false;
        }
      }
    }
    return true;
  }
  get buffer() {
    bitArrayPrintDeprecationWarning("buffer", "Use BitArray.byteAt() or BitArray.rawBuffer instead");
    if (this.bitOffset !== 0 || this.bitSize % 8 !== 0) {
      throw new globalThis.Error("BitArray.buffer does not support unaligned bit arrays");
    }
    return this.rawBuffer;
  }
  get length() {
    bitArrayPrintDeprecationWarning("length", "Use BitArray.bitSize or BitArray.byteSize instead");
    if (this.bitOffset !== 0 || this.bitSize % 8 !== 0) {
      throw new globalThis.Error("BitArray.length does not support unaligned bit arrays");
    }
    return this.rawBuffer.length;
  }
}
function bitArrayByteAt(buffer, bitOffset, index) {
  if (bitOffset === 0) {
    return buffer[index] ?? 0;
  } else {
    const a = buffer[index] << bitOffset & 255;
    const b = buffer[index + 1] >> 8 - bitOffset;
    return a | b;
  }
}

class UtfCodepoint {
  constructor(value) {
    this.value = value;
  }
}
var isBitArrayDeprecationMessagePrinted = {};
function bitArrayPrintDeprecationWarning(name, message) {
  if (isBitArrayDeprecationMessagePrinted[name]) {
    return;
  }
  console.warn(`Deprecated BitArray.${name} property used in JavaScript FFI code. ${message}.`);
  isBitArrayDeprecationMessagePrinted[name] = true;
}
class Result extends CustomType {
  static isResult(data2) {
    return data2 instanceof Result;
  }
}

class Ok extends Result {
  constructor(value) {
    super();
    this[0] = value;
  }
  isOk() {
    return true;
  }
}
var Result$Ok = (value) => new Ok(value);
var Result$isOk = (value) => value instanceof Ok;
var Result$Ok$0 = (value) => value[0];

class Error2 extends Result {
  constructor(detail) {
    super();
    this[0] = detail;
  }
  isOk() {
    return false;
  }
}
var Result$Error = (detail) => new Error2(detail);
var Result$isError = (value) => value instanceof Error2;
function isEqual(x, y) {
  let values = [x, y];
  while (values.length) {
    let a = values.pop();
    let b = values.pop();
    if (a === b)
      continue;
    if (!isObject(a) || !isObject(b))
      return false;
    let unequal = !structurallyCompatibleObjects(a, b) || unequalDates(a, b) || unequalBuffers(a, b) || unequalArrays(a, b) || unequalMaps(a, b) || unequalSets(a, b) || unequalRegExps(a, b);
    if (unequal)
      return false;
    const proto = Object.getPrototypeOf(a);
    if (proto !== null && typeof proto.equals === "function") {
      try {
        if (a.equals(b))
          continue;
        else
          return false;
      } catch {}
    }
    let [keys, get] = getters(a);
    const ka = keys(a);
    const kb = keys(b);
    if (ka.length !== kb.length)
      return false;
    for (let k of ka) {
      values.push(get(a, k), get(b, k));
    }
  }
  return true;
}
function getters(object) {
  if (object instanceof Map) {
    return [(x) => x.keys(), (x, y) => x.get(y)];
  } else {
    let extra = object instanceof globalThis.Error ? ["message"] : [];
    return [(x) => [...extra, ...Object.keys(x)], (x, y) => x[y]];
  }
}
function unequalDates(a, b) {
  return a instanceof Date && (a > b || a < b);
}
function unequalBuffers(a, b) {
  return !(a instanceof BitArray) && a.buffer instanceof ArrayBuffer && a.BYTES_PER_ELEMENT && !(a.byteLength === b.byteLength && a.every((n, i) => n === b[i]));
}
function unequalArrays(a, b) {
  return Array.isArray(a) && a.length !== b.length;
}
function unequalMaps(a, b) {
  return a instanceof Map && a.size !== b.size;
}
function unequalSets(a, b) {
  return a instanceof Set && (a.size != b.size || [...a].some((e) => !b.has(e)));
}
function unequalRegExps(a, b) {
  return a instanceof RegExp && (a.source !== b.source || a.flags !== b.flags);
}
function isObject(a) {
  return typeof a === "object" && a !== null;
}
function structurallyCompatibleObjects(a, b) {
  if (typeof a !== "object" && typeof b !== "object" && (!a || !b))
    return false;
  let nonstructural = [Promise, WeakSet, WeakMap, Function];
  if (nonstructural.some((c) => a instanceof c))
    return false;
  return a.constructor === b.constructor;
}
function remainderInt(a, b) {
  if (b === 0) {
    return 0;
  } else {
    return a % b;
  }
}
function makeError(variant, file, module, line, fn, message, extra) {
  let error = new globalThis.Error(message);
  error.gleam_error = variant;
  error.file = file;
  error.module = module;
  error.line = line;
  error.function = fn;
  error.fn = fn;
  for (let k in extra)
    error[k] = extra[k];
  return error;
}
// build/dev/javascript/gleam_stdlib/dict.mjs
var referenceMap = /* @__PURE__ */ new WeakMap;
var tempDataView = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
var referenceUID = 0;
function hashByReference(o) {
  const known = referenceMap.get(o);
  if (known !== undefined) {
    return known;
  }
  const hash = referenceUID++;
  if (referenceUID === 2147483647) {
    referenceUID = 0;
  }
  referenceMap.set(o, hash);
  return hash;
}
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
function hashString(s) {
  let hash = 0;
  const len = s.length;
  for (let i = 0;i < len; i++) {
    hash = Math.imul(31, hash) + s.charCodeAt(i) | 0;
  }
  return hash;
}
function hashNumber(n) {
  tempDataView.setFloat64(0, n);
  const i = tempDataView.getInt32(0);
  const j = tempDataView.getInt32(4);
  return Math.imul(73244475, i >> 16 ^ i) ^ j;
}
function hashBigInt(n) {
  return hashString(n.toString());
}
function hashObject(o) {
  const proto = Object.getPrototypeOf(o);
  if (proto !== null && typeof proto.hashCode === "function") {
    try {
      const code = o.hashCode(o);
      if (typeof code === "number") {
        return code;
      }
    } catch {}
  }
  if (o instanceof Promise || o instanceof WeakSet || o instanceof WeakMap) {
    return hashByReference(o);
  }
  if (o instanceof Date) {
    return hashNumber(o.getTime());
  }
  let h = 0;
  if (o instanceof ArrayBuffer) {
    o = new Uint8Array(o);
  }
  if (Array.isArray(o) || o instanceof Uint8Array) {
    for (let i = 0;i < o.length; i++) {
      h = Math.imul(31, h) + getHash(o[i]) | 0;
    }
  } else if (o instanceof Set) {
    o.forEach((v) => {
      h = h + getHash(v) | 0;
    });
  } else if (o instanceof Map) {
    o.forEach((v, k) => {
      h = h + hashMerge(getHash(v), getHash(k)) | 0;
    });
  } else {
    const keys = Object.keys(o);
    for (let i = 0;i < keys.length; i++) {
      const k = keys[i];
      const v = o[k];
      h = h + hashMerge(getHash(v), hashString(k)) | 0;
    }
  }
  return h;
}
function getHash(u) {
  if (u === null)
    return 1108378658;
  if (u === undefined)
    return 1108378659;
  if (u === true)
    return 1108378657;
  if (u === false)
    return 1108378656;
  switch (typeof u) {
    case "number":
      return hashNumber(u);
    case "string":
      return hashString(u);
    case "bigint":
      return hashBigInt(u);
    case "object":
      return hashObject(u);
    case "symbol":
      return hashByReference(u);
    case "function":
      return hashByReference(u);
    default:
      return 0;
  }
}

class Dict {
  constructor(size, root) {
    this.size = size;
    this.root = root;
  }
}
var bits = 5;
var mask = (1 << bits) - 1;
var noElementMarker = Symbol();
var generationKey = Symbol();
var emptyNode = /* @__PURE__ */ newNode(0);
var emptyDict = /* @__PURE__ */ new Dict(0, emptyNode);
var errorNil = /* @__PURE__ */ Result$Error(undefined);
function makeNode(generation, datamap, nodemap, data2) {
  return {
    datamap,
    nodemap,
    data: data2,
    [generationKey]: generation
  };
}
function newNode(generation) {
  return makeNode(generation, 0, 0, []);
}
function copyNode(node, generation) {
  if (node[generationKey] === generation) {
    return node;
  }
  const newData = node.data.slice(0);
  return makeNode(generation, node.datamap, node.nodemap, newData);
}
function copyAndSet(node, generation, idx, val) {
  if (node.data[idx] === val) {
    return node;
  }
  node = copyNode(node, generation);
  node.data[idx] = val;
  return node;
}
function copyAndInsertPair(node, generation, bit, idx, key, val) {
  const data2 = node.data;
  const length = data2.length;
  const newData = new Array(length + 2);
  let readIndex = 0;
  let writeIndex = 0;
  while (readIndex < idx)
    newData[writeIndex++] = data2[readIndex++];
  newData[writeIndex++] = key;
  newData[writeIndex++] = val;
  while (readIndex < length)
    newData[writeIndex++] = data2[readIndex++];
  return makeNode(generation, node.datamap | bit, node.nodemap, newData);
}
function make() {
  return emptyDict;
}
function size(dict) {
  return dict.size;
}
function get(dict, key) {
  const result = lookup(dict.root, key, getHash(key));
  return result !== noElementMarker ? Result$Ok(result) : errorNil;
}
function lookup(node, key, hash) {
  for (let shift = 0;shift < 32; shift += bits) {
    const data2 = node.data;
    const bit = hashbit(hash, shift);
    if (node.nodemap & bit) {
      node = data2[data2.length - 1 - index(node.nodemap, bit)];
    } else if (node.datamap & bit) {
      const dataidx = Math.imul(index(node.datamap, bit), 2);
      return isEqual(key, data2[dataidx]) ? data2[dataidx + 1] : noElementMarker;
    } else {
      return noElementMarker;
    }
  }
  const overflow = node.data;
  for (let i = 0;i < overflow.length; i += 2) {
    if (isEqual(key, overflow[i])) {
      return overflow[i + 1];
    }
  }
  return noElementMarker;
}
function toTransient(dict) {
  return {
    generation: nextGeneration(dict),
    root: dict.root,
    size: dict.size,
    dict
  };
}
function fromTransient(transient) {
  if (transient.root === transient.dict.root) {
    return transient.dict;
  }
  return new Dict(transient.size, transient.root);
}
function nextGeneration(dict) {
  const root = dict.root;
  if (root[generationKey] < Number.MAX_SAFE_INTEGER) {
    return root[generationKey] + 1;
  }
  const queue = [root];
  while (queue.length) {
    const node = queue.pop();
    node[generationKey] = 0;
    const nodeStart = data.length - popcount(node.nodemap);
    for (let i = nodeStart;i < node.data.length; ++i) {
      queue.push(node.data[i]);
    }
  }
  return 1;
}
var globalTransient = /* @__PURE__ */ toTransient(emptyDict);
function insert(dict, key, value) {
  globalTransient.generation = nextGeneration(dict);
  globalTransient.size = dict.size;
  const hash = getHash(key);
  const root = insertIntoNode(globalTransient, dict.root, key, value, hash, 0);
  if (root === dict.root) {
    return dict;
  }
  return new Dict(globalTransient.size, root);
}
function destructiveTransientInsert(key, value, transient) {
  const hash = getHash(key);
  transient.root = insertIntoNode(transient, transient.root, key, value, hash, 0);
  return transient;
}
function insertIntoNode(transient, node, key, value, hash, shift) {
  const data2 = node.data;
  const generation = transient.generation;
  if (shift > 32) {
    for (let i = 0;i < data2.length; i += 2) {
      if (isEqual(key, data2[i])) {
        return copyAndSet(node, generation, i + 1, value);
      }
    }
    transient.size += 1;
    return copyAndInsertPair(node, generation, 0, data2.length, key, value);
  }
  const bit = hashbit(hash, shift);
  if (node.nodemap & bit) {
    const nodeidx2 = data2.length - 1 - index(node.nodemap, bit);
    let child2 = data2[nodeidx2];
    child2 = insertIntoNode(transient, child2, key, value, hash, shift + bits);
    return copyAndSet(node, generation, nodeidx2, child2);
  }
  const dataidx = Math.imul(index(node.datamap, bit), 2);
  if ((node.datamap & bit) === 0) {
    transient.size += 1;
    return copyAndInsertPair(node, generation, bit, dataidx, key, value);
  }
  if (isEqual(key, data2[dataidx])) {
    return copyAndSet(node, generation, dataidx + 1, value);
  }
  const childShift = shift + bits;
  let child = emptyNode;
  child = insertIntoNode(transient, child, key, value, hash, childShift);
  const key2 = data2[dataidx];
  const value2 = data2[dataidx + 1];
  const hash2 = getHash(key2);
  child = insertIntoNode(transient, child, key2, value2, hash2, childShift);
  transient.size -= 1;
  const length = data2.length;
  const nodeidx = length - 1 - index(node.nodemap, bit);
  const newData = new Array(length - 1);
  let readIndex = 0;
  let writeIndex = 0;
  while (readIndex < dataidx)
    newData[writeIndex++] = data2[readIndex++];
  readIndex += 2;
  while (readIndex <= nodeidx)
    newData[writeIndex++] = data2[readIndex++];
  newData[writeIndex++] = child;
  while (readIndex < length)
    newData[writeIndex++] = data2[readIndex++];
  return makeNode(generation, node.datamap ^ bit, node.nodemap | bit, newData);
}
function map(dict, fun) {
  const generation = nextGeneration(dict);
  const root = copyNode(dict.root, generation);
  const queue = [root];
  while (queue.length) {
    const node = queue.pop();
    const data2 = node.data;
    const edgesStart = data2.length - popcount(node.nodemap);
    for (let i = 0;i < edgesStart; i += 2) {
      data2[i + 1] = fun(data2[i], data2[i + 1]);
    }
    for (let i = edgesStart;i < data2.length; ++i) {
      data2[i] = copyNode(data2[i], generation);
      queue.push(data2[i]);
    }
  }
  return new Dict(dict.size, root);
}
function fold(dict, state, fun) {
  const queue = [dict.root];
  while (queue.length) {
    const node = queue.pop();
    const data2 = node.data;
    const edgesStart = data2.length - popcount(node.nodemap);
    for (let i = 0;i < edgesStart; i += 2) {
      state = fun(state, data2[i], data2[i + 1]);
    }
    for (let i = edgesStart;i < data2.length; ++i) {
      queue.push(data2[i]);
    }
  }
  return state;
}
function popcount(n) {
  n -= n >>> 1 & 1431655765;
  n = (n & 858993459) + (n >>> 2 & 858993459);
  return Math.imul(n + (n >>> 4) & 252645135, 16843009) >>> 24;
}
function index(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}
function hashbit(hash, shift) {
  return 1 << (hash >>> shift & mask);
}

// build/dev/javascript/gleam_stdlib/gleam/option.mjs
class Some extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
var Option$isSome = (value) => value instanceof Some;
var Option$Some$0 = (value) => value[0];

class None extends CustomType {
}

// build/dev/javascript/gleam_stdlib/gleam/dict.mjs
function from_list_loop(loop$transient, loop$list) {
  while (true) {
    let transient = loop$transient;
    let list = loop$list;
    if (list instanceof Empty) {
      return fromTransient(transient);
    } else {
      let rest = list.tail;
      let key = list.head[0];
      let value = list.head[1];
      loop$transient = destructiveTransientInsert(key, value, transient);
      loop$list = rest;
    }
  }
}
function from_list(list) {
  return from_list_loop(toTransient(make()), list);
}
function upsert(dict, key, fun) {
  let $ = get(dict, key);
  if ($ instanceof Ok) {
    let value = $[0];
    return insert(dict, key, fun(new Some(value)));
  } else {
    return insert(dict, key, fun(new None));
  }
}
function to_list(dict) {
  return fold(dict, toList([]), (acc, key, value) => {
    return prepend([key, value], acc);
  });
}
function keys(dict) {
  return fold(dict, toList([]), (acc, key, _) => {
    return prepend(key, acc);
  });
}

// build/dev/javascript/gleam_stdlib/gleam/order.mjs
class Lt extends CustomType {
}
var Order$Lt = () => new Lt;
class Eq extends CustomType {
}
var Order$Eq = () => new Eq;
class Gt extends CustomType {
}
var Order$Gt = () => new Gt;

// build/dev/javascript/gleam_stdlib/gleam/int.mjs
function compare(a, b) {
  let $ = a === b;
  if ($) {
    return new Eq;
  } else {
    let $1 = a < b;
    if ($1) {
      return new Lt;
    } else {
      return new Gt;
    }
  }
}
function min(a, b) {
  let $ = a < b;
  if ($) {
    return a;
  } else {
    return b;
  }
}
function max(a, b) {
  let $ = a > b;
  if ($) {
    return a;
  } else {
    return b;
  }
}
function random(max2) {
  let _pipe = random_uniform() * identity(max2);
  let _pipe$1 = floor(_pipe);
  return round(_pipe$1);
}
function add(a, b) {
  return a + b;
}

// build/dev/javascript/gleam_stdlib/gleam/list.mjs
class Ascending extends CustomType {
}

class Descending extends CustomType {
}
function length_loop(loop$list, loop$count) {
  while (true) {
    let list = loop$list;
    let count = loop$count;
    if (list instanceof Empty) {
      return count;
    } else {
      let list$1 = list.tail;
      loop$list = list$1;
      loop$count = count + 1;
    }
  }
}
function length(list) {
  return length_loop(list, 0);
}
function reverse_and_prepend(loop$prefix, loop$suffix) {
  while (true) {
    let prefix = loop$prefix;
    let suffix = loop$suffix;
    if (prefix instanceof Empty) {
      return suffix;
    } else {
      let first$1 = prefix.head;
      let rest$1 = prefix.tail;
      loop$prefix = rest$1;
      loop$suffix = prepend(first$1, suffix);
    }
  }
}
function reverse(list) {
  return reverse_and_prepend(list, toList([]));
}
function is_empty2(list) {
  return isEqual(list, toList([]));
}
function contains(loop$list, loop$elem) {
  while (true) {
    let list = loop$list;
    let elem = loop$elem;
    if (list instanceof Empty) {
      return false;
    } else {
      let first$1 = list.head;
      if (isEqual(first$1, elem)) {
        return true;
      } else {
        let rest$1 = list.tail;
        loop$list = rest$1;
        loop$elem = elem;
      }
    }
  }
}
function filter_loop(loop$list, loop$fun, loop$acc) {
  while (true) {
    let list = loop$list;
    let fun = loop$fun;
    let acc = loop$acc;
    if (list instanceof Empty) {
      return reverse(acc);
    } else {
      let first$1 = list.head;
      let rest$1 = list.tail;
      let _block;
      let $ = fun(first$1);
      if ($) {
        _block = prepend(first$1, acc);
      } else {
        _block = acc;
      }
      let new_acc = _block;
      loop$list = rest$1;
      loop$fun = fun;
      loop$acc = new_acc;
    }
  }
}
function filter(list, predicate) {
  return filter_loop(list, predicate, toList([]));
}
function map_loop(loop$list, loop$fun, loop$acc) {
  while (true) {
    let list = loop$list;
    let fun = loop$fun;
    let acc = loop$acc;
    if (list instanceof Empty) {
      return reverse(acc);
    } else {
      let first$1 = list.head;
      let rest$1 = list.tail;
      loop$list = rest$1;
      loop$fun = fun;
      loop$acc = prepend(fun(first$1), acc);
    }
  }
}
function map2(list, fun) {
  return map_loop(list, fun, toList([]));
}
function append_loop(loop$first, loop$second) {
  while (true) {
    let first = loop$first;
    let second = loop$second;
    if (first instanceof Empty) {
      return second;
    } else {
      let first$1 = first.head;
      let rest$1 = first.tail;
      loop$first = rest$1;
      loop$second = prepend(first$1, second);
    }
  }
}
function append(first, second) {
  return append_loop(reverse(first), second);
}
function prepend2(list, item) {
  return prepend(item, list);
}
function flatten_loop(loop$lists, loop$acc) {
  while (true) {
    let lists = loop$lists;
    let acc = loop$acc;
    if (lists instanceof Empty) {
      return reverse(acc);
    } else {
      let list = lists.head;
      let further_lists = lists.tail;
      loop$lists = further_lists;
      loop$acc = reverse_and_prepend(list, acc);
    }
  }
}
function flatten(lists) {
  return flatten_loop(lists, toList([]));
}
function flat_map(list, fun) {
  return flatten(map2(list, fun));
}
function fold2(loop$list, loop$initial, loop$fun) {
  while (true) {
    let list = loop$list;
    let initial = loop$initial;
    let fun = loop$fun;
    if (list instanceof Empty) {
      return initial;
    } else {
      let first$1 = list.head;
      let rest$1 = list.tail;
      loop$list = rest$1;
      loop$initial = fun(initial, first$1);
      loop$fun = fun;
    }
  }
}
function index_fold_loop(loop$over, loop$acc, loop$with, loop$index) {
  while (true) {
    let over = loop$over;
    let acc = loop$acc;
    let with$ = loop$with;
    let index2 = loop$index;
    if (over instanceof Empty) {
      return acc;
    } else {
      let first$1 = over.head;
      let rest$1 = over.tail;
      loop$over = rest$1;
      loop$acc = with$(acc, first$1, index2);
      loop$with = with$;
      loop$index = index2 + 1;
    }
  }
}
function index_fold(list, initial, fun) {
  return index_fold_loop(list, initial, fun, 0);
}
function find(loop$list, loop$is_desired) {
  while (true) {
    let list = loop$list;
    let is_desired = loop$is_desired;
    if (list instanceof Empty) {
      return new Error2(undefined);
    } else {
      let first$1 = list.head;
      let rest$1 = list.tail;
      let $ = is_desired(first$1);
      if ($) {
        return new Ok(first$1);
      } else {
        loop$list = rest$1;
        loop$is_desired = is_desired;
      }
    }
  }
}
function any(loop$list, loop$predicate) {
  while (true) {
    let list = loop$list;
    let predicate = loop$predicate;
    if (list instanceof Empty) {
      return false;
    } else {
      let first$1 = list.head;
      let rest$1 = list.tail;
      let $ = predicate(first$1);
      if ($) {
        return $;
      } else {
        loop$list = rest$1;
        loop$predicate = predicate;
      }
    }
  }
}
function sequences(loop$list, loop$compare, loop$growing, loop$direction, loop$prev, loop$acc) {
  while (true) {
    let list = loop$list;
    let compare3 = loop$compare;
    let growing = loop$growing;
    let direction = loop$direction;
    let prev = loop$prev;
    let acc = loop$acc;
    let growing$1 = prepend(prev, growing);
    if (list instanceof Empty) {
      if (direction instanceof Ascending) {
        return prepend(reverse(growing$1), acc);
      } else {
        return prepend(growing$1, acc);
      }
    } else {
      let new$1 = list.head;
      let rest$1 = list.tail;
      let $ = compare3(prev, new$1);
      if (direction instanceof Ascending) {
        if ($ instanceof Lt) {
          loop$list = rest$1;
          loop$compare = compare3;
          loop$growing = growing$1;
          loop$direction = direction;
          loop$prev = new$1;
          loop$acc = acc;
        } else if ($ instanceof Eq) {
          loop$list = rest$1;
          loop$compare = compare3;
          loop$growing = growing$1;
          loop$direction = direction;
          loop$prev = new$1;
          loop$acc = acc;
        } else {
          let _block;
          if (direction instanceof Ascending) {
            _block = prepend(reverse(growing$1), acc);
          } else {
            _block = prepend(growing$1, acc);
          }
          let acc$1 = _block;
          if (rest$1 instanceof Empty) {
            return prepend(toList([new$1]), acc$1);
          } else {
            let next = rest$1.head;
            let rest$2 = rest$1.tail;
            let _block$1;
            let $1 = compare3(new$1, next);
            if ($1 instanceof Lt) {
              _block$1 = new Ascending;
            } else if ($1 instanceof Eq) {
              _block$1 = new Ascending;
            } else {
              _block$1 = new Descending;
            }
            let direction$1 = _block$1;
            loop$list = rest$2;
            loop$compare = compare3;
            loop$growing = toList([new$1]);
            loop$direction = direction$1;
            loop$prev = next;
            loop$acc = acc$1;
          }
        }
      } else if ($ instanceof Lt) {
        let _block;
        if (direction instanceof Ascending) {
          _block = prepend(reverse(growing$1), acc);
        } else {
          _block = prepend(growing$1, acc);
        }
        let acc$1 = _block;
        if (rest$1 instanceof Empty) {
          return prepend(toList([new$1]), acc$1);
        } else {
          let next = rest$1.head;
          let rest$2 = rest$1.tail;
          let _block$1;
          let $1 = compare3(new$1, next);
          if ($1 instanceof Lt) {
            _block$1 = new Ascending;
          } else if ($1 instanceof Eq) {
            _block$1 = new Ascending;
          } else {
            _block$1 = new Descending;
          }
          let direction$1 = _block$1;
          loop$list = rest$2;
          loop$compare = compare3;
          loop$growing = toList([new$1]);
          loop$direction = direction$1;
          loop$prev = next;
          loop$acc = acc$1;
        }
      } else if ($ instanceof Eq) {
        let _block;
        if (direction instanceof Ascending) {
          _block = prepend(reverse(growing$1), acc);
        } else {
          _block = prepend(growing$1, acc);
        }
        let acc$1 = _block;
        if (rest$1 instanceof Empty) {
          return prepend(toList([new$1]), acc$1);
        } else {
          let next = rest$1.head;
          let rest$2 = rest$1.tail;
          let _block$1;
          let $1 = compare3(new$1, next);
          if ($1 instanceof Lt) {
            _block$1 = new Ascending;
          } else if ($1 instanceof Eq) {
            _block$1 = new Ascending;
          } else {
            _block$1 = new Descending;
          }
          let direction$1 = _block$1;
          loop$list = rest$2;
          loop$compare = compare3;
          loop$growing = toList([new$1]);
          loop$direction = direction$1;
          loop$prev = next;
          loop$acc = acc$1;
        }
      } else {
        loop$list = rest$1;
        loop$compare = compare3;
        loop$growing = growing$1;
        loop$direction = direction;
        loop$prev = new$1;
        loop$acc = acc;
      }
    }
  }
}
function merge_ascendings(loop$list1, loop$list2, loop$compare, loop$acc) {
  while (true) {
    let list1 = loop$list1;
    let list2 = loop$list2;
    let compare3 = loop$compare;
    let acc = loop$acc;
    if (list1 instanceof Empty) {
      let list = list2;
      return reverse_and_prepend(list, acc);
    } else if (list2 instanceof Empty) {
      let list = list1;
      return reverse_and_prepend(list, acc);
    } else {
      let first1 = list1.head;
      let rest1 = list1.tail;
      let first2 = list2.head;
      let rest2 = list2.tail;
      let $ = compare3(first1, first2);
      if ($ instanceof Lt) {
        loop$list1 = rest1;
        loop$list2 = list2;
        loop$compare = compare3;
        loop$acc = prepend(first1, acc);
      } else if ($ instanceof Eq) {
        loop$list1 = list1;
        loop$list2 = rest2;
        loop$compare = compare3;
        loop$acc = prepend(first2, acc);
      } else {
        loop$list1 = list1;
        loop$list2 = rest2;
        loop$compare = compare3;
        loop$acc = prepend(first2, acc);
      }
    }
  }
}
function merge_ascending_pairs(loop$sequences, loop$compare, loop$acc) {
  while (true) {
    let sequences2 = loop$sequences;
    let compare3 = loop$compare;
    let acc = loop$acc;
    if (sequences2 instanceof Empty) {
      return reverse(acc);
    } else {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return reverse(prepend(reverse(sequence), acc));
      } else {
        let ascending1 = sequences2.head;
        let ascending2 = $.head;
        let rest$1 = $.tail;
        let descending = merge_ascendings(ascending1, ascending2, compare3, toList([]));
        loop$sequences = rest$1;
        loop$compare = compare3;
        loop$acc = prepend(descending, acc);
      }
    }
  }
}
function merge_descendings(loop$list1, loop$list2, loop$compare, loop$acc) {
  while (true) {
    let list1 = loop$list1;
    let list2 = loop$list2;
    let compare3 = loop$compare;
    let acc = loop$acc;
    if (list1 instanceof Empty) {
      let list = list2;
      return reverse_and_prepend(list, acc);
    } else if (list2 instanceof Empty) {
      let list = list1;
      return reverse_and_prepend(list, acc);
    } else {
      let first1 = list1.head;
      let rest1 = list1.tail;
      let first2 = list2.head;
      let rest2 = list2.tail;
      let $ = compare3(first1, first2);
      if ($ instanceof Lt) {
        loop$list1 = list1;
        loop$list2 = rest2;
        loop$compare = compare3;
        loop$acc = prepend(first2, acc);
      } else if ($ instanceof Eq) {
        loop$list1 = rest1;
        loop$list2 = list2;
        loop$compare = compare3;
        loop$acc = prepend(first1, acc);
      } else {
        loop$list1 = rest1;
        loop$list2 = list2;
        loop$compare = compare3;
        loop$acc = prepend(first1, acc);
      }
    }
  }
}
function merge_descending_pairs(loop$sequences, loop$compare, loop$acc) {
  while (true) {
    let sequences2 = loop$sequences;
    let compare3 = loop$compare;
    let acc = loop$acc;
    if (sequences2 instanceof Empty) {
      return reverse(acc);
    } else {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return reverse(prepend(reverse(sequence), acc));
      } else {
        let descending1 = sequences2.head;
        let descending2 = $.head;
        let rest$1 = $.tail;
        let ascending = merge_descendings(descending1, descending2, compare3, toList([]));
        loop$sequences = rest$1;
        loop$compare = compare3;
        loop$acc = prepend(ascending, acc);
      }
    }
  }
}
function merge_all(loop$sequences, loop$direction, loop$compare) {
  while (true) {
    let sequences2 = loop$sequences;
    let direction = loop$direction;
    let compare3 = loop$compare;
    if (sequences2 instanceof Empty) {
      return sequences2;
    } else if (direction instanceof Ascending) {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return sequence;
      } else {
        let sequences$1 = merge_ascending_pairs(sequences2, compare3, toList([]));
        loop$sequences = sequences$1;
        loop$direction = new Descending;
        loop$compare = compare3;
      }
    } else {
      let $ = sequences2.tail;
      if ($ instanceof Empty) {
        let sequence = sequences2.head;
        return reverse(sequence);
      } else {
        let sequences$1 = merge_descending_pairs(sequences2, compare3, toList([]));
        loop$sequences = sequences$1;
        loop$direction = new Ascending;
        loop$compare = compare3;
      }
    }
  }
}
function sort(list, compare3) {
  if (list instanceof Empty) {
    return list;
  } else {
    let $ = list.tail;
    if ($ instanceof Empty) {
      return list;
    } else {
      let x = list.head;
      let y = $.head;
      let rest$1 = $.tail;
      let _block;
      let $1 = compare3(x, y);
      if ($1 instanceof Lt) {
        _block = new Ascending;
      } else if ($1 instanceof Eq) {
        _block = new Ascending;
      } else {
        _block = new Descending;
      }
      let direction = _block;
      let sequences$1 = sequences(rest$1, compare3, toList([x]), direction, y, toList([]));
      return merge_all(sequences$1, new Ascending, compare3);
    }
  }
}
function repeat_loop(loop$item, loop$times, loop$acc) {
  while (true) {
    let item = loop$item;
    let times = loop$times;
    let acc = loop$acc;
    let $ = times <= 0;
    if ($) {
      return acc;
    } else {
      loop$item = item;
      loop$times = times - 1;
      loop$acc = prepend(item, acc);
    }
  }
}
function repeat(a, times) {
  return repeat_loop(a, times, toList([]));
}
function each(loop$list, loop$f) {
  while (true) {
    let list = loop$list;
    let f = loop$f;
    if (list instanceof Empty) {
      return;
    } else {
      let first$1 = list.head;
      let rest$1 = list.tail;
      f(first$1);
      loop$list = rest$1;
      loop$f = f;
    }
  }
}

// build/dev/javascript/gleam_stdlib/gleam/string.mjs
function is_empty3(str) {
  return str === "";
}
function replace(string, pattern, substitute) {
  let _pipe = string;
  let _pipe$1 = identity(_pipe);
  let _pipe$2 = string_replace(_pipe$1, pattern, substitute);
  return identity(_pipe$2);
}
function concat_loop(loop$strings, loop$accumulator) {
  while (true) {
    let strings = loop$strings;
    let accumulator = loop$accumulator;
    if (strings instanceof Empty) {
      return accumulator;
    } else {
      let string = strings.head;
      let strings$1 = strings.tail;
      loop$strings = strings$1;
      loop$accumulator = accumulator + string;
    }
  }
}
function concat2(strings) {
  return concat_loop(strings, "");
}
function join_loop(loop$strings, loop$separator, loop$accumulator) {
  while (true) {
    let strings = loop$strings;
    let separator = loop$separator;
    let accumulator = loop$accumulator;
    if (strings instanceof Empty) {
      return accumulator;
    } else {
      let string = strings.head;
      let strings$1 = strings.tail;
      loop$strings = strings$1;
      loop$separator = separator;
      loop$accumulator = accumulator + separator + string;
    }
  }
}
function join(strings, separator) {
  if (strings instanceof Empty) {
    return "";
  } else {
    let first$1 = strings.head;
    let rest = strings.tail;
    return join_loop(rest, separator, first$1);
  }
}
function trim(string) {
  let _pipe = string;
  let _pipe$1 = trim_start(_pipe);
  return trim_end(_pipe$1);
}
function split2(x, substring) {
  if (substring === "") {
    return graphemes(x);
  } else {
    let _pipe = x;
    let _pipe$1 = identity(_pipe);
    let _pipe$2 = split(_pipe$1, substring);
    return map2(_pipe$2, identity);
  }
}
function inspect2(term) {
  let _pipe = term;
  let _pipe$1 = inspect(_pipe);
  return identity(_pipe$1);
}

// build/dev/javascript/gleam_stdlib/gleam/dynamic/decode.mjs
class DecodeError extends CustomType {
  constructor(expected, found, path) {
    super();
    this.expected = expected;
    this.found = found;
    this.path = path;
  }
}
class Decoder extends CustomType {
  constructor(function$) {
    super();
    this.function = function$;
  }
}
var int2 = /* @__PURE__ */ new Decoder(decode_int);
var string2 = /* @__PURE__ */ new Decoder(decode_string);
function run(data2, decoder) {
  let $ = decoder.function(data2);
  let maybe_invalid_data;
  let errors;
  maybe_invalid_data = $[0];
  errors = $[1];
  if (errors instanceof Empty) {
    return new Ok(maybe_invalid_data);
  } else {
    return new Error2(errors);
  }
}
function success(data2) {
  return new Decoder((_) => {
    return [data2, toList([])];
  });
}
function map3(decoder, transformer) {
  return new Decoder((d) => {
    let $ = decoder.function(d);
    let data2;
    let errors;
    data2 = $[0];
    errors = $[1];
    return [transformer(data2), errors];
  });
}
function run_decoders(loop$data, loop$failure, loop$decoders) {
  while (true) {
    let data2 = loop$data;
    let failure = loop$failure;
    let decoders = loop$decoders;
    if (decoders instanceof Empty) {
      return failure;
    } else {
      let decoder = decoders.head;
      let decoders$1 = decoders.tail;
      let $ = decoder.function(data2);
      let layer;
      let errors;
      layer = $;
      errors = $[1];
      if (errors instanceof Empty) {
        return layer;
      } else {
        loop$data = data2;
        loop$failure = failure;
        loop$decoders = decoders$1;
      }
    }
  }
}
function one_of(first, alternatives) {
  return new Decoder((dynamic_data) => {
    let $ = first.function(dynamic_data);
    let layer;
    let errors;
    layer = $;
    errors = $[1];
    if (errors instanceof Empty) {
      return layer;
    } else {
      return run_decoders(dynamic_data, layer, alternatives);
    }
  });
}
function run_dynamic_function(data2, name, f) {
  let $ = f(data2);
  if ($ instanceof Ok) {
    let data$1 = $[0];
    return [data$1, toList([])];
  } else {
    let placeholder = $[0];
    return [
      placeholder,
      toList([new DecodeError(name, classify_dynamic(data2), toList([]))])
    ];
  }
}
function decode_int(data2) {
  return run_dynamic_function(data2, "Int", int);
}
function decode_string(data2) {
  return run_dynamic_function(data2, "String", string);
}
function push_path(layer, path) {
  let decoder = one_of(string2, toList([
    (() => {
      let _pipe = int2;
      return map3(_pipe, to_string);
    })()
  ]));
  let path$1 = map2(path, (key) => {
    let key$1 = identity(key);
    let $ = run(key$1, decoder);
    if ($ instanceof Ok) {
      let key$2 = $[0];
      return key$2;
    } else {
      return "<" + classify_dynamic(key$1) + ">";
    }
  });
  let errors = map2(layer[1], (error) => {
    return new DecodeError(error.expected, error.found, append(path$1, error.path));
  });
  return [layer[0], errors];
}
function index3(loop$path, loop$position, loop$inner, loop$data, loop$handle_miss) {
  while (true) {
    let path = loop$path;
    let position = loop$position;
    let inner = loop$inner;
    let data2 = loop$data;
    let handle_miss = loop$handle_miss;
    if (path instanceof Empty) {
      let _pipe = data2;
      let _pipe$1 = inner(_pipe);
      return push_path(_pipe$1, reverse(position));
    } else {
      let key = path.head;
      let path$1 = path.tail;
      let $ = index2(data2, key);
      if ($ instanceof Ok) {
        let $1 = $[0];
        if ($1 instanceof Some) {
          let data$1 = $1[0];
          loop$path = path$1;
          loop$position = prepend(key, position);
          loop$inner = inner;
          loop$data = data$1;
          loop$handle_miss = handle_miss;
        } else {
          return handle_miss(data2, prepend(key, position));
        }
      } else {
        let kind = $[0];
        let $1 = inner(data2);
        let default$;
        default$ = $1[0];
        let _pipe = [
          default$,
          toList([new DecodeError(kind, classify_dynamic(data2), toList([]))])
        ];
        return push_path(_pipe, reverse(position));
      }
    }
  }
}
function subfield(field_path, field_decoder, next) {
  return new Decoder((data2) => {
    let $ = index3(field_path, toList([]), field_decoder.function, data2, (data3, position) => {
      let $12 = field_decoder.function(data3);
      let default$;
      default$ = $12[0];
      let _pipe = [
        default$,
        toList([new DecodeError("Field", "Nothing", toList([]))])
      ];
      return push_path(_pipe, reverse(position));
    });
    let out;
    let errors1;
    out = $[0];
    errors1 = $[1];
    let $1 = next(out).function(data2);
    let out$1;
    let errors2;
    out$1 = $1[0];
    errors2 = $1[1];
    return [out$1, append(errors1, errors2)];
  });
}

// build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
var Nil = undefined;
function identity(x) {
  return x;
}
function parse_int(value) {
  if (/^[-+]?(\d+)$/.test(value)) {
    return Result$Ok(parseInt(value));
  } else {
    return Result$Error(Nil);
  }
}
function parse_float(value) {
  if (/^[-+]?(\d+)\.(\d+)([eE][-+]?\d+)?$/.test(value)) {
    return Result$Ok(parseFloat(value));
  } else {
    return Result$Error(Nil);
  }
}
function to_string(term) {
  return term.toString();
}
function string_replace(string3, target, substitute) {
  return string3.replaceAll(target, substitute);
}
function graphemes(string3) {
  const iterator = graphemes_iterator(string3);
  if (iterator) {
    return arrayToList(Array.from(iterator).map((item) => item.segment));
  } else {
    return arrayToList(string3.match(/./gsu));
  }
}
var segmenter = undefined;
function graphemes_iterator(string3) {
  if (globalThis.Intl && Intl.Segmenter) {
    segmenter ||= new Intl.Segmenter;
    return segmenter.segment(string3)[Symbol.iterator]();
  }
}
function split(xs, pattern) {
  return arrayToList(xs.split(pattern));
}
function starts_with(haystack, needle) {
  return haystack.startsWith(needle);
}
var unicode_whitespaces = [
  " ",
  "\t",
  `
`,
  "\v",
  "\f",
  "\r",
  "",
  "\u2028",
  "\u2029"
].join("");
var trim_start_regex = /* @__PURE__ */ new RegExp(`^[${unicode_whitespaces}]*`);
var trim_end_regex = /* @__PURE__ */ new RegExp(`[${unicode_whitespaces}]*$`);
function trim_start(string3) {
  return string3.replace(trim_start_regex, "");
}
function trim_end(string3) {
  return string3.replace(trim_end_regex, "");
}
function floor(float2) {
  return Math.floor(float2);
}
function round2(float2) {
  return Math.round(float2);
}
function random_uniform() {
  const random_uniform_result = Math.random();
  if (random_uniform_result === 1) {
    return random_uniform();
  }
  return random_uniform_result;
}
function classify_dynamic(data2) {
  if (typeof data2 === "string") {
    return "String";
  } else if (typeof data2 === "boolean") {
    return "Bool";
  } else if (isResult(data2)) {
    return "Result";
  } else if (isList(data2)) {
    return "List";
  } else if (data2 instanceof BitArray) {
    return "BitArray";
  } else if (data2 instanceof Dict) {
    return "Dict";
  } else if (Number.isInteger(data2)) {
    return "Int";
  } else if (Array.isArray(data2)) {
    return `Array`;
  } else if (typeof data2 === "number") {
    return "Float";
  } else if (data2 === null) {
    return "Nil";
  } else if (data2 === undefined) {
    return "Nil";
  } else {
    const type = typeof data2;
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}
function inspect(v) {
  return new Inspector().inspect(v);
}
function float_to_string(float2) {
  const string3 = float2.toString().replace("+", "");
  if (string3.indexOf(".") >= 0) {
    return string3;
  } else {
    const index4 = string3.indexOf("e");
    if (index4 >= 0) {
      return string3.slice(0, index4) + ".0" + string3.slice(index4);
    } else {
      return string3 + ".0";
    }
  }
}

class Inspector {
  #references = new Set;
  inspect(v) {
    const t = typeof v;
    if (v === true)
      return "True";
    if (v === false)
      return "False";
    if (v === null)
      return "//js(null)";
    if (v === undefined)
      return "Nil";
    if (t === "string")
      return this.#string(v);
    if (t === "bigint" || Number.isInteger(v))
      return v.toString();
    if (t === "number")
      return float_to_string(v);
    if (v instanceof UtfCodepoint)
      return this.#utfCodepoint(v);
    if (v instanceof BitArray)
      return this.#bit_array(v);
    if (v instanceof RegExp)
      return `//js(${v})`;
    if (v instanceof Date)
      return `//js(Date("${v.toISOString()}"))`;
    if (v instanceof globalThis.Error)
      return `//js(${v.toString()})`;
    if (v instanceof Function) {
      const args = [];
      for (const i of Array(v.length).keys())
        args.push(String.fromCharCode(i + 97));
      return `//fn(${args.join(", ")}) { ... }`;
    }
    if (this.#references.size === this.#references.add(v).size) {
      return "//js(circular reference)";
    }
    let printed;
    if (Array.isArray(v)) {
      printed = `#(${v.map((v2) => this.inspect(v2)).join(", ")})`;
    } else if (isList(v)) {
      printed = this.#list(v);
    } else if (v instanceof CustomType) {
      printed = this.#customType(v);
    } else if (v instanceof Dict) {
      printed = this.#dict(v);
    } else if (v instanceof Set) {
      return `//js(Set(${[...v].map((v2) => this.inspect(v2)).join(", ")}))`;
    } else {
      printed = this.#object(v);
    }
    this.#references.delete(v);
    return printed;
  }
  #object(v) {
    const name = Object.getPrototypeOf(v)?.constructor?.name || "Object";
    const props = [];
    for (const k of Object.keys(v)) {
      props.push(`${this.inspect(k)}: ${this.inspect(v[k])}`);
    }
    const body = props.length ? " " + props.join(", ") + " " : "";
    const head = name === "Object" ? "" : name + " ";
    return `//js(${head}{${body}})`;
  }
  #dict(map4) {
    let body = "dict.from_list([";
    let first = true;
    body = fold(map4, body, (body2, key, value) => {
      if (!first)
        body2 = body2 + ", ";
      first = false;
      return body2 + "#(" + this.inspect(key) + ", " + this.inspect(value) + ")";
    });
    return body + "])";
  }
  #customType(record) {
    const props = Object.keys(record).map((label) => {
      const value = this.inspect(record[label]);
      return isNaN(parseInt(label)) ? `${label}: ${value}` : value;
    }).join(", ");
    return props ? `${record.constructor.name}(${props})` : record.constructor.name;
  }
  #list(list2) {
    if (List$isEmpty(list2)) {
      return "[]";
    }
    let char_out = 'charlist.from_string("';
    let list_out = "[";
    let current = list2;
    while (List$isNonEmpty(current)) {
      let element = current.head;
      current = current.tail;
      if (list_out !== "[") {
        list_out += ", ";
      }
      list_out += this.inspect(element);
      if (char_out) {
        if (Number.isInteger(element) && element >= 32 && element <= 126) {
          char_out += String.fromCharCode(element);
        } else {
          char_out = null;
        }
      }
    }
    if (char_out) {
      return char_out + '")';
    } else {
      return list_out + "]";
    }
  }
  #string(str) {
    let new_str = '"';
    for (let i = 0;i < str.length; i++) {
      const char = str[i];
      switch (char) {
        case `
`:
          new_str += "\\n";
          break;
        case "\r":
          new_str += "\\r";
          break;
        case "\t":
          new_str += "\\t";
          break;
        case "\f":
          new_str += "\\f";
          break;
        case "\\":
          new_str += "\\\\";
          break;
        case '"':
          new_str += "\\\"";
          break;
        default:
          if (char < " " || char > "~" && char < " ") {
            new_str += "\\u{" + char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0") + "}";
          } else {
            new_str += char;
          }
      }
    }
    new_str += '"';
    return new_str;
  }
  #utfCodepoint(codepoint2) {
    return `//utfcodepoint(${String.fromCodePoint(codepoint2.value)})`;
  }
  #bit_array(bits2) {
    if (bits2.bitSize === 0) {
      return "<<>>";
    }
    let acc = "<<";
    for (let i = 0;i < bits2.byteSize - 1; i++) {
      acc += bits2.byteAt(i).toString();
      acc += ", ";
    }
    if (bits2.byteSize * 8 === bits2.bitSize) {
      acc += bits2.byteAt(bits2.byteSize - 1).toString();
    } else {
      const trailingBitsCount = bits2.bitSize % 8;
      acc += bits2.byteAt(bits2.byteSize - 1) >> 8 - trailingBitsCount;
      acc += `:size(${trailingBitsCount})`;
    }
    acc += ">>";
    return acc;
  }
}
function index2(data2, key) {
  if (data2 instanceof Dict) {
    const result = get(data2, key);
    return Result$Ok(result.isOk() ? new Some(result[0]) : new None);
  }
  if (data2 instanceof WeakMap || data2 instanceof Map) {
    const token = {};
    const entry = data2.get(key, token);
    if (entry === token)
      return Result$Ok(new None);
    return Result$Ok(new Some(entry));
  }
  const key_is_int = Number.isInteger(key);
  if (key_is_int && key >= 0 && key < 8 && isList(data2)) {
    let i = 0;
    for (const value of data2) {
      if (i === key)
        return Result$Ok(new Some(value));
      i++;
    }
    return Result$Error("Indexable");
  }
  if (key_is_int && Array.isArray(data2) || data2 && typeof data2 === "object" || data2 && Object.getPrototypeOf(data2) === Object.prototype) {
    if (key in data2)
      return Result$Ok(new Some(data2[key]));
    return Result$Ok(new None);
  }
  return Result$Error(key_is_int ? "Indexable" : "Dict");
}
function int(data2) {
  if (Number.isInteger(data2))
    return Result$Ok(data2);
  return Result$Error(0);
}
function string(data2) {
  if (typeof data2 === "string")
    return Result$Ok(data2);
  return Result$Error("");
}
function arrayToList(array) {
  let list2 = List$Empty();
  let i = array.length;
  while (i--) {
    list2 = List$NonEmpty(array[i], list2);
  }
  return list2;
}
function isList(data2) {
  return List$isEmpty(data2) || List$isNonEmpty(data2);
}
function isResult(data2) {
  return Result$isOk(data2) || Result$isError(data2);
}

// build/dev/javascript/gleam_stdlib/gleam/float.mjs
function negate(x) {
  return -1 * x;
}
function round(x) {
  let $ = x >= 0;
  if ($) {
    return round2(x);
  } else {
    return 0 - round2(negate(x));
  }
}

// build/dev/javascript/gleam_stdlib/gleam/result.mjs
function is_ok(result) {
  if (result instanceof Ok) {
    return true;
  } else {
    return false;
  }
}
function map4(result, fun) {
  if (result instanceof Ok) {
    let x = result[0];
    return new Ok(fun(x));
  } else {
    return result;
  }
}
function unwrap(result, default$) {
  if (result instanceof Ok) {
    let v = result[0];
    return v;
  } else {
    return default$;
  }
}
// build/dev/javascript/gleam_stdlib/gleam/bool.mjs
function guard(requirement, consequence, alternative) {
  if (requirement) {
    return consequence;
  } else {
    return alternative();
  }
}

// build/dev/javascript/gleam_stdlib/gleam/function.mjs
function identity2(x) {
  return x;
}
// build/dev/javascript/gleam_json/gleam_json_ffi.mjs
function json_to_string(json) {
  return JSON.stringify(json);
}
function object(entries) {
  return Object.fromEntries(entries);
}
function identity3(x) {
  return x;
}
function array(list2) {
  const array2 = [];
  while (List$isNonEmpty(list2)) {
    array2.push(List$NonEmpty$first(list2));
    list2 = List$NonEmpty$rest(list2);
  }
  return array2;
}

// build/dev/javascript/gleam_json/gleam/json.mjs
function to_string2(json) {
  return json_to_string(json);
}
function string3(input) {
  return identity3(input);
}
function int3(input) {
  return identity3(input);
}
function object2(entries) {
  return object(entries);
}
function preprocessed_array(from2) {
  return array(from2);
}
function array2(entries, inner_type) {
  let _pipe = entries;
  let _pipe$1 = map2(_pipe, inner_type);
  return preprocessed_array(_pipe$1);
}

// build/dev/javascript/houdini/houdini.ffi.mjs
function do_escape(string4) {
  return string4.replaceAll(/[><&"']/g, (replaced) => {
    switch (replaced) {
      case ">":
        return "&gt;";
      case "<":
        return "&lt;";
      case "'":
        return "&#39;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      default:
        return replaced;
    }
  });
}

// build/dev/javascript/houdini/houdini/internal/escape_js.mjs
function escape(text) {
  return do_escape(text);
}

// build/dev/javascript/houdini/houdini.mjs
function escape2(string4) {
  return escape(string4);
}

// build/dev/javascript/lustre/lustre/internals/constants.mjs
var empty_list = /* @__PURE__ */ toList([]);
var error_nil = /* @__PURE__ */ new Error2(undefined);

// build/dev/javascript/lustre/lustre/vdom/vattr.ffi.mjs
var GT = /* @__PURE__ */ Order$Gt();
var LT = /* @__PURE__ */ Order$Lt();
var EQ = /* @__PURE__ */ Order$Eq();
function compare3(a, b) {
  if (a.name === b.name) {
    return EQ;
  } else if (a.name < b.name) {
    return LT;
  } else {
    return GT;
  }
}

// build/dev/javascript/lustre/lustre/vdom/vattr.mjs
class Attribute extends CustomType {
  constructor(kind, name, value) {
    super();
    this.kind = kind;
    this.name = name;
    this.value = value;
  }
}
class Property extends CustomType {
  constructor(kind, name, value) {
    super();
    this.kind = kind;
    this.name = name;
    this.value = value;
  }
}
class Event2 extends CustomType {
  constructor(kind, name, handler, include, prevent_default, stop_propagation, debounce, throttle) {
    super();
    this.kind = kind;
    this.name = name;
    this.handler = handler;
    this.include = include;
    this.prevent_default = prevent_default;
    this.stop_propagation = stop_propagation;
    this.debounce = debounce;
    this.throttle = throttle;
  }
}
class Handler extends CustomType {
  constructor(prevent_default, stop_propagation, message) {
    super();
    this.prevent_default = prevent_default;
    this.stop_propagation = stop_propagation;
    this.message = message;
  }
}
class Never extends CustomType {
  constructor(kind) {
    super();
    this.kind = kind;
  }
}
var attribute_kind = 0;
var property_kind = 1;
var event_kind = 2;
var never_kind = 0;
var never = /* @__PURE__ */ new Never(never_kind);
var always_kind = 2;
function merge(loop$attributes, loop$merged) {
  while (true) {
    let attributes = loop$attributes;
    let merged = loop$merged;
    if (attributes instanceof Empty) {
      return merged;
    } else {
      let $ = attributes.head;
      if ($ instanceof Attribute) {
        let $1 = $.name;
        if ($1 === "") {
          let rest = attributes.tail;
          loop$attributes = rest;
          loop$merged = merged;
        } else if ($1 === "class") {
          let $2 = $.value;
          if ($2 === "") {
            let rest = attributes.tail;
            loop$attributes = rest;
            loop$merged = merged;
          } else {
            let $3 = attributes.tail;
            if ($3 instanceof Empty) {
              let attribute$1 = $;
              let rest = $3;
              loop$attributes = rest;
              loop$merged = prepend(attribute$1, merged);
            } else {
              let $4 = $3.head;
              if ($4 instanceof Attribute) {
                let $5 = $4.name;
                if ($5 === "class") {
                  let kind = $.kind;
                  let class1 = $2;
                  let rest = $3.tail;
                  let class2 = $4.value;
                  let value = class1 + " " + class2;
                  let attribute$1 = new Attribute(kind, "class", value);
                  loop$attributes = prepend(attribute$1, rest);
                  loop$merged = merged;
                } else {
                  let attribute$1 = $;
                  let rest = $3;
                  loop$attributes = rest;
                  loop$merged = prepend(attribute$1, merged);
                }
              } else {
                let attribute$1 = $;
                let rest = $3;
                loop$attributes = rest;
                loop$merged = prepend(attribute$1, merged);
              }
            }
          }
        } else if ($1 === "style") {
          let $2 = $.value;
          if ($2 === "") {
            let rest = attributes.tail;
            loop$attributes = rest;
            loop$merged = merged;
          } else {
            let $3 = attributes.tail;
            if ($3 instanceof Empty) {
              let attribute$1 = $;
              let rest = $3;
              loop$attributes = rest;
              loop$merged = prepend(attribute$1, merged);
            } else {
              let $4 = $3.head;
              if ($4 instanceof Attribute) {
                let $5 = $4.name;
                if ($5 === "style") {
                  let kind = $.kind;
                  let style1 = $2;
                  let rest = $3.tail;
                  let style2 = $4.value;
                  let value = style1 + ";" + style2;
                  let attribute$1 = new Attribute(kind, "style", value);
                  loop$attributes = prepend(attribute$1, rest);
                  loop$merged = merged;
                } else {
                  let attribute$1 = $;
                  let rest = $3;
                  loop$attributes = rest;
                  loop$merged = prepend(attribute$1, merged);
                }
              } else {
                let attribute$1 = $;
                let rest = $3;
                loop$attributes = rest;
                loop$merged = prepend(attribute$1, merged);
              }
            }
          }
        } else {
          let attribute$1 = $;
          let rest = attributes.tail;
          loop$attributes = rest;
          loop$merged = prepend(attribute$1, merged);
        }
      } else {
        let attribute$1 = $;
        let rest = attributes.tail;
        loop$attributes = rest;
        loop$merged = prepend(attribute$1, merged);
      }
    }
  }
}
function prepare(attributes) {
  if (attributes instanceof Empty) {
    return attributes;
  } else {
    let $ = attributes.tail;
    if ($ instanceof Empty) {
      return attributes;
    } else {
      let _pipe = attributes;
      let _pipe$1 = sort(_pipe, (a, b) => {
        return compare3(b, a);
      });
      return merge(_pipe$1, empty_list);
    }
  }
}
function attribute(name, value) {
  return new Attribute(attribute_kind, name, value);
}
function property(name, value) {
  return new Property(property_kind, name, value);
}
function event(name, handler, include, prevent_default, stop_propagation, debounce, throttle) {
  return new Event2(event_kind, name, handler, include, prevent_default, stop_propagation, debounce, throttle);
}

// build/dev/javascript/lustre/lustre/attribute.mjs
function attribute2(name, value) {
  return attribute(name, value);
}
function property2(name, value) {
  return property(name, value);
}
function class$(name) {
  return attribute2("class", name);
}
function id(value) {
  return attribute2("id", value);
}
function type_(control_type) {
  return attribute2("type", control_type);
}
function value(control_value) {
  return attribute2("value", control_value);
}

// build/dev/javascript/lustre/lustre/effect.mjs
class Effect extends CustomType {
  constructor(synchronous, before_paint, after_paint) {
    super();
    this.synchronous = synchronous;
    this.before_paint = before_paint;
    this.after_paint = after_paint;
  }
}

class Actions extends CustomType {
  constructor(dispatch, emit, select, root, provide) {
    super();
    this.dispatch = dispatch;
    this.emit = emit;
    this.select = select;
    this.root = root;
    this.provide = provide;
  }
}
var empty = /* @__PURE__ */ new Effect(/* @__PURE__ */ toList([]), /* @__PURE__ */ toList([]), /* @__PURE__ */ toList([]));
function perform(effect, dispatch, emit, select, root, provide) {
  let actions = new Actions(dispatch, emit, select, root, provide);
  return each(effect.synchronous, (run2) => {
    return run2(actions);
  });
}
function none() {
  return empty;
}
function from2(effect) {
  let task = (actions) => {
    let dispatch = actions.dispatch;
    return effect(dispatch);
  };
  return new Effect(toList([task]), empty.before_paint, empty.after_paint);
}
function batch(effects) {
  return fold2(effects, empty, (acc, eff) => {
    return new Effect(fold2(eff.synchronous, acc.synchronous, prepend2), fold2(eff.before_paint, acc.before_paint, prepend2), fold2(eff.after_paint, acc.after_paint, prepend2));
  });
}

// build/dev/javascript/lustre/lustre/internals/mutable_map.ffi.mjs
function empty2() {
  return null;
}
function get2(map5, key) {
  return map5?.get(key);
}
function get_or_compute(map5, key, compute) {
  return map5?.get(key) ?? compute();
}
function has_key(map5, key) {
  return map5 && map5.has(key);
}
function insert2(map5, key, value2) {
  map5 ??= new Map;
  map5.set(key, value2);
  return map5;
}
function remove(map5, key) {
  map5?.delete(key);
  return map5;
}

// build/dev/javascript/lustre/lustre/internals/ref.ffi.mjs
function sameValueZero(x, y) {
  if (typeof x === "number" && typeof y === "number") {
    return x === y || x !== x && y !== y;
  }
  return x === y;
}

// build/dev/javascript/lustre/lustre/internals/ref.mjs
function equal_lists(loop$xs, loop$ys) {
  while (true) {
    let xs = loop$xs;
    let ys = loop$ys;
    if (xs instanceof Empty) {
      if (ys instanceof Empty) {
        return true;
      } else {
        return false;
      }
    } else if (ys instanceof Empty) {
      return false;
    } else {
      let x = xs.head;
      let xs$1 = xs.tail;
      let y = ys.head;
      let ys$1 = ys.tail;
      let $ = sameValueZero(x, y);
      if ($) {
        loop$xs = xs$1;
        loop$ys = ys$1;
      } else {
        return $;
      }
    }
  }
}

// build/dev/javascript/lustre/lustre/vdom/vnode.mjs
class Fragment extends CustomType {
  constructor(kind, key, children, keyed_children) {
    super();
    this.kind = kind;
    this.key = key;
    this.children = children;
    this.keyed_children = keyed_children;
  }
}
class Element extends CustomType {
  constructor(kind, key, namespace, tag, attributes, children, keyed_children, self_closing, void$) {
    super();
    this.kind = kind;
    this.key = key;
    this.namespace = namespace;
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.keyed_children = keyed_children;
    this.self_closing = self_closing;
    this.void = void$;
  }
}
class Text extends CustomType {
  constructor(kind, key, content) {
    super();
    this.kind = kind;
    this.key = key;
    this.content = content;
  }
}
class UnsafeInnerHtml extends CustomType {
  constructor(kind, key, namespace, tag, attributes, inner_html) {
    super();
    this.kind = kind;
    this.key = key;
    this.namespace = namespace;
    this.tag = tag;
    this.attributes = attributes;
    this.inner_html = inner_html;
  }
}
class Map2 extends CustomType {
  constructor(kind, key, mapper, child) {
    super();
    this.kind = kind;
    this.key = key;
    this.mapper = mapper;
    this.child = child;
  }
}
class Memo extends CustomType {
  constructor(kind, key, dependencies, view) {
    super();
    this.kind = kind;
    this.key = key;
    this.dependencies = dependencies;
    this.view = view;
  }
}
var fragment_kind = 0;
var element_kind = 1;
var text_kind = 2;
var unsafe_inner_html_kind = 3;
var map_kind = 4;
var memo_kind = 5;
function is_void_html_element(tag, namespace) {
  if (namespace === "") {
    if (tag === "area") {
      return true;
    } else if (tag === "base") {
      return true;
    } else if (tag === "br") {
      return true;
    } else if (tag === "col") {
      return true;
    } else if (tag === "embed") {
      return true;
    } else if (tag === "hr") {
      return true;
    } else if (tag === "img") {
      return true;
    } else if (tag === "input") {
      return true;
    } else if (tag === "link") {
      return true;
    } else if (tag === "meta") {
      return true;
    } else if (tag === "param") {
      return true;
    } else if (tag === "source") {
      return true;
    } else if (tag === "track") {
      return true;
    } else if (tag === "wbr") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function to_keyed(key, node) {
  if (node instanceof Fragment) {
    return new Fragment(node.kind, key, node.children, node.keyed_children);
  } else if (node instanceof Element) {
    return new Element(node.kind, key, node.namespace, node.tag, node.attributes, node.children, node.keyed_children, node.self_closing, node.void);
  } else if (node instanceof Text) {
    return new Text(node.kind, key, node.content);
  } else if (node instanceof UnsafeInnerHtml) {
    return new UnsafeInnerHtml(node.kind, key, node.namespace, node.tag, node.attributes, node.inner_html);
  } else if (node instanceof Map2) {
    let child = node.child;
    return new Map2(node.kind, key, node.mapper, to_keyed(key, child));
  } else {
    let view = node.view;
    return new Memo(node.kind, key, node.dependencies, () => {
      return to_keyed(key, view());
    });
  }
}
function fragment(key, children, keyed_children) {
  return new Fragment(fragment_kind, key, children, keyed_children);
}
function element(key, namespace, tag, attributes, children, keyed_children, self_closing, void$) {
  return new Element(element_kind, key, namespace, tag, prepare(attributes), children, keyed_children, self_closing, void$);
}
function text(key, content) {
  return new Text(text_kind, key, content);
}
function map5(element2, mapper) {
  if (element2 instanceof Map2) {
    let child_mapper = element2.mapper;
    return new Map2(map_kind, element2.key, (handler) => {
      return identity2(mapper)(child_mapper(handler));
    }, identity2(element2.child));
  } else {
    return new Map2(map_kind, element2.key, identity2(mapper), identity2(element2));
  }
}
function memo(key, dependencies, view) {
  return new Memo(memo_kind, key, dependencies, view);
}

// build/dev/javascript/lustre/lustre/element.mjs
function element2(tag, attributes, children) {
  return element("", "", tag, attributes, children, empty2(), false, is_void_html_element(tag, ""));
}
function text2(content) {
  return text("", content);
}
function none2() {
  return text("", "");
}
function memo2(dependencies, view) {
  return memo("", dependencies, view);
}
function ref(value2) {
  return identity2(value2);
}
function map6(element3, f) {
  return map5(element3, f);
}

// build/dev/javascript/lustre/lustre/element/html.mjs
function h1(attrs, children) {
  return element2("h1", attrs, children);
}
function h3(attrs, children) {
  return element2("h3", attrs, children);
}
function div(attrs, children) {
  return element2("div", attrs, children);
}
function p(attrs, children) {
  return element2("p", attrs, children);
}
function pre(attrs, children) {
  return element2("pre", attrs, children);
}
function button(attrs, children) {
  return element2("button", attrs, children);
}
function input(attrs) {
  return element2("input", attrs, empty_list);
}
function label(attrs, children) {
  return element2("label", attrs, children);
}
function option(attrs, label2) {
  return element2("option", attrs, toList([text2(label2)]));
}
function select(attrs, children) {
  return element2("select", attrs, children);
}
function textarea(attrs, content) {
  return element2("textarea", prepend(property2("value", string3(content)), attrs), toList([text2(content)]));
}

// build/dev/javascript/gleam_stdlib/gleam/set.mjs
class Set2 extends CustomType {
  constructor(dict2) {
    super();
    this.dict = dict2;
  }
}
var token = undefined;
function new$2() {
  return new Set2(make());
}
function size3(set) {
  return size(set.dict);
}
function contains2(set, member) {
  let _pipe = set.dict;
  let _pipe$1 = get(_pipe, member);
  return is_ok(_pipe$1);
}
function to_list2(set) {
  return keys(set.dict);
}
function insert3(set, member) {
  return new Set2(insert(set.dict, member, token));
}
function from_list2(members) {
  let dict2 = fold2(members, make(), (m, k) => {
    return insert(m, k, token);
  });
  return new Set2(dict2);
}

// build/dev/javascript/lustre/lustre/vdom/patch.mjs
class Patch extends CustomType {
  constructor(index4, removed, changes, children) {
    super();
    this.index = index4;
    this.removed = removed;
    this.changes = changes;
    this.children = children;
  }
}
class ReplaceText extends CustomType {
  constructor(kind, content) {
    super();
    this.kind = kind;
    this.content = content;
  }
}
class ReplaceInnerHtml extends CustomType {
  constructor(kind, inner_html) {
    super();
    this.kind = kind;
    this.inner_html = inner_html;
  }
}
class Update extends CustomType {
  constructor(kind, added, removed) {
    super();
    this.kind = kind;
    this.added = added;
    this.removed = removed;
  }
}
class Move extends CustomType {
  constructor(kind, key, before) {
    super();
    this.kind = kind;
    this.key = key;
    this.before = before;
  }
}
class Replace extends CustomType {
  constructor(kind, index4, with$) {
    super();
    this.kind = kind;
    this.index = index4;
    this.with = with$;
  }
}
class Remove extends CustomType {
  constructor(kind, index4) {
    super();
    this.kind = kind;
    this.index = index4;
  }
}
class Insert extends CustomType {
  constructor(kind, children, before) {
    super();
    this.kind = kind;
    this.children = children;
    this.before = before;
  }
}
var replace_text_kind = 0;
var replace_inner_html_kind = 1;
var update_kind = 2;
var move_kind = 3;
var remove_kind = 4;
var replace_kind = 5;
var insert_kind = 6;
function new$4(index4, removed, changes, children) {
  return new Patch(index4, removed, changes, children);
}
function replace_text(content) {
  return new ReplaceText(replace_text_kind, content);
}
function replace_inner_html(inner_html) {
  return new ReplaceInnerHtml(replace_inner_html_kind, inner_html);
}
function update(added, removed) {
  return new Update(update_kind, added, removed);
}
function move(key, before) {
  return new Move(move_kind, key, before);
}
function remove2(index4) {
  return new Remove(remove_kind, index4);
}
function replace2(index4, with$) {
  return new Replace(replace_kind, index4, with$);
}
function insert4(children, before) {
  return new Insert(insert_kind, children, before);
}

// build/dev/javascript/lustre/lustre/runtime/transport.mjs
class Mount extends CustomType {
  constructor(kind, open_shadow_root, will_adopt_styles, observed_attributes, observed_properties, requested_contexts, provided_contexts, vdom, memos) {
    super();
    this.kind = kind;
    this.open_shadow_root = open_shadow_root;
    this.will_adopt_styles = will_adopt_styles;
    this.observed_attributes = observed_attributes;
    this.observed_properties = observed_properties;
    this.requested_contexts = requested_contexts;
    this.provided_contexts = provided_contexts;
    this.vdom = vdom;
    this.memos = memos;
  }
}
class Reconcile extends CustomType {
  constructor(kind, patch, memos) {
    super();
    this.kind = kind;
    this.patch = patch;
    this.memos = memos;
  }
}
class Emit extends CustomType {
  constructor(kind, name, data2) {
    super();
    this.kind = kind;
    this.name = name;
    this.data = data2;
  }
}
class Provide extends CustomType {
  constructor(kind, key, value2) {
    super();
    this.kind = kind;
    this.key = key;
    this.value = value2;
  }
}
class Batch extends CustomType {
  constructor(kind, messages) {
    super();
    this.kind = kind;
    this.messages = messages;
  }
}
var ServerMessage$isBatch = (value2) => value2 instanceof Batch;
class AttributeChanged extends CustomType {
  constructor(kind, name, value2) {
    super();
    this.kind = kind;
    this.name = name;
    this.value = value2;
  }
}
var ServerMessage$isAttributeChanged = (value2) => value2 instanceof AttributeChanged;
class PropertyChanged extends CustomType {
  constructor(kind, name, value2) {
    super();
    this.kind = kind;
    this.name = name;
    this.value = value2;
  }
}
var ServerMessage$isPropertyChanged = (value2) => value2 instanceof PropertyChanged;
class EventFired extends CustomType {
  constructor(kind, path, name, event2) {
    super();
    this.kind = kind;
    this.path = path;
    this.name = name;
    this.event = event2;
  }
}
var ServerMessage$isEventFired = (value2) => value2 instanceof EventFired;
class ContextProvided extends CustomType {
  constructor(kind, key, value2) {
    super();
    this.kind = kind;
    this.key = key;
    this.value = value2;
  }
}
var ServerMessage$isContextProvided = (value2) => value2 instanceof ContextProvided;
var mount_kind = 0;
var reconcile_kind = 1;
var emit_kind = 2;
var provide_kind = 3;
function mount(open_shadow_root, will_adopt_styles, observed_attributes, observed_properties, requested_contexts, provided_contexts, vdom, memos) {
  return new Mount(mount_kind, open_shadow_root, will_adopt_styles, observed_attributes, observed_properties, requested_contexts, provided_contexts, vdom, memos);
}
function reconcile(patch, memos) {
  return new Reconcile(reconcile_kind, patch, memos);
}
function emit(name, data2) {
  return new Emit(emit_kind, name, data2);
}
function provide(key, value2) {
  return new Provide(provide_kind, key, value2);
}

// build/dev/javascript/lustre/lustre/vdom/path.mjs
class Root extends CustomType {
}

class Key extends CustomType {
  constructor(key, parent) {
    super();
    this.key = key;
    this.parent = parent;
  }
}

class Index extends CustomType {
  constructor(index4, parent) {
    super();
    this.index = index4;
    this.parent = parent;
  }
}

class Subtree extends CustomType {
  constructor(parent) {
    super();
    this.parent = parent;
  }
}
var root = /* @__PURE__ */ new Root;
var separator_element = "\t";
var separator_subtree = "\r";
var separator_event = `
`;
function do_matches(loop$path, loop$candidates) {
  while (true) {
    let path = loop$path;
    let candidates = loop$candidates;
    if (candidates instanceof Empty) {
      return false;
    } else {
      let candidate = candidates.head;
      let rest = candidates.tail;
      let $ = starts_with(path, candidate);
      if ($) {
        return $;
      } else {
        loop$path = path;
        loop$candidates = rest;
      }
    }
  }
}
function add3(parent, index4, key) {
  if (key === "") {
    return new Index(index4, parent);
  } else {
    return new Key(key, parent);
  }
}
function subtree(path) {
  return new Subtree(path);
}
function finish_to_string(acc) {
  if (acc instanceof Empty) {
    return "";
  } else {
    let segments = acc.tail;
    return concat2(segments);
  }
}
function split_subtree_path(path) {
  return split2(path, separator_subtree);
}
function do_to_string(loop$full, loop$path, loop$acc) {
  while (true) {
    let full = loop$full;
    let path = loop$path;
    let acc = loop$acc;
    if (path instanceof Root) {
      return finish_to_string(acc);
    } else if (path instanceof Key) {
      let key = path.key;
      let parent = path.parent;
      loop$full = full;
      loop$path = parent;
      loop$acc = prepend(separator_element, prepend(key, acc));
    } else if (path instanceof Index) {
      let index4 = path.index;
      let parent = path.parent;
      let acc$1 = prepend(separator_element, prepend(to_string(index4), acc));
      loop$full = full;
      loop$path = parent;
      loop$acc = acc$1;
    } else if (!full) {
      return finish_to_string(acc);
    } else {
      let parent = path.parent;
      if (acc instanceof Empty) {
        loop$full = full;
        loop$path = parent;
        loop$acc = acc;
      } else {
        let acc$1 = acc.tail;
        loop$full = full;
        loop$path = parent;
        loop$acc = prepend(separator_subtree, acc$1);
      }
    }
  }
}
function child(path) {
  return do_to_string(false, path, empty_list);
}
function to_string4(path) {
  return do_to_string(true, path, empty_list);
}
function matches(path, candidates) {
  if (candidates instanceof Empty) {
    return false;
  } else {
    return do_matches(to_string4(path), candidates);
  }
}
function event2(path, event3) {
  return do_to_string(false, path, prepend(separator_event, prepend(event3, empty_list)));
}

// build/dev/javascript/lustre/lustre/vdom/cache.mjs
class Cache extends CustomType {
  constructor(events, vdoms, old_vdoms, dispatched_paths, next_dispatched_paths) {
    super();
    this.events = events;
    this.vdoms = vdoms;
    this.old_vdoms = old_vdoms;
    this.dispatched_paths = dispatched_paths;
    this.next_dispatched_paths = next_dispatched_paths;
  }
}

class Events extends CustomType {
  constructor(handlers, children) {
    super();
    this.handlers = handlers;
    this.children = children;
  }
}

class Child extends CustomType {
  constructor(mapper, events) {
    super();
    this.mapper = mapper;
    this.events = events;
  }
}

class AddedChildren extends CustomType {
  constructor(handlers, children, vdoms) {
    super();
    this.handlers = handlers;
    this.children = children;
    this.vdoms = vdoms;
  }
}

class DecodedEvent extends CustomType {
  constructor(path, handler) {
    super();
    this.path = path;
    this.handler = handler;
  }
}

class DispatchedEvent extends CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}
function compose_mapper(mapper, child_mapper) {
  return (msg) => {
    return mapper(child_mapper(msg));
  };
}
function new_events() {
  return new Events(empty2(), empty2());
}
function new$5() {
  return new Cache(new_events(), empty2(), empty2(), empty_list, empty_list);
}
function tick(cache) {
  return new Cache(cache.events, empty2(), cache.vdoms, cache.next_dispatched_paths, empty_list);
}
function events(cache) {
  return cache.events;
}
function update_events(cache, events2) {
  return new Cache(events2, cache.vdoms, cache.old_vdoms, cache.dispatched_paths, cache.next_dispatched_paths);
}
function memos(cache) {
  return cache.vdoms;
}
function get_old_memo(cache, old, new$6) {
  return get_or_compute(cache.old_vdoms, old, new$6);
}
function keep_memo(cache, old, new$6) {
  let node = get_or_compute(cache.old_vdoms, old, new$6);
  let vdoms = insert2(cache.vdoms, new$6, node);
  return new Cache(cache.events, vdoms, cache.old_vdoms, cache.dispatched_paths, cache.next_dispatched_paths);
}
function add_memo(cache, new$6, node) {
  let vdoms = insert2(cache.vdoms, new$6, node);
  return new Cache(cache.events, vdoms, cache.old_vdoms, cache.dispatched_paths, cache.next_dispatched_paths);
}
function get_subtree(events2, path, old_mapper) {
  let child2 = get_or_compute(events2.children, path, () => {
    return new Child(old_mapper, new_events());
  });
  return child2.events;
}
function update_subtree(parent, path, mapper, events2) {
  let new_child = new Child(mapper, events2);
  let children = insert2(parent.children, path, new_child);
  return new Events(parent.handlers, children);
}
function do_add_event(handlers, path, name, handler) {
  return insert2(handlers, event2(path, name), handler);
}
function add_event(events2, path, name, handler) {
  let handlers = do_add_event(events2.handlers, path, name, handler);
  return new Events(handlers, events2.children);
}
function do_remove_event(handlers, path, name) {
  return remove(handlers, event2(path, name));
}
function remove_event(events2, path, name) {
  let handlers = do_remove_event(events2.handlers, path, name);
  return new Events(handlers, events2.children);
}
function add_attributes(handlers, path, attributes) {
  return fold2(attributes, handlers, (events2, attribute3) => {
    if (attribute3 instanceof Event2) {
      let name = attribute3.name;
      let handler = attribute3.handler;
      return do_add_event(events2, path, name, handler);
    } else {
      return events2;
    }
  });
}
function do_add_children(loop$handlers, loop$children, loop$vdoms, loop$parent, loop$child_index, loop$nodes) {
  while (true) {
    let handlers = loop$handlers;
    let children = loop$children;
    let vdoms = loop$vdoms;
    let parent = loop$parent;
    let child_index = loop$child_index;
    let nodes = loop$nodes;
    let next = child_index + 1;
    if (nodes instanceof Empty) {
      return new AddedChildren(handlers, children, vdoms);
    } else {
      let $ = nodes.head;
      if ($ instanceof Fragment) {
        let rest = nodes.tail;
        let key = $.key;
        let nodes$1 = $.children;
        let path = add3(parent, child_index, key);
        let $1 = do_add_children(handlers, children, vdoms, path, 0, nodes$1);
        let handlers$1;
        let children$1;
        let vdoms$1;
        handlers$1 = $1.handlers;
        children$1 = $1.children;
        vdoms$1 = $1.vdoms;
        loop$handlers = handlers$1;
        loop$children = children$1;
        loop$vdoms = vdoms$1;
        loop$parent = parent;
        loop$child_index = next;
        loop$nodes = rest;
      } else if ($ instanceof Element) {
        let rest = nodes.tail;
        let key = $.key;
        let attributes = $.attributes;
        let nodes$1 = $.children;
        let path = add3(parent, child_index, key);
        let handlers$1 = add_attributes(handlers, path, attributes);
        let $1 = do_add_children(handlers$1, children, vdoms, path, 0, nodes$1);
        let handlers$2;
        let children$1;
        let vdoms$1;
        handlers$2 = $1.handlers;
        children$1 = $1.children;
        vdoms$1 = $1.vdoms;
        loop$handlers = handlers$2;
        loop$children = children$1;
        loop$vdoms = vdoms$1;
        loop$parent = parent;
        loop$child_index = next;
        loop$nodes = rest;
      } else if ($ instanceof Text) {
        let rest = nodes.tail;
        loop$handlers = handlers;
        loop$children = children;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$child_index = next;
        loop$nodes = rest;
      } else if ($ instanceof UnsafeInnerHtml) {
        let rest = nodes.tail;
        let key = $.key;
        let attributes = $.attributes;
        let path = add3(parent, child_index, key);
        let handlers$1 = add_attributes(handlers, path, attributes);
        loop$handlers = handlers$1;
        loop$children = children;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$child_index = next;
        loop$nodes = rest;
      } else if ($ instanceof Map2) {
        let rest = nodes.tail;
        let key = $.key;
        let mapper = $.mapper;
        let child2 = $.child;
        let path = add3(parent, child_index, key);
        let added = do_add_children(empty2(), empty2(), vdoms, subtree(path), 0, prepend(child2, empty_list));
        let vdoms$1 = added.vdoms;
        let child_events = new Events(added.handlers, added.children);
        let child$1 = new Child(mapper, child_events);
        let children$1 = insert2(children, child(path), child$1);
        loop$handlers = handlers;
        loop$children = children$1;
        loop$vdoms = vdoms$1;
        loop$parent = parent;
        loop$child_index = next;
        loop$nodes = rest;
      } else {
        let rest = nodes.tail;
        let view = $.view;
        let child_node = view();
        let vdoms$1 = insert2(vdoms, view, child_node);
        let next$1 = child_index;
        let rest$1 = prepend(child_node, rest);
        loop$handlers = handlers;
        loop$children = children;
        loop$vdoms = vdoms$1;
        loop$parent = parent;
        loop$child_index = next$1;
        loop$nodes = rest$1;
      }
    }
  }
}
function add_children(cache, events2, path, child_index, nodes) {
  let vdoms = cache.vdoms;
  let handlers;
  let children;
  handlers = events2.handlers;
  children = events2.children;
  let $ = do_add_children(handlers, children, vdoms, path, child_index, nodes);
  let handlers$1;
  let children$1;
  let vdoms$1;
  handlers$1 = $.handlers;
  children$1 = $.children;
  vdoms$1 = $.vdoms;
  return [
    new Cache(cache.events, vdoms$1, cache.old_vdoms, cache.dispatched_paths, cache.next_dispatched_paths),
    new Events(handlers$1, children$1)
  ];
}
function add_child(cache, events2, parent, index4, child2) {
  let children = prepend(child2, empty_list);
  return add_children(cache, events2, parent, index4, children);
}
function from_node(root2) {
  let cache = new$5();
  let $ = add_child(cache, cache.events, root, 0, root2);
  let cache$1;
  let events$1;
  cache$1 = $[0];
  events$1 = $[1];
  return new Cache(events$1, cache$1.vdoms, cache$1.old_vdoms, cache$1.dispatched_paths, cache$1.next_dispatched_paths);
}
function remove_attributes(handlers, path, attributes) {
  return fold2(attributes, handlers, (events2, attribute3) => {
    if (attribute3 instanceof Event2) {
      let name = attribute3.name;
      return do_remove_event(events2, path, name);
    } else {
      return events2;
    }
  });
}
function do_remove_children(loop$handlers, loop$children, loop$vdoms, loop$parent, loop$index, loop$nodes) {
  while (true) {
    let handlers = loop$handlers;
    let children = loop$children;
    let vdoms = loop$vdoms;
    let parent = loop$parent;
    let index4 = loop$index;
    let nodes = loop$nodes;
    let next = index4 + 1;
    if (nodes instanceof Empty) {
      return new Events(handlers, children);
    } else {
      let $ = nodes.head;
      if ($ instanceof Fragment) {
        let rest = nodes.tail;
        let key = $.key;
        let nodes$1 = $.children;
        let path = add3(parent, index4, key);
        let $1 = do_remove_children(handlers, children, vdoms, path, 0, nodes$1);
        let handlers$1;
        let children$1;
        handlers$1 = $1.handlers;
        children$1 = $1.children;
        loop$handlers = handlers$1;
        loop$children = children$1;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$index = next;
        loop$nodes = rest;
      } else if ($ instanceof Element) {
        let rest = nodes.tail;
        let key = $.key;
        let attributes = $.attributes;
        let nodes$1 = $.children;
        let path = add3(parent, index4, key);
        let handlers$1 = remove_attributes(handlers, path, attributes);
        let $1 = do_remove_children(handlers$1, children, vdoms, path, 0, nodes$1);
        let handlers$2;
        let children$1;
        handlers$2 = $1.handlers;
        children$1 = $1.children;
        loop$handlers = handlers$2;
        loop$children = children$1;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$index = next;
        loop$nodes = rest;
      } else if ($ instanceof Text) {
        let rest = nodes.tail;
        loop$handlers = handlers;
        loop$children = children;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$index = next;
        loop$nodes = rest;
      } else if ($ instanceof UnsafeInnerHtml) {
        let rest = nodes.tail;
        let key = $.key;
        let attributes = $.attributes;
        let path = add3(parent, index4, key);
        let handlers$1 = remove_attributes(handlers, path, attributes);
        loop$handlers = handlers$1;
        loop$children = children;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$index = next;
        loop$nodes = rest;
      } else if ($ instanceof Map2) {
        let rest = nodes.tail;
        let key = $.key;
        let path = add3(parent, index4, key);
        let children$1 = remove(children, child(path));
        loop$handlers = handlers;
        loop$children = children$1;
        loop$vdoms = vdoms;
        loop$parent = parent;
        loop$index = next;
        loop$nodes = rest;
      } else {
        let rest = nodes.tail;
        let view = $.view;
        let $1 = has_key(vdoms, view);
        if ($1) {
          let child2 = get2(vdoms, view);
          let nodes$1 = prepend(child2, rest);
          loop$handlers = handlers;
          loop$children = children;
          loop$vdoms = vdoms;
          loop$parent = parent;
          loop$index = index4;
          loop$nodes = nodes$1;
        } else {
          loop$handlers = handlers;
          loop$children = children;
          loop$vdoms = vdoms;
          loop$parent = parent;
          loop$index = next;
          loop$nodes = rest;
        }
      }
    }
  }
}
function remove_child(cache, events2, parent, child_index, child2) {
  return do_remove_children(events2.handlers, events2.children, cache.old_vdoms, parent, child_index, prepend(child2, empty_list));
}
function replace_child(cache, events2, parent, child_index, prev, next) {
  let events$1 = remove_child(cache, events2, parent, child_index, prev);
  return add_child(cache, events$1, parent, child_index, next);
}
function dispatch(cache, event3) {
  let next_dispatched_paths = prepend(event3.path, cache.next_dispatched_paths);
  let cache$1 = new Cache(cache.events, cache.vdoms, cache.old_vdoms, cache.dispatched_paths, next_dispatched_paths);
  if (event3 instanceof DecodedEvent) {
    let handler = event3.handler;
    return [cache$1, new Ok(handler)];
  } else {
    return [cache$1, error_nil];
  }
}
function has_dispatched_events(cache, path) {
  return matches(path, cache.dispatched_paths);
}
function get_handler(loop$events, loop$path, loop$mapper) {
  while (true) {
    let events2 = loop$events;
    let path = loop$path;
    let mapper = loop$mapper;
    if (path instanceof Empty) {
      return error_nil;
    } else {
      let $ = path.tail;
      if ($ instanceof Empty) {
        let key = path.head;
        let $1 = has_key(events2.handlers, key);
        if ($1) {
          let handler = get2(events2.handlers, key);
          return new Ok(map3(handler, (handler2) => {
            return new Handler(handler2.prevent_default, handler2.stop_propagation, identity2(mapper)(handler2.message));
          }));
        } else {
          return error_nil;
        }
      } else {
        let key = path.head;
        let path$1 = $;
        let $1 = has_key(events2.children, key);
        if ($1) {
          let child2 = get2(events2.children, key);
          let mapper$1 = compose_mapper(mapper, child2.mapper);
          loop$events = child2.events;
          loop$path = path$1;
          loop$mapper = mapper$1;
        } else {
          return error_nil;
        }
      }
    }
  }
}
function decode2(cache, path, name, event3) {
  let parts = split_subtree_path(path + separator_event + name);
  let $ = get_handler(cache.events, parts, identity2);
  if ($ instanceof Ok) {
    let handler = $[0];
    let $1 = run(event3, handler);
    if ($1 instanceof Ok) {
      let handler$1 = $1[0];
      return new DecodedEvent(path, handler$1);
    } else {
      return new DispatchedEvent(path);
    }
  } else {
    return new DispatchedEvent(path);
  }
}
function handle(cache, path, name, event3) {
  let _pipe = decode2(cache, path, name, event3);
  return ((_capture) => {
    return dispatch(cache, _capture);
  })(_pipe);
}

// build/dev/javascript/lustre/lustre/runtime/server/runtime.mjs
class ClientDispatchedMessage extends CustomType {
  constructor(message) {
    super();
    this.message = message;
  }
}
var Message$isClientDispatchedMessage = (value2) => value2 instanceof ClientDispatchedMessage;
class ClientRegisteredCallback extends CustomType {
  constructor(callback) {
    super();
    this.callback = callback;
  }
}
var Message$isClientRegisteredCallback = (value2) => value2 instanceof ClientRegisteredCallback;
class ClientDeregisteredCallback extends CustomType {
  constructor(callback) {
    super();
    this.callback = callback;
  }
}
var Message$isClientDeregisteredCallback = (value2) => value2 instanceof ClientDeregisteredCallback;
class EffectDispatchedMessage extends CustomType {
  constructor(message) {
    super();
    this.message = message;
  }
}
var Message$EffectDispatchedMessage = (message) => new EffectDispatchedMessage(message);
var Message$isEffectDispatchedMessage = (value2) => value2 instanceof EffectDispatchedMessage;
class EffectEmitEvent extends CustomType {
  constructor(name, data2) {
    super();
    this.name = name;
    this.data = data2;
  }
}
var Message$EffectEmitEvent = (name, data2) => new EffectEmitEvent(name, data2);
var Message$isEffectEmitEvent = (value2) => value2 instanceof EffectEmitEvent;
class EffectProvidedValue extends CustomType {
  constructor(key, value2) {
    super();
    this.key = key;
    this.value = value2;
  }
}
var Message$EffectProvidedValue = (key, value2) => new EffectProvidedValue(key, value2);
var Message$isEffectProvidedValue = (value2) => value2 instanceof EffectProvidedValue;
class SystemRequestedShutdown extends CustomType {
}
var Message$isSystemRequestedShutdown = (value2) => value2 instanceof SystemRequestedShutdown;

// build/dev/javascript/lustre/lustre/runtime/app.mjs
class App extends CustomType {
  constructor(name, init, update2, view, config2) {
    super();
    this.name = name;
    this.init = init;
    this.update = update2;
    this.view = view;
    this.config = config2;
  }
}
class Config2 extends CustomType {
  constructor(open_shadow_root, adopt_styles, delegates_focus, attributes, properties, contexts, is_form_associated, on_form_autofill, on_form_reset, on_form_restore, on_connect, on_adopt, on_disconnect) {
    super();
    this.open_shadow_root = open_shadow_root;
    this.adopt_styles = adopt_styles;
    this.delegates_focus = delegates_focus;
    this.attributes = attributes;
    this.properties = properties;
    this.contexts = contexts;
    this.is_form_associated = is_form_associated;
    this.on_form_autofill = on_form_autofill;
    this.on_form_reset = on_form_reset;
    this.on_form_restore = on_form_restore;
    this.on_connect = on_connect;
    this.on_adopt = on_adopt;
    this.on_disconnect = on_disconnect;
  }
}
var default_config = /* @__PURE__ */ new Config2(true, true, false, empty_list, empty_list, empty_list, false, /* @__PURE__ */ new None, /* @__PURE__ */ new None, /* @__PURE__ */ new None, /* @__PURE__ */ new None, /* @__PURE__ */ new None, /* @__PURE__ */ new None);

// build/dev/javascript/lustre/lustre/internals/equals.ffi.mjs
var isEqual2 = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  const type = typeof a;
  if (type !== typeof b) {
    return false;
  }
  if (type !== "object") {
    return false;
  }
  const ctor = a.constructor;
  if (ctor !== b.constructor) {
    return false;
  }
  if (Array.isArray(a)) {
    return areArraysEqual(a, b);
  }
  return areObjectsEqual(a, b);
};
var areArraysEqual = (a, b) => {
  let index4 = a.length;
  if (index4 !== b.length) {
    return false;
  }
  while (index4--) {
    if (!isEqual2(a[index4], b[index4])) {
      return false;
    }
  }
  return true;
};
var areObjectsEqual = (a, b) => {
  const properties = Object.keys(a);
  let index4 = properties.length;
  if (Object.keys(b).length !== index4) {
    return false;
  }
  while (index4--) {
    const property3 = properties[index4];
    if (!Object.hasOwn(b, property3)) {
      return false;
    }
    if (!isEqual2(a[property3], b[property3])) {
      return false;
    }
  }
  return true;
};

// build/dev/javascript/lustre/lustre/vdom/diff.mjs
class Diff extends CustomType {
  constructor(patch, cache) {
    super();
    this.patch = patch;
    this.cache = cache;
  }
}
class PartialDiff extends CustomType {
  constructor(patch, cache, events2) {
    super();
    this.patch = patch;
    this.cache = cache;
    this.events = events2;
  }
}

class AttributeChange extends CustomType {
  constructor(added, removed, events2) {
    super();
    this.added = added;
    this.removed = removed;
    this.events = events2;
  }
}
function is_controlled(cache, namespace, tag, path) {
  if (tag === "input" && namespace === "") {
    return has_dispatched_events(cache, path);
  } else if (tag === "select" && namespace === "") {
    return has_dispatched_events(cache, path);
  } else if (tag === "textarea" && namespace === "") {
    return has_dispatched_events(cache, path);
  } else {
    return false;
  }
}
function diff_attributes(loop$controlled, loop$path, loop$events, loop$old, loop$new, loop$added, loop$removed) {
  while (true) {
    let controlled = loop$controlled;
    let path = loop$path;
    let events2 = loop$events;
    let old = loop$old;
    let new$6 = loop$new;
    let added = loop$added;
    let removed = loop$removed;
    if (old instanceof Empty) {
      if (new$6 instanceof Empty) {
        return new AttributeChange(added, removed, events2);
      } else {
        let $ = new$6.head;
        if ($ instanceof Event2) {
          let next = $;
          let new$1 = new$6.tail;
          let name = $.name;
          let handler = $.handler;
          let events$1 = add_event(events2, path, name, handler);
          let added$1 = prepend(next, added);
          loop$controlled = controlled;
          loop$path = path;
          loop$events = events$1;
          loop$old = old;
          loop$new = new$1;
          loop$added = added$1;
          loop$removed = removed;
        } else {
          let next = $;
          let new$1 = new$6.tail;
          let added$1 = prepend(next, added);
          loop$controlled = controlled;
          loop$path = path;
          loop$events = events2;
          loop$old = old;
          loop$new = new$1;
          loop$added = added$1;
          loop$removed = removed;
        }
      }
    } else if (new$6 instanceof Empty) {
      let $ = old.head;
      if ($ instanceof Event2) {
        let prev = $;
        let old$1 = old.tail;
        let name = $.name;
        let events$1 = remove_event(events2, path, name);
        let removed$1 = prepend(prev, removed);
        loop$controlled = controlled;
        loop$path = path;
        loop$events = events$1;
        loop$old = old$1;
        loop$new = new$6;
        loop$added = added;
        loop$removed = removed$1;
      } else {
        let prev = $;
        let old$1 = old.tail;
        let removed$1 = prepend(prev, removed);
        loop$controlled = controlled;
        loop$path = path;
        loop$events = events2;
        loop$old = old$1;
        loop$new = new$6;
        loop$added = added;
        loop$removed = removed$1;
      }
    } else {
      let prev = old.head;
      let remaining_old = old.tail;
      let next = new$6.head;
      let remaining_new = new$6.tail;
      let $ = compare3(prev, next);
      if ($ instanceof Lt) {
        if (prev instanceof Event2) {
          let name = prev.name;
          loop$controlled = controlled;
          loop$path = path;
          loop$events = remove_event(events2, path, name);
          loop$old = remaining_old;
          loop$new = new$6;
          loop$added = added;
          loop$removed = prepend(prev, removed);
        } else {
          loop$controlled = controlled;
          loop$path = path;
          loop$events = events2;
          loop$old = remaining_old;
          loop$new = new$6;
          loop$added = added;
          loop$removed = prepend(prev, removed);
        }
      } else if ($ instanceof Eq) {
        if (prev instanceof Attribute) {
          if (next instanceof Attribute) {
            let _block;
            let $1 = next.name;
            if ($1 === "value") {
              _block = controlled || prev.value !== next.value;
            } else if ($1 === "checked") {
              _block = controlled || prev.value !== next.value;
            } else if ($1 === "selected") {
              _block = controlled || prev.value !== next.value;
            } else {
              _block = prev.value !== next.value;
            }
            let has_changes = _block;
            let _block$1;
            if (has_changes) {
              _block$1 = prepend(next, added);
            } else {
              _block$1 = added;
            }
            let added$1 = _block$1;
            loop$controlled = controlled;
            loop$path = path;
            loop$events = events2;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed;
          } else if (next instanceof Event2) {
            let name = next.name;
            let handler = next.handler;
            loop$controlled = controlled;
            loop$path = path;
            loop$events = add_event(events2, path, name, handler);
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = prepend(next, added);
            loop$removed = prepend(prev, removed);
          } else {
            loop$controlled = controlled;
            loop$path = path;
            loop$events = events2;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = prepend(next, added);
            loop$removed = prepend(prev, removed);
          }
        } else if (prev instanceof Property) {
          if (next instanceof Property) {
            let _block;
            let $1 = next.name;
            if ($1 === "scrollLeft") {
              _block = true;
            } else if ($1 === "scrollRight") {
              _block = true;
            } else if ($1 === "value") {
              _block = controlled || !isEqual2(prev.value, next.value);
            } else if ($1 === "checked") {
              _block = controlled || !isEqual2(prev.value, next.value);
            } else if ($1 === "selected") {
              _block = controlled || !isEqual2(prev.value, next.value);
            } else {
              _block = !isEqual2(prev.value, next.value);
            }
            let has_changes = _block;
            let _block$1;
            if (has_changes) {
              _block$1 = prepend(next, added);
            } else {
              _block$1 = added;
            }
            let added$1 = _block$1;
            loop$controlled = controlled;
            loop$path = path;
            loop$events = events2;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = added$1;
            loop$removed = removed;
          } else if (next instanceof Event2) {
            let name = next.name;
            let handler = next.handler;
            loop$controlled = controlled;
            loop$path = path;
            loop$events = add_event(events2, path, name, handler);
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = prepend(next, added);
            loop$removed = prepend(prev, removed);
          } else {
            loop$controlled = controlled;
            loop$path = path;
            loop$events = events2;
            loop$old = remaining_old;
            loop$new = remaining_new;
            loop$added = prepend(next, added);
            loop$removed = prepend(prev, removed);
          }
        } else if (next instanceof Event2) {
          let name = next.name;
          let handler = next.handler;
          let has_changes = prev.prevent_default.kind !== next.prevent_default.kind || prev.stop_propagation.kind !== next.stop_propagation.kind || prev.debounce !== next.debounce || prev.throttle !== next.throttle;
          let _block;
          if (has_changes) {
            _block = prepend(next, added);
          } else {
            _block = added;
          }
          let added$1 = _block;
          loop$controlled = controlled;
          loop$path = path;
          loop$events = add_event(events2, path, name, handler);
          loop$old = remaining_old;
          loop$new = remaining_new;
          loop$added = added$1;
          loop$removed = removed;
        } else {
          let name = prev.name;
          loop$controlled = controlled;
          loop$path = path;
          loop$events = remove_event(events2, path, name);
          loop$old = remaining_old;
          loop$new = remaining_new;
          loop$added = prepend(next, added);
          loop$removed = prepend(prev, removed);
        }
      } else if (next instanceof Event2) {
        let name = next.name;
        let handler = next.handler;
        loop$controlled = controlled;
        loop$path = path;
        loop$events = add_event(events2, path, name, handler);
        loop$old = old;
        loop$new = remaining_new;
        loop$added = prepend(next, added);
        loop$removed = removed;
      } else {
        loop$controlled = controlled;
        loop$path = path;
        loop$events = events2;
        loop$old = old;
        loop$new = remaining_new;
        loop$added = prepend(next, added);
        loop$removed = removed;
      }
    }
  }
}
function do_diff(loop$old, loop$old_keyed, loop$new, loop$new_keyed, loop$moved, loop$moved_offset, loop$removed, loop$node_index, loop$patch_index, loop$changes, loop$children, loop$path, loop$cache, loop$events) {
  while (true) {
    let old = loop$old;
    let old_keyed = loop$old_keyed;
    let new$6 = loop$new;
    let new_keyed = loop$new_keyed;
    let moved = loop$moved;
    let moved_offset = loop$moved_offset;
    let removed = loop$removed;
    let node_index = loop$node_index;
    let patch_index = loop$patch_index;
    let changes = loop$changes;
    let children = loop$children;
    let path = loop$path;
    let cache = loop$cache;
    let events2 = loop$events;
    if (old instanceof Empty) {
      if (new$6 instanceof Empty) {
        let patch = new Patch(patch_index, removed, changes, children);
        return new PartialDiff(patch, cache, events2);
      } else {
        let $ = add_children(cache, events2, path, node_index, new$6);
        let cache$1;
        let events$1;
        cache$1 = $[0];
        events$1 = $[1];
        let insert5 = insert4(new$6, node_index - moved_offset);
        let changes$1 = prepend(insert5, changes);
        let patch = new Patch(patch_index, removed, changes$1, children);
        return new PartialDiff(patch, cache$1, events$1);
      }
    } else if (new$6 instanceof Empty) {
      let prev = old.head;
      let old$1 = old.tail;
      let _block;
      let $ = prev.key === "" || !has_key(moved, prev.key);
      if ($) {
        _block = removed + 1;
      } else {
        _block = removed;
      }
      let removed$1 = _block;
      let events$1 = remove_child(cache, events2, path, node_index, prev);
      loop$old = old$1;
      loop$old_keyed = old_keyed;
      loop$new = new$6;
      loop$new_keyed = new_keyed;
      loop$moved = moved;
      loop$moved_offset = moved_offset;
      loop$removed = removed$1;
      loop$node_index = node_index;
      loop$patch_index = patch_index;
      loop$changes = changes;
      loop$children = children;
      loop$path = path;
      loop$cache = cache;
      loop$events = events$1;
    } else {
      let prev = old.head;
      let next = new$6.head;
      if (prev.key !== next.key) {
        let old_remaining = old.tail;
        let new_remaining = new$6.tail;
        let next_did_exist = has_key(old_keyed, next.key);
        let prev_does_exist = has_key(new_keyed, prev.key);
        if (prev_does_exist) {
          if (next_did_exist) {
            let $ = has_key(moved, prev.key);
            if ($) {
              loop$old = old_remaining;
              loop$old_keyed = old_keyed;
              loop$new = new$6;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset - 1;
              loop$removed = removed;
              loop$node_index = node_index;
              loop$patch_index = patch_index;
              loop$changes = changes;
              loop$children = children;
              loop$path = path;
              loop$cache = cache;
              loop$events = events2;
            } else {
              let match = get2(old_keyed, next.key);
              let before = node_index - moved_offset;
              let changes$1 = prepend(move(next.key, before), changes);
              let moved$1 = insert2(moved, next.key, undefined);
              loop$old = prepend(match, old);
              loop$old_keyed = old_keyed;
              loop$new = new$6;
              loop$new_keyed = new_keyed;
              loop$moved = moved$1;
              loop$moved_offset = moved_offset + 1;
              loop$removed = removed;
              loop$node_index = node_index;
              loop$patch_index = patch_index;
              loop$changes = changes$1;
              loop$children = children;
              loop$path = path;
              loop$cache = cache;
              loop$events = events2;
            }
          } else {
            let before = node_index - moved_offset;
            let $ = add_child(cache, events2, path, node_index, next);
            let cache$1;
            let events$1;
            cache$1 = $[0];
            events$1 = $[1];
            let insert5 = insert4(toList([next]), before);
            let changes$1 = prepend(insert5, changes);
            loop$old = old;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset + 1;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = changes$1;
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        } else if (next_did_exist) {
          let index4 = node_index - moved_offset;
          let changes$1 = prepend(remove2(index4), changes);
          let events$1 = remove_child(cache, events2, path, node_index, prev);
          loop$old = old_remaining;
          loop$old_keyed = old_keyed;
          loop$new = new$6;
          loop$new_keyed = new_keyed;
          loop$moved = moved;
          loop$moved_offset = moved_offset - 1;
          loop$removed = removed;
          loop$node_index = node_index;
          loop$patch_index = patch_index;
          loop$changes = changes$1;
          loop$children = children;
          loop$path = path;
          loop$cache = cache;
          loop$events = events$1;
        } else {
          let change = replace2(node_index - moved_offset, next);
          let $ = replace_child(cache, events2, path, node_index, prev, next);
          let cache$1;
          let events$1;
          cache$1 = $[0];
          events$1 = $[1];
          loop$old = old_remaining;
          loop$old_keyed = old_keyed;
          loop$new = new_remaining;
          loop$new_keyed = new_keyed;
          loop$moved = moved;
          loop$moved_offset = moved_offset;
          loop$removed = removed;
          loop$node_index = node_index + 1;
          loop$patch_index = patch_index;
          loop$changes = prepend(change, changes);
          loop$children = children;
          loop$path = path;
          loop$cache = cache$1;
          loop$events = events$1;
        }
      } else {
        let $ = old.head;
        if ($ instanceof Fragment) {
          let $1 = new$6.head;
          if ($1 instanceof Fragment) {
            let prev2 = $;
            let old$1 = old.tail;
            let next2 = $1;
            let new$1 = new$6.tail;
            let $2 = do_diff(prev2.children, prev2.keyed_children, next2.children, next2.keyed_children, empty2(), 0, 0, 0, node_index, empty_list, empty_list, add3(path, node_index, next2.key), cache, events2);
            let patch;
            let cache$1;
            let events$1;
            patch = $2.patch;
            cache$1 = $2.cache;
            events$1 = $2.events;
            let _block;
            let $3 = patch.changes;
            if ($3 instanceof Empty) {
              let $4 = patch.children;
              if ($4 instanceof Empty) {
                let $5 = patch.removed;
                if ($5 === 0) {
                  _block = children;
                } else {
                  _block = prepend(patch, children);
                }
              } else {
                _block = prepend(patch, children);
              }
            } else {
              _block = prepend(patch, children);
            }
            let children$1 = _block;
            loop$old = old$1;
            loop$old_keyed = old_keyed;
            loop$new = new$1;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = changes;
            loop$children = children$1;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          } else {
            let prev2 = $;
            let old_remaining = old.tail;
            let next2 = $1;
            let new_remaining = new$6.tail;
            let change = replace2(node_index - moved_offset, next2);
            let $2 = replace_child(cache, events2, path, node_index, prev2, next2);
            let cache$1;
            let events$1;
            cache$1 = $2[0];
            events$1 = $2[1];
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        } else if ($ instanceof Element) {
          let $1 = new$6.head;
          if ($1 instanceof Element) {
            let prev2 = $;
            let next2 = $1;
            if (prev2.namespace === next2.namespace && prev2.tag === next2.tag) {
              let old$1 = old.tail;
              let new$1 = new$6.tail;
              let child_path = add3(path, node_index, next2.key);
              let controlled = is_controlled(cache, next2.namespace, next2.tag, child_path);
              let $2 = diff_attributes(controlled, child_path, events2, prev2.attributes, next2.attributes, empty_list, empty_list);
              let added_attrs;
              let removed_attrs;
              let events$1;
              added_attrs = $2.added;
              removed_attrs = $2.removed;
              events$1 = $2.events;
              let _block;
              if (added_attrs instanceof Empty && removed_attrs instanceof Empty) {
                _block = empty_list;
              } else {
                _block = toList([update(added_attrs, removed_attrs)]);
              }
              let initial_child_changes = _block;
              let $3 = do_diff(prev2.children, prev2.keyed_children, next2.children, next2.keyed_children, empty2(), 0, 0, 0, node_index, initial_child_changes, empty_list, child_path, cache, events$1);
              let patch;
              let cache$1;
              let events$2;
              patch = $3.patch;
              cache$1 = $3.cache;
              events$2 = $3.events;
              let _block$1;
              let $4 = patch.changes;
              if ($4 instanceof Empty) {
                let $5 = patch.children;
                if ($5 instanceof Empty) {
                  let $6 = patch.removed;
                  if ($6 === 0) {
                    _block$1 = children;
                  } else {
                    _block$1 = prepend(patch, children);
                  }
                } else {
                  _block$1 = prepend(patch, children);
                }
              } else {
                _block$1 = prepend(patch, children);
              }
              let children$1 = _block$1;
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$changes = changes;
              loop$children = children$1;
              loop$path = path;
              loop$cache = cache$1;
              loop$events = events$2;
            } else {
              let prev3 = $;
              let old_remaining = old.tail;
              let next3 = $1;
              let new_remaining = new$6.tail;
              let change = replace2(node_index - moved_offset, next3);
              let $2 = replace_child(cache, events2, path, node_index, prev3, next3);
              let cache$1;
              let events$1;
              cache$1 = $2[0];
              events$1 = $2[1];
              loop$old = old_remaining;
              loop$old_keyed = old_keyed;
              loop$new = new_remaining;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$changes = prepend(change, changes);
              loop$children = children;
              loop$path = path;
              loop$cache = cache$1;
              loop$events = events$1;
            }
          } else {
            let prev2 = $;
            let old_remaining = old.tail;
            let next2 = $1;
            let new_remaining = new$6.tail;
            let change = replace2(node_index - moved_offset, next2);
            let $2 = replace_child(cache, events2, path, node_index, prev2, next2);
            let cache$1;
            let events$1;
            cache$1 = $2[0];
            events$1 = $2[1];
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        } else if ($ instanceof Text) {
          let $1 = new$6.head;
          if ($1 instanceof Text) {
            let prev2 = $;
            let next2 = $1;
            if (prev2.content === next2.content) {
              let old$1 = old.tail;
              let new$1 = new$6.tail;
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$changes = changes;
              loop$children = children;
              loop$path = path;
              loop$cache = cache;
              loop$events = events2;
            } else {
              let old$1 = old.tail;
              let next3 = $1;
              let new$1 = new$6.tail;
              let child2 = new$4(node_index, 0, toList([replace_text(next3.content)]), empty_list);
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$changes = changes;
              loop$children = prepend(child2, children);
              loop$path = path;
              loop$cache = cache;
              loop$events = events2;
            }
          } else {
            let prev2 = $;
            let old_remaining = old.tail;
            let next2 = $1;
            let new_remaining = new$6.tail;
            let change = replace2(node_index - moved_offset, next2);
            let $2 = replace_child(cache, events2, path, node_index, prev2, next2);
            let cache$1;
            let events$1;
            cache$1 = $2[0];
            events$1 = $2[1];
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        } else if ($ instanceof UnsafeInnerHtml) {
          let $1 = new$6.head;
          if ($1 instanceof UnsafeInnerHtml) {
            let prev2 = $;
            let old$1 = old.tail;
            let next2 = $1;
            let new$1 = new$6.tail;
            let child_path = add3(path, node_index, next2.key);
            let $2 = diff_attributes(false, child_path, events2, prev2.attributes, next2.attributes, empty_list, empty_list);
            let added_attrs;
            let removed_attrs;
            let events$1;
            added_attrs = $2.added;
            removed_attrs = $2.removed;
            events$1 = $2.events;
            let _block;
            if (added_attrs instanceof Empty && removed_attrs instanceof Empty) {
              _block = empty_list;
            } else {
              _block = toList([update(added_attrs, removed_attrs)]);
            }
            let child_changes = _block;
            let _block$1;
            let $3 = prev2.inner_html === next2.inner_html;
            if ($3) {
              _block$1 = child_changes;
            } else {
              _block$1 = prepend(replace_inner_html(next2.inner_html), child_changes);
            }
            let child_changes$1 = _block$1;
            let _block$2;
            if (child_changes$1 instanceof Empty) {
              _block$2 = children;
            } else {
              _block$2 = prepend(new$4(node_index, 0, child_changes$1, toList([])), children);
            }
            let children$1 = _block$2;
            loop$old = old$1;
            loop$old_keyed = old_keyed;
            loop$new = new$1;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = changes;
            loop$children = children$1;
            loop$path = path;
            loop$cache = cache;
            loop$events = events$1;
          } else {
            let prev2 = $;
            let old_remaining = old.tail;
            let next2 = $1;
            let new_remaining = new$6.tail;
            let change = replace2(node_index - moved_offset, next2);
            let $2 = replace_child(cache, events2, path, node_index, prev2, next2);
            let cache$1;
            let events$1;
            cache$1 = $2[0];
            events$1 = $2[1];
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        } else if ($ instanceof Map2) {
          let $1 = new$6.head;
          if ($1 instanceof Map2) {
            let prev2 = $;
            let old$1 = old.tail;
            let next2 = $1;
            let new$1 = new$6.tail;
            let child_path = add3(path, node_index, next2.key);
            let child_key = child(child_path);
            let $2 = do_diff(prepend(prev2.child, empty_list), empty2(), prepend(next2.child, empty_list), empty2(), empty2(), 0, 0, 0, node_index, empty_list, empty_list, subtree(child_path), cache, get_subtree(events2, child_key, prev2.mapper));
            let patch;
            let cache$1;
            let child_events;
            patch = $2.patch;
            cache$1 = $2.cache;
            child_events = $2.events;
            let events$1 = update_subtree(events2, child_key, next2.mapper, child_events);
            let _block;
            let $3 = patch.changes;
            if ($3 instanceof Empty) {
              let $4 = patch.children;
              if ($4 instanceof Empty) {
                let $5 = patch.removed;
                if ($5 === 0) {
                  _block = children;
                } else {
                  _block = prepend(patch, children);
                }
              } else {
                _block = prepend(patch, children);
              }
            } else {
              _block = prepend(patch, children);
            }
            let children$1 = _block;
            loop$old = old$1;
            loop$old_keyed = old_keyed;
            loop$new = new$1;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = changes;
            loop$children = children$1;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          } else {
            let prev2 = $;
            let old_remaining = old.tail;
            let next2 = $1;
            let new_remaining = new$6.tail;
            let change = replace2(node_index - moved_offset, next2);
            let $2 = replace_child(cache, events2, path, node_index, prev2, next2);
            let cache$1;
            let events$1;
            cache$1 = $2[0];
            events$1 = $2[1];
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        } else {
          let $1 = new$6.head;
          if ($1 instanceof Memo) {
            let prev2 = $;
            let old$1 = old.tail;
            let next2 = $1;
            let new$1 = new$6.tail;
            let $2 = equal_lists(prev2.dependencies, next2.dependencies);
            if ($2) {
              let cache$1 = keep_memo(cache, prev2.view, next2.view);
              loop$old = old$1;
              loop$old_keyed = old_keyed;
              loop$new = new$1;
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index + 1;
              loop$patch_index = patch_index;
              loop$changes = changes;
              loop$children = children;
              loop$path = path;
              loop$cache = cache$1;
              loop$events = events2;
            } else {
              let prev_node = get_old_memo(cache, prev2.view, prev2.view);
              let next_node = next2.view();
              let cache$1 = add_memo(cache, next2.view, next_node);
              loop$old = prepend(prev_node, old$1);
              loop$old_keyed = old_keyed;
              loop$new = prepend(next_node, new$1);
              loop$new_keyed = new_keyed;
              loop$moved = moved;
              loop$moved_offset = moved_offset;
              loop$removed = removed;
              loop$node_index = node_index;
              loop$patch_index = patch_index;
              loop$changes = changes;
              loop$children = children;
              loop$path = path;
              loop$cache = cache$1;
              loop$events = events2;
            }
          } else {
            let prev2 = $;
            let old_remaining = old.tail;
            let next2 = $1;
            let new_remaining = new$6.tail;
            let change = replace2(node_index - moved_offset, next2);
            let $2 = replace_child(cache, events2, path, node_index, prev2, next2);
            let cache$1;
            let events$1;
            cache$1 = $2[0];
            events$1 = $2[1];
            loop$old = old_remaining;
            loop$old_keyed = old_keyed;
            loop$new = new_remaining;
            loop$new_keyed = new_keyed;
            loop$moved = moved;
            loop$moved_offset = moved_offset;
            loop$removed = removed;
            loop$node_index = node_index + 1;
            loop$patch_index = patch_index;
            loop$changes = prepend(change, changes);
            loop$children = children;
            loop$path = path;
            loop$cache = cache$1;
            loop$events = events$1;
          }
        }
      }
    }
  }
}
function diff(cache, old, new$6) {
  let cache$1 = tick(cache);
  let $ = do_diff(prepend(old, empty_list), empty2(), prepend(new$6, empty_list), empty2(), empty2(), 0, 0, 0, 0, empty_list, empty_list, root, cache$1, events(cache$1));
  let patch;
  let cache$2;
  let events2;
  patch = $.patch;
  cache$2 = $.cache;
  events2 = $.events;
  return new Diff(patch, update_events(cache$2, events2));
}

// build/dev/javascript/lustre/lustre/internals/list.ffi.mjs
var toList2 = (arr) => arr.reduceRight((xs, x) => List$NonEmpty(x, xs), empty_list);
var iterate = (list4, callback) => {
  if (Array.isArray(list4)) {
    for (let i = 0;i < list4.length; i++) {
      callback(list4[i]);
    }
  } else if (list4) {
    for (list4;List$NonEmpty$rest(list4); list4 = List$NonEmpty$rest(list4)) {
      callback(List$NonEmpty$first(list4));
    }
  }
};
var append4 = (a, b) => {
  if (!List$NonEmpty$rest(a)) {
    return b;
  } else if (!List$NonEmpty$rest(b)) {
    return a;
  } else {
    return append(a, b);
  }
};

// build/dev/javascript/lustre/lustre/internals/constants.ffi.mjs
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var SUPPORTS_MOVE_BEFORE = !!globalThis.HTMLElement?.prototype?.moveBefore;

// build/dev/javascript/lustre/lustre/vdom/reconciler.ffi.mjs
var setTimeout2 = globalThis.setTimeout;
var clearTimeout = globalThis.clearTimeout;
var createElementNS = (ns, name) => globalThis.document.createElementNS(ns, name);
var createTextNode = (data2) => globalThis.document.createTextNode(data2);
var createComment = (data2) => globalThis.document.createComment(data2);
var createDocumentFragment = () => globalThis.document.createDocumentFragment();
var insertBefore = (parent, node, reference) => parent.insertBefore(node, reference);
var moveBefore = SUPPORTS_MOVE_BEFORE ? (parent, node, reference) => parent.moveBefore(node, reference) : insertBefore;
var removeChild = (parent, child2) => parent.removeChild(child2);
var getAttribute = (node, name) => node.getAttribute(name);
var setAttribute = (node, name, value2) => node.setAttribute(name, value2);
var removeAttribute = (node, name) => node.removeAttribute(name);
var addEventListener = (node, name, handler, options) => node.addEventListener(name, handler, options);
var removeEventListener = (node, name, handler) => node.removeEventListener(name, handler);
var setInnerHtml = (node, innerHtml) => node.innerHTML = innerHtml;
var setData = (node, data2) => node.data = data2;
var meta = Symbol("lustre");

class MetadataNode {
  constructor(kind, parent, node, key) {
    this.kind = kind;
    this.key = key;
    this.parent = parent;
    this.children = [];
    this.node = node;
    this.endNode = null;
    this.handlers = new Map;
    this.throttles = new Map;
    this.debouncers = new Map;
  }
  get isVirtual() {
    return this.kind === fragment_kind || this.kind === map_kind;
  }
  get parentNode() {
    return this.isVirtual ? this.node.parentNode : this.node;
  }
}
var insertMetadataChild = (kind, parent, node, index4, key) => {
  const child2 = new MetadataNode(kind, parent, node, key);
  node[meta] = child2;
  parent?.children.splice(index4, 0, child2);
  return child2;
};
var getPath = (node) => {
  let path = "";
  for (let current = node[meta];current.parent; current = current.parent) {
    const separator = current.parent && current.parent.kind === map_kind ? separator_subtree : separator_element;
    if (current.key) {
      path = `${separator}${current.key}${path}`;
    } else {
      const index4 = current.parent.children.indexOf(current);
      path = `${separator}${index4}${path}`;
    }
  }
  return path.slice(1);
};

class Reconciler {
  #root = null;
  #decodeEvent;
  #dispatch;
  #debug = false;
  constructor(root2, decodeEvent, dispatch2, { debug = false } = {}) {
    this.#root = root2;
    this.#decodeEvent = decodeEvent;
    this.#dispatch = dispatch2;
    this.#debug = debug;
  }
  mount(vdom) {
    insertMetadataChild(element_kind, null, this.#root, 0, null);
    this.#insertChild(this.#root, null, this.#root[meta], 0, vdom);
  }
  push(patch, memos2 = null) {
    this.#memos = memos2;
    this.#stack.push({ node: this.#root[meta], patch });
    this.#reconcile();
  }
  #memos;
  #stack = [];
  #reconcile() {
    const stack = this.#stack;
    while (stack.length) {
      const { node, patch } = stack.pop();
      const { children: childNodes } = node;
      const { changes, removed, children: childPatches } = patch;
      iterate(changes, (change) => this.#patch(node, change));
      if (removed) {
        this.#removeChildren(node, childNodes.length - removed, removed);
      }
      iterate(childPatches, (childPatch) => {
        const child2 = childNodes[childPatch.index | 0];
        this.#stack.push({ node: child2, patch: childPatch });
      });
    }
  }
  #patch(node, change) {
    switch (change.kind) {
      case replace_text_kind:
        this.#replaceText(node, change);
        break;
      case replace_inner_html_kind:
        this.#replaceInnerHtml(node, change);
        break;
      case update_kind:
        this.#update(node, change);
        break;
      case move_kind:
        this.#move(node, change);
        break;
      case remove_kind:
        this.#remove(node, change);
        break;
      case replace_kind:
        this.#replace(node, change);
        break;
      case insert_kind:
        this.#insert(node, change);
        break;
    }
  }
  #insert(parent, { children, before }) {
    const fragment2 = createDocumentFragment();
    const beforeEl = this.#getReference(parent, before);
    this.#insertChildren(fragment2, null, parent, before | 0, children);
    insertBefore(parent.parentNode, fragment2, beforeEl);
  }
  #replace(parent, { index: index4, with: child2 }) {
    this.#removeChildren(parent, index4 | 0, 1);
    const beforeEl = this.#getReference(parent, index4);
    this.#insertChild(parent.parentNode, beforeEl, parent, index4 | 0, child2);
  }
  #getReference(node, index4) {
    index4 = index4 | 0;
    const { children } = node;
    const childCount = children.length;
    if (index4 < childCount)
      return children[index4].node;
    if (node.endNode)
      return node.endNode;
    if (!node.isVirtual)
      return null;
    while (node.isVirtual && node.children.length) {
      if (node.endNode)
        return node.endNode.nextSibling;
      node = node.children[node.children.length - 1];
    }
    return node.node.nextSibling;
  }
  #move(parent, { key, before }) {
    before = before | 0;
    const { children, parentNode } = parent;
    const beforeEl = children[before].node;
    let prev = children[before];
    for (let i = before + 1;i < children.length; ++i) {
      const next = children[i];
      children[i] = prev;
      prev = next;
      if (next.key === key) {
        children[before] = next;
        break;
      }
    }
    this.#moveChild(parentNode, prev, beforeEl);
  }
  #moveChildren(domParent, children, beforeEl) {
    for (let i = 0;i < children.length; ++i) {
      this.#moveChild(domParent, children[i], beforeEl);
    }
  }
  #moveChild(domParent, child2, beforeEl) {
    moveBefore(domParent, child2.node, beforeEl);
    if (child2.isVirtual) {
      this.#moveChildren(domParent, child2.children, beforeEl);
    }
    if (child2.endNode) {
      moveBefore(domParent, child2.endNode, beforeEl);
    }
  }
  #remove(parent, { index: index4 }) {
    this.#removeChildren(parent, index4, 1);
  }
  #removeChildren(parent, index4, count) {
    const { children, parentNode } = parent;
    const deleted = children.splice(index4, count);
    for (let i = 0;i < deleted.length; ++i) {
      const child2 = deleted[i];
      const { node, endNode, isVirtual, children: nestedChildren } = child2;
      removeChild(parentNode, node);
      if (endNode) {
        removeChild(parentNode, endNode);
      }
      this.#removeDebouncers(child2);
      if (isVirtual) {
        deleted.push(...nestedChildren);
      }
    }
  }
  #removeDebouncers(node) {
    const { debouncers, children } = node;
    for (const { timeout } of debouncers.values()) {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
    debouncers.clear();
    iterate(children, (child2) => this.#removeDebouncers(child2));
  }
  #update({ node, handlers, throttles, debouncers }, { added, removed }) {
    iterate(removed, ({ name }) => {
      if (handlers.delete(name)) {
        removeEventListener(node, name, handleEvent);
        this.#updateDebounceThrottle(throttles, name, 0);
        this.#updateDebounceThrottle(debouncers, name, 0);
      } else {
        removeAttribute(node, name);
        SYNCED_ATTRIBUTES[name]?.removed?.(node, name);
      }
    });
    iterate(added, (attribute3) => this.#createAttribute(node, attribute3));
  }
  #replaceText({ node }, { content }) {
    setData(node, content ?? "");
  }
  #replaceInnerHtml({ node }, { inner_html }) {
    setInnerHtml(node, inner_html ?? "");
  }
  #insertChildren(domParent, beforeEl, metaParent, index4, children) {
    iterate(children, (child2) => this.#insertChild(domParent, beforeEl, metaParent, index4++, child2));
  }
  #insertChild(domParent, beforeEl, metaParent, index4, vnode) {
    switch (vnode.kind) {
      case element_kind: {
        const node = this.#createElement(metaParent, index4, vnode);
        this.#insertChildren(node, null, node[meta], 0, vnode.children);
        insertBefore(domParent, node, beforeEl);
        break;
      }
      case text_kind: {
        const node = this.#createTextNode(metaParent, index4, vnode);
        insertBefore(domParent, node, beforeEl);
        break;
      }
      case fragment_kind: {
        const marker = "lustre:fragment";
        const head = this.#createHead(marker, metaParent, index4, vnode);
        insertBefore(domParent, head, beforeEl);
        this.#insertChildren(domParent, beforeEl, head[meta], 0, vnode.children);
        if (this.#debug) {
          head[meta].endNode = createComment(` /${marker} `);
          insertBefore(domParent, head[meta].endNode, beforeEl);
        }
        break;
      }
      case unsafe_inner_html_kind: {
        const node = this.#createElement(metaParent, index4, vnode);
        this.#replaceInnerHtml({ node }, vnode);
        insertBefore(domParent, node, beforeEl);
        break;
      }
      case map_kind: {
        const head = this.#createHead("lustre:map", metaParent, index4, vnode);
        insertBefore(domParent, head, beforeEl);
        this.#insertChild(domParent, beforeEl, head[meta], 0, vnode.child);
        break;
      }
      case memo_kind: {
        const child2 = this.#memos?.get(vnode.view) ?? vnode.view();
        this.#insertChild(domParent, beforeEl, metaParent, index4, child2);
        break;
      }
    }
  }
  #createElement(parent, index4, { kind, key, tag, namespace, attributes }) {
    const node = createElementNS(namespace || NAMESPACE_HTML, tag);
    insertMetadataChild(kind, parent, node, index4, key);
    if (this.#debug && key) {
      setAttribute(node, "data-lustre-key", key);
    }
    iterate(attributes, (attribute3) => this.#createAttribute(node, attribute3));
    return node;
  }
  #createTextNode(parent, index4, { kind, key, content }) {
    const node = createTextNode(content ?? "");
    insertMetadataChild(kind, parent, node, index4, key);
    return node;
  }
  #createHead(marker, parent, index4, { kind, key }) {
    const node = this.#debug ? createComment(markerComment(marker, key)) : createTextNode("");
    insertMetadataChild(kind, parent, node, index4, key);
    return node;
  }
  #createAttribute(node, attribute3) {
    const { debouncers, handlers, throttles } = node[meta];
    const {
      kind,
      name,
      value: value2,
      prevent_default: prevent,
      debounce: debounceDelay,
      throttle: throttleDelay
    } = attribute3;
    switch (kind) {
      case attribute_kind: {
        const valueOrDefault = value2 ?? "";
        if (name === "virtual:defaultValue") {
          node.defaultValue = valueOrDefault;
          return;
        } else if (name === "virtual:defaultChecked") {
          node.defaultChecked = true;
          return;
        } else if (name === "virtual:defaultSelected") {
          node.defaultSelected = true;
          return;
        }
        if (valueOrDefault !== getAttribute(node, name)) {
          setAttribute(node, name, valueOrDefault);
        }
        SYNCED_ATTRIBUTES[name]?.added?.(node, valueOrDefault);
        break;
      }
      case property_kind:
        node[name] = value2;
        break;
      case event_kind: {
        if (handlers.has(name)) {
          removeEventListener(node, name, handleEvent);
        }
        const passive = prevent.kind === never_kind;
        addEventListener(node, name, handleEvent, { passive });
        this.#updateDebounceThrottle(throttles, name, throttleDelay);
        this.#updateDebounceThrottle(debouncers, name, debounceDelay);
        handlers.set(name, (event3) => this.#handleEvent(attribute3, event3));
        break;
      }
    }
  }
  #updateDebounceThrottle(map7, name, delay) {
    const debounceOrThrottle = map7.get(name);
    if (delay > 0) {
      if (debounceOrThrottle) {
        debounceOrThrottle.delay = delay;
      } else {
        map7.set(name, { delay });
      }
    } else if (debounceOrThrottle) {
      const { timeout } = debounceOrThrottle;
      if (timeout) {
        clearTimeout(timeout);
      }
      map7.delete(name);
    }
  }
  #handleEvent(attribute3, event3) {
    const { currentTarget, type } = event3;
    const { debouncers, throttles } = currentTarget[meta];
    const path = getPath(currentTarget);
    const {
      prevent_default: prevent,
      stop_propagation: stop,
      include
    } = attribute3;
    if (prevent.kind === always_kind)
      event3.preventDefault();
    if (stop.kind === always_kind)
      event3.stopPropagation();
    if (type === "submit") {
      event3.detail ??= {};
      event3.detail.formData = [
        ...new FormData(event3.target, event3.submitter).entries()
      ];
    }
    const data2 = this.#decodeEvent(event3, path, type, include);
    const throttle = throttles.get(type);
    if (throttle) {
      const now = Date.now();
      const last = throttle.last || 0;
      if (now > last + throttle.delay) {
        throttle.last = now;
        throttle.lastEvent = event3;
        this.#dispatch(event3, data2);
      }
    }
    const debounce = debouncers.get(type);
    if (debounce) {
      clearTimeout(debounce.timeout);
      debounce.timeout = setTimeout2(() => {
        if (event3 === throttles.get(type)?.lastEvent)
          return;
        this.#dispatch(event3, data2);
      }, debounce.delay);
    }
    if (!throttle && !debounce) {
      this.#dispatch(event3, data2);
    }
  }
}
var markerComment = (marker, key) => {
  if (key) {
    return ` ${marker} key="${escape2(key)}" `;
  } else {
    return ` ${marker} `;
  }
};
var handleEvent = (event3) => {
  const { currentTarget, type } = event3;
  const handler = currentTarget[meta].handlers.get(type);
  handler(event3);
};
var syncedBooleanAttribute = (name) => {
  return {
    added(node) {
      node[name] = true;
    },
    removed(node) {
      node[name] = false;
    }
  };
};
var syncedAttribute = (name) => {
  return {
    added(node, value2) {
      node[name] = value2;
    }
  };
};
var SYNCED_ATTRIBUTES = {
  checked: syncedBooleanAttribute("checked"),
  selected: syncedBooleanAttribute("selected"),
  value: syncedAttribute("value"),
  autofocus: {
    added(node) {
      queueMicrotask(() => {
        node.focus?.();
      });
    }
  },
  autoplay: {
    added(node) {
      try {
        node.play?.();
      } catch (e) {
        console.error(e);
      }
    }
  }
};

// build/dev/javascript/lustre/lustre/element/keyed.mjs
function do_extract_keyed_children(loop$key_children_pairs, loop$keyed_children, loop$children) {
  while (true) {
    let key_children_pairs = loop$key_children_pairs;
    let keyed_children = loop$keyed_children;
    let children = loop$children;
    if (key_children_pairs instanceof Empty) {
      return [keyed_children, reverse(children)];
    } else {
      let rest = key_children_pairs.tail;
      let key = key_children_pairs.head[0];
      let element$1 = key_children_pairs.head[1];
      let keyed_element = to_keyed(key, element$1);
      let _block;
      if (key === "") {
        _block = keyed_children;
      } else {
        _block = insert2(keyed_children, key, keyed_element);
      }
      let keyed_children$1 = _block;
      let children$1 = prepend(keyed_element, children);
      loop$key_children_pairs = rest;
      loop$keyed_children = keyed_children$1;
      loop$children = children$1;
    }
  }
}
function extract_keyed_children(children) {
  return do_extract_keyed_children(children, empty2(), empty_list);
}
function element3(tag, attributes, children) {
  let $ = extract_keyed_children(children);
  let keyed_children;
  let children$1;
  keyed_children = $[0];
  children$1 = $[1];
  return element("", "", tag, attributes, children$1, keyed_children, false, is_void_html_element(tag, ""));
}
function namespaced2(namespace, tag, attributes, children) {
  let $ = extract_keyed_children(children);
  let keyed_children;
  let children$1;
  keyed_children = $[0];
  children$1 = $[1];
  return element("", namespace, tag, attributes, children$1, keyed_children, false, is_void_html_element(tag, namespace));
}
function fragment2(children) {
  let $ = extract_keyed_children(children);
  let keyed_children;
  let children$1;
  keyed_children = $[0];
  children$1 = $[1];
  return fragment("", children$1, keyed_children);
}

// build/dev/javascript/lustre/lustre/vdom/virtualise.ffi.mjs
var virtualise = (root2) => {
  const rootMeta = insertMetadataChild(element_kind, null, root2, 0, null);
  for (let child2 = root2.firstChild;child2; child2 = child2.nextSibling) {
    const result = virtualiseChild(rootMeta, root2, child2, 0);
    if (result)
      return result.vnode;
  }
  const placeholder = globalThis.document.createTextNode("");
  insertMetadataChild(text_kind, rootMeta, placeholder, 0, null);
  root2.insertBefore(placeholder, root2.firstChild);
  return none2();
};
var virtualiseChild = (meta2, domParent, child2, index4) => {
  if (child2.nodeType === COMMENT_NODE) {
    const data2 = child2.data.trim();
    if (data2.startsWith("lustre:fragment")) {
      return virtualiseFragment(meta2, domParent, child2, index4);
    }
    if (data2.startsWith("lustre:map")) {
      return virtualiseMap(meta2, domParent, child2, index4);
    }
    if (data2.startsWith("lustre:memo")) {
      return virtualiseMemo(meta2, domParent, child2, index4);
    }
    return null;
  }
  if (child2.nodeType === ELEMENT_NODE) {
    return virtualiseElement(meta2, child2, index4);
  }
  if (child2.nodeType === TEXT_NODE) {
    return virtualiseText(meta2, child2, index4);
  }
  return null;
};
var virtualiseElement = (metaParent, node, index4) => {
  const key = node.getAttribute("data-lustre-key") ?? "";
  if (key) {
    node.removeAttribute("data-lustre-key");
  }
  const meta2 = insertMetadataChild(element_kind, metaParent, node, index4, key);
  const tag = node.localName;
  const namespace = node.namespaceURI;
  const isHtmlElement = !namespace || namespace === NAMESPACE_HTML;
  if (isHtmlElement && INPUT_ELEMENTS.includes(tag)) {
    virtualiseInputEvents(tag, node);
  }
  const attributes = virtualiseAttributes(node);
  const children = [];
  for (let childNode = node.firstChild;childNode; ) {
    const child2 = virtualiseChild(meta2, node, childNode, children.length);
    if (child2) {
      children.push([child2.key, child2.vnode]);
      childNode = child2.next;
    } else {
      childNode = childNode.nextSibling;
    }
  }
  const vnode = isHtmlElement ? element3(tag, attributes, toList3(children)) : namespaced2(namespace, tag, attributes, toList3(children));
  return childResult(key, vnode, node.nextSibling);
};
var virtualiseText = (meta2, node, index4) => {
  insertMetadataChild(text_kind, meta2, node, index4, null);
  return childResult("", text2(node.data), node.nextSibling);
};
var virtualiseFragment = (metaParent, domParent, node, index4) => {
  const key = parseKey(node.data);
  const meta2 = insertMetadataChild(fragment_kind, metaParent, node, index4, key);
  const children = [];
  node = node.nextSibling;
  while (node && (node.nodeType !== COMMENT_NODE || node.data.trim() !== "/lustre:fragment")) {
    const child2 = virtualiseChild(meta2, domParent, node, children.length);
    if (child2) {
      children.push([child2.key, child2.vnode]);
      node = child2.next;
    } else {
      node = node.nextSibling;
    }
  }
  meta2.endNode = node;
  const vnode = fragment2(toList3(children));
  return childResult(key, vnode, node?.nextSibling);
};
var virtualiseMap = (metaParent, domParent, node, index4) => {
  const key = parseKey(node.data);
  const meta2 = insertMetadataChild(map_kind, metaParent, node, index4, key);
  const child2 = virtualiseNextChild(meta2, domParent, node, 0);
  if (!child2)
    return null;
  const vnode = map6(child2.vnode, (x) => x);
  return childResult(key, vnode, child2.next);
};
var virtualiseMemo = (meta2, domParent, node, index4) => {
  const key = parseKey(node.data);
  const child2 = virtualiseNextChild(meta2, domParent, node, index4);
  if (!child2)
    return null;
  domParent.removeChild(node);
  const vnode = memo2(toList3([ref({})]), () => child2.vnode);
  return childResult(key, vnode, child2.next);
};
var virtualiseNextChild = (meta2, domParent, node, index4) => {
  while (true) {
    node = node.nextSibling;
    if (!node)
      return null;
    const child2 = virtualiseChild(meta2, domParent, node, index4);
    if (child2)
      return child2;
  }
};
var childResult = (key, vnode, next) => {
  return { key, vnode, next };
};
var virtualiseAttributes = (node) => {
  const attributes = [];
  for (let i = 0;i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    if (attr.name !== "xmlns") {
      attributes.push(attribute2(attr.localName, attr.value));
    }
  }
  return toList3(attributes);
};
var INPUT_ELEMENTS = ["input", "select", "textarea"];
var virtualiseInputEvents = (tag, node) => {
  const value2 = node.value;
  const checked = node.checked;
  if (tag === "input" && node.type === "checkbox" && !checked)
    return;
  if (tag === "input" && node.type === "radio" && !checked)
    return;
  if (node.type !== "checkbox" && node.type !== "radio" && !value2)
    return;
  queueMicrotask(() => {
    node.value = value2;
    node.checked = checked;
    node.dispatchEvent(new Event("input", { bubbles: true }));
    node.dispatchEvent(new Event("change", { bubbles: true }));
    if (globalThis.document.activeElement !== node) {
      node.dispatchEvent(new Event("blur", { bubbles: true }));
    }
  });
};
var parseKey = (data2) => {
  const keyMatch = data2.match(/key="([^"]*)"/);
  if (!keyMatch)
    return "";
  return unescapeKey(keyMatch[1]);
};
var unescapeKey = (key) => {
  return key.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'");
};
var toList3 = (arr) => arr.reduceRight((xs, x) => List$NonEmpty(x, xs), empty_list);

// build/dev/javascript/lustre/lustre/runtime/client/runtime.ffi.mjs
var is_browser = () => !!globalThis.document;
class Runtime {
  constructor(root2, [model, effects], view, update2, options) {
    this.root = root2;
    this.#model = model;
    this.#view = view;
    this.#update = update2;
    this.root.addEventListener("context-request", (event3) => {
      if (!(event3.context && event3.callback))
        return;
      if (!this.#contexts.has(event3.context))
        return;
      event3.stopImmediatePropagation();
      const context = this.#contexts.get(event3.context);
      if (event3.subscribe) {
        const unsubscribe = () => {
          context.subscribers = context.subscribers.filter((subscriber) => subscriber !== event3.callback);
        };
        context.subscribers.push([event3.callback, unsubscribe]);
        event3.callback(context.value, unsubscribe);
      } else {
        event3.callback(context.value);
      }
    });
    const decodeEvent = (event3, path, name) => decode2(this.#cache, path, name, event3);
    const dispatch2 = (event3, data2) => {
      const [cache, result] = dispatch(this.#cache, data2);
      this.#cache = cache;
      if (Result$isOk(result)) {
        const handler = Result$Ok$0(result);
        if (handler.stop_propagation)
          event3.stopPropagation();
        if (handler.prevent_default)
          event3.preventDefault();
        this.dispatch(handler.message, false);
      }
    };
    this.#reconciler = new Reconciler(this.root, decodeEvent, dispatch2, options);
    this.#vdom = virtualise(this.root);
    this.#cache = new$5();
    this.#handleEffects(effects);
    this.#render();
  }
  root = null;
  dispatch(msg, shouldFlush = false) {
    if (this.#shouldQueue) {
      this.#queue.push(msg);
    } else {
      const [model, effects] = this.#update(this.#model, msg);
      this.#model = model;
      this.#tick(effects, shouldFlush);
    }
  }
  emit(event3, data2) {
    const target = this.root.host ?? this.root;
    target.dispatchEvent(new CustomEvent(event3, {
      detail: data2,
      bubbles: true,
      composed: true
    }));
  }
  provide(key, value2) {
    if (!this.#contexts.has(key)) {
      this.#contexts.set(key, { value: value2, subscribers: [] });
    } else {
      const context = this.#contexts.get(key);
      if (isEqual2(context.value, value2)) {
        return;
      }
      context.value = value2;
      for (let i = context.subscribers.length - 1;i >= 0; i--) {
        const [subscriber, unsubscribe] = context.subscribers[i];
        if (!subscriber) {
          context.subscribers.splice(i, 1);
          continue;
        }
        subscriber(value2, unsubscribe);
      }
    }
  }
  #model;
  #view;
  #update;
  #vdom;
  #cache;
  #reconciler;
  #contexts = new Map;
  #shouldQueue = false;
  #queue = [];
  #beforePaint = empty_list;
  #afterPaint = empty_list;
  #renderTimer = null;
  #actions = {
    dispatch: (msg) => this.dispatch(msg),
    emit: (event3, data2) => this.emit(event3, data2),
    select: () => {},
    root: () => this.root,
    provide: (key, value2) => this.provide(key, value2)
  };
  #tick(effects, shouldFlush = false) {
    this.#handleEffects(effects);
    if (!this.#renderTimer) {
      if (shouldFlush) {
        this.#renderTimer = "sync";
        queueMicrotask(() => this.#render());
      } else {
        this.#renderTimer = window.requestAnimationFrame(() => this.#render());
      }
    }
  }
  #handleEffects(effects) {
    this.#shouldQueue = true;
    while (true) {
      iterate(effects.synchronous, (effect) => effect(this.#actions));
      this.#beforePaint = append4(this.#beforePaint, effects.before_paint);
      this.#afterPaint = append4(this.#afterPaint, effects.after_paint);
      if (!this.#queue.length)
        break;
      const msg = this.#queue.shift();
      [this.#model, effects] = this.#update(this.#model, msg);
    }
    this.#shouldQueue = false;
  }
  #render() {
    this.#renderTimer = null;
    const next = this.#view(this.#model);
    const { patch, cache } = diff(this.#cache, this.#vdom, next);
    this.#cache = cache;
    this.#vdom = next;
    this.#reconciler.push(patch, memos(cache));
    if (List$isNonEmpty(this.#beforePaint)) {
      const effects = makeEffect(this.#beforePaint);
      this.#beforePaint = empty_list;
      queueMicrotask(() => {
        this.#tick(effects, true);
      });
    }
    if (List$isNonEmpty(this.#afterPaint)) {
      const effects = makeEffect(this.#afterPaint);
      this.#afterPaint = empty_list;
      window.requestAnimationFrame(() => this.#tick(effects, true));
    }
  }
}
function makeEffect(synchronous) {
  return {
    synchronous,
    after_paint: empty_list,
    before_paint: empty_list
  };
}
var copiedStyleSheets = new WeakMap;

// build/dev/javascript/lustre/lustre/runtime/client/spa.ffi.mjs
class Spa {
  #runtime;
  constructor(root2, [init, effects], update2, view) {
    this.#runtime = new Runtime(root2, [init, effects], view, update2);
  }
  send(message) {
    if (Message$isEffectDispatchedMessage(message)) {
      this.dispatch(message.message, false);
    } else if (Message$isEffectEmitEvent(message)) {
      this.emit(message.name, message.data);
    } else if (Message$isSystemRequestedShutdown(message)) {}
  }
  dispatch(msg) {
    this.#runtime.dispatch(msg);
  }
  emit(event3, data2) {
    this.#runtime.emit(event3, data2);
  }
}
var start = ({ init, update: update2, view }, selector, flags) => {
  if (!is_browser())
    return Result$Error(Error$NotABrowser());
  const root2 = selector instanceof HTMLElement ? selector : globalThis.document.querySelector(selector);
  if (!root2)
    return Result$Error(Error$ElementNotFound(selector));
  return Result$Ok(new Spa(root2, init(flags), update2, view));
};

// build/dev/javascript/lustre/lustre/runtime/server/runtime.ffi.mjs
class Runtime2 {
  #model;
  #update;
  #view;
  #config;
  #vdom;
  #cache;
  #providers = make();
  #callbacks = /* @__PURE__ */ new Set;
  constructor(_, init, update2, view, config2, start_arguments) {
    const [model, effects] = init(start_arguments);
    this.#model = model;
    this.#update = update2;
    this.#view = view;
    this.#config = config2;
    this.#vdom = this.#view(this.#model);
    this.#cache = from_node(this.#vdom);
    this.#handle_effect(effects);
  }
  send(msg) {
    if (Message$isClientDispatchedMessage(msg)) {
      const { message } = msg;
      const next = this.#handle_client_message(message);
      const diff2 = diff(this.#cache, this.#vdom, next);
      this.#vdom = next;
      this.#cache = diff2.cache;
      this.broadcast(reconcile(diff2.patch, memos(diff2.cache)));
    } else if (Message$isClientRegisteredCallback(msg)) {
      const { callback } = msg;
      this.#callbacks.add(callback);
      callback(mount(this.#config.open_shadow_root, this.#config.adopt_styles, keys(this.#config.attributes), keys(this.#config.properties), keys(this.#config.contexts), this.#providers, this.#vdom, memos(this.#cache)));
      if (Option$isSome(config.on_connect)) {
        this.#dispatch(Option$Some$0(config.on_connect));
      }
    } else if (Message$isClientDeregisteredCallback(msg)) {
      const { callback } = msg;
      this.#callbacks.delete(callback);
      if (Option$isSome(config.on_disconnect)) {
        this.#dispatch(Option$Some$0(config.on_disconnect));
      }
    } else if (Message$isEffectDispatchedMessage(msg)) {
      const { message } = msg;
      const [model, effect] = this.#update(this.#model, message);
      const next = this.#view(model);
      const diff2 = diff(this.#cache, this.#vdom, next);
      this.#handle_effect(effect);
      this.#model = model;
      this.#vdom = next;
      this.#cache = diff2.cache;
      this.broadcast(reconcile(diff2.patch, memos(diff2.cache)));
    } else if (Message$isEffectEmitEvent(msg)) {
      const { name, data: data2 } = msg;
      this.broadcast(emit(name, data2));
    } else if (Message$isEffectProvidedValue(msg)) {
      const { key, value: value2 } = msg;
      const existing = get(this.#providers, key);
      if (Result$isOk(existing) && isEqual2(Result$Ok$0(existing), value2)) {
        return;
      }
      this.#providers = insert(this.#providers, key, value2);
      this.broadcast(provide(key, value2));
    } else if (Message$isSystemRequestedShutdown(msg)) {
      this.#model = null;
      this.#update = null;
      this.#view = null;
      this.#config = null;
      this.#vdom = null;
      this.#cache = null;
      this.#providers = null;
      this.#callbacks.clear();
    }
  }
  broadcast(msg) {
    for (const callback of this.#callbacks) {
      callback(msg);
    }
  }
  #handle_client_message(msg) {
    if (ServerMessage$isBatch(msg)) {
      const { messages } = msg;
      let model = this.#model;
      let effect = none();
      for (let list4 = messages;List$NonEmpty$rest(list4); list4 = List$NonEmpty$rest(list4)) {
        const result = this.#handle_client_message(List$NonEmpty$first(list4));
        if (Result$isOk(result)) {
          model = Result$Ok$0(result)[0];
          effect = batch(toList2([effect, Result$Ok$0(result)[1]]));
          break;
        }
      }
      this.#handle_effect(effect);
      this.#model = model;
      return this.#view(model);
    } else if (ServerMessage$isAttributeChanged(msg)) {
      const { name, value: value2 } = msg;
      const result = this.#handle_attribute_change(name, value2);
      if (!Result$isOk(result)) {
        return this.#vdom;
      }
      return this.#dispatch(Result$Ok$0(result));
    } else if (ServerMessage$isPropertyChanged(msg)) {
      const { name, value: value2 } = msg;
      const result = this.#handle_properties_change(name, value2);
      if (!Result$isOk(result)) {
        return this.#vdom;
      }
      return this.#dispatch(Result$Ok$0(result));
    } else if (ServerMessage$isEventFired(msg)) {
      const { path, name, event: event3 } = msg;
      const [cache, result] = handle(this.#cache, path, name, event3);
      this.#cache = cache;
      if (!Result$isOk(result)) {
        return this.#vdom;
      }
      const { message } = Result$Ok$0(result);
      return this.#dispatch(message);
    } else if (ServerMessage$isContextProvided(msg)) {
      const { key, value: value2 } = msg;
      let result = get(this.#config.contexts, key);
      if (!Result$isOk(result)) {
        return this.#vdom;
      }
      result = run(value2, Result$Ok$0(result));
      if (!Result$isOk(result)) {
        return this.#vdom;
      }
      return this.#dispatch(Result$Ok$0(result));
    }
  }
  #dispatch(msg) {
    const [model, effects] = this.#update(this.#model, msg);
    this.#handle_effect(effects);
    this.#model = model;
    return this.#view(this.#model);
  }
  #handle_attribute_change(name, value2) {
    const result = get(this.#config.attributes, name);
    if (!Result$isOk(result)) {
      return result;
    }
    return Result$Ok$0(result)(value2);
  }
  #handle_properties_change(name, value2) {
    const result = get(this.#config.properties, name);
    if (!Result$isOk(result)) {
      return result;
    }
    return Result$Ok$0(result)(value2);
  }
  #handle_effect(effect) {
    const dispatch2 = (message) => this.send(Message$EffectDispatchedMessage(message));
    const emit2 = (name, data2) => this.send(Message$EffectEmitEvent(name, data2));
    const select2 = () => {
      return;
    };
    const internals = () => {
      return;
    };
    const provide2 = (key, value2) => this.send(Message$EffectProvidedValue(key, value2));
    globalThis.queueMicrotask(() => {
      perform(effect, dispatch2, emit2, select2, internals, provide2);
    });
  }
}

// build/dev/javascript/lustre/lustre.mjs
class ElementNotFound extends CustomType {
  constructor(selector) {
    super();
    this.selector = selector;
  }
}
var Error$ElementNotFound = (selector) => new ElementNotFound(selector);
class NotABrowser extends CustomType {
}
var Error$NotABrowser = () => new NotABrowser;
function application(init, update2, view) {
  return new App(new None, init, update2, view, default_config);
}
function start4(app, selector, arguments$) {
  return guard(!is_browser(), new Error2(new NotABrowser), () => {
    return start(app, selector, arguments$);
  });
}

// build/dev/javascript/lustre/lustre/event.mjs
function on(name, handler) {
  return event(name, map3(handler, (msg) => {
    return new Handler(false, false, msg);
  }), empty_list, never, never, 0, 0);
}
function on_click(msg) {
  return on("click", success(msg));
}
function on_input(msg) {
  return on("input", subfield(toList(["target", "value"]), string2, (value2) => {
    return success(msg(value2));
  }));
}
// build/dev/javascript/yog/yog/internal/utils.mjs
function do_range(loop$current, loop$end, loop$acc) {
  while (true) {
    let current = loop$current;
    let end = loop$end;
    let acc = loop$acc;
    let $ = current > end;
    if ($) {
      return acc;
    } else {
      loop$current = current + 1;
      loop$end = end;
      loop$acc = prepend(current, acc);
    }
  }
}
function range(start5, end) {
  let _pipe = do_range(start5, end, toList([]));
  return reverse(_pipe);
}

// build/dev/javascript/yog/yog/model.mjs
class Directed extends CustomType {
}
class Undirected extends CustomType {
}
class Graph extends CustomType {
  constructor(kind, nodes, out_edges, in_edges) {
    super();
    this.kind = kind;
    this.nodes = nodes;
    this.out_edges = out_edges;
    this.in_edges = in_edges;
  }
}
function new$7(graph_type) {
  return new Graph(graph_type, make(), make(), make());
}
function add_node(graph, id2, data2) {
  let new_nodes = insert(graph.nodes, id2, data2);
  return new Graph(graph.kind, new_nodes, graph.out_edges, graph.in_edges);
}
function successors(graph, id2) {
  let _pipe = graph.out_edges;
  let _pipe$1 = get(_pipe, id2);
  let _pipe$2 = map4(_pipe$1, to_list);
  return unwrap(_pipe$2, toList([]));
}
function predecessors(graph, id2) {
  let _pipe = graph.in_edges;
  let _pipe$1 = get(_pipe, id2);
  let _pipe$2 = map4(_pipe$1, to_list);
  return unwrap(_pipe$2, toList([]));
}
function neighbors(graph, id2) {
  let $ = graph.kind;
  if ($ instanceof Directed) {
    let out = successors(graph, id2);
    let in_ = predecessors(graph, id2);
    return fold2(in_, out, (acc, incoming) => {
      let in_id;
      in_id = incoming[0];
      let $1 = any(out, (o) => {
        return o[0] === in_id;
      });
      if ($1) {
        return acc;
      } else {
        return prepend(incoming, acc);
      }
    });
  } else {
    return successors(graph, id2);
  }
}
function all_nodes(graph) {
  return keys(graph.nodes);
}
function successor_ids(graph, id2) {
  let _pipe = successors(graph, id2);
  return map2(_pipe, (edge) => {
    return edge[0];
  });
}
function do_add_directed_edge(graph, src, dst, weight) {
  let out_update_fn = (maybe_inner_map) => {
    if (maybe_inner_map instanceof Some) {
      let m = maybe_inner_map[0];
      return insert(m, dst, weight);
    } else {
      return from_list(toList([[dst, weight]]));
    }
  };
  let in_update_fn = (maybe_inner_map) => {
    if (maybe_inner_map instanceof Some) {
      let m = maybe_inner_map[0];
      return insert(m, src, weight);
    } else {
      return from_list(toList([[src, weight]]));
    }
  };
  let new_out = upsert(graph.out_edges, src, out_update_fn);
  let new_in = upsert(graph.in_edges, dst, in_update_fn);
  return new Graph(graph.kind, graph.nodes, new_out, new_in);
}
function add_edge(graph, src, dst, weight) {
  let graph$1 = do_add_directed_edge(graph, src, dst, weight);
  let $ = graph$1.kind;
  if ($ instanceof Directed) {
    return graph$1;
  } else {
    return do_add_directed_edge(graph$1, dst, src, weight);
  }
}

// build/dev/javascript/yog/yog/generators/classic.mjs
function create_nodes(graph, n) {
  let _pipe = range(0, n - 1);
  return fold2(_pipe, graph, (g, i) => {
    return add_node(g, i, undefined);
  });
}
function complete_with_type(n, graph_type) {
  let graph = create_nodes(new$7(graph_type), n);
  if (graph_type instanceof Directed) {
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let _pipe$1 = range(0, n - 1);
      return fold2(_pipe$1, g, (acc, j) => {
        let $ = i === j;
        if ($) {
          return acc;
        } else {
          return add_edge(acc, i, j, 1);
        }
      });
    });
  } else {
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let _pipe$1 = range(i + 1, n - 1);
      return fold2(_pipe$1, g, (acc, j) => {
        return add_edge(acc, i, j, 1);
      });
    });
  }
}
function complete(n) {
  return complete_with_type(n, new Undirected);
}
function cycle_with_type(n, graph_type) {
  let $ = n < 3;
  if ($) {
    return new$7(graph_type);
  } else {
    let graph = create_nodes(new$7(graph_type), n);
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let _block;
      let $1 = i === n - 1;
      if ($1) {
        _block = 0;
      } else {
        _block = i + 1;
      }
      let next = _block;
      return add_edge(g, i, next, 1);
    });
  }
}
function cycle(n) {
  return cycle_with_type(n, new Undirected);
}
function path_with_type(n, graph_type) {
  let $ = n < 2;
  if ($) {
    return create_nodes(new$7(graph_type), n);
  } else {
    let graph = create_nodes(new$7(graph_type), n);
    let _pipe = range(0, n - 2);
    return fold2(_pipe, graph, (g, i) => {
      return add_edge(g, i, i + 1, 1);
    });
  }
}
function path(n) {
  return path_with_type(n, new Undirected);
}
function star_with_type(n, graph_type) {
  let $ = n < 2;
  if ($) {
    return create_nodes(new$7(graph_type), n);
  } else {
    let graph = create_nodes(new$7(graph_type), n);
    let _pipe = range(1, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      return add_edge(g, 0, i, 1);
    });
  }
}
function star(n) {
  return star_with_type(n, new Undirected);
}
function wheel_with_type(n, graph_type) {
  let $ = n < 4;
  if ($) {
    return new$7(graph_type);
  } else {
    let with_star = star_with_type(n, graph_type);
    let _pipe = range(1, n - 1);
    return fold2(_pipe, with_star, (g, i) => {
      let _block;
      let $1 = i === n - 1;
      if ($1) {
        _block = 1;
      } else {
        _block = i + 1;
      }
      let next = _block;
      return add_edge(g, i, next, 1);
    });
  }
}
function wheel(n) {
  return wheel_with_type(n, new Undirected);
}
function complete_bipartite_with_type(m, n, graph_type) {
  let total = m + n;
  let graph = create_nodes(new$7(graph_type), total);
  let _pipe = range(0, m - 1);
  return fold2(_pipe, graph, (g, left) => {
    let _pipe$1 = range(m, total - 1);
    return fold2(_pipe$1, g, (acc, right) => {
      return add_edge(acc, left, right, 1);
    });
  });
}
function complete_bipartite(m, n) {
  return complete_bipartite_with_type(m, n, new Undirected);
}
function empty_with_type(n, graph_type) {
  return create_nodes(new$7(graph_type), n);
}
function empty3(n) {
  return empty_with_type(n, new Undirected);
}
function grid_2d_with_type(rows, cols, graph_type) {
  let n = rows * cols;
  let graph = create_nodes(new$7(graph_type), n);
  let _block;
  let _pipe = range(0, rows - 1);
  _block = fold2(_pipe, graph, (g, row) => {
    let _pipe$12 = range(0, cols - 2);
    return fold2(_pipe$12, g, (acc, col) => {
      let node = row * cols + col;
      return add_edge(acc, node, node + 1, 1);
    });
  });
  let with_horizontal = _block;
  let _pipe$1 = range(0, rows - 2);
  return fold2(_pipe$1, with_horizontal, (g, row) => {
    let _pipe$2 = range(0, cols - 1);
    return fold2(_pipe$2, g, (acc, col) => {
      let node = row * cols + col;
      let below = node + cols;
      return add_edge(acc, node, below, 1);
    });
  });
}
function grid_2d(rows, cols) {
  return grid_2d_with_type(rows, cols, new Undirected);
}
function petersen_with_type(graph_type) {
  let graph = create_nodes(new$7(graph_type), 10);
  let _block;
  let _pipe = graph;
  let _pipe$1 = add_edge(_pipe, 0, 1, 1);
  let _pipe$2 = add_edge(_pipe$1, 1, 2, 1);
  let _pipe$3 = add_edge(_pipe$2, 2, 3, 1);
  let _pipe$4 = add_edge(_pipe$3, 3, 4, 1);
  _block = add_edge(_pipe$4, 4, 0, 1);
  let with_outer = _block;
  let _block$1;
  let _pipe$5 = with_outer;
  let _pipe$6 = add_edge(_pipe$5, 5, 7, 1);
  let _pipe$7 = add_edge(_pipe$6, 7, 9, 1);
  let _pipe$8 = add_edge(_pipe$7, 9, 6, 1);
  let _pipe$9 = add_edge(_pipe$8, 6, 8, 1);
  _block$1 = add_edge(_pipe$9, 8, 5, 1);
  let with_inner = _block$1;
  let _pipe$10 = with_inner;
  let _pipe$11 = add_edge(_pipe$10, 0, 5, 1);
  let _pipe$12 = add_edge(_pipe$11, 1, 6, 1);
  let _pipe$13 = add_edge(_pipe$12, 2, 7, 1);
  let _pipe$14 = add_edge(_pipe$13, 3, 8, 1);
  return add_edge(_pipe$14, 4, 9, 1);
}
function petersen() {
  return petersen_with_type(new Undirected);
}
function do_power(loop$base, loop$exp, loop$acc) {
  while (true) {
    let base = loop$base;
    let exp2 = loop$exp;
    let acc = loop$acc;
    if (exp2 === 0) {
      return acc;
    } else {
      loop$base = base;
      loop$exp = exp2 - 1;
      loop$acc = acc * base;
    }
  }
}
function power3(base, exp2) {
  return do_power(base, exp2, 1);
}
function binary_tree_with_type(depth, graph_type) {
  let $ = depth < 0;
  if ($) {
    return new$7(graph_type);
  } else {
    let n = power3(2, depth + 1) - 1;
    let graph = create_nodes(new$7(graph_type), n);
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let left_child = 2 * i + 1;
      let right_child = 2 * i + 2;
      let _block;
      let $1 = left_child < n;
      if ($1) {
        _block = add_edge(g, i, left_child, 1);
      } else {
        _block = g;
      }
      let with_left = _block;
      let $2 = right_child < n;
      if ($2) {
        return add_edge(with_left, i, right_child, 1);
      } else {
        return with_left;
      }
    });
  }
}
function binary_tree(depth) {
  return binary_tree_with_type(depth, new Undirected);
}

// build/dev/javascript/yog/yog/generators/random.mjs
function add_random_edges(loop$graph, loop$n, loop$m, loop$existing, loop$graph_type) {
  while (true) {
    let graph = loop$graph;
    let n = loop$n;
    let m = loop$m;
    let existing = loop$existing;
    let graph_type = loop$graph_type;
    let $ = m <= 0;
    if ($) {
      return graph;
    } else {
      let i = random(n);
      let j = random(n);
      let $1 = i === j;
      if ($1) {
        loop$graph = graph;
        loop$n = n;
        loop$m = m;
        loop$existing = existing;
        loop$graph_type = graph_type;
      } else {
        let _block;
        if (graph_type instanceof Directed) {
          _block = [i, j];
        } else {
          let $22 = i < j;
          if ($22) {
            _block = [i, j];
          } else {
            _block = [j, i];
          }
        }
        let edge = _block;
        let $2 = contains2(existing, edge);
        if ($2) {
          loop$graph = graph;
          loop$n = n;
          loop$m = m;
          loop$existing = existing;
          loop$graph_type = graph_type;
        } else {
          let new_graph = add_edge(graph, edge[0], edge[1], 1);
          let new_existing = insert3(existing, edge);
          loop$graph = new_graph;
          loop$n = n;
          loop$m = m - 1;
          loop$existing = new_existing;
          loop$graph_type = graph_type;
        }
      }
    }
  }
}
function build_degree_list(graph, graph_type) {
  let _pipe = all_nodes(graph);
  return flat_map(_pipe, (node) => {
    let _block;
    if (graph_type instanceof Directed) {
      _block = length(successors(graph, node));
    } else {
      _block = length(neighbors(graph, node));
    }
    let degree = _block;
    return repeat(node, max(degree, 1));
  });
}
function add_random_edge_not_to(loop$graph, loop$from, loop$n) {
  while (true) {
    let graph = loop$graph;
    let from3 = loop$from;
    let n = loop$n;
    let to = random(n);
    let $ = to === from3;
    if ($) {
      loop$graph = graph;
      loop$from = from3;
      loop$n = n;
    } else {
      let neighbors2 = successors(graph, from3);
      let neighbor_ids = map2(neighbors2, (pair) => {
        return pair[0];
      });
      let $1 = contains(neighbor_ids, to);
      if ($1) {
        loop$graph = graph;
        loop$from = from3;
        loop$n = n;
      } else {
        return add_edge(graph, from3, to, 1);
      }
    }
  }
}
function create_nodes2(graph, n) {
  let _pipe = range(0, n - 1);
  return fold2(_pipe, graph, (g, i) => {
    return add_node(g, i, undefined);
  });
}
function erdos_renyi_gnp_with_type(n, p2, graph_type) {
  let graph = create_nodes2(new$7(graph_type), n);
  if (graph_type instanceof Directed) {
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let _pipe$1 = range(0, n - 1);
      return fold2(_pipe$1, g, (acc, j) => {
        let $ = i === j;
        if ($) {
          return acc;
        } else {
          let $1 = random_uniform() < p2;
          if ($1) {
            return add_edge(acc, i, j, 1);
          } else {
            return acc;
          }
        }
      });
    });
  } else {
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let _pipe$1 = range(i + 1, n - 1);
      return fold2(_pipe$1, g, (acc, j) => {
        let $ = random_uniform() < p2;
        if ($) {
          return add_edge(acc, i, j, 1);
        } else {
          return acc;
        }
      });
    });
  }
}
function erdos_renyi_gnp(n, p2) {
  return erdos_renyi_gnp_with_type(n, p2, new Undirected);
}
function erdos_renyi_gnm_with_type(n, m, graph_type) {
  let graph = create_nodes2(new$7(graph_type), n);
  let _block;
  if (graph_type instanceof Directed) {
    _block = n * (n - 1);
  } else {
    _block = globalThis.Math.trunc(n * (n - 1) / 2);
  }
  let max_edges = _block;
  let actual_m = min(m, max_edges);
  return add_random_edges(graph, n, actual_m, new$2(), graph_type);
}
function erdos_renyi_gnm(n, m) {
  return erdos_renyi_gnm_with_type(n, m, new Undirected);
}
function watts_strogatz_with_type(n, k, p2, graph_type) {
  let $ = n < 3 || k < 2 || k >= n;
  if ($) {
    return new$7(graph_type);
  } else {
    let graph = create_nodes2(new$7(graph_type), n);
    let half_k = globalThis.Math.trunc(k / 2);
    let _pipe = range(0, n - 1);
    return fold2(_pipe, graph, (g, i) => {
      let _pipe$1 = range(1, half_k);
      return fold2(_pipe$1, g, (acc, offset) => {
        let $1 = random_uniform() < p2;
        if ($1) {
          return add_random_edge_not_to(acc, i, n);
        } else {
          let j = remainderInt(i + offset, n);
          return add_edge(acc, i, j, 1);
        }
      });
    });
  }
}
function watts_strogatz(n, k, p2) {
  return watts_strogatz_with_type(n, k, p2, new Undirected);
}
function list_at(loop$lst, loop$index) {
  while (true) {
    let lst = loop$lst;
    let index4 = loop$index;
    if (lst instanceof Empty) {
      return new Error2(undefined);
    } else if (index4 === 0) {
      let first = lst.head;
      return new Ok(first);
    } else {
      let n = index4;
      if (n > 0) {
        let rest = lst.tail;
        loop$lst = rest;
        loop$index = n - 1;
      } else {
        return new Error2(undefined);
      }
    }
  }
}
function select_preferential_targets(loop$degree_list, loop$m, loop$selected) {
  while (true) {
    let degree_list = loop$degree_list;
    let m = loop$m;
    let selected = loop$selected;
    let $ = size3(selected) >= m || is_empty2(degree_list);
    if ($) {
      return selected;
    } else {
      let list_size = length(degree_list);
      let index4 = random(list_size);
      let $1 = list_at(degree_list, index4);
      if ($1 instanceof Ok) {
        let target = $1[0];
        let new_selected = insert3(selected, target);
        loop$degree_list = degree_list;
        loop$m = m;
        loop$selected = new_selected;
      } else {
        return selected;
      }
    }
  }
}
function add_node_with_preferential_attachment(graph, new_node, m, graph_type) {
  let with_node = add_node(graph, new_node, undefined);
  let degree_list = build_degree_list(graph, graph_type);
  let targets = select_preferential_targets(degree_list, m, new$2());
  let _pipe = targets;
  let _pipe$1 = to_list2(_pipe);
  return fold2(_pipe$1, with_node, (g, target) => {
    return add_edge(g, new_node, target, 1);
  });
}
function barabasi_albert_with_type(n, m, graph_type) {
  let $ = n < m || m < 1;
  if ($) {
    return new$7(graph_type);
  } else {
    let m0 = max(m, 2);
    let _block;
    let _pipe = range(0, m0 - 1);
    _block = fold2(_pipe, new$7(graph_type), (g, i) => {
      return add_node(g, i, undefined);
    });
    let initial = _block;
    let _block$1;
    if (graph_type instanceof Directed) {
      let _pipe$12 = range(0, m0 - 1);
      _block$1 = fold2(_pipe$12, initial, (g, i) => {
        let _pipe$2 = range(0, m0 - 1);
        return fold2(_pipe$2, g, (acc, j) => {
          let $1 = i === j;
          if ($1) {
            return acc;
          } else {
            return add_edge(acc, i, j, 1);
          }
        });
      });
    } else {
      let _pipe$12 = range(0, m0 - 1);
      _block$1 = fold2(_pipe$12, initial, (g, i) => {
        let _pipe$2 = range(i + 1, m0 - 1);
        return fold2(_pipe$2, g, (acc, j) => {
          return add_edge(acc, i, j, 1);
        });
      });
    }
    let initial_with_edges = _block$1;
    let _pipe$1 = range(m0, n - 1);
    return fold2(_pipe$1, initial_with_edges, (g, new_node) => {
      return add_node_with_preferential_attachment(g, new_node, m, graph_type);
    });
  }
}
function barabasi_albert(n, m) {
  return barabasi_albert_with_type(n, m, new Undirected);
}
function build_random_tree(loop$graph, loop$n, loop$in_tree, loop$next_node) {
  while (true) {
    let graph = loop$graph;
    let n = loop$n;
    let in_tree = loop$in_tree;
    let next_node = loop$next_node;
    let $ = next_node >= n;
    if ($) {
      return graph;
    } else {
      let tree_list = to_list2(in_tree);
      let tree_size = length(tree_list);
      let index4 = random(tree_size);
      let $1 = list_at(tree_list, index4);
      if ($1 instanceof Ok) {
        let parent = $1[0];
        let new_graph = add_edge(graph, parent, next_node, 1);
        let new_in_tree = insert3(in_tree, next_node);
        loop$graph = new_graph;
        loop$n = n;
        loop$in_tree = new_in_tree;
        loop$next_node = next_node + 1;
      } else {
        return graph;
      }
    }
  }
}
function random_tree_with_type(n, graph_type) {
  let $ = n < 2;
  if ($) {
    return create_nodes2(new$7(graph_type), n);
  } else {
    let graph = create_nodes2(new$7(graph_type), n);
    let in_tree = from_list2(toList([0]));
    return build_random_tree(graph, n, in_tree, 1);
  }
}
function random_tree(n) {
  return random_tree_with_type(n, new Undirected);
}
// build/dev/javascript/gleamy_structures/gleamy/pairing_heap.mjs
class Empty2 extends CustomType {
}

class Tree extends CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}

class Heap extends CustomType {
  constructor(root2, compare4) {
    super();
    this.root = root2;
    this.compare = compare4;
  }
}
function new$8(compare4) {
  return new Heap(new Empty2, compare4);
}
function merge_trees(x, y, compare4) {
  if (y instanceof Empty2) {
    return x;
  } else if (x instanceof Empty2) {
    return y;
  } else {
    let yk = y[0];
    let ys = y[1];
    let xk = x[0];
    let xs = x[1];
    let $ = compare4(xk, yk);
    if ($ instanceof Gt) {
      return new Tree(yk, prepend(x, ys));
    } else {
      return new Tree(xk, prepend(y, xs));
    }
  }
}
function insert5(heap, key) {
  return new Heap(merge_trees(new Tree(key, toList([])), heap.root, heap.compare), heap.compare);
}
function merge_pairs(l, compare4) {
  if (l instanceof Empty) {
    return new Empty2;
  } else {
    let $ = l.tail;
    if ($ instanceof Empty) {
      let h = l.head;
      return h;
    } else {
      let h12 = l.head;
      let h2 = $.head;
      let hs = $.tail;
      return merge_trees(merge_trees(h12, h2, compare4), merge_pairs(hs, compare4), compare4);
    }
  }
}
function delete_min(heap) {
  let $ = heap.root;
  if ($ instanceof Empty2) {
    return new Error2(undefined);
  } else {
    let x = $[0];
    let xs = $[1];
    return new Ok([x, new Heap(merge_pairs(xs, heap.compare), heap.compare)]);
  }
}

// build/dev/javascript/gleamy_structures/gleamy/priority_queue.mjs
function new$9(compare4) {
  return new$8(compare4);
}
function pop(queue) {
  return delete_min(queue);
}
function push(queue, item) {
  return insert5(queue, item);
}

// build/dev/javascript/yog/yog/pathfinding.mjs
class Path extends CustomType {
  constructor(nodes, total_weight) {
    super();
    this.nodes = nodes;
    this.total_weight = total_weight;
  }
}
function compare_frontier(a, b, cmp) {
  return cmp(a[0], b[0]);
}
function should_explore_node(visited, node, new_dist, compare4) {
  let $ = get(visited, node);
  if ($ instanceof Ok) {
    let prev_dist = $[0];
    let $1 = compare4(new_dist, prev_dist);
    if ($1 instanceof Lt) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
function do_dijkstra(loop$graph, loop$goal, loop$frontier, loop$visited, loop$add, loop$compare) {
  while (true) {
    let graph = loop$graph;
    let goal = loop$goal;
    let frontier = loop$frontier;
    let visited = loop$visited;
    let add4 = loop$add;
    let compare4 = loop$compare;
    let $ = pop(frontier);
    if ($ instanceof Ok) {
      let $1 = $[0][0][1];
      if ($1 instanceof Empty) {
        return new None;
      } else {
        let rest_frontier = $[0][1];
        let dist = $[0][0][0];
        let path2 = $1;
        let current = $1.head;
        let $2 = current === goal;
        if ($2) {
          return new Some(new Path(reverse(path2), dist));
        } else {
          let should_explore = should_explore_node(visited, current, dist, compare4);
          if (should_explore) {
            let new_visited = insert(visited, current, dist);
            let _block;
            let _pipe = successors(graph, current);
            _block = fold2(_pipe, rest_frontier, (h, neighbor) => {
              let next_id;
              let weight;
              next_id = neighbor[0];
              weight = neighbor[1];
              return push(h, [add4(dist, weight), prepend(next_id, path2)]);
            });
            let next_frontier = _block;
            loop$graph = graph;
            loop$goal = goal;
            loop$frontier = next_frontier;
            loop$visited = new_visited;
            loop$add = add4;
            loop$compare = compare4;
          } else {
            loop$graph = graph;
            loop$goal = goal;
            loop$frontier = rest_frontier;
            loop$visited = visited;
            loop$add = add4;
            loop$compare = compare4;
          }
        }
      }
    } else {
      return new None;
    }
  }
}
function shortest_path(graph, start5, goal, zero, add4, compare4) {
  let _block;
  let _pipe = new$9((a, b) => {
    return compare_frontier(a, b, compare4);
  });
  _block = push(_pipe, [zero, toList([start5])]);
  let frontier = _block;
  return do_dijkstra(graph, goal, frontier, make(), add4, compare4);
}

// build/dev/javascript/yog/yog/render.mjs
class MermaidOptions extends CustomType {
  constructor(node_label, edge_label, highlighted_nodes, highlighted_edges) {
    super();
    this.node_label = node_label;
    this.edge_label = edge_label;
    this.highlighted_nodes = highlighted_nodes;
    this.highlighted_edges = highlighted_edges;
  }
}
class DotOptions extends CustomType {
  constructor(node_label, edge_label, highlighted_nodes, highlighted_edges, node_shape, highlight_color) {
    super();
    this.node_label = node_label;
    this.edge_label = edge_label;
    this.highlighted_nodes = highlighted_nodes;
    this.highlighted_edges = highlighted_edges;
    this.node_shape = node_shape;
    this.highlight_color = highlight_color;
  }
}
class JsonOptions extends CustomType {
  constructor(node_mapper, edge_mapper) {
    super();
    this.node_mapper = node_mapper;
    this.edge_mapper = edge_mapper;
  }
}
function default_options() {
  return new MermaidOptions((id2, _) => {
    return to_string(id2);
  }, (weight) => {
    return weight;
  }, new None, new None);
}
function to_mermaid(graph, options) {
  let _block;
  let $ = graph.kind;
  if ($ instanceof Directed) {
    _block = `graph TD
`;
  } else {
    _block = `graph LR
`;
  }
  let graph_type = _block;
  let _block$1;
  let $1 = options.highlighted_nodes;
  let $2 = options.highlighted_edges;
  if ($1 instanceof Some) {
    _block$1 = `  classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:3px
` + `  classDef highlightEdge stroke:#f57c00,stroke-width:3px
`;
  } else if ($2 instanceof Some) {
    _block$1 = `  classDef highlight fill:#ffeb3b,stroke:#f57c00,stroke-width:3px
` + `  classDef highlightEdge stroke:#f57c00,stroke-width:3px
`;
  } else {
    _block$1 = "";
  }
  let styles = _block$1;
  let _block$2;
  let _pipe = fold(graph.nodes, toList([]), (acc, id2, data2) => {
    let label2 = options.node_label(id2, data2);
    let node_def = "  " + to_string(id2) + '["' + label2 + '"]';
    let _block$32;
    let $3 = options.highlighted_nodes;
    if ($3 instanceof Some) {
      let highlighted = $3[0];
      let $4 = contains(highlighted, id2);
      if ($4) {
        _block$32 = node_def + ":::highlight";
      } else {
        _block$32 = node_def;
      }
    } else {
      _block$32 = node_def;
    }
    let node_with_highlight = _block$32;
    return prepend(node_with_highlight, acc);
  });
  _block$2 = join(_pipe, `
`);
  let nodes = _block$2;
  let _block$3;
  let _pipe$1 = fold(graph.out_edges, toList([]), (acc, from_id, targets) => {
    let inner_edges = fold(targets, toList([]), (inner_acc, to_id, weight) => {
      let $3 = graph.kind;
      if ($3 instanceof Undirected && from_id > to_id) {
        return inner_acc;
      } else {
        let _block$4;
        let $4 = graph.kind;
        if ($4 instanceof Directed) {
          _block$4 = "-->";
        } else {
          _block$4 = "---";
        }
        let arrow = _block$4;
        let _block$5;
        let $5 = options.highlighted_edges;
        if ($5 instanceof Some) {
          let edges2 = $5[0];
          _block$5 = contains(edges2, [from_id, to_id]) || contains(edges2, [to_id, from_id]);
        } else {
          _block$5 = false;
        }
        let is_highlighted = _block$5;
        let edge_def = "  " + to_string(from_id) + " " + arrow + "|" + options.edge_label(weight) + "| " + to_string(to_id);
        let _block$6;
        if (is_highlighted) {
          _block$6 = edge_def + ":::highlightEdge";
        } else {
          _block$6 = edge_def;
        }
        let edge_with_highlight = _block$6;
        return prepend(edge_with_highlight, inner_acc);
      }
    });
    return flatten(toList([inner_edges, acc]));
  });
  _block$3 = join(_pipe$1, `
`);
  let edges = _block$3;
  return graph_type + styles + nodes + `
` + edges;
}
function default_dot_options() {
  return new DotOptions((id2, _) => {
    return to_string(id2);
  }, (weight) => {
    return weight;
  }, new None, new None, "ellipse", "red");
}
function to_dot(graph, options) {
  let _block;
  let $ = graph.kind;
  if ($ instanceof Directed) {
    _block = `digraph G {
`;
  } else {
    _block = `graph G {
`;
  }
  let graph_type = _block;
  let base_node_style = "  node [shape=" + options.node_shape + `];
`;
  let base_edge_style = `  edge [fontname="Helvetica", fontsize=10];
`;
  let _block$1;
  let _pipe = fold(graph.nodes, toList([]), (acc, id2, data2) => {
    let label2 = options.node_label(id2, data2);
    let id_str = to_string(id2);
    let _block$22;
    let $1 = options.highlighted_nodes;
    if ($1 instanceof Some) {
      let highlighted = $1[0];
      let $2 = contains(highlighted, id2);
      if ($2) {
        _block$22 = ' fillcolor="' + options.highlight_color + '", style=filled';
      } else {
        _block$22 = "";
      }
    } else {
      _block$22 = "";
    }
    let mut_attrs = _block$22;
    return prepend("  " + id_str + ' [label="' + label2 + '"' + mut_attrs + "];", acc);
  });
  _block$1 = join(_pipe, `
`);
  let nodes = _block$1;
  let _block$2;
  let _pipe$1 = fold(graph.out_edges, toList([]), (acc, from_id, targets) => {
    let inner_edges = fold(targets, toList([]), (inner_acc, to_id, weight) => {
      let _block$3;
      let $1 = graph.kind;
      if ($1 instanceof Directed) {
        _block$3 = true;
      } else {
        _block$3 = from_id <= to_id;
      }
      let is_valid = _block$3;
      if (is_valid) {
        let _block$4;
        let $2 = graph.kind;
        if ($2 instanceof Directed) {
          _block$4 = " -> ";
        } else {
          _block$4 = " -- ";
        }
        let connector = _block$4;
        let _block$5;
        let $3 = options.highlighted_edges;
        if ($3 instanceof Some) {
          let highlighted = $3[0];
          _block$5 = contains(highlighted, [from_id, to_id]) || contains(highlighted, [to_id, from_id]);
        } else {
          _block$5 = false;
        }
        let is_highlighted = _block$5;
        let _block$6;
        if (is_highlighted) {
          _block$6 = ' color="' + options.highlight_color + '", penwidth=2';
        } else {
          _block$6 = "";
        }
        let mut_attrs = _block$6;
        let edge_def = "  " + to_string(from_id) + connector + to_string(to_id) + ' [label="' + options.edge_label(weight) + '"' + mut_attrs + "];";
        return prepend(edge_def, inner_acc);
      } else {
        return inner_acc;
      }
    });
    return flatten(toList([inner_edges, acc]));
  });
  _block$2 = join(_pipe$1, `
`);
  let edges = _block$2;
  return graph_type + base_node_style + base_edge_style + nodes + `
` + edges + `
}`;
}
function default_json_options() {
  return new JsonOptions((id2, data2) => {
    return object2(toList([["id", int3(id2)], ["label", string3(data2)]]));
  }, (from3, to, weight) => {
    return object2(toList([
      ["source", int3(from3)],
      ["target", int3(to)],
      ["weight", string3(weight)]
    ]));
  });
}
function to_json4(graph, options) {
  let nodes_json = fold(graph.nodes, toList([]), (acc, id2, data2) => {
    return prepend(options.node_mapper(id2, data2), acc);
  });
  let edges_json = fold(graph.out_edges, toList([]), (acc, from_id, targets) => {
    let inner_edges = fold(targets, toList([]), (inner_acc, to_id, weight) => {
      let $ = graph.kind;
      if ($ instanceof Undirected && from_id > to_id) {
        return inner_acc;
      } else {
        return prepend(options.edge_mapper(from_id, to_id, weight), inner_acc);
      }
    });
    return flatten(toList([inner_edges, acc]));
  });
  return to_string2(object2(toList([
    ["nodes", array2(nodes_json, identity2)],
    ["edges", array2(edges_json, identity2)]
  ])));
}

// build/dev/javascript/yog/yog/topological_sort.mjs
function do_kahn(loop$graph, loop$queue, loop$in_degrees, loop$acc, loop$total_node_count) {
  while (true) {
    let graph = loop$graph;
    let queue = loop$queue;
    let in_degrees = loop$in_degrees;
    let acc = loop$acc;
    let total_node_count = loop$total_node_count;
    if (queue instanceof Empty) {
      let $ = length(acc) === total_node_count;
      if ($) {
        return new Ok(reverse(acc));
      } else {
        return new Error2(undefined);
      }
    } else {
      let head = queue.head;
      let tail = queue.tail;
      let neighbors2 = successor_ids(graph, head);
      let $ = fold2(neighbors2, [tail, in_degrees], (state, neighbor) => {
        let q;
        let degrees;
        q = state[0];
        degrees = state[1];
        let _block;
        let _pipe = get(degrees, neighbor);
        _block = unwrap(_pipe, 0);
        let current_degree = _block;
        let new_degree = current_degree - 1;
        let new_degrees = insert(degrees, neighbor, new_degree);
        let _block$1;
        let $1 = new_degree === 0;
        if ($1) {
          _block$1 = prepend(neighbor, q);
        } else {
          _block$1 = q;
        }
        let new_q = _block$1;
        return [new_q, new_degrees];
      });
      let next_queue;
      let next_in_degrees;
      next_queue = $[0];
      next_in_degrees = $[1];
      loop$graph = graph;
      loop$queue = next_queue;
      loop$in_degrees = next_in_degrees;
      loop$acc = prepend(head, acc);
      loop$total_node_count = total_node_count;
    }
  }
}
function topological_sort(graph) {
  let all_nodes2 = all_nodes(graph);
  let _block;
  let _pipe = all_nodes2;
  let _pipe$1 = map2(_pipe, (id2) => {
    let _block$12;
    let _pipe$12 = get(graph.in_edges, id2);
    let _pipe$22 = map4(_pipe$12, size);
    _block$12 = unwrap(_pipe$22, 0);
    let degree = _block$12;
    return [id2, degree];
  });
  _block = from_list(_pipe$1);
  let in_degrees = _block;
  let _block$1;
  let _pipe$2 = to_list(in_degrees);
  let _pipe$3 = filter(_pipe$2, (pair) => {
    return pair[1] === 0;
  });
  _block$1 = map2(_pipe$3, (pair) => {
    return pair[0];
  });
  let queue = _block$1;
  return do_kahn(graph, queue, in_degrees, toList([]), length(all_nodes2));
}
// build/dev/javascript/lustre_graph_generator/graph_ffi.mjs
var cy = null;
var mermaidInitialized = false;
function renderGraph(jsonString) {
  if (!jsonString)
    return;
  if (typeof cytoscape === "undefined") {
    console.error("Cytoscape library not loaded");
    return;
  }
  const container = document.getElementById("cy");
  if (!container) {
    console.error("Container #cy not found");
    return;
  }
  try {
    const data2 = JSON.parse(jsonString);
    const elements = {
      nodes: data2.nodes.map((n) => ({
        data: {
          id: String(n.id),
          label: n.label === "node" ? "" : n.label
        }
      })),
      edges: data2.edges.map((e) => ({
        data: {
          id: `${e.source}-${e.target}`,
          source: String(e.source),
          target: String(e.target),
          weight: e.weight
        }
      }))
    };
    const isGrid = data2.nodes.some((n) => n.label && n.label.startsWith("Grid"));
    if (cy && typeof cy.destroy === "function") {
      cy.destroy();
    }
    cy = cytoscape({
      container,
      elements,
      boxSelectionEnabled: false,
      autounselectify: true,
      style: [
        {
          selector: "node",
          style: {
            height: 8,
            width: 8,
            "background-color": "#0ea5e9",
            "border-width": 0,
            opacity: 0.9,
            "transition-property": "background-color, opacity",
            "transition-duration": "0.3s"
          }
        },
        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": "#334155",
            "target-arrow-color": "#334155",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.5,
            "curve-style": "bezier",
            opacity: 0.4
          }
        }
      ],
      layout: isGrid ? {
        name: "grid",
        rows: Math.max(...data2.nodes.map((n) => parseInt(n.label?.split(":")[1] || 0))) + 1,
        cols: Math.max(...data2.nodes.map((n) => parseInt(n.label?.split(":")[0]?.split(" ")[1] || 0))) + 1,
        padding: 50
      } : {
        name: "fcose",
        animate: data2.nodes.length < 100,
        animationDuration: 500,
        padding: 50,
        randomize: true,
        nodeRepulsion: 4500,
        idealEdgeLength: 50,
        sampleSize: 100,
        nodeDimensionsIncludeLabels: true,
        uniformNodeDimensions: true
      }
    });
  } catch (error) {
    console.error("Error rendering graph:", error);
  }
}
function copyToClipboard(text3) {
  if (!text3)
    return;
  navigator.clipboard.writeText(text3).then(() => {
    console.log("JSON copied to clipboard");
  }).catch((err) => {
    console.error("Failed to copy: ", err);
  });
}
function formatJSON(jsonString) {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch (e) {
    return jsonString;
  }
}
function renderMermaid(code) {
  const container = document.getElementById("mermaid-graph");
  if (!container)
    return;
  if (!code) {
    container.innerHTML = "";
    return;
  }
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "loose"
    });
    mermaidInitialized = true;
  }
  const id2 = "mermaid-svg-" + Math.random().toString(36).substr(2, 9);
  try {
    mermaid.render(id2, code).then(({ svg }) => {
      container.innerHTML = svg;
    }).catch((err) => {
      console.error("Mermaid render error:", err);
      container.innerHTML = `<p style="color: #ef4444; padding: 1rem;">Mermaid Error: ${err.message || "Check syntax"}</p>`;
    });
  } catch (e) {
    console.error("Mermaid catch error:", e);
    container.innerHTML = `<p style="color: #ef4444; padding: 1rem;">Mermaid Error: ${e.message}</p>`;
  }
}
var graphvizInstance = null;
async function renderDot(code) {
  const container = document.getElementById("dot-graph");
  if (!container)
    return;
  if (!code) {
    container.innerHTML = "";
    return;
  }
  try {
    if (!graphvizInstance) {
      console.log("Loading Graphviz WASM module...");
      const hpcc = await import("https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/graphviz.js");
      graphvizInstance = await hpcc.Graphviz.load();
      console.log("Graphviz WASM module loaded");
    }
    const svg = graphvizInstance.layout(code, "svg", "dot");
    container.innerHTML = svg;
    const svgElement = container.querySelector("svg");
    if (svgElement) {
      svgElement.style.width = "100%";
      svgElement.style.height = "auto";
      svgElement.style.maxWidth = "100%";
    }
  } catch (err) {
    console.error("DOT render error:", err);
    container.innerHTML = `<p style="color: #ef4444; padding: 1rem;">DOT Error: ${err.message || "Check syntax"}</p>`;
  }
}
function downloadImage(tabType) {
  const isJson = tabType.constructor.name === "Json";
  const isMermaid = tabType.constructor.name === "Mermaid";
  const isDot = tabType.constructor.name === "Dot";
  if (isJson) {
    if (!cy)
      return;
    try {
      const b64 = cy.png({ full: true, bg: "#0f172a", scale: 2 });
      const link = document.createElement("a");
      link.href = b64;
      link.download = "graph.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("PNG export error:", err);
    }
  } else if (isMermaid || isDot) {
    const containerId = isMermaid ? "mermaid-graph" : "dot-graph";
    const svg = document.querySelector(`#${containerId} svg`);
    if (!svg) {
      console.error("SVG not found for export");
      return;
    }
    try {
      const serializer = new XMLSerializer;
      let source = serializer.serializeToString(svg);
      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      if (!source.match(/^<svg[^>]+xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
      }
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `graph-${isMermaid ? "mermaid" : "dot"}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error("SVG export error:", err);
    }
  }
}

// build/dev/javascript/lustre_graph_generator/lustre_graph_generator.mjs
var FILEPATH = "src/lustre_graph_generator.gleam";

class Json extends CustomType {
}
class Mermaid extends CustomType {
}
class Dot extends CustomType {
}
class Model extends CustomType {
  constructor(graph_type, nodes, density, width, height, m, k, p2, depth, generated_json, mermaid_code, dot_code, csv_input, analysis_source, analysis_target, analysis_result, active_tab, validation_error) {
    super();
    this.graph_type = graph_type;
    this.nodes = nodes;
    this.density = density;
    this.width = width;
    this.height = height;
    this.m = m;
    this.k = k;
    this.p = p2;
    this.depth = depth;
    this.generated_json = generated_json;
    this.mermaid_code = mermaid_code;
    this.dot_code = dot_code;
    this.csv_input = csv_input;
    this.analysis_source = analysis_source;
    this.analysis_target = analysis_target;
    this.analysis_result = analysis_result;
    this.active_tab = active_tab;
    this.validation_error = validation_error;
  }
}
class Complete extends CustomType {
}
class Cycle extends CustomType {
}
class Path2 extends CustomType {
}
class Star extends CustomType {
}
class Wheel extends CustomType {
}
class Bipartite extends CustomType {
}
class Empty3 extends CustomType {
}
class BinaryTree extends CustomType {
}
class Grid2D extends CustomType {
}
class Petersen extends CustomType {
}
class ErdosRenyiGnp extends CustomType {
}
class ErdosRenyiGnm extends CustomType {
}
class BarabasiAlbert extends CustomType {
}
class WattsStrogatz extends CustomType {
}
class RandomTree extends CustomType {
}
class CSV extends CustomType {
}
class SelectGraphType extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateNodes extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateDensity extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateWidth extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateHeight extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateM extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateK extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateP extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateDepth extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class GenerateGraph extends CustomType {
}
class CopyJson extends CustomType {
}
class CopyMermaid extends CustomType {
}
class CopyDot extends CustomType {
}
class SelectTab extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class DownloadImage extends CustomType {
}
class UpdateCSV extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateAnalysisSource extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
class UpdateAnalysisTarget extends CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
function init(_) {
  return [
    new Model(new ErdosRenyiGnp, "10", "0.3", "5", "5", "2", "4", "0.1", "3", "", "", "", `A, B, 1, Directed
B, C, 2, Directed
C, A, 3, Directed
B, D, 1, Undirected`, "", "", new None, new Json, new None),
    none()
  ];
}
function find_node_id_by_label(graph, label2) {
  let _pipe = graph.nodes;
  let _pipe$1 = to_list(_pipe);
  let _pipe$2 = find(_pipe$1, (n) => {
    return n[1] === label2;
  });
  return map4(_pipe$2, (n) => {
    return n[0];
  });
}
function run_graph_analysis(graph, m) {
  let _block;
  let $ = find_node_id_by_label(graph, m.analysis_source);
  let $1 = find_node_id_by_label(graph, m.analysis_target);
  if ($ instanceof Ok && $1 instanceof Ok) {
    let src = $[0];
    let dst = $1[0];
    let $22 = shortest_path(graph, src, dst, 0, add, compare);
    if ($22 instanceof Some) {
      let path2 = $22[0];
      let _block$12;
      let _pipe = path2.nodes;
      let _pipe$1 = map2(_pipe, (id2) => {
        let _pipe$12 = get(graph.nodes, id2);
        return unwrap(_pipe$12, to_string(id2));
      });
      _block$12 = join(_pipe$1, " → ");
      let path_labels = _block$12;
      _block = "\uD83D\uDCCD Shortest Path: " + path_labels + " (Total Weight: " + to_string(path2.total_weight) + ")";
    } else {
      _block = "\uD83D\uDEAB No path found from " + m.analysis_source + " to " + m.analysis_target;
    }
  } else {
    let $22 = is_empty3(m.analysis_source) || is_empty3(m.analysis_target);
    if ($22) {
      _block = "";
    } else {
      _block = "⚠️ Enter valid node labels (e.g., A, B) to find shortest path.";
    }
  }
  let shortest_path_msg = _block;
  let _block$1;
  let $2 = topological_sort(graph);
  if ($2 instanceof Ok) {
    let sorted_ids = $2[0];
    let _block$2;
    let _pipe = sorted_ids;
    let _pipe$1 = map2(_pipe, (id2) => {
      let _pipe$12 = get(graph.nodes, id2);
      return unwrap(_pipe$12, to_string(id2));
    });
    _block$2 = join(_pipe$1, ", ");
    let sorted_labels = _block$2;
    _block$1 = "\uD83D\uDCD0 Topological Sort: " + sorted_labels;
  } else {
    _block$1 = "\uD83D\uDD04 Graph has cycles, topological sort not possible.";
  }
  let topo_msg = _block$1;
  if (shortest_path_msg === "") {
    let tm = topo_msg;
    return new Some(tm);
  } else {
    let sm = shortest_path_msg;
    let tm = topo_msg;
    return new Some(sm + `

` + tm);
  }
}
function parse_csv_to_graph(input2) {
  let _block;
  let _pipe = split2(input2, `
`);
  _block = filter(_pipe, (l) => {
    return !is_empty3(trim(l));
  });
  let lines = _block;
  let _block$1;
  let _pipe$1 = lines;
  _block$1 = index_fold(_pipe$1, new Ok([make(), toList([]), 0]), (acc, line, idx) => {
    if (acc instanceof Ok) {
      let label_map = acc[0][0];
      let edges = acc[0][1];
      let next_id = acc[0][2];
      let _block$2;
      let _pipe$2 = split2(line, ",");
      _block$2 = map2(_pipe$2, trim);
      let parts = _block$2;
      if (parts instanceof Empty) {
        return new Error2("Line " + to_string(idx + 1) + ": Invalid format. Use 'From, To, Weight'");
      } else {
        let $ = parts.tail;
        if ($ instanceof Empty) {
          return new Error2("Line " + to_string(idx + 1) + ": Invalid format. Use 'From, To, Weight'");
        } else {
          let $1 = $.tail;
          if ($1 instanceof Empty) {
            let from_label = parts.head;
            let to_label = $.head;
            let _block$3;
            let $3 = get(label_map, from_label);
            if ($3 instanceof Ok) {
              let id2 = $3[0];
              _block$3 = [label_map, id2, next_id];
            } else {
              _block$3 = [
                insert(label_map, from_label, next_id),
                next_id,
                next_id + 1
              ];
            }
            let $2 = _block$3;
            let label_map$1;
            let from_id;
            let next_id$1;
            label_map$1 = $2[0];
            from_id = $2[1];
            next_id$1 = $2[2];
            let _block$4;
            let $5 = get(label_map$1, to_label);
            if ($5 instanceof Ok) {
              let id2 = $5[0];
              _block$4 = [label_map$1, id2, next_id$1];
            } else {
              _block$4 = [
                insert(label_map$1, to_label, next_id$1),
                next_id$1,
                next_id$1 + 1
              ];
            }
            let $4 = _block$4;
            let label_map$2;
            let to_id;
            let next_id$2;
            label_map$2 = $4[0];
            to_id = $4[1];
            next_id$2 = $4[2];
            return new Ok([
              label_map$2,
              prepend([from_id, to_id, 1], edges),
              next_id$2
            ]);
          } else {
            let from_label = parts.head;
            let to_label = $.head;
            let weight_str = $1.head;
            let weight_res = parse_int(weight_str);
            if (weight_res instanceof Ok) {
              let w = weight_res[0];
              let _block$3;
              let $3 = get(label_map, from_label);
              if ($3 instanceof Ok) {
                let id2 = $3[0];
                _block$3 = [label_map, id2, next_id];
              } else {
                _block$3 = [
                  insert(label_map, from_label, next_id),
                  next_id,
                  next_id + 1
                ];
              }
              let $2 = _block$3;
              let label_map$1;
              let from_id;
              let next_id$1;
              label_map$1 = $2[0];
              from_id = $2[1];
              next_id$1 = $2[2];
              let _block$4;
              let $5 = get(label_map$1, to_label);
              if ($5 instanceof Ok) {
                let id2 = $5[0];
                _block$4 = [label_map$1, id2, next_id$1];
              } else {
                _block$4 = [
                  insert(label_map$1, to_label, next_id$1),
                  next_id$1,
                  next_id$1 + 1
                ];
              }
              let $4 = _block$4;
              let label_map$2;
              let to_id;
              let next_id$2;
              label_map$2 = $4[0];
              to_id = $4[1];
              next_id$2 = $4[2];
              return new Ok([
                label_map$2,
                prepend([from_id, to_id, w], edges),
                next_id$2
              ]);
            } else {
              return new Error2("Line " + to_string(idx + 1) + ": Invalid weight '" + weight_str + "'");
            }
          }
        }
      }
    } else {
      return acc;
    }
  });
  let result = _block$1;
  if (result instanceof Ok) {
    let label_map = result[0][0];
    let edges = result[0][1];
    let g = new$7(new Directed);
    let g$1 = fold(label_map, g, (acc, label2, id2) => {
      return add_node(acc, id2, label2);
    });
    let g$2 = fold2(edges, g$1, (acc, e) => {
      let from3;
      let to;
      let w;
      from3 = e[0];
      to = e[1];
      w = e[2];
      return add_edge(acc, from3, to, w);
    });
    return new Ok(g$2);
  } else {
    return result;
  }
}
function validate_params(model) {
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block;
    let _pipe = parse_int(model.nodes);
    _block = unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 100;
    if ($1) {
      return new Error2("Complete graph nodes cannot exceed 100");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof BinaryTree) {
    let _block;
    let _pipe = parse_int(model.depth);
    _block = unwrap(_pipe, 0);
    let d = _block;
    let $1 = d > 10;
    if ($1) {
      return new Error2("Binary Tree depth cannot exceed 10 (it grows exponentially!)");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof Grid2D) {
    let _block;
    let _pipe = parse_int(model.height);
    _block = unwrap(_pipe, 0);
    let r = _block;
    let _block$1;
    let _pipe$1 = parse_int(model.width);
    _block$1 = unwrap(_pipe$1, 0);
    let c = _block$1;
    let $1 = r * c > 2500;
    if ($1) {
      return new Error2("Grid size (Rows x Cols) cannot exceed 2500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block;
    let _pipe = parse_int(model.nodes);
    _block = unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error2("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block;
    let _pipe = parse_int(model.nodes);
    _block = unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error2("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof BarabasiAlbert) {
    let _block;
    let _pipe = parse_int(model.nodes);
    _block = unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error2("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof WattsStrogatz) {
    let _block;
    let _pipe = parse_int(model.nodes);
    _block = unwrap(_pipe, 0);
    let n = _block;
    let $1 = n > 500;
    if ($1) {
      return new Error2("Random graph nodes cannot exceed 500");
    } else {
      return new Ok(undefined);
    }
  } else if ($ instanceof CSV) {
    let $1 = parse_csv_to_graph(model.csv_input);
    if ($1 instanceof Ok) {
      return new Ok(undefined);
    } else {
      return $1;
    }
  } else {
    return new Ok(undefined);
  }
}
function render_graph_effect(json2) {
  return from2((_) => {
    return renderGraph(json2);
  });
}
function copy_to_clipboard_effect(text3) {
  return from2((_) => {
    return copyToClipboard(text3);
  });
}
function render_mermaid_effect(mermaid2) {
  return from2((_) => {
    return renderMermaid(mermaid2);
  });
}
function render_dot_effect(dot) {
  return from2((_) => {
    return renderDot(dot);
  });
}
function download_image_effect(tab) {
  return from2((_) => {
    return downloadImage(tab);
  });
}
function generate_mermaid_code(model) {
  let _block;
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 5);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = complete(n);
  } else if ($ instanceof Cycle) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 3);
    let n = _block$1;
    _block = cycle(n);
  } else if ($ instanceof Path2) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = path(n);
  } else if ($ instanceof Star) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = star(n);
  } else if ($ instanceof Wheel) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 4);
    let n = _block$1;
    _block = wheel(n);
  } else if ($ instanceof Bipartite) {
    let _block$1;
    let _pipe = parse_int(model.width);
    let _pipe$1 = unwrap(_pipe, 3);
    _block$1 = max(_pipe$1, 1);
    let m = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.height);
    let _pipe$3 = unwrap(_pipe$2, 3);
    _block$2 = max(_pipe$3, 1);
    let n = _block$2;
    _block = complete_bipartite(m, n);
  } else if ($ instanceof Empty3) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 0);
    let n = _block$1;
    _block = empty3(n);
  } else if ($ instanceof BinaryTree) {
    let _block$1;
    let _pipe = parse_int(model.depth);
    let _pipe$1 = unwrap(_pipe, 3);
    _block$1 = max(_pipe$1, 0);
    let d = _block$1;
    _block = binary_tree(d);
  } else if ($ instanceof Grid2D) {
    let _block$1;
    let _pipe = parse_int(model.height);
    let _pipe$1 = unwrap(_pipe, 5);
    _block$1 = max(_pipe$1, 1);
    let r = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.width);
    let _pipe$3 = unwrap(_pipe$2, 5);
    _block$2 = max(_pipe$3, 1);
    let c = _block$2;
    _block = grid_2d(r, c);
  } else if ($ instanceof Petersen) {
    _block = petersen();
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_float(model.density);
    _block$2 = unwrap(_pipe$2, 0.3);
    let p2 = _block$2;
    _block = erdos_renyi_gnp(n, p2);
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.m);
    let _pipe$3 = unwrap(_pipe$2, 10);
    _block$2 = max(_pipe$3, 0);
    let m = _block$2;
    _block = erdos_renyi_gnm(n, m);
  } else if ($ instanceof BarabasiAlbert) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 2);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.m);
    let _pipe$3 = unwrap(_pipe$2, 1);
    _block$2 = max(_pipe$3, 1);
    let m = _block$2;
    _block = barabasi_albert(n, m);
  } else if ($ instanceof WattsStrogatz) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 3);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.k);
    let _pipe$3 = unwrap(_pipe$2, 4);
    _block$2 = max(_pipe$3, 2);
    let k = _block$2;
    let _block$3;
    let _pipe$4 = parse_float(model.p);
    _block$3 = unwrap(_pipe$4, 0.1);
    let p2 = _block$3;
    _block = watts_strogatz(n, k, p2);
  } else if ($ instanceof RandomTree) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = random_tree(n);
  } else {
    _block = new$7(new Directed);
  }
  let graph = _block;
  let string_graph = new Graph(graph.kind, (() => {
    let _pipe = graph.nodes;
    return map(_pipe, (_, v) => {
      let $1 = is_empty3(inspect2(v));
      if ($1) {
        return "node";
      } else {
        let _pipe$1 = inspect2(v);
        return replace(_pipe$1, '"', "");
      }
    });
  })(), (() => {
    let _pipe = graph.out_edges;
    return map(_pipe, (_, edges) => {
      let _pipe$1 = edges;
      return map(_pipe$1, (_2, v2) => {
        return to_string(v2);
      });
    });
  })(), (() => {
    let _pipe = graph.in_edges;
    return map(_pipe, (_, edges) => {
      let _pipe$1 = edges;
      return map(_pipe$1, (_2, v2) => {
        return to_string(v2);
      });
    });
  })());
  return to_mermaid(string_graph, default_options());
}
function tab_button(label2, tab, is_active) {
  return button(toList([
    on_click(new SelectTab(tab)),
    class$((() => {
      if (is_active) {
        return "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-sky-500 text-sky-500 bg-sky-500/10";
      } else {
        return "px-4 py-2 rounded text-[13px] font-semibold transition-all cursor-pointer border border-transparent text-slate-400 hover:text-white hover:bg-white/5";
      }
    })())
  ]), toList([text2(label2)]));
}
function input_field(label2, val, msg, typ, step) {
  return div(toList([class$("mb-4")]), toList([
    label(toList([
      class$("block text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1")
    ]), toList([text2(label2)])),
    input(toList([
      type_(typ),
      value(val),
      on_input(msg),
      attribute2("step", step),
      class$("w-full p-3 bg-slate-900/80 border border-white/10 rounded text-white font-sans text-sm outline-none focus:border-sky-500 transition-colors")
    ]))
  ]));
}
function parameters_form(model) {
  return div(toList([]), (() => {
    let $ = model.graph_type;
    if ($ instanceof Complete) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Cycle) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Path2) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Star) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Wheel) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Bipartite) {
      return toList([
        input_field("Partition M", model.width, (var0) => {
          return new UpdateWidth(var0);
        }, "number", "1"),
        input_field("Partition N", model.height, (var0) => {
          return new UpdateHeight(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Empty3) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof BinaryTree) {
      return toList([
        input_field("Depth", model.depth, (var0) => {
          return new UpdateDepth(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Grid2D) {
      return toList([
        input_field("Rows", model.height, (var0) => {
          return new UpdateHeight(var0);
        }, "number", "1"),
        input_field("Cols", model.width, (var0) => {
          return new UpdateWidth(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof Petersen) {
      return toList([]);
    } else if ($ instanceof ErdosRenyiGnp) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1"),
        input_field("Probability", model.density, (var0) => {
          return new UpdateDensity(var0);
        }, "number", "0.01")
      ]);
    } else if ($ instanceof ErdosRenyiGnm) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1"),
        input_field("Edges (M)", model.m, (var0) => {
          return new UpdateM(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof BarabasiAlbert) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1"),
        input_field("Edges per node (M)", model.m, (var0) => {
          return new UpdateM(var0);
        }, "number", "1")
      ]);
    } else if ($ instanceof WattsStrogatz) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1"),
        input_field("Neighbors (K)", model.k, (var0) => {
          return new UpdateK(var0);
        }, "number", "2"),
        input_field("Rewiring Prob (P)", model.p, (var0) => {
          return new UpdateP(var0);
        }, "number", "0.01")
      ]);
    } else if ($ instanceof RandomTree) {
      return toList([
        input_field("Nodes", model.nodes, (var0) => {
          return new UpdateNodes(var0);
        }, "number", "1")
      ]);
    } else {
      return toList([
        div(toList([class$("mb-4")]), toList([
          label(toList([
            class$("block text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1")
          ]), toList([text2("CSV Input (From, To, Weight)")])),
          textarea(toList([
            class$("w-full h-40 bg-slate-900 p-4 rounded border border-white/10 text-[13px] font-mono text-sky-400 focus:outline-none focus:border-sky-500/50 transition-colors resize-none"),
            value(model.csv_input),
            on_input((var0) => {
              return new UpdateCSV(var0);
            }),
            attribute2("maxlength", "5000"),
            attribute2("placeholder", `A, B, 1
B, C, 2`)
          ]), "")
        ])),
        h3(toList([
          class$("text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest")
        ]), toList([text2("Graph Analysis")])),
        div(toList([class$("grid grid-cols-2 gap-4 mb-4")]), toList([
          input_field("Source Node", model.analysis_source, (var0) => {
            return new UpdateAnalysisSource(var0);
          }, "text", ""),
          input_field("Target Node", model.analysis_target, (var0) => {
            return new UpdateAnalysisTarget(var0);
          }, "text", "")
        ])),
        (() => {
          let $1 = model.analysis_result;
          if ($1 instanceof Some) {
            let result = $1[0];
            return div(toList([
              class$("p-4 bg-sky-500/5 border border-sky-500/20 rounded text-[13px] font-medium text-sky-300 whitespace-pre-wrap leading-relaxed shadow-inner")
            ]), toList([text2(result)]));
          } else {
            return none2();
          }
        })()
      ]);
    }
  })());
}
function view(model) {
  return div(toList([class$("max-w-[1400px] mx-auto")]), toList([
    div(toList([
      class$("bg-slate-800/70 backdrop-blur-xl border border-white/10 rounded overflow-hidden p-12 shadow-2xl mb-12")
    ]), toList([
      div(toList([
        class$("grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 mb-12")
      ]), toList([
        div(toList([]), toList([
          h1(toList([
            class$("text-4xl font-extrabold mb-2 text-white leading-tight")
          ]), toList([text2("\uD83C\uDFA8 Yog Graph Playground")])),
          p(toList([
            class$("text-slate-400 mb-8 font-medium")
          ]), toList([
            text2("Generate graphs interactively with Yog and visualize with Cytoscape.js!")
          ])),
          h3(toList([
            class$("text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest")
          ]), toList([text2("Graph Type")])),
          select(toList([
            on_input((val) => {
              if (val === "Complete") {
                return new SelectGraphType(new Complete);
              } else if (val === "Cycle") {
                return new SelectGraphType(new Cycle);
              } else if (val === "Path") {
                return new SelectGraphType(new Path2);
              } else if (val === "Star") {
                return new SelectGraphType(new Star);
              } else if (val === "Wheel") {
                return new SelectGraphType(new Wheel);
              } else if (val === "Bipartite") {
                return new SelectGraphType(new Bipartite);
              } else if (val === "Empty") {
                return new SelectGraphType(new Empty3);
              } else if (val === "BinaryTree") {
                return new SelectGraphType(new BinaryTree);
              } else if (val === "Grid2D") {
                return new SelectGraphType(new Grid2D);
              } else if (val === "Petersen") {
                return new SelectGraphType(new Petersen);
              } else if (val === "ErdosRenyiGnp") {
                return new SelectGraphType(new ErdosRenyiGnp);
              } else if (val === "ErdosRenyiGnm") {
                return new SelectGraphType(new ErdosRenyiGnm);
              } else if (val === "BarabasiAlbert") {
                return new SelectGraphType(new BarabasiAlbert);
              } else if (val === "WattsStrogatz") {
                return new SelectGraphType(new WattsStrogatz);
              } else if (val === "RandomTree") {
                return new SelectGraphType(new RandomTree);
              } else if (val === "CSV") {
                return new SelectGraphType(new CSV);
              } else {
                return new SelectGraphType(new ErdosRenyiGnp);
              }
            }),
            class$("w-full p-3 bg-slate-900/80 border border-white/10 rounded text-white font-sans text-base cursor-pointer outline-none focus:border-sky-500 transition-colors appearance-none"),
            value((() => {
              let $ = model.graph_type;
              if ($ instanceof Complete) {
                return "Complete";
              } else if ($ instanceof Cycle) {
                return "Cycle";
              } else if ($ instanceof Path2) {
                return "Path";
              } else if ($ instanceof Star) {
                return "Star";
              } else if ($ instanceof Wheel) {
                return "Wheel";
              } else if ($ instanceof Bipartite) {
                return "Bipartite";
              } else if ($ instanceof Empty3) {
                return "Empty";
              } else if ($ instanceof BinaryTree) {
                return "BinaryTree";
              } else if ($ instanceof Grid2D) {
                return "Grid2D";
              } else if ($ instanceof Petersen) {
                return "Petersen";
              } else if ($ instanceof ErdosRenyiGnp) {
                return "ErdosRenyiGnp";
              } else if ($ instanceof ErdosRenyiGnm) {
                return "ErdosRenyiGnm";
              } else if ($ instanceof BarabasiAlbert) {
                return "BarabasiAlbert";
              } else if ($ instanceof WattsStrogatz) {
                return "WattsStrogatz";
              } else if ($ instanceof RandomTree) {
                return "RandomTree";
              } else {
                return "CSV";
              }
            })())
          ]), toList([
            option(toList([value("Complete")]), "♾️ Complete"),
            option(toList([value("Cycle")]), "⭕ Cycle"),
            option(toList([value("Path")]), "\uD83D\uDCCF Path"),
            option(toList([value("Star")]), "⭐ Star"),
            option(toList([value("Wheel")]), "\uD83C\uDFA1 Wheel"),
            option(toList([value("Bipartite")]), "\uD83D\uDC65 Bipartite"),
            option(toList([value("Empty")]), "\uD83D\uDD73️ Empty"),
            option(toList([value("BinaryTree")]), "\uD83C\uDF33 Binary Tree"),
            option(toList([value("Grid2D")]), "\uD83C\uDFC1 Grid 2D"),
            option(toList([value("Petersen")]), "\uD83D\uDCD0 Petersen"),
            option(toList([value("ErdosRenyiGnp")]), "\uD83C\uDFB2 Random (Gnp)"),
            option(toList([value("ErdosRenyiGnm")]), "\uD83C\uDFB2 Random (Gnm)"),
            option(toList([value("BarabasiAlbert")]), "\uD83D\uDCC8 Scale-free (BA)"),
            option(toList([value("WattsStrogatz")]), "\uD83C\uDF10 Small-world (WS)"),
            option(toList([value("RandomTree")]), "\uD83C\uDF8B Random Tree"),
            option(toList([value("CSV")]), "\uD83D\uDCCA CSV (Experimental)")
          ])),
          h3(toList([
            class$("text-slate-400 text-[10px] mt-6 mb-3 font-bold uppercase tracking-widest")
          ]), toList([text2("Parameters")])),
          parameters_form(model),
          (() => {
            let $ = model.validation_error;
            if ($ instanceof Some) {
              let err = $[0];
              return div(toList([
                class$("mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded")
              ]), toList([
                p(toList([
                  class$("text-red-400 text-xs font-medium m-0")
                ]), toList([text2("⚠️ " + err)]))
              ]));
            } else {
              return none2();
            }
          })(),
          div(toList([class$("mt-8")]), toList([
            button(toList([
              on_click(new GenerateGraph),
              class$("w-full bg-sky-500 hover:bg-sky-600 text-white border-none p-4 rounded cursor-pointer text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-sky-500/20")
            ]), toList([text2("✨ Generate & Visualize")]))
          ]))
        ])),
        div(toList([]), toList([
          div(toList([
            class$("flex gap-4 mb-4 border-b border-white/10 pb-2")
          ]), toList([
            tab_button("JSON", new Json, model.active_tab instanceof Json),
            tab_button("Mermaid", new Mermaid, model.active_tab instanceof Mermaid),
            tab_button("DOT", new Dot, model.active_tab instanceof Dot)
          ])),
          div(toList([]), toList([
            (() => {
              let $ = model.active_tab;
              if ($ instanceof Json) {
                return div(toList([]), toList([
                  div(toList([
                    class$("flex justify-between items-center mb-2")
                  ]), toList([
                    h3(toList([
                      class$("text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0")
                    ]), toList([text2("Generated JSON")])),
                    (() => {
                      let $1 = model.generated_json;
                      if ($1 === "") {
                        return none2();
                      } else {
                        return div(toList([class$("flex gap-2")]), toList([
                          button(toList([
                            class$("bg-sky-600 hover:bg-sky-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors"),
                            on_click(new DownloadImage)
                          ]), toList([text2("\uD83D\uDCBE Download")])),
                          button(toList([
                            class$("bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors"),
                            on_click(new CopyJson)
                          ]), toList([text2("\uD83D\uDCCB Copy")]))
                        ]));
                      }
                    })()
                  ])),
                  (() => {
                    let $1 = model.generated_json;
                    if ($1 === "") {
                      return p(toList([
                        class$("text-slate-400 mb-8 font-medium")
                      ]), toList([
                        text2("Click 'Generate' to see output")
                      ]));
                    } else {
                      let json2 = $1;
                      return pre(toList([
                        class$("bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400")
                      ]), toList([text2(json2)]));
                    }
                  })()
                ]));
              } else if ($ instanceof Mermaid) {
                return div(toList([]), toList([
                  div(toList([
                    class$("flex justify-between items-center mb-2")
                  ]), toList([
                    h3(toList([
                      class$("text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0")
                    ]), toList([text2("Mermaid Definition")])),
                    (() => {
                      let $1 = model.mermaid_code;
                      if ($1 === "") {
                        return none2();
                      } else {
                        return div(toList([class$("flex gap-2")]), toList([
                          button(toList([
                            class$("bg-sky-600 hover:bg-sky-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors"),
                            on_click(new DownloadImage)
                          ]), toList([text2("\uD83D\uDCBE Download")])),
                          button(toList([
                            class$("bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors"),
                            on_click(new CopyMermaid)
                          ]), toList([text2("\uD83D\uDCCB Copy")]))
                        ]));
                      }
                    })()
                  ])),
                  (() => {
                    let $1 = model.mermaid_code;
                    if ($1 === "") {
                      return p(toList([
                        class$("text-slate-400 mb-8 font-medium")
                      ]), toList([
                        text2("Click 'Generate' to see definition")
                      ]));
                    } else {
                      let code = $1;
                      return pre(toList([
                        class$("bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400")
                      ]), toList([text2(code)]));
                    }
                  })()
                ]));
              } else {
                return div(toList([]), toList([
                  div(toList([
                    class$("flex justify-between items-center mb-2")
                  ]), toList([
                    h3(toList([
                      class$("text-slate-400 text-[10px] font-bold uppercase tracking-widest m-0")
                    ]), toList([text2("DOT Definition")])),
                    (() => {
                      let $1 = model.dot_code;
                      if ($1 === "") {
                        return none2();
                      } else {
                        return div(toList([class$("flex gap-2")]), toList([
                          button(toList([
                            class$("bg-sky-600 hover:bg-sky-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors"),
                            on_click(new DownloadImage)
                          ]), toList([text2("\uD83D\uDCBE Download")])),
                          button(toList([
                            class$("bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] px-3 py-1.5 rounded font-semibold transition-colors"),
                            on_click(new CopyDot)
                          ]), toList([text2("\uD83D\uDCCB Copy")]))
                        ]));
                      }
                    })()
                  ])),
                  (() => {
                    let $1 = model.dot_code;
                    if ($1 === "") {
                      return p(toList([
                        class$("text-slate-400 mb-8 font-medium")
                      ]), toList([
                        text2("Click 'Generate' to see definition")
                      ]));
                    } else {
                      let code = $1;
                      return pre(toList([
                        class$("bg-slate-900 p-6 rounded border border-white/10 overflow-x-auto h-[480px] text-[13px] font-mono text-sky-400")
                      ]), toList([text2(code)]));
                    }
                  })()
                ]));
              }
            })()
          ]))
        ]))
      ])),
      div(toList([]), toList([
        h3(toList([
          class$("text-slate-400 text-[10px] mb-3 font-bold uppercase tracking-widest")
        ]), toList([
          text2((() => {
            let $ = model.active_tab;
            if ($ instanceof Json) {
              return "Cytoscape Visualization";
            } else if ($ instanceof Mermaid) {
              return "Mermaid Diagram";
            } else {
              return "Graphviz Visualization";
            }
          })())
        ])),
        div(toList([
          id("cy"),
          class$((() => {
            let $ = model.active_tab;
            if ($ instanceof Json) {
              return "w-full h-[600px] bg-slate-900/40 border border-white/10 rounded mt-4";
            } else {
              return "hidden";
            }
          })())
        ]), toList([])),
        div(toList([
          id("mermaid-graph"),
          class$((() => {
            let $ = model.active_tab;
            if ($ instanceof Mermaid) {
              return "w-full min-h-[400px] bg-white p-8 rounded flex justify-center overflow-auto mt-4";
            } else {
              return "hidden";
            }
          })())
        ]), toList([])),
        div(toList([
          id("dot-graph"),
          class$((() => {
            let $ = model.active_tab;
            if ($ instanceof Dot) {
              return "w-full min-h-[400px] bg-white p-8 rounded flex justify-center overflow-auto mt-4";
            } else {
              return "hidden";
            }
          })())
        ]), toList([]))
      ]))
    ]))
  ]));
}
function generate_graph_json(model) {
  let _block;
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 5);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = complete(n);
  } else if ($ instanceof Cycle) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 3);
    let n = _block$1;
    _block = cycle(n);
  } else if ($ instanceof Path2) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = path(n);
  } else if ($ instanceof Star) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = star(n);
  } else if ($ instanceof Wheel) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 4);
    let n = _block$1;
    _block = wheel(n);
  } else if ($ instanceof Bipartite) {
    let _block$1;
    let _pipe = parse_int(model.width);
    let _pipe$1 = unwrap(_pipe, 3);
    _block$1 = max(_pipe$1, 1);
    let m = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.height);
    let _pipe$3 = unwrap(_pipe$2, 3);
    _block$2 = max(_pipe$3, 1);
    let n = _block$2;
    _block = complete_bipartite(m, n);
  } else if ($ instanceof Empty3) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 0);
    let n = _block$1;
    _block = empty3(n);
  } else if ($ instanceof BinaryTree) {
    let _block$1;
    let _pipe = parse_int(model.depth);
    let _pipe$1 = unwrap(_pipe, 3);
    _block$1 = max(_pipe$1, 0);
    let d = _block$1;
    _block = binary_tree(d);
  } else if ($ instanceof Grid2D) {
    let _block$1;
    let _pipe = parse_int(model.height);
    let _pipe$1 = unwrap(_pipe, 5);
    _block$1 = max(_pipe$1, 1);
    let r = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.width);
    let _pipe$3 = unwrap(_pipe$2, 5);
    _block$2 = max(_pipe$3, 1);
    let c = _block$2;
    _block = grid_2d(r, c);
  } else if ($ instanceof Petersen) {
    _block = petersen();
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_float(model.density);
    _block$2 = unwrap(_pipe$2, 0.3);
    let p2 = _block$2;
    _block = erdos_renyi_gnp(n, p2);
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.m);
    let _pipe$3 = unwrap(_pipe$2, 10);
    _block$2 = max(_pipe$3, 0);
    let m = _block$2;
    _block = erdos_renyi_gnm(n, m);
  } else if ($ instanceof BarabasiAlbert) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 2);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.m);
    let _pipe$3 = unwrap(_pipe$2, 1);
    _block$2 = max(_pipe$3, 1);
    let m = _block$2;
    _block = barabasi_albert(n, m);
  } else if ($ instanceof WattsStrogatz) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 3);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.k);
    let _pipe$3 = unwrap(_pipe$2, 4);
    _block$2 = max(_pipe$3, 2);
    let k = _block$2;
    let _block$3;
    let _pipe$4 = parse_float(model.p);
    _block$3 = unwrap(_pipe$4, 0.1);
    let p2 = _block$3;
    _block = watts_strogatz(n, k, p2);
  } else if ($ instanceof RandomTree) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = random_tree(n);
  } else {
    _block = new$7(new Directed);
  }
  let graph = _block;
  let string_graph = new Graph(graph.kind, (() => {
    let _pipe = graph.nodes;
    return map(_pipe, (_, v) => {
      let $1 = is_empty3(inspect2(v));
      if ($1) {
        return "node";
      } else {
        let _pipe$1 = inspect2(v);
        return replace(_pipe$1, '"', "");
      }
    });
  })(), (() => {
    let _pipe = graph.out_edges;
    return map(_pipe, (_, edges) => {
      let _pipe$1 = edges;
      return map(_pipe$1, (_2, v2) => {
        return to_string(v2);
      });
    });
  })(), (() => {
    let _pipe = graph.in_edges;
    return map(_pipe, (_, edges) => {
      let _pipe$1 = edges;
      return map(_pipe$1, (_2, v2) => {
        return to_string(v2);
      });
    });
  })());
  return to_json4(string_graph, default_json_options());
}
function generate_dot_code(model) {
  let _block;
  let $ = model.graph_type;
  if ($ instanceof Complete) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 5);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = complete(n);
  } else if ($ instanceof Cycle) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 3);
    let n = _block$1;
    _block = cycle(n);
  } else if ($ instanceof Path2) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = path(n);
  } else if ($ instanceof Star) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = star(n);
  } else if ($ instanceof Wheel) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 4);
    let n = _block$1;
    _block = wheel(n);
  } else if ($ instanceof Bipartite) {
    let _block$1;
    let _pipe = parse_int(model.width);
    let _pipe$1 = unwrap(_pipe, 3);
    _block$1 = max(_pipe$1, 1);
    let m = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.height);
    let _pipe$3 = unwrap(_pipe$2, 3);
    _block$2 = max(_pipe$3, 1);
    let n = _block$2;
    _block = complete_bipartite(m, n);
  } else if ($ instanceof Empty3) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 0);
    let n = _block$1;
    _block = empty3(n);
  } else if ($ instanceof BinaryTree) {
    let _block$1;
    let _pipe = parse_int(model.depth);
    let _pipe$1 = unwrap(_pipe, 3);
    _block$1 = max(_pipe$1, 0);
    let d = _block$1;
    _block = binary_tree(d);
  } else if ($ instanceof Grid2D) {
    let _block$1;
    let _pipe = parse_int(model.height);
    let _pipe$1 = unwrap(_pipe, 5);
    _block$1 = max(_pipe$1, 1);
    let r = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.width);
    let _pipe$3 = unwrap(_pipe$2, 5);
    _block$2 = max(_pipe$3, 1);
    let c = _block$2;
    _block = grid_2d(r, c);
  } else if ($ instanceof Petersen) {
    _block = petersen();
  } else if ($ instanceof ErdosRenyiGnp) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_float(model.density);
    _block$2 = unwrap(_pipe$2, 0.3);
    let p2 = _block$2;
    _block = erdos_renyi_gnp(n, p2);
  } else if ($ instanceof ErdosRenyiGnm) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.m);
    let _pipe$3 = unwrap(_pipe$2, 10);
    _block$2 = max(_pipe$3, 0);
    let m = _block$2;
    _block = erdos_renyi_gnm(n, m);
  } else if ($ instanceof BarabasiAlbert) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 2);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.m);
    let _pipe$3 = unwrap(_pipe$2, 1);
    _block$2 = max(_pipe$3, 1);
    let m = _block$2;
    _block = barabasi_albert(n, m);
  } else if ($ instanceof WattsStrogatz) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 3);
    let n = _block$1;
    let _block$2;
    let _pipe$2 = parse_int(model.k);
    let _pipe$3 = unwrap(_pipe$2, 4);
    _block$2 = max(_pipe$3, 2);
    let k = _block$2;
    let _block$3;
    let _pipe$4 = parse_float(model.p);
    _block$3 = unwrap(_pipe$4, 0.1);
    let p2 = _block$3;
    _block = watts_strogatz(n, k, p2);
  } else if ($ instanceof RandomTree) {
    let _block$1;
    let _pipe = parse_int(model.nodes);
    let _pipe$1 = unwrap(_pipe, 10);
    _block$1 = max(_pipe$1, 1);
    let n = _block$1;
    _block = random_tree(n);
  } else {
    _block = new$7(new Directed);
  }
  let graph = _block;
  let string_graph = new Graph(graph.kind, (() => {
    let _pipe = graph.nodes;
    return map(_pipe, (_, v) => {
      let $1 = is_empty3(inspect2(v));
      if ($1) {
        return "node";
      } else {
        let _pipe$1 = inspect2(v);
        return replace(_pipe$1, '"', "");
      }
    });
  })(), (() => {
    let _pipe = graph.out_edges;
    return map(_pipe, (_, edges) => {
      let _pipe$1 = edges;
      return map(_pipe$1, (_2, v2) => {
        return to_string(v2);
      });
    });
  })(), (() => {
    let _pipe = graph.in_edges;
    return map(_pipe, (_, edges) => {
      let _pipe$1 = edges;
      return map(_pipe$1, (_2, v2) => {
        return to_string(v2);
      });
    });
  })());
  return to_dot(string_graph, default_dot_options());
}
function update2(loop$m, loop$msg) {
  while (true) {
    let m = loop$m;
    let msg = loop$msg;
    if (msg instanceof SelectGraphType) {
      let graph_type = msg[0];
      return [
        new Model(graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateNodes) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, value2, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateDensity) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, value2, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateWidth) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, m.density, value2, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateHeight) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, m.density, m.width, value2, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateM) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, m.density, m.width, m.height, value2, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateK) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, value2, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateP) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, value2, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof UpdateDepth) {
      let value2 = msg[0];
      return [
        new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, value2, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error),
        none()
      ];
    } else if (msg instanceof GenerateGraph) {
      let $ = validate_params(m);
      if ($ instanceof Ok) {
        let _block;
        let $2 = m.graph_type;
        if ($2 instanceof CSV) {
          let $32 = parse_csv_to_graph(m.csv_input);
          if ($32 instanceof Ok) {
            let graph = $32[0];
            let analysis_result2 = run_graph_analysis(graph, m);
            let string_graph = new Graph(graph.kind, graph.nodes, (() => {
              let _pipe2 = graph.out_edges;
              return map(_pipe2, (_, edges) => {
                let _pipe$1 = edges;
                return map(_pipe$1, (_2, v2) => {
                  return to_string(v2);
                });
              });
            })(), (() => {
              let _pipe2 = graph.in_edges;
              return map(_pipe2, (_, edges) => {
                let _pipe$1 = edges;
                return map(_pipe$1, (_2, v2) => {
                  return to_string(v2);
                });
              });
            })());
            let _block$1;
            let _pipe = to_json4(string_graph, default_json_options());
            _block$1 = formatJSON(_pipe);
            let json3 = _block$1;
            let mermaid3 = to_mermaid(string_graph, default_options());
            let dot2 = to_dot(string_graph, default_dot_options());
            _block = [json3, mermaid3, dot2, analysis_result2];
          } else {
            _block = ["", "", "", new None];
          }
        } else {
          let _block$1;
          let _pipe = generate_graph_json(m);
          _block$1 = formatJSON(_pipe);
          let json3 = _block$1;
          let mermaid3 = generate_mermaid_code(m);
          let dot2 = generate_dot_code(m);
          _block = [json3, mermaid3, dot2, new None];
        }
        let $1 = _block;
        let json2;
        let mermaid2;
        let dot;
        let analysis_result;
        json2 = $1[0];
        mermaid2 = $1[1];
        dot = $1[2];
        analysis_result = $1[3];
        let $3 = json2 === "" && m.graph_type instanceof CSV;
        if ($3) {
          let _block$1;
          let $4 = parse_csv_to_graph(m.csv_input);
          if ($4 instanceof Error2) {
            let e = $4[0];
            _block$1 = e;
          } else {
            _block$1 = "Unknown CSV error";
          }
          let err = _block$1;
          return [
            new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, new Some(err)),
            none()
          ];
        } else {
          return [
            new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, json2, mermaid2, dot, m.csv_input, m.analysis_source, m.analysis_target, analysis_result, m.active_tab, new None),
            batch(toList([
              render_graph_effect(json2),
              render_mermaid_effect(mermaid2),
              render_dot_effect(dot)
            ]))
          ];
        }
      } else {
        let err = $[0];
        return [
          new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, new Some(err)),
          none()
        ];
      }
    } else if (msg instanceof CopyJson) {
      return [m, copy_to_clipboard_effect(m.generated_json)];
    } else if (msg instanceof CopyMermaid) {
      return [m, copy_to_clipboard_effect(m.mermaid_code)];
    } else if (msg instanceof CopyDot) {
      return [m, copy_to_clipboard_effect(m.dot_code)];
    } else if (msg instanceof SelectTab) {
      let tab = msg[0];
      let m$1 = new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, m.analysis_target, m.analysis_result, tab, m.validation_error);
      let _block;
      if (tab instanceof Json) {
        _block = render_graph_effect(m$1.generated_json);
      } else if (tab instanceof Mermaid) {
        _block = render_mermaid_effect(m$1.mermaid_code);
      } else {
        _block = render_dot_effect(m$1.dot_code);
      }
      let eff = _block;
      return [m$1, eff];
    } else if (msg instanceof DownloadImage) {
      return [m, download_image_effect(m.active_tab)];
    } else if (msg instanceof UpdateCSV) {
      let value2 = msg[0];
      let m$1 = new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, value2, m.analysis_source, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error);
      let $ = m$1.graph_type;
      if ($ instanceof CSV) {
        loop$m = m$1;
        loop$msg = new GenerateGraph;
      } else {
        return [m$1, none()];
      }
    } else if (msg instanceof UpdateAnalysisSource) {
      let value2 = msg[0];
      let m$1 = new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, value2, m.analysis_target, m.analysis_result, m.active_tab, m.validation_error);
      loop$m = m$1;
      loop$msg = new GenerateGraph;
    } else {
      let value2 = msg[0];
      let m$1 = new Model(m.graph_type, m.nodes, m.density, m.width, m.height, m.m, m.k, m.p, m.depth, m.generated_json, m.mermaid_code, m.dot_code, m.csv_input, m.analysis_source, value2, m.analysis_result, m.active_tab, m.validation_error);
      loop$m = m$1;
      loop$msg = new GenerateGraph;
    }
  }
}
function main() {
  let app = application(init, update2, view);
  let $ = start4(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError("let_assert", FILEPATH, "lustre_graph_generator", 1352, "main", "Pattern match failed, no pattern matched the value.", {
      value: $,
      start: 46297,
      end: 46346,
      pattern_start: 46308,
      pattern_end: 46313
    });
  }
  return $;
}

// .lustre/build/lustre_graph_generator.mjs
main();
