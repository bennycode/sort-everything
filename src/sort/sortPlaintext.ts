import type {SortFunction} from './SortFunction';

export const sortPlaintext: SortFunction = function (input: string) {
  try {
    const sorted = input
      .split('\n')
      .sort((a, b) => {
        // First, check if one string is a prefix of the other
        if (a.startsWith(b)) {
          return 1; // a comes after b (b is shorter, so it comes first)
        }
        if (b.startsWith(a)) {
          return -1; // a comes before b (a is shorter, so it comes first)
        }

        // Otherwise, use normal locale-aware comparison
        return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
      })
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
