import json5 from 'json5';
import jsonAbc from 'jsonabc';

export type SortSuccess = {
  payload: string;
  type: 'success';
};

export type SortError = {
  error: Error;
  type: 'error';
};

export function sortJSON(json: string): SortSuccess | SortError {
  try {
    const object = json5.parse(json);
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
