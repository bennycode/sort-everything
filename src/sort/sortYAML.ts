import {dump, load} from 'js-yaml';
import type {SortFunction} from './SortFunction';

export const sortYAML: SortFunction = function (text: string) {
  try {
    return {
      payload: dump(load(text), {sortKeys: true}),
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
