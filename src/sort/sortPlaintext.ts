import type {SortFunction} from './SortFunction';

export const sortPlaintext: SortFunction = function (input: string) {
  try {
    const sorted = input
      .split('\n')
      .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
      .join('\n');
    return {
      payload: sorted,
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
