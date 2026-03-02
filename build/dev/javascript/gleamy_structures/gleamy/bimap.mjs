/// <reference types="./bimap.d.mts" />
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import { Ok, CustomType as $CustomType } from "../gleam.mjs";

class Bimap extends $CustomType {
  constructor(from_key, to_key) {
    super();
    this.from_key = from_key;
    this.to_key = to_key;
  }
}

/**
 * Creates a new empty bimap.
 */
export function new$() {
  return new Bimap($dict.new$(), $dict.new$());
}

/**
 * Converts a bimap into a list of key-value pairs.
 */
export function to_list(bimap) {
  return $dict.to_list(bimap.from_key);
}

/**
 * Get a value by its key, if present.
 */
export function get_by_key(bimap, key) {
  return $dict.get(bimap.from_key, key);
}

/**
 * Check if a key exists in the bimap.
 */
export function has_key(bimap, key) {
  return $dict.has_key(bimap.from_key, key);
}

/**
 * Get a key by its value, if present.
 */
export function get_by_value(bimap, value) {
  return $dict.get(bimap.to_key, value);
}

/**
 * Check if a value exists in the bimap.
 */
export function has_value(bimap, value) {
  return $dict.has_key(bimap.to_key, value);
}

/**
 * Delete a key-value pair from the bimap by key.
 */
export function delete_by_key(bimap, key) {
  let $ = $dict.get(bimap.from_key, key);
  if ($ instanceof Ok) {
    let value = $[0];
    let from_key = $dict.delete$(bimap.from_key, key);
    let to_key = $dict.delete$(bimap.to_key, value);
    return new Bimap(from_key, to_key);
  } else {
    return bimap;
  }
}

/**
 * Delete a key-value pair from the bimap by value.
 */
export function delete_by_value(bimap, value) {
  let $ = $dict.get(bimap.to_key, value);
  if ($ instanceof Ok) {
    let key = $[0];
    let from_key = $dict.delete$(bimap.from_key, key);
    let to_key = $dict.delete$(bimap.to_key, value);
    return new Bimap(from_key, to_key);
  } else {
    return bimap;
  }
}

/**
 * Insert a new key-value pair into the bimap. If either the key or value
 * already exists, the existing pair is removed before inserting the new one.
 */
export function insert(bimap, key, value) {
  let _block;
  let _pipe = bimap;
  let _pipe$1 = delete_by_key(_pipe, key);
  _block = delete_by_value(_pipe$1, value);
  let cleaned = _block;
  return new Bimap(
    $dict.insert(cleaned.from_key, key, value),
    $dict.insert(cleaned.to_key, value, key),
  );
}

/**
 * Create a bimap from list entries.
 */
export function from_list(members) {
  let _pipe = members;
  return $list.fold(
    _pipe,
    new$(),
    (bimap, member) => {
      let key;
      let value;
      key = member[0];
      value = member[1];
      return insert(bimap, key, value);
    },
  );
}

/**
 * Get the count of key-value pairs in the bimap.
 */
export function count(bimap) {
  return $dict.size(bimap.from_key);
}
