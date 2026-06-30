import {parse as parseJSONC, stringify as stringifyJSONC} from 'comment-json';
import json5 from 'json5';
import jsonAbc from 'jsonabc';
import type {SortFunction} from './SortFunction';

type Indexable = {[key: string]: unknown; [key: symbol]: unknown};

/**
 * Sorts object keys alphabetically, in place and recursively. Array order is
 * left untouched (matching the previous jsonabc behavior).
 *
 * "comment-json" stores comments as symbol-keyed metadata named after the
 * property they belong to (e.g. `before:abc`), so re-attaching those symbols
 * after reordering the keys makes each comment travel with its property.
 */
function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    value.forEach(sortDeep);
    return value;
  }

  if (value !== null && typeof value === 'object') {
    const node = value as Indexable;
    const keys = Object.keys(node).sort();
    const values = new Map<string, unknown>(keys.map(key => [key, node[key]]));
    const comments = new Map<symbol, unknown>(Object.getOwnPropertySymbols(node).map(symbol => [symbol, node[symbol]]));

    for (const key of keys) {
      delete node[key];
    }
    for (const key of keys) {
      node[key] = sortDeep(values.get(key));
    }
    for (const [symbol, comment] of comments) {
      node[symbol] = comment;
    }

    return node;
  }

  return value;
}

export const sortJSON: SortFunction = (input: string) => {
  try {
    // "comment-json" parses JSON/JSONC while preserving comments, so sorting
    // keeps the comments attached to the properties they document.
    const parsed = parseJSONC(input);
    sortDeep(parsed);
    return {
      payload: stringifyJSONC(parsed, null, 2),
      type: 'success',
    };
  } catch {
    // Fall back to JSON5 for inputs comment-json cannot parse (e.g. unquoted
    // keys or single quotes). Comments are not preserved on this path.
    try {
      const object = json5.parse(input);
      const sorted = jsonAbc.sortObj(object, true);
      return {
        payload: JSON.stringify(sorted, null, 2),
        type: 'success',
      };
    } catch (error) {
      return {
        error: error as Error,
        type: 'error',
      };
    }
  }
};
