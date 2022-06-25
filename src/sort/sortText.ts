import type {SortFunction} from './SortFunction';

export const sortText: SortFunction = function (input: string) {
  try {
    const sorted = input
      .split('\n')
      .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
      .join('\n');
    return {
      // Remove last element so that line break is not taken into consideration on next sort
      payload: sorted.trim(),
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
