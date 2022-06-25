import json5 from 'json5';
import jsonAbc from 'jsonabc';
import type {SortFunction} from './SortFunction';

export const sortJSON: SortFunction = function (input: string) {
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
};
